<?php
/**
 * Orders list with status tabs and a live row filter.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$current_filter = isset( $_GET['status'] ) ? sanitize_key( wp_unslash( $_GET['status'] ) ) : 'all'; // phpcs:ignore WordPress.Security.NonceVerification
$status_args = array(
	'all'        => array( __( 'Все', 'wp-panda' ), array() ),
	'completed'  => array( __( 'Выполненные', 'wp-panda' ), array( 'completed' ) ),
	'processing' => array( __( 'В обработке', 'wp-panda' ), array( 'processing', 'on-hold', 'pending' ) ),
	'refunded'   => array( __( 'Возвраты', 'wp-panda' ), array( 'refunded', 'cancelled' ) ),
);
$orders = wc_get_orders( array(
	'customer' => get_current_user_id(),
	'limit'    => -1,
	'orderby'  => 'date',
	'order'    => 'DESC',
) );
$filtered = $orders;
if ( 'all' !== $current_filter && isset( $status_args[ $current_filter ] ) ) {
	$wanted   = $status_args[ $current_filter ][1];
	$filtered = array_values( array_filter( $orders, function ( $o ) use ( $wanted ) {
		return in_array( $o->get_status(), $wanted, true );
	} ) );
}
?>
<div class="space-y-5">
	<div class="flex flex-col gap-3 xl:flex-row xl:items-center">
		<div class="no-scrollbar overflow-x-auto xl:max-w-[520px] xl:flex-1">
			<div class="flex w-full rounded-full border border-line bg-white p-1.5 shadow-card min-w-max sm:min-w-0">
				<?php foreach ( $status_args as $wpp_key => $wpp_def ) :
					$wpp_active = $wpp_key === $current_filter;
					$wpp_url    = add_query_arg( array( 'status' => 'all' === $wpp_key ? false : $wpp_key ), wc_get_account_endpoint_url( 'orders' ) );
					if ( 'all' === $wpp_key ) {
						$wpp_url = wc_get_account_endpoint_url( 'orders' );
					}
					$wpp_class = $wpp_active
						? 'bg-ink text-white shadow-[0_6px_16px_-8px_rgba(20,20,28,0.6)]'
						: 'text-ink/65 hover:text-ink';
					?>
					<a href="<?php echo esc_url( $wpp_url ); ?>" type="button" class="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 font-semibold transition-all duration-200 h-8 text-[13px] <?php echo esc_attr( $wpp_class ); ?>"><?php echo esc_html( $wpp_def[0] ); ?></a>
				<?php endforeach; ?>
			</div>
		</div>
		<div class="flex h-12 flex-1 items-center gap-2 rounded-full border border-line bg-white px-4 shadow-card transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15">
			<?php echo wpp_icon( 'search', 'h-4 w-4 text-muted' ); ?>
			<input data-order-search placeholder="<?php esc_attr_e( 'Номер заказа или товар', 'wp-panda' ); ?>" class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70" value="">
		</div>
	</div>

	<div class="overflow-hidden rounded-card border border-line bg-white shadow-card">
		<div class="hidden grid-cols-[1fr_1.7fr_1fr_0.9fr_120px] gap-4 border-b border-line bg-soft/60 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted md:grid">
			<span><?php esc_html_e( 'Заказ', 'wp-panda' ); ?></span>
			<span><?php esc_html_e( 'Товары', 'wp-panda' ); ?></span>
			<span><?php esc_html_e( 'Статус', 'wp-panda' ); ?></span>
			<span class="text-right"><?php esc_html_e( 'Сумма', 'wp-panda' ); ?></span>
			<span></span>
		</div>
		<?php if ( ! $filtered ) : ?>
			<div class="px-6 py-10 text-center text-sm text-muted">
				<?php esc_html_e( 'Заказов пока нет.', 'wp-panda' ); ?>
				<a class="ml-2 font-semibold underline decoration-brand decoration-2 underline-offset-4" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) ); ?>"><?php esc_html_e( 'Перейти в каталог', 'wp-panda' ); ?></a>
			</div>
		<?php endif; ?>
		<?php foreach ( $filtered as $wpp_order ) :
			$wpp_names = array();
			$wpp_tiles = '';
			foreach ( $wpp_order->get_items() as $wpp_item ) {
				$wpp_names[] = $wpp_item->get_name();
				$wpp_prod    = $wpp_item->get_product();
				if ( $wpp_prod ) {
					$wpp_tiles .= wpp_product_mini_tile( $wpp_prod, 'h-8 w-8 rounded-full border-2 border-white' );
				}
			}
			?>
			<div data-order-row class="grid grid-cols-2 items-center gap-3 border-b border-line px-5 py-4 last:border-0 md:grid-cols-[1fr_1.7fr_1fr_0.9fr_120px] md:gap-4 md:px-6">
				<div>
					<div class="font-semibold">#<?php echo esc_html( $wpp_order->get_order_number() ); ?></div>
					<div class="text-xs text-muted"><?php echo esc_html( wpp_human_date( $wpp_order->get_date_created() ? $wpp_order->get_date_created()->getTimestamp() : time() ) ); ?></div>
				</div>
				<div class="order-3 col-span-2 flex min-w-0 items-center gap-2 md:order-none md:col-span-1">
					<div class="flex -space-x-2"><?php echo $wpp_tiles; // phpcs:ignore WordPress.Security.EscapeOutput ?></div>
					<span class="truncate text-xs text-muted"><?php echo esc_html( implode( ', ', $wpp_names ) ); ?></span>
				</div>
				<div><?php echo wpp_account_status_badge( $wpp_order->get_status() ); // phpcs:ignore WordPress.Security.EscapeOutput ?></div>
				<div class="text-right text-sm font-bold tabular-nums"><?php echo wp_kses_post( $wpp_order->get_formatted_order_total() ); ?></div>
				<div class="col-span-2 flex justify-end md:col-span-1 md:justify-start">
					<a class="inline-flex h-10 items-center gap-1.5 rounded-full border border-line bg-soft px-4 text-[13px] font-semibold transition hover:border-brand hover:bg-brand" href="<?php echo esc_url( $wpp_order->get_view_order_url() ); ?>"><?php esc_html_e( 'Подробнее', 'wp-panda' ); ?></a>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</div>
