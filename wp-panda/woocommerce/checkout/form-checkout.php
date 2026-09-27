<?php
/** Checkout shell styled to match html-layout/checkout.html; WooCommerce owns fields, validation, order review and payment. */
defined( 'ABSPATH' ) || exit;

$checkout     = WC()->checkout();
$cart_count   = WC()->cart ? WC()->cart->get_cart_contents_count() : 0;
$count_mod100 = $cart_count % 100;
$count_mod10  = $cart_count % 10;
$cart_noun    = ( 11 <= $count_mod100 && 14 >= $count_mod100 ) ? 'товаров' : ( 1 === $count_mod10 ? 'товар' : ( 2 <= $count_mod10 && 4 >= $count_mod10 ? 'товара' : 'товаров' ) );
// The coupon form belongs in the order summary on this layout, not above the checkout form.
remove_action( 'woocommerce_before_checkout_form', 'woocommerce_checkout_coupon_form', 10 );
do_action( 'woocommerce_before_checkout_form', $checkout );

if ( ! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in() ) {
	printf( '<div class="woocommerce-info">%s</div>', wp_kses_post( apply_filters( 'woocommerce_checkout_must_be_logged_in_message', __( 'You must be logged in to checkout.', 'woocommerce' ) ) ) );
	return;
}
?>
<div class="checkout-page mx-auto max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 lg:pb-20">
	<nav class="checkout-steps" aria-label="<?php esc_attr_e( 'Этапы заказа', 'wp-panda' ); ?>">
		<a class="checkout-step is-complete" href="<?php echo esc_url( wc_get_cart_url() ); ?>"><span>✓</span><span><?php esc_html_e( 'Корзина', 'wp-panda' ); ?><small><?php echo esc_html( number_format_i18n( $cart_count ) . ' ' . $cart_noun ); ?></small></span></a>
		<span class="checkout-step__line" aria-hidden="true"></span>
		<span class="checkout-step is-current"><span>2</span><span><?php esc_html_e( 'Данные', 'wp-panda' ); ?><small><?php esc_html_e( 'Заполните форму', 'wp-panda' ); ?></small></span></span>
		<span class="checkout-step__line" aria-hidden="true"></span>
		<span class="checkout-step"><span>3</span><span><?php esc_html_e( 'Оплата', 'wp-panda' ); ?><small><?php esc_html_e( 'Выберите способ', 'wp-panda' ); ?></small></span></span>
		<span class="checkout-step__line" aria-hidden="true"></span>
		<span class="checkout-step"><span>4</span><span><?php esc_html_e( 'Готово', 'wp-panda' ); ?><small><?php esc_html_e( 'Финальный шаг', 'wp-panda' ); ?></small></span></span>
	</nav>

	<header class="checkout-page__heading">
		<p class="checkout-page__eyebrow"><?php esc_html_e( 'Безопасное оформление', 'wp-panda' ); ?></p>
		<h1><?php esc_html_e( 'Оформление заказа', 'wp-panda' ); ?></h1>
		<p><?php esc_html_e( 'Укажите контактные данные — на этот email придут лицензионные ключи и ссылки на скачивание.', 'wp-panda' ); ?></p>
	</header>

	<form name="checkout" method="post" class="checkout woocommerce-checkout wpp-checkout-form" action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data" aria-label="<?php esc_attr_e( 'Checkout', 'woocommerce' ); ?>">
		<div class="checkout-layout">
			<div class="checkout-fields">
				<?php if ( is_user_logged_in() ) : ?>
					<div class="wpp-checkout-profile-note"><span class="wpp-checkout-profile-note__icon" aria-hidden="true">✓</span><span><?php esc_html_e( 'Вы вошли как', 'wp-panda' ); ?> <b><?php echo esc_html( wp_get_current_user()->user_email ); ?></b> — <?php esc_html_e( 'данные заполнены из профиля.', 'wp-panda' ); ?></span><a href="<?php echo esc_url( wc_get_account_endpoint_url( 'edit-account' ) ); ?>"><?php esc_html_e( 'Изменить профиль', 'wp-panda' ); ?></a></div>
				<?php endif; ?>

				<?php if ( $checkout->get_checkout_fields() ) : ?>
					<?php do_action( 'woocommerce_checkout_before_customer_details' ); ?>
					<div id="customer_details" class="col2-set checkout-customer-details">
						<div class="col-1"><?php do_action( 'woocommerce_checkout_billing' ); ?></div>
						<div class="col-2"><?php do_action( 'woocommerce_checkout_shipping' ); ?></div>
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
					<div id="order_review" class="woocommerce-checkout-review-order"><?php do_action( 'woocommerce_checkout_order_review' ); ?></div>
					<div class="wpp-checkout-trust"><span><?php echo wpp_icon( 'check', 'h-3 w-3' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php esc_html_e( 'Безопасная оплата', 'wp-panda' ); ?></span><span><?php echo wpp_icon( 'arrow', 'h-3 w-3' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php esc_html_e( 'Мгновенно', 'wp-panda' ); ?></span><span><?php echo wpp_icon( 'check', 'h-3 w-3' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php esc_html_e( 'Возврат 14 дней', 'wp-panda' ); ?></span></div>
					<?php do_action( 'woocommerce_checkout_after_order_review' ); ?>
				</div>
			</aside>
		</div>
	</form>
</div>
<?php do_action( 'woocommerce_after_checkout_form', $checkout ); ?>
