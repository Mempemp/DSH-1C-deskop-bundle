import type { LocaleRuntime } from "@deepseek-ai/dsh-client-locale/client";
import type { Translate } from "@deepseek-ai/dsh-client-ui-slots";
/**
 * 翻译函数形态：直接取官方 Translate（key + {name} 占位参数），本层不再自带一份手抄形态
 * ——上游改签名即判红。仅类型导入，编译期擦除，实现（i18n.js）仍零依赖。
 */
export type TranslateFn = Translate;
/**
 * 当前翻译函数（apply 时由各包 index.ts 经 bindLocale 装配）。
 * 未装配时回落 key 本体（行为零变化）。
 */
export declare let t: Translate;
/**
 * 装配/重绑翻译函数（官方 ctx.locale.bind(ns) 产物；语言切换 subscribe 内重调）。
 *
 * @param locale 宿主 locale 服务读面：**只要求本函数真正消费的那个成员 `bind`**。
 *   刻意不撑成整个 LocaleRuntime——参数面只该描述函数自己用什么。若按调用方的额外需求
 *   撑成四成员，每个只喂 `{ bind }` 的测试都得为它加逃逸口，等于把测试便利写进公共契约。
 *   调用方各自的完整读面由它们自己声明（见 provider-usage 的 `LocalePort`、
 *   lan-proxy 的 `LocalePort`、mcp-manager 的 `McpLocaleService`）。
 *   `null | undefined` 是实现既有降级分支（本文件的 `locale &&` 守卫 + shared/README
 *   登记的「未装配回落 key 本体」），真实调用点 `ctx.get("locale")` 本就可能是 undefined。
 * @param ns 本插件字典命名空间。
 */
export declare function bindLocale(locale: Pick<LocaleRuntime, "bind"> | null | undefined, ns: string): void;
