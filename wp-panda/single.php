<?php
/**
 * Blog article page, markup identical to the supplied layout.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

get_header();

while ( have_posts() ) :
	the_post();
	$wpp_cats   = get_the_category();
	$wpp_views  = get_post_meta( get_the_ID(), '_wpp_views_label', true );
	$wpp_headings = wpp_content_headings( get_the_content() );
	$wpp_shop_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
	?>
	<div class="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12">
		<nav class="flex flex-wrap items-center gap-1.5 text-xs text-muted" aria-label="<?php esc_attr_e( 'Хлебные крошки', 'wp-panda' ); ?>">
			<a class="transition hover:text-ink" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Главная', 'wp-panda' ); ?></a>
			<span class="text-line">/</span>
			<a class="transition hover:text-ink" href="<?php echo esc_url( get_permalink( (int) get_option( 'page_for_posts' ) ) ); ?>"><?php esc_html_e( 'Блог', 'wp-panda' ); ?></a>
			<?php if ( $wpp_cats ) : ?>
				<span class="text-line">/</span>
				<a class="transition hover:text-ink" href="<?php echo esc_url( get_category_link( $wpp_cats[0] ) ); ?>"><?php echo esc_html( $wpp_cats[0]->name ); ?></a>
			<?php endif; ?>
		</nav>
		<header class="fade-up mx-auto mt-8 max-w-3xl text-center">
			<?php if ( $wpp_cats ) : ?>
				<span class="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-[#906500] ring-1 ring-brand-100"><?php echo esc_html( $wpp_cats[0]->name ); ?></span>
			<?php endif; ?>
			<h1 class="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-[44px] sm:leading-[1.15]"><?php the_title(); ?></h1>
			<p class="mt-4 text-base leading-relaxed text-muted sm:text-lg"><?php echo esc_html( wp_strip_all_tags( get_the_excerpt() ) ); ?></p>
			<div class="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm">
				<?php echo get_avatar( get_the_author_meta( 'ID' ), 40, '', '', array( 'class' => 'h-10 w-10 rounded-full object-cover' ) ); ?>
				<div class="text-left">
					<div class="font-semibold"><?php echo esc_html( wpp_post_author_label() ); ?></div>
					<div class="text-xs text-muted"><?php echo esc_html( wpp_human_date( (int) get_post_time( 'U', true ) ) ); ?><?php echo $wpp_views ? ' · ' . esc_html( $wpp_views ) : ''; ?></div>
				</div>
			</div>
		</header>
		<div class="item-layout mt-12" style="grid-template-columns: minmax(0,1fr) 300px;">
			<article class="min-w-0 text-[16px] leading-[1.8] text-ink/85">
				<?php the_content(); ?>
				<?php $wpp_tags = get_the_tags(); if ( $wpp_tags ) : ?>
					<div class="mt-10 flex flex-wrap gap-2">
						<?php foreach ( $wpp_tags as $wpp_tag ) : ?>
							<a class="rounded-full bg-soft px-3 py-1.5 text-xs font-semibold text-ink/70 transition hover:bg-brand hover:text-ink" href="<?php echo esc_url( get_tag_link( $wpp_tag ) ); ?>">#<?php echo esc_html( $wpp_tag->name ); ?></a>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>
				<div class="mt-10 rounded-card border border-line bg-white p-6 shadow-card">
					<div class="flex items-center gap-4">
						<?php echo get_avatar( get_the_author_meta( 'ID' ), 56, '', '', array( 'class' => 'h-14 w-14 rounded-full object-cover' ) ); ?>
						<div>
							<div class="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"><?php esc_html_e( 'Автор', 'wp-panda' ); ?></div>
							<div class="mt-0.5 text-base font-bold tracking-tight"><?php echo esc_html( wpp_post_author_label() ); ?></div>
							<p class="mt-1 text-xs leading-relaxed text-muted"><?php echo esc_html( get_the_author_meta( 'description' ) ? get_the_author_meta( 'description' ) : __( 'Команда Wp Panda', 'wp-panda' ) ); ?></p>
						</div>
					</div>
				</div>
			</article>
			<aside class="space-y-5 lg:sticky lg:top-24" aria-label="<?php esc_attr_e( 'Содержание статьи', 'wp-panda' ); ?>">
				<?php if ( $wpp_headings ) : ?>
				<div class="rounded-card border border-line bg-white p-5 shadow-card">
					<div class="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"><?php esc_html_e( 'Содержание', 'wp-panda' ); ?></div>
					<ul class="mt-3 space-y-1">
						<?php foreach ( $wpp_headings as $wpp_h ) : ?>
							<li>
								<a class="flex items-start gap-2 rounded-lg px-2 py-1.5 text-[13px] font-medium text-ink/70 transition hover:bg-soft hover:text-ink" href="#<?php echo esc_attr( $wpp_h['id'] ); ?>">
									<?php echo esc_html( $wpp_h['title'] ); ?>
								</a>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
				<?php endif; ?>
				<div class="rounded-card bg-brand-50 p-5 ring-1 ring-brand-100">
					<div class="flex items-center gap-2 font-semibold">
						<?php echo wpp_icon( 'gift', 'h-4 w-4' ); ?> <?php esc_html_e( 'Для читателей блога', 'wp-panda' ); ?>
					</div>
					<div class="mt-1 text-xl font-bold">−30% <?php esc_html_e( 'на первый заказ', 'wp-panda' ); ?></div>
					<p class="mt-1 text-sm text-muted"><?php esc_html_e( 'Промокод WELCOME30 действует на все темы и плагины.', 'wp-panda' ); ?></p>
					<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-ink text-white hover:bg-ink-2 h-11 px-5 text-sm mt-4 w-full" href="<?php echo esc_url( $wpp_shop_url ); ?>"><?php esc_html_e( 'В каталог', 'wp-panda' ); ?></a>
				</div>
			</aside>
		</div>
		<?php
		$wpp_related = get_posts( array(
			'posts_per_page' => 3,
			'post__not_in'   => array( get_the_ID() ),
			'category__in'   => $wpp_cats ? array( $wpp_cats[0]->term_id ) : array(),
		) );
		if ( ! $wpp_related ) {
			$wpp_related = get_posts( array( 'posts_per_page' => 3, 'post__not_in' => array( get_the_ID() ) ) );
		}
		if ( $wpp_related ) :
			?>
			<section class="mt-20">
				<h2 class="text-2xl font-bold tracking-tight sm:text-3xl"><?php esc_html_e( 'Читайте также', 'wp-panda' ); ?></h2>
				<div class="mt-7 grid gap-5 md:grid-cols-3">
					<?php foreach ( $wpp_related as $wpp_rpost ) : $wpp_rcats = get_the_category( $wpp_rpost->ID ); ?>
						<a class="group flex cursor-pointer flex-col rounded-card border border-line bg-white p-3 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float" href="<?php echo esc_url( get_permalink( $wpp_rpost ) ); ?>">
							<div class="relative aspect-[16/10] overflow-hidden rounded-2xl">
								<?php if ( has_post_thumbnail( $wpp_rpost ) ) : ?>
									<?php echo get_the_post_thumbnail( $wpp_rpost, 'wpp-editorial-card', array( 'class' => 'h-full w-full object-cover transition-transform duration-500 group-hover:scale-105', 'alt' => '' ) ); ?>
								<?php else : ?>
									<div class="h-full w-full bg-soft"></div>
								<?php endif; ?>
								<?php if ( $wpp_rcats ) : ?>
								<div class="absolute left-2.5 top-2.5 flex gap-1.5">
									<span class="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm backdrop-blur"><?php echo esc_html( $wpp_rcats[0]->name ); ?></span>
								</div>
								<?php endif; ?>
							</div>
							<div class="flex flex-1 flex-col px-1.5 pb-1.5 pt-4">
								<h3 class="line-clamp-2 text-lg font-semibold leading-snug tracking-tight decoration-brand decoration-2 underline-offset-4 group-hover:underline"><?php echo esc_html( get_the_title( $wpp_rpost ) ); ?></h3>
								<p class="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted"><?php echo esc_html( wp_strip_all_tags( $wpp_rpost->post_excerpt ) ); ?></p>
								<div class="mt-auto flex items-center gap-2.5 pt-4">
									<?php echo get_avatar( $wpp_rpost->post_author, 32, '', '', array( 'class' => 'h-8 w-8 rounded-full object-cover' ) ); ?>
									<div class="text-xs">
										<div class="font-semibold"><?php echo esc_html( wpp_post_author_label( $wpp_rpost->ID ) ); ?></div>
										<div class="text-muted"><?php echo esc_html( wpp_human_date( (int) get_post_time( 'U', true, $wpp_rpost ) ) ); ?></div>
									</div>
								</div>
							</div>
						</a>
					<?php endforeach; ?>
				</div>
			</section>
		<?php endif; ?>
	</div>
<?php endwhile; ?>
<?php
get_footer();
