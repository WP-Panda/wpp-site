<?php
/**
 * Single product page, markup identical to the supplied layout.
 *
 * @package WpPanda
 * @version 7.0.1
 */

defined( 'ABSPATH' ) || exit;

global $product;

if ( ! $product || ! $product->is_visible() ) {
	return;
}

$product_id   = $product->get_id();
$kind         = wpp_product_kind( $product_id );
$version      = wpp_product_version( $product );
$rating       = (float) $product->get_average_rating();
$review_count = (int) $product->get_review_count();
$comment_count = (int) get_comments_number( $product_id );
$sales        = (int) get_post_meta( $product_id, 'total_sales', true );
$sale_percent = wpp_sale_percent( $product );
$wishlisted   = wpp_in_wishlist( $product_id );
$in_cart      = wpp_product_in_cart( $product_id );
$price        = (float) $product->get_price();
$regular      = (float) $product->get_regular_price();
$cat_terms    = wc_get_product_terms( $product_id, 'product_cat', array( 'number' => 1 ) );
$tag_terms    = wc_get_product_terms( $product_id, 'product_tag' );
$updated      = get_post_meta( $product_id, '_wpp_updated', true );
$shop_url     = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
?>
<div class="item-page mx-auto max-w-[1200px] px-4 pb-24 pt-6 sm:px-6 lg:pb-8">
	<nav class="flex flex-wrap items-center gap-1.5 text-xs text-muted" aria-label="<?php esc_attr_e( 'Хлебные крошки', 'wp-panda' ); ?>">
		<a class="transition hover:text-ink" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Главная', 'wp-panda' ); ?></a>
		<span class="text-line">/</span>
		<?php if ( $cat_terms && ! is_wp_error( $cat_terms ) ) : ?>
			<a class="transition hover:text-ink" href="<?php echo esc_url( get_term_link( $cat_terms[0] ) ); ?>"><?php echo esc_html( $cat_terms[0]->name ); ?></a>
			<span class="text-line">/</span>
		<?php endif; ?>
		<?php if ( $tag_terms && ! is_wp_error( $tag_terms ) ) : ?>
			<a class="transition hover:text-ink" href="<?php echo esc_url( get_term_link( $tag_terms[0] ) ); ?>"><?php echo esc_html( $tag_terms[0]->name ); ?></a>
			<span class="text-line">/</span>
		<?php endif; ?>
		<span class="font-medium text-ink"><?php the_title(); ?></span>
	</nav>
	<header class="mt-6">
		<h1 class="max-w-[1050px] text-[27px] font-bold leading-[1.3] tracking-tight sm:text-[34px]"><?php the_title(); ?><span class="font-medium"> - <?php echo esc_html( wp_strip_all_tags( $product->get_short_description() ) ); ?></span></h1>
		<div class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs sm:text-[13px]">
			<span class="text-muted"><?php esc_html_e( 'Автор', 'wp-panda' ); ?> <span class="ml-1 font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></span></span>
			<span class="flex items-center gap-1.5 text-muted">
				<?php echo wpp_icon( 'shopping-bag', 'h-3.5 w-3.5' ); ?> <?php echo str_replace( '&nbsp;', '&nbsp;', wpp_sales_label( $sales ) ); ?>
			</span>
			<button class="flex items-center gap-1.5" aria-label="<?php esc_attr_e( 'Перейти к отзывам', 'wp-panda' ); ?>" data-product-tab="reviews" data-scroll-to-tabs>
				<?php echo wpp_icon( 'star', 'fill-brand text-brand', array( 'style' => 'width: 13px; height: 13px;' ) ); ?>
				<b><?php echo esc_html( $rating ? number_format_i18n( $rating, 1 ) : '—' ); ?></b>
				<span class="text-muted">(<?php echo esc_html( sprintf( _n( '%s отзыв', '%s отзывов', $review_count, 'wp-panda' ), number_format_i18n( $review_count ) ) ); ?>)</span>
			</button>
			<span class="flex items-center gap-1.5 font-medium text-emerald-700">
				<?php echo wpp_icon( 'shield-check', 'h-3.5 w-3.5' ); ?> <?php esc_html_e( 'Регулярные обновления', 'wp-panda' ); ?>
			</span>
		</div>
	</header>
	<div class="mt-7 flex items-center justify-between gap-5 border-b border-line">
		<div role="tablist" aria-label="<?php esc_attr_e( 'Информация о товаре', 'wp-panda' ); ?>" class="no-scrollbar flex min-w-0 flex-1 scroll-mt-24 gap-5 overflow-x-auto sm:gap-7">
			<button type="button" role="tab" id="item-tab-details" aria-selected="true" aria-controls="item-panel-details" tabindex="0" data-product-tab="details" class="relative flex h-14 flex-shrink-0 items-center gap-2 whitespace-nowrap border-b-[3px] pt-[3px] text-[13px] font-semibold transition-colors border-brand text-ink"><?php esc_html_e( 'Описание', 'wp-panda' ); ?></button>
			<button type="button" role="tab" id="item-tab-reviews" aria-selected="false" aria-controls="item-panel-reviews" tabindex="-1" data-product-tab="reviews" class="relative flex h-14 flex-shrink-0 items-center gap-2 whitespace-nowrap border-b-[3px] pt-[3px] text-[13px] font-semibold transition-colors border-transparent text-muted hover:text-ink"><?php esc_html_e( 'Отзывы', 'wp-panda' ); ?><span class="rounded-md px-1.5 py-0.5 text-[10px] font-medium tabular-nums bg-soft text-muted"><?php echo esc_html( number_format_i18n( $review_count ) ); ?></span></button>
			<button type="button" role="tab" id="item-tab-comments" aria-selected="false" aria-controls="item-panel-comments" tabindex="-1" data-product-tab="comments" class="relative flex h-14 flex-shrink-0 items-center gap-2 whitespace-nowrap border-b-[3px] pt-[3px] text-[13px] font-semibold transition-colors border-transparent text-muted hover:text-ink"><?php esc_html_e( 'Комментарии', 'wp-panda' ); ?><span class="rounded-md px-1.5 py-0.5 text-[10px] font-medium tabular-nums bg-soft text-muted"><?php echo esc_html( number_format_i18n( $comment_count ) ); ?></span></button>
			<button type="button" role="tab" id="item-tab-changelog" aria-selected="false" aria-controls="item-panel-changelog" tabindex="-1" data-product-tab="changelog" class="relative flex h-14 flex-shrink-0 items-center gap-2 whitespace-nowrap border-b-[3px] pt-[3px] text-[13px] font-semibold transition-colors border-transparent text-muted hover:text-ink"><?php esc_html_e( 'История версий', 'wp-panda' ); ?></button>
		</div>
		<a class="hidden flex-shrink-0 items-center gap-1.5 text-xs font-medium text-muted transition hover:text-ink lg:flex" href="<?php echo esc_url( function_exists( 'wc_get_account_endpoint_url' ) ? wc_get_account_endpoint_url( 'support' ) : home_url( '/my-account/' ) ); ?>">
			<?php echo wpp_icon( 'life-buoy', 'h-3.5 w-3.5' ); ?> <?php esc_html_e( 'Поддержка в кабинете', 'wp-panda' ); ?>
		</a>
	</div>
	<div class="item-layout mt-7 item-layout--details">
		<?php get_template_part( 'template-parts/product/media' ); ?>
		<aside class="item-sidebar" aria-label="<?php esc_attr_e( 'Покупка и характеристики товара', 'wp-panda' ); ?>">
			<?php get_template_part( 'template-parts/product/buy-box' ); ?>
			<?php get_template_part( 'template-parts/product/information' ); ?>
		</aside>
		<div id="item-panel-details" role="tabpanel" aria-labelledby="item-tab-details" tabindex="0" data-product-panel="details" class="item-content min-w-0 outline-none">
			<?php the_content(); ?>
			<?php get_template_part( 'template-parts/product/related' ); ?>
		</div>
		<div id="item-panel-reviews" role="tabpanel" aria-labelledby="item-tab-reviews" tabindex="0" data-product-panel="reviews" class="item-content min-w-0 outline-none hidden">
			<?php get_template_part( 'template-parts/product/reviews' ); ?>
		</div>
		<div id="item-panel-comments" role="tabpanel" aria-labelledby="item-tab-comments" tabindex="0" data-product-panel="comments" class="item-content min-w-0 outline-none hidden">
			<?php get_template_part( 'template-parts/product/comments' ); ?>
		</div>
		<div id="item-panel-changelog" role="tabpanel" aria-labelledby="item-tab-changelog" tabindex="0" data-product-panel="changelog" class="item-content min-w-0 outline-none hidden">
			<?php get_template_part( 'template-parts/product/changelog' ); ?>
		</div>
	</div>
	<div class="lg:hidden">
		<div class="fade-in fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/90 backdrop-blur-xl">
			<div class="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
				<span class="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-ink sm:flex">
					<?php echo wpp_icon( 'shopping-bag', 'h-5 w-5' ); ?>
				</span>
				<div class="min-w-0 flex-1">
					<div class="wpp-mobile-buy-label truncate text-sm font-semibold"><?php echo esc_html( $product->get_name() ); ?> · <?php echo esc_html( $product->is_type( 'variable' ) ? __( '1 сайт', 'wp-panda' ) : __( 'Навсегда', 'wp-panda' ) ); ?></div>
					<div class="wpp-mobile-buy-price text-lg font-bold tabular-nums"><?php echo wpp_format_amount( $price ); ?></div>
				</div>
				<?php if ( $in_cart ) : ?>
					<button type="button" data-cart-open class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-11 px-5 text-sm"><?php echo wpp_icon( 'check', 'h-4 w-4' ); ?><?php esc_html_e( 'В корзине', 'wp-panda' ); ?></button>
				<?php else : ?>
					<button type="button" data-quantity="1" <?php if ( $product->is_type( 'variable' ) ) { $wpp_children = $product->get_children(); ?>data-product_id="<?php echo esc_attr( $product_id ); ?>" data-variation_id="<?php echo esc_attr( $wpp_children ? $wpp_children[0] : 0 ); ?>" class="wpp-add-variable inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-11 px-5 text-sm"<?php } else { ?>data-product_id="<?php echo esc_attr( $product_id ); ?>" data-product_sku="<?php echo esc_attr( $product->get_sku() ); ?>" class="add_to_cart_button product_type_simple inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-11 px-5 text-sm"<?php } ?>><?php esc_html_e( 'В корзину', 'wp-panda' ); ?></button>
				<?php endif; ?>
			</div>
		</div>
	</div>
</div>
