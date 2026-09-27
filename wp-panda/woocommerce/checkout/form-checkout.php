<?php
/**
 * Classic shortcode checkout form. Order fields/payment remain WooCommerce-owned.
 *
 * @package WooCommerce\Templates
 * @version 9.4.0
 */
defined( 'ABSPATH' ) || exit;

$checkout = WC()->checkout();

do_action( 'woocommerce_before_checkout_form', $checkout );

if ( ! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in() ) {
	printf(
		'<div class="woocommerce-info">%s</div>',
		wp_kses_post( apply_filters( 'woocommerce_checkout_must_be_logged_in_message', __( 'You must be logged in to checkout.', 'woocommerce' ) ) )
	);
	return;
}
?>
<div class="checkout-page mx-auto max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 lg:pb-20">
	<nav class="checkout-steps" aria-label="<?php esc_attr_e( 'Этапы заказа', 'wp-panda' ); ?>">
		<a class="checkout-step" href="<?php echo esc_url( wc_get_cart_url() ); ?>"><span>1</span><?php esc_html_e( 'Корзина', 'wp-panda' ); ?></a>
		<span class="checkout-step__line" aria-hidden="true"></span>
		<span class="checkout-step is-current"><span>2</span><?php esc_html_e( 'Данные', 'wp-panda' ); ?></span>
		<span class="checkout-step__line" aria-hidden="true"></span>
		<span class="checkout-step"><span>3</span><?php esc_html_e( 'Оплата', 'wp-panda' ); ?></span>
		<span class="checkout-step__line" aria-hidden="true"></span>
		<span class="checkout-step"><span>4</span><?php esc_html_e( 'Готово', 'wp-panda' ); ?></span>
	</nav>

	<header class="checkout-page__heading">
		<p class="eyebrow"><?php esc_html_e( 'Безопасное оформление', 'wp-panda' ); ?></p>
		<h1><?php esc_html_e( 'Оформление заказа', 'wp-panda' ); ?></h1>
		<p><?php esc_html_e( 'Укажите контактные данные для доставки заказа и получения чека.', 'wp-panda' ); ?></p>
	</header>

	<form name="checkout" method="post" class="checkout woocommerce-checkout wpp-checkout-form" action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data" aria-label="<?php esc_attr_e( 'Checkout', 'woocommerce' ); ?>">
		<div class="checkout-layout">
			<div class="checkout-fields">
				<?php if ( $checkout->get_checkout_fields() ) : ?>
					<?php do_action( 'woocommerce_checkout_before_customer_details' ); ?>
					<div id="customer_details" class="col2-set">
						<div class="col-1 checkout-section">
							<p class="checkout-section__hint"><?php esc_html_e( 'Контактные данные для квитанции и информации о заказе.', 'wp-panda' ); ?></p>
							<?php do_action( 'woocommerce_checkout_billing' ); ?>
						</div>
						<div class="col-2 checkout-section">
							<?php do_action( 'woocommerce_checkout_shipping' ); ?>
						</div>
					</div>
					<?php do_action( 'woocommerce_checkout_after_customer_details' ); ?>
				<?php endif; ?>
			</div>

			<aside class="checkout-summary">
				<div class="checkout-summary__card">
					<?php do_action( 'woocommerce_checkout_before_order_review_heading' ); ?>
					<h2 id="order_review_heading"><?php esc_html_e( 'Ваш заказ', 'wp-panda' ); ?></h2>
					<p class="checkout-summary__hint"><?php esc_html_e( 'Проверьте товары перед оплатой.', 'wp-panda' ); ?></p>
					<?php do_action( 'woocommerce_checkout_before_order_review' ); ?>
					<div id="order_review" class="woocommerce-checkout-review-order">
						<?php do_action( 'woocommerce_checkout_order_review' ); ?>
					</div>
					<?php do_action( 'woocommerce_checkout_after_order_review' ); ?>
				</div>
			</aside>
		</div>
	</form>
</div>
<?php do_action( 'woocommerce_after_checkout_form', $checkout ); ?>
