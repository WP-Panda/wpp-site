<?php
/** Product card matching the supplied catalog component while using live WooCommerce data. */
defined( 'ABSPATH' ) || exit;
global $product;

if ( ! is_a( $product, 'WC_Product' ) || ! $product->is_visible() ) {
	return;
}

$product_id   = $product->get_id();
$product_url  = get_permalink( $product_id );
$is_theme     = has_term( 'wordpress-themes', 'product_cat', $product_id );
$type_label   = $is_theme ? __( 'Тема', 'wp-panda' ) : __( 'Плагин', 'wp-panda' );
$version      = trim( wp_strip_all_tags( $product->get_attribute( 'Версия' ) ) );
$description  = trim( wp_strip_all_tags( $product->get_short_description() ) );
$rating       = (float) $product->get_average_rating();
$reviews      = (int) $product->get_review_count();
$sales        = (int) $product->get_total_sales();
$regular      = (float) $product->get_regular_price();
$current      = (float) $product->get_price();
$discount     = $regular > $current && $current > 0 ? (int) round( ( 1 - $current / $regular ) * 100 ) : 0;
$category     = '';
$excluded     = array( 'wordpress', 'gutenberg', 'elementor', 'woocommerce', 'wpml' );
$tags         = get_the_terms( $product_id, 'product_tag' );
if ( $tags && ! is_wp_error( $tags ) ) {
	foreach ( $tags as $tag ) {
		if ( ! in_array( strtolower( $tag->slug ), $excluded, true ) ) { $category = $tag->name; break; }
	}
}
if ( ! $category ) {
	$category = $is_theme ? __( 'Темы WordPress', 'wp-panda' ) : __( 'Плагины WordPress', 'wp-panda' );
}
$button_text = $product->is_purchasable() && $product->is_in_stock() ? __( 'Купить', 'wp-panda' ) : __( 'Подробнее', 'wp-panda' );
$button_url  = $product->add_to_cart_url();
$button_class = implode( ' ', array_filter( array(
	'button',
	'wpp-product-card__buy',
	'product_type_' . $product->get_type(),
	$product->supports( 'ajax_add_to_cart' ) ? 'add_to_cart_button ajax_add_to_cart' : '',
) ) );
?>
<li <?php wc_product_class( 'wpp-product-card-wrap', $product ); ?>>
	<article class="wpp-product-card group">
		<div class="wpp-product-card__media">
			<a class="wpp-product-card__media-link" href="<?php echo esc_url( $product_url ); ?>" aria-label="<?php echo esc_attr( sprintf( __( 'Открыть товар %s', 'wp-panda' ), $product->get_name() ) ); ?>">
				<?php echo wp_kses_post( $product->get_image( 'wpp-product-card', array( 'loading' => 'lazy' ) ) ); ?>
				<span class="wpp-product-card__details"><?php echo wpp_icon( 'search', 'h-3.5 w-3.5' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> <?php esc_html_e( 'Подробнее', 'wp-panda' ); ?></span>
			</a>
			<div class="wpp-product-card__badges"><span><?php echo esc_html( $type_label ); ?></span><?php if ( $version ) : ?><span>v<?php echo esc_html( $version ); ?></span><?php endif; ?></div>
			<?php if ( $discount ) : ?><span class="wpp-product-card__discount">−<?php echo esc_html( $discount ); ?>%</span><?php endif; ?>
			<div class="wpp-product-card__wishlist"><?php if ( function_exists( 'wpp_single_product_wishlist_button' ) ) { wpp_single_product_wishlist_button(); } ?></div>
		</div>
		<div class="wpp-product-card__content">
			<h2 class="woocommerce-loop-product__title"><a href="<?php echo esc_url( $product_url ); ?>"><?php echo esc_html( $product->get_name() ); ?></a></h2>
			<div class="wpp-product-card__author"><?php esc_html_e( 'от', 'wp-panda' ); ?> <strong><?php bloginfo( 'name' ); ?></strong><span>·</span><?php echo esc_html( $category ); ?></div>
			<?php if ( $description ) : ?><p class="wpp-product-card__description"><?php echo esc_html( $description ); ?></p><?php endif; ?>
			<div class="wpp-product-card__stats"><span class="wpp-product-card__rating"><span class="wpp-product-card__stars" aria-label="<?php echo esc_attr( sprintf( __( 'Рейтинг: %s из 5', 'wp-panda' ), $rating ? number_format_i18n( $rating, 1 ) : '5.0' ) ); ?>" aria-hidden="true">★★★★★</span><b><?php echo esc_html( $rating ? number_format_i18n( $rating, 1 ) : '5.0' ); ?></b><small>(<?php echo esc_html( number_format_i18n( $reviews ) ); ?>)</small></span><span class="wpp-product-card__sales"><?php echo wpp_icon( 'cart', 'h-3 w-3' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> <?php echo esc_html( number_format_i18n( $sales ) ); ?> <?php esc_html_e( 'продаж', 'wp-panda' ); ?></span></div>
			<div class="wpp-product-card__purchase"><div><small><?php echo $is_theme ? esc_html__( '1 сайт / 5 сайтов', 'wp-panda' ) : esc_html__( 'Навсегда', 'wp-panda' ); ?></small><div class="price"><?php echo wp_kses_post( $product->get_price_html() ); ?></div></div><a href="<?php echo esc_url( $button_url ); ?>" data-quantity="1" class="<?php echo esc_attr( $button_class ); ?>" data-product_id="<?php echo esc_attr( $product_id ); ?>" data-product_sku="<?php echo esc_attr( $product->get_sku() ); ?>" aria-label="<?php echo esc_attr( $product->add_to_cart_description() ); ?>" rel="nofollow"><?php echo wpp_icon( 'cart', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php echo esc_html( $button_text ); ?><?php echo wpp_icon( 'chevron', 'h-3.5 w-3.5' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a></div>
		</div>
	</article>
</li>
