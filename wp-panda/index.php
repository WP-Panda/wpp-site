<?php
/** Default archive loop. */
get_header();
?>
<main id="primary" class="site-main content-container mx-auto w-full max-w-[1200px] flex-1 px-4 py-12 sm:px-6">
	<?php if ( have_posts() ) : ?>
		<header class="page-heading">
			<h1 class="text-3xl font-bold tracking-tight sm:text-4xl"><?php esc_html_e( 'Последние публикации', 'wp-panda' ); ?></h1>
		</header>
		<div class="editorial-grid">
			<?php while ( have_posts() ) : the_post(); ?>
				<?php get_template_part( 'template-parts/content', get_post_type() ); ?>
			<?php endwhile; ?>
		</div>
		<?php the_posts_pagination(); ?>
	<?php else : ?>
		<p><?php esc_html_e( 'Пока здесь нет записей.', 'wp-panda' ); ?></p>
	<?php endif; ?>
</main>
<?php get_footer(); ?>
