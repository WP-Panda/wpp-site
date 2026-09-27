<?php
/**
 * Theme bootstrap.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

define( 'WPP_THEME_VERSION', '1.0.0' );

require_once get_template_directory() . '/inc/template-tags.php';
require_once get_template_directory() . '/inc/woocommerce.php';
require_once get_template_directory() . '/inc/account.php';
require_once get_template_directory() . '/inc/demo-content.php';

/** Set up theme defaults and register support for WordPress features. */
function wpp_theme_setup() {
	load_theme_textdomain( 'wp-panda', get_template_directory() . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'customize-selective-refresh-widgets' );
	add_theme_support( 'custom-logo', array(
		'height'      => 80,
		'width'       => 240,
		'flex-height' => true,
		'flex-width'  => true,
	) );
	add_theme_support( 'align-wide' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'html5', array(
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
		'search-form',
		'script',
		'style',
	) );

	register_nav_menus( array(
		'primary' => __( 'Главное меню', 'wp-panda' ),
		'footer'  => __( 'Меню в подвале', 'wp-panda' ),
	) );

	add_image_size( 'wpp-product-card', 720, 520, true );
	add_image_size( 'wpp-editorial-card', 900, 560, true );

	// WooCommerce owns its product/cart/checkout behaviour; this only declares theme support.
	add_theme_support( 'woocommerce', array(
		'thumbnail_image_width' => 520,
		'single_image_width'    => 880,
	) );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
}
add_action( 'after_setup_theme', 'wpp_theme_setup' );

/**
 * Enqueue only the stylesheet supplied with the static layout.
 *
 * Core, block and plugin styles are enqueued by WordPress before this callback.
 * The late priority deliberately places the original layout stylesheet last.
 */
function wpp_enqueue_assets() {
	$layout_path = get_template_directory() . '/assets/css/layout.css';
	$script_path = get_template_directory() . '/assets/js/theme.js';

	wp_enqueue_style(
		'wpp-fonts',
		'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap',
		array(),
		null
	);

	wp_enqueue_style(
		'wpp-layout',
		get_template_directory_uri() . '/assets/css/layout.css',
		array( 'wpp-fonts' ),
		file_exists( $layout_path ) ? (string) filemtime( $layout_path ) : WPP_THEME_VERSION
	);

	wp_enqueue_script(
		'wpp-theme',
		get_template_directory_uri() . '/assets/js/theme.js',
		array(),
		file_exists( $script_path ) ? (string) filemtime( $script_path ) : WPP_THEME_VERSION,
		true
	);

	wp_localize_script( 'wpp-theme', 'wppTheme', array(
		'cartUrl'     => function_exists( 'wc_get_cart_url' ) ? wc_get_cart_url() : home_url( '/' ),
		'checkoutUrl' => function_exists( 'wc_get_checkout_url' ) ? wc_get_checkout_url() : home_url( '/checkout/' ),
		'ajaxUrl'     => admin_url( 'admin-ajax.php' ),
		'cartNonce'   => wp_create_nonce( 'wpp-cart' ),
	) );

	// The header uses WooCommerce's mini-cart template. Enqueue its fragment updater
	// when WooCommerce has registered it; never dequeue or replace WooCommerce scripts.
	if ( class_exists( 'WooCommerce' ) && wp_script_is( 'wc-cart-fragments', 'registered' ) ) {
		wp_enqueue_script( 'wc-cart-fragments' );
	}
}
add_action( 'wp_enqueue_scripts', 'wpp_enqueue_assets', 999 );

/**
 * Prevent WooCommerce's classic CSS from overriding the supplied catalog,
 * product, cart and checkout layout. Functional scripts remain enabled.
 */
function wpp_disable_woocommerce_classic_styles() {
	return array();
}
add_filter( 'woocommerce_enqueue_styles', 'wpp_disable_woocommerce_classic_styles' );
