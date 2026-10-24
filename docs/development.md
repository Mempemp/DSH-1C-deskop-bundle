# Разработка

Приложение собирается из форка DeepSeek Harness — [Mempemp/deepseek-harness](https://github.com/Mempemp/deepseek-harness),
ветка `1c/main` (ветка по умолчанию). Этот репозиторий держит состав каталога, русскую редакцию
notifier и документацию, поэтому сборка идёт из двух клонов, стоящих рядом.

## Что нужно

- Windows x64 (сборка установщика возможна только здесь);
- Node.js 24;
- pnpm 11.7.0 — `corepack enable` в клоне форка (версия зафиксирована в `packageManager`);
- Visual Studio Build Tools 2022 с C++ — для нативных модулей;
- gh CLI с доступом к репозиторию релизов.

## Сборка установщика

```sh
git clone https://github.com/Mempemp/deepseek-harness.git
git clone https://github.com/Mempemp/DSH-1C-deskop-bundle.git   # рядом, имя не менять
cd deepseek-harness
corepack enable
pnpm install --frozen-lockfile
cp apps/desktop/.env.windows.1c apps/desktop/.env.windows          # настройки упаковки, в git не входят
node apps/desktop/scripts/prepare-1c-catalog.mjs                 # каталог из installer-flavor.yml
pnpm --dir apps/desktop run package:win:x64:unsigned             # установщик и манифесты фида
```

`apps/desktop/.env.windows` создаётся из шаблона `.env.windows.1c` в форке: без него упаковка
останавливается на `cannot read …\.env.windows`. Файл в git не попадает (исключён апстримом).

Скрипт каталога ищет второй репозиторий рядом с форком (`../DSH-1C-deskop-bundle`); другой путь —
переменная `DSH_1C_BUNDLE_ROOT`, конкретный файл — `DSH_1C_FLAVOR`. Каталог требует сети: плагины
качаются из npm, git, а `packages/dsh-notifier-ru` берётся из этого репозитория. В git каталог не
попадает (`apps/desktop/installer-catalog/` в `.gitignore`).

Архивы git-источников, закреплённых коммитом, скрипт складывает в кэш загрузок
(`%LOCALAPPDATA%\dsh-1c-catalog\downloads`, другой путь — `DSH_1C_CATALOG_CACHE`) и переиспользует
между прогонами: у `dsh-web` архив около 800 МБ, и без кэша каждый прогон каталога заново тянул его
целиком. Теги и ветки не кэшируются — сдвинувшийся тег дал бы следующему прогону устаревшее дерево
под правильным именем. Оборванная запись кэша распознаётся по записи конца центрального каталога и
перекачивается; удалить кэш можно в любой момент, это только загрузки.

Готовое лежит в `apps/desktop/.desktop-build/targets/win-x64/unsigned-artifacts/`:
установщик, `.blockmap`, `dsh1c.yml`. Сборка идёт под TTY: без терминала pnpm падает с
`stdin is not a tty`. Собирать из PowerShell или cmd: в git-bash первым в PATH оказывается GNU `tar`,
и упаковка падает на `Cannot connect to D:` (`tar.exe` из `System32` такой путь понимает), а шимы
`corepack` ломаются на путях MSYS.

## Проверки

- В этом репозитории: `npm ci && npm test` — редакция notifier и маршруты поставки.
- В форке: `node_modules/.bin/tsc -b apps/desktop/tsconfig.host.json` и
  `npx vitest run apps/desktop/tests/*.spec.ts`. Каталог (`apps/desktop/tests`) передавать
  нельзя: путь затягивает в прогон `*.e2e.ts`, которые конфиг репозитория исключает — им нужна
  собранная сборка, и они дают сотню падений, не связанных с кодом. Тот же эффект у любого
  пути-фильтра, который совпадает с именем e2e-файла.
- Гейт форка зелёный: спеки сборки (`windows-update-publisher`, `macos-signature`,
  `installer-packaging`) читают имя артефакта и адрес фида из
  `scripts/electron-builder-config.mjs` (`createDesktopArtifactName`, `DESKTOP_UPDATE_PUBLIC_URL`),
  а не повторяют строку у себя. Правя имя установщика или адрес обновлений, менять их там — иначе
  тесты снова начнут утверждать чужой продукт.
- Известное исключение — `windows-cli-signals.spec.ts`, проверка доставки SIGINT в Electron:
  падает с `ready=1 signalled=1 completed=0 code=0` (процесс выходит с нулём, не выполнив
  асинхронный обработчик завершения). Код под проверкой (`desktop-host/src/windows-cli-signals.ts`)
  в форке не менялся, на этой машине падение воспроизводится и в cmd, и с увеличенными таймаутами.
  Разбирать отдельно, а не считать следствием релиза.
- `upload-with-credentials.spec.ts` требует PowerShell 7 (`pwsh`); при его отсутствии восемь
  проверок пропускаются, а не падают: `execFile` отдаёт отсутствующий запускатор как `ENOENT`,
  и тест сообщал бы о дефекте, которого нет.
- Первый запуск: приложение ставят на отдельный `DSH_HOME`, проверяют каталог в профиле
  (`profiles/desktop/.1c-catalog-applied`), число плагинов и файлы правил.

## Правка notifier

`packages/dsh-notifier-ru` собирается поверх опубликованного апстрима: тексты правятся
генератором (`tools/*-texts.mjs`), затем тест сверяет провенанс и русские строки. Менять `lib/`
вручную можно, но при обновлении апстрима изменения нужно повторить в генераторе.

## Локальный дом

Для проверок используется отдельный каталог (`DSH_HOME`) — не рабочий `~/.dsh`: иначе можно
потерять настоящие сессии и настройки. Старый профиль предшественника
(`%APPDATA%\dsh-desktop\harness`) читается только переносом и не изменяется.
