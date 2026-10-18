# Разработка

Приложение собирается из форка DeepSeek Harness (`deepseek-harness`, ветка `1c/main`). Этот
репозиторий держит состав каталога, русскую редакцию notifier и документацию.

## Что нужно

- Windows x64 (сборка установщика возможна только здесь);
- Node.js 24;
- pnpm (лежит внутри форка: `apps/desktop/node_modules/pnpm`);
- Visual Studio Build Tools 2022 с C++ — для нативных модулей;
- gh CLI с доступом к репозиторию релизов.

## Сборка установщика

```sh
cd apps/desktop && node scripts/prepare-1c-catalog.mjs          # каталог из installer-flavor.yml
cd ../.. && node apps/desktop/node_modules/pnpm/bin/pnpm.mjs \
  --dir apps/desktop run package:win:x64:unsigned              # установщик и манифесты фида
```

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
