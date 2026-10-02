<?php
/**
 * Support tickets in wp-admin: list columns and filters, ticket detail
 * meta box with status management and an admin reply composer.
 *
 * Tickets are the `wpp_support_ticket` post type (post_content = first
 * client message, comments = the thread). Everything saved here is
 * mirrored to the client thread in My account → Support.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

/* ------------------------------------------------------------------------ */
/* Statuses.                                                                 */
/* ------------------------------------------------------------------------ */

/** Known ticket statuses. */
function wpp_ticket_statuses() {
	return array(
		'open'   => __( 'Открыт', 'wp-panda' ),
		'closed' => __( 'Закрыт', 'wp-panda' ),
	);
}

/** Ticket status with a sane default. */
function wpp_get_ticket_status( $ticket_id ) {
	$status = get_post_meta( $ticket_id, '_wpp_ticket_status', true );
	return $status ? $status : 'open';
}

/** Colored status badge for admin screens. */
function wpp_ticket_status_badge( $status ) {
	$labels  = wpp_ticket_statuses();
	$label   = isset( $labels[ $status ] ) ? $labels[ $status ] : $status;
	$palette = array(
		'open'   => 'background:#e6f7ee;color:#0f7a45;',
		'closed' => 'background:#f0f0f3;color:#6b6b76;',
	);
	$style   = isset( $palette[ $status ] ) ? $palette[ $status ] : 'background:#f0f0f3;color:#6b6b76;';
	return '<span style="display:inline-block;padding:2px 10px;border-radius:999px;font-size:11px;font-weight:600;' . esc_attr( $style ) . '">' . esc_html( $label ) . '</span>';
}

/* ------------------------------------------------------------------------ */
/* List table: columns, filters.                                             */
/* ------------------------------------------------------------------------ */

/** Replace the default columns with ticket-specific ones. */
function wpp_admin_ticket_columns( $columns ) {
	$new = array();
	foreach ( $columns as $key => $label ) {
		if ( in_array( $key, array( 'comments', 'author', 'date' ), true ) ) {
			continue;
		}
		$new[ $key ] = $label;
		if ( 'title' === $key ) {
			$new['wpp_ticket_client'] = __( 'Клиент', 'wp-panda' );
		}
	}
	$new['wpp_ticket_product'] = __( 'Товар', 'wp-panda' );
	$new['wpp_ticket_status']  = __( 'Статус', 'wp-panda' );
	$new['wpp_ticket_replies'] = __( 'Сообщения', 'wp-panda' );
	$new['wpp_ticket_last']    = __( 'Активность', 'wp-panda' );
	return $new;
}
add_filter( 'manage_wpp_support_ticket_posts_columns', 'wpp_admin_ticket_columns' );

