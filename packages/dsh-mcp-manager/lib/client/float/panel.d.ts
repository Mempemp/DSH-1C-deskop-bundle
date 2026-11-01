/**
 * dsh-mcp-manager — 客户端模态面板生命周期。
 *
 * 面板的打开/关闭/tab 切换/数据刷新。
 * 跨模块渲染（renderServers / buildQuickAdd / renderPill / renderFloatPanel）
 * 直接 import 用到的模块——本模块是 feature 模块的汇聚点，构成单向依赖图：
 * panel → servers / quick-add / float。
 */
import type { McpState, UiActions } from "../core/state.js";
/**
 * 刷新服务器列表与浮窗摘要（单飞：in-flight 复用；#111 变更点驱动）。
 * 返回 true=成功；false=失败（调用方按退避重试）。
 */
export declare function refresh(state: McpState, actions: UiActions): Promise<boolean>;
/** 切换面板 tab（servers / quick）。 */
export declare function switchTab(state: McpState, actions: UiActions, tab: string): void;
/** 关闭模态面板（Fluid：卡片中心收束 + 遮罩淡出；完成后再 hidden）。
 *
 * R1 状态同翻：state.open=false 的同一同步块内摘除 aria-modal（不经 300ms
 * 动画回调——动画被打断/定时器漂移时标记与状态永久错位，见 #947）。
 * R2 常驻壳无标记：hidden 元素仍被 querySelector 命中，故必须摘属性而非
 * 置 "false"（裸 [aria-modal] 存在检查仍命中 "false"，且关闭态留 "false"
 * 语义错误）。R6 关还焦：同步把焦点还给打开者（便宜且安全）。
 */
export declare function close(state: McpState): void;
/** 打开模态面板（首次调用时创建 DOM 结构；Fluid：中心 scale 0.78→1）。 */
export declare function showPanel(state: McpState, actions: UiActions): void;
/** C4：卸载配对清理（index.ts effect disposer 调用）——移除 Escape keydown 监听。 */
export declare function disposePanel(state: McpState): void;
