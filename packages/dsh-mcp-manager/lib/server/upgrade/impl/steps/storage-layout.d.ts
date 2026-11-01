import type { UpgradeDeps } from "../../deps.js";
/**
 * 旧存储 → 新存储布局。逐项独立（一项搬不动不影响其余），但**搬不动都抛出**：迁移没做完而启动照常，
 * 等于让各域按错误的形态去读数据。幂等：目标已存在即处理过，归档名固定、重跑不累积。
 *
 * 用户显式配置了 `storePath` 的那一项**整项不动**——不迁移、不改写、也不建初始形态：
 * 插件继续读用户那个文件，默认落点上的旧文件不是它的数据，搬走或归档都是替用户做主张。
 */
export declare function migrateStorageLayout(deps: UpgradeDeps): Promise<void>;
/**
 * 落定一项。目标已存在即视为「这一份处理过了」：不覆盖、只把源文件归档——用户可能已经在新位置改过
 * 东西，用旧文件盖回去等于用历史覆盖现在。`initial` 为 null 的落点（项目级配置：缺文件即空
 * store，没有各自的初始形态）不建文件。
 *
 * 项目级 just-in-time 迁移（`./project-layout.ts`）复用本函数：同文件内的 `settleOne` 即同一语义。
 */
export declare function settleOne(source: string, target: string, initial: string | null, deps: UpgradeDeps): Promise<void>;
