<?php
/**
 * Single product image with a WooCommerce-version-compatible gallery.
 *
 * @package WooCommerce\Templates
 * @version 9.0.0
 */
defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'wc_get_gallery_image_html' ) ) {
	return;
}

global $product;
if ( ! $product instanceof WC_Product ) {
	return;
}

$columns           = apply_filters( 'woocommerce_product_thumbnails_columns', 4 );
$post_thumbnail_id = $product->get_image_id();
$gallery_ids       = array_values( array_unique( array_filter( array_merge( array( $post_thumbnail_id ), $product->get_gallery_image_ids() ) ) ) );
$wrapper_classes   = apply_filters(
	'woocommerce_single_product_image_gallery_classes',
	array(
		'woocommerce-product-gallery',
		'wpp-product-gallery',
		'woocommerce-product-gallery--' . ( $post_thumbnail_id ? 'with-images' : 'without-images' ),
		'woocommerce-product-gallery--columns-' . absint( $columns ),
		'images',
	)
);
?>
<div class="<?php echo esc_attr( implode( ' ', array_map( 'sanitize_html_class', $wrapper_classes ) ) ); ?>" data-columns="<?php echo esc_attr( $columns ); ?>" style="opacity: 0; transition: opacity .25s ease-in-out;">
	<div class="woocommerce-product-gallery__wrapper">
		<?php
		if ( $post_thumbnail_id ) {
			echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', wc_get_gallery_image_html( $post_thumbnail_id, true ), $post_thumbnail_id ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		} else {
			echo '<div class="woocommerce-product-gallery__image--placeholder">';
			echo sprintf( '<img src="%s" alt="%s" class="wp-post-image" />', esc_url( wc_placeholder_img_src( 'woocommerce_single' ) ), esc_attr__( 'Awaiting product image', 'woocommerce' ) );
			echo '</div>';
		}

		do_action( 'woocommerce_product_thumbnails' );
		?>
		<?php if ( $post_thumbnail_id ) : ?><button class="wpp-product-gallery__zoom" type="button" data-wpp-open-product-gallery aria-label="<?php esc_attr_e( 'Открыть галерею товара', 'wp-panda' ); ?>"><?php echo wpp_icon( 'search', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></button><?php endif; ?>
	</div>
</div>
<?php if ( $gallery_ids ) : ?>
	<div class="wpp-gallery-modal" data-wpp-gallery-modal hidden role="dialog" aria-modal="true" aria-label="<?php echo esc_attr( sprintf( __( 'Галерея товара %s', 'wp-panda' ), $product->get_name() ) ); ?>">
		<div class="wpp-gallery-modal__dialog">
			<header class="wpp-gallery-modal__header"><div><strong><?php echo esc_html( $product->get_name() ); ?></strong><?php if ( $product->get_attribute( 'Версия' ) ) : ?><span> · v<?php echo esc_html( $product->get_attribute( 'Версия' ) ); ?></span><?php endif; ?><small data-wpp-gallery-caption><?php esc_html_e( 'Скриншоты продукта', 'wp-panda' ); ?></small></div><span class="wpp-gallery-modal__counter" data-wpp-gallery-counter>1 / <?php echo esc_html( count( $gallery_ids ) ); ?></span><button type="button" data-wpp-gallery-close aria-label="<?php esc_attr_e( 'Закрыть галерею', 'wp-panda' ); ?>"><?php echo wpp_icon( 'close', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></button></header>
			<div class="wpp-gallery-modal__stage"><img data-wpp-gallery-image src="<?php echo esc_url( wp_get_attachment_image_url( $gallery_ids[0], 'full' ) ); ?>" alt="<?php echo esc_attr( $product->get_name() ); ?>"><button type="button" class="is-prev" data-wpp-gallery-prev aria-label="<?php esc_attr_e( 'Предыдущий слайд', 'wp-panda' ); ?>">‹</button><button type="button" class="is-next" data-wpp-gallery-next aria-label="<?php esc_attr_e( 'Следующий слайд', 'wp-panda' ); ?>">›</button></div>
			<div class="wpp-gallery-modal__thumbs"><?php foreach ( $gallery_ids as $index => $gallery_id ) : ?><button type="button" data-wpp-gallery-thumb data-full="<?php echo esc_url( wp_get_attachment_image_url( $gallery_id, 'full' ) ); ?>" data-alt="<?php echo esc_attr( get_post_meta( $gallery_id, '_wp_attachment_image_alt', true ) ?: $product->get_name() ); ?>" class="<?php echo 0 === $index ? 'is-active' : ''; ?>"><?php echo wp_get_attachment_image( $gallery_id, 'woocommerce_thumbnail', false, array( 'loading' => 'lazy' ) ); ?></button><?php endforeach; ?></div>
		</div>
	</div>
<?php endif; ?>
