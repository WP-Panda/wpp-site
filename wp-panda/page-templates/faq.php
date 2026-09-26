<?php
/**
 * Template Name: FAQ — частые вопросы
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
$groups = wpp_faq_grouped();
$support = wpp_support_page_url();
?>
<div class="mx-auto max-w-[860px] px-4 pt-10 sm:px-6">
	<div class="mx-auto max-w-2xl text-center">
		<div class="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium shadow-card">
			<span class="h-1.5 w-1.5 rounded-full bg-brand"></span><?php esc_html_e( 'Частые вопросы', 'wp-panda' ); ?>
		</div>
		<h1 class="mt-5 text-4xl font-extrabold tracking-[-0.03em] text-ink"><?php the_title(); ?></h1>
		<?php if ( get_the_excerpt() ) : ?>
			<p class="mt-3 text-sm leading-relaxed text-muted"><?php echo esc_html( get_the_excerpt() ); ?></p>
		<?php endif; ?>
	</div>

	<?php
	$first = true;
	foreach ( $groups as $group ) :
		if ( empty( $group['items'] ) ) {
			continue;
		}
		?>
		<section class="mt-12">
			<div class="mb-3 flex items-center justify-between gap-3">
				<h2 class="text-lg font-semibold tracking-tight"><?php echo esc_html( $group['name'] ); ?></h2>
				<span class="text-xs text-muted"><?php echo esc_html( count( $group['items'] ) ); ?></span>
			</div>
			<div class="space-y-2.5">
				<?php foreach ( $group['items'] as $item ) : ?>
					<?php $open = $first; ?>
					<article class="<?php echo $open ? 'border-brand shadow-card ring-1 ring-brand' : 'border-line hover:border-ink/15'; ?> rounded-2xl border bg-white transition-all">
						<button type="button" data-acc-btn aria-expanded="<?php echo $open ? 'true' : 'false'; ?>" class="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6">
							<span class="<?php echo $open ? 'bg-brand text-ink' : 'bg-soft text-muted'; ?> flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition"><?php wpp_icon( 'file-text', 'h-4 w-4' ); ?></span>
							<span class="flex-1 text-sm font-semibold leading-relaxed sm:text-[15px]"><?php echo esc_html( get_the_title( $item ) ); ?></span>
							<?php wpp_icon( 'chevron-down', 'h-4 w-4 flex-shrink-0 text-muted transition-transform' ); ?>
						</button>
						<div data-acc-body <?php if ( ! $open ) echo 'hidden'; ?> class="fade-in border-t border-line px-5 pb-5 pt-4 text-sm leading-relaxed text-muted sm:px-6 sm:pl-[68px]">
							<?php echo wp_kses_post( wpautop( $item->post_content ) ); ?>
						</div>
					</article>
					<?php $first = false; ?>
				<?php endforeach; ?>
			</div>
		</section>
		<?php
	endforeach;
	?>

	<?php if ( ! $groups ) : ?>
		<div class="mt-12 rounded-card border border-line bg-white p-12 text-center shadow-card">
			<h2 class="text-xl font-bold"><?php esc_html_e( 'Вопросов пока нет', 'wp-panda' ); ?></h2>
			<p class="mt-2 text-sm text-muted"><?php esc_html_e( 'Добавьте вопросы в консоли: FAQ → Добавить вопрос.', 'wp-panda' ); ?></p>
		</div>
	<?php endif; ?>

	<?php if ( $support ) : ?>
		<div class="dark-card mt-14 rounded-card px-6 py-10 text-center text-white">
			<h2 class="text-2xl font-bold tracking-tight"><?php esc_html_e( 'Не нашли ответ?', 'wp-panda' ); ?></h2>
			<p class="mt-2 text-sm text-white/70"><?php esc_html_e( 'Напишите в поддержку — отвечаем в течение рабочего дня.', 'wp-panda' ); ?></p>
			<a href="<?php echo esc_url( $support ); ?>" class="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-ink shadow-glow transition hover:bg-brand-600">
				<?php esc_html_e( 'Форма поддержки', 'wp-panda' ); ?> <?php wpp_icon( 'arrow-right', 'h-4 w-4' ); ?>
			</a>
		</div>
	<?php endif; ?>
</div>
<?php get_footer(); ?>
