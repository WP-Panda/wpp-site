<?php
/**
 * Description tab.
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 2.0.0
 */

defined( 'ABSPATH' ) || exit;

global $post;

$heading     = apply_filters( 'woocommerce_product_description_heading', __( 'Description', 'woocommerce' ) );
$description = apply_filters( 'the_content', $post->post_content );
if ( function_exists( 'wpp_add_product_description_anchors' ) ) {
	$description = wpp_add_product_description_anchors( $description );
}
?>
<?php if ( $heading ) : ?>
	<h2><?php echo esc_html( $heading ); ?></h2>
<?php endif; ?>
<?php echo $description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Rendered through the_content and filtered product HTML. ?>
