<?php
/**
 * Главная страница (front-page.php).
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$shop_url = wpp_has_woo() ? get_permalink( wc_get_page_id( 'shop' ) ) : home_url( '/' );
$faq_url  = wpp_faq_page_url();
$kb_url   = get_post_type_archive_link( 'kb_article' );
$support  = wpp_support_page_url();
?>

<!-- HERO -->
<section class="panda-hero relative isolate flex min-h-[440px] items-center overflow-hidden border-b border-line sm:min-h-[500px] lg:min-h-[540px]">
	<img src="<?php echo esc_url( WPP_URI . '/assets/img/hero.png' ); ?>" alt="<?php esc_attr_e( 'Рабочее место Wp Panda с макетом магазина WordPress на экране', 'wp-panda' ); ?>" fetchpriority="high" class="panda-hero__image absolute inset-0 h-full w-full object-cover" />
	<div aria-hidden="true" class="panda-hero__shade absolute inset-0"></div>
	<div class="relative mx-auto w-full max-w-[1200px] px-5 py-11 sm:px-8 sm:py-14 lg:px-6 lg:py-16">
		<div class="fade-up max-w-[540px]">
			<div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
				<span class="h-2 w-2 rounded-full bg-brand"></span><?php esc_html_e( 'Темы и плагины для WordPress', 'wp-panda' ); ?>
			</div>
			<h1 class="mt-5 text-[52px] font-extrabold leading-[0.95] tracking-[-0.065em] text-ink sm:mt-6 sm:text-[72px] lg:text-[84px]"><?php bloginfo( 'name' ); ?><span class="text-brand">.</span></h1>
			<p class="mt-4 max-w-[460px] text-base leading-relaxed text-ink/70 sm:mt-5 sm:text-lg"><?php esc_html_e( 'Всё для WordPress в одном месте. Темы на 1 или 5 сайтов, плагины с лицензией навсегда.', 'wp-panda' ); ?></p>
			<div class="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
				<a href="<?php echo esc_url( $shop_url ); ?>" class="inline-flex h-14 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand pl-7 pr-1.5 text-[15px] font-semibold text-ink shadow-glow transition-all duration-200 hover:bg-brand-600 active:scale-[0.98]">
					<?php esc_html_e( 'Смотреть каталог', 'wp-panda' ); ?>
					<span class="ml-4 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white"><?php wpp_icon( 'arrow-right', 'h-4 w-4' ); ?></span>
				</a>
				<?php if ( $kb_url ) : ?>
					<a href="<?php echo esc_url( $kb_url ); ?>" class="inline-flex h-14 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-7 text-[15px] font-semibold text-ink shadow-[0_1px_2px_rgba(20,20,28,0.05)] transition hover:border-ink/25">
						<?php esc_html_e( 'База знаний', 'wp-panda' ); ?>
					</a>
				<?php endif; ?>
			</div>
		</div>
	</div>
</section>

<!-- ПРЕИМУЩЕСТВА -->
<section class="mx-auto mt-20 max-w-[1200px] px-4 sm:px-6">
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<?php
		$benefits = array(
			array( 'gauge', __( 'PageSpeed 95+', 'wp-panda' ), __( 'Лёгкий код, чистая вёрстка и ноль лишних скриптов.', 'wp-panda' ) ),
			array( 'shield-check', __( 'Безопасно', 'wp-panda' ), __( 'Проверенный код, обновления безопасности и валидные лицензии.', 'wp-panda' ) ),
			array( 'refresh', __( 'Автообновления', 'wp-panda' ), __( 'Новые версии прилетают прямо в консоль WordPress.', 'wp-panda' ) ),
			array( 'headphones', __( 'Поддержка 12 мес.', 'wp-panda' ), __( 'Помогаем с установкой и настройкой на реальных сайтах.', 'wp-panda' ) ),
		);
		foreach ( $benefits as $b ) :
			?>
			<div class="rounded-card border border-line bg-white p-6 shadow-card">
				<span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-ink"><?php wpp_icon( $b[0], 'h-5 w-5' ); ?></span>
				<h3 class="mt-5 text-lg font-semibold tracking-tight"><?php echo esc_html( $b[1] ); ?></h3>
				<p class="mt-1.5 text-sm leading-relaxed text-muted"><?php echo esc_html( $b[2] ); ?></p>
			</div>
		<?php endforeach; ?>
	</div>
</section>

<!-- КАТАЛОГ -->
<section id="catalog" class="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<p class="text-xs text-muted"><?php esc_html_e( 'Витрина', 'wp-panda' ); ?></p>
			<h2 class="mt-1 text-3xl font-bold tracking-tight"><?php esc_html_e( 'Выберите своё решение', 'wp-panda' ); ?></h2>
		</div>
		<div class="inline-flex rounded-full border border-line bg-white p-1.5 shadow-card" role="tablist" aria-label="<?php esc_attr_e( 'Тип продукта', 'wp-panda' ); ?>">
			<button type="button" data-filter="all" aria-selected="true" class="h-9 rounded-full bg-ink px-4 text-[13px] font-semibold text-white transition"><?php esc_html_e( 'Все', 'wp-panda' ); ?></button>
			<button type="button" data-filter="theme" aria-selected="false" class="h-9 rounded-full px-4 text-[13px] font-semibold text-ink/60 transition hover:text-ink"><?php esc_html_e( 'Темы', 'wp-panda' ); ?></button>
			<button type="button" data-filter="plugin" aria-selected="false" class="h-9 rounded-full px-4 text-[13px] font-semibold text-ink/60 transition hover:text-ink"><?php esc_html_e( 'Плагины', 'wp-panda' ); ?></button>
		</div>
	</div>
	<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		<?php foreach ( wpp_showcase_products( 'all', 8 ) as $d ) : ?>
			<?php wpp_product_card( $d ); ?>
		<?php endforeach; ?>
	</div>
	<div class="mt-8 text-center">
		<a href="<?php echo esc_url( $shop_url ); ?>" class="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-white px-6 text-sm font-semibold text-ink transition hover:border-ink/25">
			<?php esc_html_e( 'Открыть весь каталог', 'wp-panda' ); ?> <?php wpp_icon( 'arrow-right', 'h-4 w-4' ); ?>
		</a>
	</div>
</section>

<!-- РЕШЕНИЯ -->
<section class="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<p class="text-xs text-muted"><?php esc_html_e( 'Под задачи', 'wp-panda' ); ?></p>
			<h2 class="mt-1 text-3xl font-bold tracking-tight"><?php esc_html_e( 'Готовые решения для проектов', 'wp-panda' ); ?></h2>
		</div>
		<a href="<?php echo esc_url( $shop_url ); ?>" class="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:underline"><?php esc_html_e( 'Смотреть все', 'wp-panda' ); ?> <?php wpp_icon( 'arrow-right', 'h-4 w-4' ); ?></a>
	</div>
	<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<?php foreach ( wpp_solutions() as $s ) : ?>
			<a href="<?php echo esc_url( $shop_url ); ?>" class="group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-card shadow-card transition hover:-translate-y-1 hover:shadow-float">
				<img src="<?php echo esc_url( $s['img'] ); ?>" alt="" loading="lazy" class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
				<div aria-hidden="true" class="absolute inset-0" style="background:linear-gradient(180deg,rgba(10,10,15,0) 30%,rgba(10,10,15,.78) 100%)"></div>
				<div class="relative p-5 text-white">
					<div class="text-lg font-bold tracking-tight"><?php echo esc_html( $s['title'] ); ?></div>
					<div class="mt-1 flex items-center gap-1.5 text-xs text-white/75"><?php echo esc_html( $s['subtitle'] ); ?> <?php wpp_icon( 'arrow-right', 'h-3.5 w-3.5' ); ?></div>
				</div>
			</a>
		<?php endforeach; ?>
	</div>
</section>

<!-- FAQ -->
<?php
$faq_groups = wpp_faq_grouped();
$faq_items  = $faq_groups ? array_slice( $faq_groups[0]['items'], 0, 5 ) : array();
if ( $faq_items ) :
	?>
	<section id="faq" class="mx-auto mt-24 max-w-[860px] px-4 sm:px-6">
		<div class="text-center">
			<p class="text-xs text-muted"><?php esc_html_e( 'Вопросы и ответы', 'wp-panda' ); ?></p>
			<h2 class="mt-1 text-3xl font-bold tracking-tight"><?php esc_html_e( 'Частые вопросы', 'wp-panda' ); ?></h2>
		</div>
		<div class="mt-8 space-y-2.5">
			<?php foreach ( $faq_items as $i => $item ) : ?>
				<article class="<?php echo 0 === $i ? 'border-brand shadow-card ring-1 ring-brand' : 'border-line hover:border-ink/15'; ?> rounded-2xl border bg-white transition-all">
					<button type="button" data-acc-btn aria-expanded="<?php echo 0 === $i ? 'true' : 'false'; ?>" class="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6">
						<span class="<?php echo 0 === $i ? 'bg-brand text-ink' : 'bg-soft text-muted'; ?> flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition"><?php wpp_icon( 'file-text', 'h-4 w-4' ); ?></span>
						<span class="flex-1 text-sm font-semibold leading-relaxed sm:text-[15px]"><?php echo esc_html( get_the_title( $item ) ); ?></span>
						<?php wpp_icon( 'chevron-down', 'h-4 w-4 flex-shrink-0 text-muted transition-transform' ); ?>
					</button>
					<div data-acc-body <?php if ( 0 !== $i ) echo 'hidden'; ?> class="fade-in border-t border-line px-5 pb-5 pt-4 text-sm leading-relaxed text-muted sm:px-6 sm:pl-[68px]">
						<?php echo wp_kses_post( wpautop( $item->post_content ) ); ?>
					</div>
				</article>
			<?php endforeach; ?>
		</div>
		<?php if ( $faq_url ) : ?>
			<div class="mt-8 text-center">
				<a href="<?php echo esc_url( $faq_url ); ?>" class="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-white px-6 text-sm font-semibold text-ink transition hover:border-ink/25">
					<?php esc_html_e( 'Все вопросы и ответы', 'wp-panda' ); ?> <?php wpp_icon( 'arrow-right', 'h-4 w-4' ); ?>
				</a>
			</div>
		<?php endif; ?>
	</section>
<?php endif; ?>

<!-- БЛОГ -->
<?php
$posts_latest = get_posts( array( 'numberposts' => 3 ) );
if ( $posts_latest ) :
	?>
	<section class="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<div>
				<p class="text-xs text-muted"><?php esc_html_e( 'Блог', 'wp-panda' ); ?></p>
				<h2 class="mt-1 text-3xl font-bold tracking-tight"><?php esc_html_e( 'Про WordPress без воды', 'wp-panda' ); ?></h2>
			</div>
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:underline"><?php esc_html_e( 'Все статьи', 'wp-panda' ); ?> <?php wpp_icon( 'arrow-right', 'h-4 w-4' ); ?></a>
		</div>
		<div class="mt-8 grid gap-5 md:grid-cols-3">
			<?php foreach ( $posts_latest as $p ) : ?>
				<?php wpp_post_card( $p ); ?>
			<?php endforeach; ?>
		</div>
	</section>
<?php endif; ?>

<!-- ОТЗЫВЫ -->
<section class="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
	<div class="text-center">
		<p class="text-xs text-muted"><?php esc_html_e( 'Отзывы', 'wp-panda' ); ?></p>
		<h2 class="mt-1 text-3xl font-bold tracking-tight"><?php esc_html_e( 'Клиенты о Wp Panda', 'wp-panda' ); ?></h2>
	</div>
	<div class="mt-8 grid gap-4 md:grid-cols-3">
		<?php foreach ( wpp_testimonials() as $t ) : ?>
			<figure class="rounded-card border border-line bg-white p-6 shadow-card">
				<?php wpp_stars( 5 ); ?>
				<blockquote class="mt-4 text-sm leading-relaxed text-ink/85"><?php echo esc_html( $t['text'] ); ?></blockquote>
				<figcaption class="mt-5 flex items-center gap-3 border-t border-line pt-4">
					<img src="<?php echo esc_url( $t['avatar'] ); ?>" alt="" loading="lazy" class="h-10 w-10 rounded-full object-cover" />
					<div class="text-xs">
						<div class="font-semibold"><?php echo esc_html( $t['name'] ); ?></div>
						<div class="text-muted"><?php echo esc_html( $t['role'] ); ?></div>
					</div>
				</figcaption>
			</figure>
		<?php endforeach; ?>
	</div>
</section>

<!-- CTA -->
<section class="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
	<div class="dark-card relative overflow-hidden rounded-card px-6 py-12 text-center text-white sm:px-12">
		<h2 class="text-3xl font-bold tracking-tight"><?php esc_html_e( 'Запустите сайт на этой неделе', 'wp-panda' ); ?></h2>
		<p class="mx-auto mt-3 max-w-[520px] text-sm leading-relaxed text-white/70"><?php esc_html_e( 'Тема, плагины и демо-контент устанавливаются в один клик. Поддержка — 12 месяцев, возврат — 14 дней.', 'wp-panda' ); ?></p>
		<div class="mt-7 flex flex-wrap items-center justify-center gap-3">
			<a href="<?php echo esc_url( $shop_url ); ?>" class="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand px-7 text-[15px] font-semibold text-ink shadow-glow transition hover:bg-brand-600"><?php esc_html_e( 'Перейти в каталог', 'wp-panda' ); ?> <?php wpp_icon( 'arrow-right', 'h-4 w-4' ); ?></a>
			<?php if ( $support ) : ?>
				<a href="<?php echo esc_url( $support ); ?>" class="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 text-[15px] font-semibold text-white transition hover:bg-white/10"><?php esc_html_e( 'Задать вопрос', 'wp-panda' ); ?></a>
			<?php endif; ?>
		</div>
	</div>
</section>

<?php get_footer(); ?>
