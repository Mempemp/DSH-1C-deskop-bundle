/**
 * dsh-mcp-manager — 中间层（工作空间 MCP 路由）。
 *
 * 模型面恒定两个工具（ws_mcp_search / ws_mcp_call），执行时按调用方会话
 * 当前 cwd（agent.session.header.cwd，实证已闭合）路由到对应工作空间的
 * MCP 连接池，实现「不同工作空间注入不同 MCP、无命名冲突」：
 * - 连接池：每工作空间一套常驻连接（惰性连接 + 超时 + LRU 淘汰）；
 * - 目录：每工作空间 ToolCatalog（惰性发现 + last-good 磁盘缓存 + 检索）；
 * - 容错：normalizeToolName / normalizeArguments / msgOf / createRedactor。
 *
 * 单池（#767 笔 1a/笔 2）：全部服务器一律经中间层单元触达；配置里已无模式键
 * （`mcp__*` 也不再在模型可见面），故本文不再有任何模式分支。
 *
 * 阶段 6 集中搬移：本文件归 connection/runtime/（中间层池），仅保留
 * McpMiddleware 类；原汇聚转发块删除（v3 §二：汇聚只留 src/index.ts）。
 *
 * #767 S1-3a：ws_mcp_call 执行路径（callTool 与 hostRedact）已迁 servers/dispatch 域，
 * callTool 缩成转发壳——执行器经 runtimePorts 的 dispatch 端口取，单元/禁用表仍由本类持有，
 * 脱敏源由宿主经 MiddlewareHost.redactionServers 同步供给（#770-8，本类不拼全集）。
 *
 * #767 S1-4d：连接栈换成官方 @deepseek-ai/dsh-mcp-client。本类不再自建 transport / client，
 * 也不再自己排重连与防双进程探测——装载、拆卸与六态投影一律经 runtimePorts 的 lifecycle 端口
 * 交还 servers/lifecycle 的账本（官方 serverName 在应用根上活体预留，同 id 未释放就重挂当场抛）。
 * 目录仍按 `ctx.tools.schemas()` 里 `mcp__<id>__` 前缀投影（裁定 W/K）；远端执行经
 * servers/dispatch 从宿主 loader 取得公开 `ToolExecutionPipeline`，并保留完整
 * `ToolRunContext` identity。
 *
 * W8 端口接线：跨域能力（catalog 新鲜判定与装箱、pipeline 投影/超时/取消息/脱敏/参数归一/
 * 策略裁决、workspace 全名解析与拼装、lifecycle 装载/拆卸/投影）一律经 `impl/service` 的
 * `runtimePorts.get()` 取；server/shared 的公名派生与同子层 limits 直取，跨端层 shared 的
 * MIDDLEWARE_GLOBAL_ROOT 经共享门面取，不占端口——端口只承载跨域能力。
 */
import type { ToolExecutionInput, ToolExecutionResult, ToolExecutionToken, ToolRunContext } from "@deepseek-ai/dsh-tools";
import type { ServerConfig } from "../../config/interface.js";
import { type ServerState } from "../../../shared/interface.js";
import type { SchemaView } from "../../catalog/interface.js";
import type { MiddlewareHost } from "./deps.js";
import type { ProjectUnit, ConnectionEntry } from "./impl/middleware/type.js";
import type { DisabledToolsMap } from "../../store/interface.js";
type NestedModelContent = Extract<ToolExecutionResult, {
    isError: false;
}>["content"];
/** 远端装载的宿主能力面（调用点在类内现造闭包，私有读口不出类）。 */
interface MountRemoteFaces {
    host: MiddlewareHost;
    registeredSchemas(): SchemaView;
    registeredToolMeta(id: string): Map<string, {
        description?: unknown;
    }>;
    redact(error: unknown): string;
}
/**
 * connected 结算的副作用：注册面 → 目录投影 + B 层摘要缓存 + info 日志。
 * 与 failed 分支同为「结算副作用」但成因与产出不同，故各自成函数。
 *
 * 模块函数而非私有方法：理由同 mountRemoteServer（导出面零 diff）。 */
export declare function projectConnectedCatalog(root: string, serverName: string, id: string, faces: MountRemoteFaces): Promise<void>;
/**
 * 非 force 时的状态短路：connected / connecting / reconnecting 都不再进（裁定 U）。
 * reconnecting 同样不进——官方自己在退避重连，我方重挂会撞同一 id 的 serverName
 * 活体预留（实测 §2.9-16）。force（用户显式「连接」/切回前台恢复）忽略当前状态
 * 总是受控重建——修半开死连接卡在 connected 后 connect/refresh 均短路失效（#412）。
 */
export declare function shortCircuitsOnState(state: ServerState | undefined, force: boolean): boolean;
/**
 * 重建前拆旧代际并**等**结算（裁定 V）：官方 serverName 是整个应用根的活体预留，
 * 同 id 未释放就重挂当场抛。虚拟单元（toolDefinitions）没有官方实例：不进账本也不置
 * 废弃位——它的重建语义由 wrapped 分支的同状态短路决定（#413 原语义）。
 */
