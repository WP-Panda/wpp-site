<?php
/**
 * WooCommerce integration: catalog behaviour, AJAX helpers, wishlist.
 *
 * The theme never replaces WooCommerce handlers — cart, orders, payments,
 * variations, fields and endpoints remain stock; only presentation and a few
 * convenience endpoints are added.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

add_action( 'wp_ajax_wpp_search', 'wpp_handle_search' );
add_action( 'wp_ajax_nopriv_wpp_search', 'wpp_handle_search' );
add_action( 'wp_ajax_wpp_mini_cart', 'wpp_handle_mini_cart' );
add_action( 'wp_ajax_nopriv_wpp_mini_cart', 'wpp_handle_mini_cart' );
add_action( 'wp_ajax_wpp_cart_remove', 'wpp_handle_cart_remove' );
add_action( 'wp_ajax_nopriv_wpp_cart_remove', 'wpp_handle_cart_remove' );
add_action( 'wp_ajax_wpp_cart_variation', 'wpp_handle_cart_variation' );
add_action( 'wp_ajax_nopriv_wpp_cart_variation', 'wpp_handle_cart_variation' );
add_action( 'wp_ajax_wpp_apply_coupon', 'wpp_handle_apply_coupon' );
add_action( 'wp_ajax_nopriv_wpp_apply_coupon', 'wpp_handle_apply_coupon' );
add_action( 'wp_ajax_wpp_toggle_wishlist', 'wpp_handle_toggle_wishlist' );
add_action( 'wp_ajax_nopriv_wpp_toggle_wishlist', 'wpp_handle_toggle_wishlist' );
add_filter( 'woocommerce_get_catalog_ordering_args', 'wpp_catalog_ordering_args' );
add_filter( 'woocommerce_product_query', 'wpp_catalog_popularity_default' );

/** Live product search used by the header panel. */
function wpp_handle_search() {
	check_ajax_referer( 'wpp-search', 'nonce' );
	$q = sanitize_text_field( wp_unslash( isset( $_POST['q'] ) ? $_POST['q'] : '' ) );
	if ( '' === $q || ! class_exists( 'WooCommerce' ) ) {
		wp_send_json_success( array( 'count' => 0, 'rows' => '' ) );
	}
	$products = wc_get_products( array(
		's'      => $q,
		'status' => 'publish',
		'limit'  => 6,
	) );
	$rows = '';
	foreach ( $products as $product ) {
		$rows .= wpp_search_row_html( $product );
	}
	wp_send_json_success( array( 'count' => count( $products ), 'rows' => $rows ) );
}

/** One result row exactly as printed by the layout search popover. */
function wpp_search_row_html( $product ) {
	ob_start();
	?>
	<a class="flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:bg-soft" href="<?php echo esc_url( get_permalink( $product->get_id() ) ); ?>">
		<?php echo wpp_product_mini_tile( $product ); ?>
		<span class="min-w-0 flex-1">
			<span class="block text-sm font-semibold"><?php echo esc_html( $product->get_name() ); ?></span>
			<span class="block truncate text-xs text-muted"><?php echo esc_html( wp_strip_all_tags( $product->get_short_description() ) ); ?></span>
		</span>
		<span class="text-sm font-bold tabular-nums"><?php echo wpp_format_amount( $product->get_price() ); ?></span>
	</a>
	<?php
	return ob_get_clean();
}

/** Drawer refresh payload: content, counters, subtitle and total. */
function wpp_handle_mini_cart() {
	check_ajax_referer( 'wpp-cart', 'nonce' );
	if ( ! class_exists( 'WooCommerce' ) ) {
		wp_send_json_error();
	}
	ob_start();
	woocommerce_mini_cart();
	$html = ob_get_clean();
	$count = WC()->cart->get_cart_contents_count();
	wp_send_json_success( array(
		'html'     => $html,
		'count'    => $count,
		'subtitle' => $count > 0 ? sprintf( _n( '%s товар', '%s товара', $count, 'wp-panda' ), number_format_i18n( $count ) ) : __( 'Пока пусто', 'wp-panda' ),
		'total'    => wpp_format_amount( WC()->cart->get_total( 'edit' ) ),
	) );
}

/** Remove a cart line from the drawer. */
function wpp_handle_cart_remove() {
	check_ajax_referer( 'wpp-cart', 'nonce' );
	$key = sanitize_text_field( wp_unslash( isset( $_POST['key'] ) ? $_POST['key'] : '' ) );
	if ( $key && class_exists( 'WooCommerce' ) ) {
		WC()->cart->remove_cart_item( $key );
	}
	wp_send_json_success();
}

