<?php
/**
 * Category/tag/date archives reusing the blog grid.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<div class="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12 pb-10">
	<header class="fade-up mx-auto max-w-3xl text-center">
		<div class="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium shadow-card">
			<span class="h-1.5 w-1.5 rounded-full bg-brand"></span><?php esc_html_e( 'Блог', 'wp-panda' ); ?>
		</div>
		<h1 class="text-3xl font-bold tracking-tight sm:text-[44px] sm:leading-[1.1]"><?php the_archive_title(); ?></h1>
		<?php the_archive_description( '<p class="mt-3 text-muted">', '</p>' ); ?>
	</header>
	<div class="mt-10">
		<?php if ( have_posts() ) : ?>
			<?php get_template_part( 'template-parts/blog/loop' ); ?>
			<?php the_posts_pagination( array( 'mid_size' => 2 ) ); ?>
		<?php else : ?>
			<p class="text-center text-muted"><?php esc_html_e( 'Статей пока нет.', 'wp-panda' ); ?></p>
		<?php endif; ?>
	</div>
</div>
<?php
get_footer();
