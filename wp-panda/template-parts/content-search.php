<?php
/** Search result card. */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'search-result' ); ?>>
	<div class="search-result__type"><?php echo esc_html( get_post_type_object( get_post_type() )->labels->singular_name ?? get_post_type() ); ?></div>
	<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
	<p><?php echo esc_html( wp_trim_words( get_the_excerpt(), 28 ) ); ?></p>
	<a class="text-link" href="<?php the_permalink(); ?>"><?php esc_html_e( 'Открыть', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
</article>
