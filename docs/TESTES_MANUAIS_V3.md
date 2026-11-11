# Roteiro de testes manuais · GOVSAFE 360 v3

Todas as verificações usam dados fictícios. Marque ✓ apenas após observar o comportamento.

- [ ] Abrir `index.html` em Chrome/Edge: sem erros visuais aparentes.
- [ ] Indicadores total/permitidos/condicionados/não autorizados coerentes com a matriz.
- [ ] Buscar parte do título: tabela filtra e contador muda.
- [ ] Buscar termo inexistente: aparece mensagem de lista vazia.
- [ ] Limpar busca: todos os itens retornam.
- [ ] Filtrar por resultado e combinar com busca textual.
- [ ] Criar cenário público fictício de leitura: resultado didático permitido.
- [ ] Criar cenário com segredo/credencial fictícia: não autorizado. Não inserir segredo verdadeiro.
- [ ] Tentar aprovar um cenário não autorizado: operação bloqueada.
- [ ] Registrar revisão com justificativa fictícia: evento de auditoria aparece.
- [ ] Recarregar navegador: persistência local funciona.
- [ ] Exportar CSV e JSON: arquivos abrem, com registros do laboratório.
- [ ] Testar em janela estreita/celular: cabeçalho e matriz continuam utilizáveis.

## Limites de segurança
LocalStorage não é banco corporativo nem trilha de auditoria imutável. O projeto não contém autenticação, RBAC real ou integração aprovada com sistemas externos. A matriz simula decisões para aprendizado; nunca usar dados reais ou em produção.
