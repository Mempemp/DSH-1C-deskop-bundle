/**
 * dsh-mcp-manager — MCP 服务器管理器（单一事实源）。
 *
 * McpManager 持有全局存储 + 当前会话项目的项目级存储、连接池宿主面与状态通知。
 * 全局服务器常连；项目级服务器（<项目根>/.dsh/@wingsky-1/dsh-mcp-manager/mcp.json）只在当前会话 cwd 属于
 * 该项目时连接（跟随会话切换）。
 *
 * **单池（#767 笔 1a）**：连接只有一本账 = 中间层单元表 `middleware.units`
 * （键 = (root, 裸名)）。此前 manager 自持的那条「直连账本」并行路径已整体退役
 * ——池归属判定（旧 `middlewareTakes`）恒真，本类不再持有任何条目表。
 *
 * 类型自各域门面取；manager.ts 不 import apply.ts / index.ts（防循环引用）。
 */
import type { SseHub } from "../../../../shared/sse-hub.js";
import type { Context, LoggerService } from "@deepseek-ai/cordis";
import type { ServerConfig } from "../../config/interface.js";
import type { ClientUiConfig, ServerState } from "../../../shared/interface.js";
import type { CatalogCache, CatalogServer } from "../../catalog/interface.js";
import type { McpStore } from "../../store/interface.js";
import type { McpStatsCollector } from "../../stats/interface.js";
import type { McpMiddleware } from "../runtime/interface.js";
import type { ConnectionEntry, ProjectUnit } from "../interface.js";
import type { DisabledToolsMap } from "../../store/interface.js";
/** 期望连接集合的条目：(归属 root, 裸名) 键 → 配置 + scope。 */
type DesiredServer = {
    name: string;
    server: ServerConfig;
    scope: string;
};
/** 期望连接集合（键 = `${root}\u0000${name}`；见 buildDesiredServers）。 */
type DesiredServers = Map<string, DesiredServer>;
/** 目录数据源条目（裸名 → 配置 + scope；catalogServersFor 的输出面）。 */
type CatalogServers = Map<string, {
    server: ServerConfig;
    scope: string;
}>;
/** 纯对象表判定（env/headers 表；null 与数组都不算表）。类型谓词，收窄后免断言。 */
export declare function isPlainRecord(value: unknown): value is Record<string, unknown>;
/** 投影占位符判定（#770-A3）：含 "[REDACTED]" 或其 URL 编码形态。 */
export declare function isProjectionPlaceholder(value: unknown): boolean;
/**
 * 写路径 guard 的一格：这一（键, 值）是否携带投影占位符。
 * 口径逐字照搬历史三段判定：args 只看数组元素、env/headers 只看一层值、
 * 其余键只看字符串值本身——不递归（更深的嵌套历史不判，回写形状不变）。
 */
export declare function carriesProjectionPlaceholder(key: string, value: unknown): boolean;
/** add 的回写 guard：首个携带投影占位符的键名；无则 undefined（键序即判定序）。 */
export declare function findProjectionPlaceholderKey(server: Record<string, unknown>): string | undefined;
/** 非空键值表判定（空表与缺省同义：投影里都算「无秘密」）。 */
export declare function hasSecretTable(table: Record<string, string> | undefined): boolean;
/** URL 形态是否携带秘密（userinfo 非空 / 任一查询值非空；非字符串与非法 URL 判无）。 */
export declare function urlCarriesSecrets(url: unknown): boolean;
/** 投影基底：name/transport + 四个可选安全字段（缺省即省略；键序固定，勿调换）。 */
export declare function projectBaseFieldsForSummary(server: ServerConfig): Record<string, unknown>;
/**
 * stdio 分支投影（ServerConfig[`transport`] 的 stdio 一侧）：command/args/cwd。
 * env 整体省略（见本块头注释）；有无秘密只经 hasSecrets 告知 GUI。
 * argsHadSecret：凭据形 flag 的参数值确被掩码过（#925，与 pipeline redact 同口径，
 * 掩码口经参数递入以便直测）；flag 名与非秘密元素保留可诊断，掩码值回写时由
 * stripProjectionPatch 丢弃。
 */
