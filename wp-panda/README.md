# Wp Panda — WordPress / WooCommerce theme

Адаптивная классическая тема на основе `html-layout/`. Каталог и карточки товара берут данные из WooCommerce, а корзина, оформление заказа и личный кабинет используют штатную механику WooCommerce.

## Установка

1. Скопируйте каталог `wp-panda/` в `wp-content/themes/` или упакуйте сам каталог в ZIP и загрузите через **Внешний вид → Темы → Добавить новую**.
2. Установите и активируйте WooCommerce.
3. Активируйте тему **Wp Panda**.
4. Завершите мастер WooCommerce, чтобы создать страницы магазина, корзины, оформления заказа и личного кабинета.
5. Откройте **Инструменты → Демо-контент Wp Panda** и нажмите **Импортировать демо-контент**. Если страница записей ещё не выбрана, импортер назначит ею страницу блога; существующую главную страницу, страницу записей и назначенные меню он не меняет.
6. Импортер создаёт демо-меню и назначает его только свободным расположениям **Главное меню** и **Меню в подвале**. Логотип можно задать в **Внешний вид → Настроить → Свойства сайта**.
7. Проверьте и замените демонстрационные цены, тексты и условия до запуска магазина. ZIP-файлы продуктов и реальная система лицензирования в тему не входят.

## Импорт демо-контента

Импортер добавляет 16 товаров WooCommerce, 12 записей журнала, рубрики, страницы FAQ и базы знаний с 21 статьёй, локальные обложки и базовое меню. Повторный запуск пропускает уже импортированные записи и страницы по служебному метаполю `_wpp_demo_key`, не перезаписывает их содержимое или выбранные миниатюры; у демо-товаров он только дополняет теги назначений и совместимости, необходимые фильтрам каталога.

Восемь тем создаются как вариативные товары WooCommerce с вариантами **1 сайт** и **5 сайтов**. В исходном макете указана одна цена на тему, поэтому обе вариации получают эту же демонстрационную цену — импортер не придумывает отсутствующую цену второго варианта. Восемь плагинов создаются как простые виртуальные товары. Цены и тексты — образцы из верстки; товары не содержат ZIP-файлов и не являются готовыми к реальной продаже. Платёжные настройки не меняются. Импорт не создаёт фиктивных пользователей, заказов, ключей лицензий, купонов или корзин.

## WooCommerce и хуки

Переопределения находятся в `woocommerce/` по той же структуре, что и в WooCommerce. Архивы используют штатный цикл и хуки; компоненты карточек, поиска, товара, корзины, оформления заказа и аккаунта разнесены по отдельным шаблонам. Дополнительные части каталога загружаются через `wc_get_template()`, поэтому `archive-product.php` остаётся компактным и не содержит всю разметку страницы.

Переопределены основные шаблоны и компоненты:

- архив, карточка и поиск: `archive-product.php`, `loop/header.php`, `loop/catalog-*.php`, `content-product.php`, `loop/product-*.php`, `loop/loop-start.php`, `loop/loop-end.php`, `loop/add-to-cart.php`, `loop/price.php`, `loop/rating.php`, `loop/sale-flash.php`, `loop/orderby.php`, `loop/result-count.php`, `loop/pagination.php`, `loop/no-products-found.php`, `product-searchform.php` (также используется поиском в шапке);
- товар: `content-single-product.php`, `single-product/product-image.php`, `single-product/product-thumbnails.php`, `single-product/title.php`, `single-product/price.php`, `single-product/rating.php`, `single-product/short-description.php`, `single-product/meta.php`, `single-product/sale-flash.php`, `single-product/tabs/{tabs,description,additional-information}.php` и шаблоны кнопок добавления в корзину;
- корзина и оформление: `cart/cart.php`, `cart/mini-cart.php`, `cart/cart-empty.php`, `cart/cart-totals.php`, `cart/proceed-to-checkout-button.php`, `checkout/form-checkout.php`;
- аккаунт: `myaccount/my-account.php`, `myaccount/navigation.php`.

