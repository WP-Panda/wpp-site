(function () {
  'use strict';

  var menuToggle = document.querySelector('[data-menu-toggle]');
  var navigation = document.getElementById('site-navigation');
  var siteHeader = document.querySelector('.site-header');

  function syncHeaderSurface() {
    if (siteHeader) siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  syncHeaderSurface();
  window.addEventListener('scroll', syncHeaderSurface, { passive: true });

  if (menuToggle && navigation) {
    menuToggle.addEventListener('click', function () {
      var isOpen = navigation.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    });

    navigation.addEventListener('click', function (event) {
      if (event.target.closest('a') && window.matchMedia('(max-width: 1023px)').matches) {
        navigation.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Открыть меню');
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;

    if (navigation && navigation.classList.contains('is-open')) {
      navigation.classList.remove('is-open');
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Открыть меню');
        menuToggle.focus();
      }
    }

    document.querySelectorAll('.header-search[open], .header-cart[open], .header-notifications[open]').forEach(function (details) {
      details.removeAttribute('open');
    });
  });

  document.addEventListener('click', function (event) {
    var cartClose = event.target.closest('[data-cart-close]');
    if (cartClose) {
      var openCart = document.querySelector('.header-cart[open]');
      if (openCart) openCart.removeAttribute('open');
      document.body.classList.remove('wpp-cart-drawer-open');
      if (cartClose.tagName === 'BUTTON') event.preventDefault();
      return;
    }

    document.querySelectorAll('.header-search[open], .header-cart[open], .header-notifications[open]').forEach(function (details) {
      if (!details.contains(event.target)) details.removeAttribute('open');
    });
  });

  document.querySelectorAll('.header-cart').forEach(function (cart) {
    cart.addEventListener('toggle', function () {
      document.body.classList.toggle('wpp-cart-drawer-open', cart.open);
    });
  });

  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-cart-variation]');
    if (!button || !window.wppTheme || !window.wppTheme.ajaxUrl) return;
    event.preventDefault();
    if (button.classList.contains('is-active')) return;
    var selector = button.closest('.wpp-mini-cart-license-switch');
    if (selector) selector.querySelectorAll('button').forEach(function (item) { item.disabled = true; });

    var request = new URLSearchParams();
    request.set('action', 'wpp_switch_cart_variation');
    request.set('nonce', window.wppTheme.cartNonce || '');
    request.set('cart_item_key', button.getAttribute('data-cart-item-key') || '');
    request.set('variation_id', button.getAttribute('data-cart-variation') || '');
    fetch(window.wppTheme.ajaxUrl, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body: request.toString()
    }).then(function (response) { return response.json(); }).then(function (data) {
      if (!data || !data.fragments) throw new Error('Cart update failed');
      Object.keys(data.fragments).forEach(function (cssSelector) {
        document.querySelectorAll(cssSelector).forEach(function (element) {
          var holder = document.createElement('div');
          holder.innerHTML = data.fragments[cssSelector];
          if (holder.firstElementChild) element.replaceWith(holder.firstElementChild);
        });
      });
      if (window.jQuery) window.jQuery(document.body).trigger('wc_fragments_refreshed');
    }).catch(function () {
      if (selector) selector.querySelectorAll('button').forEach(function (item) { item.disabled = false; });
    });
  });

  function initProductTabs() {
    document.querySelectorAll('[data-wpp-product-tabs]').forEach(function (navigation) {
      var productRoot = navigation.closest('.wpp-single-product');
      if (!productRoot) return;

      var links = Array.prototype.slice.call(navigation.querySelectorAll('[data-wpp-product-tab]'));
      var panels = Array.prototype.slice.call(productRoot.querySelectorAll('.wpp-product-tabs .woocommerce-Tabs-panel'));
      if (!links.length || !panels.length) return;

      function panelFor(link) {
        var panel = document.getElementById(link.getAttribute('aria-controls') || '');
        return panel && productRoot.contains(panel) ? panel : null;
      }

      function activate(link, moveFocus) {
        var activePanel = panelFor(link);
        if (!activePanel) return;

        links.forEach(function (item) {
          var selected = item === link;
          item.setAttribute('aria-selected', selected ? 'true' : 'false');
          item.setAttribute('tabindex', selected ? '0' : '-1');
          item.classList.toggle('is-active', selected);
        });
        panels.forEach(function (panel) {
          var selected = panel === activePanel;
          panel.hidden = !selected;
          panel.classList.toggle('is-active', selected);
        });
        if (moveFocus) link.focus();
      }

      links.forEach(function (link, index) {
        link.addEventListener('click', function (event) {
          event.preventDefault();
          activate(link, false);
        });
        link.addEventListener('keydown', function (event) {
          var nextIndex = index;
          if (event.key === 'ArrowRight') nextIndex = (index + 1) % links.length;
          else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + links.length) % links.length;
          else if (event.key === 'Home') nextIndex = 0;
          else if (event.key === 'End') nextIndex = links.length - 1;
          else return;
          event.preventDefault();
          activate(links[nextIndex], true);
        });
      });

      var initial = links.find(function (link) {
        return window.location.hash && link.getAttribute('href') === window.location.hash;
      }) || links.find(function (link) {
        return link.getAttribute('aria-selected') === 'true';
      }) || links[0];
      activate(initial, false);

      productRoot.querySelectorAll('.wpp-product-media-actions a[href^="#"], .wpp-product-byline__rating[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function () {
          var target = productRoot.querySelector(link.getAttribute('href'));
          var panel = target && target.closest('.woocommerce-Tabs-panel');
          if (!panel) return;
          var panelLink = links.find(function (item) {
            return item.getAttribute('aria-controls') === panel.id;
          });
          if (panelLink) activate(panelLink, false);
        });
      });
    });
  }

  initProductTabs();

  function initProductVariationPickers() {
    document.querySelectorAll('[data-wpp-variation-picker]').forEach(function (picker) {
      var form = picker.closest('form.variations_form');
      if (!form) return;

      var select = document.getElementById(picker.getAttribute('data-select-id') || '');
      if (!select || !form.contains(select)) select = form.querySelector('select[name^="attribute_"]');
      if (!select) return;

      var options = Array.prototype.slice.call(picker.querySelectorAll('[data-wpp-variation-value]'));
      if (!options.length) return;

      form.classList.add('wpp-has-variation-picker');
      select.setAttribute('aria-hidden', 'true');
      select.setAttribute('tabindex', '-1');
      picker.hidden = false;

      function nativeOptionFor(button) {
        var value = button.getAttribute('data-wpp-variation-value') || '';
        var label = (button.getAttribute('data-wpp-variation-label') || '').trim();
        return Array.prototype.slice.call(select.options).find(function (option) {
          return option.value === value || option.textContent.trim() === label;
        });
      }

      function syncOptions() {
        var firstEnabled = options.find(function (button) {
          var option = nativeOptionFor(button);
          return option && !option.disabled;
        });
        options.forEach(function (button) {
          var option = nativeOptionFor(button);
          var selected = !!(option && select.value && option.value === select.value);
          var enabled = !!(option && !option.disabled);
          button.disabled = !enabled;
          button.setAttribute('aria-checked', selected ? 'true' : 'false');
          button.setAttribute('tabindex', selected || (!select.value && button === firstEnabled) ? '0' : '-1');
          button.classList.toggle('is-selected', selected);
        });
      }

      function chooseOption(button) {
        var option = nativeOptionFor(button);
        if (!option || option.disabled) return;
        select.value = option.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        syncOptions();
      }

      options.forEach(function (button, index) {
        button.addEventListener('click', function () {
          chooseOption(button);
        });
        button.addEventListener('keydown', function (event) {
          var direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
          if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(event.key)) return;
          event.preventDefault();
          var enabled = options.filter(function (item) {
            return !item.disabled;
          });
          if (!enabled.length) return;
          var currentIndex = enabled.indexOf(button);
          var nextIndex = (currentIndex + direction + enabled.length) % enabled.length;
          enabled[nextIndex].focus();
          chooseOption(enabled[nextIndex]);
        });
      });

      select.addEventListener('change', syncOptions);
      if (window.jQuery) {
        window.jQuery(form).on('woocommerce_update_variation_values found_variation reset_data', syncOptions);
      }
      syncOptions();
    });
  }

  initProductVariationPickers();

  document.querySelectorAll('[data-wpp-buy-now]').forEach(function (button) {
    button.addEventListener('click', function () {
      var card = button.closest('.wpp-product-purchase-card');
      var form = card && card.querySelector('form.cart');
      if (!form) return;
      form.action = window.wppTheme && window.wppTheme.checkoutUrl ? window.wppTheme.checkoutUrl : form.action;
      if (form.requestSubmit) form.requestSubmit();
      else form.submit();
    });
  });

  document.querySelectorAll('[data-wpp-gallery-modal]').forEach(function (modal) {
    var product = modal.closest('.wpp-single-product');
    var thumbs = Array.prototype.slice.call(modal.querySelectorAll('[data-wpp-gallery-thumb]'));
    var image = modal.querySelector('[data-wpp-gallery-image]');
    var counter = modal.querySelector('[data-wpp-gallery-counter]');
    var closeButton = modal.querySelector('[data-wpp-gallery-close]');
    var current = 0;
    var previousFocus = null;

    function select(index) {
      if (!thumbs.length || !image) return;
      current = (index + thumbs.length) % thumbs.length;
      var thumb = thumbs[current];
      image.src = thumb.getAttribute('data-full') || '';
      image.alt = thumb.getAttribute('data-alt') || '';
      thumbs.forEach(function (item, itemIndex) {
        item.classList.toggle('is-active', itemIndex === current);
        item.setAttribute('aria-current', itemIndex === current ? 'true' : 'false');
      });
      if (counter) counter.textContent = (current + 1) + ' / ' + thumbs.length;
    }

    function open(index) {
      previousFocus = document.activeElement;
      select(typeof index === 'number' ? index : 0);
      modal.hidden = false;
      document.body.classList.add('wpp-gallery-is-open');
      if (closeButton) closeButton.focus();
    }

    function close() {
      modal.hidden = true;
      document.body.classList.remove('wpp-gallery-is-open');
      if (previousFocus && previousFocus.focus) previousFocus.focus();
    }

    thumbs.forEach(function (thumb, index) {
      thumb.addEventListener('click', function () { select(index); });
    });
    modal.querySelector('[data-wpp-gallery-prev]')?.addEventListener('click', function () { select(current - 1); });
    modal.querySelector('[data-wpp-gallery-next]')?.addEventListener('click', function () { select(current + 1); });
    if (closeButton) closeButton.addEventListener('click', close);
    modal.addEventListener('click', function (event) { if (event.target === modal) close(); });
    modal.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') select(current - 1);
      if (event.key === 'ArrowRight') select(current + 1);
    });

    if (product) {
      product.querySelectorAll('[data-wpp-open-product-gallery]').forEach(function (button) {
        button.addEventListener('click', function () { open(0); });
      });
      product.querySelectorAll('.woocommerce-product-gallery__image a').forEach(function (link, index) {
        link.addEventListener('click', function (event) { event.preventDefault(); open(index); });
      });
    }
  });

  document.querySelectorAll('[data-wpp-share-product]').forEach(function (button) {
    button.addEventListener('click', function () {
      var status = button.closest('.wpp-product-media-actions').querySelector('[data-wpp-share-status]');
      var payload = {
        title: button.getAttribute('data-share-title') || document.title,
        url: button.getAttribute('data-share-url') || window.location.href
      };
      if (navigator.share) {
        navigator.share(payload).then(function () {
          if (status) status.textContent = 'Ссылка отправлена.';
        }).catch(function () {});
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(payload.url).then(function () {
          if (status) status.textContent = 'Ссылка скопирована.';
          var label = button.querySelector('span');
          if (label) label.textContent = 'Ссылка скопирована';
        }).catch(function () {
          if (status) status.textContent = payload.url;
        });
      } else if (status) {
        status.textContent = payload.url;
      }
    });
  });

  function initContentFilters(config) {
    var root = document.querySelector(config.root);
    if (!root) return;
    var search = root.querySelector(config.search);
    var groups = Array.prototype.slice.call(root.querySelectorAll(config.group));
    var buttons = Array.prototype.slice.call(root.querySelectorAll(config.filter));
    var empty = root.querySelector(config.empty);
    var active = 'all';

    function update() {
      var query = search ? search.value.trim().toLocaleLowerCase() : '';
      var visibleItems = 0;
      groups.forEach(function (group) {
        var categoryMatches = active === 'all' || group.getAttribute(config.groupAttribute) === active;
        var items = Array.prototype.slice.call(group.querySelectorAll(config.item));
        var visibleInGroup = 0;
        items.forEach(function (item) {
          var searchable = (item.getAttribute(config.searchAttribute) || item.textContent || '').toLocaleLowerCase();
          var visible = categoryMatches && (!query || searchable.indexOf(query) !== -1);
          item.hidden = !visible;
          if (visible) visibleInGroup += 1;
        });
        group.hidden = !categoryMatches || visibleInGroup === 0;
        visibleItems += visibleInGroup;
      });
      if (empty) empty.hidden = visibleItems !== 0;
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        active = button.getAttribute(config.filterAttribute) || 'all';
        buttons.forEach(function (other) {
          var selected = other === button;
          other.classList.toggle('is-active', selected);
          other.setAttribute('aria-pressed', selected ? 'true' : 'false');
        });
        update();
      });
    });
    if (search) search.addEventListener('input', update);
    update();
  }

  initContentFilters({
    root: '#primary', search: '[data-faq-search]', group: '[data-faq-group]', item: '[data-faq-item]',
    filter: '[data-faq-filter]', groupAttribute: 'data-faq-group', filterAttribute: 'data-faq-filter',
    searchAttribute: 'textContent', empty: '[data-faq-empty]'
  });
  initContentFilters({
    root: '#primary', search: '[data-kb-search]', group: '[data-kb-group]', item: '[data-kb-item]',
    filter: '[data-kb-filter]', groupAttribute: 'data-kb-group', filterAttribute: 'data-kb-filter',
    searchAttribute: 'data-kb-search', empty: '[data-kb-empty]'
  });

  document.querySelectorAll('[data-kb-vote]').forEach(function (vote) {
    vote.querySelectorAll('[data-article-vote]').forEach(function (button) {
      button.addEventListener('click', function () {
        var message = vote.querySelector('[data-article-vote-message]');
        if (message) message.textContent = 'Демо-режим: оценка не отправлена и не сохраняется.';
        vote.querySelectorAll('[data-article-vote]').forEach(function (item) {
          item.disabled = true;
        });
      });
    });
  });
})();
