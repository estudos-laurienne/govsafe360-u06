# Como comprovar testes Playwright v15

Node >=20.11, `npm install`, `npx playwright install chromium` (o Claude pode executar SOMENTE após aprovação).

**Local**, em terminal A: `node scripts/servidor-local.mjs`. No terminal B: `$env:SITE_URL='http://127.0.0.1:4173'`; `npm run test:e2e`.

**Produção**, após autorização e publicação: `$env:SITE_URL='https://SUA-URL-REAL.vercel.app'`; `npm run test:e2e`; `npm run report:e2e`.

A suíte deve verificar carregamento sem pageerror, busca, filtro, cadastro persistente, bloqueio de aprovação simulada, conteúdo CSV e JSON, e `document.documentElement.scrollWidth <= innerWidth + 2` em 390 px. Capturas em `evidencias/prints`, vídeos e traces em `evidencias/playwright-resultados`, relatório HTML em `evidencias/relatorio-html`. Conteúdo de evidências e tokens não devem ser commitados.

**MCP x Test:** Playwright MCP dirige o navegador assistido pelo Claude; Playwright Test produz execução e vídeos reproduzíveis. MCP sozinho não prova testes executados.
