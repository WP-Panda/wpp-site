<?php
/**
 * Site header, identical to the supplied layout. The cart/checkout flow uses
 * the compact «безопасное оформление» header variant of the layout.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="profile" href="https://gmpg.org/xfn/11">
<link rel="icon" type="image/svg+xml" href="<?php echo esc_url( get_template_directory_uri() . '/assets/images/panda.svg' ); ?>">
<meta name="description" content="<?php echo esc_attr( get_bloginfo( 'description' ) ? get_bloginfo( 'description' ) : __( 'Темы и плагины WordPress с автообновлениями, лицензиями и поддержкой 12 месяцев.', 'wp-panda' ) ); ?>">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="root">
	<div class="relative min-h-screen overflow-x-clip">
		<div aria-hidden="true" class="page-glow pointer-events-none absolute inset-x-0 top-0 h-[620px]"></div>
		<div class="relative flex min-h-screen flex-col">
<?php if ( wpp_is_checkout_flow() ) : ?>
			<header class="sticky top-0 z-40 transition-all duration-300 bg-transparent">
				<div class="mx-auto flex h-[76px] max-w-[1200px] items-center gap-3 px-4 sm:h-20 sm:px-6">
					<a aria-label="<?php esc_attr_e( 'На главную', 'wp-panda' ); ?>" class="flex-shrink-0" href="<?php echo esc_url( home_url( '/' ) ); ?>">
						<span class="flex items-center gap-2.5">
							<span class="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-line">
								<img alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>" class="h-9 w-9 object-contain" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/panda.svg' ); ?>">
							</span>
							<span class="flex flex-col leading-none">
								<span class="text-[19px] font-bold tracking-tight text-ink"><?php bloginfo( 'name' ); ?></span>
								<span class="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">WPP</span>
							</span>
						</span>
					</a>
					<div class="ml-auto flex items-center gap-2">
						<a class="hidden h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-muted transition hover:text-ink md:flex" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) ); ?>"><?php echo wpp_icon( 'arrow-left', 'h-4 w-4' ); ?><?php esc_html_e( 'В магазин', 'wp-panda' ); ?></a>
						<span class="hidden h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-medium shadow-card sm:flex"><?php echo wpp_icon( 'lock', 'h-4 w-4 text-emerald-600' ); ?><?php esc_html_e( 'Безопасное оформление', 'wp-panda' ); ?></span>
						<a aria-label="<?php esc_attr_e( 'Поддержка в личном кабинете', 'wp-panda' ); ?>" class="relative inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 hover:shadow-md active:scale-95" href="<?php echo esc_url( function_exists( 'wc_get_account_endpoint_url' ) ? wc_get_account_endpoint_url( 'support' ) : home_url( '/my-account/' ) ); ?>"><?php echo wpp_icon( 'headphones', 'h-[18px] w-[18px]' ); ?></a>
						<button type="button" data-cart-open aria-label="<?php esc_attr_e( 'Открыть корзину', 'wp-panda' ); ?>" class="relative inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 hover:shadow-md active:scale-95">
							<?php echo wpp_icon( 'shopping-bag', 'h-[18px] w-[18px]' ); ?>
							<?php if ( wpp_get_cart_count() > 0 ) : ?>
								<span class="wpp-cart-count absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-ink ring-2 ring-white"><?php echo esc_html( number_format_i18n( wpp_get_cart_count() ) ); ?></span>
							<?php endif; ?>
						</button>
						<a class="hidden h-11 items-center gap-2 rounded-full border border-line bg-white px-1.5 shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 sm:flex xl:pr-4" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'myaccount' ) : wp_login_url() ); ?>">
							<span class="flex h-8 w-8 items-center justify-center rounded-full bg-brand"><?php echo wpp_icon( 'user', 'h-4 w-4' ); ?></span>
							<span class="hidden text-sm font-semibold xl:block"><?php echo esc_html( is_user_logged_in() ? wpp_account_short_name() : __( 'Войти', 'wp-panda' ) ); ?></span>
						</a>
					</div>
				</div>
			</header>
<?php else : ?>
			<header id="site-header" class="sticky top-0 z-40 transition-all duration-300 bg-transparent">
				<div class="mx-auto flex h-[76px] max-w-[1200px] items-center gap-3 px-4 sm:h-20 sm:px-6">
					<a aria-label="<?php esc_attr_e( 'На главную', 'wp-panda' ); ?>" class="flex-shrink-0" href="<?php echo esc_url( home_url( '/' ) ); ?>">
						<span class="flex items-center gap-2.5">
							<span class="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-line">
								<img alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>" class="h-9 w-9 object-contain" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/panda.svg' ); ?>">
							</span>
							<span class="flex flex-col leading-none">
								<span class="text-[19px] font-bold tracking-tight text-ink"><?php bloginfo( 'name' ); ?></span>
								<span class="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">WPP</span>
							</span>
						</span>
					</a>
					<nav class="mx-auto hidden items-center gap-1 lg:flex" aria-label="<?php esc_attr_e( 'Главное меню', 'wp-panda' ); ?>">
						<?php
						wp_nav_menu( array(
							'theme_location' => 'primary',
							'container'      => false,
							'items_wrap'     => '%3$s',
							'walker'         => new Wpp_Primary_Menu_Walker(),
							'fallback_cb'    => 'wpp_primary_menu_fallback',
							'depth'          => 1,
						) );
						?>
					</nav>
					<div class="ml-auto flex items-center gap-2 lg:ml-0">
						<div class="relative" data-search>
							<button type="button" aria-label="<?php esc_attr_e( 'Поиск', 'wp-panda' ); ?>" data-search-toggle class="relative inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 hover:shadow-md active:scale-95">
								<?php echo wpp_icon( 'search', 'h-[18px] w-[18px]' ); ?>
							</button>
							<?php get_template_part( 'template-parts/header/search-panel' ); ?>
						</div>
						<?php if ( is_user_logged_in() ) : ?>
						<div class="relative hidden sm:block" data-notifications>
							<button type="button" aria-label="<?php esc_attr_e( 'Уведомления', 'wp-panda' ); ?>" data-notifications-toggle class="relative inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 hover:shadow-md active:scale-95">
								<?php echo wpp_icon( 'bell', 'h-[18px] w-[18px]' ); ?>
								<span class="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
							</button>
							<?php get_template_part( 'template-parts/header/notifications' ); ?>
						</div>
						<?php endif; ?>
						<button type="button" data-cart-open aria-label="<?php esc_attr_e( 'Открыть корзину', 'wp-panda' ); ?>" class="relative inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 hover:shadow-md active:scale-95">
							<?php echo wpp_icon( 'shopping-bag', 'h-[18px] w-[18px]' ); ?>
							<?php if ( wpp_get_cart_count() > 0 ) : ?>
								<span class="wpp-cart-count absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-ink ring-2 ring-white"><?php echo esc_html( number_format_i18n( wpp_get_cart_count() ) ); ?></span>
							<?php endif; ?>
						</button>
						<a class="hidden h-11 items-center gap-2 rounded-full border border-line bg-white px-1.5 shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 sm:flex xl:pr-4" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'myaccount' ) : wp_login_url() ); ?>">
							<span class="flex h-8 w-8 items-center justify-center rounded-full bg-brand"><?php echo wpp_icon( 'user', 'h-4 w-4' ); ?></span>
							<span class="hidden text-sm font-semibold xl:block"><?php echo esc_html( is_user_logged_in() ? wpp_account_short_name() : __( 'Войти', 'wp-panda' ) ); ?></span>
						</a>
						<button type="button" data-menu-toggle aria-label="<?php esc_attr_e( 'Меню', 'wp-panda' ); ?>" aria-expanded="false" class="relative inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 hover:shadow-md active:scale-95 lg:hidden">
							<span data-menu-icon-open><?php echo wpp_icon( 'menu', 'h-[18px] w-[18px]' ); ?></span>
							<span data-menu-icon-close class="hidden"><?php echo wpp_icon( 'x', 'h-[18px] w-[18px]' ); ?></span>
						</button>
					</div>
				</div>
				<?php get_template_part( 'template-parts/header/mobile-menu' ); ?>
			</header>
<?php endif; ?>
			<main class="fade-in flex-1">
