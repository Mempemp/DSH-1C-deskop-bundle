// Дельта «клик по тосту → сессия уведомления» для русской редакции notifier'а.
//
// Цепочка: host кладёт sessionId в payload тоста → toast.ps1 ставит
// launch="dsh-notify://goto/<sessionId>" (или dsh://open, если сессии нет) →
// протокол вызывает lib/server/goto.ps1 → тот дёргает GET
// /api/dsh-notifier/goto?session=<id> и поднимает окно через dsh://open →
// host-роут публикует SSE-фрейм goto-session → клиент вызывает
// ctx.uiWorkspace.openSession(sessionId).
//
// Все замены — якорные: фрагмент обязан найтись в апстриме, иначе генерация
// падает (applyEntries в localize.mjs). Якоря держатся за код/комментарии
// апстрима, а не за переведённые строки, поэтому дельта не зависит от текстов.

// ── lib/index.js (хост) ─────────────────────────────────────────────────────

export const HOST_DELTAS = [
  // 1. bindHost: проброс порта веб-сервера (runtime.json для helper'а).
  [
    '    register: (route) => ctx.webServer.register(route),',
    '    register: (route) => ctx.webServer.register(route),\n' +
      '    webServerPort: () => ctx.webServer.port,'
  ],
  // 2. StreamHub: кадр goto-session (не попадает в replay: since() фильтрует notify).
  [
    '  /** 序号大于 `since` 的帧, 按序. */\n  since(value) {',
    '  /** Клик по тосту → клиент переключает UI на сессию уведомления. */\n' +
      '  publishGoto(sessionId) {\n' +
      '    if (!this.installed)\n' +
      '      return;\n' +
      '    this.seq += 1;\n' +
      '    this.hub.broadcast(encode({ type: "goto-session", seq: this.seq, sessionId, ts: Date.now() }));\n' +
      '  }\n' +
      '  /** 序号大于 `since` 的帧, 按序. */\n  since(value) {'
  ],
  // 3. Роут /api/dsh-notifier/goto рядом с /events (loopback-защита — в registerEndpoints).
  [
    '      {\n' +
      '        path: "/api/dsh-notifier/events",\n' +
      '        methods: { GET: (req, res) => streamHub.handle(req, res) }\n' +
      '      }\n' +
      '    ];',
    '      {\n' +
      '        path: "/api/dsh-notifier/events",\n' +
      '        methods: { GET: (req, res) => streamHub.handle(req, res) }\n' +
      '      },\n' +
      '      {\n' +
      '        path: "/api/dsh-notifier/goto",\n' +
      '        methods: { GET: (req, res) => {\n' +
      '          const sessionId = new URLSearchParams((req.url ?? "").split("?")[1] ?? "").get("session");\n' +
      '          if (typeof sessionId === "string" && sessionId.length > 0)\n' +
      '            streamHub.publishGoto(sessionId);\n' +
      '          sendJson(res, 200, { ok: true });\n' +
      '        } }\n' +
      '      }\n' +
      '    ];'
  ],
  // 4. ApiService.install: пишем runtime.json с фактическим адресом API для goto.ps1.
  [
    '    this.disposers.push(...registerEndpoints(deps.register, endpoints, deps.logger), deps.frames.onFrame((payload) => streamHub.publish(payload)));',
    '    this.disposers.push(...registerEndpoints(deps.register, endpoints, deps.logger), deps.frames.onFrame((payload) => streamHub.publish(payload)));\n' +
      '    writeTextAtomic(notifierFile("runtime.json"), JSON.stringify({ apiBase: `http://127.0.0.1:${deps.webServerPort()}` }));'
  ],
  // 5. assemble: проброс webServerPort в installApi.
  [
    '  installApi({\n    register: host.register,',
    '  installApi({\n    register: host.register,\n    webServerPort: host.webServerPort,'
  ],
  // 6. Хелпер: agent.id — это и есть session id (комментарий автомата: «键是 agent id, 也就是会话 id»).
  [
    'function titleOf(agent) {',
    'function agentSessionId(agent) {\n' +
      '  return agent === void 0 ? void 0 : agent.id;\n' +
      '}\n' +
      'function titleOf(agent) {'
  ],
  // 7. render(): request несёт sessionId дальше по конвейеру.
  [
    '  return { ok: true, request: { kind, title: text.title, body: text.body(detail) } };',
    '  return { ok: true, request: { kind, title: text.title, body: text.body(detail), sessionId: detail.sessionId } };'
  ],
  // 8–12. Пять видов уведомлений получают sessionId из agent'а в области видимости.
  [
    '  return render("ask", {\n    tool: request.toolName,',
    '  return render("ask", {\n    sessionId: agentSessionId(request.agent),\n    tool: request.toolName,'
  ],
  [
    '  return render("question", {\n    taskTitle: title.found ? title.title : void 0,',
    '  return render("question", {\n    sessionId: agentSessionId(request.agent),\n    taskTitle: title.found ? title.title : void 0,'
  ],
  [
    '  return render(outcome.kind, { taskTitle: outcome.taskTitle, durationMs: outcome.durationMs });',
    '  return render(outcome.kind, { sessionId: agentSessionId(payload.agent), taskTitle: outcome.taskTitle, durationMs: outcome.durationMs });'
  ],
  [
    '  return render("turn-end", { turn: outcome.turn, taskTitle: outcome.taskTitle });',
    '  return render("turn-end", { sessionId: agentSessionId(payload.agent), turn: outcome.turn, taskTitle: outcome.taskTitle });'
  ],
  [
    '  return render("error", {\n    message: payload.error,',
    '  return render("error", {\n    sessionId: agentSessionId(payload.agent),\n    message: payload.error,'
  ],
  // 13. finalizeRequest: sessionId доезжает до каналов.
  [
    '    title: truncateCodePoints(request.title, TITLE_MAX_CODE_POINTS),\n    body: request.body\n  };',
    '    title: truncateCodePoints(request.title, TITLE_MAX_CODE_POINTS),\n    body: request.body,\n    sessionId: request.sessionId\n  };'
  ],
  // 14. buildSystemCommand: session уезжает в payload тоста.
  [
    '    const payload = Buffer.from(JSON.stringify({ title, message, silent }), "utf8").toString("base64");',
    '    const payload = Buffer.from(JSON.stringify({ title, message, silent, session: options.session }), "utf8").toString("base64");'
  ],
  // 15. sendSystem: передаём session из сообщения.
  [
    '{ sound: target.sound, selfPlay, toastScript: target.toastScript });',
    '{ sound: target.sound, selfPlay, toastScript: target.toastScript, session: message.sessionId });'
  ],
  // 16. buildFrame (browser-канал): sessionId в кадр.
  [
    '    title: truncateCodePoints(message.title, displayCaps.browser.titleMax),\n    body: truncateCodePoints(message.body, displayCaps.browser.bodyMax)\n  };',
    '    title: truncateCodePoints(message.title, displayCaps.browser.titleMax),\n    body: truncateCodePoints(message.body, displayCaps.browser.bodyMax),\n    sessionId: message.sessionId\n  };'
  ],
  // 17. publish(): sessionId уезжает в SSE-кадр notify (undefined из JSON выпадает).
  [
    '      whenVisible: frame.whenVisible\n    };',
    '      whenVisible: frame.whenVisible,\n      sessionId: frame.sessionId\n    };'
  ],
  // 18. notifyHelperPath(): путь к нативному helper'у рядом с toast.ps1
  //     (lib/server/dsh-notify-helper.exe — кладёт генератор, см. localize.mjs).
  [
    'function toastScriptPath() {\n' +
      '  return join3(dirname2(fileURLToPath(import.meta.url)), "server", "channels", "impl", "system", "toast.ps1");\n' +
      '}',
    'function toastScriptPath() {\n' +
      '  return join3(dirname2(fileURLToPath(import.meta.url)), "server", "channels", "impl", "system", "toast.ps1");\n' +
      '}\n' +
      '// DSH для 1С: нативный helper вместо powershell.exe — без вспышки консоли,\n' +
      '// мгновенный старт, не блокируется AppLocker-политиками на PowerShell.\n' +
      'function notifyHelperPath() {\n' +
      '  return join3(dirname2(fileURLToPath(import.meta.url)), "server", "dsh-notify-helper.exe");\n' +
      '}'
  ],
  // 19. buildSystemCommand (win32): helper — основной путь, powershell — fallback.
  //     Якорь намеренно обрывается до строки payload: её переписывает дельта 14,
  //     пересекаться с ней нельзя (applyEntries применяет замены к одному тексту).
  [
    '  if (probe.platform === "win32") {\n' +
      '    if (!probe.toastScriptAvailable)\n' +
      '      return [];\n',
    '  if (probe.platform === "win32") {\n' +
      '    const notifyHelper = notifyHelperPath();\n' +
      '    if (systemDeps().existsSync(notifyHelper)) {\n' +
      '      const helperPayload = Buffer.from(JSON.stringify({ title, message, silent, session: options.session }), "utf8").toString("base64");\n' +
      '      return [notifyHelper, "toast", "--payload", helperPayload];\n' +
      '    }\n' +
      '    if (!probe.toastScriptAvailable)\n' +
      '      return [];\n'
  ]
];

