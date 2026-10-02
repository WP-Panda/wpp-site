<?php
/**
 * Cart page, markup identical to the supplied layout.
 *
 * @package WpPanda
 * @version 7.0.1
 */

defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_cart' );

$wpp_cart  = WC()->cart;
$wpp_count = $wpp_cart->get_cart_contents_count();
?>
<div class="mx-auto max-w-[1200px] px-4 pb-32 pt-4 sm:px-6 lg:pb-8">
	<?php
	get_template_part( 'template-parts/checkout/stepper', null, array(
		'step'      => 1,
		'subtitles' => array(
			sprintf( _n( '%s товар', '%s товара', $wpp_count, 'wp-panda' ), number_format_i18n( $wpp_count ) ),
		),
	) );
	?>
	<div class="fade-up mt-10 text-center sm:mt-12">
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl"><?php esc_html_e( 'Ваша корзина', 'wp-panda' ); ?></h1>
		<p class="mx-auto mt-3 max-w-xl text-muted"><?php esc_html_e( 'Проверьте состав заказа. Для тем выберите 1 или 5 сайтов, плагины предоставляются навсегда.', 'wp-panda' ); ?></p>
	</div>

	<?php wc_print_notices(); ?>

	<div class="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_370px]">
		<div class="fade-up min-w-0 space-y-5">
			<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7">
				<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
					<div class="flex items-center gap-3">
						<span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100">1</span>
						<h3 class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Товары в заказе', 'wp-panda' ); ?></h3>
					</div>
					<span class="text-sm text-muted"><?php echo esc_html( sprintf( _n( '%s товар', '%s товара', $wpp_count, 'wp-panda' ), number_format_i18n( $wpp_count ) ) ); ?></span>
				</div>
				<div class="space-y-3">
					<?php foreach ( $wpp_cart->get_cart() as $wpp_key => $wpp_item ) :
						$wpp_product = $wpp_item['data'];
						if ( ! $wpp_product || ! $wpp_product->is_visible() ) {
							continue;
						}
						$wpp_parent   = wc_get_product( $wpp_item['product_id'] );
						$wpp_kind     = $wpp_parent ? wpp_product_kind( $wpp_parent->get_id() ) : 'product';
						$wpp_version  = $wpp_parent ? wpp_product_version( $wpp_parent ) : '';
						$wpp_is_theme = 'theme' === $wpp_kind;
						$wpp_price    = (float) $wpp_product->get_price();
						$wpp_regular  = (float) $wpp_product->get_regular_price();
						?>
						<div class="rounded-2xl border border-line p-3 sm:p-4">
							<div class="flex gap-4">
								<a class="w-28 flex-shrink-0 overflow-hidden rounded-xl sm:w-40" href="<?php echo esc_url( get_permalink( $wpp_item['product_id'] ) ); ?>">
									<?php echo wpp_render_product_art( $wpp_parent ? $wpp_parent : $wpp_product, 'wpp-product-card' ); ?>
								</a>
								<div class="min-w-0 flex-1">
									<div class="flex items-start justify-between gap-3">
										<div class="min-w-0">
											<div class="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
												<?php echo $wpp_is_theme ? esc_html__( 'Тема', 'wp-panda' ) : esc_html__( 'Плагин', 'wp-panda' ); ?><?php if ( ! $wpp_is_theme ) : ?> · <?php esc_html_e( 'Навсегда', 'wp-panda' ); ?><?php endif; ?><?php echo $wpp_version ? ' · v' . esc_html( $wpp_version ) : ''; ?>
											</div>
											<div class="text-lg font-semibold tracking-tight"><?php echo esc_html( $wpp_product->get_name() ); ?></div>
											<div class="line-clamp-2 text-[13px] text-muted"><?php echo esc_html( wp_strip_all_tags( $wpp_parent ? $wpp_parent->get_short_description() : $wpp_product->get_short_description() ) ); ?></div>
										</div>
										<button aria-label="<?php esc_attr_e( 'Удалить', 'wp-panda' ); ?>" data-cart-remove="<?php echo esc_attr( $wpp_key ); ?>" class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-rose-50 hover:text-rose-500"><?php echo wpp_icon( 'trash', 'h-4 w-4' ); ?></button>
									</div>
								</div>
							</div>
							<div class="mt-4">
								<?php if ( $wpp_is_theme && $wpp_parent && $wpp_parent->is_type( 'variable' ) ) :
									$wpp_current_attr = '';
									if ( ! empty( $wpp_item['variation_id'] ) ) {
										$wpp_var = wc_get_product( $wpp_item['variation_id'] );
										if ( $wpp_var ) {
											$wpp_va = $wpp_var->get_attributes();
											$wpp_current_attr = $wpp_va ? (string) reset( $wpp_va ) : '';
										}
									}
									$wpp_attrs_keys  = $wpp_parent->get_variation_attributes();
									$wpp_attr_options = $wpp_attrs_keys ? reset( $wpp_attrs_keys ) : array();
									$wpp_hint = array(
										__( '1 сайт', 'wp-panda' )      => __( 'Для личного проекта или теста', 'wp-panda' ),
										__( '5 сайтов', 'wp-panda' )    => __( 'Для студии и клиентских сайтов', 'wp-panda' ),
									);
									?>
									<div class="grid grid-cols-2 gap-2">
										<?php foreach ( (array) $wpp_attr_options as $wpp_option ) :
											$wpp_variation_id = 0;
											$wpp_option_price = null;
											foreach ( $wpp_parent->get_children() as $wpp_child ) {
												$wpp_child_product = wc_get_product( $wpp_child );
												if ( $wpp_child_product ) {
													$wpp_child_attrs = $wpp_child_product->get_attributes();
													if ( $wpp_child_attrs && reset( $wpp_child_attrs ) === $wpp_option ) {
														$wpp_variation_id = $wpp_child;
														$wpp_option_price = (float) $wpp_child_product->get_price();
														break;
													}
												}
											}
											$wpp_selected = $wpp_option === $wpp_current_attr;
											$wpp_opt_class = $wpp_selected
												? 'border-brand bg-brand-50/60 ring-1 ring-brand'
												: 'border-line hover:border-ink/25';
											?>
											<button type="button" data-cart-variation="<?php echo esc_attr( $wpp_key . '|' . $wpp_variation_id ); ?>" class="relative rounded-xl border p-2.5 text-left transition-all sm:p-3 <?php echo esc_attr( $wpp_opt_class ); ?>">
												<div class="flex items-center gap-2">
													<span class="flex flex-shrink-0 items-center justify-center rounded-full border-2 transition <?php echo $wpp_selected ? 'h-4 w-4 border-brand bg-brand' : 'h-4 w-4 border-line bg-white'; ?>">
														<?php if ( $wpp_selected ) : ?><span class="rounded-full bg-white h-1.5 w-1.5"></span><?php endif; ?>
													</span>
													<span class="truncate text-[13px] font-semibold"><?php echo esc_html( $wpp_option ); ?></span>
												</div>
												<div class="mt-1 truncate pl-6 text-[11px] text-muted"><?php echo esc_html( isset( $wpp_hint[ $wpp_option ] ) ? $wpp_hint[ $wpp_option ] : '' ); ?></div>
												<div class="mt-1.5 pl-6 text-sm font-bold tabular-nums"><?php echo null !== $wpp_option_price ? wpp_format_amount( $wpp_option_price ) : ''; ?></div>
											</button>
										<?php endforeach; ?>
									</div>
								<?php else : ?>
									<div class="flex items-center justify-between rounded-xl bg-soft px-4 py-3">
										<div class="flex items-center gap-2 text-sm font-semibold text-ink"><?php echo wpp_icon( 'badge-check', 'h-4 w-4 text-emerald-600' ); ?><?php esc_html_e( 'Лицензия навсегда (все будущие обновления включены)', 'wp-panda' ); ?></div>
										<div class="font-bold tabular-nums"><?php echo wpp_format_amount( $wpp_price ); ?></div>
									</div>
								<?php endif; ?>
							</div>
						</div>
					<?php endforeach; ?>
				</div>
			</section>

			<?php if ( wc_coupons_enabled() ) : ?>
			<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7">
				<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
					<div class="flex items-center gap-3">
						<span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100">2</span>
						<h3 class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Промокод', 'wp-panda' ); ?></h3>
					</div>
					<span class="text-xs text-muted"><?php echo wp_kses_post( __( 'Попробуйте <b class="text-ink">WELCOME30</b>', 'wp-panda' ) ); ?></span>
				</div>
				<form class="flex flex-col gap-2 sm:flex-row sm:items-start" data-coupon-form>
					<label class="block flex-1">
						<input name="coupon_code" placeholder="<?php esc_attr_e( 'Введите промокод', 'wp-panda' ); ?>" class="h-12 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" value="">
					</label>
					<button type="submit" class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-ink text-white hover:bg-ink-2 text-sm h-12 px-6"><?php esc_html_e( 'Применить', 'wp-panda' ); ?></button>
				</form>
				<div class="mt-2 hidden text-sm font-semibold text-brand" data-coupon-message></div>
			</section>
			<?php endif; ?>

			<?php $wpp_cross = function_exists( 'wpp_get_cross_sell' ) ? wpp_get_cross_sell() : null; if ( $wpp_cross ) : ?>
			<section class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7">
				<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
					<div class="flex items-center gap-3">
						<span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100">3</span>
						<h3 class="text-lg font-semibold tracking-tight sm:text-xl"><?php esc_html_e( 'Плагины с лицензией навсегда', 'wp-panda' ); ?></h3>
					</div>
					<span class="text-xs text-muted"><?php esc_html_e( 'Добавьте в один клик', 'wp-panda' ); ?></span>
				</div>
				<div class="grid gap-3 sm:grid-cols-3">
					<?php
					$GLOBALS['product'] = $wpp_cross;
					setup_postdata( $wpp_cross->get_id() );
					wc_get_template_part( 'content', 'product' );
					wp_reset_postdata();
					?>
				</div>
			</section>
			<?php endif; ?>
		</div>

		<?php
		get_template_part( 'template-parts/checkout/summary', null, array(
			'cta_label' => __( 'Перейти к оформлению', 'wp-panda' ),
			'cta_url'   => wc_get_checkout_url(),
		) );
		?>
	</div>

	<div class="lg:hidden">
		<div class="fade-in fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/90 backdrop-blur-xl">
			<div class="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
				<span class="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-ink sm:flex"><?php echo wpp_icon( 'shopping-bag', 'h-5 w-5' ); ?></span>
				<div class="min-w-0 flex-1">
					<div class="text-[11px] text-muted sm:text-xs"><?php esc_html_e( 'Итого к оплате', 'wp-panda' ); ?></div>
					<div class="truncate text-sm font-semibold sm:text-base"><?php echo wpp_format_amount( (float) $wpp_cart->get_total( 'edit' ) ); ?></div>
				</div>
				<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-11 px-5 text-sm" href="<?php echo esc_url( wc_get_checkout_url() ); ?>"><?php esc_html_e( 'Далее', 'wp-panda' ); ?><?php echo wpp_icon( 'arrow-right', 'h-4 w-4' ); ?></a>
			</div>
		</div>
	</div>
</div>
<?php do_action( 'woocommerce_after_cart' ); ?>