export declare function projectStdioFieldsForSummary(server: ServerConfig, maskSecretArgsForDisplay: (args: readonly string[]) => string[]): {
    fields: Record<string, unknown>;
    argsHadSecret: boolean;
};
/** streamable-http 分支投影（ServerConfig[`transport`] 的 http 一侧）：url 按 B8 脱敏。headers 整体省略（同 env）。 */
export declare function projectHttpFieldsForSummary(server: ServerConfig): Record<string, unknown>;
/** 空 cwd 判定（类型谓词）：undefined / null / "" 三形态都判「无项目」，收窄后无需断言。 */
export declare function isBlankCwd(cwd: string | null | undefined): cwd is null | undefined | "";
/**
 * 会话 cwd → 项目根（catalogServersFor 与 setSession 共用的同一口径）。
 * 查表口经参数递入：模块级函数因此不依赖端口装配，可直测。
 */
export declare function projectRootForCwd(cwd: string | undefined, findProjectRoot: (cwd: string | undefined) => Promise<string>): Promise<string | undefined>;
/** (键, 配置) 对适配：store 侧目录键即 server.name（runtimeRegistry 侧用注册表键，见 collectCatalogServers）。 */
export declare function serverEntry(server: ServerConfig): readonly [string, ServerConfig];
/**
 * enabled 的服务器并进目录数据源（同名后者覆盖前者——调用顺序即优先级：
 * 全局 store → runtimeRegistry → 项目级 store，#770-11 项目优先）。
 * 键取 entry 键而非 server.name：runtimeRegistry 的键是注册名，与条目内的 name 不必然同形。
 */
export declare function collectCatalogServers(into: CatalogServers, entries: Iterable<readonly [string, ServerConfig]>, scope: string): void;
/** 重读配置且失败只 warn 不外抛（读路径不该被配置损坏打断）；返回是否变化。 */
export declare function reloadStoreQuietly(store: McpStore, onFail: (error: unknown) => void): Promise<boolean>;
/**
 * 触达单元（fire-and-forget，setSession 永不挂起）：成功即淘汰失效单元。
 * 必须带拒绝处理（#903 M4），否则 projectUnitFor 翻错即 unhandled rejection。
 */
export declare function touchUnitInBackground(middleware: McpMiddleware, target: string, onFail: (error: unknown) => void): void;
/** 池内不再需要的连接（配置里已无 / 已禁用）释放；返回是否释放过。 */
export declare function releaseUndesiredConnections(middleware: McpMiddleware | undefined, desired: DesiredServers): boolean;
/**
 * 该 (root, 裸名) 是否还不在池里（= 连接集合变化）。中间层缺失时**不算**变化：
 * 实例缺失时什么都触达不了，记变化只会让状态广播空转。
 */
export declare function absentFromPool(middleware: McpMiddleware | undefined, root: string, name: string): boolean;
/** 触达落点：项目级取当前项目 root（无活动项目即无处触达），全局级落 @global。 */
export declare function touchRootFor(scope: string, projectRoot: string | undefined): string | undefined;
/**
 * 池同步本体（reconcileServers 的执行面，两个变化原因各自成步）：
 * ① 释放池内不再需要的连接；② 触达配置里应有而池内尚缺的条目。返回集合是否变化。
 */
export declare function syncPool(middleware: McpMiddleware | undefined, desired: DesiredServers, projectRoot: string | undefined, start: (name: string, scope: string) => void): boolean;
/**
 * connect 的配置来源定位：store 优先；global scope 未命中时回退 runtimeRegistry
 * （F2 #382——runtime 注入条目不落 store）。回退即 warn（口径与旧实现同文案）。
 */
