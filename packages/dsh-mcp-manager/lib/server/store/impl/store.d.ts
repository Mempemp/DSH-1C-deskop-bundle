/**
 * dsh-mcp-manager — 配置存储（独立模块，无内部依赖）。
 *
 * 服务器配置持久化在本插件私有目录（路径的物理定义在 server/shared/paths.ts，版本化，
 * 原子写入）。由 lib/index.js 组合根 re-export。
 */
import type { ServerConfig } from "../../config/interface.js";
/**
 * 默认配置存储路径。文件名与权限是迁移契约，只能来自 server/shared/paths.ts 的单点定义；
 * 就地拼 DSH_HOME 与文件名会让迁移的读面与写面各持一份字面量（I7）。
 */
export declare function defaultStorePath(): string;
/**
 * 版本化存储：{ version: 1, servers: ServerConfig[] }。
 * 记录磁盘基线（mtime + 全文快照）：外部修改（git pull / 手动编辑）可被
 * reloadIfChanged 检测，无需重启宿主即生效；save 前若基线已失配则 fail-closed
 * 抛错（#903 M3-store 反写：静默覆盖外部编辑即丢用户数据）。
 */
export declare class McpStore {
    path: string;
    data: {
        version: number;
        servers: ServerConfig[];
    };
    /** 上次读/写时的文件 mtime；undefined = 从未建立基线，0 = 当前文件不存在。 */
    mtimeMs: number | undefined;
    /** 上次读/写时的文件全文快照（同毫秒 mtime 漏检的第二道锁，#903 M3-store）；null = 无文件内容基线。 */
    snapshot: string | null;
    constructor(path: string);
    load(): Promise<void>;
    save(): Promise<void>;
    private renameWithRetry;
    /** 单次落盘：链内写前冲突检查（fail-closed）+ 唯一 tmp 名 + 失败清理后上抛原错误。 */
    private writeSnapshot;
    /** 磁盘文件是否已被外部修改（mtime 不等即变更；mtime 相等再比全文快照，防同毫秒漏检；无基线不视为变更）。 */
    changedOnDisk(): Promise<boolean>;
    private changedSince;
    /** 外部变更时重读；返回是否发生了重读。 */
    reloadIfChanged(): Promise<boolean>;
    find(name: string): ServerConfig | undefined;
    upsert(server: ServerConfig): void;
    remove(name: string): void;
}
