# Релиз

Релиз здесь — публикация готового установщика из форка. Сборки в этом репозитории не запускаются.

## 1. Версия

Версия принадлежит форку: `package.json` и `apps/desktop/package.json` там обязаны совпадать.
Схема — `<ядро>-<подрелиз>`, например `0.2.0-rc.2-5`. Подрелиз увеличивается на каждый выпуск,
даже если меняется только упаковка.

## 2. Сборка

```sh
cd apps/desktop && node scripts/prepare-1c-catalog.mjs
cd ../.. && node apps/desktop/node_modules/pnpm/bin/pnpm.mjs --dir apps/desktop run package:win:x64:unsigned
```

Сборка длится около 13 минут и заканчивается `success: True` в
`apps/desktop/.desktop-build/packaging-runs/<время>/result.json`. Артефакты — в
`apps/desktop/.desktop-build/targets/win-x64/unsigned-artifacts/`.

## 3. Проверки до публикации

- Первый запуск на отдельном `DSH_HOME`: каталог применён, плагины на месте, MCP-строки видны.
- Перенос данных: дом с отметкой прошлой схемы должен получить ключи и реестр папок.
- Сборку, которая меняет обработку обновлений, проверяют на реальном обновлении предыдущей версии.

## 4. Манифесты фида

В релиз кладутся четыре ассета: `.exe`, `.blockmap` и два манифеста.

| файл | версия | читатель |
| --- | --- | --- |
| `dsh1c.yml` | настоящая (`0.2.0-rc.2-N`) | текущая линия (канал `dsh1c`) |
| `latest.yml` | `0.11.0-3` | установленные `0.11.x` |

`latest.yml` — копия `dsh1c.yml` с заменённой строкой `version:`; путь, `sha512` и `size`
указывают на текущий установщик. Без него сборки `0.11.0-2` не увидят обновление: их semver
считает `0.2.x` более старым, чем `0.11.0-2`.

## 5. Публикация

```sh
git tag 0.2.0-rc.2-5 && git push origin 0.2.0-rc.2-5
gh release create 0.2.0-rc.2-5 --latest --notes-file docs/releases/0.2.0-rc.2-5.md \
  D:/.../DSH-1C-Setup-0.2.0-rc.2-5-win-x64-unsigned.exe \
  D:/.../DSH-1C-Setup-0.2.0-rc.2-5-win-x64-unsigned.exe.blockmap \
  D:/.../dsh1c.yml D:/.../latest.yml
```

- Тег — **без** префикса `v`.
- Релиз обычный, не pre-release: `releases/latest/download/` работает только для таких.
- `gh` — нативная программа: пути передавать в виде `D:/...`, иначе не найдёт файл.
- В `gh release create` суффикс `#имя` — это метка, а не имя ассета: файл должен называться
  буквально `latest.yml`.

## 6. Проверка после публикации

```sh
curl -sL https://github.com/Mempemp/DSH-1C-deskop-bundle/releases/latest/download/dsh1c.yml | head -3
curl -sL https://github.com/Mempemp/DSH-1C-deskop-bundle/releases/latest/download/latest.yml | head -3
```

Первая строка — новая версия, вторая — `0.11.0-3` с путём на тот же установщик.

Промежуточные сборки удаляются сразу после выхода рабочей версии, чтобы их нельзя было поставить
случайно: `gh release delete <тег> -y` и `git push origin --delete <тег>`.
