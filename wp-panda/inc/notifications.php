<?php
/**
 * User notifications: stored per user, shown in the header bell panel.
 *
 * A notification is created when support replies to a client's ticket.
 * «Очистить уведомления» in the panel removes all of them (read or not);
 * the bell stays quiet until the next event arrives.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

/** Max notifications kept per user. */
function wpp_notifications_limit() {
	return 20;
}

/** All notifications of a user, newest first. */
function wpp_get_notifications( $user_id = 0 ) {
	$user_id = $user_id ? (int) $user_id : get_current_user_id();
	if ( ! $user_id ) {
		return array();
	}
	$list = get_user_meta( $user_id, '_wpp_notifications', true );
	return is_array( $list ) ? array_values( $list ) : array();
}

/** Notification count for a user. */
function wpp_count_notifications( $user_id = 0 ) {
	return count( wpp_get_notifications( $user_id ) );
}

/**
 * Add a notification.
 *
 * @param int   $user_id Recipient.
 * @param array $args    { title, text, url, type?, ticket_id? }.
 */
function wpp_add_notification( $user_id, $args ) {
	$user_id = (int) $user_id;
	if ( ! $user_id || empty( $args['title'] ) ) {
		return;
	}
	$list   = wpp_get_notifications( $user_id );
	$list[] = array(
		'time'      => time(),
		'type'      => isset( $args['type'] ) ? $args['type'] : 'general',
		'ticket_id' => isset( $args['ticket_id'] ) ? (int) $args['ticket_id'] : 0,
		'title'     => (string) $args['title'],
		'text'      => isset( $args['text'] ) ? (string) $args['text'] : '',
		'url'       => isset( $args['url'] ) ? (string) $args['url'] : '',
	);
	$list   = array_slice( array_reverse( $list ), 0, wpp_notifications_limit() ); // Newest first, capped.
	update_user_meta( $user_id, '_wpp_notifications', $list );
}

/** Remove every notification of a user. */
function wpp_clear_notifications( $user_id = 0 ) {
	$user_id = $user_id ? (int) $user_id : get_current_user_id();
	if ( $user_id ) {
		delete_user_meta( $user_id, '_wpp_notifications' );
	}
}

/** AJAX: clear the current user's notifications. */
function wpp_ajax_clear_notifications() {
	check_ajax_referer( 'wpp-notifications', 'nonce' );
	if ( ! is_user_logged_in() ) {
		wp_send_json_error( array( 'message' => __( 'Войдите в аккаунт.', 'wp-panda' ) ), 401 );
	}
	wpp_clear_notifications( get_current_user_id() );
	wp_send_json_success( array( 'count' => 0 ) );
}
add_action( 'wp_ajax_wpp_clear_notifications', 'wpp_ajax_clear_notifications' );

/** Notify a client in-app when support replies to their ticket. */
function wpp_notify_user_about_ticket_reply( $ticket_id, $reply_text ) {
	$ticket = get_post( $ticket_id );
	if ( ! $ticket || 'wpp_support_ticket' !== $ticket->post_type || ! $ticket->post_author ) {
		return;
	}
	$url = function_exists( 'wc_get_account_endpoint_url' )
		? add_query_arg( 'ticket', $ticket_id, wc_get_account_endpoint_url( 'support' ) )
		: '';
	wpp_add_notification( (int) $ticket->post_author, array(
		'type'      => 'ticket_reply',
		'ticket_id' => $ticket_id,
		'title'     => sprintf( __( 'Ответ в тикете #%s', 'wp-panda' ), $ticket_id ),
		'text'      => wp_trim_words( $reply_text, 18, '…' ),
		'url'       => $url,
	) );
}
