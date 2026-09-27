<?php
/** Posts index with an editorial lead and a real WordPress posts loop. */
get_header();
?>
<main id="primary" class="site-main blog-archive content-container mx-auto w-full max-w-[1200px] flex-1 px-4 py-12 sm:px-6 lg:py-16">
	<?php get_template_part( 'template-parts/blog/archive', 'heading' ); ?>
	<?php if ( have_posts() ) : ?>
		<div class="blog-featured-wrap">
			<?php while ( have_posts() ) : the_post(); ?>
				<?php if ( ! is_paged() && get_post_meta( get_the_ID(), '_wpp_demo_blog_featured', true ) && empty( $GLOBALS['wpp_featured_post_rendered'] ) ) : ?><?php $GLOBALS['wpp_featured_post_rendered'] = true; get_template_part( 'template-parts/blog/featured', 'post' ); ?><?php else : ?><?php get_template_part( 'template-parts/content', 'post' ); ?><?php endif; ?>
			<?php endwhile; ?>
		</div>
		<?php the_posts_pagination( array( 'mid_size' => 1, 'prev_text' => __( 'Назад', 'wp-panda' ), 'next_text' => __( 'Дальше', 'wp-panda' ) ) ); ?>
		<?php get_template_part( 'template-parts/blog/rss', 'cta' ); ?>
	<?php else : ?>
		<div class="empty-state"><h2><?php esc_html_e( 'Публикаций пока нет', 'wp-panda' ); ?></h2><p><?php esc_html_e( 'Добавьте первую запись в панели WordPress.', 'wp-panda' ); ?></p></div>
	<?php endif; ?>
</main>
<?php get_footer(); ?>
