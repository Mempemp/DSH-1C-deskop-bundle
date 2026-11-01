/**
 * dsh-mcp-manager — catalog/impl/entries/index.ts：能力目录条目与渲染（#664 阶段 5）。
 *
 * 自 src/catalog.ts 拆出（目录条目域）：条目类型/摘要常量/摘要计算/条目组装/
 * 消息渲染与转义/消息定位读取。digest 与 history 归同域兄弟文件；目录注入决策
 * 归 injection.ts；注入端缓存视图归 cache-view.ts；检索族归 search.ts。
 */
import type { SupervisorLite } from "../../../connection/interface.js";
import type { CatalogMessage } from "../injection/index.js";
import type { ContextFormed } from "@deepseek-ai/dsh-llm";
import { DEFAULT_ANNOUNCE_CATALOG, DEFAULT_CATALOG_MAX_ENTRIES } from "../../../shared/interface.js";
/**
 * dsh 0.1.7-rc.2 producer-owned source kind。
 *
 * V4 将生产者身份编码进 kind；本包不再声明或依赖共享 `plugin` 基座，
 * 也不把身份拆到 `plugin` 字段。snapshot 的 form/sections 由官方
 * ContextFormed 约束。
 */
declare module "@deepseek-ai/dsh-llm" {
    interface MessageSourceMap {
        "plugin:@wingsky-1/dsh-mcp-manager": {
            kind: "plugin:@wingsky-1/dsh-mcp-manager";
        } & ContextFormed;
    }
}
/** 目录条目。 */
export interface CatalogEntry {
    name: string;
    text?: string;
    /** 服务器归属（global/project）；用于区分调用引导（#228 双轨迁移）。 */
    scope?: string;
}
/** supervisor 最小面（manager.supervisors 的条目；物理定义在 connection/interface.ts，此处 re-export）。 */
export type { SupervisorLite } from "../../../connection/interface.js";
/** 目录缓存（连接成功时持久化的工具描述摘要）。 */
export type CatalogCache = Map<string, {
    summary: string;
}>;
export { DEFAULT_ANNOUNCE_CATALOG, DEFAULT_CATALOG_MAX_ENTRIES };
/** 本包 V4 producer-owned source kind；身份编码在 kind，不另设 plugin 字段。 */
export declare const CATALOG_SOURCE_PLUGIN = "@wingsky-1/dsh-mcp-manager";
export declare const CATALOG_SOURCE_KIND = "plugin:@wingsky-1/dsh-mcp-manager";
/** 目录快照的段名（snapshot 形态下承载渲染后的目录正文）。 */
export declare const CATALOG_SECTION_NAME = "mcp-catalog";
/** 目录摘要总长上限（字符，含前缀与省略号）：目录注入 ≤6 条目，防远端工具描述
 * 堆叠稀释上下文；截断先于 escapeCatalogText 转义，防不可信输入注入超长文本。 */
export declare const CATALOG_SUMMARY_MAX_CHARS = 240;
/** 目录摘要单句上限（字符）：无句读语言 / 超长描述的安全截断点。 */
export declare const CATALOG_SUMMARY_PER_TOOL_CHARS = 120;
/** 目录单条服务器描述上限（字符）：Level 1 发现层防远端超长说明书（如 context7 500 词）
 * 撑爆会话上下文，符合渐进式披露原则。详细使用说明由 ws_mcp_detail / ws_mcp_search 按需承载。 */
export declare const CATALOG_ENTRY_MAX_CHARS = 180;
/**
 * 从工具描述集合计算目录摘要（每工具取首句，按工具名升序 + 精确去重后拼接）。
 *
 * 为什么不再「排序取第一条」（#569）：tavily 等服务器的字典序第一条是次要工具
 * （tavily_crawl），会把搜索服务器描述成爬虫、误导模型。改为每工具贡献首句：
 * - 排序（按工具名而非描述）保证工具列表顺序/描述空白抖动时摘要稳定（重连不触发
 *   缓存更新 → digest 不变）；
 * - 首句提取（firstSentenceOf）防 "1." 编号 / URL / 缩写误切；多字节按字符截断；
 * - 总长与单句均有上限：目录摘要的用途是让模型判断「该不该调这个服务器」，过长
 *   描述（含远端不可信输入）反而稀释上下文；完整能力清单由 ws_mcp_list /
 *   工具注册表承担，不塞进目录。
 */
