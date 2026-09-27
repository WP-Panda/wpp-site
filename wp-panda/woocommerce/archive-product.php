<?php
/** Product archive / shop template.
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 8.6.0
 */
defined( 'ABSPATH' ) || exit;
get_header( 'shop' );

do_action( 'woocommerce_before_main_content' );
?>
<div class="shop-page mx-auto w-full max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 lg:pb-20">
	<?php if ( is_product_taxonomy() ) : ?>
		<p class="eyebrow shop-page__eyebrow"><?php esc_html_e( 'Wp Panda — темы и плагины', 'wp-panda' ); ?></p>
		<?php
		// Core renders the taxonomy title and description through loop/header.php here.
		do_action( 'woocommerce_shop_loop_header' );
		?>
	<?php else : ?>
		<header class="woocommerce-products-header shop-page__heading">
			<p class="eyebrow"><?php esc_html_e( 'Wp Panda — темы и плагины', 'wp-panda' ); ?></p>
			<?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?>
				<h1 class="woocommerce-products-header__title page-title text-3xl font-bold tracking-tight sm:text-5xl"><?php woocommerce_page_title(); ?></h1>
			<?php endif; ?>
			<p class="shop-page__lead">
				<?php if ( is_search() ) : ?>
					<?php printf( esc_html__( 'Результаты поиска по запросу «%s».', 'wp-panda' ), esc_html( get_search_query() ) ); ?>
				<?php else : ?>
					<?php esc_html_e( 'Темы и плагины для WordPress — выберите решение для своего проекта.', 'wp-panda' ); ?>
				<?php endif; ?>
			</p>
			<?php do_action( 'woocommerce_archive_description' ); ?>
		</header>
		<?php do_action( 'woocommerce_shop_loop_header' ); ?>
	<?php endif; ?>

	<?php if ( woocommerce_product_loop() ) : ?>
		<div class="shop-toolbar" aria-label="<?php esc_attr_e( 'Настройки каталога', 'wp-panda' ); ?>">
			<?php do_action( 'woocommerce_before_shop_loop' ); ?>
		</div>
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
