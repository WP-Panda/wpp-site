<?php
/** WooCommerce customer-account endpoints, private support requests, and wishlists. */

defined( 'ABSPATH' ) || exit;

add_action( 'init', 'wpp_register_account_endpoints', 9 );
add_action( 'init', 'wpp_register_support_ticket_type', 20 );
add_action( 'after_switch_theme', 'wpp_flush_account_endpoints' );
add_filter( 'woocommerce_account_menu_items', 'wpp_account_menu_items', 20 );
add_action( 'woocommerce_account_licenses_endpoint', 'wpp_account_licenses_endpoint' );
add_action( 'woocommerce_account_support_endpoint', 'wpp_account_support_endpoint' );
add_action( 'woocommerce_account_wishlist_endpoint', 'wpp_account_wishlist_endpoint' );
add_action( 'admin_post_wpp_submit_support_ticket', 'wpp_handle_support_ticket_submission' );
add_action( 'admin_post_wpp_toggle_wishlist', 'wpp_handle_wishlist_toggle' );
add_action( 'woocommerce_after_shop_loop_item', 'wpp_catalog_loop_wishlist_button', 20 );
add_action( 'woocommerce_single_product_summary', 'wpp_single_product_wishlist_button', 39 );

/** Register account routes that back the matching account links in the supplied layouts. */
function wpp_register_account_endpoints() {
	foreach ( array( 'licenses', 'support', 'wishlist' ) as $endpoint ) {
		add_rewrite_endpoint( $endpoint, EP_ROOT | EP_PAGES );
	}
}

/** Flush only when the theme changes; the importer also refreshes routes after deployment. */
function wpp_flush_account_endpoints() {
	wpp_register_account_endpoints();
	flush_rewrite_rules();
}

/** Keep support requests private and manageable by authorized WordPress staff. */
function wpp_register_support_ticket_type() {
	register_post_type( 'wpp_support_ticket', array(
		'labels' => array(
			'name'          => __( 'Обращения поддержки', 'wp-panda' ),
			'singular_name' => __( 'Обращение поддержки', 'wp-panda' ),
			'edit_item'     => __( 'Просмотреть обращение', 'wp-panda' ),
		),
		'public'              => false,
		'publicly_queryable'  => false,
		'exclude_from_search' => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_rest'        => false,
		'rewrite'             => false,
		'query_var'           => false,
		'capability_type'     => 'post',
		'map_meta_cap'        => true,
		'supports'            => array( 'title', 'editor', 'author' ),
	) );
}

/** Page title and intro for the account screens represented in the static account layouts. */
function wpp_account_page_heading() {
	$pages = array(
		'orders'         => array( __( 'Заказы', 'wp-panda' ), __( 'История покупок, счета и чеки', 'wp-panda' ) ),
		'downloads'      => array( __( 'Загрузки', 'wp-panda' ), __( 'Свежие версии купленных продуктов', 'wp-panda' ) ),
		'licenses'       => array( __( 'Лицензии и ключи', 'wp-panda' ), __( 'Ключи для тем (1 или 5 сайтов) и плагинов (навсегда)', 'wp-panda' ) ),
		'support'        => array( __( 'Тикеты поддержки', 'wp-panda' ), __( 'Ваши обращения и ответы инженеров', 'wp-panda' ) ),
		'wishlist'       => array( __( 'Избранное', 'wp-panda' ), __( 'Сохранённые темы и плагины', 'wp-panda' ) ),
		'edit-address'   => array( __( 'Платёжный адрес', 'wp-panda' ), __( 'Данные для счетов и закрывающих документов', 'wp-panda' ) ),
		'payment-methods'=> array( __( 'Способы оплаты', 'wp-panda' ), __( 'Сохранённые способы оплаты', 'wp-panda' ) ),
		'edit-account'   => array( __( 'Данные аккаунта', 'wp-panda' ), __( 'Профиль, пароль, безопасность и уведомления', 'wp-panda' ) ),
	);
	$current = 'dashboard';
	foreach ( array_keys( $pages ) as $endpoint ) {
		if ( function_exists( 'is_wc_endpoint_url' ) && is_wc_endpoint_url( $endpoint ) ) {
			$current = $endpoint;
			break;
		}
	}
	if ( 'support' === $current && 'new' === get_query_var( 'support' ) ) {
		return array( __( 'Новое обращение', 'wp-panda' ), __( 'Создайте тикет — переписка останется в личном кабинете', 'wp-panda' ) );
	}
	if ( isset( $pages[ $current ] ) ) {
		return $pages[ $current ];
	}
	return array( __( 'Панель управления', 'wp-panda' ), __( 'Обзор купленных тем, плагинов и обновлений', 'wp-panda' ) );
}

