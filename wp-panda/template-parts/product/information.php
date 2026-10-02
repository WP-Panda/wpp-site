<?php
/**
 * Author, specifications and support blocks of the product sidebar.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

global $product;
$product_id = $product->get_id();
$version    = wpp_product_version( $product );
$wordpress  = get_post_meta( $product_id, '_wpp_requires_wp', true );
$php_req    = get_post_meta( $product_id, '_wpp_requires_php', true );
$compat     = get_post_meta( $product_id, '_wpp_compatibility', true );
$updated    = get_post_meta( $product_id, '_wpp_updated', true );
$tags       = get_the_terms( $product_id, 'product_tag' );
$tag_names  = ( ! is_wp_error( $tags ) && $tags ) ? wp_list_pluck( $tags, 'name' ) : array();
?>
<div class="item-info space-y-7">
	<section id="product-author" class="scroll-mt-24 border-b border-line pb-7">
		<div class="flex items-center gap-3">
			<span class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-ink text-2xl font-bold text-brand"><?php echo esc_html( mb_substr( get_bloginfo( 'name' ), 0, 1 ) ); ?><span class="text-white">.</span></span>
			<div>
				<h2 class="flex items-center gap-1.5 text-base font-bold tracking-tight"><?php echo esc_html( get_bloginfo( 'name' ) ); ?> <?php echo wpp_icon( 'badge-check', 'h-4 w-4 text-[#c5940b]' ); ?></h2>
				<p class="mt-0.5 text-xs text-muted"><?php esc_html_e( 'Автор и разработчик продукта', 'wp-panda' ); ?></p>
			</div>
		</div>
		<a class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] bg-white text-ink border border-line hover:border-ink/25 shadow-[0_1px_2px_rgba(20,20,28,0.05)] h-11 px-5 text-sm mt-4 w-full" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) ); ?>">
			<?php echo wpp_icon( 'layout-grid', 'h-4 w-4' ); ?><?php esc_html_e( 'Все продукты автора', 'wp-panda' ); ?>
		</a>
	</section>
	<section aria-labelledby="product-specs-heading">
		<h2 id="product-specs-heading" class="text-base font-semibold tracking-tight"><?php esc_html_e( 'Информация о продукте', 'wp-panda' ); ?></h2>
		<dl class="mt-4 space-y-3 text-[12px] leading-relaxed">
			<?php if ( $updated ) : ?>
			<div class="grid grid-cols-[116px_minmax(0,1fr)] gap-3">
				<dt class="text-muted"><?php esc_html_e( 'Обновлено', 'wp-panda' ); ?></dt>
				<dd class="break-words font-medium text-ink"><?php echo esc_html( $updated ); ?></dd>
			</div>
			<?php endif; ?>
			<?php if ( $version ) : ?>
			<div class="grid grid-cols-[116px_minmax(0,1fr)] gap-3">
				<dt class="text-muted"><?php esc_html_e( 'Текущая версия', 'wp-panda' ); ?></dt>
				<dd class="break-words font-medium text-ink"><?php echo esc_html( $version ); ?></dd>
			</div>
			<?php endif; ?>
			<?php if ( $wordpress ) : ?>
			<div class="grid grid-cols-[116px_minmax(0,1fr)] gap-3">
				<dt class="text-muted">WordPress</dt>
				<dd class="break-words font-medium text-ink"><?php echo esc_html( $wordpress ); ?></dd>
			</div>
			<?php endif; ?>
			<?php if ( $php_req ) : ?>
			<div class="grid grid-cols-[116px_minmax(0,1fr)] gap-3">
				<dt class="text-muted">PHP</dt>
				<dd class="break-words font-medium text-ink"><?php echo esc_html( $php_req ); ?></dd>
			</div>
			<?php endif; ?>
			<div class="grid grid-cols-[116px_minmax(0,1fr)] gap-3">
				<dt class="text-muted">Gutenberg</dt>
				<dd class="break-words font-medium text-ink"><?php esc_html_e( 'Совместим', 'wp-panda' ); ?></dd>
			</div>
			<?php if ( $compat ) : ?>
			<div class="grid grid-cols-[116px_minmax(0,1fr)] gap-3">
				<dt class="text-muted"><?php esc_html_e( 'Совместимость', 'wp-panda' ); ?></dt>
				<dd class="break-words font-medium text-ink"><?php echo esc_html( $compat ); ?></dd>
			</div>
			<?php endif; ?>
			<div class="grid grid-cols-[116px_minmax(0,1fr)] gap-3">
				<dt class="text-muted"><?php esc_html_e( 'Браузеры', 'wp-panda' ); ?></dt>
				<dd class="break-words font-medium text-ink">Chrome, Firefox, Safari, Edge</dd>
			</div>
			<div class="grid grid-cols-[116px_minmax(0,1fr)] gap-3">
				<dt class="text-muted"><?php esc_html_e( 'Файлы в комплекте', 'wp-panda' ); ?></dt>
				<dd class="break-words font-medium text-ink">PHP, JavaScript, CSS, <?php esc_html_e( 'файлы перевода', 'wp-panda' ); ?></dd>
			</div>
			<div class="grid grid-cols-[116px_minmax(0,1fr)] gap-3">
				<dt class="text-muted"><?php esc_html_e( 'Документация', 'wp-panda' ); ?></dt>
				<dd class="break-words font-medium text-ink"><?php esc_html_e( 'Включена', 'wp-panda' ); ?></dd>
			</div>
		</dl>
		<?php if ( $tag_names ) : ?>
		<div class="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted">
			<span class="font-medium text-ink"><?php esc_html_e( 'Теги:', 'wp-panda' ); ?> </span><?php echo esc_html( implode( ', ', array_merge( array( 'WordPress' ), $tag_names ) ) ); ?>
		</div>
		<?php endif; ?>
	</section>
	<section class="border-t border-line pt-6">
		<h2 class="flex items-center gap-2 text-sm font-semibold">
			<?php echo wpp_icon( 'life-buoy', 'h-4 w-4 text-muted' ); ?> <?php esc_html_e( 'Поддержка по товару', 'wp-panda' ); ?>
		</h2>
		<p class="mt-2 text-xs leading-relaxed text-muted"><?php esc_html_e( 'Вопросы по купленному товару и ответы инженеров хранятся в личном кабинете.', 'wp-panda' ); ?></p>
		<a class="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold underline decoration-brand decoration-2 underline-offset-4" href="<?php echo esc_url( function_exists( 'wc_get_account_endpoint_url' ) ? wc_get_account_endpoint_url( 'support' ) : home_url( '/my-account/' ) ); ?>">
			<?php esc_html_e( 'Задать вопрос в кабинете', 'wp-panda' ); ?>
		</a>
		<div class="mt-3">
			<a class="text-xs text-muted underline underline-offset-4 hover:text-ink" href="<?php echo esc_url( home_url( '/faq/' ) ); ?>"><?php esc_html_e( 'FAQ и условия покупки', 'wp-panda' ); ?></a>
		</div>
	</section>
</div>
