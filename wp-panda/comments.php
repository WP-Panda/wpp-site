<?php
/** Comments template. */
if ( post_password_required() ) {
	return;
}
?>
<section id="comments" class="comments-area">
	<?php if ( have_comments() ) : ?>
		<h2 class="comments-title"><?php comments_number( esc_html__( 'Комментариев пока нет', 'wp-panda' ), esc_html__( 'Один комментарий', 'wp-panda' ), esc_html__( 'Комментариев: %', 'wp-panda' ) ); ?></h2>
		<ol class="comment-list"><?php wp_list_comments( array( 'style' => 'ol', 'short_ping' => true, 'avatar_size' => 44 ) ); ?></ol>
		<?php the_comments_navigation(); ?>
	<?php endif; ?>
	<?php if ( ! comments_open() && get_comments_number() ) : ?>
		<p class="no-comments"><?php esc_html_e( 'Комментарии закрыты.', 'wp-panda' ); ?></p>
	<?php endif; ?>
	<?php comment_form(); ?>
</section>
