<?php
/** Posts index / blog archive. */
get_header();
?>
<main id="primary" class="site-main content-container mx-auto w-full max-w-[1200px] flex-1 px-4 py-12 sm:px-6 lg:py-16">
	<header class="page-heading page-heading--wide">
		<p class="eyebrow"><?php esc_html_e( 'Журнал Wp Panda', 'wp-panda' ); ?></p>
		<h1 class="text-3xl font-bold tracking-tight sm:text-5xl"><?php echo esc_html( get_option( 'page_for_posts' ) ? get_the_title( (int) get_option( 'page_for_posts' ) ) : __( 'Блог', 'wp-panda' ) ); ?></h1>
		<p><?php esc_html_e( 'Гайды, обзоры и новости WordPress — для владельцев сайтов, дизайнеров и разработчиков.', 'wp-panda' ); ?></p>
	</header>
	<?php if ( have_posts() ) : ?>
		<div class="editorial-grid editorial-grid--three">
			<?php while ( have_posts() ) : the_post(); ?>
				<?php get_template_part( 'template-parts/content', 'post' ); ?>
			<?php endwhile; ?>
		</div>
		<?php the_posts_pagination(); ?>
	<?php else : ?>
		<div class="empty-state"><h2><?php esc_html_e( 'Публикаций пока нет', 'wp-panda' ); ?></h2><p><?php esc_html_e( 'Добавьте первую запись в панели WordPress.', 'wp-panda' ); ?></p></div>
	<?php endif; ?>
</main>
<?php get_footer(); ?>
