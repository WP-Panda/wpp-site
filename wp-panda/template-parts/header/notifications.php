<?php
/**
 * Notifications popover for logged-in customers, in the layout's dark style.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$items = array();

if ( function_exists( 'wc_get_customer_available_downloads' ) ) {
	$downloads = wc_get_customer_available_downloads( get_current_user_id() );
	if ( $downloads ) {
		$first     = $downloads[0];
		$items[]   = array(
			'title'   => __( 'Доступно обновление', 'wp-panda' ),
			'text'    => sprintf( __( '%s уже в загрузках', 'wp-panda' ), $first['product_name'] ),
			'time'    => __( 'сейчас', 'wp-panda' ),
			'url'     => wc_get_account_endpoint_url( 'downloads' ),
			'primary' => true,
		);
	}
}

$tickets = get_posts( array(
	'post_type'      => 'wpp_support_ticket',
	'post_status'    => array( 'publish', 'pending' ),
	'posts_per_page' => 1,
	'author'         => get_current_user_id(),
	'meta_key'       => '_wpp_ticket_has_reply',
) );
if ( $tickets ) {
	$items[] = array(
		'title'   => sprintf( __( 'Ответ в тикете %s', 'wp-panda' ), get_post_meta( $tickets[0]->ID, '_wpp_ticket_number', true ) ),
		'text'    => __( 'Новый ответ от WPP Team', 'wp-panda' ),
		'time'    => human_time_diff( get_post_time( 'U', true, $tickets[0] ), time() ) . ' ' . __( 'назад', 'wp-panda' ),
		'url'     => function_exists( 'wc_get_account_endpoint_url' ) ? wc_get_account_endpoint_url( 'support' ) : home_url( '/my-account/' ),
		'primary' => false,
	);
}

if ( ! $items ) {
	$items[] = array(
		'title'   => __( 'Пока без уведомлений', 'wp-panda' ),
		'text'    => __( 'Обновления и ответы поддержки появятся здесь', 'wp-panda' ),
		'time'    => '',
		'url'     => function_exists( 'wc_get_account_endpoint_url' ) ? wc_get_account_endpoint_url( 'dashboard' ) : home_url( '/my-account/' ),
		'primary' => false,
	);
}
?>
<div class="wpp-notifications-panel fade-up absolute right-0 top-full z-20 mt-3 hidden w-80 rounded-2xl bg-ink p-2 text-white shadow-float" data-notifications-panel>
	<div class="px-3 pb-2 pt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45"><?php esc_html_e( 'Уведомления', 'wp-panda' ); ?></div>
	<?php foreach ( $items as $wpp_item ) : ?>
		<a class="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition <?php echo $wpp_item['primary'] ? 'bg-brand text-ink' : 'hover:bg-white/5'; ?>" href="<?php echo esc_url( $wpp_item['url'] ); ?>">
			<span class="min-w-0 flex-1">
				<span class="block text-sm font-semibold"><?php echo esc_html( $wpp_item['title'] ); ?></span>
				<span class="block text-xs <?php echo $wpp_item['primary'] ? 'text-ink/70' : 'text-white/50'; ?>"><?php echo esc_html( $wpp_item['text'] ); ?></span>
			</span>
			<?php if ( $wpp_item['time'] ) : ?>
				<span class="text-[11px] <?php echo $wpp_item['primary'] ? 'text-ink/60' : 'text-white/40'; ?>"><?php echo esc_html( $wpp_item['time'] ); ?></span>
			<?php endif; ?>
		</a>
	<?php endforeach; ?>
</div>
