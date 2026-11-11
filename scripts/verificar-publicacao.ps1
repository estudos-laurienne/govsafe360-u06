$ErrorActionPreference = 'Stop'
$pares = @(@('index.html','public/index.html'),@('css/styles.css','public/css/styles.css'),@('js/app.js','public/js/app.js'))
foreach($par in $pares){
  $a=(Get-FileHash $par[0] -Algorithm SHA256).Hash
  $b=(Get-FileHash $par[1] -Algorithm SHA256).Hash
  if($a -ne $b){Write-Warning "Diferenca: $($par[0]) versus $($par[1])"}else{Write-Host "OK: $($par[0])"}
}
