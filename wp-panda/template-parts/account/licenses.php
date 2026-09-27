<?php
/** License overview based only on completed/processing WooCommerce orders; no keys are fabricated. */
defined( 'ABSPATH' ) || exit;

$user_id = get_current_user_id();
$orders  = function_exists( 'wc_get_orders' ) ? wc_get_orders( array(
	'customer_id' => $user_id,
	'status'      => array( 'wc-processing', 'wc-completed' ),
	'limit'       => -1,
	'orderby'     => 'date',
	'order'       => 'DESC',
) ) : array();
$lines = array();
foreach ( $orders as $order ) {
	foreach ( $order->get_items( 'line_item' ) as $item ) {
		$product = $item->get_product();
		if ( ! $product ) {
			continue;
		}
		$lines[] = array(
			'order'   => $order,
			'item'    => $item,
			'product' => $product,
		);
	}
}
?>
<section class="wpp-account-section" aria-labelledby="wpp-licenses-heading">
	<header class="wpp-account-section__heading">
		<div><p class="eyebrow"><?php esc_html_e( 'Покупки Wp Panda', 'wp-panda' ); ?></p><h2 id="wpp-licenses-heading"><?php esc_html_e( 'Мои лицензии', 'wp-panda' ); ?></h2></div>
		<a class="button button--light" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>"><?php esc_html_e( 'Каталог', 'wp-panda' ); ?></a>
	</header>
	<p class="wpp-demo-notice"><strong><?php esc_html_e( 'Демо-раздел.', 'wp-panda' ); ?></strong> <?php esc_html_e( 'Здесь показаны товары из заказов аккаунта. Ключи, сроки действия и активации появятся после подключения реального сервиса лицензирования; демонстрационные ключи не создаются.', 'wp-panda' ); ?></p>
	<?php if ( $lines ) : ?>
		<div class="wpp-account-table-wrap">
			<table class="shop_table shop_table_responsive wpp-account-table">
				<thead><tr><th scope="col"><?php esc_html_e( 'Продукт', 'wp-panda' ); ?></th><th scope="col"><?php esc_html_e( 'Заказ', 'wp-panda' ); ?></th><th scope="col"><?php esc_html_e( 'Дата', 'wp-panda' ); ?></th><th scope="col"><?php esc_html_e( 'Лицензия', 'wp-panda' ); ?></th></tr></thead>
				<tbody>
					<?php foreach ( $lines as $line ) : ?>
						<?php
						$order_url = wc_get_endpoint_url( 'view-order', $line['order']->get_id(), wc_get_page_permalink( 'myaccount' ) );
						?>
						<tr>
							<td data-title="<?php esc_attr_e( 'Продукт', 'wp-panda' ); ?>"><a href="<?php echo esc_url( $line['product']->get_permalink() ); ?>"><?php echo esc_html( $line['item']->get_name() ); ?></a></td>
							<td data-title="<?php esc_attr_e( 'Заказ', 'wp-panda' ); ?>"><a href="<?php echo esc_url( $order_url ); ?>">#<?php echo esc_html( $line['order']->get_order_number() ); ?></a></td>
							<td data-title="<?php esc_attr_e( 'Дата', 'wp-panda' ); ?>"><?php echo esc_html( wc_format_datetime( $line['order']->get_date_created() ) ); ?></td>
							<td data-title="<?php esc_attr_e( 'Лицензия', 'wp-panda' ); ?>"><span class="wpp-account-status"><?php esc_html_e( 'Сервис не подключён', 'wp-panda' ); ?></span></td>
						</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
		</div>
	<?php else : ?>
		<div class="empty-state"><h3><?php esc_html_e( 'Покупок пока нет', 'wp-panda' ); ?></h3><p><?php esc_html_e( 'После оформления заказа приобретённые продукты появятся в этом списке.', 'wp-panda' ); ?></p><a class="button button--brand" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>"><?php esc_html_e( 'Перейти в каталог', 'wp-panda' ); ?></a></div>
	<?php endif; ?>
</section>
