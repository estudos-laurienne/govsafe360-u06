import { mkdir, copyFile, readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
const root=resolve(import.meta.dirname,'..');
const pairs=[['index.html','public/index.html'],['css/styles.css','public/css/styles.css'],['js/app.js','public/js/app.js'],['js/politica.js','public/js/politica.js']];
for(const [source,target] of pairs){const a=resolve(root,source),b=resolve(root,target);await mkdir(dirname(b),{recursive:true});await copyFile(a,b);const [x,y]=await Promise.all([readFile(a),readFile(b)]);if(!x.equals(y))throw Error('Arquivos diferentes: '+source);console.log('OK '+source+' -> '+target);}
console.log('Publicação sincronizada; verifique git diff antes de commit/push.');
