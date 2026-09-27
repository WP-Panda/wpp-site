<?php
/** Product purchase card retaining WooCommerce's native summary and add-to-cart hooks. */
defined( 'ABSPATH' ) || exit;

global $product;
if ( ! $product instanceof WC_Product ) {
	return;
}

$categories = wp_get_post_terms( $product->get_id(), 'product_cat', array( 'fields' => 'slugs' ) );
$is_theme  = ! is_wp_error( $categories ) && in_array( 'wordpress-themes', $categories, true );
$is_plugin = ! is_wp_error( $categories ) && in_array( 'wordpress-plugins', $categories, true );
$title     = $is_theme ? __( 'Лицензия темы', 'wp-panda' ) : ( $is_plugin ? __( 'Лицензия плагина', 'wp-panda' ) : __( 'Покупка товара', 'wp-panda' ) );
?>
<section class="item-buy summary entry-summary wpp-product-purchase-card" id="wpp-product-purchase" aria-label="<?php esc_attr_e( 'Покупка товара', 'wp-panda' ); ?>">
	<header class="wpp-product-purchase-card__heading">
		<h2><?php echo esc_html( $title ); ?></h2>
		<?php echo wpp_icon( 'check', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</header>

	<div class="wpp-product-purchase-card__body">
		<?php do_action( 'woocommerce_single_product_summary' ); ?>
		<button class="button button--light wpp-product-buy-now" type="button" data-wpp-buy-now><?php esc_html_e( 'Купить сейчас', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-3.5 w-3.5' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></button>
		<p class="wpp-product-delivery-note">⚡ <?php esc_html_e( 'Файлы доступны сразу после оплаты', 'wp-panda' ); ?></p>
		<div class="wpp-product-payment-note"><span>⌾ <?php esc_html_e( 'Безопасная оплата', 'wp-panda' ); ?></span><a href="<?php echo esc_url( home_url( '/kb/refund/' ) ); ?>"><?php esc_html_e( 'Условия возврата', 'wp-panda' ); ?></a></div>
	</div>
</section>
