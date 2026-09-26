/**
 * SSR-экспорт вёрстки: рендерит каждую страницу React-приложения
 * в самостоятельный статичный HTML-файл папки markup/.
 *
 * Запуск:  node .gen-out/gen.js   (сборка: npm run prerender)
 */
import fs from 'node:fs';
import path from 'node:path';
import { parse, type HTMLElement as El } from 'node-html-parser';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement, type ComponentType, type ReactElement } from 'react';

/* ------------------------------------------------------------------ */
/* Мини-моки браузера (в SSR их вызовов не будет, но пусть будут)      */
/* ------------------------------------------------------------------ */
const mockLocation = { hash: '#/home' };
(globalThis as Record<string, unknown>).window = {
  location: mockLocation,
  addEventListener: () => {},
  removeEventListener: () => {},
  scrollTo: () => {},
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }),
  innerWidth: 1440,
};
(globalThis as Record<string, unknown>).document = {
  addEventListener: () => {},
  removeEventListener: () => {},
  getElementById: () => null,
  createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
  body: { style: {}, appendChild() {} },
  documentElement: { style: {} },
};
Object.defineProperty(globalThis as Record<string, unknown>, 'navigator', {
  value: { clipboard: { writeText: async () => {} } },
  configurable: true,
});

/* ------------------------------------------------------------------ */
/* Модули приложения (после моков)                                     */
/* ------------------------------------------------------------------ */
const { AppProvider, useApp } = await import('../../src/context');
const data = await import('../../src/data');
const { Header: HeaderStatic } = await import('./gen-src/Header.static');
const { Footer } = await import('../../src/components/Footer');
const { CartDrawer } = await import('../../src/components/CartDrawer');
const { ProductMedia, ProductThumb } = await import('../../src/components/ProductMedia');
const { rub, plural } = await import('../../src/components/ui');
const { ShoppingBag } = await import('lucide-react');
const { Home } = await import('../../src/pages/Home');
const { Shop } = await import('../../src/pages/Shop');
const { ProductPage } = await import('./gen-src/Product.static');
const { Checkout } = await import('../../src/pages/Checkout');
const { Blog, BlogPost } = await import('../../src/pages/Blog');
const { KnowledgeBase, KbArticle } = await import('./gen-src/KnowledgeBase.static');
const { Support } = await import('../../src/pages/Support');
const { Account } = await import('../../src/pages/Account');
const { UiKit } = await import('../../src/pages/UiKit');
const { FaqPage } = await import('./gen-src/Faq.static');
const React = { createElement: createElement };

type AnyComp = ComponentType<any>;

/* ------------------------------------------------------------------ */
/* Оболочка (копия App.tsx со статичными версиями компонентов)         */
/* ------------------------------------------------------------------ */
const PAGES: Record<string, AnyComp> = {
  shop: Shop,
  product: ProductPage,
  checkout: Checkout,
  blog: Blog,
  post: BlogPost,
  kb: KnowledgeBase,
  'kb-article': KbArticle,
  faq: FaqPage,
  support: Support,
  account: Account,
  ui: UiKit,
  home: Home,
};

function Shell(): ReactElement {
  const { route, totals, openCart, cartOpen } = useApp() as any;
  const View = PAGES[route.page] ?? Home;
  const showFab = !['checkout', 'shop', 'product'].includes(route.page) && !cartOpen;
  return createElement(
    'div',
    { className: 'relative min-h-screen overflow-x-clip' },
    createElement('div', { 'aria-hidden': true, className: 'page-glow pointer-events-none absolute inset-x-0 top-0 h-[620px]' }),
    createElement(
      'div',
      { className: 'relative flex min-h-screen flex-col' },
      createElement(HeaderStatic),
      createElement('main', { key: `${route.page}/${route.param ?? ''}`, className: 'fade-in flex-1' }, createElement(View)),
      createElement(Footer),
    ),
    createElement(CartDrawer),
    showFab &&
      createElement(
        'button',
        { onClick: openCart, 'aria-label': 'Открыть корзину', className: 'fixed bottom-5 right-5 z-30 flex h-14 items-center gap-3 rounded-full bg-ink py-2 pl-2 pr-5 text-white shadow-float transition hover:-translate-y-0.5' },
        createElement(
          'span',
          { className: 'relative flex h-10 w-10 items-center justify-center rounded-full bg-brand text-ink' },
          createElement(ShoppingBag as any, { className: 'h-[18px] w-[18px]' }),
          totals.count > 0 &&
            createElement(
              'span',
              { className: 'absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-ink ring-2 ring-ink' },
              String(totals.count),
            ),
        ),
        createElement(
          'span',
          { className: 'text-left leading-tight' },
          createElement('span', { className: 'block text-[11px] text-white/55' }, 'Корзина'),
          createElement('span', { className: 'block text-sm font-semibold tabular-nums' }, totals.count ? rub(totals.total) : 'пусто'),
        ),
      ),
  );
}

