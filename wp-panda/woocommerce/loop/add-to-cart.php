<?php
/**
 * Кнопка «В корзину» в цикле (override Woo) в стиле темы.
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $product;

echo apply_filters( // phpcs:ignore WordPress.Security.EscapeOutput
	'woocommerce_loop_add_to_cart_link',
	sprintf(
		'<a href="%s" data-quantity="%s" class="%s" %s aria-label="%s">%s</a>',
		esc_url( $product->add_to_cart_url() ),
		esc_attr( isset( $args['quantity'] ) ? $args['quantity'] : 1 ),
		esc_attr( isset( $args['class'] ) ? $args['class'] . ' inline-flex h-9 items-center justify-center rounded-full bg-ink px-4 text-[13px] font-semibold text-white transition hover:bg-ink-2' : '' ),
		isset( $args['attributes'] ) ? wc_implode_html_attributes( $args['attributes'] ) : '',
		esc_attr( $product->add_to_cart_text() ),
		esc_html( $product->add_to_cart_text() )
	),
	$product,
	$args
);
