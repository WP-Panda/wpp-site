<?php
/**
 * License keys with copy buttons and site slots, exactly like the layout.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$wpp_licenses = function_exists( 'wpp_get_user_licenses' ) ? wpp_get_user_licenses() : array();
?>
<div class="space-y-5">
	<div class="rounded-card bg-brand-50 p-5 ring-1 ring-brand-100 flex items-center gap-3">
		<span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand text-ink"><?php echo wpp_icon( 'info', 'h-5 w-5' ); ?></span>
		<div class="text-sm"><b class="text-ink"><?php esc_html_e( 'Условия лицензирования:', 'wp-panda' ); ?></b> <?php echo wp_kses_post( __( 'для плагинов лицензия <b>навсегда</b> (все будущие обновления включены). Для тем действует лицензия на <b>1 сайт</b> или <b>5 сайтов</b>.', 'wp-panda' ) ); ?></div>
	</div>
	<?php if ( ! $wpp_licenses ) : ?>
		<div class="rounded-card border border-line bg-white p-10 text-center shadow-card">
			<p class="text-sm text-muted"><?php esc_html_e( 'Лицензий пока нет — ключи появятся после оплаты первого заказа.', 'wp-panda' ); ?></p>
			<a class="mt-4 inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-11 px-5 text-sm" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) ); ?>"><?php esc_html_e( 'Перейти в каталог', 'wp-panda' ); ?></a>
		</div>
	<?php endif; ?>
	<?php foreach ( $wpp_licenses as $wpp_license ) :
		$wpp_product = wc_get_product( $wpp_license['product_id'] );
		if ( ! $wpp_product ) {
			continue;
		}
		$wpp_kind    = function_exists( 'wpp_product_kind' ) ? wpp_product_kind( $wpp_license['product_id'] ) : 'product';
		$wpp_is_theme = 'theme' === $wpp_kind;
		$wpp_tier    = $wpp_license['tier'];
		$wpp_max     = $wpp_is_theme ? ( mb_strpos( $wpp_tier, '5' ) !== false ? 5 : 1 ) : 0;
		$wpp_key     = $wpp_license['key'];
		$wpp_masked  = substr( $wpp_key, 0, 4 ) . '-' . '••••-••••-' . substr( $wpp_key, -4 );
		?>
		<div class="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
			<div class="flex flex-wrap items-center gap-4">
				<?php echo wpp_product_mini_tile( $wpp_product, 'h-14 w-14 rounded-2xl' ); ?>
				<div class="min-w-0 flex-1">
					<div class="flex flex-wrap items-center gap-2">
						<h3 class="text-lg font-semibold tracking-tight"><?php echo esc_html( $wpp_product->get_name() ); ?></h3>
						<span class="rounded-full bg-ink px-2.5 py-0.5 text-[11px] font-semibold text-white"><?php echo $wpp_is_theme ? esc_html( sprintf( __( 'Тема: %s', 'wp-panda' ), $wpp_tier ) ) : esc_html__( 'Плагин навсегда', 'wp-panda' ); ?></span>
						<span class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset bg-emerald-50 text-emerald-700 ring-emerald-200"><span class="h-1.5 w-1.5 rounded-full bg-current opacity-70"></span><?php esc_html_e( 'Активна', 'wp-panda' ); ?></span>
					</div>
					<div class="mt-0.5 text-xs text-muted"><?php echo esc_html( sprintf( __( 'Заказ #%s', 'wp-panda' ), $wpp_license['order_number'] ) ); ?> · <?php echo $wpp_is_theme ? esc_html( sprintf( __( 'до %s сайтов одновременно', 'wp-panda' ), $wpp_max ) ) : esc_html__( 'бессрочный доступ ко всем обновлениям', 'wp-panda' ); ?></div>
				</div>
			</div>
			<div class="mt-5 grid gap-3 lg:grid-cols-2">
				<div class="rounded-2xl bg-soft p-4">
					<div class="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted"><?php esc_html_e( 'Лицензионный ключ', 'wp-panda' ); ?></div>
					<div class="mt-2 flex items-center gap-2">
						<code data-license-key data-full="<?php echo esc_attr( $wpp_key ); ?>" class="min-w-0 flex-1 truncate font-mono text-[15px] font-semibold tracking-wider"><?php echo esc_html( $wpp_masked ); ?></code>
						<button aria-label="<?php esc_attr_e( 'Показать ключ', 'wp-panda' ); ?>" data-license-reveal class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-muted transition hover:text-ink"><?php echo wpp_icon( 'eye', 'h-4 w-4' ); ?></button>
						<button type="button" class="inline-flex h-8 flex-shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition border-line bg-white hover:border-ink/20" data-wpp-copy-link data-wpp-copy-target="<?php echo esc_attr( $wpp_key ); ?>"><?php echo wpp_icon( 'copy', 'h-3.5 w-3.5' ); ?><?php esc_html_e( 'Копировать', 'wp-panda' ); ?></button>
					</div>
				</div>
				<div class="rounded-2xl bg-soft p-4">
					<div class="flex items-center justify-between">
						<div class="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted"><?php esc_html_e( 'Привязка к сайтам', 'wp-panda' ); ?></div>
						<div class="text-xs font-semibold"><?php echo $wpp_is_theme ? esc_html( sprintf( __( '%s из %s', 'wp-panda' ), count( $wpp_license['sites'] ), $wpp_max ) ) : esc_html( sprintf( __( '%s (без лимита)', 'wp-panda' ), count( $wpp_license['sites'] ) ) ); ?></div>
					</div>
					<div class="mt-3 h-2 overflow-hidden rounded-full bg-white">
						<div class="h-full rounded-full bg-brand transition-all duration-500" style="width: <?php echo $wpp_is_theme ? esc_attr( min( 100, count( $wpp_license['sites'] ) * 20 ) ) : 30; ?>%;"></div>
					</div>
					<div class="mt-2 text-xs text-muted"><?php echo $wpp_is_theme ? esc_html( sprintf( __( 'Свободно слотов: %s', 'wp-panda' ), max( 0, $wpp_max - count( $wpp_license['sites'] ) ) ) ) : esc_html__( 'Плагин навсегда', 'wp-panda' ); ?></div>
				</div>
			</div>
			<?php if ( $wpp_license['sites'] ) : ?>
				<div class="mt-3 divide-y divide-line rounded-2xl border border-line">
					<?php foreach ( $wpp_license['sites'] as $wpp_site ) : ?>
						<div class="flex items-center gap-3 px-4 py-2.5">
							<?php echo wpp_icon( 'globe', 'h-4 w-4 text-muted' ); ?>
							<span class="min-w-0 flex-1 truncate text-sm font-medium"><?php echo esc_html( $wpp_site ); ?></span>
							<span class="hidden text-xs text-emerald-600 sm:inline"><?php esc_html_e( 'Активен', 'wp-panda' ); ?></span>
							<button class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-muted transition hover:bg-rose-50 hover:text-rose-600"><?php echo wpp_icon( 'unlink', 'h-3.5 w-3.5' ); ?><?php esc_html_e( 'Отвязать', 'wp-panda' ); ?></button>
						</div>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>
		</div>
	<?php endforeach; ?>
</div>
