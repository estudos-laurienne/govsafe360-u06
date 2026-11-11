# Integração MCP local · v15

Pré-requisitos: Node >=20.11 e Claude Code instalado. O servidor é **local**, em `tools/govsafe-mcp.mjs`, não é publicado pela Vercel nem possui credenciais.

1. PowerShell na raiz do GOVSAFE360: `node --version`.
2. Teste isolado: `node tools/teste-mcp.mjs`.
3. Verificação de equivalência: `npm run test:policy` (não exige npm install).
4. Registro no Claude CLI no projeto: `claude mcp add --scope local --transport stdio govsafe-lab -- node tools/govsafe-mcp.mjs`.
5. Confirmação: `claude mcp list`; dentro da sessão CLI, `/mcp`.
6. Prompt: "Use govsafe-lab para listar_regras e depois classificar_cenario com tipo_dado=interno, ambiente=producao, acao=execucao, aprovacao_humana=false. Mostre literalmente o resultado e explique por que não autoriza operações reais. Não edite arquivos."
7. Limpeza: no PowerShell, `claude mcp remove govsafe-lab -s local` e `claude mcp list`; para versões com sintaxe diferente, consulte `claude mcp remove --help`.

O MCP contém **duas ferramentas somente leitura**; a classificação é a mesma do painel e usa `js/politica.js`. Nunca conceda acessos produtivos com base nesses resultados.
