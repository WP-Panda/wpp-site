<?php
/**
 * Template Name: FAQ
 *
 * FAQ page identical to the supplied layout: tabs + accordion sections.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

get_header();

$wpp_data = function_exists( 'wpp_demo_data' ) ? wpp_demo_data() : array();
$wpp_faq  = isset( $wpp_data['faq'] ) ? (array) $wpp_data['faq'] : array();

$wpp_sections = array();
foreach ( $wpp_faq as $wpp_item ) {
	$wpp_sections[ $wpp_item['category'] ][] = $wpp_item;
}
?>
<div class="mx-auto max-w-[1200px] px-4 pb-12 pt-8 sm:px-6 sm:pt-12">
	<div class="fade-up mx-auto max-w-2xl text-center">
		<div class="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium shadow-card">
			<span class="h-1.5 w-1.5 rounded-full bg-brand"></span>
			<span class="flex items-center gap-2"><?php echo wpp_icon( 'circle-question-mark', 'h-3.5 w-3.5 text-muted' ); ?><?php esc_html_e( 'Центр ответов Wp Panda', 'wp-panda' ); ?></span>
		</div>
		<h1 class="text-4xl font-bold tracking-tight sm:text-[52px] sm:leading-[1.08]"><?php the_title(); ?></h1>
		<p class="mt-4 text-base text-muted sm:text-lg"><?php esc_html_e( 'Короткие ответы о покупке, установке и лицензиях на темы и плагины WordPress.', 'wp-panda' ); ?></p>
		<div class="mx-auto mt-8 max-w-2xl">
			<label class="flex h-14 items-center gap-3 rounded-full border border-line bg-white px-5 shadow-card transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15">
				<?php echo wpp_icon( 'search', 'h-4 w-4 flex-shrink-0 text-muted' ); ?>
				<input data-faq-search placeholder="<?php esc_attr_e( 'Например: лицензия плагина или возврат', 'wp-panda' ); ?>" class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70 sm:text-base" value="">
			</label>
		</div>
	</div>

	<div class="no-scrollbar mx-auto mt-8 max-w-4xl overflow-x-auto">
		<div class="flex w-full rounded-full border border-line bg-white p-1.5 shadow-card min-w-max sm:min-w-0">
			<button type="button" data-faq-tab="all" class="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 font-semibold transition-all duration-200 h-8 text-[13px] bg-ink text-white shadow-[0_6px_16px_-8px_rgba(20,20,28,0.6)]"><?php esc_html_e( 'Все вопросы', 'wp-panda' ); ?><span class="text-xs font-medium text-white/55"><?php echo esc_html( count( $wpp_faq ) ); ?></span></button>
			<?php foreach ( $wpp_sections as $wpp_cat => $wpp_items ) : ?>
				<button type="button" data-faq-tab="<?php echo esc_attr( sanitize_title( $wpp_cat ) ); ?>" class="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 font-semibold transition-all duration-200 h-8 text-[13px] text-ink/65 hover:text-ink"><?php echo esc_html( $wpp_cat ); ?><span class="text-xs font-medium text-muted"><?php echo esc_html( count( $wpp_items ) ); ?></span></button>
			<?php endforeach; ?>
		</div>
	</div>

	<div class="mx-auto mt-10 grid max-w-[1080px] items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
		<div class="min-w-0">
			<div class="space-y-8" data-faq-list>
				<?php foreach ( $wpp_sections as $wpp_cat => $wpp_items ) : ?>
					<section data-faq-section="<?php echo esc_attr( sanitize_title( $wpp_cat ) ); ?>">
						<div class="mb-3 flex items-center justify-between gap-3">
							<h2 class="text-lg font-semibold tracking-tight"><?php echo esc_html( $wpp_cat ); ?></h2>
							<span class="text-xs text-muted"><?php echo esc_html( sprintf( _n( '%s вопрос', '%s вопроса', count( $wpp_items ), 'wp-panda' ), number_format_i18n( count( $wpp_items ) ) ) ); ?></span>
						</div>
						<div class="space-y-2.5">
							<?php foreach ( $wpp_items as $wpp_item ) : ?>
								<article data-faq-item data-accordion-item class="rounded-2xl border bg-white transition-all border-line hover:border-ink/15">
									<button type="button" aria-expanded="false" class="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6" data-accordion>
										<span class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition bg-soft text-muted"><?php echo wpp_icon( 'circle-question-mark', 'h-4 w-4' ); ?></span>
										<span class="flex-1 text-sm font-semibold leading-relaxed sm:text-[15px]"><?php echo esc_html( $wpp_item['q'] ); ?></span>
										<?php echo wpp_icon( 'chevron-down', 'h-4 w-4 flex-shrink-0 text-muted transition-transform duration-300' ); ?>
									</button>
									<div data-accordion-content class="overflow-hidden transition-all duration-300" style="max-height: 0;">
										<div class="px-5 pb-4 pl-[68px] pr-6 text-sm leading-relaxed text-muted sm:px-6 sm:pl-[72px]"><?php echo wp_kses_post( $wpp_item['a'] ); ?></div>
									</div>
								</article>
							<?php endforeach; ?>
						</div>
					</section>
				<?php endforeach; ?>
			</div>
		</div>
		<aside class="space-y-4 lg:sticky lg:top-24">
			<div class="dark-card rounded-card p-6 text-white">
				<span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand text-ink"><?php echo wpp_icon( 'headphones', 'h-5 w-5' ); ?></span>
				<div class="mt-4 font-semibold"><?php esc_html_e( 'Не нашли ответ?', 'wp-panda' ); ?></div>
				<p class="mt-1 text-sm text-white/65"><?php esc_html_e( 'Напишите в поддержку — отвечаем быстро и по делу.', 'wp-panda' ); ?></p>
				<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-10 px-4 text-[13px] mt-4 w-full" href="<?php echo esc_url( is_user_logged_in() ? wc_get_account_endpoint_url( 'new-ticket' ) : home_url( '/my-account/' ) ); ?>"><?php esc_html_e( 'Написать в поддержку', 'wp-panda' ); ?></a>
			</div>
			<div class="rounded-card bg-brand-50 p-6 ring-1 ring-brand-100">
				<div class="flex items-center gap-2 font-semibold"><?php echo wpp_icon( 'book-open', 'h-4 w-4 text-[#906500]' ); ?><?php esc_html_e( 'База знаний', 'wp-panda' ); ?></div>
				<p class="mt-1 text-sm text-muted"><?php esc_html_e( 'Подробные инструкции по установке, лицензиям и обновлению.', 'wp-panda' ); ?></p>
				<a class="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-brand decoration-2 underline-offset-4" href="<?php echo esc_url( home_url( '/kb/' ) ); ?>"><?php esc_html_e( 'Открыть базу знаний', 'wp-panda' ); ?></a>
			</div>
		</aside>
	</div>
</div>
<?php
get_footer();
