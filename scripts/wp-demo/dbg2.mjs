import { PHP } from '@php-wasm/universal';
import { loadNodeRuntime, createNodeFsMountHandler } from '@php-wasm/node';
const rt = await loadNodeRuntime('8.2', { emscriptenOptions: { processId: process.pid } });
const php = new PHP(rt);
await php.mount('/www', await createNodeFsMountHandler('/home/user/wp-demo/wp'));
const code = `<?php
echo 'START\\n';
$files = explode("\\n", base64_decode('L3d3dy9hLnBocA=='));
var_dump($files);
echo file_exists('/www/wp-config.php') ? 'CONFIG OK\\n' : 'CONFIG MISSING\\n';
`;
const r = await php.run({ code });
console.log('TEXT:', JSON.stringify(r.text));
console.log('ERRORS:', JSON.stringify((r.errors||'').slice(0,200)));
process.exit(0);
