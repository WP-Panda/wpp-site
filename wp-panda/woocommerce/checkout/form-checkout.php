<?php
/**
 * Checkout form with the layout's 3-card field structure.
 *
 * @package WpPanda
 * @version 7.0.1
 */

defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_checkout_form', $checkout );

// If checkout registration is disabled and user's not logged in, we can't checkout.
if ( ! $checkout->is_registration_enabled() && ! $checkout->is_registration_required() && ! is_user_logged_in() && apply_filters( 'woocommerce_checkout_registration_required', false ) ) {
	echo wc_kses_notice( esc_html__( 'You must be logged in to checkout.', 'woocommerce' ) );
	return;
}

wc_print_notices();

$wpp_cart  = WC()->cart;
$wpp_count = $wpp_cart->get_cart_contents_count();
if ( $wpp_cart->is_empty() && ! is_customize_preview() ) {
	wc_get_template( 'cart/cart-empty.php' );
	return;
}

$wpp_fields = $checkout->get_checkout_fields();
$wpp_input_class = 'h-12 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15';

/**
 * Render one billing field with the layout label style.
 */
function wpp_checkout_field( $key, $fields, $checkout_obj ) {
	if ( ! isset( $fields[ $key ] ) ) {
		return;
	}
	$field = $fields[ $key ];
	$value = $checkout_obj->get_value( $key );
	?>
	<label class="block">
		<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink">
			<?php echo esc_html( $field['label'] ); ?>
			<?php if ( empty( $field['required'] ) ) : ?><span class="text-[11px] font-normal text-muted"><?php esc_html_e( 'необязательно', 'wp-panda' ); ?></span><?php endif; ?>
		</span>
		<?php echo woocommerce_form_field( $key, $field, $value ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
	</label>
	<?php
}
?>
<div class="mx-auto max-w-[1200px] px-4 pb-32 pt-4 sm:px-6 lg:pb-8">
	<?php
	$wpp_user_name = trim( wp_get_current_user()->first_name . ' ' . wp_get_current_user()->last_name );
	get_template_part( 'template-parts/checkout/stepper', null, array(
		'step'      => 2,
		'subtitles' => array(
			sprintf( _n( '%s товар', '%s товара', $wpp_count, 'wp-panda' ), number_format_i18n( $wpp_count ) ),
			$wpp_user_name ? $wpp_user_name : __( 'Заполните поля', 'wp-panda' ),
		),
	) );
	?>
	<div class="fade-up mt-10 text-center sm:mt-12">
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl"><?php esc_html_e( 'Оформление заказа', 'wp-panda' ); ?></h1>
		<p class="mx-auto mt-3 max-w-xl text-muted"><?php esc_html_e( 'Осталось два шага: данные и оплата. Ключи придут на email сразу после платежа.', 'wp-panda' ); ?></p>
	</div>

	<div class="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_370px]">
		<form name="checkout" method="post" class="checkout woocommerce-checkout fade-up min-w-0 space-y-5" action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data" novalidate>
			<?php if ( is_user_logged_in() ) : ?>
				<div class="flex flex-wrap items-center gap-3 rounded-2xl bg-brand-50 px-4 py-3 text-sm ring-1 ring-brand-100">
					<span class="flex h-8 w-8 items-center justify-center rounded-full bg-brand"><?php echo wpp_icon( 'user', 'h-4 w-4' ); ?></span>
					<span class="min-w-0 flex-1"><?php echo esc_html( sprintf( __( 'Вы вошли как %s — данные заполнены из профиля.', 'wp-panda' ), '' ) ); ?><b><?php echo esc_html( wp_get_current_user()->user_email ); ?></b></span>
					<a class="text-xs font-semibold underline decoration-brand decoration-2 underline-offset-4" href="<?php echo esc_url( wc_get_account_endpoint_url( 'edit-account' ) ); ?>"><?php esc_html_e( 'Изменить профиль', 'wp-panda' ); ?></a>
				</div>
			<?php endif; ?>

			<?php if ( ! empty( $wpp_fields['billing'] ) ) : ?>
			<div id="customer_details">
				<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7">
					<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
						<div class="flex items-center gap-3">
							<span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100">1</span>
							<h3 class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Контактные данные', 'wp-panda' ); ?></h3>
						</div>
						<span class="text-xs text-muted"><?php esc_html_e( 'Ключи придут на email', 'wp-panda' ); ?></span>
					</div>
					<div class="grid gap-4 sm:grid-cols-2">
						<?php
						wpp_checkout_field( 'billing_first_name', $wpp_fields['billing'], $checkout );
						wpp_checkout_field( 'billing_last_name', $wpp_fields['billing'], $checkout );
						wpp_checkout_field( 'billing_email', $wpp_fields['billing'], $checkout );
						wpp_checkout_field( 'billing_phone', $wpp_fields['billing'], $checkout );
						?>
					</div>
				</section>

				<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7 mt-5">
					<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
						<div class="flex items-center gap-3">
							<span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100">2</span>
							<h3 class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Платёжные данные', 'wp-panda' ); ?></h3>
						</div>
						<span class="text-xs text-muted"><?php esc_html_e( 'Для чека и закрывающих документов', 'wp-panda' ); ?></span>
					</div>
					<div class="grid gap-4 sm:grid-cols-2">
						<?php
						wpp_checkout_field( 'billing_country', $wpp_fields['billing'], $checkout );
						wpp_checkout_field( 'billing_city', $wpp_fields['billing'], $checkout );
						wpp_checkout_field( 'billing_company', $wpp_fields['billing'], $checkout );
						wpp_checkout_field( 'billing_inn', $wpp_fields['billing'], $checkout );
						?>
					</div>
				</section>

				<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7 mt-5">
					<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
						<div class="flex items-center gap-3">
							<span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100">3</span>
							<h3 class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Дополнительно', 'wp-panda' ); ?></h3>
						</div>
					</div>
					<div class="grid gap-4 sm:grid-cols-2">
						<label class="block">
							<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Домен для активации', 'wp-panda' ); ?><span class="text-[11px] font-normal text-muted"><?php esc_html_e( 'необязательно', 'wp-panda' ); ?></span></span>
							<input name="wpp_activation_domain" type="text" class="<?php echo esc_attr( $wpp_input_class ); ?>" placeholder="example.ru" value="<?php echo esc_attr( isset( $_POST['wpp_activation_domain'] ) ? sanitize_text_field( wp_unslash( $_POST['wpp_activation_domain'] ) ) : '' ); // phpcs:ignore WordPress.Security.NonceVerification ?>">
							<span class="mt-1.5 block text-xs text-muted"><?php esc_html_e( 'Ключ можно активировать и позже', 'wp-panda' ); ?></span>
						</label>
						<label class="block">
							<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Откуда вы о нас узнали?', 'wp-panda' ); ?><span class="text-[11px] font-normal text-muted"><?php esc_html_e( 'необязательно', 'wp-panda' ); ?></span></span>
							<span class="relative block">
								<select name="wpp_source" class="<?php echo esc_attr( $wpp_input_class ); ?> cursor-pointer appearance-none pr-10">
									<option value=""><?php esc_html_e( 'Выберите вариант', 'wp-panda' ); ?></option>
									<?php foreach ( array( __( 'Поиск Яндекс / Google', 'wp-panda' ), __( 'Рекомендация коллег', 'wp-panda' ), __( 'Блог или статья', 'wp-panda' ), __( 'Telegram-канал', 'wp-panda' ), __( 'Другое', 'wp-panda' ) ) as $wpp_src ) : ?>
										<option value="<?php echo esc_attr( $wpp_src ); ?>" <?php selected( isset( $_POST['wpp_source'] ) ? sanitize_text_field( wp_unslash( $_POST['wpp_source'] ) ) : '', $wpp_src ); // phpcs:ignore WordPress.Security.NonceVerification ?>><?php echo esc_html( $wpp_src ); ?></option>
									<?php endforeach; ?>
								</select>
								<?php echo wpp_icon( 'chevron-down', 'pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted' ); ?>
							</span>
						</label>
					</div>
					<?php if ( isset( $wpp_fields['order']['order_comments'] ) ) : ?>
						<label class="block mt-4">
							<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Комментарий к заказу', 'wp-panda' ); ?><span class="text-[11px] font-normal text-muted"><?php esc_html_e( 'необязательно', 'wp-panda' ); ?></span></span>
							<textarea name="order_comments" class="<?php echo esc_attr( $wpp_input_class ); ?> h-auto min-h-[120px] resize-y py-3 leading-relaxed" placeholder="<?php esc_attr_e( 'Например: нужны закрывающие документы через ЭДО', 'wp-panda' ); ?>"><?php echo esc_textarea( $checkout->get_value( 'order_comments' ) ); ?></textarea>
						</label>
					<?php endif; ?>
				</section>
			</div>
			<?php endif; ?>

			<div id="wpp-place-order" class="wpp-order-review">
				<?php do_action( 'woocommerce_checkout_order_review' ); ?>
			</div>

			<div class="lg:hidden">
				<div class="fade-in fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/90 backdrop-blur-xl">
					<div class="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
						<span class="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-ink sm:flex"><?php echo wpp_icon( 'shopping-bag', 'h-5 w-5' ); ?></span>
						<div class="min-w-0 flex-1">
							<div class="text-[11px] text-muted sm:text-xs"><?php esc_html_e( 'Итого к оплате', 'wp-panda' ); ?></div>
							<div class="truncate text-sm font-semibold sm:text-base"><?php echo wpp_format_amount( (float) $wpp_cart->get_total( 'edit' ) ); ?></div>
						</div>
						<button type="submit" class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-11 px-5 text-sm" name="woocommerce_checkout_update_totals"><?php esc_html_e( 'Далее', 'wp-panda' ); ?><?php echo wpp_icon( 'arrow-right', 'h-4 w-4' ); ?></button>
					</div>
				</div>
			</div>
		</form>

		<?php
		get_template_part( 'template-parts/checkout/summary', null, array(
			'cta_label' => __( 'Перейти к оплате', 'wp-panda' ),
			'cta_url'   => '#wpp-place-order',
			'cta_attrs' => 'data-checkout-submit',
		) );
		?>
	</div>

</div>
<?php do_action( 'woocommerce_after_checkout_form', $checkout ); ?>
