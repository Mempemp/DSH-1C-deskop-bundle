/**
 * dsh-mcp-manager — server/shared/tool-names.ts：模型可见注册名的唯一派生点。
 *
 * 为什么落共享层：中间层转发与虚拟单元注册都按同一个名字查表，规则一旦出现第二份，
 * 某些工具就会永远查不到——名字是键，不是展示文本。
 *
 * 为什么不进 constants.ts：本文件依赖 node:crypto（超长名的哈希回退），而 constants.ts
 * 处在 config 域的模块求值路径上，必须保持零 import。
 */
/** 从 (serverName, rawName) 派生模型可见的公开工具名。 */
export declare function publicToolName(serverName: string, rawName: string): string;
