"use strict";
// 契约外壳（scripts/build-client.ts 生成）：external 依赖（React 等）经 factory 注入的 require 解析
window.__ModuleLoader__.load({
  id: "@wingsky-1/dsh-mcp-manager",
  factory: function (require) {
    var module = { exports: {} }
    var exports = module.exports
    "use strict";
    "use strict";
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

    // src/client/index.ts
    var index_exports = {};
    __export(index_exports, {
      apply: () => apply,
      inject: () => inject
    });
    module.exports = __toCommonJS(index_exports);

    // src/client/style.css
    var style_default = '/* dsh-mcp-manager — 客户端样式（独立 .css 文件）。\n *\n * 由 build-client 的 .css text-loader 构建期内联进 client.js（产物仍自包含单文件、\n * 零运行时依赖、无独立请求）。前缀 dm-（防与 shell / 其他插件样式冲突）。\n *\n * 浮窗视觉：Apple Liquid Glass（半透明毛玻璃 + 0.5px subtle border）。\n * 固体文字/状态色走 --dsw-alias-* + 浅色回退；玻璃底/光边双主题 rgba\n * （light ≈ white/76，dark ≈ zinc-900/74），并经 color-mix 跟随宿主主题变量。\n * 动效：Apple Fluid Curve cubic-bezier(0.16, 1, 0.3, 1)。\n * 浮窗 origin=胶囊锚点→对角 scale 0.72→1；模态 origin=中心→四周 scale 0.78→1。\n * 可点元素 Active Press Feedback；中英混排系统中文字体栈 + line-height ≥1.5。 */\n\n:root {\n  --dm-fluid: cubic-bezier(0.16, 1, 0.3, 1);\n  --dm-press-scale: 0.96;\n  --dm-glass-blur: 28px;\n  --dm-glass-saturate: 220%;\n  --dm-glass-bg: rgba(255, 255, 255, 0.76);\n  --dm-glass-bg-strong: rgba(255, 255, 255, 0.84);\n  --dm-glass-bg-solid: var(--dsw-alias-bg-base, #fdfdfd);\n  /* 主题跟随 wash：浅色用墨 8%，深色用白 12%（M1：禁止深色下写死浅色 wash） */\n  --dm-wash: color-mix(in srgb, #1c1e26 8%, transparent);\n  /* 卡片底：浅色白 42% 霜，深色白 7% 霜（配 zinc-900/74 玻璃底） */\n  --dm-card-bg: color-mix(in srgb, #ffffff 42%, transparent);\n  /* 行 hover：浅色黑 3%，深色白 7%（深色下黑 3% 近不可见） */\n  --dm-row-hover: color-mix(in srgb, #000000 3%, transparent);\n  --dm-glass-edge: rgba(20, 30, 50, 0.1);\n  --dm-glass-rim: rgba(255, 255, 255, 0.92);\n  --dm-glass-shadow:\n    inset 0 0.5px 0 rgba(255, 255, 255, 0.95), inset 0 0 0 0.5px rgba(255, 255, 255, 0.45),\n    0 1px 1px rgba(20, 30, 50, 0.04), 0 6px 16px rgba(30, 45, 80, 0.08),\n    0 20px 48px rgba(30, 45, 80, 0.12);\n  --dm-glass-spec: linear-gradient(\n    180deg,\n    rgba(255, 255, 255, 0.72) 0%,\n    rgba(255, 255, 255, 0.22) 22%,\n    rgba(255, 255, 255, 0.04) 48%,\n    rgba(255, 255, 255, 0) 100%\n  );\n  --dm-font-ui:\n    system-ui, -apple-system, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",\n    "Noto Sans SC", sans-serif;\n}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n    --dm-glass-bg: rgba(24, 24, 27, 0.74);\n    --dm-glass-bg-strong: rgba(24, 24, 27, 0.86);\n    --dm-wash: color-mix(in srgb, #ffffff 12%, transparent);\n    --dm-card-bg: color-mix(in srgb, #ffffff 7%, transparent);\n    --dm-row-hover: color-mix(in srgb, #ffffff 7%, transparent);\n    --dm-glass-edge: rgba(255, 255, 255, 0.14);\n    --dm-glass-rim: rgba(255, 255, 255, 0.12);\n    --dm-glass-shadow:\n      inset 0 0.5px 0 rgba(255, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1),\n      0 24px 64px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.28);\n    --dm-glass-spec: linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.16) 0%,\n      rgba(255, 255, 255, 0.03) 30%,\n      rgba(255, 255, 255, 0) 100%\n    );\n  }\n}\nhtml.dark,\n[data-theme="dark"],\n[data-color-mode="dark"] {\n  --dm-glass-bg: rgba(24, 24, 27, 0.74);\n  --dm-glass-bg-strong: rgba(24, 24, 27, 0.86);\n  --dm-wash: color-mix(in srgb, #ffffff 12%, transparent);\n  --dm-card-bg: color-mix(in srgb, #ffffff 7%, transparent);\n  --dm-row-hover: color-mix(in srgb, #ffffff 7%, transparent);\n  --dm-glass-edge: rgba(255, 255, 255, 0.14);\n  --dm-glass-rim: rgba(255, 255, 255, 0.12);\n  --dm-glass-shadow:\n    inset 0 0.5px 0 rgba(255, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1),\n    0 24px 64px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.28);\n  --dm-glass-spec: linear-gradient(\n    180deg,\n    rgba(255, 255, 255, 0.16) 0%,\n    rgba(255, 255, 255, 0.03) 30%,\n    rgba(255, 255, 255, 0) 100%\n  );\n}\n\n@media (prefers-contrast: more) {\n  :root {\n    --dm-glass-bg: rgba(255, 255, 255, 0.94);\n    --dm-glass-bg-strong: #ffffff;\n    --dm-glass-edge: rgba(20, 30, 50, 0.22);\n    /* 高对比下关闭高光 wash，wash 走纯色 */\n    --dm-glass-spec: none;\n    --dm-wash: #eceff3;\n    --dm-card-bg: #ffffff;\n    --dm-row-hover: #eef1f5;\n  }\n  html.dark,\n  [data-theme="dark"],\n  [data-color-mode="dark"] {\n    --dm-glass-bg: rgba(18, 18, 20, 0.96);\n    --dm-glass-bg-strong: #121214;\n    --dm-glass-edge: rgba(255, 255, 255, 0.28);\n    --dm-glass-spec: none;\n    --dm-wash: #2a2d34;\n    --dm-card-bg: #17171a;\n    --dm-row-hover: #26282f;\n  }\n  /* 高对比下隐藏装饰性高光层，失败行保留纯色语义底 */\n  .dm-glass::before {\n    display: none;\n  }\n  .dm-float-row.dm-float-row--fail,\n  .dm-server.dm-server--fail {\n    background: color-mix(in srgb, #e0483e 12%, var(--dm-glass-bg-strong));\n  }\n}\n\n[data-conversation-scroll] {\n  position: relative;\n}\n[data-pane="conversation"] {\n  position: relative;\n}\n\n/* 毛玻璃公共层 */\n.dm-glass {\n  position: relative;\n  color: var(--dsw-alias-label-primary, #1c1e26);\n  border: 0.5px solid var(--dm-glass-edge);\n  background: var(--dm-glass-bg);\n  backdrop-filter: blur(var(--dm-glass-blur)) saturate(var(--dm-glass-saturate));\n  -webkit-backdrop-filter: blur(var(--dm-glass-blur)) saturate(var(--dm-glass-saturate));\n  box-shadow: var(--dm-glass-shadow);\n  font-family: var(--dm-font-ui);\n  letter-spacing: 0;\n}\n.dm-glass::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  border-radius: inherit;\n  background: var(--dm-glass-spec);\n  pointer-events: none;\n}\n.dm-glass > * {\n  position: relative;\n  z-index: 1;\n}\n@media (prefers-reduced-transparency: reduce) {\n  .dm-float,\n  .dm-float-panel,\n  .dm-card,\n  .dm-float-action,\n  .dm-float-head button,\n  .dm-head button,\n  .dm-actions button,\n  .dm-form-actions button,\n  .dm-server,\n  .dm-tab[data-active] {\n    background: var(--dm-glass-bg-solid, var(--dsw-alias-bg-base, #fdfdfd));\n    backdrop-filter: none;\n    -webkit-backdrop-filter: none;\n  }\n  /* 失败行保留语义底，但以纯色混合（相对实底）代替透明罩染 */\n  .dm-float-row.dm-float-row--fail,\n  .dm-server.dm-server--fail {\n    background: color-mix(\n      in srgb,\n      #e0483e 8%,\n      var(--dm-glass-bg-solid, var(--dsw-alias-bg-base, #fdfdfd))\n    );\n  }\n  /* 装饰性高光层在减透明下隐藏 */\n  .dm-glass::before {\n    display: none;\n  }\n}\n\n/* —— 胶囊（高度契约约 26–30px，供 provider-usage offsetY 避让）—— */\n.dm-float {\n  position: absolute;\n  top: 44px;\n  right: 14px;\n  z-index: 10;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 11px;\n  border: 0.5px solid var(--dm-glass-edge);\n  border-radius: 99px;\n  background: var(--dm-glass-bg);\n  color: var(--dsw-alias-label-primary, #1c1e26);\n  font-size: 12px;\n  line-height: 1.4;\n  letter-spacing: 0;\n  cursor: pointer;\n  font-family: var(--dm-font-ui);\n  backdrop-filter: blur(var(--dm-glass-blur)) saturate(var(--dm-glass-saturate));\n  -webkit-backdrop-filter: blur(var(--dm-glass-blur)) saturate(var(--dm-glass-saturate));\n  box-shadow:\n    inset 0 0.5px 0 var(--dm-glass-rim),\n    0 2px 10px rgba(15, 18, 28, 0.08);\n  transition:\n    transform 160ms var(--dm-fluid),\n    box-shadow 160ms var(--dm-fluid);\n  transform-origin: center;\n  -webkit-tap-highlight-color: transparent;\n}\n/* 触控热区（#128，WCAG 2.2 AA ≥24px；外扩至约 44px） */\n.dm-float::after {\n  content: "";\n  position: absolute;\n  inset: -7px;\n  border-radius: 99px;\n}\n.dm-float .dm-dot {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  display: inline-block;\n  flex: none;\n  /* 缺省中性灰；renderPill 按健康态写 inline 色 */\n  background: var(--dsw-alias-label-tertiary, #9aa1ad);\n}\n.dm-float.dm-float--fail .dm-dot {\n  background: var(--dsw-alias-state-error-primary, #e0483e) !important;\n  box-shadow: 0 0 0 2px color-mix(in srgb, #e0483e 22%, transparent);\n}\n.dm-float .dm-float-fail {\n  display: none;\n  font-size: 10px;\n  font-weight: 700;\n  color: var(--dsw-alias-state-error-primary, #e0483e);\n  line-height: 1;\n}\n.dm-float.dm-float--fail .dm-float-fail {\n  display: inline;\n}\n.dm-float:active {\n  transform: scale(var(--dm-press-scale));\n  transition-duration: 80ms;\n}\n.dm-float.dm-float--open {\n  box-shadow:\n    inset 0 0.5px 0 var(--dm-glass-rim),\n    0 0 0 1.5px color-mix(in srgb, #2f7bf6 35%, transparent),\n    0 2px 10px rgba(15, 18, 28, 0.08);\n}\n.dm-float:focus-visible {\n  outline: 2px solid var(--dsw-alias-state-info-primary, #3b82f6);\n  outline-offset: 2px;\n}\n\n/* —— 浮窗下拉面板：锚点（胶囊）→ 对角展开 —— */\n@keyframes dm-float-in {\n  from {\n    opacity: 0;\n    transform: scale(0.72);\n    filter: blur(10px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n    filter: blur(0px);\n  }\n}\n@keyframes dm-float-out {\n  from {\n    opacity: 1;\n    transform: scale(1);\n    filter: blur(0px);\n  }\n  to {\n    opacity: 0;\n    transform: scale(0.78);\n    filter: blur(8px);\n  }\n}\n@keyframes dm-row-in {\n  from {\n    opacity: 0;\n    transform: translateY(6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.dm-float-panel {\n  position: fixed;\n  top: 44px;\n  right: 14px;\n  width: min(400px, calc(100vw - 36px));\n  max-height: min(70vh, 560px);\n  max-height: min(70dvh, 560px);\n  overflow: auto;\n  overscroll-behavior: contain;\n  color: var(--dsw-alias-label-primary, #1c1e26);\n  border: 0.5px solid var(--dm-glass-edge);\n  border-radius: 20px;\n  background: var(--dm-glass-bg);\n  z-index: 10;\n  padding: 14px 14px 12px;\n  font-family: var(--dm-font-ui);\n  font-size: 12px;\n  line-height: 1.55;\n  letter-spacing: 0;\n  backdrop-filter: blur(var(--dm-glass-blur)) saturate(var(--dm-glass-saturate));\n  -webkit-backdrop-filter: blur(var(--dm-glass-blur)) saturate(var(--dm-glass-saturate));\n  box-shadow: var(--dm-glass-shadow);\n  opacity: 0;\n  transform: scale(0.72);\n  filter: blur(10px);\n  visibility: hidden;\n  pointer-events: none;\n  /* 缺省 top-right 锚点；placePanel 按四角改写 inline transform-origin */\n  transform-origin: top right;\n  will-change: opacity, transform, filter;\n}\n.dm-float-panel.dm-float-panel--open {\n  visibility: visible;\n  pointer-events: auto;\n  opacity: 1;\n  transform: scale(1);\n  filter: blur(0);\n  animation: dm-float-in 480ms var(--dm-fluid) both;\n}\n.dm-float-panel.dm-float-panel--closing {\n  visibility: visible;\n  pointer-events: none;\n  animation: dm-float-out 300ms var(--dm-fluid) both;\n}\n.dm-float-panel.dm-float-panel--open .dm-float-row.dm-stagger {\n  animation: dm-row-in 320ms var(--dm-fluid) both;\n}\n.dm-float-panel[hidden] {\n  display: none !important;\n}\n\n/* #128 移动端档位 */\n.dm-float-panel[data-dm-bp="narrow"] {\n  width: calc(100vw - 16px);\n  max-height: calc(85vh - 88px);\n  max-height: calc(85dvh - 88px);\n  padding: 12px 10px 10px;\n  border-radius: 14px;\n}\n.dm-float-panel[data-dm-bp="tablet"] {\n  width: min(400px, calc(100vw - 24px));\n}\n.dm-float-panel[data-dm-bp="narrow"] .dm-float-row {\n  flex-wrap: wrap;\n  row-gap: 2px;\n  padding: 10px 8px;\n}\n.dm-float-panel[data-dm-bp="narrow"] .dm-float-row .dm-float-meta {\n  flex-basis: 100%;\n  white-space: normal;\n  line-height: 1.5;\n}\n.dm-float-panel[data-dm-bp="narrow"] .dm-float-actions {\n  flex: 1;\n  justify-content: flex-end;\n}\n.dm-float-action {\n  position: relative;\n}\n.dm-float-panel[data-dm-bp="narrow"] .dm-float-action {\n  min-height: 36px;\n  padding: 6px 14px;\n  font-size: 12.5px;\n}\n.dm-float-panel[data-dm-bp="narrow"] .dm-float-action::before {\n  content: "";\n  position: absolute;\n  inset: -4px;\n}\n.dm-float-panel[data-dm-bp="tablet"] .dm-float-action {\n  min-height: 30px;\n  padding: 4px 11px;\n}\n.dm-float-panel[data-dm-bp="narrow"] .dm-float-head button {\n  min-height: 36px;\n  padding: 5px 12px;\n  font-size: 12.5px;\n}\n\n.dm-float-head {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  margin-bottom: 10px;\n  padding: 2px 4px 0;\n}\n.dm-float-head-text {\n  flex: 1;\n  min-width: 0;\n}\n.dm-float-title {\n  font-weight: 600;\n  font-size: 13px;\n  line-height: 1.4;\n  letter-spacing: 0;\n  color: var(--dsw-alias-label-primary, #1c1e26);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.dm-float-health {\n  margin-top: 3px;\n  font-size: 11px;\n  line-height: 1.45;\n  color: var(--dsw-alias-label-secondary, #6b7280);\n  font-variant-numeric: tabular-nums;\n}\n.dm-float-health .dm-health-ok {\n  color: var(--dsw-alias-state-success-primary, #0f9d6e);\n}\n.dm-float-health .dm-health-bad {\n  color: var(--dsw-alias-state-error-primary, #e0483e);\n  font-weight: 600;\n}\n.dm-float-head button {\n  flex: none;\n  border: 0.5px solid var(--dm-glass-edge);\n  background: color-mix(in srgb, var(--dsw-alias-bg-base, #fff) 55%, transparent);\n  color: var(--dsw-alias-label-primary, #1c1e26);\n  border-radius: 99px;\n  min-height: 28px;\n  padding: 4px 11px;\n  font-size: 11px;\n  line-height: 1.4;\n  font-family: inherit;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent;\n  transition:\n    transform 160ms var(--dm-fluid),\n    background-color 160ms var(--dm-fluid),\n    opacity 160ms var(--dm-fluid);\n}\n.dm-float-head button:active,\n.dm-float-action:active,\n.dm-head button:active,\n.dm-actions button:active,\n.dm-form-actions button:active,\n.dm-set-save:active {\n  transform: scale(var(--dm-press-scale));\n  transition-duration: 80ms;\n  opacity: 0.88;\n}\n.dm-float-head button:focus-visible,\n.dm-float-action:focus-visible,\n.dm-head button:focus-visible {\n  outline: 2px solid var(--dsw-alias-state-info-primary, #3b82f6);\n  outline-offset: 2px;\n}\n\n.dm-float-group {\n  margin: 0 0 4px;\n  padding: 0;\n}\n.dm-float-group + .dm-float-group {\n  margin-top: 14px;\n}\n.dm-float-group-title {\n  font-size: 11px;\n  line-height: 1.4;\n  letter-spacing: 0.04em;\n  color: var(--dsw-alias-label-secondary, #8a8f9c);\n  font-weight: 600;\n  margin: 0 0 6px;\n  padding: 0 6px;\n}\n.dm-float-group-title.dm-float-group-title--alert {\n  color: var(--dsw-alias-state-error-primary, #e0483e);\n}\n\n.dm-float-row {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 6px 8px;\n  padding: 8px 8px 10px;\n  border: none;\n  border-radius: 14px;\n  margin-bottom: 2px;\n  background: transparent;\n  line-height: 1.5;\n  transition: background-color 160ms var(--dm-fluid);\n}\n.dm-float-row.dm-float-row--fail {\n  background: color-mix(in srgb, #e0483e 6%, transparent);\n}\n.dm-float-row .dm-float-name {\n  font-weight: 600;\n  font-family: ui-monospace, "SF Mono", Consolas, "PingFang SC", monospace;\n  font-size: 12px;\n  line-height: 1.4;\n  letter-spacing: 0;\n  max-width: 150px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: var(--dsw-alias-label-primary, #1c1e26);\n}\n.dm-float-row .dm-float-meta {\n  flex: 1;\n  min-width: 0;\n  font-size: 11px;\n  line-height: 1.5;\n  color: var(--dsw-alias-label-secondary, #8a8f9c);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-variant-numeric: tabular-nums;\n}\n.dm-float-actions {\n  flex: none;\n  display: flex;\n  gap: 4px;\n  margin-left: auto;\n  flex-wrap: wrap;\n}\n.dm-float-action {\n  border: 0.5px solid var(--dm-glass-edge);\n  background: color-mix(in srgb, var(--dsw-alias-bg-base, #fff) 50%, transparent);\n  color: var(--dsw-alias-label-primary, #1c1e26);\n  border-radius: 99px;\n  min-height: 28px;\n  padding: 3px 10px;\n  font-size: 11px;\n  line-height: 1.4;\n  font-family: inherit;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent;\n  transition:\n    transform 160ms var(--dm-fluid),\n    background-color 160ms var(--dm-fluid),\n    opacity 160ms var(--dm-fluid);\n}\n.dm-float-action.dm-primary,\n.dm-actions button.dm-primary,\n.dm-form-actions button.dm-primary {\n  font-weight: 600;\n  border-color: color-mix(in srgb, #2f7bf6 35%, transparent);\n  background: color-mix(in srgb, #2f7bf6 12%, transparent);\n  color: var(--dsw-alias-state-business-primary, #2f6fe0);\n}\n.dm-float-action.dm-danger,\n.dm-actions button.dm-danger {\n  color: var(--dsw-alias-state-error-primary, #b42318);\n  border-color: color-mix(in srgb, #b42318 30%, transparent);\n}\n\n/* —— 模态管理面板：中心 → 四周 —— */\n@keyframes dm-modal-in {\n  from {\n    opacity: 0;\n    transform: scale(0.78);\n    filter: blur(12px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n    filter: blur(0px);\n  }\n}\n@keyframes dm-modal-out {\n  from {\n    opacity: 1;\n    transform: scale(1);\n    filter: blur(0px);\n  }\n  to {\n    opacity: 0;\n    transform: scale(0.82);\n    filter: blur(10px);\n  }\n}\n@keyframes dm-overlay-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes dm-overlay-out {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n.dm-overlay {\n  position: fixed;\n  inset: 0;\n  background: var(--dsw-alias-bg-mask-2, rgba(8, 10, 16, 0.28));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  font-family: var(--dm-font-ui);\n  opacity: 0;\n  visibility: hidden;\n  pointer-events: none;\n  backdrop-filter: blur(8px) saturate(120%);\n  -webkit-backdrop-filter: blur(8px) saturate(120%);\n}\n.dm-overlay.dm-overlay--open {\n  opacity: 1;\n  visibility: visible;\n  pointer-events: auto;\n  animation: dm-overlay-in 360ms var(--dm-fluid) both;\n}\n.dm-overlay.dm-overlay--closing {\n  visibility: visible;\n  pointer-events: none;\n  animation: dm-overlay-out 280ms var(--dm-fluid) both;\n}\n.dm-overlay[hidden] {\n  display: none !important;\n}\n.dm-card {\n  width: min(860px, 94vw);\n  max-height: 86vh;\n  display: flex;\n  flex-direction: column;\n  color: var(--dsw-alias-label-primary, #1c1e26);\n  border: 0.5px solid var(--dm-glass-edge);\n  border-radius: 22px;\n  background: var(--dm-glass-bg-strong);\n  box-shadow: var(--dm-glass-shadow);\n  backdrop-filter: blur(var(--dm-glass-blur)) saturate(var(--dm-glass-saturate));\n  -webkit-backdrop-filter: blur(var(--dm-glass-blur)) saturate(var(--dm-glass-saturate));\n  overflow: hidden;\n  opacity: 0;\n  transform: scale(0.78);\n  filter: blur(12px);\n  transform-origin: center center;\n  will-change: opacity, transform, filter;\n}\n.dm-overlay.dm-overlay--open .dm-card {\n  opacity: 1;\n  transform: scale(1);\n  filter: blur(0);\n  transform-origin: center center;\n  animation: dm-modal-in 520ms var(--dm-fluid) both;\n}\n.dm-overlay.dm-overlay--closing .dm-card {\n  transform-origin: center center;\n  animation: dm-modal-out 300ms var(--dm-fluid) both;\n}\n.dm-head {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 16px 18px 10px;\n  border-bottom: none;\n  background: transparent;\n}\n.dm-head h2 {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 600;\n  line-height: 1.35;\n}\n.dm-head .dm-counts {\n  font-size: 12px;\n  color: var(--dsw-alias-label-secondary, #8a8f9c);\n  flex: 1;\n  line-height: 1.5;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-variant-numeric: tabular-nums;\n}\n.dm-head .dm-counts .dm-health-bad {\n  color: var(--dsw-alias-state-error-primary, #e0483e);\n  font-weight: 600;\n}\n.dm-head button {\n  border: 0.5px solid var(--dm-glass-edge);\n  background: color-mix(in srgb, var(--dsw-alias-bg-base, #fff) 55%, transparent);\n  color: var(--dsw-alias-label-primary, #3a3f4b);\n  border-radius: 99px;\n  min-height: 28px;\n  padding: 4px 11px;\n  font-size: 12px;\n  font-family: inherit;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent;\n  transition:\n    transform 160ms var(--dm-fluid),\n    background-color 160ms var(--dm-fluid);\n}\n.dm-tabs {\n  display: flex;\n  gap: 4px;\n  padding: 0 18px 8px;\n  border-bottom: none;\n  background: transparent;\n}\n.dm-tab {\n  border: none;\n  background: transparent;\n  color: var(--dsw-alias-label-secondary, #6b7280);\n  min-height: 34px;\n  padding: 8px 14px;\n  font-size: 13px;\n  line-height: 1.4;\n  font-family: inherit;\n  cursor: pointer;\n  border-radius: 99px;\n  -webkit-tap-highlight-color: transparent;\n  transition:\n    background 160ms var(--dm-fluid),\n    color 160ms var(--dm-fluid),\n    transform 160ms var(--dm-fluid);\n}\n.dm-tab:active {\n  transform: scale(var(--dm-press-scale));\n  transition-duration: 80ms;\n}\n.dm-tab[data-active] {\n  color: var(--dsw-alias-label-primary, #1c1e26);\n  font-weight: 600;\n  background: var(--dm-wash);\n  box-shadow: 0 0 0 0.5px var(--dm-glass-edge);\n}\n.dm-body {\n  padding: 4px 18px 18px;\n  overflow: auto;\n  min-height: 200px;\n  overscroll-behavior: contain;\n}\n.dm-status {\n  padding: 28px 16px;\n  color: var(--dsw-alias-label-secondary, #6b7280);\n  font-size: 13px;\n  text-align: center;\n  line-height: 1.6;\n}\n\n.dm-group {\n  margin-bottom: 8px;\n}\n.dm-group > h3 {\n  position: sticky;\n  top: 0;\n  z-index: 1;\n  margin: 8px 0 6px;\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 0.04em;\n  color: var(--dsw-alias-label-secondary, #525866);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 0 6px;\n  line-height: 1.4;\n  background: linear-gradient(\n    color-mix(in srgb, var(--dsw-alias-bg-base, #fdfdfd) 88%, transparent) 70%,\n    transparent\n  );\n}\n.dm-group > h3.dm-group-alert {\n  color: var(--dsw-alias-state-error-primary, #e0483e);\n}\n.dm-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  display: inline-block;\n}\n.dm-group > .dm-hint {\n  font-size: 11px;\n  color: var(--dsw-alias-label-secondary, #8a8f9c);\n  margin: 0 0 8px;\n  line-height: 1.5;\n}\n.dm-count {\n  font-weight: 400;\n  color: var(--dsw-alias-label-secondary, #8a8f9c);\n  margin-left: 2px;\n  font-size: 11px;\n}\n.dm-server {\n  border: 0.5px solid var(--dm-glass-edge);\n  border-radius: 16px;\n  padding: 12px 14px;\n  margin-bottom: 10px;\n  background: var(--dm-card-bg);\n  line-height: 1.5;\n}\n.dm-server.dm-server--fail {\n  border-color: color-mix(in srgb, #e0483e 28%, var(--dm-glass-edge));\n  background: color-mix(in srgb, #e0483e 5%, transparent);\n}\n.dm-server header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.dm-server .dm-name {\n  font-weight: 600;\n  font-size: 13px;\n  color: var(--dsw-alias-label-primary, #111827);\n  font-family: ui-monospace, Consolas, "PingFang SC", monospace;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n  line-height: 1.4;\n}\n.dm-badge {\n  font-size: 10px;\n  line-height: 1.3;\n  padding: 1px 7px;\n  border-radius: 99px;\n  background: var(--dsw-alias-bg-layer-2, #f1f2f5);\n  color: var(--dsw-alias-label-secondary, #525866);\n  border: 1px solid var(--dsw-alias-border-l2, #e2e4ea);\n}\n.dm-badge.dm-http {\n  background: var(--dsw-alias-state-business-secondary, #eef2ff);\n  color: var(--dsw-alias-state-business-primary, #4353a3);\n  border-color: var(--dsw-alias-state-business-tertiary, #dde3f8);\n}\n.dm-badge.dm-stdio {\n  background: var(--dsw-alias-bg-layer-2, #f5f0ff);\n  color: var(--dsw-alias-label-secondary, #6d4bb8);\n  border-color: var(--dsw-alias-border-l2, #e6dcf8);\n}\n.dm-badge.dm-st-connected {\n  background: var(--dsw-alias-state-success-secondary, #ecfdf5);\n  color: var(--dsw-alias-state-success-primary, #0f7a50);\n  border-color: var(--dsw-alias-state-success-tertiary, #c9f0dd);\n}\n.dm-badge.dm-st-connecting,\n.dm-badge.dm-st-reconnecting {\n  background: var(--dsw-alias-state-business-secondary, #eff6ff);\n  color: var(--dsw-alias-state-business-primary, #1d66b8);\n  border-color: var(--dsw-alias-state-business-tertiary, #d3e5fb);\n}\n.dm-badge.dm-st-failed {\n  background: var(--dsw-alias-state-error-secondary, #fef2f2);\n  color: var(--dsw-alias-state-error-primary, #b42318);\n  border-color: var(--dsw-alias-state-error-tertiary, #f8d3d0);\n}\n.dm-badge.dm-st-disabled,\n.dm-badge.dm-st-stopped {\n  background: var(--dsw-alias-bg-layer-2, #f1f2f5);\n  color: var(--dsw-alias-label-secondary, #6b7280);\n  border-color: var(--dsw-alias-border-l2, #e2e4ea);\n}\n.dm-server .dm-endpoint {\n  margin: 6px 0 0;\n  font-size: 11px;\n  color: var(--dsw-alias-label-secondary, #8a8f9c);\n  font-family: ui-monospace, Consolas, "PingFang SC", monospace;\n  word-break: break-all;\n  line-height: 1.5;\n}\n.dm-server .dm-err {\n  margin: 6px 0 0;\n  font-size: 11px;\n  color: var(--dsw-alias-state-error-primary, #b42318);\n  line-height: 1.5;\n}\n.dm-server .dm-tools {\n  margin: 8px 0 0;\n}\n.dm-server .dm-tools summary {\n  font-size: 11px;\n  color: var(--dsw-alias-label-secondary, #525866);\n  cursor: pointer;\n  user-select: none;\n  line-height: 1.5;\n}\n.dm-server .dm-tools ul {\n  margin: 4px 0 0;\n  padding-left: 16px;\n  font-size: 11px;\n  color: var(--dsw-alias-label-primary, #3a3f4b);\n  font-family: ui-monospace, Consolas, "PingFang SC", monospace;\n  line-height: 1.55;\n}\n.dm-actions {\n  display: flex;\n  gap: 6px;\n  margin-top: 10px;\n  flex-wrap: wrap;\n}\n.dm-actions button {\n  border: 0.5px solid var(--dm-glass-edge);\n  background: color-mix(in srgb, var(--dsw-alias-bg-base, #fff) 55%, transparent);\n  color: var(--dsw-alias-label-primary, #3a3f4b);\n  border-radius: 99px;\n  min-height: 28px;\n  padding: 3px 10px;\n  font-size: 11px;\n  font-family: inherit;\n  line-height: 1.4;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent;\n  transition:\n    transform 160ms var(--dm-fluid),\n    background-color 160ms var(--dm-fluid);\n}\n.dm-actions button.dm-danger {\n  color: var(--dsw-alias-state-error-primary, #b42318);\n  border-color: var(--dsw-alias-state-error-tertiary, #f0c4c1);\n}\n.dm-actions button.dm-primary {\n  color: var(--dsw-alias-state-business-primary, #1d4ed8);\n  border-color: var(--dsw-alias-state-business-tertiary, #bcd1fb);\n  background: var(--dsw-alias-state-business-secondary, #f5f8ff);\n  font-weight: 600;\n}\n.dm-actions button:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.dm-section {\n  margin-bottom: 18px;\n}\n.dm-section > h3 {\n  margin: 0 0 8px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--dsw-alias-label-primary, #2f3542);\n  line-height: 1.4;\n}\n.dm-form {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px 12px;\n  max-width: 640px;\n}\n.dm-form .dm-full {\n  grid-column: 1/-1;\n}\n.dm-field {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.dm-field label {\n  font-size: 11px;\n  color: var(--dsw-alias-label-secondary, #525866);\n  font-weight: 600;\n  line-height: 1.4;\n}\n.dm-field input,\n.dm-field select,\n.dm-field textarea {\n  border: 0.5px solid var(--dm-glass-edge);\n  border-radius: 10px;\n  padding: 8px 10px;\n  min-height: 36px;\n  font-size: 12px;\n  color: var(--dsw-alias-label-primary, #1c1e26);\n  background: color-mix(in srgb, #ffffff 55%, transparent);\n  font-family: ui-monospace, Consolas, "PingFang SC", monospace;\n  line-height: 1.45;\n}\n.dm-field textarea {\n  min-height: 64px;\n  resize: vertical;\n  line-height: 1.55;\n}\n.dm-field input[type="checkbox"] {\n  width: auto;\n  min-height: 0;\n}\n.dm-check {\n  flex-direction: row;\n  align-items: center;\n  gap: 8px;\n}\n.dm-check label {\n  margin: 0;\n}\n.dm-form-actions {\n  grid-column: 1/-1;\n  display: flex;\n  gap: 8px;\n}\n.dm-form-actions button {\n  border: 0.5px solid var(--dm-glass-edge);\n  background: color-mix(in srgb, var(--dsw-alias-bg-base, #fff) 55%, transparent);\n  color: var(--dsw-alias-label-primary, #3a3f4b);\n  border-radius: 99px;\n  min-height: 32px;\n  padding: 6px 14px;\n  font-size: 12px;\n  font-family: inherit;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent;\n  transition:\n    transform 160ms var(--dm-fluid),\n    background-color 160ms var(--dm-fluid);\n}\n.dm-form-actions button.dm-primary {\n  background: var(--dsw-alias-button-primary-fill, #4f6ef7);\n  color: var(--dsw-alias-label-primary-foreground, #fff);\n  border-color: var(--dsw-alias-button-primary-fill, #4f6ef7);\n  font-weight: 600;\n}\n.dm-hint {\n  font-size: 11px;\n  color: var(--dsw-alias-label-secondary, #8a8f9c);\n  line-height: 1.5;\n}\n.dm-paste-box {\n  border: 0.5px solid var(--dm-glass-edge);\n  border-radius: 16px;\n  padding: 12px;\n  background: color-mix(in srgb, #ffffff 40%, transparent);\n  max-width: 640px;\n}\n.dm-result {\n  font-size: 12px;\n  color: var(--dsw-alias-state-success-primary, #0f7a50);\n  margin-top: 8px;\n  line-height: 1.6;\n}\n.dm-result .dm-skip {\n  color: var(--dsw-alias-state-warn-primary, #b45309);\n}\n\n/* 设置页插件卡（settings.plugin.item）——视觉锚点测试 #219 不变 */\n.dm-set-card {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  border: 1px solid var(--dsw-alias-border-l2, #e2e5ea);\n  border-radius: 12px;\n  background: var(--dsw-alias-bg-layer-3, #fbfbfc);\n  overflow: hidden;\n  transition:\n    border-color 0.16s,\n    background 0.16s;\n}\n.dm-set-head {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 14px 16px;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  text-align: left;\n  color: var(--dsw-alias-label-primary, #1f2329);\n}\n.dm-set-headText {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  flex: 1;\n  min-width: 0;\n}\n.dm-set-name {\n  display: block;\n  font-size: 15px;\n  font-weight: 600;\n  line-height: 1.4;\n  color: var(--dsw-alias-label-primary, #1f2329);\n}\n.dm-set-description {\n  display: block;\n  font-size: 13px;\n  line-height: 1.5;\n  color: var(--dsw-alias-label-tertiary, #8a919c);\n}\n.dm-set-chevron {\n  flex: none;\n  color: var(--dsw-alias-label-tertiary, #5f6672);\n  transition: transform 0.16s ease;\n}\n.dm-set-chevronOpen {\n  transform: rotate(180deg);\n}\n.dm-set-body {\n  padding: 4px 14px 14px;\n  border-top: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  display: flex;\n  flex-direction: column;\n  gap: 9px;\n}\n.dm-set-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0;\n  flex-wrap: wrap;\n}\n.dm-set-row > label {\n  font-size: 12.5px;\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  font-weight: 600;\n  white-space: nowrap;\n}\n.dm-set-field {\n  display: inline-flex;\n  flex-direction: column;\n  gap: 3px;\n  font-size: 11.5px;\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  font-weight: 600;\n}\n.dm-set-input {\n  min-width: 88px;\n  padding: 5px 8px;\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  border-radius: 6px;\n  font-size: 12.5px;\n  color: var(--dsw-alias-label-primary, #1f2329);\n  background: var(--dsw-alias-bg-layer-1, #fff);\n  box-sizing: border-box;\n}\n.dm-set-input:focus {\n  outline: none;\n  border-color: var(--dsw-alias-state-info-primary, #3b82f6);\n}\n.dm-set-hint {\n  margin-top: 0;\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #8a919c);\n  line-height: 1.5;\n}\n.dm-set-foot {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 10px;\n}\n.dm-set-foot .dm-set-saved {\n  font-size: 12px;\n  color: var(--dsw-alias-state-success-primary, #16a34a);\n}\n.dm-set-foot .dm-set-error {\n  font-size: 12px;\n  color: var(--dsw-alias-state-danger-primary, #dc2626);\n}\n.dm-set-save {\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  background: var(--dsw-alias-bg-base, #fff);\n  color: var(--dsw-alias-label-primary, #3a3f4b);\n  border-radius: 6px;\n  padding: 5px 14px;\n  font-size: 12px;\n  cursor: pointer;\n  transition:\n    transform 160ms var(--dm-fluid),\n    background-color 160ms var(--dm-fluid);\n}\n.dm-set-save:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n/* #128 悬停态统一包裹 @media(hover:hover) */\n@media (hover: hover) {\n  .dm-float:hover {\n    background: color-mix(in srgb, var(--dsw-alias-interactive-bg-hover, #f2f4f8) 70%, transparent);\n  }\n  .dm-float-head button:hover {\n    background: var(--dsw-alias-interactive-bg-hover, #eef1f5);\n  }\n  .dm-float-action:hover {\n    background: var(--dsw-alias-interactive-bg-hover, #eef1f5);\n  }\n  .dm-float-row:hover {\n    background: var(--dm-row-hover);\n  }\n  .dm-head button:hover {\n    background: var(--dsw-alias-interactive-bg-hover, #eef1f5);\n  }\n  .dm-actions button:hover {\n    background: var(--dsw-alias-interactive-bg-hover, #eef1f5);\n  }\n  .dm-form-actions button:hover {\n    background: var(--dsw-alias-interactive-bg-hover, #eef1f5);\n  }\n  .dm-set-card:hover {\n    border-color: var(--dsw-alias-label-dimmed, #9ba1a6);\n  }\n  .dm-set-head:hover {\n    background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, 0.04));\n  }\n  .dm-set-save:hover {\n    background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, 0.06));\n  }\n}\n\n/* #362 工具级禁用 checkbox（#401 勾选=禁用，红色 ×） */\n.dm-float-tools {\n  margin: 4px 0 0 16px;\n  width: 100%;\n}\n.dm-float-tools summary {\n  font-size: 11px;\n  color: var(--dsw-alias-label-secondary, #525866);\n  cursor: pointer;\n  user-select: none;\n  line-height: 1.5;\n}\n.dm-float-tool-list {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  margin: 4px 0 0;\n  max-height: 140px;\n  overflow: auto;\n}\n.dm-float-tool,\n.dm-tool {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 11px;\n  color: var(--dsw-alias-label-primary, #3a3f4b);\n  font-family: ui-monospace, Consolas, monospace;\n  cursor: pointer;\n  line-height: 1.6;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n  min-width: 0;\n  max-width: 100%;\n}\n.dm-float-tool input,\n.dm-tool input {\n  width: 13px;\n  height: 13px;\n  margin: 0;\n  flex: none;\n  appearance: none;\n  -webkit-appearance: none;\n  border: 1px solid var(--dsw-alias-border-l2, #c3c8d2);\n  border-radius: 3px;\n  background: var(--dsw-alias-bg-base, #fff);\n  cursor: pointer;\n  position: relative;\n  box-sizing: border-box;\n}\n.dm-float-tool input:checked,\n.dm-tool input:checked {\n  border-color: var(--dsw-alias-state-error-primary, #b42318);\n  background: var(--dsw-alias-state-error-secondary, #fef2f2);\n}\n.dm-float-tool input:checked::after,\n.dm-tool input:checked::after {\n  content: "";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 8px;\n  height: 8px;\n  transform: translate(-50%, -50%);\n  background:\n    linear-gradient(\n      45deg,\n      transparent 43%,\n      var(--dsw-alias-state-error-primary, #b42318) 43%,\n      var(--dsw-alias-state-error-primary, #b42318) 57%,\n      transparent 57%\n    ),\n    linear-gradient(\n      -45deg,\n      transparent 43%,\n      var(--dsw-alias-state-error-primary, #b42318) 43%,\n      var(--dsw-alias-state-error-primary, #b42318) 57%,\n      transparent 57%\n    );\n}\n.dm-float-tool input:hover,\n.dm-tool input:hover {\n  border-color: var(--dsw-alias-state-info-primary, #3b82f6);\n}\n.dm-float-tool input:checked:hover,\n.dm-tool input:checked:hover {\n  border-color: var(--dsw-alias-state-error-primary, #b42318);\n}\n.dm-float-tool input:focus-visible,\n.dm-tool input:focus-visible {\n  outline: 2px solid var(--dsw-alias-state-info-primary, #3b82f6);\n  outline-offset: 1px;\n}\n.dm-float-tool:has(input:checked),\n.dm-tool:has(input:checked) {\n  color: var(--dsw-alias-state-error-primary, #b42318);\n}\n.dm-float-hint {\n  font-size: 10.5px;\n  color: var(--dsw-alias-label-tertiary, #8a919c);\n  line-height: 1.5;\n  padding: 4px 8px 2px;\n}\n.dm-subgroup {\n  margin: 6px 0 10px;\n}\n.dm-subgroup-title {\n  margin: 0 0 4px;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--dsw-alias-label-secondary, #525866);\n  line-height: 1.4;\n}\n.dm-group > h3 .dm-count {\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #8a919c);\n  font-weight: 600;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dm-float,\n  .dm-float-panel,\n  .dm-float-panel.dm-float-panel--open,\n  .dm-float-panel.dm-float-panel--closing,\n  .dm-float-panel.dm-float-panel--open .dm-float-row.dm-stagger,\n  .dm-overlay,\n  .dm-overlay.dm-overlay--open,\n  .dm-overlay.dm-overlay--closing,\n  .dm-card,\n  .dm-overlay.dm-overlay--open .dm-card,\n  .dm-overlay.dm-overlay--closing .dm-card,\n  .dm-float-action,\n  .dm-float-head button,\n  .dm-head button,\n  .dm-actions button,\n  .dm-form-actions button,\n  .dm-tab {\n    animation: none !important;\n    transition-duration: 1ms !important;\n  }\n  .dm-float-panel.dm-float-panel--open,\n  .dm-overlay.dm-overlay--open .dm-card {\n    transform: none;\n    filter: none;\n  }\n}\n';

    // ../../shared/client/ui/ui.css
    var ui_default = '/* ================= T1 五原语层（dsu-*）唯一副本 =================\n * 职责：Surface / Field / SegmentedControl / Status+Badge 的唯一表现面。\n *   Button 的视觉本体由**调用点自带的领域类**承担（见块尾说明），本块不出 dsu-btn 规则。\n *\n * 【怎么进到浏览器：ts 侧拼接，不是 @import】\n * 各包 src/client/index.ts 两行接缝：\n *     import UI_CSS from "<到仓库根的相对路径>/shared/client/ui/ui.css";\n *     ensureStyle({ id: STYLE_ID, cssText: UI_CSS + STYLE, version: CSS_VERSION });\n * **顺序不可颠倒**：原语层在前（当底座），各包 style.css 在后，这样包内针对原语钩子的\n * 窄屏/领域覆盖（同优先级靠后者胜）才压得住——provider-usage 的 @media 480px 段正是\n * 靠这条把 .dsu-badge 的 max-width 放宽到 100%、.dsu-surface-pane 的 padding 收到 10px。\n * 写成 STYLE + UI_CSS 时这两条覆盖会变死规则，build 仍 exit 0、窄屏却悄悄变回原样。\n * build-client 的 .css text-loader（scripts/build/build-client.ts）把本文件当**纯文本**\n * 内联进各包 client.js，产物仍自包含单文件、零运行时依赖、无独立请求。\n *\n * 【为什么不是 @import：R3 实测证伪，勿再提】\n * 试过在各包 style.css 顶部写 @import 指向本文件：text-loader 不解析 CSS，@import 会\n * 原样留在产物字符串里（实测 `grep -c \'@import\' lib/client.js` → 1），而探针规则\n * `grep -c \'dsu-probe\' lib/client.js` → 0；浏览器随后按**页面相对 URL** 去请求那个\n * 路径 → 404 → 规则静默消失，**而 build 仍 exit 0、测试仍全绿**。这是最坏的失败模式。\n *\n * 【与「各包 style.css 单文件」约定的关系】\n * DEVELOPMENT §3 要求样式不写进 ts、留在各包 style.css。本文件不违反它：本文件**不含\n * 任何包的领域样式**，只是跨包共享的那一段原语规则的单一事实源，由 ts 侧拼接注入；\n * 各包 style.css 仍是该包领域样式的唯一位置。\n *\n * 纪律：颜色全走 --dsw-alias-* + 浅色回退（禁裸 hex）；悬停一律 @media (hover: hover)\n *   包裹（#128 规格第 7 条），断点机制全仓只有这一套；禁 role="navigation"（语义层在\n *   shared/client/ui/index.tsx 冻结，本块只管表现，结构不冻结）。\n * 消费包不必逐档消费：未消费的档位在本包是死规则，属有意接受的冗余——宁可一段没人用的\n *   规则，也不要给原语层开出「按包裁剪规则块」这条会立刻分叉的机制。\n */\n.dsu-surface-pane {\n  margin-bottom: 16px;\n  padding: 12px;\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  border-radius: 10px;\n  background: var(--dsw-alias-bg-base, #ffffff);\n  font-size: 12px;\n  line-height: 1.7;\n}\n/* 极窄容器降级（#1015 A+C 的 C-3 配套）：宿主设置弹窗在 375px 下不折叠左侧导航，\n   内容列被压到约 139px，再经 pane padding 12px×2 层层扣减后趋势区只剩 56px——\n   实测装 dsh-web-mobile@3.0.3 亦然（nav 仍 flex:0 0 auto 固定 188px），故根因在宿主\n   布局、插件侧无法获得更多宽度。此处能做的唯一有效动作是**把容器自身的 padding 让给内容**：\n   收掉 padding 后可用宽度翻倍（56px → 104px 量级），标题/控件不再逐词竖排。\n   断点判据用 trend.tsx 已有的 data-dou-col（由 ResizeObserver 量**本窗格实测宽**写入），\n   不用视口断点也不依赖 container-type：宿主把内容列压到多窄与视口宽度无关，\n   桌面窄窗同样会命中，这是刻意的。 */\n.dou-trend-body[data-dou-col="s"] .dsu-surface-pane {\n  padding: 6px 4px;\n  border-radius: 8px;\n}\n/* 极窄档再让出设置区外壳的 padding：实测宿主 375px 下 content 仅 139px，经 set-body\n   padding 14 与 pane padding 各扣一轮后，内容实得 34px——不足一行中文。窄档下这些\n   padding 是纯损失（外壳描边已提供视觉边界），一并收掉。 */\n/* set-body 是所有设置区窗格共用的外壳，:has() 把作用域限死在「含窄档趋势窗格」的那一个，\n   不影响 usage/report/history/providers 等其他窗格（宿主与本仓均已在用 :has()）。 */\n.dou-set-body:has(.dou-trend-body[data-dou-col="s"]) {\n  padding: 4px 2px;\n}\n.dsu-surface-card {\n  /* 壳宽 560px 是外壳卡独有的约束（原 settings/index.tsx 内联 maxWidth，行为不变收敛进样式表） */\n  max-width: 560px;\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  border-radius: 12px;\n  overflow: hidden;\n  background: var(--dsw-alias-bg-base, #ffffff);\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);\n}\n\n/* ---- Field：标签 + 控件 ----\n   行内字段 nowrap 横排，换行能力由 .dsu-field-row 的 flex-wrap 承担\n   （约 350px 内容宽度下 nowrap 横排必然溢出，四个数字输入行必须能折行）。 */\n.dsu-field {\n  margin-right: 12px;\n  white-space: nowrap;\n}\n.dsu-field-block {\n  /* 标签在上、控件在下：与 .dsu-field（行内标签）并存会让同一行里出现两种排版结构，\n     跨字段换行时左边缘对不齐。此处统一为竖排，行内字段若需保持原样走 .dsu-field。 */\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 4px;\n  margin-bottom: 8px;\n}\n/* 标签文本是 <label> 内的裸文本节点（隐式关联 select），不是子元素——\n   故只能用 font/ ::first-line 类手段无法精确命中。改为给 label 本身定排版，\n   并让 select 独占一行：裸文本节点会生成匿名 flex item，与 select 同行。\n   这里把 label 设为 flex column，裸文本成为它的匿名 item，select 成为第二个。 */\n.dsu-field-block > select {\n  margin-top: 4px;\n  align-self: flex-start;\n}\n.dsu-field-block {\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n}\n.dsu-field-block > select {\n  font-size: 12px;\n  color: var(--dsw-alias-label-primary, #1f2329);\n}\n.dsu-field-row {\n  display: flex;\n  flex-wrap: wrap;\n  row-gap: 6px;\n  margin-bottom: 8px;\n}\n.dsu-input {\n  margin-left: 6px;\n  padding: 2px 6px;\n  border: 1px solid var(--dsw-alias-border-l2, #e8eaf0);\n  border-radius: 4px;\n}\n.dsu-input-number {\n  width: 64px;\n}\n\n/* ---- SegmentedControl：bar=顶部导航条 / pill=行内药丸组 / plain=朴素按钮组 ----\n * 窄屏：bar 靠 overflow-x + nowrap 横滑（与收敛前一致），pill/plain 靠 flex-wrap 折行。\n * 激活项由 [data-dsu-seg-active] 定位而非类名，换实现不会打坏「激活档滚进视野」。 */\n.dsu-seg {\n  display: flex;\n}\n.dsu-seg-bar {\n  gap: 4px;\n  padding: 10px 14px;\n  border-bottom: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  background: var(--dsw-alias-bg-layer-1, #f5f6f8);\n  overflow-x: auto;\n  white-space: nowrap;\n  scrollbar-width: none;\n}\n.dsu-seg-bar::-webkit-scrollbar {\n  display: none;\n}\n.dsu-seg-bar .dsu-seg-item {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  min-height: 32px;\n  padding: 5px 14px;\n  flex: none;\n  white-space: nowrap;\n  border: 1px solid transparent;\n  border-radius: 8px;\n  background: transparent;\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  font-size: 12px;\n  cursor: pointer;\n  font-family: inherit;\n}\n.dsu-seg-bar .dsu-seg-item[data-dsu-seg-active="true"] {\n  background: var(--dsw-alias-bg-base, #ffffff);\n  border-color: var(--dsw-alias-border-l1, #e2e5ea);\n  color: var(--dsw-alias-label-primary, #1f2329);\n  font-weight: 600;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);\n}\n.dsu-seg-bar .dsu-seg-item:focus-visible {\n  outline: 2px solid var(--dsw-alias-state-info-primary, #4a7dd6);\n  outline-offset: 2px;\n}\n@media (hover: hover) {\n  .dsu-seg-bar .dsu-seg-item:hover {\n    color: var(--dsw-alias-label-primary, #1f2329);\n  }\n}\n.dsu-seg-pill {\n  align-items: center;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin-bottom: 10px;\n}\n.dsu-seg-pill .dsu-seg-item {\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  background: var(--dsw-alias-bg-layer-1, #f5f6f8);\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  border-radius: 999px;\n  padding: 3px 12px;\n  min-height: 28px;\n  font-size: 11px;\n  cursor: pointer;\n  font-family: inherit;\n}\n.dsu-seg-pill .dsu-seg-item[data-dsu-seg-active="true"] {\n  background: var(--dsw-alias-state-info-soft, rgba(47, 111, 237, 0.1));\n  border-color: var(--dsw-alias-state-info-primary, #4a7dd6);\n  color: var(--dsw-alias-state-info-primary, #4a7dd6);\n  font-weight: 600;\n}\n.dsu-seg-plain {\n  gap: 6px;\n  flex-wrap: wrap;\n  /* 档内项距 6px、档与档之间靠外层 .dou-trend-controls 的 row-gap 拉开——\n     两级间距必须分层：项距 6 太挤会让「日/周/月」和「7d/30d/90d」读成一串。 */\n  margin-bottom: 6px;\n}\n/* 段内项的视觉分组：给「粒度/范围」这类**同类单选**加一个共同的浅底槽，\n   与「口径/指标」这类**独立选择器**在形状上分开——此前四组控件全是同样的\n   透明圆角按钮平铺，视觉上分不出哪几个是一组。槽只描边不填色，\n   保持与设置页底色同调、不与已选态的 brand 底色抢注意力。 */\n.dsu-seg-plain > .dsu-seg-item {\n  border: 1px solid var(--dsw-alias-border-l3, #d7dae0);\n  background: var(--dsw-alias-bg-layer-1, #f5f6f8);\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  padding: 3px 12px;\n  border-radius: 6px;\n  font-size: 12.5px;\n  min-height: 26px;\n}\n.dsu-seg-plain > .dsu-seg-item:hover {\n  background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, 0.04));\n}\n.dsu-seg-plain > .dsu-seg-item[data-dsu-seg-active="true"] {\n  background: var(--dsw-alias-bg-base, #ffffff);\n  color: var(--dsw-alias-label-primary, #1f2329);\n  font-weight: 600;\n  border-color: var(--dsw-alias-border-l3, #d7dae0);\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);\n}\n/* plain 档的项**不出规则**：视觉与触控热区由消费包自己的按钮类承担——\n   本包调用点传 itemClassName="dou-btn"，命中 #128 触控热区\n   （.dou-panel[data-dou-bp="narrow"] .dou-btn::before 外扩）与既有按钮规则。 */\n\n/* ---- Status：状态点（无 label 时为装饰点，语义由 aria-hidden 承担）---- */\n.dsu-status {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  margin-right: 6px;\n  vertical-align: middle;\n  flex: none;\n}\n.dsu-status[data-dsu-tone="ok"] {\n  background: var(--dsw-alias-state-success-primary, #0f9d6e);\n}\n.dsu-status[data-dsu-tone="warn"] {\n  background: var(--dsw-alias-state-warn-primary, #c9820b);\n}\n.dsu-status[data-dsu-tone="err"] {\n  background: var(--dsw-alias-state-error-primary, #d64545);\n}\n.dsu-status[data-dsu-tone="off"],\n.dsu-status[data-dsu-tone="neutral"] {\n  background: var(--dsw-alias-label-tertiary, #9aa0ab);\n}\n\n/* ---- Badge：状态徽标 ----\n * 色与边由两个自定义属性承载，尺寸档与色调档各改其一，避免 tone×size 组合爆炸。\n * 规则顺序即优先级：size（定中性底）→ tone（定色）→ muted（定弱化，末位覆盖 tone）。\n * sm 档承载 provider 身份药丸（含窄屏 100% 让位，由既有 480px 段改写本选择器）。 */\n.dsu-badge {\n  --dsu-badge-fg: inherit;\n  --dsu-badge-bd: var(--dsw-alias-border-l1, #d7dae0);\n  flex: none;\n  line-height: 1.5;\n  color: var(--dsu-badge-fg);\n  border: 1px solid var(--dsu-badge-bd);\n}\n.dsu-badge[data-dsu-size="sm"] {\n  max-width: 55%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 11px;\n  padding: 0 8px;\n  border-radius: 99px;\n  background: var(--dsw-alias-bg-layer-1, #f8f9fb);\n}\n.dsu-badge[data-dsu-size="xs"] {\n  --dsu-badge-bd: transparent;\n  font-size: 10px;\n  padding: 1px 6px;\n  border-radius: 8px;\n  background: transparent;\n}\n.dsu-badge[data-dsu-tone="ok"] {\n  --dsu-badge-fg: var(--dsw-alias-state-success-primary, #3f9d63);\n  --dsu-badge-bd: var(--dsw-alias-state-success-primary, #3f9d63);\n}\n.dsu-badge[data-dsu-tone="warn"] {\n  --dsu-badge-fg: var(--dsw-alias-state-warn-primary, #c9820b);\n  --dsu-badge-bd: var(--dsw-alias-state-warn-primary, #c9820b);\n}\n.dsu-badge[data-dsu-tone="err"] {\n  --dsu-badge-fg: var(--dsw-alias-state-error-primary, #d64545);\n  --dsu-badge-bd: var(--dsw-alias-state-error-primary, #d64545);\n}\n.dsu-badge[data-dsu-tone="off"] {\n  --dsu-badge-fg: var(--dsw-alias-label-tertiary, #9aa0ab);\n}\n.dsu-badge[data-dsu-muted="true"] {\n  --dsu-badge-fg: var(--dsw-alias-label-tertiary, #9aa0ab);\n  border-style: dashed;\n}\n\n/* ---- Button：本块不出规则 ----\n   Button 原语只出 dsu-btn 钩子与恒定的 type="button" 语义；视觉与触控热区由**调用点\n   传入的领域类**承担（provider-usage 传 .dou-btn、lan-proxy 传 .lp-set-save……）。\n   R1 时 Button 曾硬编码 .dou-btn，但原语层上提到档 C 后，那条类名就成了「provider-usage\n   的领域契约写在跨包层里」——别的包挂上去只会得到一条永远命不中的死类。#128 触控目标\n   契约又是按**类名**选中的（.dou-panel[data-dou-bp="narrow"] .dou-btn::before 的\n   inset:-4px 把 narrow 档的 min-height:36px 外扩到约 44px 命中区），所以各包的按钮类\n   必须仍挂在按钮元素上；在这里重复一份 dsu-btn 规则只会制造第二事实源。 */\n';

    // ../../shared/client/ensure-style.js
    function ensureStyle(options) {
      const opts = options || {};
      const id = opts.id;
      const cssText = opts.cssText;
      const version = opts.version;
      if (typeof id !== "string" || id === "" || typeof cssText !== "string") {
        throw new TypeError("ensureStyle: { id, cssText } 为必填且须为字符串（id 非空）");
      }
      const dispose = function() {
        const node = document.getElementById(id);
        if (node !== null)
          node.remove();
      };
      if (document.head == null)
        return dispose;
      const existing = document.getElementById(id);
      if (existing !== null) {
        if (version === void 0)
          return dispose;
        if (existing.dataset.version === version)
          return dispose;
        existing.remove();
      }
      const style = document.createElement("style");
      style.id = id;
      if (version !== void 0)
        style.dataset.version = version;
      style.textContent = cssText;
      document.head.appendChild(style);
      return dispose;
    }

    // src/client/index.ts
    var React3 = __toESM(require("react"), 1);

    // src/shared/placement-math.ts
    var DEFAULT_Z_INDEX_BASE = 10;
    var Z_INDEX_BASE_MIN = 1;
    var Z_INDEX_BASE_MAX = 9e3;
    function clampZIndexBase(value, dflt) {
      if (typeof value !== "number" || !Number.isFinite(value)) return dflt;
      return Math.min(Z_INDEX_BASE_MAX, Math.max(Z_INDEX_BASE_MIN, Math.round(value)));
    }
    function panelAnchorForPosition(placement) {
      return placement === "bottom-right" || placement === "bottom-left" ? "bottom" : "top";
    }
    var BREAKPOINT_NARROW_MAX = 480;
    var BREAKPOINT_TABLET_MAX = 834;
    function breakpointForWidth(width) {
      const w = Number.isFinite(width) ? width : Number.POSITIVE_INFINITY;
      if (w <= BREAKPOINT_NARROW_MAX) return "narrow";
      if (w <= BREAKPOINT_TABLET_MAX) return "tablet";
      return "wide";
    }
    function clampPointToViewport(x, y, width, height, viewportW, viewportH, safeInset = 0) {
      const ins = Number.isFinite(safeInset) ? Math.max(0, safeInset) : 0;
      const hiX = Math.max(ins, viewportW - width - ins);
      const hiY = Math.max(ins, viewportH - height - ins);
      return {
        x: Math.min(Math.max(x, ins), hiX),
        y: Math.min(Math.max(y, ins), hiY)
      };
    }
    function composerDockedAtBottom(seatRect, containerRect) {
      if (seatRect == null || containerRect == null) return false;
      return Math.abs(seatRect.bottom - containerRect.bottom) <= 0.5;
    }
    function bottomAnchorEdge(containerBottom, seatTop, docked) {
      if (docked && typeof seatTop === "number" && Number.isFinite(seatTop)) return seatTop;
      return containerBottom;
    }

    // src/shared/status.ts
    var SERVER_STATES = {
      connected: "connected",
      connecting: "connecting",
      reconnecting: "reconnecting",
      disabled: "disabled",
      stopped: "stopped",
      failed: "failed"
    };

    // src/shared/frames.ts
    var SSE_FRAMES = {
      summary: "summary",
      uiConfigChanged: "ui-config-changed",
      ping: "ping"
    };

    // src/shared/routes.ts
    var ROUTES = {
      servers: "/api/dsh-mcp/servers",
      config: "/api/dsh-mcp/config",
      session: "/api/dsh-mcp/session",
      resume: "/api/dsh-mcp/resume",
      connect: "/api/dsh-mcp/servers/connect",
      disconnect: "/api/dsh-mcp/servers/disconnect",
      reconnect: "/api/dsh-mcp/servers/reconnect",
      importJson: "/api/dsh-mcp/import/json",
      events: "/api/dsh-mcp/events",
      health: "/api/dsh-mcp/health",
      toolDisable: "/api/dsh-mcp/tool-disable"
    };

    // src/shared/constants.ts
    var MCP_MANAGER_BUNDLE_PACKAGE = "@wingsky-1/dsh-mcp-manager";
    var MCP_MANAGER_ROW_ID = "dsh-mcp-manager";
    var MCP_MANAGER_SETTINGS_NAMESPACE = "dsh-mcp-manager";
    var MCP_MANAGER_IDENTITY = Object.freeze({
      bundlePackage: MCP_MANAGER_BUNDLE_PACKAGE,
      rowId: MCP_MANAGER_ROW_ID,
      settingsNamespace: MCP_MANAGER_SETTINGS_NAMESPACE,
      rowConfigKey: `${MCP_MANAGER_BUNDLE_PACKAGE}#${MCP_MANAGER_ROW_ID}`
    });

    // src/client/core/constants.ts
    var API = {
      servers: ROUTES.servers,
      connect: ROUTES.connect,
      disconnect: ROUTES.disconnect,
      reconnect: ROUTES.reconnect,
      importJson: ROUTES.importJson,
      session: ROUTES.session,
      resume: ROUTES.resume,
      config: ROUTES.config,
      events: ROUTES.events,
      health: ROUTES.health,
      toolDisable: ROUTES.toolDisable
    };
    var STATUS_ORDER = [
      {
        key: SERVER_STATES.connected,
        titleKey: "stConnected",
        dot: "var(--dsw-alias-state-success-primary,#0f9d6e)"
      },
      {
        key: SERVER_STATES.connecting,
        titleKey: "stConnecting",
        dot: "var(--dsw-alias-state-business-primary,#2f7bf6)"
      },
      {
        key: SERVER_STATES.reconnecting,
        titleKey: "stReconnecting",
        dot: "var(--dsw-alias-state-warn-primary,#e08b1e)"
      },
      {
        key: SERVER_STATES.stopped,
        titleKey: "stStopped",
        dot: "var(--dsw-alias-label-tertiary,#9aa1ad)"
      },
      {
        key: SERVER_STATES.disabled,
        titleKey: "stDisabled",
        dot: "var(--dsw-alias-label-tertiary,#9aa1ad)"
      },
      {
        key: SERVER_STATES.failed,
        titleKey: "stFailed",
        dot: "var(--dsw-alias-state-error-primary,#e0483e)"
      }
    ];
    var STATUS_TEXT = {
      [SERVER_STATES.connected]: "stConnected",
      [SERVER_STATES.connecting]: "stConnecting",
      [SERVER_STATES.reconnecting]: "stReconnecting",
      [SERVER_STATES.stopped]: "stStopped",
      [SERVER_STATES.disabled]: "stDisabled",
      [SERVER_STATES.failed]: "stFailed"
    };
    function statusDot(status) {
      const group = STATUS_ORDER.find((entry) => entry.key === status);
      return group !== void 0 ? group.dot : "var(--dsw-alias-label-tertiary,#9aa1ad)";
    }

    // src/client/core/state.ts
    function createState() {
      return {
        overlay: void 0,
        card: void 0,
        bodyEl: void 0,
        open: false,
        panelOpener: void 0,
        activeTab: "servers",
        servers: [],
        pending: /* @__PURE__ */ new Map(),
        counts: {},
        refreshError: void 0,
        editingName: void 0,
        editing: void 0,
        editingGeneration: void 0,
        formName: void 0,
        formScope: void 0,
        formTransport: void 0,
        formCommand: void 0,
        formArgs: void 0,
        formEnv: void 0,
        formCwd: void 0,
        formUrl: void 0,
        formHeaders: void 0,
        formEnabled: void 0,
        floatPill: void 0,
        floatPanel: void 0,
        floatOpen: false,
        currentCwd: void 0,
        sessionResolved: false,
        sessionGeneration: 0,
        warnedUnknownSession: false,
        unknownSessionFrames: 0,
        projectRoot: void 0,
        updateFloatState: void 0,
        mcpUiConfig: {
          position: "top-right",
          offsetX: 8,
          offsetY: 8,
          blankY: 40,
          zIndexBase: DEFAULT_Z_INDEX_BASE
        },
        API: { ...API }
      };
    }

    // ../../shared/client/i18n.js
    var t = function(key) {
      return key;
    };
    function bindLocale(locale, ns) {
      if (locale && typeof locale.bind === "function") {
        t = locale.bind(ns);
      }
    }

    // src/client/core/api.ts
    function assertActionSession(state, scope, generation) {
      if (state.sessionGeneration !== generation || scope === "project" && (!state.sessionResolved || !state.currentCwd)) {
        throw new Error(t("sessionUnavailable"));
      }
    }
    function serverKey(server) {
      return JSON.stringify([server.scope, server.name]);
    }
    async function submitConnection(server, state, actions, kind, submit) {
      const key = serverKey(server);
      if (state.pending.has(key)) return;
      const pending = { kind };
      const generation = state.sessionGeneration;
      state.pending.set(key, pending);
      actions.render?.();
      try {
        await submit();
      } finally {
        if (state.sessionGeneration === generation) await actions.refresh(true);
        if (state.pending.get(key) === pending) state.pending.delete(key);
        actions.render?.();
      }
    }
    function toolDisableServerKey(server, state) {
      if (server.scope === "global") return `@@global/${server.name}`;
      const root = state.projectRoot;
      if (typeof root !== "string" || root === "") return void 0;
      return `@${root}/${server.name}`;
    }
    function cwdQueryOf(state) {
      return state.sessionResolved ? `&cwd=${encodeURIComponent(state.currentCwd ?? "")}` : "";
    }
    function serversUrlOf(state) {
      if (!state.sessionResolved) return void 0;
      return `${state.API.servers}?cwd=${encodeURIComponent(state.currentCwd ?? "")}`;
    }
    function resumeBodyOf(state) {
      if (!state.sessionResolved) return void 0;
      return { cwd: typeof state.currentCwd === "string" ? state.currentCwd : "" };
    }
    async function api(path, options = {}) {
      const timeoutMs = options.timeoutMs ?? 1e4;
      const hasCallerSignal = options.signal !== void 0;
      const controller = new AbortController();
      const timer = hasCallerSignal ? void 0 : setTimeout(
        () => controller.abort(new Error(`request timed out (${timeoutMs}ms)`)),
        timeoutMs
      );
      const merged = { ...options, signal: options.signal ?? controller.signal };
      try {
        const response = await fetch(path, merged);
        let body;
        try {
          body = await response.json();
        } catch {
          body = void 0;
        }
        if (!response.ok) {
          const msg = body?.error ?? `HTTP ${response.status}`;
          throw new Error(msg);
        }
        return body;
      } finally {
        if (timer !== void 0) clearTimeout(timer);
      }
    }

    // src/client/core/dom.ts
    function pangu(text) {
      return String(text).replace(/([㐀-䶿一-鿿豈-﫿])([A-Za-z0-9@#$%^&*()[\]{}<>+\-=/\\|])/g, "$1 $2").replace(/([A-Za-z0-9@#$%^&*()[\]{}<>+\-=/\\|])([㐀-䶿一-鿿豈-﫿])/g, "$1 $2");
    }
    function applyAttrs(node, attrs) {
      for (const [key, value] of Object.entries(attrs)) {
        if (key === "class") node.className = value == null ? "" : String(value);
        else if (key === "text") node.textContent = String(value);
        else if (key === "dataset") Object.assign(node.dataset, value);
        else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
        else if (key === "checked") node.checked = value;
        else if (key === "disabled") node.disabled = value;
        else if (key === "children") continue;
        else node.setAttribute(key, String(value));
      }
    }
    function appendKids(node, kids) {
      for (const child of kids) {
        if (child === void 0 || child === null) continue;
        node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
      }
    }
    function el(tag, attrs = {}, children) {
      const kids = children ?? attrs.children ?? [];
      const node = document.createElement(tag);
      applyAttrs(node, attrs);
      appendKids(node, kids);
      return node;
    }

    // src/client/core/i18n.ts
    function tStatus(status) {
      return STATUS_TEXT[status] !== void 0 ? t(STATUS_TEXT[status]) : status;
    }

    // src/client/float/servers.ts
    function endpointOf(server) {
      if (server.transport === "streamable-http") return server.url ?? "";
      const args = Array.isArray(server.args) && server.args.length > 0 ? ` ${server.args.join(" ")}` : "";
      return `${server.command ?? ""}${args}`;
    }
    function actionButton(label, onClick, primary = false, danger = false) {
      return el("button", {
        class: `${primary ? "dm-primary" : ""} ${danger ? "dm-danger" : ""}`.trim(),
        text: label,
        onclick: async () => {
          try {
            await onClick();
          } catch (error) {
            window.alert(
              t("actionFail", { msg: error instanceof Error ? error.message : String(error) })
            );
          }
        }
      });
    }
    function toolCheckbox(server, tool, disabled, state, actions) {
      const label = el("label", { class: "dm-tool" });
      const input = el("input", { type: "checkbox", checked: disabled });
      input.addEventListener("change", () => {
        const serverKey2 = toolDisableServerKey(server, state);
        if (serverKey2 === void 0) {
          input.checked = !input.checked;
          console.warn("[dsh-mcp-manager] projectRoot 缺失，跳过 tool-disable（非法 @/name 防御）");
          return;
        }
        void api(state.API.toolDisable, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            server: serverKey2,
            tool,
            disabled: input.checked
          })
        }).then(() => actions.refresh()).catch((error) => {
          input.checked = !input.checked;
          console.warn("[dsh-mcp-manager] tool-disable failed:", error);
        });
      });
      label.appendChild(input);
      label.appendChild(document.createTextNode(tool));
      return label;
    }
    function serverToolsDetails(server, toolCount, opts, state, actions, interactive) {
      const details = el("details", { class: "dm-tools", dataset: { dmServer: server.name } });
      if (opts.openTools?.has(server.name) === true) details.open = true;
      details.appendChild(el("summary", { text: t("toolsCount", { n: toolCount }) }));
      const list = el("ul");
      const tools = Array.isArray(server.tools) ? server.tools : [];
      if (interactive) {
        const disabledSet = new Set(Array.isArray(server.disabledTools) ? server.disabledTools : []);
        for (const tool of tools) {
          list.appendChild(
            el("li", {}, [toolCheckbox(server, tool, disabledSet.has(tool), state, actions)])
          );
        }
      } else {
        for (const tool of tools) list.appendChild(el("li", { text: tool }));
      }
      details.appendChild(list);
      return details;
    }
    function jsonPatchInit(enabled) {
      return {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ enabled })
      };
    }
    function statusActions(server, state, actions, scopeQuery, cwdQuery) {
      const name = encodeURIComponent(server.name);
      const generation = state.sessionGeneration;
      if (server.status === "connecting" || server.status === "reconnecting") {
        return [
          {
            label: t("disconnect"),
            primary: false,
            run: () => submitConnection(
              server,
              state,
              actions,
              "disconnect",
              () => api(`${state.API.disconnect}?name=${name}${scopeQuery}${cwdQuery}`, { method: "POST" })
            )
          }
        ];
      }
      if (server.status === "connected") {
        return [
          {
            label: t("disconnect"),
            primary: false,
            run: () => submitConnection(
              server,
              state,
              actions,
              "disconnect",
              () => api(`${state.API.disconnect}?name=${name}${scopeQuery}${cwdQuery}`, { method: "POST" })
            )
          },
          {
            label: t("reconnect"),
            primary: false,
            run: () => submitConnection(
              server,
              state,
              actions,
              "connect",
              () => api(`${state.API.reconnect}?name=${name}${scopeQuery}${cwdQuery}`, { method: "POST" })
            )
          }
        ];
      }
      if (server.status === "disabled") {
        return [
          {
            label: t("enableAndConnect"),
            primary: true,
            run: () => submitConnection(server, state, actions, "connect", async () => {
              assertActionSession(state, server.scope, generation);
              await api(
                `${state.API.servers}?name=${name}${scopeQuery}${cwdQuery}`,
                jsonPatchInit(true)
              );
            })
          }
        ];
      }
      return [
        {
          label: t("connect"),
          primary: true,
          run: () => submitConnection(
            server,
            state,
            actions,
            "connect",
            () => api(`${state.API.connect}?name=${name}${scopeQuery}${cwdQuery}`, { method: "POST" })
          )
        }
      ];
    }
    function disableAction(server, state, actions, scopeQuery, cwdQuery) {
      const name = encodeURIComponent(server.name);
      const generation = state.sessionGeneration;
      return {
        label: t("disable"),
        primary: false,
        run: () => submitConnection(server, state, actions, "disconnect", async () => {
          assertActionSession(state, server.scope, generation);
          await api(
            `${state.API.servers}?name=${name}${scopeQuery}${cwdQuery}`,
            jsonPatchInit(false)
          );
          if (state.sessionGeneration === generation && state.editingName === server.name)
            actions.resetForm();
        })
      };
    }
    function deleteAction(server, state, actions, scopeQuery) {
      const name = encodeURIComponent(server.name);
      const cwdQuery = cwdQueryOf(state);
      const generation = state.sessionGeneration;
      return {
        label: t("delete"),
        primary: false,
        danger: true,
        run: async () => {
          if (!window.confirm(t("confirmDelete", { name: server.name }))) return;
          if (state.sessionGeneration !== generation || server.scope === "project" && (!state.sessionResolved || !state.currentCwd)) {
            throw new Error(t("sessionUnavailable"));
          }
          await api(`${state.API.servers}?name=${name}${scopeQuery}${cwdQuery}`, {
            method: "DELETE"
          });
          if (state.editingName === server.name) actions.resetForm();
          await actions.refresh();
        }
      };
    }
    function needsAttention(server) {
      return server.status === "failed" || server.status === "reconnecting";
    }
    function bucketByStatus(list) {
      const byStatus = /* @__PURE__ */ new Map();
      for (const group of STATUS_ORDER) byStatus.set(group.key, []);
      for (const server of list) {
        const bucket = byStatus.get(server.status) ?? byStatus.get("stopped");
        if (bucket !== void 0) bucket.push(server);
      }
      return byStatus;
    }
    function serverCardClass(server) {
      return needsAttention(server) ? "dm-server dm-server--fail" : "dm-server";
    }
    function serverCardHeader(server, toolCount) {
      const isHttp = server.transport === "streamable-http";
      const header = el("header");
      header.appendChild(el("span", { class: "dm-name", text: server.name }));
      header.appendChild(
        el("span", {
          class: `dm-badge ${isHttp ? "dm-http" : "dm-stdio"}`,
          text: isHttp ? "HTTP" : "stdio"
        })
      );
      header.appendChild(
        el("span", {
          class: "dm-badge",
          text: server.scope === "project" ? t("badgeScopeProject") : t("badgeScopeGlobal")
        })
      );
      header.appendChild(
        el("span", { class: `dm-badge dm-st-${server.status}`, text: tStatus(server.status) })
      );
      header.appendChild(
        el("span", { class: "dm-count", text: t("toolsCountPlain", { n: toolCount }) })
      );
      return header;
    }
    function renderServer(server, state, actions, opts = { tools: true }) {
      const article = el("article", { class: serverCardClass(server) });
      const pending = state.pending.get(serverKey(server))?.kind;
      const toolCount = Array.isArray(server.tools) ? server.tools.length : 0;
      article.appendChild(serverCardHeader(server, toolCount));
      renderPendingBadge(article, server, pending);
      article.appendChild(el("div", { class: "dm-endpoint", text: endpointOf(server) }));
      if (server.error !== void 0 && server.error !== "") {
        article.appendChild(el("div", { class: "dm-err", text: server.error }));
      }
      if (toolCount > 0) {
        article.appendChild(serverToolsDetails(server, toolCount, opts, state, actions, opts.tools));
      }
      const actionsEl = el("div", { class: "dm-actions" });
      const busy = server.status === "connecting" || server.status === "reconnecting";
      const scopeQuery = `&scope=${server.scope}`;
      const cwdQuery = cwdQueryOf(state);
      for (const spec of statusActions(server, state, actions, scopeQuery, cwdQuery)) {
        actionsEl.appendChild(actionButton(spec.label, spec.run, spec.primary));
      }
      if (server.status !== "disabled") {
        const disable = disableAction(server, state, actions, scopeQuery, cwdQuery);
        actionsEl.appendChild(actionButton(disable.label, disable.run, disable.primary));
      }
      actionsEl.appendChild(actionButton(t("edit"), () => actions.beginEdit(server)));
      const remove = deleteAction(server, state, actions, scopeQuery);
      actionsEl.appendChild(
        actionButton(remove.label, remove.run, remove.primary, remove.danger === true)
      );
      actionsEl.children[actionsEl.children.length - 1].disabled = busy;
      disablePendingActions(actionsEl, pending);
      article.appendChild(actionsEl);
      return article;
    }
    function renderPendingBadge(article, server, pending) {
      if (pending === void 0) return;
      const badge = article.querySelector(".dm-st-" + server.status);
      if (badge !== null)
        badge.textContent = t(pending === "connect" ? "stConnecting" : "stDisconnecting");
    }
    function disablePendingActions(actionsEl, pending) {
      if (pending === void 0) return;
      for (const button of actionsEl.querySelectorAll("button")) button.disabled = true;
    }
    function renderServers(state, actions) {
      if (state.bodyEl === void 0) return;
      const openTools = /* @__PURE__ */ new Set();
      for (const d of state.bodyEl.querySelectorAll("details.dm-tools")) {
        if (d.open && d.dataset.dmServer !== void 0) openTools.add(d.dataset.dmServer);
      }
      state.bodyEl.textContent = "";
      if (state.servers.length === 0) {
        state.bodyEl.appendChild(
          el("div", { class: "dm-status", children: [document.createTextNode(t("serversEmpty"))] })
        );
        return;
      }
      const attention = state.servers.filter(needsAttention);
      const rest = state.servers.filter((server) => !needsAttention(server));
      const appendGroup = (title, list, alert) => {
        if (list.length === 0) return;
        const section = el("section", { class: "dm-group" });
        const titleEl = alert ? el("h3", { class: "dm-group-alert" }) : el("h3");
        titleEl.appendChild(document.createTextNode(title));
        section.appendChild(titleEl);
        const byStatus = bucketByStatus(list);
        for (const group of STATUS_ORDER) {
          const bucket = byStatus.get(group.key) ?? [];
          if (bucket.length === 0) continue;
          const sub = el("div", { class: "dm-subgroup" });
          sub.appendChild(
            el("h4", {
              class: "dm-subgroup-title",
              text: pangu(t("statusGroupCount", { status: t(group.titleKey), n: bucket.length }))
            })
          );
          for (const server of [...bucket].sort(
            (a, b) => a.name.localeCompare(b.name)
          )) {
            sub.appendChild(renderServer(server, state, actions, { tools: true, openTools }));
          }
          section.appendChild(sub);
        }
        state.bodyEl.appendChild(section);
      };
      appendGroup(t("groupAttention", { n: attention.length }), attention, true);
      for (const scope of ["project", "global"]) {
        const list = rest.filter((server) => server.scope === scope);
        if (list.length === 0) continue;
        const label = scope === "project" ? t("groupProject") : t("groupGlobal");
        appendGroup(`${label} (${list.length})`, list, false);
      }
    }

    // src/client/float/quick-add.ts
    function parseKV(text) {
      const out = {};
      for (const raw of text.split(/\r?\n/)) {
        const line = raw.trim();
        if (line === "") continue;
        const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*[:=]\s*(.*)$/);
        if (match === null) continue;
        const value = match[2].trim();
        if (value !== "") out[match[1]] = value;
        else out[match[1]] = "";
      }
      return out;
    }
    function isProjectionValue(value) {
      return typeof value === "string" && (value.includes("[REDACTED]") || value.includes("%5BREDACTED%5D"));
    }
    function formScopeValue(state) {
      if (state.formScope !== void 0 && (state.formScope.value === "project" || state.formScope.value === "global")) {
        return state.formScope.value;
      }
      return state.projectRoot !== void 0 && state.projectRoot !== "" ? "project" : "global";
    }
    function currentCwdBody(state) {
      return typeof state.currentCwd === "string" && state.currentCwd !== "" ? { cwd: state.currentCwd } : {};
    }
    function isServerTransport(value) {
      return value === "stdio" || value === "streamable-http";
    }
    function formTransportValue(state) {
      const value = state.formTransport?.value ?? "stdio";
      return isServerTransport(value) ? value : "stdio";
    }
    function readStdioFormFields(state) {
      const fields = {
        command: controlText(state.formCommand).trim()
      };
      const args = controlText(state.formArgs).split(",").map((part) => part.trim()).filter(Boolean);
      if (args.length > 0) fields.args = args;
      const env = parseKV(controlText(state.formEnv));
      if (Object.keys(env).length > 0) fields.env = env;
      const cwd = controlText(state.formCwd).trim();
      if (cwd !== "") fields.cwd = cwd;
      return fields;
    }
    function controlText(control) {
      return control?.value ?? "";
    }
    function readHttpFormFields(state) {
      const fields = {
        url: controlText(state.formUrl).trim()
      };
      const headers = parseKV(controlText(state.formHeaders));
      if (Object.keys(headers).length > 0) fields.headers = headers;
      return fields;
    }
    function readForm(state) {
      const server = {
        name: state.formName?.value.trim() ?? "",
        transport: formTransportValue(state),
        enabled: state.formEnabled?.checked ?? true
      };
      if (server.transport === "stdio") Object.assign(server, readStdioFormFields(state));
      else Object.assign(server, readHttpFormFields(state));
      return server;
    }
    function resetForm(state) {
      state.editingName = void 0;
      state.editingGeneration = void 0;
      state.editing = void 0;
      if (state.formName === void 0) return;
      state.formName.value = "";
      state.formScope.value = state.projectRoot !== void 0 && state.projectRoot !== "" ? "project" : "global";
      state.formTransport.value = "stdio";
      state.formCommand.value = "";
      state.formArgs.value = "";
      state.formEnv.value = "";
      state.formCwd.value = "";
      state.formUrl.value = "";
      state.formHeaders.value = "";
      state.formEnabled.checked = true;
      state.formTransport.dispatchEvent(new Event("change"));
      const title = document.getElementById("dm-form-title");
      if (title !== null) title.textContent = t("addServer");
      const cancel = document.querySelector("[data-dm-cancel]");
      if (cancel !== null) cancel.disabled = true;
    }
    function fillKvField(input, table, separator) {
      if (input === void 0) return;
      input.value = table === void 0 ? "" : Object.entries(table).map(([key, value]) => `${key}${separator}${value}`).join("\n");
    }
    function fillForm(state, fill) {
      if (fill.name !== void 0) state.formName.value = fill.name;
      state.formTransport.value = fill.transport ?? "stdio";
      if (fill.command !== void 0) state.formCommand.value = fill.command;
      if (Array.isArray(fill.args)) state.formArgs.value = fill.args.join(", ");
      fillKvField(state.formEnv, fill.env, "=");
      if (fill.cwd !== void 0) state.formCwd.value = fill.cwd;
      if (fill.url !== void 0) state.formUrl.value = fill.url;
      fillKvField(state.formHeaders, fill.headers, ": ");
      if (state.formEnabled !== void 0) state.formEnabled.checked = fill.enabled !== false;
      state.formTransport.dispatchEvent(new Event("change"));
    }
    function isMigratedEdit(state, server, payload) {
      const editingName = state.editingName;
      if (editingName === void 0) return false;
      const serverName = typeof server.name === "string" ? server.name : "";
      if (editingName !== serverName) return true;
      const editScope = state.editing?.scope;
      return editScope !== void 0 && editScope !== payload.scope;
    }
    function urlPlaceholderBlocks(state, server, payload) {
      return !isEditing(state) || isMigratedEdit(state, server, payload);
    }
    function stripProjectionTables(payload) {
      for (const key of PROJECTION_TABLES) {
        const table = payload[key];
        if (!isPlainRecord(table)) continue;
        const kept = Object.entries(table).filter(([, value]) => !isProjectionValue(value));
        if (kept.length === 0) delete payload[key];
        else payload[key] = Object.fromEntries(kept);
      }
    }
    function isPlainRecord(value) {
      return typeof value === "object" && value !== null && !Array.isArray(value);
    }
    var PROJECTION_TABLES = ["env", "headers"];
    function isEditing(state) {
      return state.editingName !== void 0;
    }
    async function saveForm(state, actions) {
      const server = readForm(state);
      const generation = state.sessionGeneration;
      try {
        const payload = {
          ...server,
          scope: formScopeValue(state),
          ...currentCwdBody(state)
        };
        const urlIsProjection = typeof payload.url === "string" && isProjectionValue(payload.url);
        if (urlIsProjection && urlPlaceholderBlocks(state, server, payload)) {
          window.alert(t("saveFail", { msg: "URL 含脱敏占位符，请重填真实 URL 后再保存" }));
          return;
        }
        if (urlIsProjection) delete payload.url;
        stripProjectionTables(payload);
        if (!await performSaveRequest(state, server, payload)) return;
        if (state.sessionGeneration !== generation) return;
        resetForm(state);
        await actions.refresh();
      } catch (error) {
        window.alert(t("saveFail", { msg: error instanceof Error ? error.message : String(error) }));
      }
    }
    function jsonWriteInit(payload) {
      return {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      };
    }
    async function performSaveRequest(state, server, payload) {
      if (isMigratedEdit(state, server, payload)) {
        if (state.editing?.hasSecrets === true) {
          window.alert(
            t("saveFail", {
              msg: "改名/改归属迁移不会带入原有凭据，请新建同名条目并填写真实凭据，确认可用后再删除旧条目"
            })
          );
          return false;
        }
        await api(state.API.servers, jsonWriteInit(payload));
        await api(
          `${state.API.servers}?name=${encodeURIComponent(state.editingName ?? "")}&scope=${state.editing?.scope}`,
          { method: "DELETE" }
        );
        return true;
      }
      if (isEditing(state)) {
        assertActionSession(
          state,
          formScopeValue(state),
          state.editingGeneration ?? state.sessionGeneration
        );
        const query = `name=${encodeURIComponent(state.editingName ?? "")}&scope=${formScopeValue(state)}`;
        await api(`${state.API.servers}?${query}${cwdQueryOf(state)}`, {
          ...jsonWriteInit(payload),
          method: "PATCH"
        });
        return true;
      }
      await api(state.API.servers, jsonWriteInit(payload));
      return true;
    }
    function beginEdit(state, actions, server) {
      state.editingName = server.name;
      state.editingGeneration = state.sessionGeneration;
      state.editing = server;
      actions.switchTab("quick");
      fillForm(state, server);
      if (state.formScope !== void 0 && (server.scope === "project" || server.scope === "global")) {
        state.formScope.value = server.scope;
      }
      const title = document.getElementById("dm-form-title");
      if (title !== null) title.textContent = t("editServer", { name: server.name });
      const cancel = document.querySelector("[data-dm-cancel]");
      if (cancel !== null) cancel.disabled = false;
    }
    function buildQuickAdd(state, actions) {
      const page = el("div");
      const form = el("section", { class: "dm-section" });
      form.appendChild(el("h3", { id: "dm-form-title", text: t("addServer") }));
      state.formName = el("input", {
        id: "dm-f-name",
        placeholder: "context7",
        value: state.editing?.name ?? ""
      });
      state.formScope = el("select", { id: "dm-f-scope" });
      state.formScope.appendChild(el("option", { value: "project", text: t("scopeProjectOpt") }));
      state.formScope.appendChild(el("option", { value: "global", text: t("scopeGlobalOpt") }));
      state.formScope.value = state.editing?.scope ?? (state.projectRoot !== void 0 && state.projectRoot !== "" ? "project" : "global");
      state.formTransport = el("select", { id: "dm-f-transport" });
      state.formTransport.appendChild(el("option", { value: "stdio", text: t("transportStdioOpt") }));
      state.formTransport.appendChild(
        el("option", { value: "streamable-http", text: t("transportHttpOpt") })
      );
      state.formCommand = el("input", { id: "dm-f-command", placeholder: "npx" });
      state.formArgs = el("input", { id: "dm-f-args", placeholder: "-y, @context7/mcp-server" });
      state.formEnv = el("textarea", { id: "dm-f-env", placeholder: t("envPlaceholder") });
      state.formCwd = el("input", { id: "dm-f-cwd", placeholder: t("cwdPlaceholder") });
      state.formUrl = el("input", { id: "dm-f-url", placeholder: "https://mcp.context7.com/mcp" });
      state.formHeaders = el("textarea", { id: "dm-f-headers", placeholder: t("headersPlaceholder") });
      state.formEnabled = el("input", { id: "dm-f-enabled", type: "checkbox", checked: true });
      const grid = el("div", { class: "dm-form" });
      grid.appendChild(
        el("div", {
          class: "dm-field",
          children: [el("label", { text: t("nameLabel") }), state.formName]
        })
      );
      grid.appendChild(
        el("div", {
          class: "dm-field",
          children: [el("label", { text: t("ownershipLabel") }), state.formScope]
        })
      );
      grid.appendChild(
        el("div", {
          class: "dm-field",
          children: [el("label", { text: t("transportLabel") }), state.formTransport]
        })
      );
      grid.appendChild(
        el("div", {
          class: "dm-field dm-full",
          children: [el("label", { text: t("commandLabel") }), state.formCommand]
        })
      );
      grid.appendChild(
        el("div", {
          class: "dm-field dm-full",
          children: [el("label", { text: t("argsLabel") }), state.formArgs]
        })
      );
      grid.appendChild(
        el("div", {
          class: "dm-field dm-full",
          children: [el("label", { text: t("envLabel") }), state.formEnv]
        })
      );
      grid.appendChild(
        el("div", {
          class: "dm-field dm-full",
          children: [el("label", { text: t("cwdLabel") }), state.formCwd]
        })
      );
      grid.appendChild(
        el("div", {
          class: "dm-field dm-full",
          children: [el("label", { text: t("urlLabel") }), state.formUrl]
        })
      );
      grid.appendChild(
        el("div", {
          class: "dm-field dm-full",
          children: [el("label", { text: t("headersLabel") }), state.formHeaders]
        })
      );
      grid.appendChild(
        el("div", {
          class: "dm-check dm-field dm-full",
          children: [state.formEnabled, el("label", { text: t("enabledLabel") })]
        })
      );
      const actionsEl = el("div", { class: "dm-form-actions" });
      const save = el("button", {
        class: "dm-primary",
        text: t("save"),
        onclick: () => void saveForm(state, actions)
      });
      const cancel = el("button", {
        text: t("cancelEdit"),
        onclick: () => resetForm(state),
        disabled: true
      });
      cancel.dataset.dmCancel = "";
      actionsEl.appendChild(save);
      actionsEl.appendChild(cancel);
      grid.appendChild(actionsEl);
      form.appendChild(grid);
      page.appendChild(form);
      const syncTransport = () => {
        const isHttp = state.formTransport.value === "streamable-http";
        for (const field of [state.formCommand, state.formArgs, state.formEnv, state.formCwd]) {
          field.closest(".dm-field").style.display = isHttp ? "none" : "flex";
        }
        for (const field of [state.formUrl, state.formHeaders]) {
          field.closest(".dm-field").style.display = isHttp ? "flex" : "none";
        }
      };
      state.formTransport.addEventListener("change", syncTransport);
      const paste = el("section", { class: "dm-section" });
      paste.appendChild(el("h3", { text: t("pasteTitle") }));
      const pasteBox = el("div", { class: "dm-paste-box" });
      const textarea = el("textarea", {
        class: "dm-full",
        placeholder: '{"my-server":{"command":"npx","args":["-y","pkg"],"env":{"KEY":"value"}},"remote":{"url":"https://...","headers":{}}}',
        style: "width:100%;min-height:90px;border:1px solid #d7dae0;border-radius:6px;padding:6px 8px;font-size:12px;font-family:ui-monospace,Consolas,monospace;box-sizing:border-box"
      });
      pasteBox.appendChild(textarea);
      pasteBox.appendChild(
        el("div", {
          class: "dm-actions",
          children: [
            el("button", {
              class: "dm-primary",
              text: t("importJson"),
              onclick: async () => {
                const result = pasteBox.querySelector(".dm-result");
                try {
                  const payload = await api(
                    state.API.importJson,
                    {
                      method: "POST",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify({
                        json: textarea.value,
                        scope: formScopeValue(state),
                        ...currentCwdBody(state)
                      })
                    }
                  );
                  result.textContent = t("importedOk", {
                    names: payload.imported.join(", ") || t("importedNone")
                  });
                  if (payload.skipped.length > 0) {
                    result.appendChild(
                      el("div", {
                        class: "dm-skip",
                        text: t("importSkipped", { names: payload.skipped.join(", ") })
                      })
                    );
                  }
                  await actions.refresh();
                } catch (error) {
                  result.textContent = t("importFail", {
                    msg: error instanceof Error ? error.message : String(error)
                  });
                }
              }
            })
          ]
        })
      );
      pasteBox.appendChild(el("div", { class: "dm-result" }));
      paste.appendChild(pasteBox);
      page.appendChild(paste);
      return page;
    }

    // src/client/core/current-session.ts
    var UNKNOWN = { kind: "unknown" };
    function isObject(value) {
      return typeof value === "object" && value !== null;
    }
    function isMainViewRow(row) {
      if (!isObject(row)) return false;
      const retained = row.retainedBy;
      if (retained === void 0 || retained === null) return false;
      const count = retained.mainView;
      return typeof count === "number" && count > 0;
    }
    function readSnapshot(list) {
      try {
        const snapshot = list.getSnapshot();
        return isObject(snapshot) ? snapshot : void 0;
      } catch {
        return void 0;
      }
    }
    function firstMainViewRow(state) {
      const byId = state.byId;
      if (!isObject(byId)) return void 0;
      const rows = byId;
      for (const value of Object.values(rows)) {
        if (!isObject(value)) continue;
        const row = value;
        if (isMainViewRow(row)) return row;
      }
      return void 0;
    }
    function readCurrentSession(list) {
      if (list === void 0 || typeof list.getSnapshot !== "function") return UNKNOWN;
      const state = readSnapshot(list);
      if (state === void 0) return UNKNOWN;
      const row = firstMainViewRow(state);
      if (row === void 0) return UNKNOWN;
      return { kind: "session", row, cwd: row.cwd, blank: row.blank === true };
    }

    // src/client/float/float.ts
    function replayAnim(node) {
      const style = node.style;
      style.animation = "none";
      void node.offsetWidth;
      style.animation = "";
    }
    function pillDotColor(fail, connected) {
      if (fail) return "var(--dsw-alias-state-error-primary,#e0483e)";
      if (connected > 0) return "var(--dsw-alias-state-success-primary,#0f9d6e)";
      return "var(--dsw-alias-label-tertiary,#9aa1ad)";
    }
    function pillHints(total, bad, connected) {
      const failed = t("healthFailed", { n: bad });
      return {
        title: bad > 0 ? `${t("floatTitle")} · ${failed}` : t("floatTitle"),
        aria: bad > 0 ? `${t("floatAriaLabel")} · ${failed}` : `${t("floatAriaLabel")} · ${connected}/${total}`
      };
    }
    function renderPill(state) {
      if (state.floatPill === void 0) return;
      const ok = state.counts.connected ?? 0;
      const bad = (state.counts.failed ?? 0) + (state.counts.reconnecting ?? 0);
      const total = state.servers.length;
      const fail = bad > 0;
      state.floatPill.classList.toggle("dm-float--fail", fail);
      state.floatPill.textContent = "";
      state.floatPill.appendChild(
        el("span", { class: "dm-dot", style: `background:${pillDotColor(fail, ok)}` })
      );
      if (fail) state.floatPill.appendChild(el("span", { class: "dm-float-fail", text: "!" }));
      state.floatPill.appendChild(el("span", { text: total > 0 ? `MCP ${ok}/${total}` : "MCP" }));
      if (total === 0) return;
      const hints = pillHints(total, bad, ok);
      state.floatPill.title = hints.title;
      state.floatPill.setAttribute("aria-label", hints.aria);
    }
    function toolCheckbox2(server, tool, disabled, state, actions) {
      const label = el("label", { class: "dm-float-tool" });
      const input = el("input", {
        type: "checkbox",
        checked: disabled,
        dataset: { dshMcpTool: tool }
      });
      input.addEventListener("change", () => {
        const serverKey2 = toolDisableServerKey(server, state);
        if (serverKey2 === void 0) {
          input.checked = !input.checked;
          console.warn("[dsh-mcp-manager] projectRoot 缺失，跳过 tool-disable（非法 @/name 防御）");
          return;
        }
        void api(state.API.toolDisable, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            server: serverKey2,
            tool,
            disabled: input.checked
          })
        }).then(() => actions.refresh()).catch((error) => {
          input.checked = !input.checked;
          console.warn("[dsh-mcp-manager] tool-disable failed:", error);
        });
      });
      label.appendChild(input);
      label.appendChild(document.createTextNode(tool));
      return label;
    }
    function renderFloatTools(server, state, actions, openTools) {
      const tools = Array.isArray(server.tools) ? server.tools : [];
      const disabledSet = new Set(Array.isArray(server.disabledTools) ? server.disabledTools : []);
      const details = el("details", { class: "dm-float-tools", dataset: { dmServer: server.name } });
      if (openTools.has(server.name)) details.open = true;
      details.appendChild(el("summary", { text: t("toolsCount", { n: tools.length }) }));
      const list = el("div", { class: "dm-float-tool-list" });
      for (const tool of tools) {
        list.appendChild(toolCheckbox2(server, tool, disabledSet.has(tool), state, actions));
      }
      details.appendChild(list);
      return details;
    }
    function floatActionClass(server) {
      if (server.status === "failed" || server.status === "stopped")
        return "dm-float-action dm-primary";
      return "dm-float-action";
    }
    function primaryRowAction(server, state, cwdQuery) {
      const query = `name=${encodeURIComponent(server.name)}&scope=${server.scope}${cwdQuery}`;
      const className = floatActionClass(server);
      if (server.status === "connected" || server.status === "connecting" || server.status === "reconnecting") {
        return {
          className,
          label: t("disconnect"),
          url: `${state.API.disconnect}?${query}`,
          method: "POST",
          tag: "disconnect"
        };
      }
      if (server.status === "disabled") {
        return {
          className,
          label: t("enable"),
          url: `${state.API.servers}?${query}`,
          method: "PATCH",
          tag: "enable",
          body: JSON.stringify({ enabled: true })
        };
      }
      return {
        className,
        label: t("connect"),
        url: `${state.API.connect}?${query}`,
        method: "POST",
        tag: "connect"
      };
    }
    function disableRowAction(server, state) {
      return {
        className: "dm-float-action",
        label: t("disable"),
        url: `${state.API.servers}?name=${encodeURIComponent(server.name)}&scope=${server.scope}${cwdQueryOf(state)}`,
        method: "PATCH",
        tag: "disable",
        body: JSON.stringify({ enabled: false })
      };
    }
    function rowRequestInit(action) {
      if (action.body === void 0) return { method: action.method };
      return {
        method: action.method,
        headers: { "content-type": "application/json" },
        body: action.body
      };
    }
    function rowActionButton(action, server, state, actions) {
      const button = el("button", { class: action.className });
      button.textContent = action.label;
      button.disabled = state.pending.has(serverKey(server));
      const generation = state.sessionGeneration;
      button.addEventListener("click", () => {
        const submit = () => {
          if (action.tag === "enable" || action.tag === "disable")
            assertActionSession(state, server.scope, generation);
          return api(action.url, rowRequestInit(action));
        };
        const request = submitConnection(
          server,
          state,
          actions,
          action.tag === "connect" || action.tag === "enable" ? "connect" : "disconnect",
          submit
        );
        void request.catch(
          (error) => window.alert(
            t("actionFail", { msg: error instanceof Error ? error.message : String(error) })
          )
        );
      });
      return button;
    }
    function renderFloatRow(server, state, actions, opts = { tools: true }) {
      const failed = isAttentionStatus(server);
      const pending = state.pending.get(serverKey(server))?.kind;
      const row = el("div", {
        class: `dm-float-row${failed ? " dm-float-row--fail" : ""}${opts.stagger !== void 0 ? " dm-stagger" : ""}`
      });
      if (opts.stagger !== void 0) {
        row.style.animationDelay = `${Math.min(opts.stagger, 5) * 30}ms`;
      }
      row.appendChild(el("span", { class: "dm-dot", style: `background:${statusDot(server.status)}` }));
      row.appendChild(el("span", { class: "dm-float-name", text: server.name, title: server.name }));
      const tools = Array.isArray(server.tools) ? server.tools.length : 0;
      row.appendChild(
        el("span", {
          class: "dm-float-meta",
          text: pangu(t("serverMeta", { status: pendingStatus(server, pending), tools }))
        })
      );
      const actionsEl = el("div", { class: "dm-float-actions" });
      actionsEl.appendChild(
        rowActionButton(primaryRowAction(server, state, cwdQueryOf(state)), server, state, actions)
      );
      if (server.status !== "disabled") {
        actionsEl.appendChild(rowActionButton(disableRowAction(server, state), server, state, actions));
      }
      row.appendChild(actionsEl);
      appendServerError(row, server);
      if (opts.tools)
        row.appendChild(renderFloatTools(server, state, actions, opts.openTools ?? /* @__PURE__ */ new Set()));
      return row;
    }
    function appendServerError(row, server) {
      if (server.error) row.appendChild(el("div", { class: "dm-err", text: server.error }));
    }
    function pendingStatus(server, pending) {
      return pending === void 0 ? tStatus(server.status) : t(pending === "connect" ? "stConnecting" : "stDisconnecting");
    }
    function isAttentionStatus(server) {
      return server.status === "failed" || server.status === "reconnecting";
    }
    function renderFloatHealth(state) {
      const connected = state.counts.connected ?? 0;
      const connecting = (state.counts.connecting ?? 0) + (state.counts.reconnecting ?? 0);
      const failed = state.counts.failed ?? 0;
      const stopped = state.counts.stopped ?? 0;
      const parts = [];
      parts.push(
        el("span", { class: "dm-health-ok", text: pangu(t("healthRunning", { n: connected })) })
      );
      if (connecting > 0)
        parts.push(document.createTextNode(pangu(t("healthConnecting", { n: connecting }))));
      if (stopped > 0) parts.push(document.createTextNode(pangu(t("healthStopped", { n: stopped }))));
      if (failed > 0)
        parts.push(
          el("span", { class: "dm-health-bad", text: pangu(t("healthFailed", { n: failed })) })
        );
      const line = el("div", { class: "dm-float-health" });
      parts.forEach((part, index) => {
        if (index > 0) line.appendChild(document.createTextNode(" · "));
        line.appendChild(part);
      });
      return line;
    }
    function bucketServersByStatus(list) {
      const byStatus = /* @__PURE__ */ new Map();
      for (const group of STATUS_ORDER) byStatus.set(group.key, []);
      for (const server of list) {
        const bucket = byStatus.get(server.status) ?? byStatus.get("stopped");
        if (bucket !== void 0) bucket.push(server);
      }
      return byStatus;
    }
    function nextStagger(staggerBase, animate) {
      if (!animate) return void 0;
      const current = staggerBase.n;
      staggerBase.n += 1;
      return current;
    }
    function appendScopeGroup(panel, scope, list, state, actions, openTools, staggerBase, animateRows, titleOverride, alert) {
      if (list.length === 0) return;
      const section = el("section", { class: "dm-float-group" });
      section.appendChild(
        el("div", {
          class: `dm-float-group-title${alert === true ? " dm-float-group-title--alert" : ""}`,
          text: titleOverride ?? (scope === "project" ? t("groupProject") : t("groupGlobal"))
        })
      );
      const byStatus = bucketServersByStatus(list);
      for (const group of STATUS_ORDER) {
        const bucket = byStatus.get(group.key) ?? [];
        if (bucket.length === 0) continue;
        const ordered = [...bucket].sort(
          (a, b) => a.name.localeCompare(b.name)
        );
        for (const server of ordered) {
          section.appendChild(
            renderFloatRow(server, state, actions, {
              tools: true,
              openTools,
              stagger: nextStagger(staggerBase, animateRows)
            })
          );
        }
      }
      panel.appendChild(section);
    }
    function floatProjectName(state) {
      const root = state.projectRoot;
      if (typeof root !== "string" || root === "") return t("floatGlobalSession");
      return root.split(/[\\/]/).filter(Boolean).pop() ?? root;
    }
    function openMainPanel(state, actions) {
      toggleFloat(state, actions, false);
      actions.showPanel();
    }
    function renderFloatEmpty(state, actions) {
      const empty = el("div", { class: "dm-status" });
      empty.appendChild(el("div", { text: t("floatEmptyTitle") }));
      empty.appendChild(
        el("button", {
          class: "dm-float-action dm-primary",
          text: t("floatEmptyCta"),
          style: "margin-top:12px",
          onclick: () => openMainPanel(state, actions)
        })
      );
      return empty;
    }
    function needsAttention2(server) {
      return server.status === "failed" || server.status === "reconnecting";
    }
    function renderFloatPanel(state, actions) {
      if (state.floatPanel === void 0) return;
      const openTools = /* @__PURE__ */ new Set();
      for (const d of state.floatPanel.querySelectorAll("details.dm-float-tools")) {
        if (d.open && d.dataset.dmServer !== void 0) openTools.add(d.dataset.dmServer);
      }
      state.floatPanel.textContent = "";
      const head = el("div", { class: "dm-float-head" });
      const headText = el("div", { class: "dm-float-head-text" });
      headText.appendChild(el("div", { class: "dm-float-title", text: floatProjectName(state) }));
      headText.appendChild(renderFloatHealth(state));
      if (state.refreshError !== void 0) {
        headText.appendChild(
          el("div", { class: "dm-err", text: t("loadFail", { msg: state.refreshError }) })
        );
      }
      head.appendChild(headText);
      head.appendChild(
        el("button", { text: t("floatManage"), onclick: () => openMainPanel(state, actions) })
      );
      state.floatPanel.appendChild(head);
      if (state.servers.length === 0) {
        state.floatPanel.appendChild(renderFloatEmpty(state, actions));
        if (state.floatOpen) placePanel(state);
        return;
      }
      const animateRows = state.floatPanel.dataset.dmStagger === "1";
      const staggerBase = { n: 0 };
      const attention = state.servers.filter(needsAttention2);
      const rest = state.servers.filter((server) => !needsAttention2(server));
      appendScopeGroup(
        state.floatPanel,
        "attention",
        attention,
        state,
        actions,
        openTools,
        staggerBase,
        animateRows,
        t("groupAttention", { n: attention.length }),
        true
      );
      for (const scope of ["project", "global"]) {
        appendScopeGroup(
          state.floatPanel,
          scope,
          rest.filter((server) => server.scope === scope),
          state,
          actions,
          openTools,
          staggerBase,
          animateRows
        );
      }
      delete state.floatPanel.dataset.dmStagger;
      if (state.floatOpen) placePanel(state);
    }
    function toggleFloat(state, actions, force) {
      if (state.floatPanel === void 0) return;
      const next = force !== void 0 ? force : !state.floatOpen;
      state.floatOpen = next;
      const panel = state.floatPanel;
      const pill = state.floatPill;
      if (next) {
        panel.dataset.dmStagger = "1";
        panel.hidden = false;
        panel.classList.remove("dm-float-panel--closing", "dm-float-panel--open");
        renderFloatPanel(state, actions);
        placePanel(state);
        const armOpen = () => {
          if (!state.floatOpen) return;
          replayAnim(panel);
          panel.classList.add("dm-float-panel--open");
          pill?.classList.add("dm-float--open");
        };
        if (typeof requestAnimationFrame === "function") requestAnimationFrame(armOpen);
        else armOpen();
        panel.focus({ preventScroll: true });
        return;
      }
      pill?.classList.remove("dm-float--open");
      panel.classList.remove("dm-float-panel--open");
      const finish = () => {
        if (state.floatOpen) return;
        panel.classList.remove("dm-float-panel--closing");
        panel.hidden = true;
      };
      if (typeof requestAnimationFrame === "function") {
        replayAnim(panel);
        panel.classList.add("dm-float-panel--closing");
        window.setTimeout(finish, 300);
      } else {
        finish();
      }
    }
    function anchorsLeft(position) {
      return position === "top-left" || position === "bottom-left";
    }
    function transformOriginFor(isLeft, anchorBottom) {
      if (anchorBottom) return isLeft ? "bottom left" : "bottom right";
      return isLeft ? "top left" : "top right";
    }
    function placePanel(state) {
      if (state.floatPill === void 0 || state.floatPanel === void 0) return;
      const pillRect = state.floatPill.getBoundingClientRect();
      if (pillRect.width === 0 && pillRect.height === 0) return;
      const panel = state.floatPanel;
      const position = state.mcpUiConfig?.position;
      const anchorBottom = panelAnchorForPosition(position) === "bottom";
      const isLeft = anchorsLeft(position);
      const gap = 6;
      const rawTop = anchorBottom ? Math.max(6, pillRect.top - panel.offsetHeight - gap) : Math.max(6, pillRect.bottom + gap);
      const rawLeft = isLeft ? Math.max(10, Math.round(pillRect.left)) : Math.max(10, Math.round(pillRect.right - panel.offsetWidth));
      const point = clampPointToViewport(
        rawLeft,
        rawTop,
        panel.offsetWidth,
        panel.offsetHeight,
        window.innerWidth,
        window.innerHeight
      );
      panel.style.left = `${Math.round(point.x)}px`;
      panel.style.top = `${Math.round(point.y)}px`;
      panel.style.right = "auto";
      panel.style.transformOrigin = transformOriginFor(isLeft, anchorBottom);
    }
    function conversationHost() {
      return document.querySelector("[data-conversation-scroll]") ?? document.querySelector('[data-pane="conversation"]') ?? document.querySelector(".pI_x6G_centerCol") ?? document.body;
    }
    function panelHost() {
      return document.querySelector("[data-shell-overlay]") ?? document.body;
    }
    function isBlankSession(ctx) {
      const read = readCurrentSession(ctx?.sessions?.list);
      return read.kind === "session" && read.blank;
    }
    function floatTopOffset(ctx, state) {
      const cfg = state.mcpUiConfig || {};
      const y = typeof cfg.offsetY === "number" ? cfg.offsetY : 8;
      const blankY = typeof cfg.blankY === "number" ? cfg.blankY : y;
      return isBlankSession(ctx) ? blankY : y;
    }
    function floatPositionOf(cfg) {
      const position = cfg.position;
      if (position === "top-left" || position === "bottom-right" || position === "bottom-left")
        return position;
      return "top-right";
    }
    function pillAnchors(cfg, ctx, state) {
      const position = floatPositionOf(cfg);
      return {
        isLeft: anchorsLeft(position),
        isBottom: panelAnchorForPosition(position) === "bottom",
        offsetX: typeof cfg.offsetX === "number" ? cfg.offsetX : 8,
        offsetY: floatTopOffset(ctx, state)
      };
    }
    function usesComposerSeat(isBottom, bp) {
      return isBottom && bp !== "wide";
    }
    function dockedBottomEdge(containerRect) {
      const seat = document.querySelector("[data-composer-seat]");
      const seatRect = seat !== null ? seat.getBoundingClientRect() : null;
      return bottomAnchorEdge(
        containerRect.bottom,
        seatRect?.top ?? null,
        composerDockedAtBottom(seatRect, containerRect)
      );
    }
    function pillPlacement(input) {
      const rawLeft = input.isLeft ? input.rect.left + input.offsetX : input.rect.right - input.width - input.offsetX;
      const rawTop = input.isBottom ? Math.max(6, input.bottomEdge - input.height - input.offsetY) : input.rect.top + input.offsetY;
      return clampPointToViewport(
        rawLeft,
        rawTop,
        input.width,
        input.height,
        input.viewportW,
        input.viewportH
      );
    }
    function mountFloat(ctx, state, actions) {
      const pill = el("button", {
        type: "button",
        class: "dm-float",
        "aria-label": t("floatAriaLabel"),
        title: t("floatTitle")
      });
      pill.dataset.dshMcpFloat = "";
      pill.addEventListener("click", () => toggleFloat(state, actions));
      const panel = el("div", { class: "dm-float-panel", role: "dialog" });
      panel.hidden = true;
      panel.tabIndex = -1;
      state.floatPill = pill;
      state.floatPanel = panel;
      const panelRoot = panelHost();
      if (panel.parentElement !== panelRoot) panelRoot.appendChild(panel);
      const onFocusOut = (event) => {
        if (!state.floatOpen) return;
        const next = event.relatedTarget;
        if (next !== null && (state.floatPanel?.contains(next) || state.floatPill?.contains(next)))
          return;
        toggleFloat(state, actions, false);
      };
      document.addEventListener("focusout", onFocusOut);
      const onKeyDown = (event) => {
        if (event.defaultPrevented) return;
        if (event.key === "Escape" && state.floatOpen) toggleFloat(state, actions, false);
      };
      document.addEventListener("keydown", onKeyDown);
      let host;
      const updateFloat = () => {
        const best = conversationHost();
        if (best === null || best === void 0) return;
        const rect = best.getBoundingClientRect();
        const cfg = state.mcpUiConfig || {};
        const bp = breakpointForWidth(rect.width);
        if (pill.dataset.dmBp !== bp) pill.dataset.dmBp = bp;
        if (panel.dataset.dmBp !== bp) panel.dataset.dmBp = bp;
        const zBase = clampZIndexBase(cfg.zIndexBase, DEFAULT_Z_INDEX_BASE);
        pill.style.zIndex = String(zBase);
        panel.style.zIndex = String(zBase);
        const anchors = pillAnchors(cfg, ctx, state);
        pill.style.position = "fixed";
        const bottomEdge = usesComposerSeat(anchors.isBottom, bp) ? dockedBottomEdge(rect) : rect.bottom;
        const point = pillPlacement({
          rect,
          width: pill.offsetWidth,
          height: pill.offsetHeight,
          ...anchors,
          bottomEdge,
          viewportW: window.innerWidth,
          viewportH: window.innerHeight
        });
        pill.style.left = `${Math.round(point.x)}px`;
        pill.style.top = `${Math.round(point.y)}px`;
        pill.style.right = "auto";
        if (state.floatOpen) placePanel(state);
      };
      state.updateFloatState = updateFloat;
      const listeners = [];
      let rafId = 0;
      const scheduleUpdate = () => {
        if (rafId !== 0) return;
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          updateFloat();
        });
      };
      const onOrientationChange = () => {
        scheduleUpdate();
      };
      const onVisualViewportResize = () => {
        scheduleUpdate();
      };
      const attachListeners = (target) => {
        for (const detach of listeners.splice(0)) detach();
        target.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);
        window.addEventListener("orientationchange", onOrientationChange);
        window.visualViewport?.addEventListener("resize", onVisualViewportResize);
        listeners.push(() => {
          target.removeEventListener("scroll", scheduleUpdate);
          window.removeEventListener("resize", scheduleUpdate);
          window.removeEventListener("orientationchange", onOrientationChange);
          window.visualViewport?.removeEventListener("resize", onVisualViewportResize);
        });
        updateFloat();
      };
      const place = () => {
        const best = conversationHost();
        if (best === null || best === void 0) return false;
        if (host !== best || pill.parentElement !== best) {
          host = best;
          if (pill.parentElement !== null) pill.remove();
          best.appendChild(pill);
          attachListeners(best);
        }
        return true;
      };
      let observerRafId = 0;
      const schedulePlace = () => {
        if (observerRafId !== 0) return;
        observerRafId = requestAnimationFrame(() => {
          observerRafId = 0;
          place();
        });
      };
      const observer = new MutationObserver(schedulePlace);
      if (place()) {
        observer.observe(document.body, { childList: true, subtree: true });
      } else {
        const wait = new MutationObserver(() => {
          if (place()) {
            wait.disconnect();
            observer.observe(document.body, { childList: true, subtree: true });
          }
        });
        wait.observe(document.body, { childList: true, subtree: true });
      }
      renderPill(state);
      return () => {
        state.updateFloatState = void 0;
        document.removeEventListener("focusout", onFocusOut);
        document.removeEventListener("keydown", onKeyDown);
        observer.disconnect();
        for (const detach of listeners.splice(0)) detach();
        if (rafId !== 0) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
        if (observerRafId !== 0) {
          cancelAnimationFrame(observerRafId);
          observerRafId = 0;
        }
        pill.remove();
        panel.remove();
        state.floatPill = void 0;
        state.floatPanel = void 0;
        state.floatOpen = false;
      };
    }

    // src/client/float/panel.ts
    var inflight = /* @__PURE__ */ new WeakMap();
    var keydownCleanups = /* @__PURE__ */ new WeakMap();
    function refresh(state, actions, fresh = false) {
      const current = inflight.get(state);
      const generation = state.sessionGeneration ?? 0;
      if (current !== void 0 && current.generation === generation) {
        if (fresh) return current.promise.then(() => refresh(state, actions));
        return current.promise;
      }
      const request = { generation, promise: Promise.resolve(false) };
      request.promise = doRefresh(state, actions, generation).finally(() => {
        if (inflight.get(state) === request) inflight.delete(state);
      });
      inflight.set(state, request);
      return request.promise;
    }
    function countsSummaryText(state) {
      const parts = [];
      const { connected = 0, connecting = 0, reconnecting = 0, failed = 0 } = state.counts;
      if (connected > 0) parts.push(t("countsConnected", { n: connected }));
      if (connecting > 0 || reconnecting > 0)
        parts.push(t("countsConnecting", { n: connecting + reconnecting }));
      if (failed > 0) parts.push(t("countsFailed", { n: failed }));
      return parts.length > 0 ? t("countsSummary", { n: state.servers.length, parts: parts.join(" · ") }) : t("countsSummaryOnly", { n: state.servers.length });
    }
    function renderCountsBadge(state) {
      const countsEl = document.querySelector(".dm-counts");
      if (countsEl === null) return;
      const summary = countsSummaryText(state);
      const failed = state.counts.failed ?? 0;
      if (failed > 0 && typeof summary === "string") {
        const failedText = t("countsFailed", { n: failed });
        countsEl.textContent = "";
        summary.split(failedText).forEach((chunk, index) => {
          if (index > 0) {
            countsEl.appendChild(el("span", { class: "dm-health-bad", text: failedText }));
          }
          if (chunk !== "") countsEl.appendChild(document.createTextNode(chunk));
        });
        return;
      }
      countsEl.textContent = summary;
    }
    async function doRefresh(state, actions, generation) {
      const url = serversUrlOf(state);
      if (url === void 0) return false;
      try {
        const payload = await api(url);
        if ((state.sessionGeneration ?? 0) !== generation) return false;
        state.servers = payload.servers ?? [];
        state.counts = payload.counts ?? {};
        state.projectRoot = payload.projectRoot;
        state.refreshError = void 0;
        renderState(state, actions);
        return true;
      } catch (error) {
        if ((state.sessionGeneration ?? 0) !== generation) return false;
        state.refreshError = error instanceof Error ? error.message : String(error);
        renderState(state, actions);
        return false;
      }
    }
    function renderState(state, actions) {
      renderPill(state);
      if (state.floatOpen) renderFloatPanel(state, actions);
      renderCountsBadge(state);
      if (state.bodyEl !== void 0 && state.activeTab === "servers") {
        if (state.refreshError === void 0) renderServers(state, actions);
        else {
          state.bodyEl.textContent = "";
          state.bodyEl.appendChild(
            el("div", { class: "dm-status", text: t("loadFail", { msg: state.refreshError }) })
          );
        }
      }
    }
    function switchTab(state, actions, tab) {
      state.activeTab = tab;
      for (const tabEl of document.querySelectorAll(".dm-tab")) {
        tabEl.dataset.active = tabEl.dataset.tab === tab ? "true" : "";
      }
      if (state.bodyEl === void 0) return;
      state.bodyEl.textContent = "";
      if (tab === "servers") {
        if (state.servers.length === 0) void refresh(state, actions);
        else renderServers(state, actions);
      } else {
        const page = buildQuickAdd(state, actions);
        state.bodyEl.appendChild(page);
      }
    }
    function close(state) {
      if (state.overlay === void 0) return;
      state.open = false;
      if (state.card !== void 0) state.card.removeAttribute("aria-modal");
      const opener = state.panelOpener;
      state.panelOpener = void 0;
      if (opener !== void 0 && opener !== null && typeof opener.focus === "function") {
        try {
          if (typeof opener.isConnected !== "boolean" || opener.isConnected) {
            opener.focus({ preventScroll: true });
          }
        } catch {
          console.warn("[dsh-mcp-manager] panel opener focus restore skipped");
        }
      }
      const overlay = state.overlay;
      overlay.classList.remove("dm-overlay--open");
      const finish = () => {
        if (state.open) return;
        overlay.classList.remove("dm-overlay--closing");
        overlay.hidden = true;
      };
      if (typeof requestAnimationFrame === "function") {
        overlay.style.animation = "none";
        void overlay.offsetWidth;
        overlay.style.animation = "";
        overlay.classList.add("dm-overlay--closing");
        window.setTimeout(finish, 300);
      } else {
        finish();
      }
    }
    function showPanel(state, actions) {
      if (state.overlay === void 0) {
        state.overlay = el("div", { class: "dm-overlay", hidden: true });
        state.overlay.addEventListener("click", (event) => {
          if (event.target === state.overlay) close(state);
        });
        state.card = el("div", { class: "dm-card" });
        const head = el("div", { class: "dm-head" });
        head.appendChild(el("h2", { text: t("panelTitle") }));
        head.appendChild(el("span", { class: "dm-counts", text: "" }));
        head.appendChild(
          el("button", { text: t("refresh"), onclick: () => void refresh(state, actions) })
        );
        void refresh(state, actions);
        head.appendChild(el("button", { text: t("close"), onclick: () => close(state) }));
        state.card.appendChild(head);
        state.card.setAttribute("role", "dialog");
        state.card.setAttribute("aria-label", t("panelTitle"));
        const tabs = el("div", { class: "dm-tabs" });
        tabs.appendChild(
          el("button", {
            class: "dm-tab",
            dataset: { tab: "servers" },
            text: t("tabServers"),
            onclick: () => switchTab(state, actions, "servers")
          })
        );
        tabs.appendChild(
          el("button", {
            class: "dm-tab",
            dataset: { tab: "quick" },
            text: t("tabQuickAdd"),
            onclick: () => switchTab(state, actions, "quick")
          })
        );
        state.card.appendChild(tabs);
        state.bodyEl = el("div", { class: "dm-body" });
        state.card.appendChild(state.bodyEl);
        state.overlay.appendChild(state.card);
        document.body.appendChild(state.overlay);
        const onKeyDown = (event) => {
          if (event.defaultPrevented) return;
          if (event.key === "Escape" && state.open) close(state);
        };
        document.addEventListener("keydown", onKeyDown);
        keydownCleanups.set(state, () => document.removeEventListener("keydown", onKeyDown));
      }
      if (!state.open) {
        state.panelOpener = typeof document !== "undefined" && document.activeElement instanceof HTMLElement ? document.activeElement : void 0;
      }
      state.open = true;
      if (state.card !== void 0) state.card.setAttribute("aria-modal", "true");
      state.overlay.hidden = false;
      state.overlay.classList.remove("dm-overlay--closing");
      const armOpen = () => {
        if (!state.open || state.overlay === void 0) return;
        state.overlay.style.animation = "none";
        void state.overlay.offsetWidth;
        state.overlay.style.animation = "";
        state.overlay.classList.add("dm-overlay--open");
      };
      if (typeof requestAnimationFrame === "function") requestAnimationFrame(armOpen);
      else armOpen();
      void refresh(state, actions);
      switchTab(state, actions, "servers");
    }
    function disposePanel(state) {
      const cleanup = keydownCleanups.get(state);
      if (cleanup !== void 0) {
        cleanup();
        keydownCleanups.delete(state);
      }
    }

    // src/client/core/session.ts
    function rebindSession(state) {
      if (!state.sessionResolved) return Promise.resolve(void 0);
      return api(state.API.session, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ cwd: typeof state.currentCwd === "string" ? state.currentCwd : "" })
      }).catch(() => {
      });
    }
    function warnUnknownOnce(state) {
      if (state.warnedUnknownSession) return;
      state.warnedUnknownSession = true;
      console.warn(
        "[dsh-mcp-manager] 读不到当前会话（官方 sessions.list 快照无 mainView 行）：项目级 MCP 暂不绑定。未知不等于无项目，故不向宿主发送清空。"
      );
    }
    function clearPending(state, actions) {
      state.sessionGeneration = (state.sessionGeneration ?? 0) + 1;
      state.pending?.clear();
      state.servers = [];
      state.counts = {};
      state.projectRoot = void 0;
      state.refreshError = void 0;
      actions.render?.();
    }
    function bindSession(ctx, state, actions) {
      const list = ctx.sessions?.list;
      if (list === void 0) return () => {
      };
      const sync = () => {
        const read = readCurrentSession(list);
        const prevCwd = state.currentCwd;
        const prevResolved = state.sessionResolved;
        if (read.kind === "unknown") {
          state.currentCwd = void 0;
          state.sessionResolved = false;
          if (prevResolved) clearPending(state, actions);
          state.unknownSessionFrames += 1;
          state.updateFloatState?.();
          if (prevResolved || state.unknownSessionFrames >= 2) warnUnknownOnce(state);
          return;
        }
        state.currentCwd = read.cwd;
        state.sessionResolved = true;
        state.unknownSessionFrames = 0;
        state.warnedUnknownSession = false;
        state.updateFloatState?.();
        if (prevResolved && read.cwd === prevCwd) return;
        clearPending(state, actions);
        const generation = state.sessionGeneration;
        void api(state.API.session, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ cwd: typeof read.cwd === "string" ? read.cwd : "" })
        }).then(() => {
          if (state.sessionGeneration === generation) return actions.refresh();
        }).catch(() => {
        });
      };
      sync();
      if (typeof list.subscribe === "function") return list.subscribe(sync);
      return () => {
      };
    }

    // src/client/settings/settings-card.tsx
    var React2 = __toESM(require("react"), 1);

    // ../../shared/client/ui/index.js
    var React = __toESM(require("react"), 1);
    function Button(props) {
      const size = props.size ?? "md";
      const { size: _size, className, type, ...rest } = props;
      const cls = `dsu-btn dsu-btn-${size}${className ? ` ${className}` : ""}`;
      return React.createElement("button", { type: type ?? "button", className: cls, "data-dsu-btn": size, ...rest });
    }

    // src/client/settings/settings-card.tsx
    function SettingsCard(props) {
      if (props.view === "summary") return null;
      return /* @__PURE__ */ React2.createElement(SettingsPage, null);
    }
    function SettingsPage() {
      const useState2 = React2.useState;
      const useEffect2 = React2.useEffect;
      const [cfg, setCfg] = useState2(null);
      const [saving, setSaving] = useState2(false);
      const [msg, setMsg] = useState2(null);
      const msgTimer = React2.useRef(void 0);
      useEffect2(() => {
        let live = true;
        api(API.config).then((c) => {
          if (live && c !== null && typeof c === "object") {
            setCfg(c);
          }
        }).catch(() => {
        });
        return () => {
          live = false;
          if (msgTimer.current !== void 0) {
            clearTimeout(msgTimer.current);
            msgTimer.current = void 0;
          }
        };
      }, []);
      if (cfg === null) {
        return /* @__PURE__ */ React2.createElement("div", { className: "dm-set-card" }, /* @__PURE__ */ React2.createElement("div", { className: "dm-set-body" }, t("settingsLoading")));
      }
      const set = (patch) => {
        setCfg((c) => c !== null ? Object.assign({}, c, patch) : c);
      };
      const numInput = (key, label, min = 0, max = 2e3) => /* @__PURE__ */ React2.createElement("label", { className: "dm-set-field" }, label, /* @__PURE__ */ React2.createElement(
        "input",
        {
          className: "dm-set-input",
          type: "number",
          min,
          max,
          value: String(cfg[key]),
          onChange: (e) => {
            const v = Number(e.target.value);
            set({
              [key]: Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : min
            });
          }
        }
      ));
      const save = async () => {
        setSaving(true);
        setMsg(null);
        try {
          const payload = { ...cfg };
          await api(API.config, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload)
          });
          setMsg({ ok: true, text: t("settingsSavedOk") });
          if (msgTimer.current !== void 0) clearTimeout(msgTimer.current);
          msgTimer.current = setTimeout(() => {
            msgTimer.current = void 0;
            setMsg(null);
          }, 2400);
        } catch (e) {
          setMsg({
            ok: false,
            text: t("saveFail", { msg: e instanceof Error ? e.message : String(e) })
          });
        }
        setSaving(false);
      };
      return /* @__PURE__ */ React2.createElement("div", { className: "dm-set-card" }, /* @__PURE__ */ React2.createElement("div", { className: "dm-set-body" }, /* @__PURE__ */ React2.createElement("div", { className: "dm-set-row" }, /* @__PURE__ */ React2.createElement("label", { htmlFor: "dm-set-position" }, t("anchorLabel")), /* @__PURE__ */ React2.createElement(
        "select",
        {
          id: "dm-set-position",
          className: "dm-set-input",
          value: cfg.position,
          onChange: (e) => {
            set({ position: e.target.value });
          }
        },
        /* @__PURE__ */ React2.createElement("option", { value: "top-right" }, t("posTopRight")),
        /* @__PURE__ */ React2.createElement("option", { value: "top-left" }, t("posTopLeft")),
        /* @__PURE__ */ React2.createElement("option", { value: "bottom-right" }, t("posBottomRight")),
        /* @__PURE__ */ React2.createElement("option", { value: "bottom-left" }, t("posBottomLeft"))
      )), /* @__PURE__ */ React2.createElement("div", { className: "dm-set-row" }, numInput("offsetX", t("offsetX")), numInput("offsetY", t("offsetY")), numInput("blankY", t("blankY")), numInput("zIndexBase", t("zIndexBase"), 1, 9e3)), /* @__PURE__ */ React2.createElement("div", { className: "dm-set-hint" }, t("settingsHint")), /* @__PURE__ */ React2.createElement("div", { className: "dm-set-foot" }, msg !== null ? /* @__PURE__ */ React2.createElement("span", { className: msg.ok ? "dm-set-saved" : "dm-set-error" }, msg.text) : null, /* @__PURE__ */ React2.createElement(
        Button,
        {
          className: "dm-set-save",
          disabled: saving,
          onClick: () => {
            void save();
          }
        },
        saving ? t("savingNow") : t("save")
      ))));
    }

    // src/client/locales.ts
    var zh = {
      // 状态（constants.ts 状态表共用）
      stConnected: "运行中",
      stConnecting: "连接中",
      stDisconnecting: "断开中",
      sessionUnavailable: "当前项目会话已变化或不可用，请刷新后重试",
      stReconnecting: "重连中",
      stStopped: "未连接",
      stDisabled: "已停用",
      stFailed: "失败",
      // 通用操作
      connect: "连接",
      disconnect: "断开",
      reconnect: "重连",
      enable: "启用",
      enableAndConnect: "启用并连接",
      disable: "禁用",
      edit: "编辑",
      delete: "删除",
      save: "保存",
      cancel: "取消",
      refresh: "刷新",
      close: "关闭",
      cancelEdit: "取消编辑",
      saveFail: "保存失败：{msg}",
      actionFail: "操作失败：{msg}",
      loadFail: "加载失败：{msg}",
      // 浮窗
      floatAriaLabel: "MCP 管理器",
      floatTitle: "MCP 管理器（点击展开）",
      floatManage: "管理",
      floatGlobalSession: "全局会话",
      groupProject: "项目级",
      groupGlobal: "全局",
      badgeScopeProject: "项目",
      badgeScopeGlobal: "全局",
      serverMeta: "{status} · {tools} 工具",
      toolsCount: "工具（{n}）",
      toolsCountPlain: "{n} 工具",
      statusGroupCount: "{status}（{n}）",
      groupAttention: "需关注（{n}）",
      healthRunning: "运行中 {n}",
      healthConnecting: "连接中 {n}",
      healthStopped: "未连接 {n}",
      healthFailed: "失败 {n}",
      floatEmptyTitle: "还没有 MCP 服务器",
      floatEmptyCta: "去添加",
      // 模态面板
      panelTitle: "MCP 管理器",
      tabServers: "服务器",
      tabQuickAdd: "快速接入",
      countsConnected: "运行中 {n}",
      countsConnecting: "连接中 {n}",
      countsFailed: "失败 {n}",
      countsSummary: "共 {n} 台 · {parts}",
      countsSummaryOnly: "共 {n} 台",
      // 快速接入表单
      addServer: "添加服务器",
      editServer: "编辑服务器：{name}",
      nameLabel: "服务器名称（唯一，作为 mcp__<name>__ 前缀）",
      ownershipLabel: "归属",
      transportLabel: "传输类型",
      commandLabel: "命令（stdio）",
      argsLabel: "参数（逗号分隔）",
      envLabel: "环境变量（每行 KEY=VALUE，支持 ${ENV} 引用，值为空则继承父环境）",
      cwdLabel: "工作目录（可选）",
      urlLabel: "URL（streamable-http）",
      headersLabel: "请求头（每行 KEY: VALUE，支持 ${ENV} 引用）",
      enabledLabel: "启用（保存后立即连接）",
      scopeProjectOpt: "项目级（<项目>/.dsh/@wingsky-1/dsh-mcp-manager/mcp.json，随会话切换）",
      scopeGlobalOpt: "全局（本机配置）",
      transportStdioOpt: "stdio（本地子进程）",
      transportHttpOpt: "streamable-http（远程）",
      envPlaceholder: "每行 KEY=VALUE，如\nCONTEXT7_API_KEY=${CONTEXT7_API_KEY}",
      headersPlaceholder: "每行 KEY: VALUE，支持 ${ENV} 引用，如\nAuthorization: Bearer ${CONTEXT7_API_KEY}",
      cwdPlaceholder: "可选工作目录",
      pasteTitle: "粘贴 mcpServers JSON 导入",
      importJson: "导入 JSON",
      importedOk: "已导入：{names}",
      importedNone: "（无）",
      importSkipped: "跳过（已存在）：{names}",
      importFail: "导入失败：{msg}",
      // 服务器列表页
      serversEmpty: "还没有配置 MCP 服务器。切到「快速接入」页添加，或粘贴 mcpServers JSON 导入。",
      confirmDelete: "删除 MCP 服务器「{name}」？",
      // 设置卡
      settingsLoading: "MCP 管理器：加载中…",
      settingsName: "MCP 管理器（dsh-mcp-manager）",
      settingsDescription: "浮窗位置 / 水平·垂直·空白偏移",
      anchorLabel: "锚点",
      posTopRight: "右上（top-right）",
      posTopLeft: "左上（top-left）",
      posBottomRight: "右下（bottom-right）",
      posBottomLeft: "左下（bottom-left）",
      offsetX: "水平偏移",
      offsetY: "垂直偏移",
      blankY: "空白偏移",
      zIndexBase: "层级基准",
      settingsHint: "保存即热更新：浮窗位置与偏移即时生效并持久化（无需重启 dsh web）。",
      savingNow: "保存中…",
      settingsSavedOk: "已保存——浮窗位置即时生效（无需重启）"
    };
    var en = {
      stConnected: "Running",
      stConnecting: "Connecting",
      stDisconnecting: "Disconnecting",
      sessionUnavailable: "The current project session changed or is unavailable; refresh and try again",
      stReconnecting: "Reconnecting",
      stStopped: "Disconnected",
      stDisabled: "Disabled",
      stFailed: "Failed",
      connect: "Connect",
      disconnect: "Disconnect",
      reconnect: "Reconnect",
      enable: "Enable",
      enableAndConnect: "Enable & connect",
      disable: "Disable",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      refresh: "Refresh",
      close: "Close",
      cancelEdit: "Cancel edit",
      saveFail: "Save failed: {msg}",
      actionFail: "Operation failed: {msg}",
      loadFail: "Load failed: {msg}",
      floatAriaLabel: "MCP manager",
      floatTitle: "MCP manager (click to expand)",
      floatManage: "Manage",
      floatGlobalSession: "global session",
      groupProject: "Project",
      groupGlobal: "Global",
      badgeScopeProject: "Project",
      badgeScopeGlobal: "Global",
      serverMeta: "{status} · {tools} tools",
      toolsCount: "Tools ({n})",
      toolsCountPlain: "{n} tools",
      statusGroupCount: "{status} ({n})",
      groupAttention: "Needs attention ({n})",
      healthRunning: "{n} running",
      healthConnecting: "{n} connecting",
      healthStopped: "{n} disconnected",
      healthFailed: "{n} failed",
      floatEmptyTitle: "No MCP servers yet",
      floatEmptyCta: "Add one",
      panelTitle: "MCP manager",
      tabServers: "Servers",
      tabQuickAdd: "Quick add",
      countsConnected: "running {n}",
      countsConnecting: "connecting {n}",
      countsFailed: "failed {n}",
      countsSummary: "{n} total · {parts}",
      countsSummaryOnly: "{n} total",
      addServer: "Add server",
      editServer: "Edit server: {name}",
      nameLabel: "Server name (unique, used as the mcp__<name>__ prefix)",
      ownershipLabel: "Scope",
      transportLabel: "Transport",
      commandLabel: "Command (stdio)",
      argsLabel: "Args (comma-separated)",
      envLabel: "Env vars (KEY=VALUE per line, ${ENV} refs supported; empty value inherits the parent environment)",
      cwdLabel: "Working directory (optional)",
      urlLabel: "URL (streamable-http)",
      headersLabel: "Headers (KEY: VALUE per line, ${ENV} refs supported)",
      enabledLabel: "Enabled (connects immediately after saving)",
      scopeProjectOpt: "Project (<project>/.dsh/@wingsky-1/dsh-mcp-manager/mcp.json, follows the session)",
      scopeGlobalOpt: "Global (local machine config)",
      transportStdioOpt: "stdio (local subprocess)",
      transportHttpOpt: "streamable-http (remote)",
      envPlaceholder: "One KEY=VALUE per line, e.g.\nCONTEXT7_API_KEY=${CONTEXT7_API_KEY}",
      headersPlaceholder: "One KEY: VALUE per line, ${ENV} refs supported, e.g.\nAuthorization: Bearer ${CONTEXT7_API_KEY}",
      cwdPlaceholder: "Optional working directory",
      pasteTitle: "Paste mcpServers JSON to import",
      importJson: "Import JSON",
      importedOk: "Imported: {names}",
      importedNone: "(none)",
      importSkipped: "Skipped (already present): {names}",
      importFail: "Import failed: {msg}",
      serversEmpty: 'No MCP servers yet. Add one on the "Quick add" tab, or paste mcpServers JSON to import.',
      confirmDelete: 'Delete MCP server "{name}"?',
      settingsLoading: "MCP manager: loading…",
      settingsName: "MCP manager (dsh-mcp-manager)",
      settingsDescription: "Float placement / horizontal·vertical·gap offsets",
      anchorLabel: "Anchor",
      posTopRight: "Top right (top-right)",
      posTopLeft: "Top left (top-left)",
      posBottomRight: "Bottom right (bottom-right)",
      posBottomLeft: "Bottom left (bottom-left)",
      offsetX: "Horizontal offset",
      offsetY: "Vertical offset",
      blankY: "Blank-session offset",
      zIndexBase: "Z-index base",
      settingsHint: "Hot reload on save: float placement and offsets apply immediately and persist (no dsh web restart).",
      savingNow: "Saving…",
      settingsSavedOk: "Saved — float placement takes effect immediately (no restart)"
    };

    // src/client/index.ts
    var NS = "mcpManager";
    var ROW_CONFIG_SLOT = "plugins.row.config";
    function apply(ctx) {
      const state = createState();
      const actions = {
        refresh: (fresh) => refresh(state, actions, fresh),
        render: () => renderState(state, actions),
        switchTab: (tab) => switchTab(state, actions, tab),
        close: () => close(state),
        showPanel: () => showPanel(state, actions),
        toggleFloat: (force) => toggleFloat(state, actions, force),
        resetForm: () => resetForm(state),
        beginEdit: (server) => beginEdit(state, actions, server)
      };
      try {
        const locale = ctx.get("locale");
        let unsubLocale;
        if (locale && typeof locale.register === "function") {
          try {
            locale.register(NS, { zh, en });
            bindLocale(locale, NS);
            if (typeof locale.subscribe === "function" && typeof locale.getSnapshot === "function") {
              unsubLocale = locale.subscribe(function() {
                bindLocale(locale, NS);
              });
            }
          } catch (error) {
            console.warn("[dsh-mcp-manager] locale 注册失败：", error);
          }
        }
        ensureStyle({ id: "dsh-mcp-manager-style", cssText: ui_default + style_default });
        const disposers = [];
        const slots = ctx.get("slots");
        const configForms = ctx.get("configForms");
        if (slots !== void 0 && configForms !== void 0) {
          ctx.effect(
            () => configForms.whileServed(
              [MCP_MANAGER_IDENTITY.settingsNamespace],
              () => slots.inject(
                ROW_CONFIG_SLOT,
                () => slots.register(
                  {
                    name: ROW_CONFIG_SLOT,
                    key: MCP_MANAGER_IDENTITY.rowConfigKey,
                    locale: NS
                  },
                  (props) => React3.createElement(SettingsCard, props)
                )
              )
            ),
            "dsh-mcp-manager: row config page"
          );
        }
        disposers.push(mountFloat(ctx, state, actions));
        disposers.push(bindSession(ctx, state, actions));
        api(state.API.config).then((cfg) => {
          if (cfg !== null && typeof cfg === "object") state.mcpUiConfig = cfg;
          state.updateFloatState?.();
        }).catch(() => {
        });
        let retryTimer = void 0;
        const attemptRefresh = (attempt) => {
          refresh(state, actions).then((ok) => {
            if (!ok && attempt < 3) {
              retryTimer = setTimeout(() => attemptRefresh(attempt + 1), 500 * 2 ** attempt);
            }
          }).catch((error) => {
            console.warn("[dsh-mcp-manager] 首刷失败：", error);
          });
        };
        attemptRefresh(0);
        let es = void 0;
        let refreshTimer = void 0;
        let esFailures = 0;
        let pollTimer = void 0;
        const WATCHDOG_MS = 6e4;
        let lastActivity = 0;
        let lastReconnectAt = 0;
        let watchdog = void 0;
        let eventsRetired = false;
        const scheduleRefresh = () => {
          if (refreshTimer !== void 0) return;
          refreshTimer = setTimeout(() => {
            refreshTimer = void 0;
            void refresh(state, actions).catch(() => {
            });
          }, 500);
        };
        const startPolling = () => {
          eventsRetired = true;
          if (watchdog !== void 0) {
            clearTimeout(watchdog);
            watchdog = void 0;
          }
          if (pollTimer !== void 0) return;
          let pollTicks = 0;
          const tick = () => {
            pollTimer = setTimeout(() => {
              void refresh(state, actions).catch(() => {
              });
              pollTicks += 1;
              if (pollTicks % 5 === 0) tryResumeEvents();
              tick();
            }, 1e4);
          };
          tick();
        };
        const tryResumeEvents = () => {
          if (pollTimer !== void 0) {
            clearTimeout(pollTimer);
            pollTimer = void 0;
          }
          eventsRetired = false;
          esFailures = 0;
          connectEvents();
        };
        const closeEvents = () => {
          if (es === void 0) return;
          try {
            es.close();
          } catch (error) {
            console.warn("[dsh-mcp-manager] 关闭旧 SSE 连接失败：", error);
          }
          es = void 0;
        };
        const armWatchdog = () => {
          if (watchdog !== void 0) clearTimeout(watchdog);
          watchdog = setTimeout(() => {
            if (Date.now() - lastActivity > WATCHDOG_MS) {
              forceReconnect();
            } else {
              armWatchdog();
            }
          }, WATCHDOG_MS + 5e3);
        };
        let lastRecoverAt = 0;
        let lastResumeAt = 0;
        let lastResumeCwd = void 0;
        let resumeSeq = 0;
        let lastResumeSeq = 0;
        const postResume = () => {
          const body = resumeBodyOf(state);
          const key = body?.cwd ?? "<unknown>";
          const now = Date.now();
          if (key === lastResumeCwd && now - lastResumeAt < 5e3) return;
          resumeSeq += 1;
          const attempt = resumeSeq;
          lastResumeAt = now;
          lastResumeCwd = key;
          lastResumeSeq = attempt;
          const init = body === void 0 ? { method: "POST" } : {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body)
          };
          void api(state.API.resume, init).catch(() => {
            if (lastResumeSeq === attempt) {
              lastResumeAt = 0;
              lastResumeCwd = void 0;
            }
          });
        };
        const maybeRecoverSession = () => {
          const now = Date.now();
          if (now - lastRecoverAt < 1e4) return;
          const url = serversUrlOf(state);
          if (url === void 0) return;
          const generation = state.sessionGeneration;
          void api(url).then((payload) => {
            if (state.sessionGeneration !== generation) return;
            if (payload?.projectRoot !== void 0) return;
            const cwd = state.currentCwd;
            if (typeof cwd !== "string" || cwd === "") return;
            lastRecoverAt = Date.now();
            void rebindSession(state).then(() => postResume()).catch(() => {
            });
          }).catch(() => {
          });
        };
        const connectEvents = () => {
          closeEvents();
          try {
            es = new EventSource(state.API.events);
            lastActivity = Date.now();
            es.onopen = () => {
              maybeRecoverSession();
            };
            es.onmessage = (ev) => {
              lastActivity = Date.now();
              let msg;
              try {
                msg = JSON.parse(String(ev.data));
              } catch {
                msg = void 0;
              }
              if (msg?.type === SSE_FRAMES.ping) return;
              if (msg !== void 0 && msg.type === SSE_FRAMES.uiConfigChanged) {
                void api(state.API.config).then((cfg) => {
                  if (cfg !== null && typeof cfg === "object") {
                    state.mcpUiConfig = cfg;
                  }
                  state.updateFloatState?.();
                  if (state.floatOpen) renderFloatPanel(state, actions);
                }).catch(() => {
                });
              } else {
                scheduleRefresh();
              }
            };
            es.onerror = () => {
              if (es !== void 0 && es.readyState === EventSource.CLOSED) {
                esFailures += 1;
                if (esFailures >= 3) {
                  closeEvents();
                  startPolling();
                }
              }
            };
            armWatchdog();
          } catch {
            startPolling();
          }
        };
        const forceReconnect = () => {
          if (eventsRetired) return;
          const now = Date.now();
          if (now - lastReconnectAt < 5e3) return;
          lastReconnectAt = now;
          connectEvents();
        };
        connectEvents();
        const onVisible = () => {
          if (document.hidden) return;
          forceReconnect();
          void rebindSession(state).then(() => postResume()).catch(() => {
          });
          void refresh(state, actions).catch(() => {
          });
        };
        document.addEventListener("visibilitychange", onVisible);
        const onPageShow = (event) => {
          if (event?.persisted === true) onVisible();
        };
        window.addEventListener("pageshow", onPageShow);
        ctx.effect(
          () => () => {
            clearTimeout(retryTimer);
            if (refreshTimer !== void 0) clearTimeout(refreshTimer);
            if (pollTimer !== void 0) clearTimeout(pollTimer);
            if (watchdog !== void 0) clearTimeout(watchdog);
            closeEvents();
            document.removeEventListener("visibilitychange", onVisible);
            window.removeEventListener("pageshow", onPageShow);
            if (unsubLocale !== void 0) unsubLocale();
            for (const dispose of disposers.splice(0)) dispose();
            disposePanel(state);
            if (state.overlay !== void 0 && state.overlay.parentElement !== null)
              state.overlay.remove();
            const savedUiConfig = state.mcpUiConfig;
            Object.assign(state, createState());
            state.mcpUiConfig = savedUiConfig;
          },
          "dsh-mcp-manager: ui"
        );
      } catch (error) {
        console.warn("[dsh-mcp-manager] mount failed:", error);
      }
    }
    var inject = ["sessions", "slots", "configForms", "locale"];

    Object.defineProperty(module.exports, Symbol.toStringTag, { value: 'Module' })
    return module.exports
  }
})
