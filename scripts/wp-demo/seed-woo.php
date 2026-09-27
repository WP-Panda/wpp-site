<?php
/**
 * Фаза 2 сидирования: товары WooCommerce из демо-каталога темы.
 * Запускается отдельным запросом — WooCommerce уже активен и установлен.
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', '/www/' );
	$_SERVER['HTTP_HOST']    = 'localhost:8080';
	$_SERVER['REQUEST_URI'] = '/';
	require ABSPATH . 'wp-load.php';
}

if ( get_option( 'wpp_products_seeded' ) ) {
	echo "товары уже созданы\n";
	exit;
}

if ( ! class_exists( 'WooCommerce' ) ) {
	echo "WooCommerce не активен\n";
	exit;
}

require_once ABSPATH . 'wp-admin/includes/plugin.php';

/** Категория товаров. */
function wpp_seed_product_cat( $name ) {
	$t = term_exists( $name, 'product_cat' );
	if ( ! $t ) {
		$t = wp_insert_term( $name, 'product_cat' );
	}
	return is_array( $t ) ? (int) $t['term_id'] : (int) $t;
}

$cat_themes  = wpp_seed_product_cat( 'Темы' );
$cat_plugins = wpp_seed_product_cat( 'Плагины' );

$px = function ( $id ) {
	return "https://images.pexels.com/photos/{$id}/pexels-photo-{$id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=560";
};

$long = function ( $name, $what ) {
	return "<p>{$name} — готовое решение Wp Panda: {$what} Установка занимает пару минут, демо-контент импортируется в один клик, обновления прилетают прямо в консоль WordPress.</p>"
		. "<h2>Что внутри</h2><ul><li>Оригинальные файлы и подробная документация.</li><li>Поддержка 12 месяцев и помощь с настройкой.</li><li>Совместимость с Gutenberg, Elementor и последними версиями WordPress и PHP.</li></ul>"
		. "<h2>Лицензия</h2><p>Используйте на своём сайте или сайте клиента: без подписки, без скрытых платежей. Возврат в течение 14 дней.</p>";
};

