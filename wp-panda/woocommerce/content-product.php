<?php
/**
 * Catalog product card, markup identical to the supplied layout.
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
$in_cart      = wpp_product_in_cart( $product_id );
$wishlisted   = wpp_in_wishlist( $product_id );
$sale_percent = wpp_sale_percent( $product );
$tags         = get_the_terms( $product_id, 'product_tag' );
$tag_label    = ( ! is_wp_error( $tags ) && $tags ) ? $tags[0]->name : '';
$rating       = (float) $product->get_average_rating();
$review_count = (int) $product->get_review_count();
$sales        = (int) get_post_meta( $product_id, 'total_sales', true );
$price        = (float) $product->get_price();
$regular      = (float) $product->get_regular_price();
$type_label   = 'theme' === $kind ? __( 'Тема', 'wp-panda' ) : ( 'plugin' === $kind ? __( 'Плагин', 'wp-panda' ) : __( 'Товар', 'wp-panda' ) );
$type_icon    = 'theme' === $kind ? 'palette' : 'plug';
?>
<article <?php wc_product_class( 'group relative flex flex-col overflow-hidden rounded-2xl border bg-white p-2.5 transition-all duration-300 hover:-translate-y-1 ' . ( $in_cart ? 'border-brand shadow-picked ring-1 ring-brand' : 'border-line shadow-card hover:shadow-float' ), $product ); ?> data-home-card="<?php echo esc_attr( 'theme' === $kind ? 'theme' : ( 'plugin' === $kind ? 'plugin' : 'other' ) ); ?>">
	<a class="relative cursor-pointer overflow-hidden rounded-xl" href="<?php the_permalink(); ?>" aria-label="<?php echo esc_attr( sprintf( __( 'Открыть товар %s', 'wp-panda' ), $product->get_name() ) ); ?>">
		<?php do_action( 'woocommerce_before_shop_loop_item_title' ); ?>
		<?php wpp_render_product_art( $product ); ?>
		<div class="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
			<span class="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm backdrop-blur">
				<?php echo wpp_icon( $type_icon, 'h-3 w-3' ); ?><?php echo esc_html( $type_label ); ?>
			</span>
			<?php if ( $version ) : ?>
				<span class="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm backdrop-blur">v<?php echo esc_html( $version ); ?></span>
			<?php endif; ?>
		</div>
		<?php if ( $product->is_featured() ) : ?>
			<div class="absolute bottom-2.5 left-2.5">
				<span class="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white"><?php esc_html_e( 'Хит продаж', 'wp-panda' ); ?></span>
			</div>
		<?php endif; ?>
		<?php if ( $sale_percent > 0 ) : ?>
			<span class="absolute bottom-2.5 right-2.5 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold text-ink">−<?php echo esc_html( $sale_percent ); ?>%</span>
		<?php endif; ?>
		<?php if ( $in_cart ) : ?>
			<div class="absolute right-2.5 top-2.5">
				<span class="pop flex h-7 w-7 items-center justify-center rounded-full bg-brand text-ink shadow-glow ring-white ring-2">
					<?php echo wpp_icon( 'check', 'h-4 w-4', array( 'stroke' => '3' ) ); ?>
				</span>
			</div>
		<?php else : ?>
			<div class="absolute right-2.5 top-2.5">
				<button aria-label="<?php esc_attr_e( 'В избранное', 'wp-panda' ); ?>" aria-pressed="<?php echo $wishlisted ? 'true' : 'false'; ?>" data-wpp-wishlist="<?php echo esc_attr( $product_id ); ?>" class="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur transition hover:scale-110 <?php echo $wishlisted ? 'text-rose-500' : 'text-ink/60'; ?>">
					<?php echo wpp_icon( 'heart', 'h-4 w-4' . ( $wishlisted ? ' fill-rose-500' : '' ) ); ?>
				</button>
			</div>
		<?php endif; ?>
		<div class="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-200 group-hover:bg-ink/15">
			<span class="flex translate-y-2 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-ink opacity-0 shadow-float transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
				<?php echo wpp_icon( 'eye', 'h-3.5 w-3.5' ); ?> <?php esc_html_e( 'Подробнее', 'wp-panda' ); ?>
			</span>
		</div>
	</a>
	<div class="flex flex-1 flex-col px-1.5 pb-1 pt-3.5">
		<div class="flex items-start justify-between gap-2">
			<h3 class="line-clamp-1 cursor-pointer text-[16px] font-semibold tracking-tight text-ink decoration-brand decoration-2 underline-offset-4 hover:underline">
				<?php do_action( 'woocommerce_shop_loop_item_title' ); ?>
				<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
			</h3>
		</div>
		<div class="mt-1 text-[11px] text-muted"><?php esc_html_e( 'от', 'wp-panda' ); ?> <span class="font-medium text-ink"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></span>
			<?php if ( $tag_label ) : ?>
				<span class="mx-1 text-line">·</span> <?php echo esc_html( $tag_label ); ?>
			<?php endif; ?>
		</div>
		<p class="mt-2 line-clamp-2 min-h-9 text-[12px] leading-relaxed text-muted"><?php echo esc_html( wp_strip_all_tags( $product->get_short_description() ) ); ?></p>
		<div class="mt-2.5 flex items-center justify-between gap-2 border-t border-line pt-2.5">
			<div class="flex min-w-0 items-center gap-1.5">
				<?php echo wpp_rating_stars(); ?>
				<span class="text-[11px] font-semibold text-ink"><?php echo esc_html( $rating ? number_format_i18n( $rating, 1 ) : '—' ); ?></span>
				<span class="truncate text-[11px] text-muted"><?php echo wpp_review_count_label( $review_count ); ?></span>
			</div>
			<span class="flex flex-shrink-0 items-center gap-1 text-[11px] text-muted" title="<?php esc_attr_e( 'Количество продаж', 'wp-panda' ); ?>">
				<?php echo wpp_icon( 'shopping-bag', 'h-3 w-3' ); ?> <?php echo wpp_sales_label( $sales ); ?>
			</span>
		</div>
		<div class="mt-auto flex items-center justify-between gap-2 pt-3">
			<div class="min-w-0">
				<div class="text-[10px] text-muted"><?php echo esc_html( wpp_license_line( $product ) ); ?></div>
				<div class="flex flex-wrap items-baseline gap-1.5">
					<span class="text-lg font-bold tabular-nums text-ink"><?php echo wpp_format_amount( $price ); ?></span>
					<?php if ( $regular > $price && $regular > 0 ) : ?>
						<span class="text-[11px] text-muted line-through"><?php echo wpp_format_amount( $regular ); ?></span>
					<?php endif; ?>
				</div>
			</div>
			<?php if ( $in_cart ) : ?>
				<button data-cart-open aria-label="<?php echo esc_attr( sprintf( __( 'Открыть корзину с %s', 'wp-panda' ), $product->get_name() ) ); ?>" class="flex h-12 flex-shrink-0 items-center justify-center gap-2 rounded-full px-4 text-[13px] font-bold transition-all duration-200 active:scale-[0.98] bg-brand text-ink shadow-glow">
					<?php echo wpp_icon( 'check', 'h-4 w-4', array( 'stroke' => '3' ) ); ?><?php esc_html_e( 'В корзине', 'wp-panda' ); ?>
				</button>
			<?php else : ?>
				<button type="button" aria-label="<?php echo esc_attr( sprintf( __( 'Добавить %s в корзину', 'wp-panda' ), $product->get_name() ) ); ?>" data-quantity="1" <?php if ( $product->is_type( 'variable' ) ) : $children = $product->get_children(); ?>data-product_id="<?php echo esc_attr( $product_id ); ?>" data-variation_id="<?php echo esc_attr( $children ? $children[0] : 0 ); ?>" class="wpp-add-variable flex h-12 flex-shrink-0 items-center justify-center gap-2 rounded-full px-4 text-[13px] font-bold transition-all duration-200 active:scale-[0.98] border border-line bg-soft hover:border-brand hover:bg-brand"<?php else : ?>data-product_id="<?php echo esc_attr( $product_id ); ?>" data-product_sku="<?php echo esc_attr( $product->get_sku() ); ?>" class="add_to_cart_button product_type_simple flex h-12 flex-shrink-0 items-center justify-center gap-2 rounded-full px-4 text-[13px] font-bold transition-all duration-200 active:scale-[0.98] border border-line bg-soft hover:border-brand hover:bg-brand"<?php endif; ?>>
					<?php echo wpp_icon( 'shopping-bag', 'h-4 w-4' ); ?><?php esc_html_e( 'Купить', 'wp-panda' ); ?><?php echo wpp_icon( 'arrow-up-right', 'h-3.5 w-3.5' ); ?>
				</button>
			<?php endif; ?>
		</div>
	</div>
	<?php do_action( 'woocommerce_after_shop_loop_item' ); ?>
</article>
