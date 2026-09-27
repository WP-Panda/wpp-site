<?php
/** Product-gallery actions using the current product's gallery and account wishlist. */
defined( 'ABSPATH' ) || exit;

global $product;
if ( ! $product instanceof WC_Product ) {
	return;
}

$product_url = get_permalink( $product->get_id() );
$image_url   = $product->get_image_id() ? wp_get_attachment_image_url( $product->get_image_id(), 'full' ) : '';
$version     = $product->get_attribute( 'Версия' );
?>
<div class="wpp-product-media-actions">
	<div class="wpp-product-media-actions__preview">
		<?php if ( $image_url ) : ?>
			<button class="wpp-product-media-actions__button is-primary" type="button" data-wpp-open-product-gallery>
				<?php echo wpp_icon( 'search', 'h-3.5 w-3.5' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php esc_html_e( 'Предпросмотр', 'wp-panda' ); ?>
			</button>
		<?php endif; ?>
		<button class="wpp-product-media-actions__button" type="button" data-wpp-open-product-gallery>
			<?php echo wpp_icon( 'chevron', 'h-3.5 w-3.5' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php esc_html_e( 'Скриншоты', 'wp-panda' ); ?>
		</button>
	</div>

	<div class="wpp-product-media-actions__secondary">
		<?php if ( function_exists( 'wpp_single_product_wishlist_button' ) ) : ?>
			<?php wpp_single_product_wishlist_button(); ?>
		<?php endif; ?>
		<button class="wpp-product-share" type="button" data-wpp-share-product data-share-url="<?php echo esc_url( $product_url ); ?>" data-share-title="<?php echo esc_attr( $product->get_name() ); ?>">
			<?php echo wpp_icon( 'arrow', 'h-3.5 w-3.5' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<span><?php esc_html_e( 'Поделиться', 'wp-panda' ); ?></span>
		</button>
		<?php if ( $version ) : ?><span class="wpp-product-media-actions__version"><?php echo esc_html( sprintf( __( 'Версия %s', 'wp-panda' ), $version ) ); ?></span><?php endif; ?>
	</div>
	<span class="wpp-product-share__status screen-reader-text" aria-live="polite" data-wpp-share-status></span>
</div>
