<?php
/** Shared presentation helpers. */

defined( 'ABSPATH' ) || exit;

/** Return a small, accessible inline icon from the theme's fixed icon set. */
function wpp_icon( $name, $class = '' ) {
	$icons = array(
		'search' => '<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path>',
		'cart'   => '<path d="M3 3h2l2.1 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.4L22 8H6"></path><circle cx="10" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle>',
		'user'   => '<circle cx="12" cy="8" r="4"></circle><path d="M5 21v-2a7 7 0 0 1 14 0v2"></path>',
		'menu'   => '<path d="M4 6h16M4 12h16M4 18h16"></path>',
		'close'  => '<path d="m18 6-12 12M6 6l12 12"></path>',
		'arrow'  => '<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>',
		'chevron'=> '<path d="m9 18 6-6-6-6"></path>',
		'check'  => '<path d="m5 12 4 4L19 6"></path>',
	);

	if ( ! isset( $icons[ $name ] ) ) {
		return '';
	}

	$classes = trim( 'wpp-icon ' . $class );

	return '<svg class="' . esc_attr( $classes ) . '" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' . $icons[ $name ] . '</svg>';
}

/** Fallback menu for a fresh install before a menu is assigned in Appearance > Menus. */
function wpp_primary_menu_fallback() {
	$shop_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/' );
	$blog_url = (int) get_option( 'page_for_posts' ) ? get_permalink( (int) get_option( 'page_for_posts' ) ) : home_url( '/' );
	?>
	<ul class="menu">
		<li class="menu-item"><a href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Каталог', 'wp-panda' ); ?></a></li>
		<li class="menu-item"><a href="<?php echo esc_url( $blog_url ); ?>"><?php esc_html_e( 'Блог', 'wp-panda' ); ?></a></li>
		<li class="menu-item"><a href="<?php echo esc_url( home_url( '/faq/' ) ); ?>"><?php esc_html_e( 'FAQ', 'wp-panda' ); ?></a></li>
	</ul>
	<?php
}

/** Render cards with WooCommerce's regular loop template and extension hooks. */
function wpp_render_product_cards( $query, $columns = 4 ) {
	if ( ! class_exists( 'WooCommerce' ) || ! ( $query instanceof WP_Query ) || ! $query->have_posts() ) {
		return;
	}

	$previous_loop = isset( $GLOBALS['woocommerce_loop'] ) ? $GLOBALS['woocommerce_loop'] : null;
	wc_set_loop_prop( 'columns', absint( $columns ) );
	wc_set_loop_prop( 'total', (int) $query->found_posts );
	wc_set_loop_prop( 'is_paginated', false );

	woocommerce_product_loop_start();
	while ( $query->have_posts() ) {
		$query->the_post();
		do_action( 'woocommerce_shop_loop' );
		wc_get_template_part( 'content', 'product' );
	}
	woocommerce_product_loop_end();

	wp_reset_postdata();
	if ( null === $previous_loop ) {
		wc_reset_loop();
	} else {
		$GLOBALS['woocommerce_loop'] = $previous_loop; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
	}
}

/** Return the current cart count safely when WooCommerce is inactive or still booting. */
function wpp_get_cart_count() {
	if ( function_exists( 'WC' ) && WC() && WC()->cart ) {
		return (int) WC()->cart->get_cart_contents_count();
	}

	return 0;
}
