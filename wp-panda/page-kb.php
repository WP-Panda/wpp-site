<?php
/**
 * Template Name: База знаний
 *
 * Knowledge base index identical to the supplied layout.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

get_header();

$wpp_data = function_exists( 'wpp_demo_data' ) ? wpp_demo_data() : array();
$wpp_kb   = isset( $wpp_data['kb_articles'] ) ? (array) $wpp_data['kb_articles'] : array();

$wpp_groups = array();
foreach ( $wpp_kb as $wpp_article ) {
	$wpp_groups[ $wpp_article['category'] ][] = $wpp_article;
}

$wpp_group_meta = array(
	__( 'Начало работы', 'wp-panda' )       => array( 'rocket', __( 'Установка, демо-контент, требования', 'wp-panda' ) ),
	__( 'Активация и ключи', 'wp-panda' )   => array( 'key-round', __( 'Ключи, домены, 1 или 5 сайтов', 'wp-panda' ) ),
	__( 'Обновления и ошибки', 'wp-panda' ) => array( 'refresh-cw', __( 'Автообновления, откат, белый экран', 'wp-panda' ) ),
	__( 'Настройка тем', 'wp-panda' )       => array( 'palette', __( 'Шапка, шрифты, цвета, дочерняя тема', 'wp-panda' ) ),
	__( 'Плагины навсегда', 'wp-panda' )    => array( 'plug', __( 'SEO, кэш, безопасность, формы', 'wp-panda' ) ),
	__( 'WooCommerce', 'wp-panda' )         => array( 'shopping-bag', __( 'Оплата, доставка, чекаут', 'wp-panda' ) ),
	__( 'Оплата и возвраты', 'wp-panda' )   => array( 'credit-card', __( 'Счета, возвраты, документы', 'wp-panda' ) ),
	__( 'Разработчикам', 'wp-panda' )       => array( 'code', __( 'Хуки, REST API, интеграции', 'wp-panda' ) ),
);

$wpp_chips = array(
	array( __( 'Активация ключа', 'wp-panda' ), 'license-key' ),
	array( __( 'Импорт демо', 'wp-panda' ), 'demo-import' ),
	array( __( 'Белый экран', 'wp-panda' ), 'white-screen' ),
	array( __( 'Дочерняя тема', 'wp-panda' ), 'child-theme' ),
);
?>
<div class="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12">
	<div class="fade-up mx-auto max-w-2xl text-center">
		<div class="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium shadow-card">
			<span class="h-1.5 w-1.5 rounded-full bg-brand"></span><?php esc_html_e( 'Документация и инструкции', 'wp-panda' ); ?>
		</div>
		<h1 class="text-4xl font-bold tracking-tight sm:text-[52px] sm:leading-[1.08]"><?php the_title(); ?></h1>
		<p class="mt-4 text-base text-muted sm:text-lg"><?php esc_html_e( 'Ответы на частые вопросы, инструкции по установке и настройке тем и плагинов Wp Panda.', 'wp-panda' ); ?></p>
		<div class="relative mx-auto mt-8 max-w-2xl text-left">
			<form class="flex items-center gap-2 rounded-full border border-line bg-white p-2 pl-5 shadow-card transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
				<?php echo wpp_icon( 'search', 'h-4 w-4 flex-shrink-0 text-muted' ); ?>
				<input name="s" placeholder="<?php esc_attr_e( 'Например: как активировать ключ', 'wp-panda' ); ?>" class="h-11 min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted/70" value="">
				<button type="submit" class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-brand text-ink hover:bg-brand-600 shadow-glow text-sm h-12 px-6"><?php esc_html_e( 'Найти', 'wp-panda' ); ?></button>
			</form>
		</div>
		<div class="mt-4 flex flex-wrap justify-center gap-2">
			<?php foreach ( $wpp_chips as $wpp_chip ) :
				$wpp_chip_id = wpp_demo_find_post_id( 'kb', 'kb:' . $wpp_chip[1] );
				if ( ! $wpp_chip_id ) {
					continue;
				}
				?>
				<a class="rounded-full bg-soft px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-brand-50 hover:text-ink" href="<?php echo esc_url( get_permalink( $wpp_chip_id ) ); ?>"><?php echo esc_html( $wpp_chip[0] ); ?></a>
			<?php endforeach; ?>
		</div>
	</div>

	<section class="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		<?php foreach ( $wpp_groups as $wpp_cat => $wpp_articles ) :
			$wpp_meta = isset( $wpp_group_meta[ $wpp_cat ] ) ? $wpp_group_meta[ $wpp_cat ] : array( 'book-open', '' );
			?>
			<div class="flex flex-col rounded-card border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-float">
				<div class="flex items-center justify-between">
					<span class="flex flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-ink ring-1 ring-brand-100 h-12 w-12"><?php echo wpp_icon( $wpp_meta[0], 'h-5 w-5' ); ?></span>
					<span class="rounded-full bg-soft px-2.5 py-1 text-[11px] font-semibold text-muted"><?php echo esc_html( sprintf( _n( '%s статья', '%s статей', count( $wpp_articles ), 'wp-panda' ), number_format_i18n( count( $wpp_articles ) ) ) ); ?></span>
				</div>
				<h3 class="mt-5 text-lg font-semibold tracking-tight"><?php echo esc_html( $wpp_cat ); ?></h3>
				<p class="mt-1 text-sm text-muted"><?php echo esc_html( $wpp_meta[1] ); ?></p>
				<ul class="mt-4 flex-1 space-y-2 border-t border-line pt-4">
					<?php foreach ( array_slice( $wpp_articles, 0, 3 ) as $wpp_article ) :
						$wpp_article_id = wpp_demo_find_post_id( 'kb', $wpp_article['key'] );
						$wpp_url        = $wpp_article_id ? get_permalink( $wpp_article_id ) : '#';
						?>
						<li><a class="flex w-full items-start gap-2 text-left text-sm text-ink/80 transition hover:text-ink" href="<?php echo esc_url( $wpp_url ); ?>"><?php echo wpp_icon( 'chevron-right', 'mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-brand' ); ?><?php echo esc_html( $wpp_article['title'] ); ?></a></li>
					<?php endforeach; ?>
				</ul>
			</div>
		<?php endforeach; ?>
	</section>
</div>
<?php
get_footer();
