<?php
/**
 * Mini cart rendered inside the slide-over drawer, matching the layout.
 *
 * @package WpPanda
 * @version 7.0.1
 */

defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_mini_cart' );
?>
<div class="wpp-mini-cart flex h-full flex-col">
<?php if ( ! WC()->cart->is_empty() ) : ?>
	<div class="flex-1 overflow-y-auto px-5 pb-5 sm:px-6">
		<div class="space-y-3">
			<?php do_action( 'woocommerce_before_mini_cart_contents' ); ?>
			<?php foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) :
				$_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
				$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );
				if ( ! $_product || ! $_product->exists() || $cart_item['quantity'] <= 0 ) {
					continue;
				}
				$product_permalink = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
				$kind              = wpp_product_kind( $product_id );
				$version           = wpp_product_version( $_product );
				$meta_line         = ( 'theme' === $kind ? __( 'Тема', 'wp-panda' ) : ( 'plugin' === $kind ? __( 'Плагин', 'wp-panda' ) : __( 'Товар', 'wp-panda' ) ) ) . ( 'plugin' === $kind ? ' · ' . __( 'Навсегда', 'wp-panda' ) : '' ) . ( $version ? ' · v' . $version : '' );
				$variation_id      = isset( $cart_item['variation_id'] ) ? (int) $cart_item['variation_id'] : 0;
				$variation_label   = '';
				if ( $variation_id ) {
					$variation_label = wc_get_product( $variation_id )->get_attribute_summary() ? wc_get_product( $variation_id )->get_attribute_summary() : implode( ', ', $cart_item['variation'] );
				}
				?>
				<div class="rounded-2xl border border-line p-3 transition hover:border-ink/15">
					<div class="flex gap-3">
						<a class="w-[104px] flex-shrink-0 overflow-hidden rounded-xl" href="<?php echo esc_url( $product_permalink ); ?>">
							<?php
							$art = get_post_meta( $product_id, '_wpp_card_art', true );
							if ( $art ) {
								echo '<div class="relative aspect-[4/3] w-full overflow-hidden" style="container-type: inline-size;">' . wpp_kses_art( $art ) . '</div>';
							} else {
								echo wpp_product_mini_tile( $_product, 'h-full w-full rounded-xl' );
							}
							?>
						</a>
						<div class="min-w-0 flex-1">
							<div class="flex items-start justify-between gap-2">
								<div class="min-w-0">
									<div class="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted"><?php echo esc_html( $meta_line ); ?></div>
									<a class="block truncate text-left text-[15px] font-semibold leading-tight hover:underline" href="<?php echo esc_url( $product_permalink ); ?>"><?php echo esc_html( $_product->get_name() ); ?></a>
								</div>
								<button aria-label="<?php esc_attr_e( 'Удалить', 'wp-panda' ); ?>" data-cart-remove="<?php echo esc_attr( $cart_item_key ); ?>" class="-mr-1 -mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-rose-50 hover:text-rose-500">
									<?php echo wpp_icon( 'trash', 'h-4 w-4' ); ?>
								</button>
							</div>
							<p class="mt-1 line-clamp-2 text-xs leading-relaxed text-muted"><?php echo esc_html( wp_strip_all_tags( $_product->get_short_description() ) ); ?></p>
						</div>
					</div>
					<div class="mt-3 flex items-center justify-between gap-2">
						<?php if ( $_product->is_type( 'variable' ) && $_product->get_children() ) : ?>
							<div class="inline-flex rounded-full border border-line bg-soft p-0.5">
								<?php
								foreach ( $_product->get_children() as $child_id ) {
									$child   = wc_get_product( $child_id );
									$label   = $child->get_attribute_summary() ? $child->get_attribute_summary() : $child->get_name();
									$active  = $child_id === $variation_id;
									$title   = false !== strpos( $label, '5' ) ? __( 'Для компаний и веб-студий', 'wp-panda' ) : __( 'Для личного проекта или одного клиента', 'wp-panda' );
									echo '<button title="' . esc_attr( $title ) . '" data-cart-variation="' . esc_attr( $cart_item_key . '|' . $child_id ) . '" class="h-7 rounded-full px-3 text-[11px] font-semibold transition ' . ( $active ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink' ) . '">' . esc_html( $label ) . '</button>';
								}
								?>
							</div>
						<?php else : ?>
							<span class="rounded-full bg-soft px-3 py-1 text-[11px] font-semibold text-ink"><?php echo esc_html( $variation_label ? $variation_label : __( 'Лицензия навсегда', 'wp-panda' ) ); ?></span>
						<?php endif; ?>
						<div class="text-right leading-tight">
							<?php if ( $_product->get_regular_price() && (float) $_product->get_regular_price() > (float) $_product->get_price() ) : ?>
								<div class="text-[11px] text-muted line-through"><?php echo wpp_format_amount( (float) $_product->get_regular_price() * $cart_item['quantity'] ); ?></div>
							<?php endif; ?>
							<div class="font-bold tabular-nums"><?php echo wpp_format_amount( (float) $_product->get_price() * $cart_item['quantity'] ); ?></div>
						</div>
					</div>
				</div>
			<?php endforeach; ?>
			<?php do_action( 'woocommerce_mini_cart_contents' ); ?>
		</div>
		<?php
		$cross_sell = wpp_get_cross_sell();
		if ( $cross_sell ) :
			?>
			<div class="mt-4 rounded-2xl border border-dashed border-line p-3">
				<div class="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted"><?php echo esc_html( $cross_sell->is_type( 'variable' ) ? __( 'Тема WordPress', 'wp-panda' ) : __( 'Плагин навсегда', 'wp-panda' ) ); ?></div>
				<div class="flex items-center gap-3">
					<?php echo wpp_product_mini_tile( $cross_sell, 'h-12 w-12 rounded-xl' ); ?>
					<div class="min-w-0 flex-1">
						<div class="text-sm font-semibold"><?php echo esc_html( $cross_sell->get_name() ); ?></div>
						<div class="truncate text-xs text-muted"><?php echo esc_html( wp_strip_all_tags( $cross_sell->get_short_description() ) ); ?></div>
					</div>
					<button type="button" <?php echo $cross_sell->is_type( 'variable' ) ? 'onclick="window.location=\'' . esc_url( $cross_sell->get_permalink() ) . '\'"' : 'data-product_id="' . esc_attr( $cross_sell->get_id() ) . '" data-product_sku="' . esc_attr( $cross_sell->get_sku() ) . '" data-quantity="1"'; ?> class="inline-flex h-10 flex-shrink-0 items-center gap-1.5 rounded-full border border-line bg-white px-3.5 text-[13px] font-semibold transition hover:border-ink/20 <?php echo $cross_sell->is_type( 'variable' ) ? '' : 'add_to_cart_button product_type_simple'; ?>">
						<?php echo wpp_icon( 'plus', 'h-4 w-4' ); ?><?php echo wpp_format_amount( $cross_sell->get_price() ); ?>
					</button>
				</div>
			</div>
		<?php endif; ?>
		<div class="mt-4 pb-1">
			<form class="flex gap-2" data-coupon-form>
				<div class="flex h-11 flex-1 items-center gap-2 rounded-full border border-line bg-soft/70 px-4 transition focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
					<?php echo wpp_icon( 'ticket', 'h-4 w-4 text-muted' ); ?>
					<input placeholder="<?php esc_attr_e( 'Промокод', 'wp-panda' ); ?>" class="min-w-0 flex-1 bg-transparent text-sm uppercase outline-none placeholder:normal-case placeholder:text-muted/70" value="">
				</div>
				<button type="submit" class="inline-flex h-11 flex-shrink-0 items-center justify-center rounded-full border border-line bg-white px-5 text-sm font-semibold transition hover:border-ink/25"><?php esc_html_e( 'Применить', 'wp-panda' ); ?></button>
			</form>
			<div class="mt-2 hidden px-1 text-xs font-semibold text-emerald-600" data-coupon-message></div>
		</div>
	</div>
	<div class="border-t border-line px-5 pb-5 pt-4 sm:px-6">
		<div class="space-y-1.5 text-sm">
			<div class="flex justify-between">
				<span class="text-muted"><?php esc_html_e( 'Подытог', 'wp-panda' ); ?></span>
				<span class="font-semibold tabular-nums"><?php echo wpp_format_amount( WC()->cart->get_subtotal() ); ?></span>
			</div>
			<?php if ( WC()->cart->get_total_discount() > 0 ) : ?>
				<div class="flex justify-between">
					<span class="text-muted"><?php esc_html_e( 'Скидка', 'wp-panda' ); ?></span>
					<span class="font-semibold tabular-nums text-emerald-600">−<?php echo wpp_format_amount( WC()->cart->get_total_discount() ); ?></span>
				</div>
			<?php endif; ?>
			<?php foreach ( WC()->cart->get_fees() as $fee ) : ?>
				<div class="flex justify-between">
					<span class="text-muted"><?php echo esc_html( $fee->name ); ?></span>
					<span class="font-semibold tabular-nums"><?php echo wpp_format_amount( $fee->amount ); ?></span>
				</div>
			<?php endforeach; ?>
		</div>
		<div class="mt-3 flex items-end justify-between border-t border-dashed border-line pt-3">
			<div>
				<div class="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"><?php esc_html_e( 'Итого', 'wp-panda' ); ?></div>
				<div class="text-[11px] text-muted"><?php esc_html_e( 'НДС не облагается', 'wp-panda' ); ?></div>
			</div>
			<div class="text-[28px] font-bold leading-none tabular-nums"><?php echo wpp_format_amount( WC()->cart->get_total( 'edit' ) ); ?></div>
		</div>
		<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-brand text-ink hover:bg-brand-600 shadow-glow h-14 px-7 text-[15px] mt-5 w-full" href="<?php echo esc_url( wc_get_checkout_url() ); ?>">
			<?php esc_html_e( 'Оформить заказ', 'wp-panda' ); ?>
			<?php echo wpp_icon( 'arrow-right', 'h-4 w-4' ); ?>
		</a>
		<div class="mt-2 grid grid-cols-2 gap-2">
			<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-white text-ink border border-line hover:border-ink/25 shadow-[0_1px_2px_rgba(20,20,28,0.05)] h-11 px-5 text-sm" href="<?php echo esc_url( wc_get_cart_url() ); ?>"><?php esc_html_e( 'Корзина', 'wp-panda' ); ?></a>
			<button type="button" data-cart-close class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-white text-ink border border-line hover:border-ink/25 shadow-[0_1px_2px_rgba(20,20,28,0.05)] h-11 px-5 text-sm"><?php esc_html_e( 'Продолжить покупки', 'wp-panda' ); ?></button>
		</div>
		<div class="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-muted">
			<span class="flex items-center gap-1"><?php echo wpp_icon( 'lock', 'h-3 w-3' ); ?><?php esc_html_e( 'Безопасная оплата', 'wp-panda' ); ?></span>
			<span class="flex items-center gap-1"><?php echo wpp_icon( 'download', 'h-3 w-3' ); ?><?php esc_html_e( 'Мгновенно', 'wp-panda' ); ?></span>
			<span class="flex items-center gap-1"><?php echo wpp_icon( 'undo-2', 'h-3 w-3' ); ?><?php esc_html_e( 'Возврат 14 дней', 'wp-panda' ); ?></span>
		</div>
	</div>
<?php else : ?>
	<div class="flex flex-1 flex-col items-center justify-center px-8 pb-10 text-center">
		<div class="flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 ring-[10px] ring-brand-50/50">
			<?php echo wpp_icon( 'shopping-bag', 'h-10 w-10' ); ?>
		</div>
		<h3 class="mt-7 text-xl font-bold"><?php esc_html_e( 'Корзина пока пуста', 'wp-panda' ); ?></h3>
		<p class="mt-2 max-w-[280px] text-sm text-muted"><?php esc_html_e( 'Темы на 1 или 5 сайтов и плагины с пожизненной лицензией ждут вас в каталоге.', 'wp-panda' ); ?></p>
		<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-brand text-ink hover:bg-brand-600 shadow-glow h-14 px-7 text-[15px] mt-7" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) ); ?>">
			<?php esc_html_e( 'Перейти в каталог', 'wp-panda' ); ?>
			<?php echo wpp_icon( 'arrow-right', 'h-4 w-4' ); ?>
		</a>
	</div>
<?php endif; ?>
</div>
<?php do_action( 'woocommerce_after_mini_cart' ); ?>
