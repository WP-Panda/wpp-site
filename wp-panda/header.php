<?php
/**
 * Шапка сайта.
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$is_checkout   = function_exists( 'is_checkout' ) && ( is_checkout() || is_cart() );
$cart_count    = wpp_has_woo() && WC()->cart ? (int) WC()->cart->get_cart_contents_count() : 0;
$primary_args  = array(
	'theme_location' => 'primary',
	'container'      => false,
	'items_wrap'     => '%3$s',
	'depth'          => 1,
	'fallback_cb'    => 'wpp_fallback_primary_menu',
	'echo'           => false,
);
$primary_html  = wp_nav_menu( $primary_args );
$latest_posts  = get_posts( array( 'numberposts' => 3 ) );
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'relative min-h-screen' ); ?>>
<?php wp_body_open(); ?>
<div aria-hidden="true" class="page-glow pointer-events-none absolute inset-x-0 top-0 h-[620px]"></div>
<div class="relative flex min-h-screen flex-col">

	<header class="sticky top-0 z-40 bg-white/85 shadow-[0_1px_0_rgba(20,20,28,0.06)] backdrop-blur-xl">
		<div class="mx-auto flex h-[76px] max-w-[1200px] items-center gap-3 px-4 sm:h-20 sm:px-6">

			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php esc_attr_e( 'На главную', 'wp-panda' ); ?>" class="flex-shrink-0">
				<span class="flex items-center gap-2.5">
					<span class="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-line">
						<?php if ( has_custom_logo() ) : ?>
							<?php
							$logo_id = get_theme_mod( 'custom_logo' );
							echo wp_get_attachment_image( $logo_id, 'full', false, array( 'class' => 'h-9 w-9 rounded-full object-contain' ) );
							?>
						<?php else : ?>
							<img src="<?php echo esc_url( WPP_URI . '/assets/img/panda.svg' ); ?>" alt="<?php bloginfo( 'name' ); ?>" class="h-9 w-9 object-contain" />
						<?php endif; ?>
					</span>
					<span class="flex flex-col leading-none">
						<span class="text-[19px] font-bold tracking-tight text-ink"><?php bloginfo( 'name' ); ?></span>
						<span class="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted"><?php echo esc_html( get_bloginfo( 'description' ) ? get_bloginfo( 'description' ) : 'WPP' ); ?></span>
					</span>
				</span>
			</a>

			<?php if ( ! $is_checkout ) : ?>
				<nav class="hidden items-center gap-1 rounded-full border border-line bg-white p-1.5 shadow-card lg:flex" aria-label="<?php esc_attr_e( 'Основное меню', 'wp-panda' ); ?>">
					<?php echo $primary_html; // phpcs:ignore ?>
				</nav>
			<?php endif; ?>

			<div class="ml-auto flex items-center gap-2 lg:ml-0">
				<?php if ( ! $is_checkout ) : ?>
					<!-- Поиск -->
					<div class="relative">
						<button type="button" aria-label="<?php esc_attr_e( 'Поиск', 'wp-panda' ); ?>" class="relative inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 hover:shadow-md">
							<?php wpp_icon( 'search', 'h-[18px] w-[18px]' ); ?>
						</button>
						<div data-panel="search" class="fade-up fixed left-4 right-4 top-[84px] z-20 rounded-card border border-line bg-white p-3 shadow-float sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-3 sm:w-[440px]">
							<form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" class="flex h-12 items-center gap-3 rounded-full bg-soft px-4">
								<?php wpp_icon( 'search', 'h-4 w-4 text-muted' ); ?>
								<input type="search" name="s" placeholder="<?php esc_attr_e( 'Тема, плагин или задача…', 'wp-panda' ); ?>" class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70" />
								<button type="submit" class="text-xs font-semibold text-muted transition hover:text-ink"><?php esc_html_e( 'Найти', 'wp-panda' ); ?></button>
							</form>
							<div class="px-2 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"><?php esc_html_e( 'Популярное', 'wp-panda' ); ?></div>
							<div class="max-h-[340px] overflow-y-auto">
								<?php foreach ( wpp_showcase_products( 'all', 4 ) as $d ) : ?>
									<a href="<?php echo esc_url( $d['link'] ); ?>" class="flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:bg-soft">
										<?php wpp_product_thumb( $d, 'h-11 w-11 rounded-xl' ); ?>
										<span class="min-w-0 flex-1">
											<span class="block text-sm font-semibold"><?php echo esc_html( $d['name'] ); ?></span>
											<span class="block truncate text-xs text-muted"><?php echo esc_html( $d['tagline'] ); ?></span>
										</span>
										<span class="text-sm font-bold tabular-nums"><?php echo wp_kses_post( $d['price_html'] ? $d['price_html'] : wpp_rub( $d['price'] ) ); ?></span>
									</a>
								<?php endforeach; ?>
							</div>
							<a href="<?php echo esc_url( wpp_has_woo() ? get_permalink( wc_get_page_id( 'shop' ) ) : home_url( '/' ) ); ?>" class="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-soft text-sm font-semibold transition hover:bg-brand">
								<?php esc_html_e( 'Весь каталог', 'wp-panda' ); ?> <?php wpp_icon( 'arrow-right', 'h-4 w-4' ); ?>
							</a>
						</div>
					</div>

					<!-- Уведомления: свежее в блоге -->
					<?php if ( $latest_posts ) : ?>
						<div class="relative hidden sm:block">
							<button type="button" aria-label="<?php esc_attr_e( 'Уведомления', 'wp-panda' ); ?>" class="relative inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 hover:shadow-md">
								<?php wpp_icon( 'bell', 'h-[18px] w-[18px]' ); ?>
								<span class="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
							</button>
							<div data-panel="bell" class="fade-up absolute right-0 top-full z-20 mt-3 w-80 rounded-2xl bg-ink p-2 text-white shadow-float">
								<div class="px-3 pb-2 pt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45"><?php esc_html_e( 'Новое в блоге', 'wp-panda' ); ?></div>
								<?php foreach ( $latest_posts as $i => $n ) : ?>
									<a href="<?php echo esc_url( get_permalink( $n ) ); ?>" class="<?php echo 0 === $i ? 'bg-brand text-ink' : 'hover:bg-white/5'; ?> flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition">
										<span class="min-w-0 flex-1">
											<span class="block text-sm font-semibold"><?php echo esc_html( get_the_title( $n ) ); ?></span>
											<span class="<?php echo 0 === $i ? 'text-ink/70' : 'text-white/50'; ?> block text-xs"><?php echo esc_html( get_the_date( 'j F', $n ) ); ?></span>
										</span>
										<span class="<?php echo 0 === $i ? 'text-ink/60' : 'text-white/40'; ?> text-[11px]"><?php echo esc_html( wpp_read_time( $n->ID ) ); ?></span>
									</a>
								<?php endforeach; ?>
							</div>
						</div>
					<?php endif; ?>
				<?php endif; ?>

				<?php if ( wpp_has_woo() && ! $is_checkout ) : ?>
					<button type="button" data-cart-open aria-label="<?php esc_attr_e( 'Открыть корзину', 'wp-panda' ); ?>" class="relative inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 hover:shadow-md">
						<?php wpp_icon( 'cart', 'h-[18px] w-[18px]' ); ?>
						<span class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-ink ring-2 ring-white wpp-cart-count" data-cart-count><?php echo esc_html( $cart_count ); ?></span>
					</button>
				<?php endif; ?>

				<?php if ( ! $is_checkout ) : ?>
					<a href="<?php echo esc_url( wpp_has_woo() ? get_permalink( wc_get_page_id( 'myaccount' ) ) : wp_login_url() ); ?>" class="hidden h-11 items-center gap-2 rounded-full border border-line bg-white px-1.5 shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 sm:flex xl:pr-4">
						<span class="flex h-8 w-8 items-center justify-center rounded-full bg-brand"><?php wpp_icon( 'user', 'h-4 w-4' ); ?></span>
						<span class="hidden text-sm font-semibold xl:block"><?php echo esc_html( wpp_has_woo() && is_user_logged_in() ? wp_get_current_user()->display_name : __( 'Кабинет', 'wp-panda' ) ); ?></span>
					</a>
				<?php endif; ?>

				<button type="button" aria-label="<?php esc_attr_e( 'Меню', 'wp-panda' ); ?>" class="relative inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 lg:hidden">
					<span class="js-icon-open hidden"><?php wpp_icon( 'x', 'h-[18px] w-[18px]' ); ?></span>
					<span class="js-icon-closed"><?php wpp_icon( 'menu', 'h-[18px] w-[18px]' ); ?></span>
				</button>
			</div>
		</div>

		<!-- Мобильное меню -->
		<div data-panel="menu" class="fade-in border-t border-line bg-white px-4 pb-5 pt-3 shadow-float lg:hidden">
			<div class="mx-auto grid max-w-[1200px] gap-1.5">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="flex h-12 items-center gap-3 rounded-full pl-1.5 pr-4 text-left text-[15px] font-semibold hover:bg-soft">
					<span class="flex h-9 w-9 items-center justify-center rounded-full bg-soft"><?php wpp_icon( 'house', 'h-4 w-4' ); ?></span>
					<?php esc_html_e( 'Главная', 'wp-panda' ); ?>
				</a>
				<?php
				wp_nav_menu( array(
					'theme_location' => 'primary',
					'container'      => false,
					'items_wrap'     => '%3$s',
					'depth'          => 1,
					'fallback_cb'    => 'wpp_fallback_primary_menu',
					'walker'         => new WPP_Mobile_Menu_Walker(),
				) );
				?>
			</div>
		</div>
	</header>

	<?php if ( wpp_has_woo() ) : ?>
	<!-- Шторка корзины -->
	<div data-panel="cart-overlay" class="fixed inset-0 z-50 bg-ink/35 backdrop-blur-[3px] transition-opacity duration-300 opacity-0 pointer-events-none"></div>
	<aside role="dialog" aria-label="<?php esc_attr_e( 'Корзина', 'wp-panda' ); ?>" data-panel="cart" class="fixed inset-y-0 right-0 z-50 flex w-full max-w-[460px] flex-col bg-white shadow-[-30px_0_80px_-30px_rgba(20,20,28,0.45)] sm:inset-y-3 sm:right-3 sm:rounded-[28px]" style="transform:translateX(110%);transition:transform .5s cubic-bezier(0.22,1,0.36,1)">
		<div class="wpp-cart-drawer-contents" data-cart-fragment>
			<?php wpp_cart_drawer_inner(); ?>
		</div>
	</aside>
	<?php endif; ?>

	<main class="fade-in flex-1">
<?php
/**
 * Мобильный пункт меню.
 */
