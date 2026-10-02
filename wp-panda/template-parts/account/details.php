<?php
/**
 * Account details form posting to WooCommerce's save_account_details handler.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$wpp_user        = wp_get_current_user();
$wpp_input_class = 'h-12 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15';
?>
<form method="post" class="space-y-5">
	<?php wp_nonce_field( 'save_account_details', 'woocommerce-save-account-details-nonce' ); ?>
	<input type="hidden" name="action" value="save_account_details">

	<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7">
		<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
			<div class="flex items-center gap-3">
				<span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100">1</span>
				<h3 class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Личные данные', 'wp-panda' ); ?></h3>
			</div>
		</div>
		<div class="grid gap-4 sm:grid-cols-2">
			<label class="block">
				<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Имя', 'wp-panda' ); ?></span>
				<input name="account_first_name" class="<?php echo esc_attr( $wpp_input_class ); ?>" value="<?php echo esc_attr( $wpp_user->first_name ); ?>">
			</label>
			<label class="block">
				<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Фамилия', 'wp-panda' ); ?></span>
				<input name="account_last_name" class="<?php echo esc_attr( $wpp_input_class ); ?>" value="<?php echo esc_attr( $wpp_user->last_name ); ?>">
			</label>
			<label class="block">
				<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Отображаемое имя', 'wp-panda' ); ?></span>
				<input name="account_display_name" class="<?php echo esc_attr( $wpp_input_class ); ?>" value="<?php echo esc_attr( $wpp_user->display_name ); ?>">
				<span class="mt-1.5 block text-xs text-muted"><?php esc_html_e( 'Так вас увидят в отзывах и комментариях', 'wp-panda' ); ?></span>
			</label>
			<label class="block">
				<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Email', 'wp-panda' ); ?></span>
				<input name="account_email" type="email" class="<?php echo esc_attr( $wpp_input_class ); ?>" value="<?php echo esc_attr( $wpp_user->user_email ); ?>">
			</label>
		</div>
	</section>

	<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7">
		<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
			<div class="flex items-center gap-3">
				<span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100">2</span>
				<h3 class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Смена пароля', 'wp-panda' ); ?></h3>
			</div>
			<span class="text-xs text-muted"><?php esc_html_e( 'Оставьте пустым, чтобы не менять', 'wp-panda' ); ?></span>
		</div>
		<div class="grid gap-4 sm:grid-cols-3">
			<label class="block">
				<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Текущий пароль', 'wp-panda' ); ?></span>
				<input name="password_current" type="password" placeholder="••••••••" class="<?php echo esc_attr( $wpp_input_class ); ?>">
			</label>
			<label class="block">
				<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Новый пароль', 'wp-panda' ); ?></span>
				<input name="password_1" type="password" placeholder="<?php esc_attr_e( 'Минимум 8 символов', 'wp-panda' ); ?>" class="<?php echo esc_attr( $wpp_input_class ); ?>">
			</label>
			<label class="block">
				<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Повторите пароль', 'wp-panda' ); ?></span>
				<input name="password_2" type="password" placeholder="••••••••" class="<?php echo esc_attr( $wpp_input_class ); ?>">
			</label>
		</div>
		<div class="mt-6 flex justify-end">
			<button type="submit" class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-12 px-6 text-sm"><?php echo wpp_icon( 'check', 'h-4 w-4' ); ?><?php esc_html_e( 'Сохранить изменения', 'wp-panda' ); ?></button>
		</div>
	</section>
</form>
