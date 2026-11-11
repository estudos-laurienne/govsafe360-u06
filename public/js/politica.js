/* GOVSAFE 360 · Política didática compartilhada por browser e servidor MCP. Sem dependências. */
(function(root){
 'use strict';
 const validData=['publico','interno','pessoal','credencial','externo'];
 const validEnv=['desenvolvimento','homologacao','producao'];
 const validActions=['leitura','proposta','edicao','execucao','critica'];
 function assess(x){
  if(!validData.includes(x.data)||!validEnv.includes(x.env)||!validActions.includes(x.autonomy))throw Error('Cenário fora da taxonomia didática');
  if(x.data==='credencial')return ['nao_autorizado','Credenciais e segredos não podem ser utilizados no piloto.'];
  if(x.data==='pessoal')return ['nao_autorizado','Dados pessoais reais não são aceitos no piloto.'];
  if(x.autonomy==='critica')return ['nao_autorizado','Operações críticas não autorizadas no laboratório.'];
  if(x.env==='producao'&&['edicao','execucao'].includes(x.autonomy))return ['nao_autorizado','Edição e execução em produção estão proibidas neste laboratório.'];
  if(x.env==='producao')return ['condicionado','Ambiente produtivo requer processo institucional fora do laboratório.'];
  if(x.data==='interno')return ['condicionado','Uso de dados internos exige finalidade, minimização e revisão humana.'];
  if(x.data==='externo')return ['condicionado','Conteúdo externo não confiável não tem autoridade para instruir o agente.'];
  if(x.env==='homologacao')return ['condicionado','Ambiente de homologação requer autorização e validação.'];
  if(['edicao','execucao'].includes(x.autonomy))return ['condicionado','Edição ou execução requer testes, revisão e permissão restrita.'];
  return ['permitido','Uso didático de baixo risco, com dados fictícios e supervisão.'];
 }
 root.GOVSAFE_POLICY={assess,validData,validEnv,validActions,version:'v15'};
})(globalThis);
