import { PHP } from '@php-wasm/universal';
import { loadNodeRuntime } from '@php-wasm/node';

const runtimeId = await loadNodeRuntime('8.2', { emscriptenOptions: { processId: process.pid } });
const php = new PHP(runtimeId);
const res = await php.run({ code: "<?php echo 'PHP ' . PHP_VERSION . ' sqlite=' . class_exists('SQLite3') . ' mb=' . function_exists('mb_strlen') . ' dom=' . class_exists('DOMDocument') . ' zlib=' . function_exists('gzwrite');" });
console.log(res.text);
