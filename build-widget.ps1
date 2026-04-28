$ErrorActionPreference = "Stop"

$source = Join-Path $PSScriptRoot "custom-widget\*"
$destination = Join-Path $PSScriptRoot "custom-widget.zip"

if (Test-Path $destination) {
    Write-Host "Eliminando ZIP existente..."
    Remove-Item $destination -Force -ErrorAction Stop
}

Compress-Archive -Path $source -DestinationPath $destination -Force

Write-Host "ZIP creado en: $destination"
