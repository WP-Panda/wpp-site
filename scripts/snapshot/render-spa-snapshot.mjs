/* Рендер React-SPA v2.wp-panda.pro в jsdom и сохранение вёрстки как статических HTML.
   Запуск: node scripts/wp-demo/render-spa-snapshot.mjs  (после npm i jsdom) */
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';

const OUT = 'markup-v2';
const src = fs.readFileSync(path.join(OUT, '_app.html'), 'utf8');

const prodSlugs = [...src.matchAll(/\{id:\d+,slug:"([a-z0-9-]+)"/g)].map(m => m[1]);
const postSlugs = [...src.matchAll(/\{slug:"([a-z0-9-]+)",title:"(?:[^"\\]|\\.)*",excerpt/g)].map(m => m[1]);
const kbSlugs = [...src.matchAll(/\{id:"([a-z0-9-]+)",title:"(?:[^"\\]|\\.)*",category:"[a-z0-9-]+"/g)].map(m => m[1]);
console.log('slugs:', prodSlugs.length, 'products,', postSlugs.length, 'posts,', kbSlugs.length, 'kb');

const routes = [
  '',
  'shop',
  'faq',
  ...prodSlugs.map(s => `product/${s}`),
  'checkout',
  'checkout/cart',
  'account',
  'account/orders',
  'account/downloads',
  'account/licenses',
  'account/address',
  'account/new-ticket',
  'blog',
  ...postSlugs.map(s => `post/${s}`),
  'kb',
  ...kbSlugs.map(s => `kb-article/${s}`),
];

const vc = new VirtualConsole();
const jsErrors = [];
vc.on('jsdomError', e => { if (!/not implemented/i.test(e.message)) jsErrors.push(String(e.message).slice(0, 160)); });

// jsdom не исполняет <script type="module"> — вынимаем бандл (в нём нет import/export)
// и запускаем как классический скрипт через window.eval.
const moduleMatch = src.match(/<script type="module"[^>]*>([\s\S]*?)<\/script>/);
const bundle = moduleMatch[1];
const shell = src.replace(moduleMatch[0], '');

const dom = new JSDOM(shell, {
  url: 'https://v2.wp-panda.pro/',
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
    if (!window.crypto?.randomUUID) {
      const c = window.crypto || {};
      window.crypto = Object.assign(Object.create(Object.getPrototypeOf(c) || Object.prototype), c, {
        randomUUID: () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, ch => {
          const r = Math.random() * 16 | 0; return (ch === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        }),
      });
    }
  },
});

const { window } = dom;
const sleep = ms => new Promise(r => setTimeout(r, ms));

window.eval(bundle); // монтирование React-приложения
await sleep(1500);

const results = [];
for (const route of routes) {
  const hash = '#' + (route ? '/' + route : '/');
  if (window.location.hash !== hash) {
    window.location.hash = hash;
    window.dispatchEvent(new window.HashChangeEvent('hashchange'));
  }
  await sleep(400);
  const root = window.document.getElementById('root');
  const htmlLen = root ? root.innerHTML.length : 0;
  const h1 = window.document.querySelector('h1')?.textContent?.trim().slice(0, 60) || '';
  const file = route ? path.join(OUT, ...route.split('/'), 'index.html') : path.join(OUT, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, '<!doctype html>\n' + window.document.documentElement.outerHTML + '\n');
  results.push({ route, file: path.relative(OUT, file), htmlLen, h1 });
  console.log(String(htmlLen).padStart(7), route || '(home)', '|', h1);
}

fs.writeFileSync(path.join(OUT, 'snapshot.txt'),
  `Источник: https://v2.wp-panda.pro (React-SPA с hash-роутингом, один HTML-файл)\n` +
  `Отрендерено роутов: ${results.length}\n` +
  `Рендер: jsdom (scripts/wp-demo/render-spa-snapshot.mjs), SPA-бандл исполнен как классический скрипт\n` +
  `Исходник SPA: _app.html; в HTML-страницах бандл удалён — чистая вёрстка, ассеты абсолютными ссылками\n`);

fs.writeFileSync(path.join(OUT, 'manifest.tsv'),
  'route\tfile\trendered-bytes\th1\n' +
  results.map(r => `${r.route || '/'}\t${r.file}\t${r.htmlLen}\t${r.h1.replace(/\t/g, ' ')}`).join('\n') + '\n');

console.log('\njsdom errors:', jsErrors.length ? jsErrors.slice(0, 10) : 'нет');
window.close();
process.exit(0);
