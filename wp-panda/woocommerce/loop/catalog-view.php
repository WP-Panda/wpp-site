<?php
/** Grid/list links for the WooCommerce catalog loop. */
defined( 'ABSPATH' ) || exit;

$current_view = wpp_catalog_current_view();
?>
<div class="wpp-catalog-view" role="group" aria-label="<?php esc_attr_e( 'Вид каталога', 'wp-panda' ); ?>">
	<a class="wpp-catalog-view__button<?php echo 'list' === $current_view ? '' : ' is-active'; ?>" href="<?php echo esc_url( wpp_catalog_filter_url( $filter_base_url, null, 'grid' ) ); ?>" aria-label="<?php esc_attr_e( 'Плитка', 'wp-panda' ); ?>"<?php echo 'list' === $current_view ? '' : ' aria-current="true"'; ?>>
		<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><rect x="3" y="3" width="5" height="5" rx="1"/><rect x="12" y="3" width="5" height="5" rx="1"/><rect x="3" y="12" width="5" height="5" rx="1"/><rect x="12" y="12" width="5" height="5" rx="1"/></svg>
	</a>
	<a class="wpp-catalog-view__button<?php echo 'list' === $current_view ? ' is-active' : ''; ?>" href="<?php echo esc_url( wpp_catalog_filter_url( $filter_base_url, null, 'list' ) ); ?>" aria-label="<?php esc_attr_e( 'Список', 'wp-panda' ); ?>"<?php echo 'list' === $current_view ? ' aria-current="true"' : ''; ?>>
		<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M3 4h2v2H3zM7 4h10v2H7zM3 9h2v2H3zM7 9h10v2H7zM3 14h2v2H3zM7 14h10v2H7z"/></svg>
	</a>
</div>