/** Counts shown beside account navigation items, calculated from this customer's real data. */
function wpp_account_menu_count( $endpoint ) {
	$user_id = get_current_user_id();
	if ( 'orders' === $endpoint && function_exists( 'wc_get_customer_order_count' ) ) {
		return (int) wc_get_customer_order_count( $user_id );
	}
	if ( 'wishlist' === $endpoint ) {
		$ids = get_user_meta( $user_id, 'wpp_wishlist_product_ids', true );
		return is_array( $ids ) ? count( array_unique( array_map( 'absint', $ids ) ) ) : 0;
	}
	if ( 'support' === $endpoint ) {
		return count( get_posts( array( 'post_type' => 'wpp_support_ticket', 'post_status' => array( 'private', 'publish' ), 'author' => $user_id, 'posts_per_page' => -1, 'fields' => 'ids', 'no_found_rows' => true ) ) );
	}
	if ( 'licenses' === $endpoint && function_exists( 'wc_get_orders' ) ) {
		$orders = wc_get_orders( array( 'customer_id' => $user_id, 'status' => array( 'wc-processing', 'wc-completed' ), 'limit' => -1, 'return' => 'ids' ) );
		return count( $orders );
	}
	return 0;
}

/** Add licenses, support tickets and wishlist to WooCommerce's standard account navigation. */
function wpp_account_menu_items( $items ) {
	$logout = isset( $items['customer-logout'] ) ? $items['customer-logout'] : '';
	unset( $items['customer-logout'] );

	$custom_items = array(
		'licenses' => __( 'Лицензии', 'wp-panda' ),
		'support'  => __( 'Обращения', 'wp-panda' ),
		'wishlist' => __( 'Избранное', 'wp-panda' ),
	);
	$ordered = array();
	$added   = false;
	foreach ( $items as $endpoint => $label ) {
		$ordered[ $endpoint ] = $label;
		if ( 'downloads' === $endpoint ) {
			$ordered = array_merge( $ordered, $custom_items );
			$added   = true;
		}
	}
	if ( ! $added ) {
		$ordered = array_merge( $ordered, $custom_items );
	}
	if ( $logout ) {
		$ordered['customer-logout'] = $logout;
	}

	return $ordered;
}

function wpp_account_licenses_endpoint() {
	get_template_part( 'template-parts/account/licenses' );
}

function wpp_account_support_endpoint( $view = '' ) {
	get_template_part( 'template-parts/account/support', null, array( 'view' => sanitize_key( $view ) ) );
}

function wpp_account_wishlist_endpoint() {
	get_template_part( 'template-parts/account/wishlist' );
}

