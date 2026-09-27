<?php
/**
 * Cart contents. Uses WooCommerce cart/session/quantity APIs and keeps core hooks.
 *
 * @package WooCommerce\Templates
 * @version 11.2.0
 */
defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_cart' );
?>
<div class="cart-page mx-auto max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 lg:pb-20">
	<nav class="checkout-steps" aria-label="<?php esc_attr_e( 'Этапы заказа', 'wp-panda' ); ?>">
		<a class="checkout-step is-current" href="<?php echo esc_url( wc_get_cart_url() ); ?>"><span>1</span><?php esc_html_e( 'Корзина', 'wp-panda' ); ?></a>
		<span class="checkout-step__line" aria-hidden="true"></span>
		<span class="checkout-step"><span>2</span><?php esc_html_e( 'Данные', 'wp-panda' ); ?></span>
		<span class="checkout-step__line" aria-hidden="true"></span>
		<span class="checkout-step"><span>3</span><?php esc_html_e( 'Оплата', 'wp-panda' ); ?></span>
		<span class="checkout-step__line" aria-hidden="true"></span>
		<span class="checkout-step"><span>4</span><?php esc_html_e( 'Готово', 'wp-panda' ); ?></span>
	</nav>

	<?php if ( WC()->cart->is_empty() ) : ?>
		<?php wc_get_template( 'cart/cart-empty.php' ); ?>
	<?php else : ?>
		<header class="cart-page__heading">
			<p class="eyebrow"><?php esc_html_e( 'Финальный выбор', 'wp-panda' ); ?></p>
			<h1><?php esc_html_e( 'Ваша корзина', 'wp-panda' ); ?></h1>
			<p><?php esc_html_e( 'Проверьте состав заказа и переходите к оформлению.', 'wp-panda' ); ?></p>
		</header>

		<div class="cart-layout">
			<section class="cart-items" aria-label="<?php esc_attr_e( 'Товары в корзине', 'wp-panda' ); ?>">
				<form class="woocommerce-cart-form" action="<?php echo esc_url( wc_get_cart_url() ); ?>" method="post">
					<?php do_action( 'woocommerce_before_cart_table' ); ?>
					<table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents">
						<thead class="screen-reader-text">
							<tr>
								<th scope="col" class="product-remove"><?php esc_html_e( 'Удалить', 'woocommerce' ); ?></th>
								<th scope="col" class="product-thumbnail"><?php esc_html_e( 'Изображение', 'woocommerce' ); ?></th>
								<th scope="col" class="product-name"><?php esc_html_e( 'Товар', 'woocommerce' ); ?></th>
								<th scope="col" class="product-price"><?php esc_html_e( 'Цена', 'woocommerce' ); ?></th>
								<th scope="col" class="product-quantity"><?php esc_html_e( 'Количество', 'woocommerce' ); ?></th>
								<th scope="col" class="product-subtotal"><?php esc_html_e( 'Сумма', 'woocommerce' ); ?></th>
							</tr>
						</thead>
						<tbody>
							<?php do_action( 'woocommerce_before_cart_contents' ); ?>
							<?php foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) : ?>
								<?php
								$_product = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
								$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

								if ( ! is_a( $_product, 'WC_Product' ) || ! $_product->exists() || $cart_item['quantity'] <= 0 || ! apply_filters( 'woocommerce_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
									continue;
								}

								$cart_item_name = method_exists( WC()->cart, 'get_item_product_name' )
									? WC()->cart->get_item_product_name( $cart_item, $_product )
									: $_product->get_name();
								$product_name = apply_filters( 'woocommerce_cart_item_name', $cart_item_name, $cart_item, $cart_item_key );
								$product_permalink = apply_filters(
									'woocommerce_cart_item_permalink',
									$_product->is_visible() ? $_product->get_permalink( $cart_item ) : '',
									$cart_item,
									$cart_item_key
								);
								$thumbnail        = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image(), $cart_item, $cart_item_key );
								$product_price    = apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_price( $_product ), $cart_item, $cart_item_key );
								$product_subtotal = apply_filters( 'woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ), $cart_item, $cart_item_key );
								$product_sku      = $_product->get_sku();
								$row_class        = apply_filters( 'woocommerce_cart_item_class', 'cart_item', $cart_item, $cart_item_key );
								?>
								<tr class="woocommerce-cart-form__cart-item <?php echo esc_attr( $row_class ); ?>">
									<td class="product-remove" data-title="<?php esc_attr_e( 'Удалить', 'woocommerce' ); ?>">
										<?php
										$remove_link = sprintf(
											'<a role="button" href="%s" class="remove" aria-label="%s" data-product_id="%s" data-product_sku="%s">&times;</a>',
											esc_url( wc_get_cart_remove_url( $cart_item_key ) ),
											esc_attr( sprintf( __( 'Remove %s from cart', 'woocommerce' ), wp_strip_all_tags( $product_name ) ) ),
											esc_attr( $product_id ),
											esc_attr( $product_sku )
										);
										echo apply_filters( 'woocommerce_cart_item_remove_link', $remove_link, $cart_item_key ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
										?>
									</td>
									<td class="product-thumbnail" data-title="<?php esc_attr_e( 'Изображение', 'woocommerce' ); ?>">
										<?php if ( ! $product_permalink ) : ?>
											<?php echo wp_kses_post( $thumbnail ); ?>
										<?php else : ?>
											<a href="<?php echo esc_url( $product_permalink ); ?>"><?php echo wp_kses_post( $thumbnail ); ?></a>
										<?php endif; ?>
									</td>
									<td role="rowheader" class="product-name" data-title="<?php esc_attr_e( 'Товар', 'woocommerce' ); ?>">
										<?php if ( ! $product_permalink ) : ?>
											<?php echo wp_kses_post( $product_name . '&nbsp;' ); ?>
										<?php else : ?>
											<?php
											echo wp_kses_post(
													apply_filters(
														'woocommerce_cart_item_name',
														sprintf( '<a href="%s">%s</a>', esc_url( $product_permalink ), $cart_item_name ),
														$cart_item,
														$cart_item_key
													)
												);
											?>
										<?php endif; ?>
										<?php do_action( 'woocommerce_after_cart_item_name', $cart_item, $cart_item_key ); ?>
										<?php echo wp_kses_post( wc_get_formatted_cart_item_data( $cart_item, false, $cart_item_name ) ); ?>
										<?php if ( $_product->backorders_require_notification() && $_product->is_on_backorder( $cart_item['quantity'] ) ) : ?>
											<?php echo wp_kses_post( apply_filters( 'woocommerce_cart_item_backorder_notification', '<p class="backorder_notification">' . esc_html__( 'Available on backorder', 'woocommerce' ) . '</p>', $product_id ) ); ?>
										<?php endif; ?>
									</td>
									<td class="product-price" data-title="<?php esc_attr_e( 'Цена', 'woocommerce' ); ?>"><span class="wpp-cart-item__price"><?php echo wp_kses_post( $product_price ); ?></span></td>
									<td class="product-quantity" data-title="<?php esc_attr_e( 'Количество', 'woocommerce' ); ?>">
										<?php
										if ( $_product->is_sold_individually() ) {
											$min_quantity = 1;
											$max_quantity = 1;
										} else {
											$min_quantity = 0;
											$max_quantity = $_product->get_max_purchase_quantity();
										}

										$product_quantity = woocommerce_quantity_input(
											array(
												'input_name'   => "cart[{$cart_item_key}][qty]",
												'input_value'  => $cart_item['quantity'],
												'min_value'    => $min_quantity,
												'max_value'    => $max_quantity,
												'product_name' => $product_name,
											),
											$_product,
											false
										);
										echo apply_filters( 'woocommerce_cart_item_quantity', $product_quantity, $cart_item_key, $cart_item ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
										?>
									</td>
									<td class="product-subtotal" data-title="<?php esc_attr_e( 'Сумма', 'woocommerce' ); ?>"><strong><?php echo wp_kses_post( $product_subtotal ); ?></strong></td>
								</tr>
							<?php endforeach; ?>
							<?php do_action( 'woocommerce_cart_contents' ); ?>
							<tr class="wpp-cart-actions-row">
								<td colspan="6" class="actions">
									<div class="wpp-cart-actions">
										<?php if ( wc_coupons_enabled() ) : ?>
											<div class="coupon">
												<label for="coupon_code" class="screen-reader-text"><?php esc_html_e( 'Coupon:', 'woocommerce' ); ?></label>
												<input type="text" name="coupon_code" class="input-text" id="coupon_code" value="" placeholder="<?php esc_attr_e( 'Промокод', 'wp-panda' ); ?>">
												<button type="submit" class="button button--dark" name="apply_coupon" value="<?php esc_attr_e( 'Apply coupon', 'woocommerce' ); ?>"><?php esc_html_e( 'Применить', 'wp-panda' ); ?></button>
												<?php do_action( 'woocommerce_cart_coupon' ); ?>
											</div>
										<?php endif; ?>
										<button type="submit" class="button button--light" name="update_cart" value="<?php esc_attr_e( 'Update cart', 'woocommerce' ); ?>"><?php esc_html_e( 'Обновить корзину', 'wp-panda' ); ?></button>
										<?php do_action( 'woocommerce_cart_actions' ); ?>
										<?php wp_nonce_field( 'woocommerce-cart', 'woocommerce-cart-nonce' ); ?>
									</div>
								</td>
							</tr>
							<?php do_action( 'woocommerce_after_cart_contents' ); ?>
						</tbody>
					</table>
					<?php do_action( 'woocommerce_after_cart_table' ); ?>
				</form>
			</section>

			<aside class="cart-summary" aria-label="<?php esc_attr_e( 'Итог заказа', 'wp-panda' ); ?>">
				<?php do_action( 'woocommerce_before_cart_collaterals' ); ?>
				<div class="cart-summary__card">
					<h2><?php esc_html_e( 'Ваш заказ', 'wp-panda' ); ?></h2>
					<p class="cart-summary__note"><?php esc_html_e( 'Итоговая стоимость и доступные способы доставки.', 'wp-panda' ); ?></p>
					<div class="cart-collaterals">
						<?php do_action( 'woocommerce_cart_collaterals' ); ?>
					</div>
					<p class="cart-summary__trust"><?php esc_html_e( 'Безопасная оплата · мгновенный доступ к цифровым товарам', 'wp-panda' ); ?></p>
				</div>
			</aside>
		</div>
	<?php endif; ?>
</div>
<?php do_action( 'woocommerce_after_cart' ); ?>
