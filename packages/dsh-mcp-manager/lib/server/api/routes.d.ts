/**
 * dsh-mcp-manager — HTTP 路由装配层（依赖 import 模块与仓库共享层）。
 *
 * /api/dsh-mcp/* 路由供 web GUI 分级展示、快速接入、导入 mcpServers JSON；
 * events 为 SSE 状态推送通道。loopback 保持快路径；非回环统一接官方 connection
 * admission，不复制认证算法。
 * 由 lib/index.js 组合根 re-export（ROUTES / makeRoutes）。
 *
 * #592 阶段二 Batch A 消峰：各端点 handler 已拆离至 routes-controllers.ts
 * 的独立控制器工厂（原 makeRoutes 单函数圈复杂度 84 → 装配后 <= 15）；
 * 本文件只保留 ROUTES 常量、装配函数与 SSE/health 工厂（SSE/health 原本
 * 即独立工厂形态，复杂度低，随装配层同文件保留）。
 */
import { admitLongLivedRequest } from "../../../shared/host-utils.js";
import type { SseHub } from "../../../shared/sse-hub.js";
import { ROUTES } from "../../shared/interface.js";
import type { RoutesManager } from "../connection/interface.js";
import type { WebRoute } from "@deepseek-ai/dsh-host-webserver";
import type { ServerResponse } from "node:http";
import { type RouteAccess } from "./routes-controllers.js";
import { queryParam } from "./routes-helpers.js";
export { ROUTES };
export { queryParam };
/** 组装 /api/dsh-mcp/* 路由。cwd 参数仅用于兼容旧调用（不再被路由使用）。 */
export declare function makeRoutes(manager: RoutesManager, _cwd?: string): WebRoute[];
/** API 域内部入口：组合根注入官方动态 admission，不进入包根公开 ABI。 */
export declare function makeRoutesWithAccess(manager: RoutesManager, _cwd?: string, access?: RouteAccess): WebRoute[];
/** 配置变更 SSE 帧：客户端收到后重新 GET /api/dsh-mcp/config 就地更新浮窗位置。 */
export declare function uiConfigChangedFrame(): string;
/**
 * SSE 心跳间隔：30s data ping（对齐 dsh-notifier HEARTBEAT_MS 形态，#268）。
 * 必须用 data 而非注释帧——注释帧既不触发客户端 onmessage 也不触发 onerror，
 * 半开连接（移动端切后台系统冻结 JS 并静默掐断 TCP）时客户端零事件无法自愈；
 * data 帧喂客户端 60s watchdog 使其能检测失活并关旧建新。
 * #515 起心跳由共享 hub（shared/sse-hub.js）统一管理，本常量保留兼容导出。
 */
export declare const SSE_HEARTBEAT_MS = 30000;
/** 心跳 ping 帧（内容固定，模块级缓存避免逐次序列化；#515 起 hub 内置同帧）。 */
export declare const SSE_PING_FRAME: string;
/**
 * 向全部 SSE 连接写出一帧（#515 起收口到共享 hub；本函数保留兼容导出，
 * 接受 hub 或旧 Set 形态）。判死/背压由 hub writeFrame 统一处理。
 */
export declare function broadcastFrame(connections: SseHub | Set<ServerResponse> | undefined, frame: string): void;
/**
 * 状态变化推送通道（SSE）：浏览器端 EventSource 订阅，宿主状态变化时
 * 广播 `{ type: "summary" }` 帧（内容不随帧传输，浏览器收到后自行拉取）。
 *
 * #515 起连接管理收口到共享 hub（shared/sse-hub.js）：manager.sseHub 惰性创建
 * （连接表 + 心跳 + stalled/maxAge 主动回收），本路由只负责入表与首帧——
 * 取代旧裸 Set + per-connection 心跳（#268/#515，消除与 dsh-notifier 不对称）。
 *
 * 半开连接防护（#268，对齐 dsh-notifier）：hub 每 30s 向全部连接写 data ping
 * 心跳——移动端切后台系统冻结 JS 并静默掐断 TCP，两端均收不到 FIN/RST，
 * 无心跳则客户端 watchdog 无失活信号可依。
 */
export declare function makeEventsRoute(manager: RoutesManager, options?: {
    heartbeatMs?: number;
}): WebRoute;
/** API 域内部入口：保留公开 heartbeat 参数并追加官方 peer admission。 */
export declare function makeEventsRouteWithAccess(manager: RoutesManager, options?: {
    readonly heartbeatMs?: number;
    readonly remotePeerAdmission?: NonNullable<Parameters<typeof admitLongLivedRequest>[1]>["remotePeerAdmission"];
}): WebRoute;
/** 健康检查：插件是否加载、服务器/连接/工具状态（诊断"插件没生效"的标准入口）。 */
export declare function makeHealthRoute(manager: RoutesManager): WebRoute;
/** API 域内部入口：健康检查同样接官方动态 admission。 */
export declare function makeHealthRouteWithAccess(manager: RoutesManager, access?: RouteAccess): WebRoute;
