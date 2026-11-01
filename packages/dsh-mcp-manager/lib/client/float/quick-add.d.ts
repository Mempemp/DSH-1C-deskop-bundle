/**
 * dsh-mcp-manager — 客户端「快速接入」页：表单与 mcpServers JSON 导入。
 *
 * 表单构建、读写、编辑、保存、重置；跨模块动作（refresh / switchTab）经
 * actions 注入，不直接引用 panel 模块，避免循环依赖。
 */
import type { McpState, UiActions } from "../core/state.js";
import type { McpManagerServerInput, McpServerListEntry } from "../../shared/interface.js";
/** 解析 "KEY: VALUE" / "KEY=VALUE" 多行文本为对象。 */
export declare function parseKV(text: string): Record<string, string>;
/**
 * #770-A3 只读投影回写 guard：投影值永不进入写路径。
 * - env/headers 在投影中整体省略（无占位符），表单空白即省略、宿主沿用既有；
 * - url 投影含 B8 脱敏占位符 "[REDACTED]"（或其 URL 序列化形态）时视为未改动，
 *   保存时省略该字段（PATCH 沿用既有；迁移 POST 缺 url 则中止并提示重填）。
 */
export declare function isProjectionValue(value: unknown): boolean;
/** 当前表单选择的归属（project/global）。 */
export declare function formScopeValue(state: McpState): string;
/** 当前会话 cwd（POST body 携带，宿主据此切换项目级 MCP）。 */
export declare function currentCwdBody(state: McpState): Record<string, string>;
/** transport 收窄谓词：只认 McpManagerServerInput 联合内的两个字面量。 */
export declare function isServerTransport(value: string): value is McpManagerServerInput["transport"];
/** 表单 transport 取值：越界值（手改 DOM）判 stdio，收窄免断言。 */
export declare function formTransportValue(state: McpState): McpManagerServerInput["transport"];
/** stdio 表单字段：command 恒写入；args / env / cwd 为空不落键（缺省形态与历史一致）。 */
export declare function readStdioFormFields(state: McpState): Pick<McpManagerServerInput, "command" | "args" | "env" | "cwd">;
/** 表单控件的当前文本（未构建的控件回落空串；输入框与文本域同形）。 */
export declare function controlText(control: {
    value: string;
} | undefined): string;
/** streamable-http 表单字段：url 恒写入；headers 空表不落键。 */
export declare function readHttpFormFields(state: McpState): Pick<McpManagerServerInput, "url" | "headers">;
/** 表单数据 → 服务器配置对象（scope 由 formScope 决定）。 */
export declare function readForm(state: McpState): McpManagerServerInput;
/** 重置表单为默认值。 */
export declare function resetForm(state: McpState): void;
/** KV 表单字段回填：缺键（投影省略）清零，防旧值被 readForm 原样读回落盘。 */
export declare function fillKvField(input: HTMLTextAreaElement | undefined, table: Record<string, string> | undefined, separator: "=" | ": "): void;
/** 用服务器数据填充表单（编辑模式）。 */
export declare function fillForm(state: McpState, fill: McpServerListEntry): void;
/** 迁移式保存判据：正在编辑，且（改名 或 改归属）。宿主 PATCH 按 (scope,name) 定位且
 * 强制沿用定位名，故这两类改动必须走 POST+DELETE（见 performSaveRequest）。 */
export declare function isMigratedEdit(state: McpState, server: McpManagerServerInput, payload: Record<string, unknown>): boolean;
/** 投影 URL 含占位符时是否必须中止保存：迁移 POST 与新建都无既有可沿用 → 中止提示重填。 */
export declare function urlPlaceholderBlocks(state: McpState, server: McpManagerServerInput, payload: Record<string, unknown>): boolean;
/** 纯对象表判定（env/headers 表；null 与数组都不算表）。类型谓词，收窄后免断言。 */
export declare function isPlainRecord(value: unknown): value is Record<string, unknown>;
/** 是否处于编辑态（editingName 已设）。 */
export declare function isEditing(state: McpState): boolean;
/** 保存表单（新增或更新）。 */
export declare function saveForm(state: McpState, actions: UiActions): Promise<void>;
/** JSON 写请求的公共 init（PATCH / POST 共用）。 */
export declare function jsonWriteInit(payload: Record<string, unknown>): {
    method: "POST" | "PATCH";
    headers: Record<string, string>;
    body: string;
};
/**
 * 保存执行面（三种落点）与中止信号。
 * C11 迁移式保存：宿主 PATCH 按 (scope,name) 定位且强制沿用定位名——编辑改名/改归属
 * 会 404 not found 无引导。先 POST 新条目再 DELETE 旧条目，任何失败即抛（保留原条目，
 * 由 saveForm 的 catch alert），避免半迁移脏数据。
 * @returns false = 已中止（大声失败），调用方不得 resetForm / refresh。
 */
export declare function performSaveRequest(state: McpState, server: McpManagerServerInput, payload: Record<string, unknown>): Promise<boolean>;
/** 进入编辑模式：填充表单，切换到快速接入 tab。 */
export declare function beginEdit(state: McpState, actions: UiActions, server: McpServerListEntry): void;
/** 构建「快速接入」页面（表单 + JSON 导入）。 */
export declare function buildQuickAdd(state: McpState, actions: UiActions): HTMLElement;
