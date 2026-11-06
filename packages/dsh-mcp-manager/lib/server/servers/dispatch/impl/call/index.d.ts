/**
 * dsh-mcp-manager — servers/dispatch/impl/call/index.ts：ws_mcp_call 执行器（原
 * connection/runtime/middleware.ts:583-772 的搬迁；路由/封装分支与错误文案口径不变）。
 *
 * 远端分支的 0.2.2-rc.1 路径：经 `ctx.loader.import` 取得宿主公开的 nested
 * `ToolExecutionPipeline`，以精确注册名与受控 source 合成子调用，并保留真实
 * agent / toolSet / rootCallId / parent / signal。官方结果的 `value` 继续喂既有投影；
 * nested definition 已物化的图片内容优先复用，缺少物化信号时才回落到 A+ 诊断准入。
 *
 * 为什么全部入参显式化：原实现依赖 McpMiddleware 的 this（units / disabledTools /
 * allServers / 转发登记表），搬进新域后这些状态仍归中间层持有，只能按引用递入；本域不落第二份。
 */
import type { Context } from "@deepseek-ai/cordis";
import type { ToolDefinition, ToolExecutionInput, ToolExecutionResult, ToolRunContext } from "@deepseek-ai/dsh-tools";
import type { ServerState } from "../../../../../shared/interface.js";
import type { DispatchCallInput, ToolExecutionResultLike } from "../../deps.js";
type NestedModelContent = Extract<ToolExecutionResult, {
    isError: false;
}>["content"];
export interface NestedExecutionHooks {
    deferContext?: ToolRunContext["deferContext"];
    concludeTurn?: ToolRunContext["concludeTurn"];
    /** 本次 nested dispatch 的 opaque parent 仍在中间层转发登记表中。 */
    isParentActive?: () => boolean;
    /** 官方 definition 已持久化并物化的模型面内容；只在对应外层执行仍存活时交回。 */
    onModelContent?: (content: NestedModelContent) => void;
}
/** 旧导出签名里的 agent 是 unknown；执行域只接受可承载运行时身份的对象。 */
export declare function nestedExecutionAgent(value: unknown): NonNullable<ToolExecutionInput["agent"]> | undefined;
/** 完成一次共享生命周期调用，并把嵌套结果附加的上下文/结束语义交还外层执行。 */
export declare function executeNestedTool(ctx: Context, input: ToolExecutionInput, hooks: NestedExecutionHooks): Promise<ToolExecutionResultLike>;
/** dispatch 域的连接条目（经 input.units 取值，不另持连接表；结构约束写法——
 * 直接索引泛型 U 会 TS2536，故先收窄到含 connections 形态再取）。 */
type CallEntry = DispatchCallInput["units"] extends ReadonlyMap<string, infer U> ? U extends {
    connections: Map<string, infer V>;
} ? V : never : never;
/** 远端子调用入参：合成 callId，并完整保留调用者 nested pipeline identity。 */
export declare function remoteExecutionInput(input: DispatchCallInput, id: string, tool: string, args: unknown): ToolExecutionInput;
/** 未就绪三归因（次序承重）：用户禁用 > 后台重连中 > 其余未就绪。 */
export declare function notReadyError(fullName: string, status: ServerState | undefined, userDisabled: boolean): Error;
/** 条目就绪裁决：可派发则带条目返回，否则带该情形的错误。 */
type ReadinessVerdict = {
    ready: true;
    entry: CallEntry;
} | {
    ready: false;
    error: Error;
};
/**
 * 就绪裁决（B4 连带：六态补 reconnecting 后守卫须把「后台重连中」纳入未就绪——
 * 否则退避窗口内会照常派发，而该代际的工具面已不可信）。
 */
export declare function judgeEntryReadiness(fullName: string, server: string, userDisabled: boolean, entry: CallEntry | undefined): ReadinessVerdict;
/**
 * 封装 execute 的最小 exec 面：契约要完整 ToolRunContext，中间层只能给最小面
 * （agent 透传，session cwd 解析用）——经 unknown 中转（消费方封装定义只读 exec.agent）。
 */
export declare function wrappedExecContext(input: DispatchCallInput): Parameters<NonNullable<ToolDefinition["execute"]>>[1];
/** 封装结果投影：有 output.render 走渲染，否则按字符串/JSON 文本兜底。 */
export declare function wrappedContent(def: ToolDefinition, args: unknown, value: unknown): {
    type: string;
    text: string;
}[] | import("@deepseek-ai/dsh-llm").ContentBlock[];
/** 执行一次 ws_mcp_call：路由一致性校验 → 策略裁决 → 封装直呼 / 远端转发两条分支。 */
export declare function executeMcpCall(input: DispatchCallInput): Promise<unknown>;
export {};
