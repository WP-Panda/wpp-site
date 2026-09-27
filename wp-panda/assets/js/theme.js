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

    document.querySelectorAll('.header-search[open], .header-cart[open]').forEach(function (details) {
      details.removeAttribute('open');
    });
  });

  document.addEventListener('click', function (event) {
    document.querySelectorAll('.header-search[open], .header-cart[open]').forEach(function (details) {
      if (!details.contains(event.target)) details.removeAttribute('open');
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

  document.querySelectorAll('[data-wpp-open-product-gallery]').forEach(function (button) {
    button.addEventListener('click', function () {
      var product = button.closest('.wpp-single-product');
      if (!product) return;
      var galleryTrigger = product.querySelector('.woocommerce-product-gallery__trigger');
      var imageLink = product.querySelector('.woocommerce-product-gallery__image a');
      if (galleryTrigger) galleryTrigger.click();
      else if (imageLink) imageLink.click();
      else {
        var image = product.querySelector('.woocommerce-product-gallery__image img');
        if (image) image.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
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
