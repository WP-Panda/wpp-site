<?php
/**
 * Статья базы знаний (single-kb_article.php).
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
$kb_url = get_post_type_archive_link( 'kb_article' );
$terms  = get_the_terms( get_the_ID(), 'kb_cat' );
$cat    = ( $terms && ! is_wp_error( $terms ) ) ? $terms[0] : null;

while ( have_posts() ) :
	the_post();
	$siblings = $cat ? get_posts( array( 'post_type' => 'kb_article', 'posts_per_page' => 50, 'tax_query' => array( array( 'taxonomy' => 'kb_cat', 'terms' => $cat->term_id ) ), 'orderby' => 'title', 'order' => 'ASC' ) ) : array();
	$related  = array_slice( array_filter( $siblings, function ( $s ) {
		return $s->ID !== get_the_ID();
	} ), 0, 3 );
	$next = null;
	if ( $siblings ) {
		foreach ( $siblings as $i => $s ) {
			if ( $s->ID === get_the_ID() && isset( $siblings[ $i + 1 ] ) ) {
				$next = $siblings[ $i + 1 ];
				break;
			}
		}
	}
	?>
	<div class="mx-auto max-w-[1200px] px-4 pt-6 sm:px-6">
		<?php wpp_breadcrumbs( array( __( 'База знаний', 'wp-panda' ) => $kb_url, $cat ? $cat->name : '' => $kb_url, get_the_title() => '' ) ); ?>

		<div class="mt-6 grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
			<!-- Сайдбар разделов -->
			<aside class="hidden lg:sticky lg:top-24 lg:block">
				<div class="rounded-card border border-line bg-white p-2 shadow-card">
					<?php
					$all_terms = get_terms( array( 'taxonomy' => 'kb_cat', 'hide_empty' => false ) );
					$icons     = array( 'rocket', 'shield', 'zap', 'cart-w', 'form', 'languages', 'calendar', 'mail' );
					if ( $all_terms && ! is_wp_error( $all_terms ) ) :
						foreach ( $all_terms as $i => $term ) :
							$term_posts = get_posts( array( 'post_type' => 'kb_article', 'posts_per_page' => 50, 'tax_query' => array( array( 'taxonomy' => 'kb_cat', 'terms' => $term->term_id ) ), 'orderby' => 'title', 'order' => 'ASC' ) );
							$open       = $cat && $term->term_id === $cat->term_id;
							?>
							<div>
								<button type="button" data-acc-btn aria-expanded="<?php echo $open ? 'true' : 'false'; ?>" class="flex w-full items-center gap-3 rounded-full py-1.5 pl-1.5 pr-3 text-left text-sm font-semibold transition hover:bg-soft">
									<span class="<?php echo $open ? 'bg-brand' : 'bg-soft'; ?> flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"><?php wpp_icon( $icons[ $i % count( $icons ) ], 'h-4 w-4' ); ?></span>
									<span class="flex-1 leading-tight"><?php echo esc_html( $term->name ); ?></span>
									<?php wpp_icon( 'chevron-down', 'h-4 w-4 text-muted transition' . ( $open ? ' rotate-180' : '' ) ); ?>
								</button>
								<div data-acc-body <?php if ( ! $open ) echo 'hidden'; ?> class="mb-2 ml-5 mt-1 space-y-0.5 border-l border-line pl-3">
									<?php foreach ( $term_posts as $a ) : ?>
										<a href="<?php echo esc_url( get_permalink( $a ) ); ?>" class="<?php echo $a->ID === get_the_ID() ? 'bg-ink font-semibold text-white' : 'text-ink/70 hover:bg-soft hover:text-ink'; ?> block w-full rounded-2xl px-3 py-1.5 text-left text-[13px] leading-snug transition">
											<?php echo esc_html( get_the_title( $a ) ); ?>
										</a>
									<?php endforeach; ?>
								</div>
							</div>
							<?php
						endforeach;
					endif;
					?>
				</div>
			</aside>

			<!-- Текст статьи -->
			<article class="min-w-0">
				<div class="rounded-card border border-line bg-white p-6 shadow-card sm:p-9">
					<?php if ( $cat ) : ?>
						<a href="<?php echo esc_url( $kb_url ); ?>" class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted transition hover:text-ink"><?php echo esc_html( $cat->name ); ?></a>
					<?php endif; ?>
					<h1 class="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-ink"><?php the_title(); ?></h1>
					<div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
						<span class="flex items-center gap-1.5"><?php wpp_icon( 'clock', 'h-3.5 w-3.5' ); ?><?php echo esc_html( wpp_read_time() ); ?></span>
						<span><?php esc_html_e( 'Обновлено', 'wp-panda' ); ?> <?php echo esc_html( get_the_modified_date( 'j F Y' ) ); ?></span>
					</div>

					<div class="prose-wpp mt-8"><?php the_content(); ?></div>

					<!-- Полезна ли статья -->
					<div class="mt-10 border-t border-line pt-6">
						<div class="text-center text-sm font-semibold"><?php esc_html_e( 'Статья была полезна?', 'wp-panda' ); ?></div>
						<div class="mt-4 flex justify-center gap-3">
							<button type="button" data-vote="yes" class="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-5 text-sm font-semibold text-ink transition hover:border-brand">
								<?php wpp_icon( 'thumbs-up', 'h-4 w-4' ); ?><?php esc_html_e( 'Да', 'wp-panda' ); ?>
							</button>
							<button type="button" data-vote="no" class="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-5 text-sm font-semibold text-ink transition hover:border-ink/25">
								<?php wpp_icon( 'thumbs-down', 'h-4 w-4' ); ?><?php esc_html_e( 'Нет', 'wp-panda' ); ?>
							</button>
						</div>
						<div data-vote-thanks hidden class="mt-4 rounded-2xl border border-dashed border-brand bg-brand-50 px-4 py-3 text-center text-sm font-semibold text-ink">
							<?php esc_html_e( 'Спасибо! Если нужна помощь — напишите в поддержку, поможем.', 'wp-panda' ); ?>
						</div>
					</div>
				</div>

				<?php if ( $related ) : ?>
					<section class="mt-14">
						<h2 class="text-xl font-bold tracking-tight"><?php esc_html_e( 'Связанные статьи', 'wp-panda' ); ?></h2>
						<div class="mt-5 grid gap-4 sm:grid-cols-3">
							<?php foreach ( $related as $r ) : ?>
								<a href="<?php echo esc_url( get_permalink( $r ) ); ?>" class="rounded-card border border-line bg-white p-5 shadow-card transition hover:border-ink/20">
									<div class="text-sm font-semibold leading-snug"><?php echo esc_html( get_the_title( $r ) ); ?></div>
									<div class="mt-2 text-xs text-muted"><?php echo esc_html( wpp_read_time( $r->ID ) ); ?> · <?php echo esc_html( get_the_modified_date( 'j F Y', $r ) ); ?></div>
								</a>
							<?php endforeach; ?>
						</div>
					</section>
				<?php endif; ?>

				<?php if ( $next ) : ?>
					<div class="mt-10 flex justify-end">
						<a href="<?php echo esc_url( get_permalink( $next ) ); ?>" class="rounded-card border border-line bg-white p-5 text-right shadow-card transition hover:border-ink/20">
							<div class="flex items-center justify-end gap-1 text-xs text-muted"><?php esc_html_e( 'Следующая', 'wp-panda' ); ?><?php wpp_icon( 'arrow-right', 'h-3.5 w-3.5' ); ?></div>
							<div class="mt-1 font-semibold text-ink"><?php echo esc_html( get_the_title( $next ) ); ?></div>
						</a>
					</div>
				<?php endif; ?>
			</article>
		</div>
	</div>
	<?php
endwhile;
get_footer();
