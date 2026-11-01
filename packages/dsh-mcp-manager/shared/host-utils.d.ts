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
}
export declare function isLoopbackRequest(request: IncomingMessage, options?: LoopbackOptions): boolean;
/**
 * Loopback + 方法白名单低阶路由守卫。
 *
 * **对本守卫的执行顺序**：非 loopback → 403；方法不在白名单 → 405；否则放行
 * （403 先于 405）。该顺序仅对**套本守卫的端点**成立——个别端点（如
 * mcp-manager /config）是端点级方法分流先于 loopback 的刻意例外，不适用。
 *
 * @param req - Node http 请求对象。
 * @param res - 响应对象。
 * @param methods - 允许的 HTTP 方法白名单。
 * @param loopbackOptions - 透传给
 *   isLoopbackRequest 的可选判定参数（#549：仅 serve 资源路由放行
 *   cross-site no-cors 子资源时使用；其余路由不得传）。
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
