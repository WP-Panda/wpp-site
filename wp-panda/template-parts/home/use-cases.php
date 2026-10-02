<?php
/**
 * «Решения под вашу задачу» scenario tiles.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$scenarios = array(
	array( __( 'Интернет-магазин', 'wp-panda' ), __( '124 темы и плагина', 'wp-panda' ), 'vesta' ),
	array( __( 'Агентства и студии', 'wp-panda' ), __( '86 готовых решений', 'wp-panda' ), 'aurora' ),
	array( __( 'Блоги и медиа', 'wp-panda' ), __( '64 решения', 'wp-panda' ), 'nomad' ),
	array( __( 'Рестораны и кафе', 'wp-panda' ), __( '41 решение', 'wp-panda' ), 'brewly' ),
);
?>
<section class="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
	<div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
		<div class="max-w-2xl">
			<h2 class="text-3xl font-bold tracking-tight sm:text-[40px] sm:leading-[1.1]"><?php esc_html_e( 'Решения под вашу задачу', 'wp-panda' ); ?></h2>
			<p class="mt-3 text-muted sm:text-[17px]"><?php esc_html_e( 'Подобрали темы и плагины для самых популярных типов сайтов — выберите свой сценарий.', 'wp-panda' ); ?></p>
		</div>
	</div>
	<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		<?php foreach ( $scenarios as $wpp_si => $wpp_scenario ) :
			$wpp_product = function_exists( 'wpp_get_scenario_product' ) ? wpp_get_scenario_product( $wpp_scenario[2], 'wordpress-themes' ) : false;
			if ( ! $wpp_product ) { continue; }
			$wpp_active = 0 === $wpp_si;
			$wpp_art    = get_post_meta( $wpp_product->get_id(), '_wpp_card_art', true );
			?>
			<a class="group relative rounded-card border bg-white p-2.5 pt-5 text-left transition-all duration-300 <?php echo $wpp_active ? 'border-brand shadow-picked ring-1 ring-brand' : 'border-line shadow-card hover:-translate-y-1'; ?>" href="<?php echo esc_url( $wpp_product->get_permalink() ); ?>">
				<div class="flex items-start justify-between gap-2 px-2.5">
					<div>
						<h3 class="text-lg font-semibold tracking-tight"><?php echo esc_html( $wpp_scenario[0] ); ?></h3>
						<p class="mt-0.5 text-[13px] text-muted"><?php echo esc_html( $wpp_scenario[1] ); ?></p>
					</div>
					<?php if ( $wpp_active ) : ?>
						<span class="pop flex h-7 w-7 items-center justify-center rounded-full bg-brand text-ink shadow-glow ring-white ring-0">
							<?php echo wpp_icon( 'check', 'h-4 w-4', array( 'stroke' => '3' ) ); ?>
						</span>
					<?php endif; ?>
				</div>
				<div class="relative mt-4 overflow-hidden rounded-2xl">
					<?php echo $wpp_art ? wpp_kses_art( $wpp_art ) : wpp_product_mini_tile( $wpp_product, 'h-full w-full rounded-2xl' ); ?>
					<div class="absolute inset-x-3 bottom-3 transition-all duration-300 <?php echo $wpp_active ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'; ?>">
						<span class="flex h-12 items-center justify-between rounded-full bg-brand pl-5 pr-1.5 text-sm font-semibold shadow-glow"><?php echo esc_html( sprintf( __( 'Смотреть %s', 'wp-panda' ), $wpp_product->get_name() ) ); ?><span class="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white">
							<?php echo wpp_icon( 'arrow-right', 'h-4 w-4' ); ?>
						</span></span>
					</div>
				</div>
			</a>
		<?php endforeach; ?>
	</div>
</section>
