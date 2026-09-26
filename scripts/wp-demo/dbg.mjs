import { PHP } from '@php-wasm/universal';
import { loadNodeRuntime, createNodeFsMountHandler } from '@php-wasm/node';
const rt = await loadNodeRuntime('8.2', { emscriptenOptions: { processId: process.pid } });
const php = new PHP(rt);
await php.mount('/www', await createNodeFsMountHandler('/home/user/wp-demo/wp'));
const r = await php.run({ code: `<?php
$_SERVER['HTTP_HOST']='localhost:8080'; $_SERVER['REQUEST_URI']='/';
require '/www/wp-load.php';
$terms = get_terms(array('taxonomy'=>'kb_cat','hide_empty'=>false));
foreach ($terms as $t) echo $t->name . ' = ' . $t->count . "\\n";
` });
console.log(r.text);
process.exit(0);
