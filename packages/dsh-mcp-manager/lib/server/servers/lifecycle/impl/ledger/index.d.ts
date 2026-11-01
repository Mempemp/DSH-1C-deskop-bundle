/**
 * dsh-mcp-manager — servers/lifecycle/impl/ledger/index.ts：装载账本（确定性回收链，§1.5）。
 *
 * 装载实例不能交给 loader 的 entry 树持有：`EntryTree.create` 末行 `tree.write()` 会把运行期
 * command / args / env（含凭据模板展开后的明文）写回用户 profile。所以官方实例由我方账本持有、
 * 回收也由我方负责——这是两条回收链的主链，兜底链是 `bindHost` 里 `ctx.effect` 注册的 dispose。
 *
 * 已知缺口（照 §1.5 写进实现）：`DomainSpec.release(): void` 是同步签名，而官方 `dispose()` 会
 * await 首次连接尝试的在途 Promise（挂死的服务器可能等到 SDK 的 60s initialize 超时）。
 * 因此 `release()` 与单键的 `releaseOne()` 都只**发起** dispose 并把 Promise 收进 pendingDisposals，
 * 另开 `flushDisposals()` 供测试与真机验证显式等待；需要等结算的单键路径用 `dispose()`。
 *
 * 键由调用方给（id 生成与 `(scope,name)→id` 表归 workspace 域，§2.6 裁定 B）：本域不生成 id，
 * 也不把键写进 MountedPlugin——端口因此对配置与命名保持无感知。同一键未释放前重复 mount
 * 属编程错误，不等官方那句 `serverName is already in use`（那是第二道闸，不是第一道）。
 */
import type { MountedPlugin, OfficialPluginModule } from "../../../../shared/interface.js";
/** 账本条目：一次装载留下的全部我方痕迹（模块与配置只为排查用，不参与回收裁决）。 */
export interface LedgerEntry {
    readonly key: string;
    readonly module: OfficialPluginModule;
    readonly config: unknown;
    readonly handle: MountedPlugin;
}
declare class MountLedger {
    private readonly entries;
    /** 释放后待结算的 dispose：只收不 await，见文件头「已知缺口」。 */
    private pending;
    /** 记账并**发起**装载：先查键再装，撞键当场抛（早失败 + 判词点名键）。 */
    mount(key: string, module: OfficialPluginModule, config: unknown): LedgerEntry;
    get(key: string): LedgerEntry | undefined;
    get size(): number;
    /** 该条目是否仍是账本当前代际：被替换或已移除都不算——晚到结算据此丢弃（代际守卫）。 */
    isCurrent(entry: LedgerEntry): boolean;
    /**
     * 单键释放，**只发起不等结算**：摘账同步生效（`isCurrent` 立刻为假），dispose 收进既有
     * pending。拆除路径用它——见文件头「已知缺口」；要等结算的重建路径用 `dispose()`。
     */
    releaseOne(key: string): void;
    /** 单键释放：先摘账（同步生效，isCurrent 立刻为假）再等句柄结算。 */
    dispose(key: string): Promise<void>;
    /** 域卸载：逐条摘账并发起 dispose，不等结算（见文件头「已知缺口」）。 */
    release(): void;
    /**
     * 等待已发起的 dispose 全部落定。任一失败如实上抛：兜底链保证的是「卸载不卡住」，
     * 不是「dispose 永不失败」，吞掉错因会让泄漏变成静默。
     */
    flushDisposals(): Promise<void>;
}
/** 本域唯一的账本实例：类不外放，外部 new 不出第二份账。 */
export declare const mountLedger: MountLedger;
export {};
