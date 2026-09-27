<?php
/** WooCommerce product-card wrapper built from the native loop actions. */

defined( 'ABSPATH' ) || exit;
global $product;

if ( ! is_a( $product, 'WC_Product' ) || ! $product->is_visible() ) {
	return;
}
?>
<li <?php wc_product_class( 'wpp-product-card-wrap', $product ); ?>>
	<article class="wpp-product-card">
		<?php do_action( 'woocommerce_before_shop_loop_item' ); ?>
		<div class="wpp-product-card__media">
			<?php do_action( 'woocommerce_before_shop_loop_item_title' ); ?>
		</div>
		<div class="wpp-product-card__content">
			<?php do_action( 'woocommerce_shop_loop_item_title' ); ?>
			<?php do_action( 'woocommerce_after_shop_loop_item_title' ); ?>
		</div>
		<?php do_action( 'woocommerce_after_shop_loop_item' ); ?>
	</article>
</li>
