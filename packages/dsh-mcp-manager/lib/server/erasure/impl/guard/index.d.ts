/**
 * dsh-mcp-manager — erasure/impl/guard/index.ts：tools:sdk 段的 mcp__ 声明级擦除。
 *
 * 承重约束（三条，判据都在 test/unit/erasure.test.ts）：
 *
 * 1. 只擦行首声明：SDK 生成的 TS 声明里 mcp__ 工具名恒在行首（去缩进后），
 *    散文里的 mcp__ 提及不在行首，故不受影响；段外文本本函数碰不到——
 *    调用方只把 tools:sdk 段的文本递进来。
 * 2. 注释连带：SDK 每条声明自带文档注释，擦声明时把紧贴其上的注释与空行
 *    一并带走，不留无主注释；非 mcp__ 条目的注释原样保留。
 * 3. 花括号深度跟踪：输出映射块按 brace 深度收口，渲染嵌套加深也不提前收口、
 *    更不误删块外行；未知形状宁可保留也不损坏文本（保留分支无计数：warn 只统计成功擦除数，未知形状覆盖靠单测形状断言，漂移即红）。
 */
import type { StartSdkErasureArgs } from "../../interface.js";
/** 累计计数（warn 里携带，根因修复前窗口统计不丢失）。 */
export interface ErasureStats {
    rounds: number;
    declarations: number;
}
/** 单次擦除结果。 */
export interface ErasureResult {
    text: string;
    erased: number;
}
/**
 * 擦掉 SDK 文本里全部行首 mcp__ 声明（值声明与输出映射块）及其附着注释。
 * 未知形状的行一律保留且不计数（warn 只覆盖成功擦除；未知形状由单测形状断言覆盖）：误删则直接损坏提示词。
 */
export declare function eraseMcpSdkDeclarations(text: string): ErasureResult;
/**
 * 启动装配侧兜底擦除：订阅宿主组装 waterfall，对下游结果的 tools:sdk 段做声明级擦除。
 * 无泄漏时原样返回下游结果（同一引用，不制造装配抖动）；有泄漏时返回替换了该段文本
 * 的新装配，并 warn 一次（累计计数见 ErasureStats 语义，根因未修前统计不丢）。
 */
export declare function startSdkErasure(args: StartSdkErasureArgs): () => void;