class WPP_Mobile_Menu_Walker extends Walker_Nav_Menu {
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$active = in_array( 'current-menu-item', (array) $item->classes, true );
		$output .= '<a href="' . esc_url( $item->url ) . '" class="' . ( $active ? 'bg-ink text-white' : 'hover:bg-soft' ) . ' flex h-12 items-center gap-3 rounded-full pl-1.5 pr-4 text-left text-[15px] font-semibold">';
		$output .= '<span class="' . ( $active ? 'bg-brand text-ink' : 'bg-soft' ) . ' flex h-9 w-9 items-center justify-center rounded-full">' . wpp_icon( 'chevron-right', 'h-4 w-4' ) . '</span>';
		$output .= esc_html( $item->title ) . '</a>';
	}
	public function end_el( &$output, $item, $depth = 0, $args = null ) {}
}

/**
 * Меню шапки по умолчанию (пока не задано своё).
 */
function wpp_fallback_primary_menu() {
	$kb  = get_post_type_archive_link( 'kb_article' );
	$faq = wpp_faq_page_url();
	$items = array(
		array( wpp_has_woo() ? get_permalink( wc_get_page_id( 'shop' ) ) : home_url( '/' ), __( 'Каталог', 'wp-panda' ), 'grid' ),
		array( home_url( '/' ), __( 'Блог', 'wp-panda' ), 'newspaper' ),
		array( $kb ? $kb : home_url( '/' ), __( 'База знаний', 'wp-panda' ), 'book-open' ),
		array( $faq ? $faq : home_url( '/' ), __( 'FAQ', 'wp-panda' ), 'help' ),
	);
	ob_start();
	foreach ( $items as $it ) {
		?>
		<button type="button" data-goto="<?php echo esc_url( $it[0] ); ?>" class="flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-ink/70 transition hover:bg-soft hover:text-ink">
			<?php wpp_icon( $it[2], 'h-4 w-4' ); ?><?php echo esc_html( $it[1] ); ?>
		</button>
		<?php
	}
	echo ob_get_clean(); // phpcs:ignore
}

/** URL страницы FAQ (шаблон «FAQ») или ''. */
function wpp_faq_page_url() {
	$pages = get_pages( array( 'meta_key' => '_wp_page_template', 'meta_value' => 'page-templates/faq.php', 'number' => 1 ) );
	return $pages ? get_permalink( $pages[0]->ID ) : '';
}

/** URL страницы поддержки (шаблон «Поддержка») или ''. */
function wpp_support_page_url() {
	$pages = get_pages( array( 'meta_key' => '_wp_page_template', 'meta_value' => 'page-templates/support.php', 'number' => 1 ) );
	return $pages ? get_permalink( $pages[0]->ID ) : '';
}
