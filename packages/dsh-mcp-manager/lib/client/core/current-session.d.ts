/**
 * dsh-mcp-manager — 当前会话读取（唯一接缝，issue #1028）。
 *
 * 0.1.7-rc.2 起官方会话列表快照不再有 `current` 字段（`SessionListState` 现为
 * `{ ids, byId, phase, projectionsBySession }`）。旧实现读 `snapshot.current` 恒得
 * undefined → `currentCwd` 恒空 → 切回前台的 `rebindSession` 把「未知」序列化成
 * `cwd:""` 上报 → 宿主 `setSession("")` 主动清空 projectRoot/projectStore → 面板只剩
 * 全局条目、项目级操作抛 `no active project session`。
 *
 * 官方自己判定「当前会话」的口径是 `retainedBy.mainView > 0`（写入方是
 * dsh-client-ui-workspace 的 `retain(target,{source:"mainView"})`，读取方遍布
 * dsh-client-ui-session / ui-workspace / ui-layout 等官方包）。本接缝照该口径读，
 * 并把「读不到」与「读到但无 cwd」**分成两态**返回——这是 #1028 的核心教训：
 *   - unknown：读不到当前会话（服务未就绪 / 快照不可读 / 无 main-view 行）。
 *     调用方**不得**据此清空宿主绑定，否则把「不知道」变成「破坏」。
 *   - session：读到了。cwd 为空即「已知无项目」（blank 会话），此时才可显式清空。
 */
import type { ISessions, SessionSummary } from "@deepseek-ai/dsh-api-session-controller/client";
/**
 * 会话列表读面：从官方 `ISessions["list"]` 派生，只取本包用到的两个成员。
 * 不重抄签名——官方 `ObservableSnapshot` 的 `getSnapshot` 必返快照、不带 undefined，
 * 旧实现那个 `| undefined` 与 `getSnapshot?` 的 optional 都是自建镜像的产物。
 */
export type SessionListFace = Pick<ISessions["list"], "getSnapshot" | "subscribe">;
/** 当前会话读数（两态；与宿主 isBlankCwd 的两态不在同一层，不要混用）。 */
export type CurrentSessionRead = {
    readonly kind: "unknown";
} | {
    readonly kind: "session";
    readonly row: SessionSummary;
    /** 会话工作目录；空串与 undefined 同义（宿主侧都归「无项目」）。 */
    readonly cwd: string | undefined;
    readonly blank: boolean;
};
/**
 * 读当前会话。服务未注入 / list 缺失 / getSnapshot 不可用或抛错 / 快照不可读 /
 * 无 main-view 行，一律回 unknown——不抛、不猜、不用启发式顶替。
 */
export declare function readCurrentSession(list: SessionListFace | undefined): CurrentSessionRead;
