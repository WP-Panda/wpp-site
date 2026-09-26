<?php
/**
 * Личный кабинет WooCommerce (override myaccount/my-account.php)
 * с сайдбаром в стиле личного кабинета Wp Panda.
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header( 'shop' );

$icons = array(
	'dashboard'          => 'gauge',
	'orders'             => 'package',
	'downloads'          => 'download',
	'edit-address'       => 'house',
	'payment-methods'    => 'credit-card',
	'edit-account'       => 'user-cog',
	'customer-logout'    => 'logout',
);
?>
<div class="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6">
	<?php woocommerce_breadcrumb(); ?>

	<div class="mt-6">
		<h1 class="text-3xl font-bold tracking-tight text-ink">
			<?php echo esc_html( is_user_logged_in() ? __( 'Личный кабинет', 'wp-panda' ) : __( 'Вход в кабинет', 'wp-panda' ) ); ?>
		</h1>
		<p class="mt-1 text-sm text-muted"><?php esc_html_e( 'Заказы, загрузки, лицензии и обращения в одном месте.', 'wp-panda' ); ?></p>
	</div>

	<div class="mt-8 grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
		<aside class="wpp-account-nav rounded-card border border-line bg-white p-2 shadow-card">
			<?php do_action( 'woocommerce_account_navigation' ); ?>
		</aside>
		<div class="woocommerce-account-content rounded-card border border-line bg-white p-6 shadow-card sm:p-8">
			<div class="woocommerce">
				<?php do_action( 'woocommerce_account_content' ); ?>
			</div>
		</div>
	</div>
</div>
<?php
get_footer( 'shop' );