$products = array(
	array(
		'name' => 'Aurora', 'slug' => 'aurora', 'cat' => $cat_themes, 'price' => 3990, 'sale' => 5490,
		'tagline' => 'Многоцелевая тема для агентств, студий и портфолио',
		'img' => $px( 12903905 ), 'img2' => $px( 9458996 ),
		'color' => '#4F46E5', 'color2' => '#8B5CF6', 'bg' => '#EDEEFF', 'icon' => 'rocket',
		'badge' => 'Хит продаж', 'version' => '3.2.1', 'type' => 'theme',
		'hero' => 'Создаём бренды, которые запоминают', 'eyebrow' => 'Digital-агентство', 'inner' => 'Избранные проекты',
		'what' => '40+ демо, визуальный конструктор и скорость 95+ в PageSpeed.',
	),
	array(
		'name' => 'Vesta', 'slug' => 'vesta', 'cat' => $cat_themes, 'price' => 4490, 'sale' => 5990,
		'tagline' => 'Тема для интернет-магазинов на WooCommerce',
		'img' => $px( 264636 ), 'img2' => $px( 1005638 ),
		'color' => '#0E9F6E', 'color2' => '#16A34A', 'bg' => '#E9F9F1', 'icon' => 'cart-w',
		'badge' => '', 'version' => '2.8.0', 'type' => 'theme',
		'hero' => 'Магазин, который продаёт', 'eyebrow' => 'WooCommerce', 'inner' => 'Каталог',
		'what' => 'Шаблоны каталога, корзины и чекаута, апсейлы и быстрая покупка.',
	),
	array(
		'name' => 'Brewly', 'slug' => 'brewly', 'cat' => $cat_themes, 'price' => 3490, 'sale' => 0,
		'tagline' => 'Тема для кофеен, ресторанов и пекарен',
		'img' => $px( 302899 ), 'img2' => $px( 1855214 ),
		'color' => '#B45309', 'color2' => '#D97706', 'bg' => '#FBF0E4', 'icon' => 'zap',
		'badge' => '', 'version' => '1.9.4', 'type' => 'theme',
		'hero' => 'Аромат свежего утра', 'eyebrow' => 'Кофейня', 'inner' => 'Меню',
		'what' => 'Интерактивное меню, бронирование столиков и витрина десертов.',
	),
	array(
		'name' => 'Nomad', 'slug' => 'nomad', 'cat' => $cat_themes, 'price' => 2990, 'sale' => 3990,
		'tagline' => 'Тема для тревел-блогов и медиа',
		'img' => $px( 1051075 ), 'img2' => $px( 2325446 ),
		'color' => '#0284C7', 'color2' => '#0EA5E9', 'bg' => '#E6F4FB', 'icon' => 'languages',
		'badge' => '', 'version' => '2.1.7', 'type' => 'theme',
		'hero' => 'Истории издалека', 'eyebrow' => 'Тревел-блог', 'inner' => 'Дневник',
		'what' => 'Журнальная сетка, карты маршрутов и поддержка подкастов.',
	),
	array(
		'name' => 'Pulse', 'slug' => 'pulse', 'cat' => $cat_themes, 'price' => 3290, 'sale' => 0,
		'tagline' => 'Тема для фитнеса, спорта и здорового образа жизни',
		'img' => $px( 2294362 ), 'img2' => $px( 1954524 ),
		'color' => '#DC2626', 'color2' => '#F97316', 'bg' => '#FDECEA', 'icon' => 'gauge',
		'badge' => '', 'version' => '1.4.2', 'type' => 'theme',
		'hero' => 'Тренировки, которые работают', 'eyebrow' => 'Фитнес', 'inner' => 'Программы',
		'what' => 'Расписание занятий, тренеры и продажа абонементов.',
	),
	array(
		'name' => 'Habitat', 'slug' => 'habitat', 'cat' => $cat_themes, 'price' => 4290, 'sale' => 5590,
		'tagline' => 'Тема для интерьеров, мебели и дизайна',
		'img' => $px( 1571460 ), 'img2' => $px( 1866149 ),
		'color' => '#92400E', 'color2' => '#B45309', 'bg' => '#F7F0E8', 'icon' => 'form',
		'badge' => 'Новинка', 'version' => '1.0.8', 'type' => 'theme',
		'hero' => 'Пространство, в котором хочется жить', 'eyebrow' => 'Интерьеры', 'inner' => 'Портфолио',
		'what' => 'Каталог мебели с фильтрами и оформление заказа в один шаг.',
	),
	array(
		'name' => 'Glow', 'slug' => 'glow', 'cat' => $cat_themes, 'price' => 3590, 'sale' => 0,
		'tagline' => 'Тема для салонов красоты и косметики',
		'img' => $px( 3993449 ), 'img2' => $px( 3373716 ),
		'color' => '#DB2777', 'color2' => '#F472B6', 'bg' => '#FCEEF5', 'icon' => 'sparkles',
		'badge' => '', 'version' => '1.6.3', 'type' => 'theme',
		'hero' => 'Красота в каждой детали', 'eyebrow' => 'Beauty', 'inner' => 'Услуги',
		'what' => 'Прайс-услуги, мастера и онлайн-запись.',
	),
	array(
		'name' => 'Savora', 'slug' => 'savora', 'cat' => $cat_themes, 'price' => 3190, 'sale' => 4190,
		'tagline' => 'Тема для фуд-блогов и кулинарных школ',
		'img' => $px( 1640777 ), 'img2' => $px( 70497 ),
		'color' => '#65A30D', 'color2' => '#84CC16', 'bg' => '#F2F8E9', 'icon' => 'cart-w',
		'badge' => '', 'version' => '1.2.0', 'type' => 'theme',
		'hero' => 'Рецепты, которые хочется готовить', 'eyebrow' => 'Кулинария', 'inner' => 'Рецепты',
		'what' => 'Рецепты с ингредиентами, курсы и подписка на рассылки.',
	),
	array(
		'name' => 'SEO Rocket', 'slug' => 'seo-rocket', 'cat' => $cat_plugins, 'price' => 2490, 'sale' => 3490,
		'tagline' => 'Технический SEO-аудит и микроразметка в один клик',
		'color' => '#DC2626', 'color2' => '#F97316', 'bg' => '#FDECEA', 'icon' => 'rocket',
		'badge' => 'Хит продаж', 'version' => '4.1.0', 'type' => 'plugin',
		'chips' => 'Аудит OK|Индекс 98%',
		'what' => 'Автоматический аудит, Schema-разметка и генератор sitemap.',
	),
	array(
		'name' => 'TurboCache', 'slug' => 'turbocache', 'cat' => $cat_plugins, 'price' => 2790, 'sale' => 0,
		'tagline' => 'Кэш, оптимизация изображений и PageSpeed 95+',
		'color' => '#7C3AED', 'color2' => '#A855F7', 'bg' => '#F2EBFE', 'icon' => 'zap',
		'badge' => '', 'version' => '4.0.3', 'type' => 'plugin',
		'chips' => 'Кэш активен|99 / 100',
		'what' => 'Страничный кэш, WebP-конвертация и умная загрузка скриптов.',
	),
	array(
		'name' => 'WooBoost', 'slug' => 'wooboost', 'cat' => $cat_plugins, 'price' => 3290, 'sale' => 4290,
		'tagline' => 'Апсейлы, быстрая корзина и экспресс-оплата для WooCommerce',
		'color' => '#16A34A', 'color2' => '#22C55E', 'bg' => '#E9F9F1', 'icon' => 'cart-w',
		'badge' => '', 'version' => '2.3.1', 'type' => 'plugin',
		'chips' => '+18% к конверсии|1-клик оплата',
		'what' => 'Апсейлы в корзине, липкая кнопка покупки и экспресс-оплата.',
	),
	array(
		'name' => 'Shieldy', 'slug' => 'shieldy', 'cat' => $cat_plugins, 'price' => 2590, 'sale' => 3290,
		'tagline' => 'Файрвол, защита входа и сканер уязвимостей',
		'color' => '#334155', 'color2' => '#64748B', 'bg' => '#EDF1F6', 'icon' => 'shield',
		'badge' => '', 'version' => '3.0.9', 'type' => 'plugin',
		'chips' => 'Угроз нет|2FA вкл.',
		'what' => 'Файрвол на уровне запросов, 2FA и ежедневный скан файлов.',
	),
	array(
		'name' => 'FormFlow', 'slug' => 'formflow', 'cat' => $cat_plugins, 'price' => 1990, 'sale' => 0,
		'tagline' => 'Конструктор форм с логикой и CRM-интеграциями',
		'color' => '#2563EB', 'color2' => '#38BDF8', 'bg' => '#EAF2FE', 'icon' => 'form',
		'badge' => '', 'version' => '1.8.2', 'type' => 'plugin',
		'chips' => '12 форм|CRM on',
		'what' => 'Drag-n-drop формы, условная логика и отправка в CRM.',
	),
	array(
		'name' => 'Polyglot', 'slug' => 'polyglot', 'cat' => $cat_plugins, 'price' => 3490, 'sale' => 4490,
		'tagline' => 'Мультиязычность сайта и автоматический перевод',
		'color' => '#0891B2', 'color2' => '#22D3EE', 'bg' => '#E7F9FC', 'icon' => 'languages',
		'badge' => '', 'version' => '2.2.0', 'type' => 'plugin',
		'chips' => '24 языка|AI-перевод',
		'what' => 'Перевод контента и товаров, отдельные URL для языков.',
	),
	array(
		'name' => 'BookIt', 'slug' => 'bookit', 'cat' => $cat_plugins, 'price' => 2890, 'sale' => 0,
		'tagline' => 'Онлайн-запись и календарь бронирования',
		'color' => '#7C2D12', 'color2' => '#EA580C', 'bg' => '#FBF0E4', 'icon' => 'calendar',
		'badge' => '', 'version' => '1.5.1', 'type' => 'plugin',
		'chips' => 'Гугл-календарь|Оплата',
		'what' => 'Слоты, напоминания и синхронизация с календарём.',
	),
	array(
		'name' => 'MailPilot', 'slug' => 'mailpilot', 'cat' => $cat_plugins, 'price' => 2290, 'sale' => 2990,
		'tagline' => 'Письма в стиле сайта и триггерные рассылки',
		'color' => '#4338CA', 'color2' => '#818CF8', 'bg' => '#EEF0FE', 'icon' => 'mail',
		'badge' => '', 'version' => '1.3.6', 'type' => 'plugin',
		'chips' => 'Шаблоны|Брошенные корзины',
		'what' => 'Красивые письма Woo, цепочки брошенных корзин и рассылки.',
	),
);

