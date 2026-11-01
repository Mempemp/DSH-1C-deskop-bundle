/**
 * dsh-mcp-manager — pipeline/impl/args/index.ts：ws_mcp_call 参数归一化（#664 阶段 2 迁入）。
 *
 * 原自 middleware-utils.ts normalizeArguments；B14（数组形态拒绝）已在阶段 1 修复，
 * 本文件为同语义迁移（零行为变更）。
 */
/** 单步解包结论。 */
type UnwrapVerdict = {
    kind: "result";
    result: unknown;
} | {
    kind: "bail";
} | {
    kind: "next";
    next: unknown;
};
/** 首字符分类：容器 JSON（左花括号 / 左方括号）或引用串（双引号）。 */
export declare function jsonHeadKind(trimmed: string): {
    container: boolean;
    quoted: boolean;
};
/** 解包结果分类：对象直得（数组归空态）、引用串剥一层、其余不可解。 */
export declare function classifyParsedJson(parsed: unknown, wasQuoted: boolean): UnwrapVerdict;
/** 归一化 ws_mcp_call 的 arguments 参数（模型可能把参数字典填成 JSON 字符串）。 */
export declare function normalizeArguments(raw: unknown): unknown;
export {};
