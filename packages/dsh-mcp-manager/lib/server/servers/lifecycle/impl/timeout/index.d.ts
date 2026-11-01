import type { ServerState } from "../../../../../shared/interface.js";
import type { MountedPlugin } from "../../../../shared/interface.js";
/** 等待窗口入参：句柄、超时预算与三个只读查询（不自持状态，故本块可纯测）。 */
export interface MountWindowInput {
    /** 账本键 = 交给官方的 serverName；工具注册面按它拼前缀。 */
    readonly id: string;
    readonly handle: MountedPlugin;
    /**
     * 连接等待预算（ms）。缺省取共享层的 CONNECT_TIMEOUT_MS。做成入参而不是在块内写死常量，
     * 是为了让用例用小预算驱动真超时——拿 10s 跑一条超时用例既慢，又把测试挂在真实墙钟上。
     */
    readonly connectTimeoutMs?: number;
    /** 该代际是否仍是账本当前条目：晚到结算据此丢弃。 */
    isCurrent(): boolean;
    /** 工具注册面查询：该 id 前缀下是否已有注册工具。 */
    hasTools(id: string): boolean;
    /**
     * 窗口内收到的官方原文（按到达顺序现读）。
     *
     * 官方是本插件**唯一**的错因来源：成功连接零日志，失败与放弃重连才说话，而宿主默认既不打印
     * 也不落盘——不把原文附进 failed 文案，用户拿到的就只有我方那两段判词。
     */
    diagnostics?(): readonly string[];
    /** 状态投影出口：窗口在起点（connecting）与结算点各回调一次；丢弃的结算不回调。 */
    onState(state: ServerState): void;
}
/** 窗口结算结果：settled 携带最终态，discarded 表示本次结算作废（调用方不得据此改状态）。 */
export type MountWindowOutcome = {
    readonly kind: "settled";
    readonly state: ServerState;
    readonly error?: string;
} | {
    readonly kind: "discarded";
};
/**
 * 跑完一次装载等待窗口。本函数**不 dispose 任何东西**：连接失败的实例归后台重连，
 * 拆除归调用方的账本动作。
 */
export declare function awaitMountWindow(input: MountWindowInput): Promise<MountWindowOutcome>;
