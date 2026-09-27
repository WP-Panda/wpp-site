<?php
/**
 * Cart matching the supplied checkout-cart layout while retaining WooCommerce
 * cart, coupon, quantity and nonce handling.
 *
 * @package WooCommerce\Templates
 * @version 11.2.0
 */
defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_cart' );
$count       = WC()->cart ? WC()->cart->get_cart_contents_count() : 0;
$cart_items  = WC()->cart ? WC()->cart->get_cart() : array();
$first_item  = $cart_items ? reset( $cart_items ) : array();
$first_name  = ! empty( $first_item['data'] ) && $first_item['data'] instanceof WC_Product ? $first_item['data']->get_name() : '';
$cross_ids   = WC()->cart ? array_slice( WC()->cart->get_cross_sells(), 0, 3 ) : array();
$cross_sells = $cross_ids ? wc_get_products( array( 'include' => $cross_ids, 'status' => 'publish', 'limit' => 3 ) ) : array();
$has_adjustable_quantities = false;
foreach ( $cart_items as $candidate_item ) {
	if ( ! empty( $candidate_item['data'] ) && $candidate_item['data'] instanceof WC_Product && ! $candidate_item['data']->is_sold_individually() ) {
		$has_adjustable_quantities = true;
		break;
	}
}
?>
<div class="fade-in mx-auto max-w-[1200px] px-4 pb-32 pt-4 sm:px-6 lg:pb-8">
	<div class="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
		<nav class="wpp-checkout-progress flex min-w-max items-center gap-1 rounded-full border border-line bg-white p-1.5 shadow-card sm:min-w-0" aria-label="<?php esc_attr_e( 'Этапы заказа', 'wp-panda' ); ?>">
			<div class="wpp-checkout-progress__step is-current"><span>1</span><span><b><?php esc_html_e( 'Корзина', 'wp-panda' ); ?></b><small><?php echo $count ? esc_html( sprintf( _n( '%d товар', '%d товаров', $count, 'wp-panda' ), $count ) ) : esc_html__( 'Пусто', 'wp-panda' ); ?></small></span></div><i></i>
			<div class="wpp-checkout-progress__step"><span>2</span><span><b><?php esc_html_e( 'Данные', 'wp-panda' ); ?></b><small><?php esc_html_e( 'Не заполнено', 'wp-panda' ); ?></small></span></div><i></i>
			<div class="wpp-checkout-progress__step"><span>3</span><span><b><?php esc_html_e( 'Оплата', 'wp-panda' ); ?></b><small><?php esc_html_e( 'Не выбрано', 'wp-panda' ); ?></small></span></div><i></i>
			<div class="wpp-checkout-progress__step"><span>4</span><span><b><?php esc_html_e( 'Готово', 'wp-panda' ); ?></b><small><?php esc_html_e( 'Финальный шаг', 'wp-panda' ); ?></small></span></div>
		</nav>
	</div>

	<?php if ( WC()->cart->is_empty() ) : ?>
		<?php wc_get_template( 'cart/cart-empty.php' ); ?>
	<?php else : ?>
		<header class="fade-up mt-10 text-center sm:mt-12"><h1 class="text-4xl font-bold tracking-tight sm:text-5xl"><?php esc_html_e( 'Ваша корзина', 'wp-panda' ); ?></h1><p class="mx-auto mt-3 max-w-xl text-muted"><?php esc_html_e( 'Проверьте состав заказа. Для тем выберите 1 или 5 сайтов, плагины предоставляются навсегда.', 'wp-panda' ); ?></p></header>

		<div class="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_370px]">
			<div class="fade-up min-w-0 space-y-5">
				<form class="woocommerce-cart-form wpp-cart-sections" action="<?php echo esc_url( wc_get_cart_url() ); ?>" method="post">
					<?php do_action( 'woocommerce_before_cart_table' ); ?>
					<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7" aria-labelledby="wpp-cart-products-heading">
						<header class="mb-5 flex flex-wrap items-center justify-between gap-3"><div class="flex items-center gap-3"><span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100">1</span><h2 id="wpp-cart-products-heading" class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Товары в заказе', 'wp-panda' ); ?></h2></div><span class="text-sm text-muted"><?php echo esc_html( sprintf( _n( '%d товар', '%d товаров', $count, 'wp-panda' ), $count ) ); ?></span></header>
						<?php do_action( 'woocommerce_before_cart_contents' ); ?>
						<div class="space-y-3">
						<?php foreach ( $cart_items as $cart_item_key => $cart_item ) : ?>
							<?php
							$_product = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
							$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );
							if ( ! $_product instanceof WC_Product || ! $_product->exists() || $cart_item['quantity'] <= 0 || ! apply_filters( 'woocommerce_cart_item_visible', true, $cart_item, $cart_item_key ) ) { continue; }
							$name = method_exists( WC()->cart, 'get_item_product_name' ) ? WC()->cart->get_item_product_name( $cart_item, $_product ) : $_product->get_name();
							$name = apply_filters( 'woocommerce_cart_item_name', $name, $cart_item, $cart_item_key );
							$url = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
							$image = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image( 'wpp-product-card' ), $cart_item, $cart_item_key );
							$is_theme = has_term( 'wordpress-themes', 'product_cat', $product_id );
							$version = $_product->get_attribute( 'Версия' );
							?>
							<article class="wpp-cart-product rounded-2xl border border-line p-3 sm:p-4">
								<div class="flex gap-4"><a href="<?php echo esc_url( $url ); ?>" class="w-28 flex-shrink-0 overflow-hidden rounded-xl sm:w-40"><?php echo wp_kses_post( $image ); ?></a><div class="min-w-0 flex-1"><div class="flex items-start justify-between gap-3"><div class="min-w-0"><div class="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted"><?php echo $is_theme ? esc_html__( 'Тема', 'wp-panda' ) : esc_html__( 'Плагин · Навсегда', 'wp-panda' ); ?><?php if ( $version ) : ?> · v<?php echo esc_html( $version ); ?><?php endif; ?></div><h3 class="text-lg font-semibold tracking-tight"><a href="<?php echo esc_url( $url ); ?>"><?php echo wp_kses_post( $name ); ?></a></h3><p class="line-clamp-2 text-[13px] text-muted"><?php echo esc_html( wp_strip_all_tags( $_product->get_short_description() ) ); ?></p></div><a href="<?php echo esc_url( wc_get_cart_remove_url( $cart_item_key ) ); ?>" class="remove flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-rose-50 hover:text-rose-500" aria-label="<?php echo esc_attr( sprintf( __( 'Удалить %s', 'wp-panda' ), wp_strip_all_tags( $name ) ) ); ?>" data-product_id="<?php echo esc_attr( $product_id ); ?>" data-product_sku="<?php echo esc_attr( $_product->get_sku() ); ?>">×</a></div></div></div>
								<div class="mt-4">
									<?php if ( $is_theme ) : ?><div class="wpp-cart-license rounded-xl border border-brand bg-brand-50/60 p-3 ring-1 ring-brand"><div class="flex items-center justify-between gap-3"><div><strong><?php echo esc_html( wp_strip_all_tags( wc_get_formatted_cart_item_data( $cart_item, true ) ) ?: __( 'Лицензия темы', 'wp-panda' ) ); ?></strong><small><?php esc_html_e( 'Выбранный вариант лицензии', 'wp-panda' ); ?></small></div><b><?php echo wp_kses_post( WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ) ); ?></b></div></div><?php else : ?><div class="flex items-center justify-between rounded-xl bg-soft px-4 py-3"><span class="flex items-center gap-2 text-sm font-semibold text-ink"><b class="text-emerald-600">✓</b><?php esc_html_e( 'Лицензия навсегда (все будущие обновления включены)', 'wp-panda' ); ?></span><strong><?php echo wp_kses_post( WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ) ); ?></strong></div><?php endif; ?>
									<?php if ( $_product->is_sold_individually() ) : ?><input type="hidden" name="cart[<?php echo esc_attr( $cart_item_key ); ?>][qty]" value="1"><?php else : ?><div class="wpp-cart-product__controls"><span><?php esc_html_e( 'Количество', 'wp-panda' ); ?></span><?php echo woocommerce_quantity_input( array( 'input_name' => "cart[{$cart_item_key}][qty]", 'input_value' => $cart_item['quantity'], 'min_value' => 0, 'max_value' => $_product->get_max_purchase_quantity(), 'product_name' => $name ), $_product, false ); ?></div><?php endif; ?>
								</div>
							</article>
						<?php endforeach; ?>
						</div>
						<?php do_action( 'woocommerce_cart_contents' ); ?><?php do_action( 'woocommerce_after_cart_contents' ); ?>
					</section>

					<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7">
						<header class="mb-5 flex flex-wrap items-center justify-between gap-3"><div class="flex items-center gap-3"><span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100">2</span><h2 class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Промокод', 'wp-panda' ); ?></h2></div><span class="text-xs text-muted"><?php esc_html_e( 'Попробуйте', 'wp-panda' ); ?> <b class="text-ink">WELCOME30</b></span></header>
						<?php if ( wc_coupons_enabled() ) : ?>
							<?php if ( WC()->cart->get_coupons() ) : $active_code = array_key_first( WC()->cart->get_coupons() ); ?><div class="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-brand bg-brand-50 px-4 py-3.5"><span><strong class="block text-sm"><?php echo esc_html( strtoupper( $active_code ) ); ?> <?php esc_html_e( 'применён', 'wp-panda' ); ?></strong><small class="block text-xs text-muted"><?php esc_html_e( 'Скидка', 'wp-panda' ); ?> · −<?php echo wp_kses_post( wc_price( WC()->cart->get_coupon_discount_amount( $active_code ) ) ); ?></small></span><a href="<?php echo esc_url( add_query_arg( 'remove_coupon', rawurlencode( $active_code ), wc_get_cart_url() ) ); ?>" class="text-xs font-semibold text-muted hover:text-ink"><?php esc_html_e( 'Убрать', 'wp-panda' ); ?></a></div>
							<?php else : ?><div class="flex flex-col gap-2 sm:flex-row sm:items-start"><label for="coupon_code" class="screen-reader-text"><?php esc_html_e( 'Промокод', 'wp-panda' ); ?></label><input type="text" name="coupon_code" class="input-text flex-1" id="coupon_code" value="" placeholder="<?php esc_attr_e( 'Введите промокод', 'wp-panda' ); ?>"><button type="submit" class="button button--dark h-12 px-6" name="apply_coupon" value="<?php esc_attr_e( 'Apply coupon', 'woocommerce' ); ?>"><?php esc_html_e( 'Применить', 'wp-panda' ); ?></button><?php do_action( 'woocommerce_cart_coupon' ); ?></div><?php endif; ?>
						<?php endif; ?>
						<?php if ( $has_adjustable_quantities ) : ?><div class="mt-4 flex justify-end"><button type="submit" class="button button--light" name="update_cart" value="<?php esc_attr_e( 'Update cart', 'woocommerce' ); ?>"><?php esc_html_e( 'Обновить корзину', 'wp-panda' ); ?></button></div><?php endif; ?>
						<?php do_action( 'woocommerce_cart_actions' ); ?><?php wp_nonce_field( 'woocommerce-cart', 'woocommerce-cart-nonce' ); ?>
					</section>
				</form>
				<?php do_action( 'woocommerce_after_cart_table' ); ?>

				<?php if ( $cross_sells ) : ?><section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7"><header class="mb-5 flex flex-wrap items-center justify-between gap-3"><div class="flex items-center gap-3"><span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100">3</span><h2 class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Плагины с лицензией навсегда', 'wp-panda' ); ?></h2></div><span class="text-xs text-muted"><?php esc_html_e( 'Добавьте в один клик', 'wp-panda' ); ?></span></header><div class="grid gap-3 sm:grid-cols-3"><?php foreach ( $cross_sells as $cross_sell ) : ?><article class="flex flex-col rounded-2xl border border-line p-2.5"><a href="<?php echo esc_url( $cross_sell->get_permalink() ); ?>" class="overflow-hidden rounded-xl"><?php echo wp_kses_post( $cross_sell->get_image( 'wpp-product-card' ) ); ?></a><div class="flex flex-1 flex-col px-1 pb-1 pt-3"><strong class="text-sm"><?php echo esc_html( $cross_sell->get_name() ); ?></strong><p class="mt-0.5 line-clamp-2 text-xs text-muted"><?php echo esc_html( wp_strip_all_tags( $cross_sell->get_short_description() ) ); ?></p><div class="mt-auto flex items-center justify-between gap-2 pt-3"><span class="text-sm font-bold"><?php echo wp_kses_post( $cross_sell->get_price_html() ); ?></span><a class="button button--brand" href="<?php echo esc_url( $cross_sell->add_to_cart_url() ); ?>"><?php esc_html_e( 'Добавить', 'wp-panda' ); ?></a></div></div></article><?php endforeach; ?></div></section><?php endif; ?>
			</div>

			<aside class="lg:sticky lg:top-24" aria-label="<?php esc_attr_e( 'Итог заказа', 'wp-panda' ); ?>">
				<div class="wpp-order-summary overflow-hidden rounded-card shadow-float ring-1 ring-black/5">
					<div class="dark-card px-6 pb-12 pt-6 text-white"><div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55"><?php esc_html_e( 'Ваш заказ', 'wp-panda' ); ?></div><div class="mt-2 text-2xl font-bold tracking-tight"><?php echo esc_html( $first_name ); ?><?php if ( count( $cart_items ) > 1 ) : ?> <span class="text-white/60">+ <?php printf( esc_html__( 'ещё %d', 'wp-panda' ), count( $cart_items ) - 1 ); ?></span><?php endif; ?></div><div class="text-sm text-white/60"><?php echo esc_html( sprintf( _n( '%d товар', '%d товаров', $count, 'wp-panda' ), $count ) ); ?></div><ul class="mt-5 space-y-2.5 text-sm text-white/90"><li><b>⚡</b> <?php esc_html_e( 'Мгновенная доставка ключей', 'wp-panda' ); ?></li><li><b>↻</b> <?php esc_html_e( 'Автообновления из консоли WordPress', 'wp-panda' ); ?></li><li><b>◇</b> <?php esc_html_e( 'Возврат в течение 14 дней', 'wp-panda' ); ?></li></ul></div>
					<div class="relative -mt-6 rounded-t-card bg-white px-6 pb-6 pt-6"><?php do_action( 'woocommerce_before_cart_collaterals' ); ?><div class="cart-collaterals"><?php wc_get_template( 'cart/cart-totals.php' ); ?></div><p class="mt-4 text-center text-[11px] leading-relaxed text-muted"><?php esc_html_e( 'Нажимая кнопку, вы соглашаетесь с Условиями использования и Политикой возврата.', 'wp-panda' ); ?></p></div>
				</div>
				<div class="mt-4 flex items-center justify-center gap-3 text-[11px] text-muted"><span>⌾ <?php esc_html_e( 'SSL-шифрование', 'wp-panda' ); ?></span><span>·</span><span>PCI DSS</span><span>·</span><span>3-D Secure</span></div>
			</aside>
		</div>
		<div class="wpp-cart-mobile-bar lg:hidden"><div><small><?php esc_html_e( 'Итого к оплате', 'wp-panda' ); ?></small><strong><?php wc_cart_totals_order_total_html(); ?></strong></div><a class="button button--brand" href="<?php echo esc_url( wc_get_checkout_url() ); ?>"><?php esc_html_e( 'Далее', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a></div>
	<?php endif; ?>
</div>
<?php do_action( 'woocommerce_after_cart' ); ?>