// ── lib/client.js (клиент) ──────────────────────────────────────────────────

export const CLIENT_DELTAS = [
  // 1. Клиенту нужен сервис uiWorkspace (переключение сессии в UI).
  [
    'var inject = ["slots", "locale"];',
    'var inject = ["slots", "locale", "uiWorkspace"];'
  ],
  // 2. SSE: кадры goto-session идут в onFrame (с той же защитой по seq).
  [
    '              if (data.type === "ping") return;\n              if (data.type === "notify") {',
    '              if (data.type === "ping") return;\n' +
      '              if (data.type === "goto-session") {\n' +
      '                if (typeof data.seq === "number") {\n' +
      '                  if (lastSeq > 0 && data.seq <= lastSeq) return;\n' +
      '                  lastSeq = data.seq;\n' +
      '                }\n' +
      '                onFrame(data);\n' +
      '                return;\n' +
      '              }\n' +
      '              if (data.type === "notify") {'
  ],
  // 3. onFrame: goto-session переключает сессию, остальное — как было.
  //    Заодно запоминаем uiWorkspace: showNotification живёт вне замыкания ctx.
  [
    '              function(payload) {\n                handleNotifyFrame(payload, owner);\n              }',
    '              function(payload) {\n' +
      '                uiWorkspaceRef.current = ctx.uiWorkspace;\n' +
      '                if (payload.type === "goto-session") {\n' +
      '                  if (typeof payload.sessionId === "string" && payload.sessionId.length > 0) {\n' +
      '                    try {\n' +
      '                      ctx.uiWorkspace.openSession(payload.sessionId);\n' +
      '                    } catch (error) {\n' +
      '                      console.warn("[dsh-notifier] не удалось переключить сессию: ", error);\n' +
      '                    }\n' +
      '                  }\n' +
      '                  return;\n' +
      '                }\n' +
      '                handleNotifyFrame(payload, owner);\n' +
      '              }'
  ],
  // 4. Хранилище ссылки на uiWorkspace для showNotification.
  [
    '    var eventsHandle = { current: null };',
    '    var uiWorkspaceRef = { current: null };\n    var eventsHandle = { current: null };'
  ],
  // 5. handleNotifyFrame: читаем sessionId из кадра.
  [
    '      const message = typeof payload.message === "string" ? payload.message : "";',
    '      const message = typeof payload.message === "string" ? payload.message : "";\n      const sessionId = typeof payload.sessionId === "string" ? payload.sessionId : "";'
  ],
  // 6. ...и передаём в showNotification.
  [
    '          sound: payload.sound,\n          playOnly: payload.playOnly === true\n        },',
    '          sound: payload.sound,\n          playOnly: payload.playOnly === true,\n          sessionId\n        },'
  ],
  // 7. onclick браузерного тоста: фокус окна + переход в сессию уведомления.
  [
    '          notification.onclick = () => {\n            window.focus();\n            notification.close();\n          };',
    '          notification.onclick = () => {\n' +
      '            window.focus();\n' +
      '            if (opts.sessionId && uiWorkspaceRef.current) {\n' +
      '              try {\n' +
      '                uiWorkspaceRef.current.openSession(opts.sessionId);\n' +
      '              } catch (error) {\n' +
      '                console.warn("[dsh-notifier] не удалось переключить сессию: ", error);\n' +
      '              }\n' +
      '            }\n' +
      '            notification.close();\n' +
      '          };'
  ]
];