export declare function resolveConnectableServer(store: McpStore, runtimeRegistry: ReadonlyMap<string, ServerConfig>, name: string, scope: string, warn: (message: string) => void): ServerConfig | undefined;
/** 池内已连接条目的 summary 视图输入（由 manager 装配，投影函数不反查池）。 */
interface PooledSummaryView {
    /** 目录可用时的工具名（目录缺失 / 发现失败即空表）。 */
    tools: readonly string[];
    /** 本单元的工具禁用集与 @global 继承集（各自可缺省）。 */
    disabled: ReadonlySet<string> | undefined;
    inheritedDisabled: ReadonlySet<string> | undefined;
    /** 读时刷新的六态投影（裁定 U；单元/条目缺失时为 undefined）。 */
    status: ServerState | undefined;
    /** 已脱敏的错误文案（连接错误优先、目录发现失败次之）。 */
    error: string | undefined;
}
/** 目录可用时的工具名表（目录缺失或发现失败一律空表——解释「connected 却 0 工具」靠 error 而非此处）。 */
export declare function catalogToolNames(catalog: CatalogServer | undefined): string[];
/** 池内条目的错误文案来源：entry.error 优先、目录发现失败次之（脱敏在显示侧做，见 redact 参数）。 */
export declare function pooledErrorText(entry: ConnectionEntry, catalog: CatalogServer | undefined, redact: (error: unknown) => string): string | undefined;
/** 工具禁用判定：本单元禁用集 ∪ @global 继承集（两者各自可缺省）。 */
export declare function isToolDisabledIn(tool: string, disabled: ReadonlySet<string> | undefined, inheritedDisabled: ReadonlySet<string> | undefined): boolean;
/** 池内条目的 summary 投影（#770-A3 只读基底 + 池面：状态/工具/禁用/错因）。 */
export declare function summarizePooled(base: Record<string, unknown>, scope: string, view: PooledSummaryView): Record<string, unknown>;
/** 未在池里的条目投影：禁用 → disabled，其余 → stopped，工具面为空（与旧直连账本兜底同口径）。 */
export declare function summarizeAbsent(base: Record<string, unknown>, scope: string, server: ServerConfig): Record<string, unknown>;
/**
 * 管理器：持有全局存储 + 当前会话项目的项目级存储、连接池宿主面与状态通知。
 * 全局服务器常连；项目级服务器（<项目根>/.dsh/@wingsky-1/dsh-mcp-manager/mcp.json）只在当前会话 cwd 属于
 * 该项目时连接（跟随会话切换）。
 */
