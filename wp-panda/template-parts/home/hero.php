<?php
/** Landing hero. */
defined( 'ABSPATH' ) || exit;
$shop_url   = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
$theme_term = function_exists( 'get_term_by' ) ? get_term_by( 'slug', 'wordpress-themes', 'product_cat' ) : false;
$theme_url  = $theme_term && ! is_wp_error( $theme_term ) ? get_term_link( $theme_term ) : $shop_url;
if ( is_wp_error( $theme_url ) ) {
	$theme_url = $shop_url;
}
?>
<section class="panda-hero panda-hero--landing relative isolate overflow-hidden border-b border-line">
	<div class="panda-hero__glow" aria-hidden="true"></div>
	<div class="panda-hero__content mx-auto grid max-w-[1200px] items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:px-6 lg:py-20">
		<div class="fade-up max-w-[570px]">
			<div class="hero-eyebrow"><span class="hero-eyebrow__dot"></span><?php esc_html_e( 'Темы и плагины для WordPress', 'wp-panda' ); ?></div>
			<h1 class="hero-title">Wp Panda<span>.</span></h1>
			<p class="hero-lead"><?php esc_html_e( 'Всё для WordPress в одном месте. Темы на 1 или 5 сайтов, плагины с лицензией навсегда.', 'wp-panda' ); ?></p>
			<div class="hero-actions">
				<a class="button button--brand button--large" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Смотреть каталог', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
				<a class="button button--light button--large" href="<?php echo esc_url( $theme_url ); ?>"><?php esc_html_e( 'Темы для WordPress', 'wp-panda' ); ?></a>
			</div>
			<ul class="hero-benefits"><li><?php echo wpp_icon( 'check', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> <?php esc_html_e( 'Автообновления', 'wp-panda' ); ?></li><li><?php echo wpp_icon( 'check', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> <?php esc_html_e( 'Безопасная оплата', 'wp-panda' ); ?></li><li><?php echo wpp_icon( 'check', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> <?php esc_html_e( 'Помощь специалистов', 'wp-panda' ); ?></li></ul>
		</div>
		<div class="hero-art" aria-hidden="true">
			<div class="hero-art__orb hero-art__orb--one"></div><div class="hero-art__orb hero-art__orb--two"></div>
			<div class="hero-art__window"><div class="hero-art__window-bar"><span></span><span></span><span></span><b>wp-panda.pro</b></div>
				<div class="hero-art__mock-site"><div class="hero-art__mock-header"><i></i><span></span><span></span><span></span></div><div class="hero-art__mock-copy"><i></i><b></b><b></b><span></span><span></span><em></em></div><div class="hero-art__mock-card"><i></i><span></span><span></span><b></b></div></div>
				<div class="hero-art__badge"><span>✦</span><div><strong><?php esc_html_e( 'Создано для WordPress', 'wp-panda' ); ?></strong><small><?php esc_html_e( 'Понятно. Быстро. Надёжно.', 'wp-panda' ); ?></small></div></div>
			</div>
		</div>
	</div>
</section>
