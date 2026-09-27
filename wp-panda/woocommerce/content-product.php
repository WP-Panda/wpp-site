<?php
/**
 * Product card template. Standard WooCommerce loop hooks and product data are retained.
 *
 * @package WooCommerce\Templates
 * @version 9.4.0
 */
defined( 'ABSPATH' ) || exit;
global $product;

if ( ! is_a( $product, 'WC_Product' ) || ! $product->is_visible() ) {
	return;
}

$product_id   = $product->get_id();
$product_terms = get_the_terms( $product_id, 'product_cat' );
$category_name = ( ! is_wp_error( $product_terms ) && ! empty( $product_terms ) ) ? $product_terms[0]->name : '';
$is_theme      = has_term( 'wordpress-themes', 'product_cat', $product_id );
$is_plugin     = has_term( 'wordpress-plugins', 'product_cat', $product_id );
$type_label    = $is_theme ? __( 'Тема', 'wp-panda' ) : ( $is_plugin ? __( 'Плагин', 'wp-panda' ) : __( 'Товар', 'wp-panda' ) );
$version       = trim( wp_strip_all_tags( $product->get_attribute( 'Версия' ) ) );
$description   = trim( wp_strip_all_tags( $product->get_short_description() ) );
$compatibility = trim( wp_strip_all_tags( $product->get_attribute( 'Совместимость' ) ) );
$compatibility = $compatibility ? preg_split( '/\s*,\s*/u', $compatibility, -1, PREG_SPLIT_NO_EMPTY ) : array();
$compatibility = array_slice( array_filter( array_map( 'trim', $compatibility ) ), 0, 4 );
?>
<li <?php wc_product_class( 'wpp-product-card-wrap', $product ); ?>>
	<article class="wpp-product-card">
		<?php do_action( 'woocommerce_before_shop_loop_item' ); ?>
		<div class="wpp-product-card__media">
			<?php do_action( 'woocommerce_before_shop_loop_item_title' ); ?>
		</div>
		<div class="wpp-product-card__content">
			<div class="wpp-product-card__meta">
				<span class="wpp-product-card__type"><?php echo esc_html( $type_label ); ?></span>
				<?php if ( $version ) : ?>
					<span class="wpp-product-card__version"><?php echo esc_html( sprintf( __( 'Версия %s', 'wp-panda' ), $version ) ); ?></span>
				<?php endif; ?>
			</div>
			<?php if ( $category_name ) : ?>
				<div class="wpp-product-card__category"><?php echo esc_html( $category_name ); ?></div>
			<?php endif; ?>
			<?php do_action( 'woocommerce_shop_loop_item_title' ); ?>
			<?php if ( $description ) : ?>
				<p class="wpp-product-card__description"><?php echo esc_html( wp_trim_words( $description, 23, '…' ) ); ?></p>
			<?php endif; ?>
			<?php if ( $compatibility ) : ?>
				<div class="wpp-product-card__compatibility" aria-label="<?php esc_attr_e( 'Совместимость товара', 'wp-panda' ); ?>">
					<?php foreach ( $compatibility as $compatibility_item ) : ?>
						<span><?php echo esc_html( $compatibility_item ); ?></span>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>
			<?php do_action( 'woocommerce_after_shop_loop_item_title' ); ?>
		</div>
		<?php do_action( 'woocommerce_after_shop_loop_item' ); ?>
	</article>
</li>
