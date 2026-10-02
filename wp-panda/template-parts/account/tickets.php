<?php
/**
 * Support ticket list.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$wpp_tickets = function_exists( 'wpp_get_user_tickets' ) ? wpp_get_user_tickets() : array();
$wpp_open_id = isset( $_GET['ticket'] ) ? absint( $_GET['ticket'] ) : 0; // phpcs:ignore WordPress.Security.NonceVerification
if ( $wpp_open_id ) {
	$wpp_open = get_post( $wpp_open_id );
	if ( $wpp_open && 'wpp_support_ticket' === $wpp_open->post_type && (int) $wpp_open->post_author === get_current_user_id() ) {
		get_template_part( 'template-parts/account/ticket-single', null, array( 'ticket' => $wpp_open ) );
		return;
	}
}
?>
<div class="space-y-4">
	<div class="flex flex-wrap items-center justify-between gap-3">
		<p class="text-sm text-muted"><?php esc_html_e( 'Поддержка — WPP Team', 'wp-panda' ); ?></p>
		<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-brand text-ink hover:bg-brand-600 shadow-glow h-9 px-4 text-[13px]" href="<?php echo esc_url( wc_get_account_endpoint_url( 'new-ticket' ) ); ?>"><?php echo wpp_icon( 'plus', 'h-4 w-4' ); ?><?php esc_html_e( 'Новый тикет', 'wp-panda' ); ?></a>
	</div>
	<?php if ( ! $wpp_tickets ) : ?>
		<div class="rounded-card border border-line bg-white p-10 text-center shadow-card">
			<p class="text-sm text-muted"><?php esc_html_e( 'Обращений пока не было. Если что-то пойдёт не так — мы рядом.', 'wp-panda' ); ?></p>
		</div>
	<?php endif; ?>
	<?php foreach ( $wpp_tickets as $wpp_ticket ) :
		$wpp_status  = get_post_meta( $wpp_ticket->ID, '_wpp_ticket_status', true );
		$wpp_product = get_post_meta( $wpp_ticket->ID, '_wpp_ticket_product', true );
		$wpp_replies = get_comments( array( 'post_id' => $wpp_ticket->ID, 'count' => true ) );
		$wpp_opened  = 'open' === $wpp_status;
		?>
		<a class="group flex w-full items-center gap-4 rounded-card border border-line bg-white p-5 text-left shadow-card transition hover:border-ink/20 hover:shadow-float" href="<?php echo esc_url( add_query_arg( 'ticket', $wpp_ticket->ID, wc_get_account_endpoint_url( 'support' ) ) ); ?>">
			<div class="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-ink"><?php echo wpp_icon( 'ticket', 'h-5 w-5' ); ?></div>
			<div class="min-w-0 flex-1">
				<div class="flex flex-wrap items-center gap-x-2 text-xs text-muted">
					<span class="font-semibold text-ink">#T-<?php echo esc_html( $wpp_ticket->ID ); ?></span>
					<?php if ( $wpp_product ) : ?>· <?php echo esc_html( $wpp_product ); ?><?php endif; ?>
					· <?php echo esc_html( wpp_human_date( strtotime( $wpp_ticket->post_date ) ) ); ?>
				</div>
				<div class="truncate font-semibold"><?php echo esc_html( $wpp_ticket->post_title ); ?></div>
			</div>
			<span class="items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset <?php echo $wpp_opened ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-soft text-muted ring-line'; ?> hidden sm:inline-flex"><span class="h-1.5 w-1.5 rounded-full bg-current opacity-70"></span><?php echo $wpp_opened ? esc_html__( 'Открыт', 'wp-panda' ) : esc_html__( 'Закрыт', 'wp-panda' ); ?></span>
			<?php echo wpp_icon( 'chevron-right', 'h-4 w-4 text-muted transition group-hover:text-ink' ); ?>
		</a>
	<?php endforeach; ?>
</div>
