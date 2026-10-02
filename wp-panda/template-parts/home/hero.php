<?php
/**
 * Home hero, identical to the layout.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;
$shop_url   = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
$theme_term = get_term_by( 'slug', 'wordpress-themes', 'product_cat' );
$themes_url = $theme_term && ! is_wp_error( $theme_term ) ? get_term_link( $theme_term ) : $shop_url;
?>
<section class="panda-hero relative isolate flex min-h-[440px] items-center overflow-hidden border-b border-line sm:min-h-[500px] lg:min-h-[540px]">
	<img alt="<?php esc_attr_e( 'Рабочее место Wp Panda с макетом магазина WordPress на экране', 'wp-panda' ); ?>" fetchpriority="high" class="panda-hero__image absolute inset-0 h-full w-full object-cover" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/wp-panda-hero.png' ); ?>">
	<div aria-hidden="true" class="panda-hero__shade absolute inset-0"></div>
	<div class="relative mx-auto w-full max-w-[1200px] px-5 py-11 sm:px-8 sm:py-14 lg:px-6 lg:py-16">
		<div class="fade-up max-w-[540px]">
			<div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
				<span class="h-2 w-2 rounded-full bg-brand"></span><?php esc_html_e( 'Темы и плагины для WordPress', 'wp-panda' ); ?>
			</div>
			<h1 class="mt-5 text-[52px] font-extrabold leading-[0.95] tracking-[-0.065em] text-ink sm:mt-6 sm:text-[72px] lg:text-[84px]"><?php echo esc_html( get_bloginfo( 'name' ) ); ?><span class="text-brand">.</span></h1>
			<p class="mt-4 max-w-[460px] text-base leading-relaxed text-ink/70 sm:mt-5 sm:text-lg"><?php esc_html_e( 'Всё для WordPress в одном месте. Темы на 1 или 5 сайтов, плагины с лицензией навсегда.', 'wp-panda' ); ?></p>
			<div class="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
				<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-brand text-ink hover:bg-brand-600 shadow-glow h-14 px-7 text-[15px] pr-1.5" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Смотреть каталог', 'wp-panda' ); ?><span class="ml-4 flex items-center justify-center rounded-full bg-ink text-white h-11 w-11">
					<?php echo wpp_icon( 'arrow-right', 'h-4 w-4' ); ?>
				</span></a>
				<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-white text-ink border border-line hover:border-ink/25 shadow-[0_1px_2px_rgba(20,20,28,0.05)] h-14 px-7 text-[15px]" href="<?php echo esc_url( $themes_url ); ?>"><?php esc_html_e( 'Темы для WordPress', 'wp-panda' ); ?></a>
			</div>
		</div>
	</div>
</section>
