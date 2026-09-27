<?php
/**
 * Интеграция WooCommerce — только хуки и фильтры.
 *
 * Никаких переопределений шаблонов: вся фирменная вёрстка магазина
 * (каталог, карточка товара, корзина-шторка, кабинет) подключается здесь,
 * чтобы настройки переживали обновления темы и дружили с дочерними темами.
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* ================================================================== */
/* Валюта и формат цены                                                */
/* ================================================================== */

add_filter( 'woocommerce_price_format', function () {
	return '%2$s';
} );

add_filter( 'woocommerce_currency_symbol', function ( $symbol, $currency ) {
	return 'RUB' === $currency ? '₽' : $symbol;
}, 10, 2 );

/* ================================================================== */
/* Обёртки страниц и крошки                                            */
/* ================================================================== */

// Дефолтные обёртки не нужны — контент уже внутри woocommerce.php.
remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10 );
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_end', 10 );
remove_action( 'woocommerce_sidebar', 'woocommerce_get_sidebar', 10 );

// Крошки в стиле темы.
add_filter( 'woocommerce_breadcrumb_defaults', function ( $defaults ) {
	$defaults['delimiter']   = '<span class="mx-0.5 text-line">/</span>';
	$defaults['wrap_before'] = '<nav class="flex flex-wrap items-center gap-1.5 text-xs text-muted woocommerce-breadcrumb" aria-label="' . esc_attr__( 'Хлебные крошки', 'wp-panda' ) . '">';
	$defaults['wrap_after']  = '</nav>';
	$defaults['before']      = '';
	$defaults['after']       = '';
	$defaults['home']        = __( 'Главная', 'wp-panda' );
	return $defaults;
} );

/* ================================================================== */
/* Каталог: заголовок и шапка списка                                   */
/* ================================================================== */

// Свой блок заголовка категории/магазина.
add_filter( 'woocommerce_show_page_title', '__return_false' );

remove_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 20 );
remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );

/**
 * Шапка каталога: eyebrow, заголовок, описание, счётчик и сортировка.
 */
function wpp_shop_header() {
	?>
	<div class="mt-6 flex flex-wrap items-end justify-between gap-4">
		<div>
			<p class="text-xs text-muted"><?php esc_html_e( 'Витрина Wp Panda', 'wp-panda' ); ?></p>
			<h1 class="mt-1 text-3xl font-bold tracking-tight text-ink woocommerce-products-header__title page-title"><?php woocommerce_page_title(); ?></h1>
			<?php do_action( 'woocommerce_archive_description' ); ?>
		</div>
		<div class="flex flex-wrap items-center gap-3">
			<?php woocommerce_result_count(); ?>
			<?php woocommerce_catalog_ordering(); ?>
		</div>
	</div>
	<?php
}
add_action( 'woocommerce_before_shop_loop', 'wpp_shop_header', 15 );

/* ================================================================== */
/* Карточка товара в цикле (все дефолтные действия заменены)           */
/* ================================================================== */

remove_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 10 );
remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_product_link_close', 5 );
remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_show_product_loop_sale_flash', 10 );
remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail', 10 );
remove_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title', 10 );
remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_rating', 5 );
remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10 );
remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );

/**
 * Карточка темы целиком внутри стандартного <li>.
 */
function wpp_loop_card() {
	global $product;
	$d = $product ? wpp_product_data( $product ) : null;
	if ( $d ) {
		wpp_product_card( $d );
	}
}
add_action( 'woocommerce_before_shop_loop_item', 'wpp_loop_card', 20 );

// Бейдж акции.
add_filter( 'woocommerce_sale_flash', function ( $html ) {
	return '<span class="onsale absolute left-3 top-3 z-10 rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold text-ink">' . esc_html__( 'Скидка', 'wp-panda' ) . '</span>';
} );