/** Switch a cart line between the «1 сайт» / «5 сайтов» variations. */
function wpp_handle_cart_variation() {
	check_ajax_referer( 'wpp-cart', 'nonce' );
	$key         = sanitize_text_field( wp_unslash( isset( $_POST['key'] ) ? $_POST['key'] : '' ) );
	$variation_id = absint( isset( $_POST['variation'] ) ? $_POST['variation'] : 0 );
	if ( ! $key || ! $variation_id || ! class_exists( 'WooCommerce' ) ) {
		wp_send_json_error();
	}
	$cart_item = WC()->cart->get_cart_item( $key );
	if ( ! $cart_item ) {
		wp_send_json_error();
	}
	$variation = wc_get_product( $variation_id );
	if ( ! $variation ) {
		wp_send_json_error();
	}
	$quantity = $cart_item['quantity'];
	WC()->cart->remove_cart_item( $key );
	$added = WC()->cart->add_to_cart( $variation->get_parent_id(), $quantity, $variation_id, $variation->get_attributes() );
	if ( ! $added ) {
		wp_send_json_error();
	}
	wp_send_json_success();
}

/** Apply a coupon from the drawer form. */
function wpp_handle_apply_coupon() {
	check_ajax_referer( 'wpp-cart', 'nonce' );
	$code = sanitize_text_field( wp_unslash( isset( $_POST['code'] ) ? $_POST['code'] : '' ) );
	if ( ! $code || ! class_exists( 'WooCommerce' ) ) {
		wp_send_json_success( array( 'notice' => __( 'Введите промокод', 'wp-panda' ) ) );
	}
	if ( WC()->cart->apply_coupon( $code ) ) {
		wp_send_json_success( array( 'notice' => sprintf( __( 'Промокод %s применён', 'wp-panda' ), $code ) ) );
	}
	wp_send_json_success( array( 'notice' => __( 'Промокод не найден', 'wp-panda' ) ) );
}

/* ------------------------------------------------------------------------ */
/* Wishlist: per-user meta for customers, session for guests.                */
/* ------------------------------------------------------------------------ */

/** Current wishlist product ids. */
function wpp_get_wishlist_ids() {
	if ( is_user_logged_in() ) {
		$ids = get_user_meta( get_current_user_id(), '_wpp_wishlist', true );
	} else {
		$ids = isset( $_SESSION['_wpp_wishlist'] ) ? $_SESSION['_wpp_wishlist'] : array();
	}
	return is_array( $ids ) ? array_map( 'absint', $ids ) : array();
}

/** Whether a product is wishlisted by the visitor. */
function wpp_in_wishlist( $product_id ) {
	return in_array( absint( $product_id ), wpp_get_wishlist_ids(), true );
}

/** Toggle handler. */
function wpp_handle_toggle_wishlist() {
	check_ajax_referer( 'wpp-wishlist', 'nonce' );
	$product_id = absint( isset( $_POST['product_id'] ) ? $_POST['product_id'] : 0 );
	if ( ! $product_id ) {
		wp_send_json_error();
	}
	$ids = wpp_get_wishlist_ids();
	if ( in_array( $product_id, $ids, true ) ) {
		$ids    = array_values( array_diff( $ids, array( $product_id ) ) );
		$active = false;
	} else {
		$ids[]  = $product_id;
		$active = true;
	}
	if ( is_user_logged_in() ) {
		update_user_meta( get_current_user_id(), '_wpp_wishlist', $ids );
	} else {
		wpp_session_start();
		$_SESSION['_wpp_wishlist'] = $ids;
	}
	wp_send_json_success( array( 'active' => $active, 'ids' => $ids ) );
}

/** PHP session for guest wishlists. */
function wpp_session_start() {
	if ( ! session_id() && ! headers_sent() ) {
		session_start();
	}
}
add_action( 'init', 'wpp_session_start', 1 );

/** Merge guest wishlist into the user account on login. */
function wpp_merge_wishlist_on_login( $user_id ) {
	wpp_session_start();
	if ( empty( $_SESSION['_wpp_wishlist'] ) ) {
		return;
	}
	$merged = array_unique( array_merge( wpp_get_wishlist_ids(), array_map( 'absint', $_SESSION['_wpp_wishlist'] ) ) );
	update_user_meta( $user_id, '_wpp_wishlist', $merged );
	unset( $_SESSION['_wpp_wishlist'] );
}
add_action( 'wp_login', 'wpp_merge_wishlist_on_login' );

