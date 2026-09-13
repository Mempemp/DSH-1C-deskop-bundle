<h1 align="center">
  <img src="docs/images/readme-logo-black-v020.png" width="64" alt="DSH для 1С" valign="middle" />
  DSH для 1С
</h1>

<p align="center">
  Готовая среда для работы с ИИ-агентом DeepSeek Harness,<br />
  собранная для 1С-разработки и устанавливаемая одним <code>.exe</code>.
</p>

<p align="center">
  <a href="https://mempemp.github.io/1C-DSH-promo/">Промо-сайт</a> ·
  <a href="https://github.com/Mempemp/DSH-1C-deskop-bundle/releases/latest">Скачать</a> ·
  <a href="#состав-сборки">Состав</a> ·
  <a href="#сборка-из-исходников">Сборка</a> ·
  <a href="#благодарности">Благодарности</a>
</p>

<p align="center">
  <img alt="Windows x64" src="https://img.shields.io/badge/Windows-x64-171513.svg" />
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-171513.svg" />
</p>

**DSH для 1С** — сборка десктопного клиента [DSH Desktop](https://github.com/dataelement/dsh-desktop)
с офлайн-каталогом плагинов, навыков и MCP-серверов для 1С. Один установщик ставит
всё сразу: приложение, редактор BSL, параметры подключения к базам, веб-поиск,
маркет плагинов и набор 1С-навыков.

## Установка

- Скачайте `.exe` со [страницы релизов](https://github.com/Mempemp/DSH-1C-deskop-bundle/releases/latest)
  и пройдите мастер установки. Node.js и CLI ставить не нужно — рантайм лежит внутри приложения.
- Установка идёт поверх предыдущей версии: профили, сессии, настройки, ключи доступа
  и плагины, добавленные вами, хранятся в `%APPDATA%\dsh-desktop\harness` и сохраняются.
- Установщик не подписан сертификатом, поэтому Windows покажет предупреждение
  SmartScreen: «Подробнее» → «Выполнить в любом случае».
- Автообновление выключено: новые версии скачиваются вручную со страницы релизов.

## Зачем это нужно

Запуск «чистого» DeepSeek Harness требует Node.js, CLI, ручной установки плагинов
и настройки MCP. Эта сборка убирает весь барьер:

- **Рабочие области под проекты** — Платформа, ЕРП, ЗУП, прочее: разные задачи в
  одном окне, сессии не смешиваются.
- **Редактор BSL** ([DSH-CodeEditor_BSL](https://github.com/Mempemp/DSH-CodeEditor_BSL)) —
  дерево метаданных 1С, подсветка, diff, отправка фрагмента кода в чат.
- **Параметры проектов 1С** ([DSH-1CProjectProperties](https://github.com/Mempemp/DSH-1CProjectProperties)) —
  данные подключения и авторизации для каждой ИБ, доступные инструментам агента.
- **RLM-инструменты для BSL** ([DSH-runner-rlm-tools-bsl](https://github.com/Mempemp/DSH-runner-rlm-tools-bsl)) —
  быстрый поиск и навигация по коду 1С.
- **Навыки и правила для 1С** — работа с метаданными, хранилищем, выгрузкой
  конфигурации в файлы ([ai_rules_1c](https://github.com/comol/ai_rules_1c)).
- **Веб-поиск** ([modsearch](https://github.com/liustack/modsearch)) и **схемы**
  ([archify](https://github.com/tt-a1i/archify), Mermaid) из коробки.
- **Маркет плагинов** ([dshmarket](https://github.com/dsh-market/dsh-market)) —
  сообщество DSH доступно сразу, свои плагины и MCP добавляются поверх сборки.
- **Русский интерфейс** ([dsh-russian-lang](https://github.com/GooDAnDReaDY/dsh-russian-lang)) —
  предвыбран; умные функции ввода (Smart UX) по умолчанию выключены и включаются
  галочками в настройках плагина.

## Состав сборки

Полный список — в `installer-flavor.yml` (источники) и
`build/installer-catalog/manifest.json` (зафиксированные версии и digest):

- 10 плагинов: dshmarket, dsh-mcp-manager, modsearch, dsh-better-sidebar,
  skill-explorer, archify, dsh-russian-lang + три наших 1С-плагина;
- 12+ навыков (skills) для 1С и повседневных задач;
- правила (AGENTS.md) для работы агента с 1С;
- рантайм `@deepseek-ai/dsh@0.1.2-rc.1` внутри приложения — ставить Node.js и CLI не нужно.

## Сборка из исходников

Требования: Windows x64, Node.js LTS, npm.

```sh
npm install
npm run package:win     # dist/dsh-desktop-windows-x64-setup.exe
```

Проверки перед изменениями: `npm test`, `npm run typecheck`, `npm run build`.

Инженерная документация: [обзор проекта](docs/overview.md),
[архитектура](docs/architecture.md), [разработка](docs/development.md),
[релизный процесс](docs/release-runbook.md).

## Благодарности

Проект построен на открытых разработках, и мы благодарны их авторам:

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) — агентный рантайм;
- [DSH Desktop](https://github.com/dataelement/dsh-desktop) — десктопная оболочка (MIT), основа нашей сборки: мы развиваем её поверх апстрима, не переписывая рантайм, и добавляем свои плагины, навыки и установщик;
- [dsh-russian-lang](https://github.com/GooDAnDReaDY/dsh-russian-lang) — русская локализация интерфейса;
- [dsh-market](https://github.com/dsh-market/dsh-market) — маркет плагинов сообщества;
- плагины [wingsky-1](https://github.com/wingsky-1/dsh-plugin-hub),
  [liustack](https://github.com/liustack/modsearch),
  [omdsh-dev](https://github.com/omdsh-dev/DSH-better-sidebar),
  [tt-a1i](https://github.com/tt-a1i/archify),
  [zhu1090093659](https://github.com/zhu1090093659/dsh-web);
- навыки [comol/ai_rules_1c](https://github.com/comol/ai_rules_1c).

## Лицензия

Сборка распространяется под [лицензией MIT](LICENSE), как и апстрим DSH Desktop.
DeepSeek Harness и остальные зависимости подчиняются своим лицензиям.
