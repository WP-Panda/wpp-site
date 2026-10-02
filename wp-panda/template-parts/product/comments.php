<?php
/**
 * Comments panel: regular (non-review) comments and the discussion form.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

global $product;
$comments = get_comments( array(
	'post_id' => $product->get_id(),
	'type'    => 'comment',
	'status'  => 'approve',
) );
?>
<div class="fade-in space-y-8 text-[15px] leading-relaxed">
	<h2 class="text-2xl font-bold tracking-tight"><?php esc_html_e( 'Комментарии', 'wp-panda' ); ?></h2>
	<?php if ( ! $comments ) : ?>
		<div class="rounded-card border border-line bg-white p-8 text-center shadow-card">
			<p class="text-sm text-muted"><?php esc_html_e( 'Обсуждений пока нет — задайте первый вопрос о продукте.', 'wp-panda' ); ?></p>
		</div>
	<?php endif; ?>
	<?php foreach ( $comments as $wpp_comment ) : ?>
		<div class="rounded-card border border-line bg-white p-6 shadow-card">
			<div class="flex items-center gap-3">
				<span class="flex h-10 w-10 items-center justify-center rounded-full bg-soft text-sm font-bold text-ink"><?php echo esc_html( mb_substr( get_comment_author( $wpp_comment ), 0, 1 ) ); ?></span>
				<div>
					<div class="text-sm font-semibold"><?php echo esc_html( get_comment_author( $wpp_comment ) ); ?></div>
					<div class="text-xs text-muted"><?php echo esc_html( get_comment_date( 'j F Y', $wpp_comment ) ); ?></div>
				</div>
			</div>
			<p class="mt-4 text-sm leading-relaxed text-ink/85"><?php echo esc_html( $wpp_comment->comment_content ); ?></p>
		</div>
	<?php endforeach; ?>
	<div class="rounded-card border border-line bg-white p-6 shadow-card">
		<h3 class="text-lg font-semibold tracking-tight"><?php esc_html_e( 'Задать вопрос', 'wp-panda' ); ?></h3>
		<?php
		comment_form( array(
			'title_reply'          => '',
			'comment_field'        => '<p class="mt-4"><label class="text-xs font-medium" for="comment">' . esc_html__( 'Ваш комментарий', 'wp-panda' ) . '</label><textarea id="comment" name="comment" cols="45" rows="5" class="mt-2 w-full rounded-2xl border border-line bg-soft/70 p-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20" required></textarea></p>',
			'label_submit'         => __( 'Отправить', 'wp-panda' ),
			'class_submit'         => 'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-ink text-white hover:bg-ink-2 h-12 px-6 text-sm mt-4',
			'title_reply_before'   => '<div class="hidden">',
			'title_reply_after'    => '</div>',
		) );
		?>
	</div>
</div>
