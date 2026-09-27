<?php
/** Seller, product specification and support blocks for the single-product sidebar. */
defined( 'ABSPATH' ) || exit;

global $product;
if ( ! $product instanceof WC_Product ) {
	return;
}

$specs = array(
	__( 'Обновлено', 'wp-panda' ) => get_the_modified_date( get_option( 'date_format' ), $product->get_id() ),
);
foreach ( array(
	__( 'Текущая версия', 'wp-panda' ) => 'Версия',
	__( 'WordPress', 'wp-panda' )      => 'WordPress',
	__( 'PHP', 'wp-panda' )            => 'PHP',
	__( 'Совместимость', 'wp-panda' )  => 'Совместимость',
) as $label => $attribute ) {
	$value = $product->get_attribute( $attribute );
	if ( '' !== trim( wp_strip_all_tags( $value ) ) ) {
		$specs[ $label ] = $value;
	}
}

$tag_list    = wc_get_product_tag_list( $product->get_id(), ', ' );
$account_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'myaccount' ) : '';
$support_url = $account_url && function_exists( 'wc_get_endpoint_url' ) ? wc_get_endpoint_url( 'support', 'new', $account_url ) : '';
$shop_url    = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/' );
?>
<div class="item-info wpp-product-information">
	<section class="wpp-product-author" aria-labelledby="wpp-product-author-heading">
		<div class="wpp-product-author__identity">
			<span class="wpp-product-author__mark" aria-hidden="true">P<span>.</span></span>
			<div>
				<h2 id="wpp-product-author-heading"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></h2>
				<p><?php esc_html_e( 'Магазин и разработчик продукта', 'wp-panda' ); ?></p>
			</div>
		</div>
		<a class="wpp-product-author__link" href="<?php echo esc_url( $shop_url ); ?>">
			<?php esc_html_e( 'Все продукты автора', 'wp-panda' ); ?>
			<?php echo wpp_icon( 'arrow', 'h-3.5 w-3.5' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</a>
	</section>

	<section class="wpp-product-specs" aria-labelledby="wpp-product-specs-heading">
		<h2 id="wpp-product-specs-heading"><?php esc_html_e( 'Информация о продукте', 'wp-panda' ); ?></h2>
		<dl>
			<?php foreach ( $specs as $label => $value ) : ?>
				<dt><?php echo esc_html( $label ); ?></dt>
				<dd><?php echo esc_html( wp_strip_all_tags( $value ) ); ?></dd>
			<?php endforeach; ?>
			<?php if ( $product->get_sku() ) : ?>
				<dt><?php esc_html_e( 'Артикул', 'wp-panda' ); ?></dt>
				<dd><?php echo esc_html( $product->get_sku() ); ?></dd>
			<?php endif; ?>
		</dl>
		<?php if ( $tag_list ) : ?>
			<div class="wpp-product-specs__tags"><strong><?php esc_html_e( 'Теги:', 'wp-panda' ); ?></strong> <?php echo wp_kses_post( $tag_list ); ?></div>
		<?php endif; ?>
	</section>

	<?php if ( $support_url ) : ?>
		<section class="wpp-product-support" aria-labelledby="wpp-product-support-heading">
			<h2 id="wpp-product-support-heading">
				<?php echo wpp_icon( 'user', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php esc_html_e( 'Помощь по продукту', 'wp-panda' ); ?>
			</h2>
			<p><?php esc_html_e( 'Создайте обращение по установке, настройке или использованию товара в личном кабинете.', 'wp-panda' ); ?></p>
			<a href="<?php echo esc_url( $support_url ); ?>">
				<?php esc_html_e( 'Создать обращение', 'wp-panda' ); ?>
				<?php echo wpp_icon( 'arrow', 'h-3 w-3' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
		</section>
	<?php endif; ?>
</div>
