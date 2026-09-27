<?php
/** Product thumbnail component for the WooCommerce loop card. */
defined( 'ABSPATH' ) || exit;

global $product;

if ( ! $product instanceof WC_Product ) {
	return;
}

$image = woocommerce_get_product_thumbnail();
if ( $image ) {
	echo wp_kses_post( $image );
}
