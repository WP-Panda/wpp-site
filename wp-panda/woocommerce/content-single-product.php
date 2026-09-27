<?php
/**
 * Single-product presentation with the complete standard WooCommerce action sequence.
 *
 * @package WooCommerce\Templates
 * @version 3.6.0
 */
defined( 'ABSPATH' ) || exit;
global $product;

do_action( 'woocommerce_before_single_product' );

if ( post_password_required() ) {
	echo get_the_password_form(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	return;
}

if ( ! is_a( $product, 'WC_Product' ) ) {
	$product = wc_get_product( get_the_ID() );
}
?>
<article id="product-<?php the_ID(); ?>" <?php wc_product_class( 'wpp-single-product item-page', $product ); ?>>
	<div class="wpp-single-product__inner mx-auto max-w-[1200px] px-4 pb-16 pt-6 sm:px-6 lg:pb-20">
		<div class="item-layout item-layout--details">
			<div class="item-media wpp-single-product__media">
				<?php do_action( 'woocommerce_before_single_product_summary' ); ?>
			</div>

			<aside class="item-sidebar wpp-single-product__sidebar">
				<div class="item-buy summary entry-summary wpp-single-product__summary">
					<?php do_action( 'woocommerce_single_product_summary' ); ?>
				</div>
			</aside>

			<div class="item-content wpp-single-product__content">
				<?php do_action( 'woocommerce_after_single_product_summary' ); ?>
			</div>
		</div>
	</div>
</article>
<?php do_action( 'woocommerce_after_single_product' ); ?>