/* ------------------------------------------------------------------ */
/* Шаблон строки корзины (копия разметки CartDrawer) — для JS-шаблонов */
/* ------------------------------------------------------------------ */
function CartRow({ productId, opt }: { productId: number; opt?: 'single' | 'multi' }): ReactElement {
  const p = data.productById(productId);
  const price = data.priceFor(p, opt);
  const old = data.oldPriceFor(p, opt);
  const licenseButtons = p.type === 'theme'
    ? data.themeLicenses.map((l: any) =>
        React.createElement(
          'button',
          {
            key: l.id,
            title: l.desc,
            className: `h-7 rounded-full px-3 text-[11px] font-semibold transition ${(opt ?? 'single') === l.id ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink'}`,
          },
          l.name,
        ),
      )
    : null;
  return React.createElement(
    'div',
    { className: 'rounded-2xl border border-line p-3 transition hover:border-ink/15' },
    React.createElement(
      'div',
      { className: 'flex gap-3' },
      React.createElement('button', { className: 'w-[104px] flex-shrink-0 overflow-hidden rounded-xl' }, React.createElement(ProductMedia, { product: p })),
      React.createElement(
        'div',
        { className: 'min-w-0 flex-1' },
        React.createElement(
          'div',
          { className: 'flex items-start justify-between gap-2' },
          React.createElement(
            'div',
            { className: 'min-w-0' },
            React.createElement(
              'div',
              { className: 'text-[10px] font-semibold uppercase tracking-[0.14em] text-muted' },
              `${p.type === 'theme' ? 'Тема' : 'Плагин · Навсегда'} · v${p.version}`,
            ),
            React.createElement('button', { className: 'block truncate text-left text-[15px] font-semibold leading-tight hover:underline' }, p.name),
          ),
          React.createElement(
            'button',
            {
              'aria-label': 'Удалить',
              className: '-mr-1 -mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-rose-50 hover:text-rose-500',
            },
            'x',
          ),
        ),
        React.createElement('p', { className: 'mt-1 line-clamp-2 text-xs leading-relaxed text-muted' }, p.tagline),
      ),
    ),
    React.createElement(
      'div',
      { className: 'mt-3 flex items-center justify-between gap-2' },
      p.type === 'theme'
        ? React.createElement('div', { className: 'inline-flex rounded-full border border-line bg-soft p-0.5' }, licenseButtons)
        : React.createElement('span', { className: 'rounded-full bg-soft px-3 py-1 text-[11px] font-semibold text-ink' }, 'Лицензия навсегда'),
      React.createElement(
        'div',
        { className: 'text-right leading-tight' },
        old ? React.createElement('div', { className: 'text-[11px] text-muted line-through' }, rub(old)) : null,
        React.createElement('div', { className: 'font-bold tabular-nums' }, rub(price)),
      ),
    ),
  );
}

/* ------------------------------------------------------------------ */
/* Список страниц                                                      */
/* ------------------------------------------------------------------ */
const ACCOUNT_PARAMS = ['orders', 'downloads', 'licenses', 'tickets', 'new-ticket', 'wishlist', 'address', 'payment', 'details'];
const ACCOUNT_TITLES: Record<string, string> = {
  orders: 'Заказы',
  downloads: 'Загрузки',
  licenses: 'Лицензии и ключи',
  tickets: 'Тикеты поддержки',
  'new-ticket': 'Новое обращение',
  wishlist: 'Избранное',
  address: 'Платёжный адрес',
  payment: 'Способы оплаты',
  details: 'Данные аккаунта',
};
const ticketExample = data.tickets[0];

