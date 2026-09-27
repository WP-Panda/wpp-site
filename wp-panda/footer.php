<?php
/** Site footer aligned with the supplied layout. */
defined( 'ABSPATH' ) || exit;
$shop_url    = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
$account_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'myaccount' ) : wp_login_url();
$is_checkout = function_exists( 'is_checkout' ) && is_checkout();
$theme_term   = function_exists( 'get_term_by' ) ? get_term_by( 'slug', 'wordpress-themes', 'product_cat' ) : false;
$plugin_term  = function_exists( 'get_term_by' ) ? get_term_by( 'slug', 'wordpress-plugins', 'product_cat' ) : false;
$theme_url    = $theme_term && ! is_wp_error( $theme_term ) ? get_term_link( $theme_term ) : $shop_url;
$plugin_url   = $plugin_term && ! is_wp_error( $plugin_term ) ? get_term_link( $plugin_term ) : $shop_url;
$theme_url    = is_wp_error( $theme_url ) ? $shop_url : $theme_url;
$plugin_url   = is_wp_error( $plugin_url ) ? $shop_url : $plugin_url;
$columns = array(
	__( 'Магазин', 'wp-panda' ) => array(
		__( 'Все продукты', 'wp-panda' )       => $shop_url,
		__( 'Темы WordPress', 'wp-panda' )     => $theme_url,
		__( 'Плагины', 'wp-panda' )            => $plugin_url,
		__( 'Оформление заказа', 'wp-panda' )  => function_exists( 'wc_get_checkout_url' ) ? wc_get_checkout_url() : home_url( '/checkout/' ),
	),
	__( 'Ресурсы', 'wp-panda' ) => array(
		__( 'Блог', 'wp-panda' )                  => get_permalink( (int) get_option( 'page_for_posts' ) ) ?: home_url( '/blog/' ),
		__( 'Частые вопросы (FAQ)', 'wp-panda' )  => home_url( '/faq/' ),
		__( 'База знаний', 'wp-panda' )           => home_url( '/kb/' ),
		__( 'Установка темы', 'wp-panda' )        => home_url( '/kb/install-theme/' ),
		__( 'Для разработчиков', 'wp-panda' )     => home_url( '/kb/hooks/' ),
	),
	__( 'Помощь', 'wp-panda' ) => array(
		__( 'Создать обращение', 'wp-panda' ) => function_exists( 'wc_get_endpoint_url' ) ? wc_get_endpoint_url( 'support', 'new', $account_url ) : $account_url,
		__( 'Личный кабинет', 'wp-panda' )    => $account_url,
		__( 'Мои обращения', 'wp-panda' )     => function_exists( 'wc_get_endpoint_url' ) ? wc_get_endpoint_url( 'support', '', $account_url ) : $account_url,
		__( 'Мои лицензии', 'wp-panda' )      => function_exists( 'wc_get_endpoint_url' ) ? wc_get_endpoint_url( 'licenses', '', $account_url ) : $account_url,
		__( 'Возврат средств', 'wp-panda' )   => home_url( '/kb/refund/' ),
	),
);
?>
		<footer class="site-footer<?php echo $is_checkout ? ' site-footer--checkout' : ''; ?>">
			<?php if ( ! $is_checkout ) : ?>
			<div class="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
				<div><a class="site-brand__link" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><img class="site-brand__mark" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/panda-mark.svg' ); ?>" width="40" height="40" alt=""><span class="site-brand__text"><span class="site-brand__name"><?php bloginfo( 'name' ); ?></span><span class="site-brand__tag">WPP</span></span></a><p class="mt-4 max-w-xs text-sm leading-relaxed text-muted"><?php esc_html_e( 'Премиальные темы и плагины для WordPress и WooCommerce с автообновлениями и поддержкой от разработчиков.', 'wp-panda' ); ?></p></div>
				<?php foreach ( $columns as $heading => $links ) : ?><div><h2 class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted"><?php echo esc_html( $heading ); ?></h2><ul class="mt-4 space-y-2.5 text-sm"><?php foreach ( $links as $label => $url ) : ?><li><a class="text-ink/80 transition hover:text-ink" href="<?php echo esc_url( $url ); ?>"><?php echo esc_html( $label ); ?></a></li><?php endforeach; ?></ul></div><?php endforeach; ?>
			</div>
			<div class="border-t border-line"><div class="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-4 text-xs font-semibold text-muted sm:justify-start sm:px-6"><span class="font-medium"><?php esc_html_e( 'Принимаем к оплате:', 'wp-panda' ); ?></span><?php foreach ( array( 'VISA', 'Mastercard', 'МИР', 'СБП', 'SberPay', 'ЮMoney', 'USDT', __( 'Счёт для юрлиц', 'wp-panda' ) ) as $method ) : ?><span><?php echo esc_html( $method ); ?></span><?php endforeach; ?></div></div>
			<?php endif; ?>
			<div class="border-t border-line"><div class="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-4 py-5 text-[13px] text-muted sm:flex-row sm:px-6"><span>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. <?php esc_html_e( 'Все права защищены.', 'wp-panda' ); ?></span><span><?php esc_html_e( 'Нужна помощь?', 'wp-panda' ); ?> <a class="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4" href="<?php echo esc_url( function_exists( 'wc_get_endpoint_url' ) ? wc_get_endpoint_url( 'support', 'new', $account_url ) : $account_url ); ?>"><?php esc_html_e( 'Написать в поддержку в кабинете', 'wp-panda' ); ?></a></span></div></div>
		</footer>
	</div>
</div>
<?php wp_footer(); ?>
</body>
</html>
