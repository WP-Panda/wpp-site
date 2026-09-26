<?php
/**
 * Индекс базы знаний (archive-kb_article.php).
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$terms     = get_terms( array( 'taxonomy' => 'kb_cat', 'hide_empty' => false ) );
$all_posts = wpp_kb_articles();
$icons     = array( 'rocket', 'shield', 'zap', 'cart-w', 'form', 'languages', 'calendar', 'mail' );
$quick     = array_slice( $all_posts, 0, 4 );
?>
<div class="mx-auto max-w-[1200px] px-4 pt-10 sm:px-6">
	<div class="mx-auto max-w-2xl text-center">
		<div class="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium shadow-card">
			<span class="h-1.5 w-1.5 rounded-full bg-brand"></span><?php esc_html_e( 'База знаний Wp Panda', 'wp-panda' ); ?>
		</div>
		<h1 class="mt-5 text-4xl font-extrabold tracking-[-0.03em] text-ink"><?php esc_html_e( 'Как всё работает', 'wp-panda' ); ?></h1>
		<p class="mt-3 text-sm leading-relaxed text-muted"><?php esc_html_e( 'Установка, лицензии, обновления и решения проблем — короткие инструкции с картинками.', 'wp-panda' ); ?></p>
	</div>

	<?php if ( $quick ) : ?>
		<div class="mt-6 flex flex-wrap justify-center gap-2">
			<?php foreach ( $quick as $q ) : ?>
				<a href="<?php echo esc_url( get_permalink( $q ) ); ?>" class="rounded-full bg-soft px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-brand-50 hover:text-ink"><?php echo esc_html( get_the_title( $q ) ); ?></a>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>

	<?php if ( $terms && ! is_wp_error( $terms ) ) : ?>
		<section class="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			<?php foreach ( $terms as $i => $term ) : ?>
				<?php
				$arts = get_posts( array( 'post_type' => 'kb_article', 'posts_per_page' => 3, 'tax_query' => array( array( 'taxonomy' => 'kb_cat', 'terms' => $term->term_id ) ) ) );
				$count = (int) $term->count;
				/* translators: %d — количество статей */
				$count_label = sprintf( _n( '%d статья', '%d статей', $count, 'wp-panda' ), $count );
				?>
				<div class="flex flex-col rounded-card border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-float">
					<div class="flex items-center justify-between">
						<span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-ink"><?php wpp_icon( $icons[ $i % count( $icons ) ], 'h-5 w-5' ); ?></span>
						<span class="rounded-full bg-soft px-2.5 py-1 text-[11px] font-semibold text-muted"><?php echo esc_html( $count_label ); ?></span>
					</div>
					<h2 class="mt-5 text-lg font-semibold tracking-tight"><?php echo esc_html( $term->name ); ?></h2>
					<p class="mt-1 text-sm text-muted"><?php echo esc_html( $term->description ); ?></p>
					<?php if ( $arts ) : ?>
						<ul class="mt-4 flex-1 space-y-2 border-t border-line pt-4">
							<?php foreach ( $arts as $a ) : ?>
								<li>
									<a href="<?php echo esc_url( get_permalink( $a ) ); ?>" class="flex w-full items-start gap-2 text-left text-sm text-ink/80 transition hover:text-ink">
										<?php wpp_icon( 'chevron-right', 'mt-0.5 h-4 w-4 flex-shrink-0 text-muted' ); ?><?php echo esc_html( get_the_title( $a ) ); ?>
									</a>
								</li>
							<?php endforeach; ?>
						</ul>
					<?php endif; ?>
				</div>
			<?php endforeach; ?>
		</section>
	<?php endif; ?>

	<?php
	$popular = get_posts( array( 'post_type' => 'kb_article', 'posts_per_page' => 5, 'meta_key' => 'wpp_views', 'orderby' => 'meta_value_num', 'order' => 'DESC' ) );
	if ( ! $popular ) {
		$popular = array_slice( $all_posts, 0, 5 );
	}
	if ( $popular ) :
		?>
		<section class="mt-16">
			<div class="rounded-card border border-line bg-white p-6 shadow-card">
				<div class="flex items-center justify-between">
					<h2 class="text-lg font-bold tracking-tight"><?php esc_html_e( 'Популярные статьи', 'wp-panda' ); ?></h2>
					<span class="flex items-center gap-1.5 text-xs text-muted"><?php wpp_icon( 'trending', 'h-3.5 w-3.5' ); ?><?php esc_html_e( 'за 30 дней', 'wp-panda' ); ?></span>
				</div>
				<div class="mt-2 divide-y divide-line">
					<?php foreach ( $popular as $i => $a ) : ?>
						<a href="<?php echo esc_url( get_permalink( $a ) ); ?>" class="group flex w-full items-center gap-4 py-3.5 text-left">
							<span class="<?php echo $i < 3 ? 'bg-brand' : 'bg-soft'; ?> flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold <?php echo $i < 3 ? 'text-ink' : 'text-muted'; ?>"><?php echo esc_html( $i + 1 ); ?></span>
							<span class="min-w-0 flex-1">
								<span class="block font-medium decoration-brand decoration-2 underline-offset-4 group-hover:underline"><?php echo esc_html( get_the_title( $a ) ); ?></span>
								<span class="text-xs text-muted"><?php echo esc_html( wpp_read_time( $a->ID ) ); ?> · <?php echo esc_html( get_the_modified_date( 'j F Y', $a ) ); ?></span>
							</span>
							<?php wpp_icon( 'chevron-right', 'h-4 w-4 text-muted transition group-hover:translate-x-0.5' ); ?>
						</a>
					<?php endforeach; ?>
				</div>
			</div>
		</section>
	<?php endif; ?>
</div>
<?php get_footer(); ?>
