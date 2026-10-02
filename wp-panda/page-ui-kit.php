<?php
/**
 * Template Name: UI-кит
 *
 * Design system reference page identical to the supplied layout.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

get_header();

$wpp_colors = array(
	array( 'bg-brand', 'Brand', '#FFC21F', '--color-brand' ),
	array( 'bg-brand-600', 'Brand 600', '#F5B000', '--color-brand-600' ),
	array( 'bg-brand-50', 'Brand 50', '#FFF8E4', '--color-brand-50' ),
	array( 'bg-ink', 'Ink', '#1C1C21', '--color-ink' ),
	array( 'bg-muted', 'Muted', '#7B7B87', '--color-muted' ),
	array( 'bg-line', 'Line', '#EBEBF0', '--color-line' ),
	array( 'bg-soft', 'Soft', '#F6F6F8', '--color-soft' ),
	array( 'bg-[#F4F4F6]', 'Footer', '#F4F4F6', 'footer bg' ),
);

$wpp_rows = array(
	array( 'Главная', '/', 'Шаблон главной темы (front-page)', 'hero, подборка, сценарии, лицензии, отзывы, блог' ),
	array( 'Каталог', '/каталог (страница магазина WC)', 'woocommerce/archive-product.php', 'карточки товаров, сортировка, фильтры, пагинация' ),
	array( 'Страница товара', '/товар/…', 'single-product.php + template-parts/product/*', 'галерея, лицензии, табы, отзывы, история версий' ),
	array( 'Корзина', '/корзина', 'woocommerce/cart/cart.php', 'строки, переключение лицензии, промокод, итоги' ),
	array( 'Оформление', '/оформление-заказа', 'woocommerce/checkout/form-checkout.php', '3 карточки данных, итоги, оплата' ),
	array( 'Спасибо', '/заказ-получен', 'woocommerce/checkout/thankyou.php', 'ключи, скачивание, детали заказа' ),
	array( 'Кабинет', '/личный-кабинет/…', 'woocommerce/myaccount/my-account.php', 'заказы, лицензии, загрузки, поддержка, избранное' ),
	array( 'Блог', '/блог', 'home.php + single.php', 'сетка статей, избранная статья, рубрики' ),
	array( 'База знаний', '/база-знаний/', 'шаблон страницы «База знаний»', 'поиск, рубрики, статьи-страницы' ),
	array( 'FAQ', '/faq/', 'шаблон страницы «Частые вопросы»', 'табы, аккордеоны, поиск' ),
);
?>
<div class="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12 pb-20">
	<div class="fade-up mx-auto max-w-2xl text-center">
		<div class="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium shadow-card">
			<span class="h-1.5 w-1.5 rounded-full bg-brand"></span><?php esc_html_e( 'Для разработчика WordPress', 'wp-panda' ); ?>
		</div>
		<h1 class="text-4xl font-bold tracking-tight sm:text-[52px] sm:leading-[1.08]"><?php the_title(); ?></h1>
		<p class="mt-4 text-base text-muted sm:text-lg"><?php esc_html_e( 'Дизайн-токены, компоненты и соответствие экранов шаблонам WooCommerce.', 'wp-panda' ); ?></p>
	</div>

	<section class="mt-14">
		<h2 class="mb-5 text-2xl font-bold tracking-tight"><?php esc_html_e( 'Цвета', 'wp-panda' ); ?></h2>
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
			<?php foreach ( $wpp_colors as $wpp_color ) : ?>
				<div class="overflow-hidden rounded-card border border-line bg-white shadow-card">
					<div class="h-20 <?php echo esc_attr( $wpp_color[0] ); ?>"></div>
					<div class="p-4">
						<div class="font-semibold"><?php echo esc_html( $wpp_color[1] ); ?></div>
						<div class="font-mono text-xs text-muted"><?php echo esc_html( $wpp_color[2] ); ?></div>
						<div class="font-mono text-[11px] text-muted"><?php echo esc_html( $wpp_color[3] ); ?></div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</section>

	<section class="mt-14">
		<h2 class="mb-5 text-2xl font-bold tracking-tight"><?php esc_html_e( 'Типографика — Montserrat', 'wp-panda' ); ?></h2>
		<div class="space-y-4 rounded-card border border-line bg-white p-6 shadow-card sm:p-8">
			<div class="text-[52px] font-bold leading-[1.08] tracking-tight"><?php esc_html_e( 'Заголовок H1 · 52/700', 'wp-panda' ); ?></div>
			<div class="text-[40px] font-bold leading-[1.1] tracking-tight"><?php esc_html_e( 'Заголовок H2 · 40/700', 'wp-panda' ); ?></div>
			<div class="text-xl font-semibold tracking-tight"><?php esc_html_e( 'Заголовок секции H3 · 20/600', 'wp-panda' ); ?></div>
			<p class="text-base text-ink/85"><?php esc_html_e( 'Темы для WordPress (1 или 5 сайтов) и плагины с лицензией навсегда.', 'wp-panda' ); ?></p>
			<p class="text-[13px] text-muted"><?php esc_html_e( 'Вспомогательный текст · 13/400 · цвет Muted', 'wp-panda' ); ?></p>
			<p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted"><?php esc_html_e( 'Надпись / лейбл · 11/600 · uppercase', 'wp-panda' ); ?></p>
		</div>
	</section>

	<section class="mt-14">
		<h2 class="mb-5 text-2xl font-bold tracking-tight"><?php esc_html_e( 'Кнопки', 'wp-panda' ); ?></h2>
		<div class="space-y-5 rounded-card border border-line bg-white p-6 shadow-card sm:p-8">
			<div class="flex flex-wrap items-center gap-3">
				<button type="button" class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-brand text-ink hover:bg-brand-600 shadow-glow h-11 px-5 text-sm"><?php esc_html_e( 'Основная', 'wp-panda' ); ?></button>
				<button type="button" class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-ink text-white hover:bg-ink-2 h-11 px-5 text-sm"><?php esc_html_e( 'Тёмная', 'wp-panda' ); ?></button>
				<button type="button" class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-soft text-ink border border-line hover:bg-[#EEEEF2] h-11 px-5 text-sm"><?php esc_html_e( 'Мягкая', 'wp-panda' ); ?></button>
				<button type="button" class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-white text-ink border border-line hover:border-ink/25 shadow-[0_1px_2px_rgba(20,20,28,0.05)] h-11 px-5 text-sm"><?php esc_html_e( 'Контурная', 'wp-panda' ); ?></button>
				<button type="button" disabled class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-brand text-ink hover:bg-brand-600 shadow-glow h-11 px-5 text-sm"><?php esc_html_e( 'Недоступна', 'wp-panda' ); ?></button>
			</div>
			<div class="flex flex-wrap items-center gap-3">
				<button type="button" class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-14 px-7 text-[15px]"><?php echo wpp_icon( 'shopping-bag', 'h-4 w-4' ); ?><?php esc_html_e( 'В корзину', 'wp-panda' ); ?></button>
				<button type="button" class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-ink text-white hover:bg-ink-2 h-9 px-4 text-[13px]"><?php esc_html_e( 'Маленькая', 'wp-panda' ); ?></button>
				<button type="button" class="inline-flex select-none items-center justify-center whitespace-nowrap rounded-full transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-11 w-11"><?php echo wpp_icon( 'arrow-right', 'h-4 w-4' ); ?></button>
			</div>
		</div>
	</section>

	<section class="mt-14">
		<h2 class="mb-5 text-2xl font-bold tracking-tight"><?php esc_html_e( 'Формы', 'wp-panda' ); ?></h2>
		<div class="grid gap-4 rounded-card border border-line bg-white p-6 shadow-card sm:grid-cols-2 sm:p-8">
			<label class="block">
				<span class="mb-2 block text-[13px] font-medium text-ink"><?php esc_html_e( 'Поле ввода', 'wp-panda' ); ?></span>
				<input class="h-12 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" placeholder="<?php esc_attr_e( 'Например: aurora', 'wp-panda' ); ?>">
			</label>
			<label class="block">
				<span class="mb-2 block text-[13px] font-medium text-ink"><?php esc_html_e( 'Селект', 'wp-panda' ); ?></span>
				<span class="relative block">
					<select class="h-12 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm text-ink outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15 cursor-pointer appearance-none pr-10">
						<option><?php esc_html_e( 'Темы WordPress', 'wp-panda' ); ?></option>
						<option><?php esc_html_e( 'Плагины WordPress', 'wp-panda' ); ?></option>
					</select>
					<?php echo wpp_icon( 'chevron-down', 'pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted' ); ?>
				</span>
			</label>
			<label class="block sm:col-span-2">
				<span class="mb-2 block text-[13px] font-medium text-ink"><?php esc_html_e( 'Текстовая область', 'wp-panda' ); ?></span>
				<textarea rows="3" class="w-full rounded-xl border border-line bg-soft/70 px-4 py-3 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15" placeholder="<?php esc_attr_e( 'Опишите задачу…', 'wp-panda' ); ?>"></textarea>
			</label>
			<div class="flex items-center gap-6">
				<label class="flex items-center gap-2.5 text-sm"><input type="checkbox" checked class="h-5 w-5 rounded-md accent-[#ffc21f]"><?php esc_html_e( 'Чекбокс', 'wp-panda' ); ?></label>
				<label class="flex items-center gap-2.5 text-sm"><input type="radio" name="wpp-ui-radio" checked class="h-4 w-4 accent-[#ffc21f]"><?php esc_html_e( 'Радио 1', 'wp-panda' ); ?></label>
				<label class="flex items-center gap-2.5 text-sm"><input type="radio" name="wpp-ui-radio" class="h-4 w-4 accent-[#ffc21f]"><?php esc_html_e( 'Радио 2', 'wp-panda' ); ?></label>
			</div>
		</div>
	</section>

	<section class="mt-14">
		<h2 class="mb-5 text-2xl font-bold tracking-tight"><?php esc_html_e( 'Бейджи', 'wp-panda' ); ?></h2>
		<div class="flex flex-wrap items-center gap-3 rounded-card border border-line bg-white p-6 shadow-card sm:p-8">
			<span class="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white"><?php esc_html_e( 'Тема', 'wp-panda' ); ?></span>
			<span class="rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-bold"><?php esc_html_e( '−70%', 'wp-panda' ); ?></span>
			<span class="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold text-[#906500] ring-1 ring-brand-100"><?php esc_html_e( 'Хит продаж', 'wp-panda' ); ?></span>
			<span class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset bg-emerald-50 text-emerald-700 ring-emerald-200"><span class="h-1.5 w-1.5 rounded-full bg-current opacity-70"></span><?php esc_html_e( 'Активна', 'wp-panda' ); ?></span>
			<span class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset bg-brand-50 text-[#946300] ring-brand-100"><span class="h-1.5 w-1.5 rounded-full bg-current opacity-70"></span><?php esc_html_e( 'В обработке', 'wp-panda' ); ?></span>
			<span class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset bg-rose-50 text-rose-600 ring-rose-200"><span class="h-1.5 w-1.5 rounded-full bg-current opacity-70"></span><?php esc_html_e( 'Возврат', 'wp-panda' ); ?></span>
			<span class="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm ring-1 ring-line"><?php echo wpp_icon( 'package', 'mr-1 inline h-3 w-3' ); ?>v3.2.1</span>
		</div>
	</section>

	<section class="mt-14">
		<h2 class="mb-5 text-2xl font-bold tracking-tight"><?php esc_html_e( 'Карточки маркетплейса', 'wp-panda' ); ?></h2>
		<p class="mb-5 text-sm text-muted"><?php esc_html_e( 'Живые карточки каталога WooCommerce — компонент один и тот же: на витрине, в поиске, в кабинете и в корзине.', 'wp-panda' ); ?></p>
		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			<?php
			$wpp_demo_products = wc_get_products( array( 'status' => 'publish', 'limit' => 3, 'orderby' => 'meta_value_num', 'meta_key' => '_wpp_featured_order' ) );
			if ( ! $wpp_demo_products ) {
				$wpp_demo_products = wc_get_products( array( 'status' => 'publish', 'limit' => 3 ) );
			}
			foreach ( $wpp_demo_products as $wpp_demo_product ) {
				$GLOBALS['product'] = $wpp_demo_product;
				setup_postdata( $wpp_demo_product->get_id() );
				wc_get_template_part( 'content', 'product' );
				wp_reset_postdata();
			}
			?>
		</div>
	</section>

	<section class="mt-14">
		<h2 class="mb-5 text-2xl font-bold tracking-tight"><?php esc_html_e( 'Соответствие экранов', 'wp-panda' ); ?></h2>
		<div class="overflow-hidden rounded-card border border-line bg-white shadow-card">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-line bg-soft/60 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
						<th class="px-6 py-3"><?php esc_html_e( 'Экран', 'wp-panda' ); ?></th>
						<th class="px-6 py-3"><?php esc_html_e( 'Адрес', 'wp-panda' ); ?></th>
						<th class="px-6 py-3"><?php esc_html_e( 'Шаблон темы', 'wp-panda' ); ?></th>
						<th class="hidden px-6 py-3 md:table-cell"><?php esc_html_e( 'Что внутри', 'wp-panda' ); ?></th>
					</tr>
				</thead>
				<tbody>
					<?php foreach ( $wpp_rows as $wpp_row ) : ?>
						<tr class="border-b border-line last:border-0">
							<td class="px-6 py-3.5 font-semibold"><?php echo esc_html( $wpp_row[0] ); ?></td>
							<td class="px-6 py-3.5 font-mono text-xs text-muted"><?php echo esc_html( $wpp_row[1] ); ?></td>
							<td class="px-6 py-3.5 font-mono text-xs"><?php echo esc_html( $wpp_row[2] ); ?></td>
							<td class="hidden px-6 py-3.5 text-muted md:table-cell"><?php echo esc_html( $wpp_row[3] ); ?></td>
						</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
		</div>
	</section>
</div>
<?php
get_footer();
