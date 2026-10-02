<?php
/**
 * Saved payment methods (gateway tokens) with the layout's empty state.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$wpp_methods = wc_get_customer_saved_methods_list( get_current_user_id() );
?>
<div class="space-y-5">
	<?php if ( empty( $wpp_methods ) ) : ?>
		<div class="rounded-card border border-line bg-white p-10 text-center shadow-card">
			<span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-soft text-muted"><?php echo wpp_icon( 'credit-card', 'h-6 w-6' ); ?></span>
			<p class="mt-4 text-sm text-muted"><?php esc_html_e( 'Сохранённых способов оплаты пока нет. Они появятся после первой оплаты с сохранением карты.', 'wp-panda' ); ?></p>
		</div>
	<?php else : ?>
		<div class="grid gap-4 sm:grid-cols-2">
			<?php foreach ( $wpp_methods as $wpp_type => $wpp_list ) :
				foreach ( $wpp_list as $wpp_method ) :
					?>
					<div class="rounded-card border border-line bg-white p-5 shadow-card">
						<div class="flex items-center gap-3">
							<span class="flex h-10 w-10 items-center justify-center rounded-full bg-soft text-ink"><?php echo wpp_icon( 'credit-card', 'h-5 w-5' ); ?></span>
							<div class="min-w-0 flex-1">
								<div class="text-sm font-semibold"><?php echo esc_html( $wpp_method['method']['last4'] ? '•••• ' . $wpp_method['method']['last4'] : $wpp_method['method']['brand'] ); ?></div>
								<div class="text-xs text-muted"><?php echo esc_html( $wpp_method['expires'] ? sprintf( __( 'Действует до %s', 'wp-panda' ), $wpp_method['expires'] ) : __( 'Бессрочно', 'wp-panda' ) ); ?></div>
							</div>
						</div>
					</div>
				<?php endforeach; ?>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>
</div>
