<?php
/**
 * Список записей блога (index.php).
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
$cats = get_categories( array( 'hide_empty' => true ) );
?>
<div class="mx-auto max-w-[1200px] px-4 pt-10 sm:px-6">
	<div class="mx-auto max-w-2xl text-center">
		<p class="text-xs text-muted"><?php esc_html_e( 'Блог Wp Panda', 'wp-panda' ); ?></p>
		<h1 class="mt-2 text-4xl font-extrabold tracking-[-0.03em] text-ink"><?php echo is_home() && ! is_front_page() ? esc_html( get_the_title( (int) get_option( 'page_for_posts' ) ) ) : esc_html__( 'Про WordPress без воды', 'wp-panda' ); ?></h1>
		<p class="mt-3 text-sm leading-relaxed text-muted"><?php esc_html_e( 'Гайды, обзоры и новости: скорость, безопасность, WooCommerce и разработка.', 'wp-panda' ); ?></p>
	</div>

	<?php if ( $cats && ! is_category() ) : ?>
		<div class="mt-8 flex flex-wrap justify-center gap-2">
			<?php foreach ( $cats as $c ) : ?>
				<a href="<?php echo esc_url( get_category_link( $c ) ); ?>" class="rounded-full bg-soft px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-brand-50 hover:text-ink"><?php echo esc_html( $c->name ); ?></a>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>

	<?php if ( have_posts() ) : ?>
		<div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
			<?php
			while ( have_posts() ) :
				the_post();
				wpp_post_card();
			endwhile;
			?>
		</div>
		<?php wpp_pagination(); ?>
	<?php else : ?>
		<div class="mt-16 rounded-card border border-line bg-white p-12 text-center shadow-card">
			<h2 class="text-xl font-bold"><?php esc_html_e( 'Записей пока нет', 'wp-panda' ); ?></h2>
			<p class="mt-2 text-sm text-muted"><?php esc_html_e( 'Создайте первую запись в консоли: Записи → Добавить новую.', 'wp-panda' ); ?></p>
		</div>
	<?php endif; ?>
</div>
<?php get_footer(); ?>
