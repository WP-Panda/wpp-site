<?php
/** Customer-scoped wishlist rendered through the normal WooCommerce loop cards. */
defined( 'ABSPATH' ) || exit;

$user_id = get_current_user_id();
$product_ids = get_user_meta( $user_id, 'wpp_wishlist_product_ids', true );
$product_ids = is_array( $product_ids ) ? array_values( array_unique( array_filter( array_map( 'absint', $product_ids ) ) ) ) : array();
$action_notice = isset( $_GET['wishlist_action'] ) && is_string( $_GET['wishlist_action'] ) ? sanitize_key( wp_unslash( $_GET['wishlist_action'] ) ) : '';
?>
<section class="wpp-account-section" aria-labelledby="wpp-wishlist-heading">
	<header class="wpp-account-section__heading">
		<div><p class="eyebrow"><?php esc_html_e( 'Сохранённые продукты', 'wp-panda' ); ?></p><h2 id="wpp-wishlist-heading"><?php esc_html_e( 'Избранное', 'wp-panda' ); ?></h2></div>
		<a class="button button--light" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>"><?php esc_html_e( 'Продолжить покупки', 'wp-panda' ); ?></a>
	</header>
	<?php if ( 'added' === $action_notice ) : ?><div class="woocommerce-message" role="status"><?php esc_html_e( 'Товар сохранён в избранном.', 'wp-panda' ); ?></div><?php elseif ( 'removed' === $action_notice ) : ?><div class="woocommerce-info" role="status"><?php esc_html_e( 'Товар удалён из избранного.', 'wp-panda' ); ?></div><?php endif; ?>
	<p class="wpp-demo-notice"><strong><?php esc_html_e( 'Ваш список сохранён в аккаунте.', 'wp-panda' ); ?></strong> <?php esc_html_e( 'Избранное доступно только после входа и не создаёт заказ или лицензию.', 'wp-panda' ); ?></p>
	<?php
	if ( $product_ids ) {
		$query = new WP_Query( array(
			'post_type'           => 'product',
			'post_status'         => 'publish',
			'posts_per_page'      => -1,
			'post__in'            => $product_ids,
			'orderby'             => 'post__in',
			'ignore_sticky_posts' => true,
			'no_found_rows'       => true,
		) );
		if ( $query->have_posts() ) {
			wpp_render_product_cards( $query, 3 );
		} else {
			$product_ids = array();
		}
	}
	?>
	<?php if ( ! $product_ids ) : ?>
		<div class="empty-state"><h3><?php esc_html_e( 'Список пока пуст', 'wp-panda' ); ?></h3><p><?php esc_html_e( 'Сохраняйте интересные товары кнопкой «В избранное» в каталоге.', 'wp-panda' ); ?></p><a class="button button--brand" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>"><?php esc_html_e( 'Открыть каталог', 'wp-panda' ); ?></a></div>
	<?php endif; ?>
</section>
