<?php
/**
 * My-account integration: custom endpoints (licenses, support, wishlist),
 * license keys on completed orders and support tickets.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

/* ------------------------------------------------------------------------ */
/* Endpoints.                                                                */
/* ------------------------------------------------------------------------ */

/** Register custom account endpoints. */
function wpp_account_endpoints() {
	add_rewrite_endpoint( 'licenses', EP_ROOT | EP_PAGES );
	add_rewrite_endpoint( 'support', EP_ROOT | EP_PAGES );
	add_rewrite_endpoint( 'new-ticket', EP_ROOT | EP_PAGES );
	add_rewrite_endpoint( 'wishlist', EP_ROOT | EP_PAGES );
}
add_action( 'init', 'wpp_account_endpoints' );

function wpp_account_query_vars( $vars ) {
	$vars[] = 'licenses';
	$vars[] = 'support';
	$vars[] = 'new-ticket';
	$vars[] = 'wishlist';
	return $vars;
}
add_filter( 'woocommerce_get_query_vars', 'wpp_account_query_vars' );

/** Flush permalinks once after the theme registers endpoints. */
function wpp_account_flush_rules() {
	if ( ! get_option( 'wpp_account_rules_v2' ) ) {
		wpp_account_endpoints();
		flush_rewrite_rules();
		update_option( 'wpp_account_rules_v2', 1 );
	}
}
add_action( 'after_switch_theme', 'wpp_account_flush_rules' );

/** Layout-ordered account navigation. */
function wpp_account_nav_items() {
	$counts = array(
		'orders'    => count( wc_get_orders( array( 'customer' => get_current_user_id(), 'limit' => -1, 'return' => 'ids' ) ) ),
		'licenses'  => wpp_count_user_licenses(),
		'support'   => count( get_posts( array( 'post_type' => 'wpp_support_ticket', 'author' => get_current_user_id(), 'post_status' => array( 'publish', 'private', 'draft' ), 'posts_per_page' => -1, 'fields' => 'ids' ) ) ),
		'wishlist'  => count( wpp_get_wishlist_ids() ),
		'downloads' => count( wc_get_customer_available_downloads( get_current_user_id() ) ),
	);
	return array(
		array( 'dashboard', __( 'Панель управления', 'wp-panda' ), 'layout-dashboard', 0 ),
		array( 'orders', __( 'Заказы', 'wp-panda' ), 'package', $counts['orders'] ),
		array( 'downloads', __( 'Загрузки', 'wp-panda' ), 'download', $counts['downloads'] ),
		array( 'licenses', __( 'Лицензии и ключи', 'wp-panda' ), 'key-round', $counts['licenses'] ),
		array( 'support', __( 'Поддержка', 'wp-panda' ), 'life-buoy', $counts['support'] ),
		array( 'wishlist', __( 'Избранное', 'wp-panda' ), 'heart', $counts['wishlist'] ),
		array( 'edit-address', __( 'Платёжный адрес', 'wp-panda' ), 'map-pin', 0 ),
		array( 'payment-methods', __( 'Способы оплаты', 'wp-panda' ), 'credit-card', 0 ),
		array( 'edit-account', __( 'Данные аккаунта', 'wp-panda' ), 'user-cog', 0 ),
	);
}

/** Which nav item is active right now. */
function wpp_account_current_endpoint() {
	global $wp;
	foreach ( array( 'licenses', 'new-ticket', 'support', 'wishlist', 'view-order', 'order-pay', 'lost-password', 'add-payment-method', 'orders', 'downloads', 'edit-address', 'payment-methods', 'edit-account', 'customer-logout' ) as $ep ) {
		if ( isset( $wp->query_vars[ $ep ] ) ) {
			if ( 'new-ticket' === $ep ) {
				return 'support';
			}
			if ( in_array( $ep, array( 'view-order', 'order-pay' ), true ) ) {
				return 'orders';
			}
			return $ep;
		}
	}
	return 'dashboard';
}

/* ------------------------------------------------------------------------ */
/* License keys.                                                             */
/* ------------------------------------------------------------------------ */

