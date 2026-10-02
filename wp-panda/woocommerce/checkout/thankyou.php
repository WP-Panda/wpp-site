<?php
/**
 * Order received page, markup identical to the supplied layout.
 *
 * @package WpPanda
 * @version 7.0.1
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="mx-auto max-w-[1200px] px-4 pb-32 pt-4 sm:px-6 lg:pb-8">
	<?php
	$wpp_count = $order ? count( $order->get_items() ) : 0;
	$wpp_name  = $order ? trim( $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() ) : '';
	get_template_part( 'template-parts/checkout/stepper', null, array(
		'step'      => 4,
		'subtitles' => array(
			sprintf( _n( '%s товар', '%s товара', $wpp_count, 'wp-panda' ), number_format_i18n( $wpp_count ) ),
			$wpp_name ? $wpp_name : __( 'Заполнено', 'wp-panda' ),
			$order && $order->get_payment_method_title() ? $order->get_payment_method_title() : __( 'Оплачено', 'wp-panda' ),
			__( 'Заказ оплачен', 'wp-panda' ),
		),
	) );
	?>
	<div class="mt-12">
		<?php if ( $order ) : ?>
			<?php wc_print_notices(); ?>
			<div class="mx-auto max-w-2xl text-center">
				<div class="pop mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand shadow-glow ring-8 ring-brand-50"><?php echo wpp_icon( 'check', 'h-8 w-8', array( 'stroke' => '3' ) ); ?></div>
				<h1 class="mt-7 text-4xl font-bold tracking-tight sm:text-5xl"><?php esc_html_e( 'Спасибо за покупку!', 'wp-panda' ); ?></h1>
				<?php if ( $order->has_status( 'failed' ) ) : ?>
					<p class="mt-3 text-muted"><?php echo wp_kses_post( __( 'Платёж не прошёл. Попробуйте ещё раз или выберите другой способ оплаты.', 'wp-panda' ) ); ?></p>
					<a class="mt-5 inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-12 px-6 text-sm" href="<?php echo esc_url( $order->get_checkout_payment_url() ); ?>"><?php esc_html_e( 'Оплатить ещё раз', 'wp-panda' ); ?></a>
				<?php else : ?>
					<p class="mt-3 text-muted"><?php echo wp_kses_post( sprintf( __( 'Заказ <b class="text-ink">#%s</b> оплачен. Ключи и ссылки на скачивание отправлены на <b class="text-ink">%s</b>.', 'wp-panda' ), $order->get_order_number(), $order->get_billing_email() ) ); ?></p>
				<?php endif; ?>
			</div>

			<?php if ( ! $order->has_status( 'failed' ) ) : ?>
			<div class="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
				<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7">
					<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
						<div class="flex items-center gap-3">
							<span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100">1</span>
							<h3 class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Купленные продукты', 'wp-panda' ); ?></h3>
						</div>
					</div>
					<div class="space-y-3">
						<?php
						$wpp_license_keys = (array) $order->get_meta( '_wpp_license_keys', true );
						foreach ( $order->get_items() as $wpp_item ) :
							$wpp_product = $wpp_item->get_product();
							if ( ! $wpp_product ) {
								continue;
							}
							$wpp_parent_id = $wpp_item->get_product_id();
							$wpp_parent    = wc_get_product( $wpp_parent_id );
							$wpp_version   = $wpp_parent ? wpp_product_version( $wpp_parent ) : '';
							$wpp_tier      = __( 'Лицензия навсегда', 'wp-panda' );
							if ( $wpp_item->get_variation_id() ) {
								$wpp_variation = wc_get_product( $wpp_item->get_variation_id() );
								if ( $wpp_variation ) {
									$wpp_va   = $wpp_variation->get_attributes();
									$wpp_tier = $wpp_va ? (string) reset( $wpp_va ) : $wpp_tier;
								}
							}
							$wpp_key_value = '';
							foreach ( $wpp_license_keys as $wpp_lic ) {
								if ( (int) $wpp_lic['product_id'] === $wpp_parent_id && (int) $wpp_lic['variation_id'] === (int) $wpp_item->get_variation_id() ) {
									$wpp_key_value = $wpp_lic['key'];
									break;
								}
							}
							$wpp_downloads = $wpp_parent ? $wpp_parent->get_downloads() : array();
							$wpp_download  = $wpp_downloads ? reset( $wpp_downloads ) : null;
							?>
							<div class="rounded-2xl border border-line p-4">
								<div class="flex items-center gap-4">
									<?php echo $wpp_parent ? wpp_product_mini_tile( $wpp_parent, 'h-14 w-14 rounded-2xl' ) : ''; ?>
									<div class="min-w-0 flex-1">
										<div class="font-semibold"><?php echo esc_html( $wpp_product->get_name() ); ?> <?php if ( $wpp_version ) : ?><span class="font-normal text-muted">v<?php echo esc_html( $wpp_version ); ?></span><?php endif; ?></div>
										<div class="text-xs text-muted"><?php echo esc_html( $wpp_tier ); ?></div>
									</div>
									<?php if ( $wpp_download ) : ?>
										<a href="<?php echo esc_url( $wpp_download->get_file() ); ?>" download class="select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-9 px-4 text-[13px] hidden sm:inline-flex"><?php echo wpp_icon( 'download', 'h-4 w-4' ); ?><?php esc_html_e( 'Скачать .zip', 'wp-panda' ); ?></a>
									<?php endif; ?>
								</div>
								<?php if ( $wpp_key_value ) : ?>
									<div class="mt-3 flex flex-wrap items-center gap-2 rounded-xl bg-soft px-3 py-2.5">
										<?php echo wpp_icon( 'key-round', 'h-4 w-4 text-muted' ); ?>
										<code class="min-w-0 flex-1 truncate font-mono text-sm font-semibold tracking-wider"><?php echo esc_html( $wpp_key_value ); ?></code>
										<button type="button" class="inline-flex h-8 flex-shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition border-line bg-white hover:border-ink/20" data-wpp-copy-link data-wpp-copy-target="<?php echo esc_attr( $wpp_key_value ); ?>"><?php echo wpp_icon( 'copy', 'h-3.5 w-3.5' ); ?><?php esc_html_e( 'Копировать', 'wp-panda' ); ?></button>
									</div>
								<?php endif; ?>
								<?php if ( $wpp_download ) : ?>
									<a href="<?php echo esc_url( $wpp_download->get_file() ); ?>" download class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-9 px-4 text-[13px] mt-3 w-full sm:hidden"><?php echo wpp_icon( 'download', 'h-4 w-4' ); ?><?php esc_html_e( 'Скачать .zip', 'wp-panda' ); ?></a>
								<?php endif; ?>
							</div>
						<?php endforeach; ?>
					</div>
				</section>
				<aside class="space-y-4">
					<div class="rounded-card border border-line bg-white p-6 shadow-card">
						<div class="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"><?php esc_html_e( 'Детали заказа', 'wp-panda' ); ?></div>
						<dl class="mt-4 space-y-2.5 text-sm">
							<div class="flex justify-between gap-3"><dt class="text-muted"><?php esc_html_e( 'Номер', 'wp-panda' ); ?></dt><dd class="truncate text-right font-semibold">#<?php echo esc_html( $order->get_order_number() ); ?></dd></div>
							<div class="flex justify-between gap-3"><dt class="text-muted"><?php esc_html_e( 'Дата', 'wp-panda' ); ?></dt><dd class="truncate text-right font-semibold"><?php echo esc_html( wpp_human_date( $order->get_date_created() ? $order->get_date_created()->getTimestamp() : time() ) ); ?></dd></div>
							<div class="flex justify-between gap-3"><dt class="text-muted"><?php esc_html_e( 'Оплата', 'wp-panda' ); ?></dt><dd class="truncate text-right font-semibold"><?php echo esc_html( $order->get_payment_method_title() ); ?></dd></div>
							<div class="flex justify-between gap-3"><dt class="text-muted"><?php esc_html_e( 'Email', 'wp-panda' ); ?></dt><dd class="truncate text-right font-semibold"><?php echo esc_html( $order->get_billing_email() ); ?></dd></div>
						</dl>
						<div class="my-4 border-t border-dashed border-line"></div>
						<div class="flex items-end justify-between">
							<span class="text-sm text-muted"><?php esc_html_e( 'Оплачено', 'wp-panda' ); ?></span>
							<span class="text-2xl font-bold tabular-nums"><?php echo wp_kses_post( $order->get_formatted_order_total() ); ?></span>
						</div>
						<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-ink text-white hover:bg-ink-2 h-14 px-7 text-[15px] mt-5 w-full" href="<?php echo esc_url( wc_get_page_permalink( 'myaccount' ) ); ?>"><?php esc_html_e( 'В личный кабинет', 'wp-panda' ); ?><?php echo wpp_icon( 'arrow-right', 'h-4 w-4' ); ?></a>
					</div>
					<div class="rounded-card bg-brand-50 p-5 ring-1 ring-brand-100">
						<div class="flex items-center gap-2 font-semibold"><?php echo wpp_icon( 'gift', 'h-4 w-4 text-[#906500]' ); ?><?php esc_html_e( '−15% на следующий заказ', 'wp-panda' ); ?></div>
						<p class="mt-1 text-sm text-muted"><?php echo wp_kses_post( __( 'Промокод <b class="text-ink">WP2026</b> уже ждёт вас в личном кабинете.', 'wp-panda' ) ); ?></p>
					</div>
				</aside>
			</div>
			<?php endif; ?>
		<?php else : ?>
			<div class="mx-auto max-w-2xl text-center">
				<h1 class="text-4xl font-bold tracking-tight sm:text-5xl"><?php esc_html_e( 'Спасибо!', 'wp-panda' ); ?></h1>
			</div>
		<?php endif; ?>
	</div>
</div>
