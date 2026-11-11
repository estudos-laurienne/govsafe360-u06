# GOVSAFE 360 — instruções de projeto (laboratório v16)

## Missão
Desenvolver um protótipo didático de governança de agentes, com dados inteiramente fictícios. Explicar cada alteração ao participante leigo, preservar evidências e usar a menor autonomia necessária.

## Organização e fonte única
- Código editável: `index.html`, `css/styles.css`, `js/app.js`, `js/politica.js`.
- `public/` é gerada por `npm run build`. Não editar cópias em `public/`.
- MCP local: `tools/govsafe-mcp.mjs` compartilha política com `js/politica.js`.
- Testes e CI: `tests/`, `.github/workflows/qualidade.yml`.

## Trabalho em estágios
1. Ler requisitos, arquitetura e backlog; listar fatos, hipóteses e lacunas.
2. Propor plano curto por marco; aguardar aprovação antes de alterar arquivos.
3. Implementar mínimo; rodar testes; apresentar `git status`, diff, riscos e rollback.
4. Não instalar ferramentas se já funcionam; perguntar antes de instalar dependências ou autorizar serviços.
5. Não criar/recriar repositórios, pushes, merges, deploys, login ou permissões sem aprovação explícita.
6. Nunca copiar credenciais, `.env`, cookies, dados internos reais para commits, prompts ou relatórios.
7. Preferir respostas em português: **o que farei / por que / resultado / evidência / próximo passo**.

## Comandos de verificação
`npm run check:js`, `npm run build`, `npm run check:sync`, `npm run test:policy`, `npm run test:mcp`.
Após dependências e Chromium: `npm run test:e2e` e `npm run report:e2e`.

## Restrições e alcance
Este projeto **não** é solução corporativa de produção: sem autenticação, banco real ou validação jurídica/institucional. Governança aqui é simulação para formação. Exposição pública na Vercel só para dados fictícios e com autorização humana.
