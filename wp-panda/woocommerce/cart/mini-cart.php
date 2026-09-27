<?php
/**
 * Reference-style off-canvas mini-cart with WooCommerce cart data and actions.
 *
 * @package WooCommerce\Templates
 * @version 11.2.0
 */
defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_mini_cart' );

$cart        = WC()->cart;
$count       = $cart ? $cart->get_cart_contents_count() : 0;
$threshold   = 15000;
$total_value = $cart ? (float) $cart->get_total( 'edit' ) : 0;
$remaining   = max( 0, $threshold - $total_value );
$progress    = min( 100, $threshold > 0 ? ( $total_value / $threshold ) * 100 : 0 );
$regular_subtotal = 0;
if ( $cart ) {
	foreach ( $cart->get_cart() as $price_item ) {
		if ( ! empty( $price_item['data'] ) && $price_item['data'] instanceof WC_Product ) {
			$regular_price = (float) $price_item['data']->get_regular_price();
			$regular_subtotal += wc_get_price_to_display( $price_item['data'], array( 'price' => $regular_price ?: (float) $price_item['data']->get_price() ) ) * $price_item['quantity'];
		}
	}
}
$sale_savings = $cart ? max( 0, $regular_subtotal - (float) $cart->get_subtotal() ) : 0;
$coupon_codes = $cart ? array_keys( $cart->get_coupons() ) : array();
$coupon_code  = $coupon_codes ? reset( $coupon_codes ) : '';
?>
<div class="wpp-mini-cart-shell">
	<header class="wpp-mini-cart-head">
		<div class="flex items-center gap-3"><span class="wpp-mini-cart-head__icon"><?php echo wpp_icon( 'cart', 'h-5 w-5' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span><span><strong><?php esc_html_e( 'Корзина', 'wp-panda' ); ?></strong><small><?php echo $count ? esc_html( sprintf( _n( '%d товар · мгновенная загрузка', '%d товара · мгновенная загрузка', $count, 'wp-panda' ), $count ) ) : esc_html__( 'Пока пусто', 'wp-panda' ); ?></small></span></div>
		<button type="button" class="wpp-mini-cart-close" data-cart-close aria-label="<?php esc_attr_e( 'Закрыть корзину', 'wp-panda' ); ?>"><?php echo wpp_icon( 'close', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></button>
	</header>

	<?php if ( $cart && ! $cart->is_empty() ) : ?>
		<div class="wpp-mini-cart-scroll">
			<div class="wpp-mini-cart-gift"><div class="flex items-center gap-2 text-[13px] font-medium"><span aria-hidden="true">♙</span><?php if ( $remaining > 0 ) : ?><span><?php esc_html_e( 'Ещё', 'wp-panda' ); ?> <b><?php echo wp_kses_post( wc_price( $remaining ) ); ?></b> — <?php esc_html_e( 'и премиум-плагин в подарок', 'wp-panda' ); ?></span><?php else : ?><span><b><?php esc_html_e( 'Подарок ваш!', 'wp-panda' ); ?></b> <?php esc_html_e( 'Бонусный плагин добавлен к заказу', 'wp-panda' ); ?></span><?php endif; ?></div><div class="wpp-mini-cart-gift__track"><i style="width:<?php echo esc_attr( $progress ); ?>%"></i></div></div>

			<ul class="woocommerce-mini-cart cart_list product_list_widget wpp-mini-cart <?php echo esc_attr( $args['list_class'] ); ?>">
				<?php do_action( 'woocommerce_before_mini_cart_contents' ); ?>
				<?php foreach ( $cart->get_cart() as $cart_item_key => $cart_item ) : ?>
					<?php
					$_product = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
					$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );
					if ( ! $_product instanceof WC_Product || ! $_product->exists() || $cart_item['quantity'] <= 0 || ! apply_filters( 'woocommerce_widget_cart_item_visible', true, $cart_item, $cart_item_key ) ) { continue; }
					$item_name = method_exists( $cart, 'get_item_product_name' ) ? $cart->get_item_product_name( $cart_item, $_product ) : $_product->get_name();
					$item_name = apply_filters( 'woocommerce_cart_item_name', $item_name, $cart_item, $cart_item_key );
					$thumbnail = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image( 'wpp-product-card' ), $cart_item, $cart_item_key );
					$permalink = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
					$is_theme  = has_term( 'wordpress-themes', 'product_cat', $product_id );
					$version   = $_product->get_attribute( 'Версия' );
					$regular   = (float) $_product->get_regular_price();
					$current   = (float) $_product->get_price();
					$license_variations = array();
					if ( $is_theme ) {
						$parent = wc_get_product( $product_id );
						if ( $parent instanceof WC_Product_Variable ) {
							foreach ( $parent->get_children() as $child_id ) {
								$child = wc_get_product( $child_id );
								if ( $child instanceof WC_Product_Variation && $child->is_purchasable() ) {
									$attributes = $child->get_variation_attributes();
									$license_variations[] = array( 'id' => $child_id, 'label' => $attributes ? (string) reset( $attributes ) : $child->get_name() );
								}
							}
						}
					}
					?>
					<li class="woocommerce-mini-cart-item wpp-mini-cart-item <?php echo esc_attr( apply_filters( 'woocommerce_mini_cart_item_class', 'mini_cart_item', $cart_item, $cart_item_key ) ); ?>">
						<div class="wpp-mini-cart-item__top"><a href="<?php echo esc_url( $permalink ); ?>" class="wpp-mini-cart-item__image"><?php echo wp_kses_post( $thumbnail ); ?></a><div class="min-w-0 flex-1"><div class="flex items-start justify-between gap-2"><div class="min-w-0"><div class="wpp-mini-cart-item__meta"><?php echo $is_theme ? esc_html__( 'Тема', 'wp-panda' ) : esc_html__( 'Плагин · Навсегда', 'wp-panda' ); ?><?php if ( $version ) : ?> · v<?php echo esc_html( $version ); ?><?php endif; ?></div><a href="<?php echo esc_url( $permalink ); ?>" class="wpp-mini-cart-item__name"><?php echo wp_kses_post( $item_name ); ?></a></div><?php echo apply_filters( 'woocommerce_cart_item_remove_link', sprintf( '<a role="button" href="%s" class="remove remove_from_cart_button" aria-label="%s" data-product_id="%s" data-cart_item_key="%s" data-product_sku="%s">%s</a>', esc_url( wc_get_cart_remove_url( $cart_item_key ) ), esc_attr( sprintf( __( 'Удалить %s', 'wp-panda' ), wp_strip_all_tags( $item_name ) ) ), esc_attr( $product_id ), esc_attr( $cart_item_key ), esc_attr( $_product->get_sku() ), wpp_icon( 'trash', 'h-4 w-4' ) ), $cart_item_key ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div><p><?php echo esc_html( wp_strip_all_tags( $_product->get_short_description() ) ); ?></p></div></div>
						<div class="wpp-mini-cart-item__bottom"><?php if ( $license_variations ) : ?><span class="wpp-mini-cart-license-switch" role="group" aria-label="<?php esc_attr_e( 'Лицензия', 'wp-panda' ); ?>"><?php foreach ( $license_variations as $license ) : ?><button type="button" class="<?php echo (int) $cart_item['variation_id'] === (int) $license['id'] ? 'is-active' : ''; ?>" data-cart-variation="<?php echo esc_attr( $license['id'] ); ?>" data-cart-item-key="<?php echo esc_attr( $cart_item_key ); ?>"><?php echo esc_html( $license['label'] ); ?></button><?php endforeach; ?></span><?php else : ?><span class="wpp-mini-cart-item__license"><?php esc_html_e( 'Лицензия навсегда', 'wp-panda' ); ?></span><?php endif; ?><span class="wpp-mini-cart-item__price"><?php if ( $regular > $current ) : ?><del><?php echo wp_kses_post( wc_price( $regular * $cart_item['quantity'] ) ); ?></del><?php endif; ?><strong><?php echo wp_kses_post( $cart->get_product_subtotal( $_product, $cart_item['quantity'] ) ); ?></strong></span></div>
					</li>
				<?php endforeach; ?>
				<?php do_action( 'woocommerce_mini_cart_contents' ); ?>
			</ul>

			<?php
			$cross_ids = array_slice( $cart->get_cross_sells(), 0, 1 );
			$upsells   = $cross_ids ? wc_get_products( array( 'include' => $cross_ids, 'status' => 'publish', 'limit' => 1 ) ) : array();
			$upsell    = $upsells ? reset( $upsells ) : false;
			if ( $upsell instanceof WC_Product ) : ?>
				<div class="wpp-mini-cart-upsell"><div class="wpp-mini-cart-upsell__label"><?php esc_html_e( 'Плагин навсегда', 'wp-panda' ); ?></div><div class="flex items-center gap-3"><span class="wpp-mini-cart-upsell__image"><?php echo wp_kses_post( $upsell->get_image( 'thumbnail' ) ); ?></span><span class="min-w-0 flex-1"><strong><?php echo esc_html( $upsell->get_name() ); ?></strong><small><?php echo esc_html( wp_strip_all_tags( $upsell->get_short_description() ) ); ?></small></span><a class="button button--brand<?php echo $upsell->is_type( 'simple' ) ? ' add_to_cart_button ajax_add_to_cart' : ''; ?>" href="<?php echo esc_url( $upsell->add_to_cart_url() ); ?>" data-product_id="<?php echo esc_attr( $upsell->get_id() ); ?>" data-quantity="1">+ <?php echo wp_kses_post( $upsell->get_price_html() ); ?></a></div></div>
			<?php endif; ?>

			<div class="wpp-mini-cart-coupon">
			<?php if ( $coupon_code ) : ?><div class="wpp-mini-cart-coupon__active"><strong><?php echo esc_html( strtoupper( $coupon_code ) ); ?></strong><span>−<?php echo wp_kses_post( wc_price( $cart->get_coupon_discount_amount( $coupon_code ) ) ); ?></span><a href="<?php echo esc_url( add_query_arg( 'remove_coupon', rawurlencode( $coupon_code ), wc_get_cart_url() ) ); ?>"><?php esc_html_e( 'Убрать', 'wp-panda' ); ?></a></div>
			<?php elseif ( wc_coupons_enabled() ) : ?><form action="<?php echo esc_url( wc_get_cart_url() ); ?>" method="post"><label class="screen-reader-text" for="mini_coupon_code"><?php esc_html_e( 'Промокод', 'wp-panda' ); ?></label><input id="mini_coupon_code" name="coupon_code" type="text" placeholder="<?php esc_attr_e( 'Промокод', 'wp-panda' ); ?>"><button class="button button--dark" type="submit" name="apply_coupon" value="1"><?php esc_html_e( 'Применить', 'wp-panda' ); ?></button><?php wp_nonce_field( 'woocommerce-cart', 'woocommerce-cart-nonce' ); ?></form><?php endif; ?>
			</div>
		</div>

		<footer class="wpp-mini-cart-footer">
			<?php do_action( 'woocommerce_widget_shopping_cart_before_buttons' ); ?>
			<div class="wpp-mini-cart-footer__rows"><span><?php esc_html_e( 'Подытог', 'wp-panda' ); ?></span><strong><?php echo wp_kses_post( wc_price( $regular_subtotal ) ); ?></strong><?php if ( $sale_savings > 0 ) : ?><span><?php esc_html_e( 'Скидка по акции', 'wp-panda' ); ?></span><strong class="discount">−<?php echo wp_kses_post( wc_price( $sale_savings ) ); ?></strong><?php endif; ?><?php if ( $cart->get_discount_total() > 0 ) : ?><span><?php esc_html_e( 'Промокод', 'wp-panda' ); ?></span><strong class="discount">−<?php echo wp_kses_post( wc_price( $cart->get_discount_total() ) ); ?></strong><?php endif; ?></div>
			<div class="wpp-mini-cart-total"><span><b><?php esc_html_e( 'Итого', 'wp-panda' ); ?></b><small><?php esc_html_e( 'НДС не облагается', 'wp-panda' ); ?></small></span><strong><?php echo wp_kses_post( $cart->get_total() ); ?></strong></div>
			<a class="button button--brand button--large wpp-mini-cart-checkout" href="<?php echo esc_url( wc_get_checkout_url() ); ?>"><?php esc_html_e( 'Оформить заказ', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
			<div class="wpp-mini-cart-footer__links"><a class="button button--light" href="<?php echo esc_url( wc_get_cart_url() ); ?>"><?php esc_html_e( 'Страница корзины', 'wp-panda' ); ?></a><button type="button" class="button button--ghost" data-cart-close><?php esc_html_e( 'Продолжить покупки', 'wp-panda' ); ?></button></div>
			<div class="wpp-mini-cart-trust"><span>♙ <?php esc_html_e( 'Безопасная оплата', 'wp-panda' ); ?></span><span>♨ <?php esc_html_e( 'Мгновенно', 'wp-panda' ); ?></span><span>↶ <?php esc_html_e( 'Возврат 14 дней', 'wp-panda' ); ?></span></div>
			<?php do_action( 'woocommerce_widget_shopping_cart_after_buttons' ); ?>
		</footer>
	<?php else : ?>
		<div class="wpp-mini-cart-empty"><span><?php echo wpp_icon( 'cart', 'h-10 w-10' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span><h3><?php esc_html_e( 'Корзина пока пуста', 'wp-panda' ); ?></h3><p><?php esc_html_e( 'Темы на 1 или 5 сайтов и плагины с пожизненной лицензией ждут вас в каталоге.', 'wp-panda' ); ?></p><a class="button button--brand button--large" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>"><?php esc_html_e( 'Перейти в каталог', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a></div>
	<?php endif; ?>
</div>
<?php do_action( 'woocommerce_after_mini_cart' ); ?>
