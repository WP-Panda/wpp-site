<?php
/** Why Wp Panda section from the supplied landing page. */
defined( 'ABSPATH' ) || exit;
$shop_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
$benefits = array(
	array( 'icon' => '↻', 'title' => __( 'Автообновления', 'wp-panda' ), 'text' => __( 'Обновляйте темы и плагины в один клик прямо из консоли WordPress.', 'wp-panda' ) ),
	array( 'icon' => '♧', 'title' => __( 'Поддержка от авторов', 'wp-panda' ), 'text' => __( 'Отвечают разработчики продукта, а не бот. В среднем — за 12 минут.', 'wp-panda' ) ),
	array( 'icon' => '⚡', 'title' => __( 'PageSpeed 95+', 'wp-panda' ), 'text' => __( 'Чистый код без лишних скриптов: быстрые сайты прямо из коробки.', 'wp-panda' ) ),
	array( 'icon' => '∞', 'title' => __( 'Покупка без подписок', 'wp-panda' ), 'text' => __( 'Темы на 1 или 5 сайтов, плагины с лицензией навсегда.', 'wp-panda' ) ),
);
?>
<section class="wpp-benefits mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
	<div class="grid gap-5 lg:grid-cols-[1.05fr_1fr]">
		<div class="dark-card relative overflow-hidden rounded-card p-8 text-white sm:p-10">
			<div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55"><?php esc_html_e( 'Почему Wp Panda', 'wp-panda' ); ?></div>
			<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"><?php esc_html_e( 'Плагины навсегда, темы на 1 или 5 сайтов', 'wp-panda' ); ?></h2>
			<p class="mt-4 max-w-md text-white/70"><?php esc_html_e( 'Никаких скрытых платежей. Плагины покупаются один раз и навсегда. Темы — с честной лицензией на нужное число сайтов.', 'wp-panda' ); ?></p>
			<div class="mt-8 grid grid-cols-3 gap-4"><div><div class="text-2xl font-bold text-brand sm:text-3xl"><?php esc_html_e( 'Навсегда', 'wp-panda' ); ?></div><div class="text-xs text-white/60"><?php esc_html_e( 'для плагинов', 'wp-panda' ); ?></div></div><div><div class="text-2xl font-bold text-brand sm:text-3xl">1 <?php esc_html_e( 'или', 'wp-panda' ); ?> 5</div><div class="text-xs text-white/60"><?php esc_html_e( 'сайтов для тем', 'wp-panda' ); ?></div></div><div><div class="text-2xl font-bold text-brand sm:text-3xl">12 <?php esc_html_e( 'мин', 'wp-panda' ); ?></div><div class="text-xs text-white/60"><?php esc_html_e( 'ответ поддержки', 'wp-panda' ); ?></div></div></div>
			<a class="button button--brand button--large mt-8" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Выбрать продукт', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a><div class="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full border-[32px] border-white/5"></div>
		</div>
		<div class="grid gap-5 sm:grid-cols-2"><?php foreach ( $benefits as $benefit ) : ?><article class="rounded-card border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-float"><span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-lg font-bold text-ink"><?php echo esc_html( $benefit['icon'] ); ?></span><h3 class="mt-5 text-lg font-semibold tracking-tight"><?php echo esc_html( $benefit['title'] ); ?></h3><p class="mt-1.5 text-sm leading-relaxed text-muted"><?php echo esc_html( $benefit['text'] ); ?></p></article><?php endforeach; ?></div>
	</div>
</section>
