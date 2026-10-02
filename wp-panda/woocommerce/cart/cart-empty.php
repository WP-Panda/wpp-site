<?php
/**
 * Empty cart state.
 *
 * @package WpPanda
 * @version 7.0.1
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="mx-auto max-w-[1200px] px-4 pb-32 pt-4 sm:px-6 lg:pb-8">
	<?php
	get_template_part( 'template-parts/checkout/stepper', null, array(
		'step'      => 1,
		'subtitles' => array( __( 'Пока пусто', 'wp-panda' ) ),
	) );
	?>
	<div class="fade-up mx-auto mt-16 max-w-md rounded-card border border-line bg-white p-10 text-center shadow-card">
		<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-soft text-muted"><?php echo wpp_icon( 'shopping-bag', 'h-7 w-7' ); ?></span>
		<h1 class="mt-5 text-2xl font-bold tracking-tight"><?php esc_html_e( 'В корзине пока пусто', 'wp-panda' ); ?></h1>
		<p class="mt-2 text-sm text-muted"><?php esc_html_e( 'Выберите тему или плагин в каталоге — ключ придёт на email сразу после оплаты.', 'wp-panda' ); ?></p>
		<a class="mt-6 inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-12 px-6 text-sm" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) ); ?>"><?php esc_html_e( 'Перейти в каталог', 'wp-panda' ); ?><?php echo wpp_icon( 'arrow-right', 'h-4 w-4' ); ?></a>
	</div>
</div>
