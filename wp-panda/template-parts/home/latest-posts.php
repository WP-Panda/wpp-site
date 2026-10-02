<?php
/**
 * «Свежее в блоге» — three latest posts.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$posts = get_posts( array( 'posts_per_page' => 3, 'post_status' => 'publish' ) );
if ( ! $posts ) {
	return;
}
$blog_url = (int) get_option( 'page_for_posts' ) ? get_permalink( (int) get_option( 'page_for_posts' ) ) : home_url( '/blog/' );
?>
<section class="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
	<div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
		<div class="max-w-2xl">
			<h2 class="text-3xl font-bold tracking-tight sm:text-[40px] sm:leading-[1.1]"><?php esc_html_e( 'Свежее в блоге', 'wp-panda' ); ?></h2>
			<p class="mt-3 text-muted sm:text-[17px]"><?php esc_html_e( 'Гайды, обзоры и новости мира WordPress', 'wp-panda' ); ?></p>
		</div>
		<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-white text-ink border border-line hover:border-ink/25 shadow-[0_1px_2px_rgba(20,20,28,0.05)] h-11 px-5 text-sm" href="<?php echo esc_url( $blog_url ); ?>"><?php esc_html_e( 'Все статьи', 'wp-panda' ); ?>
			<?php echo wpp_icon( 'arrow-right', 'h-4 w-4' ); ?>
		</a>
	</div>
	<div class="mt-8 grid gap-5 md:grid-cols-3">
		<?php foreach ( $posts as $wpp_post ) :
			$wpp_cats = get_the_category( $wpp_post->ID );
			?>
			<a class="group flex cursor-pointer flex-col rounded-card border border-line bg-white p-3 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float" href="<?php echo esc_url( get_permalink( $wpp_post ) ); ?>">
				<div class="relative aspect-[16/10] overflow-hidden rounded-2xl">
					<?php if ( has_post_thumbnail( $wpp_post ) ) : ?>
						<?php echo get_the_post_thumbnail( $wpp_post, 'wpp-editorial-card', array( 'class' => 'h-full w-full object-cover transition-transform duration-500 group-hover:scale-105', 'alt' => '' ) ); ?>
					<?php else : ?>
						<div class="h-full w-full bg-soft"></div>
					<?php endif; ?>
					<div class="absolute left-2.5 top-2.5 flex gap-1.5">
						<span class="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm backdrop-blur">
							<?php echo wpp_icon( 'clock', 'h-3 w-3' ); ?><?php echo esc_html( wpp_post_read_time( $wpp_post->ID ) ); ?> <?php esc_html_e( 'мин', 'wp-panda' ); ?>
						</span>
						<?php if ( $wpp_cats ) : ?>
						<span class="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm backdrop-blur"><?php echo esc_html( $wpp_cats[0]->name ); ?></span>
						<?php endif; ?>
					</div>
				</div>
				<div class="flex flex-1 flex-col px-1.5 pb-1.5 pt-4">
					<h3 class="line-clamp-2 text-lg font-semibold leading-snug tracking-tight decoration-brand decoration-2 underline-offset-4 group-hover:underline"><?php echo esc_html( get_the_title( $wpp_post ) ); ?></h3>
					<p class="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted"><?php echo esc_html( wp_strip_all_tags( $wpp_post->post_excerpt ? $wpp_post->post_excerpt : wp_trim_words( $wpp_post->post_content, 24 ) ) ); ?></p>
					<div class="mt-auto flex items-center gap-2.5 pt-4">
						<?php echo get_avatar( $wpp_post->post_author, 32, '', '', array( 'class' => 'h-8 w-8 rounded-full object-cover' ) ); ?>
						<div class="text-xs">
							<div class="font-semibold"><?php echo esc_html( wpp_post_author_label( $wpp_post->ID ) ); ?></div>
							<div class="text-muted"><?php echo esc_html( wpp_human_date( (int) get_post_time( 'U', true, $wpp_post ) ) ); ?></div>
						</div>
					</div>
				</div>
			</a>
		<?php endforeach; ?>
	</div>
</section>
