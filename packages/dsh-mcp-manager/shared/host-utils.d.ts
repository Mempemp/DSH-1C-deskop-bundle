import type { IncomingMessage, ServerResponse } from "node:http";
/**
 * Loopback 围栏判定参数。
 * - allowCrossSiteNoCors（#549）：仅 serve 类资源伺服路由使用——放行「显式
 *   sec-fetch-mode: no-cors」的跨站子资源请求（sandbox iframe opaque origin
 *   的相对路径 css/js/img 加载）；cors fetch/XHR 与 navigate 仍拒绝。
 *   普通 /api 路由必须保持默认（不传 options）拒绝一切 cross-site。
 */
export interface LoopbackOptions {
    allowCrossSiteNoCors?: boolean;
    /**
     * 非回环请求的官方认证源。必须每次请求现取 `ctx.connection`，不得缓存 service 实例。
     * 未提供、读取失败或 connection 已卸载时由 routeFenceRejection fail-closed。
     */
    remoteAdmission?: RemoteAdmissionSource;
    /** 长连接请求的官方 peer admission；仅 SSE/流式 route 使用。 */
    remotePeerAdmission?: RemotePeerAdmissionSource;
}
/** 官方 `ctx.connection.requestRejection()` 的最小结果面。 */
export type RemoteAdmissionRejection = 401 | 403 | undefined;
/** 一次非回环请求的官方 admission；`undefined` 表示 Host/Origin 与凭据均已通过。 */
export type RemoteAdmission = (request: IncomingMessage) => RemoteAdmissionRejection;
/** admission 的动态来源；每次 HTTP 请求调用一次，使 connection 替换或卸载立即生效。 */
export type RemoteAdmissionSource = () => RemoteAdmission | undefined;
/**
 * 官方 `PeerScope` 中本层绑定长连接所需的最小公开面。rc.1 的 PeerScope.ctx 是随 Peer
 * dispose 的 Cordis Context；这里只保留 `effect`，不持有认证材料，也不复制认证算法。
 */
export interface RemotePeerScope {
    readonly ctx: {
        effect(execute: () => () => void, label?: string): unknown;
    };
}
/** 官方 `connection.admit()` 的成功/拒绝结果。 */
export type RemotePeerAdmissionResult = {
    readonly peer: RemotePeerScope;
} | {
    readonly rejection: 401 | 403;
};
/** 一次非回环长连接请求的官方 admission。 */
export type RemotePeerAdmission = (request: IncomingMessage) => RemotePeerAdmissionResult;
/** peer admission 的动态来源；同样必须在每次连接请求时重新读取 connection。 */
export type RemotePeerAdmissionSource = () => RemotePeerAdmission | undefined;
/** cordis Context 的最小读取面；`strict: false` 是面向可选服务探测的官方调用形态。 */
export interface ConnectionLookupContext {
    get(name: string, strict?: boolean): unknown;
}
export declare function isLoopbackRequest(request: IncomingMessage, options?: LoopbackOptions): boolean;
/**
 * 从当前 Context 建立动态 admission 源。
 *
 * 闭包只保留 Context；每次请求重新 `get("connection", false)`，不缓存 connection 或方法。
 */
export declare function liveConnectionAdmission(ctx: ConnectionLookupContext): RemoteAdmissionSource;
/** 从当前 Context 建立长连接 peer admission 源，成功结果保留官方 PeerScope。 */
export declare function liveConnectionPeerAdmission(ctx: ConnectionLookupContext): RemotePeerAdmissionSource;
/**
 * 长连接请求认证：loopback 仍走旧快路径且不绑定 connection Peer；非回环必须从
 * 当前官方 connection admission 拿到 PeerScope，供调用方注册 peer.ctx.effect()。
 */
export declare function admitLongLivedRequest(request: IncomingMessage, options?: LoopbackOptions): {
    readonly peer?: RemotePeerScope;
} | {
    readonly rejection: 401 | 403;
};
/**
 * 把长连接清理登记到官方 PeerScope 的 ctx.effect；Peer 释放/connection 卸载时自动执行。
 * 返回的 disposer 供客户端先断开时注销 effect，重复调用由 Cordis 保持幂等。
 */
export declare function bindPeerLifecycle(peer: RemotePeerScope, cleanup: () => void, label: string): () => void;
/**
 * 路由认证裁决：回环快路径保持原样，非回环交给官方 connection admission。
 *
 * 非回环路径中，source/service/method 缺失、抛错或返回未知值一律 403。`undefined`
 * 只来自当前官方 admission，表示 Host/Origin 与浏览器/API 凭据均已通过。
 */
