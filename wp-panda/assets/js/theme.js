(function () {
  'use strict';

  var menuToggle = document.querySelector('[data-menu-toggle]');
  var navigation = document.getElementById('site-navigation');

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
