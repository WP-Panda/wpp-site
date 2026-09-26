import fs from 'node:fs';
import { PHP } from '@php-wasm/universal';
import { loadNodeRuntime, createNodeFsMountHandler } from '@php-wasm/node';
const rt = await loadNodeRuntime('8.2', { emscriptenOptions: { processId: process.pid } });
const php = new PHP(rt);
await php.mount('/www', await createNodeFsMountHandler('/home/user/wp-demo/wp'));
const code = `<?php
$_SERVER['HTTP_HOST'] = 'localhost:8080';
$_SERVER['REQUEST_URI'] = '/';
require '/www/wp-load.php';
require '/www/wp-content/wpp-seed.php';
echo 'SEED DONE\\n';
`;
const r = await php.run({ code });
console.log('TEXT:', (r.text || '').slice(0, 300));
console.log('exit:', r.exitCode);
process.exit(0);