/* ------------------------------------------------------------------------ */
/* Catalog behaviour.                                                        */
/* ------------------------------------------------------------------------ */

/** Map the layout sort select to WooCommerce orderby values. */
function wpp_catalog_ordering_args( $args ) {
	$orderby = isset( $_GET['orderby'] ) ? sanitize_key( wp_unslash( $_GET['orderby'] ) ) : '';
	if ( ! $orderby ) {
		return $args;
	}
	$map = array(
		'popular'    => 'popularity',
		'rating'     => 'rating',
		'price-asc'  => 'price',
		'price-desc' => 'price-desc',
	);
	if ( isset( $map[ $orderby ] ) ) {
		$_GET['orderby'] = $map[ $orderby ];
	}
	return $args;
}

/** A one-product recommendation for the drawer, not yet in cart. */
function wpp_get_cross_sell() {
	if ( ! class_exists( 'WooCommerce' ) || WC()->cart->is_empty() ) {
		return null;
	}
	$in_cart = array();
	foreach ( WC()->cart->get_cart() as $item ) {
		$in_cart[] = (int) $item['product_id'];
	}
	$candidates = wc_get_products( array(
		'status'   => 'publish',
		'limit'    => 8,
		'category' => array( 'wordpress-plugins', 'plugins' ),
		'orderby'  => 'popularity',
	) );
	if ( ! $candidates ) {
		$candidates = wc_get_products( array( 'status' => 'publish', 'limit' => 8, 'orderby' => 'popularity' ) );
	}
	foreach ( $candidates as $candidate ) {
		if ( ! in_array( $candidate->get_id(), $in_cart, true ) ) {
			return $candidate;
		}
	}
	return null;
}

/** Keep the popularity meta usable for fresh stores. */
function wpp_catalog_popularity_default( $query ) {
	if ( ! is_admin() && isset( $query->query_vars['orderby'] ) && 'popularity' === $query->query_vars['orderby'] ) {
		$query->query_vars['meta_key'] = 'total_sales';
	}
}

/** Sale percent for the corner badge (−27%). */
function wpp_sale_percent( $product ) {
	$regular = (float) $product->get_regular_price();
	$price   = (float) $product->get_price();
	if ( $regular <= 0 || $price <= 0 || $price >= $regular ) {
		return 0;
	}
	return (int) round( ( $regular - $price ) / $regular * 100 );
}

/** Whether the product (or one of its variations) sits in the cart. */
function wpp_product_in_cart( $product_id ) {
	if ( ! function_exists( 'WC' ) || ! WC() || ! WC()->cart ) {
		return false;
	}
	$ids = array_merge( array_column( WC()->cart->get_cart(), 'product_id' ), array_column( WC()->cart->get_cart(), 'variation_id' ) );
	return in_array( absint( $product_id ), array_map( 'absint', $ids ), true );
}

/* ------------------------------------------------------------------------ */
/* Checkout fields: layout uses contact + payment + extra cards.            */
/* ------------------------------------------------------------------------ */

