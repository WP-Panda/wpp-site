<?php
/**
 * Каталог товаров (override Woo archive-product.php).
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header( 'shop' );

$shop_url = get_permalink( wc_get_page_id( 'shop' ) );
?>
<div class="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6">
	<?php woocommerce_breadcrumb(); ?>

	<div class="mt-6 flex flex-wrap items-end justify-between gap-4">
		<div>
			<p class="text-xs text-muted"><?php esc_html_e( 'Витрина Wp Panda', 'wp-panda' ); ?></p>
			<h1 class="mt-1 text-3xl font-bold tracking-tight text-ink"><?php woocommerce_page_title(); ?></h1>
			<?php do_action( 'woocommerce_archive_description' ); ?>
		</div>
		<div class="flex flex-wrap items-center gap-3">
			<?php woocommerce_result_count(); ?>
			<?php woocommerce_catalog_ordering(); ?>
		</div>
	</div>

	<?php if ( woocommerce_product_loop() ) : ?>
		<?php do_action( 'woocommerce_before_shop_loop' ); ?>
		<div class="mt-8">
			<?php woocommerce_product_loop_start(); ?>
			<?php if ( wc_get_loop_prop( 'total' ) ) : ?>
				<?php while ( have_posts() ) : ?>
					<?php the_post(); ?>
					<?php do_action( 'woocommerce_shop_loop' ); ?>
					<?php wc_get_template_part( 'content', 'product' ); ?>
				<?php endwhile; ?>
			<?php endif; ?>
			<?php woocommerce_product_loop_end(); ?>
		</div>
		<?php do_action( 'woocommerce_after_shop_loop' ); ?>
	<?php else : ?>
		<div class="mt-10 rounded-card border border-line bg-white p-12 text-center shadow-card">
			<h2 class="text-xl font-bold"><?php esc_html_e( 'Товаров пока нет', 'wp-panda' ); ?></h2>
			<p class="mt-2 text-sm text-muted"><?php esc_html_e( 'Добавьте товары в консоли: Товары → Добавить. Тема подхватит их автоматически.', 'wp-panda' ); ?></p>
			<?php if ( current_user_can( 'manage_woocommerce' ) ) : ?>
				<a href="<?php echo esc_url( admin_url( 'post-new.php?post_type=product' ) ); ?>" class="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-ink shadow-glow transition hover:bg-brand-600"><?php esc_html_e( 'Добавить товар', 'wp-panda' ); ?></a>
			<?php endif; ?>
		</div>
	<?php endif; ?>

	<?php do_action( 'woocommerce_after_main_content' ); ?>
</div>
<?php
get_footer( 'shop' );
