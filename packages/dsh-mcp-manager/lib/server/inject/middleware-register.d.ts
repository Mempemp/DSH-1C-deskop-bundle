/**
 * dsh-mcp-manager — 中间层工具注册（ws_mcp_search / ws_mcp_call /
 * ws_mcp_list / ws_mcp_detail + 策略 guard）。
 *
 * 注册四个中间层工具与工具级禁用 guard 层；类型面自各域门面（store/interface.ts 的
 * DisabledToolsMap）与 stats/interface.ts（McpStatsCollector）取，连接池类
 * McpMiddleware 自
 * connection/runtime/interface.ts 只作 `import type`（防运行值环）。跨域取数一律经
 * `injectPorts.get()`（端口声明见 ../deps.ts）——catalog 检索族、pipeline
 * 裁决族与超时兜底、workspace 全名解析，本文件对四个提供域没有值 import。外层调用超时
 * 不再读 runtime 限额口（#935）：组合根按全量源现算经 options.callTimeoutMs 递入。跨端契约常量
 * MIDDLEWARE_GLOBAL_ROOT 与值常量 LIST_DEFAULT_TOOLS_PER_SERVER 直接取自共享层门面（W3b 迁移）。
 * 全局可见性（评审 A）：search/list/detail 恒合并查询「项目 root 单元 + @global 单元」；
 * call 放行 @global root。单池（#767 笔 1a/笔 2）后没有模式分支。
 */
import type { Context } from "@deepseek-ai/cordis";
import type { ToolExecution } from "@deepseek-ai/dsh-tools";
import type { McpMiddleware, ProjectUnit } from "../connection/runtime/interface.js";
import type { ModelContentBlock } from "../shared/interface.js";
import type { McpStatsCollector } from "../stats/interface.js";
import type { DisabledToolsMap } from "../store/interface.js";
import { type ImageAdmissionFaces } from "./impl/image-admission/index.js";
/** 工具执行与组装上下文。 */
interface MiddlewareToolContext {
    mw: McpMiddleware;
    resolveRoot: (agent: unknown) => Promise<string | undefined>;
    stats?: McpStatsCollector;
    /**
     * A+ 图片准入的模型面投影表。键是**本次 exec 对象身份**（宿主在 `execute` 与
     * `finalizeContent` 之间递的是同一个对象，官方也以它做 WeakMap 键）——不用模块级单例，
     * 并发调用之间不会串投影。
     */
    projections: WeakMap<ToolExecution, ModelContentBlock[]>;
    /** 图片准入要用的宿主能力（晚读 thunk）；接线点省略时退化成纯诊断（不抛）。 */
    faces: ImageAdmissionFaces;
}
/** 调用前置校验：解析 server 全名、校验路由一致性、定位目标单元（任一环不可达即抛）。 */
export declare function assertCallableTarget(toolCtx: MiddlewareToolContext, server: string, root: string): Promise<{
    parsed: {
        root: string;
        server: string;
    };
    unit: ProjectUnit;
}>;
/** 调用成功出口的统计记账（未启用统计即无操作）。 */
export declare function recordCallOk(toolCtx: MiddlewareToolContext, server: string, tool: string, startTime: number): void;
/** 调用失败出口的统计记账（错因先脱敏，见 redactedStatsError）。 */
export declare function recordCallFailed(toolCtx: MiddlewareToolContext, server: string, tool: string, startTime: number, error: unknown): void;
/**
 * 注册名中段 → (root, 裸名) 的反查面。
 *
 * 为什么按入参递入而不是本域自己查：注册名自 #767 S1-4d 换引擎起是 `mcp__<id>__`，id 由
 * (root, name) 分配、只有持账本的一侧知道（池侧是单元表的 entry.id，直连侧是 manager 的
 * 直连账本）。本域若自己 import 那两个域就是新增跨域值边（I2① 硬红），故按调用点入参契约
 * 递进——与既有的 `resolveRoot` 同一形态。
 */
type ServerIdResolver = (id: string) => {
    root: string;
    server: string;
} | undefined;
/** 注册名 `mcp__<id>__<tool>` → (id 段, 工具裸名)；无 `__` 或空工具名 → undefined（不归本守卫管）。 */
export declare function splitRegisteredName(name: string): {
    segment: string;
    tool: string;
} | undefined;
/**
 * id 反解（#767 S1-5b 裁定 AG③ / S1-4d 遗留缺口）：注册名中段是 (root, name) 分配的 id，
 * 不是裸服务器名——不反解就把它当 server 名查禁用表，工具级禁用对直呼路径**恒 miss**。
 * 反查不到时按裸名解释：未登记 id 的注册面（旧形态名、测试注入的假条目）口径不变。
 */
export declare function resolveRegisteredTarget(agent: unknown, segment: string, resolveRoot: (agent: unknown) => Promise<string | undefined>, resolveServerId: ServerIdResolver | undefined): Promise<{
    server: string;
    root: string | undefined;
}>;
/** @global 共享禁用记录命中判定（root 解析不出时的最宽可见面）。 */
export declare function globalScopeToolDisabled(disabledTools: DisabledToolsMap | undefined, server: string, tool: string): boolean;
/**
 * 注册 ws_mcp_search / ws_mcp_call / ws_mcp_list / ws_mcp_detail 四个中间层工具。
 * @param ctx Cordis 宿主上下文。
 * @param mw 中间层实例。
 * @param resolveRoot 路由：exec.agent → 归一化项目根（agent-less → undefined）。
 * @param options 可选配置（支持传入自定义工具级禁用表）。
 *
 * 单池（#767 笔 1a）：不再接受模式入参——可见单元集合恒为「项目 root + @global」；
 * `ws_mcp_list` 的输出里没有模式字段（笔 2 随 `middleware` 配置键一并删除）。
 */
export declare function registerMiddlewareTools(ctx: Context, mw: McpMiddleware, resolveRoot: (agent: unknown) => Promise<string | undefined>, options?: {
    /** 工具级禁用映射（root → server → Set<tool>）；缺省取 mw.disabledTools。 */
    disabledTools?: DisabledToolsMap;
    /** 可选调用统计收集器。 */
    stats?: McpStatsCollector;
    /**
     * id → (root, 裸名) 反查面（可选）。装配点递入 manager 账本的反查：只靠池侧反查
     * 会把 id 当裸名、工具级禁用对直呼路径恒 miss。
     * 给出时优先，未命中回落池侧反查（`resolveServerIdFor`）。
     */
    resolveServerId?: ServerIdResolver;
    /**
     * 外层 `ws_mcp_call` 注册超时（#935）：组合根按在用全量源现算（纯函数
     * `resolveMiddlewareCallTimeoutMs`）后递入。省略（旧调用点/夹具）时按空集回落
     * （缺省 15s + 25s 内部尾 = 40s），行为与旧缺省可调用性一致。
     */
    callTimeoutMs?: number;
}, 
/**
 * 图片准入要用的宿主能力面（`faces.attachments` / `faces.models` 两条**晚读** thunk）。
 *
 * **为什么是 options 之后的第 5 个位置参数，而不是 options 袋里的一个键**：导出面快照按
 * 「顶层 `export declare` 块」比对，而块提取器在第一个深度 0 的 `}` 处截断（见
 * `registerDirectMcpGuard` 的同款说明）——#935 起袋里新增 `callTimeoutMs` 已 intentional
 * 更新基线一次，faces 仍保持位置参数、不再动声明块。省略时退化成纯诊断（不落图）。
 */
faces?: ImageAdmissionFaces): () => void;
export {};