// ── lib/server/channels/impl/system/toast.ps1 ────────────────────────────────

// Статический launch (прошлая дельта) заменён: сессионный deep-link через
// payload.session, запасной вариант — dsh://open (просто поднять окно).
export const TOAST_DELTAS = [
  // 1. После разбора payload: вычислить launch URL.
  [
    '$useSilent = if ($hasPayload) { [bool]$d.silent -or $Silent.IsPresent } else { $Silent.IsPresent }',
    '$useSilent = if ($hasPayload) { [bool]$d.silent -or $Silent.IsPresent } else { $Silent.IsPresent }\n' +
      '# DSH для 1С: deep-link — клик по тосту ведёт в сессию уведомления.\n' +
      '$launchUrl = "dsh://open"\n' +
      'if ($hasPayload -and $d.session) { $launchUrl = "dsh-notify://goto/$($d.session)" }'
  ],
  // 2. После регистрации AUMID: регистрация протокола dsh-notify → helper exe,
  //    goto.ps1 — запасной вариант (когда exe нет: старая копия плагина).
  [
    '} catch {\n  # 注册表不可写等场景仍尝试弹窗（旧版 Windows 未注册也可能成功）\n}',
    '} catch {\n  # 注册表不可写等场景仍尝试弹窗（旧版 Windows 未注册也可能成功）\n}\n' +
      '# DSH для 1С: протокол dsh-notify:// → helper рядом с пакетом (exe, иначе goto.ps1).\n' +
      'try {\n' +
      '  $serverDir = (Resolve-Path (Join-Path $PSScriptRoot "..\\..\\..")).Path\n' +
      '  $helperExe = Join-Path $serverDir "dsh-notify-helper.exe"\n' +
      '  if (Test-Path $helperExe) {\n' +
      '    $protoTarget = "`"$helperExe`" goto --url `"%1`""\n' +
      '  } else {\n' +
      '    $gotoScript = Join-Path $serverDir "goto.ps1"\n' +
      '    $psExe = Join-Path $PSHome "powershell.exe"\n' +
      '    $protoTarget = "`"$psExe`" -NoProfile -NonInteractive -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$gotoScript`" -Url `"%1`""\n' +
      '  }\n' +
      '  $null = (New-Item -Path "HKCU:\\SOFTWARE\\Classes\\dsh-notify" -Force).SetValue("URL Protocol", "", "String")\n' +
      '  $protoCmd = New-Item -Path "HKCU:\\SOFTWARE\\Classes\\dsh-notify\\shell\\open\\command" -Force\n' +
      '  $null = $protoCmd.SetValue("", $protoTarget, "String")\n' +
      '} catch {\n' +
      '  # Протокол не зарегистрировался — тост всё равно показываем, клик просто не сработает.\n' +
      '}'
  ],
  // 3. launch из вычисленного $launchUrl.
  [
    '$texts = $template.GetElementsByTagName("text")',
    '$null = $template.DocumentElement.SetAttribute("launch", $launchUrl)\n' +
      '  $null = $template.DocumentElement.SetAttribute("activationType", "protocol")\n' +
      '  $texts = $template.GetElementsByTagName("text")'
  ]
];

// Маркеры для --check: дельта либо применилась целиком, либо генерация упала.
export const FEATURE_MARKERS = {
  'lib/index.js': ['publishGoto', '/api/dsh-notifier/goto', 'runtime.json', 'sessionId: agentSessionId', 'session: options.session', 'sessionId: frame.sessionId', 'notifyHelperPath', 'dsh-notify-helper.exe'],
  'lib/client.js': ['"goto-session"', 'ctx.uiWorkspace.openSession', '"uiWorkspace"', 'uiWorkspaceRef.current.openSession'],
  'lib/server/channels/impl/system/toast.ps1': ['$launchUrl', 'dsh-notify://goto/', 'dsh-notify', 'dsh-notify-helper.exe'],
  'lib/server/goto.ps1': ['dsh-notify://goto/', 'api/dsh-notifier/goto', 'dsh://open']
};
