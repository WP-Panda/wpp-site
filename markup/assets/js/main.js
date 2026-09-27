/* =========================================================================
   Wp Panda — скрипт вёрстки (ванильный JS, без зависимостей)
   =========================================================================
   Управление построено на data-атрибутах в разметке:

   Панели (показ/скрытие классом .open):
     data-panel="search|bell|menu|cart|cart-overlay|gallery|preview"
     Кнопки: [aria-label="Поиск"], [aria-label="Уведомления"],
             [aria-label="Меню"], [aria-label="Открыть корзину"]

   Корзина:
     data-add="12"            — добавить товар (кнопки в карточках и на странице товара)
     data-buynow              — добавить и перейти к оформлению
     data-remove="12"         — удалить строку корзины
     data-line="12"           — строка корзины
     data-license="single|multi" — выбор лицензии в строке
     data-line-price / data-line-old — цена строки
     data-sum="subtotal|saved|total" — итоги (корзина и чекаут)
     data-cart-count          — бейдж с количеством
     data-cart-subtitle       — подзаголовок корзины
     data-gift-bar/left       — прогресс подарка
     data-goto="checkout.html" — переход по кнопке
     data-close-cart          — закрыть корзину
     Состояние хранится в localStorage (ключ "wpp-cart").

   Аккордеоны: data-acc-btn (кнопка) + data-acc-body (содержимое)
   Табы товара: data-tab="details|reviews|comments|changelog" + data-tabpanel
   Галерея: data-open-gallery / data-open-preview, слайды [data-slide]
   ========================================================================= */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var onClass = function (el, cls, add) {
    if (!el) return;
    cls.split(' ').forEach(function (c) { return c && el.classList[add ? 'add' : 'remove'](c); });
  };

  /* -------------------------------------------------------------- */
  /* Данные о товарах (вставлены генератором в каждую страницу)      */
  /* -------------------------------------------------------------- */
  var PRODUCTS = {};
  try {
    JSON.parse($('#wpp-data').textContent).forEach(function (p) { PRODUCTS[p.id] = p; });
  } catch (e) { /* страница без данных — корзина работает в статике */ }

  var rub = function (n) { return Math.round(n).toLocaleString('ru-RU') + ' \u20BD'; };
  var plural = function (n, forms) {
    var a = Math.abs(n) % 100, b = a % 10;
    if (a > 10 && a < 20) return forms[2];
    if (b > 1 && b < 5) return forms[1];
    if (b === 1) return forms[0];
    return forms[2];
  };

  /* -------------------------------------------------------------- */
  /* Корзина                                                         */
  /* -------------------------------------------------------------- */
  var GIFT_GOAL = 15000;
  var CART_KEY = 'wpp-cart';
  var drawer = $('[data-panel="cart"]');

  var cart = (function () {
    try {
      var saved = JSON.parse(localStorage.getItem(CART_KEY) || 'null');
      if (Array.isArray(saved)) return saved;
    } catch (e) { /* ignore */ }
    // сид из статичной разметки (дефолтная корзина)
    return $$('[data-line]').map(function (row) {
      var id = Number(row.getAttribute('data-line'));
      var active = $('[data-license].bg-ink', row);
      return { id: id, opt: active ? (active.getAttribute('data-license') || 'single') : (PRODUCTS[id] && PRODUCTS[id].type === 'theme' ? 'single' : undefined) };
    });
  })();

  function save() { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* ignore */ } }

  function priceOf(line) {
    var p = PRODUCTS[line.id];
    if (!p) return 0;
    return p.type === 'theme' ? (line.opt === 'multi' ? p.priceMulti : p.priceSingle) : p.priceSingle;
  }
  function oldOf(line) {
    var p = PRODUCTS[line.id];
    if (!p) return null;
    if (p.type !== 'theme') return p.oldSingle;
    return (line.opt === 'multi' ? p.oldMulti : p.oldSingle) || null;
  }
  function totals() {
    var subtotal = 0, saved = 0;
    cart.forEach(function (l) { subtotal += priceOf(l); var o = oldOf(l); if (o) saved += o - priceOf(l); });
    return { subtotal: subtotal, saved: saved, total: subtotal, count: cart.length };
  }

  function rowTemplate(id) {
    var tpl = $('[data-row-tpl="' + id + '"]');
    return tpl ? tpl.innerHTML : '';
  }

  function makeRow(line) {
    var wrap = document.createElement('div');
    wrap.innerHTML = rowTemplate(line.id);
    var row = wrap.firstElementChild;
    if (!row) return null;
    row.setAttribute('data-line', String(line.id));
    var prod = PRODUCTS[line.id];
    // активная лицензия
    $$('[data-license]', row).length && $$('button', row).forEach(function (b) {
      var t = b.textContent.trim();
      if (t === '1 сайт') b.setAttribute('data-license', 'single');
      else if (t === '5 сайтов') b.setAttribute('data-license', 'multi');
    });
    $$('[data-license]', row).forEach(function (b) {
      var isActive = (b.getAttribute('data-license') === (line.opt || 'single'));
      onClass(b, 'bg-ink text-white', isActive);
      onClass(b, 'text-ink/60 hover:text-ink', !isActive);
    });
    $('[aria-label="Удалить"]', row) && $('[aria-label="Удалить"]', row).setAttribute('data-remove', String(line.id));
    $('[data-line-price]', row) && $('[data-line-price]', row).setAttribute('data-line-price', String(line.id));
    return row;
  }

  function renderCart() {
    var t = totals();
    // строки
    if (drawer) {
      var box = $('[data-line]') && $('[data-line]').parentElement;
      if (box) {
        var existing = {};
        $$('[data-line]', box).forEach(function (row) { existing[row.getAttribute('data-line')] = row; });
        // удалить лишние
        Object.keys(existing).forEach(function (id) {
          if (!cart.some(function (l) { return String(l.id) === id; })) existing[id].remove();
        });
        // добавить недостающие (перед блоком промокода)
        cart.forEach(function (line) {
          if (existing[String(line.id)]) return;
          var row = makeRow(line);
          if (!row) return;
          var couponBox = $('.mt-4.pb-5', drawer);
          if (couponBox) couponBox.insertAdjacentElement('beforebegin', row);
          else box.appendChild(row);
        });
        // цены строк
        $$('[data-line]', box).forEach(function (row) {
          var id = Number(row.getAttribute('data-line'));
          var line = cart.filter(function (l) { return l.id === id; })[0];
          if (!line) return;
          var priceEl = $('[data-line-price]', row), oldEl = $('[data-line-old]', row);
          if (priceEl) priceEl.textContent = rub(priceOf(line));
          if (oldEl) oldEl.textContent = rub(oldOf(line) || 0);
        });
      }
      // подзаголовок
      var sub = $('[data-cart-subtitle]');
      if (sub) sub.textContent = t.count
        ? t.count + ' ' + plural(t.count, ['товар', 'товара', 'товаров']) + ' · мгновенная загрузка'
        : 'Пока пусто';
      // подарок
      var left = Math.max(0, GIFT_GOAL - t.total);
      var pct = Math.min(100, (t.total / GIFT_GOAL) * 100);
      var bar = $('[data-gift-bar]');
      if (bar) bar.style.width = pct + '%';
      var leftEl = $('[data-gift-left]');
      if (leftEl) leftEl.textContent = rub(left);
    }
    // бейджи
    $$('[data-cart-count]').forEach(function (b) {
      b.textContent = String(t.count);
      b.hidden = t.count === 0;
    });
    // итоги
    $$('[data-sum]').forEach(function (el) {
      var kind = el.getAttribute('data-sum');
      if (kind === 'subtotal') el.textContent = rub(t.subtotal + t.saved);
      if (kind === 'saved') el.textContent = '\u2212' + rub(t.saved);
      if (kind === 'total') el.textContent = rub(t.total);
    });
    // кнопка оплаты
    $$('[data-pay-total]').forEach(function (btn) {
      btn.textContent = 'Оплатить ' + rub(t.total);
    });
  }

  function addToCart(id, opt, open) {
    var p = PRODUCTS[id];
    if (!p) return;
    var chosen = p.type === 'theme' ? (opt || 'single') : undefined;
    var line = cart.filter(function (l) { return l.id === id; })[0];
    if (line) line.opt = chosen;
    else cart.push({ id: id, opt: chosen });
    save();
    renderCart();
    syncBuyButtons();
    if (open !== false) openCart();
  }

  function syncBuyButtons() {
    $$('[data-add]').forEach(function (btn) {
      var id = Number(btn.getAttribute('data-add'));
      var inCart = cart.some(function (l) { return l.id === id; });
      if (!btn.hasAttribute('data-buy')) return; // карточки не меняем
      var label = btn.hasAttribute('data-buynow') ? null : btn;
      if (!label) return;
      var t = btn.textContent.trim();
      var next = inCart ? 'В корзине · открыть' : (t.indexOf('Обновить') === 0 ? 'Обновить в корзине' : 'Добавить в корзину');
      if (t !== next) btn.textContent = next;
    });
  }

  /* --- открытие/закрытие корзины --- */
  function openCart() {
    if (!drawer) return;
    drawer.classList.add('open');
    var ov = $('[data-panel="cart-overlay"]');
    if (ov) ov.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    if (!drawer) return;
    drawer.classList.remove('open');
    var ov = $('[data-panel="cart-overlay"]');
    if (ov) ov.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* -------------------------------------------------------------- */
  /* Панели (поиск, уведомления, меню, модалки)                      */
  /* -------------------------------------------------------------- */
  var outside = [];
  function togglePanel(name, btn) {
    var panel = $('[data-panel="' + name + '"]');
    if (!panel) return;
    var willOpen = !panel.classList.contains('open');
    panel.classList.toggle('open', willOpen);
    if (name === 'menu') {
      var io = $('.js-icon-open', btn && btn.parentElement ? btn.parentElement : document);
      var ic = $('.js-icon-closed', btn && btn.parentElement ? btn.parentElement : document);
      if (io) io.classList.toggle('hidden', willOpen);
      if (ic) ic.classList.toggle('hidden', !willOpen);
    }
    if (btn && btn.getAttribute('aria-expanded') !== undefined) btn.setAttribute('aria-expanded', String(willOpen));
    if (name === 'cart') {
      if (willOpen) openCart(); else closeCart();
      return;
    }
    if (['search', 'bell'].indexOf(name) >= 0) {
      if (willOpen) outside.push({ panel: panel, btn: btn });
      else outside = outside.filter(function (o) { return o.panel !== panel; });
    }
  }
  function closePopups() {
    outside.slice().forEach(function (o) { togglePanel(o.panel.getAttribute('data-panel'), o.btn); });
  }

  document.addEventListener('click', function (e) {
    if (outside.length) {
      var inside = outside.some(function (o) {
        return o.panel.contains(e.target) || (o.btn && o.btn.contains(e.target));
      });
      if (!inside) closePopups();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (drawer && drawer.classList.contains('open')) { closeCart(); return; }
    var gallery = $('[data-panel="gallery"].open');
    if (gallery) { gallery.classList.remove('open'); document.body.style.overflow = ''; return; }
    var preview = $('[data-panel="preview"].open');
    if (preview) { preview.classList.remove('open'); document.body.style.overflow = ''; return; }
    closePopups();
  });

  /* --- делегированные клики --- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('button, a') : null;

    var cartBtn = e.target.closest && e.target.closest('[aria-label="Открыть корзину"]');
    if (cartBtn) { e.preventDefault(); openCart(); return; }
    if (e.target.closest && e.target.closest('[aria-label="Закрыть корзину"], [data-panel="cart-overlay"]')) { closeCart(); return; }

    if (el) {
      if (el.hasAttribute('data-close-cart')) { closeCart(); return; }
      if (el.hasAttribute('data-goto')) { location.href = el.getAttribute('data-goto'); return; }
      if (el.hasAttribute('data-remove')) {
        var rid = Number(el.getAttribute('data-remove'));
        cart = cart.filter(function (l) { return l.id !== rid; });
        save(); renderCart(); syncBuyButtons(); return;
      }
      if (el.hasAttribute('data-buynow')) {
        addToCart(Number(el.getAttribute('data-add')), undefined, false);
        location.href = 'checkout.html';
        return;
      }
      if (el.hasAttribute('data-add')) {
        var id = Number(el.getAttribute('data-add'));
        var checked = $('input[name^="product-license"]:checked');
        addToCart(id, checked ? checked.value : undefined);
        return;
      }
      var acc = el.hasAttribute('data-acc-btn') ? el : null;
      if (acc) { toggleAccordion(acc); return; }
      if (el.hasAttribute('data-tab')) { activateTab(el); return; }
      if (el.hasAttribute('data-open-gallery')) { openModal('gallery'); initGalleryOnce(); return; }
      if (el.hasAttribute('data-open-preview')) { openModal('preview'); return; }
      var label = el.getAttribute('aria-label') || '';
      if (label === 'Поиск') { togglePanel('search', el); return; }
      if (label === 'Уведомления') { togglePanel('bell', el); return; }
      if (label === 'Меню') { togglePanel('menu', el); return; }
      if (label === 'Закрыть галерею' || label === 'Закрыть предпросмотр') {
        var m = el.closest('[data-panel]');
        if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
        return;
      }
      if (label === 'Предыдущий слайд') { galleryStep(-1); return; }
      if (label === 'Следующий слайд') { galleryStep(1); return; }
      // кнопки разделов личного кабинета
      if (/^account-/.test(location.pathname.split('/').pop() || '')) {
        var accLinks = {
          'Заказы': 'account-orders.html',
          'Загрузки': 'account-downloads.html',
          'Лицензии и ключи': 'account-licenses.html',
          'Тикеты поддержки': 'account-tickets.html',
          'Избранное': 'account-wishlist.html',
          'Платёжный адрес': 'account-address.html',
          'Способы оплаты': 'account-payment.html',
          'Данные аккаунта': 'account-details.html',
        };
        var t = el.textContent.trim();
        if (accLinks[t]) { location.href = accLinks[t]; return; }
      }
    }
    // клик по подложке модалки
    var panel = e.target.closest && e.target.closest('[data-panel="gallery"], [data-panel="preview"]');
    if (panel && e.target === panel) { panel.classList.remove('open'); document.body.style.overflow = ''; }
  });

  function openModal(name) {
    var m = $('[data-panel="' + name + '"]');
    if (!m) return;
    m.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* -------------------------------------------------------------- */
  /* Галерея товара                                                  */
  /* -------------------------------------------------------------- */
  var galleryIndex = 0;
  function initGalleryOnce() {
    galleryIndex = 0;
    showSlide(0);
  }
  function showSlide(i) {
    var panel = $('[data-panel="gallery"]');
    if (!panel) return;
    var slides = $$('[data-slide]', panel);
    if (!slides.length) return;
    galleryIndex = Math.max(0, Math.min(i, slides.length - 1));
    slides.forEach(function (s, idx) { s.hidden = idx !== galleryIndex; });
    $$('[data-slide-counter]', panel).forEach(function (c) { c.textContent = String(galleryIndex + 1); });
    var cur = $('[data-slide-label-current]', panel);
    var label = $('[data-slide-label="' + galleryIndex + '"]', panel);
    if (cur && label) cur.textContent = label.textContent;
    // миниатюры
    var thumbBox = $('.grid-cols-3', panel);
    if (thumbBox) {
      var thumbs = $$('button', thumbBox);
      thumbs.forEach(function (th, idx) {
        var active = idx === galleryIndex;
        onClass(th, 'border-brand shadow-picked', active);
        onClass(th, 'border-transparent hover:border-line', !active);
        var cap = th.querySelector('span.hidden');
        if (cap) onClass(cap, 'text-ink', active) || onClass(cap, 'text-muted', !active);
      });
    }
  }
  function galleryStep(d) { showSlide(galleryIndex + d); }
  // клики по миниатюрам галереи
  document.addEventListener('click', function (e) {
    var panel = $('[data-panel="gallery"]');
    if (!panel || !panel.classList.contains('open')) return;
    var thumbBox = $('.grid-cols-3', panel);
    if (!thumbBox || !thumbBox.contains(e.target)) return;
    var btn = e.target.closest('button');
    if (!btn) return;
    var thumbs = $$('button', thumbBox);
    showSlide(thumbs.indexOf(btn));
  });

  /* -------------------------------------------------------------- */
  /* Аккордеоны (FAQ и База знаний)                                  */
  /* -------------------------------------------------------------- */
  function toggleAccordion(btn) {
    var scope = btn.closest('article') || btn.parentElement;
    var body = scope && ($('[data-acc-body]', scope) || btn.nextElementSibling);
    if (!body) return;
    var willOpen = body.hidden;
    body.hidden = !willOpen;
    btn.setAttribute('aria-expanded', String(willOpen));
    // стили открытого состояния
    var article = btn.closest('article');
    if (article) {
      onClass(article, 'border-brand shadow-card ring-1 ring-brand', willOpen);
      onClass(article, 'border-line hover:border-ink/15', !willOpen);
      var circle = btn.querySelector('span');
      if (circle) {
        onClass(circle, 'bg-brand text-ink', willOpen);
        onClass(circle, 'bg-soft text-muted', !willOpen);
      }
    }
    // шеврон — последний svg в кнопке
    var svgs = $$('svg', btn);
    var chev = svgs[svgs.length - 1];
    if (chev) {
      chev.classList.toggle('rotate-180', willOpen);
      if (article) onClass(chev, 'text-ink', willOpen);
    }
  }

  /* -------------------------------------------------------------- */
  /* Табы страницы товара                                            */
  /* -------------------------------------------------------------- */
  function activateTab(btn) {
    var name = btn.getAttribute('data-tab');
    $$('[data-tab]').forEach(function (b) {
      var active = b === btn;
      b.setAttribute('aria-selected', String(active));
      onClass(b, 'border-brand text-ink', active);
      onClass(b, 'border-transparent text-muted hover:text-ink', !active);
      var count = b.querySelector('span.rounded-md');
      if (count) {
        onClass(count, 'bg-brand-50 text-ink', active);
        onClass(count, 'bg-soft text-muted', !active);
      }
    });
    $$('[data-tabpanel]').forEach(function (p) {
      p.hidden = p.getAttribute('data-tabpanel') !== name;
    });
    window.scrollTo({ top: $('.item-tabs') ? $('.item-tabs').getBoundingClientRect().top + window.scrollY - 90 : window.scrollY, behavior: 'smooth' });
  }

  /* -------------------------------------------------------------- */
  /* Лицензия на странице товара (цена)                              */
  /* -------------------------------------------------------------- */
  document.addEventListener('change', function (e) {
    var input = e.target;
    if (!(input instanceof HTMLInputElement) || input.name.indexOf('product-license') !== 0) return;
    var id = Number(($('[data-add][data-buy]') || {}).getAttribute ? $('[data-add][data-buy]').getAttribute('data-add') : 0);
    var p = PRODUCTS[id];
    if (!p) return;
    var price = input.value === 'multi' ? p.priceMulti : p.priceSingle;
    var old = input.value === 'multi' ? p.oldMulti : p.oldSingle;
    var priceEl = $('[data-price]'), oldEl = $('[data-oldprice]'), discEl = $('[data-discount]');
    if (priceEl) priceEl.textContent = rub(price);
    if (oldEl) oldEl.textContent = old ? rub(old) : '';
    if (discEl) {
      if (old) { discEl.hidden = false; discEl.textContent = '-' + Math.round((1 - price / old) * 100) + '%'; }
      else discEl.hidden = true;
    }
  });

  /* -------------------------------------------------------------- */
  /* Избранное (кнопки с aria-pressed)                               */
  /* -------------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('button[aria-pressed]');
    if (!btn) return;
    var val = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-pressed', String(!val));
    onClass(btn, 'text-rose-600', !val);
    var heart = btn.querySelector('svg');
    if (heart) heart.classList.toggle('fill-current', !val);
    var tn = Array.prototype.filter.call(btn.childNodes, function (n) { return n.nodeType === 3 && /В избранн/.test(n.textContent); })[0];
    if (tn) tn.textContent = !val ? ' В избранном' : ' В избранное';
  });

  /* -------------------------------------------------------------- */
  /* Шапка при скролле                                               */
  /* -------------------------------------------------------------- */
  var header = $('header');
  function onScroll() {
    if (!header) return;
    var scrolled = window.scrollY > 8;
    onClass(header, 'bg-white/85 shadow-[0_1px_0_rgba(20,20,28,0.06)] backdrop-blur-xl', scrolled);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------------------------------------------------------------- */
  /* Превью в карточке -> страница товара                            */
  /* -------------------------------------------------------------- */
  $$('article').forEach(function (card) {
    var link = $('a[href^="product-"]', card);
    var preview = link && card.querySelector('.cursor-pointer');
    if (preview && link) preview.addEventListener('click', function () { location.href = link.getAttribute('href'); });
  });

  /* --- старт --- */
  renderCart();
  syncBuyButtons();
})();
