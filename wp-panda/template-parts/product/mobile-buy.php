<?php
/** Compact mobile purchase shortcut that leads to the native WooCommerce form. */
defined( 'ABSPATH' ) || exit;

global $product;
if ( ! $product instanceof WC_Product || ! $product->is_purchasable() ) {
	return;
}
?>
<div class="wpp-product-sticky-buy" aria-label="<?php esc_attr_e( 'Купить товар', 'wp-panda' ); ?>">
	<div class="wpp-product-sticky-buy__inner">
		<div class="wpp-product-sticky-buy__price">
			<span><?php echo esc_html( $product->get_name() ); ?></span>
			<strong><?php echo wp_kses_post( $product->get_price_html() ); ?></strong>
		</div>
		<a class="button button--brand" href="#wpp-product-purchase"><?php esc_html_e( 'Купить', 'wp-panda' ); ?></a>
	</div>
</div>
