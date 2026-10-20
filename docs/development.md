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
node apps/desktop/scripts/prepare-1c-catalog.mjs                 # каталог из installer-flavor.yml
pnpm --dir apps/desktop run package:win:x64:unsigned             # установщик и манифесты фида
```

Скрипт каталога ищет второй репозиторий рядом с форком (`../DSH-1C-deskop-bundle`); другой путь —
переменная `DSH_1C_BUNDLE_ROOT`, конкретный файл — `DSH_1C_FLAVOR`. Каталог требует сети: плагины
качаются из npm, git, а `packages/dsh-notifier-ru` берётся из этого репозитория. В git каталог не
попадает (`apps/desktop/installer-catalog/` в `.gitignore`).

Готовое лежит в `apps/desktop/.desktop-build/targets/win-x64/unsigned-artifacts/`:
установщик, `.blockmap`, `dsh1c.yml`. Сборка идёт под TTY: без терминала pnpm падает с
`stdin is not a tty`.

## Проверки

- В этом репозитории: `npm ci && npm test` — редакция notifier и маршруты поставки.
- В форке: `tsc -b`, `vitest run` по затронутым пакетам.
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
