/**
 * dsh-mcp-manager — servers/dispatch/impl/call/index.ts：ws_mcp_call 执行器（原
 * connection/runtime/middleware.ts:583-772 的搬迁；路由/封装分支与错误文案口径不变）。
 *
 * 为什么远端分支走 ctx.tools.execute（#767 S1-4d）：换引擎后官方运行时只导出
 * `Config / apply / inject / name`，底层 client 不外露，「拿一个 client 去 callTool」这条路
 * 不再存在。转发按设计 §5.3：合成子调用 id、透传 parent、喂 `value` 给既有投影。
 *
 * 为什么全部入参显式化：原实现依赖 McpMiddleware 的 this（units / disabledTools /
 * allServers / 转发登记表），搬进新域后这些状态仍归中间层持有，只能按引用递入；本域不落第二份。
 */
import type { ToolDefinition, ToolExecutionInput } from "@deepseek-ai/dsh-tools";
import type { ServerState } from "../../../../../shared/interface.js";
import type { DispatchCallInput } from "../../deps.js";
/** dispatch 域的连接条目（经 input.units 取值，不另持连接表；结构约束写法——
 * 直接索引泛型 U 会 TS2536，故先收窄到含 connections 形态再取）。 */
type CallEntry = DispatchCallInput["units"] extends ReadonlyMap<string, infer U> ? U extends {
    connections: Map<string, infer V>;
} ? V : never : never;
/** 远端子调用入参：合成 callId、透传可选字段，并**不带 agent**。 */
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