/** Generate license keys for every purchased product once the order is paid. */
function wpp_generate_license_keys( $order_id ) {
	$order = wc_get_order( $order_id );
	if ( ! $order ) {
		return;
	}
	$existing = (array) $order->get_meta( '_wpp_license_keys', true );
	$keys     = $existing;
	foreach ( $order->get_items() as $item ) {
		$product_id = (int) $item->get_product_id();
		if ( ! $product_id ) {
			continue;
		}
		$variation_id = (int) $item->get_variation_id();
		$already      = false;
		foreach ( $keys as $row ) {
			if ( (int) $row['product_id'] === $product_id && (int) $row['variation_id'] === $variation_id ) {
				$already = true;
				break;
			}
		}
		if ( $already ) {
			continue;
		}
		$tier = __( 'Навсегда', 'wp-panda' );
		if ( $variation_id ) {
			$variation = wc_get_product( $variation_id );
			if ( $variation ) {
				$attrs = $variation->get_attributes();
				$tier  = $attrs ? (string) reset( $attrs ) : $tier;
			}
		}
		$keys[] = array(
			'product_id'   => $product_id,
			'variation_id' => $variation_id,
			'key'          => wpp_new_license_key(),
			'tier'         => $tier,
			'sites'        => array(),
			'created'      => time(),
		);
	}
	if ( $keys !== $existing ) {
		$order->update_meta_data( '_wpp_license_keys', $keys );
		$order->save();
	}
}
add_action( 'woocommerce_order_status_completed', 'wpp_generate_license_keys' );
add_action( 'woocommerce_order_status_processing', 'wpp_generate_license_keys' );

/** Fresh «WPP-XXXX-XXXX-XXXX» key. */
function wpp_new_license_key() {
	$parts = array();
	for ( $i = 0; $i < 3; $i++ ) {
		$part = '';
		for ( $j = 0; $j < 4; $j++ ) {
			$part .= strtoupper( substr( '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ', wp_rand( 0, 33 ), 1 ) );
		}
		$parts[] = $part;
	}
	return 'WPP-' . implode( '-', $parts );
}

/** All licenses of the current user, newest first. */
function wpp_get_user_licenses() {
	$licenses = array();
	$orders   = wc_get_orders( array(
		'customer' => get_current_user_id(),
		'limit'    => -1,
		'status'   => array( 'completed', 'processing' ),
	) );
	foreach ( $orders as $order ) {
		$rows = (array) $order->get_meta( '_wpp_license_keys', true );
		foreach ( $rows as $row ) {
			$row['order_id']    = $order->get_id();
			$row['order_number'] = $order->get_order_number();
			$licenses[]         = $row;
		}
	}
	return $licenses;
}

function wpp_count_user_licenses() {
	return count( wpp_get_user_licenses() );
}

/* ------------------------------------------------------------------------ */
/* Support tickets.                                                          */
/* ------------------------------------------------------------------------ */

/** Ticket CPT. */
function wpp_register_ticket_cpt() {
	register_post_type( 'wpp_support_ticket', array(
		'labels'       => array(
			'name'          => __( 'Тикеты поддержки', 'wp-panda' ),
			'singular_name' => __( 'Тикет', 'wp-panda' ),
		),
		'public'       => false,
		'show_ui'      => true,
		'show_in_menu' => true,
		'menu_icon'    => 'dashicons-sos',
		'supports'     => array( 'title', 'editor', 'comments' ),
		'capability_type' => 'post',
	) );
}
add_action( 'init', 'wpp_register_ticket_cpt' );

/** Handle the new-ticket form. */
function wpp_handle_new_ticket() {
	if ( ! is_user_logged_in() || ! isset( $_POST['wpp_ticket_submit'] ) ) {
		return;
	}
	check_admin_referer( 'wpp_new_ticket' );
	$subject = sanitize_text_field( wp_unslash( isset( $_POST['subject'] ) ? $_POST['subject'] : '' ) );
	$message = sanitize_textarea_field( wp_unslash( isset( $_POST['message'] ) ? $_POST['message'] : '' ) );
	$product = sanitize_text_field( wp_unslash( isset( $_POST['product'] ) ? $_POST['product'] : '' ) );
	if ( '' === $subject || '' === $message ) {
		wc_add_notice( __( 'Заполните тему и сообщение.', 'wp-panda' ), 'error' );
		return;
	}
	$ticket_id = wp_insert_post( array(
		'post_type'    => 'wpp_support_ticket',
		'post_status'  => 'private',
		'post_title'   => $subject,
		'post_content' => $message,
		'post_author'  => get_current_user_id(),
	) );
	if ( $ticket_id ) {
		update_post_meta( $ticket_id, '_wpp_ticket_product', $product );
		update_post_meta( $ticket_id, '_wpp_ticket_status', 'open' );
		wpp_notify_admin_about_ticket( $ticket_id, $subject, $message, $product );
		wp_safe_redirect( wc_get_account_endpoint_url( 'support' ) );
		exit;
	}
}
add_action( 'template_redirect', 'wpp_handle_new_ticket', 5 );

