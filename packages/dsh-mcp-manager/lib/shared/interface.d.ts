/**
 * dsh-mcp-manager — shared/interface.ts：跨端层门面（D5，#767 B1）。
 *
 * shared 域是两端唯一的跨端语言落点：浮窗定位/层级/断点纯函数（placement-math）、
 * 六态键与计数投影（status）、SSE 帧名与负载形状（frames）、路由路径与围栏（routes）、
 * scope 与全局虚拟 root 契约常量（constants）、跨端 DTO 形状（dto）与服务类型（service）。
 * 宿主端与客户端都从这里引用同一份物理定义——凡「两端必须一致」的规范常量不得在别处
 * 再写一遍（一致性锁 test/e2e/cross-end-lock.test.ts 判红）。
 * 目录外模块**只能**从这里引用（verify-dir-imports 静态强制）。
 */
export { DEFAULT_Z_INDEX_BASE, Z_INDEX_BASE_MIN, Z_INDEX_BASE_MAX, Z_INDEX_PANEL_DELTA, BREAKPOINT_NARROW_MAX, BREAKPOINT_TABLET_MAX, clampZIndexBase, breakpointForWidth, clampPointToViewport, composerDockedAtBottom, bottomAnchorEdge, panelZIndexFor, panelTopForAnchor, } from "./placement-math.js";
export { panelAnchorForPosition } from "./placement-math.js";
export type { FloatBreakpoint, ViewportPoint, RectLike } from "./placement-math.js";
export { SERVER_STATES, EMPTY_STATUS_COUNTS } from "./status.js";
export type { ServerState } from "./status.js";
export { SSE_FRAMES } from "./frames.js";
export type { SseFrame, SseFramePayload } from "./frames.js";
export { ROUTES, ROUTE_FENCE } from "./routes.js";
export type { RouteName, RouteFence } from "./routes.js";
export { MIDDLEWARE_GLOBAL_ROOT, MCP_MANAGER_IDENTITY, SCOPE_GLOBAL, SCOPE_PROJECT, } from "./constants.js";
export type { McpServerSummary, McpServerListEntry, ClientUiConfig } from "./dto.js";
export type { McpManagerServerInput, McpManagerService, McpScope, McpServerStatus, McpToolInfo, } from "./service.js";
