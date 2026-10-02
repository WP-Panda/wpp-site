<?php
/**
 * New support ticket form.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$wpp_licenses = function_exists( 'wpp_get_user_licenses' ) ? wpp_get_user_licenses() : array();
$wpp_products = array();
foreach ( $wpp_licenses as $wpp_license ) {
	$wpp_p = wc_get_product( $wpp_license['product_id'] );
	if ( $wpp_p ) {
		$wpp_products[ $wpp_p->get_id() ] = $wpp_p->get_name();
	}
}
$wpp_topics = array(
	__( 'Установка и настройка', 'wp-panda' ),
	__( 'Ошибка или баг', 'wp-panda' ),
	__( 'Лицензия и активация', 'wp-panda' ),
	__( 'Оплата и возврат', 'wp-panda' ),
	__( 'Доработка под задачу', 'wp-panda' ),
	__( 'Предпродажный вопрос', 'wp-panda' ),
);
?>
<div class="mx-auto max-w-[820px] px-4 sm:px-6 pb-4 pt-1">
	<div class="mb-6 flex flex-wrap items-end justify-between gap-3">
		<div>
			<a class="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-ink" href="<?php echo esc_url( wc_get_account_endpoint_url( 'support' ) ); ?>"><?php echo wpp_icon( 'arrow-left', 'h-3.5 w-3.5' ); ?><?php esc_html_e( 'Все обращения', 'wp-panda' ); ?></a>
			<h2 class="text-2xl font-bold tracking-tight sm:text-3xl"><?php esc_html_e( 'Новое обращение', 'wp-panda' ); ?></h2>
			<p class="mt-1 text-sm text-muted"><?php esc_html_e( 'WPP Team ответит в личном кабинете и на email.', 'wp-panda' ); ?></p>
		</div>
		<div class="inline-flex items-center gap-2 rounded-full bg-soft px-3 py-1.5 text-xs font-semibold text-ink"><?php echo wpp_icon( 'headphones', 'h-4 w-4' ); ?>WPP Team</div>
	</div>

	<?php wc_print_notices(); ?>

	<form method="post" class="space-y-5">
		<?php wp_nonce_field( 'wpp_new_ticket' ); ?>
		<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7">
			<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
				<div class="flex items-center gap-3">
					<span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100">1</span>
					<h3 class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Продукт и тема', 'wp-panda' ); ?></h3>
				</div>
			</div>
			<div class="grid gap-4 sm:grid-cols-2">
				<label class="block">
					<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Продукт', 'wp-panda' ); ?></span>
					<span class="relative block">
						<select name="product" class="h-12 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15 cursor-pointer appearance-none pr-10">
							<?php foreach ( $wpp_products as $wpp_id => $wpp_name ) : ?>
								<option value="<?php echo esc_attr( $wpp_name ); ?>"><?php echo esc_html( $wpp_name ); ?></option>
							<?php endforeach; ?>
							<option value=""><?php esc_html_e( 'Другое / общий вопрос', 'wp-panda' ); ?></option>
						</select>
						<?php echo wpp_icon( 'chevron-down', 'pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted' ); ?>
					</span>
				</label>
				<label class="block">
					<span class="mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink"><?php esc_html_e( 'Тема обращения', 'wp-panda' ); ?></span>
					<span class="relative block">
						<select name="topic" class="h-12 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15 cursor-pointer appearance-none pr-10">
							<?php foreach ( $wpp_topics as $wpp_topic ) : ?>
								<option value="<?php echo esc_attr( $wpp_topic ); ?>"><?php echo esc_html( $wpp_topic ); ?></option>
							<?php endforeach; ?>
						</select>
						<?php echo wpp_icon( 'chevron-down', 'pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted' ); ?>
					</span>
				</label>
			</div>
		</section>

		<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7">
			<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
				<div class="flex items-center gap-3">
					<span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100">2</span>
					<h3 class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Опишите вопрос', 'wp-panda' ); ?></h3>
				</div>
			</div>
			<div class="space-y-4">
				<label class="block">
					<span class="mb-2 block text-[13px] font-medium text-ink"><?php esc_html_e( 'Короткий заголовок', 'wp-panda' ); ?></span>
					<input name="subject" required class="h-12 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" placeholder="<?php esc_attr_e( 'Например: не импортируется демо', 'wp-panda' ); ?>">
				</label>
				<label class="block">
					<span class="mb-2 block text-[13px] font-medium text-ink"><?php esc_html_e( 'Сообщение', 'wp-panda' ); ?></span>
					<textarea name="message" rows="6" required class="w-full rounded-xl border border-line bg-soft/70 px-4 py-3 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" placeholder="<?php esc_attr_e( 'Что вы делали, что ожидали и что получилось. Приложите ссылку на сайт и шаги воспроизведения.', 'wp-panda' ); ?>"></textarea>
				</label>
			</div>
			<div class="mt-6 flex flex-wrap items-center justify-between gap-3">
				<p class="text-xs text-muted"><?php esc_html_e( 'Обычно отвечаем в течение нескольких часов в рабочее время.', 'wp-panda' ); ?></p>
				<button type="submit" name="wpp_ticket_submit" value="1" class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-12 px-6 text-sm"><?php echo wpp_icon( 'share-2', 'h-4 w-4' ); ?><?php esc_html_e( 'Отправить обращение', 'wp-panda' ); ?></button>
			</div>
		</section>
	</form>
</div>
