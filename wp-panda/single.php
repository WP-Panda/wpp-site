<?php
/**
 * Одна запись блога (single.php).
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
while ( have_posts() ) :
	the_post();
	$cats    = get_the_category();
	$product = get_post_meta( get_the_ID(), '_wpp_product', true );
	$pdata   = null;
	if ( $product && wpp_has_woo() ) {
		$found = get_posts( array(
			'post_type'      => 'product',
			'name'           => $product,
			'posts_per_page' => 1,
		) );
		if ( $found ) {
			$pdata = wpp_product_data( wc_get_product( $found[0]->ID ) );
		}
	}
	?>
	<article class="mx-auto max-w-[900px] px-4 pt-8 sm:px-6">
		<?php wpp_breadcrumbs( array( __( 'Блог', 'wp-panda' ) => home_url( '/' ), get_the_title() => '' ) ); ?>

		<div class="mt-6 flex flex-wrap items-center gap-2">
			<?php foreach ( $cats as $c ) : ?>
				<a href="<?php echo esc_url( get_category_link( $c ) ); ?>" class="rounded-full bg-soft px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-brand-50 hover:text-ink"><?php echo esc_html( $c->name ); ?></a>
			<?php endforeach; ?>
		</div>

		<h1 class="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-ink sm:text-4xl"><?php the_title(); ?></h1>

		<div class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
			<span class="flex items-center gap-2">
				<?php echo get_avatar( get_the_author_meta( 'ID' ), 28, '', '', array( 'class' => 'h-7 w-7 rounded-full object-cover' ) ); ?>
				<span class="font-semibold text-ink"><?php the_author(); ?></span>
			</span>
			<span><?php echo esc_html( get_the_date( 'j F Y' ) ); ?></span>
			<span class="flex items-center gap-1"><?php wpp_icon( 'clock', 'h-3.5 w-3.5' ); ?><?php echo esc_html( wpp_read_time() ); ?></span>
		</div>

		<?php if ( has_post_thumbnail() ) : ?>
			<div class="mt-8 overflow-hidden rounded-card border border-line shadow-card">
				<?php the_post_thumbnail( 'full', array( 'class' => 'aspect-[16/9] w-full object-cover' ) ); ?>
			</div>
		<?php endif; ?>

		<div class="prose-wpp mt-10"><?php the_content(); ?></div>

		<?php if ( $pdata ) : ?>
			<!-- Упомянутый продукт -->
			<div class="mt-10 flex flex-col gap-4 rounded-card border border-line bg-white p-3 shadow-card sm:flex-row sm:items-center">
				<div class="w-full overflow-hidden rounded-2xl sm:w-48">
					<?php wpp_product_media( $pdata ); ?>
				</div>
				<div class="flex-1 px-2 sm:px-0">
					<div class="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"><?php esc_html_e( 'Упомянуто в статье', 'wp-panda' ); ?></div>
					<div class="mt-1 text-lg font-semibold"><?php echo esc_html( $pdata['name'] ); ?></div>
					<div class="text-sm leading-relaxed text-muted"><?php echo esc_html( $pdata['tagline'] ); ?></div>
				</div>
				<div class="flex gap-2 px-2 pb-2 sm:flex-col sm:p-0 sm:pr-3">
					<?php if ( $pdata['id'] ) : ?>
						<a href="<?php echo esc_url( '?add-to-cart=' . $pdata['id'] ); ?>" data-quantity="1" class="add_to_cart_button ajax_add_to_cart inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-ink shadow-glow transition hover:bg-brand-600" data-product_id="<?php echo esc_attr( $pdata['id'] ); ?>">
							<?php esc_html_e( 'В корзину', 'wp-panda' ); ?> · <?php echo wp_kses_post( $pdata['price_html'] ? $pdata['price_html'] : wpp_rub( $pdata['price'] ) ); ?>
						</a>
					<?php endif; ?>
					<a href="<?php echo esc_url( $pdata['link'] ); ?>" class="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-ink transition hover:bg-soft"><?php esc_html_e( 'Подробнее', 'wp-panda' ); ?></a>
				</div>
			</div>
		<?php endif; ?>

		<?php
		$related = get_posts( array(
			'category__in'   => wp_get_post_categories( get_the_ID() ),
			'post__not_in'   => array( get_the_ID() ),
			'posts_per_page' => 3,
		) );
		if ( $related ) :
			?>
			<section class="mt-16">
				<h2 class="text-2xl font-bold tracking-tight"><?php esc_html_e( 'Читайте также', 'wp-panda' ); ?></h2>
				<div class="mt-6 grid gap-5 md:grid-cols-3">
					<?php foreach ( $related as $r ) : ?>
						<?php wpp_post_card( $r ); ?>
					<?php endforeach; ?>
				</div>
			</section>
		<?php endif; ?>
	</article>

	<?php if ( comments_open() || get_comments_number() ) : ?>
		<div class="mx-auto max-w-[900px] px-4 sm:px-6">
			<?php comments_template(); ?>
		</div>
	<?php endif; ?>
	<?php
endwhile;
get_footer();
