<?php
/** Compatibility labels from the WooCommerce product attribute. */
defined( 'ABSPATH' ) || exit;
global $product;

if ( ! $product instanceof WC_Product ) {
	return;
}

$compatibility = trim( wp_strip_all_tags( $product->get_attribute( 'Совместимость' ) ) );
$compatibility = $compatibility ? preg_split( '/\s*,\s*/u', $compatibility, -1, PREG_SPLIT_NO_EMPTY ) : array();
$compatibility = array_slice( array_filter( array_map( 'trim', $compatibility ) ), 0, 4 );
if ( ! $compatibility ) {
	return;
}
?>
<div class="wpp-product-card__compatibility" aria-label="<?php esc_attr_e( 'Совместимость товара', 'wp-panda' ); ?>">
	<?php foreach ( $compatibility as $compatibility_item ) : ?>
		<span><?php echo esc_html( $compatibility_item ); ?></span>
	<?php endforeach; ?>
</div>
