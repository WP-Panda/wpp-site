<?php
/**
 * 404 page.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<div class="mx-auto max-w-[1200px] px-4 pt-20 pb-24 sm:px-6">
	<div class="mx-auto max-w-md text-center">
		<div class="pop mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand shadow-glow ring-8 ring-brand-50"><?php echo wpp_icon( 'triangle-alert', 'h-8 w-8' ); ?></div>
		<h1 class="mt-7 text-4xl font-bold tracking-tight sm:text-5xl">404</h1>
		<p class="mt-3 text-lg font-semibold"><?php esc_html_e( 'Такой страницы нет', 'wp-panda' ); ?></p>
		<p class="mt-2 text-muted"><?php esc_html_e( 'Возможно, ссылка устарела. Загляните в каталог или на главную — всё самое важное там.', 'wp-panda' ); ?></p>
		<div class="mt-7 flex flex-wrap items-center justify-center gap-3">
			<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-12 px-6 text-sm" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'На главную', 'wp-panda' ); ?></a>
			<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-white text-ink border border-line hover:border-ink/25 shadow-[0_1px_2px_rgba(20,20,28,0.05)] h-12 px-6 text-sm" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) ); ?>"><?php esc_html_e( 'В каталог', 'wp-panda' ); ?></a>
		</div>
	</div>
</div>
<?php
get_footer();
