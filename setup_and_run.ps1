$ErrorActionPreference = "Stop"

Write-Host "Starting Dashboard Setup..." -ForegroundColor Cyan

# Check for .env.local content
$EnvFile = ".env.local"
if (-not (Test-Path $EnvFile)) {
    Write-Host "Creating .env.local..." -ForegroundColor Yellow
    Set-Content -Path $EnvFile -Value "DATABASE_URL=`"postgres://user:password@hostname/dbname`""
    Add-Content -Path $EnvFile -Value "`nSESSION_SECRET=`"replace-with-secure-secret`""
}

$CurrentEnv = Get-Content $EnvFile -Raw
if ($CurrentEnv -match "postgres://user:password@hostname/dbname") {
    Write-Host "--------------------------------------------------------" -ForegroundColor Yellow
    Write-Host "ACTION REQUIRED: Please enter your Neon Database Connection String." -ForegroundColor Yellow
    Write-Host "You can find this in your Neon Console." -ForegroundColor Yellow
    Write-Host "--------------------------------------------------------" -ForegroundColor Yellow
    
    $DbUrl = Read-Host "Paste DATABASE_URL here"
    
    if (-not [string]::IsNullOrWhiteSpace($DbUrl)) {
        # Update .env.local
        (Get-Content $EnvFile) -replace "DATABASE_URL=`"postgres://user:password@hostname/dbname`"", "DATABASE_URL=`"$DbUrl`"" | Set-Content $EnvFile
        Write-Host "Updated DATABASE_URL in .env.local" -ForegroundColor Green
    } else {
        Write-Host "Skipping DB URL update (empty input). Application may fail to start." -ForegroundColor Red
    }
}

# Generate random session secret if needed
if ($CurrentEnv -match "change-this-to-a-random-secret") {
    $RandomSecret = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
    (Get-Content $EnvFile) -replace "SESSION_SECRET=`"change-this-to-a-random-secret`"", "SESSION_SECRET=`"$RandomSecret`"" | Set-Content $EnvFile
    Write-Host "Generated random SESSION_SECRET." -ForegroundColor Green
}

# Run Migration
Write-Host "Running Database Migration..." -ForegroundColor Cyan
try {
    npm run migrate
    Write-Host "Migration Successful!" -ForegroundColor Green
} catch {
    Write-Host "Migration Failed. Please check your DB connection string." -ForegroundColor Red
    Write-Host "Error details: $_" -ForegroundColor Red
    # Don't exit, try to run dev anyway as requested
}

# Start Dev Server
Write-Host "Starting Development Server..." -ForegroundColor Cyan
npm run dev
