/**
 * dsh-mcp-manager — 客户端「服务器列表页」渲染。
 *
 * 按状态分级展示服务器卡片（端点 / 错误 / 工具列表 / 操作按钮）。
 * 跨模块动作（refresh / resetForm / beginEdit）经 actions 注入，不直接引用
 * panel/quick-add 模块，避免循环依赖。
 */
import type { McpServerListEntry, McpState, UiActions } from "../core/state.js";
/** 服务器端点摘要：streamable-http 显示 URL，stdio 显示 command + args。 */
export declare function endpointOf(server: McpServerListEntry): string;
/** 操作按钮（统一失败提示）。 */
export declare function actionButton(label: string, onClick: () => void | Promise<void>, primary?: boolean, danger?: boolean): HTMLElement;
/** 工具折叠组：interactive 出 checkbox（可逐个禁用），否则出纯文本工具名。 */
export declare function serverToolsDetails(server: McpServerListEntry, toolCount: number, opts: {
    tools: boolean;
    openTools?: Set<string>;
}, state: McpState, actions: UiActions, interactive: boolean): HTMLElement;
/** 一个操作按钮的规格（label / 主按钮样式 / 执行体）。 */
interface ActionSpec {
    label: string;
    primary: boolean;
    danger?: boolean;
    run: () => void | Promise<void>;
}
/** JSON 写请求 init（PATCH enabled 用；形态与 quick-add 同款）。 */
export declare function jsonPatchInit(enabled: boolean): {
    method: "PATCH";
    headers: Record<string, string>;
    body: string;
};
/** POST 后刷新（连接/断开/重连三个动作的执行体同式）。 */
export declare function postThenRefresh(state: McpState, actions: UiActions, url: string): () => Promise<void>;
/** 状态动作：connected → 断开 + 重连；disabled → 启用并连接；其余 → 连接。 */
export declare function statusActions(server: McpServerListEntry, state: McpState, actions: UiActions, scopeQuery: string, cwdQuery: string): ActionSpec[];
/** 禁用动作（非 disabled 行才有）：PATCH 后若正在编辑该条目则重置表单。 */
export declare function disableAction(server: McpServerListEntry, state: McpState, actions: UiActions, scopeQuery: string, cwdQuery: string): ActionSpec;
/** 删除动作：先确认（未确认即中止），DELETE 后若正在编辑该条目则重置表单。 */
export declare function deleteAction(server: McpServerListEntry, state: McpState, actions: UiActions, scopeQuery: string): ActionSpec;
/** 需要置顶提醒的服务器（失败 + 重连中）。 */
export declare function needsAttention(server: McpServerListEntry): boolean;
/** 按状态分桶（桶序 = STATUS_ORDER；未知状态归 stopped 桶，不丢行）。 */
export declare function bucketByStatus(list: McpServerListEntry[]): Map<string, McpServerListEntry[]>;
/** 卡片根类名：失败 / 重连中加 --fail 修饰。 */
export declare function serverCardClass(server: McpServerListEntry): string;
/** 卡片头部：名称 / transport 徽标 / scope 徽标 / 状态徽标 / 工具计数。 */
export declare function serverCardHeader(server: McpServerListEntry, toolCount: number): HTMLElement;
/** 渲染单台服务器卡片。 */
export declare function renderServer(server: McpServerListEntry, state: McpState, actions: UiActions, opts?: {
    tools: boolean;
    openTools?: Set<string>;
}): HTMLElement;
/** 渲染服务器列表页（#362 交互拍板 1a：项目级 / 全局级两大分组，各自内部再按状态）。
 * 单池（#767）后两大分组的服务器都经中间层，工具 checkbox 一律可用。 */
export declare function renderServers(state: McpState, actions: UiActions): void;
export {};
