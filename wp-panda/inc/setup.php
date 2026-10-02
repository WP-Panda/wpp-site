<?php
/**
 * Theme setup and asset loading.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

/** Register theme supports, menus and image sizes. */
function wpp_theme_setup() {
	load_theme_textdomain( 'wp-panda', get_template_directory() . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo', array(
		'height'      => 80,
		'width'       => 240,
		'flex-height' => true,
		'flex-width'  => true,
	) );
	add_theme_support( 'align-wide' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'html5', array( 'comment-form', 'comment-list', 'gallery', 'caption', 'search-form', 'script', 'style' ) );

	register_nav_menus( array(
		'primary' => __( 'Главное меню', 'wp-panda' ),
		'footer'  => __( 'Меню в подвале', 'wp-panda' ),
	) );

	add_image_size( 'wpp-product-card', 720, 540, true );
	add_image_size( 'wpp-editorial-card', 900, 560, true );
	add_image_size( 'wpp-avatar', 160, 160, true );

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
 * Enqueue the layout stylesheet exactly as supplied with the static markup,
 * followed by the WordPress/WooCommerce adaptation layer in the same file.
 *
 * The late priority places the original layout stylesheet after core, block
 * and plugin styles.
 */
function wpp_enqueue_assets() {
	$css_path = get_template_directory() . '/assets/css/layout.css';
	$js_path  = get_template_directory() . '/assets/js/theme.js';

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
		file_exists( $css_path ) ? (string) filemtime( $css_path ) : WPP_THEME_VERSION
	);

	wp_enqueue_script(
		'wpp-theme',
		get_template_directory_uri() . '/assets/js/theme.js',
		array( 'jquery' ),
		file_exists( $js_path ) ? (string) filemtime( $js_path ) : WPP_THEME_VERSION,
		true
	);
	wp_localize_script( 'wpp-theme', 'wppTheme', array(
		'ajaxUrl'      => admin_url( 'admin-ajax.php' ),
		'homeUrl'      => home_url( '/' ),
		'shopUrl'      => function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ),
		'cartUrl'      => function_exists( 'wc_get_cart_url' ) ? wc_get_cart_url() : home_url( '/cart/' ),
		'checkoutUrl'  => function_exists( 'wc_get_checkout_url' ) ? wc_get_checkout_url() : home_url( '/checkout/' ),
		'accountUrl'   => function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'myaccount' ) : home_url( '/my-account/' ),
		'searchNonce'  => wp_create_nonce( 'wpp-search' ),
		'cartNonce'    => wp_create_nonce( 'wpp-cart' ),
		'wishlistNonce'=> wp_create_nonce( 'wpp-wishlist' ),
		'notifNonce'   => wp_create_nonce( 'wpp-notifications' ),
		'isCartPage'   => function_exists( 'is_cart' ) && ( is_cart() || is_checkout() ),
	) );

	// Keep WooCommerce's fragment refresh for the header cart; never replace its scripts.
	if ( class_exists( 'WooCommerce' ) && wp_script_is( 'wc-cart-fragments', 'registered' ) ) {
		wp_enqueue_script( 'wc-cart-fragments' );
	}
	if ( class_exists( 'WooCommerce' ) && is_product() ) {
		wp_enqueue_script( 'wc-add-to-cart-variation' );
	}
}
add_action( 'wp_enqueue_scripts', 'wpp_enqueue_assets', 999 );

/** WooCommerce classic styles clash with the supplied layout; scripts stay on. */
function wpp_disable_woocommerce_styles() {
	return array();
}
add_filter( 'woocommerce_enqueue_styles', 'wpp_disable_woocommerce_styles' );

/** Add theme color and body classes used by the layout shell. */
function wpp_body_classes( $classes ) {
	$classes[] = 'wpp-site';
	return $classes;
}
add_filter( 'body_class', 'wpp_body_classes' );

/** Newsletter subscribe endpoint used by the blog and home forms. */
function wpp_handle_subscribe() {
	$email = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
	if ( ! is_email( $email ) ) {
		wp_send_json_error( array( 'message' => __( 'Укажите корректный e-mail.', 'wp-panda' ) ) );
	}
	$list = get_option( 'wpp_subscribers', array() );
	if ( in_array( $email, $list, true ) ) {
		wp_send_json_error( array( 'message' => __( 'Этот e-mail уже подписан на рассылку.', 'wp-panda' ) ) );
	}
	$list[] = $email;
	update_option( 'wpp_subscribers', $list );
	wp_send_json_success( array( 'message' => __( 'Готово! Проверьте почту — мы отправили подтверждение.', 'wp-panda' ) ) );
}
add_action( 'wp_ajax_wpp_subscribe', 'wpp_handle_subscribe' );
add_action( 'wp_ajax_nopriv_wpp_subscribe', 'wpp_handle_subscribe' );