/** Column contents. */
function wpp_admin_ticket_column_content( $column, $post_id ) {
	switch ( $column ) {
		case 'wpp_ticket_client':
			$user = get_userdata( (int) get_post_field( 'post_author', $post_id ) );
			if ( $user ) {
				printf(
					'<a href="%s">%s</a><br><span style="color:#787c82;font-size:12px;">%s</span>',
					esc_url( admin_url( 'user-edit.php?user_id=' . $user->ID ) ),
					esc_html( $user->display_name ),
					esc_html( $user->user_email )
				);
			} else {
				echo '&mdash;';
			}
			break;
		case 'wpp_ticket_product':
			$product = get_post_meta( $post_id, '_wpp_ticket_product', true );
			echo $product ? esc_html( $product ) : '&mdash;';
			break;
		case 'wpp_ticket_status':
			echo wpp_ticket_status_badge( wpp_get_ticket_status( $post_id ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			break;
		case 'wpp_ticket_replies':
			echo esc_html( get_comments_number( $post_id ) );
			break;
		case 'wpp_ticket_last':
			$last = get_comments( array( 'post_id' => $post_id, 'number' => 1, 'orderby' => 'comment_date', 'order' => 'DESC' ) );
			$time = $last ? strtotime( $last[0]->comment_date ) : strtotime( get_post_field( 'post_date', $post_id ) );
			echo esc_html( date_i18n( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ), $time ) );
			break;
	}
}
add_action( 'manage_wpp_support_ticket_posts_custom_column', 'wpp_admin_ticket_column_content', 10, 2 );

/** Status filter dropdown above the list. */
function wpp_admin_ticket_status_filter() {
	$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
	if ( ! $screen || 'wpp_support_ticket' !== $screen->post_type ) {
		return;
	}
	$current = isset( $_GET['wpp_ticket_status'] ) ? sanitize_key( wp_unslash( $_GET['wpp_ticket_status'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	echo '<select name="wpp_ticket_status" style="float:none;margin:0 4px;">';
	echo '<option value="">' . esc_html__( 'Все статусы', 'wp-panda' ) . '</option>';
	foreach ( wpp_ticket_statuses() as $value => $label ) {
		printf( '<option value="%s"%s>%s</option>', esc_attr( $value ), selected( $current, $value, false ), esc_html( $label ) );
	}
	echo '</select>';
}
add_action( 'restrict_manage_posts', 'wpp_admin_ticket_status_filter' );

/** Apply the status filter. */
function wpp_admin_ticket_filter_query( $query ) {
	if ( ! is_admin() || ! $query->is_main_query() || 'wpp_support_ticket' !== $query->get( 'post_type' ) ) {
		return;
	}
	$status = isset( $_GET['wpp_ticket_status'] ) ? sanitize_key( wp_unslash( $_GET['wpp_ticket_status'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	if ( $status ) {
		$query->set( 'meta_key', '_wpp_ticket_status' );
		$query->set( 'meta_value', $status );
	}
}
add_action( 'pre_get_posts', 'wpp_admin_ticket_filter_query' );

/* ------------------------------------------------------------------------ */
/* Edit screen: detail meta box + reply composer.                            */
/* ------------------------------------------------------------------------ */

/** Register meta boxes. */
function wpp_admin_ticket_meta_boxes() {
	add_meta_box( 'wpp-ticket-details', __( 'Детали тикета', 'wp-panda' ), 'wpp_admin_ticket_details_box', 'wpp_support_ticket', 'side', 'high' );
	add_meta_box( 'wpp-ticket-reply', __( 'Ответ клиенту', 'wp-panda' ), 'wpp_admin_ticket_reply_box', 'wpp_support_ticket', 'normal', 'low' );
}
add_action( 'add_meta_boxes', 'wpp_admin_ticket_meta_boxes' );

/** Detail box: client info, product, status. */
function wpp_admin_ticket_details_box( $post ) {
	wp_nonce_field( 'wpp_ticket_details_' . $post->ID, 'wpp_ticket_details_nonce' );
	$user    = get_userdata( (int) $post->post_author );
	$product = get_post_meta( $post->ID, '_wpp_ticket_product', true );
	$status  = wpp_get_ticket_status( $post->ID );
	?>
	<table class="form-table" style="margin-top:0;">
		<tr>
			<th style="width:80px;"><?php esc_html_e( 'Номер', 'wp-panda' ); ?></th>
			<td><strong>#T-<?php echo esc_html( $post->ID ); ?></strong></td>
		</tr>
		<tr>
			<th><?php esc_html_e( 'Клиент', 'wp-panda' ); ?></th>
			<td>
				<?php if ( $user ) : ?>
					<a href="<?php echo esc_url( admin_url( 'user-edit.php?user_id=' . $user->ID ) ); ?>"><?php echo esc_html( $user->display_name ); ?></a><br>
					<span style="color:#787c82;"><?php echo esc_html( $user->user_email ); ?></span>
				<?php else : ?>
					&mdash;
				<?php endif; ?>
			</td>
		</tr>
		<tr>
			<th><?php esc_html_e( 'Товар', 'wp-panda' ); ?></th>
			<td><?php echo $product ? esc_html( $product ) : '&mdash;'; ?></td>
		</tr>
		<tr>
			<th><?php esc_html_e( 'Создан', 'wp-panda' ); ?></th>
			<td><?php echo esc_html( date_i18n( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ), strtotime( $post->post_date ) ) ); ?></td>
		</tr>
		<tr>
			<th><?php esc_html_e( 'Статус', 'wp-panda' ); ?></th>
			<td>
				<select name="wpp_ticket_status" style="width:100%;">
					<?php foreach ( wpp_ticket_statuses() as $value => $label ) : ?>
						<option value="<?php echo esc_attr( $value ); ?>" <?php selected( $status, $value ); ?>><?php echo esc_html( $label ); ?></option>
					<?php endforeach; ?>
				</select>
			</td>
		</tr>
	</table>
	<?php
}

/** Reply composer. The reply is stored as a comment and appears in the client thread. */
function wpp_admin_ticket_reply_box( $post ) {
	wp_nonce_field( 'wpp_ticket_reply_' . $post->ID, 'wpp_ticket_admin_reply_nonce' );
	$comments = get_comments( array( 'post_id' => $post->ID, 'orderby' => 'comment_date', 'order' => 'DESC', 'number' => 5 ) );
	?>
	<p style="margin-top:0;"><?php esc_html_e( 'Ответ будет показан клиенту в разделе «Поддержка» его личного кабинета и отправлен ему на e-mail.', 'wp-panda' ); ?></p>
	<textarea name="wpp_admin_reply_text" rows="6" style="width:100%;" placeholder="<?php esc_attr_e( 'Текст ответа…', 'wp-panda' ); ?>"></textarea>
	<p>
		<button type="submit" class="button button-primary" name="wpp_admin_reply_send" value="1"><?php esc_html_e( 'Отправить ответ', 'wp-panda' ); ?></button>
		<label style="margin-left:12px;"><input type="checkbox" name="wpp_admin_reply_close" value="1"> <?php esc_html_e( 'закрыть тикет после отправки', 'wp-panda' ); ?></label>
		<label style="margin-left:12px;"><input type="checkbox" name="wpp_admin_reply_no_email" value="1"> <?php esc_html_e( 'не отправлять e-mail клиенту', 'wp-panda' ); ?></label>
	</p>
	<?php if ( $comments ) : ?>
		<h3><?php esc_html_e( 'Последние сообщения', 'wp-panda' ); ?></h3>
		<ul style="margin:0;">
			<?php foreach ( $comments as $comment ) : ?>
				<li style="margin-bottom:10px;padding:10px 12px;background:#f6f7f7;border-radius:6px;">
					<strong><?php echo esc_html( $comment->comment_author ); ?></strong>
					<span style="color:#787c82;"> · <?php echo esc_html( date_i18n( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ), strtotime( $comment->comment_date ) ) ); ?></span>
					<div><?php echo wp_kses_post( wpautop( $comment->comment_content ) ); ?></div>
				</li>
			<?php endforeach; ?>
		</ul>
	<?php endif; ?>
	<?php
}

/* ------------------------------------------------------------------------ */
/* Saving: status + admin reply.                                             */
/* ------------------------------------------------------------------------ */

/** Save status and handle the admin reply. */
function wpp_admin_save_ticket( $post_id, $post ) {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( 'wpp_support_ticket' !== $post->post_type ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	// Status.
	if ( isset( $_POST['wpp_ticket_details_nonce'] ) && wp_verify_nonce( sanitize_key( wp_unslash( $_POST['wpp_ticket_details_nonce'] ) ), 'wpp_ticket_details_' . $post_id ) ) {
		if ( isset( $_POST['wpp_ticket_status'] ) ) {
			$status   = sanitize_key( wp_unslash( $_POST['wpp_ticket_status'] ) );
			$allowed  = array_keys( wpp_ticket_statuses() );
			if ( in_array( $status, $allowed, true ) ) {
				update_post_meta( $post_id, '_wpp_ticket_status', $status );
			}
		}
	}

	// Reply.
	if ( isset( $_POST['wpp_admin_reply_send'] ) && isset( $_POST['wpp_admin_reply_text'] )
		&& isset( $_POST['wpp_ticket_admin_reply_nonce'] )
		&& wp_verify_nonce( sanitize_key( wp_unslash( $_POST['wpp_ticket_admin_reply_nonce'] ) ), 'wpp_ticket_reply_' . $post_id ) ) {

		$reply = sanitize_textarea_field( wp_unslash( $_POST['wpp_admin_reply_text'] ) );
		if ( '' !== $reply ) {
			$current_user = wp_get_current_user();
			wp_insert_comment( array(
				'comment_post_ID'  => $post_id,
				'comment_author'   => $current_user->display_name,
				'comment_content'  => $reply,
				'comment_approved' => 1,
				'user_id'          => $current_user->ID,
			) );

			// A reply reopens a closed ticket unless explicitly closed.
			if ( isset( $_POST['wpp_admin_reply_close'] ) ) {
				update_post_meta( $post_id, '_wpp_ticket_status', 'closed' );
			} elseif ( 'closed' === get_post_meta( $post_id, '_wpp_ticket_status', true ) ) {
				update_post_meta( $post_id, '_wpp_ticket_status', 'open' );
			}

			if ( empty( $_POST['wpp_admin_reply_no_email'] ) ) {
				wpp_notify_client_about_reply( $post_id, $reply );
			}
		}
	}
}
add_action( 'save_post', 'wpp_admin_save_ticket', 10, 2 );

/** E-mail the client about a new staff reply. */
function wpp_notify_client_about_reply( $ticket_id, $reply ) {
	$ticket = get_post( $ticket_id );
	if ( ! $ticket ) {
		return;
	}
	$user = get_userdata( (int) $ticket->post_author );
	if ( ! $user || ! is_email( $user->user_email ) ) {
		return;
	}
	$subject = sprintf(
		/* translators: 1: site name, 2: ticket id, 3: ticket subject. */
		__( '[%1$s] Ответ по тикету #%2$s: %3$s', 'wp-panda' ),
		wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ),
		$ticket_id,
		$ticket->post_title
	);
	$thread_url = function_exists( 'wc_get_account_endpoint_url' )
		? add_query_arg( 'ticket', $ticket_id, wc_get_account_endpoint_url( 'support' ) )
		: '';
	$body = sprintf(
		/* translators: 1: client name, 2: ticket subject, 3: reply text, 4: thread url. */
		__( "Здравствуйте, %1\$s!\n\nПоддержка ответила на ваш тикет «%2\$s»:\n\n%3\$s\n\nПосмотреть переписку: %4\$s", 'wp-panda' ),
		$user->display_name,
		$ticket->post_title,
		$reply,
		$thread_url
	);
	wp_mail( $user->user_email, $subject, $body );
}

/* ------------------------------------------------------------------------ */
/* Small conveniences.                                                       */
/* ------------------------------------------------------------------------ */

/** Open-ticket count in the admin menu («Тикеты поддержки (3)»). */
function wpp_admin_ticket_menu_count( $classes ) {
	// Only decorate the tickets menu item.
	if ( false === strpos( $classes, 'menu-icon-sos' ) ) {
		return $classes;
	}
	$open = get_posts( array(
		'post_type'      => 'wpp_support_ticket',
		'post_status'    => array( 'publish', 'private', 'draft' ),
		'posts_per_page' => -1,
		'fields'         => 'ids',
		'meta_key'       => '_wpp_ticket_status',
		'meta_value'     => 'open',
	) );
	if ( $open ) {
		$classes .= ' <span class="awaiting-mod count-' . count( $open ) . '"><span class="pending-count">' . count( $open ) . '</span></span>';
	}
	return $classes;
}
add_filter( 'add_menu_classes', 'wpp_admin_ticket_menu_count' );

/** Hide the default editor help row: content is the client message and is shown in-thread. */
function wpp_admin_ticket_editor_notice() {
	$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
	if ( $screen && 'wpp_support_ticket' === $screen->post_type ) {
		echo '<div class="notice notice-info"><p>' . esc_html__( 'Поле ниже — первое сообщение клиента. Ответы добавляйте в блоке «Ответ клиенту», переписку клиент видит в личном кабинете → Поддержка.', 'wp-panda' ) . '</p></div>';
	}
}
add_action( 'edit_form_top', 'wpp_admin_ticket_editor_notice' );
