<?php
/**
 * Single Product Image
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/product-image.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 11.1.0
 */

use Automattic\WooCommerce\Enums\ProductType;
use Automattic\WooCommerce\Internal\ProductGallery\ProductMediaGallery;

defined( 'ABSPATH' ) || exit;

// Note: `wc_get_gallery_image_html` was added in WC 3.3.2 and did not exist prior. This check protects against theme overrides being used on older versions of WC.
if ( ! function_exists( 'wc_get_gallery_image_html' ) ) {
	return;
}

global $product;

$columns           = apply_filters( 'woocommerce_product_thumbnails_columns', 4 );
$post_thumbnail_id = $product->get_image_id();
$media_items       = ProductMediaGallery::get_product_media_gallery_items_for_display( $product );
// The helper returns the full gallery order; product-thumbnails.php renders the remaining items.
$first_media_item = $media_items[0] ?? array();
$first_media_id   = isset( $first_media_item['id'] ) ? absint( $first_media_item['id'] ) : $post_thumbnail_id;
$has_media        = ! empty( $first_media_item ) && 'placeholder' !== ( $first_media_item['source_type'] ?? '' );
$is_video         = $has_media && 'video' === ( $first_media_item['media_type'] ?? '' );
$wrapper_classes   = apply_filters(
	'woocommerce_single_product_image_gallery_classes',
	array(
		'woocommerce-product-gallery',
		'wpp-product-gallery',
		'woocommerce-product-gallery--' . ( $has_media ? 'with-images' : 'without-images' ),
		'woocommerce-product-gallery--columns-' . absint( $columns ),
		'images',
	)
);
?>
<div class="<?php echo esc_attr( implode( ' ', array_map( 'sanitize_html_class', $wrapper_classes ) ) ); ?>" data-columns="<?php echo esc_attr( $columns ); ?>" style="opacity: 0; transition: opacity .25s ease-in-out;">
	<div class="woocommerce-product-gallery__wrapper">
		<?php
		if ( $is_video ) {
			$html = ProductMediaGallery::get_gallery_video_html( $first_media_item, true );
		} elseif ( $has_media && $first_media_id ) {
			$html = wc_get_gallery_image_html( $first_media_id, true );
		} else {
			// Check for visible children with prices to determine if variation image swapping is possible.
			// Using get_visible_children() + get_price() is more efficient than get_available_variations()
			// as it uses cached IDs and synced price data rather than loading all variation objects.
			$wrapper_classname = $product->is_type( ProductType::VARIABLE ) && ! empty( $product->get_visible_children() ) && '' !== $product->get_price() ?
				'woocommerce-product-gallery__image woocommerce-product-gallery__image--placeholder' :
				'woocommerce-product-gallery__image--placeholder';
			$html              = sprintf( '<div class="%s">', esc_attr( $wrapper_classname ) );
			$html             .= sprintf( '<img src="%s" alt="%s" class="wp-post-image" />', esc_url( wc_placeholder_img_src( 'woocommerce_single' ) ), esc_html__( 'Awaiting product image', 'woocommerce' ) );
			$html             .= '</div>';
		}

		if ( $is_video ) {
			/**
			 * Filter product video thumbnail HTML string.
			 *
			 * @since 11.0.0
			 * @internal For exclusive usage of WooCommerce core, backwards compatibility not guaranteed.
			 *
			 * @param string $html          Product video thumbnail HTML string.
			 * @param int    $attachment_id Video attachment ID.
			 * @param array  $media_item    Product media gallery item.
			 */
			echo apply_filters( 'woocommerce_single_product_video_thumbnail_html', $html, $first_media_id, $first_media_item ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		} else {
			/**
			 * Filter product image thumbnail HTML string.
			 *
			 * @since 1.6.4
			 *
			 * @param string $html          Product image thumbnail HTML string.
			 * @param int    $attachment_id Attachment ID.
			 */
			echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', $html, $first_media_id ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}

			do_action( 'woocommerce_product_thumbnails' );
			?>
			<?php if ( $post_thumbnail_id ) : ?><button class="wpp-product-gallery__zoom" type="button" data-wpp-open-product-gallery aria-label="<?php esc_attr_e( 'Открыть галерею товара', 'wp-panda' ); ?>"><?php echo wpp_icon( 'search', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></button><?php endif; ?>
		</div>
</div>
<?php
$gallery_ids = array_values( array_unique( array_filter( array_merge( array( $post_thumbnail_id ), $product->get_gallery_image_ids() ) ) ) );
if ( $gallery_ids ) :
	?>
	<div class="wpp-gallery-modal" data-wpp-gallery-modal hidden role="dialog" aria-modal="true" aria-label="<?php echo esc_attr( sprintf( __( 'Галерея товара %s', 'wp-panda' ), $product->get_name() ) ); ?>">
		<div class="wpp-gallery-modal__dialog">
			<header class="wpp-gallery-modal__header"><div><strong><?php echo esc_html( $product->get_name() ); ?></strong><?php if ( $product->get_attribute( 'Версия' ) ) : ?><span> · v<?php echo esc_html( $product->get_attribute( 'Версия' ) ); ?></span><?php endif; ?><small data-wpp-gallery-caption><?php esc_html_e( 'Скриншоты продукта', 'wp-panda' ); ?></small></div><span class="wpp-gallery-modal__counter" data-wpp-gallery-counter>1 / <?php echo esc_html( count( $gallery_ids ) ); ?></span><button type="button" data-wpp-gallery-close aria-label="<?php esc_attr_e( 'Закрыть галерею', 'wp-panda' ); ?>"><?php echo wpp_icon( 'close', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></button></header>
			<div class="wpp-gallery-modal__stage"><img data-wpp-gallery-image src="<?php echo esc_url( wp_get_attachment_image_url( $gallery_ids[0], 'full' ) ); ?>" alt="<?php echo esc_attr( $product->get_name() ); ?>"><button type="button" class="is-prev" data-wpp-gallery-prev aria-label="<?php esc_attr_e( 'Предыдущий слайд', 'wp-panda' ); ?>">‹</button><button type="button" class="is-next" data-wpp-gallery-next aria-label="<?php esc_attr_e( 'Следующий слайд', 'wp-panda' ); ?>">›</button></div>
			<div class="wpp-gallery-modal__thumbs"><?php foreach ( $gallery_ids as $index => $gallery_id ) : ?><button type="button" data-wpp-gallery-thumb data-full="<?php echo esc_url( wp_get_attachment_image_url( $gallery_id, 'full' ) ); ?>" data-alt="<?php echo esc_attr( get_post_meta( $gallery_id, '_wp_attachment_image_alt', true ) ?: $product->get_name() ); ?>" class="<?php echo 0 === $index ? 'is-active' : ''; ?>"><?php echo wp_get_attachment_image( $gallery_id, 'woocommerce_thumbnail', false, array( 'loading' => 'lazy' ) ); ?></button><?php endforeach; ?></div>
		</div>
	</div>
<?php endif; ?>
