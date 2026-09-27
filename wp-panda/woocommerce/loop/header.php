<?php
/**
 * Product archive header using WooCommerce's native archive-description hooks.
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 8.6.0
 */
defined( 'ABSPATH' ) || exit;
?>
<header class="woocommerce-products-header shop-page__heading wpp-catalog-heading">
	<?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?>
		<h1 class="woocommerce-products-header__title page-title"><?php woocommerce_page_title(); ?></h1>
	<?php endif; ?>

	<?php do_action( 'woocommerce_archive_description' ); ?>

	<?php if ( is_search() ) : ?>
		<p class="shop-page__lead">
			<?php printf( esc_html__( 'Результаты поиска по запросу «%s».', 'wp-panda' ), esc_html( get_search_query() ) ); ?>
		</p>
	<?php elseif ( is_shop() ) : ?>
		<?php
		$shop_page = get_post( wc_get_page_id( 'shop' ) );
		$has_shop_description = $shop_page && '' !== trim( wp_strip_all_tags( $shop_page->post_content ) );
		if ( ! $has_shop_description ) :
			?>
			<p class="shop-page__lead"><?php esc_html_e( 'Темы на 1 сайт или 5 сайтов · Выберите количество при добавлении в корзину', 'wp-panda' ); ?></p>
		<?php endif; ?>
	<?php endif; ?>
</header>
