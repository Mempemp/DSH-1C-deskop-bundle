/**
 * dsh-mcp-manager — workspace/impl/full-name/index.ts：server 全名与工具名归一化。
 *
 * 阶段 4 自 src/middleware-utils.ts 迁入工作空间路由域（命名/全名解析类，
 * v3 §二 workspace/full-name.ts）；策略裁决与目录检索函数留在
 * middleware-utils.ts（阶段 5 catalog 域迁出）。引用面经 workspace/interface.ts。
 */
/** server 全局唯一名：@<root>/<server>。 */
export declare function fullServerName(root: string, server: string): string;
/** 解析 @<root>/<server> 全名 → { root, server }；非法返回 undefined。
 * root 是绝对路径（以 / 开头），故从最后一个 `/` 分割（server 名不含 `/`）。
 * 特殊形态兼容：`@global/<server>`（单 @，人类/文档/A2 指引形态）归一化为
 * root=`@global`（MIDDLEWARE_GLOBAL_ROOT）；`@@global/<server>`（双 @，内部
 * fullServerName 产物）同样归一化为 `@global`——两种输入等价，杜绝「单 @ 被
 * 路由拒绝、双 @ 放行」的语义分裂（隔离验证 P0 发现，smoke 双 @ 掩盖单 @ 被拒）。 */
export declare function parseFullServerName(name: string): {
    root: string;
    server: string;
} | undefined;
/** 提取裸名（@root/server → server；无前缀原样返回）。 */
export declare function bareServerName(name: string): string;
/** 归一化中间层工具的 tool 参数（模型可能传 mcp__<id>__<tool> 直呼全名）。
 * @param caller 调用方工具名（错误文案前缀；ws_mcp_call / ws_mcp_detail 复用）。 */
export declare function normalizeToolName(serverName: string, toolName: string, caller?: string): string;
