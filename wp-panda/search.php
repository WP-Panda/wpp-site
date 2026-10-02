<?php
/**
 * Search results page.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<div class="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12 pb-10">
	<header class="fade-up mx-auto max-w-3xl text-center">
		<div class="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium shadow-card">
			<span class="h-1.5 w-1.5 rounded-full bg-brand"></span><?php esc_html_e( 'Поиск', 'wp-panda' ); ?>
		</div>
		<h1 class="text-3xl font-bold tracking-tight sm:text-[44px] sm:leading-[1.1]">
			<?php
			/* translators: %s: search query. */
			printf( esc_html__( 'Результаты по запросу «%s»', 'wp-panda' ), '<span class="text-brand-600">' . esc_html( get_search_query() ) . '</span>' );
			?>
		</h1>
		<p class="mt-3 text-muted">
			<?php
			global $wp_query;
			echo esc_html( sprintf( _n( 'Найдено %s совпадение', 'Найдено %s совпадения', (int) $wp_query->found_posts, 'wp-panda' ), number_format_i18n( (int) $wp_query->found_posts ) ) );
			?>
		</p>
	</header>
	<div class="mt-10">
		<?php if ( have_posts() ) : ?>
			<?php get_template_part( 'template-parts/blog/loop' ); ?>
			<?php the_posts_pagination( array( 'mid_size' => 2 ) ); ?>
		<?php else : ?>
			<div class="mx-auto max-w-md rounded-card border border-line bg-white p-10 text-center shadow-card">
				<p class="text-muted"><?php esc_html_e( 'Ничего не нашлось. Попробуйте изменить запрос или посмотрите каталог.', 'wp-panda' ); ?></p>
				<a class="mt-5 inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-11 px-5 text-sm" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) ); ?>"><?php esc_html_e( 'Перейти в каталог', 'wp-panda' ); ?></a>
			</div>
		<?php endif; ?>
	</div>
</div>
<?php
get_footer();
