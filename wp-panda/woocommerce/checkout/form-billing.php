<?php
/** Billing fields grouped to match the checkout reference, while retaining WooCommerce field validation. */
defined( 'ABSPATH' ) || exit;

$checkout = isset( $checkout ) ? $checkout : WC()->checkout();
$fields   = $checkout->get_checkout_fields( 'billing' );
$groups   = array(
	'contact' => array(),
	'billing' => array(),
	'extra'   => array(),
);

foreach ( $fields as $key => $field ) {
	if ( in_array( $key, array( 'billing_first_name', 'billing_last_name', 'billing_email', 'billing_phone' ), true ) ) {
		$groups['contact'][ $key ] = $field;
	} elseif ( in_array( $key, array( 'billing_activation_domain', 'billing_referral_source' ), true ) ) {
		$groups['extra'][ $key ] = $field;
	} else {
		$groups['billing'][ $key ] = $field;
	}
}

$order_fields = $checkout->get_checkout_fields( 'order' );
if ( isset( $order_fields['order_comments'] ) && apply_filters( 'woocommerce_enable_order_notes_field', 'yes' === get_option( 'woocommerce_enable_order_comments', 'yes' ) ) ) {
	$groups['extra']['order_comments'] = $order_fields['order_comments'];
}

do_action( 'woocommerce_before_checkout_billing_form', $checkout );
?>
<section class="checkout-section wpp-checkout-section wpp-checkout-section--contact">
	<div class="wpp-checkout-section__heading">
		<span class="wpp-checkout-section__number">1</span>
		<div><h2><?php esc_html_e( 'Контактные данные', 'wp-panda' ); ?></h2></div>
		<p class="wpp-checkout-section__aside-note"><?php esc_html_e( 'Ключи придут на email', 'wp-panda' ); ?></p>
	</div>
	<div class="wpp-checkout-fields-grid">
		<?php foreach ( $groups['contact'] as $key => $field ) : ?>
			<?php woocommerce_form_field( $key, $field, $checkout->get_value( $key ) ); ?>
		<?php endforeach; ?>
	</div>
</section>

<section class="checkout-section wpp-checkout-section wpp-checkout-section--billing">
	<div class="wpp-checkout-section__heading">
		<span class="wpp-checkout-section__number">2</span>
		<div><h2><?php esc_html_e( 'Платёжные данные', 'wp-panda' ); ?></h2><p><?php esc_html_e( 'Для чека и закрывающих документов.', 'wp-panda' ); ?></p></div>
	</div>
	<div class="wpp-checkout-fields-grid">
		<?php foreach ( $groups['billing'] as $key => $field ) : ?>
			<?php woocommerce_form_field( $key, $field, $checkout->get_value( $key ) ); ?>
		<?php endforeach; ?>
	</div>
</section>

<?php do_action( 'woocommerce_before_order_notes', $checkout ); ?>
<section class="checkout-section wpp-checkout-section wpp-checkout-section--extra">
	<div class="wpp-checkout-section__heading">
		<span class="wpp-checkout-section__number">3</span>
		<div><h2><?php esc_html_e( 'Дополнительно', 'wp-panda' ); ?></h2><p><?php esc_html_e( 'Эти сведения необязательны.', 'wp-panda' ); ?></p></div>
	</div>
	<div class="wpp-checkout-fields-grid">
		<?php foreach ( $groups['extra'] as $key => $field ) : ?>
			<?php woocommerce_form_field( $key, $field, $checkout->get_value( $key ) ); ?>
		<?php endforeach; ?>
	</div>
</section>
<?php do_action( 'woocommerce_after_order_notes', $checkout ); ?>
<?php do_action( 'woocommerce_after_checkout_billing_form', $checkout ); ?>
