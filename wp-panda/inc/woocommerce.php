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
add_action( 'wp', 'wpp_prepare_single_product_hooks', 30 );
add_filter( 'woocommerce_product_tabs', 'wpp_customize_product_tabs', 25 );
add_filter( 'woocommerce_product_tabs', 'wpp_add_product_version_history_tab', 30 );
add_filter( 'woocommerce_product_related_products_heading', 'wpp_related_products_heading' );
add_filter( 'woocommerce_dropdown_variation_attribute_options_html', 'wpp_product_variation_picker', 10, 2 );
add_filter( 'woocommerce_product_description_heading', '__return_empty_string' );
add_filter( 'woocommerce_product_additional_information_heading', 'wpp_additional_information_heading' );
add_action( 'woocommerce_before_add_to_cart_button', 'wpp_single_product_purchase_benefits', 5 );

/** Move WooCommerce's native title, rating, breadcrumb and related products into the reference layout. */
function wpp_prepare_single_product_hooks() {
	if ( ! function_exists( 'is_product' ) || ! is_product() ) {
		return;
	}

	remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20 );
	remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
	remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_rating', 10 );
	remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20 );
	remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
	remove_action( 'woocommerce_single_product_summary', 'wpp_single_product_wishlist_button', 39 );
	remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );
}

/** Give WooCommerce's standard specifications heading a Russian storefront label. */
function wpp_additional_information_heading( $heading ) {
	return __( 'Характеристики', 'wp-panda' );
}

/** Return approved product comments that are not already represented by WooCommerce reviews. */
function wpp_get_product_discussion_comments( $product ) {
	if ( ! $product instanceof WC_Product ) {
		return array();
	}

	static $comments_by_product = array();
	$product_id = $product->get_id();
	if ( isset( $comments_by_product[ $product_id ] ) ) {
		return $comments_by_product[ $product_id ];
	}

	$comments = get_comments( array(
		'post_id'       => $product_id,
		'status'        => 'approve',
		'orderby'       => 'comment_date_gmt',
		'order'         => 'DESC',
		'number'        => 0,
		'type__not_in'  => array( 'review', 'order_note' ),
		'meta_query'    => array(
			array(
				'key'     => 'rating',
				'compare' => 'NOT EXISTS',
			),
		),
	) );

	$comments_by_product[ $product_id ] = is_array( $comments ) ? $comments : array();

	return $comments_by_product[ $product_id ];
}

/** Keep specifications in the product sidebar and expose separate, genuine product discussions. */
function wpp_customize_product_tabs( $tabs ) {
	global $product;

	unset( $tabs['additional_information'] );
	$comments = wpp_get_product_discussion_comments( $product );
	if ( $comments ) {
		$tabs['wpp_comments'] = array(
			'title'    => __( 'Комментарии', 'wp-panda' ),
			'priority' => 35,
			'callback' => 'wpp_render_product_comments_tab',
		);
	}

	return $tabs;
}

/** Render non-review comments with WordPress's native comment list and form. */
function wpp_render_product_comments_tab( $key = '', $tab = array() ) {
	wc_get_template( 'single-product/tabs/comments.php' );
}

/** Render WooCommerce's real variation selects as radio-style license choices without replacing the form. */
function wpp_product_variation_picker( $html, $args ) {
	if ( ! is_product() || empty( $args['product'] ) || ! $args['product'] instanceof WC_Product_Variable ) {
		return $html;
	}

	$attribute = isset( $args['attribute'] ) ? (string) $args['attribute'] : '';
	if ( sanitize_title( $attribute ) !== sanitize_title( 'Количество сайтов' ) || empty( $args['options'] ) ) {
		return $html;
	}

	$select_id = ! empty( $args['id'] ) ? (string) $args['id'] : sanitize_title( $attribute );
	$selected  = isset( $args['selected'] ) ? (string) $args['selected'] : '';
	$picker    = '<div class="wpp-variation-picker" data-wpp-variation-picker data-select-id="' . esc_attr( $select_id ) . '" role="radiogroup" aria-label="' . esc_attr__( 'Количество сайтов', 'wp-panda' ) . '" hidden>';

	foreach ( (array) $args['options'] as $option ) {
		$option = (string) $option;
		if ( '' === $option ) {
			continue;
		}
		$label = $option;
		if ( taxonomy_exists( $attribute ) ) {
			$term = get_term_by( 'slug', $option, $attribute );
			if ( $term && ! is_wp_error( $term ) ) {
				$label = $term->name;
			}
		}
		$is_selected = $selected === $option || sanitize_title( $selected ) === sanitize_title( $option );
		$picker     .= '<button class="wpp-variation-picker__option' . ( $is_selected ? ' is-selected' : '' ) . '" type="button" role="radio" aria-checked="' . ( $is_selected ? 'true' : 'false' ) . '" tabindex="' . ( $is_selected ? '0' : '-1' ) . '" data-wpp-variation-value="' . esc_attr( $option ) . '" data-wpp-variation-label="' . esc_attr( $label ) . '"><span class="wpp-variation-picker__dot" aria-hidden="true"></span><span>' . esc_html( $label ) . '</span></button>';
	}

	$picker .= '</div>';

	return $picker . $html;
}

