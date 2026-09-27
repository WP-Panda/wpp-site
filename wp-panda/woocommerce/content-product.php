<?php
/**
 * Product card template. Standard WooCommerce loop hooks are deliberately retained.
 *
 * @package WooCommerce\Templates
 * @version 9.4.0
 */
defined( 'ABSPATH' ) || exit;
global $product;

if ( ! is_a( $product, 'WC_Product' ) || ! $product->is_visible() ) {
	return;
}

$product_terms = get_the_terms( $product->get_id(), 'product_cat' );
$category_name = ( ! is_wp_error( $product_terms ) && ! empty( $product_terms ) ) ? $product_terms[0]->name : '';
?>
<li <?php wc_product_class( 'wpp-product-card-wrap', $product ); ?>>
	<div class="wpp-product-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-2.5 transition-all duration-300 hover:-translate-y-1">
		<?php do_action( 'woocommerce_before_shop_loop_item' ); ?>
		<div class="wpp-product-card__body">
			<div class="wpp-product-card__media">
				<?php do_action( 'woocommerce_before_shop_loop_item_title' ); ?>
			</div>
			<div class="wpp-product-card__content">
				<?php if ( $category_name ) : ?><div class="wpp-product-card__category"><?php echo esc_html( $category_name ); ?></div><?php endif; ?>
				<?php do_action( 'woocommerce_shop_loop_item_title' ); ?>
				<?php do_action( 'woocommerce_after_shop_loop_item_title' ); ?>
			</div>
		</div>
		<?php do_action( 'woocommerce_after_shop_loop_item' ); ?>
	</div>
</li>
