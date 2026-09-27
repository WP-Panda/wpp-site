<?php
/** Search results, with WooCommerce's product loop for product-only searches. */
$post_type_query = get_query_var( 'post_type' );
$is_product_search = class_exists( 'WooCommerce' ) && ( 'product' === $post_type_query || ( is_array( $post_type_query ) && in_array( 'product', $post_type_query, true ) ) );

if ( $is_product_search ) :
	get_header( 'shop' );
	do_action( 'woocommerce_before_main_content' );
	?>
	<div class="shop-page mx-auto w-full max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 lg:pb-20">
		<header class="woocommerce-products-header shop-page__heading">
			<p class="eyebrow"><?php esc_html_e( 'Wp Panda — темы и плагины', 'wp-panda' ); ?></p>
			<?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?>
				<h1 class="woocommerce-products-header__title page-title"><?php printf( esc_html__( 'Результаты поиска: %s', 'wp-panda' ), esc_html( get_search_query() ) ); ?></h1>
			<?php endif; ?>
		</header>
		<?php do_action( 'woocommerce_shop_loop_header' ); ?>
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
else :
	get_header();
	?>
	<main id="primary" class="site-main content-container mx-auto w-full max-w-[1200px] flex-1 px-4 py-12 sm:px-6 lg:py-16">
		<header class="page-heading">
			<p class="eyebrow"><?php esc_html_e( 'Поиск по сайту', 'wp-panda' ); ?></p>
			<h1 class="text-3xl font-bold tracking-tight sm:text-4xl"><?php printf( esc_html__( 'Результаты по запросу: %s', 'wp-panda' ), '<span>' . esc_html( get_search_query() ) . '</span>' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></h1>
		</header>
		<?php if ( have_posts() ) : ?>
			<div class="search-results">
				<?php while ( have_posts() ) : the_post(); ?>
					<?php get_template_part( 'template-parts/content', 'search' ); ?>
				<?php endwhile; ?>
			</div>
			<?php the_posts_pagination(); ?>
		<?php else : ?>
			<div class="empty-state"><h2><?php esc_html_e( 'Ничего не найдено', 'wp-panda' ); ?></h2><p><?php esc_html_e( 'Проверьте запрос или попробуйте поискать другой товар.', 'wp-panda' ); ?></p><?php get_search_form(); ?></div>
		<?php endif; ?>
	</main>
	<?php get_footer(); ?>
<?php endif; ?>