export declare function disposePreviousGeneration(entry: ConnectionEntry | undefined, disposeServer: (id: string) => unknown): Promise<void>;
/** 可连接的服务器配置：缺省（未在册）或已启用=false 即 undefined。 */
export declare function connectableServer(servers: ServerConfig[] | undefined, serverName: string): ServerConfig | undefined;
/**
 * 虚拟连接单元（toolDefinitions，从不挂官方实例）的六态：
 * 禁用 → disabled；已拆 → stopped；其余 → connected（#413「虚拟连接即 connected」
 * 是既有契约）。进官方投影只会让「无 id / 无句柄」这些与它无关的输入面参与裁决。
 */
export declare function virtualUnitState(entry: ConnectionEntry, userDisabled: boolean): ServerState;
/**
 * 中间层：工作空间 MCP 连接池 + 目录 + 路由执行。
 * 一个实例服务所有工作空间（projectUnits: Map<root, ProjectUnit>）。
 */
export declare class McpMiddleware {
    host: MiddlewareHost;
    /** root（realpath 归一化）→ 工作空间单元。 */
    units: Map<string, ProjectUnit>;
    /** 用户禁用映射（root → Set<server>），单元创建时合并。 */
    disabledByRoot: Map<string, Set<string>>;
    /** 工具级禁用（root → server → Set<tool>；root=@global 跨工作空间共享）。 */
    disabledTools: DisabledToolsMap;
    /**
     * 在飞的转发子调用登记表：我方 dispatch 经公开 nested `ToolExecutionPipeline` 派出去的
     * 子调用，其 `parent` 就是这次外层调用的 token，派发前登记、结算后注销（try/finally）。
     * pre-execute guard 只按发起者放行（裁定 R/Z）——集合外的一律走工具级裁决，
     * 模型直呼不会因为名字像就被放行。集合随实例消亡，热切换重建中间层即清空。
     */
    forwarding: Set<ToolExecutionToken>;
    constructor(host: MiddlewareHost);
    /** 读取/创建 root 的单元（root 无项目标记 → undefined）。
     *
     *  #1168 窗口 B（并发初始化去重）：先查在飞 init，再决定要不要建单元——同根的并发
     *  首次调用共享同一个 init 任务（同一代单元），不再各建一份（后写覆盖先写）。init 在
     *  **配置读取开始前**就同步占位（Promise.resolve().then 把真正工作推迟一拍，但登记
     *  在同一同步段完成），堵住「两个调用都越过 units.get 判空」的窗口。
     *
     *  init 何时 resolve：目录缓存（last-good）已载入、且 enabled 连接的 in-flight 任务已
     *  登记之后——不等远端连接本身（连接是 fire-and-forget）。于是并发首次读拿到的一定是
     *  已完成目录载入的完整单元，而不是半初始化对象。
     */
    projectUnitFor(root: string | undefined): Promise<ProjectUnit | undefined>;
    /** 连接一个服务器（in-flight 去重；失败后台重连）。
     * @param opts.force 用户显式连接（浮窗「连接」/切回前台恢复）时 true：忽略
     *  entry 当前状态（含半开卡在 connected 的死连接），总是受控重建；惰性/重试
     *  路径缺省 false，保持「已 connected 则短路」防重复建连。
     */
    ensureConnected(root: string, serverName: string, opts?: {
        force?: boolean;
    }): Promise<void>;
    /** 废弃某服务器跨全部单元的在途建连标记。
     *  不变式：in-flight 去重只对「存活 entry 的重复建连」有意义——entry 被强制
     *  拆除（remove/update/disconnect）时，同名旧 attempt 可能仍 pending（装载等待窗口
     *  在预算内不返回），残留标记会把后续 ensureConnected（含 force 的用户显式「连接」）
     *  全部吞掉，且旧 attempt 收敛时命中让位/disposed 守卫静默返回、无人补连 → 这段时间内
     *  该服务器无法重连。拆除时必须同步废弃标记；旧 attempt 稍后收敛由 connectInternal
     *  的让位/disposed 守卫兜底，无副作用。 */
    abandonInFlight(serverName: string): void;
    private connectInternal;
    /**
     * 装载面：注册面视图 / 工具元信息 / 脱敏都是本类方法的转发，形状与调用点无关——
     * 建连结算与 #1014 B7b 的重投影共用同一份，故抽成一处。
     */
    private mountFaces;
    /**
     * 重投影全部在册连接的目录（#1014 B7b）：tools/change 的失效消费口。
     *
     * 为什么按 server diff 而不是无脑全刷：宿主 tools/change **无载荷**（原话「故意不做作用域
     * 过滤」），且本包 visibility 的 restrict 自身也会发它——无条件全刷会把连接翻转期的
     * 事件密度直接转成落盘密度。故这里扫一遍注册面、按 `mcp__<id>__` 前缀与现有目录条目逐台
     * 比对，只对**确实变了**的 server 登记失效并重投影。
     *
     * 「变了」的判定是**内容指纹**（裸名 + description + inputSchema）相等性：目录条目丢过
     * unavailable 的一律视为变了（它已经不是可信快照，得靠一次成功投影重建）。
     *
     * 并发语义（复核后定为**不做在途合并**）：宿主 tools/change 无载荷、无序列化，且本包
     * visibility 的 restrict 自身也发它，一次变更至少两次并发进来。实测过「在途合并」——它
     * 挡不住本场景（首次调用在第一个 await 之前已同步写完目录，第二次是被内容比对挡下的），
     * 且引入了更坏的后果：在途期间内容再变时，第二次被静默跳过又无补偿事件，目录会**一直**
     * 停在旧内容直到下一次变化或 TTL 到期。丢更新比「两次落盘可能乱序」更难自愈，故不做合并。
     * 残留：两次并发投影的落盘可能乱序，磁盘 last-good 短暂落后于内存态；内存态是权威读面，
     * 且下一次投影会覆盖落盘，故按可自愈的已知残留登记，不另加状态面。
     */
    reprojectCatalogs(): Promise<void>;
    /**
     * 注册面读口：取不到/非数组一律当空——投影与六态投影都不许因为读不到注册表而阻塞。
     * 视图本身是宿主能力（入参契约），本层现取后按值递给 catalog 域的投影与读口。
     */
    private registeredSchemas;
    /** 注册面 → 注册名→描述 表（B 层摘要缓存的数据源；与目录投影同一次前缀过滤口径）。 */
    private registeredToolMeta;
    /** 凭据脱敏（连接/发现/调用错误路径统一使用；#770-8 经宿主全集快照，与 manager/dispatch 同源）。 */
    private redact;
    /**
     * 读时刷新的六态投影（裁定 U）：域外读点（manager.summarize）与重建短路都从这里取状态，
     * 不再直接读 `entry.status`。为什么必须刷新：官方不暴露状态 API，而「曾连上、工具前缀消失」
     * 只在读的这一刻才可判——不重算，GUI 会永远停在陈旧的 connected（设计 §3.1/§3.3）。
     */
    statusOf(root: string, serverName: string): ServerState | undefined;
    /**
     * health 顶层 `tools` 计数的聚合读口（#767 笔 1a）：该 (root, server) 目录投影里的
     * 工具条数。与 `summary().tools` / 目录读口同源（裸名条数即注册名条数）。
     */
    toolCountOf(root: string, serverName: string): number;
    /**
     * 执行 ws_mcp_call。本片（#767 S1-3a）起只是转发壳：路由校验、策略裁决、两条执行分支与
     * 结果投影在 servers/dispatch 域（impl/call 的 executeMcpCall），中间层仍持有单元表、
     * 策略与**转发登记表**，经显式入参按引用递入——不落第二份事实源。脱敏源不由本类持有，
     * 经宿主 redactionServers 快照转供（#770-8，与 manager.redactError 同一秘密源）。
     *
     * @param identity 调用方身份（`ToolRunContext` 里 dispatch 真正需要的字段）。为什么不是
     *   单个 agent：转发改道后 dispatch 要合成子调用 id 并透传 parent（裁定 R/Y/Z），而
     *   `parent` 同时是「这次调用出自我方转发」的标识——guard 只放行同时登记过的发起者。
     */
    callTool(fullName: string, toolRaw: string, rawArgs: unknown, signal: AbortSignal | undefined, identity: {
        agent?: unknown;
        callId: ToolExecutionInput["callId"];
        rootCallId?: ToolExecutionInput["rootCallId"];
        parent?: ToolExecutionToken;
        toolSet?: ToolRunContext["toolSet"];
        deferContext?: ToolRunContext["deferContext"];
        concludeTurn?: ToolRunContext["concludeTurn"];
        onModelContent?: (content: NestedModelContent) => void;
    }): Promise<unknown>;
    /**
     * 拆掉一个 (root, server) 的连接（裁定 X）：换引擎后**账本化拆除的唯一落点**，
     * disconnect / remove / update / unregister / evict / 插件卸载共用。
     *
     * 只**发起** release、不等结算（裁定 V）：拆除是同步语义，而官方 dispose 会等在途首连
     * （挂死的服务器能等到 SDK 的 60s）；要等结算的重建路径走 connectInternal 的 disposeServer。
     *
     * @returns 是否真的拆掉了在册条目（调用方据此决定要不要广播状态）。
     */
    releaseConnection(root: string, serverName: string): boolean;
    /** LRU 淘汰：无活动引用（lastTouchedAt 最旧）且超过上限时淘汰最旧单元。
     * @global 单元豁免（#382 F3）：全局服务器常连语义不随多项目切换被淘汰
     * （supervisor 时代全局永不淘汰，池接管后需显式豁免保持等价语义）。 */
    evictIfNeeded(maxUnits?: number): void;
    /** 拆毁一个单元（逐条走账本拆除，保留目录缓存）。 */
    teardownUnit(root: string): void;
    /** 全部拆毁（插件卸载）。保持同步体：组合根的卸载链依赖这里同步摘账。 */
    dispose(): Promise<void>;
}
export {};
