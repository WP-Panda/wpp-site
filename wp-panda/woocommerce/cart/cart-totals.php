<?php
/**
 * Compact totals panel used by the reference-style cart summary.
 *
 * @package WooCommerce\Templates
 * @version 2.3.6
 */
defined( 'ABSPATH' ) || exit;
?>
<div class="cart_totals wpp-cart-totals <?php echo WC()->customer->has_calculated_shipping() ? 'calculated_shipping' : ''; ?>">
	<?php do_action( 'woocommerce_before_cart_totals' ); ?>
	<table cellspacing="0" class="shop_table shop_table_responsive">
		<?php foreach ( WC()->cart->get_cart() as $cart_item ) : ?>
			<?php if ( empty( $cart_item['data'] ) || ! $cart_item['data'] instanceof WC_Product ) { continue; } ?>
			<tr class="cart-summary-line"><th><?php echo esc_html( $cart_item['data']->get_name() ); ?><?php if ( $cart_item['quantity'] > 1 ) : ?> × <?php echo esc_html( $cart_item['quantity'] ); ?><?php endif; ?></th><td><?php echo wp_kses_post( WC()->cart->get_product_subtotal( $cart_item['data'], $cart_item['quantity'] ) ); ?></td></tr>
		<?php endforeach; ?>
		<?php foreach ( WC()->cart->get_coupons() as $code => $coupon ) : ?>
			<tr class="cart-discount coupon-<?php echo esc_attr( sanitize_title( $code ) ); ?>"><th><?php wc_cart_totals_coupon_label( $coupon ); ?></th><td><?php wc_cart_totals_coupon_html( $coupon ); ?></td></tr>
		<?php endforeach; ?>
		<?php if ( WC()->cart->needs_shipping() && WC()->cart->show_shipping() ) : ?>
			<?php do_action( 'woocommerce_cart_totals_before_shipping' ); ?><?php wc_cart_totals_shipping_html(); ?><?php do_action( 'woocommerce_cart_totals_after_shipping' ); ?>
		<?php endif; ?>
		<?php foreach ( WC()->cart->get_fees() as $fee ) : ?><tr class="fee"><th><?php echo esc_html( $fee->name ); ?></th><td><?php wc_cart_totals_fee_html( $fee ); ?></td></tr><?php endforeach; ?>
		<?php do_action( 'woocommerce_cart_totals_before_order_total' ); ?>
		<tr class="order-total"><th><?php esc_html_e( 'Итого', 'wp-panda' ); ?></th><td><?php wc_cart_totals_order_total_html(); ?></td></tr>
		<?php do_action( 'woocommerce_cart_totals_after_order_total' ); ?>
	</table>
	<div class="wc-proceed-to-checkout">
		<?php do_action( 'woocommerce_proceed_to_checkout' ); ?>
	</div>
	<?php do_action( 'woocommerce_after_cart_totals' ); ?>
</div>
