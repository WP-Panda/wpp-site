<?php
/**
 * Design settings drawer: color schemes and corner presets.
 * The choice is stored in localStorage and applied before first paint.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$wpp_schemes = array(
	'golden'   => array( __( 'Золотая', 'wp-panda' ), __( 'Фирменная палитра', 'wp-panda' ), array( '#ffc21f', '#f5b000', '#fff8e4' ) ),
	'mint'     => array( __( 'Мятная', 'wp-panda' ), __( 'Свежесть и спокойствие', 'wp-panda' ), array( '#2fbf8f', '#25a87b', '#d3f4e4' ) ),
	'ocean'    => array( __( 'Океан', 'wp-panda' ), __( 'Чисто и тихо', 'wp-panda' ), array( '#38a3f1', '#2b8fd8', '#d5ecff' ) ),
	'powder'   => array( __( 'Пудровая', 'wp-panda' ), __( 'Мягко и тепло', 'wp-panda' ), array( '#e08b6d', '#cf7a5c', '#fadfd5' ) ),
	'lavender' => array( __( 'Лаванда', 'wp-panda' ), __( 'Нежно и современно', 'wp-panda' ), array( '#a78bfa', '#9273f0', '#e7ddff' ) ),
	'rose'     => array( __( 'Роза', 'wp-panda' ), __( 'Ярко и смело', 'wp-panda' ), array( '#f472b6', '#e85aa8', '#fbdcec' ) ),
	'royal'    => array( __( 'Королевская', 'wp-panda' ), __( 'Благородная роскошь', 'wp-panda' ), array( '#b08a2e', '#97741f', '#f2e8c9' ) ),
	'frost'    => array( __( 'Мороз', 'wp-panda' ), __( 'Свежо и ледяно', 'wp-panda' ), array( '#3ecfdb', '#2bb8c6', '#d8f9fb' ) ),
	'forest'   => array( __( 'Лес', 'wp-panda' ), __( 'Глубоко и природно', 'wp-panda' ), array( '#2f9e44', '#268439', '#d5f5dd' ) ),
	'night'    => array( __( 'Ночь', 'wp-panda' ), __( 'Тёмная тема', 'wp-panda' ), array( '#facc15', '#232329', '#3a3a42' ) ),
);
$wpp_corners = array(
	'strong' => array( __( 'Сильные', 'wp-panda' ), __( 'Мягкие формы', 'wp-panda' ), '14px' ),
	'light'  => array( __( 'Лёгкие', 'wp-panda' ), __( 'Сдержанные', 'wp-panda' ), '6px' ),
	'none'   => array( __( 'Прямые', 'wp-panda' ), __( 'Строгая геометрия', 'wp-panda' ), '0px' ),
);
?>
<button type="button" data-design-trigger aria-label="<?php esc_attr_e( 'Настройки дизайна', 'wp-panda' ); ?>" class="wpp-design-trigger inline-flex select-none items-center gap-2.5 rounded-full bg-ink py-2.5 pl-3 pr-5 text-sm font-semibold text-white shadow-float transition hover:-translate-y-1">
	<span class="flex -space-x-2">
		<span class="h-4 w-4 rounded-full ring-2 ring-ink" style="background:var(--color-brand)"></span>
		<span class="h-4 w-4 rounded-full ring-2 ring-ink" style="background:var(--color-brand-600)"></span>
		<span class="h-4 w-4 rounded-full ring-2 ring-ink" style="background:var(--color-brand-50)"></span>
	</span>
	<?php esc_html_e( 'Дизайн', 'wp-panda' ); ?>
</button>
<div class="wpp-design-backdrop" data-design-backdrop></div>
<aside class="wpp-design-drawer" data-design-drawer aria-label="<?php esc_attr_e( 'Настройки дизайна', 'wp-panda' ); ?>">
	<div class="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
		<div>
			<h2 class="text-xl font-bold tracking-tight"><?php esc_html_e( 'Настройки дизайна', 'wp-panda' ); ?></h2>
			<p class="mt-1 text-xs text-muted"><?php esc_html_e( 'Ваш выбор сохранится для следующего визита', 'wp-panda' ); ?></p>
		</div>
		<button type="button" data-design-close aria-label="<?php esc_attr_e( 'Закрыть', 'wp-panda' ); ?>" class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-soft text-ink/60 transition hover:text-ink"><?php echo wpp_icon( 'x', 'h-4 w-4' ); ?></button>
	</div>
	<div class="flex-1 overflow-y-auto px-6 py-5">
		<div class="text-[11px] font-semibold uppercase tracking-wider text-muted"><?php echo esc_html( sprintf( __( 'Схема цвета · %d', 'wp-panda' ), count( $wpp_schemes ) ) ); ?></div>
		<div class="mt-3 grid grid-cols-2 gap-2.5">
			<?php foreach ( $wpp_schemes as $wpp_key => $wpp_scheme ) : ?>
				<button type="button" data-design-scheme="<?php echo esc_attr( $wpp_key ); ?>" data-design-name="<?php echo esc_attr( $wpp_scheme[0] ); ?>" class="flex items-center gap-2.5 rounded-2xl border border-line bg-white p-3 text-left transition hover:border-ink/20">
					<span class="flex -space-x-2 flex-shrink-0">
						<?php foreach ( $wpp_scheme[2] as $wpp_dot ) : ?>
							<span class="h-3.5 w-3.5 rounded-full ring-1 ring-black/5" style="background:<?php echo esc_attr( $wpp_dot ); ?>"></span>
						<?php endforeach; ?>
					</span>
					<span class="min-w-0">
						<span class="block truncate text-[13px] font-semibold"><?php echo esc_html( $wpp_scheme[0] ); ?></span>
						<span class="block truncate text-[11px] text-muted"><?php echo esc_html( $wpp_scheme[1] ); ?></span>
					</span>
				</button>
			<?php endforeach; ?>
		</div>
		<div class="mt-6 text-[11px] font-semibold uppercase tracking-wider text-muted"><?php esc_html_e( 'Углы', 'wp-panda' ); ?></div>
		<div class="mt-3 grid grid-cols-3 gap-2.5">
			<?php foreach ( $wpp_corners as $wpp_ckey => $wpp_corner ) : ?>
				<button type="button" data-design-corners="<?php echo esc_attr( $wpp_ckey ); ?>" class="flex flex-col items-center gap-2 rounded-2xl border border-line bg-white p-3 text-center transition hover:border-ink/20">
					<span class="flex h-9 w-14 items-center justify-center border-2 border-ink" style="border-radius:<?php echo esc_attr( $wpp_corner[2] ); ?>"></span>
					<span class="text-[13px] font-semibold"><?php echo esc_html( $wpp_corner[0] ); ?></span>
					<span class="text-[11px] text-muted"><?php echo esc_html( $wpp_corner[1] ); ?></span>
				</button>
			<?php endforeach; ?>
		</div>
		<p class="mt-6 rounded-2xl bg-soft px-4 py-3 text-xs leading-relaxed text-muted"><?php esc_html_e( 'Выбранная палитра применяется мгновенно ко всему сайту: кнопки, акценты, бейджи и подсветка.', 'wp-panda' ); ?></p>
	</div>
	<div class="flex items-center justify-between gap-3 border-t border-line px-6 py-4">
		<span class="flex items-center gap-2 text-sm font-semibold">
			<span class="flex -space-x-2">
				<span class="h-3.5 w-3.5 rounded-full ring-1 ring-black/5" style="background:var(--color-brand)"></span>
				<span class="h-3.5 w-3.5 rounded-full ring-1 ring-black/5" style="background:var(--color-brand-600)"></span>
				<span class="h-3.5 w-3.5 rounded-full ring-1 ring-black/5" style="background:var(--color-brand-50)"></span>
			</span>
			<span data-design-current><?php esc_html_e( 'Золотая', 'wp-panda' ); ?></span>
		</span>
		<button type="button" data-design-close class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-11 px-6 text-sm"><?php esc_html_e( 'Готово', 'wp-panda' ); ?></button>
	</div>
</aside>
