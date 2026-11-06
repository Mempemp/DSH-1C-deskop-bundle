"use strict";
// 契约外壳 (scripts/build-client.ts 生成): external 依赖 (React 等)经 factory 注入的 require 解析
window.__ModuleLoader__.load({
  id: "dsh-notifier-ru",
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

    // src/client/index.tsx
    var index_exports = {};
    __export(index_exports, {
      apply: () => apply,
      inject: () => inject
    });
    module.exports = __toCommonJS(index_exports);

    // src/client/style.css
    var style_default = '/* dsh-notifier — стили клиента (отдельный .css, карточка настроек).\n *\n * Сборщик build-client встраивает .css прямо в client.js при сборке. ensureStyle добавляет\n * <style id=dsh-notifier-style>. Префикс dn-; цвета через --dsw-alias-* с запасными светлыми значениями.\n *\n * Интерфейс v3 (направление C + стеклянная оболочка + плотные списки):\n * - сегментированные переключатели / нижняя панель несохранённого / наборы значков: сдержанная стеклянная отделка;\n * - у списков почти плотный фон и лёгкая подсветка при наведении: высокая плотность без слоёв матового стекла;\n * - на всех трёх страницах общий набор значков (dn-ico); цифры через tabular-nums;\n * - плавные переходы переключателей и меток; без вертикальной черты слева; смысловые цвета только точками и короткими статусами.\n *\n * Контрактные якоря сохранены: dn-set-tabs/dn-set-tabActive/dn-set-tabBadge, dn-ch-perm,\n * dn-set-historyTools/dn-set-allowDim/dn-set-allowActions.\n */\n\n/* ============ 设置卡壳 ============ */\n\n.dn-set-card {\n  list-style: none;\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  border-radius: 14px;\n  overflow: hidden;\n  font-size: 12px;\n  color: var(--dsw-alias-label-primary, #1f2329);\n  background: var(--dsw-alias-bg-base, #ffffff);\n  font-variant-numeric: tabular-nums;\n}\n.dn-set-card .dn-set-body {\n  padding: 0 0 4px;\n  background: var(--dsw-alias-bg-base, #ffffff);\n}\n.dn-set-card .dn-set-body > div {\n  padding-left: 14px;\n  padding-right: 14px;\n}\n.dn-set-card .dn-set-body > .dn-set-foot {\n  padding-left: 14px;\n  padding-right: 14px;\n}\n\n/* --- 分段控件 (壳层玻璃) --- */\n.dn-set-card .dn-set-tabs {\n  display: flex;\n  gap: 3px;\n  padding: 10px 12px;\n  border-bottom: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, 0.06));\n  background: var(--dsw-alias-bg-layer-1, rgba(245, 246, 248, 0.72));\n  backdrop-filter: blur(16px) saturate(1.15);\n  -webkit-backdrop-filter: blur(16px) saturate(1.15);\n}\n.dn-set-card .dn-set-tab {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  flex: 1;\n  min-height: 34px;\n  padding: 5px 10px;\n  border: 1px solid transparent;\n  border-radius: 9px;\n  background: transparent;\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  font-size: 12px;\n  cursor: pointer;\n  transition:\n    background 200ms cubic-bezier(0.25, 0.1, 0.25, 1),\n    color 200ms ease,\n    border-color 200ms ease,\n    box-shadow 200ms ease;\n}\n.dn-set-card .dn-set-tab .dn-ico {\n  width: 16px;\n  height: 16px;\n  border: none;\n  background: transparent;\n  box-shadow: none;\n  padding: 0;\n}\n.dn-set-card .dn-set-tab .dn-ico svg {\n  width: 14px;\n  height: 14px;\n}\n.dn-set-card .dn-set-tabActive {\n  background: var(--dsw-alias-bg-base, rgba(255, 255, 255, 0.88));\n  border-color: var(--dsw-alias-border-l1, rgba(0, 0, 0, 0.06));\n  color: var(--dsw-alias-label-primary, #1f2329);\n  font-weight: 650;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);\n}\n.dn-set-card .dn-set-tabBadge {\n  min-width: 17px;\n  padding: 0 5px;\n  border-radius: 9px;\n  background: var(--dsw-alias-bg-layer-2, rgba(0, 0, 0, 0.06));\n  color: var(--dsw-alias-label-primary, #1f2329);\n  font-size: 10px;\n  line-height: 17px;\n  text-align: center;\n  font-variant-numeric: tabular-nums;\n}\n\n/* --- 分区标题 --- */\n.dn-set-card .dn-sec {\n  margin: 12px 0 6px;\n  padding: 0 14px;\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.dn-set-card .dn-set-body > div > .dn-sec {\n  padding-left: 0;\n  padding-right: 0;\n}\n.dn-set-card .dn-sec-title {\n  font-weight: 650;\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  letter-spacing: 0.02em;\n}\n.dn-set-card .dn-sec-hint {\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n}\n\n/* --- icon 井 --- */\n.dn-ico {\n  width: 28px;\n  height: 28px;\n  border-radius: 8px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: none;\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  background: var(--dsw-alias-bg-layer-1, #f2f2ee);\n  border: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, 0.06));\n}\n.dn-ico svg {\n  width: 14px;\n  height: 14px;\n}\n.dn-ico.dn-sev-success {\n  color: var(--dsw-alias-state-success-primary, #3d7a4e);\n}\n.dn-ico.dn-sev-warning {\n  color: var(--dsw-alias-state-warning-primary, #8a7340);\n}\n.dn-ico.dn-sev-failure,\n.dn-ico.dn-sev-error {\n  color: var(--dsw-alias-state-error-primary, #8a4f45);\n}\n\n/* --- switch: 丝滑过渡 --- */\n.dn-switch {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 32px;\n  flex: none;\n  cursor: pointer;\n}\n.dn-switch input {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  opacity: 0;\n  cursor: pointer;\n}\n.dn-switch .dn-switch-track {\n  width: 40px;\n  height: 22px;\n  border-radius: 11px;\n  background: var(--dsw-alias-border-l2, #d3d8df);\n  transition: background 200ms cubic-bezier(0.25, 0.1, 0.25, 1);\n  flex: none;\n  position: relative;\n}\n.dn-switch .dn-switch-track::after {\n  content: "";\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: #fff;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  transition: transform 200ms cubic-bezier(0.25, 0.1, 0.25, 1);\n}\n.dn-switch input:checked + .dn-switch-track {\n  background: var(--dsw-alias-state-success-primary, #2f8f5f);\n}\n.dn-switch input:checked + .dn-switch-track::after {\n  transform: translateX(18px);\n}\n.dn-switch input:focus-visible + .dn-switch-track {\n  outline: 2px solid var(--dsw-alias-label-primary, #1f2329);\n  outline-offset: 2px;\n}\n\n/* --- 事件行 (连续列表, 近实底) --- */\n.dn-set-card .dn-evt {\n  border: none;\n  border-bottom: 1px solid var(--dsw-alias-bg-layer-2, rgba(0, 0, 0, 0.055));\n  border-radius: 0;\n  padding: 8px 14px;\n  margin: 0;\n  background: var(--dsw-alias-bg-base, #ffffff);\n  transition: background 160ms ease;\n}\n@media (hover: hover) {\n  .dn-set-card .dn-evt:hover {\n    background: var(--dsw-alias-bg-layer-1, #f7f7f5);\n  }\n}\n.dn-set-card .dn-evt-head {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n  min-height: 40px;\n}\n.dn-sev {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  flex: none;\n  background: var(--dsw-alias-border-l2, #c5c5c0);\n}\n.dn-set-card .dn-sev-success {\n  background: var(--dsw-alias-state-success-primary, #3d7a4e);\n}\n.dn-set-card .dn-sev-warning {\n  background: var(--dsw-alias-state-warning-primary, #8a7340);\n}\n.dn-set-card .dn-sev-failure {\n  background: var(--dsw-alias-state-error-primary, #8a4f45);\n}\n.dn-set-card .dn-evt-name {\n  font-weight: 500;\n  font-size: 13px;\n}\n.dn-set-card .dn-evt-kind {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n  font-size: 10px;\n  color: var(--dsw-alias-label-tertiary, rgba(0, 0, 0, 0.38));\n  font-variant-numeric: tabular-nums;\n  background: transparent;\n  border: none;\n  padding: 0;\n  line-height: 1.4;\n}\n.dn-set-card .dn-evt-head .dn-switch {\n  margin-left: auto;\n}\n\n/* 路由: 默认收成摘要, details 展开 chips (近实 chips, 无彩色玻璃) */\n.dn-set-card .dn-evt-routeDisc {\n  margin-top: 0;\n}\n.dn-set-card .dn-evt-routeSum {\n  list-style: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  min-height: 28px;\n  padding: 2px 0 2px 38px;\n  font-size: 12px;\n  color: var(--dsw-alias-label-tertiary, rgba(0, 0, 0, 0.48));\n  user-select: none;\n}\n.dn-set-card .dn-evt-routeSum::-webkit-details-marker {\n  display: none;\n}\n.dn-set-card .dn-evt-routeSum::after {\n  content: "";\n  width: 5px;\n  height: 5px;\n  border-right: 1.5px solid currentColor;\n  border-bottom: 1.5px solid currentColor;\n  transform: rotate(-45deg);\n  transition: transform 160ms ease;\n  flex: none;\n  opacity: 0.55;\n}\n.dn-set-card .dn-evt-routeDisc[open] > .dn-evt-routeSum::after {\n  transform: rotate(45deg);\n}\n@media (hover: hover) {\n  .dn-set-card .dn-evt-routeSum:hover {\n    color: var(--dsw-alias-label-primary, #1f2329);\n  }\n}\n.dn-set-card .dn-evt-routes {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin-top: 4px;\n  padding: 6px 0 4px 38px;\n  border-top: none;\n}\n.dn-set-card .dn-evt-routesCap {\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  flex: none;\n}\n.dn-set-card .dn-route-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  border: 1px solid var(--dsw-alias-border-l1, #ddd);\n  background: var(--dsw-alias-bg-base, #fff);\n  color: var(--dsw-alias-label-secondary, #555);\n  border-radius: 999px;\n  padding: 4px 10px;\n  min-height: 32px;\n  font-size: 11px;\n  cursor: pointer;\n  transition:\n    border-color 160ms ease,\n    background 160ms ease,\n    color 160ms ease;\n}\n.dn-set-card .dn-route-chip::before {\n  content: none;\n}\n.dn-set-card .dn-route-chip.is-on {\n  background: var(--dsw-alias-bg-layer-1, #f0f0ec);\n  border-color: var(--dsw-alias-label-primary, rgba(30, 30, 30, 0.28));\n  color: var(--dsw-alias-label-primary, #111);\n  font-weight: 600;\n}\n.dn-set-card .dn-route-chip.is-off,\n.dn-set-card .dn-route-chip.is-off.is-on {\n  opacity: 0.4;\n  border-style: dashed;\n  cursor: not-allowed;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  background: var(--dsw-alias-bg-layer-1, #f5f6f8);\n  border-color: var(--dsw-alias-border-l1, #e2e5ea);\n  font-weight: 400;\n}\n.dn-set-card .dn-route-chip:disabled {\n  pointer-events: none;\n}\n.dn-set-card .dn-route-chip.is-stale {\n  border-style: dashed;\n  opacity: 0.75;\n  text-decoration: line-through;\n}\n.dn-set-card .dn-route-state {\n  border: none;\n  background: none;\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  min-height: 32px;\n  padding: 0 4px;\n  cursor: default;\n  font-variant-numeric: tabular-nums;\n}\n.dn-set-card .dn-route-state.is-custom {\n  color: var(--dsw-alias-label-primary, #1f2329);\n  cursor: pointer;\n  text-decoration: underline dotted;\n  font-weight: 600;\n}\n@media (hover: hover) {\n  .dn-set-card .dn-route-state.is-custom:hover {\n    opacity: 0.85;\n  }\n}\n\n/* --- 动态 kind (无左侧色条, 用浅底 + 字重) --- */\n.dn-set-card .dn-kinds {\n  border: none;\n  border-bottom: 1px solid var(--dsw-alias-bg-layer-2, rgba(0, 0, 0, 0.055));\n  border-radius: 0;\n  padding: 8px 14px;\n  margin: 0;\n  background: var(--dsw-alias-bg-layer-1, #fafaf8);\n}\n.dn-set-card .dn-kinds-ok {\n  background: var(--dsw-alias-bg-base, #ffffff);\n  opacity: 0.92;\n}\n.dn-set-card .dn-kinds-head {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  min-height: 40px;\n}\n.dn-set-card .dn-kinds-name {\n  font-weight: 500;\n  font-size: 13px;\n}\n.dn-set-card .dn-kinds-actions {\n  margin-left: auto;\n  display: flex;\n  gap: 6px;\n}\n.dn-set-card .dn-kind-routeHint {\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  line-height: 1.6;\n  margin-top: 2px;\n  padding-left: 38px;\n}\n\n/* --- 按钮 --- */\n.dn-set-card .dn-set-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n  border: 1px solid var(--dsw-alias-border-l1, #ddd);\n  background: var(--dsw-alias-bg-layer-1, #f7f7f4);\n  color: var(--dsw-alias-label-primary, #1f2329);\n  border-radius: 8px;\n  padding: 5px 12px;\n  min-height: 32px;\n  cursor: pointer;\n  font-size: 12px;\n  transition:\n    background 160ms ease,\n    opacity 160ms ease;\n}\n.dn-set-card .dn-set-btnSmall {\n  min-height: 32px;\n  padding: 4px 12px;\n  font-size: 11px;\n  border-radius: 8px;\n}\n.dn-set-card .dn-set-btnPrimary {\n  background: var(--dsw-alias-label-primary, #1f2329);\n  border-color: var(--dsw-alias-label-primary, #1f2329);\n  color: var(--dsw-alias-bg-base, #fff);\n  font-weight: 600;\n}\n.dn-set-card .dn-set-btnDanger {\n  background: var(--dsw-alias-state-error-primary, #8a4f45);\n  border-color: var(--dsw-alias-state-error-primary, #8a4f45);\n  color: #fff;\n}\n.dn-set-card .dn-set-btnGhostDanger {\n  color: var(--dsw-alias-state-error-primary, #8a4f45);\n  border-color: var(--dsw-alias-state-error-soft, rgba(138, 79, 69, 0.15));\n  background: var(--dsw-alias-state-error-soft, rgba(138, 79, 69, 0.08));\n}\n.dn-set-card button:focus-visible,\n.dn-set-card input:focus-visible,\n.dn-set-card select:focus-visible,\n.dn-set-card textarea:focus-visible,\n.dn-set-card summary:focus-visible {\n  outline: 2px solid var(--dsw-alias-label-primary, #1f2329);\n  outline-offset: 2px;\n}\n@media (hover: hover) {\n  .dn-set-card .dn-set-btn:hover,\n  .dn-set-card .dn-set-save:hover {\n    opacity: 0.9;\n  }\n}\n.dn-set-card .dn-set-btn:disabled,\n.dn-set-card .dn-set-save:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n@media (hover: hover) {\n  .dn-set-card .dn-set-btn:disabled:hover,\n  .dn-set-card .dn-set-save:disabled:hover {\n    opacity: 0.45;\n  }\n}\n\n/* 频道 tab 域保存行 */\n.dn-set-card .dn-ch-domainSave {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 12px;\n  padding-top: 10px;\n  padding-left: 14px;\n  padding-right: 14px;\n  border-top: 1px solid var(--dsw-alias-bg-layer-2, rgba(0, 0, 0, 0.055));\n}\n.dn-set-card .dn-ch-domainSaveHint {\n  flex: 1;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  font-size: 11px;\n  line-height: 1.6;\n}\n.dn-set-card .dn-ch-domainSave .dn-set-save {\n  min-height: 32px;\n}\n\n/* 409 冲突 */\n.dn-set-card .dn-conflict {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 10px;\n  margin-left: 14px;\n  margin-right: 14px;\n  padding: 8px 10px;\n  border: 1px solid var(--dsw-alias-state-warning-soft, rgba(138, 115, 64, 0.25));\n  background: var(--dsw-alias-state-warning-soft, rgba(138, 115, 64, 0.08));\n  border-radius: 8px;\n}\n.dn-set-card .dn-conflictText {\n  flex: 1;\n  color: var(--dsw-alias-label-primary, #1f2329);\n  font-size: 12px;\n  line-height: 1.6;\n}\n.dn-set-card .dn-conflictActions {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n@media (max-width: 480px) {\n  .dn-set-card .dn-conflict {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .dn-set-card .dn-conflictActions {\n    justify-content: flex-start;\n  }\n}\n\n/* --- 免打扰 --- */\n.dn-set-card .dn-dnd {\n  border: none;\n  border-bottom: 1px solid var(--dsw-alias-bg-layer-2, rgba(0, 0, 0, 0.055));\n  border-radius: 0;\n  padding: 8px 14px 12px;\n  background: var(--dsw-alias-bg-base, #ffffff);\n  margin: 0;\n}\n.dn-set-card .dn-dnd-head {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-height: 40px;\n}\n.dn-set-card .dn-dnd-head .dn-switch {\n  margin-left: auto;\n}\n.dn-set-card .dn-dnd-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin-top: 6px;\n  font-size: 12px;\n  font-variant-numeric: tabular-nums;\n}\n.dn-set-card .dn-dnd-cap {\n  color: var(--dsw-alias-label-secondary, #5f6672);\n}\n/* --- 免打扰多时间窗行 (#936): v3 风格增量, 只补多窗时间输入 ---\n * 普通行 (不套 details); 复用 dn-set-input/dn-set-btn; 无左侧竖线/渐变/斜体; \n * 颜色只走 --dsw-alias-* (本块不新增颜色, 只收数字与换行); \n * 数字 tabular-nums (时间输入与本机回显对齐; 行级 tabular-nums 已由 939 持有). */\n.dn-set-card .dn-dnd-row .dn-set-input[type="time"] {\n  font-variant-numeric: tabular-nums;\n  min-width: 0;\n  max-width: 140px;\n}\n@media (max-width: 480px) {\n  .dn-set-card .dn-dnd-row .dn-set-input[type="time"] {\n    flex: 1 1 120px;\n  }\n}\n.dn-set-card .dn-set-allows {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin-top: 8px;\n}\n.dn-set-card .dn-set-allowDim {\n  opacity: 0.55;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n}\n.dn-set-card .dn-set-allowHint {\n  font-size: 10px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n}\n.dn-set-card .dn-set-allowActions {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin-top: 8px;\n}\n\n/* --- 输入控件 --- */\n.dn-set-card .dn-set-input {\n  background: var(--dsw-alias-bg-layer-1, #f5f6f8);\n  color: var(--dsw-alias-label-primary, #1f2329);\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  border-radius: 8px;\n  padding: 5px 8px;\n  font-size: 12px;\n  min-height: 32px;\n  font-variant-numeric: tabular-nums;\n  transition:\n    border-color 160ms ease,\n    background 160ms ease;\n}\n.dn-set-card .dn-set-inputText {\n  width: 240px;\n  max-width: 100%;\n}\n.dn-set-card .dn-set-select {\n  width: auto;\n  min-width: 120px;\n}\n.dn-set-card .dn-set-numInput {\n  width: 110px;\n  font-variant-numeric: tabular-nums;\n}\n\n/* --- 折叠区 --- */\n.dn-set-card .dn-ch-adv {\n  margin: 10px 14px 0;\n}\n.dn-set-card .dn-ch-adv.dn-sec-adv {\n  margin-top: 12px;\n}\n.dn-set-card .dn-ch-adv > summary {\n  cursor: pointer;\n  list-style: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  min-height: 32px;\n  padding: 2px 12px;\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  border-radius: 8px;\n  background: var(--dsw-alias-bg-layer-1, #f5f6f8);\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  font-size: 11px;\n  user-select: none;\n  transition:\n    color 160ms ease,\n    background 160ms ease;\n}\n.dn-set-card .dn-ch-adv > summary::-webkit-details-marker {\n  display: none;\n}\n.dn-set-card .dn-ch-adv > summary::before {\n  content: "";\n  width: 5px;\n  height: 5px;\n  border-right: 1.5px solid currentColor;\n  border-bottom: 1.5px solid currentColor;\n  transform: rotate(-45deg);\n  transition: transform 160ms ease;\n  flex: none;\n}\n.dn-set-card .dn-ch-adv[open] > summary::before {\n  transform: rotate(45deg);\n}\n@media (hover: hover) {\n  .dn-set-card .dn-ch-adv > summary:hover {\n    color: var(--dsw-alias-label-primary, #1f2329);\n  }\n}\n.dn-set-card .dn-ch-adv-body {\n  margin-top: 8px;\n  border: 1px solid var(--dsw-alias-border-l1, #e8e8e4);\n  border-radius: 10px;\n  padding: 8px 12px;\n  background: var(--dsw-alias-bg-layer-1, #fafaf8);\n}\n.dn-set-card .dn-adv-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n  min-height: 36px;\n  transition: background 160ms ease;\n}\n.dn-set-card .dn-adv-row + .dn-adv-row {\n  border-top: 1px solid var(--dsw-alias-bg-layer-2, rgba(0, 0, 0, 0.055));\n}\n.dn-set-card .dn-adv-row .dn-adv-cap {\n  flex: 1;\n  color: var(--dsw-alias-label-secondary, #5f6672);\n}\n.dn-set-card .dn-set-note-inline {\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  line-height: 1.6;\n}\n\n/* --- 频道卡 (连续行 + 可展开, 无左侧色条) --- */\n.dn-set-card .dn-ch-card {\n  border: none;\n  border-bottom: 1px solid var(--dsw-alias-bg-layer-2, rgba(0, 0, 0, 0.055));\n  border-radius: 0;\n  margin: 0;\n  background: var(--dsw-alias-bg-base, #ffffff);\n  overflow: visible;\n}\n.dn-set-card .dn-ch-card > summary {\n  cursor: pointer;\n  list-style: none;\n  user-select: none;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 14px;\n  min-height: 52px;\n  flex-wrap: wrap;\n  transition: background 160ms ease;\n}\n.dn-set-card .dn-ch-card > summary::-webkit-details-marker {\n  display: none;\n}\n@media (hover: hover) {\n  .dn-set-card .dn-ch-card > summary:hover {\n    background: var(--dsw-alias-bg-layer-1, #f7f7f5);\n  }\n}\n.dn-set-card .dn-ch-card > summary::after {\n  content: "";\n  width: 6px;\n  height: 6px;\n  border-right: 1.5px solid currentColor;\n  border-bottom: 1.5px solid currentColor;\n  transform: rotate(45deg);\n  transition: transform 180ms ease;\n  opacity: 0.45;\n  flex: none;\n}\n.dn-set-card .dn-ch-card[open] > summary::after {\n  transform: rotate(225deg);\n}\n.dn-ch-icon {\n  width: 28px;\n  height: 28px;\n  border-radius: 8px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--dsw-alias-bg-layer-1, #f2f2ee);\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  border: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, 0.06));\n  flex: none;\n}\n.dn-ch-icon svg {\n  width: 14px;\n  height: 14px;\n}\n.dn-set-card .dn-ch-name {\n  font-weight: 500;\n  font-size: 13px;\n}\n.dn-set-card .dn-ch-type {\n  font-family: ui-monospace, Menlo, Consolas, monospace;\n  font-size: 10px;\n  color: var(--dsw-alias-label-tertiary, rgba(0, 0, 0, 0.38));\n  font-variant-numeric: tabular-nums;\n  border: none;\n  background: transparent;\n  padding: 0;\n  line-height: 1.4;\n}\n/* R2: 状态点本体迁到跨包原语 <Status> (dsu-status), 这三条 .dn-ch-statusDot* 规则\n   随之零消费者, 故一并删除——留着就是«零消费者的永久别名», 与本轮在 provider-usage\n   删 .dou-pane 别名是同一条纪律.状态文字 .dn-ch-statusTxt 仍是本包领域样式, 不动. */\n.dn-set-card .dn-ch-statusTxt {\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  font-variant-numeric: tabular-nums;\n}\n.dn-set-card .dn-ch-summaryRight {\n  margin-left: auto;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.dn-set-card .dn-ch-body {\n  padding: 4px 14px 12px 52px;\n  border-top: none;\n  background: var(--dsw-alias-bg-layer-1, #fafaf8);\n  border-bottom: 1px solid var(--dsw-alias-bg-layer-2, rgba(0, 0, 0, 0.04));\n}\n.dn-set-card .dn-ch-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n  padding: 6px 0;\n  min-height: 40px;\n  transition: background 160ms ease;\n}\n.dn-set-card .dn-ch-row + .dn-ch-row {\n  border-top: 1px solid var(--dsw-alias-bg-layer-2, rgba(0, 0, 0, 0.055));\n}\n.dn-set-card .dn-ch-cap {\n  flex: 0 0 96px;\n  color: var(--dsw-alias-label-secondary, #5f6672);\n}\n.dn-set-card .dn-ch-ctl {\n  flex: 1 1 220px;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.dn-set-card .dn-ch-ctl .dn-set-inputText {\n  flex: 1 1 180px;\n  width: auto;\n  min-width: 0;\n}\n.dn-set-card .dn-ch-hint {\n  flex-basis: 100%;\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  line-height: 1.6;\n}\n.dn-set-card .dn-ch-actions {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  padding-top: 8px;\n  margin-top: 4px;\n  border-top: 1px solid var(--dsw-alias-bg-layer-2, rgba(0, 0, 0, 0.055));\n}\n.dn-set-card .dn-ch-perm {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n}\n.dn-set-card .dn-ch-permText {\n  line-height: 1.5;\n}\n/* 诊断行: 无左侧竖线, 用浅底 + 状态字 */\n.dn-set-card .dn-ch-diag {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin-top: 8px;\n  padding: 8px 10px;\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  border-radius: 8px;\n  background: var(--dsw-alias-bg-base, #fff);\n  font-size: 11px;\n  line-height: 1.6;\n}\n.dn-set-card .dn-ch-diag-error .dn-ch-diagText {\n  color: var(--dsw-alias-state-error-primary, #8a4f45);\n}\n.dn-set-card .dn-ch-diagText {\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  overflow-wrap: anywhere;\n}\n.dn-set-card .dn-ch-diagCap {\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n}\n.dn-set-card .dn-ch-diagItems {\n  margin: 2px 0 0;\n  padding-left: 16px;\n  color: var(--dsw-alias-label-secondary, #5f6672);\n}\n.dn-set-card .dn-ch-diagSrc {\n  font-size: 10px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n}\n.dn-set-card .dn-ch-diagDetail {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.dn-set-card .dn-ch-diagDetailCap {\n  flex: none;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n}\n/* 三态: 文字必现, 不用左侧色条 */\n.dn-set-card .dn-ch-card.dn-ch-sound .dn-ch-stateTxt,\n.dn-set-card .dn-soundOnly {\n  color: var(--dsw-alias-state-warning-primary, #8a7340);\n}\n.dn-set-card .dn-ch-card.dn-ch-off > summary {\n  opacity: 0.72;\n}\n.dn-set-card .dn-ch-stateTxt {\n  font-size: 11px;\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  border: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, 0.08));\n  border-radius: 6px;\n  padding: 0 6px;\n  line-height: 1.7;\n  flex: none;\n  font-variant-numeric: tabular-nums;\n}\n.dn-set-card .dn-tonePreview {\n  flex: none;\n}\n.dn-set-card .dn-ch-add {\n  margin: 8px 14px 12px;\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.dn-set-card .dn-ch-failBadge {\n  font-family: ui-monospace, Menlo, Consolas, monospace;\n  font-size: 10px;\n  border-radius: 6px;\n  padding: 1px 6px;\n  background: var(--dsw-alias-state-error-soft, rgba(138, 79, 69, 0.08));\n  border: 1px solid var(--dsw-alias-state-error-primary, #8a4f45);\n  color: var(--dsw-alias-state-error-primary, #8a4f45);\n  flex: none;\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-variant-numeric: tabular-nums;\n}\n\n/* secret / auth / template */\n.dn-secret {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  flex: 1 1 180px;\n  min-width: 0;\n}\n.dn-secret .dn-set-inputText {\n  flex: 1 1 auto;\n  font-family: ui-monospace, monospace;\n  letter-spacing: 0.06em;\n}\n.dn-set-card .dn-secret-reveal {\n  border: 1px solid var(--dsw-alias-border-l1, #ddd);\n  background: var(--dsw-alias-bg-layer-1, #f7f7f4);\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  border-radius: 8px;\n  min-height: 32px;\n  padding: 4px 10px;\n  font-size: 11px;\n  cursor: pointer;\n  flex: none;\n}\n.dn-authFields {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  flex: 1 1 200px;\n  min-width: 0;\n  flex-wrap: wrap;\n}\n.dn-authFields .dn-set-inputText {\n  flex: 1 1 120px;\n  width: auto;\n  min-width: 0;\n  font-family: ui-monospace, monospace;\n}\n.dn-tpl {\n  width: 100%;\n  min-height: 112px;\n  resize: vertical;\n  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;\n  font-size: 11px;\n  line-height: 1.7;\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  border-radius: 8px;\n  padding: 8px 10px;\n  background: var(--dsw-alias-bg-layer-1, #f5f6f8);\n  color: var(--dsw-alias-label-primary, #1f2329);\n  tab-size: 2;\n  font-variant-numeric: tabular-nums;\n}\n.dn-tplChips {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin-top: 6px;\n  align-items: center;\n}\n.dn-tplChips .dn-tplCap {\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n}\n.dn-set-card .dn-tpl-chip {\n  font-family: ui-monospace, monospace;\n  font-size: 10px;\n  border: 1px dashed var(--dsw-alias-border-l2, #d3d8df);\n  border-radius: 6px;\n  background: var(--dsw-alias-bg-base, #ffffff);\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  padding: 5px 8px;\n  min-height: 32px;\n  cursor: copy;\n}\n.dn-set-card .dn-tpl-chip.is-raw {\n  border-style: solid;\n  color: var(--dsw-alias-state-warning-primary, #8a7340);\n  border-color: var(--dsw-alias-state-warning-soft, rgba(138, 115, 64, 0.2));\n}\n\n/* levels */\n.dn-set-card .dn-levels-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  padding: 6px 0;\n  font-variant-numeric: tabular-nums;\n}\n.dn-set-card .dn-levels-kind {\n  flex: 0 1 150px;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-family: ui-monospace, Menlo, Consolas, monospace;\n  font-size: 12px;\n}\n.dn-set-card .dn-levels-row .dn-set-select {\n  flex: 1 1 130px;\n  min-width: 0;\n}\n.dn-set-card .dn-levels-add {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin-top: 8px;\n}\n.dn-set-card .dn-levels-add .dn-set-inputText {\n  flex: 1 1 150px;\n  min-width: 90px;\n}\n.dn-set-card .dn-levels-add .dn-set-select {\n  flex: 1 1 110px;\n  min-width: 90px;\n}\n\n/* --- 通知记录 --- */\n.dn-set-card .dn-set-historyTools {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin: 8px 0 4px;\n  padding: 0;\n}\n.dn-set-card .dn-set-historyCount {\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  margin-left: auto;\n  font-variant-numeric: tabular-nums;\n}\n.dn-set-card .dn-set-history {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  background: var(--dsw-alias-bg-base, #fff);\n}\n.dn-set-card .dn-set-historyItem {\n  display: flex;\n  gap: 10px;\n  align-items: flex-start;\n  padding: 10px 2px;\n  border-bottom: 1px solid var(--dsw-alias-bg-layer-2, rgba(0, 0, 0, 0.055));\n  transition: background 160ms ease;\n}\n@media (hover: hover) {\n  .dn-set-card .dn-set-historyItem:hover {\n    background: var(--dsw-alias-bg-layer-1, #f7f7f5);\n  }\n}\n.dn-set-card .dn-set-historyItem .dn-sev {\n  margin-top: 10px;\n  flex: none;\n}\n.dn-set-card .dn-set-historyItem > .dn-ico {\n  margin-top: 2px;\n}\n.dn-set-card .dn-set-historyMain {\n  flex: 1;\n  min-width: 0;\n}\n.dn-set-card .dn-set-historyHead {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.dn-set-card .dn-set-historyKind {\n  font-weight: 500;\n  font-size: 12px;\n}\n.dn-set-card .dn-set-historyTime {\n  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  font-variant-numeric: tabular-nums;\n}\n.dn-set-card .dn-set-historySuppressed {\n  font-size: 10px;\n  border-radius: 6px;\n  padding: 0 6px;\n  border: 1px solid var(--dsw-alias-border-l2, #d3d8df);\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  font-variant-numeric: tabular-nums;\n}\n.dn-set-card .dn-set-historyText {\n  font-size: 12px;\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  margin-top: 3px;\n  line-height: 1.6;\n  overflow-wrap: anywhere;\n}\n.dn-set-card .dn-set-historyChannels {\n  margin-top: 6px;\n  padding: 6px 8px;\n  border-radius: 8px;\n  background: var(--dsw-alias-bg-layer-1, #fafaf8);\n  border: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, 0.04));\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.dn-set-card .dn-ch-delivery {\n  display: flex;\n  align-items: baseline;\n  gap: 6px;\n  flex-wrap: wrap;\n  font-size: 11px;\n  line-height: 1.6;\n  font-variant-numeric: tabular-nums;\n}\n.dn-set-card .dn-ch-deliveryName {\n  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;\n  font-size: 10px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  background: var(--dsw-alias-bg-base, #fff);\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  border-radius: 4px;\n  padding: 0 5px;\n  flex: none;\n}\n.dn-set-card .dn-ch-deliveryStatus {\n  flex: none;\n  font-weight: 600;\n  color: var(--dsw-alias-label-secondary, #5f6672);\n}\n.dn-set-card .dn-ch-delivery-ok .dn-ch-deliveryStatus {\n  color: var(--dsw-alias-state-success-primary, #3d7a4e);\n}\n.dn-set-card .dn-ch-delivery-failed .dn-ch-deliveryStatus {\n  color: var(--dsw-alias-state-error-primary, #8a4f45);\n}\n.dn-set-card .dn-ch-delivery-skipped .dn-ch-deliveryStatus {\n  color: var(--dsw-alias-state-warning-primary, #8a7340);\n}\n.dn-set-card .dn-ch-deliveryReason {\n  flex: 1 1 160px;\n  min-width: 0;\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  overflow-wrap: anywhere;\n}\n.dn-set-card .dn-ch-reasonRaw {\n  flex-basis: 100%;\n  min-width: 0;\n}\n.dn-set-card .dn-ch-reasonRaw > summary {\n  cursor: pointer;\n  font-size: 10px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  user-select: none;\n}\n.dn-set-card .dn-ch-reasonRawText {\n  margin-top: 2px;\n  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;\n  font-size: 10px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  overflow-wrap: anywhere;\n  white-space: pre-wrap;\n}\n\n/* --- 底栏 (壳层玻璃) --- */\n.dn-set-card .dn-set-foot {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 14px;\n  margin-top: 8px;\n  border-top: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, 0.06));\n  background: var(--dsw-alias-bg-layer-1, rgba(245, 246, 248, 0.72));\n  backdrop-filter: blur(16px) saturate(1.15);\n  -webkit-backdrop-filter: blur(16px) saturate(1.15);\n  flex-wrap: wrap;\n}\n.dn-set-card .dn-dirty {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 11px;\n  color: var(--dsw-alias-state-warning-primary, #8a7340);\n  font-variant-numeric: tabular-nums;\n}\n.dn-set-card .dn-dirty::before {\n  content: "";\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--dsw-alias-state-warning-primary, #8a7340);\n}\n.dn-set-card .dn-set-foot .dn-spacer {\n  flex: 1;\n}\n.dn-set-card .dn-set-foot .dn-set-saved {\n  color: var(--dsw-alias-state-success-primary, #3d7a4e);\n}\n.dn-set-card .dn-set-foot .dn-set-error {\n  color: var(--dsw-alias-state-error-primary, #8a4f45);\n}\n.dn-set-card .dn-set-save {\n  border: none;\n  background: var(--dsw-alias-label-primary, #1a1a1a);\n  color: var(--dsw-alias-bg-base, #fff);\n  border-radius: 10px;\n  padding: 6px 18px;\n  min-height: 32px;\n  cursor: pointer;\n  font-size: 12px;\n  font-weight: 650;\n  transition:\n    opacity 160ms ease,\n    transform 160ms ease;\n}\n.dn-set-card .dn-set-save:hover {\n  opacity: 0.9;\n}\n\n.dn-set-card .dn-set-notes {\n  margin-top: 8px;\n  padding-left: 14px;\n  padding-right: 14px;\n}\n.dn-set-card .dn-set-note {\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  font-size: 11px;\n  margin-top: 6px;\n  line-height: 1.7;\n  border-left: none;\n  padding-left: 0;\n}\n\n/* 窄屏 */\n@media (max-width: 480px) {\n  .dn-set-card .dn-set-tabs {\n    padding: 8px 8px;\n  }\n  .dn-set-card .dn-set-tab {\n    flex: 1;\n    justify-content: center;\n    padding: 5px 4px;\n  }\n  .dn-set-card .dn-evt,\n  .dn-set-card .dn-ch-card > summary,\n  .dn-set-card .dn-kinds {\n    padding-left: 10px;\n    padding-right: 10px;\n  }\n  .dn-set-card .dn-ch-body {\n    padding-left: 12px;\n    padding-right: 10px;\n  }\n  .dn-set-card .dn-ch-cap {\n    flex-basis: 100%;\n  }\n  .dn-set-card .dn-ch-ctl {\n    flex-basis: 100%;\n  }\n  .dn-set-card .dn-ch-ctl .dn-set-inputText {\n    flex: 1 1 100%;\n  }\n  .dn-set-card .dn-ch-actions .dn-set-btn {\n    flex: 1 1 auto;\n  }\n  .dn-set-card .dn-evt-head .dn-switch {\n    margin-left: 0;\n  }\n  .dn-set-card .dn-kinds-actions {\n    margin-left: 0;\n    flex-basis: 100%;\n  }\n  .dn-set-card .dn-ch-failBadge {\n    max-width: 140px;\n  }\n  .dn-set-card .dn-ch-card > summary .dn-ch-statusTxt {\n    display: none;\n  }\n}\n\n/* ============ 通知展示 (横幅 / toast) ============ */\n\n/* Поверхность взята у тоста самого DSH (перенос чата в архив): тёмная в обеих\n   темах, крупный радиус, подпись 14/22 и значок слева. Цвет значка говорит,\n   что это за событие, — сама плашка от темы и от важности не зависит. */\n.dn-toast {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n  z-index: 9999;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  max-width: min(640px, calc(100vw - 48px));\n  padding: 12px 16px;\n  border-radius: var(--dsw-radius-lg, 16px);\n  background: var(--dsw-alias-toast-bg, #353638);\n  color: var(--dsw-alias-toast-label, #fff);\n  font-family: var(--dsw-font-family, inherit);\n  font-size: 14px;\n  line-height: 22px;\n  box-shadow: var(--dsw-shadow-lv3, 0 0 1px rgba(0, 0, 0, 0.2), 0 12px 32px rgba(0, 0, 0, 0.16));\n  animation: dn-toast-in 160ms ease-out;\n}\n.dn-banner {\n  position: fixed;\n  top: 16px;\n  right: 16px;\n  width: 320px;\n  max-width: min(320px, calc(100vw - 24px));\n  z-index: 10000;\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: var(--dsw-radius-lg, 16px);\n  background: var(--dsw-alias-toast-bg, #353638);\n  color: var(--dsw-alias-toast-label, #fff);\n  font-family: var(--dsw-font-family, inherit);\n  font-size: 14px;\n  line-height: 22px;\n  box-shadow: var(--dsw-shadow-lv3, 0 0 1px rgba(0, 0, 0, 0.2), 0 12px 32px rgba(0, 0, 0, 0.16));\n  cursor: pointer;\n  animation: dn-toast-in 160ms ease-out;\n}\n.dn-banner-icon {\n  display: grid;\n  place-items: center;\n  flex: none;\n  margin-top: 3px;\n  opacity: 0.7;\n  color: var(--dsw-alias-toast-label, #fff);\n}\n.dn-banner-icon[data-tone="success"] {\n  opacity: 1;\n  color: var(--dsw-alias-state-success-primary, #22c55e);\n}\n.dn-banner-icon[data-tone="warning"] {\n  opacity: 1;\n  color: var(--dsw-alias-state-warn-label, #dd8629);\n}\n.dn-banner-main {\n  flex: 1;\n  min-width: 0;\n}\n.dn-banner-title {\n  font-weight: 600;\n}\n.dn-banner-text {\n  margin-top: 2px;\n  font-size: 13px;\n  line-height: 20px;\n  opacity: 0.8;\n  white-space: pre-line;\n  overflow-wrap: anywhere;\n}\n@keyframes dn-toast-in {\n  from {\n    opacity: 0;\n    transform: translateY(-6px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .dn-toast,\n  .dn-banner {\n    animation: none;\n  }\n}\n.dn-test-dirty {\n  border-color: var(--dsw-alias-state-warning-primary, #8a7340);\n}\n.dn-test-dirtyBadge {\n  margin-left: 6px;\n  padding: 0 6px;\n  border-radius: 6px;\n  font-size: 11px;\n  background: var(--dsw-alias-state-warning-primary, #8a7340);\n  color: #fff;\n  font-variant-numeric: tabular-nums;\n}\n.dn-dryrun {\n  margin: 8px 14px;\n  padding: 8px 10px;\n  border-radius: 8px;\n  border: 1px solid var(--dsw-alias-state-warning-soft, rgba(138, 115, 64, 0.25));\n  background: var(--dsw-alias-state-warning-soft, rgba(138, 115, 64, 0.06));\n  font-size: 12px;\n}\n.dn-dryrunTag {\n  margin-right: 8px;\n  padding: 0 6px;\n  border-radius: 6px;\n  font-size: 11px;\n  background: var(--dsw-alias-state-warning-primary, #8a7340);\n  color: #fff;\n}\n.dn-dryrunPending {\n  color: var(--dsw-alias-label-secondary, #646a73);\n}\n.dn-dryrunResult {\n  color: var(--dsw-alias-label-primary, #1f2329);\n  overflow-wrap: anywhere;\n  font-variant-numeric: tabular-nums;\n}\n.dn-dryrunActions {\n  margin-left: 8px;\n}\n.dn-dryrunActions .dn-set-btn {\n  margin-left: 6px;\n}\n.dn-dryrunNote {\n  margin-top: 4px;\n  font-size: 11px;\n  color: var(--dsw-alias-label-secondary, #646a73);\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dn-set-card *,\n  .dn-set-card *::before,\n  .dn-set-card *::after,\n  .dn-switch *,\n  .dn-switch *::before,\n  .dn-switch *::after {\n    transition-duration: 0.01ms !important;\n  }\n}\n\n/* ---- T1 五原语层 (dsu-*)不再在本文件 ----\n * R3 起这段原语规则的**唯一副本**在 shared/client/ui/ui.css, 由本包\n * src/client/index.tsx 经 ts 侧拼接注入 (import UI_CSS + cssText: STYLE + UI_CSS).\n * 此前这里是人手复制的第 N 份拷贝——改一处要同步 N 处, 漏改不会有任何测试报红.\n * 领域样式 (.dn-* / .dou-* 等)仍全部留在本文件, 本包产物依旧是自包含单文件.\n */\n';

    // ../../shared/client/ui/ui.css
    var ui_default = '/* ================= T1 五原语层 (dsu-*)唯一副本 =================\n * 职责: Surface / Field / SegmentedControl / Status+Badge 的唯一表现面.\n *   Button 的视觉本体由**调用点自带的领域类**承担 (见块尾说明), 本块不出 dsu-btn 规则.\n *\n * 【怎么进到浏览器: ts 侧拼接, 不是 @import】\n * 各包 src/client/index.ts 两行接缝: \n *     import UI_CSS from "<到仓库根的相对路径>/shared/client/ui/ui.css";\n *     ensureStyle({ id: STYLE_ID, cssText: UI_CSS + STYLE, version: CSS_VERSION });\n * **顺序不可颠倒**: 原语层在前 (当底座), 各包 style.css 在后, 这样包内针对原语钩子的\n * 窄屏/领域覆盖 (同优先级靠后者胜)才压得住——provider-usage 的 @media 480px 段正是\n * 靠这条把 .dsu-badge 的 max-width 放宽到 100%, .dsu-surface-pane 的 padding 收到 10px.\n * 写成 STYLE + UI_CSS 时这两条覆盖会变死规则, build 仍 exit 0, 窄屏却悄悄变回原样.\n * build-client 的 .css text-loader (scripts/build/build-client.ts)把本文件当**纯文本**\n * 内联进各包 client.js, 产物仍自包含单文件, 零运行时依赖, 无独立请求.\n *\n * 【为什么不是 @import: R3 实测证伪, 勿再提】\n * 试过在各包 style.css 顶部写 @import 指向本文件: text-loader 不解析 CSS, @import 会\n * 原样留在产物字符串里 (实测 `grep -c \'@import\' lib/client.js` → 1), 而探针规则\n * `grep -c \'dsu-probe\' lib/client.js` → 0; 浏览器随后按**页面相对 URL** 去请求那个\n * 路径 → 404 → 规则静默消失, **而 build 仍 exit 0, 测试仍全绿**.这是最坏的失败模式.\n *\n * 【与«各包 style.css 单文件»约定的关系】\n * DEVELOPMENT §3 要求样式不写进 ts, 留在各包 style.css.本文件不违反它: 本文件**不含\n * 任何包的领域样式**, 只是跨包共享的那一段原语规则的单一事实源, 由 ts 侧拼接注入; \n * 各包 style.css 仍是该包领域样式的唯一位置.\n *\n * 纪律: 颜色全走 --dsw-alias-* + 浅色回退 (禁裸 hex); 悬停一律 @media (hover: hover)\n *   包裹 (#128 规格第 7 条), 断点机制全仓只有这一套; 禁 role="navigation" (语义层在\n *   shared/client/ui/index.tsx 冻结, 本块只管表现, 结构不冻结).\n * 消费包不必逐档消费: 未消费的档位在本包是死规则, 属有意接受的冗余——宁可一段没人用的\n *   规则, 也不要给原语层开出«按包裁剪规则块»这条会立刻分叉的机制.\n */\n.dsu-surface-pane {\n  margin-bottom: 16px;\n  padding: 12px;\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  border-radius: 10px;\n  background: var(--dsw-alias-bg-base, #ffffff);\n  font-size: 12px;\n  line-height: 1.7;\n}\n/* 极窄容器降级 (#1015 A+C 的 C-3 配套): 宿主设置弹窗在 375px 下不折叠左侧导航, \n   内容列被压到约 139px, 再经 pane padding 12px×2 层层扣减后趋势区只剩 56px——\n   实测装 dsh-web-mobile@3.0.3 亦然 (nav 仍 flex:0 0 auto 固定 188px), 故根因在宿主\n   布局, 插件侧无法获得更多宽度.此处能做的唯一有效动作是**把容器自身的 padding 让给内容**: \n   收掉 padding 后可用宽度翻倍 (56px → 104px 量级), 标题/控件不再逐词竖排.\n   断点判据用 trend.tsx 已有的 data-dou-col (由 ResizeObserver 量**本窗格实测宽**写入), \n   不用视口断点也不依赖 container-type: 宿主把内容列压到多窄与视口宽度无关, \n   桌面窄窗同样会命中, 这是刻意的. */\n.dou-trend-body[data-dou-col="s"] .dsu-surface-pane {\n  padding: 6px 4px;\n  border-radius: 8px;\n}\n/* 极窄档再让出设置区外壳的 padding: 实测宿主 375px 下 content 仅 139px, 经 set-body\n   padding 14 与 pane padding 各扣一轮后, 内容实得 34px——不足一行中文.窄档下这些\n   padding 是纯损失 (外壳描边已提供视觉边界), 一并收掉. */\n/* set-body 是所有设置区窗格共用的外壳, :has() 把作用域限死在«含窄档趋势窗格»的那一个, \n   不影响 usage/report/history/providers 等其他窗格 (宿主与本仓均已在用 :has()). */\n.dou-set-body:has(.dou-trend-body[data-dou-col="s"]) {\n  padding: 4px 2px;\n}\n.dsu-surface-card {\n  /* 壳宽 560px 是外壳卡独有的约束 (原 settings/index.tsx 内联 maxWidth, 行为不变收敛进样式表) */\n  max-width: 560px;\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  border-radius: 12px;\n  overflow: hidden;\n  background: var(--dsw-alias-bg-base, #ffffff);\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);\n}\n\n/* ---- Field: 标签 + 控件 ----\n   行内字段 nowrap 横排, 换行能力由 .dsu-field-row 的 flex-wrap 承担\n    (约 350px 内容宽度下 nowrap 横排必然溢出, 四个数字输入行必须能折行). */\n.dsu-field {\n  margin-right: 12px;\n  white-space: nowrap;\n}\n.dsu-field-block {\n  /* 标签在上, 控件在下: 与 .dsu-field (行内标签)并存会让同一行里出现两种排版结构, \n     跨字段换行时左边缘对不齐.此处统一为竖排, 行内字段若需保持原样走 .dsu-field. */\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 4px;\n  margin-bottom: 8px;\n}\n/* 标签文本是 <label> 内的裸文本节点 (隐式关联 select), 不是子元素——\n   故只能用 font/ ::first-line 类手段无法精确命中.改为给 label 本身定排版, \n   并让 select 独占一行: 裸文本节点会生成匿名 flex item, 与 select 同行.\n   这里把 label 设为 flex column, 裸文本成为它的匿名 item, select 成为第二个. */\n.dsu-field-block > select {\n  margin-top: 4px;\n  align-self: flex-start;\n}\n.dsu-field-block {\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n}\n.dsu-field-block > select {\n  font-size: 12px;\n  color: var(--dsw-alias-label-primary, #1f2329);\n}\n.dsu-field-row {\n  display: flex;\n  flex-wrap: wrap;\n  row-gap: 6px;\n  margin-bottom: 8px;\n}\n.dsu-input {\n  margin-left: 6px;\n  padding: 2px 6px;\n  border: 1px solid var(--dsw-alias-border-l2, #e8eaf0);\n  border-radius: 4px;\n}\n.dsu-input-number {\n  width: 64px;\n}\n\n/* ---- SegmentedControl: bar=顶部导航条 / pill=行内药丸组 / plain=朴素按钮组 ----\n * 窄屏: bar 靠 overflow-x + nowrap 横滑 (与收敛前一致), pill/plain 靠 flex-wrap 折行.\n * 激活项由 [data-dsu-seg-active] 定位而非类名, 换实现不会打坏«激活档滚进视野». */\n.dsu-seg {\n  display: flex;\n}\n.dsu-seg-bar {\n  gap: 4px;\n  padding: 10px 14px;\n  border-bottom: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  background: var(--dsw-alias-bg-layer-1, #f5f6f8);\n  overflow-x: auto;\n  white-space: nowrap;\n  scrollbar-width: none;\n}\n.dsu-seg-bar::-webkit-scrollbar {\n  display: none;\n}\n.dsu-seg-bar .dsu-seg-item {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  min-height: 32px;\n  padding: 5px 14px;\n  flex: none;\n  white-space: nowrap;\n  border: 1px solid transparent;\n  border-radius: 8px;\n  background: transparent;\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  font-size: 12px;\n  cursor: pointer;\n  font-family: inherit;\n}\n.dsu-seg-bar .dsu-seg-item[data-dsu-seg-active="true"] {\n  background: var(--dsw-alias-bg-base, #ffffff);\n  border-color: var(--dsw-alias-border-l1, #e2e5ea);\n  color: var(--dsw-alias-label-primary, #1f2329);\n  font-weight: 600;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);\n}\n.dsu-seg-bar .dsu-seg-item:focus-visible {\n  outline: 2px solid var(--dsw-alias-state-info-primary, #4a7dd6);\n  outline-offset: 2px;\n}\n@media (hover: hover) {\n  .dsu-seg-bar .dsu-seg-item:hover {\n    color: var(--dsw-alias-label-primary, #1f2329);\n  }\n}\n.dsu-seg-pill {\n  align-items: center;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin-bottom: 10px;\n}\n.dsu-seg-pill .dsu-seg-item {\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  background: var(--dsw-alias-bg-layer-1, #f5f6f8);\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  border-radius: 999px;\n  padding: 3px 12px;\n  min-height: 28px;\n  font-size: 11px;\n  cursor: pointer;\n  font-family: inherit;\n}\n.dsu-seg-pill .dsu-seg-item[data-dsu-seg-active="true"] {\n  background: var(--dsw-alias-state-info-soft, rgba(47, 111, 237, 0.1));\n  border-color: var(--dsw-alias-state-info-primary, #4a7dd6);\n  color: var(--dsw-alias-state-info-primary, #4a7dd6);\n  font-weight: 600;\n}\n.dsu-seg-plain {\n  gap: 6px;\n  flex-wrap: wrap;\n  /* 档内项距 6px, 档与档之间靠外层 .dou-trend-controls 的 row-gap 拉开——\n     两级间距必须分层: 项距 6 太挤会让«日/周/月»和«7d/30d/90d»读成一串. */\n  margin-bottom: 6px;\n}\n/* 段内项的视觉分组: 给«粒度/范围»这类**同类单选**加一个共同的浅底槽, \n   与«口径/指标»这类**独立选择器**在形状上分开——此前四组控件全是同样的\n   透明圆角按钮平铺, 视觉上分不出哪几个是一组.槽只描边不填色, \n   保持与设置页底色同调, 不与已选态的 brand 底色抢注意力. */\n.dsu-seg-plain > .dsu-seg-item {\n  border: 1px solid var(--dsw-alias-border-l3, #d7dae0);\n  background: var(--dsw-alias-bg-layer-1, #f5f6f8);\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  padding: 3px 12px;\n  border-radius: 6px;\n  font-size: 12.5px;\n  min-height: 26px;\n}\n.dsu-seg-plain > .dsu-seg-item:hover {\n  background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, 0.04));\n}\n.dsu-seg-plain > .dsu-seg-item[data-dsu-seg-active="true"] {\n  background: var(--dsw-alias-bg-base, #ffffff);\n  color: var(--dsw-alias-label-primary, #1f2329);\n  font-weight: 600;\n  border-color: var(--dsw-alias-border-l3, #d7dae0);\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);\n}\n/* plain 档的项**不出规则**: 视觉与触控热区由消费包自己的按钮类承担——\n   本包调用点传 itemClassName="dou-btn", 命中 #128 触控热区\n    (.dou-panel[data-dou-bp="narrow"] .dou-btn::before 外扩)与既有按钮规则. */\n\n/* ---- Status: 状态点 (无 label 时为装饰点, 语义由 aria-hidden 承担)---- */\n.dsu-status {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  margin-right: 6px;\n  vertical-align: middle;\n  flex: none;\n}\n.dsu-status[data-dsu-tone="ok"] {\n  background: var(--dsw-alias-state-success-primary, #0f9d6e);\n}\n.dsu-status[data-dsu-tone="warn"] {\n  background: var(--dsw-alias-state-warn-primary, #c9820b);\n}\n.dsu-status[data-dsu-tone="err"] {\n  background: var(--dsw-alias-state-error-primary, #d64545);\n}\n.dsu-status[data-dsu-tone="off"],\n.dsu-status[data-dsu-tone="neutral"] {\n  background: var(--dsw-alias-label-tertiary, #9aa0ab);\n}\n\n/* ---- Badge: 状态徽标 ----\n * 色与边由两个自定义属性承载, 尺寸档与色调档各改其一, 避免 tone×size 组合爆炸.\n * 规则顺序即优先级: size (定中性底)→ tone (定色)→ muted (定弱化, 末位覆盖 tone).\n * sm 档承载 provider 身份药丸 (含窄屏 100% 让位, 由既有 480px 段改写本选择器). */\n.dsu-badge {\n  --dsu-badge-fg: inherit;\n  --dsu-badge-bd: var(--dsw-alias-border-l1, #d7dae0);\n  flex: none;\n  line-height: 1.5;\n  color: var(--dsu-badge-fg);\n  border: 1px solid var(--dsu-badge-bd);\n}\n.dsu-badge[data-dsu-size="sm"] {\n  max-width: 55%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 11px;\n  padding: 0 8px;\n  border-radius: 99px;\n  background: var(--dsw-alias-bg-layer-1, #f8f9fb);\n}\n.dsu-badge[data-dsu-size="xs"] {\n  --dsu-badge-bd: transparent;\n  font-size: 10px;\n  padding: 1px 6px;\n  border-radius: 8px;\n  background: transparent;\n}\n.dsu-badge[data-dsu-tone="ok"] {\n  --dsu-badge-fg: var(--dsw-alias-state-success-primary, #3f9d63);\n  --dsu-badge-bd: var(--dsw-alias-state-success-primary, #3f9d63);\n}\n.dsu-badge[data-dsu-tone="warn"] {\n  --dsu-badge-fg: var(--dsw-alias-state-warn-primary, #c9820b);\n  --dsu-badge-bd: var(--dsw-alias-state-warn-primary, #c9820b);\n}\n.dsu-badge[data-dsu-tone="err"] {\n  --dsu-badge-fg: var(--dsw-alias-state-error-primary, #d64545);\n  --dsu-badge-bd: var(--dsw-alias-state-error-primary, #d64545);\n}\n.dsu-badge[data-dsu-tone="off"] {\n  --dsu-badge-fg: var(--dsw-alias-label-tertiary, #9aa0ab);\n}\n.dsu-badge[data-dsu-muted="true"] {\n  --dsu-badge-fg: var(--dsw-alias-label-tertiary, #9aa0ab);\n  border-style: dashed;\n}\n\n/* ---- Button: 本块不出规则 ----\n   Button 原语只出 dsu-btn 钩子与恒定的 type="button" 语义; 视觉与触控热区由**调用点\n   传入的领域类**承担 (provider-usage 传 .dou-btn, lan-proxy 传 .lp-set-save……).\n   R1 时 Button 曾硬编码 .dou-btn, 但原语层上提到档 C 后, 那条类名就成了«provider-usage\n   的领域契约写在跨包层里»——别的包挂上去只会得到一条永远命不中的死类.#128 触控目标\n   契约又是按**类名**选中的 (.dou-panel[data-dou-bp="narrow"] .dou-btn::before 的\n   inset:-4px 把 narrow 档的 min-height:36px 外扩到约 44px 命中区), 所以各包的按钮类\n   必须仍挂在按钮元素上; 在这里重复一份 dsu-btn 规则只会制造第二事实源. */\n';

    // ../../shared/client/ensure-style.js
    function ensureStyle(options) {
      const opts = options || {};
      const id = opts.id;
      const cssText = opts.cssText;
      const version = opts.version;
      if (typeof id !== "string" || id === "" || typeof cssText !== "string") {
        throw new TypeError("ensureStyle: поля { id, cssText } обязательны и должны быть строками (id не пустой)");
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

    // src/client/locale.ts
    var fallbackTranslate = (key) => String(key);
    var binding = { current: fallbackTranslate };
    function bindTranslate(next) {
      binding.current = next;
    }
    var t = (key, params) => binding.current(key, params);

    // src/shared/tones.ts
    var FOLLOW_SYSTEM_TONE = "default";
    var TONES = {
      [FOLLOW_SYSTEM_TONE]: {
        notes: [
          { freq: 880, at: 0, dur: 0.16 },
          { freq: 660, at: 0.16, dur: 0.22 }
        ],
        linuxFile: ["message-new-instant.oga"],
        darwinSound: "Glass",
        win32File: ["Windows Notify System Generic.wav", "Windows Ding.wav"]
      },
      ding: {
        notes: [
          { freq: 1318, at: 0, dur: 0.14 },
          { freq: 1760, at: 0.16, dur: 0.22 }
        ],
        linuxFile: ["message-new-instant.oga"],
        darwinSound: "Glass",
        win32File: ["Windows Ding.wav"]
      },
      bell: {
        notes: [{ freq: 880, at: 0, dur: 0.5 }],
        linuxFile: ["bell.oga"],
        darwinSound: "Tink",
        win32File: ["Windows Chimes.wav"]
      },
      chime: {
        notes: [
          { freq: 660, at: 0, dur: 0.3 },
          { freq: 880, at: 0.15, dur: 0.3 },
          { freq: 1320, at: 0.3, dur: 0.5 }
        ],
        linuxFile: ["complete.oga", "dialog-information.oga"],
        darwinSound: "Sosumi",
        win32File: ["Windows Chord.wav", "Windows Notify System Generic.wav"]
      },
      pop: {
        notes: [{ freq: 392, at: 0, dur: 0.12, type: "triangle" }],
        linuxFile: ["message.oga", "dialog-information.oga"],
        darwinSound: "Pop",
        win32File: ["Windows Balloon.wav", "Windows Notify System Generic.wav"]
      }
    };

    // src/shared/sounds.ts
    var SOUND_ID_LIST = ["ding", "bell", "chime", "pop"];
    var SOUND_IDS = SOUND_ID_LIST;
    function isSoundId(value) {
      return typeof value === "string" && SOUND_ID_LIST.includes(value);
    }

    // src/shared/channel-compare.ts
    var CHANNEL_OPTIONAL_STRING_KEYS = [
      "name",
      "baseUrl",
      "deviceKey",
      "token",
      "username",
      "password",
      "headerName",
      "headerValue",
      "template",
      "sound",
      "group",
      "icon",
      "url"
    ];
    function stripChannelEmpties(ch) {
      if (typeof ch !== "object" || ch === null || Array.isArray(ch)) return ch;
      const out = Object.assign({}, ch);
      for (const key of CHANNEL_OPTIONAL_STRING_KEYS) {
        if (typeof out[key] === "string" && out[key].length === 0) delete out[key];
      }
      return out;
    }
    function normalizeChannelForCompare(ch) {
      const stripped = stripChannelEmpties(ch);
      if (typeof stripped !== "object" || stripped === null || Array.isArray(stripped)) return stripped;
      const out = stripped;
      const defaults = CHANNEL_COMPARE_DEFAULTS.find((entry) => entry.type === out.type)?.defaults;
      if (defaults === void 0) return out;
      for (const field of Object.keys(defaults)) {
        if (out[field] === void 0) out[field] = defaults[field];
      }
      return out;
    }
    var CHANNEL_COMPARE_DEFAULTS = [
      { type: "bark", defaults: { levels: {}, timeoutMs: 0 } },
      { type: "webhook", defaults: { headers: {}, timeoutSec: 0, preset: "custom", auth: "none" } }
    ];
    function canonicalChannelsForCompare(channels) {
      return channels.map(normalizeChannelForCompare);
    }
    function canonicalSettingsForCompare(settings) {
      const out = Object.assign({}, settings);
      if (Array.isArray(out.channels)) out.channels = canonicalChannelsForCompare(out.channels);
      return out;
    }

    // src/shared/kinds.ts
    var BUILTIN_KINDS = [
      "ask",
      "question",
      "done",
      "subagent-done",
      "error",
      "turn-end",
      "test"
    ];
    function isBuiltinKind(kind) {
      return BUILTIN_KINDS.includes(kind);
    }
    var KIND_SEVERITY = {
      ask: "warning",
      question: "info",
      done: "success",
      "subagent-done": "info",
      error: "failure",
      "turn-end": "info",
      test: "info"
    };
    var KIND_SWITCHES = {
      ask: "notifyAsk",
      question: "notifyQuestion",
      done: "notifyTaskDone",
      "subagent-done": "notifySubagentDone",
      error: "notifyTaskError",
      "turn-end": "notifyTurnEnd"
    };

    // src/shared/channels.ts
    var BUILTIN_CHANNEL_TYPES = [
      "browser",
      "system"
    ];
    function isBuiltinChannelType(value) {
      return typeof value === "string" && BUILTIN_CHANNEL_TYPES.includes(value);
    }
    function channelIdFor(channel) {
      return String(channel.type || "") + ":" + String(channel.id || "");
    }
    function channelIdOf(channel) {
      const type = String(channel.type || "");
      return isBuiltinChannelType(type) ? type : channelIdFor(channel);
    }

    // src/shared/webhooks.ts
    var WEBHOOK_DEFAULT_TEMPLATES = {
      ntfy: '{\n  "topic": "<topic>",\n  "title": "{{title}}",\n  "message": "{{message}}",\n  "tags": ["{{kind}}"],\n  "priority": "{{priority}}"\n}',
      gotify: '{\n  "title": "{{title}}",\n  "message": "{{message}}",\n  "priority": "{{priority}}"\n}',
      raw: '{\n  "event": "{{kind}}",\n  "title": "{{title}}",\n  "body": "{{message}}",\n  "severity": "{{severity}}",\n  "ts": {{ts}}\n}'
    };
    var WEBHOOK_AUTHS = ["none", "bearer", "basic", "header"];
    function deliveryPresetOf(preset) {
      return preset === "custom" ? "raw" : preset;
    }
    function webhookTemplateOf(preset) {
      return WEBHOOK_DEFAULT_TEMPLATES[deliveryPresetOf(preset)];
    }

    // src/shared/reason-codes.ts
    var REASON_LEGACY = "reasonLegacy";
    var SOUND_WARNING_CODES = [
      "reasonSkipEnvironment",
      "reasonSystemSoundFailed",
      "reasonSystemToneUnwritable"
    ];
    function isSoundWarningCode(code) {
      return SOUND_WARNING_CODES.includes(code);
    }

    // src/shared/quiet.ts
    var QUIET_WINDOWS_LIMIT = 5;
    function clockToMinutes(text) {
      const match = /^(\d{2}):(\d{2})$/.exec(text);
      if (match === null) return NaN;
      const hours = Number(match[1]);
      const minutes = Number(match[2]);
      if (hours > 23 || minutes > 59) return NaN;
      return hours * 60 + minutes;
    }
    function inWindowMinutes(minutes, start, end) {
      const from = clockToMinutes(start);
      const to = clockToMinutes(end);
      if (Number.isNaN(from) || Number.isNaN(to)) return false;
      if (from === to) return false;
      if (from < to) return minutes >= from && minutes < to;
      return minutes >= from || minutes < to;
    }

    // src/shared/refusal.ts
    var REFUSAL_CODES = {
      /** 非回环来源 (含 Host 头不是回环): 回环围栏拒绝. */
      FORBIDDEN_LOOPBACK: "FORBIDDEN_LOOPBACK",
      /** 非回环调用未通过官方 connection 的 cookie / API peer 认证. */
      UNAUTHORIZED: "UNAUTHORIZED",
      /** 方法不在端点的方法表里: 方法围栏拒绝. */
      METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED"
    };

    // src/shared/disposers.ts
    function createDisposerStack() {
      const teardowns = [];
      let attached = false;
      let released = false;
      let report;
      function run(teardown) {
        try {
          teardown();
        } catch (error) {
          report?.(error);
        }
      }
      function release() {
        if (released) return;
        released = true;
        for (const teardown of teardowns.splice(0).reverse()) run(teardown);
      }
      function enqueue(teardown) {
        if (released) {
          run(teardown);
          return;
        }
        teardowns.push(teardown);
      }
      return {
        own: enqueue,
        acquire(make, release2) {
          const value = make();
          enqueue(() => release2(value));
          return value;
        },
        attach(host, id, onError) {
          if (attached) {
            throw new Error(
              "createDisposerStack: attach вызывается один раз (повторная запись оставит первую версию без освобождения)"
            );
          }
          attached = true;
          report = onError;
          host.effect(() => () => release(), id);
        }
      };
    }

    // src/shared/config-schema.ts
    var BARK_LEVELS = ["active", "timeSensitive", "passive", "critical"];

    // src/client/notify/audio.ts
    var PLAY_THROTTLE_MS = 1500;
    function createAudioEngine(ports) {
      let ctx = null;
      let lastPlayAt = 0;
      function ensureContext() {
        if (ctx !== null) return ctx;
        const Ctor = ports.ctor();
        if (Ctor === void 0) return null;
        ctx = new Ctor();
        return ctx;
      }
      function unlock() {
        try {
          const audio = ensureContext();
          if (audio === null) return;
          if (audio.state === "suspended") {
            const resumed = audio.resume();
            if (resumed && typeof resumed.then === "function") {
              resumed.then(
                () => {
                  audio.__dshRan = true;
                },
                () => {
                  audio.__dshResumeRejected = true;
                }
              );
            }
          }
          if (audio.state === "running") audio.__dshRan = true;
          const buffer = audio.createBuffer(1, 1, 22050);
          const source = audio.createBufferSource();
          source.buffer = buffer;
          source.connect(audio.destination);
          source.start(0);
        } catch {
        }
      }
      function gate() {
        const now = ports.now();
        if (now - lastPlayAt < PLAY_THROTTLE_MS) return false;
        lastPlayAt = now;
        return true;
      }
      function playTone(tone) {
        const audio = ctx;
        if (audio === null || audio.state !== "running") return;
        try {
          const start = audio.currentTime;
          const spec = tone !== void 0 && Object.hasOwn(TONES, tone) ? TONES[tone] : TONES[FOLLOW_SYSTEM_TONE];
          for (const note of spec.notes) {
            const osc = audio.createOscillator();
            const gain = audio.createGain();
            osc.type = note.type || "sine";
            osc.frequency.value = note.freq;
            gain.gain.setValueAtTime(1e-4, start + note.at);
            gain.gain.exponentialRampToValueAtTime(0.18, start + note.at + 0.02);
            gain.gain.exponentialRampToValueAtTime(1e-4, start + note.at + note.dur);
            osc.connect(gain);
            gain.connect(audio.destination);
            osc.start(start + note.at);
            osc.stop(start + note.at + note.dur + 0.02);
          }
        } catch {
        }
      }
      function playPreview(tone) {
        unlock();
        playTone(tone);
      }
      function facts() {
        const supported = ports.ctor() !== void 0;
        if (ctx === null) {
          return { supported, state: null, hasEverRun: false, resumeRejected: false };
        }
        return {
          supported,
          state: ctx.state,
          hasEverRun: ctx.__dshRan === true,
          resumeRejected: ctx.__dshResumeRejected === true
        };
      }
      return { unlock, gate, playTone, playPreview, facts };
    }

    // src/client/notify/registry.ts
    var NOTIFICATION_KEEP = 5;
    var shown = [];
    function trackNotification(notification, owner) {
      shown.push({ notification, owner });
      if (shown.length > NOTIFICATION_KEEP) shown.shift()?.notification.close();
    }
    function closeNotificationsOf(owner) {
      const owned = [];
      for (let i = shown.length - 1; i >= 0; i -= 1) {
        const entry = shown[i];
        if (entry.owner === owner) {
          owned.unshift(entry.notification);
          shown.splice(i, 1);
        }
      }
      for (const notification of owned) {
        try {
          notification.close();
        } catch {
        }
      }
    }

    // src/client/notify/title.ts
    function createTitleFlasher(ports) {
      let saved = null;
      let owner = null;
      return {
        flash(title, caller) {
          if (saved === null) saved = ports.get();
          owner = caller;
          ports.set("🔔 " + String(title).slice(0, 40));
        },
        restore(caller) {
          if (saved === null || owner !== caller) return;
          ports.set(saved);
          saved = null;
          owner = null;
        }
      };
    }
    var titleFlasher = createTitleFlasher({
      get: () => document.title,
      set: (value) => {
        document.title = value;
      }
    });

    // src/client/notify/lease.ts
    var MASTER_KEY = "dsh-notifier:master";
    var MASTER_LEASE_MS = 15e3;
    function parseLease(raw) {
      if (!raw) return null;
      const value = JSON.parse(raw);
      if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
      const lease = value;
      if (typeof lease.id !== "string" || typeof lease.ts !== "number") return null;
      return lease;
    }
    function claimMaster(tabId, ports) {
      try {
        const lease = parseLease(ports.read());
        const now = ports.now();
        const ts = lease === null ? void 0 : lease.ts;
        if (lease !== null && typeof ts === "number" && now - ts < MASTER_LEASE_MS) {
          if (lease.id === tabId) {
            ports.write(JSON.stringify(Object.assign({}, lease, { ts: now })));
            return true;
          }
          return false;
        }
        ports.write(JSON.stringify({ id: tabId, ts: now }));
        return true;
      } catch {
        return true;
      }
    }

    // src/client/notify/session.ts
    var WATCHDOG_MS = 6e4;
    var WATCHDOG_ARM_MS = WATCHDOG_MS + 5e3;
    var RECONNECT_MIN_GAP_MS = 5e3;
    function startNotifySession(ports, onFrame) {
      let source = null;
      let lastActivity = 0;
      let lastSeq = 0;
      let watchdog = null;
      let lastReconnectAt = 0;
      function armWatchdog() {
        if (watchdog !== null) ports.clearTimer(watchdog);
        watchdog = ports.setTimer(() => {
          if (ports.now() - lastActivity > WATCHDOG_MS) forceReconnect();
          else armWatchdog();
        }, WATCHDOG_ARM_MS);
      }
      function forceReconnect() {
        const now = ports.now();
        if (now - lastReconnectAt < RECONNECT_MIN_GAP_MS) return;
        lastReconnectAt = now;
        closeSource();
        connect();
      }
      function closeSource() {
        if (source === null) return;
        try {
          source.close();
        } catch (error) {
          ports.warn("не удалось закрыть старое SSE-соединение", error);
        }
        source = null;
      }
      function connect() {
        closeSource();
        try {
          const url = ports.url + (lastSeq > 0 ? "?since=" + lastSeq : "");
          const next = ports.createSource(url);
          source = next;
          lastActivity = ports.now();
          next.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);
              lastActivity = ports.now();
              if (data.type === "ping") return;
              if (data.type === "goto-session") {
                if (typeof data.seq === "number") {
                  if (lastSeq > 0 && data.seq <= lastSeq) return;
                  lastSeq = data.seq;
                }
                onFrame(data);
                return;
              }
              if (data.type === "notify") {
                if (typeof data.seq === "number") {
                  if (lastSeq > 0 && data.seq <= lastSeq) return;
                  lastSeq = data.seq;
                }
                onFrame(data);
              }
            } catch (error) {
              ports.warn("не удалось разобрать кадр", error);
            }
          };
          next.onerror = () => {
            forceReconnect();
          };
          armWatchdog();
        } catch (error) {
          ports.warn("EventSource недоступен", error);
        }
      }
      connect();
      return {
        close() {
          if (watchdog !== null) ports.clearTimer(watchdog);
          closeSource();
        },
        reconnect: forceReconnect
      };
    }

    // src/client/notify/policy.ts
    function soundPolicyOf(sound, playOnly) {
      const frame = typeof sound === "object" && sound !== null ? sound : { mode: "system" };
      const selfPlay = frame.mode === "selfplay";
      const baseSilent = frame.mode === "silent" || selfPlay;
      const tone = typeof frame.tone === "string" ? frame.tone : void 0;
      if (playOnly && frame.mode === "system") {
        return { selfPlay: true, silent: true, tone };
      }
      return { selfPlay, silent: baseSilent, tone };
    }
    function fallbackChannelOf(playOnly, visibility) {
      if (playOnly) return "none";
      return visibility !== "hidden" ? "banner" : "title";
    }
    function displayChannelOf(input) {
      if (!input.playOnly && input.notificationUsable) return "notification";
      return fallbackChannelOf(input.playOnly, input.visibility);
    }
    function frameAccepted(input) {
      if (input.kind === "test") return true;
      if (input.visibility !== "hidden" && input.whenVisible !== true) {
        return input.playOnly === true;
      }
      return true;
    }

    // src/client/index.tsx
    var React15 = __toESM(require("react"), 1);

    // src/client/locales.ts
    var zh = {
      // 事件开关 (EVENT_KEYS label)
      evtAsk: "审批等待",
      evtQuestion: "向你提问",
      evtTaskDone: "任务完成",
      evtSubagentDone: "子任务完成",
      evtTaskError: "任务出错",
      evtTurnEnd: "轮次完成",
      evtTurnEndHint: "轮次完成每轮都触发, 非常频繁, 默认关闭; 开启后可能与任务完成通知相邻; 若同时投递多个频道, 各频道会分别提醒 (仍受节流与路由约束).",
      // 通道开关 (CHANNEL_KEYS label)
      chSystemNotify: "系统通知",
      chBrowserNotify: "浏览器通知",
      chWhenVisible: "页面可见时也弹",
      chPopup: "弹窗",
      chSound: "声音",
      // 每通道声音行与三态
      chStateOn: "启用",
      chStateSound: "仅声音",
      chStateOff: "已停用",
      chSoundFollow: "跟随系统默认",
      chSoundFollowHint: "系统卡: Windows 用系统通知音 / macOS Glass / Linux 自播默认事件音; 浏览器卡: 交给操作系统发声 (不 silent).",
      chSoundTone: "音色",
      chSoundPreview: "试听",
      chSoundOnlyNote: "弹窗已关, 声音开启: 本频道只响不弹 (不打扰界面).",
      chPopupSoundOffNote: "弹窗与声音都已关闭: 本频道不会有任何提醒 (要停用请用卡头开关, 它是唯一的«发不发»判据).",
      toneDing: "叮 (Ding)",
      toneBell: "铃 (Bell)",
      toneChime: "钟琴 (Chime)",
      tonePop: "啵 (Pop)",
      sysPlatformWin: "宿主平台 Windows: 系统提示音走 toast 系统音; 选音色后经 SoundPlayer 播放内置 wav (近似映射, 与系统设置音可不同).",
      sysPlatformMac: "宿主平台 macOS: 系统提示音经 osascript/NSSound (Glass/Tink/Sosumi/Pop 近似映射), 受系统«允许通知声音»设置约束.",
      sysPlatformLinux: "宿主平台 Linux: 不依赖桌面守护进程的发声支持——声音由插件自播, 按 paplay → pw-play → aplay → ffplay 依次回退且首个成功即停; 主题事件音缺失时改用运行时合成的提示音.只命中 paplay/pw-play 时, 没有声音服务的宿主听不到声音 (两种情形都仍需宿主有音频设备).",
      sysPlatformOther: "系统提示音随宿主平台尽力而为; 此处试听为浏览器本地合成, 仅作听感参考.",
      // kind 标签 (历史列表)
      kAsk: "审批等待",
      kQuestion: "向你提问",
      kDone: "任务完成",
      kSubagentDone: "子任务完成",
      kError: "任务出错",
      kTurnEnd: "轮次完成",
      kTest: "测试",
      // 403 引导 (accessHint)
      lanAccessHint: " (若为局域网直连访问: 请先通过 dsh web 打印的登录地址建立官方会话, 并确认 Host/Origin 与当前地址一致; 仍无法访问时可用 SSH 端口转发到回环地址)",
      // 设置卡
      settingsLoading: "通知: 加载中…",
      settingsUnavailable: "设置服务不可用",
      loadFail: "设置加载失败: {msg}{hint}",
      unchanged: "未修改",
      savedOk: "已保存",
      conflictReloadFail: "冲突恢复失败: 未能拉取最新配置, 请重试保存",
      saveFail: "保存失败: {msg}",
      saveTimeout: "保存超时: 网络请求未在 15 秒内完成, 请重试",
      // 409 冲突双动作横幅
      conflictTitle: "配置已在其他窗口被修改: ",
      conflictChannels: "频道配置已在其他窗口被修改: ",
      conflictLoadLatest: "加载最新 (放弃我的修改)",
      conflictOverwrite: "保留我的修改并覆盖",
      conflictIgnore: "忽略",
      conflictLoadedLatest: "已加载最新配置",
      // 测试/清理动作
      testSent: "测试通知已发送 (服务端未释放句柄 {n} 条)",
      testFail: "发送测试通知失败: {msg}{hint}",
      // 请求层失败 (400/408/429/中断)走独立结果行, 那一行此前直接写英文 `failure.message` (#1016 残留 4).
      // 形态与 testFail 同族: 本地化前缀 + 原文细节, `{msg}` 留宿主原话供排查.
      testRequestFail: "测试请求失败: {msg}{hint}",
      cleared: "已清空 {n} 条通知记录",
      clearFail: "清空失败: {msg}{hint}",
      // 配置行
      historyRetention: "历史保留天数 (0=不按天清理)",
      dndEnable: "启用免打扰",
      dndStart: "开始时间",
      dndEnd: "结束时间",
      dndStillLabel: "免打扰仍提醒",
      // 免打扰豁免候选: label 复用事件文案 (KIND_KEYS), 另加未启用提示与快捷项
      allowDisabledHint: "事件未启用",
      allowFollowEnabled: "跟随已启用事件",
      allowResetDefault: "恢复默认 (审批/提问/出错)",
      // 免打扰多时间窗 (#936): 时段增删与本机回显
      dndAddWindow: "添加时段",
      dndRemoveWindow: "删除该时段",
      dndWindow: "时段 {n}",
      dndEmptyHint: "暂无时段: 免打扰不会拦截任何通知",
      dndLimitHint: "最多 5 个时段",
      dndPreviewHit: "当前 {now} 落在 {start}–{end} 内",
      dndPreviewMiss: "当前 {now} 不在免打扰时段内",
      dndPreviewOff: "免打扰未启用",
      dndPreviewNote: "按本机时间推算, 仅供参考; 实际是否拦截以服务端裁决与通知记录为准",
      // 权限/降级说明
      settingsSvcDown: "设置服务不可用: 当前无法保存配置 (settings 服务未挂载).插件通知功能不受影响, 但更改将被拒绝.",
      httpDegraded: "当前为局域网 HTTP 访问 (非安全上下文), 浏览器禁止系统级弹窗, 已启用«页面内横幅 + 提示音 + 标题提醒»降级通道.如需系统弹窗, 请改用提供有效证书的原生 HTTPS 地址, 并在设备上信任该证书后刷新页面.",
      permGranted: "浏览器通知权限: 已授权 ✓",
      permDenied: "浏览器通知权限: 已拒绝.未授权时不会弹浏览器系统通知; 页面隐藏时只更新标题, 页面可见且通知策略允许时显示页内横幅.请在浏览器站点设置中允许本页通知.",
      permDefault: "浏览器通知权限: 未授权.未授权时不会弹浏览器系统通知; 页面隐藏时只更新标题, 页面可见且通知策略允许时显示页内横幅.可点击下方按钮请求授权.",
      iosUnsupported: "当前设备不支持系统级通知 (如 iOS Safari 普通标签页无 Web Notifications).可用通道: 页面可见时的横幅 + 提示音 (需保持页面打开); 如需系统通知, 请改用提供有效证书的原生 HTTPS 地址, 信任证书后将页面添加到主屏幕.",
      // 动作区
      clearConfirm: "确认清理记录？",
      clearLabel: "清理记录",
      requestPerm: "请求通知权限",
      permRequested: "权限请求完成",
      sendTest: "发送测试通知",
      refresh: "刷新",
      // 历史区
      historyTitle: "通知记录 (最近 10 条)",
      historyEmpty: "暂无通知记录 (点«发送测试通知»可生成一条)",
      historySuppressed: "免打扰拦截未发出",
      // 逐出口投递明细 (通知记录里展开到«这一条投递到了哪些出口, 各自结论»)
      chStatusOk: "已投递",
      chStatusFailed: "投递失败",
      chStatusSkipped: "未发出",
      reasonDetailLabel: "来自宿主原文",
      // 投递理由: 服务端只给 code, 文案在这里 (本包 code 与 key 同名, 见 reason-text.ts 的完整表)
      reasonLegacy: "升级前的记录",
      reasonUnknown: "原因未知 (未能识别这条记录)",
      reasonSkipConfig: "弹窗与声音都已关闭, 本次没有可投递的内容",
      reasonSkipEnvironment: "本机没有可用的通知通道 (缺系统通知工具或音频播放器), 本次未发出",
      reasonSystemPopupFailed: "系统通知命令执行失败 ({bin})",
      reasonSystemSoundFailed: "提示音播放命令执行失败 ({bin})",
      reasonSystemToastScriptMissing: "插件自带的 Windows 通知脚本缺失 (打包缺陷), 本次未发出",
      reasonSystemToneUnwritable: "系统提示音无法写入临时目录, 本次未发声",
      // 声音警告 (ok 随行): 主 reason 的同名 code 在失败/跳过支上另有文案 (见上), 警告位必须用
      // 自有上下文——复用它们会把«弹窗已发出»说成«本次未发出».
      soundWarnPlaybackFailed: "提示音播放命令执行失败 ({bin}, 弹窗已发送)",
      soundWarnToneUnwritable: "提示音未能准备 (临时文件写不进去, 本次仅弹窗成功)",
      soundWarnNoPlayback: "提示音无法执行 (缺少可用播放器或音频素材, 本次仅弹窗成功)",
      reasonBarkRequestFailed: "Bark 请求失败 (网络或超时)",
      reasonBarkHttp: "Bark 服务返回 HTTP {status}",
      reasonBarkRejected: "Bark 拒绝这次推送 (业务码 {code})",
      reasonBarkBodyUnreadable: "Bark 响应体读取失败 (推送可能已经发出)",
      reasonWebhookTemplateInvalid: "Webhook 模板渲染失败 (模板不是合法 JSON)",
      reasonWebhookRequestFailed: "Webhook 请求失败 (网络或超时)",
      reasonWebhookHttp: "Webhook 目标返回 HTTP {status}",
      reasonUnknownTarget: "未知的投递目标类型 ({kind})",
      reasonChannelThrew: "投递出口内部错误",
      reasonThrottled: "距上一条不足 1 秒, 本次未投递 (结论见上一条记录)",
      reasonDispatchCanceled: "插件卸载时这条还在排队, 未投递",
      // 分区/tab (设置卡 title/副标题已移除; secEvents/secChannels 现为
      // 卡内双 tab 文案, 术语统一为«通知频道»)
      secEvents: "通知事件",
      secChannels: "通知频道",
      secDedup: "参数上限",
      tabLabel: "通知中心",
      save: "保存",
      saving: "保存中…",
      saveChannels: "保存频道",
      channelsDomainHint: "仅保存频道改动, 不影响事件/参数等未保存修改",
      // ===== 频道卡 =====
      chTest: "发送测试",
      // dry-run (#912 症状1): 有脏时测试按钮切文案 + 徽标 + title, 结果行打标未落盘
      chTestDraft: "用未保存配置测试",
      chTestDraftTitle: "用当前未保存的草稿实测 (不保存, 不落盘)",
      chTestDraftBadge: "未存",
      dryRunTag: "草稿测试·未落盘",
      dryRunPending: "草稿测试中…",
      dryRunGoSave: "去保存",
      dryRunDiscard: "放弃草稿",
      dryRunNote: "草稿实测: 只测当前草稿, 不保存, 不记历史与状态; 浏览器通道不真弹, 以本行结论为准; 重复点击会重复外发; 超时中断后对方若实际收到, 不会出现在历史与状态里.",
      chLastOk: "最近投递成功",
      chLastFail: "最近投递失败",
      chNeverSent: "尚未投递",
      chSkippedSeeHistory: " (详情见通知记录)",
      chAdvanced: "高级参数",
      chDelete: "删除",
      chDeleteConfirm: "确认删除？再次点击执行",
      chAddBark: "添加 Bark 推送",
      chBarkName: "显示名称",
      chBarkNamePlaceholder: "如: 我的 iPhone",
      chBarkBaseUrl: "服务器地址",
      chBarkBaseUrlHint: "Bark 服务器地址 (http/https), 如 https://api.day.app 或自建地址",
      chBarkDeviceKey: "Device Key",
      chBarkDeviceKeyPlaceholder: "粘贴 Bark App 里的 Device Key",
      chBarkDeviceKeyHint: "Bark App 内查看; 留空即不修改已保存的值, 输入新值将替换",
      chBarkSound: "铃声 sound",
      chBarkGroup: "分组 group",
      chBarkGroupHint: "同组通知在手机上折叠展示",
      chBarkIcon: "图标 icon",
      chBarkIconHint: "图片 URL, 需手机网络可访问; iOS 17+ 支持 SVG; 留空用 Bark 默认图标",
      chBarkUrl: "跳转 url",
      chBarkBadge: "角标 badge",
      chBarkLevel: "默认紧急度 level",
      chBarkLevelHint: "实例级紧急度 (缺省按事件强度自动映射); 下方«按类型紧急度映射»命中时优先于本项",
      chLevelAuto: "按事件强度自动映射",
      // ===== levels (kind→level 稀疏映射矩阵)=====
      chLevelsHint: "按事件类型指定 Bark 紧急度, 优先于«默认紧急度»与自动映射; 未配置的类型走默认",
      chLevelsKindPlaceholder: "如 question",
      chLevelsAdd: "添加映射",
      chLevelsRemove: "移除",
      chLevelsEmpty: "未配置按类型映射 (全部事件走默认紧急度)",
      chLevelsUnknown: "未知事件类型 (可能不生效, 请确认拼写)",
      // ===== 路由复选组 =====
      // ===== 动态 kind 确认 =====
      kindsTitle: "通知类型",
      kindsHint: "其他插件注册的通知类型需你确认后才会投递",
      kindAllow: "允许",
      kindDeny: "拒绝",
      kindsEmpty: "没有待处理的通知类型",
      // ===== 保存/测试反馈 =====
      testChannelOk: "测试已受理 (投递结果见«通知记录»)",
      kindConfirmOk: "已更新通知类型确认状态",
      kindConfirmFail: "确认失败: {msg}",
      chNewBarkName: "Bark 推送",
      // ===== 三 tab / switch / 路由 chips / 脏状态保存栏 =====
      secHistory: "通知记录",
      evtSwitch: "事件开关: {name}",
      chToggleOn: "启用频道: ",
      chToggleOff: "停用频道: ",
      chTypeBuiltin: "内置",
      kindRevoke: "撤销允许",
      routeCap: "投递到",
      routeDefaultState: "跟随默认 · 全部启用频道",
      routeDefaultStateTitle: "未自定义路由: 投递到全部已启用频道 (随频道启停动态变化)",
      routeCustomState: "自定义 · {n} 频道 · 恢复默认",
      routeCustomStateTitle: "已自定义路由 (冻结快照); 点击恢复跟随默认",
      routeStaleChip: "已删除",
      routeStaleTitle: "该频道已删除, 路由条目残留; 投递时自动跳过 (残留条目不会自动移除)",
      routeDisabledHint: "频道未启用: 先在上方«通知频道»启用后才能配置投递",
      dirtySome: "有 {n} 处未保存修改",
      dirtyDomains: "事件与频道均有未保存修改",
      dirtyChannels: "频道有未保存修改",
      routeExpandHint: "展开投递",
      discardChanges: "放弃更改",
      discardOk: "已放弃未保存修改",
      secretShow: "显示",
      secretHide: "隐藏",
      // ===== 动态 kind 路由 =====
      kindRouteHint: "允许后可像内置事件一样配置投递频道",
      // ===== webhook 频道 (安卓推送) =====
      chAddWebhook: "添加 Webhook (安卓 / 自建)",
      chNewWebhookName: "Webhook 推送",
      whPreset: "预设",
      whPresetNtfy: "ntfy (ntfy.sh 或自建)",
      whPresetGotify: "Gotify",
      whPresetCustom: "自建推送网关",
      whPresetHint: "预设填充认证方式与消息模板; ntfy 发往服务根地址 (旧 topic URL 自动兼容改写)",
      whUrl: "目标 URL",
      whUrlPlaceholder: "https://ntfy.sh/ (topic 写进模板)",
      whUrlHint: "POST JSON; ntfy 发往服务根地址, 模板内填真实 topic, 旧 topic URL 自动兼容 (末段明确时改写为根地址), 自托管前缀根地址原样保留; 仅允许 http(s) 且 URL 不得内嵌凭据; ntfy 主题名建议带随机后缀防遍历",
      whAuth: "认证",
      whAuthNone: "无",
      whAuthBearer: "Bearer Token (Authorization 头)",
      whAuthBasic: "Basic 用户名/密码",
      whAuthHeader: "自定义请求头",
      whAuthHint: "Bearer 模式只填裸 token (不含 Bearer 前缀, 插件自动添加); 自定义请求头的值则原样发送; 凭据仅走请求头, 不拼 URL, 仅在本机保存且掩码回显; 留空保持已保存凭据",
      whAuthToken: "裸 token (不含 Bearer 前缀)",
      whAuthUsername: "用户名",
      whAuthPassword: "密码",
      whAuthHeaderName: "请求头名 (如 X-Gotify-Key)",
      whAuthHeaderValue: "原样发送的请求头值",
      whTimeout: "投递超时",
      whTimeoutHint: "秒 · 1–60 (超限按边界取值, 默认 10); 超时与失败均落记录, 不自动重试",
      whTemplate: "消息模板 (JSON body, 占位符点击插入)",
      whTemplateHint: "ntfy 发往服务根地址, 模板内须填真实 topic; {{priority}} 由服务端按频道映射渲染 (ntfy 数字: info→3 / success→2 / warning→4 / failure→5; gotify 沿用既有映射); 文本占位符 JSON-aware 转义, {{ts}} 数字直出",
      whTemplateFailHint: "模板非法或渲染失败按该频道投递失败落记录, 不阻断其他频道",
      whTplRestore: "恢复预设模板",
      // ===== 能力自检 (宿主能力面读 /diagnostics, 浏览器面在本页本地判定)=====
      diagHostLine: "宿主能力自检: {verdict} · 弹窗 {popup} · 声音 {sound}",
      diagVerdictOk: "可用",
      diagVerdictDegraded: "降级可用",
      diagVerdictUnreachable: "不可用",
      diagVerdictUnknown: "无法判定",
      diagDimPopup: "弹窗",
      diagDimSound: "声音",
      diagUnknownLine: "以下维度无法判定: {dimensions}",
      diagRemediationTitle: "处置建议",
      diagRemediationUnknown: "宿主给出了一条本版本客户端不认识的处置建议, 请升级插件后重试",
      diagRemHostNoDbusSession: "宿主没有 D-Bus 会话总线: 系统弹窗需要桌面会话 (图形登录)或由 dbus-launch 提供的会话总线",
      diagRemHostPopupNoDaemon: "宿主有 notify-send 但没有通知守护进程: 安装并启动一个桌面通知服务 (如 dunst, mako)后弹窗才可见",
      diagRemHostNoNotifySend: "宿主缺少 notify-send: 安装提供它的通知工具 (Debian/Ubuntu 上是 libnotify-bin, Fedora/Arch 上是 libnotify)后弹窗才可见",
      diagRemHostNoSoundServerAndPlayer: "宿主没有探测到任何可用播放器: 安装 {packages} ({packagemanager})后可自播默认事件音 (dnf 系上 ffmpeg 来自 RPM Fusion)",
      diagRemHostNoSoundServerAndPlayerNoPkg: "宿主没有探测到任何可用播放器: 安装一个不依赖声音服务的播放器 (如 alsa-utils 或 ffmpeg)后可自播默认事件音",
      diagRemHostOnlySoundServerPlayers: "宿主只探测到依赖声音服务的播放器 (paplay / pw-play): 安装 {packages} ({packagemanager})后可直连 ALSA 自播默认事件音 (dnf 系上 ffmpeg 来自 RPM Fusion)",
      diagRemHostOnlySoundServerPlayersNoPkg: "宿主只探测到依赖声音服务的播放器 (paplay / pw-play): 安装一个不依赖声音服务的播放器 (如 alsa-utils 或 ffmpeg)后可直连 ALSA 自播默认事件音",
      diagRemHostNoPlayer: "宿主有声音服务但缺少播放器: 安装对应播放器后可自播默认事件音",
      diagRemHostNoToneFile: "宿主缺少默认事件音色文件: 补齐该平台的音色资源后可自播默认事件音 (Linux 上主题缺失会改用合成提示音, 不再走这条建议)",
      diagRemHostManagedByOthers: "弹窗与发声都已由宿主上的其他组件接管: 本插件的系统通道在这台机器上会静默跳过, 请改用浏览器通知或移动端推送",
      diagDetailsLabel: "探测明细与来源",
      diagSourceHost: "来源: 宿主能力自检 (GET /api/dsh-notifier/diagnostics, 服务端所在机器)",
      diagSourceBrowser: "来源: 本页浏览器本地判定",
      diagCheckedLabel: "已探测",
      diagPlayersLabel: "候选播放器",
      diagToneFileLabel: "音色文件",
      diagToneFileYes: "已就位",
      diagToneFileNo: "缺失",
      diagNone: "无",
      diagCheckedNotifySend: "notify-send 命令",
      diagCheckedDbusNameOwner: "D-Bus 名称所有者",
      diagCheckedDbusActivatable: "D-Bus 可激活服务",
      diagCheckedSessionBus: "会话总线",
      diagCheckedPlayers: "播放器候选",
      diagCheckedToneFile: "音色文件",
      diagBrowserLine: "本页浏览器: 弹窗 {popup} · 声音 {sound}",
      diagBrowserNoNotificationApi: "此浏览器没有通知 API, 系统级弹窗不可用",
      diagBrowserInsecureContext: "非安全上下文 (明文 HTTP), 浏览器禁止系统级弹窗",
      diagBrowserPermissionDenied: "未授权时不会弹浏览器系统通知; 页面隐藏时只更新标题, 页面可见且通知策略允许时显示页内横幅.权限已被拒绝, 请在浏览器站点设置中允许",
      diagBrowserPermissionDefault: "未授权时不会弹浏览器系统通知; 页面隐藏时只更新标题, 页面可见且通知策略允许时显示页内横幅.权限尚未请求, 可点«请求通知权限»授权",
      diagBrowserAudioNeverUnlocked: "音频尚未解锁: 页面还没有过用户点击, 点击页面后即可自播",
      diagBrowserAudioAutoSuspended: "音频上下文被浏览器挂起: 曾经解锁过, 或本次恢复被浏览器拒绝, 下次用户交互时会再尝试",
      diagBrowserAudioClosed: "音频上下文已关闭, 本页生命周期内无法再自播提示音",
      diagBrowserAudioUnsupported: "此浏览器不支持 Web Audio, 插件无法自播提示音"
    };
    var en = {
      evtAsk: "Approval pending",
      evtQuestion: "Question for you",
      evtTaskDone: "Task completed",
      evtSubagentDone: "Subtask completed",
      evtTaskError: "Task failed",
      evtTurnEnd: "Turn completed",
      evtTurnEndHint: "Turn completions fire every turn and are very frequent, so this stays off by default; once enabled, they may sit next to Task completed notifications; delivering to multiple channels reminds once per channel (still subject to throttling and routing).",
      chSystemNotify: "System notification",
      chBrowserNotify: "Browser notification",
      chWhenVisible: "Also banner when visible",
      chPopup: "Popup",
      chSound: "Sound",
      chStateOn: "Enabled",
      chStateSound: "Sound only",
      chStateOff: "Disabled",
      chSoundFollow: "Follow system default",
      chSoundFollowHint: "System card: Windows uses the toast system sound / macOS Glass / Linux self-plays the default event sound; browser card: lets the OS play (not silent).",
      chSoundTone: "Tone",
      chSoundPreview: "Preview",
      chSoundOnlyNote: "Popup off, sound on: this channel plays sound only (no popup).",
      chPopupSoundOffNote: "Popup and sound are both off: this channel shows nothing (use the header switch to disable it — the switch is the only send/don't-send gate).",
      toneDing: "Ding",
      toneBell: "Bell",
      toneChime: "Chime",
      tonePop: "Pop",
      sysPlatformWin: "Host platform Windows: system sound uses the toast default; with a tone selected it plays a built-in wav via SoundPlayer (approximate mapping, may differ from system-settings sounds).",
      sysPlatformMac: 'Host platform macOS: system sound goes through osascript/NSSound (Glass/Tink/Sosumi/Pop approximate mapping), subject to the system "Allow notification sounds" setting.',
      sysPlatformLinux: "Host platform Linux: does not rely on desktop daemon sound support — the plugin self-plays, falling back through paplay → pw-play → aplay → ffplay and stopping at the first success; when the themed event sound is missing it uses a tone synthesized at runtime. When only paplay/pw-play are found, a host without a sound server stays silent (both cases still need an audio device on the host).",
      sysPlatformOther: "System sound is best-effort on the host platform; the preview here is synthesized locally in your browser as a listening reference.",
      kAsk: "Approval pending",
      kQuestion: "Question for you",
      kDone: "Task completed",
      kSubagentDone: "Subtask completed",
      kError: "Task failed",
      kTurnEnd: "Turn completed",
      kTest: "Test",
      lanAccessHint: " (If you are on a LAN connection: first establish an official session through the login URL printed by dsh web, and make sure Host/Origin match the current address; an SSH tunnel to the loopback address remains a fallback)",
      settingsLoading: "Notifier: loading…",
      settingsUnavailable: "Settings service unavailable",
      loadFail: "Failed to load settings: {msg}{hint}",
      unchanged: "No changes",
      savedOk: "Saved",
      conflictReloadFail: "Conflict recovery failed: could not fetch the latest config — retry saving",
      saveFail: "Save failed: {msg}",
      saveTimeout: "Save timed out: request did not complete within 15s, please retry",
      // 409 conflict resolution banner
      conflictTitle: "Configuration was changed in another window:",
      conflictChannels: "Channel configuration was changed in another window:",
      conflictLoadLatest: "Load latest (discard my changes)",
      conflictOverwrite: "Keep my changes and overwrite",
      conflictIgnore: "Ignore",
      conflictLoadedLatest: "Loaded latest configuration",
      testSent: "Test notification sent ({n} unreleased server handles)",
      testFail: "Failed to send test notification: {msg}{hint}",
      testRequestFail: "Test request failed: {msg}{hint}",
      cleared: "Cleared {n} history entries",
      clearFail: "Clear failed: {msg}{hint}",
      historyRetention: "History retention (days, 0=no daily cleanup)",
      dndEnable: "Enable do-not-disturb",
      dndStart: "Start time",
      dndEnd: "End time",
      dndStillLabel: "Still notify during DND",
      allowDisabledHint: "Not enabled",
      allowFollowEnabled: "Follow enabled events",
      allowResetDefault: "Reset default (approval/question/error)",
      dndAddWindow: "Add window",
      dndRemoveWindow: "Remove this window",
      dndWindow: "Window {n}",
      dndEmptyHint: "No windows: do-not-disturb will not suppress anything",
      dndLimitHint: "Up to 5 windows",
      dndPreviewHit: "Now {now} falls inside {start}–{end}",
      dndPreviewMiss: "Now {now} is outside the do-not-disturb windows",
      dndPreviewOff: "Do-not-disturb is off",
      dndPreviewNote: "Estimated from this device clock, for reference only; actual suppression follows the server verdict and history",
      settingsSvcDown: "Settings service unavailable: cannot save configuration (settings service not mounted). Plugin notifications are unaffected, but changes will be rejected.",
      httpDegraded: "You are on a LAN HTTP connection (insecure context) — the browser blocks system notifications; in-page banner + sound + title reminders are active instead. For system notifications, switch to a native HTTPS address with a valid certificate, trust it on this device, then refresh the page.",
      permGranted: "Browser notification permission: granted ✓",
      permDenied: "Browser notification permission: denied. Without permission, browser system notifications cannot appear; while the page is hidden, only the title is updated. When the page is visible, an in-page banner appears only if the notification policy allows it. Allow notifications for this site in the browser site settings.",
      permDefault: "Browser notification permission: not granted. Without permission, browser system notifications cannot appear; while the page is hidden, only the title is updated. When the page is visible, an in-page banner appears only if the notification policy allows it. Click the button below to request permission.",
      iosUnsupported: "This device does not support system notifications (e.g. iOS Safari in a normal tab). Available channels: in-page banner + sound while the page is open. For system notifications, switch to a native HTTPS address with a valid certificate, trust it on this device, then add the page to Home Screen.",
      clearConfirm: "Clear history?",
      clearLabel: "Clear history",
      requestPerm: "Request permission",
      permRequested: "Permission request completed",
      sendTest: "Send test notification",
      refresh: "Refresh",
      historyTitle: "History (last 10)",
      historyEmpty: 'No history yet (click "Send test notification" to create one)',
      historySuppressed: "Suppressed by do-not-disturb",
      chStatusOk: "Delivered",
      chStatusFailed: "Failed",
      chStatusSkipped: "Not sent",
      reasonDetailLabel: "Raw host output",
      reasonLegacy: "Recorded before upgrade",
      reasonUnknown: "Reason unknown (unrecognized record)",
      reasonSkipConfig: "Popup and sound are both off — nothing to deliver this time",
      reasonSkipEnvironment: "No usable notification channel on this host (no system notifier or audio player); nothing was sent",
      reasonSystemPopupFailed: "System notification command failed ({bin})",
      reasonSystemSoundFailed: "Sound playback command failed ({bin})",
      reasonSystemToastScriptMissing: "The plugin's bundled Windows notification script is missing (packaging defect); nothing was sent",
      reasonSystemToneUnwritable: "Could not write the synthesized tone to the temp directory; nothing was played",
      // Sound warnings (carried by ok): the same codes have different copies on the failed/skipped
      // branch (see above) — reusing them would describe an issued popup as "nothing was sent".
      soundWarnPlaybackFailed: "Sound playback command failed ({bin}); the popup was sent",
      soundWarnToneUnwritable: "Could not prepare the sound (temp file unwritable; only the popup succeeded)",
      soundWarnNoPlayback: "Could not play the sound (no usable player or audio material; only the popup succeeded)",
      reasonBarkRequestFailed: "Bark request failed (network or timeout)",
      reasonBarkHttp: "Bark server returned HTTP {status}",
      reasonBarkRejected: "Bark rejected this push (business code {code})",
      reasonBarkBodyUnreadable: "Could not read the Bark response body (the push may have gone through)",
      reasonWebhookTemplateInvalid: "Webhook template rendering failed (template is not valid JSON)",
      reasonWebhookRequestFailed: "Webhook request failed (network or timeout)",
      reasonWebhookHttp: "Webhook target returned HTTP {status}",
      reasonUnknownTarget: "Unknown delivery target type ({kind})",
      reasonChannelThrew: "Delivery channel raised an internal error",
      reasonThrottled: "Less than 1s since the previous one; not delivered (see the previous record)",
      reasonDispatchCanceled: "Still queued when the plugin was unloaded; not delivered",
      secEvents: "Events",
      secChannels: "Channels",
      secDedup: "Limits",
      tabLabel: "Notification center",
      save: "Save",
      saving: "Saving…",
      saveChannels: "Save channels",
      channelsDomainHint: "Saves channel changes only; other unsaved edits stay untouched",
      chTest: "Send test",
      chTestDraft: "Test with unsaved draft",
      chTestDraftTitle: "Deliver once with the current unsaved draft (nothing is saved or persisted)",
      chTestDraftBadge: "unsaved",
      dryRunTag: "Draft test · not persisted",
      dryRunPending: "Draft test running…",
      dryRunGoSave: "Go save",
      dryRunDiscard: "Discard draft",
      dryRunNote: "Draft test: tests the current draft only; nothing is saved and no history or status is recorded; the browser channel does not really notify — this row is the verdict; repeated clicks send repeatedly; if the peer actually received a timed-out test, it will not appear in history or status.",
      chLastOk: "Last delivery OK",
      chLastFail: "Last delivery failed",
      chNeverSent: "Not delivered yet",
      chSkippedSeeHistory: "(see History for details)",
      chAdvanced: "Advanced",
      chDelete: "Delete",
      chDeleteConfirm: "Confirm delete? Click again",
      chAddBark: "Add Bark push",
      chBarkName: "Display name",
      chBarkNamePlaceholder: "e.g. My iPhone",
      chBarkBaseUrl: "Server URL",
      chBarkBaseUrlHint: "Bark server URL (http/https), e.g. https://api.day.app or self-hosted",
      chBarkDeviceKey: "Device Key",
      chBarkDeviceKeyPlaceholder: "Paste the Device Key from the Bark app",
      chBarkDeviceKeyHint: "Find it in the Bark app; leave empty to keep the saved value, type a new one to replace it",
      chBarkSound: "Sound",
      chBarkGroup: "Group",
      chBarkGroupHint: "Notifications of the same group collapse on the phone",
      chBarkIcon: "Icon",
      chBarkIconHint: "Image URL reachable from the phone; SVG needs iOS 17+; empty uses Bark default",
      chBarkUrl: "URL to open",
      chBarkBadge: "Badge",
      chBarkLevel: "Default level",
      chBarkLevelHint: 'Instance-level urgency (auto-mapped from event severity when unset); a matching row in "Per-type level map" below wins over this',
      chLevelAuto: "Auto-map from event severity",
      chLevelsHint: "Set a Bark urgency per event type; takes precedence over the default level and auto-mapping. Types without a row use the default",
      chLevelsKindPlaceholder: "e.g. question",
      chLevelsAdd: "Add mapping",
      chLevelsRemove: "Remove",
      chLevelsEmpty: "No per-type mapping (all events use the default level)",
      chLevelsUnknown: "Unknown event type (may not take effect — check the spelling)",
      kindsTitle: "Notification types",
      kindsHint: "Types registered by other plugins are delivered only after your confirmation",
      kindAllow: "Allow",
      kindDeny: "Deny",
      kindsEmpty: "No notification types to review",
      testChannelOk: 'Test accepted (the delivery result appears under "History")',
      kindConfirmOk: "Notification type confirmation updated",
      kindConfirmFail: "Confirmation failed: {msg}",
      chNewBarkName: "Bark push",
      // ===== tabs / switch / routing chips / dirty-save bar =====
      secHistory: "History",
      evtSwitch: "Event toggle: {name}",
      chToggleOn: "Enable channel: ",
      chToggleOff: "Disable channel: ",
      chTypeBuiltin: "Built-in",
      kindRevoke: "Revoke",
      routeCap: "Deliver to",
      routeDefaultState: "Follow default · all enabled channels",
      routeDefaultStateTitle: "Not customized: delivered to all enabled channels (dynamic as channels toggle)",
      routeCustomState: "Custom · {n} channels · reset",
      routeCustomStateTitle: "Route customized (frozen snapshot); click to reset to default",
      routeStaleChip: "deleted",
      routeStaleTitle: "This channel was deleted but its route entry remains; skipped at delivery (the stale entry is not removed automatically)",
      routeDisabledHint: "Channel not enabled: enable it under Notify channels first to configure delivery",
      dirtySome: "{n} unsaved change(s)",
      dirtyDomains: "Events and channels both have unsaved changes",
      dirtyChannels: "Channels have unsaved changes",
      routeExpandHint: "Expand routes",
      discardChanges: "Discard changes",
      discardOk: "Unsaved changes discarded",
      secretShow: "Show",
      secretHide: "Hide",
      // ===== dynamic kind routes =====
      kindRouteHint: "Once allowed, delivery channels can be configured like built-in events",
      // ===== webhook channel (Android push) =====
      chAddWebhook: "Add Webhook (Android / custom)",
      chNewWebhookName: "Webhook push",
      whPreset: "Preset",
      whPresetNtfy: "ntfy (ntfy.sh or self-hosted)",
      whPresetGotify: "Gotify",
      whPresetCustom: "Custom push gateway",
      whPresetHint: "Preset fills the auth method and message template; ntfy publishes to the service root URL (legacy topic URLs are auto-rewritten)",
      whUrl: "Target URL",
      whUrlPlaceholder: "https://ntfy.sh/ (put the topic in the template)",
      whUrlHint: "POST JSON; ntfy publishes to the service root URL with the real topic in the template, legacy topic URLs are auto-compat (rewritten to the root when the trailing segment is unambiguous), and self-hosted prefixed roots are kept as-is; http(s) only, no embedded credentials in the URL; add a random suffix to ntfy topic names",
      whAuth: "Auth",
      whAuthNone: "None",
      whAuthBearer: "Bearer Token (Authorization header)",
      whAuthBasic: "Basic username/password",
      whAuthHeader: "Custom header",
      whAuthHint: "Bearer mode takes a raw token only (no Bearer prefix; the plugin adds it); custom header values are sent exactly as entered; credentials stay in headers, never URLs; stored locally and shown masked; leave empty to keep the saved value",
      whAuthToken: "Raw token (without Bearer prefix)",
      whAuthUsername: "Username",
      whAuthPassword: "Password",
      whAuthHeaderName: "Header name (e.g. X-Gotify-Key)",
      whAuthHeaderValue: "Header value (sent verbatim)",
      whTimeout: "Delivery timeout",
      whTimeoutHint: "seconds · 1–60 (clamped, default 10); timeouts and failures are recorded, no auto-retry",
      whTemplate: "Message template (JSON body, click to insert placeholders)",
      whTemplateHint: "ntfy publishes to the service root URL with the real topic in the template; {{priority}} is rendered by the server per-channel map (ntfy numbers: info→3 / success→2 / warning→4 / failure→5; gotify keeps its existing map); text placeholders are JSON-aware escaped, {{ts}} is raw number",
      whTemplateFailHint: "Invalid template or render failure counts as a failed delivery for this channel only; other channels are unaffected",
      whTplRestore: "Reset preset template",
      diagHostLine: "Host capability self-check: {verdict} · popup {popup} · sound {sound}",
      diagVerdictOk: "available",
      diagVerdictDegraded: "degraded",
      diagVerdictUnreachable: "unavailable",
      diagVerdictUnknown: "undetermined",
      diagDimPopup: "Popup",
      diagDimSound: "Sound",
      diagUnknownLine: "These capabilities could not be determined: {dimensions}",
      diagRemediationTitle: "Suggested fixes",
      diagRemediationUnknown: "The host reported a fix this client version does not recognize; update the plugin and retry",
      diagRemHostNoDbusSession: "The host has no D-Bus session bus: system popups need a desktop session (graphical login) or a session bus from dbus-launch",
      diagRemHostPopupNoDaemon: "The host has notify-send but no notification daemon: install and start a desktop notification service (e.g. dunst, mako) for popups to appear",
      diagRemHostNoNotifySend: "The host is missing notify-send: install a notification tool that provides it (libnotify-bin on Debian/Ubuntu, libnotify on Fedora/Arch) and popups become visible",
      diagRemHostNoSoundServerAndPlayer: "The host exposed no usable player: install {packages} ({packagemanager}) to self-play the default event sound (on dnf-family hosts ffmpeg comes from RPM Fusion)",
      diagRemHostNoSoundServerAndPlayerNoPkg: "The host exposed no usable player: install a player that does not need a sound server (e.g. alsa-utils or ffmpeg) to self-play the default event sound",
      diagRemHostOnlySoundServerPlayers: "The host only exposed sound-server players (paplay / pw-play): install {packages} ({packagemanager}) to self-play the default event sound straight through ALSA (on dnf-family hosts ffmpeg comes from RPM Fusion)",
      diagRemHostOnlySoundServerPlayersNoPkg: "The host only exposed sound-server players (paplay / pw-play): install a player that does not need a sound server (e.g. alsa-utils or ffmpeg) to self-play the default event sound straight through ALSA",
      diagRemHostNoPlayer: "The host has a sound server but no player: install a matching player to play the default event sound",
      diagRemHostNoToneFile: "The host is missing the default event sound file: provide this platform's sound resources to self-play it (on Linux a missing theme now falls back to a synthesized tone, so this advice no longer applies there)",
      diagRemHostManagedByOthers: "Popup and sound are already handled by other components on the host: this plugin's system channel silently skips on this machine, so use browser notifications or mobile push instead",
      diagDetailsLabel: "Probe details and source",
      diagSourceHost: "Source: host capability self-check (GET /api/dsh-notifier/diagnostics, the machine running the server)",
      diagSourceBrowser: "Source: judged locally in this browser page",
      diagCheckedLabel: "checked",
      diagPlayersLabel: "Player candidates",
      diagToneFileLabel: "Tone file",
      diagToneFileYes: "present",
      diagToneFileNo: "missing",
      diagNone: "none",
      diagCheckedNotifySend: "notify-send command",
      diagCheckedDbusNameOwner: "D-Bus name owner",
      diagCheckedDbusActivatable: "D-Bus activatable service",
      diagCheckedSessionBus: "Session bus",
      diagCheckedPlayers: "Player candidates",
      diagCheckedToneFile: "Tone file",
      diagBrowserLine: "This browser page: popup {popup} · sound {sound}",
      diagBrowserNoNotificationApi: "this browser has no notification API, so system popups are unavailable",
      diagBrowserInsecureContext: "insecure context (plain HTTP), the browser blocks system popups",
      diagBrowserPermissionDenied: "Without permission, browser system notifications cannot appear; while the page is hidden, only the title is updated. When the page is visible, an in-page banner appears only if the notification policy allows it. Permission was denied; allow it in the browser site settings",
      diagBrowserPermissionDefault: 'Without permission, browser system notifications cannot appear; while the page is hidden, only the title is updated. When the page is visible, an in-page banner appears only if the notification policy allows it. Permission has not been requested; click "Request permission" to grant it',
      diagBrowserAudioNeverUnlocked: "audio is not unlocked yet: the page has not seen a user click; a click enables self-playback",
      diagBrowserAudioAutoSuspended: "the audio context is suspended by the browser: it was unlocked before, or this resume was refused; the next user interaction retries",
      diagBrowserAudioClosed: "the audio context is closed; this page cannot self-play sounds for the rest of its lifetime",
      diagBrowserAudioUnsupported: "this browser does not support Web Audio, so the plugin cannot self-play sounds"
    };
    var ru = {
      evtAsk: "Ожидание подтверждения",
      evtQuestion: "Вопрос к вам",
      evtTaskDone: "Задача выполнена",
      evtSubagentDone: "Подзадача выполнена",
      evtTaskError: "Ошибка задачи",
      evtTurnEnd: "Ход завершён",
      evtTurnEndHint: "Ход завершён срабатывает на каждом ходу и очень часто, поэтому по умолчанию выключен; после включения может стоять рядом с «Задача выполнена»; при доставке в несколько каналов каждый напомнит отдельно (ограничения и маршрутизация действуют).",
      chSystemNotify: "Системное уведомление",
      chBrowserNotify: "Уведомление браузера",
      chWhenVisible: "Показывать и при видимой странице",
      chPopup: "Всплывающее окно",
      chSound: "Звук",
      chStateOn: "Включено",
      chStateSound: "Только звук",
      chStateOff: "Отключено",
      chSoundFollow: "Как в системе по умолчанию",
      chSoundFollowHint: "Системная карточка: в Windows используется системный звук уведомления / в macOS Glass / в Linux плагин сам воспроизводит звук события по умолчанию; карточка браузера: звук воспроизводит операционная система (не беззвучно).",
      chSoundTone: "Тембр",
      chSoundPreview: "Прослушать",
      chSoundOnlyNote: "Всплывающее окно отключено, звук включён: этот канал только звучит, окно не показывается (интерфейс не отвлекается).",
      chPopupSoundOffNote: "Всплывающее окно и звук отключены: этот канал не подаёт никаких напоминаний (чтобы отключить канал, используйте переключатель в заголовке карточки — только он решает, отправлять или нет).",
      toneDing: "Дзинь",
      toneBell: "Колокол",
      toneChime: "Перезвон",
      tonePop: "Хлопок",
      sysPlatformWin: "Хост-платформа Windows: системный сигнал воспроизводится как звук всплывающего уведомления; при выбранном тембре звучит встроенный wav через SoundPlayer (приблизительное сопоставление, может отличаться от звуков системных настроек).",
      sysPlatformMac: "Хост-платформа macOS: системный сигнал воспроизводится через osascript/NSSound (приблизительное сопоставление Glass/Tink/Sosumi/Pop) и подчиняется системной настройке «Разрешить звуки уведомлений».",
      sysPlatformLinux: "Хост-платформа Linux: поддержка звука не зависит от демона рабочего стола — плагин воспроизводит звук сам, перебирая по очереди paplay → pw-play → aplay → ffplay и останавливаясь на первом успешном; при отсутствии тематического звука события используется сигнал, синтезированный во время работы. Если найдены только paplay/pw-play, на хосте без звуковой службы звук не слышен (в обоих случаях на хосте всё равно нужно аудиоустройство).",
      sysPlatformOther: "Системный сигнал воспроизводится на хост-платформе по мере возможностей; прослушивание здесь синтезируется локально в браузере и служит только ориентиром.",
      kAsk: "Ожидание подтверждения",
      kQuestion: "Вопрос к вам",
      kDone: "Задача выполнена",
      kSubagentDone: "Подзадача выполнена",
      kError: "Ошибка задачи",
      kTurnEnd: "Ход завершён",
      kTest: "Тест",
      lanAccessHint: "(Если доступ идёт напрямую по локальной сети, служба уведомлений принимает только вызовы через loopback и отклоняет их: откройте https://<IP-адрес локальной сети>:3443 через dsh-lan-proxy или туннель ssh -L 3080:127.0.0.1:3080, затем обновите страницу)",
      settingsLoading: "Уведомления: загрузка…",
      settingsUnavailable: "Служба настроек недоступна",
      loadFail: "Не удалось загрузить настройки: {msg}{hint}",
      unchanged: "Без изменений",
      savedOk: "Сохранено",
      conflictReloadFail: "Не удалось восстановиться после конфликта: последняя конфигурация не получена, повторите сохранение",
      saveFail: "Не удалось сохранить: {msg}",
      saveTimeout: "Время сохранения истекло: запрос не выполнен за 15 секунд, повторите попытку",
      conflictTitle: "Конфигурация изменена в другом окне:",
      conflictChannels: "Конфигурация каналов изменена в другом окне:",
      conflictLoadLatest: "Загрузить последнюю (отменить мои изменения)",
      conflictOverwrite: "Сохранить мои изменения и перезаписать",
      conflictIgnore: "Игнорировать",
      conflictLoadedLatest: "Последняя конфигурация загружена",
      testSent: "Тестовое уведомление отправлено (сервер не освободил дескрипторов: {n})",
      testFail: "Не удалось отправить тестовое уведомление: {msg}{hint}",
      testRequestFail: "Запрос проверки не удался: {msg}{hint}",
      cleared: "Очищено записей истории уведомлений: {n}",
      clearFail: "Не удалось очистить: {msg}{hint}",
      historyRetention: "Срок хранения истории, дней (0 — не очищать по дням)",
      dndEnable: "Включить режим «не беспокоить»",
      dndStart: "Время начала",
      dndEnd: "Время окончания",
      dndStillLabel: "Уведомлять и в режиме «не беспокоить»",
      allowDisabledHint: "Событие не включено",
      allowFollowEnabled: "Как у включённых событий",
      allowResetDefault: "Вернуть значения по умолчанию (подтверждение/вопрос/ошибка)",
      dndAddWindow: "Добавить интервал",
      dndRemoveWindow: "Удалить этот интервал",
      dndWindow: "Интервал {n}",
      dndEmptyHint: "Интервалов нет: режим «не беспокоить» не будет задерживать уведомления",
      dndLimitHint: "Не более 5 интервалов",
      dndPreviewHit: "Сейчас {now} попадает в интервал {start}–{end}",
      dndPreviewMiss: "Сейчас {now} не попадает в интервалы режима «не беспокоить»",
      dndPreviewOff: "Режим «не беспокоить» не включён",
      dndPreviewNote: "Рассчитано по времени этого устройства и служит только для справки; фактическую блокировку определяют вердикт службы и история уведомлений",
      settingsSvcDown: "Служба настроек недоступна: сохранить конфигурацию сейчас нельзя (служба settings не подключена). Уведомления плагина работают, но изменения будут отклонены.",
      httpDegraded: "Сейчас доступ идёт по HTTP в локальной сети (небезопасный контекст), браузер запрещает системные всплывающие окна, поэтому включён резервный канал: баннер на странице + сигнал + напоминание в заголовке. Для системных всплывающих окон откройте https://<IP-адрес локальной сети>:3443 через dsh-lan-proxy или туннель localhost (например, ssh -L 3080:127.0.0.1:3080) и обновите страницу.",
      permGranted: "Разрешение браузера на уведомления: выдано ✓",
      permDenied: "Разрешение браузера на уведомления: отклонено (разрешите уведомления для этой страницы в настройках сайта браузера)",
      permDefault: "Разрешение браузера на уведомления: не выдано (нажмите кнопку ниже и разрешите уведомления во всплывающем окне браузера)",
      iosUnsupported: "Это устройство не поддерживает системные уведомления (например, обычная вкладка iOS Safari без Web Notifications). Доступные каналы: баннер на странице + сигнал при открытой странице либо доступ через dsh-lan-proxy https://<IP-адрес локальной сети>:3443 и добавление на главный экран для уведомлений уровня PWA.",
      clearConfirm: "Очистить историю?",
      clearLabel: "Очистить историю",
      requestPerm: "Запросить разрешение на уведомления",
      permRequested: "Запрос разрешения выполнен",
      sendTest: "Отправить тестовое уведомление",
      refresh: "Обновить",
      historyTitle: "История уведомлений (последние 10 записей)",
      historyEmpty: "История уведомлений пуста (нажмите «Отправить тестовое уведомление», чтобы создать запись)",
      historySuppressed: "Заблокировано режимом «не беспокоить», не отправлено",
      chStatusOk: "Доставлено",
      chStatusFailed: "Ошибка доставки",
      chStatusSkipped: "Не отправлено",
      reasonDetailLabel: "Исходный текст хоста",
      reasonLegacy: "Запись до обновления",
      reasonUnknown: "Причина неизвестна (запись не распознана)",
      reasonSkipConfig: "Всплывающее окно и звук отключены, доставлять в этот раз нечего",
      reasonSkipEnvironment: "На этом хосте нет доступного канала уведомлений (нет системной утилиты уведомлений или аудиоплеера), ничего не отправлено",
      reasonSystemPopupFailed: "Команда системного уведомления завершилась ошибкой ({bin})",
      reasonSystemSoundFailed: "Команда воспроизведения сигнала завершилась ошибкой ({bin})",
      reasonSystemToastScriptMissing: "Встроенный скрипт уведомлений Windows в плагине отсутствует (дефект сборки), ничего не отправлено",
      reasonSystemToneUnwritable: "Не удалось записать системный сигнал во временный каталог, звук не воспроизведён",
      soundWarnPlaybackFailed: "Не удалось воспроизвести сигнал ({bin}), всплывающее окно отправлено",
      soundWarnToneUnwritable: "Не удалось подготовить сигнал (временный файл не записался; окно отправлено успешно)",
      soundWarnNoPlayback: "Сигнал не прозвучал (нет доступного плеера или аудиофайла; окно отправлено успешно)",
      reasonBarkRequestFailed: "Запрос Bark завершился ошибкой (сеть или тайм-аут)",
      reasonBarkHttp: "Служба Bark вернула HTTP {status}",
      reasonBarkRejected: "Bark отклонил эту отправку (код бизнес-логики {code})",
      reasonBarkBodyUnreadable: "Не удалось прочитать тело ответа Bark (отправка могла пройти)",
      reasonWebhookTemplateInvalid: "Не удалось отрисовать шаблон Webhook (шаблон не является корректным JSON)",
      reasonWebhookRequestFailed: "Запрос Webhook завершился ошибкой (сеть или тайм-аут)",
      reasonWebhookHttp: "Цель Webhook вернула HTTP {status}",
      reasonUnknownTarget: "Неизвестный тип цели доставки ({kind})",
      reasonChannelThrew: "Внутренняя ошибка канала доставки",
      reasonThrottled: "С предыдущей записи прошло менее 1 секунды, доставка не выполнена (результат см. в предыдущей записи)",
      reasonDispatchCanceled: "Плагин выгружался, когда эта запись стояла в очереди, — доставка не выполнена",
      secEvents: "События уведомлений",
      secChannels: "Каналы уведомлений",
      secDedup: "Пределы параметров",
      tabLabel: "Центр уведомлений",
      save: "Сохранить",
      saving: "Сохранение…",
      saveChannels: "Сохранить каналы",
      channelsDomainHint: "Сохраняются только изменения каналов; несохранённые правки событий и параметров не затрагиваются",
      chTest: "Отправить тест",
      chTestDraft: "Проверить несохранённым черновиком",
      chTestDraftTitle: "Проверить текущим несохранённым черновиком (без сохранения и записи на диск)",
      chTestDraftBadge: "Не сохранено",
      dryRunTag: "Тест черновика · не сохранено",
      dryRunPending: "Тест черновика выполняется…",
      dryRunGoSave: "Перейти к сохранению",
      dryRunDiscard: "Отменить черновик",
      dryRunNote: "Тест черновика: проверяется только текущий черновик, ничего не сохраняется, история и состояние не записываются; канал браузера не показывает реальное уведомление, результат определяется этой строкой; повторные нажатия отправляют повторно; если при тайм-ауте получатель всё же получил уведомление, оно не появится в истории и состоянии.",
      chLastOk: "Последняя доставка успешна",
      chLastFail: "Последняя доставка не удалась",
      chNeverSent: "Доставки не было",
      chSkippedSeeHistory: "(подробности см. в истории уведомлений)",
      chAdvanced: "Дополнительные параметры",
      chDelete: "Удалить",
      chDeleteConfirm: "Удалить? Нажмите ещё раз",
      chAddBark: "Добавить отправку Bark",
      chBarkName: "Отображаемое имя",
      chBarkNamePlaceholder: "Например: мой iPhone",
      chBarkBaseUrl: "Адрес сервера",
      chBarkBaseUrlHint: "Адрес сервера Bark (http/https), например https://api.day.app или собственный адрес",
      chBarkDeviceKey: "Device Key",
      chBarkDeviceKeyPlaceholder: "Вставьте Device Key из приложения Bark",
      chBarkDeviceKeyHint: "Смотрится в приложении Bark; пустое поле не изменяет сохранённое значение, новое значение заменит его",
      chBarkSound: "Звук sound",
      chBarkGroup: "Группа group",
      chBarkGroupHint: "Уведомления одной группы сворачиваются на телефоне",
      chBarkIcon: "Значок icon",
      chBarkIconHint: "URL изображения, доступный из сети телефона; SVG поддерживается в iOS 17+; пусто — значок Bark по умолчанию",
      chBarkUrl: "Переход url",
      chBarkBadge: "Значок badge",
      chBarkLevel: "Уровень level по умолчанию",
      chBarkLevelHint: "Срочность на уровне экземпляра (по умолчанию сопоставляется автоматически по интенсивности события); совпадение в таблице «Сопоставление срочности по типам» ниже имеет приоритет над этим значением",
      chLevelAuto: "Автоматически по интенсивности события",
      chLevelsHint: "Задаёт срочность Bark по типу события; приоритетнее уровня по умолчанию и автосопоставления; типы без настройки используют значение по умолчанию",
      chLevelsKindPlaceholder: "Например: question",
      chLevelsAdd: "Добавить сопоставление",
      chLevelsRemove: "Убрать",
      chLevelsEmpty: "Сопоставление по типам не настроено (все события используют срочность по умолчанию)",
      chLevelsUnknown: "Неизвестный тип события (может не сработать, проверьте написание)",
      kindsTitle: "Типы уведомлений",
      kindsHint: "Типы уведомлений, зарегистрированные другими плагинами, доставляются только после вашего подтверждения",
      kindAllow: "Разрешить",
      kindDeny: "Запретить",
      kindsEmpty: "Нет типов уведомлений, требующих рассмотрения",
      testChannelOk: "Тест принят (результат доставки см. в разделе «История уведомлений»)",
      kindConfirmOk: "Состояние подтверждения типа уведомления обновлено",
      kindConfirmFail: "Не удалось подтвердить: {msg}",
      chNewBarkName: "Отправка Bark",
      secHistory: "История уведомлений",
      evtSwitch: "Переключатель события: {name}",
      chToggleOn: "Включить канал: ",
      chToggleOff: "Отключить канал: ",
      chTypeBuiltin: "Встроенный",
      kindRevoke: "Отозвать разрешение",
      routeCap: "Доставка в",
      routeDefaultState: "Как по умолчанию · все включённые каналы",
      routeDefaultStateTitle: "Маршрутизация не настроена: доставка во все включённые каналы (меняется динамически при включении и отключении каналов)",
      routeCustomState: "Своя · каналов: {n} · вернуть по умолчанию",
      routeCustomStateTitle: "Маршрутизация настроена вручную (зафиксированный снимок); нажмите, чтобы вернуть поведение по умолчанию",
      routeStaleChip: "Удалён",
      routeStaleTitle: "Этот канал удалён, но его запись в маршрутизации осталась; при доставке она пропускается (остаточная запись не удаляется автоматически)",
      routeDisabledHint: "Канал не включён: чтобы настроить доставку, сначала включите его в разделе «Каналы уведомлений» выше",
      dirtySome: "Несохранённых изменений: {n}",
      dirtyDomains: "Есть несохранённые изменения событий и каналов",
      dirtyChannels: "Есть несохранённые изменения каналов",
      routeExpandHint: "Развернуть доставку",
      discardChanges: "Отменить изменения",
      discardOk: "Несохранённые изменения отменены",
      secretShow: "Показать",
      secretHide: "Скрыть",
      kindRouteHint: "После разрешения можно настраивать каналы доставки так же, как для встроенных событий",
      chAddWebhook: "Добавить Webhook (Android / собственный)",
      chNewWebhookName: "Отправка Webhook",
      whPreset: "Предустановка",
      whPresetNtfy: "ntfy (ntfy.sh или собственный)",
      whPresetGotify: "Gotify",
      whPresetCustom: "Собственный шлюз доставки",
      whPresetHint: "Предустановка заполняет вид URL, способ аутентификации и шаблон сообщения",
      whUrl: "Целевой URL",
      whUrlPlaceholder: "https://ntfy.sh/<topic>",
      whUrlHint: "POST JSON; допускается только http(s), URL не должен содержать встроенные учётные данные; к имени темы ntfy рекомендуется добавлять случайный суффикс для защиты от перебора",
      whAuth: "Аутентификация",
      whAuthNone: "Нет",
      whAuthBearer: "Bearer Token (заголовок Authorization)",
      whAuthBasic: "Basic имя пользователя/пароль",
      whAuthHeader: "Свой заголовок запроса",
      whAuthHint: "Учётные данные передаются только в заголовках запроса (ntfy и Gotify поддерживают заголовок Authorization, в URL не подставляются); хранятся только в локальной конфигурации и отображаются замаскированными; пустое поле не изменяет сохранённые учётные данные",
      whAuthToken: "Токен доступа",
      whAuthUsername: "Имя пользователя",
      whAuthPassword: "Пароль",
      whAuthHeaderName: "Имя заголовка (например, X-Gotify-Key)",
      whAuthHeaderValue: "Значение заголовка (токен)",
      whTimeout: "Тайм-аут доставки",
      whTimeoutHint: "Секунды · 1–60 (при выходе за границы берётся граничное значение, по умолчанию 10); тайм-ауты и ошибки попадают в историю, автоматических повторов нет",
      whTemplate: "Шаблон сообщения (тело JSON, нажмите на плейсхолдер для вставки)",
      whTemplateHint: "{{priority}} отрисовывается службой по сопоставлению канала (ntfy: info→default / success→low / warning→high / failure→urgent); текстовые плейсхолдеры экранируются с учётом JSON, {{ts}} подставляется числом",
      whTemplateFailHint: "Некорректный шаблон или ошибка отрисовки считается ошибкой доставки этого канала и записывается в историю, другие каналы не затрагиваются",
      whTplRestore: "Восстановить предустановленный шаблон",
      diagHostLine: "Самопроверка возможностей хоста: {verdict} · всплывающие окна {popup} · звук {sound}",
      diagVerdictOk: "доступно",
      diagVerdictDegraded: "доступно с ограничениями",
      diagVerdictUnreachable: "недоступно",
      diagVerdictUnknown: "не определено",
      diagDimPopup: "Всплывающее окно",
      diagDimSound: "Звук",
      diagUnknownLine: "Не удалось определить следующие параметры: {dimensions}",
      diagRemediationTitle: "Рекомендации",
      diagRemediationUnknown: "Хост вернул рекомендацию, неизвестную этой версии клиента; обновите плагин и повторите",
      diagRemHostNoDbusSession: "На хосте нет сессионной шины D-Bus: для системных всплывающих окон нужен сеанс рабочего стола (графический вход) или сессионная шина, созданная через dbus-launch",
      diagRemHostPopupNoDaemon: "На хосте есть notify-send, но нет службы уведомлений: установите и запустите службу уведомлений рабочего стола (например, dunst, mako), чтобы всплывающие окна стали видны",
      diagRemHostNoNotifySend: "На хосте нет notify-send: установите утилиту уведомлений, которая его предоставляет (libnotify-bin в Debian/Ubuntu, libnotify в Fedora/Arch), и всплывающие окна станут видны",
      diagRemHostNoSoundServerAndPlayer: "На хосте не обнаружено ни одного доступного плеера: установите {packages} ({packagemanager}), чтобы плагин сам воспроизводил звук события по умолчанию (в системах семейства dnf пакет ffmpeg берётся из RPM Fusion)",
      diagRemHostNoSoundServerAndPlayerNoPkg: "На хосте не обнаружено ни одного доступного плеера: установите плеер, не зависящий от звуковой службы (например, alsa-utils или ffmpeg), чтобы плагин сам воспроизводил звук события по умолчанию",
      diagRemHostOnlySoundServerPlayers: "На хосте обнаружены только плееры, зависящие от звуковой службы (paplay / pw-play): установите {packages} ({packagemanager}), чтобы плагин сам воспроизводил звук события по умолчанию напрямую через ALSA (в системах семейства dnf пакет ffmpeg берётся из RPM Fusion)",
      diagRemHostOnlySoundServerPlayersNoPkg: "На хосте обнаружены только плееры, зависящие от звуковой службы (paplay / pw-play): установите плеер, не зависящий от звуковой службы (например, alsa-utils или ffmpeg), чтобы плагин сам воспроизводил звук события по умолчанию напрямую через ALSA",
      diagRemHostNoPlayer: "На хосте есть звуковая служба, но нет плеера: установите подходящий плеер, чтобы плагин сам воспроизводил звук события по умолчанию",
      diagRemHostNoToneFile: "На хосте отсутствует файл звука события по умолчанию: добавьте звуковые ресурсы этой платформы, чтобы плагин сам воспроизводил его (в Linux при отсутствии темы используется синтезированный сигнал, поэтому эта рекомендация там больше не применяется)",
      diagRemHostManagedByOthers: "Всплывающие окна и звук уже перехвачены другими компонентами хоста: системный канал этого плагина на данной машине молча пропускается, используйте уведомления браузера или push-уведомления на мобильном устройстве",
      diagDetailsLabel: "Детали проверки и источник",
      diagSourceHost: "Источник: самопроверка возможностей хоста (GET /api/dsh-notifier/diagnostics, машина со службой)",
      diagSourceBrowser: "Источник: локальное определение в этом браузере",
      diagCheckedLabel: "Проверено",
      diagPlayersLabel: "Кандидаты плееров",
      diagToneFileLabel: "Файл звука",
      diagToneFileYes: "На месте",
      diagToneFileNo: "Отсутствует",
      diagNone: "Нет",
      diagCheckedNotifySend: "Команда notify-send",
      diagCheckedDbusNameOwner: "Владелец имени D-Bus",
      diagCheckedDbusActivatable: "Активируемая служба D-Bus",
      diagCheckedSessionBus: "Сессионная шина",
      diagCheckedPlayers: "Кандидаты плееров",
      diagCheckedToneFile: "Файл звука",
      diagBrowserLine: "Этот браузер: всплывающие окна {popup} · звук {sound}",
      diagBrowserNoNotificationApi: "в этом браузере нет API уведомлений, системные всплывающие окна недоступны",
      diagBrowserInsecureContext: "небезопасный контекст (открытый HTTP), браузер запрещает системные всплывающие окна",
      diagBrowserPermissionDenied: "разрешение на уведомления отклонено, разрешите его в настройках сайта браузера",
      diagBrowserPermissionDefault: "разрешение на уведомления не запрошено, нажмите «Запросить разрешение на уведомления» для выдачи",
      diagBrowserAudioNeverUnlocked: "звук ещё не разблокирован: на странице не было нажатий пользователя, после нажатия воспроизведение станет возможным",
      diagBrowserAudioAutoSuspended: "аудиоконтекст приостановлен браузером: он разблокировался ранее либо браузер отклонил восстановление; при следующем действии пользователя попытка повторится",
      diagBrowserAudioClosed: "аудиоконтекст закрыт, на этой странице воспроизведение сигнала больше невозможно",
      diagBrowserAudioUnsupported: "этот браузер не поддерживает Web Audio, плагин не может воспроизводить сигнал самостоятельно"
    };
var KIND_KEY_TABLE = {
      ask: "kAsk",
      question: "kQuestion",
      done: "kDone",
      "subagent-done": "kSubagentDone",
      error: "kError",
      "turn-end": "kTurnEnd",
      test: "kTest"
    };
    var KIND_KEYS = KIND_KEY_TABLE;

    // src/client/capabilities.ts
    var VERDICT_KEYS = {
      ok: "diagVerdictOk",
      degraded: "diagVerdictDegraded",
      unreachable: "diagVerdictUnreachable",
      unknown: "diagVerdictUnknown"
    };
    var VERDICT_TONES = {
      ok: "ok",
      degraded: "warn",
      unreachable: "error",
      unknown: "unknown"
    };
    var DIMENSION_KEYS = {
      popup: "diagDimPopup",
      sound: "diagDimSound"
    };
    var CHECKED_KEYS = {
      "notify-send": "diagCheckedNotifySend",
      "dbus-name-owner": "diagCheckedDbusNameOwner",
      "dbus-activatable": "diagCheckedDbusActivatable",
      "session-bus": "diagCheckedSessionBus",
      players: "diagCheckedPlayers",
      "tone-file": "diagCheckedToneFile"
    };
    var REMEDIATION_KEYS = {
      "host-no-dbus-session": "diagRemHostNoDbusSession",
      "host-popup-no-daemon": "diagRemHostPopupNoDaemon",
      "host-no-notify-send": "diagRemHostNoNotifySend",
      "host-no-sound-server-and-player": "diagRemHostNoSoundServerAndPlayer",
      "host-only-sound-server-players": "diagRemHostOnlySoundServerPlayers",
      "host-no-player": "diagRemHostNoPlayer",
      "host-no-tone-file": "diagRemHostNoToneFile",
      "host-managed-by-others": "diagRemHostManagedByOthers"
    };
    var NO_PACKAGE_KEYS = {
      "host-no-sound-server-and-player": "diagRemHostNoSoundServerAndPlayerNoPkg",
      "host-only-sound-server-players": "diagRemHostOnlySoundServerPlayersNoPkg"
    };
    var BROWSER_KEYS = {
      "browser-no-notification-api": "diagBrowserNoNotificationApi",
      "browser-insecure-context": "diagBrowserInsecureContext",
      "browser-permission-denied": "diagBrowserPermissionDenied",
      "browser-permission-default": "diagBrowserPermissionDefault",
      "browser-audio-never-unlocked": "diagBrowserAudioNeverUnlocked",
      "browser-audio-auto-suspended": "diagBrowserAudioAutoSuspended",
      "browser-audio-closed": "diagBrowserAudioClosed",
      "browser-audio-unsupported": "diagBrowserAudioUnsupported"
    };
    var VERDICTS = ["ok", "degraded", "unreachable", "unknown"];
    var PACKAGE_MANAGERS = ["apt", "dnf", "pacman"];
    var DIMENSIONS = ["popup", "sound"];
    function hostCapabilitiesOf(payload) {
      const body = objectOf(payload);
      const capabilities = body === void 0 ? void 0 : objectOf(body.capabilities);
      const host = capabilities === void 0 ? void 0 : objectOf(capabilities.host);
      if (host === void 0) return void 0;
      const verdict = requiredVerdictOf(host.verdict);
      const popup = popupOf(host.popup);
      const sound = soundOf(host.sound);
      if (verdict === void 0 || popup === void 0 || sound === void 0) return void 0;
      return {
        verdict,
        unknownDimensions: dimensionsOf(host.unknownDimensions),
        popup,
        sound,
        remediation: remediationOf(host.remediation)
      };
    }
    function audioStateOf(facts) {
      if (facts.supported !== true) return { kind: "unsupported" };
      if (facts.state === "running") return { kind: "running" };
      if (facts.state === "closed") return { kind: "closed" };
      return {
        kind: "suspended",
        cause: facts.hasEverRun === true || facts.resumeRejected === true ? "auto-suspended" : "never-unlocked"
      };
    }
    var SEVERITY = {
      ok: 0,
      degraded: 1,
      unknown: 2,
      unreachable: 3
    };
    function worstVerdict(states) {
      let worst = "ok";
      states.forEach(function(state) {
        if (SEVERITY[state] > SEVERITY[worst]) worst = state;
      });
      return worst;
    }
    function browserStatesOf(facts) {
      const popup = popupStateOf(facts);
      const sound = soundStateOf(facts);
      return {
        verdict: worstVerdict([popup.state, sound.state]),
        popup,
        sound,
        audio: audioStateOf(facts.audio)
      };
    }
    function clientDiagnosticsOf(payload, facts, t2) {
      return { host: hostDiagnosticsOf(payload, t2), browser: browserDiagnosticsOf(facts, t2) };
    }
    function remediationTextOf(remediation, t2) {
      const key = knownRemediationKeyOf(remediation.code);
      if (key === void 0) return t2("diagRemediationUnknown");
      const params = paramTextsOf(remediation.params);
      const sparse = params.packages === void 0 ? NO_PACKAGE_KEYS[remediation.code] : void 0;
      return t2(sparse ?? key, params);
    }
    function hostDiagnosticsOf(payload, t2) {
      const host = hostCapabilitiesOf(payload);
      if (host === void 0) return void 0;
      const unknown = host.unknownDimensions.map(function(dimension) {
        return t2(DIMENSION_KEYS[dimension]);
      });
      return {
        verdict: host.verdict,
        tone: VERDICT_TONES[host.verdict],
        line: t2("diagHostLine", {
          verdict: t2(VERDICT_KEYS[host.verdict]),
          popup: t2(VERDICT_KEYS[host.popup.state]),
          sound: t2(VERDICT_KEYS[host.sound.state])
        }),
        unknownLine: unknown.length === 0 ? "" : t2("diagUnknownLine", { dimensions: unknown.join(" · ") }),
        remediationTitle: t2("diagRemediationTitle"),
        remediationLines: host.remediation.map(function(item) {
          return remediationTextOf(item, t2);
        }),
        detailsLabel: t2("diagDetailsLabel"),
        sourceLabel: t2("diagSourceHost"),
        details: detailRowsOf(host, t2)
      };
    }
    function browserDiagnosticsOf(facts, t2) {
      const states = browserStatesOf(facts);
      return {
        verdict: states.verdict,
        tone: VERDICT_TONES[states.verdict],
        line: t2("diagBrowserLine", {
          popup: dimensionTextOf(states.popup, t2),
          sound: dimensionTextOf(states.sound, t2)
        }),
        sourceLabel: t2("diagSourceBrowser")
      };
    }
    function popupStateOf(facts) {
      if (facts.notificationApi !== true) {
        return { state: "unreachable", code: "browser-no-notification-api" };
      }
      if (facts.secureContext !== true) {
        return { state: "degraded", code: "browser-insecure-context" };
      }
      if (facts.permission === "granted") return { state: "ok" };
      if (facts.permission === "denied") {
        return { state: "unreachable", code: "browser-permission-denied" };
      }
      if (facts.permission === "default") {
        return { state: "unknown", code: "browser-permission-default" };
      }
      return { state: "unknown" };
    }
    function soundStateOf(facts) {
      const audio = audioStateOf(facts.audio);
      if (audio.kind === "running") return { state: "ok" };
      if (audio.kind === "closed") return { state: "unreachable", code: "browser-audio-closed" };
      if (audio.kind === "unsupported") {
        return { state: "unreachable", code: "browser-audio-unsupported" };
      }
      return audio.cause === "never-unlocked" ? { state: "unknown", code: "browser-audio-never-unlocked" } : { state: "degraded", code: "browser-audio-auto-suspended" };
    }
    function dimensionTextOf(state, t2) {
      const verdict = t2(VERDICT_KEYS[state.state]);
      return state.code === void 0 ? verdict : verdict + " (" + t2(BROWSER_KEYS[state.code]) + ")";
    }
    function detailRowsOf(host, t2) {
      return [
        {
          label: t2("diagDimPopup") + " · " + t2("diagCheckedLabel"),
          value: checkedTextOf(host.popup.checked, t2)
        },
        {
          label: t2("diagDimSound") + " · " + t2("diagCheckedLabel"),
          value: checkedTextOf(host.sound.checked, t2)
        },
        { label: t2("diagPlayersLabel"), value: listText(host.sound.players, t2) },
        {
          label: t2("diagToneFileLabel"),
          value: host.sound.toneFileAvailable ? t2("diagToneFileYes") : t2("diagToneFileNo")
        }
      ];
    }
    function checkedTextOf(checked, t2) {
      return listText(
        checked.map(function(item) {
          return t2(CHECKED_KEYS[item]);
        }),
        t2
      );
    }
    function listText(items, t2) {
      return items.length === 0 ? t2("diagNone") : items.join(" · ");
    }
    function paramTextsOf(params) {
      if (params === void 0) return {};
      const out = {};
      if (params.packagemanager !== void 0) out.packagemanager = params.packagemanager;
      if (params.packages !== void 0) out.packages = params.packages.join(" ");
      return out;
    }
    function popupOf(value) {
      const source = objectOf(value);
      if (source === void 0) return void 0;
      const state = requiredVerdictOf(source.state);
      if (state === void 0) return void 0;
      return { state, checked: checkedOf(source.checked) };
    }
    function soundOf(value) {
      const source = objectOf(value);
      if (source === void 0) return void 0;
      const state = requiredVerdictOf(source.state);
      if (state === void 0) return void 0;
      return {
        state,
        players: stringsOf(source.players),
        toneFileAvailable: source.toneFileAvailable === true,
        checked: checkedOf(source.checked)
      };
    }
    function remediationOf(value) {
      if (!Array.isArray(value)) return [];
      const out = [];
      value.forEach(function(item) {
        const source = objectOf(item);
        if (source === void 0) return;
        if (typeof source.code !== "string" || source.code === "") return;
        const params = paramsOf(source.params);
        out.push(params === void 0 ? { code: source.code } : { code: source.code, params });
      });
      return out;
    }
    function paramsOf(value) {
      const source = objectOf(value);
      if (source === void 0) return void 0;
      const out = {};
      if (typeof source.packagemanager === "string" && PACKAGE_MANAGERS.includes(source.packagemanager)) {
        out.packagemanager = source.packagemanager;
      }
      const packages = stringsOf(source.packages);
      if (packages.length > 0) out.packages = packages;
      return out.packagemanager === void 0 && out.packages === void 0 ? void 0 : out;
    }
    function checkedOf(value) {
      if (!Array.isArray(value)) return [];
      return value.filter(function(item) {
        return typeof item === "string" && Object.prototype.hasOwnProperty.call(CHECKED_KEYS, item);
      });
    }
    function dimensionsOf(value) {
      if (!Array.isArray(value)) return [];
      return value.filter(function(item) {
        return typeof item === "string" && DIMENSIONS.includes(item);
      });
    }
    function stringsOf(value) {
      if (!Array.isArray(value)) return [];
      return value.filter(function(item) {
        return typeof item === "string" && item !== "";
      });
    }
    function verdictOf(value) {
      return typeof value === "string" && VERDICTS.includes(value) ? value : "unknown";
    }
    function requiredVerdictOf(value) {
      return typeof value === "string" && value !== "" ? verdictOf(value) : void 0;
    }
    function objectOf(value) {
      if (typeof value !== "object" || value === null || Array.isArray(value)) return void 0;
      return value;
    }
    function knownRemediationKeyOf(code) {
      return Object.prototype.hasOwnProperty.call(REMEDIATION_KEYS, code) ? REMEDIATION_KEYS[code] : void 0;
    }

    // src/client/notify/display.ts
    var BANNER_CAP = 3;
    var BANNER_TTL_MS = 8e3;
    var TOAST_TTL_MS = 3e3;
    function bannerTrimCount(existing, cap) {
      return Math.max(0, existing - cap + 1);
    }
    function trimBanners(banners, cap) {
      for (const node of banners.slice(0, bannerTrimCount(banners.length, cap))) node.remove();
    }
    function el(tag, attrs, children) {
      const node = document.createElement(tag);
      if (attrs.class !== void 0) node.className = attrs.class;
      if (attrs.text !== void 0) node.textContent = attrs.text;
      if (attrs.dataset !== void 0) Object.assign(node.dataset, attrs.dataset);
      if (attrs.style !== void 0) node.style.cssText = attrs.style;
      if (children !== void 0) {
        for (const child of children) node.appendChild(child);
      }
      return node;
    }
    // Поверхность уведомления — как у тоста самого DSH: тёмная плашка в обеих
    // темах, крупный радиус, подпись 14/22 и значок слева. Значки — те же 16×16
    // глифы: круг с галочкой (сделано), круг с восклицательным знаком (нужен
    // ответ или что-то не вышло) и колокол (событие без оценки).
    var BANNER_GLYPH = {
      success: [
        { d: "M12.5303 6.53027L8.80273 10.2578C8.54967 10.5109 8.31796 10.7439 8.10645 10.9141C7.88375 11.0932 7.616 11.2602 7.27344 11.3145C7.09229 11.3431 6.90771 11.3431 6.72656 11.3145C6.384 11.2602 6.11625 11.0932 5.89355 10.9141C5.68204 10.7439 5.45033 10.5109 5.19727 10.2578L3.46973 8.53027L4.53027 7.46973L6.25781 9.19727C6.53457 9.47402 6.70036 9.63859 6.83398 9.74609C6.95637 9.84453 6.98241 9.83644 6.96094 9.83301C6.98679 9.83709 7.01321 9.83709 7.03906 9.83301C7.01759 9.83644 7.04363 9.84453 7.16602 9.74609C7.29964 9.63859 7.46543 9.47402 7.74219 9.19727L11.4697 5.46973L12.5303 6.53027Z", fill: "currentColor" },
        { d: "M14.5996 8C14.5996 4.35492 11.6451 1.40039 8 1.40039C4.35492 1.40039 1.40039 4.35492 1.40039 8C1.40039 11.6451 4.35492 14.5996 8 14.5996C11.6451 14.5996 14.5996 11.6451 14.5996 8ZM15.9004 8C15.9004 12.363 12.363 15.9004 8 15.9004C3.63695 15.9004 0.0996094 12.363 0.0996094 8C0.0996094 3.63695 3.63695 0.0996094 8 0.0996094C12.363 0.0996094 15.9004 3.63695 15.9004 8Z", fill: "currentColor" },
      ],
      warning: [
        { d: "M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z", stroke: "currentColor", fill: "none" },
        { d: "M8 4.29199V9.79199", stroke: "currentColor", fill: "none" },
        { d: "M8 10.708V11.708", stroke: "currentColor", fill: "none" },
      ],
      info: [
        { d: "M8 2.4a3.1 3.1 0 0 0-3.1 3.1c0 3.2-1.2 4.1-1.2 4.1h8.6s-1.2-.9-1.2-4.1A3.1 3.1 0 0 0 8 2.4Z", stroke: "currentColor", fill: "none" },
        { d: "M6.9 11.9a1.15 1.15 0 0 0 2.2 0", stroke: "currentColor", fill: "none" },
      ],
    };
    // Что сообщает событие: «сделано» — галочка, «нужен ответ» и ошибка —
    // восклицательный знак, остальные события — колокол без оценки.
    function bannerTone(kind) {
      if (kind === "done" || kind === "subagent-done") return "success";
      if (kind === "ask" || kind === "question" || kind === "error") return "warning";
      return "info";
    }
    function bannerIcon(kind) {
      const tone = bannerTone(kind);
      const ns = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(ns, "svg");
      const box = [["width", "16"], ["height", "16"], ["viewBox", "0 0 16 16"], ["fill", "none"], ["stroke-width", "1"]];
      for (const [name, value] of box) svg.setAttribute(name, value);
      for (const spec of BANNER_GLYPH[tone]) {
        const path = document.createElementNS(ns, "path");
        for (const name of Object.keys(spec)) path.setAttribute(name, spec[name]);
        svg.appendChild(path);
      }
      const seat = el("span", { class: "dn-banner-icon", dataset: { tone } });
      seat.setAttribute("aria-hidden", "true");
      seat.appendChild(svg);
      return seat;
    }
    function showBanner(kind, title, message, sessionId) {
      const kindKey = String(kind);
      const existing = Array.prototype.slice.call(
        document.querySelectorAll(".dn-banner")
      );
      const survivors = [];
      for (const node of existing) {
        if (node.dataset.kind === kindKey) node.remove();
        else survivors.push(node);
      }
      trimBanners(survivors, BANNER_CAP);
      const banner = el("div", { class: "dn-banner", dataset: { kind: kindKey } });
      banner.addEventListener("click", () => {
        window.focus();
        banner.remove();
        // Уведомление ведёт туда, о чём оно: без этого клик только закрывал
        // плашку, и нужную сессию приходилось искать в списке руками.
        if (typeof sessionId === "string" && sessionId.length > 0 && uiWorkspaceRef.current) {
          try {
            uiWorkspaceRef.current.openSession(sessionId);
          } catch (error) {
            console.warn("[dsh-notifier] не удалось переключить сессию: ", error);
          }
        }
      });
      if (typeof sessionId === "string" && sessionId.length > 0) banner.title = "Перейти в сессию";
      banner.appendChild(bannerIcon(kindKey));
      const main = el("div", { class: "dn-banner-main" }, [
        el("div", { class: "dn-banner-title", text: title })
      ]);
      // Пустая строка под заголовком читалась бы как лишний отступ.
      if (message !== void 0 && message !== null && String(message).length > 0) {
        main.appendChild(el("div", { class: "dn-banner-text", text: String(message) }));
      }
      banner.appendChild(main);
      document.body.appendChild(banner);
      setTimeout(() => {
        banner.remove();
      }, BANNER_TTL_MS);
    }
    function toast(message) {
      const node = el("div", { class: "dn-toast", text: message });
      document.body.appendChild(node);
      setTimeout(() => {
        node.remove();
      }, TOAST_TTL_MS);
    }

    // src/client/settings/diff.ts
    function diffSettingsPayload(settings, baseLine) {
      const payload = {};
      if (baseLine === null) return payload;
      for (const key in settings) {
        if (!Object.prototype.hasOwnProperty.call(settings, key)) continue;
        const cur = settings[key];
        const base = baseLine[key];
        const value = key === "channels" && Array.isArray(cur) ? cur.map(stripChannelEmpties) : cur;
        const same = stableEqual(canonicalForCompare(key, cur), canonicalForCompare(key, base));
        if (!same) payload[key] = value;
      }
      return payload;
    }
    function canonicalForCompare(key, value) {
      if (key === "channels" && Array.isArray(value)) return canonicalChannelsForCompare(value);
      return value;
    }
    function stableJsonValue(value) {
      if (value === void 0) return "undefined";
      if (Array.isArray(value)) {
        return `[${value.map((item) => item === void 0 ? "null" : stableJsonValue(item)).join(",")}]`;
      }
      if (typeof value === "object" && value !== null) {
        const record = value;
        const fields = Object.keys(record).filter((field) => record[field] !== void 0).sort().map((field) => `${JSON.stringify(field)}:${stableJsonValue(record[field])}`);
        return `{${fields.join(",")}}`;
      }
      return JSON.stringify(value) ?? "undefined";
    }
    function stableEqual(a, b) {
      return stableJsonValue(a) === stableJsonValue(b);
    }
    function snapshotBaseline(effective) {
      return canonicalSettingsForCompare(effective);
    }
    function rebaseSettings(localChanges, remoteEffective) {
      return Object.assign({}, remoteEffective, localChanges);
    }
    function domainPayload(diff, entry) {
      if (entry === "all") return diff;
      if (entry === "channels") {
        if (!Object.prototype.hasOwnProperty.call(diff, "channels")) return {};
        return { channels: diff.channels };
      }
      return {};
    }
    function assignChannelFields(target, part) {
      const out = Object.assign({}, target);
      for (const key of Object.keys(part)) {
        const value = part[key];
        out[key] = value === "" || value === void 0 ? null : value;
      }
      return out;
    }

    // src/client/settings/save-guard.ts
    function createSaveGuard() {
      let busy = false;
      let pending = null;
      return {
        tryBegin(entry) {
          if (busy) {
            pending = entry;
            return false;
          }
          busy = true;
          return true;
        },
        isBusy() {
          return busy;
        },
        end() {
          busy = false;
          const last = pending;
          pending = null;
          return last;
        }
      };
    }

    // src/client/settings/status-poll.ts
    var TEST_STATUS_ATTEMPTS = 8;
    var TEST_STATUS_INTERVAL_MS = 1500;
    function defaultSleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }
    function statusConverged(map, channelKey, prevTs) {
      const entry = map[channelKey];
      if (entry === void 0 || entry === null) return false;
      if (typeof entry.lastTs !== "number") return false;
      return prevTs === void 0 || entry.lastTs > prevTs;
    }
    async function pollChannelStatus(fetchStatus2, channelKey, prevTs, options = {}) {
      const attempts = options.attempts ?? TEST_STATUS_ATTEMPTS;
      const intervalMs = options.intervalMs ?? TEST_STATUS_INTERVAL_MS;
      const sleep = options.sleep ?? defaultSleep;
      let latest = null;
      for (let round = 0; round < attempts; round += 1) {
        if (round > 0) await sleep(intervalMs);
        let map;
        try {
          map = await fetchStatus2();
        } catch {
          continue;
        }
        latest = map;
        if (statusConverged(map, channelKey, prevTs)) return { converged: true, map };
      }
      return { converged: false, map: latest };
    }

    // src/client/api-error.ts
    var REFUSAL_VALUES = Object.values(REFUSAL_CODES);
    function apiFailureOf(error, t2) {
      const source = objectOf2(error);
      const message = failureMessageOf(error, source);
      const code = stringOf(source?.code);
      if (code !== void 0 && REFUSAL_VALUES.includes(code)) {
        return {
          refused: true,
          hint: code === REFUSAL_CODES.FORBIDDEN_LOOPBACK || code === REFUSAL_CODES.UNAUTHORIZED ? t2("lanAccessHint") : "",
          message
        };
      }
      const status = numberOf(source?.status);
      if (status === 403 || status === void 0 && message.includes("403")) {
        return { refused: true, hint: t2("lanAccessHint"), message };
      }
      return { refused: false, hint: "", message };
    }
    function markHttpFailure(error, status, body) {
      const source = objectOf2(body);
      const code = stringOf(source?.code) ?? stringOf(objectOf2(source?.error)?.code);
      const failure = error;
      if (code !== void 0) failure.code = code;
      failure.status = numberOf(source?.status) ?? status;
      return failure;
    }
    function failureMessageOf(error, source) {
      if (typeof error === "string") return error;
      return source === void 0 ? unparsedText(error) : bodyText(error, source);
    }
    function unparsedText(error) {
      return error === null || error === void 0 ? "" : String(error);
    }
    function bodyText(error, source) {
      const direct = stringOf(source.message) ?? stringOf(source.details);
      if (direct !== void 0) return direct;
      if (typeof source.error === "string" && source.error !== "") return source.error;
      const nested = objectOf2(source.error);
      return stringOf(nested?.details) ?? stringOf(nested?.error) ?? String(error);
    }
    function objectOf2(value) {
      return typeof value === "object" && value !== null ? value : void 0;
    }
    function stringOf(value) {
      return typeof value === "string" && value !== "" ? value : void 0;
    }
    function numberOf(value) {
      return typeof value === "number" && Number.isFinite(value) ? value : void 0;
    }

    // src/client/reason-text.ts
    var REASON_KEYS = {
      reasonLegacy: "reasonLegacy",
      reasonSkipConfig: "reasonSkipConfig",
      reasonSkipEnvironment: "reasonSkipEnvironment",
      reasonSystemPopupFailed: "reasonSystemPopupFailed",
      reasonSystemSoundFailed: "reasonSystemSoundFailed",
      reasonSystemToastScriptMissing: "reasonSystemToastScriptMissing",
      reasonSystemToneUnwritable: "reasonSystemToneUnwritable",
      reasonBarkRequestFailed: "reasonBarkRequestFailed",
      reasonBarkHttp: "reasonBarkHttp",
      reasonBarkRejected: "reasonBarkRejected",
      reasonBarkBodyUnreadable: "reasonBarkBodyUnreadable",
      reasonWebhookTemplateInvalid: "reasonWebhookTemplateInvalid",
      reasonWebhookRequestFailed: "reasonWebhookRequestFailed",
      reasonWebhookHttp: "reasonWebhookHttp",
      reasonUnknownTarget: "reasonUnknownTarget",
      reasonChannelThrew: "reasonChannelThrew",
      reasonThrottled: "reasonThrottled",
      reasonDispatchCanceled: "reasonDispatchCanceled"
    };
    function reasonText(value, t2) {
      if (typeof value === "string") return value;
      const view = reasonViewOf(value);
      if (view === void 0) return t2("reasonUnknown");
      const detail = view.detail === void 0 ? "" : view.detail;
      if (view.code === REASON_LEGACY) return detail === "" ? t2("reasonLegacy") : detail;
      const key = knownKeyOf(view.code);
      if (key === void 0) return detail === "" ? t2("reasonUnknown") : detail;
      return t2(key, view.params);
    }
    function reasonDetail(value) {
      const view = reasonViewOf(value);
      if (view === void 0 || view.detail === void 0) return "";
      return view.code === REASON_LEGACY ? "" : view.detail;
    }
    function deliveryViewOf(value, t2) {
      const row = deliveryRowOf(value);
      return row === void 0 ? void 0 : projectDelivery(row, t2);
    }
    function deliveryRowOf(value) {
      if (typeof value !== "object" || value === null || Array.isArray(value)) return void 0;
      const source = value;
      if (typeof source.channelId !== "string" || source.channelId === "") return void 0;
      const status = source.status;
      if (status !== "ok" && status !== "failed" && status !== "skipped") return void 0;
      return {
        channelId: source.channelId,
        status,
        reason: source.reason,
        soundWarning: source.soundWarning
      };
    }
    function soundWarningViewOf(value) {
      const view = reasonViewOf(value);
      if (view === void 0) return void 0;
      return isSoundWarningCode(view.code) ? view : void 0;
    }
    var SOUND_WARNING_KEYS = {
      reasonSystemSoundFailed: "soundWarnPlaybackFailed",
      reasonSystemToneUnwritable: "soundWarnToneUnwritable",
      reasonSkipEnvironment: "soundWarnNoPlayback"
    };
    function soundWarningText(value, t2) {
      const view = soundWarningViewOf(value);
      if (view === void 0) return "";
      const key = SOUND_WARNING_KEYS[view.code];
      if (key === void 0) return "";
      return t2(key, view.params);
    }
    function soundWarningDetail(value) {
      const view = soundWarningViewOf(value);
      return view?.detail ?? "";
    }
    function projectDelivery(row, t2) {
      if (row.status === "ok") {
        const view = {
          channelId: row.channelId,
          status: row.status,
          statusText: t2("chStatusOk"),
          reason: "",
          detail: ""
        };
        const warning = soundWarningText(row.soundWarning, t2);
        if (warning !== "") {
          view.soundWarning = warning;
          const warningDetail = soundWarningDetail(row.soundWarning);
          if (warningDetail !== "") view.soundWarningDetail = warningDetail;
        }
        return view;
      }
      return {
        channelId: row.channelId,
        status: row.status,
        statusText: row.status === "failed" ? t2("chStatusFailed") : t2("chStatusSkipped"),
        reason: reasonText(row.reason, t2),
        detail: reasonDetail(row.reason)
      };
    }
    var DETAIL_SEPARATOR = " | ";
    function dryRunReasonText(status, reason, t2, soundWarning) {
      if (status === "ok") {
        const warning = soundWarningText(soundWarning, t2);
        if (warning === "") return "";
        const detail2 = soundWarningDetail(soundWarning);
        return detail2 === "" || detail2 === warning ? warning : warning + DETAIL_SEPARATOR + detail2;
      }
      const text = reasonText(reason, t2);
      const detail = reasonDetail(reason);
      return detail === "" || detail === text ? text : text + DETAIL_SEPARATOR + detail;
    }
    function reasonViewOf(value) {
      if (typeof value !== "object" || value === null || Array.isArray(value)) return void 0;
      const source = value;
      if (typeof source.code !== "string" || source.code === "") return void 0;
      const view = { code: source.code };
      const params = paramsOf2(source.params);
      if (params !== void 0) view.params = params;
      if (typeof source.detail === "string" && source.detail !== "") view.detail = source.detail;
      return view;
    }
    function knownKeyOf(code) {
      return Object.prototype.hasOwnProperty.call(REASON_KEYS, code) ? REASON_KEYS[code] : void 0;
    }
    function paramsOf2(value) {
      if (typeof value !== "object" || value === null || Array.isArray(value)) return void 0;
      return Object.keys(value).length > 0 ? value : void 0;
    }

    // src/client/settings/panes/channels.tsx
    var React11 = __toESM(require("react"), 1);

    // src/client/settings/channels/bark-card.tsx
    var React6 = __toESM(require("react"), 1);

    // src/client/settings/mask.ts
    var CREDENTIAL_MASK_PLACEHOLDER = "••••••••";
    function isCredentialConfigured(raw) {
      return typeof raw === "string" && raw !== "";
    }
    function credentialFieldKey(channelId, field) {
      return `${channelId}:${field}`;
    }
    function maskedFieldValue(raw, edited) {
      if (!edited) return "";
      return typeof raw === "string" ? raw : "";
    }
    function credentialFieldView(raw, edited, fallbackPlaceholder) {
      const configured = isCredentialConfigured(raw);
      return {
        value: maskedFieldValue(raw, edited),
        placeholder: configured ? CREDENTIAL_MASK_PLACEHOLDER : fallbackPlaceholder,
        configured
      };
    }

    // src/client/settings/parts/rows.tsx
    var React = __toESM(require("react"), 1);
    function chRow(cap, control, hint) {
      return /* @__PURE__ */ React.createElement("div", { className: "dn-ch-row" }, /* @__PURE__ */ React.createElement("span", { className: "dn-ch-cap" }, cap), /* @__PURE__ */ React.createElement("span", { className: "dn-ch-ctl" }, control), hint ? /* @__PURE__ */ React.createElement("span", { className: "dn-ch-hint" }, hint) : null);
    }
    function advRow(cap, control) {
      return /* @__PURE__ */ React.createElement("div", { className: "dn-adv-row" }, /* @__PURE__ */ React.createElement("span", { className: "dn-adv-cap" }, cap), control);
    }
    function deliveryLines(r, t2) {
      const list = Array.isArray(r.channels) ? r.channels : [];
      const views = [];
      list.forEach(function(delivery) {
        const view = deliveryViewOf(delivery, t2);
        if (view) views.push(view);
      });
      if (views.length === 0) return null;
      return /* @__PURE__ */ React.createElement("div", { className: "dn-set-historyChannels" }, views.map(function(view, j) {
        return /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "dn-ch-delivery dn-ch-delivery-" + view.status,
            key: view.channelId + "-" + j
          },
          /* @__PURE__ */ React.createElement("span", { className: "dn-ch-deliveryName" }, view.channelId),
          /* @__PURE__ */ React.createElement("span", { className: "dn-ch-deliveryStatus" }, view.statusText),
          view.reason ? /* @__PURE__ */ React.createElement("span", { className: "dn-ch-deliveryReason" }, view.reason) : null,
          view.soundWarning ? /* @__PURE__ */ React.createElement("span", { className: "dn-ch-deliveryReason" }, view.soundWarning) : null,
          view.detail ? /* @__PURE__ */ React.createElement("details", { className: "dn-ch-reasonRaw" }, /* @__PURE__ */ React.createElement("summary", null, t2("reasonDetailLabel")), /* @__PURE__ */ React.createElement("div", { className: "dn-ch-reasonRawText" }, view.detail)) : null,
          view.soundWarningDetail && view.soundWarningDetail !== view.soundWarning ? /* @__PURE__ */ React.createElement("details", { className: "dn-ch-reasonRaw" }, /* @__PURE__ */ React.createElement("summary", null, t2("reasonDetailLabel")), /* @__PURE__ */ React.createElement("div", { className: "dn-ch-reasonRawText" }, view.soundWarningDetail)) : null
        );
      }));
    }

    // src/client/settings/parts/controls.tsx
    var React2 = __toESM(require("react"), 1);
    function switchToggle(checked, onChange, ariaLabel) {
      return /* @__PURE__ */ React2.createElement("label", { className: "dn-switch" }, /* @__PURE__ */ React2.createElement(
        "input",
        {
          type: "checkbox",
          "aria-label": ariaLabel,
          checked: checked === true,
          onChange: function(e) {
            onChange(e.target.checked === true);
          }
        }
      ), /* @__PURE__ */ React2.createElement("span", { className: "dn-switch-track" }));
    }
    function switchControl(key, ariaLabel, settings, patch) {
      return switchToggle(
        settings[key] === true,
        function(v) {
          patch(function(prev) {
            const next = Object.assign({}, prev);
            next[key] = v;
            return next;
          });
        },
        ariaLabel
      );
    }
    function textInput(value, onChange, opts) {
      return /* @__PURE__ */ React2.createElement(
        "input",
        {
          type: opts && opts.type || "text",
          className: "dn-set-input dn-set-inputText",
          value: value === void 0 || value === null ? "" : String(value),
          placeholder: opts && opts.placeholder,
          "aria-label": opts && opts.ariaLabel || opts && opts.placeholder || void 0,
          onChange: function(e) {
            onChange(e.target.value);
          }
        }
      );
    }
    function numInput(value, onChange, opts) {
      return /* @__PURE__ */ React2.createElement(
        "input",
        {
          type: "number",
          step: 1,
          className: "dn-set-input dn-set-numInput",
          min: opts && opts.min,
          max: opts && opts.max,
          "aria-label": opts && opts.ariaLabel,
          value: value === void 0 || value === null ? "" : String(value),
          onChange: function(e) {
            onChange(e.target.value === "" ? void 0 : Number(e.target.value));
          }
        }
      );
    }

    // src/client/settings/parts/status.tsx
    var React4 = __toESM(require("react"), 1);

    // ../../shared/client/ui/index.js
    var React3 = __toESM(require("react"), 1);
    function Status(props) {
      const cls = `dsu-status${props.className ? ` ${props.className}` : ""}`;
      const a11y = props.label === void 0 ? { "aria-hidden": "true" } : { role: "img", "aria-label": props.label };
      return React3.createElement("span", { className: cls, "data-dsu-tone": props.tone, ...a11y });
    }

    // src/client/settings/parts/status.tsx
    function padTime(ts) {
      const d = new Date(ts);
      const pad = function(n) {
        return n < 10 ? "0" + n : String(n);
      };
      return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
    }
    function latestSkippedDelivery(channelKey, history) {
      if (!Array.isArray(history)) return void 0;
      for (const record of history) {
        const channels = record.channels;
        if (!Array.isArray(channels)) continue;
        for (const item of channels) {
          if (typeof item !== "object" || item === null || Array.isArray(item)) continue;
          const delivery = item;
          if (delivery.channelId === channelKey && delivery.status === "skipped") return delivery;
        }
      }
      return void 0;
    }
    function soundWarningCodeOf(raw) {
      if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return void 0;
      const code = raw.code;
      return typeof code === "string" && isSoundWarningCode(code) ? code : void 0;
    }
    function statusText(channelKey, statusMap, t2, history) {
      const st = statusMap[channelKey];
      if (!st || !st.lastTs) {
        const skipped = latestSkippedDelivery(channelKey, history);
        if (skipped === void 0) return t2("chNeverSent");
        const skippedWhy = reasonText(skipped.reason, t2);
        return t2("chNeverSent") + (skippedWhy ? " · " + skippedWhy : "") + t2("chSkippedSeeHistory");
      }
      if (st.lastStatus === "ok") {
        const base = t2("chLastOk") + " · " + padTime(st.lastTs);
        const warning = soundWarningText(st.lastSoundWarning, t2);
        return warning === "" ? base : base + " · " + warning;
      }
      const why = reasonText(st.lastError, t2);
      return t2("chLastFail") + " · " + padTime(st.lastTs) + (why ? ": " + why : "");
    }
    function statusTone(channelKey, statusMap) {
      const st = statusMap[channelKey];
      if (!st || !st.lastTs) return "off";
      if (st.lastStatus !== "ok") return "err";
      return soundWarningCodeOf(st.lastSoundWarning) === void 0 ? "ok" : "warn";
    }
    function statusDot(channelKey, statusMap) {
      return /* @__PURE__ */ React4.createElement(Status, { tone: statusTone(channelKey, statusMap) });
    }
    function testBtn(channelId, sendTest, t2, dirty) {
      return /* @__PURE__ */ React4.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-btn dn-set-btnSmall" + (dirty === true ? " dn-test-dirty" : ""),
          title: dirty === true ? t2("chTestDraftTitle") : void 0,
          onClick: function() {
            sendTest(channelId);
          }
        },
        dirty === true ? t2("chTestDraft") : t2("chTest"),
        dirty === true ? /* @__PURE__ */ React4.createElement("span", { className: "dn-test-dirtyBadge" }, t2("chTestDraftBadge")) : null
      );
    }
    function delArmedBtn(armed, channelId, remove, setArmedId, t2) {
      return /* @__PURE__ */ React4.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-btn dn-set-btnSmall" + (armed ? " dn-set-btnDanger" : ""),
          onClick: function() {
            if (armed) {
              remove();
              setArmedId(null);
            } else {
              setArmedId(channelId);
              setTimeout(function() {
                setArmedId(null);
              }, 3e3);
            }
          }
        },
        armed ? t2("chDeleteConfirm") : t2("chDelete")
      );
    }
    function failBadge(channelKey, statusMap, t2) {
      const st = statusMap[channelKey];
      if (!st || !st.lastTs || st.lastStatus !== "failed") return null;
      return /* @__PURE__ */ React4.createElement("span", { className: "dn-ch-failBadge" }, t2("chLastFail") + " · " + padTime(st.lastTs));
    }

    // src/client/settings/channels/channel-icon.tsx
    var React5 = __toESM(require("react"), 1);
    function iconEl(channelType) {
      let paths;
      if (channelType === "browser") {
        paths = [
          /* @__PURE__ */ React5.createElement("circle", { cx: 12, cy: 12, r: 9, key: "c" }),
          /* @__PURE__ */ React5.createElement(
            "path",
            {
              d: "M3 12h18M12 3c2.5 2.6 4 5.7 4 9s-1.5 6.4-4 9c-2.5-2.6-4-5.7-4-9s1.5-6.4 4-9z",
              key: "p"
            }
          )
        ];
      } else if (channelType === "system") {
        paths = [
          /* @__PURE__ */ React5.createElement("rect", { x: 3, y: 4, width: 18, height: 12, rx: 2, key: "r" }),
          /* @__PURE__ */ React5.createElement("path", { d: "M8 20h8M12 16v4", key: "p" })
        ];
      } else if (channelType === "webhook") {
        paths = [/* @__PURE__ */ React5.createElement("path", { d: "M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8z", key: "p", strokeLinejoin: "round" })];
      } else {
        paths = [
          /* @__PURE__ */ React5.createElement("path", { d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9", key: "a" }),
          /* @__PURE__ */ React5.createElement("path", { d: "M13.7 21a2 2 0 0 1-3.4 0", key: "b" })
        ];
      }
      return /* @__PURE__ */ React5.createElement("span", { className: "dn-ch-icon" }, /* @__PURE__ */ React5.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 }, paths));
    }

    // src/client/settings/channels/bark-card.tsx
    function suggestKindsOf(kindsList) {
      const suggestKinds = Object.keys(KIND_KEYS);
      (kindsList || []).forEach(function(k) {
        if (suggestKinds.indexOf(String(k.id)) === -1) suggestKinds.push(String(k.id));
      });
      return suggestKinds;
    }
    function levelsEditor(props) {
      const { idx, chId, levels, levelOpts, suggestKinds, newRow, t: t2, chLevelsSet, setNewRow } = props;
      const dlId = "dn-levels-suggest-" + chId;
      const levelKeys = Object.keys(levels);
      const levelsRows = levelKeys.map(function(kind) {
        return /* @__PURE__ */ React6.createElement("div", { className: "dn-levels-row", key: "lv-" + kind }, /* @__PURE__ */ React6.createElement("span", { className: "dn-levels-kind" }, KIND_KEYS[kind] !== void 0 ? t2(KIND_KEYS[kind]) + " (" + kind + ")" : kind), /* @__PURE__ */ React6.createElement(
          "select",
          {
            className: "dn-set-input dn-set-select",
            value: levels[kind] || "",
            onChange: function(e) {
              chLevelsSet(idx, kind, e.target.value);
            }
          },
          levelOpts
        ), /* @__PURE__ */ React6.createElement(
          "button",
          {
            type: "button",
            className: "dn-set-btn dn-set-btnSmall",
            onClick: function() {
              chLevelsSet(idx, kind, "");
            }
          },
          t2("chLevelsRemove")
        ));
      });
      const newKindKnown = suggestKinds.indexOf(newRow.kind) !== -1;
      return /* @__PURE__ */ React6.createElement(React6.Fragment, null, /* @__PURE__ */ React6.createElement("div", { className: "dn-set-note-inline" }, t2("chLevelsHint")), levelKeys.length === 0 ? /* @__PURE__ */ React6.createElement("div", { className: "dn-set-note-inline" }, t2("chLevelsEmpty")) : levelsRows, /* @__PURE__ */ React6.createElement("div", { className: "dn-levels-add", key: "lv-add" }, /* @__PURE__ */ React6.createElement(
        "input",
        {
          type: "text",
          className: "dn-set-input dn-set-inputText",
          list: dlId,
          placeholder: t2("chLevelsKindPlaceholder"),
          value: newRow.kind,
          onChange: function(e) {
            setNewRow({ kind: e.target.value, level: newRow.level });
          }
        }
      ), /* @__PURE__ */ React6.createElement(
        "select",
        {
          className: "dn-set-input dn-set-select",
          value: newRow.level,
          onChange: function(e) {
            setNewRow({ kind: newRow.kind, level: e.target.value });
          }
        },
        levelOpts
      ), /* @__PURE__ */ React6.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-btn dn-set-btnSmall",
          onClick: function() {
            if (newRow.kind) {
              chLevelsSet(idx, newRow.kind, newRow.level);
              setNewRow({ kind: "", level: "active" });
            }
          }
        },
        t2("chLevelsAdd")
      ), newRow.kind && !newKindKnown ? /* @__PURE__ */ React6.createElement("span", { className: "dn-set-note-inline" }, t2("chLevelsUnknown")) : null), /* @__PURE__ */ React6.createElement("datalist", { id: dlId }, suggestKinds.map(function(k) {
        return /* @__PURE__ */ React6.createElement("option", { value: k, key: k }, k);
      })));
    }
    function barkCard(ch, idx, kindsList, delArmedId, setDelArmedId, levelsNew, setLevelsNew, secretEdited, markSecretEdited, chPatch, chLevelsSet, chRemove, sendTest, statusMap, t2, history, testDirty) {
      const channelKey = channelIdFor(ch);
      const armed = delArmedId === ch.id;
      const deviceKeyKey = credentialFieldKey(String(ch.id), "deviceKey");
      const levelOpts = [
        /* @__PURE__ */ React6.createElement("option", { value: "", key: "auto" }, t2("chLevelAuto"))
      ];
      BARK_LEVELS.forEach(function(lv) {
        levelOpts.push(
          /* @__PURE__ */ React6.createElement("option", { value: lv, key: lv }, lv)
        );
      });
      const setNewRow = (next) => {
        setLevelsNew(Object.assign({}, levelsNew, { [String(ch.id)]: next }));
      };
      return /* @__PURE__ */ React6.createElement(
        "details",
        {
          className: "dn-ch-card" + (ch.enabled ? "" : " dn-ch-off"),
          key: channelKey + ":" + (ch.enabled === true),
          open: ch.enabled === true
        },
        /* @__PURE__ */ React6.createElement("summary", null, iconEl("bark"), /* @__PURE__ */ React6.createElement("span", { className: "dn-ch-name" }, ch.name || ch.id), /* @__PURE__ */ React6.createElement("span", { className: "dn-ch-type" }, "bark"), /* @__PURE__ */ React6.createElement("span", { className: "dn-ch-stateTxt" }, ch.enabled === true ? t2("chStateOn") : t2("chStateOff")), statusDot(channelKey, statusMap), /* @__PURE__ */ React6.createElement("span", { className: "dn-ch-statusTxt", title: statusText(channelKey, statusMap, t2, history) }, statusText(channelKey, statusMap, t2, history)), failBadge(channelKey, statusMap, t2), /* @__PURE__ */ React6.createElement("span", { className: "dn-ch-summaryRight" }, switchToggle(
          ch.enabled === true,
          function(v) {
            chPatch(idx, { enabled: v });
          },
          (ch.enabled ? t2("chToggleOff") : t2("chToggleOn")) + (ch.name || ch.id)
        ))),
        /* @__PURE__ */ React6.createElement("div", { className: "dn-ch-body" }, chRow(
          t2("chBarkName"),
          textInput(
            ch.name,
            function(v) {
              chPatch(idx, { name: v });
            },
            { placeholder: t2("chBarkNamePlaceholder"), ariaLabel: t2("chBarkName") }
          )
        ), chRow(
          t2("chBarkBaseUrl"),
          textInput(
            ch.baseUrl,
            function(v) {
              chPatch(idx, { baseUrl: v });
            },
            { placeholder: "https://api.day.app", ariaLabel: t2("chBarkBaseUrl") }
          ),
          t2("chBarkBaseUrlHint")
        ), chRow(
          t2("chBarkDeviceKey"),
          /* @__PURE__ */ React6.createElement("span", { className: "dn-secret", key: "deviceKey" }, /* @__PURE__ */ React6.createElement(
            "input",
            {
              type: "password",
              className: "dn-set-input dn-set-inputText",
              value: credentialFieldView(
                ch.deviceKey,
                secretEdited[deviceKeyKey] === true,
                t2("chBarkDeviceKeyPlaceholder")
              ).value,
              placeholder: credentialFieldView(
                ch.deviceKey,
                secretEdited[deviceKeyKey] === true,
                t2("chBarkDeviceKeyPlaceholder")
              ).placeholder,
              "aria-label": t2("chBarkDeviceKey"),
              onChange: function(e) {
                markSecretEdited(deviceKeyKey);
                chPatch(idx, { deviceKey: e.target.value });
              }
            }
          )),
          t2("chBarkDeviceKeyHint")
        ), /* @__PURE__ */ React6.createElement("details", { className: "dn-ch-adv", key: "adv-" + ch.id }, /* @__PURE__ */ React6.createElement("summary", null, t2("chAdvanced")), /* @__PURE__ */ React6.createElement("div", { className: "dn-ch-adv-body" }, advRow(
          t2("chBarkSound"),
          textInput(
            ch.sound,
            function(v) {
              chPatch(idx, { sound: v });
            },
            { ariaLabel: t2("chBarkSound") }
          )
        ), advRow(
          t2("chBarkGroup"),
          textInput(
            ch.group,
            function(v) {
              chPatch(idx, { group: v });
            },
            { ariaLabel: t2("chBarkGroup") }
          )
        ), /* @__PURE__ */ React6.createElement("div", { className: "dn-set-note-inline" }, t2("chBarkGroupHint")), advRow(
          t2("chBarkIcon"),
          textInput(
            ch.icon,
            function(v) {
              chPatch(idx, { icon: v });
            },
            { ariaLabel: t2("chBarkIcon") }
          )
        ), /* @__PURE__ */ React6.createElement("div", { className: "dn-set-note-inline" }, t2("chBarkIconHint")), advRow(
          t2("chBarkUrl"),
          textInput(
            ch.url,
            function(v) {
              chPatch(idx, { url: v });
            },
            { ariaLabel: t2("chBarkUrl") }
          )
        ), advRow(
          t2("chBarkBadge"),
          numInput(
            ch.badge,
            function(v) {
              chPatch(idx, { badge: v });
            },
            { ariaLabel: t2("chBarkBadge") }
          )
        ), advRow(
          t2("chBarkLevel"),
          /* @__PURE__ */ React6.createElement(
            "select",
            {
              className: "dn-set-input dn-set-select",
              value: ch.level || "",
              "aria-label": t2("chBarkLevel"),
              onChange: function(e) {
                chPatch(idx, { level: e.target.value || void 0 });
              }
            },
            levelOpts
          )
        ), /* @__PURE__ */ React6.createElement("div", { className: "dn-set-note-inline" }, t2("chBarkLevelHint")), levelsEditor({
          idx,
          chId: String(ch.id),
          levels: ch.levels || {},
          levelOpts,
          suggestKinds: suggestKindsOf(kindsList),
          newRow: levelsNew[String(ch.id)] || { kind: "", level: "active" },
          t: t2,
          chLevelsSet,
          setNewRow
        }))), /* @__PURE__ */ React6.createElement("div", { className: "dn-ch-actions" }, testBtn(channelKey, sendTest, t2, testDirty), delArmedBtn(
          armed,
          ch.id,
          function() {
            chRemove(idx);
          },
          setDelArmedId,
          t2
        )))
      );
    }

    // src/client/settings/channels/builtin-card.tsx
    var React9 = __toESM(require("react"), 1);

    // src/client/settings/parts/diagnostics.tsx
    var React7 = __toESM(require("react"), 1);
    function browserPermLine(t2, secureContext, onRequestPermission) {
      if (!("Notification" in window) || !secureContext) return null;
      let text = "";
      let pending = false;
      if (Notification.permission === "granted") text = t2("permGranted");
      else if (Notification.permission === "denied") text = t2("permDenied");
      else {
        text = t2("permDefault");
        pending = true;
      }
      return /* @__PURE__ */ React7.createElement("div", { className: "dn-ch-perm" }, /* @__PURE__ */ React7.createElement("span", { className: "dn-ch-permText" }, text), pending ? /* @__PURE__ */ React7.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-btn dn-set-btnSmall",
          onClick: function() {
            onRequestPermission();
          }
        },
        t2("requestPerm")
      ) : null);
    }
    function systemPlatformHint(hostPlatform, t2) {
      let text;
      if (hostPlatform === "win32") text = t2("sysPlatformWin");
      else if (hostPlatform === "darwin") text = t2("sysPlatformMac");
      else if (hostPlatform === "linux") text = t2("sysPlatformLinux");
      else text = t2("sysPlatformOther");
      return /* @__PURE__ */ React7.createElement("div", { className: "dn-set-note-inline" }, text);
    }
    function hostDiagnosticsBlock(diag) {
      const view = diag.host;
      if (!view) return null;
      return /* @__PURE__ */ React7.createElement("div", { className: "dn-ch-diag dn-ch-diag-" + view.tone }, /* @__PURE__ */ React7.createElement("span", { className: "dn-ch-diagText" }, view.line), view.unknownLine ? /* @__PURE__ */ React7.createElement("span", { className: "dn-ch-diagText" }, view.unknownLine) : null, view.remediationLines.length === 0 ? null : /* @__PURE__ */ React7.createElement("div", null, /* @__PURE__ */ React7.createElement("span", { className: "dn-ch-diagCap" }, view.remediationTitle), /* @__PURE__ */ React7.createElement("ul", { className: "dn-ch-diagItems" }, view.remediationLines.map(function(text, i) {
        return /* @__PURE__ */ React7.createElement("li", { key: "rem-" + i }, text);
      }))), /* @__PURE__ */ React7.createElement("details", { className: "dn-ch-reasonRaw" }, /* @__PURE__ */ React7.createElement("summary", null, view.detailsLabel), /* @__PURE__ */ React7.createElement("div", { className: "dn-ch-reasonRawText" }, /* @__PURE__ */ React7.createElement("div", { className: "dn-ch-diagSrc" }, view.sourceLabel), view.details.map(function(row, i) {
        return /* @__PURE__ */ React7.createElement("div", { className: "dn-ch-diagDetail", key: "det-" + i }, /* @__PURE__ */ React7.createElement("span", { className: "dn-ch-diagDetailCap" }, row.label), /* @__PURE__ */ React7.createElement("span", null, row.value));
      }))));
    }
    function browserDiagnosticsLine(diag) {
      const view = diag.browser;
      return /* @__PURE__ */ React7.createElement("div", { className: "dn-ch-diag dn-ch-diag-" + view.tone }, /* @__PURE__ */ React7.createElement("span", { className: "dn-ch-diagText" }, view.line), /* @__PURE__ */ React7.createElement("span", { className: "dn-ch-diagSrc" }, view.sourceLabel));
    }

    // src/client/settings/channels/sound-row.tsx
    var React8 = __toESM(require("react"), 1);
    var SOUND_OPTION_KEYS = {
      ding: "toneDing",
      bell: "toneBell",
      chime: "toneChime",
      pop: "tonePop"
    };
    function soundRow(index, ch, channelLabel, soundOn, t2, chPatch, audioEngine2) {
      const soundVal = ch.sound;
      const toneValue = isSoundId(soundVal) ? soundVal : "";
      const toneOpts = [
        /* @__PURE__ */ React8.createElement("option", { value: "", key: "sys" }, t2("chSoundFollow"))
      ].concat(
        SOUND_IDS.map(function(id) {
          return /* @__PURE__ */ React8.createElement("option", { value: id, key: id }, t2(SOUND_OPTION_KEYS[id]));
        })
      );
      return /* @__PURE__ */ React8.createElement("div", { className: "dn-ch-row", key: "sound-" + channelIdOf(ch) }, /* @__PURE__ */ React8.createElement("span", { className: "dn-ch-cap" }, t2("chSound")), /* @__PURE__ */ React8.createElement("span", { className: "dn-ch-ctl" }, switchToggle(
        soundOn,
        function(v) {
          audioEngine2.unlock();
          chPatch(index, { sound: v });
        },
        t2("chSound") + " " + channelLabel
      ), soundOn ? /* @__PURE__ */ React8.createElement(
        "select",
        {
          className: "dn-set-input dn-set-select",
          value: toneValue,
          "aria-label": t2("chSoundTone"),
          onChange: function(e) {
            audioEngine2.unlock();
            chPatch(index, { sound: e.target.value === "" ? true : e.target.value });
          }
        },
        toneOpts
      ) : null, soundOn ? /* @__PURE__ */ React8.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-btn dn-set-btnSmall dn-tonePreview",
          "aria-label": t2("chSoundPreview"),
          onClick: function() {
            audioEngine2.playPreview(toneValue || void 0);
          }
        },
        "▶ ",
        t2("chSoundPreview")
      ) : null, toneValue === "" && soundOn ? /* @__PURE__ */ React8.createElement("span", { className: "dn-ch-hint" }, t2("chSoundFollowHint")) : null));
    }

    // src/client/settings/channels/builtin-card.tsx
    function soundIsOn(value) {
      return value === true || isSoundId(value);
    }
    function builtinState(enabled, popup, soundOn, t2) {
      if (!enabled) return { stateClass: " dn-ch-off", stateText: t2("chStateOff") };
      if (!popup && soundOn) return { stateClass: " dn-ch-sound", stateText: t2("chStateSound") };
      return { stateClass: "", stateText: t2("chStateOn") };
    }
    function builtinSoundNote(enabled, popup, soundOn, t2) {
      if (!enabled || popup) return null;
      return /* @__PURE__ */ React9.createElement("div", { className: "dn-set-note-inline dn-soundOnly" }, soundOn ? t2("chSoundOnlyNote") : t2("chPopupSoundOffNote"));
    }
    function builtinTypeRows(props) {
      const { type, t: t2, diag, hostPlatform, isSecureContext: isSecureContext2, requestNotificationPermission } = props;
      if (type === "browser") {
        return /* @__PURE__ */ React9.createElement(React9.Fragment, null, browserPermLine(t2, isSecureContext2(), requestNotificationPermission), browserDiagnosticsLine(diag));
      }
      if (type === "system") {
        return /* @__PURE__ */ React9.createElement(React9.Fragment, null, systemPlatformHint(hostPlatform, t2), hostDiagnosticsBlock(diag));
      }
      return null;
    }
    function builtinCard(index, ch, label, statusMap, hostPlatform, diag, chPatch, sendTest, isSecureContext2, requestNotificationPermission, audioEngine2, t2, history, testDirty) {
      const channelId = channelIdOf(ch);
      const enabled = ch.enabled === true;
      const popup = ch.popup === true;
      const soundOn = soundIsOn(ch.sound);
      const state = builtinState(enabled, popup, soundOn, t2);
      const extras = [];
      extras.push(
        chRow(
          t2("chPopup"),
          switchToggle(
            popup,
            function(v) {
              chPatch(index, { popup: v });
            },
            t2("chPopup") + " " + label
          )
        )
      );
      if (ch.type === "browser") {
        extras.push(
          chRow(
            t2("chWhenVisible"),
            switchToggle(
              ch.whenVisible === true,
              function(v) {
                chPatch(index, { whenVisible: v });
              },
              t2("chWhenVisible") + " " + label
            )
          )
        );
      }
      extras.push(soundRow(index, ch, label, soundOn, t2, chPatch, audioEngine2));
      return /* @__PURE__ */ React9.createElement(
        "details",
        {
          className: "dn-ch-card" + state.stateClass,
          key: "ch-" + channelId + ":" + enabled + ":" + popup + ":" + soundOn,
          open: enabled
        },
        /* @__PURE__ */ React9.createElement("summary", null, iconEl(String(ch.type)), /* @__PURE__ */ React9.createElement("span", { className: "dn-ch-name" }, label), /* @__PURE__ */ React9.createElement("span", { className: "dn-ch-type" }, t2("chTypeBuiltin")), /* @__PURE__ */ React9.createElement("span", { className: "dn-ch-stateTxt" }, state.stateText), statusDot(channelId, statusMap), /* @__PURE__ */ React9.createElement("span", { className: "dn-ch-statusTxt", title: statusText(channelId, statusMap, t2, history) }, statusText(channelId, statusMap, t2, history)), failBadge(channelId, statusMap, t2), /* @__PURE__ */ React9.createElement("span", { className: "dn-ch-summaryRight" }, switchToggle(
          enabled,
          function(v) {
            chPatch(index, { enabled: v });
          },
          (enabled ? t2("chToggleOff") : t2("chToggleOn")) + label
        ))),
        /* @__PURE__ */ React9.createElement("div", { className: "dn-ch-body" }, extras, builtinSoundNote(enabled, popup, soundOn, t2), builtinTypeRows({
          type: String(ch.type),
          t: t2,
          diag,
          hostPlatform,
          isSecureContext: isSecureContext2,
          requestNotificationPermission
        }), /* @__PURE__ */ React9.createElement("div", { className: "dn-ch-actions" }, testBtn(channelId, sendTest, t2, testDirty)))
      );
    }

    // src/client/settings/channels/webhook-card.tsx
    var React10 = __toESM(require("react"), 1);
    var WEBHOOK_PRESETS2 = {
      ntfy: { auth: "bearer", template: webhookTemplateOf("ntfy") },
      gotify: { auth: "bearer", template: webhookTemplateOf("gotify") },
      custom: { auth: "header", template: webhookTemplateOf("custom") }
    };
    function webhookAuthValue(auth) {
      const value = String(auth || "none");
      return WEBHOOK_AUTHS.indexOf(value) !== -1 ? value : "none";
    }
    function webhookAuthControls(props) {
      const { authValue, ch, t: t2, revealMap, secretEdited, markSecretEdited, setRevealMap, whPatch } = props;
      const chId = String(ch.id);
      function secretField(field, placeholderKey) {
        const key = credentialFieldKey(chId, field);
        const shown2 = revealMap[key] === true;
        const fieldView = credentialFieldView(ch[field], secretEdited[key] === true, t2(placeholderKey));
        const part = {};
        return /* @__PURE__ */ React10.createElement("span", { className: "dn-secret", key: field }, /* @__PURE__ */ React10.createElement(
          "input",
          {
            type: shown2 ? "text" : "password",
            className: "dn-set-input dn-set-inputText",
            value: fieldView.value,
            placeholder: fieldView.placeholder,
            "aria-label": t2(placeholderKey),
            onChange: function(e) {
              markSecretEdited(key);
              part[field] = e.target.value;
              whPatch(part);
            }
          }
        ), /* @__PURE__ */ React10.createElement(
          "button",
          {
            type: "button",
            className: "dn-secret-reveal",
            onClick: function() {
              const next = Object.assign({}, revealMap);
              next[key] = !shown2;
              setRevealMap(next);
            }
          },
          shown2 ? t2("secretHide") : t2("secretShow")
        ));
      }
      const controls = [
        /* @__PURE__ */ React10.createElement(
          "select",
          {
            key: "auth-select",
            className: "dn-set-input dn-set-select",
            value: authValue,
            "aria-label": t2("whAuth"),
            onChange: function(e) {
              whPatch({ auth: e.target.value });
            }
          },
          /* @__PURE__ */ React10.createElement("option", { value: "none" }, t2("whAuthNone")),
          /* @__PURE__ */ React10.createElement("option", { value: "bearer" }, t2("whAuthBearer")),
          /* @__PURE__ */ React10.createElement("option", { value: "basic" }, t2("whAuthBasic")),
          /* @__PURE__ */ React10.createElement("option", { value: "header" }, t2("whAuthHeader"))
        )
      ];
      if (authValue === "bearer") {
        controls.push(secretField("token", "whAuthToken"));
        return controls;
      }
      if (authValue === "basic") {
        controls.push(
          plainInput("username", ch.username || "", t2("whAuthUsername"), function(v) {
            whPatch({ username: v });
          })
        );
        controls.push(secretField("password", "whAuthPassword"));
        return controls;
      }
      if (authValue === "header") {
        controls.push(
          plainInput("headerName", ch.headerName || "", t2("whAuthHeaderName"), function(v) {
            whPatch({ headerName: v });
          })
        );
        controls.push(secretField("headerValue", "whAuthHeaderValue"));
      }
      return controls;
    }
    function plainInput(key, value, label, onValue) {
      return /* @__PURE__ */ React10.createElement(
        "input",
        {
          key,
          type: "text",
          className: "dn-set-input dn-set-inputText",
          value,
          placeholder: label,
          "aria-label": label,
          onChange: function(e) {
            onValue(e.target.value);
          }
        }
      );
    }
    function insertTokenAtCursor(chId, token, current, patch) {
      const ta = document.getElementById("dn-tpl-" + chId);
      if (!ta) {
        patch(current + token);
        return;
      }
      const at = ta.selectionStart === null || ta.selectionStart === void 0 ? ta.value.length : ta.selectionStart;
      patch(ta.value.slice(0, at) + token + ta.value.slice(at));
    }
    function webhookCard(ch, idx, delArmedId, setDelArmedId, revealMap, setRevealMap, secretEdited, markSecretEdited, chPatch, chRemove, sendTest, statusMap, t2, history, testDirty) {
      const channelKey = channelIdFor(ch);
      const armed = delArmedId === ch.id;
      const authValue = webhookAuthValue(ch.auth);
      const chId = String(ch.id);
      const whPatch = (part) => {
        chPatch(idx, part);
      };
      const authCtl = webhookAuthControls({
        authValue,
        ch,
        t: t2,
        revealMap,
        secretEdited,
        markSecretEdited,
        setRevealMap,
        whPatch
      });
      const textTokens = [
        "{{title}}",
        "{{message}}",
        "{{kind}}",
        "{{severity}}",
        "{{priority}}",
        "{{source}}"
      ];
      const insertTpl = (token) => {
        insertTokenAtCursor(chId, token, ch.template || "", function(next) {
          chPatch(idx, { template: next });
        });
      };
      const tplChips = textTokens.map(function(tok) {
        return /* @__PURE__ */ React10.createElement(
          "button",
          {
            type: "button",
            key: tok,
            className: "dn-tpl-chip",
            title: t2("whTemplateHint"),
            onClick: function() {
              insertTpl(tok);
            }
          },
          tok
        );
      });
      tplChips.push(
        /* @__PURE__ */ React10.createElement(
          "button",
          {
            type: "button",
            key: "{{ts}}",
            className: "dn-tpl-chip is-raw",
            title: "{{ts}} → " + String(Date.now()) + " (число без кавычек)",
            onClick: function() {
              insertTpl("{{ts}}");
            }
          },
          "{{ts}}"
        )
      );
      return /* @__PURE__ */ React10.createElement(
        "details",
        {
          className: "dn-ch-card" + (ch.enabled ? "" : " dn-ch-off"),
          key: channelKey + ":" + (ch.enabled === true),
          open: ch.enabled === true
        },
        /* @__PURE__ */ React10.createElement("summary", null, iconEl("webhook"), /* @__PURE__ */ React10.createElement("span", { className: "dn-ch-name" }, ch.name || ch.id), /* @__PURE__ */ React10.createElement("span", { className: "dn-ch-type" }, "webhook"), /* @__PURE__ */ React10.createElement("span", { className: "dn-ch-stateTxt" }, ch.enabled === true ? t2("chStateOn") : t2("chStateOff")), statusDot(channelKey, statusMap), /* @__PURE__ */ React10.createElement("span", { className: "dn-ch-statusTxt", title: statusText(channelKey, statusMap, t2, history) }, statusText(channelKey, statusMap, t2, history)), failBadge(channelKey, statusMap, t2), /* @__PURE__ */ React10.createElement("span", { className: "dn-ch-summaryRight" }, switchToggle(
          ch.enabled === true,
          function(v) {
            whPatch({ enabled: v });
          },
          (ch.enabled ? t2("chToggleOff") : t2("chToggleOn")) + (ch.name || ch.id)
        ))),
        /* @__PURE__ */ React10.createElement("div", { className: "dn-ch-body" }, chRow(
          t2("whPreset"),
          /* @__PURE__ */ React10.createElement(
            "select",
            {
              className: "dn-set-input dn-set-select",
              value: "",
              "aria-label": t2("whPreset"),
              onChange: function(e) {
                const p = WEBHOOK_PRESETS2[e.target.value];
                if (!p) return;
                whPatch({ preset: e.target.value, auth: p.auth, template: p.template });
              }
            },
            /* @__PURE__ */ React10.createElement("option", { value: "" }, t2("whPreset")),
            /* @__PURE__ */ React10.createElement("option", { value: "ntfy" }, t2("whPresetNtfy")),
            /* @__PURE__ */ React10.createElement("option", { value: "gotify" }, t2("whPresetGotify")),
            /* @__PURE__ */ React10.createElement("option", { value: "custom" }, t2("whPresetCustom"))
          ),
          t2("whPresetHint")
        ), chRow(
          t2("chBarkName"),
          textInput(
            ch.name,
            function(v) {
              whPatch({ name: v });
            },
            { placeholder: t2("chBarkNamePlaceholder"), ariaLabel: t2("chBarkName") }
          )
        ), chRow(
          t2("whUrl"),
          textInput(
            ch.url,
            function(v) {
              whPatch({ url: v });
            },
            { placeholder: t2("whUrlPlaceholder"), ariaLabel: t2("whUrl") }
          ),
          t2("whUrlHint")
        ), chRow(t2("whAuth"), /* @__PURE__ */ React10.createElement("span", { className: "dn-authFields" }, authCtl), t2("whAuthHint")), chRow(
          t2("whTimeout"),
          numInput(
            ch.timeoutSec,
            function(v) {
              whPatch({
                timeoutSec: v === void 0 ? void 0 : Math.min(60, Math.max(1, Math.round(v)))
              });
            },
            { ariaLabel: t2("whTimeout"), min: 1, max: 60 }
          ),
          t2("whTimeoutHint")
        ), /* @__PURE__ */ React10.createElement("div", { className: "dn-ch-row", style: { display: "block" } }, /* @__PURE__ */ React10.createElement("div", { className: "dn-ch-cap", style: { marginBottom: "6px" } }, t2("whTemplate")), /* @__PURE__ */ React10.createElement(
          "textarea",
          {
            id: "dn-tpl-" + chId,
            className: "dn-tpl",
            spellCheck: false,
            "aria-label": t2("whTemplate"),
            value: ch.template || "",
            onChange: function(e) {
              whPatch({ template: e.target.value });
            }
          }
        ), /* @__PURE__ */ React10.createElement("div", { className: "dn-tplChips" }, /* @__PURE__ */ React10.createElement("span", { className: "dn-tplCap" }, t2("routeCap") + ":"), tplChips, /* @__PURE__ */ React10.createElement(
          "button",
          {
            type: "button",
            className: "dn-set-btn dn-set-btnSmall",
            onClick: function() {
              const p = WEBHOOK_PRESETS2[String(ch.preset || "ntfy")];
              if (p) whPatch({ template: p.template });
            }
          },
          t2("whTplRestore")
        )), /* @__PURE__ */ React10.createElement("span", { className: "dn-ch-hint" }, t2("whTemplateHint")), /* @__PURE__ */ React10.createElement("span", { className: "dn-ch-hint" }, t2("whTemplateFailHint"))), /* @__PURE__ */ React10.createElement("div", { className: "dn-ch-actions" }, testBtn(channelKey, sendTest, t2, testDirty), delArmedBtn(
          armed,
          ch.id,
          function() {
            chRemove(idx);
          },
          setDelArmedId,
          t2
        )))
      );
    }

    // src/client/settings/panes/channels.tsx
    function channelsPane(deps) {
      const {
        settings,
        statusMap,
        history,
        hostPlatform,
        diag,
        channelLabel,
        chPatch,
        chRemove,
        chLevelsSet,
        chAdd,
        sendTest,
        isSecureContext: isSecureContext2,
        requestNotificationPermission,
        audioEngine: audioEngine2,
        kindsList,
        delArmedId,
        setDelArmedId,
        levelsNew,
        setLevelsNew,
        revealMap,
        setRevealMap,
        secretEdited,
        markSecretEdited,
        saving,
        saveFor,
        testDirty,
        t: t2
      } = deps;
      const channelsChildren = [];
      (settings.channels || []).forEach(function(c, i) {
        if (c.type === "browser" || c.type === "system") {
          channelsChildren.push(
            builtinCard(
              i,
              c,
              channelLabel(c),
              statusMap,
              hostPlatform,
              diag,
              chPatch,
              sendTest,
              isSecureContext2,
              requestNotificationPermission,
              audioEngine2,
              t2,
              history,
              testDirty
            )
          );
          return;
        }
        channelsChildren.push(
          String(c.type) === "webhook" ? webhookCard(
            c,
            i,
            delArmedId,
            setDelArmedId,
            revealMap,
            setRevealMap,
            secretEdited,
            markSecretEdited,
            chPatch,
            chRemove,
            sendTest,
            statusMap,
            t2,
            history,
            testDirty
          ) : barkCard(
            c,
            i,
            kindsList,
            delArmedId,
            setDelArmedId,
            levelsNew,
            setLevelsNew,
            secretEdited,
            markSecretEdited,
            chPatch,
            chLevelsSet,
            chRemove,
            sendTest,
            statusMap,
            t2,
            history,
            testDirty
          )
        );
      });
      channelsChildren.push(
        /* @__PURE__ */ React11.createElement("div", { className: "dn-ch-add", key: "ch-add" }, /* @__PURE__ */ React11.createElement(
          "button",
          {
            type: "button",
            className: "dn-set-btn",
            onClick: function() {
              chAdd("bark");
            }
          },
          t2("chAddBark")
        ), /* @__PURE__ */ React11.createElement(
          "button",
          {
            type: "button",
            className: "dn-set-btn dn-set-btnPrimary",
            onClick: function() {
              chAdd("webhook");
            }
          },
          t2("chAddWebhook")
        ))
      );
      const channelsDomainSave = /* @__PURE__ */ React11.createElement("div", { className: "dn-ch-domainSave", key: "ch-domain-save" }, /* @__PURE__ */ React11.createElement("span", { className: "dn-ch-domainSaveHint" }, t2("channelsDomainHint")), /* @__PURE__ */ React11.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-btn dn-set-btnPrimary dn-set-save",
          disabled: saving,
          onClick: function() {
            saveFor("channels");
          }
        },
        saving ? t2("saving") : t2("saveChannels")
      ));
      return [channelsChildren, channelsDomainSave];
    }

    // src/client/settings/panes/events.tsx
    var React13 = __toESM(require("react"), 1);

    // src/client/settings/parts/kind-icons.tsx
    var React12 = __toESM(require("react"), 1);
    function wrap(paths, extraCls, title) {
      return /* @__PURE__ */ React12.createElement(
        "span",
        {
          className: "dn-ico" + (extraCls ? " " + extraCls : ""),
          "aria-hidden": title ? void 0 : "true",
          title
        },
        /* @__PURE__ */ React12.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 }, paths)
      );
    }
    function kindIcon(kind, extraCls) {
      let paths;
      if (kind === "ask") {
        paths = [
          /* @__PURE__ */ React12.createElement("path", { d: "M8 10h8M8 14h5", key: "t" }),
          /* @__PURE__ */ React12.createElement(
            "path",
            {
              d: "M7 5h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4l-4 3v-3H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z",
              key: "b"
            }
          )
        ];
      } else if (kind === "question") {
        paths = [
          /* @__PURE__ */ React12.createElement("circle", { cx: "12", cy: "12", r: "8", key: "c" }),
          /* @__PURE__ */ React12.createElement("path", { d: "M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.7.2-1.2.9-1.2 1.6v.3", key: "q" }),
          /* @__PURE__ */ React12.createElement("circle", { cx: "12", cy: "17", r: ".8", fill: "currentColor", stroke: "none", key: "d" })
        ];
      } else if (kind === "done") {
        paths = [/* @__PURE__ */ React12.createElement("path", { d: "M5 12l4 4L19 6", key: "p" })];
      } else if (kind === "subagent-done") {
        paths = [
          /* @__PURE__ */ React12.createElement("circle", { cx: "9", cy: "10", r: "3", key: "a" }),
          /* @__PURE__ */ React12.createElement("circle", { cx: "16", cy: "12", r: "2.5", key: "b" }),
          /* @__PURE__ */ React12.createElement("path", { d: "M5 18c.8-2 2.2-3 4-3s3.2 1 4 3", key: "p" })
        ];
      } else if (kind === "error") {
        paths = [/* @__PURE__ */ React12.createElement("circle", { cx: "12", cy: "12", r: "8", key: "c" }), /* @__PURE__ */ React12.createElement("path", { d: "M12 8v5M12 16h.01", key: "p" })];
      } else if (kind === "turn-end") {
        paths = [/* @__PURE__ */ React12.createElement("path", { d: "M7 7h10v4l3 2-3 2v2H7v-2l-3-2 3-2V7z", key: "p" })];
      } else if (kind === "test") {
        paths = [/* @__PURE__ */ React12.createElement("path", { d: "M9 3h6M10 3v6l-4 8a3 3 0 0 0 2.6 4.5h6.8A3 3 0 0 0 18 17l-4-8V3", key: "p" })];
      } else {
        paths = [
          /* @__PURE__ */ React12.createElement("path", { d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9", key: "a" }),
          /* @__PURE__ */ React12.createElement("path", { d: "M13.7 21a2 2 0 0 1-3.4 0", key: "b" })
        ];
      }
      return wrap(paths, extraCls);
    }
    function tabIcon(which) {
      if (which === "events") {
        return wrap([
          /* @__PURE__ */ React12.createElement("path", { d: "M12 3v3M8 6h8l1 3H7l1-3z", key: "a" }),
          /* @__PURE__ */ React12.createElement("path", { d: "M6 9h12v7a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9z", key: "b" })
        ]);
      }
      if (which === "channels") {
        return wrap([
          /* @__PURE__ */ React12.createElement("rect", { x: "4", y: "5", width: "16", height: "12", rx: "2", key: "r" }),
          /* @__PURE__ */ React12.createElement("path", { d: "M8 21h8", key: "p" })
        ]);
      }
      return wrap([/* @__PURE__ */ React12.createElement("circle", { cx: "12", cy: "12", r: "8", key: "c" }), /* @__PURE__ */ React12.createElement("path", { d: "M12 8v4l2.5 2.5", key: "p" })]);
    }
    function sevIcon(sev, extraCls) {
      let paths;
      if (sev === "failure" || sev === "error") {
        paths = [/* @__PURE__ */ React12.createElement("circle", { cx: "12", cy: "12", r: "8", key: "c" }), /* @__PURE__ */ React12.createElement("path", { d: "M12 8v5M12 16h.01", key: "p" })];
      } else if (sev === "warning") {
        paths = [/* @__PURE__ */ React12.createElement("path", { d: "M12 4l9 16H3L12 4z", key: "t" }), /* @__PURE__ */ React12.createElement("path", { d: "M12 10v4M12 17h.01", key: "p" })];
      } else if (sev === "success") {
        paths = [/* @__PURE__ */ React12.createElement("path", { d: "M5 12l4 4L19 6", key: "p" })];
      } else {
        paths = [/* @__PURE__ */ React12.createElement("circle", { cx: "12", cy: "12", r: "8", key: "c" }), /* @__PURE__ */ React12.createElement("path", { d: "M12 11v5M12 8h.01", key: "p" })];
      }
      return wrap(paths, extraCls, "severity: " + sev);
    }

    // src/client/settings/panes/events.tsx
    var EVENT_KEYS = [
      ["notifyAsk", "evtAsk"],
      ["notifyQuestion", "evtQuestion"],
      ["notifyTaskDone", "evtTaskDone"],
      ["notifySubagentDone", "evtSubagentDone"],
      ["notifyTaskError", "evtTaskError"],
      ["notifyTurnEnd", "evtTurnEnd"]
    ];
    var EVENT_KIND_MAP = Object.fromEntries(
      Object.entries(KIND_SWITCHES).map(function(entry) {
        return [entry[1], entry[0]];
      })
    );
    function eventsPane(settings, kindsList, patch, confirmOne, routeChipsRow, severityOf2, t2) {
      const eventChildren = [];
      EVENT_KEYS.forEach(function(kv) {
        const key = kv[0], labelKey = kv[1];
        const kindId = EVENT_KIND_MAP[key];
        const sev = severityOf2(kindId);
        eventChildren.push(
          /* @__PURE__ */ React13.createElement("div", { className: "dn-evt", key: "ev-" + key }, /* @__PURE__ */ React13.createElement("div", { className: "dn-evt-head" }, kindIcon(kindId), /* @__PURE__ */ React13.createElement("span", { className: "dn-evt-name" }, t2(labelKey)), /* @__PURE__ */ React13.createElement("span", { className: "dn-evt-kind" }, kindId), /* @__PURE__ */ React13.createElement(
            "span",
            {
              className: "dn-sev" + (sev !== "info" ? " dn-sev-" + sev : ""),
              title: "severity: " + sev
            }
          ), switchControl(key, t2("evtSwitch", { name: t2(labelKey) }), settings, patch)), routeChipsRow(kindId), key === "notifyTurnEnd" ? /* @__PURE__ */ React13.createElement("div", { className: "dn-sec-hint" }, t2("evtTurnEndHint")) : null)
        );
      });
      const kindRows = kindsList.map(function(k) {
        const nameText = k.label && k.label !== k.id ? k.label : k.id;
        if (k.confirmed) {
          return /* @__PURE__ */ React13.createElement("div", { className: "dn-kinds dn-kinds-ok", key: k.id }, /* @__PURE__ */ React13.createElement("div", { className: "dn-kinds-head" }, kindIcon(k.id), /* @__PURE__ */ React13.createElement("span", { className: "dn-kinds-name" }, nameText), /* @__PURE__ */ React13.createElement("span", { className: "dn-evt-kind" }, k.id), /* @__PURE__ */ React13.createElement("span", { className: "dn-kinds-actions" }, /* @__PURE__ */ React13.createElement(
            "button",
            {
              type: "button",
              className: "dn-set-btn dn-set-btnSmall",
              onClick: function() {
                confirmOne(k.id, false);
              }
            },
            t2("kindRevoke")
          ))), routeChipsRow(k.id));
        }
        return /* @__PURE__ */ React13.createElement("div", { className: "dn-kinds", key: k.id }, /* @__PURE__ */ React13.createElement("div", { className: "dn-kinds-head" }, kindIcon(k.id), /* @__PURE__ */ React13.createElement("span", { className: "dn-kinds-name" }, nameText), /* @__PURE__ */ React13.createElement("span", { className: "dn-evt-kind" }, k.id), /* @__PURE__ */ React13.createElement("span", { className: "dn-kinds-actions" }, /* @__PURE__ */ React13.createElement(
          "button",
          {
            type: "button",
            className: "dn-set-btn dn-set-btnSmall dn-set-btnPrimary",
            onClick: function() {
              confirmOne(k.id, true);
            }
          },
          t2("kindAllow")
        ), /* @__PURE__ */ React13.createElement(
          "button",
          {
            type: "button",
            className: "dn-set-btn dn-set-btnSmall dn-set-btnGhostDanger",
            onClick: function() {
              confirmOne(k.id, false);
            }
          },
          t2("kindDeny")
        ))), /* @__PURE__ */ React13.createElement("div", { className: "dn-kind-routeHint" }, t2("kindRouteHint")));
      });
      eventChildren.push(
        /* @__PURE__ */ React13.createElement("div", { key: "kinds" }, /* @__PURE__ */ React13.createElement("div", { className: "dn-sec", style: { marginTop: "14px" } }, /* @__PURE__ */ React13.createElement("span", { className: "dn-sec-title" }, t2("kindsTitle")), /* @__PURE__ */ React13.createElement("span", { className: "dn-sec-hint" }, t2("kindsHint"))), kindsList.length === 0 ? /* @__PURE__ */ React13.createElement("div", { className: "dn-set-note" }, t2("kindsEmpty")) : kindRows)
      );
      const dedupFold = /* @__PURE__ */ React13.createElement("details", { className: "dn-ch-adv dn-sec-adv", key: "adv-params" }, /* @__PURE__ */ React13.createElement("summary", null, t2("secDedup")), /* @__PURE__ */ React13.createElement("div", { className: "dn-ch-adv-body" }, advRow(
        t2("historyRetention"),
        /* @__PURE__ */ React13.createElement(
          "input",
          {
            type: "number",
            min: 0,
            step: 1,
            className: "dn-set-input dn-set-numInput",
            "aria-label": t2("historyRetention"),
            value: settings.historyMaxAgeDays,
            onChange: function(e) {
              patch({ historyMaxAgeDays: Number(e.target.value) });
            }
          }
        )
      )));
      const qh = settings.quietHours || {};
      const allows = qh.allowKinds || [];
      function setAllowKinds(next) {
        patch({ quietHours: Object.assign({}, qh, { allowKinds: next }) });
      }
      function allowFollowEnabled() {
        patch(function(prev) {
          const nextQh = prev.quietHours || {};
          const next = EVENT_KEYS.filter(function(kv) {
            return prev[kv[0]] === true;
          }).map(function(kv) {
            return EVENT_KIND_MAP[kv[0]];
          });
          return Object.assign({}, prev, {
            quietHours: Object.assign({}, nextQh, { allowKinds: next })
          });
        });
      }
      function allowResetDefault() {
        setAllowKinds(["ask", "question", "error"]);
      }
      const quietAllowChoices = EVENT_KEYS.map(function(kv) {
        const notifyKey = kv[0];
        const kind = EVENT_KIND_MAP[notifyKey];
        const enabled = settings[notifyKey] === true;
        return {
          kind,
          notifyKey,
          enabled,
          labelKey: KIND_KEYS[kind] || "k" + kind
        };
      });
      const allowChips = quietAllowChoices.map(function(c) {
        const checked = allows.indexOf(c.kind) !== -1;
        return /* @__PURE__ */ React13.createElement(
          "button",
          {
            type: "button",
            key: c.kind,
            className: "dn-route-chip" + (checked ? " is-on" : "") + (c.enabled ? "" : " dn-set-allowDim"),
            "aria-pressed": checked ? "true" : "false",
            disabled: !c.enabled,
            title: c.enabled ? void 0 : t2("allowDisabledHint"),
            onClick: function() {
              const next = allows.slice();
              if (!checked && next.indexOf(c.kind) === -1) next.push(c.kind);
              else if (checked && next.indexOf(c.kind) !== -1) next.splice(next.indexOf(c.kind), 1);
              setAllowKinds(next);
            }
          },
          t2(c.labelKey),
          c.enabled ? null : /* @__PURE__ */ React13.createElement("span", { className: "dn-set-allowHint" }, t2("allowDisabledHint"))
        );
      });
      const windowRows = (function() {
        if (Array.isArray(qh.windows)) {
          return qh.windows.map(function(w) {
            return {
              start: typeof w.start === "string" ? w.start : "",
              end: typeof w.end === "string" ? w.end : ""
            };
          });
        }
        if (typeof qh.start === "string" || typeof qh.end === "string") {
          return [
            {
              start: typeof qh.start === "string" ? qh.start : "",
              end: typeof qh.end === "string" ? qh.end : ""
            }
          ];
        }
        return [];
      })();
      function setWindows(next) {
        const qhNext = Object.assign({}, qh, { windows: next });
        delete qhNext.start;
        delete qhNext.end;
        patch({ quietHours: qhNext });
      }
      function setWindowAt(index, key, value) {
        setWindows(
          windowRows.map(function(w, i) {
            return i === index ? Object.assign({}, w, { [key]: value }) : w;
          })
        );
      }
      function addWindow() {
        if (windowRows.length >= QUIET_WINDOWS_LIMIT) return;
        setWindows(windowRows.concat([{ start: "12:00", end: "13:00" }]));
      }
      function removeWindowAt(index) {
        setWindows(
          windowRows.filter(function(_w, i) {
            return i !== index;
          })
        );
      }
      function pad2(n) {
        return n < 10 ? "0" + n : "" + n;
      }
      const nowDate = /* @__PURE__ */ new Date();
      const nowText = pad2(nowDate.getHours()) + ":" + pad2(nowDate.getMinutes());
      const nowMinutes = nowDate.getHours() * 60 + nowDate.getMinutes();
      const hitRow = windowRows.find(function(w) {
        return inWindowMinutes(nowMinutes, w.start, w.end);
      });
      const dndPreview = qh.enabled !== true ? t2("dndPreviewOff") : hitRow !== void 0 ? t2("dndPreviewHit", { now: nowText, start: hitRow.start, end: hitRow.end }) : t2("dndPreviewMiss", { now: nowText });
      const dndCard = /* @__PURE__ */ React13.createElement("div", { className: "dn-dnd", key: "dnd" }, /* @__PURE__ */ React13.createElement("div", { className: "dn-dnd-head" }, sevIcon("warning", "dn-sev-warning"), /* @__PURE__ */ React13.createElement("span", { className: "dn-evt-name" }, t2("dndEnable")), switchToggle(
        qh.enabled === true,
        function(v) {
          patch({ quietHours: Object.assign({}, qh, { enabled: v }) });
        },
        t2("dndEnable")
      )), qh.enabled === true ? /* @__PURE__ */ React13.createElement("div", null, windowRows.map(function(w, i) {
        return /* @__PURE__ */ React13.createElement("div", { className: "dn-dnd-row", key: "win-" + i }, tabIcon("history"), /* @__PURE__ */ React13.createElement("span", { className: "dn-dnd-cap" }, t2("dndWindow", { n: i + 1 })), /* @__PURE__ */ React13.createElement(
          "input",
          {
            type: "time",
            className: "dn-set-input",
            "aria-label": t2("dndStart"),
            value: w.start,
            onChange: function(e) {
              setWindowAt(i, "start", e.target.value);
            }
          }
        ), /* @__PURE__ */ React13.createElement("span", { className: "dn-dnd-cap" }, t2("dndEnd")), /* @__PURE__ */ React13.createElement(
          "input",
          {
            type: "time",
            className: "dn-set-input",
            "aria-label": t2("dndEnd"),
            value: w.end,
            onChange: function(e) {
              setWindowAt(i, "end", e.target.value);
            }
          }
        ), /* @__PURE__ */ React13.createElement(
          "button",
          {
            type: "button",
            className: "dn-set-btn dn-set-btnSmall",
            "aria-label": t2("dndRemoveWindow"),
            onClick: function() {
              removeWindowAt(i);
            }
          },
          t2("dndRemoveWindow")
        ));
      }), windowRows.length === 0 ? /* @__PURE__ */ React13.createElement("div", { className: "dn-set-note" }, t2("dndEmptyHint")) : null, /* @__PURE__ */ React13.createElement("div", { className: "dn-dnd-row" }, /* @__PURE__ */ React13.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-btn dn-set-btnSmall",
          onClick: addWindow,
          disabled: windowRows.length >= QUIET_WINDOWS_LIMIT,
          title: t2("dndLimitHint")
        },
        t2("dndAddWindow")
      ), /* @__PURE__ */ React13.createElement("span", { className: "dn-sec-hint" }, t2("dndLimitHint"))), /* @__PURE__ */ React13.createElement("div", { className: "dn-set-note" }, dndPreview), /* @__PURE__ */ React13.createElement("div", { className: "dn-set-note" }, t2("dndPreviewNote")), /* @__PURE__ */ React13.createElement("div", { className: "dn-dnd-row", style: { display: "block" } }, /* @__PURE__ */ React13.createElement("span", { className: "dn-dnd-cap" }, t2("dndStillLabel") + ": "), /* @__PURE__ */ React13.createElement("div", { className: "dn-set-allows" }, allowChips), /* @__PURE__ */ React13.createElement("div", { className: "dn-set-allowActions" }, /* @__PURE__ */ React13.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-btn dn-set-btnSmall",
          onClick: allowFollowEnabled
        },
        t2("allowFollowEnabled")
      ), /* @__PURE__ */ React13.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-btn dn-set-btnSmall",
          onClick: allowResetDefault
        },
        t2("allowResetDefault")
      )))) : null);
      return [eventChildren, dedupFold, dndCard];
    }

    // src/client/settings/panes/history.tsx
    var React14 = __toESM(require("react"), 1);
    function historyPane(history, clearArmed, confirmClear, sendTest, loadHistory, severityOf2, t2) {
      return /* @__PURE__ */ React14.createElement("div", { key: "history" }, /* @__PURE__ */ React14.createElement("div", { className: "dn-set-historyTools" }, /* @__PURE__ */ React14.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-btn dn-set-btnSmall" + (clearArmed ? " dn-set-btnDanger" : ""),
          onClick: confirmClear
        },
        clearArmed ? t2("clearConfirm") : t2("clearLabel")
      ), /* @__PURE__ */ React14.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-btn dn-set-btnSmall",
          onClick: function() {
            sendTest();
          }
        },
        t2("sendTest")
      ), /* @__PURE__ */ React14.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-btn dn-set-btnSmall",
          onClick: function() {
            loadHistory({ value: true });
          }
        },
        t2("refresh")
      ), /* @__PURE__ */ React14.createElement("span", { className: "dn-set-historyCount" }, t2("historyTitle"))), !history || history.length === 0 ? /* @__PURE__ */ React14.createElement("div", { className: "dn-set-note" }, t2("historyEmpty")) : /* @__PURE__ */ React14.createElement("ul", { className: "dn-set-history" }, history.map(function(r, i) {
        const d = new Date(r.ts);
        const pad = function(n) {
          return n < 10 ? "0" + n : String(n);
        };
        const time = pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
        const sev = severityOf2(r.kind);
        return /* @__PURE__ */ React14.createElement("li", { className: "dn-set-historyItem", key: String(r.ts) + "-" + i }, sevIcon(sev, sev !== "info" ? "dn-sev-" + sev : void 0), /* @__PURE__ */ React14.createElement("div", { className: "dn-set-historyMain" }, /* @__PURE__ */ React14.createElement("div", { className: "dn-set-historyHead" }, /* @__PURE__ */ React14.createElement("span", { className: "dn-set-historyKind" }, KIND_KEYS[r.kind] !== void 0 ? t2(KIND_KEYS[r.kind]) : r.kind), /* @__PURE__ */ React14.createElement("span", { className: "dn-set-historyTime" }, time), r.suppressed === "quiet" ? /* @__PURE__ */ React14.createElement("span", { className: "dn-set-historySuppressed" }, t2("historySuppressed")) : null), /* @__PURE__ */ React14.createElement("div", { className: "dn-set-historyText" }, r.title + ": " + r.message), deliveryLines(r, t2)));
      })));
    }

    // src/client/settings/parts/route-text.ts
    function routeSummaryText(litLabels, isCustom, liveCount, t2) {
      if (litLabels.length > 0) {
        const more = litLabels.length > 2 ? litLabels.length - 2 : 0;
        return litLabels.slice(0, 2).join(" · ") + (more > 0 ? " · +" + String(more) : "");
      }
      if (isCustom) return t2("routeCustomState", { n: liveCount });
      return t2("routeDefaultState");
    }
    function dirtyStatusText(dirtyCount, channelsDirty, otherDirtyCount, t2) {
      if (dirtyCount <= 0) return null;
      if (channelsDirty && otherDirtyCount > 0) return t2("dirtyDomains");
      if (channelsDirty) return t2("dirtyChannels");
      return t2("dirtySome", { n: dirtyCount });
    }

    // src/client/index.tsx
    var NS = "notifier";
    var ROUTES = {
      config: "/api/dsh-notifier/config",
      events: "/api/dsh-notifier/events",
      health: "/api/dsh-notifier/health",
      diagnostics: "/api/dsh-notifier/diagnostics",
      test: "/api/dsh-notifier/test",
      history: "/api/dsh-notifier/history",
      status: "/api/dsh-notifier/status",
      kinds: "/api/dsh-notifier/kinds"
    };
    var STYLE_ID = "dsh-notifier-style";
    var CSS_VERSION = "ui-v3-2";
    var NOTIFY_ICON = "data:image/svg+xml;utf8," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0f9d6e"/><path fill="#fff" d="M12 4a1 1 0 0 1 1 1v.55A5.5 5.5 0 0 1 17.5 11v2.3l1.45 1.45a1 1 0 0 1-.7 1.7H5.75a1 1 0 0 1-.7-1.7L6.5 13.3V11A5.5 5.5 0 0 1 11 5.55V5a1 1 0 0 1 1-1zm-2.5 13a2.5 2.5 0 0 0 5 0h-5z"/></svg>'
    );
    function severityOf(kind) {
      return isBuiltinKind(kind) ? KIND_SEVERITY[kind] : "info";
    }
    function requestPermission(onDone) {
      if (!("Notification" in window)) return;
      try {
        Notification.requestPermission().then(function() {
          if (onDone) onDone();
        }).catch(function() {
          if (onDone) onDone();
        });
      } catch {
        if (onDone) onDone();
      }
    }
    var TAB_ID = Math.random().toString(36).slice(2);
    var audioEngine = createAudioEngine({ ctor: audioContextCtorOf, now: () => Date.now() });
    function claimMaster2() {
      return claimMaster(TAB_ID, {
        now: () => Date.now(),
        read: () => localStorage.getItem(MASTER_KEY),
        write: (value) => {
          localStorage.setItem(MASTER_KEY, value);
        }
      });
    }
    function isSecureContext() {
      return window.isSecureContext === true;
    }
    function systemNotificationUsable() {
      if (!("Notification" in window)) return false;
      if (!isSecureContext()) return false;
      return Notification.permission === "granted";
    }
    function audioContextCtorOf() {
      const legacy = window.webkitAudioContext;
      return window.AudioContext ?? legacy;
    }
    function clientFacts() {
      const hasApi = "Notification" in window;
      return {
        notificationApi: hasApi,
        secureContext: isSecureContext(),
        // 权限值只作数据带过去 (值域外的取值由判定侧按«无法判定»处理)
        permission: hasApi ? String(Notification.permission) : "unknown",
        audio: audioEngine.facts()
      };
    }
    function showNotification(kind, title, message, opts, owner) {
      const playOnly = opts.playOnly === true;
      const policy = soundPolicyOf(opts.sound, playOnly);
      if (!claimMaster2()) return;
      const notificationUsable = systemNotificationUsable();
      if (displayChannelOf({
        playOnly,
        notificationUsable,
        visibility: document.visibilityState
      }) === "notification") {
        try {
          const notification = new Notification(title, {
            body: message,
            tag: "dsh-notifier-" + kind + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
            icon: NOTIFY_ICON,
            silent: policy.silent
          });
          notification.onclick = () => {
            window.focus();
            if (opts.sessionId && uiWorkspaceRef.current) {
              try {
                uiWorkspaceRef.current.openSession(opts.sessionId);
              } catch (error) {
                console.warn("[dsh-notifier] не удалось переключить сессию: ", error);
              }
            }
            notification.close();
          };
          trackNotification(notification, owner);
          if (policy.selfPlay && audioEngine.gate()) audioEngine.playTone(policy.tone);
          return;
        } catch (error) {
          console.warn("[dsh-notifier] браузерное уведомление не сработало, показываю напоминание на странице: ", error);
        }
      }
      const fallback = fallbackChannelOf(playOnly, document.visibilityState);
      if (fallback === "banner") showBanner(kind, title, message, opts.sessionId);
      else if (fallback === "title") titleFlasher.flash(title, owner);
      if (policy.selfPlay && audioEngine.gate()) audioEngine.playTone(policy.tone);
    }
    function handleNotifyFrame(payload, owner) {
      const kind = typeof payload.kind === "string" ? payload.kind : "";
      const title = typeof payload.title === "string" ? payload.title : "";
      const message = typeof payload.message === "string" ? payload.message : "";
      const sessionId = typeof payload.sessionId === "string" ? payload.sessionId : "";
      if (!frameAccepted({
        kind,
        whenVisible: payload.whenVisible,
        playOnly: payload.playOnly,
        visibility: document.visibilityState
      })) {
        return;
      }
      showNotification(
        kind,
        title,
        message,
        {
          sound: payload.sound,
          playOnly: payload.playOnly === true,
          sessionId
        },
        owner
      );
    }
    var uiWorkspaceRef = { current: null };
    var eventsHandle = { current: null };
    function assertOk(r, body) {
      if (!r.ok) throw markHttpFailure(new Error("HTTP " + r.status), r.status, body);
    }
    function fetchConfig() {
      return fetch(ROUTES.config, { headers: { accept: "application/json" } }).then(function(r) {
        return r.json().then(function(body) {
          if (!r.ok) {
            const nested = body.error;
            const detail = typeof nested === "object" && nested !== null ? nested.details || nested.error : void 0;
            throw markHttpFailure(new Error(detail || "HTTP " + r.status), r.status, body);
          }
          return body;
        });
      });
    }
    function fetchHistory() {
      return fetch(ROUTES.history, { headers: { accept: "application/json" } }).then(function(r) {
        return r.json().then(function(body) {
          assertOk(r, body);
          const records = body.records;
          return (Array.isArray(records) ? records : []).slice(-10).reverse();
        });
      });
    }
    function fetchStatus() {
      return fetch(ROUTES.status, { headers: { accept: "application/json" } }).then(function(r) {
        return r.json().then(function(body) {
          assertOk(r, body);
          const channels = body.channels;
          return typeof channels === "object" && channels !== null ? channels : {};
        });
      });
    }
    function fetchKinds() {
      return fetch(ROUTES.kinds, { headers: { accept: "application/json" } }).then(function(r) {
        return r.json().then(function(body) {
          assertOk(r, body);
          const kinds = body.kinds;
          return Array.isArray(kinds) ? kinds : [];
        });
      }).catch(function() {
        return [];
      });
    }
    function fetchHealth() {
      return fetch(ROUTES.health, { headers: { accept: "application/json" } }).then(function(r) {
        return r.json().then(function(body) {
          assertOk(r, body);
          return typeof body.platform === "string" ? body.platform : null;
        });
      }).catch(function() {
        return null;
      });
    }
    function fetchDiagnostics() {
      const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
      const timer = ctrl ? setTimeout(function() {
        ctrl.abort();
      }, 15e3) : null;
      const init = { headers: { accept: "application/json" } };
      if (ctrl) init.signal = ctrl.signal;
      return fetch(ROUTES.diagnostics, init).then(function(r) {
        return r.json().then(function(body) {
          assertOk(r, body);
          return body;
        });
      }).finally(function() {
        if (timer !== null) clearTimeout(timer);
      });
    }
    function postKind(kind, confirmed) {
      return fetch(ROUTES.kinds, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind, confirmed })
      }).then(function(r) {
        return r.json().then(function(body) {
          if (!r.ok) {
            const nested = body.error;
            const detail = typeof nested === "object" && nested !== null ? nested.details || nested.error : void 0;
            throw markHttpFailure(new Error(detail || "HTTP " + r.status), r.status, body);
          }
          return body;
        });
      });
    }
    function sendTestReq(channelId, draftChannels) {
      const isDryRun = draftChannels !== void 0;
      const ctrl = isDryRun && typeof AbortController !== "undefined" ? new AbortController() : null;
      const timer = ctrl ? setTimeout(function() {
        ctrl.abort();
      }, 18e3) : null;
      const body = channelId === void 0 ? {} : isDryRun ? { channelId, draft: { channels: draftChannels } } : { channelId };
      let chain = fetch(ROUTES.test, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
        signal: ctrl ? ctrl.signal : void 0
      }).then(function(r) {
        return r.json().then(function(body2) {
          if (!r.ok) {
            const nested = body2.error;
            const detail = typeof nested === "object" && nested !== null ? nested.details || nested.error : void 0;
            throw markHttpFailure(new Error(detail || "HTTP " + r.status), r.status, body2);
          }
          return body2;
        });
      });
      if (timer !== null) {
        const pending = timer;
        chain = chain.finally(function() {
          clearTimeout(pending);
        });
      }
      return chain;
    }
    function degradationNotes(meta, t2, isSecureContext2) {
      const degradation = [];
      if (meta && meta.writable === false) {
        degradation.push(
          /* @__PURE__ */ React15.createElement("div", { className: "dn-set-note", key: "settings-unavailable" }, t2("settingsSvcDown"))
        );
      }
      if ("Notification" in window) {
        if (!isSecureContext2()) {
          degradation.push(
            /* @__PURE__ */ React15.createElement("div", { className: "dn-set-note", key: "insecure" }, t2("httpDegraded"))
          );
        }
      } else {
        degradation.push(
          /* @__PURE__ */ React15.createElement("div", { className: "dn-set-note", key: "noapi" }, t2("iosUnsupported"))
        );
      }
      return degradation;
    }
    function tabBar(activeTab, pendingKinds, t2, setActiveTab) {
      const tab = (which, label, badge) => /* @__PURE__ */ React15.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-tab" + (activeTab === which ? " dn-set-tabActive" : ""),
          onClick: function() {
            setActiveTab(which);
          }
        },
        tabIcon(which),
        label,
        badge
      );
      return /* @__PURE__ */ React15.createElement("div", { className: "dn-set-tabs" }, tab(
        "events",
        t2("secEvents"),
        pendingKinds > 0 ? /* @__PURE__ */ React15.createElement("span", { className: "dn-set-tabBadge" }, String(pendingKinds)) : null
      ), tab("channels", t2("secChannels"), null), tab("history", t2("secHistory"), null));
    }
    function dryRunStatusTextOf(status, t2) {
      if (status === "ok") return t2("chStatusOk");
      if (status === "failed") return t2("chStatusFailed");
      if (status === "skipped") return t2("chStatusSkipped");
      if (status === "request-failed") return t2("chStatusSkipped");
      return status;
    }
    function dryRunRowOf(dryRun, saving, t2, saveFor, discard) {
      if (dryRun === null) return null;
      const result = dryRun.pending ? null : /* @__PURE__ */ React15.createElement("span", { className: "dn-dryrunResult" }, dryRun.channelId + " · " + dryRunStatusTextOf(dryRun.status || "", t2) + (dryRun.reason ? ": " + dryRun.reason : ""));
      const actions = dryRun.pending ? null : /* @__PURE__ */ React15.createElement("span", { className: "dn-dryrunActions" }, /* @__PURE__ */ React15.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-btn dn-set-btnSmall dn-set-save",
          disabled: saving,
          onClick: saveFor
        },
        t2("dryRunGoSave")
      ), /* @__PURE__ */ React15.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-btn dn-set-btnSmall",
          disabled: saving,
          onClick: discard
        },
        t2("dryRunDiscard")
      ));
      return /* @__PURE__ */ React15.createElement("div", { className: "dn-dryrun", role: "status", title: t2("chTestDraftTitle") }, /* @__PURE__ */ React15.createElement("span", { className: "dn-dryrunTag" }, t2("dryRunTag")), result === null ? /* @__PURE__ */ React15.createElement("span", { className: "dn-dryrunPending" }, t2("dryRunPending")) : result, actions, /* @__PURE__ */ React15.createElement("div", { className: "dn-dryrunNote" }, t2("dryRunNote")));
    }
    function activePaneOf(activeTab, panes) {
      if (activeTab === "events") return panes.events();
      if (activeTab === "channels") return panes.channels();
      return panes.history();
    }
    function conflictBanner(conflict, saving, t2, loadLatest, overwrite, ignore) {
      if (conflict === null) return null;
      return /* @__PURE__ */ React15.createElement("div", { className: "dn-conflict", role: "alert" }, /* @__PURE__ */ React15.createElement("span", { className: "dn-conflictText" }, t2(conflict.entry === "channels" ? "conflictChannels" : "conflictTitle")), /* @__PURE__ */ React15.createElement("span", { className: "dn-conflictActions" }, /* @__PURE__ */ React15.createElement("button", { type: "button", className: "dn-set-btn dn-set-btnSmall", onClick: loadLatest }, t2("conflictLoadLatest")), /* @__PURE__ */ React15.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-btn dn-set-btnSmall dn-set-save",
          disabled: saving,
          onClick: overwrite
        },
        t2("conflictOverwrite")
      ), /* @__PURE__ */ React15.createElement("button", { type: "button", className: "dn-set-btn dn-set-btnSmall", onClick: ignore }, t2("conflictIgnore"))));
    }
    function saveStatusNode(saved, dirtyText) {
      if (saved !== null) {
        return /* @__PURE__ */ React15.createElement("span", { className: saved.err ? "dn-set-error" : "dn-set-saved" }, saved.msg);
      }
      return dirtyText === null ? null : /* @__PURE__ */ React15.createElement("span", { className: "dn-dirty" }, dirtyText);
    }
    function SettingsCard() {
      const ReactHooks = React15;
      const useState = ReactHooks.useState;
      const useEffect = ReactHooks.useEffect;
      const draft = useState(null);
      const settings = draft[0];
      const setSettings = draft[1];
      const meta = useState(null);
      const metaValue = meta[0];
      const setMeta = meta[1];
      const savedDraft = useState(null);
      const saved = savedDraft[0];
      const setSaved = function(msg, err) {
        savedDraft[1](msg ? { msg, err: err === true } : null);
      };
      const historyDraft = useState(null);
      const history = historyDraft[0];
      const setHistory = historyDraft[1];
      const clearArmed = useState(false);
      const clearArmedValue = clearArmed[0];
      const setClearArmed = clearArmed[1];
      const statusDraft = useState({});
      const statusMap = statusDraft[0];
      const setStatusMap = statusDraft[1];
      const statusRef = ReactHooks.useRef({});
      const kindsDraft = useState([]);
      const kindsList = kindsDraft[0];
      const setKindsList = kindsDraft[1];
      const diagnosticsDraft = useState(null);
      const diagnostics = diagnosticsDraft[0];
      const setDiagnostics = diagnosticsDraft[1];
      const hostPlatformDraft = useState(null);
      const hostPlatform = hostPlatformDraft[0];
      const setHostPlatform = hostPlatformDraft[1];
      const delArmedDraft = useState(null);
      const delArmedId = delArmedDraft[0];
      const setDelArmedId = delArmedDraft[1];
      const levelsNewDraft = useState({});
      const levelsNew = levelsNewDraft[0];
      const setLevelsNew = levelsNewDraft[1];
      const activeTabDraft = useState("events");
      const activeTab = activeTabDraft[0];
      const setActiveTab = activeTabDraft[1];
      const permTickDraft = useState(0);
      const permTick = permTickDraft[0];
      const setPermTick = permTickDraft[1];
      const revealDraft = useState({});
      const revealMap = revealDraft[0];
      const setRevealMap = revealDraft[1];
      const secretEditedDraft = useState({});
      const secretEdited = secretEditedDraft[0];
      const setSecretEdited = secretEditedDraft[1];
      function markSecretEdited(key) {
        if (secretEdited[key] === true) return;
        const nextEdited = Object.assign({}, secretEdited);
        nextEdited[key] = true;
        setSecretEdited(nextEdited);
      }
      const baselineRef = ReactHooks.useRef(null);
      const settingsRef = ReactHooks.useRef(null);
      const metaRef = ReactHooks.useRef(null);
      const saveGuardRef = ReactHooks.useRef(null);
      if (saveGuardRef.current === null) saveGuardRef.current = createSaveGuard();
      const saveGuard = saveGuardRef.current;
      const savingDraft = useState(false);
      const saving = savingDraft[0];
      const setSaving = savingDraft[1];
      const conflictDraft = useState(null);
      const conflict = conflictDraft[0];
      const setConflict = conflictDraft[1];
      const dryRunDraft = useState(
        null
      );
      const dryRun = dryRunDraft[0];
      const setDryRun = dryRunDraft[1];
      function loadHistory(alive) {
        fetchHistory().then(function(records) {
          if (alive.value) setHistory(records);
        }).catch(function() {
          if (alive.value) setHistory([]);
        });
      }
      function loadStatus(alive) {
        fetchStatus().then(function(map) {
          if (alive.value) {
            statusRef.current = map;
            setStatusMap(map);
          }
        }).catch(function() {
        });
      }
      function loadKinds(alive) {
        fetchKinds().then(function(list) {
          if (alive.value) setKindsList(list);
        }).catch(function() {
        });
      }
      function loadHealth(alive) {
        fetchHealth().then(function(platform) {
          if (alive.value) setHostPlatform(platform);
        }).catch(function() {
        });
      }
      function loadDiagnostics(alive) {
        fetchDiagnostics().then(function(body) {
          if (alive.value) setDiagnostics(body);
        }).catch(function() {
        });
      }
      function loadCard(alive) {
        fetchConfig().then(function(v) {
          if (!alive.value) return;
          const effective = v && v.effective || {};
          const snapshot = snapshotBaseline(
            effective
          );
          commitSettings(Object.assign({}, snapshot));
          baselineRef.current = Object.assign({}, snapshot);
          const nextMeta = {
            user: v.user || {},
            revision: v.revision,
            effective,
            writable: v.writable !== false
          };
          metaRef.current = nextMeta;
          setMeta(nextMeta);
          if (v.writable === false) setSaved(t("settingsUnavailable"), true);
        }).catch(function(e) {
          if (!alive.value) return;
          const failure = apiFailureOf(e, t);
          setSaved(t("loadFail", { msg: failure.message, hint: failure.hint }), true);
        });
      }
      useEffect(function() {
        const alive = { value: true };
        loadCard(alive);
        loadHistory(alive);
        loadStatus(alive);
        loadKinds(alive);
        loadDiagnostics(alive);
        loadHealth(alive);
        return function() {
          alive.value = false;
        };
      }, []);
      if (!settings) {
        return /* @__PURE__ */ React15.createElement("li", { className: "dn-set-card" }, saved !== null && saved.err ? saved.msg : t("settingsLoading"));
      }
      function patch(p) {
        setSettings(function(prev) {
          const cur = prev === null ? {} : prev;
          const next = typeof p === "function" ? p(cur) : Object.assign({}, cur, p);
          settingsRef.current = next;
          return next;
        });
        setSaved("");
        setDryRun(null);
      }
      function commitSettings(next) {
        settingsRef.current = next;
        setSettings(next);
        setSaved("");
        setDryRun(null);
      }
      function diffPayload() {
        return diffSettingsPayload(settingsRef.current || settings || {}, baselineRef.current);
      }
      function handleConflict(entry) {
        fetchConfig().then(function(v) {
          if (!v) return;
          const latest = {
            effective: v && v.effective || {},
            revision: v && v.revision,
            user: v && v.user || {}
          };
          if (Object.keys(diffPayloadFor(entry)).length === 0) {
            applyLatestQuiet(latest);
            return;
          }
          setConflict({ entry, latest });
          setSaved("");
        }).catch(function() {
          setSaved(t("conflictReloadFail"), true);
        });
      }
      function applyLatestQuiet(latest) {
        const fresh = snapshotBaseline(latest.effective || {});
        commitSettings(fresh);
        baselineRef.current = Object.assign({}, fresh);
        const nextMeta = {
          user: latest.user || {},
          revision: latest.revision,
          effective: Object.assign({}, latest.effective),
          writable: true
        };
        metaRef.current = nextMeta;
        setMeta(nextMeta);
        setSaved("");
      }
      function putAndCommit(payload, entry) {
        const expectedRevision = metaRef.current && typeof metaRef.current.revision === "number" ? metaRef.current.revision : void 0;
        const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
        const timer = ctrl ? setTimeout(function() {
          ctrl.abort();
        }, 15e3) : null;
        let chain = fetch(ROUTES.config, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ patch: payload, expectedRevision }),
          signal: ctrl ? ctrl.signal : void 0
        }).then(function(r) {
          return r.json().then(function(body) {
            if (!r.ok) {
              const nested = body.error;
              const detail = typeof nested === "object" && nested !== null ? nested.details || nested.error : void 0;
              const code = typeof nested === "object" && nested !== null ? nested.code : void 0;
              throw markHttpFailure(new Error(detail || code || "HTTP " + r.status), r.status, body);
            }
            return body;
          });
        }).then(function(body) {
          baselineRef.current = snapshotBaseline(
            Object.assign({}, baselineRef.current || {}, payload)
          );
          const nextMeta = {
            user: body && body.user || {},
            revision: body && body.revision || void 0,
            effective: Object.assign({}, baselineRef.current),
            writable: true
          };
          metaRef.current = nextMeta;
          setMeta(nextMeta);
          setConflict(null);
          setSaved(t("savedOk"));
          setTimeout(function() {
            setSaved("");
          }, 2200);
        }).catch(function(e) {
          const failure = apiFailureOf(e, t);
          const errCode = e instanceof Error ? e.code : void 0;
          if (errCode === "SETTINGS_CONFLICT" || failure.message.indexOf("конфликт версий") >= 0) {
            handleConflict(entry);
            return;
          }
          if (e instanceof Error && e.name === "AbortError") {
            setSaved(t("saveTimeout"), true);
            return;
          }
          setSaved(t("saveFail", { msg: failure.message }), true);
        });
        if (timer !== null) {
          chain = chain.finally(function() {
            clearTimeout(timer);
          });
        }
        return chain;
      }
      function diffPayloadFor(entry) {
        return domainPayload(diffPayload(), entry);
      }
      function saveFor(entry, quietIfEmpty) {
        if (!saveGuard.tryBegin(entry)) return;
        let payload;
        try {
          payload = diffPayloadFor(entry);
        } catch (error) {
          saveGuard.end();
          const detail = error instanceof Error ? error.message : void 0;
          setSaved(t("saveFail", { msg: String(detail || error) }), true);
          return;
        }
        if (Object.keys(payload).length === 0) {
          saveGuard.end();
          if (!quietIfEmpty) setSaved(t("unchanged"));
          return;
        }
        setSaving(true);
        void putAndCommit(payload, entry).finally(function() {
          setSaving(false);
          const nextEntry = saveGuard.end();
          if (nextEntry !== null) saveFor(nextEntry, true);
        });
      }
      function resolveConflictLoadLatest() {
        if (!conflict) return;
        applyLatestQuiet(conflict.latest);
        setConflict(null);
        toast(t("conflictLoadedLatest"));
      }
      function resolveConflictOverwrite() {
        if (!conflict) return;
        const entry = conflict.entry;
        const latest = conflict.latest;
        const localChanges = diffPayloadFor(entry);
        const snapshot = snapshotBaseline(latest.effective || {});
        const merged = rebaseSettings(localChanges, snapshot);
        commitSettings(merged);
        baselineRef.current = Object.assign({}, snapshot);
        const nextMeta = {
          user: latest.user || {},
          revision: latest.revision,
          effective: Object.assign({}, latest.effective || {}),
          writable: true
        };
        metaRef.current = nextMeta;
        setMeta(nextMeta);
        setConflict(null);
        setSaved("");
        saveFor(entry, true);
      }
      function discardChanges() {
        if (baselineRef.current) {
          commitSettings(
            snapshotBaseline(baselineRef.current)
          );
        }
        setConflict(null);
        setSaved("");
        toast(t("discardOk"));
      }
      function sendTest(channelId) {
        if (channelId !== void 0) {
          const draftChannels = (settingsRef.current || settings || {}).channels || [];
          setDryRun({ channelId, pending: true });
          sendTestReq(channelId, draftChannels).then(function(data) {
            const status = typeof data.status === "string" ? data.status : "failed";
            setDryRun({
              channelId,
              pending: false,
              status,
              reason: dryRunReasonText(status, data.reason, t, data.soundWarning)
            });
          }).catch(function(error) {
            const failure = apiFailureOf(error, t);
            setDryRun({
              channelId,
              pending: false,
              status: "request-failed",
              // 本地化前缀 + 英文原文 (#1016 残留 4): 直接写 `failure.message` 时这一行整句是英文, 
              // 与紧邻的 toast 两处英文.形态照抄上面那行 toast 的 `testFail`——`{msg}` 留宿主原话供排查.
              reason: t("testRequestFail", { msg: failure.message, hint: failure.hint })
            });
            toast(t("testFail", { msg: failure.message, hint: failure.hint }));
          });
          return;
        }
        sendTestReq(channelId).then(function(data) {
          toast(
            t(
              channelId ? "testChannelOk" : "testSent",
              channelId ? void 0 : { n: data && data.sseConnections }
            )
          );
          if (channelId === void 0) {
            loadStatus({ value: true });
            return;
          }
          const prev = statusRef.current[channelId];
          const prevTs = prev && typeof prev.lastTs === "number" ? prev.lastTs : void 0;
          void pollChannelStatus(fetchStatus, channelId, prevTs).then(function(result) {
            if (result.map !== null) {
              statusRef.current = result.map;
              setStatusMap(result.map);
            }
            loadHistory({ value: true });
          });
        }).catch(function(error) {
          const failure = apiFailureOf(error, t);
          toast(t("testFail", { msg: failure.message, hint: failure.hint }));
        });
      }
      function requestNotificationPermission() {
        requestPermission(function() {
          setSaved(t("permRequested"));
          setPermTick(permTick + 1);
        });
      }
      function chPatch(idx, part) {
        patch(function(prev) {
          const list = (prev.channels || []).slice();
          list[idx] = assignChannelFields(list[idx] || {}, part);
          return Object.assign({}, prev, { channels: list });
        });
      }
      function chLevelsSet(idx, kind, level) {
        if (!kind || kind === "__proto__" || kind === "constructor" || kind === "prototype") return;
        patch(function(prev) {
          const list = (prev.channels || []).slice();
          const ch = Object.assign({}, list[idx]);
          const levels = Object.assign({}, ch.levels || {});
          if (level) levels[kind] = level;
          else delete levels[kind];
          if (Object.keys(levels).length === 0) ch.levels = null;
          else ch.levels = levels;
          list[idx] = ch;
          return Object.assign({}, prev, { channels: list });
        });
      }
      function chRemove(idx) {
        patch(function(prev) {
          const list = (prev.channels || []).slice();
          list.splice(idx, 1);
          return Object.assign({}, prev, { channels: list });
        });
      }
      function chAdd(kind) {
        patch(function(prev) {
          const list = prev.channels || [];
          let seq = 1;
          const taken = new Set(
            list.map(function(c) {
              return String(c.id);
            })
          );
          while (taken.has(kind + "-" + seq)) seq += 1;
          const id = kind + "-" + seq;
          const base = kind === "webhook" ? {
            id,
            name: t("chNewWebhookName") + " " + seq,
            type: "webhook",
            auth: "none",
            timeoutSec: 10,
            enabled: false
          } : {
            id,
            name: t("chNewBarkName") + " " + seq,
            type: "bark",
            enabled: false
          };
          return Object.assign({}, prev, { channels: list.concat([base]) });
        });
        setDelArmedId(null);
      }
      function routeOf(kind) {
        const routes = settings?.kindRoutes || {};
        return routes[kind];
      }
      function routeSetKind(kind, ids) {
        patch(function(prev) {
          const routes = Object.assign({}, prev.kindRoutes || {});
          if (ids === null || ids.length === 0) delete routes[kind];
          else routes[kind] = ids;
          return Object.assign({}, prev, { kindRoutes: routes });
        });
      }
      function channelLabel(c) {
        if (c.type === "browser") return t("chBrowserNotify");
        if (c.type === "system") return t("chSystemNotify");
        return c.name || String(c.id);
      }
      function defaultRouteIds(prev) {
        const ids = [];
        (prev.channels || []).forEach(function(c) {
          if (c.enabled === true) ids.push(channelIdOf(c));
        });
        return ids;
      }
      function routeOptions(prev) {
        return (prev.channels || []).map(function(c) {
          return { id: channelIdOf(c), label: channelLabel(c), enabled: c.enabled === true };
        });
      }
      function routeToggle(kind, oid, checked) {
        patch(function(prev) {
          const routes = Object.assign({}, prev.kindRoutes || {});
          const prior = routes[kind];
          const cur = prior === void 0 ? defaultRouteIds(prev).slice() : prior.slice();
          const at = cur.indexOf(oid);
          if (checked && at === -1) cur.push(oid);
          else if (!checked && at !== -1) cur.splice(at, 1);
          if (cur.length === 0) delete routes[kind];
          else routes[kind] = cur;
          return Object.assign({}, prev, { kindRoutes: routes });
        });
      }
      function confirmOne(kind, confirmed) {
        postKind(kind, confirmed).then(function(body) {
          const freshRevision = body && typeof body.revision === "number" ? body.revision : void 0;
          if (freshRevision !== void 0 && metaRef.current) {
            const nextMeta = Object.assign({}, metaRef.current, { revision: freshRevision });
            metaRef.current = nextMeta;
            setMeta(nextMeta);
          }
          toast(t("kindConfirmOk"));
          return loadKinds({ value: true });
        }).catch(function(e) {
          const detail = e instanceof Error ? e.message : void 0;
          toast(t("kindConfirmFail", { msg: detail || e }));
        });
      }
      function confirmClear() {
        if (!clearArmedValue) {
          setClearArmed(true);
          setTimeout(function() {
            setClearArmed(false);
          }, 3e3);
          return;
        }
        setClearArmed(false);
        fetch(ROUTES.history, { method: "DELETE" }).then(function(r) {
          if (!r.ok) throw markHttpFailure(new Error("HTTP " + r.status), r.status);
          return r.json();
        }).then(function(data) {
          toast(t("cleared", { n: data.removed || 0 }));
          loadHistory({ value: true });
        }).catch(function(error) {
          const failure = apiFailureOf(error, t);
          toast(t("clearFail", { msg: failure.message, hint: failure.hint }));
        });
      }
      function routeChipsRow(kind) {
        const routes = routeOf(kind);
        const options = routeOptions(settings ?? {});
        const litIds = routes === void 0 ? defaultRouteIds(settings ?? {}) : routes.slice();
        const litSet = {};
        litIds.forEach(function(id) {
          litSet[id] = true;
        });
        const staleIds = (routes || []).filter(function(id) {
          return !options.some(function(o) {
            return o.id === id;
          });
        });
        const chips = options.map(function(o) {
          const on = litSet[o.id] === true;
          return /* @__PURE__ */ React15.createElement(
            "button",
            {
              type: "button",
              key: o.id,
              className: "dn-route-chip" + (on ? " is-on" : "") + (o.enabled ? "" : " is-off"),
              "aria-pressed": on ? "true" : "false",
              disabled: !o.enabled,
              title: o.enabled ? void 0 : t("routeDisabledHint"),
              onClick: function() {
                routeToggle(kind, o.id, !on);
              }
            },
            o.label
          );
        });
        staleIds.forEach(function(id) {
          chips.push(
            /* @__PURE__ */ React15.createElement("span", { key: "stale-" + id, className: "dn-route-chip is-stale", title: t("routeStaleTitle") }, id + " · " + t("routeStaleChip"))
          );
        });
        const isCustom = routes !== void 0;
        chips.push(
          /* @__PURE__ */ React15.createElement(
            "button",
            {
              type: "button",
              key: "state",
              className: "dn-route-state" + (isCustom ? " is-custom" : ""),
              title: isCustom ? t("routeCustomStateTitle") : t("routeDefaultStateTitle"),
              onClick: function() {
                if (isCustom) routeSetKind(kind, null);
              }
            },
            isCustom ? t("routeCustomState", { n: litIds.length - staleIds.length }) : t("routeDefaultState")
          )
        );
        const litLabels = [];
        options.forEach(function(o) {
          if (o.enabled && litSet[o.id] === true) litLabels.push(o.label);
        });
        const summaryText = routeSummaryText(litLabels, isCustom, litIds.length - staleIds.length, t);
        return /* @__PURE__ */ React15.createElement("details", { className: "dn-evt-routeDisc", key: "routes-" + kind }, /* @__PURE__ */ React15.createElement("summary", { className: "dn-evt-routeSum", title: t("routeExpandHint") }, summaryText), /* @__PURE__ */ React15.createElement("div", { className: "dn-evt-routes" }, /* @__PURE__ */ React15.createElement("span", { className: "dn-evt-routesCap" }, t("routeCap")), chips));
      }
      const diag = clientDiagnosticsOf(diagnostics, clientFacts(), t);
      const degradation = degradationNotes(metaValue, t, isSecureContext);
      const pendingKinds = kindsList.filter(function(k) {
        return !k.confirmed;
      }).length;
      const tabbar = tabBar(activeTab, pendingKinds, t, setActiveTab);
      const dirtyCount = Object.keys(diffPayload()).length;
      const channelsDiff = diffPayloadFor("channels");
      const channelsDirty = Object.keys(channelsDiff).length > 0;
      const channelsDirtyCount = channelsDirty ? 1 : 0;
      const otherDirtyCount = Math.max(0, dirtyCount - channelsDirtyCount);
      const dirtyText = dirtyStatusText(dirtyCount, channelsDirty, otherDirtyCount, t);
      const dryRunRow = dryRunRowOf(
        dryRun,
        saving,
        t,
        function() {
          saveFor("channels");
        },
        discardChanges
      );
      const channelsPaneDeps = {
        settings,
        statusMap,
        history,
        hostPlatform,
        diag,
        channelLabel,
        chPatch,
        chRemove,
        chLevelsSet,
        chAdd,
        sendTest,
        isSecureContext,
        requestNotificationPermission,
        audioEngine,
        kindsList,
        delArmedId,
        setDelArmedId,
        levelsNew,
        setLevelsNew,
        revealMap,
        setRevealMap,
        secretEdited,
        markSecretEdited,
        saving,
        saveFor,
        testDirty: channelsDirty,
        t
      };
      return /* @__PURE__ */ React15.createElement("li", { className: "dn-set-card" }, tabbar, /* @__PURE__ */ React15.createElement("div", { className: "dn-set-body" }, dryRunRow, activePaneOf(activeTab, {
        events: function() {
          return eventsPane(settings, kindsList, patch, confirmOne, routeChipsRow, severityOf, t);
        },
        channels: function() {
          return channelsPane(channelsPaneDeps);
        },
        history: function() {
          return historyPane(
            history,
            clearArmedValue,
            confirmClear,
            sendTest,
            loadHistory,
            severityOf,
            t
          );
        }
      }), /* @__PURE__ */ React15.createElement("div", { className: "dn-set-notes" }, degradation), conflictBanner(
        conflict,
        saving,
        t,
        resolveConflictLoadLatest,
        resolveConflictOverwrite,
        function() {
          setConflict(null);
        }
      ), /* @__PURE__ */ React15.createElement("div", { className: "dn-set-foot" }, saveStatusNode(saved, dirtyText), /* @__PURE__ */ React15.createElement("span", { className: "dn-spacer" }), /* @__PURE__ */ React15.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-btn dn-set-btnSmall",
          disabled: saving,
          onClick: discardChanges
        },
        t("discardChanges")
      ), /* @__PURE__ */ React15.createElement(
        "button",
        {
          type: "button",
          className: "dn-set-save",
          disabled: saving,
          onClick: function() {
            saveFor("all");
          }
        },
        saving ? t("saving") : t("save")
      ))));
    }
    var pageOwner = { current: null };
    function bindLocaleService(ctx, stack) {
      const locale = ctx.get("locale");
      let unsubLocale;
      if (locale && typeof locale.register === "function") {
        const localeService = locale;
        try {
          localeService.register(NS, { zh, en, ru });
          bindTranslate(localeService.bind(NS));
          if (typeof localeService.subscribe === "function" && typeof localeService.getSnapshot === "function") {
            unsubLocale = localeService.subscribe(function() {
              try {
                bindTranslate(localeService.bind(NS));
              } catch {
              }
            });
          }
        } catch (e) {
          console.warn("[dsh-notifier] не удалось зарегистрировать локализацию: ", e);
        }
      }
      if (unsubLocale !== void 0) {
        const unsubscribe = unsubLocale;
        stack.own(function() {
          unsubscribe();
        });
      }
    }
    function injectSettingsTab(ctx) {
      const slots = ctx.get("slots");
      if (slots && typeof slots.inject === "function") {
        const slotHost = slots;
        try {
          slotHost.inject("settings.section", function() {
            return slotHost.register(
              // label 传 thunk: 宿主 nav rows 每次读取经 resolveSlotLabel
              // 求值 + shell 订阅 locale 重渲染, 切语言即跟随 (注册期求值字符串快照是旧行为).
              // t 走 client/locale.ts 的当前绑定 (locale.subscribe 回调重绑), thunk 保持最小
              // t(key) 形态, 不包任何可能抛错的逻辑 (thunk 抛错会炸宿主 nav 渲染).
              {
                name: "settings.section",
                id: "dsh-notifier",
                order: 70,
                label: () => t("tabLabel"),
                locale: NS
              },
              function() {
                return /* @__PURE__ */ React15.createElement(SettingsCard, null);
              }
            );
          });
        } catch (error) {
          console.warn("[dsh-notifier] вкладка настроек не смонтирована: ", error);
        }
      } else {
        console.warn("[dsh-notifier] служба slots недоступна, вкладка настроек не смонтирована (уведомления работают как обычно)");
      }
    }
    function apply(ctx) {
      const stack = createDisposerStack();
      try {
        let onVisibilityChange2 = function() {
          if (document.visibilityState === "visible") {
            titleFlasher.restore(owner);
            eventsHandle.current?.reconnect();
          }
        }, onFirstClick2 = function() {
          audioEngine.unlock();
          document.removeEventListener("click", onFirstClick2, { capture: true });
        };
        var onVisibilityChange = onVisibilityChange2, onFirstClick = onFirstClick2;
        const owner = {};
        stack.own(function() {
          if (pageOwner.current !== owner) return;
          pageOwner.current = null;
          document.getElementById(STYLE_ID)?.remove();
        });
        stack.own(function() {
          closeNotificationsOf(owner);
        });
        ensureStyle({ id: STYLE_ID, cssText: ui_default + style_default, version: CSS_VERSION });
        pageOwner.current = owner;
        document.addEventListener("visibilitychange", onVisibilityChange2);
        stack.own(function() {
          document.removeEventListener("visibilitychange", onVisibilityChange2);
        });
        stack.own(function() {
          titleFlasher.restore(owner);
        });
        bindLocaleService(ctx, stack);
        eventsHandle.current = stack.acquire(
          function() {
            return startNotifySession(
              {
                url: ROUTES.events,
                createSource: (url) => new EventSource(url),
                now: () => Date.now(),
                setTimer: (fn, ms) => window.setTimeout(fn, ms),
                clearTimer: (handle) => {
                  window.clearTimeout(handle);
                },
                warn: (message, cause) => {
                  console.warn("[dsh-notifier] " + message + ": ", cause);
                }
              },
              function(payload) {
                uiWorkspaceRef.current = ctx.uiWorkspace;
                if (payload.type === "goto-session") {
                  if (typeof payload.sessionId === "string" && payload.sessionId.length > 0) {
                    try {
                      ctx.uiWorkspace.openSession(payload.sessionId);
                    } catch (error) {
                      console.warn("[dsh-notifier] не удалось переключить сессию: ", error);
                    }
                  }
                  return;
                }
                handleNotifyFrame(payload, owner);
              }
            );
          },
          function(session) {
            session.close();
            if (eventsHandle.current === session) eventsHandle.current = null;
          }
        );
        document.addEventListener("click", onFirstClick2, { capture: true });
        stack.own(function() {
          document.removeEventListener("click", onFirstClick2, { capture: true });
        });
        injectSettingsTab(ctx);
      } catch (error) {
        console.warn("[dsh-notifier] сбой монтирования: ", error);
      } finally {
        stack.attach(ctx, "dsh-notifier", function(error) {
          console.warn("[dsh-notifier] сбой очистки при выгрузке: ", error);
        });
      }
    }
    var inject = ["slots", "locale", "uiWorkspace"];

    Object.defineProperty(module.exports, Symbol.toStringTag, { value: 'Module' })
    return module.exports
  }
})
