<?php
/**
 * «Отзывы владельцев сайтов» figures, identical to the layout.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;
$testimonials = array(
	array(
		'products' => 'Vesta + WooBoost',
		'quote'    => '«Перенесли магазин на Vesta за выходные. Скорость выросла вдвое, а плагин WooBoost окупился в первый же день. Поддержка отвечает быстрее, чем я успеваю сварить кофе.»',
		'avatar'   => 'https://images.pexels.com/photos/6497114/pexels-photo-6497114.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=160&h=160',
		'name'     => 'Екатерина Лебедева',
		'role'     => 'Владелица магазина «Лён & Хлопок»',
	),
	array(
		'products' => 'Aurora · 5 сайтов',
		'quote'    => '«Берём лицензии на 5 сайтов для клиентских проектов, а плагины навсегда — идеальная модель. Чистый код, понятная документация и честные обновления.»',
		'avatar'   => 'https://images.pexels.com/photos/14950779/pexels-photo-14950779.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=160&h=160',
		'name'     => 'Артём Николаев',
		'role'     => 'Основатель студии «Пиксель»',
	),
	array(
		'products' => 'Habitat + TurboCache',
		'quote'    => '«Сайт-портфолио с сотнями фото грузится меньше чем за секунду. Плагин один раз купил — и навсегда. Справился без разработчика.»',
		'avatar'   => 'https://images.pexels.com/photos/37273005/pexels-photo-37273005.png?auto=compress&cs=tinysrgb&fit=crop&w=160&h=160',
		'name'     => 'Тимур Алиев',
		'role'     => 'Фотограф, портфолио на Habitat',
	),
);
?>
<section class="mx-auto mt-24 max-w-[1200px] px-4 sm:px-6">
	<div class="flex flex-col gap-4 items-center text-center">
		<div class="max-w-2xl">
			<h2 class="text-3xl font-bold tracking-tight sm:text-[40px] sm:leading-[1.1]"><?php esc_html_e( 'Отзывы владельцев сайтов', 'wp-panda' ); ?></h2>
			<p class="mt-3 text-muted sm:text-[17px]"><?php esc_html_e( 'Реальный опыт людей, которые строят свои проекты на Wp Panda.', 'wp-panda' ); ?></p>
		</div>
	</div>
	<div class="mt-10 grid gap-5 md:grid-cols-3">
		<?php foreach ( $testimonials as $wpp_t ) : ?>
		<figure class="flex flex-col rounded-card border border-line bg-white p-6 shadow-card">
			<div class="flex items-center justify-between gap-2">
				<span class="inline-flex items-center gap-0.5">
					<?php echo wpp_rating_stars(); ?>
				</span>
				<span class="rounded-full bg-soft px-2.5 py-1 text-[11px] font-medium text-muted"><?php echo esc_html( $wpp_t['products'] ); ?></span>
			</div>
			<blockquote class="mt-4 flex-1 text-[15px] leading-relaxed text-ink/85"><?php echo esc_html( $wpp_t['quote'] ); ?></blockquote>
			<figcaption class="mt-6 flex items-center gap-3">
				<img alt="" class="h-11 w-11 rounded-full object-cover" src="<?php echo esc_url( $wpp_t['avatar'] ); ?>">
				<div>
					<div class="text-sm font-semibold"><?php echo esc_html( $wpp_t['name'] ); ?></div>
					<div class="text-xs text-muted"><?php echo esc_html( $wpp_t['role'] ); ?></div>
				</div>
			</figcaption>
		</figure>
		<?php endforeach; ?>
	</div>
</section>
