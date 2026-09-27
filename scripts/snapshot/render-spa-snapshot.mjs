/* Статический снапшот React-SPA v2.wp-panda.pro.
 *
 * Что делает:
 *  1. Из исходного одностраничника (_app.html) выносит inline-стили -> styles.css
 *     и inline-бандл -> app.js, в html остаётся <link>+<script src>.
 *  2. Для каждого hash-роута монтирует приложение в jsdom (свежий инстанс на роут),
 *     сериализует отрендеренную вёрстку в плоский файл <маршрут с / -> ->.html>.
 *  3. «Простреливает» все onClick-обработчики: если обработчик ведёт на другой роут,
 *     элемент-кнопка заменяется в вёрстке на настоящую <a href="файл.html">.
 *  4. Отдельно проходит вizard чекаута до экрана «Спасибо за заказ» -> checkout-thankyou.html.
 *
 * Запуск: npm i jsdom && node scripts/snapshot/render-spa-snapshot.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';
import beautify from 'js-beautify';

const OUT = 'markup-v2';
const ONLY_THANkyou = process.argv.includes('--thankyou-only');
const onlyArg = process.argv.find(a => a.startsWith('--only='));
const onlyRoutes = onlyArg ? onlyArg.split('=')[1].split(',') : null;
const srcHtml = fs.readFileSync(path.join(OUT, '_app.html'), 'utf8');

// --- 1. Стили и скрипты — в отдельные файлы -----------------------------------
const styleMatch = srcHtml.match(/<style[^>]*>([\s\S]*?)<\/style>/);
const scriptMatch = srcHtml.match(/<script type="module"[^>]*>([\s\S]*?)<\/script>/);
if (!styleMatch || !scriptMatch) throw new Error('не найдены inline <style>/<script> в _app.html');
fs.writeFileSync(path.join(OUT, 'styles.css'), styleMatch[1].trim() + '\n');
fs.writeFileSync(path.join(OUT, 'app.js'), scriptMatch[1].trim() + '\n');
const shell = srcHtml
  .replace(styleMatch[0], '<link rel="stylesheet" href="styles.css">')
  .replace(scriptMatch[0], '<script defer src="app.js"></script>');

// --- 2. Маршруты ---------------------------------------------------------------
const prodSlugs = [...srcHtml.matchAll(/\{id:\d+,slug:"([a-z0-9-]+)"/g)].map(m => m[1]);
const postSlugs = [...srcHtml.matchAll(/\{slug:"([a-z0-9-]+)",title:"(?:[^"\\]|\\.)*",excerpt/g)].map(m => m[1]);
const kbSlugs = [...srcHtml.matchAll(/\{id:"([a-z0-9-]+)",title:"(?:[^"\\]|\\.)*",category:"[a-z0-9-]+"/g)].map(m => m[1]);
const routes = [
  '',
  'shop',
  'shop/theme',
  'shop/plugin',
  'ui',
  'faq',
  ...prodSlugs.map(s => `product/${s}`),
  'checkout',
  'checkout/cart',
  'account', 'account/orders', 'account/downloads', 'account/licenses',
  'account/address', 'account/new-ticket', 'account/tickets', 'account/details',
  'account/dashboard', 'account/wishlist',
  'blog',
  ...postSlugs.map(s => `post/${s}`),
  'kb',
  ...kbSlugs.map(s => `kb-article/${s}`),
];
const flatName = hash => {
  let h = (hash || '').replace(/^#\/?/, '').replace(/\/+$/, '');
  if (h === 'home') h = ''; // главная
  return (h ? h.replace(/\//g, '-') : 'index') + '.html';
};

// --- 3. Окружение jsdom --------------------------------------------------------
const vc = new VirtualConsole();
vc.on('jsdomError', () => {}); // шум "not implemented" не нужен
const sleep = ms => new Promise(r => setTimeout(r, ms));
const reactProps = el => {
  if (!el || el.nodeType !== 1) return null;
  const k = Object.keys(el).find(k => k.startsWith('__reactProps$'));
  return k ? el[k] : null;
};

function boot(routeHash) {
  const dom = new JSDOM(shell, {
    url: 'https://v2.wp-panda.pro/' + routeHash,
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(window) {
      window.matchMedia = window.matchMedia || (q => ({
        matches: false, media: q, onchange: null,
        addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false,
      }));
      class FakeIO {
        constructor(cb) { this.cb = cb; }
        observe(el) { setTimeout(() => this.cb([{ isIntersecting: true, target: el, intersectionRatio: 1 }], this), 0); }
        unobserve() {} disconnect() {} takeRecords() { return []; }
      }
      window.IntersectionObserver = window.IntersectionObserver || FakeIO;
      window.ResizeObserver = window.ResizeObserver || class { observe() {} unobserve() {} disconnect() {} };
      window.scrollTo = () => {};
      window.confirm = () => true;
      window.alert = () => {};
      window.open = () => null;
    },
  });
  const { window } = dom;
  window.eval(scriptMatch[1]); // монтирование React-приложения
  return window;
}

const fakeEvent = el => ({
  preventDefault() {}, stopPropagation() {}, persist() {},
  target: el, currentTarget: el, type: 'click', button: 0,
});

function cssPath(el) {
  const parts = [];
  while (el && el.nodeType === 1 && el.tagName !== 'HTML' && el.tagName !== 'BODY') {
    let i = 1, sib = el.previousElementSibling;
    while (sib) { if (sib.tagName === el.tagName) i++; sib = sib.previousElementSibling; }
    parts.unshift(`${el.tagName.toLowerCase()}:nth-of-type(${i})`);
    el = el.parentElement;
  }
  return 'body ' + parts.join('>');
}

const normHash = h => (h || '').replace(/^#\/?/, '/');
const isHashRoute = h => /^#\//.test(h || '');

// --- 4. Прощелкивание onClick -> карта «css-путь -> hash» ----------------------
async function probeClicks(window, routeHash) {
  const doc = window.document;
  const done = new Set();
  const intents = new Map();
  for (let guard = 0; guard < 250; guard++) {
    const cand = [...doc.querySelectorAll('*')].find(el =>
      el.nodeType === 1 && el.isConnected &&
      !done.has(cssPath(el)) && !el.closest('a') &&
      typeof reactProps(el)?.onClick === 'function');
    if (!cand) break;
    const p = cssPath(cand);
    done.add(p);
    try { reactProps(cand).onClick(fakeEvent(cand)); } catch {}
    await sleep(40);
    const h = window.location.hash;
    if (isHashRoute(h) && normHash(h) !== normHash(routeHash)) {
      intents.set(p, h);
      // возвращаемся на исходный роут, чтобы продолжить обход этой же страницы
      window.location.hash = routeHash;
      window.dispatchEvent(new window.HashChangeEvent('hashchange'));
      await sleep(200);
    }
  }
  return intents;
}

// --- 5. Пост-обработка: якоря на .html, кнопки -> <a> ---------------------------
function postProcess(serialized, intents) {
  const doc = new JSDOM(serialized).window.document;
  for (const a of doc.querySelectorAll('a[href^="#/"]')) {
    a.setAttribute('href', flatName(a.getAttribute('href')));
  }
  for (const [p, h] of intents) {
    const el = doc.querySelector(p);
    if (!el || el.closest('a')) continue;
    const a = doc.createElement('a');
    for (const at of el.attributes) {
      if (at.name !== 'type' && at.name !== 'disabled') a.setAttribute(at.name, at.value);
    }
    a.setAttribute('href', flatName(h));
    while (el.firstChild) a.appendChild(el.firstChild);
    el.replaceWith(a);
  }
  return '<!doctype html>\n' + doc.documentElement.outerHTML + '\n';
}

const h1Of = html => (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]?.replace(/<[^>]*>/g, '').trim().slice(0, 70) || '';

// --- 6. Основной цикл ------------------------------------------------------------
const results = [];
if (!ONLY_THANkyou && !onlyRoutes) {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, '_app.html'), srcHtml); // исходник SPA возвращаем на место
  fs.writeFileSync(path.join(OUT, 'styles.css'), styleMatch[1].trim() + '\n');
  fs.writeFileSync(path.join(OUT, 'app.js'), scriptMatch[1].trim() + '\n');
  // не минимифицированные версии для чтения (страницы подключают styles.css/app.js)
  fs.writeFileSync(path.join(OUT, 'styles.pretty.css'),
    beautify.css(styleMatch[1], { indent_size: 2, end_with_newline: true }));
  fs.writeFileSync(path.join(OUT, 'app.pretty.js'),
    beautify.js(scriptMatch[1], { indent_size: 2, end_with_newline: true }));
}
// --- 7. Экран «Спасибо за заказ»: проходим чекаут целиком -------------------------
// Демо-состояние: корзина уже с товарами, профиль заполнен (alex@morozov.dev),
// поэтому визард: «Перейти к оплате» -> способ оплаты -> «Оплатить» -> экран успеха.
async function renderThankyou() {
  const w = boot('#/checkout');
  await sleep(1000);
  const clickBtn = async (re, wait = 500) => {
    const btn = [...w.document.querySelectorAll('button')].find(b =>
      b.isConnected && !b.disabled && re.test((b.textContent || '').trim()));
    if (!btn) return false;
    const onClick = reactProps(btn)?.onClick;
    try { if (onClick) onClick(fakeEvent(btn)); else btn.click(); } catch { return false; }
    await sleep(wait);
    return true;
  };
  if (!await clickBtn(/^Перейти к оплате/)) { console.log('thankyou: кнопка «Перейти к оплате» не найдена'); w.close(); return; }
  // чекбоксы/радио (способ оплаты), если встречаются
  for (const inp of w.document.querySelectorAll('input[type="checkbox"], input[type="radio"]')) {
    if (!inp.checked) { try { inp.click(); await sleep(100); } catch {} }
  }
  await sleep(200);
  if (!await clickBtn(/^Оплатить/, 2500)) { console.log('thankyou: кнопка «Оплатить» не найдена'); w.close(); return; }
  const text = w.document.body.textContent || '';
  if (!/Спасибо за (заказ|покупку)|Заказ оплачен|Счёт выставлен/.test(text)) {
    console.log('thankyou: экран успеха не появился');
    w.close(); return;
  }
  const serialized = '<!doctype html>\n' + w.document.documentElement.outerHTML + '\n';
  w.close();
  const html = postProcess(serialized, new Map());
  fs.writeFileSync(path.join(OUT, 'checkout-thankyou.html'), html);
  results.push({ route: 'checkout/thankyou', file: 'checkout-thankyou.html', bytes: html.length, h1: h1Of(html) });
  console.log(String(html.length).padStart(7), 'checkout/thankyou'.padEnd(30), '-> checkout-thankyou.html');
}

if (!ONLY_THANkyou) {
  for (const route of onlyRoutes ?? routes) {
    const hash = '#/' + route;
    const w = boot(hash);
    await sleep(900);
    const serialized = '<!doctype html>\n' + w.document.documentElement.outerHTML + '\n';
    const intents = await probeClicks(w, hash);
    w.close();
    const html = postProcess(serialized, intents);
    const file = path.join(OUT, flatName(hash));
    fs.writeFileSync(file, html);
    results.push({ route: route || '/', file: path.basename(file), bytes: html.length, h1: h1Of(html) });
    console.log(String(html.length).padStart(7), (route || 'index').padEnd(30), '->', path.basename(file), `(${intents.size} ссылок из кнопок)`);
  }
}
await renderThankyou();

// --- 8. Манифест -------------------------------------------------------------------
if (!ONLY_THANkyou && !onlyRoutes) {
  fs.writeFileSync(path.join(OUT, 'manifest.tsv'),
    'route\tfile\tbytes\th1\n' +
    results.map(r => `${r.route}\t${r.file}\t${r.bytes}\t${r.h1.replace(/\t/g, ' ')}`).join('\n') + '\n');
  fs.writeFileSync(path.join(OUT, 'snapshot.txt'),
    'Источник: https://v2.wp-panda.pro (React-SPA с hash-роутингом, один HTML-файл)\n' +
    `Отрендерено роутов: ${results.length}\n` +
    'Именование: файл = маршрут (#/product/aurora -> product-aurora.html)\n' +
    'Переходы: JS-кнопки заменены настоящими ссылками <a href="*.html">\n' +
    'Скрипты и стили вынесены: app.js, styles.css (подключены внешне)\n' +
  'Не минимифицированные версии: app.pretty.js, styles.pretty.css\n' +
    'Исходник SPA: _app.html; рендер: scripts/snapshot/render-spa-snapshot.mjs (jsdom)\n');
}
console.log('\nитого файлов:', results.length, '| jsdom-ошибки подавлены');
process.exit(0);
