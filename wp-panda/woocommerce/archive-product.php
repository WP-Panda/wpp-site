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

$current_term = is_product_taxonomy() ? get_queried_object() : null;
$is_themes    = $current_term && in_array( $current_term->slug, array( 'wordpress-themes', 'themes' ), true );
$is_plugins   = $current_term && in_array( $current_term->slug, array( 'wordpress-plugins', 'plugins' ), true );

/* Category tabs are generated from product_cat so new categories (e.g. HTML-шаблоны) appear automatically. */
$wpp_catalog_cats = wpp_catalog_categories();

$wpp_tab_active = function ( $term ) use ( $current_term ) {
	if ( ! $current_term ) {
		return false;
	}
	if ( (int) $current_term->term_id === (int) $term->term_id ) {
		return true;
	}
	return in_array( (int) $term->term_id, get_ancestors( (int) $current_term->term_id, 'product_cat' ), true );
};


$orderby = isset( $_GET['orderby'] ) ? sanitize_key( wp_unslash( $_GET['orderby'] ) ) : 'popular';

/* Tags are filtered through a multiselect dropdown. */
$wpp_all_tags = get_terms( array( 'taxonomy' => 'product_tag', 'hide_empty' => true ) );
if ( is_wp_error( $wpp_all_tags ) ) {
	$wpp_all_tags = array();
}
$wpp_selected_tags = array_map( 'sanitize_title', (array) get_query_var( 'product_tag' ) );
?>
<div class="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12 pb-32">
	<?php do_action( 'woocommerce_before_main_content' ); ?>
	<div class="fade-up mx-auto max-w-2xl text-center">
		<h1 class="text-4xl font-bold tracking-tight sm:text-[52px] sm:leading-[1.08]"><?php woocommerce_page_title(); ?></h1>
		<p class="mt-4 text-base text-muted sm:text-lg">
			<?php
			if ( $is_themes ) {
				esc_html_e( 'Темы WordPress на 1 или 5 сайтов', 'wp-panda' );
			} elseif ( $is_plugins ) {
				esc_html_e( 'Плагины с лицензией навсегда', 'wp-panda' );
			} elseif ( $current_term && ! empty( $current_term->description ) ) {
				echo esc_html( wp_strip_all_tags( $current_term->description ) );
			} elseif ( $current_term ) {
				echo esc_html( sprintf( __( 'Категория «%s»', 'wp-panda' ), $current_term->name ) );
			} else {
				esc_html_e( 'Темы на 1 сайт или 5 сайтов · Выберите количество при добавлении в корзину', 'wp-panda' );
			}
			?>
		</p>
	</div>
	<div class="no-scrollbar mt-8 flex max-w-full justify-center overflow-x-auto px-4">
		<div class="inline-flex flex-shrink-0 rounded-full border border-line bg-white p-1.5 shadow-card">
			<a class="flex flex-shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-5 font-semibold transition-all duration-200 h-10 text-sm <?php echo ( ! is_product_taxonomy() ) ? 'bg-ink text-white shadow-[0_6px_16px_-8px_rgba(20,20,28,0.6)]' : 'text-ink/65 hover:text-ink'; ?>" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Все', 'wp-panda' ); ?></a>
			<?php foreach ( $wpp_catalog_cats as $wpp_cat ) : ?>
				<a class="flex flex-shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-5 font-semibold transition-all duration-200 h-10 text-sm <?php echo $wpp_tab_active( $wpp_cat ) ? 'bg-ink text-white shadow-[0_6px_16px_-8px_rgba(20,20,28,0.6)]' : 'text-ink/65 hover:text-ink'; ?>" href="<?php echo esc_url( get_term_link( $wpp_cat ) ); ?>"><?php echo esc_html( wpp_catalog_tab_label( $wpp_cat ) ); ?></a>
			<?php endforeach; ?>
		</div>
	</div>
	<div class="mt-10 flex flex-col gap-3 lg:flex-row lg:items-center">
		<form role="search" method="get" action="<?php echo esc_url( $shop_url ); ?>" class="flex h-12 flex-1 items-center gap-2 rounded-full border border-line bg-white px-4 shadow-card transition focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
			<?php echo wpp_icon( 'search', 'h-4 w-4 text-muted' ); ?>
			<input type="search" name="s" placeholder="<?php esc_attr_e( 'Поиск по каталогу', 'wp-panda' ); ?>" class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70" value="<?php echo esc_attr( get_search_query() ); ?>">
			<input type="hidden" name="post_type" value="product">
		</form>
		<?php if ( $wpp_all_tags ) : ?>
		<div class="relative" data-tag-select>
			<button type="button" data-tag-toggle aria-haspopup="listbox" aria-expanded="false" class="inline-flex h-12 flex-shrink-0 items-center gap-2 rounded-full border border-line bg-white px-4 pr-9 text-sm font-semibold shadow-card transition hover:border-ink/20 <?php echo $wpp_selected_tags ? 'border-brand ring-2 ring-brand/20' : ''; ?>">
				<?php echo wpp_icon( 'sliders-horizontal', 'h-4 w-4 text-muted' ); ?>
				<?php echo $wpp_selected_tags ? esc_html( sprintf( __( 'Теги: %d', 'wp-panda' ), count( $wpp_selected_tags ) ) ) : esc_html__( 'Теги', 'wp-panda' ); ?>
			</button>
			<span class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"><?php echo wpp_icon( 'chevron-down', 'h-4 w-4' ); ?></span>
			<div class="absolute left-0 top-full z-30 mt-2 hidden w-72 rounded-2xl border border-line bg-white p-3 shadow-float" data-tag-panel>
				<form method="get" action="<?php echo esc_url( $shop_url ); ?>" data-tag-form>
					<input type="hidden" name="orderby" value="<?php echo esc_attr( $orderby ); ?>">
					<?php if ( $current_term ) : ?><input type="hidden" name="product_cat" value="<?php echo esc_attr( $current_term->slug ); ?>"><?php endif; ?>
					<div class="no-scrollbar max-h-64 overflow-y-auto">
						<?php foreach ( $wpp_all_tags as $wpp_tag ) : ?>
							<label class="flex cursor-pointer items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium text-ink/80 transition hover:bg-soft">
								<input type="checkbox" name="product_tag[]" value="<?php echo esc_attr( $wpp_tag->slug ); ?>" class="h-4 w-4 flex-shrink-0 accent-[#ffc21f]" <?php checked( in_array( $wpp_tag->slug, $wpp_selected_tags, true ) ); ?>>
								<span class="min-w-0 flex-1 truncate"><?php echo esc_html( $wpp_tag->name ); ?></span>
								<span class="text-[11px] text-muted"><?php echo esc_html( number_format_i18n( (int) $wpp_tag->count ) ); ?></span>
							</label>
						<?php endforeach; ?>
					</div>
					<?php if ( $wpp_selected_tags ) : ?>
						<a class="mt-2 block rounded-xl px-2.5 py-2 text-center text-xs font-semibold text-muted transition hover:bg-soft hover:text-ink" href="<?php echo esc_url( $current_term ? get_term_link( $current_term ) : $shop_url ); ?>"><?php esc_html_e( 'Сбросить теги', 'wp-panda' ); ?></a>
					<?php endif; ?>
				</form>
			</div>
		</div>
		<?php endif; ?>
		<form method="get" action="">
			<?php foreach ( $wpp_selected_tags as $wpp_sel_tag ) : ?>
				<input type="hidden" name="product_tag[]" value="<?php echo esc_attr( $wpp_sel_tag ); ?>">
			<?php endforeach; ?>
			<?php if ( $current_term ) : ?><input type="hidden" name="product_cat" value="<?php echo esc_attr( $current_term->slug ); ?>"><?php endif; ?>
			<div class="relative">
				<select name="orderby" onchange="this.form.submit()" class="wpp-select h-12 cursor-pointer rounded-full border border-line bg-white pl-4 pr-10 text-sm font-semibold shadow-card outline-none focus:border-brand">
					<option value="popular" <?php selected( $orderby, 'popular' ); ?>><?php esc_html_e( 'Сначала популярные', 'wp-panda' ); ?></option>
					<option value="rating" <?php selected( $orderby, 'rating' ); ?>><?php esc_html_e( 'По рейтингу', 'wp-panda' ); ?></option>
					<option value="price-asc" <?php selected( $orderby, 'price-asc' ); ?>><?php esc_html_e( 'Сначала дешевле', 'wp-panda' ); ?></option>
					<option value="price-desc" <?php selected( $orderby, 'price-desc' ); ?>><?php esc_html_e( 'Сначала дороже', 'wp-panda' ); ?></option>
				</select>
				<span class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"><?php echo wpp_icon( 'chevron-down', 'h-4 w-4' ); ?></span>
			</div>
		</form>
	</div>
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

		// List view: the layout's horizontal rows, toggled by theme.js.
		rewind_posts();
		echo '<div class="mt-5 hidden flex flex-col gap-4" data-catalog-list>';
		while ( have_posts() ) {
			the_post();
			get_template_part( 'template-parts/product/row' );
		}
		echo '</div>';

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
