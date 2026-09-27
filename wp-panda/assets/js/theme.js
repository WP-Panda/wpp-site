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
})();
