<?php
/**
 * Account shell styled like the standalone account layouts; WooCommerce continues
 * to own endpoint routing, customer data, forms, and order/download behavior.
 *
 * @package WooCommerce\Templates
 * @version 3.5.0
 */
defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_my_account' );
$heading_data = function_exists( 'wpp_account_page_heading' ) ? wpp_account_page_heading() : array( __( 'Панель управления', 'wp-panda' ), __( 'Обзор купленных тем, плагинов и обновлений', 'wp-panda' ) );
$current_user = wp_get_current_user();
$registered   = $current_user->user_registered ? mysql2date( 'Y', $current_user->user_registered ) : '';
?>
<div class="woocommerce wpp-account-page mx-auto max-w-[1200px] px-4 pb-16 pt-6 sm:px-6 sm:pt-10">
	<header class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
		<div>
			<div class="text-sm text-muted"><?php esc_html_e( 'Личный кабинет', 'wp-panda' ); ?></div>
			<h1 class="mt-1 text-3xl font-bold tracking-tight sm:text-[44px] sm:leading-[1.1]"><?php echo esc_html( $heading_data[0] ); ?></h1>
			<p class="mt-1 text-muted"><?php echo esc_html( $heading_data[1] ); ?></p>
		</div>
		<?php if ( is_user_logged_in() ) : ?>
			<div class="flex items-center gap-3 self-start rounded-full border border-line bg-white p-1.5 pr-5 shadow-card sm:self-auto">
				<span class="flex h-10 w-10 items-center justify-center rounded-full bg-brand"><?php echo wpp_icon( 'user', 'h-5 w-5' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
				<span class="leading-tight"><span class="block text-sm font-semibold"><?php echo esc_html( $current_user->display_name ); ?></span><span class="block text-xs text-muted"><?php echo esc_html( $current_user->user_email ); ?><?php if ( $registered ) : ?> · <?php printf( esc_html__( 'клиент с %s', 'wp-panda' ), esc_html( $registered ) ); ?><?php endif; ?></span></span>
			</div>
		<?php endif; ?>
	</header>
	<div class="woocommerce-account wpp-account-layout mt-8 grid items-start gap-6 lg:grid-cols-[268px_minmax(0,1fr)]">
		<?php if ( is_user_logged_in() ) : ?>
			<aside class="lg:sticky lg:top-24">
				<?php do_action( 'woocommerce_account_navigation' ); ?>
				<div class="mt-4 rounded-2xl border border-line bg-white p-4 shadow-card">
					<p class="text-sm font-semibold"><?php esc_html_e( 'Нужна помощь?', 'wp-panda' ); ?></p>
					<p class="mt-1 text-xs text-muted"><?php esc_html_e( 'Команда WPP Team на связи', 'wp-panda' ); ?></p>
					<a class="button button--brand mt-3 w-full" href="<?php echo esc_url( wc_get_endpoint_url( 'support', 'new', wc_get_page_permalink( 'myaccount' ) ) ); ?>"><?php esc_html_e( 'Новый тикет', 'wp-panda' ); ?></a>
				</div>
			</aside>
		<?php endif; ?>
		<div class="woocommerce-MyAccount-content wpp-account-content min-w-0">
			<?php do_action( 'woocommerce_account_content' ); ?>
		</div>
	</div>
</div>
<?php do_action( 'woocommerce_after_my_account' ); ?>
