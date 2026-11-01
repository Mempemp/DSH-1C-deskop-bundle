/**
 * dsh-mcp-manager — pipeline/impl/project/index.ts：CallToolResult 投影（单一事实源，#512，#664 阶段 2 迁入）。
 *
 * 原自 call-result.ts（全量迁移，含类型面）。MCP 协议对 tools/call 成功应答宽容
 * （content / structuredContent / isError / _meta 均 optional，各 SDK 序列化习惯
 * 不一——Python pydantic exclude_none 剔不掉合法值 isError:false）；dsh 工具契约
 * 要求 execute 返回精确匹配 output schema（additionalProperties:false），故在此
 * 收敛白名单投影（对齐官方 dsh-mcp-client createExecutor）。
 *
 * supervisor（mcp__ 直呼路径）与 middleware（ws_mcp_call 远端转发）共用；
 * 调用方差异（文本截断/提取、错误文案风格）经 CallResultTextHandlers 注入。
 */
/** 投影文本渲染回调（调用方差异面）。 */
export interface CallResultTextHandlers {
    /**
     * isError:true 的抛错文案（入参为 content 块数组，调用方按自身文案风格
     * 渲染；缺省用兜底文本抛错）。
     */
    errorText?: (content: unknown[]) => string;
    /**
     * content 缺失/非数组时的兜底文本渲染；缺省 defaultCallResultFallbackText
     * （supervisor 额外叠加截断）。
     */
    fallbackText?: (result: unknown) => string;
}
/** 投影产物：恰好落在 ws_mcp_call / mcp__ 工具的 output schema 契约内。 */
export interface ProjectedCallResult {
    content: unknown[];
    structuredContent?: unknown;
}
/**
 * 默认兜底文本：toolResult 形态渲染 JSON，否则 "(no output)"
 * （对齐官方 dsh-mcp-client 的 no-content 分支）。
 */
export declare function defaultCallResultFallbackText(result: unknown): string;
/**
 * 把远端 CallToolResult 投影为 dsh 工具契约形状。
 * @param result protocol.callTool 的原始返回（宽松 ResultSchema，未定形）。
 * @param handlers 可选的文本渲染差异面。
 * @returns 白名单化的 { content, structuredContent? }（无 undefined 值键）。
 * @throws Error 当 result.isError === true（文案经 handlers.errorText 或兜底文本）。
 */
export declare function projectCallToolResult(result: unknown, handlers?: CallResultTextHandlers): ProjectedCallResult;
