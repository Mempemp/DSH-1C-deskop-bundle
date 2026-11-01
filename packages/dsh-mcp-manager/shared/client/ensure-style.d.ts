/** ensureStyle 参数（issue #477 v2 契约）。 */
export interface EnsureStyleOptions {
    /** <style> 幂等键（package-owned 命名空间，统一 `dsh-<pkg>-style` 前缀隔离）。 */
    id: string;
    /** 样式文本（构建期 text-loader 内联的 style.css 内容）。 */
    cssText: string;
    /** 可选版本号：写入 dataset.version；变化时旧节点 remove 后重建（热更新失效）。 */
    version?: string;
}
/**
 * 按 id 幂等注入 <style> 节点（issue #477 收敛后的 5 包统一样式注入入口）。
 *
 * 行为契约见文件头注释 1-4（head 缺失静默早退 / version 幂等与重建 / 返回 disposer /
 * id 前缀隔离），此处只承载类型面。
 *
 * @param options 入参面按契约收窄为 `EnsureStyleOptions`（id/cssText 必填）：实现里的
 *   `options || {}` 与随后的 fail-loud 校验是对 JS 调用方的防御，不是对公共契约的放宽，
 *   故局部按可选面读、校验后收窄为 `string`，公开面仍要求两字段齐备。
 * @returns 卸载函数（remove 该 id 节点；无节点时 no-op）。
 * @throws id/cssText 缺失或类型不符（编程错误 fail-loud，与运行时环境缺失的静默早退
 *   不同——后者是环境边界不是调用方错误）。
 */
export declare function ensureStyle(options: EnsureStyleOptions): () => void;
