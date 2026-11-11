# Publicar GOVSAFE 360 v15 · Fonte única

A aplicação é estática e armazenará os dados fictícios no **localStorage de cada navegador**. Não há backend ou base compartilhada. O MCP Node.js permanece local, não entra na Vercel.

1. Editar SOMENTE `index.html`, `css/styles.css`, `js/app.js` ou `js/politica.js`.
2. Executar `npm run build` e `npm run check:sync` (somente Node.js, sem necessidade de `npm install`).
3. Testar a política: `npm run test:policy` e `npm run test:mcp`.
4. Antes do primeiro deploy, criar repositório GitHub vazio, Git local, baseline e push autorizados.
5. Na Vercel: Add New → Project → Import Git Repository; conferir Root Directory `.`, Framework Preset `Other`, Build Command `npm run build`, Output Directory `public` (ou valores aplicados pelo vercel.json).
6. Autorizar deploy; abrir URL real em janela anônima e conferir HTML/CSS/JS/cadastro/filtros/persistência no mesmo browser.
7. Para Playwright Test: `npm install` (ou `npm ci` SE existir package-lock homologado), `npx playwright install chromium`; `$env:SITE_URL='https://URL-REAL.vercel.app'`; `npm run test:e2e`; `npm run report:e2e`.
8. Apenas depois: branch de melhoria, PR, Preview, revisão/merge e novo teste na produção.
9. Ver logs da Vercel antes de afirmar sucesso; nunca inserir credenciais no código ou no chat.

**Dependências reprodutíveis:** `@playwright/test` fixado em versão exata; como esta entrega não tem acesso ao registry npm para gerar lock confiável, em máquina conectada execute `npm install --package-lock-only`, versione `package-lock.json` após revisão e use `npm ci` nos demais computadores. Não declare instalação concluída sem esse passo.
