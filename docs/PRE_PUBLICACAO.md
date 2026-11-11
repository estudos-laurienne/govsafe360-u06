# Validação antes da publicação

- O site é estático e salva dados somente no localStorage do navegador. Não compartilha dados entre pessoas/dispositivos.
- Use apenas dados fictícios. Não há autenticação, banco nem back-end.
- Os arquivos em `tools/`, `docs/`, `evidencias/` e `CLAUDE.md` não devem ser servidos pela Vercel. A saída é `public/`.
- Confirme que alterações em `public/` estão sincronizadas com as do desenvolvimento. A edição deve ocorrer em `public/` no laboratório, para evitar publicar código desatualizado.
- Vercel: Framework Preset = Other; Build Command = vazio; Output Directory = public; Root Directory = raiz do repositório.
- Confirme no endereço público a tela, filtros, persistência após recarregar, navegação e ausência de 404 em CSS/JS.
- Preview de branch não é produção; merge em `main` gera nova implantação de produção após integração Git.