const pages: { file: string; hash: string; title: string }[] = [
  { file: 'index.html', hash: '#/home', title: 'Wp Panda (WPP) — премиум темы и плагины для WordPress и WooCommerce' },
  { file: 'shop.html', hash: '#/shop', title: 'Каталог тем и плагинов WordPress — Wp Panda' },
  ...data.products.map((p: any) => ({
    file: `product-${p.slug}.html`,
    hash: `#/product/${p.slug}`,
    title: `${p.name} — ${p.tagline} | Wp Panda`,
  })),
  { file: 'checkout.html', hash: '#/checkout', title: 'Оформление заказа — Wp Panda' },
  { file: 'checkout-cart.html', hash: '#/checkout/cart', title: 'Корзина — Wp Panda' },
  { file: 'blog.html', hash: '#/blog', title: 'Блог о WordPress и WooCommerce — Wp Panda' },
  ...data.posts.map((p: any) => ({ file: `blog-${p.slug}.html`, hash: `#/post/${p.slug}`, title: `${p.title} | Блог Wp Panda` })),
  { file: 'kb.html', hash: '#/kb', title: 'База знаний — Wp Panda' },
  ...data.kbArticles.map((a: any) => ({ file: `kb-${a.id}.html`, hash: `#/kb-article/${a.id}`, title: `${a.title} | База знаний Wp Panda` })),
  { file: 'faq.html', hash: '#/faq', title: 'Частые вопросы — Wp Panda' },
  { file: 'support.html', hash: '#/support', title: 'Поддержка — Wp Panda' },
  { file: 'account.html', hash: '#/account', title: 'Личный кабинет — Wp Panda' },
  ...ACCOUNT_PARAMS.map((t) => ({
    file: `account-${t}.html`,
    hash: `#/account/${t}`,
    title: `${ACCOUNT_TITLES[t]} — личный кабинет Wp Panda`,
  })),
  { file: `account-ticket-${ticketExample.id.toLowerCase()}.html`, hash: `#/account/ticket%2F${ticketExample.id}`, title: `Тикет ${ticketExample.id} — Wp Panda` },
  { file: 'ui.html', hash: '#/ui', title: 'UI-кит — Wp Panda' },
];

const pageFiles = new Set(pages.map((p) => p.file));

function routeToPath(page: string, param?: string): string | null {
  const kbIds = new Set(data.kbArticles.map((a: any) => a.id));
  const postSlugs = new Set(data.posts.map((p: any) => p.slug));
  const slugs = new Set(data.products.map((p: any) => p.slug));
  switch (page) {
    case 'home': return 'index.html';
    case 'shop': return 'shop.html';
    case 'product': return param && slugs.has(param) ? `product-${param}.html` : 'shop.html';
    case 'checkout': return param === 'cart' ? 'checkout-cart.html' : 'checkout.html';
    case 'blog': return 'blog.html';
    case 'post': return param && postSlugs.has(param) ? `blog-${param}.html` : 'blog.html';
    case 'kb': return 'kb.html';
    case 'kb-article': return param && kbIds.has(param) ? `kb-${param}.html` : 'kb.html';
    case 'faq': return 'faq.html';
    case 'support': return 'support.html';
    case 'account': {
      if (!param) return 'account.html';
      if (param.startsWith('ticket/')) {
        const id = param.slice('ticket/'.length);
        return data.tickets.some((t: any) => t.id === id) ? `account-ticket-${id.toLowerCase()}.html` : 'account-tickets.html';
      }
      return ACCOUNT_PARAMS.includes(param) ? `account-${param}.html` : 'account.html';
    }
    case 'ui': return 'ui.html';
    default: return null;
  }
}

const CRUMB_LINKS: Record<string, string> = {
  'Главная': 'index.html',
  'Каталог': 'shop.html',
  'Блог': 'blog.html',
  'База знаний': 'kb.html',
  'FAQ': 'faq.html',
  'Поддержка': 'support.html',
  'Темы WordPress': 'shop.html',
  'Плагины WordPress': 'shop.html',
};

const has = (el: El, cls: string) => ` ${el.getAttribute('class') ?? ''} `.includes(` ${cls} `);
const classes = (el: El) => (el.getAttribute('class') ?? '').split(/\s+/).filter(Boolean);
const text = (el?: El | null) => (el ? el.structuredText.replace(/\s+/g, ' ').trim() : '');

