<?php
/** Product scenarios linked to live WooCommerce product pages. */
defined( 'ABSPATH' ) || exit;
$scenarios = array(
	array( 'title' => __( 'Интернет-магазин', 'wp-panda' ), 'text' => __( 'Каталог, оплата и удобный путь к покупке', 'wp-panda' ), 'product' => 'vesta', 'category' => 'wordpress-themes' ),
	array( 'title' => __( 'Агентства и студии', 'wp-panda' ), 'text' => __( 'Портфолио и сайт услуг с гибкими блоками', 'wp-panda' ), 'product' => 'aurora', 'category' => 'wordpress-themes' ),
	array( 'title' => __( 'Блоги и медиа', 'wp-panda' ), 'text' => __( 'Редакционные страницы и удобное чтение', 'wp-panda' ), 'product' => 'nomad', 'category' => 'wordpress-themes' ),
	array( 'title' => __( 'Рестораны и кафе', 'wp-panda' ), 'text' => __( 'Меню, бронирование и приём заказов', 'wp-panda' ), 'product' => 'brewly', 'category' => 'wordpress-themes' ),
);
?>
<section class="wpp-use-cases mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
	<header><h2 class="text-3xl font-bold tracking-tight sm:text-[40px] sm:leading-[1.1]"><?php esc_html_e( 'Решения под вашу задачу', 'wp-panda' ); ?></h2><p class="mt-2 text-sm text-muted sm:text-base"><?php esc_html_e( 'Подобрали темы и плагины для самых популярных типов сайтов — выберите свой сценарий.', 'wp-panda' ); ?></p></header>
	<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		<?php foreach ( $scenarios as $index => $scenario ) : ?>
			<?php $product = class_exists( 'WooCommerce' ) ? wpp_get_scenario_product( $scenario['product'], $scenario['category'] ) : false; ?>
			<?php $term = class_exists( 'WooCommerce' ) ? get_term_by( 'slug', $scenario['category'], 'product_cat' ) : false; ?>
			<?php $href = $product ? $product->get_permalink() : ( $term && ! is_wp_error( $term ) ? get_term_link( $term ) : home_url( '/shop/' ) ); ?>
			<?php if ( is_wp_error( $href ) ) { $href = home_url( '/shop/' ); } ?>
			<a class="group relative rounded-card border bg-white p-2.5 pt-5 text-left transition-all duration-300<?php echo 0 === $index ? ' border-brand shadow-picked ring-1 ring-brand' : ' border-line shadow-card hover:-translate-y-1 hover:shadow-float'; ?>" href="<?php echo esc_url( $href ); ?>">
				<div class="flex items-start justify-between gap-2 px-2.5"><div><h3 class="text-lg font-semibold tracking-tight"><?php echo esc_html( $scenario['title'] ); ?></h3><p class="mt-0.5 text-[13px] text-muted"><?php echo esc_html( $scenario['text'] ); ?></p></div></div>
				<?php if ( $product ) : ?><div class="wpp-use-case__media relative mt-4 overflow-hidden rounded-2xl"><?php echo wp_kses_post( $product->get_image( 'wpp-product-card' ) ); ?><span class="absolute inset-x-3 bottom-3 flex h-12 items-center justify-between rounded-full bg-brand pl-5 pr-1.5 text-sm font-semibold shadow-glow"><?php printf( esc_html__( 'Смотреть %s', 'wp-panda' ), esc_html( $product->get_name() ) ); ?><span class="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white"><?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span></span></div><?php endif; ?>
			</a>
		<?php endforeach; ?>
	</div>
</section>
