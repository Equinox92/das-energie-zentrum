# =====================================================
# Das Energie Zentrum
# Deployment Builder
# Version 1.1
# =====================================================

Write-Host ""
Write-Host "====================================="
Write-Host " Das Energie Zentrum Deployment Tool "
Write-Host "====================================="
Write-Host ""

$ProjectRoot = Split-Path $PSScriptRoot -Parent
$DeployFolder = Join-Path $ProjectRoot "deploy"

$FrontendFolder =
    Join-Path `
        $ProjectRoot `
        "frontend\web-app"

Write-Host "Frontend Folder:"
Write-Host $FrontendFolder
Write-Host ""

Write-Host "Project Root:"
Write-Host $ProjectRoot
Write-Host ""

Write-Host "Deploy Folder:"
Write-Host $DeployFolder
Write-Host ""

# =====================================================
# Copy Build Folder
# =====================================================

function Copy-BuildFolder
{
    param
    (
        [string]$DisplayName,

        [string]$SourceFolder
    )

    Write-Host "Copying $DisplayName..."

    $Source =
        Join-Path `
            $FrontendFolder `
            $SourceFolder

    if (Test-Path $Source)
    {
        Copy-Item `
            -Path $Source `
            -Destination $DeployFolder `
            -Recurse `
            -Force

        Write-Host "$DisplayName copied."
    }
    else
    {
        Write-Host "$DisplayName not found."
    }

    Write-Host ""
}

# =====================================================
# Clean Previous Deployment
# =====================================================

Write-Host "Cleaning deployment folder..."

Get-ChildItem `
    -Path $DeployFolder `
    -Exclude "README.md" `
    -Force |
    Remove-Item `
        -Recurse `
        -Force

Write-Host "Deployment folder cleaned."
Write-Host ""

# =====================================================
# Create Deployment Folder Structure
# =====================================================

Write-Host "Creating deployment folder structure..."

$Folders = @(
    "assets",
    "assets/images",
    "assets/icons",
    "assets/fonts",
    "css",
    "css/components",
    "css/layout",
    "css/pages",
    "css/utilities",
    "js",
    "js/core",
    "js/services",
    "js/ui",
    "js/utils",
    "js/data",
    "pages"
)

foreach ($Folder in $Folders)
{
    New-Item `
        -ItemType Directory `
        -Path (Join-Path $DeployFolder $Folder) `
        -Force | Out-Null
}

Write-Host "Deployment folders created."
Write-Host ""

# =====================================================
# Copy PHP Files
# =====================================================

Write-Host "Copying PHP files..."

Copy-Item `
    "$FrontendFolder\*.php" `
    -Destination $DeployFolder `
    -Force

Write-Host "PHP files copied."
Write-Host ""

# =====================================================
# Copy HTML Components
# =====================================================

Copy-BuildFolder `
    -DisplayName "HTML Components" `
    -SourceFolder "components"

# =====================================================
# Copy CSS
# =====================================================

Copy-BuildFolder `
    -DisplayName "CSS" `
    -SourceFolder "css"

# =====================================================
# Copy JavaScript
# =====================================================

Copy-BuildFolder `
    -DisplayName "JavaScript" `
    -SourceFolder "js"

# =====================================================
# Copy Assets
# =====================================================

Copy-BuildFolder `
    -DisplayName "Assets" `
    -SourceFolder "assets"


# =====================================================
# Copy Includes
# =====================================================

Copy-BuildFolder `
    -DisplayName "Includes" `
    -SourceFolder "includes"

# =====================================================
# Deployment Hygiene Check
# =====================================================

Write-Host ""
Write-Host "Checking deployment hygiene..."

$ForbiddenItems = @(
    ".git",
    ".github",
    ".vs",
    "backend",
    "scripts",
    "docs"
)

$HygienePassed = $true

foreach ($Item in $ForbiddenItems)
{
    $Path = Join-Path $DeployFolder $Item

    if (Test-Path $Path)
    {
        Write-Host "[WARNING] Found forbidden item: $Item"
        $HygienePassed = $false
    }
    else
    {
        Write-Host "[OK] $Item not present"
    }
}

Write-Host ""

# =====================================================
# Build Validation
# =====================================================

Write-Host ""
Write-Host "Validating deployment..."

$RequiredFiles = @(
    "login.php",
    "index.php",
    "assessment.php",
    "authenticate.php"
)

$BuildSuccessful = $true

foreach ($File in $RequiredFiles)
{
    $Target = Join-Path $DeployFolder $File

    if (Test-Path $Target)
    {
        Write-Host "[OK] $File"
    }
    else
    {
        Write-Host "[MISSING] $File"

        $BuildSuccessful = $false
    }
}

Write-Host ""

if ($BuildSuccessful)
{

# =====================================================
# Deployment Statistics
# =====================================================

Write-Host ""

$TotalFiles = (
    Get-ChildItem `
        -Path $DeployFolder `
        -Recurse `
        -File
).Count

Write-Host "Deployment Statistics"
Write-Host "----------------------"
Write-Host "Files Copied : $TotalFiles"
Write-Host ""

    Write-Host "====================================="
    Write-Host " BUILD SUCCESSFUL"
    Write-Host " Deployment validated."
    Write-Host "====================================="
}
else
{
    Write-Host "====================================="
    Write-Host " BUILD FAILED"
    Write-Host " Missing deployment files."
    Write-Host "====================================="
}