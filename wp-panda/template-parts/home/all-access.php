<?php
/** Demonstration-only All Access campaign from the reference layout. */
defined( 'ABSPATH' ) || exit;
$shop_url  = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
$old_price = function_exists( 'wc_price' ) ? wc_price( 99900, array( 'currency' => 'RUB' ) ) : '99 900 ₽';
$new_price = function_exists( 'wc_price' ) ? wc_price( 29990, array( 'currency' => 'RUB' ) ) : '29 990 ₽';
?>
<section class="wpp-all-access mx-auto max-w-[1200px] px-4 sm:px-6">
	<div class="wpp-all-access__card"><div class="wpp-all-access__copy"><p class="eyebrow"><?php esc_html_e( 'Wp Panda All Access', 'wp-panda' ); ?> <span class="wpp-demo-badge"><?php esc_html_e( 'Демо-предложение', 'wp-panda' ); ?></span></p><h2><?php esc_html_e( 'Все темы и плагины — в одном наборе', 'wp-panda' ); ?></h2><p><?php esc_html_e( 'Макетный тариф с доступом к будущим релизам. Перед продажей укажите реальные состав, права и цену набора.', 'wp-panda' ); ?></p><a class="button button--brand" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Посмотреть каталог', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a></div><div class="wpp-all-access__price"><span class="wpp-all-access__discount">−70%</span><del><?php echo wp_kses_post( $old_price ); ?></del><strong><?php echo wp_kses_post( $new_price ); ?></strong><small><?php esc_html_e( 'цена из макета, не товар магазина', 'wp-panda' ); ?></small></div></div>
</section>
