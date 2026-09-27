/**
 * Демо-окружение WordPress для темы Wp Panda на php-wasm (WordPress Playground).
 *
 *   node scripts/wp-demo/run-wp.mjs          — установить (если нужно) и запустить на :8080
 *   node scripts/wp-demo/run-wp.mjs reset    — снести данные и переустановить
 *
 * Файлы живут в /home/user/wp-demo (вне git-репозитория). SQLite-БД —
 * wp-content/.ht.sqlite, данные переживают перезапуск.
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { PHP, PHPRequestHandler, setPhpIniEntries } from '@php-wasm/universal';
import { loadNodeRuntime, createNodeFsMountHandler } from '@php-wasm/node';

const REPO = '/home/user/wpp-site';
const ROOT = '/home/user/wp-demo';
const DOCROOT = path.join(ROOT, 'wp');
const PORT = 8080;
const SITE = `http://localhost:${PORT}`;
const SITE_HOSTED = `localhost:${PORT}`;
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'wppanda2026';
const ADMIN_EMAIL = 'admin@wppanda.demo';

const log = (...a) => console.log('[wp-demo]', ...a);
const sh = (cmd) => execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'] }).toString();
const download = (url, dest) => {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) return;
  log('скачиваю', url);
  sh(`curl -sL --max-time 600 -o ${dest} "${url}"`);
};

function extract(zip, into) {
  sh(`mkdir -p "${into}" && cd "${into}" && unzip -qo "${zip}"`);
}

function ensureFiles() {
  fs.mkdirSync(ROOT, { recursive: true });

  // 1. WordPress core
  const wpZip = path.join(ROOT, 'wp-core.zip');
  download('https://codeload.github.com/WordPress/WordPress/zip/refs/heads/master', wpZip);
  if (!fs.existsSync(path.join(DOCROOT, 'wp-settings.php'))) {
    log('распаковываю WordPress core…');
    const tmp = path.join(ROOT, 'core-tmp');
    fs.rmSync(tmp, { recursive: true, force: true });
    extract(wpZip, tmp);
    const inner = fs.readdirSync(tmp)[0];
    fs.rmSync(DOCROOT, { recursive: true, force: true });
    fs.renameSync(path.join(tmp, inner), DOCROOT);
    fs.rmSync(tmp, { recursive: true, force: true });
  }

  // 2. Плагин SQLite
  const sqliteZip = path.join(ROOT, 'sqlite.zip');
  download('https://codeload.github.com/WordPress/sqlite-database-integration/zip/refs/tags/v2.1.14', sqliteZip);
  const pluginDir = path.join(DOCROOT, 'wp-content/plugins/sqlite-database-integration');
  if (!fs.existsSync(path.join(pluginDir, 'db.copy'))) {
    log('распаковываю sqlite-database-integration…');
    const tmp = path.join(ROOT, 'sqlite-tmp');
    fs.rmSync(tmp, { recursive: true, force: true });
    extract(sqliteZip, tmp);
    const inner = path.join(tmp, fs.readdirSync(tmp)[0]);
    fs.mkdirSync(path.dirname(pluginDir), { recursive: true });
    fs.renameSync(inner, pluginDir);
    fs.rmSync(tmp, { recursive: true, force: true });
  }

  // 3. WooCommerce (из монорепо-тега, папка plugins/woocommerce)
  const wooZip = path.join(ROOT, 'woo.zip');
  download('https://codeload.github.com/woocommerce/woocommerce/zip/refs/tags/11.1.2', wooZip);
  const wooDir = path.join(DOCROOT, 'wp-content/plugins/woocommerce');
  if (!fs.existsSync(path.join(wooDir, 'woocommerce.php'))) {
    log('распаковываю WooCommerce…');
    const tmp = path.join(ROOT, 'woo-tmp');
    fs.rmSync(tmp, { recursive: true, force: true });
    extract(wooZip, tmp);
    const inner = path.join(tmp, fs.readdirSync(tmp)[0], 'plugins', 'woocommerce');
    fs.renameSync(inner, wooDir);
    fs.rmSync(tmp, { recursive: true, force: true });
    log('WooCommerce установлен как плагин');
  }

  // 3b. Action Scheduler (в монорепо это composer-зависимость, в исходниках нет;
  // Woo грузит packages/action-scheduler/action-scheduler.php — путь как в собранном плагине)
  const asDir = path.join(wooDir, 'packages/action-scheduler');
  if (!fs.existsSync(path.join(asDir, 'action-scheduler.php'))) {
    log('скачиваю Action Scheduler…');
    const asZip = path.join(ROOT, 'action-scheduler.zip');
    download('https://codeload.github.com/woocommerce/action-scheduler/zip/refs/tags/3.9.3', asZip);
    const asTmp = path.join(ROOT, 'as-tmp');
    sh(`rm -rf "${asTmp}"`);
    extract(asZip, asTmp);
    const asInner = path.join(asTmp, fs.readdirSync(asTmp)[0]);
    fs.mkdirSync(path.dirname(asDir), { recursive: true });
    fs.renameSync(asInner, asDir);
    log('Action Scheduler установлен');
  }

  // 4. Минимальный vendor-автозагрузчик Woo (в монорепо нет собранного Composer)
  const vendorDir = path.join(wooDir, 'vendor');
  if (!fs.existsSync(path.join(vendorDir, 'autoload_packages.php'))) {
    fs.mkdirSync(vendorDir, { recursive: true });
    fs.copyFileSync(path.join(REPO, 'scripts/wp-demo/woo-vendor-autoload.php'), path.join(vendorDir, 'autoload_packages.php'));
    fs.copyFileSync(path.join(REPO, 'scripts/wp-demo/woo-jetpack-constants.php'), path.join(vendorDir, 'jetpack-constants.php'));
    fs.copyFileSync(path.join(REPO, 'scripts/wp-demo/woo-jetpack-connection.php'), path.join(vendorDir, 'jetpack-connection.php'));
    fs.copyFileSync(path.join(REPO, 'scripts/wp-demo/woo-block-scanner.php'), path.join(vendorDir, 'block-scanner.php'));
    log('создан vendor/autoload_packages.php для WooCommerce');
  }

  // 5. db.php drop-in из db.copy
  const dbPhp = path.join(DOCROOT, 'wp-content/db.php');
  if (!fs.existsSync(dbPhp)) {
    const src = fs.readFileSync(path.join(pluginDir, 'db.copy'), 'utf8');
    const out = src
      .replace('{SQLITE_IMPLEMENTATION_FOLDER_PATH}', '/www/wp-content/plugins/sqlite-database-integration')
      .replace('{SQLITE_PLUGIN}', 'sqlite-database-integration/sqlite-database-integration.php');
    fs.writeFileSync(dbPhp, out);
    log('создан wp-content/db.php');
  }

  // 6. wp-config.php
  const wpConfig = path.join(DOCROOT, 'wp-config.php');
  if (!fs.existsSync(wpConfig)) {
    const salts = Object.fromEntries(
      ['AUTH_KEY', 'SECURE_AUTH_KEY', 'LOGGED_IN_KEY', 'NONCE_KEY', 'AUTH_SALT', 'SECURE_AUTH_SALT', 'LOGGED_IN_SALT', 'NONCE_SALT'].map((k) => [
        k,
        Array.from({ length: 3 }, () => Math.random().toString(36).slice(2)).join(''),
      ])
    );
    const saltLines = Object.entries(salts).map(([k, v]) => `define('${k}', '${v}');`).join('\n');
    fs.writeFileSync(
      wpConfig,
      `<?php
// Демо-конфиг темы Wp Panda (SQLite через sqlite-database-integration).
define('DB_DRIVER', 'sqlite');
define('WP_HOME', 'http://' . ($_SERVER['HTTP_HOST'] ?? '${SITE_HOSTED}'));
define('WP_SITEURL', 'http://' . ($_SERVER['HTTP_HOST'] ?? '${SITE_HOSTED}'));
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
${saltLines}
$table_prefix = 'wp_';

if ( ! defined('ABSPATH') ) {
	define('ABSPATH', __DIR__ . '/');
}
require_once ABSPATH . 'wp-settings.php';
`
    );
    log('создан wp-config.php');
  }

  // 7. Тема из репозитория
  sh(`rm -rf "${DOCROOT}/wp-content/themes/wp-panda" && mkdir -p "${DOCROOT}/wp-content/themes" && cp -r "${REPO}/wp-panda" "${DOCROOT}/wp-content/themes/wp-panda"`);
}

async function boot() {
  const runtimeId = await loadNodeRuntime('8.2', { emscriptenOptions: { processId: process.pid } });
  const php = new PHP(runtimeId);
  await php.mount('/www', await createNodeFsMountHandler(DOCROOT));
  await setPhpIniEntries(php, {
    memory_limit: '512M',
    upload_max_filesize: '64M',
    post_max_size: '64M',
    max_execution_time: '300',
    display_errors: '0',
    display_startup_errors: '0',
  });
  const handler = new PHPRequestHandler({
    php,
    documentRoot: '/www',
    absoluteUrl: SITE,
    rewriteRules: [
      // pretty permalinks: всё, что не файл и не php-скрипт — во front-controller
      { match: /^\/(?!\S+\.\w{2,5}$).*/, replacement: '/index.php' },
    ],
  });
  return { php, handler };
}

