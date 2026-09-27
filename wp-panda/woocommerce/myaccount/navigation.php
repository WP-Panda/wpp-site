<?php
/** WooCommerce endpoints in the account navigation used by the reference layout. */
defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_account_navigation' );
$labels = array(
	'dashboard'      => __( 'Панель управления', 'wp-panda' ),
	'orders'         => __( 'Заказы', 'wp-panda' ),
	'downloads'      => __( 'Загрузки', 'wp-panda' ),
	'licenses'       => __( 'Лицензии и ключи', 'wp-panda' ),
	'support'        => __( 'Поддержка', 'wp-panda' ),
	'wishlist'       => __( 'Избранное', 'wp-panda' ),
	'edit-address'   => __( 'Платёжный адрес', 'wp-panda' ),
	'payment-methods'=> __( 'Способы оплаты', 'wp-panda' ),
	'edit-account'   => __( 'Данные аккаунта', 'wp-panda' ),
	'customer-logout'=> __( 'Выйти', 'wp-panda' ),
);
$icons = array(
	'dashboard' => '▦', 'orders' => '▤', 'downloads' => '↓', 'licenses' => '◇',
	'support' => '?', 'wishlist' => '♡', 'edit-address' => '⌂', 'payment-methods' => '▣',
	'edit-account' => '♙', 'customer-logout' => '↗',
);
?>
<nav class="woocommerce-MyAccount-navigation wpp-account-navigation no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:rounded-card lg:border lg:border-line lg:bg-white lg:p-2 lg:shadow-card" aria-label="<?php esc_attr_e( 'Навигация личного кабинета', 'wp-panda' ); ?>">
	<ul class="flex gap-1.5 lg:flex-col">
		<?php foreach ( wc_get_account_menu_items() as $endpoint => $default_label ) : ?>
			<?php
			$label     = isset( $labels[ $endpoint ] ) ? $labels[ $endpoint ] : $default_label;
			$classes   = wc_get_account_menu_item_classes( $endpoint );
			$is_active = wc_is_current_account_menu_item( $endpoint );
			$count     = function_exists( 'wpp_account_menu_count' ) ? wpp_account_menu_count( $endpoint ) : 0;
			$active    = $is_active ? ' border-ink bg-ink text-white shadow-[0_8px_20px_-10px_rgba(20,20,28,0.7)]' : ' border-line bg-white text-ink/80 hover:bg-soft lg:bg-transparent';
			?>
			<li class="<?php echo esc_attr( $classes ); ?> flex-shrink-0">
				<a class="flex items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-4 text-left text-sm font-semibold transition-all lg:w-full lg:border-0<?php echo esc_attr( $active ); ?>" href="<?php echo esc_url( wc_get_account_endpoint_url( $endpoint ) ); ?>"<?php echo $is_active ? ' aria-current="page"' : ''; ?>>
					<span class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full <?php echo $is_active ? 'bg-brand text-ink' : 'bg-soft text-ink/70'; ?>" aria-hidden="true"><?php echo esc_html( isset( $icons[ $endpoint ] ) ? $icons[ $endpoint ] : '•' ); ?></span>
					<span class="flex-1 whitespace-nowrap"><?php echo esc_html( $label ); ?></span>
					<?php if ( $count > 0 ) : ?><span class="rounded-full px-2 py-0.5 text-[11px] font-bold <?php echo $is_active ? 'bg-brand text-ink' : 'bg-brand-50 text-ink'; ?>"><?php echo esc_html( number_format_i18n( $count ) ); ?></span><?php endif; ?>
				</a>
			</li>
		<?php endforeach; ?>
	</ul>
</nav>
<?php do_action( 'woocommerce_after_account_navigation' ); ?>
