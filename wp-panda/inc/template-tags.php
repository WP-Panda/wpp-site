<?php
/**
 * Shared presentation helpers that keep the rendered markup identical to html-layout.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

/** Safe cart item count when WooCommerce is still booting or inactive. */
function wpp_get_cart_count() {
	if ( function_exists( 'WC' ) && WC() && WC()->cart ) {
		return (int) WC()->cart->get_cart_contents_count();
	}
	return 0;
}

/** True when the current request is the cart or checkout page. */
function wpp_is_checkout_flow() {
	if ( ! function_exists( 'is_cart' ) ) {
		return false;
	}
	return is_cart() || is_checkout() || ( function_exists( 'is_order_received_page' ) && is_order_received_page() );
}

/**
 * Format an amount the same way the layout prints prices: «3 990 ₽».
 *
 * @param float $amount Amount.
 */
function wpp_format_amount( $amount ) {
	$amount = (float) $amount;
	$decimals = ( abs( $amount - round( $amount ) ) > 0.001 ) ? 2 : 0;
	$formatted = number_format( $amount, $decimals, ',', ' ' );
	return str_replace( ' ', '&nbsp;', $formatted ) . '&nbsp;₽';
}

/** Compact sales counter label used on product cards («8,2 тыс. продаж»). */
function wpp_sales_label( $sales ) {
	$sales = (int) $sales;
	if ( $sales >= 1000 ) {
		$thousands = round( $sales / 1000, 1 );
		$label     = ( abs( $thousands - round( $thousands ) ) < 0.01 ) ? (string) (int) round( $thousands ) : str_replace( '.', ',', number_format( $thousands, 1 ) );
		return $label . '&nbsp;тыс. продаж';
	}
	return number_format_i18n( $sales ) . '&nbsp;продаж';
}

/** Review count label in the compact layout format («(1,2 тыс.)»). */
function wpp_review_count_label( $count ) {
	$count = (int) $count;
	if ( $count >= 1000 ) {
		$thousands = round( $count / 1000, 1 );
		$label     = ( abs( $thousands - round( $thousands ) ) < 0.01 ) ? (string) (int) round( $thousands ) : str_replace( '.', ',', number_format( $thousands, 1 ) );
		return '(' . $label . '&nbsp;тыс.)';
	}
	return '(' . number_format_i18n( $count ) . ')';
}

/** Five rating stars exactly as printed by the layout cards. */
function wpp_rating_stars() {
	$out = '<span class="inline-flex items-center gap-0.5">';
	for ( $i = 0; $i < 5; $i++ ) {
		$out .= wpp_icon( 'star', 'fill-brand text-brand', array( 'style' => 'width: 11px; height: 11px;' ) );
	}
	return $out . '</span>';
}

/** Product kind helper: theme / plugin / generic. */
function wpp_product_kind( $product_id ) {
	if ( has_term( 'wordpress-themes', 'product_cat', $product_id ) ) {
		return 'theme';
	}
	if ( has_term( 'wordpress-plugins', 'product_cat', $product_id ) ) {
		return 'plugin';
	}
	return has_term( 'themes', 'product_cat', $product_id ) ? 'theme' : ( has_term( 'plugins', 'product_cat', $product_id ) ? 'plugin' : 'product' );
}

/** Version string stored by the demo importer or entered manually. */
function wpp_product_version( $product ) {
	$version = $product->get_attribute( 'Версия' );
	if ( ! $version ) {
		$version = get_post_meta( $product->get_id(), '_wpp_version', true );
	}
	return $version ? wp_strip_all_tags( $version ) : '';
}

/** License model line below the price on cards: «1 сайт / 5 сайтов» or «Навсегда». */
function wpp_license_line( $product ) {
	if ( $product->is_type( 'variable' ) ) {
		return __( '1 сайт / 5 сайтов', 'wp-panda' );
	}
	return __( 'Навсегда', 'wp-panda' );
}

/** Render the product-card artwork: stored layout art first, featured image fallback. */
function wpp_render_product_art( $product, $size = 'wpp-product-card' ) {
	$art = get_post_meta( $product->get_id(), '_wpp_card_art', true );
	if ( $art ) {
		echo wpp_kses_art( $art );
		return;
	}

	$image_id = $product->get_image_id();
	if ( $image_id ) {
		$bg = get_post_meta( $product->get_id(), '_wpp_art_bg', true );
		echo '<div class="relative aspect-[4/3] w-full overflow-hidden" style="container-type: inline-size; background: ' . esc_attr( $bg ? $bg : 'rgb(246, 246, 248)' ) . ';">';
		echo '<div class="dots-bg absolute inset-0 opacity-70"></div>';
		echo wp_get_attachment_image( $image_id, $size, false, array( 'class' => 'absolute inset-0 h-full w-full object-cover', 'loading' => 'lazy', 'alt' => '' ) );
		echo '</div>';
		return;
	}

	echo '<div class="relative aspect-[4/3] w-full overflow-hidden" style="container-type: inline-size; background: rgb(246, 246, 248);"><div class="dots-bg absolute inset-0 opacity-70"></div></div>';
}