const isInstalled = (handler) => handler.request({ url: '/wp-admin/install.php', method: 'GET' }).then((r) => r.text.includes('Already Installed'));

async function install(handler, php) {
  if (await isInstalled(handler)) {
    log('WordPress уже установлен');
    return;
  }
  log('устанавливаю WordPress…');
  let r = await handler.request({ url: '/wp-admin/install.php', method: 'GET' });
  r = await handler.request({
    url: '/wp-admin/install.php?step=2',
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      weblog_title: 'Wp Panda',
      user_name: ADMIN_USER,
      admin_password: ADMIN_PASS,
      admin_password2: ADMIN_PASS,
      pw_weak: '1',
      admin_email: ADMIN_EMAIL,
      blog_publicled: '1',
      language_id: 'ru_RU',
      Submit: 'Install WordPress',
    }).toString(),
  });
  if (!/success|login| вход/i.test(r.text) && r.statusCode >= 400) {
    throw new Error('установка не удалась: HTTP ' + r.statusCode + '\n' + r.text.slice(0, 800));
  }
  log('WordPress установлен. Логин:', ADMIN_USER, '/', ADMIN_PASS);

  // Сидирование демо-контента (фаза 1: тема, посты, страницы, активация Woo)
  fs.copyFileSync(path.join(REPO, 'scripts/wp-demo/seed.php'), path.join(DOCROOT, 'wp-content/wpp-seed.php'));
  const res = await php.run({ code: `<?php require '/www/wp-load.php'; require '/www/wp-content/wpp-seed.php';` });
  log((res.text || '').trim());

  // Фаза 2: товары WooCommerce (свежий запрос — Woo уже активен и установлен)
  fs.copyFileSync(path.join(REPO, 'scripts/wp-demo/seed-woo.php'), path.join(DOCROOT, 'wp-content/wpp-seed-woo.php'));
  const res2 = await php.run({ code: `<?php require '/www/wp-load.php'; require '/www/wp-content/wpp-seed-woo.php';` });
  log((res2.text || '').trim());
}

