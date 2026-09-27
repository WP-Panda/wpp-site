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
add_filter( 'woocommerce_add_to_cart_fragments', 'wpp_catalog_cart_bar_fragment' );
add_action( 'wp_footer', 'wpp_render_catalog_cart_bar', 15 );

/** Return the cart's current product names and total for the catalog's sticky summary. */
function wpp_catalog_cart_bar_markup() {
	if ( ! function_exists( 'WC' ) || ! WC() || ! WC()->cart ) {
		return '';
	}

	$items = WC()->cart->get_cart();
	$count = WC()->cart->get_cart_contents_count();
	$names = array();
	foreach ( $items as $cart_item ) {
		if ( ! empty( $cart_item['data'] ) && $cart_item['data'] instanceof WC_Product ) {
			$names[] = $cart_item['data']->get_name();
		}
	}
	$summary = $names ? implode( ', ', array_slice( $names, 0, 2 ) ) : __( 'Корзина пока пуста', 'wp-panda' );
	if ( count( $names ) > 2 ) {
		$summary .= sprintf( ' %s %s', __( 'и ещё', 'wp-panda' ), number_format_i18n( count( $names ) - 2 ) );
	}
	$total = wc_price( (float) WC()->cart->get_total( 'edit' ) );
	ob_start();
	?>
	<div class="wpp-catalog-cart-bar<?php echo $count ? '' : ' is-empty'; ?>" aria-live="polite">
		<div class="wpp-catalog-cart-bar__inner">
			<span class="wpp-catalog-cart-bar__icon" aria-hidden="true"><?php echo wpp_icon( 'cart', 'h-5 w-5' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
			<div class="wpp-catalog-cart-bar__summary"><small><?php esc_html_e( 'В корзине', 'wp-panda' ); ?></small><strong><?php echo esc_html( $summary ); ?></strong><span class="wpp-catalog-cart-bar__count"><?php echo esc_html( sprintf( _n( '%s товар', '%s товаров', $count, 'wp-panda' ), number_format_i18n( $count ) ) ); ?></span></div>
			<div class="wpp-catalog-cart-bar__total"><small><?php esc_html_e( 'Итого', 'wp-panda' ); ?></small><strong><?php echo wp_kses_post( $total ); ?></strong></div>
			<div class="wpp-catalog-cart-bar__actions"><a class="button button--light" href="<?php echo esc_url( wc_get_cart_url() ); ?>"><?php esc_html_e( 'Корзина', 'wp-panda' ); ?></a><a class="button button--brand" href="<?php echo esc_url( wc_get_checkout_url() ); ?>"><?php esc_html_e( 'Оформить', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a></div>
		</div>
	</div>
	<?php
	return (string) ob_get_clean();
}

/** Replace the sticky cart summary after WooCommerce updates its normal fragments. */
function wpp_catalog_cart_bar_fragment( $fragments ) {
	$markup = wpp_catalog_cart_bar_markup();
	if ( $markup ) {
		$fragments['div.wpp-catalog-cart-bar'] = $markup;
	}

	return $fragments;
}

/** Render the real, session-backed cart bar on WooCommerce catalog archives. */
function wpp_render_catalog_cart_bar() {
	$is_catalog = ( function_exists( 'is_shop' ) && is_shop() ) || ( function_exists( 'is_product_taxonomy' ) && is_product_taxonomy() );
	if ( is_search() ) {
		$search_type = get_query_var( 'post_type' );
		$is_catalog  = $is_catalog || 'product' === $search_type || ( is_array( $search_type ) && in_array( 'product', $search_type, true ) );
	}

	if ( $is_catalog ) {
		echo wpp_catalog_cart_bar_markup(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}

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

/** Build the three native product-category archive tabs. */
function wpp_catalog_tabs() {
	$shop_url   = wc_get_page_permalink( 'shop' );
	$shop_url   = $shop_url ? $shop_url : home_url( '/shop/' );
	$shop_url   = remove_query_arg( array( 'wpp_tag', 'wpp_view', 'paged', 'product-page' ), $shop_url );
	$counts     = wp_count_posts( 'product' );
	$all_count  = $counts && isset( $counts->publish ) ? (int) $counts->publish : 0;
	$theme_term = get_term_by( 'slug', 'wordpress-themes', 'product_cat' );
	$plugin_term = get_term_by( 'slug', 'wordpress-plugins', 'product_cat' );

	$theme_url = $theme_term && ! is_wp_error( $theme_term ) ? get_term_link( $theme_term ) : $shop_url;
	$plugin_url = $plugin_term && ! is_wp_error( $plugin_term ) ? get_term_link( $plugin_term ) : $shop_url;
	$theme_url = is_wp_error( $theme_url ) ? $shop_url : $theme_url;
	$plugin_url = is_wp_error( $plugin_url ) ? $shop_url : $plugin_url;

	return array(
		'all' => array(
			'label' => __( 'Все', 'wp-panda' ),
			'count' => $all_count,
			'url'   => wpp_catalog_filter_url( $shop_url, '' ),
		),
		'themes' => array(
			'label' => __( 'Темы', 'wp-panda' ),
			'count' => $theme_term && ! is_wp_error( $theme_term ) ? (int) $theme_term->count : 0,
			'url'   => wpp_catalog_filter_url( $theme_url, null ),
		),
		'plugins' => array(
			'label' => __( 'Плагины', 'wp-panda' ),
			'count' => $plugin_term && ! is_wp_error( $plugin_term ) ? (int) $plugin_term->count : 0,
			'url'   => wpp_catalog_filter_url( $plugin_url, null ),
		),
	);
}

/** Identify the active WooCommerce product category tab. */
function wpp_catalog_current_tab() {
	$search_type = is_search() ? get_query_var( 'post_type' ) : '';
	$is_product_search = 'product' === $search_type || ( is_array( $search_type ) && in_array( 'product', $search_type, true ) );
	$current_tab = is_shop() || $is_product_search ? 'all' : '';

	if ( ! is_product_category() ) {
		return $current_tab;
	}

	$current_term = get_queried_object();
	$theme_term   = get_term_by( 'slug', 'wordpress-themes', 'product_cat' );
	$plugin_term  = get_term_by( 'slug', 'wordpress-plugins', 'product_cat' );
	if ( ! $current_term || is_wp_error( $current_term ) ) {
		return $current_tab;
	}

	if ( $theme_term && ! is_wp_error( $theme_term ) && ( (int) $current_term->term_id === (int) $theme_term->term_id || term_is_ancestor_of( $theme_term->term_id, $current_term->term_id, 'product_cat' ) ) ) {
		return 'themes';
	}
	if ( $plugin_term && ! is_wp_error( $plugin_term ) && ( (int) $current_term->term_id === (int) $plugin_term->term_id || term_is_ancestor_of( $plugin_term->term_id, $current_term->term_id, 'product_cat' ) ) ) {
		return 'plugins';
	}

	return '';
}

/** A clean archive URL for filter and view links, without the current page number. */
function wpp_catalog_filter_base_url() {
	return remove_query_arg( array( 'wpp_tag', 'wpp_view', 'paged', 'product-page' ), get_pagenum_link( 1 ) );
}

/** Current grid/list presentation requested by the visitor. */
function wpp_catalog_current_view() {
	if ( isset( $_GET['wpp_view'] ) && is_string( $_GET['wpp_view'] ) && 'list' === sanitize_key( wp_unslash( $_GET['wpp_view'] ) ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return 'list';
	}

	return 'grid';
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

/** Render each card detail through WooCommerce's template loader. */
function wpp_catalog_loop_product_meta() {
	wc_get_template( 'loop/product-card-meta.php' );
}
add_action( 'woocommerce_shop_loop_item_title', 'wpp_catalog_loop_product_meta', 5 );

/** Keep WooCommerce's catalog sorting control beside the filters in the reference layout. */
function wpp_catalog_move_ordering_control() {
	$is_catalog = ( function_exists( 'is_shop' ) && is_shop() ) || ( function_exists( 'is_product_taxonomy' ) && is_product_taxonomy() );
	if ( is_search() ) {
		$search_type = get_query_var( 'post_type' );
		$is_catalog  = $is_catalog || 'product' === $search_type || ( is_array( $search_type ) && in_array( 'product', $search_type, true ) );
	}

	if ( ! $is_catalog || ! function_exists( 'woocommerce_catalog_ordering' ) ) {
		return;
	}

	remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );
	add_action( 'wpp_catalog_ordering_control', 'woocommerce_catalog_ordering' );
}
add_action( 'wp', 'wpp_catalog_move_ordering_control', 20 );

function wpp_catalog_loop_product_description() {
	wc_get_template( 'single-product/short-description.php' );
}
add_action( 'woocommerce_shop_loop_item_title', 'wpp_catalog_loop_product_description', 20 );

function wpp_catalog_loop_product_compatibility() {
	wc_get_template( 'loop/product-card-compatibility.php' );
}
add_action( 'woocommerce_shop_loop_item_title', 'wpp_catalog_loop_product_compatibility', 25 );

/** Keep the standard thumbnail hook but load its markup from a theme WooCommerce template. */
function wpp_catalog_loop_product_thumbnail() {
	wc_get_template( 'loop/product-thumbnail.php' );
}
remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail', 10 );
add_action( 'woocommerce_before_shop_loop_item_title', 'wpp_catalog_loop_product_thumbnail', 10 );

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
