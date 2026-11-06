// Одно событие — один визуальный тост.
//
// Когда системный канал Windows действительно умеет показать тост, браузерному
// каналу остаётся только звук. Иначе на одно событие приходят два уведомления —
// виндовое и нарисованное в окне, и закрывать нужно оба. Проверяем именно
// наличие средства показа: на другой платформе или без helper'а/скрипта тост
// обязан остаться в окне, иначе пользователь не увидит ничего.
//
// Апстрим 0.2.11 этого не делает, все замены — наши. Якоря держатся за код
// маршрутизации и сборку кадра, а не за переведённые строки.

import { codeText } from './bundle-text.mjs'

// Хвост resolvePool: единственный `return pool;` в бандле, вставляем перед ним.
const POOL_TAIL = '  return pool;'

export const SINGLE_TOAST_DELTAS = [
  [
    POOL_TAIL,
    codeText(
      `  // Одно событие — один визуальный тост. Когда системный канал Windows действительно умеет
  // показать тост, браузерная половина остаётся только ради звука: иначе на событие приходят
  // два уведомления (виндовое и нарисованное в окне) и закрывать нужно оба. Проверяем именно
  // наличие средства показа: на другой платформе или без helper тост обязан остаться в окне.
  const systemCanToast = process.platform === "win32"
    && (existsSync(notifyHelperPath()) || existsSync(toastScriptPath()));
  const nativeToast = systemCanToast
    && pool.some((entry) => entry.target.type === "system" && entry.target.popup !== false);
  if (nativeToast) {
    for (const entry of pool) {
      if (entry.target.type !== "browser") continue;
      entry.target.popup = false;
      // Тост Windows звенит сам: если оставить браузеру тон, звук придёт дважды.
      entry.target.mutedByNative = true;
    }
  }
  return pool;`,
      2
    )
  ],
  [
    '    sound: resolveSound(target.popup, target.sound),',
    codeText('    sound: target.mutedByNative === true ? { mode: "silent" } : resolveSound(target.popup, target.sound),', 4)
  ]
]
