# Desfazer com segurança — Git, GitHub e Vercel

1. Sempre comece com `git status`, `git log --oneline -5`, `git diff` e confira branch.
2. **Alterações não commitadas:** use `git diff -- arquivo`; se tiver certeza e desejar DESCARTAR, `git restore -- arquivo` (perde alterações locais nesse arquivo). Primeiro salve backup se há dúvida.
3. **Commit já compartilhado:** prefira `git revert HASH_CONFIRMADO` numa branch de correção, PR, CI verde e merge. Revert cria outro commit e mantém o histórico.
4. **Preview:** feche PR ou continue corrigindo na branch; não se confunde com produção.
5. **Produção:** verifique qual commit está na branch de produção da Vercel, confirme novo deployment após merge ou revert. Não inventar rollback baseado em comando não verificado.
6. **Nunca** usar `git reset --hard`, `git clean -fd`, `git push --force` ou apagar projetos como método padrão de aula.
7. Para reiniciar a oficina, extraia novamente o ZIP original em NOVA pasta e use nova sessão do Claude. Contas e instalações permanecem.
