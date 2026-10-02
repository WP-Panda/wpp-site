<?php
/**
 * Theme fallback: blog grid with pagination.
 *
 * Required by WordPress; used when no more specific template matches
 * (e.g. the posts page when home.php is bypassed).
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<div class="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12 pb-10">
	<?php if ( have_posts() ) : ?>
		<?php if ( ! is_front_page() ) : ?>
			<header class="fade-up mx-auto max-w-3xl text-center">
				<div class="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium shadow-card">
					<span class="h-1.5 w-1.5 rounded-full bg-brand"></span><?php esc_html_e( 'Блог', 'wp-panda' ); ?>
				</div>
				<h1 class="text-3xl font-bold tracking-tight sm:text-[44px] sm:leading-[1.1]">
					<?php
					if ( is_home() && (int) get_option( 'page_for_posts' ) ) {
						echo esc_html( get_the_title( (int) get_option( 'page_for_posts' ) ) );
					} else {
						esc_html_e( 'Блог', 'wp-panda' );
					}
					?>
				</h1>
			</header>
		<?php endif; ?>
		<div class="<?php echo is_front_page() ? '' : 'mt-10'; ?>">
			<?php get_template_part( 'template-parts/blog/loop' ); ?>
			<?php
			the_posts_pagination(
				array(
					'mid_size'  => 2,
					'prev_text' => wpp_icon( 'chevron-left', 'h-4 w-4' ),
					'next_text' => wpp_icon( 'chevron-right', 'h-4 w-4' ),
				)
			);
			?>
		</div>
	<?php else : ?>
		<div class="mx-auto max-w-md rounded-card border border-line bg-white p-10 text-center shadow-card">
			<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-soft text-muted"><?php echo wpp_icon( 'newspaper', 'h-7 w-7' ); ?></span>
			<p class="mt-4 text-muted"><?php esc_html_e( 'Записей пока нет — загляните позже.', 'wp-panda' ); ?></p>
		</div>
	<?php endif; ?>
</div>
<?php
get_footer();
