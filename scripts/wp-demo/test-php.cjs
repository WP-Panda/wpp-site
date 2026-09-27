(async () => {
  const { PHP } = require('@php-wasm/node');
  const php = await PHP.load('8.2');
  const res = await php.run({ code: "<?php echo 'PHP ' . PHP_VERSION . ' sqlite=' . class_exists('SQLite3') . ' mb=' . function_exists('mb_strlen') . ' xml=' . function_exists('xml_parser_create');" });
  console.log(res.text);
  const res2 = await php.run({ code: "<?php echo php_sapi_name();" });
  console.log('sapi:', res2.text);
})().catch(e => { console.error('ERR', e.message.slice(0,300)); process.exit(1); });
