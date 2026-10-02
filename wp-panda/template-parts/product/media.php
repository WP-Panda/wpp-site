<?php
/**
 * Single product media column: big artwork, preview buttons, share row.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

global $product;
$product_id = $product->get_id();
$version    = wpp_product_version( $product );
$wishlisted = wpp_in_wishlist( $product_id );

$art = get_post_meta( $product_id, '_wpp_card_art', true );
if ( $art ) {
	$art = preg_replace( '/aspect-\[4\/3\]/', 'aspect-[16/10]', $art, 1 );
}
$gallery_ids = $product->get_gallery_image_ids();
if ( ! $gallery_ids && $product->get_image_id() ) {
	$gallery_ids = array( $product->get_image_id() );
}
?>
<section class="item-media min-w-0" aria-label="<?php esc_attr_e( 'Превью товара', 'wp-panda' ); ?>">
	<div class="overflow-hidden rounded-card border border-line bg-white p-2 shadow-card">
		<button type="button" aria-label="<?php echo esc_attr( sprintf( __( 'Открыть галерею товара %s', 'wp-panda' ), $product->get_name() ) ); ?>" class="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl" data-media-art>
			<div class="relative w-full overflow-hidden aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.015]" style="container-type: inline-size; background: rgb(246, 246, 248);" data-media-stage>
				<?php if ( $art ) : ?>
					<?php echo wpp_kses_art( $art ); ?>
				<?php elseif ( $product->get_image_id() ) : ?>
					<?php echo wp_get_attachment_image( $product->get_image_id(), 'large', false, array( 'class' => 'absolute inset-0 h-full w-full object-cover', 'alt' => '' ) ); ?>
				<?php else : ?>
					<div class="dots-bg absolute inset-0 opacity-70"></div>
				<?php endif; ?>
				<?php foreach ( $gallery_ids as $wpp_gi => $wpp_gid ) : ?>
					<img alt="" class="wpp-screenshot absolute inset-0 h-full w-full object-cover hidden" src="<?php echo esc_url( wp_get_attachment_image_url( $wpp_gid, 'large' ) ); ?>" data-screenshot="<?php echo esc_attr( $wpp_gi ); ?>">
				<?php endforeach; ?>
			</div>
			<span class="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition group-hover:scale-105">
				<?php echo wpp_icon( 'expand', 'h-4 w-4' ); ?>
			</span>
		</button>
		<div class="flex flex-wrap items-center justify-center gap-2.5 px-2 py-4 sm:gap-3">
			<button type="button" data-media-preview class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-ink text-white hover:bg-ink-2 h-11 px-5 text-sm flex-1 sm:max-w-[220px]">
				<?php echo wpp_icon( 'monitor-play', 'h-4 w-4' ); ?><?php esc_html_e( 'Предпросмотр', 'wp-panda' ); ?>
			</button>
			<button type="button" data-media-screenshots class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-white text-ink border border-line hover:border-ink/25 shadow-[0_1px_2px_rgba(20,20,28,0.05)] h-11 px-5 text-sm flex-1 sm:max-w-[200px]" <?php echo $gallery_ids ? '' : 'disabled'; ?>>
				<?php echo wpp_icon( 'images', 'h-4 w-4' ); ?><?php echo esc_html( sprintf( __( 'Скриншоты (%s)', 'wp-panda' ), number_format_i18n( count( $gallery_ids ) ) ) ); ?>
			</button>
		</div>
	</div>
	<div class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 px-1 text-xs text-muted">
		<button aria-pressed="<?php echo $wishlisted ? 'true' : 'false'; ?>" data-wpp-wishlist="<?php echo esc_attr( $product_id ); ?>" class="flex items-center gap-1.5 transition hover:text-ink <?php echo $wishlisted ? 'text-rose-500' : ''; ?>">
			<?php echo wpp_icon( 'heart', 'h-3.5 w-3.5' . ( $wishlisted ? ' fill-rose-500' : '' ) ); ?><?php esc_html_e( 'В избранное', 'wp-panda' ); ?>
		</button>
		<button class="flex items-center gap-1.5 transition hover:text-ink" data-wpp-copy-target="<?php echo esc_url( get_permalink() ); ?>" data-wpp-copy-link>
			<?php echo wpp_icon( 'share-2', 'h-3.5 w-3.5' ); ?><?php esc_html_e( 'Поделиться', 'wp-panda' ); ?>
		</button>
		<?php if ( $version ) : ?>
			<span class="sm:ml-auto"><?php echo esc_html( sprintf( __( 'Версия %s', 'wp-panda' ), $version ) ); ?></span>
		<?php endif; ?>
	</div>
</section>