export declare function routeFenceRejection(request: IncomingMessage, options?: LoopbackOptions): RemoteAdmissionRejection;
/**
 * 路由认证 + 方法白名单低阶守卫。
 *
 * **对本守卫的执行顺序**：回环快路径；非回环走官方 connection admission，
 * 401/403 原样返回；认证通过后才检查方法，方法不在白名单 → 405。该顺序仅对
 * **套本守卫的端点**成立——个别端点（如
 * mcp-manager /config）是端点级方法分流先于 loopback 的刻意例外，不适用。
 *
 * @param req - Node http 请求对象。
 * @param res - 响应对象。
 * @param methods - 允许的 HTTP 方法白名单。
 * @param loopbackOptions - 透传给
 *   isLoopbackRequest 的可选判定参数；`remoteAdmission` 只在非回环路径启用。
 * @returns 是否放行（true 时调用方继续处理请求）。
 */
export declare function guardLoopbackMethod(req: IncomingMessage, res: ServerResponse, methods: string[], loopbackOptions?: LoopbackOptions): boolean;
/**
 * 写 JSON 响应（统一带 referrer-policy 头，防 referrer 泄露）。
 * @param res - 响应对象。
 * @param status - HTTP 状态码。
 * @param payload - 序列化为 JSON 的负载。
 */
export declare function writeJson(res: ServerResponse, status: number, payload: unknown): void;
/**
 * 序列化一帧 SSE data 行（输出形如 `data: <json>\n\n`）。
 * 与 mcp-manager / notifier / provider-usage 三处历史实现逐字同构（#472 收敛）。
 * JSON.stringify(undefined) 返回 undefined，拼接为 `data: undefined\n\n`；含真实
 * 换行的 payload 由 JSON 转义为字面 `\n`，不拆多行 data 帧。现状三处均无调用点
 * 传 undefined（payload 恒为对象字面量），该行为仅为对齐历史、不额外兜底，
 * 非承诺契约——若未来收紧（抛错/省略）不视为破坏兼容（需单开决策）。
 * @param payload - 序列化为 JSON 的 SSE 帧负载。
 * @returns SSE data 帧文本。
 */
export declare function sseData(payload: unknown): string;
/** 请求体读不出来的具体成因：供端点在失败文案里说清是哪一种。 */
export type JsonBodyInvalidReason = "too-large" | "unreadable" | "malformed" | "not-object";
/** `readJsonBodyOutcome` 的成因可辨结果：缺席（可选 body 未给）/ 合法对象 / 非法（带具体成因）。 */
export type JsonBodyOutcome = {
    kind: "absent";
} | {
    kind: "json";
    value: object;
} | {
    kind: "invalid";
    reason: JsonBodyInvalidReason;
};
/**
 * 读请求 body（JSON）并**保留失败成因**。
 *
 * 为什么需要它：`readJsonBody` 把「没给 body」「JSON 畸形」「超出上限」「JSON 合法但不是对象」
 * 收敛成同一个 undefined，调用方想区分「可选 body 缺席」与「给了但读不出来」只能靠猜。对**有副作用**
 * 的端点，这个歧义是有代价的：畸形请求会走到「按缺省处理」那条路，等于拿垃圾输入触发真实动作。
 * 需要 fail-closed 的端点用本函数；宽松端点继续用 `readJsonBody`（它是本函数的薄包装）。
 * @param req - Node http 请求对象（或 async-iterator 桩）。
 * @param limit - 字节上限（默认 2MB）。
 * @returns 成因可辨的结果。
 */
export declare function readJsonBodyOutcome(req: IncomingMessage, limit?: number): Promise<JsonBodyOutcome>;
/**
 * 宽松读请求 body（JSON）：解析失败或超限返回 undefined（不抛错），由调用方决定响应。
 * 成因不可辨——要区分「缺席」与「非法」用 `readJsonBodyOutcome`。与 readBody 共用限长语义。
 * @param req - Node http 请求对象（或 async-iterator 桩）。
 * @param limit - 字节上限（默认 2MB）。
 * @returns 解析后的 JSON 对象；空/非法/超限返回 undefined。
 */
export declare function readJsonBody(req: IncomingMessage, limit?: number): Promise<object | undefined>;
/**
 * 把任意抛出的值转成可读错误消息。
 * @param error - 任意抛出的值。
 * @returns 可读错误消息。
 */
export declare function errorMessage(error: unknown): string;
/**
 * 读请求 body（JSON，限长防滥用）。
 * 兼容两种请求形态：Node 事件流（data/end）与 async-iterator 桩（测试用）。
 * @param req - Node http 请求对象（或 async-iterator 桩）。
 * @param limit - 字节上限（显式传入，默认 256KB）。
 * @returns 解析后的 JSON 对象（空 body 返回 {}）。
 */
export declare function readBody(req: IncomingMessage, limit?: number): Promise<object>;
