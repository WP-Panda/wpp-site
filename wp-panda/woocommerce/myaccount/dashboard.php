<?php
/** Customer dashboard using live WooCommerce orders/downloads and private support tickets. */
defined( 'ABSPATH' ) || exit;

$user_id       = get_current_user_id();
$current_user  = wp_get_current_user();
$orders        = function_exists( 'wc_get_orders' ) ? wc_get_orders( array( 'customer_id' => $user_id, 'limit' => 4, 'orderby' => 'date', 'order' => 'DESC', 'return' => 'objects' ) ) : array();
$paid_orders   = function_exists( 'wc_get_orders' ) ? wc_get_orders( array( 'customer_id' => $user_id, 'status' => array( 'wc-processing', 'wc-completed' ), 'limit' => -1, 'return' => 'objects' ) ) : array();
$license_items = array();
foreach ( $paid_orders as $order ) {
	foreach ( $order->get_items( 'line_item' ) as $item ) {
		$license_items[] = array( 'item' => $item, 'order' => $order );
	}
}
$downloads = function_exists( 'wc_get_customer_available_downloads' ) ? wc_get_customer_available_downloads( $user_id ) : array();
$tickets   = get_posts( array( 'post_type' => 'wpp_support_ticket', 'post_status' => array( 'private', 'publish' ), 'author' => $user_id, 'posts_per_page' => -1, 'fields' => 'ids', 'no_found_rows' => true, 'meta_query' => array( array( 'key' => '_wpp_ticket_customer_id', 'value' => $user_id, 'compare' => '=' ), array( 'key' => '_wpp_ticket_status', 'value' => 'closed', 'compare' => '!=' ) ) ) );
$orders_url = wc_get_endpoint_url( 'orders', '', wc_get_page_permalink( 'myaccount' ) );
$downloads_url = wc_get_endpoint_url( 'downloads', '', wc_get_page_permalink( 'myaccount' ) );
$licenses_url = wc_get_endpoint_url( 'licenses', '', wc_get_page_permalink( 'myaccount' ) );
$support_url = wc_get_endpoint_url( 'support', '', wc_get_page_permalink( 'myaccount' ) );
$shop_url = wc_get_page_permalink( 'shop' );
?>
<div class="wpp-account-dashboard space-y-6">
	<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
		<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
			<div><p class="text-xs font-semibold uppercase tracking-[0.16em] text-muted"><?php esc_html_e( 'Добро пожаловать', 'wp-panda' ); ?></p><h2 class="mt-1 text-2xl font-bold tracking-tight"><?php printf( esc_html__( 'Привет, %s!', 'wp-panda' ), esc_html( $current_user->first_name ? $current_user->first_name : $current_user->display_name ) ); ?></h2><p class="mt-2 max-w-2xl text-sm leading-relaxed text-muted"><?php printf( esc_html__( 'В аккаунте %1$d покупок и %2$d доступных загрузок. История заказов и доступ к продуктам всегда под рукой.', 'wp-panda' ), count( $paid_orders ), count( $downloads ) ); ?></p></div>
			<div class="flex flex-wrap gap-2"><a class="button button--brand" href="<?php echo esc_url( $licenses_url ); ?>"><?php esc_html_e( 'Мои лицензии', 'wp-panda' ); ?></a><a class="button button--light" href="<?php echo esc_url( $downloads_url ); ?>"><?php esc_html_e( 'Загрузки', 'wp-panda' ); ?></a></div>
		</div>
	</section>

	<section class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="<?php esc_attr_e( 'Сводка аккаунта', 'wp-panda' ); ?>">
		<?php
		$stats = array(
			array( 'label' => __( 'Покупки с доступом', 'wp-panda' ), 'value' => count( $license_items ), 'url' => $licenses_url, 'icon' => '◇' ),
			array( 'label' => __( 'Доступно загрузок', 'wp-panda' ), 'value' => count( $downloads ), 'url' => $downloads_url, 'icon' => '↓' ),
			array( 'label' => __( 'Всего заказов', 'wp-panda' ), 'value' => function_exists( 'wc_get_customer_order_count' ) ? wc_get_customer_order_count( $user_id ) : count( $orders ), 'url' => $orders_url, 'icon' => '▤' ),
			array( 'label' => __( 'Открытые тикеты', 'wp-panda' ), 'value' => count( $tickets ), 'url' => $support_url, 'icon' => '?' ),
		);
		foreach ( $stats as $stat ) : ?>
			<a class="group rounded-2xl border border-line bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-float" href="<?php echo esc_url( $stat['url'] ); ?>"><span class="flex items-center justify-between"><span class="text-xs font-semibold text-muted"><?php echo esc_html( $stat['label'] ); ?></span><span class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-lg font-bold text-ink"><?php echo esc_html( $stat['icon'] ); ?></span></span><strong class="mt-3 block text-3xl font-bold tracking-tight"><?php echo esc_html( number_format_i18n( (int) $stat['value'] ) ); ?></strong></a>
		<?php endforeach; ?>
	</section>

	<div class="grid items-start gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.85fr)]">
		<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
			<header class="mb-4 flex items-center justify-between gap-3"><h2 class="text-lg font-bold tracking-tight"><?php esc_html_e( 'Последние заказы', 'wp-panda' ); ?></h2><a class="text-sm font-semibold underline decoration-brand decoration-2 underline-offset-4" href="<?php echo esc_url( $orders_url ); ?>"><?php esc_html_e( 'Все заказы', 'wp-panda' ); ?></a></header>
			<?php if ( $orders ) : ?>
				<div class="overflow-x-auto"><table class="wpp-account-table min-w-[560px] w-full text-left text-sm"><thead><tr class="border-b border-line text-xs text-muted"><th class="py-3 pr-3 font-semibold"><?php esc_html_e( 'Заказ', 'wp-panda' ); ?></th><th class="py-3 pr-3 font-semibold"><?php esc_html_e( 'Товары', 'wp-panda' ); ?></th><th class="py-3 pr-3 font-semibold"><?php esc_html_e( 'Статус', 'wp-panda' ); ?></th><th class="py-3 pr-3 text-right font-semibold"><?php esc_html_e( 'Сумма', 'wp-panda' ); ?></th><th class="py-3 font-semibold"></th></tr></thead><tbody>
					<?php foreach ( $orders as $order ) : ?>
						<?php $names = array(); foreach ( $order->get_items() as $item ) { $names[] = $item->get_name(); } $order_url = wc_get_endpoint_url( 'view-order', $order->get_id(), wc_get_page_permalink( 'myaccount' ) ); ?>
						<tr class="border-b border-line last:border-0"><td class="py-3 pr-3"><a class="font-semibold" href="<?php echo esc_url( $order_url ); ?>">#<?php echo esc_html( $order->get_order_number() ); ?></a><small class="mt-1 block text-xs text-muted"><?php echo esc_html( wc_format_datetime( $order->get_date_created() ) ); ?></small></td><td class="py-3 pr-3 text-xs text-muted"><?php echo esc_html( implode( ', ', $names ) ); ?></td><td class="py-3 pr-3"><span class="wpp-account-status"><?php echo esc_html( wc_get_order_status_name( $order->get_status() ) ); ?></span></td><td class="py-3 pr-3 text-right font-semibold tabular-nums"><?php echo wp_kses_post( $order->get_formatted_order_total() ); ?></td><td class="py-3 text-right"><a class="text-xs font-semibold" href="<?php echo esc_url( $order_url ); ?>"><?php esc_html_e( 'Подробнее', 'wp-panda' ); ?></a></td></tr>
					<?php endforeach; ?>
				</tbody></table></div>
			<?php else : ?><div class="rounded-2xl bg-soft p-5"><p class="text-sm font-semibold"><?php esc_html_e( 'Заказов пока нет', 'wp-panda' ); ?></p><p class="mt-1 text-sm text-muted"><?php esc_html_e( 'После покупки здесь появится история заказов и документы.', 'wp-panda' ); ?></p><a class="button button--brand mt-4" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Перейти в каталог', 'wp-panda' ); ?></a></div><?php endif; ?>
		</section>

		<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
			<header class="mb-4 flex items-center justify-between gap-3"><h2 class="text-lg font-bold tracking-tight"><?php esc_html_e( 'Быстрый доступ', 'wp-panda' ); ?></h2><a class="text-sm font-semibold underline decoration-brand decoration-2 underline-offset-4" href="<?php echo esc_url( $licenses_url ); ?>"><?php esc_html_e( 'Лицензии', 'wp-panda' ); ?></a></header>
			<?php if ( $license_items ) : ?><ul class="space-y-3"><?php foreach ( array_slice( $license_items, 0, 4 ) as $entry ) : ?><li class="flex items-center gap-3 rounded-2xl border border-line p-3"><span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-soft"><?php echo wp_kses_post( $entry['item']->get_product() ? $entry['item']->get_product()->get_image( 'thumbnail' ) : '' ); ?></span><span class="min-w-0 flex-1"><strong class="block truncate text-sm"><?php echo esc_html( $entry['item']->get_name() ); ?></strong><small class="text-xs text-muted"><?php echo esc_html( sprintf( __( 'Заказ #%s', 'wp-panda' ), $entry['order']->get_order_number() ) ); ?></small></span><a class="text-xs font-semibold" href="<?php echo esc_url( wc_get_endpoint_url( 'view-order', $entry['order']->get_id(), wc_get_page_permalink( 'myaccount' ) ) ); ?>"><?php esc_html_e( 'Заказ', 'wp-panda' ); ?></a></li><?php endforeach; ?></ul><?php else : ?><div class="rounded-2xl bg-soft p-4"><p class="text-sm text-muted"><?php esc_html_e( 'После завершения заказа приобретённые продукты появятся здесь. Реальные лицензионные ключи требуют отдельного сервиса лицензирования.', 'wp-panda' ); ?></p></div><?php endif; ?>
			<a class="button button--light mt-4 w-full" href="<?php echo esc_url( $downloads_url ); ?>"><?php esc_html_e( 'Открыть загрузки', 'wp-panda' ); ?></a>
		</section>
	</div>

	<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
		<header class="mb-4 flex items-center justify-between gap-3"><div><h2 class="text-lg font-bold tracking-tight"><?php esc_html_e( 'Рекомендуем для ваших сайтов', 'wp-panda' ); ?></h2><p class="mt-1 text-sm text-muted"><?php esc_html_e( 'Подборка тем и плагинов Wp Panda', 'wp-panda' ); ?></p></div><a class="text-sm font-semibold underline decoration-brand decoration-2 underline-offset-4" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'В каталог', 'wp-panda' ); ?></a></header>
		<?php $recommended = function_exists( 'wpp_featured_products_query' ) ? wpp_featured_products_query( '', 2 ) : null; ?>
		<?php if ( $recommended && $recommended->have_posts() ) : ?><div class="wpp-dashboard-recommendations"><?php wpp_render_product_cards( $recommended, 2 ); ?></div><?php wp_reset_postdata(); ?><?php else : ?><p class="text-sm text-muted"><?php esc_html_e( 'Рекомендации появятся после публикации товаров.', 'wp-panda' ); ?></p><?php endif; ?>
	</section>
</div>
