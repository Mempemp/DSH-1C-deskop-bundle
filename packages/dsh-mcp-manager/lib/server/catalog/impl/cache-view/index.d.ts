/**
 * dsh-mcp-manager — catalog/impl/cache-view/index.ts：注入端目录缓存视图（#664 阶段 5）。
 *
 * 自 src/manager.ts 迁出（catalog 域）：合成注入端目录缓存视图——以 B
 * （supervisor 摘要缓存）为基底，逐服务器按「scope + 模式」用中间层目录摘要
 * 覆盖（#569 修复核心）。diskCatalogSummaryCache（mtime 缓存）随迁，以工厂
 * 闭包持有（防多实例共享串状态）；宿主最小面 CatalogViewHost 解耦 manager
 * 细节（C-DIR：catalogViewFor 私有缓存随迁，薄桥接）。
 */
import type { McpMiddleware } from "../../../connection/runtime/interface.js";
import type { ServerConfig } from "../../../config/interface.js";
import type { CatalogCache } from "../entries/index.js";
/**
 * 目录摘要缓存文件（连接成功时把工具描述摘要持久化于此；目录 digest 的稳定数据源）。
 * 名字与权限的物理定义在 server/shared/paths.ts（I7 单源）。
 */
export declare function catalogCacheFile(): string;
/** catalogViewFor 的宿主最小面（manager 提供；实例经读取器取——apply 完成后恒在，pre-step 窗口未装配时返回 undefined 走 B 兜底）。 */
export interface CatalogViewHost {
    getCatalogCache(): CatalogCache;
    getMiddleware(): McpMiddleware | undefined;
    catalogCachePathFor(root: string): string;
}
/** 注入端目录缓存视图解析器（makeCatalogViewFor 产物）。 */
export type CatalogViewResolver = (cwd: string | undefined, servers: Map<string, {
    server: ServerConfig;
    scope: string;
}>) => Promise<CatalogCache>;
/**
 * 合成注入端目录缓存视图（#569 修复核心）：以 B（supervisor 摘要缓存）为基底，
 * 逐服务器按「scope + 模式」用中间层目录摘要覆盖——修复「middleware 采集的
 * 工具摘要注入端读不到」：
 * - 用户手写 server.description 由 composeCatalogEntries 处理（优先级最高），
 *   不在此视图内；
 * - 本视图只负责注入端的 ②（中间层目录摘要）与 ③（B 缓存摘要）两级回退；
 * - **判 middleware 实例**（apply 完成后恒在；实例缺失＝pre-step 窗口尚未装配 → 全部走 B）。
 *
 * root 映射（单池后与单元表同口径）：
 * - scope=project → 该 cwd 归一化项目 root 的单元 → 无则磁盘 last-good；
 * - scope=global → @global 单元/磁盘 → 仍无则保留 B。
 * 严格按 scope 解析、不跨 scope 混配同名服务器（防不同配置被错配）。
 * 单元不存在时读磁盘 last-good（带 mtime 缓存），**不主动 projectUnitFor**
 * ——pre-step 无连接副作用。
 *
 * diskCatalogSummaryCache（root → server → { mtimeMs, summary }）在闭包内
 * 持有：防 pre-step 每轮重复读盘解析（目录文件最大 ~256KB，JSON parse 有成本）。
 */
export declare function makeCatalogViewFor(host: CatalogViewHost): CatalogViewResolver;
