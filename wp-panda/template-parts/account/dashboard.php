<?php
/**
 * Account dashboard: greeting, stat cards, recent orders, quick keys.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$user       = wp_get_current_user();
$first_name = $user->first_name ? $user->first_name : strtok( $user->display_name, ' ' );
$licenses   = function_exists( 'wpp_get_user_licenses' ) ? wpp_get_user_licenses() : array();
$downloads  = wc_get_customer_available_downloads( $user->ID );
$orders     = wc_get_orders( array( 'customer' => $user->ID, 'limit' => 5, 'orderby' => 'date', 'order' => 'DESC' ) );
$order_total = count( wc_get_orders( array( 'customer' => $user->ID, 'limit' => -1, 'return' => 'ids' ) ) );
$open_tickets = count( get_posts( array( 'post_type' => 'wpp_support_ticket', 'author' => $user->ID, 'post_status' => array( 'private', 'publish', 'draft' ), 'posts_per_page' => -1, 'fields' => 'ids', 'meta_query' => array( array( 'key' => '_wpp_ticket_status', 'value' => 'closed', 'compare' => '!=' ) ) ) ) );
?>
<div class="space-y-5">
	<div class="dark-card relative overflow-hidden rounded-card p-6 text-white sm:p-8">
		<div class="relative z-10 max-w-lg">
			<div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55"><?php esc_html_e( 'Добро пожаловать', 'wp-panda' ); ?></div>
			<h2 class="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"><?php echo esc_html( sprintf( __( 'Привет, %s! 👋', 'wp-panda' ), $first_name ) ); ?></h2>
			<p class="mt-2 text-white/70"><?php echo esc_html( sprintf( _n( 'У вас %s активная лицензия. Плагины доступны навсегда, темы привязаны к вашим доменам.', 'У вас %s активных лицензий. Плагины доступны навсегда, темы привязаны к вашим доменам.', count( $licenses ), 'wp-panda' ), number_format_i18n( count( $licenses ) ) ) ); ?></p>
			<div class="mt-6 flex flex-wrap gap-2">
				<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-brand text-ink hover:bg-brand-600 shadow-glow h-11 px-5 text-sm" href="<?php echo esc_url( wc_get_account_endpoint_url( 'licenses' ) ); ?>"><?php esc_html_e( 'Мои лицензии', 'wp-panda' ); ?><?php echo wpp_icon( 'arrow-right', 'h-4 w-4' ); ?></a>
				<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 h-11 px-5 text-sm bg-white/10 text-white hover:bg-white/15" href="<?php echo esc_url( wc_get_account_endpoint_url( 'downloads' ) ); ?>"><?php esc_html_e( 'Загрузки', 'wp-panda' ); ?></a>
			</div>
		</div>
		<div class="pointer-events-none absolute -bottom-16 -right-10 hidden h-64 w-64 rounded-full border-[28px] border-white/5 sm:block"></div>
		<div class="pointer-events-none absolute right-12 top-8 hidden h-24 w-24 rounded-full border-[14px] border-brand/25 sm:block"></div>
	</div>

	<div class="grid grid-cols-2 gap-4 xl:grid-cols-4">
		<?php
		$wpp_stats = array(
			array( count( $licenses ), __( 'Лицензии и ключи', 'wp-panda' ), 'key-round', 'licenses' ),
			array( count( $downloads ), __( 'Доступно загрузок', 'wp-panda' ), 'download', 'downloads' ),
			array( $order_total, __( 'Всего заказов', 'wp-panda' ), 'package', 'orders' ),
			array( $open_tickets, __( 'Открытые тикеты', 'wp-panda' ), 'life-buoy', 'support' ),
		);
		foreach ( $wpp_stats as $wpp_stat ) :
			?>
			<a class="group rounded-card border border-line bg-white p-5 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-float" href="<?php echo esc_url( wc_get_account_endpoint_url( $wpp_stat[3] ) ); ?>">
				<div class="flex items-center justify-between">
					<span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-ink ring-1 ring-brand-100"><?php echo wpp_icon( $wpp_stat[2], 'h-5 w-5' ); ?></span>
					<?php echo wpp_icon( 'arrow-up-right', 'h-4 w-4 text-muted opacity-0 transition group-hover:opacity-100' ); ?>
				</div>
				<div class="mt-5 text-3xl font-bold tabular-nums"><?php echo esc_html( number_format_i18n( $wpp_stat[0] ) ); ?></div>
				<div class="text-[13px] text-muted"><?php echo esc_html( $wpp_stat[1] ); ?></div>
			</a>
		<?php endforeach; ?>
	</div>

	<div class="grid gap-5 xl:grid-cols-[1.3fr_1fr]">
		<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7">
			<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
				<div class="flex items-center gap-3"><h3 class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Последние заказы', 'wp-panda' ); ?></h3></div>
				<a class="text-sm font-semibold underline decoration-brand decoration-2 underline-offset-4" href="<?php echo esc_url( wc_get_account_endpoint_url( 'orders' ) ); ?>"><?php esc_html_e( 'Все заказы', 'wp-panda' ); ?></a>
			</div>
			<div class="divide-y divide-line">
				<?php if ( ! $orders ) : ?>
					<p class="py-3 text-sm text-muted"><?php esc_html_e( 'Заказов пока нет.', 'wp-panda' ); ?></p>
				<?php endif; ?>
				<?php foreach ( $orders as $wpp_order ) :
					$wpp_status = $wpp_order->get_status();
					$wpp_badge  = wpp_account_status_badge( $wpp_status );
					$wpp_items_names = array();
					$wpp_first_product = null;
					foreach ( $wpp_order->get_items() as $wpp_item ) {
						$wpp_items_names[] = $wpp_item->get_name();
						if ( ! $wpp_first_product ) {
							$wpp_first_product = $wpp_item->get_product();
						}
					}
					?>
					<a class="flex w-full items-center gap-3 py-3 text-left first:pt-0 last:pb-0" href="<?php echo esc_url( $wpp_order->get_view_order_url() ); ?>">
						<?php if ( $wpp_first_product ) : ?>
							<?php echo str_replace( 'h-11 w-11 rounded-xl', 'h-11 w-11 rounded-xl', wpp_product_mini_tile( $wpp_first_product, 'h-11 w-11 rounded-xl' ) ); ?>
						<?php else : ?>
							<span class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-soft"><?php echo wpp_icon( 'package', 'h-5 w-5 text-muted' ); ?></span>
						<?php endif; ?>
						<div class="min-w-0 flex-1">
							<div class="flex items-center gap-2 text-sm font-semibold">#<?php echo esc_html( $wpp_order->get_order_number() ); ?><span class="font-normal text-muted">· <?php echo esc_html( wpp_human_date( $wpp_order->get_date_created() ? $wpp_order->get_date_created()->getTimestamp() : time() ) ); ?></span></div>
							<div class="truncate text-xs text-muted"><?php echo esc_html( implode( ', ', $wpp_items_names ) ); ?></div>
						</div>
						<?php echo $wpp_badge; // phpcs:ignore WordPress.Security.EscapeOutput ?>
						<div class="w-24 text-right text-sm font-bold tabular-nums"><?php echo wp_kses_post( $wpp_order->get_formatted_order_total() ); ?></div>
					</a>
				<?php endforeach; ?>
			</div>
		</section>

		<div class="space-y-5">
			<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7">
				<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
					<div class="flex items-center gap-3"><h3 class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Быстрый доступ к ключам', 'wp-panda' ); ?></h3></div>
				</div>
				<div class="space-y-3">
					<?php if ( ! $licenses ) : ?>
						<p class="text-sm text-muted"><?php esc_html_e( 'Ключи появятся после первой покупки.', 'wp-panda' ); ?></p>
					<?php endif; ?>
					<?php foreach ( array_slice( $licenses, 0, 3 ) as $wpp_license ) :
						$wpp_product = wc_get_product( $wpp_license['product_id'] );
						if ( ! $wpp_product ) { continue; }
						$wpp_kind = function_exists( 'wpp_product_kind' ) ? wpp_product_kind( $wpp_license['product_id'] ) : 'product';
						?>
						<div class="flex items-center gap-3">
							<?php echo wpp_product_mini_tile( $wpp_product, 'h-10 w-10 rounded-xl' ); ?>
							<div class="min-w-0 flex-1">
								<div class="text-sm font-semibold truncate"><?php echo esc_html( $wpp_product->get_name() ); ?></div>
								<div class="text-xs text-muted truncate"><?php echo esc_html( 'theme' === $wpp_kind ? __( 'Тема', 'wp-panda' ) . ' · ' . $wpp_license['tier'] : __( 'Плагин', 'wp-panda' ) . ' · ' . __( 'навсегда', 'wp-panda' ) ); ?></div>
							</div>
							<button type="button" class="inline-flex h-8 flex-shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition border-line bg-white hover:border-ink/20" data-wpp-copy-link data-wpp-copy-target="<?php echo esc_attr( $wpp_license['key'] ); ?>"><?php echo wpp_icon( 'copy', 'h-3.5 w-3.5' ); ?><?php esc_html_e( 'Копировать', 'wp-panda' ); ?></button>
						</div>
					<?php endforeach; ?>
				</div>
				<a class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-brand decoration-2 underline-offset-4" href="<?php echo esc_url( wc_get_account_endpoint_url( 'licenses' ) ); ?>"><?php esc_html_e( 'Все лицензии', 'wp-panda' ); ?></a>
			</section>
		</div>
	</div>
</div>
