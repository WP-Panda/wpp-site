<?php
/** Generic post type/date/category archive. */
get_header();
?>
<main id="primary" class="site-main content-container mx-auto w-full max-w-[1200px] flex-1 px-4 py-12 sm:px-6 lg:py-16">
	<header class="page-heading">
		<?php the_archive_title( '<h1 class="text-3xl font-bold tracking-tight sm:text-4xl">', '</h1>' ); ?>
		<?php the_archive_description( '<div class="archive-description">', '</div>' ); ?>
	</header>
	<?php if ( have_posts() ) : ?>
		<div class="editorial-grid editorial-grid--three">
			<?php while ( have_posts() ) : the_post(); ?>
				<?php get_template_part( 'template-parts/content', get_post_type() ); ?>
			<?php endwhile; ?>
		</div>
		<?php the_posts_pagination(); ?>
	<?php else : ?>
		<div class="empty-state"><h2><?php esc_html_e( 'Записей пока нет', 'wp-panda' ); ?></h2></div>
	<?php endif; ?>
</main>
<?php get_footer(); ?>
