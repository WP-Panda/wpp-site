<?php
/** Shipping-address fields; order notes are grouped in the third checkout card. */
defined( 'ABSPATH' ) || exit;

$checkout = isset( $checkout ) ? $checkout : WC()->checkout();
if ( ! WC()->cart || ! WC()->cart->needs_shipping_address() ) {
	return;
}
$ship_to_different_address = apply_filters( 'woocommerce_ship_to_different_address_checked', 'shipping' === get_option( 'woocommerce_ship_to_destination' ) );
?>
<div class="woocommerce-shipping-fields checkout-section wpp-checkout-section">
	<?php if ( true === WC()->cart->needs_shipping_address() ) : ?>
		<h2 class="woocommerce-shipping-fields__heading"><?php esc_html_e( 'Данные доставки', 'wp-panda' ); ?></h2>
		<h3 id="ship-to-different-address" class="woocommerce-shipping-fields__toggle">
			<label class="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
				<input id="ship-to-different-address-checkbox" class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox" <?php checked( $ship_to_different_address ); ?> type="checkbox" name="ship_to_different_address" value="1" />
				<span><?php esc_html_e( 'Доставить по другому адресу?', 'woocommerce' ); ?></span>
			</label>
		</h3>
		<div class="shipping_address">
			<?php do_action( 'woocommerce_before_checkout_shipping_form', $checkout ); ?>
			<div class="woocommerce-shipping-fields__field-wrapper wpp-checkout-fields-grid">
				<?php foreach ( $checkout->get_checkout_fields( 'shipping' ) as $key => $field ) : ?>
					<?php woocommerce_form_field( $key, $field, $checkout->get_value( $key ) ); ?>
				<?php endforeach; ?>
			</div>
			<?php do_action( 'woocommerce_after_checkout_shipping_form', $checkout ); ?>
		</div>
	<?php endif; ?>
</div>
