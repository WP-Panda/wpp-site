<?php
/**
 * Billing address form posting to WooCommerce's native save_address handler.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$wpp_customer = WC()->customer;
$wpp_values   = array(
	'billing_first_name' => $wpp_customer->get_billing_first_name(),
	'billing_last_name'  => $wpp_customer->get_billing_last_name(),
	'billing_company'    => $wpp_customer->get_billing_company(),
	'billing_inn'        => get_user_meta( get_current_user_id(), 'billing_inn', true ),
	'billing_phone'      => $wpp_customer->get_billing_phone(),
	'billing_email'      => $wpp_customer->get_billing_email(),
	'billing_country'    => $wpp_customer->get_billing_country(),
	'billing_city'       => $wpp_customer->get_billing_city(),
	'billing_address_1'  => $wpp_customer->get_billing_address_1(),
	'billing_postcode'   => $wpp_customer->get_billing_postcode(),
);
$wpp_input_class = 'h-12 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15';
?>
<form method="post" class="space-y-5">
	<?php wp_nonce_field( 'woocommerce-edit_address', 'woocommerce-edit-address-nonce' ); ?>
	<input type="hidden" name="action" value="edit_address">
	<input type="hidden" name="load_address" value="billing">

	<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7">
		<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
			<div class="flex items-center gap-3">
				<span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100">1</span>
				<h3 class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Плательщик', 'wp-panda' ); ?></h3>
			</div>
			<span class="text-xs text-muted"><?php esc_html_e( 'Используется в счетах и чеках', 'wp-panda' ); ?></span>
		</div>
		<div class="grid gap-4 sm:grid-cols-2">
			<label class="block">
				<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Имя', 'wp-panda' ); ?></span>
				<input name="billing_first_name" class="<?php echo esc_attr( $wpp_input_class ); ?>" value="<?php echo esc_attr( $wpp_values['billing_first_name'] ); ?>">
			</label>
			<label class="block">
				<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Фамилия', 'wp-panda' ); ?></span>
				<input name="billing_last_name" class="<?php echo esc_attr( $wpp_input_class ); ?>" value="<?php echo esc_attr( $wpp_values['billing_last_name'] ); ?>">
			</label>
			<label class="block">
				<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Компания', 'wp-panda' ); ?><span class="text-[11px] font-normal text-muted"><?php esc_html_e( 'необязательно', 'wp-panda' ); ?></span></span>
				<input name="billing_company" class="<?php echo esc_attr( $wpp_input_class ); ?>" value="<?php echo esc_attr( $wpp_values['billing_company'] ); ?>">
			</label>
			<label class="block">
				<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'ИНН', 'wp-panda' ); ?><span class="text-[11px] font-normal text-muted"><?php esc_html_e( 'необязательно', 'wp-panda' ); ?></span></span>
				<input name="billing_inn" class="<?php echo esc_attr( $wpp_input_class ); ?>" value="<?php echo esc_attr( $wpp_values['billing_inn'] ); ?>">
			</label>
			<label class="block">
				<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Телефон', 'wp-panda' ); ?></span>
				<input name="billing_phone" type="tel" class="<?php echo esc_attr( $wpp_input_class ); ?>" value="<?php echo esc_attr( $wpp_values['billing_phone'] ); ?>">
			</label>
			<label class="block">
				<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Email для чеков', 'wp-panda' ); ?></span>
				<input name="billing_email" type="email" class="<?php echo esc_attr( $wpp_input_class ); ?>" value="<?php echo esc_attr( $wpp_values['billing_email'] ); ?>">
			</label>
		</div>
	</section>

	<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7">
		<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
			<div class="flex items-center gap-3">
				<span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100">2</span>
				<h3 class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Адрес', 'wp-panda' ); ?></h3>
			</div>
		</div>
		<div class="grid gap-4 sm:grid-cols-2">
			<label class="block">
				<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Страна', 'wp-panda' ); ?></span>
				<span class="relative block">
					<select name="billing_country" class="<?php echo esc_attr( $wpp_input_class ); ?> cursor-pointer appearance-none pr-10">
						<?php foreach ( WC()->countries->get_countries() as $wpp_code => $wpp_name ) : ?>
							<option value="<?php echo esc_attr( $wpp_code ); ?>" <?php selected( $wpp_values['billing_country'], $wpp_code ); ?>><?php echo esc_html( $wpp_name ); ?></option>
						<?php endforeach; ?>
					</select>
					<?php echo wpp_icon( 'chevron-down', 'pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted' ); ?>
				</span>
			</label>
			<label class="block">
				<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Город', 'wp-panda' ); ?></span>
				<input name="billing_city" class="<?php echo esc_attr( $wpp_input_class ); ?>" value="<?php echo esc_attr( $wpp_values['billing_city'] ); ?>">
			</label>
			<label class="block sm:col-span-2">
				<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Улица, дом, офис', 'wp-panda' ); ?></span>
				<input name="billing_address_1" class="<?php echo esc_attr( $wpp_input_class ); ?>" value="<?php echo esc_attr( $wpp_values['billing_address_1'] ); ?>">
			</label>
			<label class="block">
				<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Почтовый индекс', 'wp-panda' ); ?></span>
				<input name="billing_postcode" class="<?php echo esc_attr( $wpp_input_class ); ?>" value="<?php echo esc_attr( $wpp_values['billing_postcode'] ); ?>">
			</label>
		</div>
		<div class="mt-6 flex justify-end">
			<button type="submit" class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-12 px-6 text-sm"><?php echo wpp_icon( 'check', 'h-4 w-4' ); ?><?php esc_html_e( 'Сохранить адрес', 'wp-panda' ); ?></button>
		</div>
	</section>
</form>
