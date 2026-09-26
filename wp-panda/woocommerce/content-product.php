<?php
/**
 * Карточка товара в цикле каталога (override Woo).
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

global $product;

if ( empty( $product ) || ! $product->is_visible() ) {
	return;
}
?>
<li <?php wc_product_class( '', $product ); ?>>
	<?php
	$d = wpp_product_data( $product );
	if ( $d ) {
		wpp_product_card( $d );
	}
	?>
</li>
