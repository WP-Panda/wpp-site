<?php
/** WooCommerce product-search and product-tag filters for the catalog archive. */
defined( 'ABSPATH' ) || exit;

$active_tag         = wpp_catalog_active_tag();
$filter_base_url    = wpp_catalog_filter_base_url();
$compatibility_tags = wpp_catalog_compatibility_tags();
$topic_tags         = wpp_catalog_topic_tags();
?>
<section class="wpp-catalog-controls" aria-label="<?php esc_attr_e( 'Поиск и фильтры каталога', 'wp-panda' ); ?>">
	<div class="wpp-catalog-controls__top">
		<div class="wpp-catalog-search">
			<?php get_product_search_form(); ?>
		</div>

		<div class="wpp-catalog-filter-tools">
			<?php if ( $compatibility_tags ) : ?>
				<div class="wpp-catalog-compatibility" role="group" aria-label="<?php esc_attr_e( 'Фильтр по совместимости', 'wp-panda' ); ?>">
					<span class="wpp-catalog-controls__label"><?php esc_html_e( 'Совместимость:', 'wp-panda' ); ?></span>
					<div class="wpp-catalog-chips">
						<?php foreach ( $compatibility_tags as $tag ) : ?>
							<?php $is_current = $active_tag && (int) $active_tag->term_id === (int) $tag->term_id; ?>
							<a class="wpp-catalog-chip<?php echo $is_current ? ' is-active' : ''; ?>" href="<?php echo esc_url( wpp_catalog_filter_url( $filter_base_url, $is_current ? '' : $tag->slug ) ); ?>"<?php echo $is_current ? ' aria-current="true"' : ''; ?>><?php echo esc_html( $tag->name ); ?></a>
						<?php endforeach; ?>
					</div>
				</div>
			<?php endif; ?>
			<?php do_action( 'wpp_catalog_ordering_control' ); ?>
		</div>
	</div>

	<div class="wpp-catalog-topics" role="group" aria-label="<?php esc_attr_e( 'Фильтр по назначению', 'wp-panda' ); ?>">
		<span class="wpp-catalog-controls__label"><?php esc_html_e( 'Категории:', 'wp-panda' ); ?></span>
		<div class="wpp-catalog-chips wpp-catalog-chips--topics">
			<a class="wpp-catalog-chip<?php echo $active_tag ? '' : ' is-active'; ?>" href="<?php echo esc_url( wpp_catalog_filter_url( $filter_base_url, '' ) ); ?>"<?php echo $active_tag ? '' : ' aria-current="true"'; ?>><?php esc_html_e( 'Все', 'wp-panda' ); ?></a>
			<?php foreach ( $topic_tags as $tag ) : ?>
				<?php $is_current = $active_tag && (int) $active_tag->term_id === (int) $tag->term_id; ?>
				<a class="wpp-catalog-chip<?php echo $is_current ? ' is-active' : ''; ?>" href="<?php echo esc_url( wpp_catalog_filter_url( $filter_base_url, $is_current ? '' : $tag->slug ) ); ?>"<?php echo $is_current ? ' aria-current="true"' : ''; ?>><?php echo esc_html( $tag->name ); ?></a>
			<?php endforeach; ?>
		</div>
	</div>
</section>
