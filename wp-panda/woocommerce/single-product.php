<?php
/**
 * Страница товара (override Woo single-product.php) в стиле карточки Wp Panda.
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header( 'shop' );

global $product;

$enable_gallery = $product && $product->is_type( 'variable' );
?>
<div class="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6">
	<?php woocommerce_breadcrumb(); ?>

	<?php while ( have_posts() ) : ?>
		<?php the_post(); ?>
		<div id="product-<?php the_ID(); ?>" <?php wc_product_class( 'mt-6', $product ); ?>>

			<div class="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
				<!-- Медиа -->
				<section class="min-w-0 rounded-card border border-line bg-white p-2 shadow-card" aria-label="<?php esc_attr_e( 'Превью товара', 'wp-panda' ); ?>">
					<?php woocommerce_show_product_images(); ?>
					<div class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 px-2 pb-2 text-xs text-muted">
						<button type="button" data-wish="<?php the_ID(); ?>" aria-pressed="false" class="flex items-center gap-1.5 transition hover:text-ink">
							<?php wpp_icon( 'heart', 'h-4 w-4' ); ?><?php esc_html_e( 'В избранное', 'wp-panda' ); ?>
						</button>
						<span class="sm:ml-auto"><?php esc_html_e( 'Версия', 'wp-panda' ); ?> <?php echo esc_html( get_post_meta( get_the_ID(), '_wpp_version', true ) ? get_post_meta( get_the_ID(), '_wpp_version', true ) : '1.0' ); ?></span>
					</div>
				</section>

				<!-- Панель покупки -->
				<aside aria-label="<?php esc_attr_e( 'Покупка и характеристики товара', 'wp-panda' ); ?>">
					<section class="rounded-card border border-line bg-white p-6 shadow-card">
						<div class="flex items-center justify-between gap-3">
							<h2 class="text-sm font-semibold"><?php echo esc_html( get_post_meta( get_the_ID(), '_wpp_type', true ) === 'plugin' ? __( 'Бессрочная лицензия', 'wp-panda' ) : __( 'Лицензия', 'wp-panda' ) ); ?></h2>
							<?php wpp_icon( 'shield-check', 'h-5 w-5 text-emerald-600' ); ?>
						</div>
						<div class="summary entry-summary mt-4">
							<?php woocommerce_template_single_title(); ?>
							<?php woocommerce_template_single_rating(); ?>
							<?php woocommerce_template_single_price(); ?>
						</div>
						<p class="mt-1 text-xs leading-relaxed text-muted"><?php echo esc_html( get_the_excerpt() ); ?></p>
						<div class="mt-5 border-t border-line pt-5">
							<?php woocommerce_template_single_add_to_cart(); ?>
						</div>
						<ul class="mt-5 space-y-3 border-t border-line pt-5 text-[13px]">
							<?php foreach ( array(
								__( 'Оригинальные файлы продукта', 'wp-panda' ),
								__( 'Обновления из консоли WordPress', 'wp-panda' ),
								__( 'Помощь с установкой и настройкой', 'wp-panda' ),
								__( 'Подробная документация', 'wp-panda' ),
							) as $item ) : ?>
								<li class="flex items-start gap-2.5">
									<?php wpp_icon( 'check', 'mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600' ); ?><span><?php echo esc_html( $item ); ?></span>
								</li>
							<?php endforeach; ?>
						</ul>
						<div class="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted">
							<?php wpp_icon( 'download', 'h-3.5 w-3.5' ); ?><?php esc_html_e( 'Файлы доступны сразу после оплаты', 'wp-panda' ); ?>
						</div>
						<div class="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-[11px] text-muted">
							<span class="flex items-center gap-1"><?php wpp_icon( 'lock-keyhole', 'h-3 w-3' ); ?><?php esc_html_e( 'Безопасная оплата', 'wp-panda' ); ?></span>
							<?php $faq_url = wpp_faq_page_url(); ?>
							<?php if ( $faq_url ) : ?>
								<a href="<?php echo esc_url( $faq_url ); ?>" class="underline underline-offset-4 hover:text-ink"><?php esc_html_e( 'Условия возврата', 'wp-panda' ); ?></a>
							<?php endif; ?>
						</div>
					</section>

					<section id="product-author" class="mt-5 rounded-card border border-line bg-white p-6 shadow-card">
						<div class="flex items-center gap-3">
							<span class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-ink text-2xl font-bold text-brand">P<span class="text-white">.</span></span>
							<div>
								<h2 class="flex items-center gap-1.5 text-base font-bold tracking-tight">
									<?php esc_html_e( 'Wp Panda', 'wp-panda' ); ?>
									<?php wpp_icon( 'badge-check', 'h-4 w-4 text-[#c5940b]' ); ?>
								</h2>
								<p class="mt-0.5 text-xs text-muted"><?php esc_html_e( 'Автор и разработчик продукта', 'wp-panda' ); ?></p>
							</div>
						</div>
					</section>
				</aside>
			</div>

			<!-- Табы: описание / характеристики / отзывы -->
			<div class="mt-12 rounded-card border border-line bg-white p-6 shadow-card sm:p-9">
				<?php woocommerce_output_product_data_tabs(); ?>
			</div>

			<?php
			/**
			 * Связанные товары в карточках темы.
			 */
			$related_limit = 4;
			$related_ids   = array_filter( wc_get_related_products( get_the_ID(), $related_limit ) );
			if ( $related_ids ) :
				$related = array_map( 'wc_get_product', $related_ids );
				?>
				<section class="mt-16 border-t border-line pt-9">
					<div class="flex flex-wrap items-end justify-between gap-4">
						<div>
							<p class="text-xs text-muted"><?php esc_html_e( 'От Wp Panda', 'wp-panda' ); ?></p>
							<h2 class="mt-1 text-2xl font-bold tracking-tight"><?php esc_html_e( 'Другие продукты автора', 'wp-panda' ); ?></h2>
						</div>
					</div>
					<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
						<?php foreach ( $related as $rp ) : ?>
							<?php $rd = wpp_product_data( $rp ); if ( $rd ) wpp_product_card( $rd ); ?>
						<?php endforeach; ?>
					</div>
				</section>
			<?php endif; ?>

			<meta itemprop="url" content="<?php the_permalink(); ?>" />
		</div>
	<?php endwhile; ?>

	<?php do_action( 'woocommerce_after_main_content' ); ?>
</div>
<?php
get_footer( 'shop' );
