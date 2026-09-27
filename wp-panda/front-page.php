<?php
/** Front page assembled from small presentation components and live WordPress/WooCommerce data. */
get_header();
?>
<main id="primary" class="site-main fade-in flex-1">
	<?php get_template_part( 'template-parts/home/hero' ); ?>
	<?php if ( have_posts() ) : ?>
		<?php while ( have_posts() ) : the_post(); ?>
			<?php if ( trim( wp_strip_all_tags( get_the_content() ) ) ) : ?><section class="front-page-editor-content mx-auto max-w-[1200px] px-4 py-10 sm:px-6"><div class="entry-content prose-content"><?php the_content(); ?></div></section><?php endif; ?>
		<?php endwhile; ?>
	<?php endif; ?>
	<?php get_template_part( 'template-parts/home/featured' ); ?>
	<?php get_template_part( 'template-parts/home/all-access' ); ?>
	<?php get_template_part( 'template-parts/home/use-cases' ); ?>
	<?php get_template_part( 'template-parts/home/benefits' ); ?>
	<?php get_template_part( 'template-parts/home/licensing' ); ?>
	<?php get_template_part( 'template-parts/home/testimonials' ); ?>
	<?php get_template_part( 'template-parts/home/latest-posts' ); ?>
</main>
<?php get_footer(); ?>