/** Allow the exact inline-styled art markup produced by the layout extraction. */
function wpp_kses_art( $html ) {
	$allowed = array(
		'div'  => array( 'class' => true, 'style' => true ),
		'span' => array( 'class' => true, 'style' => true ),
		'img'  => array( 'class' => true, 'style' => true, 'src' => true, 'alt' => true, 'loading' => true ),
		'svg'  => array( 'xmlns' => true, 'width' => true, 'height' => true, 'viewBox' => true, 'viewbox' => true, 'fill' => true, 'stroke' => true, 'stroke-width' => true, 'stroke-linecap' => true, 'stroke-linejoin' => true, 'class' => true, 'style' => true, 'aria-hidden' => true ),
		'path' => array( 'd' => true ),
		'circle' => array( 'cx' => true, 'cy' => true, 'r' => true, 'fill' => true ),
		'rect' => array( 'width' => true, 'height' => true, 'x' => true, 'y' => true, 'rx' => true, 'ry' => true ),
	);
	return wp_kses( $html, $allowed );
}

/** Reading time copied from the layout, estimated for later posts. */
function wpp_post_read_time( $post_id = 0 ) {
	$post_id = $post_id ? absint( $post_id ) : get_the_ID();
	$minutes = (int) get_post_meta( $post_id, '_wpp_demo_read_time', true );
	if ( $minutes > 0 ) {
		return $minutes;
	}
	$content = get_post_field( 'post_content', $post_id );
	preg_match_all( '/[\p{L}\p{N}]+/u', wp_strip_all_tags( strip_shortcodes( $content ) ), $words );
	return max( 1, (int) ceil( count( $words[0] ) / 180 ) );
}

/** Byline copied from the supplied articles, WordPress author otherwise. */
function wpp_post_author_label( $post_id = 0 ) {
	$post_id = $post_id ? absint( $post_id ) : get_the_ID();
	$author  = get_post_meta( $post_id, '_wpp_demo_author', true );
	return $author ? sanitize_text_field( $author ) : get_the_author_meta( 'display_name', (int) get_post_field( 'post_author', $post_id ) );
}

/** Heading anchors for the article table of contents. */
function wpp_content_headings( $content ) {
	$headings = array();
	if ( ! is_string( $content ) || ! preg_match_all( '~<h([2-3])\b([^>]*)>(.*?)</h\1>~is', $content, $matches, PREG_SET_ORDER ) ) {
		return $headings;
	}
	foreach ( $matches as $match ) {
		if ( ! preg_match( '/id="([^"]+)"/i', $match[2], $id_match ) ) {
			continue;
		}
		$title = trim( wp_strip_all_tags( html_entity_decode( $match[3], ENT_QUOTES, get_bloginfo( 'charset' ) ) ) );
		if ( $title ) {
			$headings[] = array(
				'id'    => sanitize_html_class( $id_match[1] ),
				'title' => $title,
				'level' => (int) $match[1],
			);
		}
	}
	return $headings;
}

/**
 * Walker that prints primary-menu links with the pill classes of the layout.
 */
class Wpp_Primary_Menu_Walker extends Walker_Nav_Menu {
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$active  = in_array( 'current-menu-item', (array) $item->classes, true ) || in_array( 'current-menu-ancestor', (array) $item->classes, true ) || in_array( 'current_page_item', (array) $item->classes, true );
		$classes = $active
			? 'flex h-10 items-center px-4 text-sm font-semibold transition-all rounded-full bg-ink text-white shadow-[0_8px_20px_-10px_rgba(20,20,28,0.7)]'
			: 'flex h-10 items-center px-4 text-sm font-semibold transition-all rounded-full text-ink/75 hover:text-ink hover:bg-soft';
		$output .= '<a class="' . esc_attr( $classes ) . '" href="' . esc_url( $item->url ) . '"' . ( $active ? ' aria-current="page"' : '' ) . '>' . esc_html( $item->title ) . '</a>';
	}
	public function start_lvl( &$output, $depth = 0, $args = null ) {}
	public function end_lvl( &$output, $depth = 0, $args = null ) {}
	public function end_el( &$output, $item, $depth = 0, $args = null ) {}
}

