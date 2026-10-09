# =====================================================
# Das Energie Zentrum
# Frontend Development Server
# =====================================================

$ProjectRoot = Split-Path $PSScriptRoot -Parent

$FrontendFolder =
    Join-Path `
        $ProjectRoot `
        "frontend\web-app"

Set-Location `
    $FrontendFolder

Write-Host ""
Write-Host "======================================="
Write-Host " Das Energie Zentrum Frontend Server"
Write-Host "======================================="
Write-Host ""

Write-Host "Starting PHP Development Server..."
Write-Host ""

php -S 0.0.0.0:8080