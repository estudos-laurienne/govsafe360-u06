import { test, expect } from '@playwright/test';
import { mkdir, readFile } from 'node:fs/promises';
const url=process.env.SITE_URL||'http://127.0.0.1:4173';
const failures=[];
test.beforeEach(async ({page})=>{
 page.on('pageerror',e=>failures.push(e.message)); // ANTES da primeira navegacao
 await page.goto(url);
 await page.evaluate(()=>localStorage.clear());
 await page.reload();
});
test.afterEach(async()=>{expect(failures.splice(0)).toEqual([])});
test('01 · Dashboard inicial e scripts carregam',async({page})=>{
 await expect(page.locator('#total')).toHaveText('8');
 await expect(page.locator('#rows tr')).toHaveCount(8);
 await expect(page.locator('#shownCount')).toContainText('8 de 8');
 await mkdir('evidencias/prints',{recursive:true});await page.screenshot({path:'evidencias/prints/home-desktop.png',fullPage:true});
});
test('02 · Busca e estado vazio',async({page})=>{
 await page.locator('#query').fill('termo inexistente 9327');
 await expect(page.locator('#rows tr')).toHaveCount(0);
 await expect(page.locator('#emptyState')).toBeVisible();
 await page.locator('#query').fill('token');
 await expect(page.locator('#rows tr')).toHaveCount(1);
});
test('03 · Filtro de classificação funciona',async({page})=>{
 await page.locator('#statusFilter').selectOption('condicionado');
 const n=await page.locator('#rows tr').count();expect(n).toBeGreaterThan(0);
 await expect(page.locator('#rows tr .chip')).toHaveText(Array(n).fill('Condicionado'));
});
test('04 · Cadastro fictício e persistência após F5',async({page})=>{
 const f=page.locator('#form');
 await f.locator('[name=title]').fill('Cenário fictício de teste');
 await f.locator('[name=reason]').fill('Sem dados reais');
 await f.locator('[name=data]').selectOption('publico');
 await f.locator('[name=env]').selectOption('desenvolvimento');
 await f.locator('[name=autonomy]').selectOption('leitura');
 await f.locator('button[type=submit]').click();
 await expect(page.locator('#total')).toHaveText('9');
 await page.reload();await expect(page.locator('#total')).toHaveText('9');
 await expect(page.locator('#rows')).toContainText('Cenário fictício de teste');
});
test('05 · Revisão não aprova o que é proibido',async({page})=>{
 page.on('dialog',async d=>{if(d.type()==='prompt')await d.accept(d.message().includes('Justificativa')?'Justificativa fictícia':'aprovado');else await d.accept()});
 await page.locator('[data-review="S03"]').click();
 const line=page.locator('[data-review="S03"]').locator('xpath=..');
 await expect(line).toContainText('Pendente');
 await expect(page.locator('#events')).not.toContainText('S03 -> aprovado');
});
test('06 · Exportações contêm campos e eventos válidos',async({page})=>{
 const [csv]=await Promise.all([page.waitForEvent('download'),page.locator('#exportCsv').click()]);
 expect(csv.suggestedFilename()).toMatch(/\.csv$/);
 const csvText=await readFile(await csv.path(),'utf8');
 expect(csvText).toContain('id;title;data;env;autonomy;decision;review;reviewReason;reason');
 expect(csvText).toContain('S01');
 expect(csvText.split('\n').length).toBeGreaterThanOrEqual(9);
 const [json]=await Promise.all([page.waitForEvent('download'),page.locator('#exportJson').click()]);
 expect(json.suggestedFilename()).toMatch(/\.json$/);
 const obj=JSON.parse(await readFile(await json.path(),'utf8'));
 expect(obj.didatico).toBe(true);
 expect(Array.isArray(obj.audit)).toBe(true);
 expect(obj.audit.some(e=>e.type==='exportação')).toBe(true);
});
test('07 · Mobile sem overflow horizontal global + screenshot',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.reload();
 await expect(page.locator('#total')).toBeVisible();
 const sizes=await page.evaluate(()=>({pageWidth:document.documentElement.scrollWidth,windowWidth:window.innerWidth}));
 expect(sizes.pageWidth,`Overflow global: ${JSON.stringify(sizes)}`).toBeLessThanOrEqual(sizes.windowWidth+2);
 const area=await page.locator('.table-wrap').evaluate(e=>({scroll:e.scrollWidth,client:e.clientWidth}));
 expect(area.client).toBeLessThanOrEqual(390); // tabela rola dentro da área
 await mkdir('evidencias/prints',{recursive:true});await page.screenshot({path:'evidencias/prints/home-mobile.png',fullPage:true});
});
test('08 · Política navegador: produção+execução é não autorizado',async({page})=>{
 const f=page.locator('#form');
 await f.locator('[name=title]').fill('Execução produtiva simulada');
 await f.locator('[name=reason]').fill('Somente exemplo');
 await f.locator('[name=data]').selectOption('interno');
 await f.locator('[name=env]').selectOption('producao');
 await f.locator('[name=autonomy]').selectOption('execucao');
 await f.locator('button[type=submit]').click();
 const row=page.locator('#rows tr').filter({hasText:'Execução produtiva simulada'});
 await expect(row.locator('.chip')).toHaveText('Não autorizado');
});
