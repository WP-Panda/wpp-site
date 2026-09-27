<?php
/** Why Wp Panda section. */
defined( 'ABSPATH' ) || exit;
$benefits = array(
	array( 'title' => __( 'Автообновления', 'wp-panda' ), 'text' => __( 'Получайте исправления и новые версии через стандартные механизмы WordPress.', 'wp-panda' ) ),
	array( 'title' => __( 'Поддержка авторов', 'wp-panda' ), 'text' => __( 'Документация и канал связи доступны владельцам продуктов.', 'wp-panda' ) ),
	array( 'title' => __( 'PageSpeed 95+', 'wp-panda' ), 'text' => __( 'Показатель из демонстрационного макета; реальная скорость зависит от сайта и сервера.', 'wp-panda' ) ),
	array( 'title' => __( 'Без подписок', 'wp-panda' ), 'text' => __( 'В макете плагины представлены с бессрочной лицензией, а темы — с выбором числа сайтов.', 'wp-panda' ) ),
);
?>
<section class="wpp-benefits mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-20"><header class="section-heading"><div><p class="eyebrow"><?php esc_html_e( 'Почему Wp Panda', 'wp-panda' ); ?></p><h2><?php esc_html_e( 'Плагины навсегда, темы на 1 или 5 сайтов', 'wp-panda' ); ?></h2><p><?php esc_html_e( 'Условия каждого продукта должны быть явно указаны на его странице.', 'wp-panda' ); ?></p></div></header><div class="wpp-benefits__grid"><?php foreach ( $benefits as $index => $benefit ) : ?><article class="wpp-benefit"><span class="wpp-benefit__number"><?php echo esc_html( sprintf( '%02d', $index + 1 ) ); ?></span><div><h3><?php echo esc_html( $benefit['title'] ); ?></h3><p><?php echo esc_html( $benefit['text'] ); ?></p></div></article><?php endforeach; ?></div></section>
