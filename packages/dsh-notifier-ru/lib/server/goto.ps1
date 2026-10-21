param(
  [string]$Url = ""
)
# dsh-notify://goto/<sessionId> → deep-link клика по тосту (DSH для 1С).
# Дёргает loopback-роут notifier'а (host публикует SSE-кадр goto-session,
# клиент в окне DSH переключает сессию), затем поднимает окно через dsh://open.
# Адрес API читает из runtime.json, который host переписывает при каждом старте.
# Все сбои молчаливы: helper вызывается из тоста, некому показать ошибку.
$ErrorActionPreference = "SilentlyContinue"

$m = [regex]::Match($Url, '^dsh-notify://goto/([A-Za-z0-9\-]+)')
if (-not $m.Success) { exit 1 }
$session = $m.Groups[1].Value

$dshHome = if ($env:DSH_HOME) { $env:DSH_HOME } else { Join-Path $env:USERPROFILE ".dsh" }
$runtimeFile = Join-Path $dshHome "dsh-notifier-ru\runtime.json"
if (-not (Test-Path $runtimeFile)) { exit 1 }
$runtime = Get-Content $runtimeFile -Raw | ConvertFrom-Json
if (-not $runtime.apiBase) { exit 1 }

Invoke-WebRequest -UseBasicParsing -Uri "$($runtime.apiBase)/api/dsh-notifier/goto?session=$session" -TimeoutSec 5 | Out-Null
Start-Process "dsh://open"
exit 0
