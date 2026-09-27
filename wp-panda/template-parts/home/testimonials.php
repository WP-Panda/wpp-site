<?php
/** Reference-layout testimonial slots, clearly marked as non-customer demo copy. */
defined( 'ABSPATH' ) || exit;
$quotes = array(
	array( 'quote' => __( 'Собрали интернет-магазин на WordPress быстрее, чем планировали. Каталог и редактор работают без лишних сложностей.', 'wp-panda' ), 'name' => __( 'Демо-покупатель', 'wp-panda' ), 'role' => __( 'Пример блока отзыва — замените реальной историей', 'wp-panda' ), 'product' => 'Vesta + WooBoost' ),
	array( 'quote' => __( 'Нравится понятная документация и возможность выбрать продукт под конкретный проект.', 'wp-panda' ), 'name' => __( 'Демо-покупатель', 'wp-panda' ), 'role' => __( 'Пример блока отзыва — замените реальной историей', 'wp-panda' ), 'product' => 'Aurora' ),
	array( 'quote' => __( 'Настроили блог и страницы услуг, а обновления управляются из панели WordPress.', 'wp-panda' ), 'name' => __( 'Демо-покупатель', 'wp-panda' ), 'role' => __( 'Пример блока отзыва — замените реальной историей', 'wp-panda' ), 'product' => 'Nomad' ),
);
?>
<section class="wpp-testimonials mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-20"><header class="section-heading"><div><p class="eyebrow"><?php esc_html_e( 'Отзывы владельцев сайтов', 'wp-panda' ); ?></p><h2><?php esc_html_e( 'Опыт проектов на WordPress', 'wp-panda' ); ?></h2><p class="wpp-demo-label"><?php esc_html_e( 'Демо-примеры для макета, не отзывы реальных покупателей. Замените перед публикацией.', 'wp-panda' ); ?></p></div></header><div class="wpp-testimonials__grid"><?php foreach ( $quotes as $quote ) : ?><figure class="wpp-testimonial"><blockquote><?php echo esc_html( $quote['quote'] ); ?></blockquote><figcaption><strong><?php echo esc_html( $quote['name'] ); ?></strong><span><?php echo esc_html( $quote['role'] ); ?></span><small><?php echo esc_html( $quote['product'] ); ?></small></figcaption></figure><?php endforeach; ?></div></section>
