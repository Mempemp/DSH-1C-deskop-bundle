/** 私有目录权限：同机其它用户不得列举本插件的落盘面（与 mcp.json 的 0o600 同族）。 */
export declare const PACKAGE_DIR_MODE = 448;
/** 目标布局的文件名（迁移契约）。 */
export declare const CONFIG_FILE_NAME = "mcp.json";
export declare const USER_STATE_FILE_NAME = "user-state.json";
export declare const CATALOG_DIR_NAME = "catalog";
export declare const CATALOG_SUMMARY_FILE_NAME = "catalog-summary.json";
export declare const STATS_FILE_NAME = "stats.json";
export declare const VERSION_FILE_NAME = "version";
/**
 * 旧版布局清单（迁移的**读面**，新代码不得回写）：两类用户数据散在 DSH home 根。
 *
 * 收缩依据：目录摘要与调用统计可再生、不进迁移（见计划 §2.3）；目录型旧路径
 * `dsh-mcp-catalog/` 同理可再生，随本笔一并退出迁移面。
 */
export declare const LEGACY_LAYOUT: {
    readonly config: "dsh-mcp.json";
    readonly userState: "dsh-mcp-user-state.json";
};
/** 本插件私有目录。 */
export declare function mcpManagerHome(): string;
/** 全局服务器配置：本包最敏感的一档（含 env 引用与凭据字段）。 */
export declare function configFile(): string;
/**
 * 用户状态（disabledTools 等）。
 *
 * 名字用 Path 而不是 File：入口今天仍导出旧实现 `userStateFile()`（返回旧路径），两个同名函数
 * 在迁移期同时存在会让「拿到的是新路径还是旧路径」无从判读，导出面门禁也会看到两个同名定义块。
 */
export declare function userStatePath(): string;
/** 目录 last-good 缓存的**目录**（每工作空间一份 `<hash>.json`）。 */
export declare function catalogDir(): string;
/** 目录 last-good 缓存文件。 */
export declare function catalogFile(hash: string): string;
/** 目录摘要缓存。 */
export declare function catalogSummaryFile(): string;
/** 调用统计。 */
export declare function statsFile(): string;
/** 存储版本刻度（升级链走到哪一版，不是插件版本——后者读 package.json）。 */
export declare function versionFile(): string;
/** 项目级服务器配置：包分区新形态（迁移目标，写面只认它）。 */
export declare function projectConfigFile(projectRoot: string): string;
/**
 * 项目级旧扁平形态（迁移**读面**，新代码不得回写）：`isProjectConfigFile` 只认新形态，
 * 故写函数天然拒绝它——与全局 LEGACY_LAYOUT 的「旧路径只读」同族。
 */
export declare function legacyProjectConfigFile(projectRoot: string): string;
/** 旧版布局下的一个文件（DSH home 根）。 */
export declare function legacyFile(fileName: string): string;
/** 目标文件的登记 mode；未登记即抛错，写函数不替调用点做权限决定。 */
export declare function fileMode(file: string): number | null;
/**
 * 目标目录的登记 mode：插件自有目录 0o700；项目 `.dsh/` 及其下的包分区叶子目录随项目
 * （null）；未登记即抛错。
 *
 * 注：`PACKAGE_DIR` 含 `/`，`basename(dir) === PACKAGE_DIR` 恒为假，故按末段 +
 * 祖父层 `.dsh` 双条件识别（与 `isProjectConfigFile` 同形）。`ensureDir` 只校验传入的
 * 那一级目录，叶子登记 null 即够（`mkdir recursive` 建中间级不另校验）。
 */
export declare function directoryMode(dir: string): number | null;
