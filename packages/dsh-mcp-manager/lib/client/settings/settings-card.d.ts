/**
 * dsh-mcp-manager — 插件行配置页（SettingsCard）。
 *
 * 浮窗位置 / 偏移编辑区，React 组件（经 build-client externals 注入）。
 * 读/写走 /api/dsh-mcp/config（GET 读 / POST 写），保存后经 SSE 热更新。
 * 注册面：plugins.row.config，由 index.ts 装配。
 */
import * as React from "react";
import type { PluginConfigViewProps } from "@deepseek-ai/dsh-client-ui-plugin-manager/client";
/**
 * plugins.row.config owner 传给组件的视图与表单能力：官方 `PluginConfigViewProps`
 * （dsh-client-ui-plugin-manager，plugins.row.config / plugins.bundle.config /
 * plugins.item 三个 seat 的 owner 形状）原样透传，不另立镜像。
 *
 * 事实记录：**本组件不读 props.form**——页面读写走自身的 /api/dsh-mcp/config
 * （GET 读 / POST 写，见下 SettingsPage），props.form 只是类型面上随 owner 契约到达。
 * 换官方类型不改变渲染行为，也不因「用上了 form」而新增任何读取。
 */
export type SettingsCardProps = PluginConfigViewProps;
/**
 * summary 由插件行自身呈现；此组件不发配置/健康请求，也不返回嵌套 page DOM。
 * page 挂载独立表单组件，切换视图时也不会跨分支改变 Hook 顺序。
 *
 * 【R3 原语层接入：只迁 Button】
 * 保存按钮改用 <Button className="dm-set-save">——Button 原语在共享块里**一条规则都不出**
 * （视觉由调用点传入的领域类承担），故这是纯增益：拿到 dsu-btn / data-dsu-btn 钩子与恒定
 * 的 type="button"，像素零变化。
 *
 * 下面四族**刻意不迁**，理由逐条钉住（防止被当成漏项「顺手补上」）：
 *   1. dm-set-field + dm-set-input：dm-set-field 是 inline-flex 纵向堆叠（标签在上），
 *      dsu-field 是 nowrap 横排；dm-set-input min-width 88 + padding 5px 8px，dsu-input 是
 *      margin-left 6 + padding 2px 6px。NumberField 的输入期钳制虽与本卡 numInput 等价，
 *      但整体搬过去就是视觉改版，不在收敛范围。
 *   2. dm-set-row：flex + align-center + margin 0，dsu-field-row 多一条 margin-bottom 8px。
 *   3. dm-set-card：dsu-surface-card 带 max-width 560 + box-shadow + bg-base（本卡是
 *      bg-layer-3 + border-l2），两档都会改这张卡的观感。
 *   4. dm-set-hint / dm-set-foot / dm-set-saved / dm-set-error：本卡领域件，T1 无同构原语
 *      （saved/error 是纯文字反馈行，不是 Badge/Status 点）。
 * 另：dm-set-head / -headText / -name / -description / -chevron / -chevronOpen 六条规则在
 * 本卡**零渲染**，但被 test/e2e/smoke.test.ts 的 #219 视觉锚点断言按 CSS 文本钉住，
 * 删它必须改那条断言——属改判据而非收敛，故原样保留（决策权留给维护者）。
 *
 * 【边界】本文件只管这张 React 卡。浮窗（src/client/float/**、index.ts 的 panelHtml
 * 命令式 DOM 链路、1300+ 条 dm-float-* 规则）不是 React，接不了原语层，是独立议题：
 * 本轮一字不动。
 */
export declare function SettingsCard(props: SettingsCardProps): React.ReactElement | null;
