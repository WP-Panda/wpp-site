<?php
/** Standard page content. */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'page-article' ); ?>>
	<header class="page-heading">
		<?php the_title( '<h1 class="text-3xl font-bold tracking-tight sm:text-4xl">', '</h1>' ); ?>
	</header>
	<div class="entry-content prose-content">
		<?php
		the_content();
		wp_link_pages( array(
			'before' => '<nav class="page-links" aria-label="' . esc_attr__( 'Страницы', 'wp-panda' ) . '">',
			'after'  => '</nav>',
		) );
		?>
	</div>
</article>
