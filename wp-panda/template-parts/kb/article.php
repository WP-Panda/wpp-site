<?php
/**
 * Knowledge base article with the category sidebar of the layout.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$wpp_post_id  = get_the_ID();
$wpp_category = (string) get_post_meta( $wpp_post_id, '_wpp_kb_category', true );
$wpp_read     = (int) get_post_meta( $wpp_post_id, '_wpp_demo_read_time', true );
$wpp_kb_root  = wpp_demo_find_post_id( 'kb', 'kb:index' );

$wpp_group_icons = array(
	__( 'Начало работы', 'wp-panda' )       => 'rocket',
	__( 'Активация и ключи', 'wp-panda' )   => 'key-round',
	__( 'Обновления и ошибки', 'wp-panda' ) => 'refresh-cw',
	__( 'Настройка тем', 'wp-panda' )       => 'palette',
	__( 'Плагины навсегда', 'wp-panda' )    => 'plug',
	__( 'WooCommerce', 'wp-panda' )         => 'shopping-bag',
	__( 'Оплата и возвраты', 'wp-panda' )   => 'credit-card',
	__( 'Разработчикам', 'wp-panda' )       => 'code',
);

$wpp_siblings = get_posts( array(
	'post_type'      => 'page',
	'post_parent'    => $wpp_kb_root,
	'posts_per_page' => -1,
	'post_status'    => 'publish',
) );
$wpp_groups = array();
foreach ( $wpp_siblings as $wpp_sibling ) {
	$wpp_groups[ (string) get_post_meta( $wpp_sibling->ID, '_wpp_kb_category', true ) ][] = $wpp_sibling;
}
?>
<div class="mx-auto max-w-[1200px] px-4 pt-6 sm:px-6">
	<nav class="flex flex-wrap items-center gap-1.5 text-xs text-muted" aria-label="<?php esc_attr_e( 'Хлебные крошки', 'wp-panda' ); ?>">
		<a class="transition hover:text-ink" href="<?php echo esc_url( $wpp_kb_root ? get_permalink( $wpp_kb_root ) : home_url( '/kb/' ) ); ?>"><?php esc_html_e( 'База знаний', 'wp-panda' ); ?></a>
		<?php echo wpp_icon( 'chevron-right', 'h-3 w-3 text-line' ); ?>
		<span class="transition"><?php echo esc_html( $wpp_category ); ?></span>
		<?php echo wpp_icon( 'chevron-right', 'h-3 w-3 text-line' ); ?>
		<span class="font-medium text-ink"><?php the_title(); ?></span>
	</nav>
	<div class="mt-6 grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_210px]">
		<aside class="hidden lg:sticky lg:top-24 lg:block">
			<div class="rounded-card border border-line bg-white p-2 shadow-card">
				<?php foreach ( $wpp_groups as $wpp_group_cat => $wpp_articles ) :
					$wpp_group_active = $wpp_group_cat === $wpp_category;
					$wpp_group_icon   = isset( $wpp_group_icons[ $wpp_group_cat ] ) ? $wpp_group_icons[ $wpp_group_cat ] : 'book-open';
					?>
					<div>
						<button class="flex w-full items-center gap-3 rounded-full py-1.5 pl-1.5 pr-3 text-left text-sm font-semibold transition hover:bg-soft">
							<span class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full <?php echo $wpp_group_active ? 'bg-brand' : 'bg-soft'; ?>"><?php echo wpp_icon( $wpp_group_icon, 'h-4 w-4' ); ?></span>
							<span class="flex-1 leading-tight"><?php echo esc_html( $wpp_group_cat ); ?></span>
							<?php echo wpp_icon( 'chevron-down', 'h-3.5 w-3.5 text-muted ' . ( $wpp_group_active ? 'rotate-180' : '' ) ); ?>
						</button>
						<?php if ( $wpp_group_active ) : ?>
							<div class="mb-2 ml-5 mt-1 space-y-0.5 border-l border-line pl-3">
								<?php foreach ( $wpp_articles as $wpp_article ) :
									$wpp_article_active = (int) $wpp_article->ID === $wpp_post_id;
									?>
									<a class="block w-full rounded-2xl px-3 py-1.5 text-left text-[13px] leading-snug transition <?php echo $wpp_article_active ? 'bg-ink font-semibold text-white' : 'text-ink/70 hover:bg-soft hover:text-ink'; ?>" href="<?php echo esc_url( get_permalink( $wpp_article ) ); ?>"><?php echo esc_html( get_the_title( $wpp_article ) ); ?></a>
								<?php endforeach; ?>
							</div>
						<?php endif; ?>
					</div>
				<?php endforeach; ?>
			</div>
		</aside>
		<article class="min-w-0 text-ink/85">
			<div class="flex flex-wrap items-center gap-2">
				<span class="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-ink ring-1 ring-brand-100"><?php echo esc_html( $wpp_category ); ?></span>
				<span class="text-xs text-muted"><?php echo esc_html( sprintf( __( 'Обновлено %s', 'wp-panda' ), wpp_human_date( (int) get_post_modified_time( 'U', true ) ) ) ); ?><?php echo $wpp_read ? ' · ' . esc_html( sprintf( _n( '%s мин чтения', '%s мин чтения', $wpp_read, 'wp-panda' ), $wpp_read ) ) : ''; ?></span>
			</div>
			<h1 class="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[44px] sm:leading-[1.1]"><?php the_title(); ?></h1>
			<p class="mt-4 text-lg text-muted"><?php echo esc_html( wp_strip_all_tags( get_the_excerpt() ) ); ?></p>
			<div class="mt-2 text-[15px] leading-[1.85]"><?php the_content(); ?></div>
			<div class="mt-10 flex items-center justify-between gap-4 rounded-card border border-line bg-white p-5 shadow-card">
				<div class="text-sm font-semibold"><?php esc_html_e( 'Статья помогла?', 'wp-panda' ); ?></div>
				<div class="flex gap-2">
					<button type="button" class="inline-flex h-10 items-center gap-1.5 rounded-full border border-line bg-soft px-4 text-[13px] font-semibold transition hover:border-emerald-300 hover:bg-emerald-50"><?php echo wpp_icon( 'thumbs-up', 'h-4 w-4' ); ?><?php esc_html_e( 'Да', 'wp-panda' ); ?></button>
					<button type="button" class="inline-flex h-10 items-center gap-1.5 rounded-full border border-line bg-soft px-4 text-[13px] font-semibold transition hover:border-rose-300 hover:bg-rose-50"><?php echo wpp_icon( 'thumbs-down', 'h-4 w-4' ); ?><?php esc_html_e( 'Нет', 'wp-panda' ); ?></button>
				</div>
			</div>
		</article>
		<aside class="hidden xl:block lg:sticky lg:top-24">
			<div class="dark-card rounded-card p-5 text-white">
				<span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand text-ink"><?php echo wpp_icon( 'headphones', 'h-5 w-5' ); ?></span>
				<div class="mt-4 font-semibold"><?php esc_html_e( 'Нужна помощь?', 'wp-panda' ); ?></div>
				<p class="mt-1 text-sm text-white/65"><?php esc_html_e( 'Создайте тикет — команда ответит в кабинете.', 'wp-panda' ); ?></p>
				<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-brand text-ink hover:bg-brand-600 shadow-glow h-9 px-4 text-[13px] mt-4 w-full" href="<?php echo esc_url( is_user_logged_in() ? wc_get_account_endpoint_url( 'new-ticket' ) : home_url( '/my-account/' ) ); ?>"><?php esc_html_e( 'Новый тикет', 'wp-panda' ); ?></a>
			</div>
		</aside>
	</div>
</div>
