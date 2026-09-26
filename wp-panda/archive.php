<?php
/**
 * Архив (категории/теги/авторы).
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>
<div class="mx-auto max-w-[1200px] px-4 pt-10 sm:px-6">
	<div class="mx-auto max-w-2xl text-center">
		<p class="text-xs text-muted"><?php esc_html_e( 'Архив', 'wp-panda' ); ?></p>
		<h1 class="mt-2 text-4xl font-extrabold tracking-[-0.03em] text-ink"><?php the_archive_title(); ?></h1>
		<?php the_archive_description( '<p class="mt-3 text-sm leading-relaxed text-muted">', '</p>' ); ?>
	</div>
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
	<?php endif; ?>
</div>
<?php get_footer(); ?>
