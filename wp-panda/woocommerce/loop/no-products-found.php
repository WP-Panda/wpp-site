<?php
/**
 * Empty catalog state.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="mt-10 rounded-card border border-line bg-white p-10 text-center shadow-card">
	<div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 ring-8 ring-brand-50/50">
		<?php echo wpp_icon( 'search', 'h-8 w-8' ); ?>
	</div>
	<h2 class="mt-6 text-2xl font-bold tracking-tight"><?php esc_html_e( 'Ничего не найдено', 'wp-panda' ); ?></h2>
	<p class="mx-auto mt-2 max-w-sm text-sm text-muted"><?php esc_html_e( 'Попробуйте изменить фильтры или поисковый запрос — в каталоге 16 тем и плагинов.', 'wp-panda' ); ?></p>
	<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-12 px-6 text-sm mt-6" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) ); ?>"><?php esc_html_e( 'Сбросить фильтры', 'wp-panda' ); ?></a>
</div>
