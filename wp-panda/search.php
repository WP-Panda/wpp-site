<?php
/**
 * Результаты поиска.
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
$query = get_search_query();
?>
<div class="mx-auto max-w-[1200px] px-4 pt-10 sm:px-6">
	<div class="mx-auto max-w-2xl text-center">
		<p class="text-xs text-muted"><?php esc_html_e( 'Поиск', 'wp-panda' ); ?></p>
		<h1 class="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-ink">
			<?php
			/* translators: %s — поисковый запрос */
			printf( esc_html__( 'Результаты: «%s»', 'wp-panda' ), esc_html( $query ) );
			?>
		</h1>
	</div>

	<?php
	global $wp_query;
	$found_posts = $wp_query->found_posts;
	$products    = array();
	$posts_found = array();
	while ( have_posts() ) :
		the_post();
		if ( 'product' === get_post_type() ) {
			$products[] = get_the_ID();
		} else {
			$posts_found[] = get_the_ID();
		}
	endwhile;
	?>

	<?php if ( ! $found_posts ) : ?>
		<div class="mt-12 rounded-card border border-line bg-white p-12 text-center shadow-card">
			<h2 class="text-xl font-bold"><?php esc_html_e( 'Ничего не нашли', 'wp-panda' ); ?></h2>
			<p class="mt-2 text-sm text-muted"><?php esc_html_e( 'Попробуйте другой запрос: например, «магазин», «SEO» или «кэш».', 'wp-panda' ); ?></p>
			<form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" class="mx-auto mt-6 flex h-12 max-w-md items-center gap-3 rounded-full bg-soft px-4">
				<?php wpp_icon( 'search', 'h-4 w-4 text-muted' ); ?>
				<input type="search" name="s" class="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="<?php esc_attr_e( 'Поиск…', 'wp-panda' ); ?>" />
				<button type="submit" class="text-xs font-semibold text-muted transition hover:text-ink"><?php esc_html_e( 'Найти', 'wp-panda' ); ?></button>
			</form>
		</div>
	<?php else : ?>
		<p class="mt-6 text-center text-sm text-muted">
			<?php
			/* translators: %d — количество результатов */
			printf( esc_html( _n( 'Найден %d результат', 'Найдено результатов: %d', $found_posts, 'wp-panda' ) ), (int) $found_posts );
			?>
		</p>
		<?php if ( $products ) : ?>
			<h2 class="mt-10 text-xl font-bold tracking-tight"><?php esc_html_e( 'Продукты', 'wp-panda' ); ?></h2>
			<div class="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
				<?php foreach ( $products as $pid ) : ?>
					<?php wpp_product_card( wpp_product_data( $pid ) ); ?>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
		<?php if ( $posts_found ) : ?>
			<h2 class="mt-10 text-xl font-bold tracking-tight"><?php esc_html_e( 'Статьи', 'wp-panda' ); ?></h2>
			<div class="mt-5 grid gap-5 md:grid-cols-3">
				<?php foreach ( $posts_found as $pid ) : ?>
					<?php wpp_post_card( $pid ); ?>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	<?php endif; ?>
</div>
<?php get_footer(); ?>
