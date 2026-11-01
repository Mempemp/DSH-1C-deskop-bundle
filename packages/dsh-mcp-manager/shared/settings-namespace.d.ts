import type { SettingsDescriptor, SettingsDescribeOptions, SettingsForms } from "@deepseek-ai/dsh-settings";
/** 官方 settings 服务类型锚（宿主 `Context["settings"]`）。 */
export type HostSettingsService = SettingsForms;
/** 官方 settings 描述项类型锚（`describe()` 的元素）。 */
export type HostSettingsDescriptor = SettingsDescriptor;
/** 官方 describe 选项类型锚。 */
export type HostSettingsDescribeOptions = SettingsDescribeOptions;
/** `installSettingsNamespace` 的 hooks 面。 */
export interface SettingsNamespaceHooks {
    /** 把插件对该命名空间的读取来源指向返回的 scope（`scope.get()`）。 */
    setSource(source: () => unknown): void;
    /** 来源切换或命名空间值变化时触发，插件据此刷新/落盘。 */
    onChange(): void;
    /**
     * 可选；owning fiber ACTIVE 且 canonical namespace 被 settings 服务描述后回调一次。
     * 供存量配置迁移 / 写路径装配使用；fiber / 服务 / namespace 未就绪时不触发。
     *
     * 两面均按 unknown 收窄：调用方（mcp-manager / lan-proxy）各自持有更窄的 scope /
     * service 面并自行收窄，方法语法保持双变，窄实现可直接透传。
     */
    onScope?(scope: unknown, service: unknown): void;
}
/**
 * 描述项窄面（按 ns 定位，合成 base + user，兼容 value 回退）。
 *
 * 字段类型逐个引用官方 `SettingsDescriptor`（#1164）；可选性保持历史形态——
 * 本模块的运行时按「字段是否存在」做兼容回退，不能假定官方必填字段恒在。
 */
export interface SettingsFormsDescriptor {
    /** 命名空间键。 */
    ns?: HostSettingsDescriptor["ns"];
    /** 运行时解析值（缺少分层字段时的兼容回退）。 */
    value?: HostSettingsDescriptor["value"];
    /** 基础配置层。 */
    base?: HostSettingsDescriptor["base"];
    /** 原始 user 覆盖层。 */
    user?: HostSettingsDescriptor["user"];
    /** 乐观并发修订号。 */
    revision?: HostSettingsDescriptor["revision"];
}
/** owner scope 窄面（describe 定位读＋写委托；订阅由接缝内部直连）。 */
export interface SettingsFormsScope {
    /** 当前有效值（describe base + user，缺席回落 entry）。 */
    get(): unknown;
    /** 委托 settings.update(ns, …)。 */
    update(patch: object, expectedRevision?: number): Promise<unknown>;
    /** 委托 settings.replace(ns, …)。 */
    replace(section: object, expectedRevision?: number): Promise<unknown>;
    /** 委托 settings.mutate(ns, …)；服务缺失时返回拒绝。 */
    mutate(ops: readonly unknown[], expectedRevision?: number): Promise<unknown>;
}
/**
 * settings 服务窄面（describe/写）。
 *
 * `describe` 直接取官方 `SettingsForms` 的方法签名（#1164）；三个写面保持**可选**：
 * 宿主/测试桩可能只暴露读面，本模块在缺方法时按 `missingWriteMethod` 拒绝写而不是
 * 假定恒在——收窄成必选会改变既有降级语义。
 */
export interface SettingsFormsService extends Pick<HostSettingsService, "describe"> {
    /** 合并写。 */
    update?: HostSettingsService["update"];
    /** 整节写。 */
    replace?: HostSettingsService["replace"];
    /** 路径写（可选）。 */
    mutate?: HostSettingsService["mutate"];
}
/**
 * 日志兜底：logger 可能确实没有（极端降级），全部可选调用。
 * 单一事实源（#436）：notifier / lan-proxy 曾各复刻一份 warnLog，现统一引用本导出。
 * @param {unknown} ctx - cordis 插件上下文。
 * @param {string} message - 告警消息。
 */
export declare function warnLog(ctx: unknown, message: string): void;
/**
 * 安装「可选 settings 消费者的标准接线」：settings 服务存在时，把 `ns` 以组合层
 * `entry` 作为回落接进 settings 服务，并让 `hooks.setSource` 指向 describe 投影
 * （hooks.onScope 可选：owning fiber ACTIVE 且 canonical namespace 被服务后交 scope）；仅服务消失
 * （scoped fiber 注销而插件仍存活）时回落到 entry；插件自身卸载时不回落
 * （disposer 短路，随 fiber 注销）。接线随 scoped fiber 生效——settings 服务
 * 从未挂载则本函数什么都不做（卡片降级，功能不受影响）。
 *
 * 这里不 import 官方包，纯粹以服务面注入驱动，规避插件运行时解析不到该包导致的静默失败。
 *
 * @param ctx - 插件宿主端 apply 收到的 cordis 上下文。
 * @param ns - 插件自有命名空间（小写 kebab，通常 `<plugin 名>`，须唯一）。
 * @param schema - 占位：schema 由宿主持有，本函数不注册（签名为调用方零改而保留）。
 * @param entry - 组合层配置（describe 缺席时的回落值）。
 * @param hooks
 *   - setSource：把插件对该命名空间的读取来源指向返回的 scope（`scope.get()`）。
 *     settings 服务存在时，卡片数据应经此 scope 读写。
 *   - onChange：来源切换或命名空间值变化时触发，插件据此刷新自身状态/落盘。
 *   - onScope：可选；owning fiber ACTIVE 且 canonical namespace 被服务时回调一次。
 *     启动时已服务则仍先于 setSource；晚就绪时由 fiber.await 或 document-updated 唤醒。
 * @returns {void}
 */
export declare function installSettingsNamespace(ctx: unknown, ns: string, schema: unknown, entry: unknown, hooks: SettingsNamespaceHooks): void;
