import { PHP } from '@php-wasm/universal';
import { loadNodeRuntime, createNodeFsMountHandler } from '@php-wasm/node';
import fs from 'node:fs';
import path from 'node:path';

const hostRoot = '/home/user/wp-demo/wp';
const files = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.php')) files.push(p);
  }
})(path.join(hostRoot, 'wp-content/themes/wp-panda'));
const phpFiles = files.map((f) => f.replace(hostRoot, '/www'));

const rt = await loadNodeRuntime('8.2', { emscriptenOptions: { processId: process.pid } });
const php = new PHP(rt);
await php.mount('/www', await createNodeFsMountHandler(hostRoot));

const b64 = Buffer.from(phpFiles.join('\n')).toString('base64');
const code = `<?php
define('ABSPATH', '/tmp/');
error_reporting(E_ALL & ~E_WARNING & ~E_DEPRECATED);
$out = '';
$files = explode("\n", base64_decode('${b64}'));
foreach ($files as $p) {
  $src = file_get_contents($p);
  try { eval('?>' . $src); $out .= "OK  $p\\n"; }
  catch (\\ParseError $e) { $out .= "SYNTAX $p: " . $e->getMessage() . " line " . $e->getLine() . "\\n"; }
  catch (\\Throwable $e) { $out .= "RUN  $p: " . substr($e->getMessage(), 0, 70) . "\\n"; }
}
echo $out;
`;
console.log('CODE[:300]:', JSON.stringify(code.slice(0, 300)));
const r = await php.run({ code });
const lines = (r.text || '').split('\n').filter(Boolean);
const bad = lines.filter((l) => /SYNTAX|RUN /.test(l));
console.log('TEXT[:400]:', JSON.stringify((r.text||'').slice(0,400)));
console.log('ERRORS:', JSON.stringify((r.errors||'').slice(0,300)));
console.log('Файлов проверено:', lines.length);
console.log('Проблемы:', bad.length ? '\n' + bad.join('\n') : 'нет');
process.exit(0);
