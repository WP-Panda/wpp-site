<?php
/**
 * Generic page wrapper. WC pages render their own layouts; KB articles get
 * the knowledge-base layout; everything else a clean content container.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

get_header();

while ( have_posts() ) :
	the_post();

	$wpp_demo_key = (string) get_post_meta( get_the_ID(), '_wpp_demo_key', true );
	$wpp_is_wc    = function_exists( 'is_cart' ) && ( is_cart() || is_checkout() || ( function_exists( 'is_account_page' ) && is_account_page() ) );

	if ( $wpp_is_wc ) :
		?>
		<div class="wpp-wc-page">
			<?php the_content(); ?>
		</div>
		<?php
	elseif ( 'kb:' === substr( $wpp_demo_key, 0, 3 ) && 'kb:index' !== $wpp_demo_key ) :
		get_template_part( 'template-parts/kb/article' );
	else :
		?>
		<div class="mx-auto max-w-[1200px] px-4 pt-10 pb-24 sm:px-6">
			<h1 class="text-3xl font-bold tracking-tight sm:text-[44px] sm:leading-[1.1]"><?php the_title(); ?></h1>
			<div class="prose-wpp mt-6 max-w-3xl text-[16px] leading-[1.8] text-ink/85"><?php the_content(); ?></div>
		</div>
	<?php endif; ?>
<?php endwhile; ?>
<?php
get_footer();
