<?php
/**
 * Демо-данные темы: товары для главной и каталога, пока WooCommerce
 * не активирован (или каталог пуст). Источник — исходный дизайн Wp Panda.
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Демо-товары. Поля повторяют wpp_product_data().
 *
 * @return array[]
 */
function wpp_demo_products() {
	$px = function ( $id ) {
		return "https://images.pexels.com/photos/{$id}/pexels-photo-{$id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=560";
	};

	return array(
		array(
			'id' => 0, 'slug' => 'aurora', 'type' => 'theme', 'name' => 'Aurora',
			'tagline' => __( 'Многоцелевая тема для агентств, студий и портфолио', 'wp-panda' ),
			'category' => __( 'Агентство', 'wp-panda' ), 'price' => 3990, 'old_price' => 5490,
			'rating' => 4.9, 'reviews' => 412, 'sales' => 8240, 'badge' => __( 'Хит продаж', 'wp-panda' ),
			'color' => '#4F46E5', 'color2' => '#8B5CF6', 'bg' => '#EDEEFF', 'icon' => 'rocket',
			'image' => $px( 12903905 ), 'image2' => $px( 9458996 ),
			'hero_title' => __( 'Создаём бренды, которые запоминают', 'wp-panda' ),
			'eyebrow' => __( 'Digital-агентство', 'wp-panda' ), 'inner_title' => __( 'Избранные проекты', 'wp-panda' ),
		),
		array(
			'id' => 0, 'slug' => 'vesta', 'type' => 'theme', 'name' => 'Vesta',
			'tagline' => __( 'Тема для интернет-магазинов на WooCommerce', 'wp-panda' ),
			'category' => __( 'Магазин', 'wp-panda' ), 'price' => 4490, 'old_price' => 5990,
			'rating' => 4.8, 'reviews' => 356, 'sales' => 6180, 'badge' => '',
			'color' => '#0E9F6E', 'color2' => '#16A34A', 'bg' => '#E9F9F1', 'icon' => 'cart-w',
			'image' => $px( 264636 ), 'image2' => $px( 1005638 ),
			'hero_title' => __( 'Магазин, который продаёт', 'wp-panda' ),
			'eyebrow' => __( 'WooCommerce', 'wp-panda' ), 'inner_title' => __( 'Каталог', 'wp-panda' ),
		),
		array(
			'id' => 0, 'slug' => 'brewly', 'type' => 'theme', 'name' => 'Brewly',
			'tagline' => __( 'Тема для кофеен, ресторанов и пекарен', 'wp-panda' ),
			'category' => __( 'Ресторан', 'wp-panda' ), 'price' => 3490, 'old_price' => 0,
			'rating' => 4.7, 'reviews' => 189, 'sales' => 3420, 'badge' => '',
			'color' => '#B45309', 'color2' => '#D97706', 'bg' => '#FBF0E4', 'icon' => 'zap',
			'image' => $px( 302899 ), 'image2' => $px( 1855214 ),
			'hero_title' => __( 'Аромат свежего утра', 'wp-panda' ),
			'eyebrow' => __( 'Кофейня', 'wp-panda' ), 'inner_title' => __( 'Меню', 'wp-panda' ),
		),
		array(
			'id' => 0, 'slug' => 'nomad', 'type' => 'theme', 'name' => 'Nomad',
			'tagline' => __( 'Тема для тревел-блогов и медиа', 'wp-panda' ),
			'category' => __( 'Блог', 'wp-panda' ), 'price' => 2990, 'old_price' => 3990,
			'rating' => 4.8, 'reviews' => 158, 'sales' => 2960, 'badge' => '',
			'color' => '#0284C7', 'color2' => '#0EA5E9', 'bg' => '#E6F4FB', 'icon' => 'languages',
			'image' => $px( 1051075 ), 'image2' => $px( 2325446 ),
			'hero_title' => __( 'Истории издалека', 'wp-panda' ),
			'eyebrow' => __( 'Тревел-блог', 'wp-panda' ), 'inner_title' => __( 'Дневник', 'wp-panda' ),
		),
		array(
			'id' => 0, 'slug' => 'seo-rocket', 'type' => 'plugin', 'name' => 'SEO Rocket',
			'tagline' => __( 'Технический SEO-аудит и микроразметка в один клик', 'wp-panda' ),
			'category' => __( 'SEO', 'wp-panda' ), 'price' => 2490, 'old_price' => 3490,
			'rating' => 4.9, 'reviews' => 1204, 'sales' => 15600, 'badge' => __( 'Хит продаж', 'wp-panda' ),
			'color' => '#DC2626', 'color2' => '#F97316', 'bg' => '#FDECEA', 'icon' => 'rocket',
			'chips' => array( __( 'Аудит OK', 'wp-panda' ), __( 'Индекс 98%', 'wp-panda' ) ),
		),
		array(
			'id' => 0, 'slug' => 'turbocache', 'type' => 'plugin', 'name' => 'TurboCache',
			'tagline' => __( 'Кэш, оптимизация изображений и PageSpeed 95+', 'wp-panda' ),
			'category' => __( 'Скорость', 'wp-panda' ), 'price' => 2790, 'old_price' => 0,
			'rating' => 4.8, 'reviews' => 876, 'sales' => 11200, 'badge' => '',
			'color' => '#7C3AED', 'color2' => '#A855F7', 'bg' => '#F2EBFE', 'icon' => 'zap',
			'chips' => array( __( 'Кэш активен', 'wp-panda' ), __( '99 / 100', 'wp-panda' ) ),
		),
		array(
			'id' => 0, 'slug' => 'wooboost', 'type' => 'plugin', 'name' => 'WooBoost',
			'tagline' => __( 'Апсейлы, быстрая корзина и экспресс-оплата для WooCommerce', 'wp-panda' ),
			'category' => __( 'Продажи', 'wp-panda' ), 'price' => 3290, 'old_price' => 4290,
			'rating' => 4.7, 'reviews' => 318, 'sales' => 5400, 'badge' => '',
			'color' => '#16A34A', 'color2' => '#22C55E', 'bg' => '#E9F9F1', 'icon' => 'cart-w',
			'chips' => array( __( '+18% к конверсии', 'wp-panda' ), __( '1-клик оплата', 'wp-panda' ) ),
		),
		array(
			'id' => 0, 'slug' => 'shieldy', 'type' => 'plugin', 'name' => 'Shieldy',
			'tagline' => __( 'Файрвол, защита входа и сканер уязвимостей', 'wp-panda' ),
			'category' => __( 'Безопасность', 'wp-panda' ), 'price' => 2590, 'old_price' => 3290,
			'rating' => 4.9, 'reviews' => 642, 'sales' => 9800, 'badge' => '',
			'color' => '#334155', 'color2' => '#64748B', 'bg' => '#EDF1F6', 'icon' => 'shield',
			'chips' => array( __( 'Угроз нет', 'wp-panda' ), __( '2FA вкл.', 'wp-panda' ) ),
		),
	);
}

/**
 * Товары для витрины: из WooCommerce (если есть) или демо.
 *
 * @param string $type    'all' | 'theme' | 'plugin'.
 * @param int    $limit   Максимум товаров.
 * @return array[] Массив данных wpp_product_data().
 */
function wpp_showcase_products( $type = 'all', $limit = 8 ) {
	if ( wpp_has_woo() ) {
		$args = array(
			'limit'   => 20,
			'status'  => 'publish',
			'orderby' => 'menu_order',
			'order'   => 'ASC',
		);
		if ( 'all' !== $type ) {
			$cat   = 'theme' === $type ? 'Темы' : 'Плагины';
			$args['category'] = array( $cat );
		}
		$products = wc_get_products( $args );
		$data     = array_filter( array_map( 'wpp_product_data', $products ) );
		if ( $data ) {
			return array_slice( array_values( $data ), 0, $limit );
		}
	}

	$demo = wpp_demo_products();
	if ( 'all' !== $type ) {
		$demo = array_values( array_filter( $demo, function ( $d ) use ( $type ) {
			return $d['type'] === $type;
		} ) );
	}
	return array_slice( array_filter( array_map( 'wpp_product_data', $demo ) ), 0, $limit );
}