$created = 0;
foreach ( $products as $d ) {
	$existing = get_page_by_path( $d['slug'], OBJECT, 'product' );
	if ( $existing ) {
		continue;
	}

	$product = new WC_Product_Simple();
	$product->set_name( $d['name'] );
	$product->set_slug( $d['slug'] );
	$product->set_status( 'publish' );
	$product->set_short_description( $d['tagline'] );
	$product->set_description( $long( $d['name'], $d['what'] ) );
	if ( ! empty( $d['sale'] ) && (int) $d['sale'] > (int) $d['price'] ) {
		// regular — зачёркнутая цена, sale — текущая
		$product->set_regular_price( (string) $d['sale'] );
		$product->set_sale_price( (string) $d['price'] );
	} else {
		$product->set_regular_price( (string) $d['price'] );
	}
	$product->set_virtual( true );
	$product->set_sold_individually( true );
	$product_id = $product->save();

	if ( is_wp_error( $product_id ) || ! $product_id ) {
		echo "ошибка создания {$d['name']}\n";
		continue;
	}

	wp_set_object_terms( $product_id, array( (int) $d['cat'] ), 'product_cat' );

	$meta = array(
		'_wpp_type'       => $d['type'],
		'_wpp_badge'      => $d['badge'],
		'_wpp_version'    => $d['version'],
		'_wpp_image'      => $d['img'] ?? '',
		'_wpp_image2'     => $d['img2'] ?? '',
		'_wpp_color'      => $d['color'],
		'_wpp_color2'     => $d['color2'],
		'_wpp_bg'         => $d['bg'],
		'_wpp_icon'       => $d['icon'],
		'_wpp_hero_title' => $d['hero'] ?? '',
		'_wpp_eyebrow'    => $d['eyebrow'] ?? '',
		'_wpp_inner_title'=> $d['inner'] ?? '',
		'_wpp_chips'      => $d['chips'] ?? '',
	);
	foreach ( $meta as $k => $v ) {
		update_post_meta( $product_id, $k, $v );
	}
	$created++;
}

flush_rewrite_rules();
update_option( 'wpp_products_seeded', 1 );
echo "товаров создано: {$created}\n";
