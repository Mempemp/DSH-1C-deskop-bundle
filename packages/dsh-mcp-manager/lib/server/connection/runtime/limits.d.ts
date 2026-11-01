/**
 * dsh-mcp-manager — 中间层常量（执行域语义，单一事实源）。
 *
 * 本文件保留 limits/超时/目录边界常量，阶段 6 归
 * connection/runtime/limits.ts（v3 C-DIR）。
 */
/** 单次远端工具调用超时（ms）。 */
export declare const CALL_TIMEOUT_MS = 30000;
/** 目录 TTL（ms）：24h。 */
export declare const CATALOG_TTL_MS: number;
/** 目录安全边界：单服务器工具数上限。 */
export declare const MAX_TOOLS_PER_SERVER = 512;
/** 目录安全边界：单工具描述字节上限。 */
export declare const MAX_BYTES_PER_TOOL = 4096;
/** 目录安全边界：目录总字节上限。 */
export declare const MAX_TOTAL_CATALOG_BYTES: number;
/** ws_mcp_list 每服务器工具条数硬上限（目录采集边界内）。 */
export declare const LIST_MAX_TOOLS_PER_SERVER = 500;
export { CONNECT_TIMEOUT_MS, DISCOVERY_TIMEOUT_MS, LIST_DEFAULT_TOOLS_PER_SERVER, } from "../../shared/interface.js";
