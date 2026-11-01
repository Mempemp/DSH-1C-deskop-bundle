import type { CatalogServer, CatalogTool } from "../entries/type.js";
/** 注册面视图：宿主 `ctx.tools.schemas()` 的返回形状（每次投影现取）。 */
export type SchemaView = ReadonlyArray<{
    name?: unknown;
    description?: unknown;
    parameters?: unknown;
}>;
/** 投影入参：id 前缀（`mcp__<id>__`）源自连接层的账本键，其余为本域要用的宿主面事实。 */
export interface RegisteredProjectionInput {
    root: string;
    serverName: string;
    id: string;
    /** 注册面视图（连接层现取宿主注册表）。 */
    schemas: SchemaView;
    /**
     * 落盘路径：连接层用 `host.catalogCachePath(root)` 算，本域不推路径。接 thunk 是为了
     * 保住「路径求值失败 = 投影失败（unavailable 降级）」这条既有语义——调用点把求值推后
     * 到这里，求值抛错才落在本层的 catch 内（先求值再传参会让异常逃出降级面）。
     */
    cachePath: () => string;
    /** 凭据脱敏：本域不持服务器表，故这一层由调用方（连接层）闭包给出。 */
    redact: (error: unknown) => string;
    /** runtime 注入条目（内存态）不落盘（#413）：判定同样归调用方。 */
    isRuntimeServer: (name: string) => boolean;
    /** 告警出口（连接层转 host.logger.warn）。 */
    warn: (message: string) => void;
}
/**
 * 每 root 的工具目录内存态 + last-good 磁盘读写 + 注册面投影。
 *
 * 「root 在册」由独立的 root 集合承载：只有 root 在册、且某服务器在册时读口才作答。这条区分
 * 是必须的——「单元根本没有该 root」与「root 在册但没有该服务器」在消费点走的是不同分支
 * （detail 报未发现，而 search/list 只是没有命中）。
 */