/** Trim and re-label billing fields for the custom checkout layout. */
function wpp_checkout_fields_filter( $fields ) {
	unset( $fields['billing']['billing_address_1'], $fields['billing']['billing_address_2'], $fields['billing']['billing_postcode'], $fields['billing']['billing_state'] );
	if ( isset( $fields['shipping'] ) ) {
		unset( $fields['shipping'] );
	}

	$labels = array(
		'billing_first_name' => __( 'Имя', 'wp-panda' ),
		'billing_last_name'  => __( 'Фамилия', 'wp-panda' ),
		'billing_email'      => __( 'Email', 'wp-panda' ),
		'billing_phone'      => __( 'Телефон', 'wp-panda' ),
		'billing_country'    => __( 'Страна', 'wp-panda' ),
		'billing_city'       => __( 'Город', 'wp-panda' ),
		'billing_company'    => __( 'Компания', 'wp-panda' ),
	);
	foreach ( $labels as $key => $label ) {
		if ( isset( $fields['billing'][ $key ] ) ) {
			$fields['billing'][ $key ]['label']       = $label;
			$fields['billing'][ $key ]['label_class'] = array( 'screen-reader-text' );
		}
	}
	if ( isset( $fields['billing']['billing_first_name'] ) ) {
		$fields['billing']['billing_first_name']['placeholder'] = __( 'Введите имя', 'wp-panda' );
	}
	if ( isset( $fields['billing']['billing_last_name'] ) ) {
		$fields['billing']['billing_last_name']['placeholder'] = __( 'Введите фамилию', 'wp-panda' );
	}
	if ( isset( $fields['billing']['billing_email'] ) ) {
		$fields['billing']['billing_email']['placeholder'] = 'you@example.ru';
	}
	if ( isset( $fields['billing']['billing_phone'] ) ) {
		$fields['billing']['billing_phone']['required']    = false;
		$fields['billing']['billing_phone']['placeholder'] = '+7 (___) ___-__-__';
	}
	if ( isset( $fields['billing']['billing_city'] ) ) {
		$fields['billing']['billing_city']['placeholder'] = __( 'Москва', 'wp-panda' );
		$fields['billing']['billing_city']['required']    = false;
	}
	if ( isset( $fields['billing']['billing_company'] ) ) {
		$fields['billing']['billing_company']['placeholder'] = 'ООО «Пиксель»';
	}
	$fields['billing']['billing_inn'] = array(
		'type'        => 'text',
		'label'       => __( 'ИНН', 'wp-panda' ),
		'label_class' => array( 'screen-reader-text' ),
		'placeholder' => __( 'Для закрывающих документов', 'wp-panda' ),
		'required'    => false,
		'class'       => array( 'form-row-wide' ),
		'priority'    => 75,
	);
	if ( isset( $fields['order']['order_comments'] ) ) {
		unset( $fields['order']['order_comments'] ); // Rendered manually in the layout card.
	}
	return $fields;
}
add_filter( 'woocommerce_checkout_fields', 'wpp_checkout_fields_filter' );

/** Persist the extra checkout fields to the order. */
function wpp_save_checkout_extras( $order_id ) {
	if ( isset( $_POST['wpp_activation_domain'] ) ) {
		update_post_meta( $order_id, '_wpp_activation_domain', sanitize_text_field( wp_unslash( $_POST['wpp_activation_domain'] ) ) );
	}
	if ( isset( $_POST['wpp_source'] ) ) {
		update_post_meta( $order_id, '_wpp_source', sanitize_text_field( wp_unslash( $_POST['wpp_source'] ) ) );
	}
	if ( isset( $_POST['billing_inn'] ) ) {
		update_post_meta( $order_id, '_billing_inn', sanitize_text_field( wp_unslash( $_POST['billing_inn'] ) ) );
	}
}
add_action( 'woocommerce_checkout_update_order_meta', 'wpp_save_checkout_extras' );

/** Skip WC's default checkout CSS classes; inputs restyled by layout.css. */
function wpp_checkout_form_class( $class ) {
	return $class;
}

/**
 * Product query for the home «Популярное на этой неделе» block.
 *
 * Curated order comes from the demo importer (`_wpp_featured_order`);
 * stores without demo content fall back to popularity (total_sales).
 *
 * @param string $kind  '' (all), 'theme' or 'plugin'.
 * @param int    $limit Products per page.
 * @return WP_Query|null
 */
function wpp_featured_products_query( $kind = '', $limit = 8 ) {
	if ( ! class_exists( 'WooCommerce' ) ) {
		return null;
	}
	$args = array(
		'post_type'      => 'product',
		'post_status'    => 'publish',
		'posts_per_page' => (int) $limit,
		'no_found_rows'  => true,
	);
	if ( 'theme' === $kind ) {
		$args['tax_query'] = array(
			array( 'taxonomy' => 'product_cat', 'field' => 'slug', 'terms' => array( 'wordpress-themes', 'themes' ) ),
		);
	} elseif ( 'plugin' === $kind ) {
		$args['tax_query'] = array(
			array( 'taxonomy' => 'product_cat', 'field' => 'slug', 'terms' => array( 'wordpress-plugins', 'plugins' ) ),
		);
	}

	$featured = get_posts( array_merge( $args, array(
		'meta_key' => '_wpp_featured_order',
		'orderby'  => 'meta_value_num',
		'order'    => 'ASC',
		'fields'   => 'ids',
	) ) );

	if ( $featured ) {
		$args['post__in'] = array_map( 'absint', $featured );
		$args['orderby']  = 'post__in';
	} else {
		$args['meta_key'] = 'total_sales';
		$args['orderby']  = 'meta_value_num';
		$args['order']    = 'DESC';
	}

	return new WP_Query( $args );
}
