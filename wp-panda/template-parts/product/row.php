<?php
/**
 * Catalog row for the list view, markup identical to the supplied layout.
 *
 * @package WpPanda
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
$price        = (float) $product->get_price();
$regular      = (float) $product->get_regular_price();
$type_label   = 'theme' === $kind ? __( 'Тема', 'wp-panda' ) : ( 'plugin' === $kind ? __( 'Плагин', 'wp-panda' ) : __( 'Товар', 'wp-panda' ) );
$type_icon    = 'theme' === $kind ? 'palette' : 'plug';
$compat       = ( ! is_wp_error( $tags ) && $tags ) ? array_slice( wp_list_pluck( $tags, 'name' ), 0, 4 ) : array();
?>
<article class="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 sm:flex-row sm:items-stretch sm:gap-5 sm:p-4 <?php echo $in_cart ? 'border-brand shadow-picked ring-1 ring-brand' : 'border-line shadow-card hover:shadow-float'; ?>">
	<a class="relative w-full flex-shrink-0 cursor-pointer overflow-hidden rounded-xl sm:w-64 lg:w-72" href="<?php the_permalink(); ?>" aria-label="<?php echo esc_attr( sprintf( __( 'Открыть товар %s', 'wp-panda' ), $product->get_name() ) ); ?>">
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
	</a>
	<div class="flex min-w-0 flex-1 flex-col py-1">
		<div class="flex items-start justify-between gap-3">
			<div class="min-w-0">
				<h3 class="cursor-pointer text-lg font-semibold tracking-tight text-ink decoration-brand decoration-2 underline-offset-4 hover:underline sm:text-xl">
					<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
				</h3>
				<div class="mt-1 text-[11px] text-muted sm:text-xs"><?php esc_html_e( 'от', 'wp-panda' ); ?> <span class="font-medium text-ink"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></span>
					<?php if ( $tag_label ) : ?>
						<span class="mx-1 text-line">·</span> <?php echo esc_html( $tag_label ); ?>
					<?php endif; ?>
				</div>
			</div>
			<button aria-label="<?php esc_attr_e( 'В избранное', 'wp-panda' ); ?>" aria-pressed="<?php echo $wishlisted ? 'true' : 'false'; ?>" data-wpp-wishlist="<?php echo esc_attr( $product_id ); ?>" class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition hover:scale-105 <?php echo $wishlisted ? 'border-rose-200 bg-rose-50 text-rose-500' : 'border-line bg-white text-ink/60 hover:border-ink/20'; ?>">
				<?php echo wpp_icon( 'heart', 'h-4 w-4' . ( $wishlisted ? ' fill-rose-500' : '' ) ); ?>
			</button>
		</div>
		<p class="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted"><?php echo esc_html( wp_strip_all_tags( $product->get_short_description() ) ); ?></p>
		<?php if ( $compat ) : ?>
			<div class="mt-3 hidden flex-wrap gap-1.5 lg:flex">
				<?php foreach ( $compat as $wpp_compat ) : ?>
					<span class="rounded-full bg-soft px-2.5 py-1 text-[11px] font-medium text-muted"><?php echo esc_html( $wpp_compat ); ?></span>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</div>
	<div class="flex flex-shrink-0 flex-row items-center justify-between gap-3 border-t border-line pt-3 sm:w-52 sm:flex-col sm:items-stretch sm:justify-center sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
		<div>
			<div class="text-[10px] text-muted"><?php echo esc_html( wpp_license_line( $product ) ); ?></div>
			<div class="flex flex-wrap items-baseline gap-1.5">
				<span class="text-xl font-bold tabular-nums text-ink sm:text-2xl"><?php echo wpp_format_amount( $price ); ?></span>
				<?php if ( $regular > $price && $regular > 0 ) : ?>
					<span class="text-xs text-muted line-through"><?php echo wpp_format_amount( $regular ); ?></span>
				<?php endif; ?>
			</div>
		</div>
		<div class="flex gap-2 sm:flex-col">
			<?php if ( $in_cart ) : ?>
				<button data-cart-open aria-label="<?php echo esc_attr( sprintf( __( 'Открыть корзину с %s', 'wp-panda' ), $product->get_name() ) ); ?>" class="flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-4 text-[13px] font-bold transition-all duration-200 active:scale-[0.98] bg-brand text-ink shadow-glow sm:w-full">
					<?php echo wpp_icon( 'check', 'h-4 w-4', array( 'stroke' => '3' ) ); ?><?php esc_html_e( 'В корзине', 'wp-panda' ); ?>
				</button>
			<?php else : ?>
				<button type="button" aria-label="<?php echo esc_attr( sprintf( __( 'Добавить %s в корзину', 'wp-panda' ), $product->get_name() ) ); ?>" data-quantity="1" <?php if ( $product->is_type( 'variable' ) ) : $children = $product->get_children(); ?>data-product_id="<?php echo esc_attr( $product_id ); ?>" data-variation_id="<?php echo esc_attr( $children ? $children[0] : 0 ); ?>" class="wpp-add-variable flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-4 text-[13px] font-bold transition-all duration-200 active:scale-[0.98] border border-line bg-soft hover:border-brand hover:bg-brand sm:w-full"<?php else : ?>data-product_id="<?php echo esc_attr( $product_id ); ?>" data-product_sku="<?php echo esc_attr( $product->get_sku() ); ?>" class="add_to_cart_button product_type_simple ajax_add_to_cart flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-4 text-[13px] font-bold transition-all duration-200 active:scale-[0.98] border border-line bg-soft hover:border-brand hover:bg-brand sm:w-full"<?php endif; ?>>
					<?php echo wpp_icon( 'shopping-bag', 'h-4 w-4' ); ?><?php esc_html_e( 'Купить', 'wp-panda' ); ?>
				</button>
			<?php endif; ?>
			<a class="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink px-4 text-[13px] font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] sm:w-full" href="<?php the_permalink(); ?>">
				<?php echo wpp_icon( 'eye', 'h-4 w-4' ); ?><?php esc_html_e( 'Подробнее', 'wp-panda' ); ?>
			</a>
		</div>
	</div>
</article>
