<?php
/**
 * 4-step checkout stepper. Args: step (1-4), subtitles per step.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$wpp_step = isset( $args['step'] ) ? (int) $args['step'] : 1;
$wpp_subs = isset( $args['subtitles'] ) ? $args['subtitles'] : array();
$wpp_defaults = array(
	__( 'Корзина', 'wp-panda' ),
	__( 'Данные', 'wp-panda' ),
	__( 'Оплата', 'wp-panda' ),
	__( 'Готово', 'wp-panda' ),
);
$wpp_default_subs = array(
	__( 'Проверьте состав', 'wp-panda' ),
	__( 'Не заполнено', 'wp-panda' ),
	__( 'Не выбрано', 'wp-panda' ),
	__( 'Финальный шаг', 'wp-panda' ),
);
$wpp_subs = array_merge( $wpp_default_subs, (array) $wpp_subs );
?>
<div class="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
	<div class="flex min-w-max items-center gap-1 rounded-full border border-line bg-white p-1.5 shadow-card sm:min-w-0">
		<?php for ( $wpp_i = 1; $wpp_i <= 4; $wpp_i++ ) :
			$wpp_done   = $wpp_i < $wpp_step;
			$wpp_active = $wpp_i === $wpp_step;
			$wpp_btn_class = $wpp_active
				? 'bg-ink text-white shadow-[0_10px_24px_-12px_rgba(20,20,28,0.7)]'
				: '';
			$wpp_num_class = $wpp_done
				? 'bg-ink text-white'
				: ( $wpp_active ? 'bg-brand text-ink' : 'border border-line bg-soft text-muted' );
			$wpp_sub_class = $wpp_active ? 'text-white/60' : 'text-muted';
			?>
			<?php if ( $wpp_i > 1 ) : ?><span class="hidden h-px w-6 flex-shrink-0 bg-line md:block"></span><?php endif; ?>
			<button type="button" disabled class="flex flex-1 items-center gap-3 rounded-full py-2 pl-2 pr-5 text-left transition-all disabled:cursor-default <?php echo esc_attr( $wpp_btn_class ); ?>">
				<span class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold <?php echo esc_attr( $wpp_num_class ); ?>">
					<?php echo $wpp_done ? wpp_icon( 'check', 'h-4 w-4' ) : esc_html( $wpp_i ); ?>
				</span>
				<span class="min-w-0">
					<span class="block truncate text-sm font-semibold leading-tight"><?php echo esc_html( $wpp_defaults[ $wpp_i - 1 ] ); ?></span>
					<span class="block max-w-[150px] truncate text-[11px] leading-tight <?php echo esc_attr( $wpp_sub_class ); ?>"><?php echo esc_html( $wpp_subs[ $wpp_i - 1 ] ); ?></span>
				</span>
			</button>
		<?php endfor; ?>
	</div>
</div>
