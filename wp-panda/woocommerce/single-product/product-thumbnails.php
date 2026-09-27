<?php
/**
 * Single product thumbnails compatible with supported WooCommerce releases.
 *
 * @package WooCommerce\Templates
 * @version 9.0.0
 */
defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'wc_get_gallery_image_html' ) ) {
	return;
}

global $product;
if ( ! $product instanceof WC_Product ) {
	return;
}

foreach ( $product->get_gallery_image_ids() as $attachment_id ) {
	if ( ! $attachment_id ) {
		continue;
	}
	echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', wc_get_gallery_image_html( $attachment_id ), $attachment_id ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}
