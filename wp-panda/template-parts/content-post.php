<?php
/** Blog post card. */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'editorial-card' ); ?>>
	<?php if ( has_post_thumbnail() ) : ?>
		<a class="editorial-card__image" href="<?php the_permalink(); ?>" tabindex="-1" aria-hidden="true">
			<?php the_post_thumbnail( 'wpp-editorial-card', array( 'loading' => 'lazy' ) ); ?>
		</a>
	<?php endif; ?>
	<div class="editorial-card__body">
		<div class="editorial-card__meta">
			<time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>"><?php echo esc_html( get_the_date() ); ?></time>
			<span><?php the_category( ', ' ); ?></span>
		</div>
		<h2 class="editorial-card__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
		<p><?php echo esc_html( wp_trim_words( get_the_excerpt(), 26 ) ); ?></p>
		<a class="text-link" href="<?php the_permalink(); ?>"><?php esc_html_e( 'Читать', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
	</div>
</article>
