<?php
/**
 * Order summary aside shared by cart and checkout.
 * Args: cta_label, cta_url.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'WooCommerce' ) || ! WC()->cart ) {
	return;
}
$wpp_cart      = WC()->cart;
$wpp_count     = $wpp_cart->get_cart_contents_count();
$wpp_names     = array();
foreach ( $wpp_cart->get_cart() as $wpp_item ) {
	$wpp_prod = $wpp_item['data'];
	if ( $wpp_prod ) {
		$wpp_names[] = $wpp_prod->get_name();
	}
}
$wpp_title = $wpp_names ? $wpp_names[0] : '';
$wpp_more  = count( $wpp_names ) > 1 ? sprintf( _n( '+ ещё %s', '+ ещё %s', count( $wpp_names ) - 1, 'wp-panda' ), number_format_i18n( count( $wpp_names ) - 1 ) ) : '';
$wpp_cta_label = isset( $args['cta_label'] ) ? $args['cta_label'] : __( 'Перейти к оформлению', 'wp-panda' );
$wpp_cta_url   = isset( $args['cta_url'] ) ? $args['cta_url'] : wc_get_checkout_url();
?>
<aside class="lg:sticky lg:top-24">
	<div class="overflow-hidden rounded-card shadow-float ring-1 ring-black/5">
		<div class="dark-card px-6 pb-12 pt-6 text-white">
			<div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55"><?php esc_html_e( 'Ваш заказ', 'wp-panda' ); ?></div>
			<div class="mt-2 text-2xl font-bold tracking-tight"><?php echo esc_html( $wpp_title ); ?><?php if ( $wpp_more ) : ?><span class="text-white/60"> <?php echo esc_html( $wpp_more ); ?></span><?php endif; ?></div>
			<div class="text-sm text-white/60"><?php echo esc_html( sprintf( _n( '%s товар', '%s товара', $wpp_count, 'wp-panda' ), number_format_i18n( $wpp_count ) ) ); ?></div>
			<div class="mt-5 space-y-2.5 text-sm text-white/90">
				<div class="flex items-center gap-2.5"><?php echo wpp_icon( 'zap', 'h-4 w-4 text-brand' ); ?><?php esc_html_e( 'Мгновенная доставка ключей', 'wp-panda' ); ?></div>
				<div class="flex items-center gap-2.5"><?php echo wpp_icon( 'refresh-cw', 'h-4 w-4 text-brand' ); ?><?php esc_html_e( 'Автообновления из консоли WordPress', 'wp-panda' ); ?></div>
				<div class="flex items-center gap-2.5"><?php echo wpp_icon( 'shield-check', 'h-4 w-4 text-brand' ); ?><?php esc_html_e( 'Возврат в течение 14 дней', 'wp-panda' ); ?></div>
			</div>
		</div>
		<div class="relative -mt-6 rounded-t-card bg-white px-6 pb-6 pt-6">
			<div class="space-y-2.5 text-sm">
				<?php foreach ( $wpp_cart->get_cart() as $wpp_item ) :
					$wpp_prod = $wpp_item['data'];
					if ( ! $wpp_prod ) { continue; }
					$wpp_tier = '';
					if ( ! empty( $wpp_item['variation_id'] ) ) {
						$wpp_var = wc_get_product( $wpp_item['variation_id'] );
						if ( $wpp_var ) {
							$wpp_attrs = $wpp_var->get_attributes();
							$wpp_tier  = $wpp_attrs ? ' (' . reset( $wpp_attrs ) . ')' : '';
						}
					} else {
						$wpp_tier = ' (' . __( 'Навсегда', 'wp-panda' ) . ')';
					}
					?>
					<div class="flex justify-between gap-3">
						<span class="truncate text-muted"><?php echo esc_html( $wpp_prod->get_name() . $wpp_tier ); ?></span>
						<span class="font-semibold tabular-nums"><?php echo wpp_format_amount( (float) $wpp_prod->get_price() * (int) $wpp_item['quantity'] ); ?></span>
					</div>
				<?php endforeach; ?>
				<?php foreach ( $wpp_cart->get_coupons() as $wpp_code => $wpp_coupon ) : ?>
					<div class="flex justify-between gap-3">
						<span class="text-muted"><?php echo esc_html( sprintf( __( 'Промокод %s', 'wp-panda' ), $wpp_code ) ); ?></span>
						<span class="font-semibold tabular-nums text-emerald-600">−<?php echo wpp_format_amount( (float) $wpp_cart->get_coupon_discount_amount( $wpp_code ) ); ?></span>
					</div>
				<?php endforeach; ?>
				<div class="flex justify-between gap-3">
					<span class="text-muted"><?php esc_html_e( 'НДС', 'wp-panda' ); ?></span>
					<span class="font-semibold"><?php esc_html_e( 'не облагается', 'wp-panda' ); ?></span>
				</div>
			</div>
			<div class="my-5 border-t border-dashed border-line"></div>
			<div class="flex items-end justify-between gap-3">
				<div>
					<div class="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"><?php esc_html_e( 'Итого', 'wp-panda' ); ?></div>
					<div class="text-[11px] text-muted"><?php esc_html_e( 'Включая все налоги', 'wp-panda' ); ?></div>
				</div>
				<div class="text-[32px] font-bold leading-none tabular-nums"><?php echo wpp_format_amount( (float) $wpp_cart->get_total( 'edit' ) ); ?></div>
			</div>
			<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-brand text-ink hover:bg-brand-600 shadow-glow h-14 px-7 text-[15px] mt-6 w-full" href="<?php echo esc_url( $wpp_cta_url ); ?>" <?php echo isset( $args['cta_attrs'] ) ? $args['cta_attrs'] : ''; // phpcs:ignore WordPress.Security.EscapeOutput ?>><?php echo esc_html( $wpp_cta_label ); ?><?php echo wpp_icon( 'arrow-right', 'h-4 w-4' ); ?></a>
			<p class="mt-4 text-center text-[11px] leading-relaxed text-muted"><?php echo wp_kses_post( __( 'Нажимая кнопку, вы соглашаетесь с <span class="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-2">Условиями использования</span> и <span class="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-2">Политикой возврата</span>.', 'wp-panda' ) ); ?></p>
		</div>
	</div>
	<div class="mt-4 flex items-center justify-center gap-3 text-[11px] text-muted">
		<span class="flex items-center gap-1"><?php echo wpp_icon( 'lock', 'h-3 w-3' ); ?><?php esc_html_e( 'SSL-шифрование', 'wp-panda' ); ?></span>
		<span>·</span>
		<span>PCI DSS</span>
		<span>·</span>
		<span>3-D Secure</span>
	</div>
</aside>
