import fs from 'node:fs';
import assert from 'node:assert/strict';
const h=fs.readFileSync('public/index.html','utf8');
assert.ok(h.includes('css/styles.css'),'HTML deve incluir CSS');
assert.ok(h.includes('js/app.js'),'HTML deve incluir JS');
assert.ok(fs.existsSync('public/css/styles.css'));
assert.ok(fs.existsSync('public/js/app.js'));
console.log('PASS: arquivos estaticos encontrados');
