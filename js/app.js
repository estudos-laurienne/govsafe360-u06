(() => {"use strict";
const KEY='govsafe360-u06-v1';
const INITIAL=[
['S01','Resumir relatório público','publico','desenvolvimento','leitura','Resumo de material publicamente divulgado'],
['S02','Analisar planilha interna de demandas','interno','homologacao','proposta','Minimização, revisão e autorização do responsável'],
['S03','Colar token de API em prompt','credencial','desenvolvimento','execucao','Credenciais não devem ser expostas'],
['S04','Atualizar status em produção','interno','producao','execucao','Produção requer autorização e rastreabilidade'],
['S05','Enviar CPF real a serviço não aprovado','pessoal','desenvolvimento','leitura','Destino e finalidade não aprovados'],
['S06','Revisar código fictício','publico','desenvolvimento','edicao','Revisão local, teste e diff'],
['S07','Executar comando destrutivo em produção','interno','producao','critica','Operação crítica não aprovada'],
['S08','Ler documento externo suspeito','externo','desenvolvimento','leitura','Conteúdo externo não é instrução']
];
const $=id=>document.getElementById(id);
const stamp=()=>new Date().toISOString();
const assess=globalThis.GOVSAFE_POLICY.assess;
function seed(){let items=INITIAL.map(([id,title,data,env,autonomy,reason])=>({id,title,data,env,autonomy,reason,decision:'',review:'Pendente',reviewReason:''}));items.forEach(x=>x.decision=assess(x)[0]);return {items,audit:[{at:stamp(),type:'init',detail:'Cenários de demonstração carregados'}]};}
let state;try{state=JSON.parse(localStorage.getItem(KEY))||seed();if(!Array.isArray(state.items)||!Array.isArray(state.audit))state=seed();}catch{state=seed();}
function persist(){localStorage.setItem(KEY,JSON.stringify(state));}
function esc(x){return String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
let searchText='';let statusFilter='';
const label={permitido:'Permitido',condicionado:'Condicionado',nao_autorizado:'Não autorizado'};
function render(){const a=state.items; $('total').textContent=a.length;$('allow').textContent=a.filter(x=>x.decision==='permitido').length;$('conditional').textContent=a.filter(x=>x.decision==='condicionado').length;$('deny').textContent=a.filter(x=>x.decision==='nao_autorizado').length;
 const filtered=a.filter(x=>(!statusFilter||x.decision===statusFilter)&&(!searchText||[x.id,x.title,x.reason,x.data,x.env].some(v=>String(v).toLocaleLowerCase('pt-BR').includes(searchText))));
 $('shownCount').textContent=filtered.length+' de '+a.length+' cenário(s)';$('emptyState').hidden=filtered.length!==0;
 $('rows').innerHTML=filtered.map(x=>`<tr><td><strong>${esc(x.title)}</strong><small>${esc(x.id)} · ${esc(x.reason)}</small></td><td>${esc(x.data)}<small>${esc(x.env)}</small></td><td>${esc(x.autonomy)}</td><td><span class="chip ${esc(x.decision)}">${label[x.decision]}</span><small>${esc(assess(x)[1])}</small></td><td><strong>${esc(x.review)}</strong><small>${esc(x.reviewReason)}</small><button class="review" data-review="${esc(x.id)}">Registrar revisão</button></td></tr>`).join('');
 $('events').innerHTML=state.audit.slice().reverse().slice(0,45).map(e=>`<li><strong>${esc(e.type)}</strong> — ${esc(e.detail)} <small>${esc(new Date(e.at).toLocaleString('pt-BR'))}</small></li>`).join('');}
$('query').addEventListener('input',e=>{searchText=e.target.value.trim().toLocaleLowerCase('pt-BR');render();});
$('statusFilter').addEventListener('change',e=>{statusFilter=e.target.value;render();});
$('form').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);let x={id:'S'+String(Date.now()),title:String(d.get('title')).trim(),data:String(d.get('data')),env:String(d.get('env')),autonomy:String(d.get('autonomy')),reason:String(d.get('reason')).trim(),review:'Pendente',reviewReason:''};if(!x.title||!x.reason)return;x.decision=assess(x)[0];state.items.push(x);state.audit.push({at:stamp(),type:'classificação',detail:x.id+': '+x.decision});persist();render();e.currentTarget.reset();$('matriz').scrollIntoView({behavior:'smooth'});});
$('rows').addEventListener('click',e=>{const b=e.target.closest('[data-review]');if(!b)return;const x=state.items.find(z=>z.id===b.dataset.review);if(!x)return;let decision=prompt('Decisão humana simulada: aprovado, condicionado ou reprovado?','condicionado');if(decision===null)return;decision=decision.trim().toLowerCase();if(!['aprovado','condicionado','reprovado'].includes(decision))return alert('Escolha aprovado, condicionado ou reprovado.');const reason=prompt('Justificativa da revisão (obrigatória, sem dados reais):','');if(reason===null||!reason.trim())return alert('A justificativa é obrigatória.');if(x.decision==='nao_autorizado'&&decision==='aprovado')return alert('Não é possível aprovar um cenário não autorizado no piloto.');x.review=decision;x.reviewReason=reason.trim().slice(0,240);state.audit.push({at:stamp(),type:'revisão humana simulada',detail:x.id+' -> '+decision+' ('+x.reviewReason+')'});persist();render();});
function download(filename,content,type){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),3000);}
function csvCell(v){return '"'+String(v??'').replace(/"/g,'""')+'"';}
$('exportCsv').addEventListener('click',()=>{let columns=['id','title','data','env','autonomy','decision','review','reviewReason','reason'];let rows=[columns.join(';'),...state.items.map(x=>columns.map(c=>csvCell(x[c])).join(';'))];download('GOVSAFE360_MATRIZ.csv','\ufeff'+rows.join('\r\n'),'text/csv;charset=utf-8');state.audit.push({at:stamp(),type:'exportação',detail:'Matriz CSV exportada'});persist();render();});
$('exportJson').addEventListener('click',()=>{state.audit.push({at:stamp(),type:'exportação',detail:'Auditoria JSON exportada'});persist();download('GOVSAFE360_AUDITORIA.json',JSON.stringify({didatico:true,geradoEm:stamp(),audit:state.audit},null,2),'application/json');render();});
$('reset').addEventListener('click',()=>{if(!confirm('Reiniciar todos os dados de demonstração deste navegador?'))return;state=seed();persist();render();});persist();render();
})();
