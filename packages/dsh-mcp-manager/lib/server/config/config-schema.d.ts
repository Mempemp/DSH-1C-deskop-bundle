/**
 * dsh-mcp-manager — 插件 Config schema 与配置归一化（纯函数，单一事实源）。
 *
 * 插件自身 Config（cordis 配置注入入口）与浮窗 UI 配置的校验/归一化/默认值；
 * 类型自 types.ts 取（防循环引用），placement-math 提供层级 clamp 与默认层级。
 */
import z from "schemastery";
import type { ClientUiConfig } from "../../shared/interface.js";
import type { UiPlacementConfig } from "./impl/ui/type.js";
/** 默认浮窗 UI 配置（与升级前一致，无回归；层级基准引用 placement-math 单一事实源，
 *  DEFAULT_Z_INDEX_BASE=10 对应 CSS 默认 z-index:10）。 */
export declare const DEFAULT_UI_CONFIG: UiPlacementConfig;
/**
 * 归一化浮窗 UI 配置（纯函数，可单测）。
 * 兼容三种形态：新 `Config.ui` 嵌套、旧隐藏命名空间的扁平 `position/offset`、
 * 客户端扁平 `position/offsetX/offsetY/blankY`。非法或缺失 → 安全回退默认，不抛。
 */
export declare function normalizeUiConfig(raw: unknown): ClientUiConfig;
/**
 * 把客户端扁平形态（{position, offsetX, offsetY, blankY}）归一化为写入 `Config.ui`
 * 的嵌套补丁（{position, offset:{x,y,blankY}}）。走 normalizeUiConfig 的净化为唯一
 * 入口：非法值安全回退默认，负数 clamp 到 0，四舍五入。
 */
export declare function buildConfigUiPatch(raw: unknown): UiPlacementConfig;
/** 面板垂直定位纯函数（供 smoke 断言翻转分支；clamp 到视口内，不溢出）。
 *  实现自持于包内 src/shared/placement-math.ts（shared-leaf 叶子约束），此处
 *  re-export 保持 index.ts 导出链不变。 */
export { panelTopForAnchor } from "../../shared/interface.js";
/**
 * 插件 Config schema（标准 cordis 配置注入入口；含 `ui` 子对象）。
 * 官方 ConfigForm 只开放 ui child；根级运行时字段全部 disabled。
 */
export declare const Config: z<{
    enabled: boolean;
    announceToAgent: boolean;
    storePath: string;
    announceCatalog: boolean;
    catalogMaxEntries: number;
    debug: {
        callStats: boolean;
        statsFile: string;
    };
    ui: UiPlacementConfig;
}>;
/**
 * 默认配置（键集 = schema 中带 .default() 的字段）。从 schema 归一化**空输入**派生，
 * 不手写第二份默认值——默认值只写在上面的 .default(...) 里，改一处即改两处。
 * storePath 无默认值，故键集比 schema 字段数少 1（config-matrix 门禁的 N1/N2 锁这条不变式）。
 */
export declare const DEFAULT_CONFIG: {
    enabled: boolean;
    announceToAgent: boolean;
    storePath: string;
    announceCatalog: boolean;
    catalogMaxEntries: number;
    debug: {
        callStats: boolean;
        statsFile: string;
    };
    ui: UiPlacementConfig;
};
/**
 * 归一化：把外部输入按 schema 校验并补默认值。
 * 与 normalizeUiConfig 分工不同：后者只处理 ui 子面（设置页提交的局部 patch），
 * 本函数给出一份**完整**配置。
 */
export declare function normalizeConfig(input: unknown): {
    enabled: boolean;
    announceToAgent: boolean;
    storePath: string;
    announceCatalog: boolean;
    catalogMaxEntries: number;
    debug: {
        callStats: boolean;
        statsFile: string;
    };
    ui: UiPlacementConfig;
};
/** 只接受布尔值的**顶层**配置键（客户端 UI 按它渲染开关）；嵌套的 debug.callStats 不是顶层键。 */
export declare const BOOLEAN_KEYS: readonly string[];
/**
 * 非负整数键及其上界：本包**没有产品上界**——catalogMaxEntries 只被要求是正整数，
 * 上界是机器/内存极限而非产品约束，编一个上界等于造假事实。空对象是显式声明而不是遗漏。
 */
export declare const COUNT_LIMITS: Record<string, number>;
