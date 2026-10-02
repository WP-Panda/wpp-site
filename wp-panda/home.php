<?php
/**
 * Blog index: heading, category tabs, search, featured post, grid, pagination, newsletter.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

get_header();

$wpp_per_page = (int) get_query_var( 'posts_per_page', 6 );
$wpp_total    = (int) $wp_query->found_posts;
$wpp_paged    = max( 1, (int) get_query_var( 'paged', 1 ) );
$wpp_pages    = max( 1, (int) $wp_query->max_num_pages );
$wpp_cats     = get_categories( array( 'hide_empty' => true ) );
$wpp_current_cat = is_category() ? get_queried_object() : null;
$wpp_posts    = $wp_query->posts;
$wpp_featured = null;
$wpp_rest     = $wpp_posts;
if ( 1 === $wpp_paged && ! is_category() && ! get_query_var( 's' ) && $wpp_posts ) {
	$wpp_featured = array_shift( $wpp_rest );
}
?>
<div class="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12">
	<div class="fade-up mx-auto max-w-2xl text-center">
		<div class="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-muted shadow-card">
			<span class="h-1.5 w-1.5 rounded-full bg-brand"></span><?php esc_html_e( 'Журнал Wp Panda', 'wp-panda' ); ?>
		</div>
		<h1 class="text-4xl font-bold tracking-tight sm:text-[52px] sm:leading-[1.08]"><?php echo is_category() ? single_cat_title( '', false ) : esc_html__( 'Блог', 'wp-panda' ); ?></h1>
		<p class="mt-4 text-base text-muted sm:text-lg"><?php esc_html_e( 'Гайды, обзоры и новости WordPress — для владельцев сайтов, дизайнеров и разработчиков.', 'wp-panda' ); ?></p>
	</div>
	<?php if ( $wpp_cats ) : ?>
	<div class="no-scrollbar -mx-4 mt-8 overflow-x-auto px-4 sm:mx-auto sm:max-w-[920px] sm:px-0">
		<div class="flex w-full rounded-full border border-line bg-white p-1.5 shadow-card min-w-max md:min-w-0">
			<a class="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 font-semibold transition-all duration-200 h-10 text-sm <?php echo ! $wpp_current_cat ? 'bg-ink text-white shadow-[0_6px_16px_-8px_rgba(20,20,28,0.6)]' : 'text-ink/65 hover:text-ink'; ?>" href="<?php echo esc_url( get_permalink( (int) get_option( 'page_for_posts' ) ) ); ?>"><?php esc_html_e( 'Все', 'wp-panda' ); ?></a>
			<?php foreach ( $wpp_cats as $wpp_cat ) : ?>
				<a class="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 font-semibold transition-all duration-200 h-10 text-sm <?php echo $wpp_current_cat && (int) $wpp_current_cat->term_id === (int) $wpp_cat->term_id ? 'bg-ink text-white shadow-[0_6px_16px_-8px_rgba(20,20,28,0.6)]' : 'text-ink/65 hover:text-ink'; ?>" href="<?php echo esc_url( get_category_link( $wpp_cat ) ); ?>"><?php echo esc_html( $wpp_cat->name ); ?></a>
			<?php endforeach; ?>
		</div>
	</div>
	<?php endif; ?>
	<form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" class="mx-auto mt-4 flex h-12 max-w-md items-center gap-2 rounded-full border border-line bg-white px-4 shadow-card transition focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
		<?php echo wpp_icon( 'search', 'h-4 w-4 text-muted' ); ?>
		<input type="search" name="s" placeholder="<?php esc_attr_e( 'Поиск по статьям', 'wp-panda' ); ?>" class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70" value="<?php echo esc_attr( get_search_query() ); ?>">
		<input type="hidden" name="post_type" value="post">
	</form>
	<?php if ( $wpp_featured ) : ?>
	<a class="group mt-12 grid cursor-pointer overflow-hidden rounded-card border border-line bg-white p-2.5 shadow-card transition-all duration-300 hover:shadow-float md:grid-cols-2" href="<?php echo esc_url( get_permalink( $wpp_featured ) ); ?>">
		<div class="relative overflow-hidden rounded-2xl">
			<?php if ( has_post_thumbnail( $wpp_featured ) ) : ?>
				<?php echo get_the_post_thumbnail( $wpp_featured, 'wpp-editorial-card', array( 'class' => 'h-full min-h-[260px] w-full object-cover transition duration-500 group-hover:scale-105', 'alt' => '' ) ); ?>
			<?php else : ?>
				<div class="h-full min-h-[260px] w-full bg-soft"></div>
			<?php endif; ?>
			<div class="absolute left-3 top-3 flex gap-1.5">
				<span class="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white"><?php esc_html_e( 'Выбор редакции', 'wp-panda' ); ?></span>
				<?php $wpp_fcats = get_the_category( $wpp_featured->ID ); if ( $wpp_fcats ) : ?>
					<span class="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm backdrop-blur"><?php echo esc_html( $wpp_fcats[0]->name ); ?></span>
				<?php endif; ?>
			</div>
		</div>
		<div class="flex flex-col justify-center p-5 sm:p-8">
			<?php $wpp_fcats = get_the_category( $wpp_featured->ID ); if ( $wpp_fcats ) : ?>
				<div class="text-xs font-semibold uppercase tracking-[0.14em] text-muted"><?php echo esc_html( $wpp_fcats[0]->name ); ?></div>
			<?php endif; ?>
			<h2 class="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl"><?php echo esc_html( get_the_title( $wpp_featured ) ); ?></h2>
			<p class="mt-3 text-sm leading-relaxed text-muted"><?php echo esc_html( wp_strip_all_tags( $wpp_featured->post_excerpt ? $wpp_featured->post_excerpt : wp_trim_words( $wpp_featured->post_content, 30 ) ) ); ?></p>
			<div class="mt-6 flex items-center gap-3">
				<?php echo get_avatar( $wpp_featured->post_author, 40, '', '', array( 'class' => 'h-10 w-10 rounded-full object-cover' ) ); ?>
				<div class="text-sm">
					<div class="font-semibold"><?php echo esc_html( wpp_post_author_label( $wpp_featured->ID ) ); ?></div>
					<div class="text-xs text-muted"><?php echo esc_html( wpp_human_date( (int) get_post_time( 'U', true, $wpp_featured ) ) ); ?> · <?php echo esc_html( get_post_meta( $wpp_featured->ID, '_wpp_views_label', true ) ? get_post_meta( $wpp_featured->ID, '_wpp_views_label', true ) : '' ); ?></div>
				</div>
				<span class="ml-auto flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition group-hover:bg-brand group-hover:text-ink">
					<?php echo wpp_icon( 'arrow-right', 'h-4 w-4' ); ?>
				</span>
			</div>
		</div>
	</a>
	<?php endif; ?>
	<div id="blog-grid" class="scroll-mt-24">
		<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			<?php
			foreach ( $wpp_rest as $wpp_post ) :
				$wpp_cats_of = get_the_category( $wpp_post->ID );
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
							<?php if ( $wpp_cats_of ) : ?>
								<span class="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm backdrop-blur"><?php echo esc_html( $wpp_cats_of[0]->name ); ?></span>
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
		<?php if ( $wpp_pages > 1 ) : ?>
		<nav aria-label="<?php esc_attr_e( 'Пагинация блога', 'wp-panda' ); ?>" class="mt-10 flex flex-col items-center gap-3">
			<div class="flex items-center gap-2">
				<?php if ( $wpp_paged > 1 ) : ?>
					<a aria-label="<?php esc_attr_e( 'Предыдущая страница', 'wp-panda' ); ?>" class="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-ink/20" href="<?php echo esc_url( get_pagenum_link( $wpp_paged - 1 ) ); ?>"><?php echo wpp_icon( 'chevron-left', 'h-4 w-4' ); ?></a>
				<?php else : ?>
					<button disabled aria-label="<?php esc_attr_e( 'Предыдущая страница', 'wp-panda' ); ?>" class="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-line disabled:cursor-default"><?php echo wpp_icon( 'chevron-left', 'h-4 w-4' ); ?></button>
				<?php endif; ?>
				<?php for ( $wpp_i = 1; $wpp_i <= $wpp_pages; $wpp_i++ ) : ?>
					<?php if ( $wpp_i === $wpp_paged ) : ?>
						<span class="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white"><?php echo esc_html( $wpp_i ); ?></span>
					<?php else : ?>
						<a class="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-sm font-semibold text-ink transition hover:border-ink/20" href="<?php echo esc_url( get_pagenum_link( $wpp_i ) ); ?>"><?php echo esc_html( $wpp_i ); ?></a>
					<?php endif; ?>
				<?php endfor; ?>
				<?php if ( $wpp_paged < $wpp_pages ) : ?>
					<a aria-label="<?php esc_attr_e( 'Следующая страница', 'wp-panda' ); ?>" class="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-ink/20" href="<?php echo esc_url( get_pagenum_link( $wpp_paged + 1 ) ); ?>"><?php echo wpp_icon( 'chevron-right', 'h-4 w-4' ); ?></a>
				<?php else : ?>
					<button disabled aria-label="<?php esc_attr_e( 'Следующая страница', 'wp-panda' ); ?>" class="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-line disabled:cursor-default"><?php echo wpp_icon( 'chevron-right', 'h-4 w-4' ); ?></button>
				<?php endif; ?>
			</div>
			<div class="text-xs text-muted"><?php echo esc_html( sprintf( __( 'Страница %1$s из %2$s · показано %3$s из %4$s статей', 'wp-panda' ), $wpp_paged, $wpp_pages, count( $wpp_posts ) + ( $wpp_featured ? 1 : 0 ), $wpp_total ) ); ?></div>
		</nav>
		<?php endif; ?>
	</div>
	<div class="mt-16">
		<div class="dark-card relative overflow-hidden rounded-card p-8 text-white sm:p-10">
			<div class="relative z-10 grid items-center gap-6 md:grid-cols-[1.2fr_1fr]">
				<div>
					<div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55"><?php esc_html_e( 'Рассылка Wp Panda', 'wp-panda' ); ?></div>
					<h2 class="mt-3 text-2xl font-bold tracking-tight sm:text-3xl"><?php esc_html_e( 'Лучшие статьи и скидки — раз в неделю', 'wp-panda' ); ?></h2>
					<p class="mt-3 text-sm text-white/70"><?php esc_html_e( 'Без спама. Только полезные гайды, релизы и промокоды для подписчиков.', 'wp-panda' ); ?></p>
				</div>
				<form class="flex flex-col gap-2 sm:flex-row" data-subscribe-form>
					<div class="flex h-14 flex-1 items-center gap-2 rounded-full bg-white/10 px-5 ring-1 ring-white/15 focus-within:ring-brand">
						<?php echo wpp_icon( 'mail', 'h-4 w-4 text-white/50' ); ?>
						<input required type="email" name="email" placeholder="you@example.ru" class="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40">
					</div>
					<button type="submit" class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-14 px-7 text-[15px]"><?php esc_html_e( 'Подписаться', 'wp-panda' ); ?></button>
				</form>
				<div class="hidden text-sm font-semibold text-brand md:col-span-2" data-subscribe-message></div>
			</div>
			<div class="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full border-[36px] border-white/5"></div>
		</div>
	</div>
</div>
<?php
get_footer();
