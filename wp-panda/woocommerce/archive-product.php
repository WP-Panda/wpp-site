<?php
/**
 * Product catalog page, markup identical to the supplied layout.
 *
 * @package WpPanda
 * @version 7.0.1
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' );

$shop_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );

$theme_term  = get_term_by( 'slug', 'wordpress-themes', 'product_cat' );
$plugin_term = get_term_by( 'slug', 'wordpress-plugins', 'product_cat' );
$themes_url  = $theme_term && ! is_wp_error( $theme_term ) ? get_term_link( $theme_term ) : add_query_arg( 'product_cat', 'wordpress-themes', $shop_url );
$plugins_url = $plugin_term && ! is_wp_error( $plugin_term ) ? get_term_link( $plugin_term ) : add_query_arg( 'product_cat', 'wordpress-plugins', $shop_url );

$current_term = is_product_taxonomy() ? get_queried_object() : null;
$is_themes    = $current_term && in_array( $current_term->slug, array( 'wordpress-themes', 'themes' ), true );
$is_plugins   = $current_term && in_array( $current_term->slug, array( 'wordpress-plugins', 'plugins' ), true );

$orderby = isset( $_GET['orderby'] ) ? sanitize_key( wp_unslash( $_GET['orderby'] ) ) : 'popular';

$all_tags = get_terms( array( 'taxonomy' => 'product_tag', 'hide_empty' => true ) );
$compat   = array( 'gutenberg', 'elementor', 'woocommerce', 'wpml' );
$compat_tags = array();
$scene_tags  = array();
if ( ! is_wp_error( $all_tags ) ) {
	foreach ( $all_tags as $wpp_tag ) {
		if ( in_array( $wpp_tag->slug, $compat, true ) ) {
			$compat_tags[] = $wpp_tag;
		} else {
			$scene_tags[] = $wpp_tag;
		}
	}
}
?>
<div class="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12 pb-32">
	<?php do_action( 'woocommerce_before_main_content' ); ?>
	<div class="fade-up mx-auto max-w-2xl text-center">
		<h1 class="text-4xl font-bold tracking-tight sm:text-[52px] sm:leading-[1.08]"><?php woocommerce_page_title(); ?></h1>
		<p class="mt-4 text-base text-muted sm:text-lg"><?php echo esc_html( $is_themes ? __( 'Темы WordPress на 1 или 5 сайтов', 'wp-panda' ) : ( $is_plugins ? __( 'Плагины с лицензией навсегда', 'wp-panda' ) : __( 'Темы на 1 сайт или 5 сайтов · Выберите количество при добавлении в корзину', 'wp-panda' ) ) ); ?></p>
	</div>
	<div class="mx-auto mt-8 max-w-[640px]">
		<div class="flex w-full rounded-full border border-line bg-white p-1.5 shadow-card">
			<a class="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 font-semibold transition-all duration-200 h-10 text-sm <?php echo ( ! is_product_taxonomy() ) ? 'bg-ink text-white shadow-[0_6px_16px_-8px_rgba(20,20,28,0.6)]' : 'text-ink/65 hover:text-ink'; ?>" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Все', 'wp-panda' ); ?></a>
			<a class="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 font-semibold transition-all duration-200 h-10 text-sm <?php echo $is_themes ? 'bg-ink text-white shadow-[0_6px_16px_-8px_rgba(20,20,28,0.6)]' : 'text-ink/65 hover:text-ink'; ?>" href="<?php echo esc_url( $themes_url ); ?>"><?php esc_html_e( 'Темы', 'wp-panda' ); ?></a>
			<a class="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 font-semibold transition-all duration-200 h-10 text-sm <?php echo $is_plugins ? 'bg-ink text-white shadow-[0_6px_16px_-8px_rgba(20,20,28,0.6)]' : 'text-ink/65 hover:text-ink'; ?>" href="<?php echo esc_url( $plugins_url ); ?>"><?php esc_html_e( 'Плагины', 'wp-panda' ); ?></a>
		</div>
	</div>
	<div class="mt-10 flex flex-col gap-3 lg:flex-row lg:items-center">
		<form role="search" method="get" action="<?php echo esc_url( $shop_url ); ?>" class="flex h-12 flex-1 items-center gap-2 rounded-full border border-line bg-white px-4 shadow-card transition focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
			<?php echo wpp_icon( 'search', 'h-4 w-4 text-muted' ); ?>
			<input type="search" name="s" placeholder="<?php esc_attr_e( 'Поиск по каталогу', 'wp-panda' ); ?>" class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70" value="<?php echo esc_attr( get_search_query() ); ?>">
			<input type="hidden" name="post_type" value="product">
		</form>
		<?php if ( $compat_tags ) : ?>
		<div class="no-scrollbar flex items-center gap-2 overflow-x-auto">
			<span class="flex flex-shrink-0 items-center gap-1.5 pr-1 text-xs font-semibold text-muted">
				<?php echo wpp_icon( 'sliders-horizontal', 'h-4 w-4' ); ?>
			</span>
			<?php foreach ( $compat_tags as $wpp_tag ) : ?>
				<a class="h-10 flex-shrink-0 rounded-full border px-4 text-[13px] font-semibold transition inline-flex items-center <?php echo is_product_tag( $wpp_tag->slug ) ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink/20'; ?>" href="<?php echo esc_url( get_term_link( $wpp_tag ) ); ?>"><?php echo esc_html( $wpp_tag->name ); ?></a>
			<?php endforeach; ?>
		</div>
		<?php endif; ?>
		<form method="get" action="">
			<?php if ( $current_term ) : ?><input type="hidden" name="product_cat" value="<?php echo esc_attr( $current_term->slug ); ?>"><?php endif; ?>
			<select name="orderby" onchange="this.form.submit()" class="h-12 cursor-pointer rounded-full border border-line bg-white px-4 text-sm font-semibold shadow-card outline-none focus:border-brand">
				<option value="popular" <?php selected( $orderby, 'popular' ); ?>><?php esc_html_e( 'Сначала популярные', 'wp-panda' ); ?></option>
				<option value="rating" <?php selected( $orderby, 'rating' ); ?>><?php esc_html_e( 'По рейтингу', 'wp-panda' ); ?></option>
				<option value="price-asc" <?php selected( $orderby, 'price-asc' ); ?>><?php esc_html_e( 'Сначала дешевле', 'wp-panda' ); ?></option>
				<option value="price-desc" <?php selected( $orderby, 'price-desc' ); ?>><?php esc_html_e( 'Сначала дороже', 'wp-panda' ); ?></option>
			</select>
		</form>
	</div>
	<?php if ( $scene_tags ) : ?>
	<div class="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
		<a class="h-9 flex-shrink-0 rounded-full px-4 text-[13px] font-semibold transition inline-flex items-center <?php echo ! is_product_tag() ? 'bg-ink text-white' : 'bg-soft text-ink/70 hover:text-ink'; ?>" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Все', 'wp-panda' ); ?></a>
		<?php foreach ( $scene_tags as $wpp_tag ) : ?>
			<a class="h-9 flex-shrink-0 rounded-full px-4 text-[13px] font-semibold transition inline-flex items-center <?php echo is_product_tag( $wpp_tag->slug ) ? 'bg-ink text-white' : 'bg-soft text-ink/70 hover:text-ink'; ?>" href="<?php echo esc_url( get_term_link( $wpp_tag ) ); ?>"><?php echo esc_html( $wpp_tag->name ); ?></a>
		<?php endforeach; ?>
	</div>
	<?php endif; ?>
	<div class="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
		<?php if ( woocommerce_product_loop() ) { woocommerce_result_count(); } ?>
		<div class="flex items-center gap-3">
			<div class="flex items-center rounded-full border border-line bg-white p-1 shadow-card" role="group" aria-label="<?php esc_attr_e( 'Вид каталога', 'wp-panda' ); ?>">
				<button aria-label="<?php esc_attr_e( 'Вид сеткой', 'wp-panda' ); ?>" aria-pressed="true" title="Grid" data-catalog-view="grid" class="flex h-9 w-10 items-center justify-center rounded-full transition-all bg-ink text-white">
					<?php echo wpp_icon( 'layout-grid', 'h-4 w-4' ); ?>
				</button>
				<button aria-label="<?php esc_attr_e( 'Вид списком', 'wp-panda' ); ?>" aria-pressed="false" title="List" data-catalog-view="list" class="flex h-9 w-10 items-center justify-center rounded-full transition-all text-muted hover:text-ink">
					<?php echo wpp_icon( 'list', 'h-4 w-4' ); ?>
				</button>
			</div>
		</div>
	</div>
	<?php
	if ( woocommerce_product_loop() ) {
		do_action( 'woocommerce_before_shop_loop' );
		woocommerce_product_loop_start();
		if ( wc_get_loop_prop( 'total' ) ) {
			while ( have_posts() ) {
				the_post();
				do_action( 'woocommerce_shop_loop' );
				wc_get_template_part( 'content', 'product' );
			}
		}
		woocommerce_product_loop_end();
		do_action( 'woocommerce_after_shop_loop' );
	} else {
		do_action( 'woocommerce_no_products_found' );
	}
	?>
	<?php do_action( 'woocommerce_after_main_content' ); ?>
</div>
<?php if ( function_exists( 'WC' ) && WC()->cart && ! WC()->cart->is_empty() ) : ?>
<div class="fade-in fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/90 backdrop-blur-xl">
	<div class="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
		<span class="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-ink sm:flex">
			<?php echo wpp_icon( 'shopping-bag', 'h-5 w-5' ); ?>
		</span>
		<div class="min-w-0 flex-1">
			<div class="text-[11px] text-muted sm:text-xs"><?php esc_html_e( 'В корзине', 'wp-panda' ); ?></div>
			<div class="truncate text-sm font-semibold sm:text-base">
				<?php
				$wpp_names = array();
				foreach ( WC()->cart->get_cart() as $wpp_ci ) {
					$wpp_names[] = $wpp_ci['data']->get_name();
				}
				echo esc_html( implode( ', ', $wpp_names ) );
				?>
				<span class="hidden text-sm font-normal text-muted md:inline">(<?php echo esc_html( sprintf( _n( '%s товар', '%s товара', WC()->cart->get_cart_contents_count(), 'wp-panda' ), number_format_i18n( WC()->cart->get_cart_contents_count() ) ) ); ?>)</span>
			</div>
		</div>
		<div class="hidden text-right sm:block">
			<div class="text-[11px] text-muted"><?php esc_html_e( 'Итого', 'wp-panda' ); ?></div>
			<div class="text-lg font-bold tabular-nums"><?php echo wpp_format_amount( WC()->cart->get_total( 'edit' ) ); ?></div>
		</div>
		<div class="flex gap-2">
			<button type="button" data-cart-open class="select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-white text-ink border border-line hover:border-ink/25 shadow-[0_1px_2px_rgba(20,20,28,0.05)] h-11 px-5 text-sm hidden md:inline-flex"><?php esc_html_e( 'Корзина', 'wp-panda' ); ?></button>
			<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-brand text-ink hover:bg-brand-600 shadow-glow h-11 px-5 text-sm" href="<?php echo esc_url( wc_get_checkout_url() ); ?>"><?php esc_html_e( 'Оформить', 'wp-panda' ); ?><?php echo wpp_icon( 'arrow-right', 'h-4 w-4' ); ?></a>
		</div>
	</div>
</div>
<?php endif; ?>
<?php
get_footer();
