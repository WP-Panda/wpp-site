<?php
/** Product archive / shop template.
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 8.6.0
 */
defined( 'ABSPATH' ) || exit;

get_header( 'shop' );

do_action( 'woocommerce_before_main_content' );

$shop_url = wc_get_page_permalink( 'shop' );
if ( ! $shop_url ) {
	$shop_url = home_url( '/shop/' );
}
$shop_url       = remove_query_arg( array( 'wpp_tag', 'wpp_view', 'paged', 'product-page' ), $shop_url );
$product_counts = wp_count_posts( 'product' );
$all_count      = $product_counts && isset( $product_counts->publish ) ? (int) $product_counts->publish : 0;
$theme_term     = get_term_by( 'slug', 'wordpress-themes', 'product_cat' );
$plugin_term    = get_term_by( 'slug', 'wordpress-plugins', 'product_cat' );
$active_tag = function_exists( 'wpp_catalog_active_tag' ) ? wpp_catalog_active_tag() : false;
$search_type = is_search() ? get_query_var( 'post_type' ) : '';
$is_product_search = 'product' === $search_type || ( is_array( $search_type ) && in_array( 'product', $search_type, true ) );
$current_tab = is_shop() || $is_product_search ? 'all' : '';

if ( is_product_category() ) {
	$queried_category = get_queried_object();
	if ( $theme_term && ! is_wp_error( $theme_term ) && $queried_category->term_id === $theme_term->term_id ) {
		$current_tab = 'themes';
	} elseif ( $plugin_term && ! is_wp_error( $plugin_term ) && $queried_category->term_id === $plugin_term->term_id ) {
		$current_tab = 'plugins';
	}
}

$theme_url = $theme_term && ! is_wp_error( $theme_term ) ? get_term_link( $theme_term ) : $shop_url;
$plugin_url = $plugin_term && ! is_wp_error( $plugin_term ) ? get_term_link( $plugin_term ) : $shop_url;
if ( is_wp_error( $theme_url ) ) {
	$theme_url = $shop_url;
}
if ( is_wp_error( $plugin_url ) ) {
	$plugin_url = $shop_url;
}

$catalog_tabs = array(
	'all' => array(
		'label' => __( 'Все', 'wp-panda' ),
		'count' => $all_count,
		'url'   => wpp_catalog_filter_url( $shop_url, '' ),
	),
	'themes' => array(
		'label' => __( 'Темы', 'wp-panda' ),
		'count' => $theme_term && ! is_wp_error( $theme_term ) ? (int) $theme_term->count : 0,
		'url'   => wpp_catalog_filter_url( $theme_url, null ),
	),
	'plugins' => array(
		'label' => __( 'Плагины', 'wp-panda' ),
		'count' => $plugin_term && ! is_wp_error( $plugin_term ) ? (int) $plugin_term->count : 0,
		'url'   => wpp_catalog_filter_url( $plugin_url, null ),
	),
);

