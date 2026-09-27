<?php
/**
 * Подвал сайта.
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$kb_link    = get_post_type_archive_link( 'kb_article' );
$faq_link   = wpp_faq_page_url();
$support    = wpp_support_page_url();
$shop_link  = wpp_has_woo() ? get_permalink( wc_get_page_id( 'shop' ) ) : '';
$cart_link  = wpp_has_woo() ? wc_get_cart_url() : '';
$account    = wpp_has_woo() ? get_permalink( wc_get_page_id( 'myaccount' ) ) : wp_login_url();

$footer_cols = array(
	array(
		'location' => 'footer_shop',
		'title'    => __( 'Магазин', 'wp-panda' ),
		'links'    => array_filter( array(
			__( 'Все продукты', 'wp-panda' )      => $shop_link ? $shop_link : home_url( '/' ),
			__( 'Оформление заказа', 'wp-panda' ) => $cart_link,
			__( 'Личный кабинет', 'wp-panda' )    => $account,
		) ),
	),
	array(
		'location' => 'footer_resources',
		'title'    => __( 'Ресурсы', 'wp-panda' ),
		'links'    => array_filter( array(
			__( 'Блог', 'wp-panda' )              => home_url( '/' ),
			__( 'База знаний', 'wp-panda' )       => $kb_link ? $kb_link : home_url( '/' ),
			__( 'Частые вопросы (FAQ)', 'wp-panda' ) => $faq_link ? $faq_link : home_url( '/' ),
			__( 'UI-кит', 'wp-panda' )            => home_url( '/' ),
		) ),
	),
	array(
		'location' => 'footer_help',
		'title'    => __( 'Помощь', 'wp-panda' ),
		'links'    => array_filter( array(
			__( 'Форма поддержки', 'wp-panda' )   => $support ? $support : home_url( '/' ),
			__( 'Создать обращение', 'wp-panda' ) => $support ? $support . '#form' : home_url( '/' ),
		) ),
	),
);
?>
</main>

<footer class="mt-24 bg-[#F4F4F6]">
	<div class="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
		<div>
			<span class="flex items-center gap-2.5">
				<span class="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-line">
					<img src="<?php echo esc_url( WPP_URI . '/assets/img/panda.svg' ); ?>" alt="<?php bloginfo( 'name' ); ?>" class="h-9 w-9 object-contain" />
				</span>
				<span class="flex flex-col leading-none">
					<span class="text-[19px] font-bold tracking-tight text-ink"><?php bloginfo( 'name' ); ?></span>
					<span class="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">WPP</span>
				</span>
			</span>
			<p class="mt-4 max-w-xs text-sm leading-relaxed text-muted">
				<?php esc_html_e( 'Премиальные темы и плагины для WordPress и WooCommerce с автообновлениями и поддержкой от разработчиков.', 'wp-panda' ); ?>
			</p>
		</div>
		<?php foreach ( $footer_cols as $col ) : ?>
			<div>
				<div class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted"><?php echo esc_html( $col['title'] ); ?></div>
				<ul class="mt-4 space-y-2.5 text-sm">
					<?php if ( has_nav_menu( $col['location'] ) ) : ?>
						<?php
						wp_nav_menu( array(
							'theme_location' => $col['location'],
							'container'      => false,
							'items_wrap'     => '%3$s',
							'depth'          => 1,
							'fallback_cb'    => false,
							'walker'         => new WPP_Footer_Menu_Walker(),
						) );
						?>
					<?php else : ?>
						<?php foreach ( $col['links'] as $label => $url ) : ?>
							<li><a class="text-ink/80 transition hover:text-ink" href="<?php echo esc_url( $url ); ?>"><?php echo esc_html( $label ); ?></a></li>
						<?php endforeach; ?>
					<?php endif; ?>
				</ul>
			</div>
		<?php endforeach; ?>
	</div>
	<div class="border-t border-line">
		<div class="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-4 text-xs font-semibold text-muted sm:justify-start sm:px-6">
			<span class="font-medium"><?php esc_html_e( 'Принимаем к оплате:', 'wp-panda' ); ?></span>
			<?php foreach ( array( 'VISA', 'Mastercard', 'МИР', 'СБП', 'SberPay', 'ЮMoney', 'USDT', __( 'Счёт для юрлиц', 'wp-panda' ) ) as $m ) : ?>
				<span><?php echo esc_html( $m ); ?></span>
			<?php endforeach; ?>
		</div>
	</div>
	<div class="border-t border-line">
		<div class="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-4 py-5 text-[13px] text-muted sm:flex-row sm:px-6">
			<span>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. <?php esc_html_e( 'Все права защищены.', 'wp-panda' ); ?></span>
			<span>
				<?php esc_html_e( 'Нужна помощь?', 'wp-panda' ); ?>
				<?php if ( $support ) : ?>
					<a class="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4" href="<?php echo esc_url( $support ); ?>"><?php esc_html_e( 'Написать в поддержку', 'wp-panda' ); ?></a>
				<?php endif; ?>
			</span>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>

<?php
/**
 * Пункт меню футера.
 */
class WPP_Footer_Menu_Walker extends Walker_Nav_Menu {
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$output .= '<li><a class="text-ink/80 transition hover:text-ink" href="' . esc_url( $item->url ) . '">' . esc_html( $item->title ) . '</a></li>';
	}
	public function end_el( &$output, $item, $depth = 0, $args = null ) {
		// items_wrap %3$s — без лишних обёрток: li уже выведены.
	}
}
