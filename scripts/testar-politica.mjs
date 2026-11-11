import '../js/politica.js';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
const cases=[
 ['publico','desenvolvimento','leitura','PERMITIDO'],
 ['interno','homologacao','proposta','CONDICIONADO'],
 ['interno','producao','execucao','NAO_AUTORIZADO'],
 ['interno','producao','leitura','CONDICIONADO'],
 ['credencial','desenvolvimento','leitura','NAO_AUTORIZADO'],
 ['pessoal','desenvolvimento','leitura','NAO_AUTORIZADO'],
 ['externo','desenvolvimento','leitura','CONDICIONADO'],
 ['publico','desenvolvimento','edicao','CONDICIONADO']
];
const names={permitido:'PERMITIDO',condicionado:'CONDICIONADO',nao_autorizado:'NAO_AUTORIZADO'};
const child=spawn(process.execPath,['tools/govsafe-mcp.mjs'],{stdio:['pipe','pipe','pipe']});
let received=0,buffer='';let fatal;
const done=new Promise((resolve,reject)=>{
 const timeout=setTimeout(()=>reject(Error('Timeout na paridade MCP')),6000);
 child.stdout.on('data',chunk=>{buffer+=chunk;let i;while((i=buffer.indexOf('\n'))>=0){let line=buffer.slice(0,i);buffer=buffer.slice(i+1);try{
  const response=JSON.parse(line);const [data,env,autonomy,expected]=cases[response.id-1];
  const payload=JSON.parse(response.result.content[0].text);
  const app=globalThis.GOVSAFE_POLICY.assess({data,env,autonomy});
  assert.equal(names[app[0]],expected, 'Política browser');assert.equal(payload.decisao,expected,'Política MCP');
  received++;if(received===cases.length){clearTimeout(timeout);child.kill();resolve();}
 }catch(e){clearTimeout(timeout);reject(e)}}});
 child.on('error',reject);
});
cases.forEach(([data,env,autonomy],i)=>child.stdin.write(JSON.stringify({jsonrpc:'2.0',id:i+1,method:'tools/call',params:{name:'classificar_cenario',arguments:{tipo_dado:data,ambiente:env,acao:autonomy,aprovacao_humana:false}}})+'\n'));
try{await done;console.log('POLICY_PARITY_OK '+received+' casos: painel e MCP concordam');}finally{child.kill()}
