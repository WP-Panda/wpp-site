<?php
/** Native product discussion separate from WooCommerce's rating-based reviews. */
defined( 'ABSPATH' ) || exit;

global $product;
if ( ! $product instanceof WC_Product ) {
	return;
}

$comments = function_exists( 'wpp_get_product_discussion_comments' ) ? wpp_get_product_discussion_comments( $product ) : array();
?>
<div class="wpp-product-comments">
	<?php if ( $comments ) : ?>
		<ol class="wpp-product-comments__list">
			<?php
			wp_list_comments(
				array(
					'style'       => 'ol',
					'short_ping'  => true,
					'avatar_size' => 36,
				),
				$comments
			);
			?>
		</ol>
	<?php else : ?>
		<p class="wpp-product-comments__empty"><?php esc_html_e( 'Пока нет комментариев к товару.', 'wp-panda' ); ?></p>
	<?php endif; ?>

	<?php if ( comments_open( $product->get_id() ) ) : ?>
		<?php
		comment_form(
			array(
				'title_reply'          => __( 'Оставить комментарий', 'wp-panda' ),
				'label_submit'         => __( 'Отправить комментарий', 'wp-panda' ),
				'comment_notes_before' => '',
				'comment_notes_after'  => '',
				'logged_in_as'         => '',
				'class_form'           => 'wpp-product-comments__form',
			),
			$product->get_id()
		);
		?>
	<?php endif; ?>
</div>
