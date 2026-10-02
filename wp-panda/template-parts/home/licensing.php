<?php
/**
 * «Прозрачные условия» licensing cards.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;
$shop_url    = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
$theme_term  = get_term_by( 'slug', 'wordpress-themes', 'product_cat' );
$plugin_term = get_term_by( 'slug', 'wordpress-plugins', 'product_cat' );
$themes_url  = $theme_term && ! is_wp_error( $theme_term ) ? get_term_link( $theme_term ) : $shop_url;
$plugins_url = $plugin_term && ! is_wp_error( $plugin_term ) ? get_term_link( $plugin_term ) : $shop_url;
?>
<section class="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
	<div class="flex flex-col gap-4 items-center text-center">
		<div class="max-w-2xl">
			<h2 class="text-3xl font-bold tracking-tight sm:text-[40px] sm:leading-[1.1]"><?php esc_html_e( 'Прозрачные условия', 'wp-panda' ); ?></h2>
			<p class="mt-3 text-muted sm:text-[17px]"><?php esc_html_e( 'Два простых формата покупки: темы на 1 или 5 сайтов, плагины — навсегда', 'wp-panda' ); ?></p>
		</div>
	</div>
	<div class="mt-10 grid gap-5 md:grid-cols-2">
		<div class="rounded-card border-2 border-brand bg-white p-7 shadow-picked">
			<span class="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white"><?php esc_html_e( 'Темы WordPress', 'wp-panda' ); ?></span>
			<h3 class="mt-4 text-2xl font-bold tracking-tight"><?php esc_html_e( '1 сайт или 5 сайтов', 'wp-panda' ); ?></h3>
			<p class="mt-2 text-sm text-muted"><?php esc_html_e( 'Каждая тема продаётся с выбором количества сайтов:', 'wp-panda' ); ?></p>
			<div class="mt-6 space-y-3">
				<div class="flex items-center justify-between rounded-2xl bg-soft p-4">
					<div>
						<div class="font-semibold text-ink">1 <?php esc_html_e( 'сайт', 'wp-panda' ); ?></div>
						<div class="text-xs text-muted"><?php esc_html_e( 'Для личного проекта или одного клиента', 'wp-panda' ); ?></div>
					</div>
					<span class="text-sm font-bold text-ink">1 <?php esc_html_e( 'сайт', 'wp-panda' ); ?></span>
				</div>
				<div class="flex items-center justify-between rounded-2xl bg-soft p-4">
					<div>
						<div class="font-semibold text-ink">5 <?php esc_html_e( 'сайтов', 'wp-panda' ); ?></div>
						<div class="text-xs text-muted"><?php esc_html_e( 'Для компаний и веб-студий', 'wp-panda' ); ?></div>
					</div>
					<span class="text-sm font-bold text-ink"><?php esc_html_e( 'До 5 сайтов', 'wp-panda' ); ?></span>
				</div>
			</div>
			<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-brand text-ink hover:bg-brand-600 shadow-glow h-14 px-7 text-[15px] mt-6 w-full" href="<?php echo esc_url( $themes_url ); ?>"><?php esc_html_e( 'Выбрать тему', 'wp-panda' ); ?></a>
		</div>
		<div class="dark-card rounded-card p-7 text-white shadow-float flex flex-col justify-between">
			<div>
				<span class="rounded-full bg-brand px-3 py-1 text-xs font-bold text-ink"><?php esc_html_e( 'Плагины WordPress', 'wp-panda' ); ?></span>
				<h3 class="mt-4 text-2xl font-bold tracking-tight text-white"><?php esc_html_e( 'Лицензия навсегда', 'wp-panda' ); ?></h3>
				<p class="mt-2 text-sm text-white/70"><?php esc_html_e( 'Все плагины Wp Panda продаются с пожизненным доступом. Покупаете один раз — пользуетесь бессрочно.', 'wp-panda' ); ?></p>
				<ul class="mt-6 space-y-3 text-sm text-white/85">
					<?php foreach ( array( __( 'Один платёж без ежегодных продлений', 'wp-panda' ), __( 'Все будущие обновления плагина включены', 'wp-panda' ), __( 'Неограниченное использование на ваших проектах', 'wp-panda' ), __( 'Техническая поддержка от разработчиков', 'wp-panda' ) ) as $wpp_line ) : ?>
						<li class="flex items-center gap-2.5">
							<span class="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand text-ink">
								<?php echo wpp_icon( 'check', 'h-3 w-3', array( 'stroke' => '3' ) ); ?>
							</span><?php echo esc_html( $wpp_line ); ?>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>
			<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-brand text-ink hover:bg-brand-600 shadow-glow h-14 px-7 text-[15px] mt-6 w-full" href="<?php echo esc_url( $plugins_url ); ?>"><?php esc_html_e( 'Выбрать плагин', 'wp-panda' ); ?></a>
		</div>
	</div>
</section>