Изображение, кнопки, цена, рейтинг и описания карточки берутся непосредственно из `WC_Product`, а добавление в корзину сохраняет стандартные WooCommerce URL, классы и AJAX-атрибуты. Разметка карточки намеренно повторяет компонент из исходной верстки. Тема не заменяет обработчики корзины, заказов, платежей, вариаций, полей или эндпоинтов. Навигация аккаунта строится через `wc_get_account_menu_items()`, поэтому эндпоинты, добавленные расширениями (например, лицензии, избранное или поддержка), не отбрасываются.

WordPress, Gutenberg и WooCommerce сначала подключают собственные стили штатным способом. После них, с поздним приоритетом `999`, тема подключает единственный визуальный файл `assets/css/layout.css` — точную копию `html-layout/styles.css`. Отдельных CSS-слоёв и переопределений темы нет. Скрипты WooCommerce, AJAX-корзина, вариации и стили Cart/Checkout Blocks не отключаются.

В шаблонах сохранены, в частности, стандартные группы действий:

- архив/товар: `woocommerce_before_main_content`, `woocommerce_shop_loop_header`, `woocommerce_before_shop_loop`, `woocommerce_shop_loop`, `woocommerce_after_shop_loop`, `woocommerce_no_products_found`, `woocommerce_sidebar`, `woocommerce_before_shop_loop_item`, `woocommerce_before_shop_loop_item_title`, `woocommerce_shop_loop_item_title`, `woocommerce_after_shop_loop_item_title`, `woocommerce_after_shop_loop_item`, все стандартные действия одиночного товара;
- корзина: `woocommerce_before_cart`, `woocommerce_before_cart_table`, `woocommerce_before_cart_contents`, `woocommerce_cart_contents`, `woocommerce_cart_coupon`, `woocommerce_cart_actions`, `woocommerce_after_cart_contents`, `woocommerce_after_cart_table`, `woocommerce_before_cart_collaterals`, `woocommerce_cart_collaterals`, `woocommerce_after_cart` и хуки строки товара;
- checkout: `woocommerce_before_checkout_form`, `woocommerce_checkout_before_customer_details`, `woocommerce_checkout_billing`, `woocommerce_checkout_shipping`, `woocommerce_checkout_after_customer_details`, `woocommerce_checkout_before_order_review_heading`, `woocommerce_checkout_before_order_review`, `woocommerce_checkout_order_review`, `woocommerce_checkout_after_order_review`, `woocommerce_after_checkout_form`;
- кабинет: `woocommerce_before_my_account`, `woocommerce_account_navigation`, `woocommerce_account_content`, `woocommerce_after_my_account`, `woocommerce_before_account_navigation`, `woocommerce_after_account_navigation`.

### Cart/Checkout Blocks и shortcode-страницы

WooCommerce Blocks используют собственный React-рендер и не загружают PHP overrides корзины/checkout. Тема не мешает работе блоков и добавляет для них базовую стилизацию. Если необходимы именно приведённые PHP-шаблоны `cart/cart.php` и `checkout/form-checkout.php`, используйте классические страницы с шорткодами WooCommerce: `[woocommerce_cart]`, `[woocommerce_checkout]` и `[woocommerce_my_account]`.

## Контент и границы темы

Страница блога использует записи WordPress; обычные страницы (FAQ, база знаний и другие разделы) выводят Gutenberg-контент. Страницы лицензий, тикетов и избранного в исходной верстке требуют соответствующих бизнес-плагинов/эндпоинтов: тема отображает зарегистрированные WooCommerce endpoints, но сама не создает систему лицензирования, обращений или wishlist.

`assets/css/layout.css` — исходные utility-стили из `html-layout/styles.css`. React bundle `html-layout/app.js` намеренно не подключается: он рассчитан на автономный SPA-снимок и не должен управлять DOM WordPress. Интерактивность меню и раскрывающихся панелей реализована в небольшом `assets/js/theme.js`.
