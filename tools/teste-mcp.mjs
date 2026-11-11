import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
const child=spawn(process.execPath,['tools/govsafe-mcp.mjs']);let buffer='',count=0;
const out=new Promise((resolve,reject)=>{
 const timer=setTimeout(()=>reject(Error('Timeout MCP')),5000);
 child.stdout.on('data',data=>{buffer+=data;let p;while((p=buffer.indexOf('\n'))>=0){const line=buffer.slice(0,p);buffer=buffer.slice(p+1);try{
  const msg=JSON.parse(line);count++;if(msg.id===2){assert.deepEqual(msg.result.tools.map(x=>x.name),['listar_regras','classificar_cenario']);}
  if(msg.id===3){const content=JSON.parse(msg.result.content[0].text);assert.equal(content.decisao,'NAO_AUTORIZADO');}
  if(count===3){clearTimeout(timer);resolve()}
 }catch(e){clearTimeout(timer);reject(e)}}});child.on('error',reject);
});
for(const req of [{id:1,method:'initialize',params:{}},{id:2,method:'tools/list',params:{}},{id:3,method:'tools/call',params:{name:'classificar_cenario',arguments:{tipo_dado:'interno',ambiente:'producao',acao:'execucao',aprovacao_humana:false}}}])child.stdin.write(JSON.stringify({jsonrpc:'2.0',...req})+'\n');
try{await out;console.log('MCP_OK initialize/tools/list/tools/call, decisao NAO_AUTORIZADO')}finally{child.kill()}
