<?php
/**
 * Страница 404.
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>
<div class="mx-auto flex max-w-[900px] flex-col items-center px-4 py-24 text-center sm:px-6">
	<div class="font-mono text-[110px] font-bold leading-none text-brand">404</div>
	<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-ink"><?php esc_html_e( 'Страница потерялась в бамбуке', 'wp-panda' ); ?></h1>
	<p class="mt-3 max-w-md text-sm leading-relaxed text-muted"><?php esc_html_e( 'Похоже, такой страницы нет. Загляните в каталог продуктов или воспользуйтесь поиском.', 'wp-panda' ); ?></p>
	<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-ink shadow-glow transition hover:bg-brand-600"><?php esc_html_e( 'На главную', 'wp-panda' ); ?> <?php wpp_icon( 'arrow-right', 'h-4 w-4' ); ?></a>
		<?php if ( wpp_has_woo() ) : ?>
			<a href="<?php echo esc_url( get_permalink( wc_get_page_id( 'shop' ) ) ); ?>" class="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-white px-6 text-sm font-semibold text-ink transition hover:border-ink/25"><?php esc_html_e( 'В каталог', 'wp-panda' ); ?></a>
		<?php endif; ?>
	</div>
	<form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" class="mt-10 flex h-12 w-full max-w-md items-center gap-3 rounded-full border border-line bg-white px-4 shadow-card">
		<?php wpp_icon( 'search', 'h-4 w-4 text-muted' ); ?>
		<input type="search" name="s" class="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="<?php esc_attr_e( 'Поиск по сайту…', 'wp-panda' ); ?>" />
		<button type="submit" class="text-xs font-semibold text-muted transition hover:text-ink"><?php esc_html_e( 'Найти', 'wp-panda' ); ?></button>
	</form>
</div>
<?php get_footer(); ?>
