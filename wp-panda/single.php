<?php
/** Single article with author metadata, a local contents index, and related live posts. */
get_header();
?>
<main id="primary" class="site-main content-container mx-auto w-full max-w-[1200px] flex-1 px-4 py-10 sm:px-6 lg:py-16">
	<?php while ( have_posts() ) : the_post(); ?>
		<?php $headings = wpp_content_headings( get_the_content() ); ?>
		<nav class="breadcrumbs" aria-label="<?php esc_attr_e( 'Навигация по сайту', 'wp-panda' ); ?>"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Главная', 'wp-panda' ); ?></a><span aria-hidden="true">/</span><a href="<?php echo esc_url( get_permalink( (int) get_option( 'page_for_posts' ) ) ); ?>"><?php esc_html_e( 'Блог', 'wp-panda' ); ?></a><span aria-hidden="true">/</span><span><?php the_title(); ?></span></nav>
		<article id="post-<?php the_ID(); ?>" <?php post_class( 'single-article' ); ?>>
			<header class="single-article__header"><div class="editorial-card__meta"><time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>"><?php echo esc_html( get_the_date() ); ?></time><?php $categories = get_the_category_list( ', ' ); if ( $categories ) : ?><span><?php echo wp_kses_post( $categories ); ?></span><?php endif; ?><span><?php echo esc_html( sprintf( __( '%d мин чтения', 'wp-panda' ), wpp_post_read_time() ) ); ?></span></div><?php the_title( '<h1>', '</h1>' ); ?><p class="single-article__excerpt"><?php echo esc_html( get_the_excerpt() ); ?></p><div class="single-article__byline"><span class="blog-featured__avatar" aria-hidden="true"><?php echo esc_html( ( function_exists( 'mb_substr' ) ? mb_substr( wpp_post_author_label(), 0, 1 ) : substr( wpp_post_author_label(), 0, 1 ) ) ); ?></span><span><b><?php echo esc_html( wpp_post_author_label() ); ?></b><small><?php esc_html_e( 'Автор Wp Panda', 'wp-panda' ); ?></small></span></div></header>
			<?php if ( has_post_thumbnail() ) : ?><div class="single-article__image"><?php the_post_thumbnail( 'wpp-editorial-card' ); ?></div><?php endif; ?>
			<div class="single-article__layout"><?php if ( count( $headings ) > 2 ) : ?><aside class="single-article__sidebar"><?php get_template_part( 'template-parts/blog/table-of-contents', null, array( 'items' => $headings ) ); ?></aside><?php endif; ?><div class="entry-content prose-content"><?php the_content(); wp_link_pages(); ?></div></div>
			<footer class="single-article__footer"><?php the_tags( '<div class="article-tags"><span>' . esc_html__( 'Метки:', 'wp-panda' ) . '</span> ', ', ', '</div>' ); ?><p class="article-share-note"><?php esc_html_e( 'Сохраните статью или поделитесь ею с командой.', 'wp-panda' ); ?></p></footer>
		</article>
		<?php get_template_part( 'template-parts/blog/related-posts' ); ?>
		<?php if ( comments_open() || get_comments_number() ) : comments_template(); endif; ?>
	<?php endwhile; ?>
</main>
<?php get_footer(); ?>
