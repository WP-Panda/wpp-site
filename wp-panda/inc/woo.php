<?php
/**
 * Интеграция с WooCommerce: корзина-шторка, фрагменты, мелкие хуки.
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* ------------------------------------------------------------------ */
/* Формат цены: 3 990 ₽                                                */
/* ------------------------------------------------------------------ */
function wpp_woocommerce_price_format() {
	return '%2$s';
}
add_filter( 'woocommerce_price_format', 'wpp_woocommerce_price_format' );

function wpp_woocommerce_currency_symbol( $symbol, $currency ) {
	if ( 'RUB' === $currency ) {
		return '₽';
	}
	return $symbol;
}
add_filter( 'woocommerce_currency_symbol', 'wpp_woocommerce_currency_symbol', 10, 2 );

/* ------------------------------------------------------------------ */
/* Убираем боковую панель каталога по умолчанию                        */
/* ------------------------------------------------------------------ */
remove_action( 'woocommerce_sidebar', 'woocommerce_get_sidebar', 10 );

/* ------------------------------------------------------------------ */
/* Шторка корзины: содержимое                                          */
/* ------------------------------------------------------------------ */

/**
 * HTML содержимого шторки (используется и в header.php, и во фрагментах).
 */
function wpp_cart_drawer_inner() {
	if ( ! wpp_has_woo() ) {
		return;
	}
	$cart  = WC()->cart;
	$total = $cart->get_displayed_subtotal();
	$goal  = 15000;
	$left  = max( 0, $goal - $total );
	$pct   = min( 100, ( $total / $goal ) * 100 );
	?>
	<div class="flex items-center justify-between gap-3 px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
		<div class="flex items-center gap-3">
			<span class="flex h-11 w-11 items-center justify-center rounded-full bg-brand shadow-glow"><?php wpp_icon( 'cart', 'h-5 w-5' ); ?></span>
			<div>
				<div class="text-xl font-bold tracking-tight"><?php esc_html_e( 'Корзина', 'wp-panda' ); ?></div>
				<div class="text-xs text-muted">
					<?php
					$count = $cart->get_cart_contents_count();
					echo esc_html( $count ? sprintf( _n( '%d товар · мгновенная загрузка', '%d товара · мгновенная загрузка', $count, 'wp-panda' ), $count ) : __( 'Пока пусто', 'wp-panda' ) );
					?>
				</div>
			</div>
		</div>
		<button type="button" data-cart-close aria-label="<?php esc_attr_e( 'Закрыть корзину', 'wp-panda' ); ?>" class="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white transition hover:border-ink/20">
			<?php wpp_icon( 'x', 'h-4 w-4' ); ?>
		</button>
	</div>

	<?php if ( $cart->is_empty() ) : ?>
		<div class="flex flex-1 flex-col items-center justify-center px-8 pb-10 text-center">
			<div class="flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 ring-[10px] ring-brand-50/50"><?php wpp_icon( 'cart', 'h-10 w-10' ); ?></div>
			<h3 class="mt-7 text-xl font-bold"><?php esc_html_e( 'Корзина пока пуста', 'wp-panda' ); ?></h3>
			<p class="mt-2 max-w-[280px] text-sm text-muted"><?php esc_html_e( 'Темы на 1 или 5 сайтов и плагины с пожизненной лицензией ждут вас в каталоге.', 'wp-panda' ); ?></p>
			<a class="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand px-7 text-[15px] font-semibold text-ink shadow-glow transition hover:bg-brand-600" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>">
				<?php esc_html_e( 'Перейти в каталог', 'wp-panda' ); ?> <?php wpp_icon( 'arrow-right', 'h-4 w-4' ); ?>
			</a>
		</div>
	<?php else : ?>
		<div class="flex-1 overflow-y-auto px-5 sm:px-6">
			<div class="mt-4 space-y-3">
				<?php foreach ( $cart->get_cart() as $cart_item_key => $item ) : ?>
					<?php
					$product = $item['data'];
					$d       = wpp_product_data( $product );
					if ( ! $d ) {
						continue;
					}
					?>
					<div class="rounded-2xl border border-line p-3 transition hover:border-ink/15">
						<div class="flex gap-3">
							<a href="<?php echo esc_url( $d['link'] ); ?>" class="w-[104px] flex-shrink-0 overflow-hidden rounded-xl"><?php wpp_product_media( $d ); ?></a>
							<div class="min-w-0 flex-1">
								<div class="flex items-start justify-between gap-2">
									<div class="min-w-0">
										<div class="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted"><?php echo 'theme' === $d['type'] ? esc_html__( 'Тема', 'wp-panda' ) : esc_html__( 'Плагин · Навсегда', 'wp-panda' ); ?> · v<?php echo esc_html( $d['version'] ); ?></div>
										<a href="<?php echo esc_url( $d['link'] ); ?>" class="block truncate text-left text-[15px] font-semibold leading-tight hover:underline"><?php echo esc_html( $d['name'] ); ?></a>
									</div>
									<a href="<?php echo esc_url( wc_get_cart_remove_url( $cart_item_key ) ); ?>" aria-label="<?php esc_attr_e( 'Удалить', 'wp-panda' ); ?>" class="-mr-1 -mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-rose-50 hover:text-rose-500">
										<?php wpp_icon( 'trash', 'h-4 w-4' ); ?>
									</a>
								</div>
								<p class="mt-1 line-clamp-2 text-xs leading-relaxed text-muted"><?php echo esc_html( $d['tagline'] ); ?></p>
							</div>
						</div>
						<div class="mt-3 flex items-center justify-between gap-2">
							<?php if ( $item['quantity'] > 1 ) : ?>
								<span class="rounded-full bg-soft px-3 py-1 text-[11px] font-semibold text-ink">× <?php echo esc_html( $item['quantity'] ); ?></span>
							<?php else : ?>
								<span class="rounded-full bg-soft px-3 py-1 text-[11px] font-semibold text-ink"><?php echo 'plugin' === $d['type'] ? esc_html__( 'Лицензия навсегда', 'wp-panda' ) : esc_html__( '1 сайт', 'wp-panda' ); ?></span>
							<?php endif; ?>
							<div class="text-right leading-tight">
								<?php if ( $product->is_on_sale() && $product->get_regular_price() ) : ?>
									<div class="text-[11px] text-muted line-through"><?php echo wp_kses_post( wc_price( $product->get_regular_price() ) ); ?></div>
								<?php endif; ?>
								<div class="font-bold tabular-nums"><?php echo wp_kses_post( wc_price( $product->get_price() * $item['quantity'] ) ); ?></div>
							</div>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
		</div>

		<div class="border-t border-line px-5 pb-5 pt-4 sm:px-6">
			<div class="space-y-1.5 text-sm">
				<div class="flex justify-between">
					<span class="text-muted"><?php esc_html_e( 'Подытог', 'wp-panda' ); ?></span>
					<span class="font-semibold tabular-nums"><?php echo wp_kses_post( $cart->get_cart_subtotal() ); ?></span>
				</div>
			</div>
			<div class="mt-3 flex items-end justify-between border-t border-dashed border-line pt-3">
				<div>
					<div class="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"><?php esc_html_e( 'Итого', 'wp-panda' ); ?></div>
					<div class="text-[11px] text-muted"><?php esc_html_e( 'НДС не облагается', 'wp-panda' ); ?></div>
				</div>
				<div class="text-[28px] font-bold leading-none tabular-nums"><?php echo wp_kses_post( $cart->get_cart_total() ); ?></div>
			</div>
			<a class="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand text-[15px] font-semibold text-ink shadow-glow transition hover:bg-brand-600" href="<?php echo esc_url( wc_get_checkout_url() ); ?>">
				<?php esc_html_e( 'Оформить заказ', 'wp-panda' ); ?> <?php wpp_icon( 'arrow-right', 'h-3.5 w-3.5' ); ?>
			</a>
			<div class="mt-2 grid grid-cols-2 gap-2">
				<a class="flex h-9 items-center justify-center rounded-full border border-line bg-soft px-4 text-[13px] font-semibold text-ink transition hover:bg-[#EEEEF2]" href="<?php echo esc_url( wc_get_cart_url() ); ?>"><?php esc_html_e( 'Страница корзины', 'wp-panda' ); ?></a>
				<button type="button" data-cart-close class="flex h-9 items-center justify-center rounded-full px-4 text-[13px] font-semibold text-ink transition hover:bg-soft"><?php esc_html_e( 'Продолжить покупки', 'wp-panda' ); ?></button>
			</div>
		</div>
	<?php endif; ?>
	<?php
}

