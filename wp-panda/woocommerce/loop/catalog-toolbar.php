<?php
/** Native WooCommerce result/sort controls with a theme catalog view selector. */
defined( 'ABSPATH' ) || exit;
?>
<div class="shop-toolbar wpp-catalog-results" aria-label="<?php esc_attr_e( 'Результаты и сортировка каталога', 'wp-panda' ); ?>">
	<div class="wpp-catalog-results__native">
		<?php do_action( 'woocommerce_before_shop_loop' ); ?>
	</div>
	<?php wc_get_template( 'loop/catalog-view.php', array( 'filter_base_url' => wpp_catalog_filter_base_url() ) ); ?>
</div>
