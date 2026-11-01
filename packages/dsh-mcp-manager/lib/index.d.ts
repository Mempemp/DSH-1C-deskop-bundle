/**
 * dsh-mcp-manager — 主机端（组合根）。
 *
 * 管理本机的 MCP（Model Context Protocol）服务器并桥接到 DSH：
 *  - 服务器配置持久化在本插件私有目录（路径与权限的单一事实源是 server/shared/paths.ts，
 *    版本化，原子写入）；
 *  - 连接与协议交官方 @deepseek-ai/dsh-mcp-client（经宿主 cordis loader 按包名装载，
 *    stdio / streamable-http 两种传输），本插件只留配置面与模型可见面；有界退避重连由
 *    官方插件承担（自研连接栈已随 #767 S1-5c 整体退役）；
 *  - 每个已连接服务器的工具以 mcp__<id>__<rawName> 注册进 ctx.tools（与官方 dsh-mcp-client
 *    的装载路径同形）；`id` 是本次装配按 (工作空间, 服务器名) 现分配的不透明短串，`/api/dsh-mcp/servers`
 *    的 summary.tools 才是注册名以外的裸名口径；
 *  - /api/dsh-mcp/* 路由（loopback-only）供 web GUI 分级展示、快速接入、粘贴
 *    mcpServers JSON 导入；
 *  - 零运行时依赖：官方客户端不随包分发（不经 import 值引用，避免打包副本），由宿主
 *    解析到 dsh 安装内的副本。
 *
 * 激活：安装进 profile（见 cordis.patch.yml 注释），重启一次 dsh web 后，侧边栏出现
 * 「MCP」入口。
 *
 * 结构：#767 W11a 起本文件是唯一的组合根与 apply 装配体——静态端口的模块求值期装配、
 * apply 主流程与配置解析、存量存储迁移的接线、包导出面与声明合并都在这里（原
 * src/bootstrap/** 六文件并入；src 顶层只允许 client / index.ts / server / shared 四项）。
 * 各落点域端口化之后才谈把它再拆出去。
 */
import type { Context } from "@deepseek-ai/cordis";
import type { McpManagerService } from "./shared/interface.js";
import type { DebugConfig } from "./server/stats/interface.js";
/** 稳定的 cordis 插件名。 */
export declare const name = "mcp-manager";
/** 需要已初始化的工具注册表、web 服务器与提示词组装器。 */
export declare const inject: string[];
export declare const MCP_GUIDANCE: string;
/** 解析 debug 配置。 */
export declare function resolveDebugConfig(config: Record<string, unknown> | undefined, settingsSource?: unknown): DebugConfig;
/**
 * MCP 能力宣告在系统提示中的排序位置：紧随部署 persona 之后、计划策略之前
 * （官方 SECTION_ORDERS 里 DEPLOYMENT_PERSONA_PREFIX=0 与 PLAN_POLICY=500 之间）。
 *
 * 不写成 getSectionOrder() 派生：0.1.5 把 HARNESS_SOURCE/WEB_SURFACE 从 -900/-800
 * 移到 10000/10100（官方对提示词整体重排），本段落与相邻段的相对位置不受影响，
 * 派生只多一层运行时依赖与失败面；改由 smoke 的分节顺序断言锁定区间。
 */
export declare const MCP_SECTION_ORDER = 160;
/**
 * 挂载 MCP 管理器：加载存储、启动已启用服务器、注册路由与提示词。
 * @param {import("@deepseek-ai/cordis").Context} ctx - 宿主插件上下文。
 * @param config 解析后的插件配置。
 */
export declare function apply(ctx: Context, config: Record<string, unknown> | undefined): Promise<void>;
export { DEFAULT_UI_CONFIG, normalizeUiConfig, buildConfigUiPatch, Config, } from "./server/config/interface.js";
export type { UiPlacementConfig } from "./server/config/interface.js";
export type { ClientUiConfig } from "./shared/interface.js";
export { DEFAULT_TOOL_CALL_TIMEOUT_MS, publicToolName, } from "./server/connection/runtime/interface.js";
export { makeResolveRoot } from "./server/workspace/interface.js";
export { createRedactor } from "./server/pipeline/interface.js";
export type { McpManagerServerInput, McpManagerService } from "./shared/interface.js";
/**
 * 服务名：本插件对兄弟插件开放的 ABI。声明合并的键引用它，而不是就地再写一遍字面量——两处字面量
 * 在改名时只会有一处被改到，而症状（消费方 `ctx.get` 拿到空）出现在别的插件里。名字的所有权在
 * 提供方（本文件的 provideMcpManagerService）；合并它与 provide 字面量要同笔改 service-contract.test.ts 的源文本 marker，归后续刀。
 *
 * 它不进包导出面：入口对外只有声明合并本身，常量不外放。
 */
declare const MCP_MANAGER_SERVICE: "mcpManager";
/**
 * 对外名字的声明合并。**必须写在包入口**：declare module 是全局增强，入口声明面不可达时
 * `lib/index.d.ts` 里就没有它（`pack:check` 的「声明合并可达性」判据盯这条）。
 */
declare module "@deepseek-ai/cordis" {
    interface Context {
        /** mcp-manager 核心服务：其他插件运行时注入/控制/查询 MCP 服务器（官方 storageDomain 模式）。 */
        [MCP_MANAGER_SERVICE]: McpManagerService;
    }
}
export { defaultStorePath } from "./server/store/interface.js";
export { DEFAULT_ANNOUNCE_CATALOG, DEFAULT_CATALOG_MAX_ENTRIES, renderMcpCatalogMessage, findCatalogMessage, readCatalogEntries, isCatalogSource, resolveCatalogEntries, CATALOG_SOURCE_PLUGIN, CATALOG_SECTION_NAME, renderMcpCatalogUpdate, resolveCatalogInjection, } from "./server/catalog/interface.js";
export { fromClaudeEntry, parseClaudeJson, SERVER_NAME_PATTERN, normalizeServer, } from "./server/config/interface.js";
export { defaultStatsPath } from "./server/stats/interface.js";
export type { McpStatsSnapshot, ServerStats, ToolCallMetric, ProgressiveDisclosureStats, DebugConfig, } from "./server/stats/interface.js";
export { registerMiddlewareTools } from "./server/inject/interface.js";
export type { SearchHit, ListToolEntry, ListServerEntry, ListCatalogResult, ToolDetail, } from "./server/catalog/interface.js";
export type { DisabledToolsMap } from "./server/store/interface.js";
export type { ServerConfig } from "./server/config/interface.js";
export { ROUTES, makeRoutes, makeEventsRoute, makeHealthRoute, uiConfigChangedFrame, broadcastFrame, SSE_PING_FRAME, } from "./server/api/interface.js";
export { MIDDLEWARE_GLOBAL_ROOT, SCOPE_GLOBAL, SCOPE_PROJECT } from "./shared/interface.js";
