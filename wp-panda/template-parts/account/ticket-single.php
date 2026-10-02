<?php
/**
 * Single support ticket thread with a reply form.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$wpp_ticket  = isset( $args['ticket'] ) ? $args['ticket'] : null;
if ( ! $wpp_ticket ) {
	return;
}
$wpp_product = get_post_meta( $wpp_ticket->ID, '_wpp_ticket_product', true );
$wpp_status  = get_post_meta( $wpp_ticket->ID, '_wpp_ticket_status', true );

// Handle closing/reopening the ticket by its owner.
if ( isset( $_POST['wpp_ticket_status_change'] ) && check_admin_referer( 'wpp_ticket_status_' . $wpp_ticket->ID ) ) {
	$wpp_new_status = isset( $_POST['wpp_ticket_status_change'] ) ? sanitize_key( wp_unslash( $_POST['wpp_ticket_status_change'] ) ) : '';
	if ( in_array( $wpp_new_status, array( 'open', 'closed' ), true ) ) {
		update_post_meta( $wpp_ticket->ID, '_wpp_ticket_status', $wpp_new_status );
		wpp_ticket_mark_unread( $wpp_ticket->ID );
		wp_safe_redirect( add_query_arg( 'ticket', $wpp_ticket->ID, wc_get_account_endpoint_url( 'support' ) ) );
		exit;
	}
}

// Handle a reply.
if ( isset( $_POST['wpp_ticket_reply'] ) && check_admin_referer( 'wpp_ticket_reply_' . $wpp_ticket->ID ) ) {
	$wpp_reply = sanitize_textarea_field( wp_unslash( isset( $_POST['reply'] ) ? $_POST['reply'] : '' ) );
	if ( $wpp_reply ) {
		wp_insert_comment( array(
			'comment_post_ID'  => $wpp_ticket->ID,
			'comment_author'   => wp_get_current_user()->display_name,
			'comment_content'  => $wpp_reply,
			'comment_approved' => 1,
			'user_id'          => get_current_user_id(),
		) );
		wpp_ticket_mark_unread( $wpp_ticket->ID );
		wp_safe_redirect( add_query_arg( 'ticket', $wpp_ticket->ID, wc_get_account_endpoint_url( 'support' ) ) );
		exit;
	}
}

$wpp_comments = get_comments( array( 'post_id' => $wpp_ticket->ID, 'orderby' => 'comment_date', 'order' => 'ASC' ) );
?>
<div class="space-y-5">
	<a class="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-ink" href="<?php echo esc_url( wc_get_account_endpoint_url( 'support' ) ); ?>"><?php echo wpp_icon( 'arrow-left', 'h-3.5 w-3.5' ); ?><?php esc_html_e( 'Все обращения', 'wp-panda' ); ?></a>
	<div class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7">
		<div class="flex flex-wrap items-center gap-2">
			<h3 class="text-xl font-bold tracking-tight"><?php echo esc_html( $wpp_ticket->post_title ); ?></h3>
			<span class="items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset <?php echo 'open' === $wpp_status ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-soft text-muted ring-line'; ?> inline-flex"><span class="h-1.5 w-1.5 rounded-full bg-current opacity-70"></span><?php echo 'open' === $wpp_status ? esc_html__( 'Открыт', 'wp-panda' ) : esc_html__( 'Закрыт', 'wp-panda' ); ?></span>
			<form method="post" class="ml-auto">
				<?php wp_nonce_field( 'wpp_ticket_status_' . $wpp_ticket->ID ); ?>
				<button type="submit" name="wpp_ticket_status_change" value="<?php echo 'open' === $wpp_status ? 'closed' : 'open'; ?>" class="inline-flex select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-white font-semibold transition-all duration-200 active:scale-[0.98] hover:border-ink/25 hover:shadow-card h-9 px-4 text-[13px] text-ink/80">
					<?php echo wpp_icon( 'open' === $wpp_status ? 'circle-check' : 'refresh-cw', 'h-3.5 w-3.5' ); ?>
					<?php echo 'open' === $wpp_status ? esc_html__( 'Закрыть тикет', 'wp-panda' ) : esc_html__( 'Открыть заново', 'wp-panda' ); ?>
				</button>
			</form>
		</div>
		<div class="mt-1 text-xs text-muted">#T-<?php echo esc_html( $wpp_ticket->ID ); ?><?php echo $wpp_product ? ' · ' . esc_html( $wpp_product ) : ''; ?> · <?php echo esc_html( wpp_human_date( strtotime( $wpp_ticket->post_date ) ) ); ?></div>
		<div class="mt-5 rounded-2xl bg-soft p-4 text-sm leading-relaxed"><?php echo wp_kses_post( wpautop( $wpp_ticket->post_content ) ); ?></div>
	</div>
	<?php foreach ( $wpp_comments as $wpp_comment ) :
		$wpp_is_staff = empty( $wpp_comment->user_id ) || (int) $wpp_comment->user_id !== get_current_user_id();
		?>
		<div class="rounded-card border border-line bg-white p-5 shadow-card <?php echo $wpp_is_staff ? 'ring-1 ring-brand-100' : ''; ?>">
			<div class="flex items-center gap-2 text-xs text-muted">
				<span class="flex h-7 w-7 items-center justify-center rounded-full <?php echo $wpp_is_staff ? 'bg-brand text-ink' : 'bg-soft text-ink/70'; ?>"><?php echo wpp_icon( 'user', 'h-3.5 w-3.5' ); ?></span>
				<span class="font-semibold text-ink"><?php echo esc_html( $wpp_comment->comment_author ); ?></span>
				· <?php echo esc_html( wpp_human_date( strtotime( $wpp_comment->comment_date ) ) ); ?>
			</div>
			<div class="mt-3 text-sm leading-relaxed"><?php echo wp_kses_post( wpautop( $wpp_comment->comment_content ) ); ?></div>
		</div>
	<?php endforeach; ?>
	<form method="post" class="rounded-card border border-line bg-white p-5 shadow-card sm:p-7">
		<?php wp_nonce_field( 'wpp_ticket_reply_' . $wpp_ticket->ID ); ?>
		<label class="block">
			<span class="mb-2 block text-[13px] font-medium text-ink"><?php esc_html_e( 'Ваш ответ', 'wp-panda' ); ?></span>
			<textarea name="reply" rows="4" required class="w-full rounded-xl border border-line bg-soft/70 px-4 py-3 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" placeholder="<?php esc_attr_e( 'Напишите сообщение…', 'wp-panda' ); ?>"></textarea>
		</label>
		<button type="submit" name="wpp_ticket_reply" value="1" class="mt-4 inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-11 px-5 text-sm"><?php echo wpp_icon( 'share-2', 'h-4 w-4' ); ?><?php esc_html_e( 'Отправить', 'wp-panda' ); ?></button>
	</form>
</div>
