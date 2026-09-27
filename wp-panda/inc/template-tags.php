<?php
/** Shared presentation helpers. */

defined( 'ABSPATH' ) || exit;

/** Return a small, accessible inline icon from the theme's fixed icon set. */
function wpp_icon( $name, $class = '' ) {
	$icons = array(
		'search' => '<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path>',
		'cart'   => '<path d="M3 3h2l2.1 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.4L22 8H6"></path><circle cx="10" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle>',
		'user'   => '<circle cx="12" cy="8" r="4"></circle><path d="M5 21v-2a7 7 0 0 1 14 0v2"></path>',
		'bell'   => '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path><path d="M10 21h4"></path>',
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

/** Query the curated home catalog while retaining a useful dynamic fallback for a real store. */
function wpp_featured_products_query( $category_slug = '', $limit = 8 ) {
	if ( ! class_exists( 'WooCommerce' ) ) {
		return null;
	}

	$featured_ids = get_posts( array(
		'post_type'      => 'product',
		'post_status'    => 'publish',
		'posts_per_page' => -1,
		'fields'         => 'ids',
		'no_found_rows'  => true,
		'meta_key'       => '_wpp_demo_featured_order',
		'orderby'        => 'meta_value_num',
		'order'          => 'ASC',
	) );
	$tax_query = array();
	if ( $category_slug ) {
		$tax_query[] = array(
			'taxonomy'         => 'product_cat',
			'field'            => 'slug',
			'terms'            => sanitize_title( $category_slug ),
			'include_children' => true,
		);
	}

	$args = array(
		'post_type'           => 'product',
		'post_status'         => 'publish',
		'posts_per_page'      => absint( $limit ),
		'ignore_sticky_posts' => true,
		'no_found_rows'       => true,
	);
	if ( $featured_ids ) {
		$args['post__in'] = array_map( 'absint', $featured_ids );
		$args['orderby']  = 'post__in';
	} else {
		$args['meta_key'] = 'total_sales';
		$args['orderby']  = 'meta_value_num';
		$args['order']    = 'DESC';
	}
	if ( $tax_query ) {
		$args['tax_query'] = $tax_query;
	}

	return new WP_Query( $args );
}

/** Return a real product for a scenario tile, with a category fallback for non-demo stores. */
function wpp_get_scenario_product( $demo_slug, $category_slug ) {
	if ( function_exists( 'wpp_demo_find_post_id' ) ) {
		$product_id = wpp_demo_find_post_id( 'product', 'product:' . sanitize_title( $demo_slug ) );
		if ( $product_id ) {
			return wc_get_product( $product_id );
		}
	}

	$products = wc_get_products( array(
		'status'   => 'publish',
		'limit'    => 1,
		'category' => array( sanitize_title( $category_slug ) ),
		'orderby'  => 'popularity',
	) );

	return $products ? $products[0] : false;
}

/** Extract stable heading anchors from editorial content for its table of contents. */
function wpp_content_headings( $content ) {
	$headings = array();
	if ( ! is_string( $content ) || ! preg_match_all( '~<h([2-3])\b([^>]*)>(.*?)</h\1>~is', $content, $matches, PREG_SET_ORDER ) ) {
		return $headings;
	}

	foreach ( $matches as $match ) {
		$level = (int) $match[1];
		if ( ! preg_match( '/id="([^"]+)"/i', $match[2], $id_match ) ) {
			continue;
		}
		$title = trim( wp_strip_all_tags( html_entity_decode( $match[3], ENT_QUOTES, get_bloginfo( 'charset' ) ) ) );
		if ( $title ) {
			$headings[] = array( 'id' => sanitize_html_class( $id_match[1] ), 'title' => $title, 'level' => $level );
		}
	}

	return $headings;
}

/** Reading duration from the imported layout, with an estimate for later editorial posts. */
function wpp_post_read_time( $post_id = 0 ) {
	$post_id = $post_id ? absint( $post_id ) : get_the_ID();
	$minutes = (int) get_post_meta( $post_id, '_wpp_demo_read_time', true );
	if ( $minutes > 0 ) {
		return $minutes;
	}
	$content = get_post_field( 'post_content', $post_id );
	$words = array();
	preg_match_all( '/[\\p{L}\\p{N}]+/u', wp_strip_all_tags( strip_shortcodes( $content ) ), $words );

	return max( 1, (int) ceil( count( $words[0] ) / 180 ) );
}

/** Prefer the byline copied from the supplied article layout; otherwise use WordPress authorship. */
function wpp_post_author_label( $post_id = 0 ) {
	$post_id = $post_id ? absint( $post_id ) : get_the_ID();
	$author  = get_post_meta( $post_id, '_wpp_demo_author', true );

	return $author ? sanitize_text_field( $author ) : get_the_author_meta( 'display_name', (int) get_post_field( 'post_author', $post_id ) );
}

/** Return the current cart count safely when WooCommerce is inactive or still booting. */
function wpp_get_cart_count() {
	if ( function_exists( 'WC' ) && WC() && WC()->cart ) {
		return (int) WC()->cart->get_cart_contents_count();
	}

	return 0;
}
