<?php
/**
 * Blog card grid for archive/search/index queries.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
	<?php while ( have_posts() ) : the_post(); $wpp_cats_of = get_the_category(); ?>
		<a class="group flex cursor-pointer flex-col rounded-card border border-line bg-white p-3 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float" href="<?php the_permalink(); ?>">
			<div class="relative aspect-[16/10] overflow-hidden rounded-2xl">
				<?php if ( has_post_thumbnail() ) : ?>
					<?php the_post_thumbnail( 'wpp-editorial-card', array( 'class' => 'h-full w-full object-cover transition-transform duration-500 group-hover:scale-105', 'alt' => '' ) ); ?>
				<?php else : ?>
					<div class="h-full w-full bg-soft"></div>
				<?php endif; ?>
				<div class="absolute left-2.5 top-2.5 flex gap-1.5">
					<span class="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm backdrop-blur">
						<?php echo wpp_icon( 'clock', 'h-3 w-3' ); ?><?php echo esc_html( wpp_post_read_time( get_the_ID() ) ); ?> <?php esc_html_e( 'мин', 'wp-panda' ); ?>
					</span>
					<?php if ( $wpp_cats_of ) : ?>
						<span class="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm backdrop-blur"><?php echo esc_html( $wpp_cats_of[0]->name ); ?></span>
					<?php endif; ?>
				</div>
			</div>
			<div class="flex flex-1 flex-col px-1.5 pb-1.5 pt-4">
				<h3 class="line-clamp-2 text-lg font-semibold leading-snug tracking-tight decoration-brand decoration-2 underline-offset-4 group-hover:underline"><?php the_title(); ?></h3>
				<p class="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted"><?php echo esc_html( wp_strip_all_tags( get_the_excerpt() ? get_the_excerpt() : wp_trim_words( get_the_content(), 24 ) ) ); ?></p>
				<div class="mt-auto flex items-center gap-2.5 pt-4">
					<?php echo get_avatar( get_the_author_meta( 'ID' ), 32, '', '', array( 'class' => 'h-8 w-8 rounded-full object-cover' ) ); ?>
					<div class="text-xs">
						<div class="font-semibold"><?php echo esc_html( wpp_post_author_label( get_the_ID() ) ); ?></div>
						<div class="text-muted"><?php echo esc_html( wpp_human_date( (int) get_post_time( 'U', true ) ) ); ?></div>
					</div>
				</div>
			</div>
		</a>
	<?php endwhile; ?>
</div>
