<?php
/**
 * Template Name: Поддержка — форма обращения
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
$sent = isset( $_GET['sent'] ) ? sanitize_text_field( wp_unslash( $_GET['sent'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification
$products = wpp_showcase_products( 'all', 16 );
$action   = admin_url( 'admin-post.php' );
?>
<div class="mx-auto max-w-[860px] px-4 pt-10 sm:px-6">
	<div class="mx-auto max-w-2xl text-center">
		<div class="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium shadow-card">
			<span class="h-1.5 w-1.5 rounded-full bg-brand"></span><?php esc_html_e( 'Поддержка Wp Panda', 'wp-panda' ); ?>
		</div>
		<h1 class="mt-5 text-4xl font-extrabold tracking-[-0.03em] text-ink"><?php the_title(); ?></h1>
		<p class="mt-3 text-sm leading-relaxed text-muted"><?php esc_html_e( 'Опишите проблему — команда WPP Team ответит на почту в течение рабочего дня.', 'wp-panda' ); ?></p>
	</div>

	<?php if ( 'ok' === $sent ) : ?>
		<div class="mt-10 flex flex-col items-center rounded-card border border-line bg-white p-10 text-center shadow-card">
			<span class="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 ring-[8px] ring-brand-50/60"><?php wpp_icon( 'circle-check', 'h-8 w-8 text-emerald-600' ); ?></span>
			<h2 class="mt-6 text-xl font-bold"><?php esc_html_e( 'Обращение отправлено!', 'wp-panda' ); ?></h2>
			<p class="mt-2 max-w-sm text-sm text-muted"><?php esc_html_e( 'Мы получили сообщение и ответим на указанную почту. Проверьте папку «Спам», если ответа долго нет.', 'wp-panda' ); ?></p>
			<a href="<?php echo esc_url( get_permalink() ); ?>" class="mt-6 inline-flex h-11 items-center rounded-full bg-soft px-5 text-sm font-semibold text-ink transition hover:bg-brand-50"><?php esc_html_e( 'Отправить ещё одно', 'wp-panda' ); ?></a>
		</div>
	<?php else : ?>
		<form id="form" method="post" action="<?php echo esc_url( $action ); ?>" class="mt-10 rounded-card border border-line bg-white p-6 shadow-card sm:p-8">
			<?php wp_nonce_field( 'wpp_support', 'wpp_support_nonce' ); ?>
			<input type="hidden" name="action" value="wpp_support" />
			<input type="hidden" name="wpp_page" value="<?php echo esc_url( get_permalink() ); ?>" />

			<div class="grid gap-4 sm:grid-cols-2">
				<label class="block">
					<span class="mb-1.5 block text-xs font-semibold text-ink"><?php esc_html_e( 'Ваше имя *', 'wp-panda' ); ?></span>
					<input type="text" name="wpp_name" required maxlength="100" class="h-11 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" />
				</label>
				<label class="block">
					<span class="mb-1.5 block text-xs font-semibold text-ink"><?php esc_html_e( 'Email *', 'wp-panda' ); ?></span>
					<input type="email" name="wpp_email" required maxlength="100" class="h-11 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" />
				</label>
				<label class="block">
					<span class="mb-1.5 block text-xs font-semibold text-ink"><?php esc_html_e( 'Адрес сайта', 'wp-panda' ); ?></span>
					<input type="url" name="wpp_site" placeholder="https://" class="h-11 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" />
				</label>
				<label class="block">
					<span class="mb-1.5 block text-xs font-semibold text-ink"><?php esc_html_e( 'Версия WordPress', 'wp-panda' ); ?></span>
					<input type="text" name="wpp_wp" value="<?php echo esc_attr( get_bloginfo( 'version' ) ); ?>" class="h-11 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" />
				</label>
				<label class="block">
					<span class="mb-1.5 block text-xs font-semibold text-ink"><?php esc_html_e( 'Продукт', 'wp-panda' ); ?></span>
					<select name="wpp_product" class="h-11 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm outline-none transition focus:border-brand focus:bg-white">
						<?php foreach ( $products as $d ) : ?>
							<option value="<?php echo esc_attr( $d['name'] ); ?>"><?php echo esc_html( $d['name'] ); ?></option>
						<?php endforeach; ?>
						<option value=""><?php esc_html_e( 'Другое / не знаю', 'wp-panda' ); ?></option>
					</select>
				</label>
				<label class="block">
					<span class="mb-1.5 block text-xs font-semibold text-ink"><?php esc_html_e( 'Приоритет', 'wp-panda' ); ?></span>
					<select name="wpp_priority" class="h-11 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm outline-none transition focus:border-brand focus:bg-white">
						<option value="normal"><?php esc_html_e( 'Обычный', 'wp-panda' ); ?></option>
						<option value="high"><?php esc_html_e( 'Высокий', 'wp-panda' ); ?></option>
						<option value="critical"><?php esc_html_e( 'Критичный — сайт не работает', 'wp-panda' ); ?></option>
					</select>
				</label>
			</div>

			<label class="mt-4 block">
				<span class="mb-1.5 block text-xs font-semibold text-ink"><?php esc_html_e( 'Тема обращения *', 'wp-panda' ); ?></span>
				<input type="text" name="wpp_subject" required maxlength="150" class="h-11 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" />
			</label>

			<label class="mt-4 block">
				<span class="mb-1.5 block text-xs font-semibold text-ink"><?php esc_html_e( 'Сообщение *', 'wp-panda' ); ?></span>
				<textarea name="wpp_message" required rows="6" class="w-full rounded-xl border border-line bg-soft/70 px-4 py-3 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" placeholder="<?php esc_attr_e( 'Что случилось? Что уже пробовали?', 'wp-panda' ); ?>"></textarea>
			</label>

			<button type="submit" class="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand text-[15px] font-semibold text-ink shadow-glow transition hover:bg-brand-600 sm:w-auto sm:px-10">
				<?php wpp_icon( 'send', 'h-4 w-4' ); ?><?php esc_html_e( 'Отправить обращение', 'wp-panda' ); ?>
			</button>
			<p class="mt-3 text-[11px] text-muted"><?php esc_html_e( 'Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.', 'wp-panda' ); ?></p>
		</form>
	<?php endif; ?>
</div>
<?php get_footer(); ?>
