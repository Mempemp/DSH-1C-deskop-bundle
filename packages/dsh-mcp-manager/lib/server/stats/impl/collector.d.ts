/**
 * dsh-mcp-manager — MCP 调用统计收集器（纯模块，单例管理）。
 *
 * 核心特性：
 * 1. 内存聚合：按 server/tool 维护聚合指标，同时维护渐进式披露漏斗（search/list/detail）；
 * 2. 防抖原子写盘（debounce 1000ms）：使用临时文件 + rename 保证落盘不损坏；
 * 3. 零侵入：未开启时直接短路，零 I/O、零内存分配；
 * 4. 退出刷新：支持 dispose/flush 同步或异步刷盘；
 * 5. Metadata-Only：不记录任何业务 arguments 或结果 content，防隐私泄露。
 */
import type { McpStatsSnapshot } from "./type.js";
/** 默认统计落盘路径（落点单源在 server/shared/paths.ts；此处只转发）。 */
export declare function defaultStatsPath(): string;
export declare class McpStatsCollector {
    private enabled;
    private filePath;
    private logger?;
    private startedAt;
    private updatedAt;
    private servers;
    private disclosure;
    private flushTimer?;
    private isDirty;
    constructor(options?: {
        enabled?: boolean;
        filePath?: string;
        logger?: {
            info?: (msg: string) => void;
            debug?: (msg: string) => void;
        };
    });
    /** 更新运行配置（热重载 / 设置同步）。 */
    configure(options: {
        enabled?: boolean;
        filePath?: string;
        logger?: {
            info?: (msg: string) => void;
        };
    }): void;
    isEnabled(): boolean;
    /**
     * 从现有磁盘文件加载既有计数（避免进程重启后归零）。同步读保持：构造器 +
     * `configure` 是同步契约，file-io 只有异步读（`readJsonFile`），此处不可调；
     * 语义（缺失/损坏/目录 → 忽略重计）与 `readJsonFile` 的 null 回落同族。
     */
    private loadExisting;
    /** 记录工具调用（ws_mcp_call 或直呼工具）。 */
    recordCall(server: string, tool: string, durationMs: number, success: boolean, errorMsg?: string): void;
    /** 记录渐进式披露漏斗：ws_mcp_search 搜索词。 */
    recordSearch(query: string): void;
    /** 记录渐进式披露漏斗：ws_mcp_list 查询过滤项。 */
    recordList(serverFilter?: string): void;
    /** 记录渐进式披露漏斗：ws_mcp_detail 查询。 */
    recordDetail(server: string, tool: string): void;
    /** 导出当前快照（只读数据对象）。 */
    snapshot(): McpStatsSnapshot;
    private scheduleFlush;
    /**
     * 同步原子落盘（临时文件 + 重命名）。S2-C 等价接入（同步安全形态）：mode 经
     * 登记表取（`writeOptionsFor`/`mkdirOptionsFor`，S2-A 口径），未登记回落既有形状。
     * **不**改调异步 `writeFileAtomic`：同步契约（构造器/`flushSync` 直写断言/B2 关闭刷盘/
     * `manager.dispose` 的 fire-and-forget 链）要求返回时盘上已有数据；异步化会把
     * 「退出刷新」变成不可靠的后台写。序列化形状（`snapshot()` + 2 空格）逐字节不变。
     */
    flushSync(): void;
    /** 销毁清理。 */
    dispose(): void;
}