export declare function summarizeToolDescriptions(toolMeta: Map<string, {
    description?: unknown;
}>): string | undefined;
/** ① 收集 (工具名, 首句)；首句为空的工具不贡献摘要。 */
export declare function collectToolSentences(toolMeta: Map<string, {
    description?: unknown;
}>): Array<[string, string]>;
/** ② 按工具名升序（确定性：顺序抖动只变内容不变名序）→ 精确去重 → 单句截断。 */
export declare function dedupeToolSentences(collected: Array<[string, string]>): string[];
/** 单句上限截断（超限留一位给省略号）。 */
export declare function truncatePerTool(sentence: string): string;
/** ③ 拼接（"; " 分隔），超总长按句整段回退补 "…"（绝不句中切）。 */
export declare function joinSentencesWithinBudget(sentences: string[], prefix: string): string;
/**
 * 生成能力目录条目（**数据源不依赖用户配置、不依赖实时连接状态**）：
 * ① 服务器自定义 description（用户可选补充，优先）→
 * ② 目录缓存摘要（连接成功时自动持久化的工具描述摘要，磁盘数据，与连接状态解耦）
 * ③ 都没有 → 只显示服务器名。
 * 连接/断开/重连不改变缓存内容 → digest 稳定 → 不触发重复注入。
 * @param supervisors manager.supervisors（name → supervisor）。
 * @param maxEntries 最大条目数。
 * @param cache 目录缓存（manager.catalogCache）。
 * @returns 目录条目。
 */
export declare function composeCatalogEntries(supervisors: Map<string, SupervisorLite>, maxEntries?: number, cache?: CatalogCache): CatalogEntry[];
/** 条目描述文本的三级来源：① 用户自写描述（首句，空则整句压空白）→ ② 磁盘缓存摘要
 * → ③ 都没有则 undefined（调用方据此不产出 text 键）。用户描述按单条上限截断。 */
export declare function entryTextFor(name: string, server: SupervisorLite["server"], cache: CatalogCache | undefined): string | undefined;
/** 渲染能力目录消息（source 标记供定位替换）。
 *
 * 当前 source 精确为 V4 producer-owned snapshot：
 * `{ kind: "plugin:@wingsky-1/dsh-mcp-manager", form: "snapshot", sections: [...] }`。
 */
export declare function renderMcpCatalogMessage(entries: CatalogEntry[]): CatalogMessage;
/** 转义远程来源文本（防提示注入/标签逃逸；与 skill catalog 的 escapeText 同思路）。
 * 只做安全转义，**不做长度截断**（完整返回描述）。 */
export declare function escapeCatalogText(value: unknown): string;
/** 是否为本插件当前 V4 注入的能力目录消息。旧 V0/V2/V3 source 不在业务域兼容。 */
export declare function isCatalogSource(source: {
    kind?: unknown;
} | undefined): boolean;
/** 从消息列表里定位既有的当前 V4 能力目录消息。 */
export declare function findCatalogMessage(messages: CatalogMessage[]): CatalogMessage | undefined;
/**
 * 取回一条目录消息所发布的条目：从快照正文的 `<available_mcp_servers>` 块还原
 * 条目（格式化是单射的），使 digest 与 `composeCatalogEntries` 的条目 digest
 * 同口径——否则每次启动都会误判"目录已变"而注入一条修正帧。
 *
 * 坏数据返回 undefined（按"不是本插件的目录"处理）：本函数在 step 监听器里被调用，
 * 抛错会让该会话每一轮都失败。
 */
export declare function resolveCatalogEntries(source: CatalogSourceLike | undefined): CatalogEntry[] | undefined;
/**
 * 防御性读取当前 V4 source 的条目；旧 `entries` 形态由 maintenance 处理，
 * 不在业务 reader 中兼容。
 */
export declare function readCatalogEntries(source: CatalogSourceLike | undefined): CatalogEntry[] | undefined;
/** 当前 V4 source 最小面。 */
export interface CatalogSourceLike {
    kind?: unknown;
    form?: unknown;
    sections?: unknown;
}
/** 渲染"目录更新"消息（历史旧目录无法删除，新消息声明作废——与 tool-skill 同语义）。 */
export declare function renderMcpCatalogUpdate(entries: CatalogEntry[]): CatalogMessage;
