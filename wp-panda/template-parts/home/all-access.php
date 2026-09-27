<?php
/** All Access strip from the reference layout. */
defined( 'ABSPATH' ) || exit;
$shop_url  = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
$old_price = function_exists( 'wc_price' ) ? wc_price( 99900, array( 'currency' => 'RUB' ) ) : '99 900 ₽';
$new_price = function_exists( 'wc_price' ) ? wc_price( 29990, array( 'currency' => 'RUB' ) ) : '29 990 ₽';
$products  = array();
if ( function_exists( 'wc_get_product' ) ) {
	foreach ( array( 'aurora', 'seo-rocket', 'vesta', 'turbocache' ) as $slug ) {
		$post = get_page_by_path( $slug, OBJECT, 'product' );
		if ( $post ) { $products[] = wc_get_product( $post->ID ); }
	}
}
?>
<section class="wpp-all-access mx-auto mt-16 max-w-[1200px] px-4 sm:px-6">
	<div class="flex flex-col items-start gap-5 rounded-card border border-line bg-white p-5 shadow-card sm:p-6 md:flex-row md:items-center">
		<?php if ( $products ) : ?><div class="flex -space-x-4"><?php foreach ( $products as $product ) : ?><span class="block h-14 w-14 overflow-hidden rounded-full border-[3px] border-white shadow-sm"><?php echo wp_kses_post( $product->get_image( 'woocommerce_thumbnail' ) ); ?></span><?php endforeach; ?></div><?php endif; ?>
		<div class="flex-1"><div class="flex flex-wrap items-center gap-2"><h3 class="text-xl font-semibold tracking-tight"><?php esc_html_e( 'Wp Panda All Access', 'wp-panda' ); ?></h3><span class="rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold">−70%</span></div><p class="mt-1 text-sm text-muted"><?php esc_html_e( 'Все темы и все плагины с пожизненным доступом ко всем будущим релизам.', 'wp-panda' ); ?></p></div>
		<div class="flex w-full items-center justify-between gap-4 md:w-auto"><div class="text-left md:text-right"><div class="text-xs text-muted line-through"><?php echo wp_kses_post( $old_price ); ?></div><div class="text-xl font-bold"><?php echo wp_kses_post( $new_price ); ?> <span class="text-sm font-medium text-muted"><?php esc_html_e( 'навсегда', 'wp-panda' ); ?></span></div></div><a class="button button--brand button--large" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Подробнее', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a></div>
	</div>
</section>
