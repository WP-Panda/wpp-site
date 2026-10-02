<?php
/**
 * Site footer and global overlays (cart drawer, floating cart), identical to the layout.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$shop_url     = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
$account_url  = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'myaccount' ) : wp_login_url();
$checkout_url = function_exists( 'wc_get_checkout_url' ) ? wc_get_checkout_url() : home_url( '/checkout/' );
$blog_url     = (int) get_option( 'page_for_posts' ) ? get_permalink( (int) get_option( 'page_for_posts' ) ) : home_url( '/blog/' );
$themes_url   = $shop_url;
$plugins_url  = $shop_url;
foreach ( array( 'themes' => 'wordpress-themes', 'plugins' => 'wordpress-plugins' ) as $wpp_var => $wpp_slug ) {
	$term = get_term_by( 'slug', $wpp_slug, 'product_cat' );
	if ( ! $term ) {
		$term = get_term_by( 'slug', $wpp_slug === 'wordpress-themes' ? 'themes' : 'plugins', 'product_cat' );
	}
	if ( $term && ! is_wp_error( $term ) ) {
		${"{$wpp_var}_url"} = get_term_link( $term );
	}
}
$kb_url         = home_url( '/kb/' );
$faq_url        = home_url( '/faq/' );
$support_new    = function_exists( 'wc_get_endpoint_url' ) ? wc_get_endpoint_url( 'support', 'new', $account_url ) : $account_url;
$support_list   = function_exists( 'wc_get_endpoint_url' ) ? wc_get_endpoint_url( 'support', '', $account_url ) : $account_url;
$licenses_url   = function_exists( 'wc_get_endpoint_url' ) ? wc_get_endpoint_url( 'licenses', '', $account_url ) : $account_url;
$is_flow        = wpp_is_checkout_flow();
$cart_count     = wpp_get_cart_count();
$show_fab       = ! $is_flow && $cart_count > 0 && ! ( function_exists( 'is_shop' ) && is_shop() );
?>
			</main>
<?php if ( $is_flow ) : ?>
			<footer class="mt-16 bg-[#F4F4F6]">
				<div class="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-4 py-5 text-[13px] text-muted sm:flex-row sm:px-6">
					<span>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. <?php esc_html_e( 'Все права защищены.', 'wp-panda' ); ?></span>
					<span><?php esc_html_e( 'Нужна помощь?', 'wp-panda' ); ?> <a class="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4" href="<?php echo esc_url( $support_new ); ?>"><?php esc_html_e( 'Написать в поддержку в кабинете', 'wp-panda' ); ?></a></span>
				</div>
			</footer>
<?php else : ?>
			<footer class="mt-24 bg-[#F4F4F6]">
				<div class="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
					<div>
						<span class="flex items-center gap-2.5">
							<span class="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-line">
								<img alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>" class="h-9 w-9 object-contain" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/panda.svg' ); ?>">
							</span>
							<span class="flex flex-col leading-none">
								<span class="text-[19px] font-bold tracking-tight text-ink"><?php bloginfo( 'name' ); ?></span>
								<span class="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">WPP</span>
							</span>
						</span>
						<p class="mt-4 max-w-xs text-sm leading-relaxed text-muted"><?php esc_html_e( 'Премиальные темы и плагины для WordPress и WooCommerce с автообновлениями и поддержкой от разработчиков.', 'wp-panda' ); ?></p>
					</div>
					<div>
						<div class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted"><?php esc_html_e( 'Магазин', 'wp-panda' ); ?></div>
						<ul class="mt-4 space-y-2.5 text-sm">
							<li><a class="text-ink/80 transition hover:text-ink" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Все продукты', 'wp-panda' ); ?></a></li>
							<li><a class="text-ink/80 transition hover:text-ink" href="<?php echo esc_url( $themes_url ); ?>"><?php esc_html_e( 'Темы WordPress', 'wp-panda' ); ?></a></li>
							<li><a class="text-ink/80 transition hover:text-ink" href="<?php echo esc_url( $plugins_url ); ?>"><?php esc_html_e( 'Плагины', 'wp-panda' ); ?></a></li>
							<li><a class="text-ink/80 transition hover:text-ink" href="<?php echo esc_url( $checkout_url ); ?>"><?php esc_html_e( 'Оформление заказа', 'wp-panda' ); ?></a></li>
						</ul>
					</div>
					<div>
						<div class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted"><?php esc_html_e( 'Ресурсы', 'wp-panda' ); ?></div>
						<ul class="mt-4 space-y-2.5 text-sm">
							<li><a class="text-ink/80 transition hover:text-ink" href="<?php echo esc_url( $blog_url ); ?>"><?php esc_html_e( 'Блог', 'wp-panda' ); ?></a></li>
							<li><a class="text-ink/80 transition hover:text-ink" href="<?php echo esc_url( $faq_url ); ?>"><?php esc_html_e( 'Частые вопросы (FAQ)', 'wp-panda' ); ?></a></li>
							<li><a class="text-ink/80 transition hover:text-ink" href="<?php echo esc_url( $kb_url ); ?>"><?php esc_html_e( 'База знаний', 'wp-panda' ); ?></a></li>
							<li><a class="text-ink/80 transition hover:text-ink" href="<?php echo esc_url( home_url( '/kb/install-theme/' ) ); ?>"><?php esc_html_e( 'Установка темы', 'wp-panda' ); ?></a></li>
							<li><a class="text-ink/80 transition hover:text-ink" href="<?php echo esc_url( home_url( '/kb/hooks/' ) ); ?>"><?php esc_html_e( 'Для разработчиков', 'wp-panda' ); ?></a></li>
							<li><a class="text-ink/80 transition hover:text-ink" href="<?php echo esc_url( home_url( '/ui-kit/' ) ); ?>"><?php esc_html_e( 'UI-кит и шаблоны WooCommerce', 'wp-panda' ); ?></a></li>
						</ul>
					</div>
					<div>
						<div class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted"><?php esc_html_e( 'Помощь', 'wp-panda' ); ?></div>
						<ul class="mt-4 space-y-2.5 text-sm">
							<li><a class="text-ink/80 transition hover:text-ink" href="<?php echo esc_url( $support_new ); ?>"><?php esc_html_e( 'Создать обращение', 'wp-panda' ); ?></a></li>
							<li><a class="text-ink/80 transition hover:text-ink" href="<?php echo esc_url( $account_url ); ?>"><?php esc_html_e( 'Личный кабинет', 'wp-panda' ); ?></a></li>
							<li><a class="text-ink/80 transition hover:text-ink" href="<?php echo esc_url( $support_list ); ?>"><?php esc_html_e( 'Мои обращения', 'wp-panda' ); ?></a></li>
							<li><a class="text-ink/80 transition hover:text-ink" href="<?php echo esc_url( $licenses_url ); ?>"><?php esc_html_e( 'Мои лицензии', 'wp-panda' ); ?></a></li>
							<li><a class="text-ink/80 transition hover:text-ink" href="<?php echo esc_url( home_url( '/kb/refund/' ) ); ?>"><?php esc_html_e( 'Возврат средств', 'wp-panda' ); ?></a></li>
						</ul>
					</div>
				</div>
				<div class="border-t border-line">
					<div class="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-4 text-xs font-semibold text-muted sm:justify-start sm:px-6">
						<span class="font-medium"><?php esc_html_e( 'Принимаем к оплате:', 'wp-panda' ); ?></span>
						<?php foreach ( array( 'VISA', 'Mastercard', 'МИР', 'СБП', 'SberPay', 'ЮMoney', 'USDT', __( 'Счёт для юрлиц', 'wp-panda' ) ) as $wpp_method ) : ?>
							<span><?php echo esc_html( $wpp_method ); ?></span>
						<?php endforeach; ?>
					</div>
				</div>
				<div class="border-t border-line">
					<div class="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-4 py-5 text-[13px] text-muted sm:flex-row sm:px-6">
						<span>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. <?php esc_html_e( 'Все права защищены.', 'wp-panda' ); ?></span>
						<span><?php esc_html_e( 'Нужна помощь?', 'wp-panda' ); ?> <a class="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4" href="<?php echo esc_url( $support_new ); ?>"><?php esc_html_e( 'Написать в поддержку в кабинете', 'wp-panda' ); ?></a></span>
					</div>
				</div>
			</footer>
<?php endif; ?>
		</div>
		<div class="wpp-cart-backdrop fixed inset-0 z-50 bg-ink/35 backdrop-blur-[3px] transition-opacity duration-300 pointer-events-none opacity-0" data-cart-backdrop aria-hidden="true"></div>
		<aside role="dialog" aria-label="<?php esc_attr_e( 'Корзина', 'wp-panda' ); ?>" aria-hidden="true" class="wpp-cart-drawer fixed inset-y-0 right-0 z-50 flex w-full max-w-[460px] flex-col bg-white shadow-[-30px_0_80px_-30px_rgba(20,20,28,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:inset-y-3 sm:right-3 sm:rounded-[28px] translate-x-[110%]" data-cart-drawer>
			<div class="flex items-center justify-between gap-3 px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
				<div class="flex items-center gap-3">
					<span class="flex h-11 w-11 items-center justify-center rounded-full bg-brand shadow-glow">
						<?php echo wpp_icon( 'shopping-bag', 'h-5 w-5' ); ?>
					</span>
					<div>
						<div class="text-xl font-bold tracking-tight"><?php esc_html_e( 'Корзина', 'wp-panda' ); ?></div>
						<div class="text-xs text-muted wpp-cart-drawer__subtitle"><?php echo $cart_count > 0 ? esc_html( sprintf( _n( '%s товар', '%s товара', $cart_count, 'wp-panda' ), number_format_i18n( $cart_count ) ) ) : esc_html__( 'Пока пусто', 'wp-panda' ); ?></div>
					</div>
				</div>
				<button type="button" aria-label="<?php esc_attr_e( 'Закрыть корзину', 'wp-panda' ); ?>" data-cart-close class="relative inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 hover:shadow-md active:scale-95">
					<?php echo wpp_icon( 'x', 'h-4 w-4' ); ?>
				</button>
			</div>
			<div class="widget_shopping_cart_content flex-1 overflow-y-auto">
				<?php if ( function_exists( 'woocommerce_mini_cart' ) ) { woocommerce_mini_cart(); } ?>
			</div>
		</aside>
		<?php if ( $show_fab ) : ?>
		<button data-cart-open aria-label="<?php esc_attr_e( 'Открыть корзину', 'wp-panda' ); ?>" class="fixed bottom-5 right-5 z-30 flex h-14 items-center gap-3 rounded-full bg-ink py-2 pl-2 pr-5 text-white shadow-float transition hover:-translate-y-0.5">
			<span class="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand text-ink">
				<?php echo wpp_icon( 'shopping-bag', 'h-[18px] w-[18px]' ); ?>
				<span class="wpp-cart-count absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-ink ring-2 ring-ink"><?php echo esc_html( number_format_i18n( $cart_count ) ); ?></span>
			</span>
			<span class="text-left leading-tight">
				<span class="block text-[11px] text-white/55"><?php esc_html_e( 'Корзина', 'wp-panda' ); ?></span>
				<span class="wpp-cart-total block text-sm font-semibold tabular-nums"><?php echo function_exists( 'WC' ) && WC()->cart ? wpp_format_amount( WC()->cart->get_total( 'edit' ) ) : ''; ?></span>
			</span>
		</button>
		<?php endif; ?>
	</div>
</div>
<?php wp_footer(); ?>
</body>
</html>
