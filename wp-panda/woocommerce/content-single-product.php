<?php
/**
 * WooCommerce single product using native product, review, variation and related-product hooks.
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
	<div class="wpp-single-product__inner mx-auto max-w-[1200px] px-4 pb-32 pt-6 sm:px-6 lg:pb-16">
		<?php get_template_part( 'template-parts/product/header' ); ?>
		<?php get_template_part( 'template-parts/product/tabs-nav' ); ?>

		<div class="item-layout item-layout--details wpp-product-detail-layout">
			<section class="item-media wpp-single-product__media" aria-label="<?php esc_attr_e( 'Превью товара', 'wp-panda' ); ?>">
				<?php do_action( 'woocommerce_before_single_product_summary' ); ?>
				<?php get_template_part( 'template-parts/product/media-actions' ); ?>
			</section>

			<aside class="item-sidebar wpp-single-product__sidebar" aria-label="<?php esc_attr_e( 'Покупка и характеристики товара', 'wp-panda' ); ?>">
				<?php get_template_part( 'template-parts/product/purchase-summary' ); ?>
				<?php get_template_part( 'template-parts/product/information' ); ?>
			</aside>

			<div class="item-content wpp-single-product__content">
				<?php do_action( 'woocommerce_after_single_product_summary' ); ?>
			</div>
		</div>

		<?php if ( function_exists( 'woocommerce_output_related_products' ) ) : ?>
			<div class="wpp-single-product__related">
				<?php woocommerce_output_related_products(); ?>
			</div>
		<?php endif; ?>
	</div>
	<?php get_template_part( 'template-parts/product/mobile-buy' ); ?>
</article>
<?php do_action( 'woocommerce_after_single_product' ); ?>