/** Store a private support ticket for the signed-in customer after nonce and input validation. */
function wpp_handle_support_ticket_submission() {
	if ( ! is_user_logged_in() ) {
		wp_safe_redirect( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'myaccount' ) : home_url( '/' ) );
		exit;
	}

	check_admin_referer( 'wpp_submit_support_ticket' );
	$subject = isset( $_POST['ticket_subject'] ) && is_string( $_POST['ticket_subject'] ) ? sanitize_text_field( wp_unslash( $_POST['ticket_subject'] ) ) : '';
	$message = isset( $_POST['ticket_message'] ) && is_string( $_POST['ticket_message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['ticket_message'] ) ) : '';
	$topic   = isset( $_POST['ticket_topic'] ) && is_string( $_POST['ticket_topic'] ) ? sanitize_key( wp_unslash( $_POST['ticket_topic'] ) ) : 'general';
	$topics  = array( 'general', 'installation', 'license', 'billing', 'technical' );
	$topic   = in_array( $topic, $topics, true ) ? $topic : 'general';
	$privacy_consent = isset( $_POST['privacy_consent'] ) && is_string( $_POST['privacy_consent'] ) && '1' === wp_unslash( $_POST['privacy_consent'] );

	if ( strlen( $subject ) < 3 || strlen( $subject ) > 180 || strlen( $message ) < 10 || strlen( $message ) > 10000 || ! $privacy_consent ) {
		wpp_redirect_account_support( 'invalid' );
	}

	$user_id   = get_current_user_id();
	$ticket_id = wp_insert_post( array(
		'post_type'    => 'wpp_support_ticket',
		'post_status'  => 'private',
		'post_title'   => $subject,
		'post_content' => $message,
		'post_author'  => $user_id,
	), true );

	if ( is_wp_error( $ticket_id ) || ! $ticket_id ) {
		wpp_redirect_account_support( 'error' );
	}

	update_post_meta( $ticket_id, '_wpp_ticket_customer_id', $user_id );
	update_post_meta( $ticket_id, '_wpp_ticket_topic', $topic );
	update_post_meta( $ticket_id, '_wpp_ticket_status', 'open' );
	update_post_meta( $ticket_id, '_wpp_ticket_privacy_consent', '1' );
	update_post_meta( $ticket_id, '_wpp_ticket_privacy_consent_at', current_time( 'mysql', true ) );
	wpp_redirect_account_support( 'sent' );
}

/** Safely return a customer to their own support endpoint with a short status code. */
function wpp_redirect_account_support( $notice ) {
	$base = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'myaccount' ) : home_url( '/' );
	$url  = function_exists( 'wc_get_endpoint_url' ) ? wc_get_endpoint_url( 'support', '', $base ) : $base;
	wp_safe_redirect( add_query_arg( 'ticket_notice', sanitize_key( $notice ), $url ) );
	exit;
}

/** Add or remove a published product from the current customer's private wishlist. */
function wpp_handle_wishlist_toggle() {
	if ( ! is_user_logged_in() ) {
		wp_safe_redirect( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'myaccount' ) : home_url( '/' ) );
		exit;
	}

	$product_id = isset( $_POST['product_id'] ) ? absint( wp_unslash( $_POST['product_id'] ) ) : 0;
	check_admin_referer( 'wpp_toggle_wishlist_' . $product_id );
	$product = function_exists( 'wc_get_product' ) ? wc_get_product( $product_id ) : false;
	if ( ! $product || 'publish' !== get_post_status( $product_id ) ) {
		wp_safe_redirect( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'myaccount' ) : home_url( '/' ) );
		exit;
	}

	$user_id = get_current_user_id();
	$ids     = get_user_meta( $user_id, 'wpp_wishlist_product_ids', true );
	$ids     = is_array( $ids ) ? array_values( array_unique( array_map( 'absint', $ids ) ) ) : array();
	$exists  = in_array( $product_id, $ids, true );
	if ( $exists ) {
		$ids    = array_values( array_diff( $ids, array( $product_id ) ) );
		$notice = 'removed';
	} else {
		$ids[]  = $product_id;
		$notice = 'added';
	}
	update_user_meta( $user_id, 'wpp_wishlist_product_ids', $ids );

	$referer = wp_get_referer();
	$target  = $referer ? wp_validate_redirect( $referer, $product->get_permalink() ) : $product->get_permalink();
	wp_safe_redirect( add_query_arg( 'wishlist_action', $notice, $target ) );
	exit;
}

/** Render a shared wishlist control from a WooCommerce product-loop or summary hook. */
function wpp_catalog_loop_wishlist_button() {
	global $product;
	if ( $product instanceof WC_Product ) {
		get_template_part( 'template-parts/account/wishlist-button', null, array( 'product_id' => $product->get_id() ) );
	}
}

function wpp_single_product_wishlist_button() {
	wpp_catalog_loop_wishlist_button();
}
