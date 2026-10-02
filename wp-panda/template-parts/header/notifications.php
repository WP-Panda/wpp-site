<?php
/**
 * Notifications popover for logged-in customers, in the layout's dark style.
 *
 * Items come from user meta `_wpp_notifications` (created when support
 * replies to a ticket). «Очистить уведомления» removes them until new
 * events arrive.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$wpp_notifications = wpp_get_notifications( get_current_user_id() );
?>
<div class="wpp-notifications-panel fade-up absolute right-0 top-full z-20 mt-3 hidden w-80 rounded-2xl bg-ink p-2 text-white shadow-float" data-notifications-panel>
	<div class="flex items-center justify-between px-3 pb-2 pt-1.5">
		<span class="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45"><?php esc_html_e( 'Уведомления', 'wp-panda' ); ?></span>
		<?php if ( $wpp_notifications ) : ?>
			<span class="text-[11px] font-semibold text-brand" data-notifications-count><?php echo esc_html( count( $wpp_notifications ) ); ?></span>
		<?php endif; ?>
	</div>
	<div data-notifications-list <?php echo $wpp_notifications ? '' : 'class="hidden"'; ?>>
		<?php foreach ( $wpp_notifications as $wpp_item ) : ?>
			<a class="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/5" href="<?php echo esc_url( $wpp_item['url'] ); ?>">
				<span class="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand text-ink"><?php echo wpp_icon( 'life-buoy', 'h-4 w-4' ); ?></span>
				<span class="min-w-0 flex-1">
					<span class="block text-sm font-semibold"><?php echo esc_html( $wpp_item['title'] ); ?></span>
					<?php if ( $wpp_item['text'] ) : ?>
						<span class="block text-xs text-white/50"><?php echo esc_html( $wpp_item['text'] ); ?></span>
					<?php endif; ?>
				</span>
				<span class="whitespace-nowrap text-[11px] text-white/40"><?php echo esc_html( human_time_diff( (int) $wpp_item['time'] ) . ' ' . __( 'назад', 'wp-panda' ) ); ?></span>
			</a>
		<?php endforeach; ?>
		<button type="button" data-notifications-clear class="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-semibold text-white/70 transition hover:bg-white/5 hover:text-white">
			<?php echo wpp_icon( 'trash', 'h-3.5 w-3.5' ); ?><?php esc_html_e( 'Очистить уведомления', 'wp-panda' ); ?>
		</button>
	</div>
	<div data-notifications-empty <?php echo $wpp_notifications ? 'class="hidden"' : ''; ?>>
		<div class="flex flex-col items-center gap-2 px-4 py-7 text-center">
			<span class="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white/40"><?php echo wpp_icon( 'bell', 'h-5 w-5' ); ?></span>
			<p class="text-sm font-semibold"><?php esc_html_e( 'Пока без уведомлений', 'wp-panda' ); ?></p>
			<p class="text-xs text-white/45"><?php esc_html_e( 'Ответы поддержки и обновления появятся здесь', 'wp-panda' ); ?></p>
		</div>
	</div>
</div>
