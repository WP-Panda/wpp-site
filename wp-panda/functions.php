<?php
/**
 * Wp Panda — функции темы.
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'WPP_VERSION', '1.0.0' );
define( 'WPP_DIR', get_template_directory() );
define( 'WPP_URI', get_template_directory_uri() );

/* ------------------------------------------------------------------ */
/* Настройка темы                                                      */
/* ------------------------------------------------------------------ */
function wpp_setup() {
	load_theme_textdomain( 'wp-panda', WPP_DIR . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'custom-logo', array(
		'height'      => 40,
		'width'       => 40,
		'flex-width'  => true,
		'flex-height' => true,
	) );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );

	// WooCommerce.
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );

	register_nav_menus( array(
		'primary'          => __( 'Меню в шапке', 'wp-panda' ),
		'footer_shop'      => __( 'Футер: магазин', 'wp-panda' ),
		'footer_resources' => __( 'Футер: ресурсы', 'wp-panda' ),
		'footer_help'      => __( 'Футер: помощь', 'wp-panda' ),
	) );
}
add_action( 'after_setup_theme', 'wpp_setup' );

function wpp_content_width() {
	$GLOBALS['content_width'] = 1200;
}
add_action( 'after_setup_theme', 'wpp_content_width', 0 );

/* ------------------------------------------------------------------ */
/* Стили и скрипты                                                     */
/* ------------------------------------------------------------------ */
function wpp_scripts() {
	wp_enqueue_style( 'wp-panda-fonts', 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap', array(), null );
	wp_enqueue_style( 'wp-panda-style', get_stylesheet_uri(), array( 'wp-panda-fonts' ), WPP_VERSION );
	wp_enqueue_script( 'wp-panda-theme', WPP_URI . '/assets/js/theme.js', array(), WPP_VERSION, true );
	if ( wpp_has_woo() ) {
		wp_add_inline_script( 'wp-panda-theme', 'window.wppWoo = true;' );
	}
}
add_action( 'wp_enqueue_scripts', 'wpp_scripts' );

/* Стили WooCommerce по умолчанию не подключаем — вся вёрстка в теме. */
function wpp_woocommerce_enqueue_styles( $styles ) {
	return array();
}
add_filter( 'woocommerce_enqueue_styles', 'wpp_woocommerce_enqueue_styles' );

/* ------------------------------------------------------------------ */
/* Модули                                                              */
/* ------------------------------------------------------------------ */
require WPP_DIR . '/inc/icons.php';
require WPP_DIR . '/inc/template-tags.php';
require WPP_DIR . '/inc/cpt.php';
require WPP_DIR . '/inc/demo.php';

function wpp_has_woo() {
	return class_exists( 'WooCommerce' );
}

if ( wpp_has_woo() ) {
	require WPP_DIR . '/inc/woo.php';
}

/* ------------------------------------------------------------------ */
/* Мелкие настройки                                                    */
/* ------------------------------------------------------------------ */
// Обёртка страниц в excerpt с «читать»-строкой текста.
function wpp_excerpt_length() {
	return 24;
}
add_filter( 'excerpt_length', 'wpp_excerpt_length' );

function wpp_excerpt_more() {
	return '…';
}
add_filter( 'excerpt_more', 'wpp_excerpt_more' );

// Меню по умолчанию, пока пользователь не создал своё.
function wpp_fallback_menu( $location ) {
	$items = array(
		'primary' => array(
			__( 'Каталог', 'wp-panda' )      => '#catalog',
			__( 'Блог', 'wp-panda' )         => home_url( '/' ),
			__( 'База знаний', 'wp-panda' )  => '#knowledge-base',
			__( 'FAQ', 'wp-panda' )          => '#faq',
		),
	);
	$map = array(
		'footer_shop'      => array(),
		'footer_resources' => array(),
		'footer_help'      => array(),
	);
	$list = isset( $items[ $location ] ) ? $items[ $location ] : ( isset( $map[ $location ] ) ? $map[ $location ] : array() );
	foreach ( $list as $label => $url ) {
		printf( '<li><a href="%s">%s</a></li>', esc_url( $url ), esc_html( $label ) );
	}
}

// SVG-иконки внутри меню (по классу пункта, например icon-grid).
function wpp_menu_icon( $location ) {
	$map = array(
		'primary' => array( 'grid', 'newspaper', 'book-open', 'help' ),
	);
	$icons = isset( $map[ $location ] ) ? $map[ $location ] : array();
	static $i = 0;
	return isset( $icons[ $i ] ) ? $icons[ $i++ ] : 'chevron-right';
}

// Активный пункт меню.
function wpp_menu_classes( $classes, $item, $args ) {
	if ( in_array( $args->theme_location, array( 'primary' ), true ) && is_array( $classes ) ) {
		$classes[] = 'wpp-nav-item';
	}
	return $classes;
}
add_filter( 'nav_menu_css_class', 'wpp_menu_classes', 10, 3 );

// Разрешаем SVG-логотип (медиатека).
function wpp_upload_mimes( $mimes ) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}
add_filter( 'upload_mimes', 'wpp_upload_mimes' );

// Body-классы для секций CSS.
function wpp_body_classes( $classes ) {
	$classes[] = 'wpp-theme';
	if ( is_front_page() ) {
		$classes[] = 'wpp-home';
	}
	return $classes;
}
add_filter( 'body_class', 'wpp_body_classes' );
