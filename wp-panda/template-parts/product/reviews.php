<?php
/**
 * Reviews panel: approved product reviews + review form.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

global $product;
$reviews = get_comments( array(
	'post_id' => $product->get_id(),
	'type'    => 'review',
	'status'  => 'approve',
	'orderby' => 'comment_date_gmt',
	'order'   => 'DESC',
) );
?>
<div class="fade-in space-y-8 text-[15px] leading-relaxed">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<h2 class="text-2xl font-bold tracking-tight"><?php esc_html_e( 'Отзывы владельцев', 'wp-panda' ); ?></h2>
		<div class="flex items-center gap-2 text-sm text-muted">
			<?php echo wpp_rating_stars(); ?>
			<b class="text-ink"><?php echo esc_html( $product->get_average_rating() ? number_format_i18n( (float) $product->get_average_rating(), 1 ) : '—' ); ?></b>
			<span>(<?php echo esc_html( number_format_i18n( (int) $product->get_review_count() ) ); ?>)</span>
		</div>
	</div>
	<?php if ( ! $reviews ) : ?>
		<div class="rounded-card border border-line bg-white p-8 text-center shadow-card">
			<p class="text-sm text-muted"><?php esc_html_e( 'Отзывов пока нет — станьте первым, кто поделится опытом.', 'wp-panda' ); ?></p>
		</div>
	<?php endif; ?>
	<?php foreach ( $reviews as $wpp_review ) :
		$wpp_rating = (int) get_comment_meta( $wpp_review->comment_ID, 'rating', true );
		?>
		<figure class="rounded-card border border-line bg-white p-6 shadow-card">
			<div class="flex items-center justify-between gap-3">
				<div class="flex items-center gap-3">
					<span class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-ink ring-1 ring-brand-100"><?php echo esc_html( mb_substr( get_comment_author( $wpp_review ), 0, 1 ) ); ?></span>
					<div>
						<div class="text-sm font-semibold"><?php echo esc_html( get_comment_author( $wpp_review ) ); ?></div>
						<div class="text-xs text-muted"><?php echo esc_html( get_comment_date( 'j F Y', $wpp_review ) ); ?></div>
					</div>
				</div>
				<?php if ( $wpp_rating ) : ?>
					<span class="inline-flex items-center gap-0.5"><?php for ( $i = 0; $i < 5; $i++ ) { echo wpp_icon( 'star', $i < $wpp_rating ? 'fill-brand text-brand' : 'text-line', array( 'style' => 'width: 12px; height: 12px;' ) ); } ?></span>
				<?php endif; ?>
			</div>
			<blockquote class="mt-4 text-sm leading-relaxed text-ink/85"><?php echo esc_html( $wpp_review->comment_content ); ?></blockquote>
		</figure>
	<?php endforeach; ?>
	<div class="rounded-card border border-line bg-white p-6 shadow-card">
		<h3 class="text-lg font-semibold tracking-tight"><?php esc_html_e( 'Оставить отзыв', 'wp-panda' ); ?></h3>
		<?php
		$wpp_stars = '';
		for ( $wpp_i = 1; $wpp_i <= 5; $wpp_i++ ) {
			$wpp_stars .= '<button type="button" data-star="' . $wpp_i . '" aria-label="' . esc_attr( sprintf( __( 'Оценка %d из 5', 'wp-panda' ), $wpp_i ) ) . '" class="text-line transition hover:text-brand hover:scale-110">' . wpp_icon( 'star', 'h-6 w-6' ) . '</button>';
		}
		comment_form( array(
			'title_reply'          => '',
			'comment_field'        => '<div class="mt-4" data-review-rating><span class="text-xs font-medium">' . esc_html__( 'Ваша оценка', 'wp-panda' ) . ' <span class="text-rose-500">*</span></span><div class="mt-2 flex items-center gap-1">' . $wpp_stars . '</div><input type="hidden" name="rating" value=""><p class="mt-1 hidden text-xs font-medium text-rose-500" data-rating-error>' . esc_html__( 'Поставьте оценку — без неё отзыв не отправить.', 'wp-panda' ) . '</p></div><p class="mt-4"><label class="text-xs font-medium" for="comment">' . esc_html__( 'Ваш отзыв', 'wp-panda' ) . '</label><textarea id="comment" name="comment" cols="45" rows="5" class="mt-2 w-full rounded-2xl border border-line bg-soft/70 p-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20" required></textarea></p>',
			'label_submit'         => __( 'Отправить отзыв', 'wp-panda' ),
			'class_submit'         => 'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-12 px-6 text-sm mt-4',
			'title_reply_before'   => '<div class="hidden">',
			'title_reply_after'    => '</div>',
		) );
		?>
	</div>
</div>
