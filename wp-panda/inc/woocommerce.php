<?php
/** WooCommerce-specific theme integration. */

defined( 'ABSPATH' ) || exit;

/** Update the header cart count through WooCommerce's normal AJAX fragment mechanism. */
function wpp_cart_count_fragment( $fragments ) {
	$count = wpp_get_cart_count();
	$label = sprintf(
		/* translators: %s: number of products in the cart. */
		__( 'Корзина, товаров: %s', 'wp-panda' ),
		number_format_i18n( $count )
	);

	$fragments['span.wpp-cart-count'] = '<span class="wpp-cart-count" aria-label="' . esc_attr( $label ) . '">' . esc_html( number_format_i18n( $count ) ) . '</span>';

	return $fragments;
}
add_filter( 'woocommerce_add_to_cart_fragments', 'wpp_cart_count_fragment' );

/** Use the catalog label from the reference layout while keeping WooCommerce's title hook. */
function wpp_catalog_archive_title( $title ) {
	if ( function_exists( 'is_shop' ) && is_shop() && ! is_search() ) {
		return __( 'Каталог', 'wp-panda' );
	}

	return $title;
}
add_filter( 'woocommerce_page_title', 'wpp_catalog_archive_title', 20 );

/** Read a valid product-tag filter from the catalog URL. */
function wpp_catalog_active_tag() {
	if ( ! isset( $_GET['wpp_tag'] ) || ! is_string( $_GET['wpp_tag'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return false;
	}

	$slug = sanitize_title( wp_unslash( $_GET['wpp_tag'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	if ( '' === $slug ) {
		return false;
	}
	$term = get_term_by( 'slug', $slug, 'product_tag' );

	return $term && ! is_wp_error( $term ) ? $term : false;
}

/** Build a catalog link while keeping useful WooCommerce ordering and view state. */
function wpp_catalog_filter_url( $url, $tag_slug = null, $view = null ) {
	$args = array();

	if ( null === $tag_slug ) {
		$active_tag = wpp_catalog_active_tag();
		$tag_slug   = $active_tag ? $active_tag->slug : '';
	}
	if ( $tag_slug ) {
		$args['wpp_tag'] = sanitize_title( $tag_slug );
	}

	if ( null === $view ) {
		$view = isset( $_GET['wpp_view'] ) && is_string( $_GET['wpp_view'] ) ? sanitize_key( wp_unslash( $_GET['wpp_view'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	}
	if ( 'list' === $view ) {
		$args['wpp_view'] = 'list';
	}

	if ( isset( $_GET['orderby'] ) && is_string( $_GET['orderby'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$args['orderby'] = sanitize_key( wp_unslash( $_GET['orderby'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	}
	if ( isset( $_GET['s'] ) && is_string( $_GET['s'] ) && '' !== trim( wp_unslash( $_GET['s'] ) ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$args['s']        = sanitize_text_field( wp_unslash( $_GET['s'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$args['post_type'] = 'product';
	}

	return $args ? add_query_arg( $args, $url ) : $url;
}

/** Return visible product tags used as topic filters, excluding platform/compatibility labels. */
function wpp_catalog_topic_tags() {
	$terms = get_terms( array(
		'taxonomy'   => 'product_tag',
		'hide_empty' => true,
	) );
	if ( is_wp_error( $terms ) || ! $terms ) {
		return array();
	}

	$excluded = array( 'wordpress', 'gutenberg', 'elementor', 'woocommerce', 'wpml' );
	$terms    = array_values( array_filter( $terms, function ( $term ) use ( $excluded ) {
		return ! in_array( strtolower( $term->slug ), $excluded, true );
	} ) );
	$order = array(
		'Агентство',
		'Интернет-магазин',
		'Кафе и рестораны',
		'Блог и медиа',
		'Спорт и фитнес',
		'Недвижимость',
		'SEO',
		'Безопасность',
		'Скорость',
		'Бронирование',
		'Формы',
		'Мультиязычность',
		'Маркетинг',
	);

	usort( $terms, function ( $left, $right ) use ( $order ) {
		$left_position  = array_search( $left->name, $order, true );
		$right_position = array_search( $right->name, $order, true );
		$left_position  = false === $left_position ? count( $order ) : $left_position;
		$right_position = false === $right_position ? count( $order ) : $right_position;

		if ( $left_position === $right_position ) {
			return strcasecmp( $left->name, $right->name );
		}

		return $left_position < $right_position ? -1 : 1;
	} );

	return $terms;
}

/** Return available compatibility tags that exist in this store. */
function wpp_catalog_compatibility_tags() {
	$terms = array();
	foreach ( array( 'Gutenberg', 'Elementor', 'WooCommerce', 'WPML' ) as $name ) {
		$term = get_term_by( 'name', $name, 'product_tag' );
		if ( $term && ! is_wp_error( $term ) && (int) $term->count > 0 ) {
			$terms[] = $term;
		}
	}

	return $terms;
}

/** Apply the selected product tag through WooCommerce's main product query. */
function wpp_catalog_filter_product_query( $query ) {
	if ( is_admin() || ! is_object( $query ) || ! method_exists( $query, 'get' ) || ! method_exists( $query, 'set' ) || ( method_exists( $query, 'is_main_query' ) && ! $query->is_main_query() ) ) {
		return;
	}

	$term = wpp_catalog_active_tag();
	if ( ! $term ) {
		return;
	}

	$tax_query   = (array) $query->get( 'tax_query' );
	$tax_query[] = array(
		'taxonomy' => 'product_tag',
		'field'    => 'term_id',
		'terms'    => array( (int) $term->term_id ),
	);
	$query->set( 'tax_query', $tax_query );
}
add_action( 'woocommerce_product_query', 'wpp_catalog_filter_product_query', 20 );

/** Toggle grid/list presentation without replacing WooCommerce's loop query or templates. */
function wpp_catalog_view_body_class( $classes ) {
	$is_catalog = ( function_exists( 'is_shop' ) && is_shop() ) || ( function_exists( 'is_product_taxonomy' ) && is_product_taxonomy() );
	if ( is_search() ) {
		$search_type = get_query_var( 'post_type' );
		$is_catalog  = $is_catalog || 'product' === $search_type || ( is_array( $search_type ) && in_array( 'product', $search_type, true ) );
	}

	if ( $is_catalog ) {
		$view = isset( $_GET['wpp_view'] ) && is_string( $_GET['wpp_view'] ) ? sanitize_key( wp_unslash( $_GET['wpp_view'] ) ) : 'grid'; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( 'list' === $view ) {
			$classes[] = 'wpp-catalog-view-list';
		}
	}

	return $classes;
}
add_filter( 'body_class', 'wpp_catalog_view_body_class' );
