<?php
/** Accessible top-level tabs backed by WooCommerce's filtered product tabs. */
defined( 'ABSPATH' ) || exit;

$product_tabs = apply_filters( 'woocommerce_product_tabs', array() );
if ( empty( $product_tabs ) ) {
	return;
}

$labels = array(
	'description'          => __( 'Описание', 'wp-panda' ),
	'reviews'              => __( 'Отзывы', 'wp-panda' ),
	'wpp_comments'         => __( 'Комментарии', 'wp-panda' ),
	'wpp_version_history'  => __( 'История версий', 'wp-panda' ),
);
$first_tab = isset( $product_tabs['description'] ) ? 'description' : (string) key( $product_tabs );
$account_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'myaccount' ) : '';
$support_url = $account_url && function_exists( 'wc_get_endpoint_url' ) ? wc_get_endpoint_url( 'support', 'new', $account_url ) : '';
?>
<nav class="wpp-product-tabs-nav" aria-label="<?php esc_attr_e( 'Информация о товаре', 'wp-panda' ); ?>" data-wpp-product-tabs>
	<div class="wpp-product-tabs-nav__items" role="tablist">
		<?php foreach ( $product_tabs as $key => $tab ) : ?>
			<?php
			$label = isset( $labels[ $key ] ) ? $labels[ $key ] : wp_strip_all_tags( $tab['title'] );
			$count = 0;
			if ( isset( $GLOBALS['product'] ) && $GLOBALS['product'] instanceof WC_Product ) {
				if ( 'reviews' === $key ) {
					$count = (int) $GLOBALS['product']->get_review_count();
				} elseif ( 'wpp_comments' === $key && function_exists( 'wpp_get_product_discussion_comments' ) ) {
					$count = count( wpp_get_product_discussion_comments( $GLOBALS['product'] ) );
				}
			}
			?>
			<a class="wpp-product-tabs-nav__tab<?php echo $key === $first_tab ? ' is-active' : ''; ?>" href="#tab-<?php echo esc_attr( $key ); ?>" role="tab" aria-controls="tab-<?php echo esc_attr( $key ); ?>" aria-selected="<?php echo $key === $first_tab ? 'true' : 'false'; ?>" tabindex="<?php echo $key === $first_tab ? '0' : '-1'; ?>" data-wpp-product-tab="<?php echo esc_attr( $key ); ?>">
				<span><?php echo esc_html( $label ); ?></span>
				<?php if ( $count > 0 ) : ?><span class="wpp-product-tabs-nav__count"><?php echo esc_html( number_format_i18n( $count ) ); ?></span><?php endif; ?>
			</a>
		<?php endforeach; ?>
	</div>

	<?php if ( $support_url ) : ?>
		<a class="wpp-product-tabs-nav__support" href="<?php echo esc_url( $support_url ); ?>">
			<?php echo wpp_icon( 'user', 'h-3.5 w-3.5' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php esc_html_e( 'Поддержка в кабинете', 'wp-panda' ); ?>
			<?php echo wpp_icon( 'arrow', 'h-3 w-3' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</a>
	<?php endif; ?>
</nav>
