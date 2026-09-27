<?php
/** Product type, category and version used by the WooCommerce loop card. */
defined( 'ABSPATH' ) || exit;
global $product;

if ( ! $product instanceof WC_Product ) {
	return;
}

$product_id   = $product->get_id();
$product_terms = get_the_terms( $product_id, 'product_cat' );
$category_name = ! is_wp_error( $product_terms ) && ! empty( $product_terms ) ? $product_terms[0]->name : '';
$is_theme      = has_term( 'wordpress-themes', 'product_cat', $product_id );
$is_plugin     = has_term( 'wordpress-plugins', 'product_cat', $product_id );
$type_label    = $is_theme ? __( 'Тема', 'wp-panda' ) : ( $is_plugin ? __( 'Плагин', 'wp-panda' ) : __( 'Товар', 'wp-panda' ) );
$version       = trim( wp_strip_all_tags( $product->get_attribute( 'Версия' ) ) );
?>
<div class="wpp-product-card__meta">
	<span class="wpp-product-card__type"><?php echo esc_html( $type_label ); ?></span>
	<?php if ( $version ) : ?>
		<span class="wpp-product-card__version"><?php echo esc_html( sprintf( __( 'Версия %s', 'wp-panda' ), $version ) ); ?></span>
	<?php endif; ?>
</div>
<?php if ( $category_name ) : ?>
	<div class="wpp-product-card__category"><?php echo esc_html( $category_name ); ?></div>
<?php endif; ?>
