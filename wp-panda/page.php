<?php
/**
 * Обычная страница (page.php).
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
while ( have_posts() ) :
	the_post();
	?>
	<article class="mx-auto max-w-[900px] px-4 pt-10 sm:px-6">
		<?php wpp_breadcrumbs( array( get_the_title() => '' ) ); ?>
		<h1 class="mt-6 text-4xl font-extrabold tracking-[-0.03em] text-ink"><?php the_title(); ?></h1>
		<div class="prose-wpp mt-8"><?php the_content(); ?></div>
	</article>
	<?php
endwhile;
get_footer();
