<?php
/**
 * Wishlist grid: same product cards as the catalog.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$wpp_ids = function_exists( 'wpp_get_wishlist_ids' ) ? wpp_get_wishlist_ids() : array();
?>
<div class="space-y-5">
	<?php if ( ! $wpp_ids ) : ?>
		<div class="rounded-card border border-line bg-white p-10 text-center shadow-card">
			<span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-500"><?php echo wpp_icon( 'heart', 'h-6 w-6' ); ?></span>
			<p class="mt-4 text-sm text-muted"><?php esc_html_e( 'В избранном пока пусто. Нажмите на сердечко у товара, чтобы вернуться к нему позже.', 'wp-panda' ); ?></p>
			<a class="mt-5 inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-11 px-5 text-sm" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) ); ?>"><?php esc_html_e( 'Перейти в каталог', 'wp-panda' ); ?></a>
		</div>
	<?php else : ?>
		<div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
			<?php
			foreach ( $wpp_ids as $wpp_id ) {
				$wpp_product = wc_get_product( $wpp_id );
				if ( ! $wpp_product || 'publish' !== $wpp_product->get_status() ) {
					continue;
				}
				$GLOBALS['product'] = $wpp_product;
				setup_postdata( $wpp_product->get_id() );
				wc_get_template_part( 'content', 'product' );
				wp_reset_postdata();
			}
			?>
		</div>
	<?php endif; ?>
</div>
