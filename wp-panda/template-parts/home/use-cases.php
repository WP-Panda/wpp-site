<?php
/** Product scenarios linked to real WooCommerce product pages. */
defined( 'ABSPATH' ) || exit;
$scenarios = array(
	array( 'title' => __( 'Интернет-магазин', 'wp-panda' ), 'text' => __( 'Каталог, оплата и удобный путь к покупке.', 'wp-panda' ), 'product' => 'vesta', 'category' => 'wordpress-themes' ),
	array( 'title' => __( 'Агентства и студии', 'wp-panda' ), 'text' => __( 'Портфолио и сайт услуг с гибкими блоками.', 'wp-panda' ), 'product' => 'aurora', 'category' => 'wordpress-themes' ),
	array( 'title' => __( 'Блоги и медиа', 'wp-panda' ), 'text' => __( 'Редакционные страницы и удобное чтение.', 'wp-panda' ), 'product' => 'nomad', 'category' => 'wordpress-themes' ),
	array( 'title' => __( 'Рестораны и кафе', 'wp-panda' ), 'text' => __( 'Меню, бронирование и приём заказов.', 'wp-panda' ), 'product' => 'brewly', 'category' => 'wordpress-themes' ),
);
?>
<section class="wpp-use-cases mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-20">
	<header class="section-heading"><div><p class="eyebrow"><?php esc_html_e( 'Найдите своё', 'wp-panda' ); ?></p><h2><?php esc_html_e( 'Решения под вашу задачу', 'wp-panda' ); ?></h2><p><?php esc_html_e( 'Подобрали темы и плагины для популярных типов сайтов — выберите сценарий.', 'wp-panda' ); ?></p></div></header>
	<div class="wpp-use-cases__grid">
		<?php foreach ( $scenarios as $scenario ) : ?>
			<?php $product = class_exists( 'WooCommerce' ) ? wpp_get_scenario_product( $scenario['product'], $scenario['category'] ) : false; ?>
			<?php $term = class_exists( 'WooCommerce' ) ? get_term_by( 'slug', $scenario['category'], 'product_cat' ) : false; ?>
			<?php $href = $product ? $product->get_permalink() : ( $term && ! is_wp_error( $term ) ? get_term_link( $term ) : home_url( '/shop/' ) ); ?>
			<?php if ( is_wp_error( $href ) ) { $href = home_url( '/shop/' ); } ?>
			<a class="wpp-use-case" href="<?php echo esc_url( $href ); ?>">
				<span class="wpp-use-case__eyebrow"><?php echo esc_html( $scenario['title'] ); ?></span><strong><?php echo esc_html( $scenario['text'] ); ?></strong>
				<?php if ( $product ) : ?><span class="wpp-use-case__product"><?php echo wp_kses_post( $product->get_image( 'woocommerce_thumbnail' ) ); ?><span><b><?php echo esc_html( $product->get_name() ); ?></b><small><?php echo wp_kses_post( $product->get_price_html() ); ?></small></span></span><?php endif; ?>
				<span class="wpp-use-case__link"><?php esc_html_e( 'Смотреть решение', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
			</a>
		<?php endforeach; ?>
	</div>
</section>