// Кнопка «В корзину» в цикле — через фильтр, без переопределения шаблона.
add_filter( 'woocommerce_loop_add_to_cart_link', function ( $html, $product, $args ) {
	$d = wpp_product_data( $product );
	$label = $product->is_purchasable() && $product->is_in_stock() ? __( 'В корзину', 'wp-panda' ) : $product->add_to_cart_text();
	return sprintf(
		'<a href="%s" data-quantity="%s" class="%s" %s aria-label="%s">%s<span class="sr-only">%s</span></a>',
		esc_url( $product->add_to_cart_url() ),
		esc_attr( isset( $args['quantity'] ) ? $args['quantity'] : 1 ),
		esc_attr( 'inline-flex h-12 flex-shrink-0 items-center justify-center gap-2 rounded-full border border-line bg-soft px-4 text-[13px] font-bold transition-all duration-200 hover:border-brand hover:bg-brand active:scale-[0.98] add_to_cart_button' . ( $product->is_purchasable() && $product->is_in_stock() ? ' ajax_add_to_cart' : '' ) ),
		isset( $args['attributes'] ) ? wc_implode_html_attributes( $args['attributes'] ) : '',
		esc_attr( sprintf( __( 'Добавить %s в корзину', 'wp-panda' ), $product->get_name() ) ),
		wpp_icon( 'cart', 'h-4 w-4' ),
		esc_html( $label )
	);
}, 10, 3 );

/* ================================================================== */
/* Страница товара: порядок блоков через хуки                          */
/* ================================================================== */

// Медиа и панель покупки — карточки.
add_action( 'woocommerce_before_single_product_summary', function () {
	echo '<section class="wpp-single-media rounded-card border border-line bg-white p-2 shadow-card" aria-label="' . esc_attr__( 'Превью товара', 'wp-panda' ) . '">';
}, 5 );
add_action( 'woocommerce_before_single_product_summary', function () {
	echo '</section>';
}, 25 );

add_action( 'woocommerce_single_product_summary', function () {
	echo '<section class="wpp-single-buy rounded-card border border-line bg-white p-6 shadow-card">';
	echo '<div class="flex items-center justify-between gap-3">';
	echo '<h2 class="text-sm font-semibold">' . esc_html( 'theme' === get_post_meta( get_the_ID(), '_wpp_type', true ) ? __( 'Лицензия темы', 'wp-panda' ) : __( 'Бессрочная лицензия', 'wp-panda' ) ) . '</h2>';
	wpp_icon( 'shield-check', 'h-5 w-5 text-emerald-600' );
	echo '</div>';
}, 3 );
add_action( 'woocommerce_single_product_summary', function () {
	echo '</section>';
	echo '<section class="mt-5 rounded-card border border-line bg-white p-6 shadow-card">';
	echo '<div class="flex items-center gap-3">';
	echo '<span class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-ink text-2xl font-bold text-brand">P<span class="text-white">.</span></span>';
	echo '<div><h2 class="flex items-center gap-1.5 text-base font-bold tracking-tight">' . esc_html__( 'Wp Panda', 'wp-panda' ) . ' ' . wpp_icon( 'badge-check', 'h-4 w-4 text-[#c5940b]' ) . '</h2>';
	echo '<p class="mt-0.5 text-xs text-muted">' . esc_html__( 'Автор и разработчик продукта', 'wp-panda' ) . '</p></div></div></section>';
	echo '<section class="mt-5 rounded-card border border-line bg-white p-6 shadow-card"><ul class="space-y-3 text-[13px]">';
	foreach ( array(
		__( 'Оригинальные файлы продукта', 'wp-panda' ),
		__( 'Обновления из консоли WordPress', 'wp-panda' ),
		__( 'Помощь с установкой и настройкой', 'wp-panda' ),
		__( 'Подробная документация', 'wp-panda' ),
	) as $item ) {
		echo '<li class="flex items-start gap-2.5">' . wpp_icon( 'check', 'mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600' ) . '<span>' . esc_html( $item ) . '</span></li>';
	}
	echo '</ul><div class="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted">' . wpp_icon( 'download', 'h-3.5 w-3.5' ) . esc_html__( 'Файлы доступны сразу после оплаты', 'wp-panda' ) . '</div></section>';
}, 95 );

// Порядок внутри панели покупки: цена → excerpt → корзина → свойства.
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_rating', 10 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );

add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 8 );
add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_rating', 12 );
add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 16 );
add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20 );
add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 24 );
add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 90 );

// Табы и связанные — в карточке; блок автора между ними.
add_action( 'woocommerce_after_single_product_summary', function () {
	echo '<div class="mt-12 rounded-card border border-line bg-white p-6 shadow-card sm:p-9">';
}, 8 );
add_action( 'woocommerce_after_single_product_summary', function () {
	echo '</div>';
}, 12 );

// Связанные товары: 4 колонки.
add_filter( 'woocommerce_output_related_products_args', function ( $args ) {
	$args['posts_per_page'] = 4;
	$args['columns']        = 4;
	return $args;
} );

/* ================================================================== */
/* Корзина-шторка и AJAX-фрагменты                                     */
/* ================================================================== */