/** Fallback navigation identical to the layout when no menu is assigned. */
function wpp_primary_menu_fallback() {
	$shop_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
	$blog_url = (int) get_option( 'page_for_posts' ) ? get_permalink( (int) get_option( 'page_for_posts' ) ) : home_url( '/blog/' );
	$items = array(
		array( __( 'Каталог', 'wp-panda' ), $shop_url, function_exists( 'is_woocommerce' ) && ( is_shop() || is_product_taxonomy() || is_product() ) ),
		array( __( 'Блог', 'wp-panda' ), $blog_url, is_home() || is_singular( 'post' ) || is_category() || is_tag() ),
		array( __( 'База знаний', 'wp-panda' ), home_url( '/kb/' ), wpp_is_kb() ),
		array( __( 'FAQ', 'wp-panda' ), home_url( '/faq/' ), is_page( 'faq' ) ),
	);
	foreach ( $items as $item ) {
		$classes = $item[2]
			? 'flex h-10 items-center px-4 text-sm font-semibold transition-all rounded-full bg-ink text-white shadow-[0_8px_20px_-10px_rgba(20,20,28,0.7)]'
			: 'flex h-10 items-center px-4 text-sm font-semibold transition-all rounded-full text-ink/75 hover:text-ink hover:bg-soft';
		echo '<a class="' . esc_attr( $classes ) . '" href="' . esc_url( $item[1] ) . '"' . ( $item[2] ? ' aria-current="page"' : '' ) . '>' . esc_html( $item[0] ) . '</a>';
	}
}

/** Whether the current page belongs to the knowledge base section. */
function wpp_is_kb() {
	if ( ! is_page() ) {
		return false;
	}
	$id = get_queried_object_id();
	if ( is_page( 'kb' ) ) {
		return true;
	}
	$key = (string) get_post_meta( $id, '_wpp_demo_key', true );
	if ( 0 === strpos( $key, 'kb:' ) ) {
		return true;
	}
	$parent = get_post( $id ) ? (int) get_post( $id )->post_parent : 0;
	while ( $parent ) {
		if ( is_page( 'kb', $parent ) || 0 === strpos( (string) get_post_meta( $parent, '_wpp_demo_key', true ), 'kb:' ) ) {
			return true;
		}
		$parent = (int) get_post( $parent )->post_parent;
	}
	return false;
}

/** Russian long date as printed by the layout («14 марта 2026»). */
function wpp_human_date( $timestamp ) {
	$months = array( 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря' );
	$month  = $months[ (int) gmdate( 'n', $timestamp ) - 1 ];
	return (int) gmdate( 'j', $timestamp ) . ' ' . $month . ' ' . gmdate( 'Y', $timestamp );
}

/** «Имя Ф.» style label for the compact account chip. */
function wpp_account_short_name() {
	$user = wp_get_current_user();
	if ( ! $user->exists() ) {
		return __( 'Войти', 'wp-panda' );
	}
	$first = $user->first_name ? $user->first_name : $user->display_name;
	$parts = explode( ' ', trim( $user->display_name ) );
	if ( $user->first_name && isset( $parts[1] ) && $parts[1] ) {
		return $user->first_name . ' ' . mb_substr( $parts[1], 0, 1 ) . '.';
	}
	return $first;
}

/**
 * Small square product tile used by search rows, cart lines and cross-sells.
 *
 * @param WC_Product $product     Product.
 * @param string     $size_class  Tile size classes (e.g. h-11 w-11 rounded-xl).
 */
function wpp_product_mini_tile( $product, $size_class = 'h-11 w-11 rounded-xl' ) {
	$spec = get_post_meta( $product->get_id(), '_wpp_mini_art', true );
	if ( is_string( $spec ) && $spec ) {
		$spec = json_decode( $spec, true );
	}
	if ( is_array( $spec ) && ! empty( $spec['bg'] ) ) {
		$inner = isset( $spec['inner'] ) ? wpp_kses_art( $spec['inner'] ) : '';
		if ( ! $inner && $product->get_image_id() ) {
			$inner = wp_get_attachment_image( $product->get_image_id(), 'thumbnail', false, array( 'class' => 'h-full w-full object-cover', 'alt' => '' ) );
		}
		return '<div class="relative flex flex-shrink-0 items-center justify-center overflow-hidden ' . esc_attr( $size_class ) . '" style="background: ' . esc_attr( $spec['bg'] ) . ';">' . $inner . '</div>';
	}
	if ( $product->get_image_id() ) {
		return '<div class="relative flex flex-shrink-0 items-center justify-center overflow-hidden ' . esc_attr( $size_class ) . '" style="background: rgb(246, 246, 248);">' . wp_get_attachment_image( $product->get_image_id(), 'thumbnail', false, array( 'class' => 'h-full w-full object-cover', 'alt' => '' ) ) . '</div>';
	}
	return '<div class="relative flex flex-shrink-0 items-center justify-center overflow-hidden ' . esc_attr( $size_class ) . '" style="background: rgb(246, 246, 248);"></div>';
}
