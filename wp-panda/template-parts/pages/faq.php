<?php
/** FAQ page: content is stored on a real WordPress page and filtered progressively. */
defined( 'ABSPATH' ) || exit;
$data       = function_exists( 'wpp_demo_load_data' ) ? wpp_demo_load_data() : array();
$categories = array();
if ( is_array( $data ) && ! empty( $data['faq'] ) ) {
	foreach ( $data['faq'] as $entry ) { $categories[ sanitize_title( $entry['category'] ) ] = $entry['category']; }
}
$account_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'myaccount' ) : wp_login_url();
?>
<header class="knowledge-heading"><p class="eyebrow"><?php esc_html_e( 'Помощь Wp Panda', 'wp-panda' ); ?></p><?php the_title( '<h1>', '</h1>' ); ?><p><?php esc_html_e( 'Ответы о покупке, оплате, лицензиях и установке тем и плагинов.', 'wp-panda' ); ?></p></header>
<div class="faq-search"><label class="screen-reader-text" for="wpp-faq-search"><?php esc_html_e( 'Поиск по вопросам', 'wp-panda' ); ?></label><input id="wpp-faq-search" type="search" data-faq-search placeholder="<?php esc_attr_e( 'Например, как установить тему?', 'wp-panda' ); ?>"><span><?php echo wpp_icon( 'search', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span></div>
<nav class="faq-filter" aria-label="<?php esc_attr_e( 'Категории вопросов', 'wp-panda' ); ?>"><button type="button" class="is-active" data-faq-filter="all" aria-pressed="true"><?php esc_html_e( 'Все вопросы', 'wp-panda' ); ?></button><?php foreach ( $categories as $slug => $label ) : ?><button type="button" data-faq-filter="<?php echo esc_attr( $slug ); ?>" aria-pressed="false"><?php echo esc_html( $label ); ?></button><?php endforeach; ?></nav>
<div class="faq-layout"><div class="faq-content"><div class="entry-content prose-content" data-faq-content><?php the_content(); ?></div><p class="faq-no-results" data-faq-empty hidden><?php esc_html_e( 'Ничего не найдено. Измените запрос или выберите другую категорию.', 'wp-panda' ); ?></p></div><aside class="faq-aside"><p class="eyebrow"><?php esc_html_e( 'Нужна помощь?', 'wp-panda' ); ?></p><h2><?php esc_html_e( 'Мы поможем разобраться', 'wp-panda' ); ?></h2><p><?php esc_html_e( 'Откройте обращение из личного кабинета или найдите инструкцию в базе знаний.', 'wp-panda' ); ?></p><a class="button button--brand" href="<?php echo esc_url( $account_url ); ?>"><?php esc_html_e( 'Личный кабинет', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a><a class="text-link" href="<?php echo esc_url( home_url( '/kb/' ) ); ?>"><?php esc_html_e( 'Перейти в базу знаний', 'wp-panda' ); ?></a></aside></div>