/** E-mail the site admin when a client opens a ticket. */
function wpp_notify_admin_about_ticket( $ticket_id, $subject, $message, $product ) {
	$user  = wp_get_current_user();
	$admin = get_option( 'admin_email' );
	if ( ! is_email( $admin ) ) {
		return;
	}
	$title = sprintf(
		/* translators: 1: ticket id, 2: ticket subject. */
		__( 'Новый тикет #%1$s: %2$s', 'wp-panda' ),
		$ticket_id,
		$subject
	);
	$body = sprintf(
		/* translators: 1: client name, 2: client e-mail, 3: product, 4: message, 5: admin url. */
		__( "Клиент: %1\$s (%2\$s)\nТовар: %3\$s\n\n%4\$s\n\nОтветить: %5\$s", 'wp-panda' ),
		$user->display_name,
		$user->user_email,
		$product ? $product : __( 'не указан', 'wp-panda' ),
		$message,
		admin_url( 'post.php?post=' . $ticket_id . '&action=edit' )
	);
	wp_mail( $admin, $title, $body );
}

/** Ticket list for the current user. */
function wpp_get_user_tickets() {
	return get_posts( array(
		'post_type'      => 'wpp_support_ticket',
		'author'         => get_current_user_id(),
		'post_status'    => array( 'publish', 'private', 'draft' ),
		'posts_per_page' => -1,
		'orderby'        => 'date',
		'order'          => 'DESC',
	) );
}

/* ------------------------------------------------------------------------ */
/* Login/logout redirects.                                                   */
/* ------------------------------------------------------------------------ */

function wpp_login_redirect( $redirect, $requested, $user ) {
	return wc_get_page_permalink( 'myaccount' );
}
add_filter( 'woocommerce_login_redirect', 'wpp_login_redirect', 10, 3 );
add_filter( 'registration_redirect', function () {
	return wc_get_page_permalink( 'myaccount' );
} );

/** Page title inside the account area. */
function wpp_account_document_title( $title ) {
	if ( function_exists( 'is_account_page' ) && is_account_page() ) {
		return __( 'Личный кабинет', 'wp-panda' ) . ' — ' . get_bloginfo( 'name' );
	}
	return $title;
}
add_filter( 'pre_get_document_title', 'wpp_account_document_title', 20 );

/** Status pill for account/order lists. */
function wpp_account_status_badge( $status ) {
	$map = array(
		'completed'  => array( __( 'Выполнен', 'wp-panda' ), 'bg-emerald-50 text-emerald-700 ring-emerald-200' ),
		'processing' => array( __( 'В обработке', 'wp-panda' ), 'bg-brand-50 text-[#946300] ring-brand-100' ),
		'on-hold'    => array( __( 'Ожидает', 'wp-panda' ), 'bg-soft text-muted ring-line' ),
		'pending'    => array( __( 'Ожидает оплаты', 'wp-panda' ), 'bg-soft text-muted ring-line' ),
		'failed'     => array( __( 'Не оплачен', 'wp-panda' ), 'bg-rose-50 text-rose-600 ring-rose-200' ),
		'refunded'   => array( __( 'Возврат', 'wp-panda' ), 'bg-rose-50 text-rose-600 ring-rose-200' ),
		'cancelled'  => array( __( 'Отменён', 'wp-panda' ), 'bg-soft text-muted ring-line' ),
	);
	if ( ! isset( $map[ $status ] ) ) {
		$map[ $status ] = array( wc_get_order_status_name( $status ), 'bg-soft text-muted ring-line' );
	}
	list( $label, $classes ) = $map[ $status ];
	return '<span class="items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ' . esc_attr( $classes ) . ' hidden sm:inline-flex"><span class="h-1.5 w-1.5 rounded-full bg-current opacity-70"></span>' . esc_html( $label ) . '</span>';
}

/** Persist the non-standard ИНН field from the address form. */
function wpp_save_billing_inn() {
	if ( ! isset( $_POST['action'] ) || 'edit_address' !== $_POST['action'] ) {
		return;
	}
	if ( ! is_user_logged_in() || ! isset( $_POST['billing_inn'] ) ) {
		return;
	}
	update_user_meta( get_current_user_id(), 'billing_inn', sanitize_text_field( wp_unslash( $_POST['billing_inn'] ) ) );
}
add_action( 'template_redirect', 'wpp_save_billing_inn', 30 );
