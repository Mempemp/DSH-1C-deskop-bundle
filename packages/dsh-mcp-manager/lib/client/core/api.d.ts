/**
 * dsh-mcp-manager — 客户端 HTTP API 请求与请求参数拼装（core 层）。
 *
 * 阶段 7 分层：本文件拆出自原 dom.ts（dom.ts 保留 DOM 工具职责 el()，
 * HTTP 请求职责独立成 api.ts），与宿主 ROUTES 的对接面收拢一处。
 * 仅 export 纯函数，不依赖任何状态。
 */
import type { ApiRequestOptions, McpState, McpServerListEntry } from "./state.js";
/**
 * tool-disable 的服务器全名形态（C6/C-DTO-4）：`@@global/<name>` 或
 * `@<绝对路径>/<name>`，与宿主 parseFullServerName 归一化一致；projectRoot
 * 缺失（宿主重启 #412）时返回 undefined——调用方必须跳过提交，不得拼非法
 * `@/name`（宿主 parseFullServerName slash<=1 会 400 拒绝）。
 */
export declare function toolDisableServerKey(server: McpServerListEntry, state: McpState): string | undefined;
/**
 * 会话 cwd 查询参数（C7/#412 自愈）：connect/reconnect/disable 等操作携带
 * 当前会话 cwd，宿主 maybeSession 据此恢复会话（项目级连接需要；
 * 宿主 setSession 幂等短路，正常时零副作用）。空 cwd 返回空串。
 */
export declare function cwdQueryOf(state: McpState): string;
/**
 * resume 请求体（#1120）：本次会话 cwd 随请求固定服务端 root。
 * - 未知会话（sessionResolved=false）：回 undefined（不带 body，服务端回落既有绑定，
 *   不把「读不到」变成「清空」）；
 * - 已知会话：恒带 { cwd }（空即 ""=明确无工作区，服务端固定 @global，
 *   不回落到别人的 projectRoot）。
 */
export declare function resumeBodyOf(state: McpState): {
    cwd: string;
} | undefined;
/**
 * HTTP API 请求。
 * 返回 JSON 解析后的 body；非 2xx 抛 Error。
 * 带默认超时（10s，AbortSignal），防挂起请求占用连接（#111 变更点驱动）。
 * 调用方自带 signal 时：超时兜底不启用（调用方 signal 优先，避免双取消竞争）。
 *
 * C14 备忘：当前全部路由返回 JSON body；未来新增 204 无 body 路由时，
 * response.json() 抛错会落到 body=undefined，调用方不得静默把 undefined
 * 当成功结果消费（需在新增 204 路由时显式补状态码分支）。
 */
export declare function api<T = unknown>(path: string, options?: ApiRequestOptions): Promise<T>;
