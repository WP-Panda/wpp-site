<?php
/** Site header. */

defined( 'ABSPATH' ) || exit;
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site-shell relative min-h-screen overflow-x-clip">
	<div class="page-glow pointer-events-none absolute inset-x-0 top-0" aria-hidden="true"></div>
	<div class="site-shell__inner relative flex min-h-screen flex-col">
		<header class="site-header sticky top-0 z-40">
			<div class="site-header__inner mx-auto flex h-[76px] max-w-[1200px] items-center gap-3 px-4 sm:h-20 sm:px-6">
				<div class="site-brand flex-shrink-0">
					<?php if ( has_custom_logo() ) : ?>
						<?php the_custom_logo(); ?>
						<span class="screen-reader-text"><?php bloginfo( 'name' ); ?></span>
					<?php else : ?>
						<a class="site-brand__link flex items-center gap-2.5" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" aria-label="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?> — <?php esc_attr_e( 'На главную', 'wp-panda' ); ?>">
							<img class="site-brand__mark" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/panda-mark.svg' ); ?>" width="40" height="40" alt="" aria-hidden="true">
							<span class="site-brand__text">
								<span class="site-brand__name"><?php bloginfo( 'name' ); ?></span>
								<span class="site-brand__tag">WPP</span>
							</span>
						</a>
					<?php endif; ?>
				</div>

				<button class="site-menu-toggle inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink lg:hidden" type="button" aria-controls="site-navigation" aria-expanded="false" data-menu-toggle>
					<span class="screen-reader-text"><?php esc_html_e( 'Открыть меню', 'wp-panda' ); ?></span>
					<?php echo wpp_icon( 'menu', 'h-[18px] w-[18px]' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</button>

				<nav id="site-navigation" class="site-navigation mx-auto" aria-label="<?php esc_attr_e( 'Главное меню', 'wp-panda' ); ?>">
					<?php
					wp_nav_menu( array(
						'theme_location' => 'primary',
						'container'      => false,
						'menu_id'        => 'primary-menu',
						'menu_class'     => 'menu',
						'fallback_cb'    => 'wpp_primary_menu_fallback',
						'depth'          => 2,
					) );
					?>
				</nav>

				<div class="site-header__tools ml-auto flex items-center gap-2 lg:ml-0">
					<details class="header-search">
						<summary class="header-tool" aria-label="<?php esc_attr_e( 'Открыть поиск', 'wp-panda' ); ?>">
							<?php echo wpp_icon( 'search', 'h-[18px] w-[18px]' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						</summary>
						<form class="header-search__form" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
							<label class="screen-reader-text" for="wpp-header-search"><?php esc_html_e( 'Поиск товаров', 'wp-panda' ); ?></label>
							<input id="wpp-header-search" type="search" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="<?php esc_attr_e( 'Найти товар…', 'wp-panda' ); ?>">
							<?php if ( class_exists( 'WooCommerce' ) ) : ?>
								<input type="hidden" name="post_type" value="product">
							<?php endif; ?>
							<button type="submit" class="button button--dark"><?php esc_html_e( 'Найти', 'wp-panda' ); ?></button>
						</form>
					</details>

					<?php if ( function_exists( 'wc_get_page_permalink' ) ) : ?>
						<a class="header-account header-tool" href="<?php echo esc_url( wc_get_page_permalink( 'myaccount' ) ); ?>" aria-label="<?php esc_attr_e( 'Личный кабинет', 'wp-panda' ); ?>">
							<?php echo wpp_icon( 'user', 'h-[18px] w-[18px]' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							<span class="header-account__label"><?php echo is_user_logged_in() ? esc_html__( 'Кабинет', 'wp-panda' ) : esc_html__( 'Войти', 'wp-panda' ); ?></span>
						</a>

						<details class="header-cart">
							<summary class="header-tool header-cart__toggle" aria-label="<?php esc_attr_e( 'Открыть корзину', 'wp-panda' ); ?>">
								<?php echo wpp_icon( 'cart', 'h-[18px] w-[18px]' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
								<span class="wpp-cart-count" aria-label="<?php echo esc_attr( sprintf( __( 'Корзина, товаров: %s', 'wp-panda' ), number_format_i18n( wpp_get_cart_count() ) ) ); ?>"><?php echo esc_html( number_format_i18n( wpp_get_cart_count() ) ); ?></span>
							</summary>
							<div class="header-cart__panel">
								<div class="header-cart__panel-head">
									<strong><?php esc_html_e( 'Корзина', 'wp-panda' ); ?></strong>
									<a href="<?php echo esc_url( wc_get_cart_url() ); ?>"><?php esc_html_e( 'В корзину', 'wp-panda' ); ?></a>
								</div>
								<div class="widget_shopping_cart_content">
									<?php woocommerce_mini_cart(); ?>
								</div>
							</div>
						</details>
					<?php endif; ?>
				</div>
			</div>
		</header>
