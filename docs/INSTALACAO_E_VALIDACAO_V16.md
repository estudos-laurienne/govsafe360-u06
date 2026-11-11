# Instalação e validação para Windows

## Ferramentas prévias
Git for Windows, Node.js 20+, VS Code e Claude Code. Conta GitHub e Vercel devem ser criadas visualmente pelo próprio aluno. Playwright Test pode ser instalado pelo Claude com autorização. GitLab é demonstração opcional.

## Testes sem dependências externas
```powershell
npm run quality
```

## Testes de navegador com dependência de rede
```powershell
npm install
npx playwright install chromium
npm run test:e2e
npm run report:e2e
```
O `playwright.config.mjs` inicia automaticamente o servidor local se SITE_URL não estiver definida e gera prints, vídeos e traces. Para testar Vercel, defina `$env:SITE_URL = "https://URL_REAL.vercel.app"` antes de `npm run test:e2e`.

## Lockfile
O arquivo `package-lock.json` ainda NÃO foi gerado por falta de acesso ao registry npm neste ambiente de montagem. Antes de uso institucional, executar `npm install`, versionar o lock gerado, testar `npm ci` e substituir `npm install` por `npm ci` em CI se desejar builds reproduzíveis.

## MCP Playwright
```powershell
claude mcp add --scope local playwright -- npx @playwright/mcp@latest
claude mcp list
```
Se a conexão falhar no Windows (spawn de `npx.cmd`), não editar configurações cegamente: peça diagnóstico do Claude, consulte documentação MCP e utilize Playwright Test como caminho principal. O MCP GOVSAFE tem teste Node separado `npm run test:mcp`.
