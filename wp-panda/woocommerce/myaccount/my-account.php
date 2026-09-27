<?php
/**
 * My Account wrapper; endpoint content and navigation remain WooCommerce-driven.
 *
 * @package WooCommerce\Templates
 * @version 3.5.0
 */
defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_my_account' );
?>
<div class="woocommerce wpp-account-page mx-auto max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 lg:pb-20">
	<header class="account-page__heading">
		<p class="eyebrow"><?php esc_html_e( 'Профиль Wp Panda', 'wp-panda' ); ?></p>
		<h1><?php esc_html_e( 'Личный кабинет', 'wp-panda' ); ?></h1>
		<p><?php esc_html_e( 'Заказы, загрузки, адреса и данные вашей учётной записи.', 'wp-panda' ); ?></p>
	</header>
	<div class="woocommerce-account wpp-account-layout">
		<?php do_action( 'woocommerce_account_navigation' ); ?>
		<div class="woocommerce-MyAccount-content wpp-account-content">
			<?php do_action( 'woocommerce_account_content' ); ?>
		</div>
	</div>
</div>
<?php do_action( 'woocommerce_after_my_account' ); ?>
