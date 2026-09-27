<?php
/** Single post template. */
get_header();
?>
<main id="primary" class="site-main content-container content-container--narrow mx-auto w-full max-w-[860px] flex-1 px-4 py-10 sm:px-6 lg:py-16">
	<?php while ( have_posts() ) : the_post(); ?>
		<article id="post-<?php the_ID(); ?>" <?php post_class( 'single-article' ); ?>>
			<header class="single-article__header">
				<div class="editorial-card__meta"><time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>"><?php echo esc_html( get_the_date() ); ?></time><span><?php the_category( ', ' ); ?></span></div>
				<?php the_title( '<h1 class="text-3xl font-bold tracking-tight sm:text-5xl">', '</h1>' ); ?>
				<p class="single-article__excerpt"><?php echo esc_html( get_the_excerpt() ); ?></p>
			</header>
			<?php if ( has_post_thumbnail() ) : ?><div class="single-article__image"><?php the_post_thumbnail( 'wpp-editorial-card' ); ?></div><?php endif; ?>
			<div class="entry-content prose-content"><?php the_content(); wp_link_pages(); ?></div>
			<footer class="single-article__footer"><?php the_tags( '<div class="article-tags"><span>' . esc_html__( 'Метки:', 'wp-panda' ) . '</span> ', ', ', '</div>' ); ?></footer>
		</article>
		<?php if ( comments_open() || get_comments_number() ) : comments_template(); endif; ?>
	<?php endwhile; ?>
</main>
<?php get_footer(); ?>
