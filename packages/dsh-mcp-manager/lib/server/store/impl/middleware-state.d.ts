/**
 * dsh-mcp-manager — 中间层用户状态与目录缓存持久化（单一事实源）。
 */
import type { ProjectUnit } from "../../connection/interface.js";
/** 用户已禁用的工具集合（root → server → tool 列表）。root 为 @global 时跨工作空间共享。 */
export type DisabledToolsMap = Map<string, Map<string, Set<string>>>;
/** userDisabled 持久化文件路径（名字与权限的物理定义在 server/shared/paths.ts，I7 单源）。 */
export declare function userStateFile(): string;
/** 加载 userDisabled（损坏/缺失 → 空）。 */
export declare function loadUserState(file: string): Promise<Map<string, Set<string>>>;
/** 持久化 userDisabled（合并式：先读现有文件，内存 units 覆盖，保留已淘汰
 * root 的记录——防 LRU 淘汰/卸载后禁用记录被静默抹掉，P1 修复）。
 * 同文件 `disabledTools` 键原样保留（#903 S1 双键互抹修复）。 */
export declare function saveUserState(file: string, units: Map<string, ProjectUnit>): Promise<void>;
/** 目录缓存文件路径（每工作空间一份；root 哈希防路径注入；落点单源在 server/shared/paths.ts）。 */
export declare function catalogCacheFileFor(root: string): string;
/** 磁盘 last-good 目录文件中的单服务器条目（与 middleware persistCatalog
 * 落盘结构一致；读取端单一解析源）。 */
export interface PersistedCatalogServer {
    discoveredAt: number;
    tools: Array<{
        name: string;
        description: string;
    }>;
}
/**
 * 读取 root 的磁盘 last-good 目录缓存中**单个服务器**的工具目录。
 * 缺失 / 损坏 / 无该服务器 → undefined（容错不抛）。
 * 用途：能力目录注入端（manager.catalogViewFor）在中间层单元尚未创建时兜底
 * 读盘，避免 pre-step 触发连接副作用；与 middleware.loadCatalogCache 同源解析。
 */
export declare function readCatalogServerFromDisk(file: string, serverName: string): Promise<PersistedCatalogServer | undefined>;
/** 从持久化载荷解析 disabledTools 三层结构（损坏/缺失 → 空；容错不抛）。
 *  阶段 6 自 middleware-utils.ts 并入（状态域归属；loadDisabledTools 同文件引用）。 */
export declare function parseDisabledTools(raw: unknown): DisabledToolsMap;
/** 加载工具级禁用（disabledTools 三段：root → server → tool[]；损坏/缺失 → 空）。 */
export declare function loadDisabledTools(file: string): Promise<DisabledToolsMap>;
/**
 * 持久化工具级禁用。内存映射是进程内完整视图（启动时 loadDisabledTools 全量
 * 加载 + setToolDisabled 增量变更），直接整图写盘即满足「多工作空间互不抹掉」
 * （同一进程内所有空间共用同一映射）；跨进程并发写属读-改-写竞态，与
 * 服务器级 userDisabled（saveUserState）现状一致。
 * 同文件 `disabled` 键原样保留（#903 S1 双键互抹修复，对称侧）。
 */
export declare function saveDisabledTools(file: string, disabledTools: DisabledToolsMap): Promise<void>;
