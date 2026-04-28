$ErrorActionPreference = "Stop"

$source = Join-Path $PSScriptRoot "custom-widget\*"
$destination = Join-Path $PSScriptRoot "custom-widget.zip"

if (Test-Path $destination) {
    Remove-Item $destination -Force
}

Compress-Archive -Path $source -DestinationPath $destination -Force

Write-Host "ZIP creado en: $destination"
