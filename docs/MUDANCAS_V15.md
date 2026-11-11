# O que mudou da v14 para v15

- `CLAUDE.md` deixa explícitas instalações, publicações e autenticações **apenas após aprovação**, removendo contradição.
- Corrigido layout mobile e teste objetivo de overflow horizontal.
- Centralizada política em `js/politica.js`, consumida pelo painel e pelo MCP, com teste de equivalência.
- Suíte Playwright ampliada para validar conteúdo de CSV/JSON e capturar erros de carregamento.
- Node >=20.11 declarado; Playwright Test fixado em 1.56.0. `package-lock.json` depende de máquina conectada e teste homologado, não foi inventado.
- Documento de publicação distingue código, Vercel, MCP local, Preview, produção e reversão.
