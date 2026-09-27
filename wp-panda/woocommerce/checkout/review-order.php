<?php
/** Dynamic order summary matching the reference checkout; totals remain WooCommerce-calculated. */
defined( 'ABSPATH' ) || exit;
?>
<table class="shop_table woocommerce-checkout-review-order-table wpp-checkout-order-table">
	<tbody>
		<?php do_action( 'woocommerce_review_order_before_cart_contents' ); ?>
		<?php foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) : ?>
			<?php
			$_product = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
			if ( ! $_product || ! $_product->exists() || $cart_item['quantity'] <= 0 || ! apply_filters( 'woocommerce_checkout_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
				continue;
			}
			$product_id = $cart_item['product_id'];
			$is_theme   = has_term( 'wordpress-themes', 'product_cat', $product_id );
			$name       = apply_filters( 'woocommerce_cart_item_name', $_product->get_name(), $cart_item, $cart_item_key );
			$permalink  = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
			$regular    = (float) $_product->get_regular_price();
			$current    = (float) $_product->get_price();
			$meta       = wc_get_formatted_cart_item_data( $cart_item );
			?>
			<tr class="cart_item">
				<td class="product-name">
					<div class="wpp-checkout-product">
						<?php if ( $permalink ) : ?><a class="wpp-checkout-product__image" href="<?php echo esc_url( $permalink ); ?>"><?php echo wp_kses_post( $_product->get_image( 'thumbnail' ) ); ?></a><?php else : ?><span class="wpp-checkout-product__image"><?php echo wp_kses_post( $_product->get_image( 'thumbnail' ) ); ?></span><?php endif; ?>
						<div class="wpp-checkout-product__body">
							<div class="wpp-checkout-product__meta"><?php echo $is_theme ? esc_html__( 'Тема', 'wp-panda' ) : esc_html__( 'Плагин', 'wp-panda' ); ?><?php $version = trim( wp_strip_all_tags( $_product->get_attribute( 'Версия' ) ) ); ?><?php if ( $version ) : ?> · v<?php echo esc_html( $version ); ?><?php endif; ?></div>
							<strong class="wpp-checkout-product__name"><?php if ( $permalink ) : ?><a href="<?php echo esc_url( $permalink ); ?>"><?php echo wp_kses_post( $name ); ?></a><?php else : ?><?php echo wp_kses_post( $name ); ?><?php endif; ?></strong>
							<?php if ( $_product->get_short_description() ) : ?><p class="wpp-checkout-product__description"><?php echo esc_html( wp_strip_all_tags( $_product->get_short_description() ) ); ?></p><?php endif; ?>
							<?php if ( $meta ) : ?><div class="wpp-checkout-product__variation"><?php echo wp_kses_post( $meta ); ?></div><?php endif; ?>
							<div class="wpp-checkout-product__bottom"><span class="wpp-checkout-product__license"><?php echo $is_theme ? esc_html__( 'Лицензия темы', 'wp-panda' ) : esc_html__( 'Лицензия навсегда', 'wp-panda' ); ?><?php if ( (int) $cart_item['quantity'] > 1 ) : ?> · <?php echo esc_html( sprintf( __( 'Количество: %s', 'wp-panda' ), number_format_i18n( $cart_item['quantity'] ) ) ); ?><?php endif; ?></span><span class="wpp-checkout-product__price"><?php if ( $regular > $current && $current > 0 ) : ?><del><?php echo wp_kses_post( wc_price( $regular * $cart_item['quantity'] ) ); ?></del><?php endif; ?><strong><?php echo wp_kses_post( WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ) ); ?></strong></span></div>
						</div>
						<a class="wpp-checkout-product__remove" href="<?php echo esc_url( wc_get_cart_remove_url( $cart_item_key ) ); ?>" aria-label="<?php echo esc_attr( sprintf( __( 'Удалить %s', 'wp-panda' ), wp_strip_all_tags( $name ) ) ); ?>">×</a>
					</div>
				</td>
			</tr>
		<?php endforeach; ?>
		<?php do_action( 'woocommerce_review_order_after_cart_contents' ); ?>
		<?php
		$in_cart_ids  = array_map( 'absint', wp_list_pluck( WC()->cart->get_cart(), 'product_id' ) );
		$cross_sell_ids = array_values( array_diff( array_map( 'absint', WC()->cart->get_cross_sells() ), $in_cart_ids ) );
		$cross_sell     = ! empty( $cross_sell_ids ) ? wc_get_product( reset( $cross_sell_ids ) ) : false;
		?>
		<?php if ( $cross_sell instanceof WC_Product && $cross_sell->is_purchasable() && $cross_sell->is_in_stock() ) : ?>
			<tr class="wpp-checkout-cross-sell-row"><td colspan="2"><div class="wpp-checkout-cross-sell"><small><?php esc_html_e( 'Рекомендуем', 'wp-panda' ); ?></small><div class="wpp-checkout-cross-sell__item"><span class="wpp-checkout-cross-sell__image"><?php echo wp_kses_post( $cross_sell->get_image( 'thumbnail' ) ); ?></span><span class="wpp-checkout-cross-sell__info"><b><?php echo esc_html( $cross_sell->get_name() ); ?></b><span><?php echo esc_html( wp_strip_all_tags( $cross_sell->get_short_description() ) ); ?></span></span><a class="button wpp-checkout-cross-sell__button<?php echo $cross_sell->is_type( 'simple' ) ? ' add_to_cart_button ajax_add_to_cart' : ''; ?>" href="<?php echo esc_url( $cross_sell->add_to_cart_url() ); ?>" data-product_id="<?php echo esc_attr( $cross_sell->get_id() ); ?>" data-quantity="1"><?php echo wp_kses_post( $cross_sell->get_price_html() ); ?></a></div></div></td></tr>
		<?php endif; ?>
		<?php if ( wc_coupons_enabled() ) : ?>
			<tr class="wpp-checkout-coupon-row"><td colspan="2"><div class="wpp-checkout-coupon"><label for="wpp-checkout-coupon-code"><?php esc_html_e( 'Промокод', 'wp-panda' ); ?></label><div class="wpp-checkout-coupon__form"><input id="wpp-checkout-coupon-code" type="text" class="input-text" placeholder="<?php esc_attr_e( 'Промокод', 'wp-panda' ); ?>" autocomplete="off"><button type="button" class="button" data-wpp-apply-coupon><?php esc_html_e( 'Применить', 'wp-panda' ); ?></button></div></div></td></tr>
		<?php endif; ?>
	</tbody>
	<tfoot>
		<tr class="cart-subtotal"><th><?php esc_html_e( 'Подытог', 'wp-panda' ); ?></th><td><?php wc_cart_totals_subtotal_html(); ?></td></tr>
		<?php foreach ( WC()->cart->get_coupons() as $coupon ) : ?>
			<tr class="cart-discount coupon-<?php echo esc_attr( sanitize_title( $coupon->get_code() ) ); ?>"><th><?php wc_cart_totals_coupon_label( $coupon ); ?></th><td><?php wc_cart_totals_coupon_html( $coupon ); ?></td></tr>
		<?php endforeach; ?>
		<?php if ( WC()->cart->needs_shipping() && WC()->cart->show_shipping() ) : ?>
			<?php do_action( 'woocommerce_review_order_before_shipping' ); ?>
			<?php wc_cart_totals_shipping_html(); ?>
			<?php do_action( 'woocommerce_review_order_after_shipping' ); ?>
		<?php endif; ?>
		<?php foreach ( WC()->cart->get_fees() as $fee ) : ?>
			<tr class="fee"><th><?php echo esc_html( $fee->name ); ?></th><td><?php wc_cart_totals_fee_html( $fee ); ?></td></tr>
		<?php endforeach; ?>
		<?php if ( wc_tax_enabled() && ! WC()->cart->display_prices_including_tax() ) : ?>
			<?php if ( 'itemized' === get_option( 'woocommerce_tax_total_display' ) ) : ?>
				<?php foreach ( WC()->cart->get_tax_totals() as $code => $tax ) : ?>
					<tr class="tax-rate tax-rate-<?php echo esc_attr( sanitize_title( $code ) ); ?>"><th><?php echo esc_html( $tax->label ); ?></th><td><?php echo wp_kses_post( $tax->formatted_amount ); ?></td></tr>
				<?php endforeach; ?>
			<?php else : ?>
				<tr class="tax-total"><th><?php echo esc_html( WC()->countries->tax_or_vat() ); ?></th><td><?php wc_cart_totals_taxes_total_html(); ?></td></tr>
			<?php endif; ?>
		<?php endif; ?>
		<?php do_action( 'woocommerce_review_order_before_order_total' ); ?>
		<tr class="order-total"><th><span><?php esc_html_e( 'Итого', 'wp-panda' ); ?></span><?php if ( ! WC()->cart->get_total_tax() ) : ?><small><?php esc_html_e( 'НДС не облагается', 'wp-panda' ); ?></small><?php endif; ?></th><td><?php wc_cart_totals_order_total_html(); ?></td></tr>
		<?php do_action( 'woocommerce_review_order_after_order_total' ); ?>
	</tfoot>
</table>
