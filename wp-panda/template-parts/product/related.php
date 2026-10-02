<?php
/**
 * «Другие продукты автора» card row at the end of the description panel.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

global $product;
$kind = wpp_product_kind( $product->get_id() );
$query = new WP_Query( array(
	'post_type'      => 'product',
	'post_status'    => 'publish',
	'posts_per_page' => 4,
	'post__not_in'   => array( $product->get_id() ),
	'tax_query'      => array( array(
		'taxonomy' => 'product_cat',
		'field'    => 'slug',
		'terms'    => 'theme' === $kind ? array( 'wordpress-themes', 'themes' ) : array( 'wordpress-plugins', 'plugins' ),
	) ),
	'orderby'        => 'rand',
) );
if ( ! $query->have_posts() ) {
	wp_reset_postdata();
	return;
}
?>
<section class="mt-16 border-t border-line pt-9">
	<h2 class="mt-1 text-2xl font-bold tracking-tight"><?php echo 'theme' === $kind ? esc_html__( 'Другие темы автора', 'wp-panda' ) : esc_html__( 'Другие плагины автора', 'wp-panda' ); ?></h2>
	<div class="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		<?php
		while ( $query->have_posts() ) {
			$query->the_post();
			$GLOBALS['product'] = wc_get_product( get_the_ID() );
			wc_get_template_part( 'content', 'product' );
		}
		wp_reset_postdata();
		?>
	</div>
</section>
