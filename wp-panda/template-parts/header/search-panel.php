<?php
/**
 * Header live-search panel, identical to the layout popover.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$popular = function_exists( 'wc_get_products' ) ? wc_get_products( array(
	'status'   => 'publish',
	'limit'    => 4,
	'orderby'  => 'popularity',
	'featured' => false,
) ) : array();
if ( empty( $popular ) && function_exists( 'wc_get_products' ) ) {
	$popular = wc_get_products( array( 'status' => 'publish', 'limit' => 4 ) );
}
?>
<div class="wpp-search-panel fade-up fixed left-4 right-4 top-[84px] z-20 hidden rounded-card border border-line bg-white p-3 shadow-float sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-3 sm:w-[440px]" data-search-panel>
	<div class="flex h-12 items-center gap-3 rounded-full bg-soft px-4">
		<?php echo wpp_icon( 'search', 'h-4 w-4 text-muted' ); ?>
		<input type="text" placeholder="<?php esc_attr_e( 'Тема, плагин или задача…', 'wp-panda' ); ?>" class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70" value="" data-search-input>
		<kbd class="hidden rounded-md border border-line bg-white px-1.5 py-0.5 text-[10px] font-semibold text-muted sm:block">ESC</kbd>
	</div>
	<div class="px-2 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted" data-search-label><?php esc_html_e( 'Популярное', 'wp-panda' ); ?></div>
	<div class="max-h-[340px] overflow-y-auto" data-search-results>
		<?php foreach ( $popular as $pop_product ) : ?>
			<a class="flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:bg-soft" href="<?php echo esc_url( get_permalink( $pop_product->get_id() ) ); ?>">
				<?php echo wpp_product_mini_tile( $pop_product ); ?>
				<span class="min-w-0 flex-1">
					<span class="block text-sm font-semibold"><?php echo esc_html( $pop_product->get_name() ); ?></span>
					<span class="block truncate text-xs text-muted"><?php echo esc_html( wp_strip_all_tags( $pop_product->get_short_description() ? $pop_product->get_short_description() : $pop_product->get_description() ) ); ?></span>
				</span>
				<span class="text-sm font-bold tabular-nums"><?php echo wpp_format_amount( $pop_product->get_price() ); ?></span>
			</a>
		<?php endforeach; ?>
	</div>
	<a class="mt-2 hidden h-11 w-full items-center justify-center gap-2 rounded-full bg-soft text-sm font-semibold transition hover:bg-brand" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) ); ?>" data-search-catalog>
		<?php esc_html_e( 'Весь каталог', 'wp-panda' ); ?>
		<?php echo wpp_icon( 'arrow-right', 'h-4 w-4' ); ?>
	</a>
</div>
