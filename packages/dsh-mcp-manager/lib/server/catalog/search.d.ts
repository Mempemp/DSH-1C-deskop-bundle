/**
 * dsh-mcp-manager — catalog/search.ts：能力目录检索函数族（#664 阶段 5）。
 *
 * 自 src/middleware-utils.ts 迁出（catalog 域检索族）：打分/单/多单元检索/
 * 完整盘点/单工具详情/新鲜判定/装箱。工具级禁用裁决（isToolDenied 等）与
 * globMatch 归 pipeline（authorize 块）。B10 截断事实
 * 口径随迁保持「恰好命中 limit 不误报」。
 */
import type { CatalogServer, CatalogTool, ListCatalogResult, ListServerEntry, SearchHit, ToolDetail } from "./interface.js";
import type { ProjectUnit } from "../connection/interface.js";
import type { DisabledToolsMap } from "../store/interface.js";
/** 跨字段打分：query 词命中 server 名 / 工具名 / description / 参数名。
 * 中文（无空格分词）：query 连续中文串在原始描述中 substring 匹配即可命中
 * （修复：原实现把连续中文当单个 token，中文召回率接近零）。 */
export declare function scoreTool(query: string, server: string, toolName: string, tool: CatalogTool): {
    score: number;
    matchedTerms: string[];
};
/** 连续中文段命中原始文本即计 2 分（≥2 字才算命中）；一个都没命中返回 undefined
 * ——让调用方回落分词打分（中文 query 同时含英文词时两路都试）。 */
export declare function scoreCjkSegments(segments: string[], haystack: string): {
    score: number;
    matchedTerms: string[];
} | undefined;
/** 词元命中原始文本即计 1 分（≥2 字才算命中，单字词元不计）。 */
export declare function scoreTerms(terms: string[], haystack: string): {
    score: number;
    matchedTerms: string[];
};
/** 检索目录：query 为空 → 能力摘要表（每服务器前 N 个工具）。
 * 单 root 实现（searchCatalogMulti 循环调用；兼容既有测试）。
 * truncated：任一服务器存在被 limit 裁掉的结果即 true（B10 截断事实，
 * 供调用方精确标注「是否因 limit 裁掉」——恰好命中 limit 不误报）。 */
export declare function searchCatalog(units: Map<string, ProjectUnit>, root: string, query: string, limit: number): {
    results: SearchHit[];
    unavailable: Array<{
        server: string;
        reason: string;
    }>;
    truncated: boolean;
};
/** 多单元合并检索（项目 root 单元 + @global 单元合并查询）。
 * 与 searchCatalog 同语义，仅数据源扩展为多个 root。
 * 单 root 直接委托 searchCatalog（保持原顺序，不引入跨单元排序变化）；
 * 多 root 合并后统一排序并按全局 limit 截断（truncated=合并后曾有超限结果）。 */
export declare function searchCatalogMulti(units: Map<string, ProjectUnit>, roots: readonly string[], query: string, limit: number): {
    results: SearchHit[];
    unavailable: Array<{
        server: string;
        reason: string;
    }>;
    truncated: boolean;
};
/** 工具级禁用标注判定（本 root 段 + @global 段并集命中即禁用；@global 自身不重复继承）。 */
export declare function isToolDisabledForEntry(disabledTools: DisabledToolsMap | undefined, root: string, serverName: string, toolName: string): boolean;
/**
 * 完整盘点：列出当前工作空间全部服务器 + 每台完整工具清单（不受关键词/limit
 * 截断服务器，工具数受 perServerLimit 保护）。
 * @param units 连接池单元集合。
 * @param roots 参与盘点的 root 列表（当前项目 root + @global）。
 * @param serverFilter 可选：@<root>/<server> 全名或裸名过滤。
 * @param toolLimit 每服务器工具条数上限（>0；超过置 toolsTruncated）。
 * @param emptyHint 空返回时的 message。
 * @param disabledTools 用户工具级禁用映射（root → server → Set<tool>）；
 *    命中条目在工具行标注禁用（供模型感知）。
 * @throws 全名 root 不属于当前 roots → 路由一致性错误（与 ws_mcp_call 口径一致）。
 */
export declare function listCatalog(units: Map<string, ProjectUnit>, roots: readonly string[], serverFilter: string | undefined, toolLimit: number, emptyHint: string, disabledTools?: DisabledToolsMap): ListCatalogResult;
/** 每服务器工具条数上限：非有限数或非正回落缺省；正数向下取整（历史口径）。 */
export declare function safeToolLimit(toolLimit: number): number;
/** 该 root 是否参与盘点：显式过滤集命中即参与，无过滤集则全参与。 */
export declare function rootParticipates(root: string, rootSet: Set<string> | undefined): boolean;
/** 盘点过滤：serverFilter 为空即全收；给定后裸名或 @全名任一命中即收。 */
export declare function matchesServerFilter(serverName: string, root: string, serverFilter: string | undefined, fullServerName: (root: string, server: string) => string): boolean;
/** 单台服务器的盘点条目：用户禁用标注 + 目录失败原因，或工具清单（含截断与工具数结算）。 */
export declare function buildListServerEntry(serverName: string, root: string, catalog: CatalogServer, userDisabled: ReadonlySet<string>, safeLimit: number, disabledTools: DisabledToolsMap | undefined, fullServerName: (root: string, server: string) => string): {
    entry: ListServerEntry;
    truncated: boolean;
    toolCount: number;
};
/** 盘点定序比较器：root 出现序优先（不在列表里的排后），同 root 内按裸名升序。 */
export declare function listOrderComparator(rootIndex: ReadonlyMap<string, number>, parseFullServerName: (full: string) => {
    root: string;
    server: string;
} | undefined): (a: ListServerEntry, b: ListServerEntry) => number;
/** 条目排序键两格：root 出现序（不在 roots 列表里的排到末尾）+ root 内裸名。 */
export declare function listOrderKey(entry: ListServerEntry, rootIndex: ReadonlyMap<string, number>, parseFullServerName: (full: string) => {
    root: string;
    server: string;
} | undefined): {
    rootOrder: number;
    server: string;
};
/**
 * 单工具详情：按 @<root>/<server> + tool 裸名精确命中，返回完整 inputSchema。
 * 错误三分：
 * 1. server 发现失败（catalog.unavailable）→ 附原因；
 * 2. 单元/服务器未发现 → 「server 未连接或未发现」；
 * 3. 工具不存在 → 「tool 不存在」。
 * @param units 连接池单元集合。
 * @param root 目标 root（可为 @global）。
 * @param server @<root>/<server> 全名。
 * @param tool 远端工具裸名（兼容 mcp__ 前缀，复用 normalizeToolName）。
 */
export declare function findToolDetail(units: Map<string, ProjectUnit>, root: string, server: string, tool: string): ToolDetail;
/** 目录里没有可用工具时的错误三分：发现失败（附原因）> 用户禁用（附说明）> 未连接。 */
export declare function toolDetailMissError(catalog: CatalogServer | undefined, server: string, userDisabled: boolean): Error;
export { boundCatalogTools, isCatalogFresh } from "./impl/directory/index.js";
