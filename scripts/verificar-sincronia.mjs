import { readFile } from 'node:fs/promises';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
for(const s of ['index.html','css/styles.css','js/app.js','js/politica.js']){
 const a=await readFile(resolve(root,s));const b=await readFile(resolve(root,'public',s));
 if(!a.equals(b)){console.error('DIVERGENTE:',s,'- execute npm run build');process.exitCode=1;}else console.log('OK:',s);
}
