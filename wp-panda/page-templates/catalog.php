<?php
/**
 * Template Name: Каталог (витрина продуктов)
 *
 * Показывает сетку продуктов в стиле магазина. С WooCommerce берёт реальные
 * товары, без него — демо-каталог темы.
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// С активным WooCommerce показываем настоящий каталог.
if ( wpp_has_woo() ) {
	$shop_url = get_permalink( wc_get_page_id( 'shop' ) );
	if ( $shop_url && get_permalink() !== $shop_url ) {
		wp_safe_redirect( $shop_url );
		exit;
	}
}

get_header();
?>
<div class="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6">
	<?php wpp_breadcrumbs( array( get_the_title() => '' ) ); ?>
	<div class="mt-6 flex flex-wrap items-end justify-between gap-4">
		<div>
			<p class="text-xs text-muted"><?php esc_html_e( 'Витрина Wp Panda', 'wp-panda' ); ?></p>
			<h1 class="mt-1 text-3xl font-bold tracking-tight text-ink"><?php the_title(); ?></h1>
		</div>
		<div class="inline-flex rounded-full border border-line bg-white p-1.5 shadow-card" role="tablist">
			<button type="button" data-filter="all" aria-selected="true" class="h-9 rounded-full bg-ink px-4 text-[13px] font-semibold text-white transition"><?php esc_html_e( 'Все', 'wp-panda' ); ?></button>
			<button type="button" data-filter="theme" aria-selected="false" class="h-9 rounded-full px-4 text-[13px] font-semibold text-ink/60 transition hover:text-ink"><?php esc_html_e( 'Темы', 'wp-panda' ); ?></button>
			<button type="button" data-filter="plugin" aria-selected="false" class="h-9 rounded-full px-4 text-[13px] font-semibold text-ink/60 transition hover:text-ink"><?php esc_html_e( 'Плагины', 'wp-panda' ); ?></button>
		</div>
	</div>
	<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		<?php foreach ( wpp_showcase_products( 'all', 16 ) as $d ) : ?>
			<?php wpp_product_card( $d ); ?>
		<?php endforeach; ?>
	</div>
</div>
<?php get_footer(); ?>
