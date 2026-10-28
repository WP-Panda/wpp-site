<?php
/**
 * «Популярное на этой неделе» with Все/Темы/Плагины tabs.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$query = wpp_featured_products_query( '', 8 );
if ( ! $query || ! $query->have_posts() ) {
	return;
}
?>
<section class="mx-auto mt-20 max-w-[1200px] px-4 sm:px-6">
	<div class="flex flex-col gap-4 items-center text-center">
		<div class="max-w-2xl">
			<h2 class="text-3xl font-bold tracking-tight sm:text-[40px] sm:leading-[1.1]"><?php esc_html_e( 'Популярное на этой неделе', 'wp-panda' ); ?></h2>
			<p class="mt-3 text-muted sm:text-[17px]"><?php esc_html_e( 'Темы на 1 или 5 сайтов · Плагины навсегда', 'wp-panda' ); ?></p>
		</div>
	</div>
	<div class="no-scrollbar mt-7 flex max-w-full justify-center overflow-x-auto px-4">
		<div class="inline-flex flex-shrink-0 rounded-full border border-line bg-white p-1.5 shadow-card">
			<button type="button" data-home-tab="all" class="flex flex-shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-5 font-semibold transition-all duration-200 h-10 text-sm bg-ink text-white shadow-[0_6px_16px_-8px_rgba(20,20,28,0.6)]"><?php esc_html_e( 'Все', 'wp-panda' ); ?></button>
			<?php foreach ( wpp_catalog_categories() as $wpp_home_cat ) : ?>
				<button type="button" data-home-tab="<?php echo esc_attr( $wpp_home_cat->slug ); ?>" class="flex flex-shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-5 font-semibold transition-all duration-200 h-10 text-sm text-ink/65 hover:text-ink"><?php echo esc_html( wpp_catalog_tab_label( $wpp_home_cat ) ); ?></button>
			<?php endforeach; ?>
		</div>
	</div>
	<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		<?php
		while ( $query->have_posts() ) {
			$query->the_post();
			$GLOBALS['product'] = wc_get_product( get_the_ID() );
			wc_get_template_part( 'content', 'product' );
		}
		wp_reset_postdata();
		?>
	</div>
	<p class="mt-8 hidden text-center text-sm text-muted" data-home-empty><?php esc_html_e( 'В этой подборке пока нет товаров.', 'wp-panda' ); ?></p>
</section>
