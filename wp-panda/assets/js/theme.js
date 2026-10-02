/**
 * Wp Panda theme interactions: header states, search, notifications,
 * cart drawer, wishlist, accordions, product tabs and gallery.
 */
(function () {
	'use strict';

	var doc = document;
	var body = doc.body;

	function qs(sel, root) { return (root || doc).querySelector(sel); }
	function fmtAmount(n) {
		var parts = Number(n).toFixed(Math.abs(n % 1) > 0.001 ? 2 : 0).split('.');
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
		return parts.join(',').split(' ').join(' ') + ' ₽';
	}
	function qsa(sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); }

	/* ---------- Header scroll state ---------- */
	var header = qs('#site-header');
	if (header) {
		var onScroll = function () {
			var scrolled = window.scrollY > 4;
			header.classList.toggle('bg-white/85', scrolled);
			header.classList.toggle('shadow-[0_1px_0_rgba(20,20,28,0.06)]', scrolled);
			header.classList.toggle('backdrop-blur-xl', scrolled);
			header.classList.toggle('bg-transparent', !scrolled);
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
	}

	/* ---------- Popover helpers ---------- */
	function closeAll(except) {
		qsa('[data-search-panel]').forEach(function (p) { if (except !== 'search') p.classList.add('hidden'); });
		qsa('[data-notifications-panel]').forEach(function (p) { if (except !== 'notif') p.classList.add('hidden'); });
		if (except !== 'menu') closeMobileMenu();
	}

	/* ---------- Mobile menu ---------- */
	var menuPanel = qs('[data-mobile-menu]');
	var menuToggle = qs('[data-menu-toggle]');
	function closeMobileMenu() {
		if (!menuPanel) { return; }
		menuPanel.classList.add('hidden');
		if (menuToggle) {
			menuToggle.setAttribute('aria-expanded', 'false');
			var open = qs('[data-menu-icon-open]', menuToggle);
			var close = qs('[data-menu-icon-close]', menuToggle);
			if (open) { open.classList.remove('hidden'); }
			if (close) { close.classList.add('hidden'); }
		}
		if (header) { header.classList.remove('bg-white/85', 'shadow-[0_1px_0_rgba(20,20,28,0.06)]', 'backdrop-blur-xl'); if (window.scrollY <= 4) { header.classList.add('bg-transparent'); } }
	}
	if (menuToggle && menuPanel) {
		menuToggle.addEventListener('click', function (e) {
			e.stopPropagation();
			var isOpen = !menuPanel.classList.contains('hidden');
			closeAll('menu');
			if (isOpen) { closeMobileMenu(); return; }
			menuPanel.classList.remove('hidden');
			menuToggle.setAttribute('aria-expanded', 'true');
			var open = qs('[data-menu-icon-open]', menuToggle);
			var close = qs('[data-menu-icon-close]', menuToggle);
			if (open) { open.classList.add('hidden'); }
			if (close) { close.classList.remove('hidden'); }
			if (header) { header.classList.add('bg-white/85', 'shadow-[0_1px_0_rgba(20,20,28,0.06)]', 'backdrop-blur-xl'); header.classList.remove('bg-transparent'); }
		});
	}

	/* ---------- Search panel ---------- */
	var searchToggle = qs('[data-search-toggle]');
	var searchPanel = qs('[data-search-panel]');
	var searchInput = qs('[data-search-input]');
	var searchLabel = qs('[data-search-label]');
	var searchResults = qs('[data-search-results]');
	var searchCatalog = qs('[data-search-catalog]');
	var searchDefault = searchResults ? searchResults.innerHTML : '';
	var searchTimer = null;

	if (searchToggle && searchPanel) {
		searchToggle.addEventListener('click', function (e) {
			e.stopPropagation();
			var isOpen = !searchPanel.classList.contains('hidden');
			closeAll('search');
			if (isOpen) { searchPanel.classList.add('hidden'); return; }
			searchPanel.classList.remove('hidden');
			if (searchInput) { searchInput.focus(); }
		});
	}
	if (searchInput) {
		searchInput.addEventListener('input', function () {
			if (searchTimer) { clearTimeout(searchTimer); }
			searchTimer = setTimeout(runSearch, 200);
		});
	}
	function runSearch() {
		var q = searchInput.value.trim();
		if (!q) {
			searchLabel.textContent = (window.wppTheme && wppTheme.strings && wppTheme.strings.popular) || 'Популярное';
			searchResults.innerHTML = searchDefault;
			if (searchCatalog) { searchCatalog.classList.add('hidden'); searchCatalog.classList.remove('flex'); }
			return;
		}
		var fd = new FormData();
		fd.append('action', 'wpp_search');
		fd.append('nonce', wppTheme.searchNonce);
		fd.append('q', q);
		fetch(wppTheme.ajaxUrl, { method: 'POST', body: fd, credentials: 'same-origin' })
			.then(function (r) { return r.json(); })
			.then(function (data) {
				if (!data.success) { return; }
				searchLabel.textContent = 'Найдено: ' + data.data.count;
				searchResults.innerHTML = data.data.rows || '';
				if (searchCatalog) { searchCatalog.classList.remove('hidden'); searchCatalog.classList.add('flex'); }
			}).catch(function () {});
	}

	/* ---------- Review rating picker ---------- */
	var ratingBox = qs('[data-review-rating]');
	if (ratingBox) {
		var ratingStars = qsa('[data-star]', ratingBox);
		var ratingInput = ratingBox.querySelector('input[name="rating"]');
		var ratingError = ratingBox.querySelector('[data-rating-error]');
		var setRating = function (value) {
			ratingStars.forEach(function (btn) {
				var active = parseInt(btn.getAttribute('data-star'), 10) <= value;
				btn.classList.toggle('text-brand', active);
				btn.classList.toggle('text-line', !active);
				var svg = btn.querySelector('svg');
				if (svg) { svg.classList.toggle('fill-brand', active); }
			});
			if (ratingInput) { ratingInput.value = String(value); }
			var wcSelect = document.getElementById('rating');
			if (wcSelect && wcSelect !== ratingInput) { wcSelect.value = String(value); }
			if (ratingError) { ratingError.classList.add('hidden'); }
		};
		ratingStars.forEach(function (btn) {
			btn.addEventListener('click', function () { setRating(parseInt(btn.getAttribute('data-star'), 10)); });
		});
		var ratingForm = ratingBox.closest('form');
		if (ratingForm) {
			ratingForm.addEventListener('submit', function (e) {
				if (ratingInput && !parseInt(ratingInput.value, 10)) {
					e.preventDefault();
					if (ratingError) { ratingError.classList.remove('hidden'); }
				}
			});
		}
	}

	/* ---------- Notifications ---------- */
	var notifToggle = qs('[data-notifications-toggle]');
	var notifPanel = qs('[data-notifications-panel]');
	if (notifToggle && notifPanel) {
		notifToggle.addEventListener('click', function (e) {
			e.stopPropagation();
			var isOpen = !notifPanel.classList.contains('hidden');
			closeAll('notif');
			notifPanel.classList.toggle('hidden', isOpen);
		});
	}
	var notifClearBtn = qs('[data-notifications-clear]');
	if (notifClearBtn) {
		notifClearBtn.addEventListener('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			notifClearBtn.disabled = true;
			var fd = new FormData();
			fd.append('action', 'wpp_clear_notifications');
			fd.append('nonce', wppTheme.notifNonce);
			fetch(wppTheme.ajaxUrl, { method: 'POST', credentials: 'same-origin', body: fd })
				.then(function (res) { return res.json(); })
				.then(function () {
					var list = qs('[data-notifications-list]');
					var empty = qs('[data-notifications-empty]');
					var count = qs('[data-notifications-count]');
					var badge = qs('[data-notifications-badge]');
					if (list) { list.classList.add('hidden'); }
					if (empty) { empty.classList.remove('hidden'); }
					if (count) { count.remove(); }
					if (badge) { badge.remove(); }
				})
				.catch(function () {})
				.finally(function () { notifClearBtn.disabled = false; });
		});
	}

	doc.addEventListener('click', function (e) {
		if (searchPanel && !searchPanel.classList.contains('hidden') && !searchPanel.contains(e.target) && !qs('[data-search-toggle]').contains(e.target)) { searchPanel.classList.add('hidden'); }
		if (notifPanel && !notifPanel.classList.contains('hidden') && !notifPanel.contains(e.target) && !qs('[data-notifications-toggle]').contains(e.target)) { notifPanel.classList.add('hidden'); }
	});
	doc.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') {
			if (searchPanel) { searchPanel.classList.add('hidden'); }
			if (notifPanel) { notifPanel.classList.add('hidden'); }
			closeMobileMenu();
			closeCart();
		}
	});

	/* ---------- Cart drawer ---------- */
	var drawer = qs('[data-cart-drawer]');
	var backdrop = qs('[data-cart-backdrop]');

	function openCart() {
		if (!drawer) { return; }
		drawer.classList.remove('translate-x-[110%]');
		drawer.setAttribute('aria-hidden', 'false');
		if (backdrop) { backdrop.classList.remove('pointer-events-none', 'opacity-0'); }
		body.style.overflow = 'hidden';
		closeAll();
	}
	function closeCart() {
		if (!drawer) { return; }
		drawer.classList.add('translate-x-[110%]');
		drawer.setAttribute('aria-hidden', 'true');
		if (backdrop) { backdrop.classList.add('pointer-events-none', 'opacity-0'); }
		body.style.overflow = '';
	}
	qsa('[data-cart-open]').forEach(function (btn) { btn.addEventListener('click', openCart); });
	qsa('[data-cart-close]').forEach(function (btn) { btn.addEventListener('click', closeCart); });
	if (backdrop) { backdrop.addEventListener('click', closeCart); }

	/* Refresh drawer content + counters from the server. */
	function refreshCartUi() {
		var fd = new FormData();
		fd.append('action', 'wpp_mini_cart');
		fd.append('nonce', wppTheme.cartNonce);
		fetch(wppTheme.ajaxUrl, { method: 'POST', body: fd, credentials: 'same-origin' })
			.then(function (r) { return r.json(); })
			.then(function (data) {
				if (!data.success) { return; }
				var content = qs('.widget_shopping_cart_content');
				if (content) { content.innerHTML = data.data.html; }
				qsa('.wpp-cart-count').forEach(function (el) {
					if (data.data.count > 0) { el.textContent = data.data.count; el.style.display = ''; } else { el.style.display = 'none'; }
				});
				var subtitle = qs('.wpp-cart-drawer__subtitle');
				if (subtitle) { subtitle.textContent = data.data.subtitle; }
				var total = qs('.wpp-cart-total');
				if (total) { total.innerHTML = data.data.total; }
			}).catch(function () {});
	}

	/* WC add-to-cart script broadcasts this event after AJAX adds. */
	if (window.jQuery) {
		jQuery(doc.body).on('added_to_cart', function () { refreshCartUi(); openCart(); });
	}

	/* Delegated drawer actions. */
	doc.addEventListener('click', function (e) {
		var removeBtn = e.target.closest('[data-cart-remove]');
		if (removeBtn) {
			e.preventDefault();
			cartAction('wpp_cart_remove', { key: removeBtn.getAttribute('data-cart-remove') });
			return;
		}
		var varBtn = e.target.closest('[data-cart-variation]');
		if (varBtn) {
			e.preventDefault();
			var parts = varBtn.getAttribute('data-cart-variation').split('|');
			cartAction('wpp_cart_variation', { key: parts[0], variation: parts[1] });
		}
	});
	doc.addEventListener('submit', function (e) {
		var form = e.target.closest('[data-coupon-form]');
		if (!form) { return; }
		e.preventDefault();
		var input = qs('input', form);
		cartAction('wpp_apply_coupon', { code: input ? input.value : '' }, form);
	});
	function cartAction(action, extra, form) {
		var fd = new FormData();
		fd.append('action', action);
		fd.append('nonce', wppTheme.cartNonce);
		Object.keys(extra || {}).forEach(function (k) { fd.append(k, extra[k]); });
		fetch(wppTheme.ajaxUrl, { method: 'POST', body: fd, credentials: 'same-origin' })
			.then(function (r) { return r.json(); })
			.then(function (data) {
				if (form) {
					var msg = qs('[data-coupon-message]', form.parentNode) || form;
					if (data.data && data.data.notice) {
						var span = qs('[data-coupon-message]', form.closest('.wpp-mini-cart') || doc);
						if (span) { span.textContent = data.data.notice; span.classList.remove('hidden'); }
					}
				}
				refreshCartUi();
			}).catch(function () {});
	}

	/* ---------- Wishlist ---------- */
	doc.addEventListener('click', function (e) {
		var btn = e.target.closest('[data-wpp-wishlist]');
		if (!btn) { return; }
		e.preventDefault();
		var fd = new FormData();
		fd.append('action', 'wpp_toggle_wishlist');
		fd.append('nonce', wppTheme.wishlistNonce);
		fd.append('product_id', btn.getAttribute('data-wpp-wishlist'));
		fetch(wppTheme.ajaxUrl, { method: 'POST', body: fd, credentials: 'same-origin' })
			.then(function (r) { return r.json(); })
			.then(function (data) {
				if (!data.success) { return; }
				qsa('[data-wpp-wishlist="' + btn.getAttribute('data-wpp-wishlist') + '"]').forEach(function (b) {
					b.classList.toggle('text-rose-500', data.data.active);
					b.classList.toggle('text-muted', !data.data.active);
					b.setAttribute('aria-pressed', data.data.active ? 'true' : 'false');
				});
			}).catch(function () {});
	});

	/* ---------- Copy buttons ---------- */
	doc.addEventListener('click', function (e) {
		var btn = e.target.closest('[data-wpp-copy]');
		if (!btn) { return; }
		e.preventDefault();
		var target = doc.querySelector(btn.getAttribute('data-wpp-copy'));
		var text = target ? target.textContent.trim() : '';
		if (navigator.clipboard && text) {
			navigator.clipboard.writeText(text).then(function () {
				var label = qs('[data-copy-label]', btn);
				if (label) {
					var original = label.textContent;
					label.textContent = 'Скопировано';
					setTimeout(function () { label.textContent = original; }, 1600);
				}
			});
		}
	});

	/* ---------- Accordions (FAQ / KB) ---------- */
	doc.addEventListener('click', function (e) {
		var head = e.target.closest('[data-accordion]');
		if (!head) { return; }
		var item = head.closest('[data-accordion-item]');
		if (!item) { return; }
		var content = qs('[data-accordion-content]', item);
		var isOpen = item.classList.contains('wpp-open');
		item.classList.toggle('wpp-open', !isOpen);
		if (content) {
			content.style.maxHeight = isOpen ? '0px' : content.scrollHeight + 'px';
		}
	});

	/* ---------- Product tabs ---------- */
	doc.addEventListener('click', function (e) {
		var tab = e.target.closest('[data-product-tab]');
		if (!tab) { return; }
		e.preventDefault();
		var id = tab.getAttribute('data-product-tab');
		qsa('[data-product-tab]').forEach(function (t) {
			var active = t === tab;
			if (t.hasAttribute('role') && t.getAttribute('role') === 'tab') {
				t.setAttribute('aria-selected', active ? 'true' : 'false');
				t.setAttribute('tabindex', active ? '0' : '-1');
				t.classList.toggle('border-brand', active);
				t.classList.toggle('text-ink', active);
				t.classList.toggle('border-transparent', !active);
				t.classList.toggle('text-muted', !active);
				t.classList.toggle('hover:text-ink', !active);
			} else {
				t.classList.toggle('bg-ink', active);
				t.classList.toggle('text-white', active);
				t.classList.toggle('text-ink/65', !active);
				t.classList.toggle('hover:text-ink', !active);
			}
		});
		qsa('[data-product-panel]').forEach(function (p) {
			p.classList.toggle('hidden', p.getAttribute('data-product-panel') !== id);
		});
		if (tab.hasAttribute('data-scroll-to-tabs')) {
			var bar = qs('[role="tablist"]');
			if (bar) { bar.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
		}
	});

	/* ---------- License radios on single product (variation switch) ---------- */
	function paintLicenseLabels(form) {
		qsa('input[data-license-option]', form).forEach(function (input) {
			var label = input.closest('label');
			if (!label) { return; }
			var active = input.checked;
			label.classList.toggle('border-brand', active);
			label.classList.toggle('bg-brand-50', active);
			label.classList.toggle('border-line', !active);
			label.classList.toggle('hover:border-ink/25', !active);
		});
	}
	doc.addEventListener('change', function (e) {
		var input = e.target.closest('input[data-license-option]');
		if (!input) { return; }
		var form = input.closest('form.cart');
		if (!form) { return; }
		var select = qs('select[name^="attribute_"]', form);
		if (select && select.value !== input.value) {
			select.value = input.value;
			if (window.jQuery) { jQuery(select).trigger('change'); }
		}
		paintLicenseLabels(form);
	});

	/* Sync radios and price when WC variation form resolves a selection. */
	if (window.jQuery) {
		jQuery(doc.body).on('show_variation', function (event, variation) {
			var form = event.target;
			if (!variation || !variation.attributes) { return; }
			Object.keys(variation.attributes).forEach(function (attr) {
				var value = variation.attributes[attr];
				qsa('input[data-license-option]', form).forEach(function (input) {
					input.checked = input.value === value;
				});
			});
			paintLicenseLabels(form);
			var priceEl = qs('.wpp-buy-price', form);
			if (priceEl && variation.display_price) {
				priceEl.innerHTML = fmtAmount(variation.display_price);
			}
			var regEl = qs('.wpp-buy-regular', form);
			if (regEl) {
				if (variation.display_regular_price && variation.display_regular_price > variation.display_price) {
					regEl.innerHTML = fmtAmount(variation.display_regular_price);
					regEl.style.display = '';
				} else {
					regEl.style.display = 'none';
				}
			}
			var mobilePrice = qs('.wpp-mobile-buy-price');
			if (mobilePrice && variation.display_price) { mobilePrice.innerHTML = fmtAmount(variation.display_price); }
			var mobileLabel = qs('.wpp-mobile-buy-label');
			if (mobileLabel) {
				var base = mobileLabel.textContent.split('·')[0].trim();
				var chosen = '';
				Object.keys(variation.attributes).forEach(function (attr) { chosen = variation.attributes[attr]; });
				mobileLabel.textContent = base + ' · ' + chosen;
			}
		});
	}

	/* Buy now: add then redirect to checkout. */
	doc.addEventListener('click', function (e) {
		var btn = e.target.closest('[data-buy-now]');
		if (!btn) { return; }
		var form = btn.closest('form.cart');
		var submit = form && qs('.single_add_to_cart_button, .add_to_cart_button', form);
		if (submit) { submit.click(); }
		setTimeout(function () { window.location.href = wppTheme.checkoutUrl; }, 600);
	});

	/* Mobile bar: add a variable product's first variation via plain POST. */
	doc.addEventListener('click', function (e) {
		var btn = e.target.closest('button.wpp-add-variable');
		if (!btn) { return; }
		var productId = btn.getAttribute('data-product_id');
		var variationId = btn.getAttribute('data-variation_id');
		if (!productId) { return; }
		btn.disabled = true;
		var body = new URLSearchParams();
		body.append('add-to-cart', productId);
		if (variationId) { body.append('variation_id', variationId); }
		body.append('quantity', btn.getAttribute('data-quantity') || '1');
		fetch(window.location.href, { method: 'POST', credentials: 'same-origin', body: body })
			.then(function () {
				refreshCartUi();
				openCart();
			})
			.catch(function () {})
			.finally(function () { btn.disabled = false; });
	});

	/* ---------- Product media: preview vs screenshots ---------- */
	doc.addEventListener('click', function (e) {
		var preview = e.target.closest('[data-media-preview]');
		var shots = e.target.closest('[data-media-screenshots]');
		if (!preview && !shots) { return; }
		var stage = qs('[data-media-stage]');
		if (!stage) { return; }
		var art = qs('[data-media-art-inner]', stage) || stage.querySelector(':scope > div:not(.wpp-screenshot)');
		var list = qsa('.wpp-screenshot', stage);
		if (preview) {
			list.forEach(function (img) { img.classList.add('hidden'); });
			if (art) { art.classList.remove('hidden'); }
			return;
		}
		if (!list.length) { return; }
		var visible = list.filter(function (img) { return !img.classList.contains('hidden'); })[0];
		var nextIndex = visible ? (list.indexOf(visible) + 1) % list.length : 0;
		if (art) { art.classList.add('hidden'); }
		list.forEach(function (img, i) { img.classList.toggle('hidden', i !== nextIndex); });
	});

	/* Share: copy product link. */
	doc.addEventListener('click', function (e) {
		var share = e.target.closest('[data-wpp-copy-link]');
		if (!share) { return; }
		e.preventDefault();
		if (navigator.clipboard) {
			navigator.clipboard.writeText(share.getAttribute('data-wpp-copy-target') || window.location.href);
		}
	});

	/* ---------- Gallery thumbnails ---------- */
	doc.addEventListener('click', function (e) {
		var thumb = e.target.closest('[data-gallery-thumb]');
		if (!thumb) { return; }
		e.preventDefault();
		var src = thumb.getAttribute('data-gallery-thumb');
		var srcset = thumb.getAttribute('data-gallery-srcset') || '';
		var main = qs('[data-gallery-main]');
		if (main && src) {
			main.setAttribute('src', src);
			if (srcset) { main.setAttribute('srcset', srcset); }
		}
		qsa('[data-gallery-thumb]').forEach(function (t) {
			t.classList.toggle('ring-2', t === thumb);
			t.classList.toggle('ring-brand', t === thumb);
			t.classList.toggle('border-transparent', t === thumb);
			t.classList.toggle('border-line', t !== thumb);
		});
	});

	/* ---------- Catalog view toggle ---------- */
	doc.addEventListener('click', function (e) {
		var view = e.target.closest('[data-catalog-view]');
		if (!view) { return; }
		var mode = view.getAttribute('data-catalog-view');
		var grid = qs('[data-catalog-grid]');
		if (!grid) { return; }
		qsa('[data-catalog-view]').forEach(function (v) {
			var active = v === view;
			v.setAttribute('aria-pressed', active ? 'true' : 'false');
			v.classList.toggle('bg-ink', active);
			v.classList.toggle('text-white', active);
			v.classList.toggle('text-muted', !active);
			v.classList.toggle('hover:text-ink', !active);
		});
		if (mode === 'list') {
			grid.classList.remove('sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
			grid.classList.add('grid-cols-1');
		} else {
			grid.classList.add('sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
			grid.classList.remove('grid-cols-1');
		}
	});


	/* ---------- Account: order rows live filter ---------- */
	var orderSearch = qs('[data-order-search]');
	if (orderSearch) {
		orderSearch.addEventListener('input', function () {
			var q = orderSearch.value.trim().toLowerCase();
			qsa('[data-order-row]').forEach(function (row) {
				row.classList.toggle('hidden', !!q && row.textContent.toLowerCase().indexOf(q) === -1);
			});
		});
	}

	/* ---------- Account: reveal license key ---------- */
	doc.addEventListener('click', function (e) {
		var btn = e.target.closest('[data-license-reveal]');
		if (!btn) { return; }
		var code = btn.parentElement && btn.parentElement.querySelector('[data-license-key]');
		if (!code) { return; }
		var full = code.getAttribute('data-full');
		if (code.getAttribute('data-shown') === '1') {
			code.textContent = full.substring(0, 4) + '-••••-••••-' + full.substring(full.length - 4);
			code.setAttribute('data-shown', '0');
		} else {
			code.textContent = full;
			code.setAttribute('data-shown', '1');
		}
	});


	/* ---------- FAQ tabs and search ---------- */
	doc.addEventListener('click', function (e) {
		var tab = e.target.closest('[data-faq-tab]');
		if (!tab) { return; }
		qsa('[data-faq-tab]').forEach(function (t) {
			var active = t === tab;
			t.classList.toggle('bg-ink', active);
			t.classList.toggle('text-white', active);
			t.classList.toggle('shadow-[0_6px_16px_-8px_rgba(20,20,28,0.6)]', active);
			t.classList.toggle('text-ink/65', !active);
			t.classList.toggle('hover:text-ink', !active);
			var counter = t.querySelectorAll('span');
			if (counter.length) {
				counter[counter.length - 1].classList.toggle('text-white/55', active);
				counter[counter.length - 1].classList.toggle('text-muted', !active);
			}
		});
		var cat = tab.getAttribute('data-faq-tab');
		qsa('[data-faq-section]').forEach(function (section) {
			section.classList.toggle('hidden', cat !== 'all' && section.getAttribute('data-faq-section') !== cat);
		});
	});
	var faqSearch = qs('[data-faq-search]');
	if (faqSearch) {
		faqSearch.addEventListener('input', function () {
			var q = faqSearch.value.trim().toLowerCase();
			qsa('[data-faq-item]').forEach(function (item) {
				item.classList.toggle('hidden', !!q && item.textContent.toLowerCase().indexOf(q) === -1);
			});
			qsa('[data-faq-section]').forEach(function (section) {
				var visible = section.querySelectorAll('[data-faq-item]:not(.hidden)').length;
				if (q) { section.classList.toggle('hidden', !visible); }
			});
		});
	}

	/* ---------- Home featured tabs ---------- */
	doc.addEventListener('click', function (e) {
		var tab = e.target.closest('[data-home-tab]');
		if (!tab) { return; }
		qsa('[data-home-tab]').forEach(function (t) {
			var active = t === tab;
			t.classList.toggle('bg-ink', active);
			t.classList.toggle('text-white', active);
			t.classList.toggle('shadow-[0_6px_16px_-8px_rgba(20,20,28,0.6)]', active);
			t.classList.toggle('text-ink/65', !active);
			t.classList.toggle('hover:text-ink', !active);
		});
		var kind = tab.getAttribute('data-home-tab');
		qsa('[data-home-card]').forEach(function (card) {
			card.classList.toggle('hidden', kind !== 'all' && card.getAttribute('data-home-card') !== kind);
		});
	});


	/* ---------- Checkout: sidebar CTA submits the checkout form ---------- */
	doc.addEventListener('click', function (e) {
		var cta = e.target.closest('[data-checkout-submit]');
		if (!cta) { return; }
		e.preventDefault();
		var place = qs('#place_order');
		if (place) {
			place.click();
		} else {
			var form = qs('form.checkout');
			if (form) { form.requestSubmit ? form.requestSubmit() : form.submit(); }
		}
	});

	/* ---------- Newsletter subscribe ---------- */
	doc.addEventListener('submit', function (e) {
		var form = e.target.closest('[data-subscribe-form]');
		if (!form) { return; }
		e.preventDefault();
		var email = qs('input[type="email"]', form);
		var message = qs('[data-subscribe-message]', form.parentElement ? form.parentElement : doc);
		if (!message) { message = form.querySelector('[data-subscribe-message]'); }
		if (!email || !email.value) { return; }
		var button = qs('button', form);
		if (button) { button.disabled = true; }
		var body = new URLSearchParams();
		body.append('action', 'wpp_subscribe');
		body.append('email', email.value);
		fetch(wppTheme.ajaxUrl, { method: 'POST', credentials: 'same-origin', body: body })
			.then(function (r) { return r.json(); })
			.then(function (res) {
				if (message) {
					message.classList.remove('hidden');
					message.textContent = (res && res.data && res.data.message) ? res.data.message : '';
					message.classList.toggle('text-brand', !!(res && res.success));
					message.classList.toggle('text-rose-600', !(res && res.success));
				}
				if (res && res.success && email) { email.value = ''; }
			})
			.catch(function () {
				if (message) {
					message.classList.remove('hidden');
					message.textContent = 'Не получилось. Попробуйте ещё раз.';
				}
			})
			.finally(function () { if (button) { button.disabled = false; } });
	});

	/* ---------- Variable product add-to-cart without reload ---------- */
	doc.addEventListener('submit', function (e) {
		var form = e.target.closest('form.wpp-add-variable');
		if (!form) { return; }
		e.preventDefault();
		var button = qs('.single_add_to_cart_button', form);
		if (button) { button.disabled = true; }
		fetch(form.getAttribute('action') || window.location.href, {
			method: 'POST',
			credentials: 'same-origin',
			body: new FormData(form),
		}).then(function () {
			if (typeof refreshCartUi === 'function') { refreshCartUi(); }
			if (typeof openCart === 'function') { openCart(); }
			qsa('.wpp-buy-box [data-cart-open], section.item-buy [data-cart-open]').forEach(function (el) {
				el.classList.remove('hidden');
			});
		}).catch(function () {}).finally(function () {
			if (button) { button.disabled = false; }
		});
	});
})();
