# Executar na raiz do GOVSAFE360, depois de revisar as modificacoes.
$ErrorActionPreference = 'Stop'
if (!(Test-Path './index.html') -or !(Test-Path './js/app.js') -or !(Test-Path './css/styles.css')) { throw 'Execute na raiz GOVSAFE360.' }
New-Item -ItemType Directory -Path './public/css','./public/js' -Force | Out-Null
Copy-Item './index.html' './public/index.html' -Force
Copy-Item './css/styles.css' './public/css/styles.css' -Force
Copy-Item './js/app.js' './public/js/app.js' -Force
Write-Host 'Pasta public atualizada. Confira git status e git diff antes do commit.' -ForegroundColor Green
