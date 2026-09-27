<?php
/** Landing hero, matching the supplied static home page while keeping live URLs. */
defined( 'ABSPATH' ) || exit;
$shop_url   = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
$theme_term = function_exists( 'get_term_by' ) ? get_term_by( 'slug', 'wordpress-themes', 'product_cat' ) : false;
$theme_url  = $theme_term && ! is_wp_error( $theme_term ) ? get_term_link( $theme_term ) : $shop_url;
if ( is_wp_error( $theme_url ) ) {
	$theme_url = $shop_url;
}
?>
<section class="panda-hero panda-hero--landing relative isolate flex min-h-[440px] items-center overflow-hidden border-b border-line sm:min-h-[500px] lg:min-h-[540px]">
	<div class="panda-hero__glow" aria-hidden="true"></div>
	<div class="relative mx-auto grid w-full max-w-[1200px] items-center gap-8 px-5 py-11 sm:px-8 sm:py-14 md:grid-cols-[1.05fr_1fr] lg:px-6 lg:py-16">
		<div class="fade-up max-w-[540px]">
			<div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60"><span class="h-2 w-2 rounded-full bg-brand"></span><?php esc_html_e( 'Темы и плагины для WordPress', 'wp-panda' ); ?></div>
			<h1 class="mt-5 text-[52px] font-extrabold leading-[0.95] tracking-[-0.065em] text-ink sm:mt-6 sm:text-[72px] lg:text-[84px]">Wp Panda<span class="text-brand">.</span></h1>
			<p class="mt-4 max-w-[460px] text-base leading-relaxed text-ink/70 sm:mt-5 sm:text-lg"><?php esc_html_e( 'Всё для WordPress в одном месте. Темы на 1 или 5 сайтов, плагины с лицензией навсегда.', 'wp-panda' ); ?></p>
			<div class="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
				<a class="button button--brand button--large" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Смотреть каталог', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
				<a class="button button--light button--large" href="<?php echo esc_url( $theme_url ); ?>"><?php esc_html_e( 'Темы для WordPress', 'wp-panda' ); ?></a>
			</div>
		</div>
		<div class="hero-art" aria-hidden="true">
			<div class="hero-art__orb hero-art__orb--one"></div><div class="hero-art__orb hero-art__orb--two"></div>
			<div class="hero-art__window"><div class="hero-art__window-bar"><span></span><span></span><span></span><b>wp-panda.pro</b></div><div class="hero-art__mock-site"><div class="hero-art__mock-header"><i></i><span></span><span></span><span></span></div><div class="hero-art__mock-copy"><i></i><b></b><b></b><span></span><span></span><em></em></div><div class="hero-art__mock-card"><i></i><span></span><span></span><b></b></div></div></div>
		</div>
	</div>
</section>
