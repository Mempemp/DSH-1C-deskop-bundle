/**
 * dsh-mcp-manager — servers/lifecycle/impl/mount/index.ts：一个 (root, server) 的真装载（§3.4）。
 *
 * 装载链：workspace 端口取 id → 构造官方 Config（env / headers 经 config 端口预展开）→ loader
 * 按包名解析官方插件 → 账本记账装载 → 跑等待窗口投影六态。官方包不在 catalog、仓库内不可解析，
 * 故包名只能是说明符（见共享层的 OFFICIAL_MCP_CLIENT_SPECIFIER），模块形状由 LoaderPort 给。
 *
 * 为什么 id 不在本块生成：官方 serverName 在 `scopeOf(ctx) ?? ctx.root` 这个**整个应用根**上
 * 活体预留，同 owner 重名当场抛；而「同一 bare 名在全局与某项目都配」是常见写法。id 与
 * `(scope,name)→id` 表归 workspace 域（767-v6-STAGED-PLAN §2.6 裁定 B），本块只消费
 * `idFor(root, name)`——scope 传 root，跨 root 同名因此各自成条。
 *
 * 为什么 Config 逐字段显式构造而不透传配置对象：官方 Config 是 stdio / streamable-http 联合，
 * 多带一个不属于该 transport 的键会被 schema 拒；`serverName` / `failOnStartupError` /
 * `toolCallTimeoutMs` 三个字段还各有一条口径（见 officialMcpConfig 内注释）。
 *
 * 为什么 env / headers 在这里展开：模板落盘、交给官方前才展开是本插件的凭据面不变量——在
 * normalizeServer 里展开等于把明文凭据随下一次 store.save() 写进 storePath（设计 §2.4）。
 */
import type { ServerConfig } from "../../../../config/interface.js";
import type { ServerState } from "../../../../../shared/interface.js";
import type { LedgerEntry } from "../ledger/index.js";
import type { MountWindowOutcome } from "../timeout/index.js";
/** 官方 Config 的公共字段（自持声明：官方包不在 catalog，类型面取不到，形状只在这里写一次）。 */
interface OfficialConfigCommon {
    /** 交给官方的 serverName；本包用 (scope,name) 分配的随机短串（进 `mcp__<id>__` 前缀）。 */
    readonly serverName: string;
    /** 单次工具调用预算。必须显式给：官方默认 60s，缺省会把本插件的 15s 口径放大四倍。 */
    readonly toolCallTimeoutMs: number;
    /** 官方重连策略；未知键已在 config 域归一化期丢弃（官方对未知键直接抛错）。 */
    readonly reconnect: Readonly<Record<string, unknown>>;
    /** 恒 false：首连失败不得卸载实例，理由见 officialMcpConfig 内注释。 */
    readonly failOnStartupError: false;
}
/**
 * 官方 dsh-mcp-client 的 Config 形状。
 *
 * 写成联合而不是「全可选字段的对象」：stdio 与 streamable-http 的字段互斥，用联合让
 * 「给 stdio 带上 url」这类错误在编译期就出不去。
 */
export type OfficialMcpConfig = (OfficialConfigCommon & {
    readonly transport: "stdio";
    readonly command: string;
    readonly args: readonly string[];
    readonly env: Readonly<Record<string, string>>;
    readonly cwd: string;
}) | (OfficialConfigCommon & {
    readonly transport: "streamable-http";
    readonly url: string;
    readonly headers: Readonly<Record<string, string>>;
});
/**
 * 把一条归一化后的服务器配置映射成官方 Config（设计 §2.1 的逐字段表）。
 *
 * 展开函数按参数递入而不是块内现取端口：映射是纯函数，能脱离装配单独测「模板 → 字面量」。
 */
export declare function officialMcpConfig(server: ServerConfig, id: string, expandServerEnv: (server: ServerConfig) => ServerConfig): OfficialMcpConfig;
/** 装载入参：一个 (root, server) 的全部外部输入（本域不自持调用方的状态）。 */
export interface MountServerInput {
    /** 工作空间根（`@<root>/<server>` 的 root，也是 id 表的 scope）。 */
    readonly root: string;
    /** 归一化后的服务器配置；env / headers 仍是模板形态，展开在本块内做。 */
    readonly server: ServerConfig;
    /** 连接等待预算（ms）；缺省取共享层 CONNECT_TIMEOUT_MS（测试用小预算驱动真超时）。 */
    readonly connectTimeoutMs?: number;
    /** 状态投影出口：窗口在起点与结算点各回调一次；被丢弃的结算不回调。 */
    readonly onState: (state: ServerState) => void;
}
/** 一次装载的结果：id 与账本条目供调用方后续定位/拆除，outcome 是等待窗口的结算。 */
export interface MountServerResult {
    readonly id: string;
    readonly entry: LedgerEntry;
    readonly outcome: MountWindowOutcome;
}
/**
 * 装载一个 (root, server)：取 id → 构造官方 Config → 解析模块 → 账本记账挂载 → 跑等待窗口。
 *
 * 三件本函数**刻意不做**的事：不裁决 `enabled === false`（配置面语义归调用方，§2.2-1）、
 * 不在窗口失败时 dispose（连接失败的实例保留给官方后台重连，§3.4 步骤 5a）、不吞装载期异常
 * （解析失败 / 账本撞键一律上抛，避免装配静默少装一个服务器）。
 */
export declare function mountServer(input: MountServerInput): Promise<MountServerResult>;
export {};
