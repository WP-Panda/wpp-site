<?php
/**
 * Catalog pagination styled with the layout tokens.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$total   = ceil( wc_get_loop_prop( 'total' ) / wc_get_loop_prop( 'per_page' ) );
$current = max( 1, (int) get_query_var( 'paged', 1 ) );
if ( $total <= 1 ) {
	return;
}
?>
<nav class="mt-10 flex items-center justify-center gap-2" aria-label="<?php esc_attr_e( 'Страницы каталога', 'wp-panda' ); ?>">
	<?php if ( $current > 1 ) : ?>
		<a class="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-ink/20" href="<?php echo esc_url( get_pagenum_link( $current - 1 ) ); ?>" aria-label="<?php esc_attr_e( 'Предыдущая страница', 'wp-panda' ); ?>"><?php echo wpp_icon( 'chevron-left', 'h-4 w-4' ); ?></a>
	<?php endif; ?>
	<?php for ( $page = 1; $page <= $total; $page++ ) : ?>
		<?php if ( $page === $current ) : ?>
			<span class="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white"><?php echo esc_html( $page ); ?></span>
		<?php else : ?>
			<a class="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-sm font-semibold text-ink transition hover:border-ink/20" href="<?php echo esc_url( get_pagenum_link( $page ) ); ?>"><?php echo esc_html( $page ); ?></a>
		<?php endif; ?>
	<?php endfor; ?>
	<?php if ( $current < $total ) : ?>
		<a class="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-ink/20" href="<?php echo esc_url( get_pagenum_link( $current + 1 ) ); ?>" aria-label="<?php esc_attr_e( 'Следующая страница', 'wp-panda' ); ?>"><?php echo wpp_icon( 'chevron-right', 'h-4 w-4' ); ?></a>
	<?php endif; ?>
</nav>
