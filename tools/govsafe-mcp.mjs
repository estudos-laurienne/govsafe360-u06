import readline from 'node:readline';
import '../js/politica.js';
const {assess,validData,validEnv,validActions}=globalThis.GOVSAFE_POLICY;
const tools=[
 {name:'listar_regras',description:'Retorna taxonomia e regras DIDÁTICAS, nunca autorizações oficiais.',inputSchema:{type:'object',properties:{},additionalProperties:false}},
 {name:'classificar_cenario',description:'Classifica cenário 100% fictício pela MESMA política do painel. Não altera arquivos nem concede acesso.',inputSchema:{type:'object',properties:{tipo_dado:{type:'string',enum:validData},ambiente:{type:'string',enum:validEnv},acao:{type:'string',enum:validActions},aprovacao_humana:{type:'boolean',description:'Indicador informativo. Não altera decisão automática.'}},required:['tipo_dado','ambiente','acao','aprovacao_humana'],additionalProperties:false}}
];
const label={permitido:'PERMITIDO',condicionado:'CONDICIONADO',nao_autorizado:'NAO_AUTORIZADO'};
export function classify(a){
 if(!validData.includes(a.tipo_dado)||!validEnv.includes(a.ambiente)||!validActions.includes(a.acao)||typeof a.aprovacao_humana!=='boolean')throw Error('Parâmetros inválidos para o laboratório');
 const [decision,reason]=assess({data:a.tipo_dado,env:a.ambiente,autonomy:a.acao});
 return {decisao:label[decision],justificativa:reason,exige_revisao:decision!=='permitido',aprovacao_humana_informada:a.aprovacao_humana,nota:'Aprovação informada não revoga proibição; política simulada, sem efeito institucional.'};
}
function handle(m){
 switch(m.method){
 case 'initialize':return {protocolVersion:'2025-06-18',capabilities:{tools:{}},serverInfo:{name:'govsafe-lab',version:'1.5.0'}};
 case 'ping':return {};
 case 'tools/list':return {tools};
 case 'tools/call':{
  const a=m.params||{};let result;
  if(a.name==='listar_regras')result={politica:'GOVSAFE360_V15_DEMONSTRACAO',dados:validData,ambientes:validEnv,acoes:validActions,regra:'mesma politica do painel; resultado nunca e aprovacao institucional'};
  else if(a.name==='classificar_cenario'){try{result={entrada:a.arguments||{},...classify(a.arguments||{})}}catch(e){return {isError:true,content:[{type:'text',text:e.message}]}}}
  else return {isError:true,content:[{type:'text',text:'Ferramenta desconhecida'}]};
  return {content:[{type:'text',text:JSON.stringify(result,null,2)}]};
 }
 default:return {};
 }
}
const rl=readline.createInterface({input:process.stdin,crlfDelay:Infinity});
rl.on('line',line=>{try{const m=JSON.parse(line);if(m.id===undefined)return;process.stdout.write(JSON.stringify({jsonrpc:'2.0',id:m.id,result:handle(m)})+'\n')}catch(e){process.stderr.write(String(e)+'\n')}});
