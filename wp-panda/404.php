<?php
/** Not found page. */
get_header();
$shop_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/' );
?>
<main id="primary" class="site-main not-found flex flex-1 items-center justify-center px-4 py-24">
	<div class="not-found__inner">
		<p class="eyebrow">404</p>
		<h1><?php esc_html_e( 'Такой страницы нет', 'wp-panda' ); ?></h1>
		<p><?php esc_html_e( 'Возможно, ссылка устарела. Вернитесь на главную или откройте каталог.', 'wp-panda' ); ?></p>
		<div class="hero-actions"><a class="button button--brand" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'На главную', 'wp-panda' ); ?></a><a class="button button--light" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Открыть каталог', 'wp-panda' ); ?></a></div>
	</div>
</main>
<?php get_footer(); ?>