$compatibility_tags = function_exists( 'wpp_catalog_compatibility_tags' ) ? wpp_catalog_compatibility_tags() : array();
$topic_tags         = function_exists( 'wpp_catalog_topic_tags' ) ? wpp_catalog_topic_tags() : array();
$filter_base_url    = remove_query_arg( array( 'wpp_tag', 'wpp_view', 'paged', 'product-page' ), get_pagenum_link( 1 ) );
$current_view       = isset( $_GET['wpp_view'] ) && is_string( $_GET['wpp_view'] ) ? sanitize_key( wp_unslash( $_GET['wpp_view'] ) ) : 'grid'; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
?>
<div class="shop-page wpp-catalog mx-auto w-full max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 lg:pb-20">
	<?php
	// WooCommerce's native archive header template provides the title and archive description.
	do_action( 'woocommerce_shop_loop_header' );
	?>

	<nav class="wpp-catalog-tabs" aria-label="<?php esc_attr_e( 'Разделы каталога', 'wp-panda' ); ?>">
		<?php foreach ( $catalog_tabs as $tab_key => $tab ) : ?>
			<a class="wpp-catalog-tabs__link<?php echo $current_tab === $tab_key ? ' is-active' : ''; ?>" href="<?php echo esc_url( $tab['url'] ); ?>"<?php echo $current_tab === $tab_key ? ' aria-current="page"' : ''; ?>>
				<span><?php echo esc_html( $tab['label'] ); ?></span>
				<span class="wpp-catalog-tabs__count"><?php echo esc_html( number_format_i18n( $tab['count'] ) ); ?></span>
			</a>
		<?php endforeach; ?>
	</nav>

	<section class="wpp-catalog-controls" aria-label="<?php esc_attr_e( 'Поиск и фильтры каталога', 'wp-panda' ); ?>">
		<div class="wpp-catalog-controls__top">
			<div class="wpp-catalog-search">
				<?php get_product_search_form(); ?>
			</div>

			<?php if ( $compatibility_tags ) : ?>
				<div class="wpp-catalog-compatibility" role="group" aria-label="<?php esc_attr_e( 'Фильтр по совместимости', 'wp-panda' ); ?>">
					<span class="wpp-catalog-controls__label"><?php esc_html_e( 'Совместимость:', 'wp-panda' ); ?></span>
					<div class="wpp-catalog-chips">
						<?php foreach ( $compatibility_tags as $tag ) : ?>
							<?php $tag_is_active = $active_tag && (int) $active_tag->term_id === (int) $tag->term_id; ?>
							<a class="wpp-catalog-chip<?php echo $tag_is_active ? ' is-active' : ''; ?>" href="<?php echo esc_url( wpp_catalog_filter_url( $filter_base_url, $tag_is_active ? '' : $tag->slug ) ); ?>"<?php echo $tag_is_active ? ' aria-current="true"' : ''; ?>><?php echo esc_html( $tag->name ); ?></a>
						<?php endforeach; ?>
					</div>
				</div>
			<?php endif; ?>
		</div>

		<div class="wpp-catalog-topics" role="group" aria-label="<?php esc_attr_e( 'Фильтр по назначению', 'wp-panda' ); ?>">
			<span class="wpp-catalog-controls__label"><?php esc_html_e( 'Категории:', 'wp-panda' ); ?></span>
			<div class="wpp-catalog-chips wpp-catalog-chips--topics">
				<a class="wpp-catalog-chip<?php echo $active_tag ? '' : ' is-active'; ?>" href="<?php echo esc_url( wpp_catalog_filter_url( $filter_base_url, '' ) ); ?>"<?php echo $active_tag ? '' : ' aria-current="true"'; ?>><?php esc_html_e( 'Все', 'wp-panda' ); ?></a>
				<?php foreach ( $topic_tags as $tag ) : ?>
					<?php $tag_is_active = $active_tag && (int) $active_tag->term_id === (int) $tag->term_id; ?>
					<a class="wpp-catalog-chip<?php echo $tag_is_active ? ' is-active' : ''; ?>" href="<?php echo esc_url( wpp_catalog_filter_url( $filter_base_url, $tag_is_active ? '' : $tag->slug ) ); ?>"<?php echo $tag_is_active ? ' aria-current="true"' : ''; ?>><?php echo esc_html( $tag->name ); ?></a>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<?php if ( woocommerce_product_loop() ) : ?>
		<div class="shop-toolbar wpp-catalog-results" aria-label="<?php esc_attr_e( 'Результаты и сортировка каталога', 'wp-panda' ); ?>">
			<div class="wpp-catalog-results__native">
				<?php do_action( 'woocommerce_before_shop_loop' ); ?>
			</div>
			<div class="wpp-catalog-view" role="group" aria-label="<?php esc_attr_e( 'Вид каталога', 'wp-panda' ); ?>">
				<a class="wpp-catalog-view__button<?php echo 'list' === $current_view ? '' : ' is-active'; ?>" href="<?php echo esc_url( wpp_catalog_filter_url( $filter_base_url, null, 'grid' ) ); ?>" aria-label="<?php esc_attr_e( 'Плитка', 'wp-panda' ); ?>"<?php echo 'list' === $current_view ? '' : ' aria-current="true"'; ?>>
					<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><rect x="3" y="3" width="5" height="5" rx="1"/><rect x="12" y="3" width="5" height="5" rx="1"/><rect x="3" y="12" width="5" height="5" rx="1"/><rect x="12" y="12" width="5" height="5" rx="1"/></svg>
				</a>
				<a class="wpp-catalog-view__button<?php echo 'list' === $current_view ? ' is-active' : ''; ?>" href="<?php echo esc_url( wpp_catalog_filter_url( $filter_base_url, null, 'list' ) ); ?>" aria-label="<?php esc_attr_e( 'Список', 'wp-panda' ); ?>"<?php echo 'list' === $current_view ? ' aria-current="true"' : ''; ?>>
					<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M3 4h2v2H3zM7 4h10v2H7zM3 9h2v2H3zM7 9h10v2H7zM3 14h2v2H3zM7 14h10v2H7z"/></svg>
				</a>
			</div>
		</div>

		<?php woocommerce_product_loop_start(); ?>
		<?php if ( wc_get_loop_prop( 'total' ) ) : ?>
			<?php while ( have_posts() ) : ?>
				<?php the_post(); ?>
				<?php do_action( 'woocommerce_shop_loop' ); ?>
				<?php wc_get_template_part( 'content', 'product' ); ?>
			<?php endwhile; ?>
		<?php endif; ?>
		<?php woocommerce_product_loop_end(); ?>
		<?php do_action( 'woocommerce_after_shop_loop' ); ?>
	<?php else : ?>
		<?php do_action( 'woocommerce_no_products_found' ); ?>
	<?php endif; ?>
</div>
<?php
do_action( 'woocommerce_after_main_content' );
do_action( 'woocommerce_sidebar' );
get_footer( 'shop' );
