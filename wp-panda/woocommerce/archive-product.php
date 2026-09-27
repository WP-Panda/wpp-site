<?php
/** Product archive using WooCommerce's native hooks and product loop.
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 8.6.0
 */
defined( 'ABSPATH' ) || exit;

get_header( 'shop' );

do_action( 'woocommerce_before_main_content' );
?>
<div class="shop-page wpp-catalog mx-auto w-full max-w-[1200px] px-4 pb-32 pt-8 sm:px-6 sm:pt-12">
	<?php do_action( 'woocommerce_shop_loop_header' ); ?>
	<?php wc_get_template( 'loop/catalog-tabs.php' ); ?>
	<?php wc_get_template( 'loop/catalog-filters.php' ); ?>

	<?php if ( woocommerce_product_loop() ) : ?>
		<?php wc_get_template( 'loop/catalog-toolbar.php' ); ?>
		<?php woocommerce_product_loop_start(); ?>
		<?php if ( wc_get_loop_prop( 'total' ) ) : ?>
			<?php while ( have_posts() ) : ?>
				<?php the_post(); ?>
				<?php do_action( 'woocommerce_shop_loop' ); ?>
				<?php wc_get_template_part( 'content', 'product' ); ?>
			<?php endwhile; ?>
		<?php endif; ?>
		<?php woocommerce_product_loop_end(); ?>
		<?php do_action( 'woocommerce_after_shop_loop' ); ?>
	<?php else : ?>
		<?php do_action( 'woocommerce_no_products_found' ); ?>
	<?php endif; ?>
</div>
<?php
do_action( 'woocommerce_after_main_content' );
do_action( 'woocommerce_sidebar' );
get_footer( 'shop' );
