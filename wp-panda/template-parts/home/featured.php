<?php
/** Curated, live WooCommerce products with working category tabs. */
defined( 'ABSPATH' ) || exit;
$filter = isset( $_GET['wpp_home_filter'] ) && is_string( $_GET['wpp_home_filter'] ) ? sanitize_key( wp_unslash( $_GET['wpp_home_filter'] ) ) : 'all'; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
if ( ! in_array( $filter, array( 'all', 'themes', 'plugins' ), true ) ) {
	$filter = 'all';
}
$category_slug = 'themes' === $filter ? 'wordpress-themes' : ( 'plugins' === $filter ? 'wordpress-plugins' : '' );
$product_query = wpp_featured_products_query( $category_slug, 8 );
$shop_url      = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
$tabs          = array( 'all' => __( 'Все', 'wp-panda' ), 'themes' => __( 'Темы', 'wp-panda' ), 'plugins' => __( 'Плагины', 'wp-panda' ) );
?>
<section class="home-section home-featured mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-20">
	<header class="section-heading"><div><p class="eyebrow"><?php esc_html_e( 'Подборка Wp Panda', 'wp-panda' ); ?></p><h2><?php esc_html_e( 'Популярное на этой неделе', 'wp-panda' ); ?></h2><p><?php esc_html_e( 'Темы на 1 или 5 сайтов · Плагины навсегда', 'wp-panda' ); ?></p></div><a class="text-link" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Весь каталог', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a></header>
	<nav class="wpp-home-tabs" aria-label="<?php esc_attr_e( 'Фильтр популярных товаров', 'wp-panda' ); ?>">
		<?php foreach ( $tabs as $key => $label ) : ?>
			<?php $url = 'all' === $key ? remove_query_arg( 'wpp_home_filter', home_url( '/' ) ) : add_query_arg( 'wpp_home_filter', $key, home_url( '/' ) ); ?>
			<a class="wpp-home-tabs__link<?php echo $filter === $key ? ' is-active' : ''; ?>" href="<?php echo esc_url( $url ); ?>"<?php echo $filter === $key ? ' aria-current="page"' : ''; ?>><?php echo esc_html( $label ); ?></a>
		<?php endforeach; ?>
	</nav>
	<?php if ( $product_query && $product_query->have_posts() ) : ?>
		<?php wpp_render_product_cards( $product_query, 4 ); ?>
	<?php else : ?>
		<div class="empty-state"><h3><?php esc_html_e( 'Каталог готов к наполнению', 'wp-panda' ); ?></h3><p><?php esc_html_e( 'Публичные товары WooCommerce появятся здесь после добавления или импорта демо-контента.', 'wp-panda' ); ?></p><?php if ( current_user_can( 'manage_options' ) ) : ?><a class="button button--brand" href="<?php echo esc_url( admin_url( 'tools.php?page=wpp-demo-content' ) ); ?>"><?php esc_html_e( 'Открыть импорт демо-контента', 'wp-panda' ); ?></a><?php endif; ?></div>
	<?php endif; ?>
</section>
