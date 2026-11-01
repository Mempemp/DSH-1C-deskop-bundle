/**
 * dsh-mcp-manager — inject/impl/image-admission/index.ts：ws_mcp_call 的 **A+ 自持图片准入**
 * （#767 笔 1b 交付物 B）。
 *
 * 背景：本包把远端转发改道宿主的 `ctx.tools.execute` 之后，官方执行器那次图片准入（它读
 * `exec.agent` 解模型路由）随 F4 收口一起去掉了——远端图片结果原本能落成真附件，去掉 agent 后
 * 只能退化成 `[image content]`。本模块把那次准入在本包内补回来：解模型路由 → 白名单解码 →
 * `attachments.saveImages` → 经官方 `finalizeContent` 接缝把模型面内容换成真附件块。
 *
 * 判定顺序与文案**照官方 dsh-mcp-client 的 implement**（`resolveImageAdmission` /
 * `prepareImageProjection` / `imageDiagnostic`，逐字段一致，主控已逐条核实）；任何拒绝都只
 * 降级成诊断文本、不抛——图片落不了库不该让一次工具调用失败。
 *
 * 本模块是纯逻辑（不 import 任何域内实现）：文本块的渲染规则由接线点按实参递进来
 * （middleware-register 的 `formatCallContentBlock`），避免两处各写一份占位规则而漂移。
 */
import type { AttachmentsPort, ModelContentBlock, ModelInfoPort, SaveImageInput } from "../../../shared/interface.js";
/** 图片准入要用的两条宿主能力：**晚读** thunk（服务可能缺席，且 apply 期取不到）。 */
export interface ImageAdmissionFaces {
    readonly attachments: () => AttachmentsPort | undefined;
    readonly models: () => ModelInfoPort | undefined;
}
/** 一次准入请求的全部输入。 */
export interface ImageAdmissionRequest {
    /** 外层调用身份：模型自己的 agent（不受我方 deny 影响），用于解当前模型路由。 */
    readonly agent: unknown;
    /** 待投影的**远端原始** content（必须是你 return 的那个 value 的 content，含 stale 前置提示）。 */
    readonly content: readonly unknown[];
    readonly signal: AbortSignal | undefined;
    readonly faces: ImageAdmissionFaces;
    /** 非图片块的文本化规则（接线点传 formatCallContentBlock，单一实现）。 */
    readonly formatBlock: (block: unknown) => string;
}
/** 当前模型路由（provider + model）。 */
export interface ImageRoute {
    readonly provider?: string;
    readonly model?: string;
}
/**
 * 远端**原始**图片块的判据：`type === "image"` 且 `data` 是字符串。
 *
 * `typeof data === "string"` 这一半是承重的：本包自己产出的模型面图片块是
 * `{type:"image", attachment}`（没有 `data`），用这个判据天然把它排除，不会二次准入。
 */
export declare function isRemoteImageBlock(block: unknown): boolean;
/** content 里是否存在远端原始图片块（不存在 → 不建投影，结果面逐字节不变）。 */
export declare function containsRemoteImage(content: readonly unknown[]): boolean;
/**
 * 解当前模型路由：会话最近一次 `request/header` 快照里的 config 优先，回落到 agent 的静态
 * options（官方 `resolveImageAdmission` 的取法）。任何一环取不到都给 `undefined`，由调用方
 * 归到 "the current model route could not be resolved"。
 */
export declare function resolveRoute(agent: unknown): ImageRoute;
/** 可调用判定（类型谓词）：让 requestHeader 的窄化免断言。 */
export declare function isCallable(value: unknown): value is () => unknown;
/** 会话最近一次 request/header 快照里的 config（无快照 / 假 agent → undefined）。 */
export declare function routedConfigOf(session: Record<string, unknown> | undefined): Record<string, unknown> | undefined;
/**
 * 把远端结果里的图片块准入成模型面内容。
 *
 * @returns 完整模型面投影（文本块 + 原位图片/诊断块）；**没有远端原始图片块时返回 `undefined`**
 *   ——调用方据此不建映射，结果面继续走 `render`（既有行为逐字节不变）。
 */
export declare function projectImageAdmission(request: ImageAdmissionRequest): Promise<ModelContentBlock[] | undefined>;
/** content 里的远端原始图片块计数。 */
export declare function countRemoteImages(content: readonly unknown[]): number;
/** 逐块解码远端图片：解码失败按「下标 → 文案」记账（不中断整批扫描）。 */
export declare function decodeRemoteImages(content: readonly unknown[]): {
    indexes: number[];
    images: SaveImageInput[];
    validationErrors: Map<number, string>;
};
/** 整批转诊断文本（超限 / 准入解析失败两条路径共用）。 */
export declare function diagnosticProjection(content: readonly unknown[], formatBlock: (block: unknown) => string, reason: string): ModelContentBlock[];
/** 落库与最终投影：落库失败 / 返回值缺项都按「durable image storage rejected」处理。 */
export declare function projectStoredImages(content: readonly unknown[], formatBlock: (block: unknown) => string, attachments: AttachmentsPort, decoded: {
    indexes: number[];
    images: SaveImageInput[];
}): Promise<ModelContentBlock[]>;
/** 错误文案归一（Error 取 message，其余按 String）。 */
export declare function errorText(error: unknown): string;