/**
 * Содержимое шторки корзины.
 */
function wpp_cart_drawer_inner() {
	if ( ! wpp_has_woo() || ! WC()->cart ) {
		return;
	}
	$cart  = WC()->cart;
	$total = (float) $cart->get_displayed_subtotal();
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
			<div class="rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-100">
				<div class="flex items-center gap-2 text-[13px] font-medium">
					<?php wpp_icon( 'gift', 'h-4 w-4 flex-shrink-0' ); ?>
					<span>
						<?php if ( $left > 0 ) : ?>
							<?php esc_html_e( 'Ещё', 'wp-panda' ); ?> <b data-gift-left><?php echo esc_html( wpp_rub( $left ) ); ?></b> — <?php esc_html_e( 'и премиум-плагин в подарок', 'wp-panda' ); ?>
						<?php else : ?>
							<b><?php esc_html_e( 'Подарок ваш!', 'wp-panda' ); ?></b> <?php esc_html_e( 'Бонусный плагин добавлен к заказу', 'wp-panda' ); ?>
						<?php endif; ?>
					</span>
				</div>
				<div class="mt-3 h-2 overflow-hidden rounded-full bg-white">
					<div data-gift-bar class="h-full rounded-full bg-brand transition-all duration-500" style="width:<?php echo esc_attr( $pct ); ?>%"></div>
				</div>
			</div>

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
							<span class="rounded-full bg-soft px-3 py-1 text-[11px] font-semibold text-ink">
								<?php echo 'plugin' === $d['type'] ? esc_html__( 'Лицензия навсегда', 'wp-panda' ) : esc_html__( '1 сайт', 'wp-panda' ); ?>
								<?php if ( $item['quantity'] > 1 ) : ?>· × <?php echo esc_html( $item['quantity'] ); ?><?php endif; ?>
							</span>
							<div class="text-right leading-tight">
								<?php if ( $product->is_on_sale() && $product->get_regular_price() ) : ?>
									<div class="text-[11px] text-muted line-through"><?php echo wp_kses_post( wc_price( $product->get_regular_price() ) ); ?></div>
								<?php endif; ?>
								<div class="font-bold tabular-nums"><?php echo wp_kses_post( wc_price( (float) $product->get_price() * $item['quantity'] ) ); ?></div>
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
	<?php endif;
}

// AJAX-фрагменты: шторка и бейдж.
add_filter( 'woocommerce_add_to_cart_fragments', function ( $fragments ) {
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
} );

/* ================================================================== */
/* Корзина и чекаут: карточная обёртка через хуки                      */
/* ================================================================== */

add_action( 'woocommerce_before_cart', function () {
	echo '<div class="rounded-card border border-line bg-white p-6 shadow-card sm:p-8">';
}, 5 );
add_action( 'woocommerce_after_cart', function () {
	echo '</div>';
}, 5 );

add_action( 'woocommerce_before_checkout_form', function () {
	echo '<div class="rounded-card border border-line bg-white p-6 shadow-card sm:p-8">';
}, 5 );
add_action( 'woocommerce_after_checkout_form', function () {
	echo '</div>';
}, 5 );

/* ================================================================== */
/* Личный кабинет                                                      */
/* ================================================================== */

// Навигация кабинета — стандартная, стили через CSS; обёртка — через хук.
add_action( 'woocommerce_before_account_navigation', function () {
	echo '<aside class="wpp-account-nav rounded-card border border-line bg-white p-2 shadow-card">';
}, 5 );
add_action( 'woocommerce_after_account_navigation', function () {
	echo '</aside>';
}, 5 );

add_action( 'woocommerce_before_account_content', function () {
	echo '<div class="rounded-card border border-line bg-white p-6 shadow-card sm:p-8">';
}, 5 );
add_action( 'woocommerce_after_account_content', function () {
	echo '</div>';
}, 5 );

// Пагинация каталога — круглые кнопки (стили в CSS).
add_filter( 'woocommerce_pagination_args', function ( $args ) {
	$args['prev_text'] = wpp_icon( 'arrow-left', 'h-4 w-4' );
	$args['next_text'] = wpp_icon( 'arrow-right', 'h-4 w-4' );
	return $args;
} );

// Счётчик «Показано X из Y» в одну строку с сортировкой.
add_filter( 'woocommerce_result_count', function () {
	return '<p class="woocommerce-result-count text-[13px] text-muted hidden sm:block">' . esc_html__( 'Показано', 'wp-panda' ) . ' {showing} — {total}</p>';
} );
