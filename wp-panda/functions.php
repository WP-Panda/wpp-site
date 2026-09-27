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

/** Enqueue the supplied layout styles and small progressive-enhancement script. */
function wpp_enqueue_assets() {
	$theme_version = wp_get_theme()->get( 'Version' );
	$layout_path   = get_template_directory() . '/assets/css/layout.css';
	$theme_path    = get_template_directory() . '/assets/css/theme.css';
	$script_path   = get_template_directory() . '/assets/js/theme.js';

	wp_enqueue_style(
		'wpp-theme-meta',
		get_stylesheet_uri(),
		array(),
		$theme_version
	);

	wp_enqueue_style(
		'wpp-layout',
		get_template_directory_uri() . '/assets/css/layout.css',
		array( 'wpp-theme-meta' ),
		file_exists( $layout_path ) ? (string) filemtime( $layout_path ) : WPP_THEME_VERSION
	);

	wp_enqueue_style(
		'wpp-theme',
		get_template_directory_uri() . '/assets/css/theme.css',
		array( 'wpp-layout' ),
		file_exists( $theme_path ) ? (string) filemtime( $theme_path ) : WPP_THEME_VERSION
	);

	wp_enqueue_script(
		'wpp-theme',
		get_template_directory_uri() . '/assets/js/theme.js',
		array(),
		file_exists( $script_path ) ? (string) filemtime( $script_path ) : WPP_THEME_VERSION,
		true
	);

	wp_localize_script( 'wpp-theme', 'wppTheme', array(
		'cartUrl' => function_exists( 'wc_get_cart_url' ) ? wc_get_cart_url() : home_url( '/' ),
	) );

	// The header uses WooCommerce's mini-cart template. Enqueue its fragment updater
	// when WooCommerce has registered it; never dequeue or replace WooCommerce scripts.
	if ( class_exists( 'WooCommerce' ) && wp_script_is( 'wc-cart-fragments', 'registered' ) ) {
		wp_enqueue_script( 'wc-cart-fragments' );
	}
}
add_action( 'wp_enqueue_scripts', 'wpp_enqueue_assets', 30 );