declare class CatalogDirectory {
    /** root →（裸 server 名 → 目录条目）。 */
    private readonly byRoot;
    /** 在册 root 集合：与 byRoot 同步维护，承载「单元存在但目录为空」这一可区分状态。 */
    private readonly roots;
    /**
     * 失效账本：`root\0<裸 server 名>` 的脏标记集合（#1014 B7）。
     *
     * 为什么落在这里而不是连接层：本域是目录新鲜度的**唯一裁决点**，而「哪台脏了」是目录
     * 事实。连接层只负责在变更发生时刻登记（markDirty）与在投影时消费，本域不依赖任何
     * 上对能力——deps.ts 不动，域间值边保持 0。
     *
     * 为什么需要它：此前目录投影只按 TTL 短路（24h），tools/change / 重连 / 手工刷新 / 配置
     * 变更全都没有落点，模型会一直看到旧 schema。TTL 是兜底上限，不是刷新策略。
     */
    private readonly dirty;
    /** 读口：root 的整份目录；root 不在册 → undefined。域外只读，故给 ReadonlyMap。 */
    serversFor(root: string): ReadonlyMap<string, CatalogServer> | undefined;
    /** 读口：单服务器条目；root 或服务器不在册 → undefined。 */
    entryFor(root: string, serverName: string): CatalogServer | undefined;
    /** 读口：root 在册的服务器裸名表（A1 归因文案用）。 */
    serverNamesFor(root: string): readonly string[];
    /**
     * 读口：该 id 前缀下是否已有注册工具——「已连上」的唯一正向证据（官方零状态 API）。
     * 注册面视图按入参现给，本域不自己去取宿主注册表。
     */
    hasRegisteredTools(schemas: SchemaView, id: string): boolean;
    /**
     * 装载 root 的 last-good 目录缓存（缺失/损坏 → 空）。
     *
     * root 已在册即短路：单元创建是唯一载入点，重复读盘会拿磁盘那份**盖掉**内存里更新的投影
     * （落盘是异步 fire-and-forget，内存态才是权威）。
     */
    ensureRootLoaded(root: string, cachePath: string): Promise<void>;
    /** 注销 root 的内存目录（拆毁单元时调用）；root 从未在册则无动作。 */
    dropRoot(root: string): void;
    /**
     * 注销单个服务器的内存目录条目（remove/update 配置变更后调用；#392 遗留①）。
     * @returns 是否真的删掉了条目——调用方据此决定要不要广播状态（与 `Map.delete` 同口径）。
     */
    dropServer(root: string, serverName: string): boolean;
    /** 失效键：root 与裸名用 NUL 连接——两者都可能含 `/`，用路径分隔符会撞键。 */
    private dirtyKey;
    /**
     * 登记失效（#1014 B7）：投影短路前由调用点打上。幂等——同一条重复登记不叠加，
     * 也不区分原因：失效只需要「要重投影」这一个事实。
     */
    markDirty(root: string, serverName: string): void;
    /** 失效读口：显式失效压过 TTL 短路（这是本账本存在的全部意义）。 */
    isDirty(root: string, serverName: string): boolean;
    /**
     * 消费失效：投影成功后清标记。
     *
     * 为什么只在成功后清：投影失败走 markUnavailable 降级，目录并不更新——此时保留标记，
     * 下一次投影仍会绕过 TTL 短路重试；清掉就等于让一次失败把该服务器冻结 24h。
     */
    clearDirty(root: string, serverName: string): void;
    /**
     * 条目不可用（发现或落盘失败）：带脱敏后的原因（unavailable 段），**并保留 last-good 工具表**。
     *
     * 为什么保留（#1014 §2「失败保留 last-good」）：此前实现是把 tools 换成空表，等于一次落盘
     * 失败就让该服务器在模型视野里「工具消失」。落盘失败是本地问题（路径不可写、目录不存在），
     * 与远端工具清单无关——丢掉 last-good 会把一次瞬时失败放大成「这台服务器没有工具」。
     * 目录读口本来就带 unavailable 段，消费者据此知道该快照不新鲜。
     *
     * discoveredAt 仍归零：它是「这份快照有多新」的事实位，归零让 isCatalogFresh 判不新鲜，
     * 下一次投影（含脏标记在途）会重试。
     */
    markUnavailable(root: string, serverName: string, reason: string): void;
    /**
     * 注册面 → per-root 目录的投影（裁定 W + 裁定 K）。
     *
     * 官方注册名是 `mcp__<id>__<tool>`，去掉前缀即裸名；description 与 parameters 都在注册面
     * 视图里，不需要第二份工具清单。fresh 短路：TTL 内不重投影（discover 惰性语义），且短路发生
     * 在任何落盘动作之前。落盘失败（含路径求值失败）由本层 catch 收口成 unavailable 降级。
     *
     * 短路条件（#1014 B7）：**无失效标记且** TTL 内才短路。显式失效压过 TTL——否则模型会
     * 一直看着已删除的 schema，而 TTL 是 24h。
     *
     * 当前失效的生产者只有一个：tools/change 经 connection 域的 reprojectCatalogs 逐台 diff
     * 后登记（connection/runtime/middleware.ts）。重连与配置变更只有在宿主顺带发出
     * tools/change 时才间接生效；**手工刷新尚无失效落点**（刷新走的是纯读路径，不触发投影），
     * 仍落在 TTL 短路内——该缺口记在 #1014，未在本批闭合。
     */
    projectRegisteredTools(input: RegisteredProjectionInput): Promise<void>;
    /**
     * #413：从封装定义（toolDefinitions）投影目录，替代远端 discover。
     * 封装 execute 为调用方 JS 直呼（不经远端 MCP），目录数据源即调用方定义：
     * name/description 直取；dsh-tools 的 parameters（ToolSchema）即 JSON Schema
     * 形态，直接作 CatalogTool.inputSchema（与 supervisor 封装分支同口径）。
     */
    projectWrappedTools(input: {
        root: string;
        serverName: string;
        definitions: readonly unknown[];
    }): void;
    /**
     * 目录 last-good 持久化（空采集不写盘；public 供测试与外部触发）。
     *
     * 路径求值由**调用方**给（连接层用 host.catalogCachePath(root) 算），写盘失败只 warn；
     * 路径求值失败按设计逃出本层、由投影的 catch 收口成 unavailable 降级。
     */
    persistRoot(root: string, opts: {
        cachePath: () => string;
        isRuntimeServer: (name: string) => boolean;
        warn: (message: string) => void;
    }): Promise<void>;
    /**
     * 从磁盘 last-good 目录缓存中清除单服务器条目（remove/update 后调用；#392 遗留①）。
     * persistRoot 是全量覆盖且空采集不写盘——remove 后该 root 目录可能已空，若不显式
     * 清盘，磁盘缓存仍残留已删服务器条目，插件重启/@global 单元重建时 ensureRootLoaded
     * 把幽灵条目载回（ws_mcp_list 再次列出）。这里读现有缓存、删条目、写回；条目删空则
     * 删除缓存文件。内存目录由调用方（dropMiddlewareConnection）先行删除。
     */
    removeRootEntry(root: string, serverName: string, opts: {
        cachePath: string;
        warn: (message: string) => void;
    }): Promise<void>;
}
/** 目录域唯一的内存目录实例：类不外放，外部 new 不出第二份目录。 */
export declare const catalogDirectory: CatalogDirectory;
/** 目录新鲜判定：有条目、无 unavailable 段、且发现时间在 TTL 内
 *  （投影惰性重做专用；纯时间比较，无副作用）。 */
export declare function isCatalogFresh(catalog: CatalogServer | undefined): boolean;
/** 单服务器目录装箱（投影专用纯函数）：按限额收敛工具清单——
 *  工具数上限 MAX_TOOLS_PER_SERVER、单描述字节上限 MAX_BYTES_PER_TOOL（超限
 *  截断）、累计字节上限 MAX_TOTAL_CATALOG_BYTES（超限即停）。行为与原
 *  discover 内联循环逐位一致（含 totalBytes 对截断后条目的计算口径）。 */
export declare function boundCatalogTools(tools: Iterable<{
    name?: unknown;
    description?: unknown;
    inputSchema?: unknown;
}>): Map<string, CatalogTool>;
export {};
