/**
 * dsh-mcp-manager — 路由控制器工厂（#592 阶段二 Batch A：makeRoutes 消峰）。
 *
 * 每个控制器是「buildXxxRoute(manager, helpers) → WebRoute」形态的纯工厂：
 * 拆分前 makeRoutes 单函数圈复杂度 84（全仓第一），复杂度全部来自内联在各
 * 路由 handler 闭包中的方法分流与字段校验分支；拆分后 makeRoutes 退化为
 * 数组装配（comp <= 15），每个控制器的分支彼此独立、可独立理解与测试。
 *
 * 行为约束（与拆分前逐字节等价）：
 * - 路由路径与围栏（方法白名单 / loopback 豁免）取自 shared/routes.ts 单点；
 * - loopback 围栏与 405 分流顺序不变（#473 R2：config GET 豁免 loopback，
 *   白名单外方法先于 loopback 直接 405）；
 * - JSON body 字节上限沿用 readJsonBody 的默认行为（历史上那个显式上限
 *   常量 MAX_JSON_BODY_BYTES 已不存在）。
 *
 * 跨域取数一律经 apiPorts（见 deps.ts 与 impl/service），值为模块求值期绑定：
 * installApi 在包入口顶层完成，handler 内的 get() 取到的一定是装配后的能力。
 */
import type { WebRoute } from "@deepseek-ai/dsh-host-webserver";
import type { ServerResponse } from "node:http";
import type { RoutesManager } from "../connection/interface.js";
import type { ServerConfig } from "../config/interface.js";
import type { McpStore } from "../store/interface.js";
/** 控制器共享 helpers（原 makeRoutes 闭包三件套，提升为显式参数）。 */
export interface RouteHelpers {
    handleError(res: ServerResponse, error: unknown): void;
    scopeParam(url: URL): string;
    maybeSession(url: URL): Promise<void>;
}
/** UI 配置读写（GET 豁免 loopback；写操作 loopback-only，未知顶层键 400）。 */
export declare function buildConfigRoute(manager: RoutesManager, helpers: RouteHelpers): WebRoute;
/** 服务器集合 CRUD：GET 快照（纯读）/ POST 添加 / PATCH 更新 / DELETE 删除。 */
export declare function buildServersRoute(manager: RoutesManager, helpers: RouteHelpers): WebRoute;
/** 会话切换（跟随会话的项目级 MCP）。 */
export declare function buildSessionRoute(manager: RoutesManager, helpers: RouteHelpers): WebRoute;
/** 切回前台可用性恢复（非强制，#1120）：body 可选 { cwd?: string }。
 * - 无 body（旧客户端）：回落既有绑定，manager.resumeReconnect() 无参；
 * - 有 cwd（含 "")：本次固定 root（""=明确无工作区→@global，不回落他人绑定）；
 * - 非对象（含数组，readJsonBodyOutcome 把数组归 json 需此处拒）/ cwd 非字符串 → 400
 *   且不触发恢复。路径/围栏/方法分流不动。 */
export declare function buildResumeRoute(manager: RoutesManager, helpers: RouteHelpers): WebRoute;
/** POST /servers/connect：连接单服务器。 */
export declare function buildConnectRoute(manager: RoutesManager, helpers: RouteHelpers): WebRoute;
/** POST /servers/disconnect：断开单服务器。 */
export declare function buildDisconnectRoute(manager: RoutesManager, helpers: RouteHelpers): WebRoute;
/** POST /servers/reconnect：重连单服务器。 */
export declare function buildReconnectRoute(manager: RoutesManager, helpers: RouteHelpers): WebRoute;
/** 单台服务器的导入落点：在册且未开 overwrite → 记 skipped；在册开 overwrite → update；否则 add。 */
export declare function importOneServer(server: ServerConfig, store: McpStore, scope: string, overwrite: boolean, manager: RoutesManager, imported: string[], skipped: string[]): Promise<void>;
/** 导入 mcpServers JSON（同名 skip，overwrite=true 时更新）。 */
export declare function buildImportJsonRoute(manager: RoutesManager, helpers: RouteHelpers): WebRoute;
/** 路由一致性校验：@global 或当前会话项目 root 才可写（防跨空间串台）。放行返回 null。 */
export declare function workspaceMismatchError(root: string, sessionRoot: string | undefined, server: string): string | null;
/** 工具级禁用开关（PATCH；root 路由一致性校验防跨空间串台）。 */
export declare function buildToolDisableRoute(manager: RoutesManager, helpers: RouteHelpers): WebRoute;
