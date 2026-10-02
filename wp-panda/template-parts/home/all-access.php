<?php
/**
 * All Access banner, identical to the layout.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;
$shop_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
$bundle   = null;
if ( function_exists( 'wpp_demo_find_post_id' ) ) {
	$bundle_id = wpp_demo_find_post_id( 'product', 'product:all-access' );
	$bundle    = $bundle_id ? wc_get_product( $bundle_id ) : null;
}
?>
<section class="mx-auto mt-16 max-w-[1200px] px-4 sm:px-6">
	<div class="flex flex-col items-start gap-5 rounded-card border border-line bg-white p-5 shadow-card sm:p-6 md:flex-row md:items-center">
		<div class="flex -space-x-4">
			<?php foreach ( array( 'aurora', 'seo-rocket', 'vesta', 'polyglot' ) as $wpp_slug ) :
				$wpp_pid = function_exists( 'wpp_demo_find_post_id' ) ? wpp_demo_find_post_id( 'product', 'product:' . $wpp_slug ) : 0;
				$wpp_p   = $wpp_pid ? wc_get_product( $wpp_pid ) : null;
				if ( ! $wpp_p ) { continue; }
				?>
				<?php echo str_replace( 'h-11 w-11 rounded-xl', 'h-14 w-14 rounded-full border-[3px] border-white shadow-sm', wpp_product_mini_tile( $wpp_p, 'h-14 w-14 rounded-full border-[3px] border-white shadow-sm' ) ); ?>
			<?php endforeach; ?>
		</div>
		<div class="flex-1">
			<div class="flex flex-wrap items-center gap-2">
				<h3 class="text-xl font-semibold tracking-tight">Wp Panda All Access</h3>
				<span class="rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold">−70%</span>
			</div>
			<p class="mt-1 text-sm text-muted"><?php esc_html_e( 'Все темы и все плагины с пожизненным доступом ко всем будущим релизам.', 'wp-panda' ); ?></p>
		</div>
		<div class="flex w-full items-center justify-between gap-4 md:w-auto">
			<div class="text-left md:text-right">
				<div class="text-xs text-muted line-through">99&nbsp;900&nbsp;₽</div>
				<div class="text-xl font-bold"><?php echo $bundle ? wpp_format_amount( $bundle->get_price() ) : '29&nbsp;990&nbsp;₽'; ?><span class="text-sm font-medium text-muted"> <?php esc_html_e( 'навсегда', 'wp-panda' ); ?></span></div>
			</div>
			<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-brand text-ink hover:bg-brand-600 shadow-glow h-14 px-7 text-[15px] pr-1.5" href="<?php echo esc_url( $bundle ? $bundle->get_permalink() : $shop_url ); ?>"><?php esc_html_e( 'Подробнее', 'wp-panda' ); ?><span class="ml-4 flex items-center justify-center rounded-full bg-ink text-white h-11 w-11">
				<?php echo wpp_icon( 'arrow-right', 'h-4 w-4' ); ?>
			</span></a>
		</div>
	</div>
</section>
