<?php
/** Shared WooCommerce product wishlist control; saved items are scoped to the signed-in customer. */
defined( 'ABSPATH' ) || exit;

$product_id = ! empty( $args['product_id'] ) ? absint( $args['product_id'] ) : 0;
if ( ! $product_id ) {
	return;
}
$product_url = get_permalink( $product_id );
if ( ! is_user_logged_in() ) :
	$account_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'myaccount' ) : wp_login_url( $product_url );
	?>
	<a class="wpp-wishlist-link" href="<?php echo esc_url( $account_url ); ?>" aria-label="<?php esc_attr_e( 'Войдите, чтобы сохранить товар в избранное', 'wp-panda' ); ?>">
		<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>
		<span><?php esc_html_e( 'В избранное', 'wp-panda' ); ?></span>
	</a>
	<?php
	return;
endif;

$user_ids = get_user_meta( get_current_user_id(), 'wpp_wishlist_product_ids', true );
$user_ids = is_array( $user_ids ) ? array_map( 'absint', $user_ids ) : array();
$is_saved = in_array( $product_id, $user_ids, true );
?>
<form class="wpp-wishlist-form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
	<input type="hidden" name="action" value="wpp_toggle_wishlist">
	<input type="hidden" name="product_id" value="<?php echo esc_attr( $product_id ); ?>">
	<?php wp_nonce_field( 'wpp_toggle_wishlist_' . $product_id ); ?>
	<button class="wpp-wishlist-link<?php echo $is_saved ? ' is-saved' : ''; ?>" type="submit" aria-pressed="<?php echo $is_saved ? 'true' : 'false'; ?>">
		<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>
		<span><?php echo $is_saved ? esc_html__( 'Убрать из избранного', 'wp-panda' ) : esc_html__( 'В избранное', 'wp-panda' ); ?></span>
	</button>
</form>
