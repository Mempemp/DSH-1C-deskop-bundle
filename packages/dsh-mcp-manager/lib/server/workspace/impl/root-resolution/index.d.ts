/**
 * dsh-mcp-manager — workspace/impl/root-resolution/index.ts：项目根发现与执行路由解析。
 *
 * 阶段 4 自 src/manager.ts（findProjectRoot/normalizedProjectRoot 方法）与
 * src/apply-runtime.ts（makeResolveRoot）迁入工作空间路由域，纯函数化
 * （不再依赖 manager 实例）；B3 修复（空 cwd 回落含 runtime 源）落位
 * makeResolveRoot。引用面经 workspace/interface.ts。
 */
import type { McpManager } from "../../../connection/interface.js";
import type { ActiveWorkingDirectoryPort } from "../../../shared/interface.js";
/** 项目根发现：从 cwd 向上找 .git / .dsh / .mcp.json 标记，找不到用 cwd 本身。
 *  .dsh 标记须排除 DSH 全局家目录（默认 ~/.dsh，尊重 DSH_HOME）——否则 home
 *  下任何无标记目录（如 ~/dev/leetcode）向上都会命中 ~/.dsh，把 home 误判为
 *  项目根并加载 ~/.dsh/@wingsky-1/dsh-mcp-manager/mcp.json，导致别的会话串入不属于它的项目级 MCP。 */
export declare function findProjectRoot(cwd: string | undefined): Promise<string>;
/** 归一化项目根（realpath；失败回退 resolve）。中间层路由使用。 */
export declare function normalizedProjectRoot(cwd: string | undefined): Promise<string | undefined>;
/**
 * resolveRoot 路由：exec.agent → 归一化项目根（agent-less → undefined）。
 *
 * #1137 语义 A：项目级 MCP 跟随**调用 agent 在调用开始时的活动 workingDirectory**，
 * `session.header.cwd` 只是创建目录/初始项目身份，不再作为活动目录猜测值。
 *
 * 每次调用**开始时**取一次快照并在本调用内固定：切目录后的**新**调用用新 root；
 * 已开始的调用仍在旧 root 完成（或按既有取消协议取消），不在 await 之后改投。
 * `resolveRoot` 的所有调用点（ws_mcp_list/search/detail/call 与直呼守卫）都在各调用
 * 的首行各调一次，故「每次调用取快照」由结构天然满足（见 middleware-register.ts）。
 *
 * 无有效活动目录时 **fail-closed**：不回退 header.cwd / process.cwd / UI 最近 session /
 * 另一个已连接工作区。唯一例外是**显式** `@global` 可达性（既有 #767 笔 1a 语义：
 * 全局服务器没有 mcp__ 直呼面，@global 不可达即等于不可达）——它只在「确实存在
 * 全局来源服务器」时成立，且**不把未知项目名偷换成同名全局服务器**：此处只返回
 * 全局虚拟 root 本身，无 agent 的隐式项目寻址仍恒 undefined。
 *
 * @param activeDirectory 活动目录读取面（late-read thunk 的产物）。缺席 = 宿主未提供
 *   该服务，等价于「归属未知」→ 项目级操作 fail-closed。
 */
export declare function makeResolveRoot(manager: McpManager, activeDirectory: ActiveWorkingDirectoryPort | undefined): (agent: unknown) => Promise<string | undefined>;