/* ------------------------------------------------------------------ */
/* WooCommerce AJAX-фрагменты: бейдж и шторка                          */
/* ------------------------------------------------------------------ */
function wpp_woocommerce_add_to_cart_fragments( $fragments ) {
	ob_start();
	?>
	<div class="wpp-cart-drawer-contents" data-cart-fragment>
		<?php wpp_cart_drawer_inner(); ?>
	</div>
	<?php
	$fragments['.wpp-cart-drawer-contents'] = ob_get_clean();

	ob_start();
	?>
	<span class="wpp-cart-count" data-cart-count><?php echo esc_html( WC()->cart->get_cart_contents_count() ); ?></span>
	<?php
	$fragments['.wpp-cart-count'] = ob_get_clean();

	return $fragments;
}
add_filter( 'woocommerce_add_to_cart_fragments', 'wpp_woocommerce_add_to_cart_fragments' );

/* ------------------------------------------------------------------ */
/* Каталог: карточки темы вместо дефолтных                             */
/* ------------------------------------------------------------------ */
remove_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 10 );
remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_show_product_loop_sale_flash', 10 );
remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail', 10 );
remove_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title', 10 );
remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_rating', 5 );
remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10 );
remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );
/* Карточку цикла целиком переопределяет шаблон woocommerce/content-product.php. */

/* ------------------------------------------------------------------ */
/* Кнопка «В корзину» в стиле темы (переопределение шаблона ниже)      */
/* ------------------------------------------------------------------ */

/** Свой класс для AJAX-кнопок. */
function wpp_add_to_cart_class( $class ) {
	$class .= ' h-9 px-4 text-[13px]';
	return $class;
}
add_filter( 'woocommerce_loop_add_to_cart_class', 'wpp_add_to_cart_class' );
