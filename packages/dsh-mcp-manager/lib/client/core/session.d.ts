/**
 * dsh-mcp-manager — 客户端会话跟随。
 *
 * 监听当前会话变化（cwd），通知宿主切换项目级 MCP 并刷新 UI。
 * 跨模块动作（refresh）经 actions 注入，不直接引用 panel 模块。
 *
 * #1028：当前会话读数一律经 core/current-session.ts 单一接缝，本模块只负责
 * 「读数 → 上报策略」。核心纪律：**未知 ≠ 无项目**。读不到当前会话时保持宿主
 * 绑定不动（旧实现上报 `cwd:""`，被宿主当作显式清空，面板空白 + 导入报错）。
 */
import type { McpClientContext, McpState, UiActions } from "./state.js";
/**
 * 强制重绑当前会话（绕过 bindSession 的 cwd 未变短路）。
 *
 * #412 复报根因：宿主 dsh web 重启后 `projectRoot`/中间层单元清空，而旧页面
 * 未重载时 bindSession 不重跑（cwd 未变），`visibilitychange → resume` 只重建
 * @global、项目级连接无法恢复。切回前台显式重发 POST /session（同 cwd）让宿主
 * `setSession` 恢复 projectRoot + `projectUnitFor` 惰性连接；宿主幂等短路
 * （同 cwd 且 projectStore 已加载）天然挡重复，无副作用、不引 #324 自激循环
 * （GET /servers 纯读不回写会话）。
 *
 * #1028：`sessionResolved` 为 false（**未知**当前会话）时**不发**请求。
 * 「重绑」的前提是知道要绑到哪；不知道时重发 `cwd:""` 不是重绑，是清空。
 */
export declare function rebindSession(state: McpState): Promise<unknown>;
/** 跟随当前会话：cwd 变化 → 通知宿主切换项目级 MCP + 刷新浮窗。 */
export declare function bindSession(ctx: McpClientContext, state: McpState, actions: UiActions): () => void;
