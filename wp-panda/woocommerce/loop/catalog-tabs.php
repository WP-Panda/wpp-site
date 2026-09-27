<?php
/** WooCommerce product-category tabs for the catalog archive. */
defined( 'ABSPATH' ) || exit;

$tabs        = wpp_catalog_tabs();
$current_tab = wpp_catalog_current_tab();
?>
<nav class="wpp-catalog-tabs" aria-label="<?php esc_attr_e( 'Разделы каталога', 'wp-panda' ); ?>">
	<?php foreach ( $tabs as $tab_key => $tab ) : ?>
		<?php $is_current = $current_tab === $tab_key; ?>
		<a class="wpp-catalog-tabs__link<?php echo $is_current ? ' is-active' : ''; ?>" href="<?php echo esc_url( $tab['url'] ); ?>"<?php echo $is_current ? ' aria-current="page"' : ''; ?>>
			<span><?php echo esc_html( $tab['label'] ); ?></span>
			<span class="wpp-catalog-tabs__count"><?php echo esc_html( number_format_i18n( $tab['count'] ) ); ?></span>
		</a>
	<?php endforeach; ?>
</nav>
