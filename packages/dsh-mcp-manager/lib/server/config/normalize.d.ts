/**
 * dsh-mcp-manager — 服务器配置归一化（纯函数，单一事实源）。
 *
 * normalizeServer 校验并规范化一条 MCP 服务器配置（stdio / streamable-http），
 * 供 Manager 增改与 mcpServers JSON 导入路径共用；SERVER_NAME_PATTERN 为
 * 服务器名命名空间约束（与官方 dsh-mcp-client 一致），物理定义已上移 server/shared/constants.ts
 * ——workspace 域的 id 生成器要用同一份判定（#767 S1-4a），此处只转出同名符号，调用点不变。
 *
 * reconnect 在此处按官方口径收紧（#767 S1-1）：官方对未知键直接抛错，而本插件的配置面
 * 是用户手写 JSON（可手排 mcp.json），故未知键改为静默丢弃（口径与顶层未知字段一致）；
 * 真正会改变重连语义的错值（时长越界、预算非正整数）仍在配置写入时拒绝，避免把错误推迟
 * 到连接期才暴露。
 */
import type { ServerConfig } from "./impl/model/type.js";
import { SERVER_NAME_PATTERN } from "../shared/interface.js";
export { SERVER_NAME_PATTERN };
/** reconnect 字段逐项校验（两个延迟的范围、enabled 的布尔、两者的关系）。 */
export declare function assertReconnectFields(out: Record<string, unknown>): void;
/** 调用超时归一：正数向下取整；非数 / 非正回落缺省。 */
export declare function normalizeToolCallTimeoutMs(value: unknown): number;
/** 自定义描述归一：非空字符串去首尾空白；空串与非字符串判缺省（不落键）。 */
export declare function normalizeDescription(value: unknown): string | undefined;
/** 校验并规范化一条服务器配置。 */
export declare function normalizeServer(input: unknown): ServerConfig;
