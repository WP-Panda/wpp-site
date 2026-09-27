<?php
/** Product title, seller metadata and the native WooCommerce breadcrumb. */
defined( 'ABSPATH' ) || exit;

global $product;
if ( ! $product instanceof WC_Product ) {
	return;
}

$review_count = (int) $product->get_review_count();
$sales_count  = (int) $product->get_total_sales();
$version      = $product->get_attribute( 'Версия' );
?>
<div class="wpp-product-intro">
	<?php if ( function_exists( 'woocommerce_breadcrumb' ) ) : ?>
		<?php woocommerce_breadcrumb( array(
			'wrap_before' => '<nav class="wpp-product-breadcrumbs" aria-label="' . esc_attr__( 'Навигационная цепочка', 'wp-panda' ) . '">',
			'wrap_after'  => '</nav>',
			'delimiter'   => '<span class="wpp-product-breadcrumbs__separator" aria-hidden="true">›</span>',
		) ); ?>
	<?php endif; ?>

	<header class="wpp-product-header">
		<h1 class="product_title entry-title wpp-product-title">
			<strong><?php echo esc_html( $product->get_name() ); ?></strong>
			<?php if ( $product->get_short_description() ) : ?><span> - <?php echo esc_html( wp_strip_all_tags( $product->get_short_description() ) ); ?></span><?php endif; ?>
		</h1>

		<div class="wpp-product-byline">
			<span class="wpp-product-byline__author"><?php esc_html_e( 'Автор', 'wp-panda' ); ?> <strong><?php echo esc_html( get_bloginfo( 'name' ) ); ?></strong></span>

			<?php if ( $sales_count > 0 ) : ?>
				<span class="wpp-product-byline__sales">
					<?php echo wpp_icon( 'cart', 'h-3.5 w-3.5' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php echo esc_html( number_format_i18n( $sales_count ) ); ?> <?php esc_html_e( 'продаж', 'wp-panda' ); ?>
				</span>
			<?php endif; ?>

			<?php if ( $review_count > 0 ) : ?>
				<a class="wpp-product-byline__rating" href="#tab-reviews" aria-label="<?php echo esc_attr( sprintf( __( 'Отзывы о товаре: %s', 'wp-panda' ), number_format_i18n( $review_count ) ) ); ?>">
					<?php echo wc_get_rating_html( $product->get_average_rating(), $product->get_rating_count() ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<span><?php echo esc_html( number_format_i18n( $product->get_average_rating(), 1 ) ); ?></span>
					<span class="wpp-product-byline__muted">(<?php echo esc_html( number_format_i18n( $review_count ) ); ?>)</span>
				</a>
			<?php endif; ?>

			<?php if ( $version && get_post_meta( $product->get_id(), '_wpp_demo_key', true ) ) : ?>
				<span class="wpp-product-byline__updates"><span aria-hidden="true">✓</span><?php esc_html_e( 'Регулярные обновления', 'wp-panda' ); ?></span>
			<?php elseif ( $version ) : ?>
				<span class="wpp-product-byline__updates"><span aria-hidden="true">✓</span><?php esc_html_e( 'Версия', 'wp-panda' ); ?> <?php echo esc_html( $version ); ?></span>
			<?php elseif ( $product->is_virtual() ) : ?>
				<span class="wpp-product-byline__updates"><span aria-hidden="true">✓</span><?php esc_html_e( 'Цифровой товар', 'wp-panda' ); ?></span>
			<?php endif; ?>
		</div>
	</header>
</div>