const warnings: string[] = [];
const warn = (m: string) => { if (!warnings.includes(m)) warnings.push(m); };

/* ------------------------------------------------------------------ */
/* JSON с ценами для JS                                                */
/* ------------------------------------------------------------------ */
const productsJson = JSON.stringify(
  data.products.map((p: any) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    type: p.type,
    tagline: p.tagline,
    priceSingle: data.priceFor(p, 'single'),
    priceMulti: data.priceFor(p, 'multi'),
    oldSingle: data.oldPriceFor(p, 'single') ?? null,
    oldMulti: data.oldPriceFor(p, 'multi') ?? null,
  })),
);

/* ------------------------------------------------------------------ */
/* Постобработка страницы                                              */
/* ------------------------------------------------------------------ */
function processPage(bodyHtml: string, page: { file: string; hash: string; title: string }): string {
  const root = parse(bodyHtml);
  const isProduct = page.file.startsWith('product-');
  const isFaq = page.file === 'faq.html';
  const isKbArticle = page.file.startsWith('kb-') && page.file !== 'kb.html';
  const productId = isProduct ? data.productBySlug(page.file.slice('product-'.length, -'.html'.length))?.id : undefined;
  const stringSwaps: [string, string][] = [];

  /* --- ссылки #/... -> файлы --- */
  for (const a of root.querySelectorAll('a[href^="#/"]')) {
    const raw = a.getAttribute('href')!.replace(/^#\//, '');
    const [p, ...rest] = raw.split('/');
    let param = rest.join('/');
    try { param = decodeURIComponent(param); } catch { /* оставим как есть */ }
    const target = routeToPath(p, param || undefined);
    if (target) a.setAttribute('href', target);
    else warn(`Неизвестная ссылка #/${raw} на ${page.file}`);
  }

  /* --- панели шапки и корзины --- */
  for (const div of root.querySelectorAll('div')) {
    if (has(div, 'fade-up') && has(div, 'fixed')) div.setAttribute('data-panel', 'search');
    else if (has(div, 'fade-up') && has(div, 'w-80')) div.setAttribute('data-panel', 'bell');
    else if (has(div, 'fade-in') && has(div, 'lg:hidden') && has(div, 'shadow-float')) div.setAttribute('data-panel', 'menu');
    else if (has(div, 'bg-ink/35') && has(div, 'fixed')) div.setAttribute('data-panel', 'cart-overlay');
  }
  for (const aside of root.querySelectorAll('aside[aria-label="Корзина"]')) aside.setAttribute('data-panel', 'cart');
  for (const div of root.querySelectorAll('div.fade-in')) {
    if (has(div, 'z-[100]')) div.setAttribute('data-panel', 'gallery');
  }
  for (const div of root.querySelectorAll('div.product-preview-dialog, dialog.product-preview-dialog')) div.setAttribute('data-panel', 'preview');

  /* --- счётчик корзины (бейджи) --- */
  for (const btn of root.querySelectorAll('button[aria-label="Открыть корзину"]')) {
    for (const span of btn.querySelectorAll('span')) {
      if (/^\d+$/.test(text(span))) span.setAttribute('data-cart-count', '');
    }
  }

  /* --- корзина: строки, итоги, кнопки --- */
  const drawer = root.querySelector('aside[data-panel="cart"]');
  if (drawer) {
    // подзаголовок
    for (const div of drawer.querySelectorAll('div.text-xs')) {
      const t = text(div);
      if (t === 'Пока пусто' || t.includes('мгновенная загрузка')) div.setAttribute('data-cart-subtitle', '');
    }
    // строки
    for (const btn of drawer.querySelectorAll('button[aria-label="Удалить"]')) {
      const row = btn.closest('div.rounded-2xl');
      if (!row) continue;
      const nameBtn = row.querySelector('button.truncate');
      const prod = data.products.find((p: any) => p.name === text(nameBtn));
      if (!prod) { warn(`Строка корзины без продукта («${text(nameBtn)}») на ${page.file}`); continue; }
      row.setAttribute('data-line', String(prod.id));
      btn.setAttribute('data-remove', String(prod.id));
      for (const b of row.querySelectorAll('button[title]')) {
        const t = text(b);
        if (t === '1 сайт') b.setAttribute('data-license', 'single');
        else if (t === '5 сайтов') b.setAttribute('data-license', 'multi');
      }
      const priceEl = row.querySelector('div.font-bold.tabular-nums');
      priceEl?.setAttribute('data-line-price', String(prod.id));
      const oldEl = row.querySelector('div.line-through');
      oldEl?.setAttribute('data-line-old', String(prod.id));
    }
    // итоги
    for (const rowDiv of drawer.querySelectorAll('div')) {
      if (!has(rowDiv, 'justify-between')) continue;
      const kids = rowDiv.childNodes.filter((n: any) => n.nodeType === 1);
      if (kids.length !== 2) continue;
      const label = text(kids[0] as El);
      if (label === 'Подытог') (kids[1] as El).setAttribute('data-sum', 'subtotal');
      if (label === 'Скидка по акции') (kids[1] as El).setAttribute('data-sum', 'saved');
    }
    for (const div of drawer.querySelectorAll('div')) {
      if (has(div, 'text-[28px]') && has(div, 'tabular-nums')) div.setAttribute('data-sum', 'total');
    }

    // подарок: прогресс и остаток
    for (const bar of drawer.querySelectorAll('div.h-2')) {
      const inner = bar.querySelector('div');
      inner?.setAttribute('data-gift-bar', '');
    }
    for (const b of drawer.querySelectorAll('b')) {
      if (b.textContent?.includes('₽')) b.setAttribute('data-gift-left', '');
    }
    // апсейл
    for (const box of drawer.querySelectorAll('div.border-dashed')) {
      const btn = box.querySelector('button');
      const upsell = data.products.find((p: any) => p.type === 'plugin' && ![1, 9].includes(p.id));
      if (btn) { btn.setAttribute('data-add', String(upsell.id)); btn.setAttribute('data-upsell', ''); }
    }
    // кнопки навигации
    for (const btn of drawer.querySelectorAll('button')) {
      const t = text(btn);
      if (t === 'Оформить заказ') btn.setAttribute('data-goto', 'checkout.html');
      else if (t === 'Страница корзины') btn.setAttribute('data-goto', 'checkout-cart.html');
      else if (t === 'Продолжить покупки') btn.setAttribute('data-close-cart', '');
      else if (t === 'Перейти в каталог') btn.setAttribute('data-goto', 'shop.html');
    }
  }

  /* --- итоги на чекауте (общая сводка заказа) --- */
  for (const rowDiv of root.querySelectorAll('div')) {
    if (!has(rowDiv, 'justify-between')) continue;
    const kids = rowDiv.childNodes.filter((n: any) => n.nodeType === 1);
    if (kids.length !== 2) continue;
    const label = text(kids[0] as El);
    if (label === 'Подытог') (kids[1] as El).setAttribute('data-sum', 'subtotal');
    if (label === 'Скидка по акции') (kids[1] as El).setAttribute('data-sum', 'saved');
  }
  for (const div of root.querySelectorAll('div')) {
    if (has(div, 'text-[32px]') && has(div, 'tabular-nums')) div.setAttribute('data-sum', 'total');
  }
  for (const btn of root.querySelectorAll('button')) {
    if (text(btn).startsWith('Оплатить')) btn.setAttribute('data-pay-total', '');
  }

  /* --- карточки товаров: кнопки «В корзину» --- */
  for (const a of root.querySelectorAll('a[href^="product-"]')) {
    const href = a.getAttribute('href')!;
    const m = href.match(/^product-([a-z0-9-]+)\.html$/);
    if (!m) continue;
    const prod = data.productBySlug(m[1]);
    let card: El | null = a.closest('article');
    if (!card) continue;
    for (const btn of card.querySelectorAll('button')) {
      const t = text(btn);
      if (t === 'В корзину' || t === 'В корзине' || t === 'В корзине · открыть') btn.setAttribute('data-add', String(prod.id));
    }
  }

  /* --- страница товара --- */
  if (isProduct && productId) {
    for (const btn of root.querySelectorAll('button[data-buy], button[data-buynow]')) btn.setAttribute('data-add', String(productId));
    // табы
    const tabIds: Record<string, string> = { 'Описание': 'details', 'Отзывы': 'reviews', 'Комментарии': 'comments', 'Историяверсий': 'changelog' };
    for (const btn of root.querySelectorAll('button[aria-selected]')) {
      const id = tabIds[text(btn).replace(/[\d\s]/g, '')];
      if (id) btn.setAttribute('data-tab', id);
      else warn(`Таб без соответствия: «${text(btn)}» на ${page.file}`);
    }
    // триггеры модалок
    for (const btn of root.querySelectorAll('button')) {
      const t = text(btn);
      if (t.includes('Скриншоты')) btn.setAttribute('data-open-gallery', '');
      if (t.includes('Предпросмотр')) btn.setAttribute('data-open-preview', '');
    }
    for (const btn of root.querySelectorAll('button[aria-label^="Открыть галерею"]')) btn.setAttribute('data-open-gallery', '');
  }

  /* --- FAQ: аккордеон --- */
  if (isFaq) {
    for (const article of root.querySelectorAll('article')) {
      const btn = article.querySelector('button[aria-expanded]');
      if (!btn) continue;
      const body = article.querySelector('div.fade-in');
      if (!body) continue;
      btn.setAttribute('data-acc-btn', '');
      body.setAttribute('data-acc-body', '');
      if (btn.getAttribute('aria-expanded') !== 'true') body.setAttribute('hidden', '');
    }
  }

  /* --- База знаний (статья): аккордеон разделов в сайдбаре --- */
  if (isKbArticle) {
    for (const div of root.querySelectorAll('div')) {
      if (!has(div, 'space-y-0.5') || !has(div, 'border-l')) continue;
      const own = div.querySelector(`a[href="${page.file}"]`);
      if (!own) div.setAttribute('hidden', '');
      const btn = div.previousElementSibling;
      if (btn && btn.rawTagName === 'button') btn.setAttribute('data-acc-btn', '');
      div.setAttribute('data-acc-body', '');
    }
  }

  /* --- хлебные крошки: кнопки -> ссылки --- */
  for (const nav of root.querySelectorAll('nav')) {
    if (!has(nav, 'text-xs') || !has(nav, 'text-muted')) continue;
    for (const btn of nav.querySelectorAll('button')) {
      const label = text(btn);
      const href = CRUMB_LINKS[label];
      if (href) stringSwaps.push([btn.outerHTML, `<a class="transition hover:text-ink" href="${href}">${label}</a>`]);
    }
  }

  /* --- кнопки-ссылки: мобильное меню, поиск, уведомления, аккаунт --- */
  const MENU_LINKS: Record<string, string> = {
    'Главная': 'index.html', 'Каталог': 'shop.html', 'Блог': 'blog.html',
    'База знаний': 'kb.html', 'FAQ': 'faq.html', 'Личный кабинет': 'account.html',
  };
  const BELL_LINKS: [string, string][] = [
    ['Доступно обновление', 'account-downloads.html'],
    ['Ответ в тикете', 'account-ticket-t-48213.html'],
    ['Aurora 3.2.1', 'account-downloads.html'],
  ];
  const ACCOUNT_LINKS: Record<string, string> = {
    'Панель управления': 'account.html', 'Заказы': 'account-orders.html', 'Загрузки': 'account-downloads.html',
    'Лицензии и ключи': 'account-licenses.html', 'Тикеты поддержки': 'account-tickets.html',
    'Избранное': 'account-wishlist.html', 'Платёжный адрес': 'account-address.html',
    'Способы оплаты': 'account-payment.html', 'Данные аккаунта': 'account-details.html',
  };
  const toLink = (btn: El, href: string) =>
    stringSwaps.push([btn.outerHTML, `<a class="${btn.getAttribute('class')}" href="${href}">${btn.innerHTML}</a>`]);

  for (const panelEl of root.querySelectorAll('[data-panel]')) {
    const name = panelEl.getAttribute('data-panel');
    if (name === 'menu') {
      for (const btn of panelEl.querySelectorAll('button')) {
        const href = MENU_LINKS[text(btn)];
        if (href) toLink(btn, href);
      }
    } else if (name === 'search') {
      for (const btn of panelEl.querySelectorAll('button')) {
        const t = text(btn);
        const prod = data.products.find((p: any) => t.startsWith(p.name + ' ') && t.includes('\u20BD'));
        if (prod) toLink(btn, `product-${prod.slug}.html`);
        else if (t === 'Весь каталог') toLink(btn, 'shop.html');
      }
    } else if (name === 'bell') {
      for (const btn of panelEl.querySelectorAll('button')) {
        const t = text(btn);
        const hit = BELL_LINKS.find(([prefix]) => t.startsWith(prefix));
        if (hit) toLink(btn, hit[1]);
      }
    }
  }
  if (page.file.startsWith('account')) {
    for (const btn of root.querySelectorAll('button')) {
      const href = ACCOUNT_LINKS[text(btn)];
      if (href) toLink(btn, href);
    }
  }
  if (isProduct) {
    for (const btn of root.querySelectorAll('button')) {
      const t = text(btn);
      if (t === 'Смотреть все' || t === 'Все продукты автора') toLink(btn, 'shop.html');
    }
  }

  const html = root.innerHTML;

  /* --- пути к локальным ассетам --- */
  let out = html.replace(/"(\/images\/)/g, '"images/').replace(/"(\/panda\.svg)"/g, '"panda.svg"');

  /* --- крошки --- */
  for (const [from, to] of stringSwaps) {
    if (!out.includes(from)) warn(`Крошка не найдена при замене на ${page.file}`);
    out = out.replace(from, to);
  }

  /* --- JS-шаблоны строк корзины + данные + скрипт --- */
  const templates = data.products
    .map((p: any) => {
      const opt = p.type === 'theme' ? 'single' : undefined;
      const row = renderToStaticMarkup(createElement(CartRow as any, { productId: p.id, opt }));
      return `<div hidden data-row-tpl="${p.id}">${row}</div>`;
    })
    .join('');

  out +=
    `\n<script type="application/json" id="wpp-data">${productsJson}</script>` +
    `\n<div hidden data-row-templates>${templates}</div>` +
    `\n<script src="assets/js/main.js" defer></script>`;

  return head(page.title) + out + '</body>\n</html>\n';
}

function head(title: string): string {
  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="Темы и плагины WordPress с автообновлениями, лицензиями и поддержкой 12 месяцев." />
    <link rel="icon" type="image/svg+xml" href="panda.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="assets/css/style.css" />
  </head>

  <body>
`;
}

/* ------------------------------------------------------------------ */
/* Рендер всех страниц                                                 */
/* ------------------------------------------------------------------ */
const outDir = path.resolve(process.cwd(), 'markup');
fs.mkdirSync(path.join(outDir, 'assets', 'js'), { recursive: true });
fs.mkdirSync(path.join(outDir, 'assets', 'css'), { recursive: true });
fs.mkdirSync(path.join(outDir, 'images'), { recursive: true });

// ассеты
fs.copyFileSync(path.resolve(process.cwd(), 'public/panda.svg'), path.join(outDir, 'panda.svg'));
fs.copyFileSync(path.resolve(process.cwd(), 'public/images/wp-panda-hero.png'), path.join(outDir, 'images/wp-panda-hero.png'));

// CSS из собранного dist (единый style от Tailwind)
{
  const dist = fs.readFileSync(path.resolve(process.cwd(), 'dist/index.html'), 'utf8');
  const styles = [...dist.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  if (!styles.length) throw new Error('В dist/index.html не найден <style>');
  const css = styles.sort((a, b) => b.length - a.length)[0];
  const extras = `
/* ==== Вёрстка: управление панелями и слайдами (data-атрибуты) ==== */
[data-panel] { display: none !important; }
[data-panel].open { display: block !important; }
[data-panel="cart"].open,
[data-panel="gallery"].open,
[data-panel="preview"].open { display: flex !important; }
`;
  fs.writeFileSync(path.join(outDir, 'assets/css/style.css'), `/* Wp Panda — скомпилированный Tailwind CSS (сборка сайта) */\n${css}${extras}`);
}

let ok = 0;
for (const page of pages) {
  mockLocation.hash = page.hash;
  let body: string;
  try {
    body = renderToStaticMarkup(createElement(AppProvider, null, createElement(Shell as any)));
  } catch (e) {
    console.error(`✗ ${page.file}:`, (e as Error).message);
    throw e;
  }
  fs.writeFileSync(path.join(outDir, page.file), processPage(body, page));
  ok++;
  console.log(`✓ ${page.file}`);
}

console.log(`\nГотово: ${ok}/${pages.length} страниц -> markup/`);
if (warnings.length) {
  console.log('\nПредупреждения:');
  for (const w of warnings) console.log(`  ! ${w}`);
}
