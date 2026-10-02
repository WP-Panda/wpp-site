<?php
/**
 * Purchased products available to download.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$wpp_downloads = wc_get_customer_available_downloads( get_current_user_id() );
$wpp_seen      = array();
?>
<div class="space-y-5">
	<div class="flex flex-col gap-4 rounded-card bg-brand-50 p-5 ring-1 ring-brand-100 sm:flex-row sm:items-center">
		<span class="flex flex-shrink-0 items-center justify-center rounded-full bg-white border border-line text-ink h-12 w-12"><?php echo wpp_icon( 'refresh-cw', 'h-5 w-5' ); ?></span>
		<div class="flex-1">
			<div class="font-semibold"><?php esc_html_e( 'Обновляйте в один клик из консоли WordPress', 'wp-panda' ); ?></div>
			<div class="text-sm text-muted"><?php esc_html_e( 'Плагины навсегда, темы с автообновлениями — новые версии доступны в любое время.', 'wp-panda' ); ?></div>
		</div>
	</div>
	<div class="space-y-3">
		<?php if ( ! $wpp_downloads ) : ?>
			<div class="rounded-card border border-line bg-white p-10 text-center shadow-card">
				<p class="text-sm text-muted"><?php esc_html_e( 'Загрузок пока нет — файлы появятся после оплаты заказа.', 'wp-panda' ); ?></p>
			</div>
		<?php endif; ?>
		<?php foreach ( $wpp_downloads as $wpp_dl ) :
			$wpp_pid = isset( $wpp_dl['product_id'] ) ? (int) $wpp_dl['product_id'] : 0;
			if ( ! $wpp_pid || isset( $wpp_seen[ $wpp_pid ] ) ) {
				continue;
			}
			$wpp_seen[ $wpp_pid ] = 1;
			$wpp_product = wc_get_product( $wpp_pid );
			if ( ! $wpp_product ) {
				continue;
			}
			$wpp_version = function_exists( 'wpp_product_version' ) ? wpp_product_version( $wpp_product ) : '';
			?>
			<div class="flex flex-col gap-4 rounded-card border border-line bg-white p-4 shadow-card sm:flex-row sm:items-center">
				<div class="flex min-w-0 flex-1 items-center gap-4">
					<div class="w-24 flex-shrink-0 overflow-hidden rounded-xl sm:w-28">
						<?php echo wpp_render_product_art( $wpp_product, 'wpp-product-card' ); ?>
					</div>
					<div class="min-w-0 flex-1">
						<div class="flex flex-wrap items-center gap-2">
							<h3 class="text-lg font-semibold tracking-tight"><?php echo esc_html( $wpp_product->get_name() ); ?></h3>
							<?php if ( $wpp_version ) : ?><span class="rounded-full bg-soft px-2.5 py-0.5 text-[11px] font-semibold text-ink/70">v<?php echo esc_html( $wpp_version ); ?></span><?php endif; ?>
						</div>
						<div class="mt-0.5 truncate text-xs text-muted"><?php echo esc_html( wp_strip_all_tags( $wpp_product->get_short_description() ) ); ?></div>
					</div>
				</div>
				<div class="flex flex-wrap items-center gap-2">
					<a class="inline-flex h-10 items-center gap-1.5 rounded-full border border-line bg-soft px-4 text-[13px] font-semibold transition hover:border-brand hover:bg-brand" href="<?php echo esc_url( get_permalink( $wpp_pid ) ); ?>"><?php echo wpp_icon( 'eye', 'h-4 w-4' ); ?><?php esc_html_e( 'Страница продукта', 'wp-panda' ); ?></a>
					<a class="inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-4 text-[13px] font-semibold text-white transition hover:bg-ink-2" href="<?php echo esc_url( $wpp_dl['download_url'] ); ?>"><?php echo wpp_icon( 'download', 'h-4 w-4' ); ?><?php esc_html_e( 'Скачать', 'wp-panda' ); ?></a>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</div>
