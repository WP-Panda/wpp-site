<?php
/**
 * My Account shell matching the layout: page header, sidebar nav, content.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

if ( ! is_user_logged_in() ) : ?>
	<div class="mx-auto max-w-[1200px] px-4 pt-10 pb-24 sm:px-6">
		<div class="mx-auto max-w-md rounded-card border border-line bg-white p-8 text-center shadow-card">
			<h1 class="text-2xl font-bold tracking-tight"><?php esc_html_e( 'Личный кабинет', 'wp-panda' ); ?></h1>
			<p class="mt-2 text-sm text-muted"><?php esc_html_e( 'Войдите, чтобы управлять покупками, лицензиями и тикетами.', 'wp-panda' ); ?></p>
			<div class="mt-6 text-left"><?php wc_get_template( 'myaccount/form-login.php' ); ?></div>
		</div>
	</div>
	<?php
	return;
endif;

$wpp_endpoint = function_exists( 'wpp_account_current_endpoint' ) ? wpp_account_current_endpoint() : 'dashboard';
$wpp_wc_ep    = ( class_exists( 'WooCommerce' ) && WC()->query ) ? WC()->query->get_current_endpoint() : '';
if ( ! $wpp_wc_ep ) {
	$wpp_wc_ep = '';
}

$wpp_titles = array(
	'dashboard'     => array( __( 'Панель управления', 'wp-panda' ), __( 'Обзор купленных тем, плагинов и обновлений', 'wp-panda' ) ),
	'orders'        => array( __( 'Заказы', 'wp-panda' ), __( 'История покупок, счета и чеки', 'wp-panda' ) ),
	'downloads'     => array( __( 'Загрузки', 'wp-panda' ), __( 'Файлы купленных тем и плагинов', 'wp-panda' ) ),
	'licenses'      => array( __( 'Лицензии и ключи', 'wp-panda' ), __( 'Активация и привязка к сайтам', 'wp-panda' ) ),
	'support'       => array( __( 'Поддержка', 'wp-panda' ), __( 'Ваши обращения к команде WPP Team', 'wp-panda' ) ),
	'wishlist'      => array( __( 'Избранное', 'wp-panda' ), __( 'Продукты, которые вы сохранили на потом', 'wp-panda' ) ),
	'edit-address'  => array( __( 'Платёжный адрес', 'wp-panda' ), __( 'Данные для счетов и чеков', 'wp-panda' ) ),
	'payment-methods' => array( __( 'Способы оплаты', 'wp-panda' ), __( 'Сохранённые карты и реквизиты', 'wp-panda' ) ),
	'edit-account'  => array( __( 'Данные аккаунта', 'wp-panda' ), __( 'Личные данные и смена пароля', 'wp-panda' ) ),
);
if ( 'new-ticket' === $wpp_endpoint ) {
	$wpp_titles['support'] = array( __( 'Новое обращение', 'wp-panda' ), __( 'WPP Team ответит в личном кабинете и на email', 'wp-panda' ) );
}
$wpp_page_title    = isset( $wpp_titles[ $wpp_endpoint ] ) ? $wpp_titles[ $wpp_endpoint ][0] : __( 'Личный кабинет', 'wp-panda' );
$wpp_page_subtitle = isset( $wpp_titles[ $wpp_endpoint ] ) ? $wpp_titles[ $wpp_endpoint ][1] : '';

$user      = wp_get_current_user();
$full_name = trim( $user->first_name . ' ' . $user->last_name );
if ( '' === $full_name ) {
	$full_name = $user->display_name;
}
$member_since = $user->user_registered ? gmdate( 'Y', strtotime( $user->user_registered ) ) : gmdate( 'Y' );
?>
<div class="mx-auto max-w-[1200px] px-4 pt-6 sm:px-6 sm:pt-10">
	<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
		<div>
			<div class="text-sm text-muted"><?php esc_html_e( 'Личный кабинет', 'wp-panda' ); ?></div>
			<h1 class="mt-1 text-3xl font-bold tracking-tight sm:text-[44px] sm:leading-[1.1]"><?php echo esc_html( $wpp_page_title ); ?></h1>
			<?php if ( $wpp_page_subtitle ) : ?><p class="mt-1 text-muted"><?php echo esc_html( $wpp_page_subtitle ); ?></p><?php endif; ?>
		</div>
		<div class="flex items-center gap-3 self-start rounded-full border border-line bg-white p-1.5 pr-5 shadow-card sm:self-auto">
			<span class="flex h-10 w-10 items-center justify-center rounded-full bg-brand"><?php echo wpp_icon( 'user', 'h-5 w-5' ); ?></span>
			<div class="leading-tight">
				<div class="text-sm font-semibold"><?php echo esc_html( $full_name ); ?></div>
				<div class="text-xs text-muted"><?php echo esc_html( $user->user_email ); ?> · <?php echo esc_html( sprintf( __( 'клиент с %s', 'wp-panda' ), $member_since ) ); ?></div>
			</div>
		</div>
	</div>
	<div class="mt-8 grid items-start gap-6 lg:grid-cols-[268px_minmax(0,1fr)]">
		<aside class="lg:sticky lg:top-24">
			<nav class="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:rounded-card lg:border lg:border-line lg:bg-white lg:p-2 lg:shadow-card">
				<?php
				$wpp_items = wpp_account_nav_items();
				foreach ( $wpp_items as $wpp_item ) :
					list( $wpp_slug, $wpp_label, $wpp_icon_name, $wpp_count ) = $wpp_item;
					$wpp_active = ( $wpp_slug === $wpp_endpoint );
					$wpp_url    = wc_get_account_endpoint_url( $wpp_slug );
					$wpp_link_class = $wpp_active
						? 'border-ink bg-ink text-white shadow-[0_8px_20px_-10px_rgba(20,20,28,0.7)]'
						: 'border-line bg-white text-ink/80 hover:bg-soft lg:bg-transparent';
					$wpp_icon_class = $wpp_active ? 'bg-brand text-ink' : 'bg-soft text-ink/70';
					$wpp_count_class = $wpp_active ? 'bg-white/15 text-white' : 'bg-brand-50 text-ink';
					?>
					<a class="flex flex-shrink-0 items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-4 text-left text-sm font-semibold transition-all lg:w-full lg:border-0 <?php echo esc_attr( $wpp_link_class ); ?>" href="<?php echo esc_url( $wpp_url ); ?>">
						<span class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full <?php echo esc_attr( $wpp_icon_class ); ?>"><?php echo wpp_icon( $wpp_icon_name, 'h-4 w-4' ); ?></span>
						<span class="flex-1 whitespace-nowrap"><?php echo esc_html( $wpp_label ); ?></span>
						<?php if ( $wpp_count > 0 ) : ?>
							<span class="rounded-full px-2 py-0.5 text-[11px] font-bold <?php echo esc_attr( $wpp_count_class ); ?>"><?php echo esc_html( $wpp_count ); ?></span>
						<?php endif; ?>
					</a>
				<?php endforeach; ?>
				<div class="my-1.5 hidden border-t border-line lg:block"></div>
				<a class="flex flex-shrink-0 items-center gap-3 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 lg:w-full lg:border-0 lg:bg-transparent" href="<?php echo esc_url( wc_get_account_endpoint_url( 'customer-logout' ) ); ?>">
					<span class="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50"><?php echo wpp_icon( 'log-out', 'h-4 w-4' ); ?></span>
					<?php esc_html_e( 'Выйти', 'wp-panda' ); ?>
				</a>
			</nav>
			<div class="dark-card mt-4 hidden rounded-card p-5 text-white lg:block">
				<span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand text-ink"><?php echo wpp_icon( 'headphones', 'h-5 w-5' ); ?></span>
				<div class="mt-4 font-semibold"><?php esc_html_e( 'Нужна помощь?', 'wp-panda' ); ?></div>
				<p class="mt-1 text-sm text-white/65"><?php esc_html_e( 'Команда WPP Team на связи', 'wp-panda' ); ?></p>
				<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-brand text-ink hover:bg-brand-600 shadow-glow h-9 px-4 text-[13px] mt-4 w-full" href="<?php echo esc_url( wc_get_account_endpoint_url( 'new-ticket' ) ); ?>"><?php esc_html_e( 'Новый тикет', 'wp-panda' ); ?></a>
			</div>
		</aside>
		<section class="fade-up min-w-0">
			<?php
			$wpp_wc_content_eps = array( 'view-order', 'order-pay', 'lost-password', 'add-payment-method', 'set-password' );
			if ( $wpp_wc_ep && in_array( $wpp_wc_ep, $wpp_wc_content_eps, true ) ) {
				echo '<div class="wpp-wc-default rounded-card border border-line bg-white p-5 shadow-card sm:p-7">';
				wc_print_notices();
				do_action( 'woocommerce_account_' . $wpp_wc_ep . '_endpoint' );
				echo '</div>';
			} else {
			switch ( $wpp_endpoint ) {
				case 'orders':
					get_template_part( 'template-parts/account/orders' );
					break;
				case 'downloads':
					get_template_part( 'template-parts/account/downloads' );
					break;
				case 'licenses':
					get_template_part( 'template-parts/account/licenses' );
					break;
				case 'support':
					if ( isset( $GLOBALS['wp']->query_vars['new-ticket'] ) ) {
						get_template_part( 'template-parts/account/new-ticket' );
					} else {
						get_template_part( 'template-parts/account/tickets' );
					}
					break;
				case 'wishlist':
					get_template_part( 'template-parts/account/wishlist' );
					break;
				case 'edit-address':
					get_template_part( 'template-parts/account/address' );
					break;
				case 'payment-methods':
					get_template_part( 'template-parts/account/payment-methods' );
					break;
				case 'edit-account':
					get_template_part( 'template-parts/account/details' );
					break;
				default:
					get_template_part( 'template-parts/account/dashboard' );
					break;
			}
			}
			?>
		</section>
	</div>
</div>