async function serve(handler) {
  const server = http.createServer(async (req, res) => {
    try {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      const body = Buffer.concat(chunks);
      const headers = { ...req.headers };
      delete headers.host;
      delete headers.connection;
      const r = await handler.request({
        url: req.url,
        method: req.method,
        headers,
        body: body.length ? new Uint8Array(body) : undefined,
      });
      // php-wasm не всегда проставляет статус: 200 по умолчанию, 302 при Location.
      const status = r.statusCode ?? (r.headers.location ? 302 : 200);
      res.writeHead(status, r.headers);
      res.end(r.bytes);
    } catch (e) {
      res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('500: ' + e.message);
    }
  });
  server.listen(PORT, '0.0.0.0', () => log(`готово: ${SITE}  (админка ${SITE}/wp-admin, ${ADMIN_USER}/${ADMIN_PASS})`));
}

(async () => {
  if (process.argv.includes('reset')) {
    log('сбрасываю данные…');
    fs.rmSync(path.join(DOCROOT, 'wp-content/database'), { recursive: true, force: true });
    fs.rmSync(path.join(DOCROOT, 'wp-content/.ht.sqlite'), { force: true });
    fs.rmSync(path.join(DOCROOT, 'wp-content/db.php'), { force: true });
    fs.rmSync(path.join(DOCROOT, 'wp-config.php'), { force: true });
  }
  ensureFiles();
  const { php, handler } = await boot();
  await install(handler, php);
  await serve(handler);
  process.keepAlive = true;
})().catch((e) => {
  console.error('[wp-demo] ОШИБКА:', e.message);
  process.exit(1);
});