export declare class McpManager {
    private httpConnections;
    private httpEpochs;
    private httpSequence;
    private userStateQueue;
    private connectionKey;
    private invalidateHttpConnection;
    private markDisabled;
    rootForRequest(scope: string, cwd?: string): Promise<string>;
    /** HTTP 受理入口；宿主 connect 仍等待完整连接。 */
    acceptConnection(name: string, scope: string, cwd?: string): Promise<string>;
    private validateHttpTarget;
    private runHttpConnection;
    private entryForRoot;
    disconnectForRequest(name: string, scope: string, cwd?: string): Promise<string>;
    ctx: Context;
    store: McpStore;
    listeners: Set<() => void>;
    logger: LoggerService;
    projectRoot: string | undefined;
    projectStore: McpStore | undefined;
    reconcileBusy: boolean;
    projectStores: Map<string, McpStore>;
    catalogCache: CatalogCache;
    catalogCachePath: string;
    uiConfigSource: () => unknown;
    /** 设置命名空间写入 sink（apply 时经 ctx.inject(["settings"]) 注入；注入不到则写不可用）。 */
    uiUpdate?: (patch: Record<string, unknown>) => Promise<unknown>;
    /**
     * SSE 连接枢纽（共享 shared/sse-hub，#515）：makeEventsRoute 惰性创建；
     * 广播/卸载 disposer 收口到 hub（连接表 + 心跳 + stalled/maxAge 主动回收）。
     * 取代旧 sseConnections Set + per-connection 心跳（#268）。
     */
    sseHub?: SseHub;
    /** 中间层实例（连接池 + 目录 + 路由；惰性创建）。 */
    middleware: McpMiddleware | undefined;
    /** userDisabled 持久化路径。 */
    userStatePath: string;
    /** MCP 调用统计收集器（可用于 debug 模式量化调用指标与渐进式披露漏斗）。 */
    stats: McpStatsCollector;
    /** 运行时注册表（内存态，不落盘）：供其他插件经 ctx.mcpManager 注入服务器。
     * 双轨 reconcile：store.data.servers（持久化）+ runtimeRegistry（运行时）。
     * 同名冲突策略：runtime 优先（运行时注入是「当前会话」语义）。 */
    runtimeRegistry: Map<string, ServerConfig>;
    /** registerServer 串行队列（防 reconcileBusy 吞注册；多插件并发注册排队）。 */
    private registerQueue;
    /** 注入端目录缓存视图解析器（catalog/impl/cache-view/index.ts 工厂闭包；含 mtime 缓存）。 */
    private catalogViewResolver;
    constructor(ctx: Context, store: McpStore);
    /** 读取 settings 命名空间中的 MCP UI 配置（供 /api/dsh-mcp/config 返回）。 */
    uiConfig(): ClientUiConfig;
    /**
     * 写入浮窗 UI 配置（/api/dsh-mcp/config POST）。
     * 把客户端扁平形态归一化为 `Config.ui` 嵌套补丁，经设置命名空间持久化
     * （settings.update 落盘 → scope.watch → onChange → SSE 广播一帧），随后返回
     * 归一化后的最新配置。settings 服务不可用时抛错（写不可用）。
     */
    updateUiConfig(raw: unknown): Promise<ClientUiConfig>;
    /** 从磁盘加载目录缓存（损坏/缺失 → 空缓存，不崩溃）。 */
    loadCatalogCache(): Promise<void>;
    /**
     * 连接成功后记录工具描述摘要到目录缓存（**只在摘要实质变化时落盘**——
     * 保证重连拿到相同描述不触发 digest 变化、不重复注入）。
     * 缓存是持久数据（磁盘），与实时连接状态解耦：断开/重连不清空 → 目录稳定。
     */
    recordCatalogTools(serverName: string, toolMeta: Map<string, {
        description?: unknown;
    }>): Promise<void>;
    /**
     * 注册面读口：取不到 / 非数组一律当空——六态投影与工具面投影都不许因为读不到注册表而阻塞
     * （与 McpMiddleware.registeredSchemas 同口径）。
     */
    private registeredSchemas;
    /** 单元的 root：项目级取当前项目根，其余取全局虚拟 root（与中间层单元同口径）。 */
    private poolRootFor;
    /**
     * 注册名中段 → (root, 裸名) 反查（id 化的 mcp__ 注册名还原成禁用表键）。
     *
     * 为什么由 manager 提供：id 是装载期由官方实例的 serverName 定下的（裁定 AG① 明确 id 不进
     * 注入面），只有自持账本的一侧知道 (id → root, 裸名)。注入端在装配点把这个能力**按入参**递进
     * guard（与既有 resolveRoot 同一形态），因此不新增跨域值边、也不动任何端口键。
     */
    serverNameForId(id: string): {
        root: string;
        server: string;
    } | undefined;
    /**
     * 公共查询面 `ctx.mcpManager.getTools` 的数据源（M5 = A，本笔换源）：该服务器在
     * 连接池里的**注册名**清单（`mcp__<id>__<tool>`，与 `ctx.tools` 注册表一致）。
     *
     * 口径不变：返回注册名、不是裸名（裸名是 `summary().tools` / 目录读口的口径）。
     * 数据源从旧直连账本的 `toolMeta` 换成**单元表**——旧实现只由直连路径填充，被中间层
     * 接管的服务器恒返回 `[]`（既有缺陷 A13/B6）；单池合并后那条路径已不存在。
     *
     * 虚拟连接单元（toolDefinitions，无 id/handle）没有宿主注册名，返回空表。
     */
    registeredToolsFor(name: string): Array<{
        name: string;
        description?: string;
    }>;
    /** 池内该裸名的连接条目（跨单元查；同名跨 root 各成一条，取先命中者，与旧账本同口径）。 */
    private poolEntryFor;
    onStatus(handler: () => void): () => void;
    /** 脱敏秘密源的唯一事实源（#770-8）：全局 store + 全部 projectStores 缓存 + runtimeRegistry。
     *
     * 为什么是同步快照：middleware 的 redact/callTool 与本类的 redactError 都是同步路径，
     * 而按 root 取配置的 projectServersFor 是 async（同步内不可 await）；脱敏只读已在内存的
     * 缓存快照，不触发磁盘读。未进缓存的项目 root 不在此列——要读它必须走 async 链（本相按
     * 裁决不做，调用链保持同步，见 MiddlewareHost.redactionServers）。
     *
     * 为什么含 disabled/unconnected：凭据是否出现在错误文案与服务器当下是否启用/已连接
     * 无关——未连接与 disabled 条目的 secret 同样须抹掉（双向缺口的反例）。此处不做
     * enabled 过滤，调用方也不得再过滤。
     *
     * 三处同调：本方法 ↔ middleware.redact ↔ dispatch redactMcpError（经 host.redactionServers
     * 转供的同一快照），底层同 pipeline.createRedactor。
     *
     * #770-A1：快照在调用方展开 ${ENV} 模板（经 configModel.expandServerEnv）再交
     * createRedactor——错误文案里出现的是展开后的凭据明文，不是落盘的模板字面量；
     * redactor 内禁止读 process.env（保持纯函数），展开是调用方的职责。无模板时
     * 展开恒等（新对象、值不变）；未设置的变量展开为空串，由 addSecretPair 跳过
     * （空串不注册，避免把空匹配当秘密）。 */
    getRedactionServers(): ServerConfig[];
    /** B8：错误日志脱敏（经 getRedactionServers 全集 + createRedactor）。
     * 日志与 HTTP body 同口径（C-ERR 契约），error 可能含凭据明文。
     * #770-A2：公开给路由错误边界（RoutesManager.redactError）——manager 已是
     * 路由的结构参数，复用同一秘密源，不为 api 域另开脱敏口（附录 G·G19：api 域
     * 不直持 manager 实例 beyond 既有结构参数，脱敏能力经此方法面递入）。
     * 每次现建 redactor（per-request 可接受：错误路径低频，无缓存必要）。 */
    redactError(error: unknown): string;
    /** coalesce 定时器（同一 tick 内多次状态变化合并为一次广播）。 */
    private statusTimer;
    /** 状态变化广播（coalesce：同 tick 多次 emitStatus 只广播一次，防 SSE 风暴）。 */
    emitStatus(): void;
    /** 当前会话的项目级存储（无活动项目时抛错）。 */
    projectStoreOrThrow(): Promise<McpStore>;
    /**
     * 中间层宿主：按 root 读取服务器配置。虚拟 root "@global" 返回
     * 全局配置 **+ runtime 注入条目**（#413：runtime 封装定义服务器由中间层接管，
     * 数据源必须可见；独立合并，不污染 store.data.servers 持久化数组）。
     */
    projectServersFor(root: string): Promise<ServerConfig[] | undefined>;
    /** 中间层宿主：该 server 是否 runtime 注入（目录不写盘判定；#413）。 */
    isRuntimeServer(name: string): boolean;
    /** 中间层宿主：该 server 是否全局级（双源：store + runtimeRegistry）。
     * runtime 注册的服务器不落 store，单源会误判「非全局」——P1 修正。 */
    isGlobalServer(name: string): boolean;
    /** 中间层宿主：全局服务器配置（@global 单元装载用）。 */
    globalServers(): ServerConfig[];
    /** 中间层宿主：持久化 userDisabled。 */
    saveUserState(units: Map<string, ProjectUnit>): Promise<void>;
    /** 中间层宿主：root 的目录缓存文件路径。 */
    catalogCachePathFor(root: string): string;
    /**
     * 初始化中间层（apply 时无条件调用；幂等）。单池合并后连接池是唯一连接路径，
     * 池归属恒为「全部服务器」——#767 笔 2 删掉 `middlewarePolicy` 后不再接受任何入参。
     */
    initMiddleware(): Promise<McpMiddleware>;
    /** userDisabled 映射（root → Set<server>），中间层单元创建时合并。 */
    disabledByRoot: Map<string, Set<string>>;
    /** 工具级禁用（root → server → Set<tool>）；root=@global 跨工作空间共享。 */
    disabledTools: DisabledToolsMap;
    /**
     * 设置/解除单个工具禁用（宿主 API PATCH /api/dsh-mcp/tool-disable 调用）。
     * 合并式写盘（先读现有文件再覆盖本 root 段，绝不整表覆盖）——
     * 防多工作空间互相抹掉禁用记录。
     * @param root 目标 root（全局服务器用 MIDDLEWARE_GLOBAL_ROOT）。
     * @param server 服务器裸名。
     * @param tool 远端工具裸名。
     * @param disabled true=禁用 / false=解除。
     * 工具级禁用独立于服务器级 enabled：服务器级复活不清工具级状态。
     */
    setToolDisabled(root: string, server: string, tool: string, disabled: boolean): Promise<void>;
    /** 读取/复用某项目根的 store（工作区缓存命中直接返回，不重复读盘）。 */
    projectStoreFor(root: string | undefined): Promise<McpStore | undefined>;
    /**
     * 会话目录数据源：全局服务器 + 该 cwd 所属项目的项目级服务器（**配置层面**，
     * 与 host 当前 setSession 状态解耦）。此前直接用 manager.supervisors（实时
     * 连接状态、跟随"当前工作区"）——切换工作区会断开/连接项目级服务器，导致
     * 别的会话的目录集合抖动、每次抖动注入一条目录更新消息。按 cwd 计算后：
     * 工作区 MCP 没变化 → digest 不变 → 不重新注入。
     *
     * 运行时注入（registerServer 的 runtimeRegistry，内存态）同样并入目录数据源
     * （#359）：插件经运行时注入注册的服务器，连接成功、工具可用，
     * 但此前不在目录里——模型看不到能力，只能自己翻 CLI。同名 runtime 优先
     * （与 reconcile 双轨一致）。
     *
     * 同名碰撞取项目条目（#770-11，项目优先）：与 buildDesiredServers/reconcile
     * 同口径——连接层同名跨 root 各成一条（键含 root，谁也不顶谁），目录按裸名
     * 只取一条时取会话项目那条（scope=SCOPE_PROJECT）。
     * - 预期 breaking：同名碰撞进目录的配置翻转，模型可见工具集/描述随之变化。
     *   digest 只含名集合（见 catalog/impl/digest），名集不变时 digest 不变，
     *   但条目内容仍经 catalogViewFor/compose 进入注入文本。
     * - summary() 仍列全局 + 项目两条（GUI 两条 vs 模型取其一）属预期，不在此收敛。
     */
    catalogServersFor(cwd: string | undefined): Promise<CatalogServers>;
    /**
     * 合成注入端目录缓存视图（#569 修复核心）：实现在 catalog/impl/cache-view/index.ts
     * （makeCatalogViewFor 工厂闭包，含磁盘 last-good mtime 缓存），本方法为
     * 薄桥接（C-DIR：catalogViewFor 迁出 catalog 域，宿主最小面）。
     * @param cwd 会话 cwd（与 catalogServersFor 同源解析项目 root）。
     * @param servers catalogServersFor 的输出（name → { server, scope }）。
     * @returns CatalogCache 形态视图（name → { summary }），可直接喂 composeCatalogEntries。
     */
    catalogViewFor(cwd: string | undefined, servers: Map<string, {
        server: ServerConfig;
        scope: string;
    }>): Promise<CatalogCache>;
    /**
     * 会话切换：只切 currentRoot + fire-and-forget 惰性启动（不 await 任何连接）。
     * 变更点驱动（#111/#228）：POST /api/dsh-mcp/session 永不挂起——连接/发现
     * 由中间层惰性驱动（per-root in-flight 去重），此处零连接副作用。
     * 单池后项目级连接恒由中间层池按 root 常驻，切走不断开。
     */
    setSession(cwd: string | undefined): Promise<void>;
    /**
     * 切回前台可用性恢复：对本次请求工作空间连接的非强制恢复（对齐 SSE forceReconnect 的
     * 触发时机，不对称其 force 语义，#1120）。
     * 复用官方管理机制与现有 middleware.ensureConnected 的状态投影/在途去重：
     * connected/connecting/reconnecting 走现有短路保留代际与官方退避，不以每次
     * visibilitychange 为由 dispose/restart；entry 缺失、真正失败经正常路径恢复；
     * userDisabled 绝不复活；显式用户 reconnect/force 保持现有能力走 connect()。
     *
     * 不做自研连接或协议 ping：官方挂载层只提供 ready/disposed/工具注册面，无法实时
     * 区分“有工具注册的健康连接”与“有工具注册的半开连接”——自动恢复不声称检测真实
     * 健康；半开仍由用户显式重连恢复（README 已知限制）。
     *
     * @param cwd 本次请求的会话 cwd：undefined=旧无 body 请求回落既有绑定
     *   （this.projectRoot ?? @global）；""=新请求明确无工作区，固定 @global，
     *   不回落到别人的 projectRoot；非空=本次解析并固定 root，不读并发可变的
     *   manager.projectRoot 字段。
     */
    resumeReconnect(cwd?: string): Promise<void>;
    /**
     * 重读磁盘配置（全局 + 当前项目）并同步连接集合。
     * 供「浮窗刷新」等读取路径调用：外部修改 mcp.json 后无需重启宿主。
     * 仅在配置或连接集合实际变化时广播，避免空转 SSE → 客户端 refresh 循环。
     * 变更点驱动（#111）：读取路径不再调用本方法（GET /servers 纯读）；本方法
     * 仅由 fs.watch 变更点与用户操作 API 调用。
     *
     * #616 修复：两次 reloadIfChanged 均为 false（配置未变）时直接早退、不再
     * reconcile——全局 watcher 监听的是整个 `~/.dsh` 目录，插件自身的
     * user-state 写盘（saveUserState/saveDisabledTools，浮窗连接/断开必写）会
     * 触发 watcher 事件；此前无配置变化也走 reconcileServers，是「用户操作
     * 全局服务器 → 项目级单元被误拆」链路的放大器（根因见 start 内注释）。
     */
    refreshFromDisk(): Promise<void>;
    /**
     * 按当前配置同步连接池：池内不再需要的（移除 / 禁用 / 归属 root 已变）释放，
     * 配置里新增或恢复的经中间层单元触达。
     *
     * **键是 (归属 root, 裸名)**（单池后与单元表同构）：同名跨 scope（全局 + 项目级）
     * 各成一条，不再互相顶掉——旧直连账本按裸名键，同名只能活一个，那条限制随账本退役。
     * runtime 注入条目仍与 store 全局同名时**优先**（双轨合并，与 summary/catalogServersFor 同口径）。
     *
     * 同步方法（触达与释放都是同步发起 + 异步结算）；防重入（读取路径可并发）。
     * @returns {boolean} 连接集合是否变化（释放了在册连接，或触达了尚未在册的服务器）
     */
    reconcileServers(): boolean;
    startAll(): Promise<void>;
    /**
     * 启动一个服务器的连接（单池后唯一的连接路径）。
     *
     * 全部服务器都归中间层单元持有：项目级幂等触达当前项目单元，全局级触达 @global
     * 单元。startAll / add / update / reconcile / registerServer 各入口自动收敛，
     * 无需逐处特判。配置来源一律是宿主面 `projectServersFor(root)`（store + runtime
     * 注入并集），因此不再需要「config 直传」入参。
     *
     * #616 根因修复保留：项目级分支是幂等触达（projectUnitFor + 单台 ensureConnected），
     * 不是旧 touchMiddlewareUnit 的整单元拆毁——浮窗连接/断开任意服务器触发的
     * reconcile 不再把当前项目单元连人带连接整个拆掉。
     *
     * 中间层实例缺失（未经 apply 装配）时打 warn 并放弃：不退化成官方直装——那条
     * 并行路径已退役，硬装会在池不知情的情况下占住官方 serverName 活体预留。
     */
    start(name: string, scope?: string): void;
    /**
     * 触达 @global 单元并确保该全局服务器连接（start 的全局级路径）。
     * projectUnitFor 首次触达会连带惰性连接全部全局服务器，等价 startAll 语义；
     * userDisabled 命中不连（与浮窗断开语义一致）。
     */
    private touchGlobalUnit;
    /**
     * 幂等触达当前项目单元并确保该服务器连接（#616：start 的中间层项目级接管路径，
     * 取代旧 touchMiddlewareUnit 的整单元拆毁语义）。
     * - 单元缺失（宿主重启 / 首次 reconcile）：projectUnitFor 创建 + 惰性连接全部；
     * - 单元已存在（配置热重载 / 误触发的 reconcile）：保留既有连接，仅对**该**服务器
     *   ensureConnected（connected/connecting 短路，幂等）；
     * - entry 已存在但 store 配置已变（手工编辑 mcp.json 热重载）：force 单台重建——
     *   旧实现的配置生效来自整单元拆毁的副作用，此处改为精确到单台，不殃及同单元
     *   其他连接。
     * userDisabled 命中不连（与浮窗断开语义一致）；无活动项目 root 静默返回
     * （与旧 touchMiddlewareUnit 同口径）。
     */
    private ensureMiddlewareServer;
    /**
     * 拆除中间层池中该 server 的连接（update/remove 配置变更后强制重建；
     * 不写 userDisabled——与 disconnect 的禁用语义区分）。此前 update/remove 仅
     * 处理项目单元，@global 池连接与目录残留导致「已删服务器仍可调用」。
     */
    private dropMiddlewareConnection;
    /**
     * 运行时注册服务器（内存态，不落盘）。
     * 供其他插件经 ctx.mcpManager 注入（官方 storageDomain service 模式）。
     * - 同名已存在（store 或 runtime）：返回 { name, existing: true }，不抛错；
     * - 注册即连接（走 start 的 config 直传分支，同名 runtime 优先）；
     * - 串行队列防 reconcileBusy 吞注册；多插件并发注册排队。
     * @param options 注册入参；`toolDefinitions` 可选——提供时该服务器工具
     *   全部用调用方封装定义注册（supervisor 跳过远端 schema 投影，execute
     *   来自调用方；命名仍按 publicToolName 的 mcp__ 前缀规则）。
     */
    registerServer(options: Record<string, unknown>): Promise<{
        name: string;
        existing: boolean;
    }>;
    /**
     * 运行时注销（不影响 store 持久化条目；同名 store 条目回落）。
     * - **先删 runtimeRegistry 再拆中间层连接**（#413 QA P2-1）：drop 时数据源
     *   （projectServersFor 含 runtime）已不再返回该服务器，任何并发
     *   ensureConnected/connect 都查不到配置而无法重建虚拟连接——堵死注销后
     *   瞬时复活窗口，且不写 userDisabled（避免持久化污染导致同名 re-register
     *   被静默阻止连接，与 disconnect 的「用户主动断开」语义区分）；
     * - 拆中间层连接与目录条目（#413：runtime 条目在 @global 单元，须显式清理，
     *   否则 unregister 后 ws_mcp_list/call 残留幽灵）；
     * - reconcile 回落 store 配置。
     */
    unregisterServer(name: string): Promise<void>;
    add(server: Record<string, unknown>, scope?: string): Promise<ServerConfig>;
    update(name: string, patch: Record<string, unknown>, scope?: string, cwd?: string): Promise<ServerConfig>;
    private storeForRoot;
    private reserveUpdate;
    private ownsUpdate;
    private cancelDisabledUpdate;
    private startUpdatedServer;
    remove(name: string, scope?: string, cwd?: string): Promise<void>;
    /**
     * 显式连接（浮窗「连接」/ 宿主 API）：解除 userDisabled + force 受控重建。
     *
     * 单池后只有一条路径——中间层单元：按 scope 定位 root 单元、清 userDisabled、
     * force 重建该连接。#412：force 是必需的——entry 可能半开卡在 connected，
     * ensureConnected 的 connected 短路会让显式「连接」看起来无效。
     */
    connect(name: string, scope?: string): Promise<void>;
    /**
     * 显式断开（浮窗「断开」/ 宿主 API）：写 userDisabled + 拆池内连接。
     *
     * 定位（单池后只剩池这一侧）：
     * - scope=project → 当前项目 root 单元（#392：避免同名全局服务器把项目级断开错写进 @global）；
     * - 全局配置（store，非 runtime）→ @global 单元（#382：不按 units 遍历序猜）；
     * - 其余（runtime 注入等）→ 遍历命中该条目的单元。
     * 前置约束（#770-11 C/A 相）：无 scope 同名调用仍按上法定 @global，而目录
     * （catalogServersFor）同名取项目——两者分叉；无 scope 调用方须显式传 scope
     * （#392 同式），本相不动 API 缺省（路由层缺 scope 即归一化为 global）。
     * 拆除只发起不等结算（裁定 V）：官方 dispose 会等在途首连，挂死的服务器能把它拖到 SDK 的 60s 超时。
     */
    disconnect(name: string, scope?: string): Promise<void>;
    reconnect(name: string, scope?: string): Promise<void>;
    /** 面板数据：配置 + 实时状态 + 工具列表 + 项目信息。 */
    summary(): Record<string, unknown>;
    summaryForCwd(cwd: string): Promise<Record<string, unknown>>;
    summaryForRoot(root: string): Record<string, unknown>;
    private summaryStoreForRoot;
    /**
     * 投影单元：该 (server, scope) 归属的中间层单元。单池后全部条目都在池里，
     * 只剩「单元还没建出来 / 无项目 root」这两种缺失。
     */
    private middlewareUnitFor;
    summarize(server: ServerConfig, scope: string): Record<string, unknown>;
    summarizeForRoot(server: ServerConfig, scope: string, root: string): Record<string, unknown>;
    private httpSummary;
    dispose(): Promise<void>;
}
export {};
