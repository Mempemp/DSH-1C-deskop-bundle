<h1 align="center">
  <img src="docs/images/readme-logo-black-v020.png" width="64" alt="DSH для 1С" valign="middle" />
  DSH для 1С
</h1>

<p align="center">
  Готовая среда для работы с ИИ-агентом DeepSeek Harness,<br />
  собранная для 1С-разработки и устанавливаемая одним <code>.exe</code>.
</p>

<p align="center">
  <a href="https://github.com/Mempemp/DSH-1C-deskop-bundle/releases/latest">Скачать</a> ·
  <a href="#состав-сборки">Состав</a> ·
  <a href="#сборка-из-исходников">Сборка</a> ·
  <a href="#благодарности">Благодарности</a>
</p>

<p align="center">
  <img alt="Windows x64" src="https://img.shields.io/badge/Windows-x64-171513.svg" />
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-171513.svg" />
</p>

**DSH для 1С** — сборка десктопного клиента [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
с русским интерфейсом и офлайн-каталогом плагинов и MCP-серверов для 1С. Один установщик ставит
всё сразу: приложение, редактор BSL, параметры подключения к базам, веб-поиск,
поиск по документации платформы и маркет плагинов.

Версия сборки — `<версия ядра>-<номер подрелиза>`: `0.2.1-rc.2-1` — первый подрелиз на ядре
`0.2.1-rc.2`. Номер подрелиза растёт с изменениями сборки, версия ядра — с обновлением
DeepSeek Harness.

## Установка

- Скачайте `.exe` со [страницы релизов](https://github.com/Mempemp/DSH-1C-deskop-bundle/releases/latest)
  и пройдите мастер установки. Node.js и CLI ставить не нужно — рантайм лежит внутри приложения.
- Данные — профиль, сессии, настройки, вложения и ваши плагины — хранятся в
  `%USERPROFILE%\.dsh` и сохраняются при обновлении.
- При первом запуске данные предыдущей сборки (`%APPDATA%\dsh-desktop\harness`)
  копируются в `.dsh` один раз; исходный каталог остаётся нетронутым.
- Первый экран предлагает «Настроить позже»: рабочее пространство открывается без
  входа и без ключа. Аккаунт DeepSeek и модели настраиваются в «Настройки → Модели».
- Установщик не подписан сертификатом, поэтому Windows покажет предупреждение
  SmartScreen: «Подробнее» → «Выполнить в любом случае».
- Автообновление: приложение проверяет страницу релизов и предлагает обновиться,
  скачивая только изменившуюся часть файла. Установка идёт тем же мастером.

## Зачем это нужно

Запуск «чистого» DeepSeek Harness требует Node.js, CLI, ручной установки плагинов
и настройки MCP. Эта сборка убирает весь барьер:

- **Рабочие области под проекты** — Платформа, ЕРП, ЗУП, прочее: разные задачи в
  одном окне, сессии не смешиваются.
- **Редактор BSL** ([DSH-CodeEditor_BSL](https://github.com/Mempemp/DSH-CodeEditor_BSL)) —
  дерево метаданных 1С, подсветка, diff, отправка фрагмента кода в чат.
- **Параметры проектов 1С** ([DSH-1CProjectProperties](https://github.com/Mempemp/DSH-1CProjectProperties)) —
  данные подключения и авторизации для каждой ИБ, доступные инструментам агента.
- **RLM-инструменты для BSL** — быстрый поиск и навигация по коду 1С: MCP-сервер
  `rlm-tools-bsl` живёт внутри [DSH-1CProjectProperties](https://github.com/Mempemp/DSH-1CProjectProperties)
  со своими настройками и индексами проектов.
- **Правила 1С в проекте** — набор [ai_rules_1c](https://github.com/comol/ai_rules_1c):
  52 правила, 13 ролей субагентов, 37 команд, 21 навык и OpenSpec разворачиваются
  в конкретный проект кнопкой «Развернуть правила в проект» в окне параметров
  проекта — целиком, с путями, переписанными под проект. В другие проекты правила
  не подмешиваются.
- **Документация платформы в ответах агента** — публичный MCP-сервер `v8std`
  (поиск по документации 1С, БСП / SSL и стандартам, разбор диагностик ACC и BSLLS)
  подключён сразу, без ключа и настройки; в панели MCP-менеджера его видно и можно
  выключить, как любой другой сервер.
- **Справка по API вашей версии платформы** — второй MCP-сервер,
  `1c-platform-context`, читает синтакс-помощник установленной 1С: агент видит
  точные сигнатуры методов, свойства типов, конструкторы и значения системных
  перечислений и может проверить свой BSL против платформы. Поднимается сам, как
  только в настройках указан путь к платформе; интернет не нужен.
- **Память о работе** ([dsh-engram-memory](https://github.com/Mempemp/dsh-engram-memory)) —
  агент помнит, что делалось в каждом проекте: заметки законченных ходов, выводы
  модели, подача нужного в разговор и вкладка «Память Engram» в настройках для
  сведения заметок в карточки-знания. База лежит локально
  (`%USERPROFILE%\.engram\engram.db`), ключей и интернета не нужно.
- **Документы** — просмотр docx/pptx/xlsx и конвертация Office→PDF встроены в клиент;
  агент создаёт и правит файлы через навыки office-*.
- **Веб-поиск** ([modsearch](https://github.com/liustack/modsearch)) и **схемы**
  ([archify](https://github.com/tt-a1i/archify), Mermaid) из коробки.
- **Браузер для агента** ([dsh-browser-agent](https://github.com/hermes-ai-2026/dsh-browser-agent)) —
  19 инструментов `browser_*` поверх встроенного sidebar-браузера: чтение
  accessibility-дерева со стабильными ссылками, ввод через CDP, скриншоты,
  перехват сети, эмуляция устройств, хранилище cookie и несколько окон.
- **Маркет плагинов** ([dshmarket](https://github.com/dsh-market/dsh-market)) —
  сообщество DSH доступно сразу, свои плагины и MCP добавляются поверх сборки.
- **Русский интерфейс** ([dsh-russian-lang](https://github.com/GooDAnDReaDY/dsh-russian-lang)) —
  предвыбран; умные функции ввода (Smart UX) по умолчанию выключены и включаются
  галочками в настройках плагина.
- **Уведомления на русском** ([dsh-notifier-ru](packages/dsh-notifier-ru)) —
  системный тост Windows, когда агенту нужен ответ, требуется разрешение или
  задача закончилась (в том числе с ошибкой); звук, каналы ntfy / Gotify / Bark /
  webhook и страница настроек плагина на русском.

## Состав сборки

Полный список — в `installer-flavor.yml` (источники); при сборке из него собирается
`apps/desktop/installer-catalog/manifest.json` с зафиксированными версиями и digest:

- 13 плагинов: dshmarket, dsh-mcp-manager, modsearch, dsh-better-sidebar,
  skill-explorer, archify, dsh-russian-lang, dsh-browser-agent (агент управляет
  встроенным браузером: 19 инструментов browser_* поверх CDP), `dsh-notifier-ru`
  (русские уведомления: системный тост Windows,
  звук и каналы push) + четыре наших: три 1С-плагина и `dsh-engram-memory` (память
  агента: правила, подача памяти и MCP-сервер `engram` внутри пакета);
- MCP-сервер `v8std`: поиск по документации платформы 1С, БСП / SSL и стандартам;
- MCP-сервер `1c-platform-context`: справка по объектной модели **установленной**
  версии платформы — типы, методы, свойства, конструкторы, значения системных
  перечислений и проверка BSL против платформы. Локальный `bsl-context-rs` из
  сборки, без Java и Python: сервер поднимает плагин `dsh-1c-project-properties`
  по пути к платформе из своих настроек, инструменты видны агенту как
  `mcp__1c-platform-context__*`, сервер виден в панели MCP-менеджера;
- рантайм Git — `MinGit 2.56.0.3`: тот же `git.exe`, что ставит Git for Windows, но без
  графического интерфейса, Git Bash, Perl и справки. Первый запуск распаковывает его в
  `%USERPROFILE%\.dsh\git`, поэтому редактор показывает диффы, индикаторы изменений и умеет
  отправлять правки в индекс и коммитить на машине, где Git никто не устанавливал;
- набор правил 1С ([ai_rules_1c](https://github.com/comol/ai_rules_1c)) как payload:
  разворачивается в проект по кнопке, глобально ничего не подмешивается;
- рантайм `@deepseek-ai/dsh@0.2.1-rc.2` внутри приложения — ставить Node.js и CLI не нужно.

## Сборка из исходников

Приложение живёт в форке DeepSeek Harness — [Mempemp/deepseek-harness](https://github.com/Mempemp/deepseek-harness),
ветка `1c/main` (она же ветка по умолчанию). Этот репозиторий держит состав каталога, редакцию
notifier и документацию, поэтому клонировать нужно оба репозитория рядом: скрипт каталога читает
`installer-flavor.yml` и `packages/dsh-notifier-ru` отсюда.

Требования: Windows x64, Node.js 24, pnpm (`corepack enable`, версия из `packageManager`),
Visual Studio Build Tools 2022 с C++.

```sh
git clone https://github.com/Mempemp/deepseek-harness.git
git clone https://github.com/Mempemp/DSH-1C-deskop-bundle.git
cd deepseek-harness
corepack enable
pnpm install --frozen-lockfile
cp apps/desktop/.env.windows.1c apps/desktop/.env.windows
node apps/desktop/scripts/prepare-1c-catalog.mjs
pnpm --dir apps/desktop run package:win:x64:unsigned
```

Готовое — в `apps/desktop/.desktop-build/targets/win-x64/unsigned-artifacts/`: установщик, `.blockmap`
и `dsh1c.yml`. Каталог собирается из сети (npm, git, локальные пути) и в репозиторий не коммитится;
если он лежит не рядом с форком, путь задаётся `DSH_1C_BUNDLE_ROOT`. Сборка идёт под TTY: без
терминала pnpm падает с `stdin is not a tty`. Собирать из PowerShell или cmd — в git-bash первым в
PATH оказывается GNU `tar`, и упаковка падает на `Cannot connect to D:`, а шимы `corepack` ломаются
на путях.

### Кэш загрузок каталога

Пересобирать каталог приходится многократно за релиз, а самый долгий шаг в нём — не сборка, а
загрузка архива `dsh-web` (около 800 МБ, растёт от ревизии к ревизии). Поэтому архивы источников,
закреплённых **коммитом**, скрипт складывает в
`%LOCALAPPDATA%\dsh-1c-catalog\downloads` и переиспользует между прогонами: первый прогон после
смены пина качает, следующие печатают `download cache hit` и проходят за минуты.

- Другой каталог кэша — переменная `DSH_1C_CATALOG_CACHE`. Содержимое можно удалить в любой
  момент: там только скачанные архивы, ничто другое от них не зависит.
- **Теги и ветки не кэшируются** намеренно: сдвинувшийся тег дал бы следующему прогону старое
  дерево под правильным именем. Меняете пин с коммита на тег — платите повторной загрузкой.
- Оборванная запись кэша распознаётся по записи конца центрального каталога и перекачивается сама,
  поэтому «странный» результат после обрыва сети лечится повтором, а не чисткой.
- Кэш не влияет на поставку: содержимое тарболов и манифест остаются теми же, что и без него, —
  он экономит только трафик и время.

Инженерная документация: [архитектура](docs/architecture.md),
[разработка](docs/development.md), [релизный процесс](docs/release-runbook.md),
[переезд на официальный десктоп](docs/official-desktop-migration.md).

## Благодарности

Проект построен на открытых разработках, и мы благодарны их авторам:

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) — агентный рантайм
  и десктопный клиент (MIT): основа сборки, которую мы развиваем форком, добавляя
  русскую оболочку, каталог компонентов и установщик;
- [dsh-russian-lang](https://github.com/GooDAnDReaDY/dsh-russian-lang) — русская локализация интерфейса;
- [dsh-market](https://github.com/dsh-market/dsh-market) — маркет плагинов сообщества;
- плагины [wingsky-1](https://github.com/wingsky-1/dsh-plugin-hub),
  [liustack](https://github.com/liustack/modsearch),
  [omdsh-dev](https://github.com/omdsh-dev/DSH-better-sidebar),
  [tt-a1i](https://github.com/tt-a1i/archify),
  [zhu1090093659](https://github.com/zhu1090093659/dsh-web);
- [dsh-browser-agent](https://github.com/hermes-ai-2026/dsh-browser-agent) —
  браузерные инструменты для агента поверх встроенного sidebar-браузера (MIT);
- [dsh-notifier](https://github.com/wingsky-1/dsh-plugin-hub) — уведомления о ходе
  работы агента: системный тост Windows, звук и каналы ntfy / Gotify / Bark /
  webhook. В сборке едет русская редакция `dsh-notifier-ru` (MIT, © wingsky-1);
- [v8std](https://v8std.ru/) — публичный MCP-сервер стандартов разработки 1С
  ([исходники](https://github.com/zeegin/v8std)): поиск по стандартам, БСП / SSL и
  документации платформы, разбор диагностик ACC и BSLLS; подключён в сборке по
  умолчанию, ключ не нужен;
- [bsl-context](https://github.com/Regsorm/bsl-context) — MCP-сервер справки по
  API платформы 1С (MIT): поставляется в сборке готовым бинарником и работает
  через него;
- [engram](https://github.com/Gentleman-Programming/engram) — память агента
  (MIT, Go, автор Alan Buscaglia): входит в сборку внутри плагина
  [dsh-engram-memory](https://github.com/Mempemp/dsh-engram-memory);
- набор правил [comol/ai_rules_1c](https://github.com/comol/ai_rules_1c).

## Лицензия

Сборка распространяется под [лицензией MIT](LICENSE), как и апстрим DeepSeek Harness.
DeepSeek Harness и остальные зависимости подчиняются своим лицензиям.
