// Вид плашек уведомлений: поверхность тоста DSH, значки-глифы, клик в сессию.
//
// Это не deep-link, а оформление: пока плашка рисуется в окне (канал browser или
// деградация на небезопасном контексте), она должна выглядеть как родной тост
// DSH — тёмная поверхность в обеих темах (--dsw-alias-toast-*), радиус 16, тень
// lv3, подпись 14/22 и глиф слева вместо эмодзи. Клик по плашке ведёт в сессию
// уведомления: sessionId приходит из кадра notify (дельта deep-link).
//
// Апстрим 0.2.11 эти блоки не трогал, поэтому все замены — наши. Якоря держатся
// за CSS-правила и код, а не за переведённые строки, поэтому порядок применения
// относительно перевода не важен.

import { codeText, cssText } from './bundle-text.mjs'

// В бандле CSS встроен строковым литералом: переводы строк там экранированы,
// поэтому куски CSS прогоняются через cssText. Код — обычные строки бандла,
// codeText возвращает их к отступу модуля (4 пробела).
export const BANNER_CSS_DELTAS = [
  [
    cssText(`.dn-toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 8px 14px;
  border-radius: 8px;
  z-index: 9999;
  background: var(--dsw-alias-state-error-primary, #8a4f45);
  color: #fff;
  font-size: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}`),
    cssText(`/* Поверхность взята у тоста самого DSH (перенос чата в архив): тёмная в обеих
   темах, крупный радиус, подпись 14/22 и значок слева. Цвет значка говорит,
   что это за событие, — сама плашка от темы и от важности не зависит. */
.dn-toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: min(640px, calc(100vw - 48px));
  padding: 12px 16px;
  border-radius: var(--dsw-radius-lg, 16px);
  background: var(--dsw-alias-toast-bg, #353638);
  color: var(--dsw-alias-toast-label, #fff);
  font-family: var(--dsw-font-family, inherit);
  font-size: 14px;
  line-height: 22px;
  box-shadow: var(--dsw-shadow-lv3, 0 0 1px rgba(0, 0, 0, 0.2), 0 12px 32px rgba(0, 0, 0, 0.16));
  animation: dn-toast-in 160ms ease-out;
}`)
  ],
  [
    cssText(`.dn-banner {
  position: fixed;
  top: 16px;
  right: 16px;
  width: 320px;
  max-width: min(320px, calc(100vw - 24px));
  padding: 10px 12px;
  border-radius: 10px;
  z-index: 10000;
  background: var(--dsw-alias-bg-base, #ffffff);
  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  color: var(--dsw-alias-label-primary, #1f2329);
  font-size: 13px;
}
.dn-banner[data-kind="error"] {
  border-color: var(--dsw-alias-state-error-primary, #8a4f45);
}
.dn-banner[data-kind="ask"],
.dn-banner[data-kind="question"] {
  border-color: var(--dsw-alias-state-warning-primary, #8a7340);
}`),
    cssText(`.dn-banner {
  position: fixed;
  top: 16px;
  right: 16px;
  width: 320px;
  max-width: min(320px, calc(100vw - 24px));
  z-index: 10000;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  border-radius: var(--dsw-radius-lg, 16px);
  background: var(--dsw-alias-toast-bg, #353638);
  color: var(--dsw-alias-toast-label, #fff);
  font-family: var(--dsw-font-family, inherit);
  font-size: 14px;
  line-height: 22px;
  box-shadow: var(--dsw-shadow-lv3, 0 0 1px rgba(0, 0, 0, 0.2), 0 12px 32px rgba(0, 0, 0, 0.16));
  cursor: pointer;
  animation: dn-toast-in 160ms ease-out;
}
.dn-banner-icon {
  display: grid;
  place-items: center;
  flex: none;
  margin-top: 3px;
  opacity: 0.7;
  color: var(--dsw-alias-toast-label, #fff);
}
.dn-banner-icon[data-tone="success"] {
  opacity: 1;
  color: var(--dsw-alias-state-success-primary, #22c55e);
}
.dn-banner-icon[data-tone="warning"] {
  opacity: 1;
  color: var(--dsw-alias-state-warn-label, #dd8629);
}
.dn-banner-main {
  flex: 1;
  min-width: 0;
}
.dn-banner-title {
  font-weight: 600;
}
.dn-banner-text {
  margin-top: 2px;
  font-size: 13px;
  line-height: 20px;
  opacity: 0.8;
  white-space: pre-line;
  overflow-wrap: anywhere;
}
@keyframes dn-toast-in {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .dn-toast,
  .dn-banner {
    animation: none;
  }
}`)
  ]
]

export const BANNER_CLIENT_DELTAS = [
  // 1. Глифы и баннерная поверхность: значки рисуются SVG, а не эмодзи.
  [
    codeText(`    function showBanner(kind, title, message) {`, 4),
    codeText(`    // Поверхность уведомления — как у тоста самого DSH: тёмная плашка в обеих
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
    function showBanner(kind, title, message, sessionId) {`, 4)
  ],
  // 2. Клик по плашке: фокус окна, переход в сессию уведомления и подсказка.
  [
    codeText(`      banner.addEventListener("click", () => {
        window.focus();
        banner.remove();
      });
      banner.appendChild(
        el("div", { style: "display:flex;align-items:center;gap:6px" }, [
          el("span", { text: "🔔" }),
          el("span", { text: title, style: "font-weight:600" })
        ])
      );
      banner.appendChild(
        el("div", {
          text: message,
          style: "margin-top:4px;font-size:12px;line-height:1.5;white-space:pre-line"
        })
      );
      document.body.appendChild(banner);`, 6),
    codeText(`      banner.addEventListener("click", () => {
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
      document.body.appendChild(banner);`, 6)
  ],
  // 3. showBanner получает sessionId из кадра notify.
  [
    codeText(`if (fallback === "banner") showBanner(kind, title, message);`, 0),
    codeText(`if (fallback === "banner") showBanner(kind, title, message, opts.sessionId);`, 0)
  ]
]
