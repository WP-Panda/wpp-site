<?php
/** Category, tag, and date archives use the same editorial components as the blog. */
get_header();
?>
<main id="primary" class="site-main blog-archive content-container mx-auto w-full max-w-[1200px] flex-1 px-4 py-12 sm:px-6 lg:py-16">
	<?php get_template_part( 'template-parts/blog/archive', 'heading' ); ?>
	<?php if ( have_posts() ) : ?><div class="editorial-grid editorial-grid--three"><?php while ( have_posts() ) : the_post(); get_template_part( 'template-parts/content', 'post' ); endwhile; ?></div><?php the_posts_pagination( array( 'mid_size' => 1, 'prev_text' => __( 'Назад', 'wp-panda' ), 'next_text' => __( 'Дальше', 'wp-panda' ) ) ); ?><?php else : ?><div class="empty-state"><h2><?php esc_html_e( 'В этом разделе пока нет статей', 'wp-panda' ); ?></h2><p><?php esc_html_e( 'Выберите другую рубрику или вернитесь ко всем статьям.', 'wp-panda' ); ?></p></div><?php endif; ?>
	<?php get_template_part( 'template-parts/blog/rss', 'cta' ); ?>
</main>
<?php get_footer(); ?>
