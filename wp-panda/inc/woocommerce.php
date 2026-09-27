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
