<?php
/**
 * Empty cart state matching the supplied checkout layout.
 *
 * @package WooCommerce\Templates
 * @version 7.0.1
 */
defined( 'ABSPATH' ) || exit;
?>
<section class="mx-auto mt-16 max-w-md text-center">
	<div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 ring-8 ring-brand-50/50" aria-hidden="true"><?php echo wpp_icon( 'cart', 'h-10 w-10' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
	<h1 class="mt-7 text-3xl font-bold tracking-tight"><?php esc_html_e( 'В корзине пусто', 'wp-panda' ); ?></h1>
	<p class="mt-2 text-muted"><?php esc_html_e( 'Добавьте тему или плагин, чтобы оформить заказ.', 'wp-panda' ); ?></p>
	<?php if ( wc_get_page_id( 'shop' ) > 0 ) : ?><a class="button button--brand button--large mt-7" href="<?php echo esc_url( apply_filters( 'woocommerce_return_to_shop_redirect', wc_get_page_permalink( 'shop' ) ) ); ?>"><?php esc_html_e( 'Перейти в каталог', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a><?php endif; ?>
</section>
