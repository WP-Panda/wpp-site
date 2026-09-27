/* =========================================================================
 * Wp Panda — скрипт темы (ванильный JS, без зависимостей)
 * Панели шапки, аккордеоны, табы товара, фильтр каталога на главной,
 * выезжающая корзина (данные обновляет WooCommerce через wc-fragments).
 * ========================================================================= */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function onClass(el, cls, add) {
    if (!el) return;
    cls.split(' ').forEach(function (c) { return c && el.classList[add ? 'add' : 'remove'](c); });
  }

  /* -------------------------------------------------------------- */
  /* Панели: поиск, уведомления, мобильное меню, корзина, модалки     */
  /* -------------------------------------------------------------- */
  var outside = [];
  function openPanel(name) {
    var panel = $('[data-panel="' + name + '"]');
    if (!panel) return;
    panel.classList.add('open');
    if (name === 'cart') document.body.style.overflow = 'hidden';
    if (name === 'search' || name === 'bell') {
      outside.push({ panel: panel });
      var input = $('input', panel);
      if (input) input.focus();
    }
  }
  function closePanel(name) {
    var panel = $('[data-panel="' + name + '"]');
    if (!panel) return;
    panel.classList.remove('open');
    if (name === 'cart') document.body.style.overflow = '';
    if (name === 'search' || name === 'bell') {
      outside = outside.filter(function (o) { return o.panel !== panel; });
    }
  }
  function closeAllPanels() {
    ['search', 'bell', 'menu', 'gallery', 'preview'].forEach(closePanel);
    closeCart();
  }
  function openCart() { openPanel('cart'); }
  function closeCart() { closePanel('cart'); }

  document.addEventListener('click', function (e) {
    if (outside.length && !outside.some(function (o) { return o.panel.contains(e.target); })) {
      outside.slice().forEach(function (o) {
        var name = o.panel.getAttribute('data-panel');
        closePanel(name);
      });
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = $('[data-panel].open');
    if (open) { closePanel(open.getAttribute('data-panel')); return; }
  });

  document.addEventListener('click', function (e) {
    var t = e.target;

    var cartBtn = t.closest('[data-cart-open]');
    if (cartBtn) { e.preventDefault(); openCart(); return; }
    if (t.closest('[data-cart-close]') || t.closest('[data-panel="cart-overlay"]')) { closeCart(); return; }

    var label = '';
    var btn = t.closest('button, a');
    if (btn) label = btn.getAttribute('aria-label') || '';
    if (label === 'Поиск') { toggle('search'); return; }
    if (label === 'Уведомления') { toggle('bell'); return; }
    if (label === 'Меню') { toggleMenu(btn); return; }
    if (label === 'Закрыть галерею' || label === 'Закрыть предпросмотр') {
      var m = btn.closest('[data-panel]');
      if (m) closePanel(m.getAttribute('data-panel'));
      return;
    }
    if (btn && btn.hasAttribute('data-open-gallery')) { openPanel('gallery'); return; }
    if (btn && btn.hasAttribute('data-open-preview')) { openPanel('preview'); return; }
    if (btn && btn.hasAttribute('data-goto')) { location.href = btn.getAttribute('data-goto'); return; }

    // подложка модалки
    var panel = t.closest('[data-panel="gallery"], [data-panel="preview"]');
    if (panel && t === panel) closePanel(panel.getAttribute('data-panel'));

    function toggle(name) {
      var p = $('[data-panel="' + name + '"]');
      if (!p) return;
      if (p.classList.contains('open')) closePanel(name); else openPanel(name);
    }
  });

  function toggleMenu(btn) {
    var panel = $('[data-panel="menu"]');
    if (!panel) return;
    var willOpen = !panel.classList.contains('open');
    panel.classList.toggle('open', willOpen);
    var wrap = btn.parentElement;
    if (wrap) {
      var io = $('.js-icon-open', wrap), ic = $('.js-icon-closed', wrap);
      if (io) io.classList.toggle('hidden', willOpen);
      if (ic) ic.classList.toggle('hidden', !willOpen);
    }
  }

  /* -------------------------------------------------------------- */
  /* Аккордеоны (FAQ, база знаний)                                    */
  /* -------------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-acc-btn]');
    if (!btn) return;
    var scope = btn.closest('article') || btn.parentElement;
    var body = scope && ($('[data-acc-body]', scope) || btn.nextElementSibling);
    if (!body) return;
    var willOpen = body.hidden;
    body.hidden = !willOpen;
    btn.setAttribute('aria-expanded', String(willOpen));
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
    var svgs = $$('svg', btn);
    var chev = svgs[svgs.length - 1];
    if (chev) chev.classList.toggle('rotate-180', willOpen);
  });

  /* -------------------------------------------------------------- */
  /* Фильтр каталога на главной (Все / Темы / Плагины)                */
  /* -------------------------------------------------------------- */
  $$('[data-filter]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-filter');
      $$('[data-filter]').forEach(function (b) {
        var active = b === btn;
        b.setAttribute('aria-selected', String(active));
        onClass(b, 'bg-ink text-white', active);
        onClass(b, 'text-ink/60 hover:text-ink', !active);
      });
      $$('[data-type]').forEach(function (card) {
        var type = card.getAttribute('data-type');
        card.hidden = value !== 'all' && type !== value;
      });
    });
  });

  /* -------------------------------------------------------------- */
  /* Избранное (сердечки) — локально, без бэкенда                     */
  /* -------------------------------------------------------------- */
  var WISH_KEY = 'wpp-wishlist';
  function wishlist() {
    try { return JSON.parse(localStorage.getItem(WISH_KEY) || '[]'); } catch (e) { return []; }
  }
  function syncWishButtons() {
    var list = wishlist();
    $$('button[data-wish]').forEach(function (btn) {
      var id = btn.getAttribute('data-wish');
      var active = list.indexOf(id) >= 0;
      btn.setAttribute('aria-pressed', String(active));
      onClass(btn, 'text-rose-600', active);
      var heart = btn.querySelector('svg');
      if (heart) heart.classList.toggle('fill-current', active);
      var tn = Array.prototype.filter.call(btn.childNodes, function (n) { return n.nodeType === 3 && /В избранн/.test(n.textContent); })[0];
      if (tn) tn.textContent = active ? ' В избранном' : ' В избранное';
    });
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-wish]');
    if (!btn) return;
    e.preventDefault();
    var id = btn.getAttribute('data-wish');
    var list = wishlist();
    var i = list.indexOf(id);
    if (i >= 0) list.splice(i, 1); else list.push(id);
    try { localStorage.setItem(WISH_KEY, JSON.stringify(list)); } catch (err) { /* ignore */ }
    syncWishButtons();
  });
  syncWishButtons();

  /* -------------------------------------------------------------- */
  /* Шапка при скролле                                                */
  /* -------------------------------------------------------------- */
  var header = $('header');
  function onScroll() {
    if (!header) return;
    onClass(header, 'bg-white/85 shadow-[0_1px_0_rgba(20,20,28,0.06)] backdrop-blur-xl', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------------------------------------------------------------- */
  /* WooCommerce: после AJAX-добавления открываем корзину             */
  /* -------------------------------------------------------------- */
  if (typeof jQuery !== 'undefined') {
    jQuery(document.body).on('added_to_cart', function () { openCart(); });
  }
})();
