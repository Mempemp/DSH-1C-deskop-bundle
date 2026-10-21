# Сборка dsh-notify-helper.exe из NotifyHelper.cs.
#
# Используем csc.exe из .NET Framework 4.x (есть на любой Windows-машине с
# .NET 4.5+, отдельный SDK не нужен). System.Runtime.WindowsRuntime — фасад
# WinRT-проекции, часть фреймворка; берём копию из каталога Framework64.
# После сборки обновите HELPER_SHA256 в ../localize.mjs (он пинится в --check).
$ErrorActionPreference = 'Stop'
$framework = Join-Path $env:WINDIR 'Microsoft.NET\Framework64\v4.0.30319'
$csc = Join-Path $framework 'csc.exe'
$winrt = Join-Path $framework 'System.Runtime.WindowsRuntime.dll'
& $csc /nologo /target:winexe /optimize+ /platform:anycpu `
  /out:"$PSScriptRoot\dsh-notify-helper.exe" `
  /r:"$winrt" `
  "$PSScriptRoot\NotifyHelper.cs"
if ($LASTEXITCODE -ne 0) { throw "csc завершился с кодом $LASTEXITCODE" }
$hash = (Get-FileHash "$PSScriptRoot\dsh-notify-helper.exe" -Algorithm SHA256).Hash.ToLowerInvariant()
Write-Host "собрано: dsh-notify-helper.exe, sha256 = $hash"
