import type { ServerState } from "../../../../../shared/interface.js";
/** 投影输入：三个输入面的快照，全部由调用方读取后递进来（本文件不持有状态）。 */
export interface ServerStateInput {
    /** 配置面启用（server.enabled === false 时为 false）。 */
    readonly enabled: boolean;
    /** 用户持久化禁用（配置面之外的第二个 disabled 来源）。 */
    readonly userDisabled: boolean;
    /** 我方已发起拆除：用户 disconnect / remove / update 拆旧代际，或本插件卸载。 */
    readonly tornDown: boolean;
    /** 已发起 mount（我方动作面）。 */
    readonly mountStarted: boolean;
    /** ready 已 settle（成功与失败都 settle）。 */
    readonly readySettled: boolean;
    /** 我方连接等待窗口已到期（含 ready 直接 reject 的形态）。 */
    readonly windowExpired: boolean;
    /** 句柄已 dispose。 */
    readonly disposed: boolean;
    /** 该代际曾进入 connected——区分「首连就没成功」与「连上过又掉线」。 */
    readonly everConnected: boolean;
    /** server.reconnect.enabled !== false；为 false 时掉线不再有后台重连，直接 failed。 */
    readonly reconnectEnabled: boolean;
    /** 工具注册面查询：该 id 前缀下是否已有注册工具（输入面 B）。 */
    hasTools(id: string): boolean;
}
/**
 * 六态投影。判据的先后即语义优先级：配置面（disabled）先于运行态；我方拆除（stopped）先于
 * 一切链路信号（旧注册可能尚未注销，工具面此时不可信）；窗口未结束（connecting）先于工具面结果。
 */
export declare function projectServerState(id: string, input: ServerStateInput): ServerState;
/**
 * ready 已 settle 之后的裁决（第六态投影的最后一段，判据先后即优先级）：
 * 工具前缀命中 → connected；否则曾 connected 且允许重连 → 半确定的 reconnecting（可判时点），
 * 余下是 §3.1 的 failed ①（我方窗口耗尽）或 ②（首连 / 首次发现失败，官方已进后台重连）。
 */
export declare function settledState(input: ServerStateInput, id: string): ServerState;
