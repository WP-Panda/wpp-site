# Wp Panda — WordPress / WooCommerce theme

Адаптивная классическая тема на основе `html-layout/`. Каталог и карточки товара берут данные из WooCommerce, а корзина, оформление заказа и личный кабинет используют штатную механику WooCommerce.

## Установка

1. Скопируйте каталог `wp-panda/` в `wp-content/themes/` или упакуйте сам каталог в ZIP и загрузите через **Внешний вид → Темы → Добавить новую**.
2. Установите и активируйте WooCommerce.
3. Активируйте тему **Wp Panda**.
4. Завершите мастер WooCommerce, чтобы создать страницы магазина, корзины, оформления заказа и личного кабинета.
5. В **Настройки → Чтение** выберите статическую главную и страницу записей, если нужен отдельный блог. Главная темы автоматически показывает популярные товары и последние записи.
6. Создайте меню и назначьте его расположениям **Главное меню** и **Меню в подвале**. Логотип можно задать в **Внешний вид → Настроить → Свойства сайта**.
7. Добавьте товары, изображения и категории WooCommerce. У карточек товара и каталога нет демо-данных: они наполняются из реального каталога.

## WooCommerce и хуки

Переопределения находятся только в `woocommerce/`. В файлах каталога, карточки, товара, корзины, оформления заказа и аккаунта оставлены точки расширения WooCommerce. Тема не удаляет стандартные действия WooCommerce и не подменяет обработчики корзины, заказов, платежей, вариаций, полей или эндпоинтов.

Переопределены:

- `archive-product.php`, `content-product.php`, `content-single-product.php`;
- `cart/cart.php`;
- `checkout/form-checkout.php`;
- `myaccount/my-account.php`, `myaccount/navigation.php`.

Штатные шаблоны WooCommerce используются для галереи и изображений товара, вариантов добавления в корзину, вкладок/отзывов, итогов корзины, полей и способов оплаты, страницы заказа и содержимого эндпоинтов кабинета. Навигация аккаунта строится через `wc_get_account_menu_items()`, поэтому эндпоинты, зарегистрированные расширениями (например, лицензии, избранное или поддержка), не отбрасываются.

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
