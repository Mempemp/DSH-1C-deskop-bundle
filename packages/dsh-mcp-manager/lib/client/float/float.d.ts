/**
 * dsh-mcp-manager — 客户端右上角浮窗。
 *
 * 浮窗胶囊（状态点 + 摘要计数）挂在会话滚动容器右上角，点击展开下拉面板
 * 展示项目/全局 MCP 服务器列表 + 快捷操作（连接/断开/禁用）。
 * 跨模块动作（showPanel / refresh）经 actions 注入，不直接引用 panel 模块。
 */
import type { McpClientContext, McpServerListEntry, McpState, UiActions } from "../core/state.js";
import type { ClientUiConfig, FloatBreakpoint, ViewportPoint } from "../../shared/interface.js";
/** 胶囊状态点配色：失败红 / 有连接绿 / 否则中性灰（与历史三态一致）。 */
export declare function pillDotColor(fail: boolean, connected: number): string;
/**
 * 胶囊的 title / aria-label：一台服务器都没有时不设（保留宿主默认 tooltip），
 * 有失败时追加失败计数，否则 aria 给出「已连/总数」（无总数时 title 保持朴素）。
 */
export declare function pillHints(total: number, bad: number, connected: number): {
    title: string;
    aria: string;
};
/** 渲染浮窗胶囊（状态点 + 摘要计数 + 失败/中性态）。 */
export declare function renderPill(state: McpState): void;
/**
 * 一行上的动作描述：按钮外观 + 打到哪个口 + 请求形状 + 失败告警的稳定标识。
 * tag 是 console 文案用的动作名（与 i18n 文案解耦：翻界面不改日志）。
 */
interface RowAction {
    className: string;
    label: string;
    url: string;
    method: "POST" | "PATCH";
    tag: string;
    /** 只有 PATCH 动作带载荷（连接/断开是纯 POST，历史形状如此）。 */
    body?: string;
}
/** 主操作（每行恰好一个）：connected → 断开；disabled → 启用；其余 → 连接。 */
export declare function primaryRowAction(server: McpServerListEntry, state: McpState, cwdQuery: string): RowAction;
/** 禁用动作（仅非 disabled 行有）：URL 不带 cwd（历史形状如此，勿补）。 */
export declare function disableRowAction(server: McpServerListEntry, state: McpState): RowAction;
/** 请求 init：带载荷的 PATCH 补 content-type；纯 POST 不带头（历史形状）。 */
export declare function rowRequestInit(action: RowAction): {
    method: string;
    headers?: Record<string, string>;
    body?: string;
};
/**
 * 按状态分桶（桶序 = STATUS_ORDER，固定六态先建空桶）。未知状态归 stopped 桶——
 * 六态是唯一合法取值域，落到兜底桶而不是丢弃该行。
 */
export declare function bucketServersByStatus(list: McpServerListEntry[]): Map<string, McpServerListEntry[]>;
/** 行级 stagger 序号：动画关闭返回 undefined（该行不加 dm-stagger、不进序）。 */
export declare function nextStagger(staggerBase: {
    n: number;
}, animate: boolean): number | undefined;
/** 浮窗标题的项目名：项目根末段；无项目根回落「全局会话」。 */
export declare function floatProjectName(state: McpState): string;
/** 需要置顶提醒的服务器（失败 + 重连中）。 */
export declare function needsAttention(server: McpServerListEntry): boolean;
/** 渲染浮窗下拉面板（健康摘要 + 失败优先 + scope 分组）。 */
export declare function renderFloatPanel(state: McpState, actions: UiActions): void;
/** 切换浮窗展开/收起（Apple Fluid：锚点→对角 scale；先渲染后定位）。 */
export declare function toggleFloat(state: McpState, actions: UiActions, force?: boolean): void;
/** 水平锚点判定：left-* 贴左缘，其余贴右缘（胶囊与面板共用同一口径）。 */
export declare function anchorsLeft(position: string | undefined): boolean;
/** Fluid 展开原点：锚点所在的那个角（胶囊贴边角 → 面板向对角展开）。 */
export declare function transformOriginFor(isLeft: boolean, anchorBottom: boolean): string;
/** 下拉面板定位（fixed 跟随胶囊，避免被滚动容器裁剪；四角感知 + 视口终 clamp）。 */
export declare function placePanel(state: McpState): void;
/** 会话滚动容器：聊天消息实际滚动的区域（shell 的 data-conversation-scroll）。 */
export declare function conversationHost(): Element;
/** 全局 overlay 层：下拉面板挂这里（fixed 定位，避免被滚动容器裁剪）。 */
export declare function panelHost(): Element;
/**
 * 当前会话是否空白会话（空白会话用另一档垂直偏移）。取不到会话面一律判非空白。
 *
 * #1028：与 core/session.ts 共用 core/current-session.ts 单一接缝，判定改用官方口径
 * `retainedBy.mainView`；`blank` 直读官方 `SessionSummary.blank`，不从 cwd 空串推。
 */
export declare function isBlankSession(ctx: McpClientContext): boolean;
/** 从 settings.yaml 读取的配置决定新/老会话垂直偏移。 */
export declare function floatTopOffset(ctx: McpClientContext, state: McpState): number;
/** 胶囊位置配置白名单：只认四个锚点，其余（含缺省）回落 top-right（历史行为）。 */
export declare function floatPositionOf(cfg: ClientUiConfig): ClientUiConfig["position"];
/** 胶囊定位入参（锚点 + 偏移）：位置白名单归一、水平偏移缺省 8、垂直偏移按会话形态。 */
export declare function pillAnchors(cfg: ClientUiConfig, ctx: McpClientContext, state: McpState): {
    isLeft: boolean;
    isBottom: boolean;
    offsetX: number;
    offsetY: number;
};
/** 底部锚点是否改用 composer seat 上缘当下边界（#128：仅非 wide 断点）。 */
export declare function usesComposerSeat(isBottom: boolean, bp: FloatBreakpoint): boolean;
/** 底部锚点的容器下边界：composer seat 贴底时改用 seat 上缘（胶囊上移到输入区上方）。 */
export declare function dockedBottomEdge(containerRect: {
    top: number;
    bottom: number;
}): number;
/** 胶囊定位纯计算的入参（DOM 读口在调用面，坐标算式在这里，可直测）。 */
interface PillPlacementInput {
    rect: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    width: number;
    height: number;
    isLeft: boolean;
    isBottom: boolean;
    offsetX: number;
    offsetY: number;
    /** 底部锚点下边界（已含 composer seat 改写，见 dockedBottomEdge）。 */
    bottomEdge: number;
    viewportW: number;
    viewportH: number;
}
/**
 * 胶囊终坐标（纯计算）：水平按锚点贴容器左右缘、垂直按锚点（bottom 从下边界上推、
 * clamp 到视口上缘；top 从容器顶下移），最后统一走视口 clamp。
 */
export declare function pillPlacement(input: PillPlacementInput): ViewportPoint;
/**
 * 挂载浮窗：胶囊继续挂在会话滚动容器（scrollBody）内并钉住右上角，下拉面板
 * fixed 跟随。返回 disposer 函数。
 */
export declare function mountFloat(ctx: McpClientContext, state: McpState, actions: UiActions): () => void;
export {};