/** Label WooCommerce's genuine related-product loop like the source product-detail layout. */
function wpp_related_products_heading( $heading ) {
	global $product;
	if ( ! $product instanceof WC_Product ) {
		return $heading;
	}

	$categories = wp_get_post_terms( $product->get_id(), 'product_cat', array( 'fields' => 'slugs' ) );
	if ( is_wp_error( $categories ) ) {
		return $heading;
	}

	if ( in_array( 'wordpress-themes', $categories, true ) ) {
		return __( 'Другие темы автора', 'wp-panda' );
	}
	if ( in_array( 'wordpress-plugins', $categories, true ) ) {
		return __( 'Другие плагины автора', 'wp-panda' );
	}

	return $heading;
}

/** Find the existing release-notes section in the product description without fabricating updates. */
function wpp_get_product_changelog_section( $product ) {
	if ( ! $product instanceof WC_Product ) {
		return '';
	}

	$description = $product->get_description();
	if ( ! preg_match_all( '/<section\\b[^>]*>.*?<\\/section>/isu', $description, $sections ) ) {
		return '';
	}

	foreach ( $sections[0] as $section ) {
		if ( false === stripos( wp_strip_all_tags( $section ), 'Последнее обновление' ) ) {
			continue;
		}

		return wp_kses_post( $section );
	}

	return '';
}

/** Add a real version-history tab only when the product description contains release notes. */
function wpp_add_product_version_history_tab( $tabs ) {
	global $product;

	if ( ! $product instanceof WC_Product || ! wpp_get_product_changelog_section( $product ) ) {
		return $tabs;
	}

	$tabs['wpp_version_history'] = array(
		'title'    => __( 'История версий', 'wp-panda' ),
		'priority' => 40,
		'callback' => 'wpp_render_product_version_history_tab',
	);

	return $tabs;
}

/** Render the product's own release notes in the version-history tab. */
function wpp_render_product_version_history_tab( $key = '', $tab = array() ) {
	global $product;
	$history = wpp_get_product_changelog_section( $product );

	if ( $history ) {
		echo $history; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Content is sanitized with wp_kses_post().
	}
}

/** Add stable in-page targets to the demo description's real screenshot and release-note sections. */
function wpp_add_product_description_anchors( $content ) {
	$anchors = array(
		'Продумана до деталей' => 'wpp-product-screenshots',
		'Последнее обновление' => 'wpp-product-changelog',
	);

	return preg_replace_callback( '/<h2\\b([^>]*)>(.*?)<\\/h2>/isu', function ( $matches ) use ( $anchors ) {
		$heading = trim( wp_strip_all_tags( $matches[2] ) );
		foreach ( $anchors as $label => $anchor ) {
			if ( false !== strpos( $heading, $label ) ) {
				if ( preg_match( '/\\bid=/i', $matches[1] ) ) {
					return $matches[0];
				}
				return '<h2 id="' . esc_attr( $anchor ) . '"' . $matches[1] . '>' . $matches[2] . '</h2>';
			}
		}
		return $matches[0];
	}, $content );
}

/** Set expectations honestly while retaining the WooCommerce add-to-cart form. */
function wpp_single_product_purchase_benefits() {
	global $product;
	if ( ! $product instanceof WC_Product ) {
		return;
	}

	$is_demo = (bool) get_post_meta( $product->get_id(), '_wpp_demo_key', true );
	$benefits = array();
	if ( $product->is_downloadable() ) {
		$benefits[] = __( 'Файлы будут доступны через раздел загрузок заказа.', 'wp-panda' );
	} elseif ( $is_demo ) {
		$benefits[] = __( 'Демонстрационная карточка: файлы и активация лицензии не подключены.', 'wp-panda' );
	} else {
		$benefits[] = __( 'Способ предоставления цифрового товара указан продавцом.', 'wp-panda' );
	}
	$benefits[] = __( 'Заказ и статус покупки доступны в личном кабинете.', 'wp-panda' );
	$benefits[] = __( 'Вопрос по товару можно задать через обращения поддержки.', 'wp-panda' );
	?>
	<ul class="wpp-product-purchase-benefits">
		<?php foreach ( $benefits as $benefit ) : ?>
			<li><span aria-hidden="true">✓</span><?php echo esc_html( $benefit ); ?></li>
		<?php endforeach; ?>
	</ul>
	<?php
}

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
