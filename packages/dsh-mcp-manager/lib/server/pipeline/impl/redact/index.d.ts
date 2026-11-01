/**
 * dsh-mcp-manager — pipeline/impl/redact/index.ts：凭据脱敏器（#664 阶段 2 迁入，B8 改口径同文件）。
 *
 * B8（D4 决策）：仅用户信息脱敏（username/password/searchParams），host/path
 * 无凭据保留可读（现状整 URL 脱敏，可诊断性差）；raw/decoded 双形态注册——
 * 错误消息中出现的是原始 URL 字节串（percent-encoding 形态），URL parse 拿到
 * decoded 形态，两者都须命中（否则 percent-encoding 绕过回归，评审 B8 修正）。
 */
import type { ServerConfig } from "../../../config/interface.js";
/** 展示侧 args 脱敏（#925）：凭据形 flag 的参数值替换为 "[REDACTED]"，flag 名与非秘密元素原样保留可诊断。与 collectStdioSecrets 同一套 flag 口径（`--token x` / `--token=x` / `-p/-k/-s` 下一拍，长 flag 精确名匹配），空值不掩（无秘密可泄）；非字符串元素按 String() 原样带过。调用方（summarize 只读投影）展示用，写路径见 stripProjectionPatch 丢弃占位符。 */
export declare function maskSecretArgsForDisplay(args: readonly unknown[]): string[];
/** 凭据脱敏器：从服务器配置收集 secret 值，替换错误消息中的出现。 */
export declare function createRedactor(servers: readonly ServerConfig[]): (error: unknown) => string;
