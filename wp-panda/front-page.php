<?php
/** Front page based on the Wp Panda landing-page layout. */
get_header();
$shop_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : '';
if ( ! $shop_url ) {
	$shop_url = home_url( '/' );
}
$faq_page_id = function_exists( 'wpp_demo_find_post_id' ) ? wpp_demo_find_post_id( 'page', 'page:faq' ) : 0;
$faq_url = $faq_page_id ? get_permalink( $faq_page_id ) : home_url( '/faq/' );
$featured_query = null;

if ( class_exists( 'WooCommerce' ) ) {
	$featured_query = new WP_Query( array(
		'post_type'           => 'product',
		'post_status'         => 'publish',
		'posts_per_page'      => 4,
		'ignore_sticky_posts' => true,
		'meta_key'            => 'total_sales',
		'orderby'             => 'meta_value_num',
		'order'               => 'DESC',
	) );
}
?>
<main id="primary" class="site-main fade-in flex-1">
	<section class="panda-hero relative isolate overflow-hidden border-b border-line">
		<div class="panda-hero__glow" aria-hidden="true"></div>
		<div class="panda-hero__content mx-auto grid max-w-[1200px] items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:px-6 lg:py-20">
			<div class="fade-up max-w-[570px]">
				<div class="hero-eyebrow"><span class="hero-eyebrow__dot"></span><?php esc_html_e( 'Темы и плагины для WordPress', 'wp-panda' ); ?></div>
				<h1 class="hero-title">Wp Panda<span>.</span></h1>
				<p class="hero-lead"><?php esc_html_e( 'Всё для WordPress в одном месте. Темы для сайтов и магазинов, плагины с лицензией и поддержкой.', 'wp-panda' ); ?></p>
				<div class="hero-actions">
					<a class="button button--brand button--large" href="<?php echo esc_url( $shop_url ); ?>">
						<?php esc_html_e( 'Смотреть каталог', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</a>
					<a class="button button--light button--large" href="<?php echo esc_url( $faq_url ); ?>"><?php esc_html_e( 'Как это работает', 'wp-panda' ); ?></a>
				</div>
				<ul class="hero-benefits">
					<li><?php echo wpp_icon( 'check', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> <?php esc_html_e( 'Автообновления', 'wp-panda' ); ?></li>
					<li><?php echo wpp_icon( 'check', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> <?php esc_html_e( 'Безопасная оплата', 'wp-panda' ); ?></li>
					<li><?php echo wpp_icon( 'check', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> <?php esc_html_e( 'Помощь специалистов', 'wp-panda' ); ?></li>
				</ul>
			</div>
			<div class="hero-art" aria-hidden="true">
				<div class="hero-art__orb hero-art__orb--one"></div>
				<div class="hero-art__orb hero-art__orb--two"></div>
				<div class="hero-art__window">
					<div class="hero-art__window-bar"><span></span><span></span><span></span><b>wp-panda.pro</b></div>
					<div class="hero-art__mock-site">
						<div class="hero-art__mock-header"><i></i><span></span><span></span><span></span></div>
						<div class="hero-art__mock-copy"><i></i><b></b><b></b><span></span><span></span><em></em></div>
						<div class="hero-art__mock-card"><i></i><span></span><span></span><b></b></div>
					</div>
					<div class="hero-art__badge"><span>✦</span><div><strong><?php esc_html_e( 'Создано для WordPress', 'wp-panda' ); ?></strong><small><?php esc_html_e( 'Понятно. Быстро. Надёжно.', 'wp-panda' ); ?></small></div></div>
				</div>
			</div>
		</div>
	</section>

	<?php if ( have_posts() ) : ?>
		<?php while ( have_posts() ) : the_post(); ?>
			<?php if ( trim( wp_strip_all_tags( get_the_content() ) ) ) : ?>
				<section class="front-page-editor-content mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
					<div class="entry-content prose-content"><?php the_content(); ?></div>
				</section>
			<?php endif; ?>
		<?php endwhile; ?>
	<?php endif; ?>

	<section class="home-section mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-20">
		<header class="section-heading">
			<div><p class="eyebrow"><?php esc_html_e( 'Подборка Wp Panda', 'wp-panda' ); ?></p><h2><?php esc_html_e( 'Популярное на этой неделе', 'wp-panda' ); ?></h2><p><?php esc_html_e( 'Выберите решение для своего сайта и добавьте его в корзину.', 'wp-panda' ); ?></p></div>
			<a class="text-link" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Весь каталог', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
		</header>
		<?php if ( $featured_query && $featured_query->have_posts() ) : ?>
			<?php wpp_render_product_cards( $featured_query, 4 ); ?>
		<?php else : ?>
			<div class="empty-state">
				<h3><?php esc_html_e( 'Каталог готов к наполнению', 'wp-panda' ); ?></h3>
				<p><?php esc_html_e( 'Добавьте свои товары или импортируйте каталог из демо-верстки через инструменты темы.', 'wp-panda' ); ?></p>
				<?php if ( current_user_can( 'manage_options' ) ) : ?><a class="button button--brand" href="<?php echo esc_url( admin_url( 'tools.php?page=wpp-demo-content' ) ); ?>"><?php esc_html_e( 'Импортировать демо-контент', 'wp-panda' ); ?></a><?php endif; ?>
				<?php if ( current_user_can( 'manage_woocommerce' ) ) : ?><a class="button button--dark" href="<?php echo esc_url( admin_url( 'post-new.php?post_type=product' ) ); ?>"><?php esc_html_e( 'Добавить товар', 'wp-panda' ); ?></a><?php endif; ?>
			</div>
		<?php endif; ?>
	</section>

	<?php if ( class_exists( 'WooCommerce' ) ) : ?>
		<?php
		$product_categories = get_terms( array(
			'taxonomy'   => 'product_cat',
			'hide_empty' => true,
			'number'     => 3,
			'exclude'    => array( (int) get_option( 'default_product_cat', 0 ) ),
		) );
		?>
		<?php if ( ! is_wp_error( $product_categories ) && $product_categories ) : ?>
			<section class="home-categories mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 lg:pb-20">
				<header class="section-heading"><div><p class="eyebrow"><?php esc_html_e( 'Найдите своё', 'wp-panda' ); ?></p><h2><?php esc_html_e( 'Каталог по категориям', 'wp-panda' ); ?></h2></div></header>
				<div class="category-grid">
					<?php foreach ( $product_categories as $category ) : ?>
						<?php $category_link = get_term_link( $category ); ?>
						<?php if ( ! is_wp_error( $category_link ) ) : ?>
							<a class="category-tile" href="<?php echo esc_url( $category_link ); ?>">
								<span class="category-tile__count"><?php echo esc_html( number_format_i18n( $category->count ) ); ?> <?php esc_html_e( 'товаров', 'wp-panda' ); ?></span>
								<strong><?php echo esc_html( $category->name ); ?></strong>
								<span class="category-tile__arrow"><?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
							</a>
						<?php endif; ?>
					<?php endforeach; ?>
				</div>
			</section>
		<?php endif; ?>
	<?php endif; ?>

	<section class="home-trust">
		<div class="mx-auto grid max-w-[1200px] gap-5 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:py-14">
			<div class="trust-item"><span class="trust-item__icon">01</span><div><h3><?php esc_html_e( 'Установка без лишних шагов', 'wp-panda' ); ?></h3><p><?php esc_html_e( 'Понятная документация поможет быстро запустить продукт.', 'wp-panda' ); ?></p></div></div>
			<div class="trust-item"><span class="trust-item__icon">02</span><div><h3><?php esc_html_e( 'Обновления и поддержка', 'wp-panda' ); ?></h3><p><?php esc_html_e( 'Покупка включает доступ к актуальным версиям и помощи команды.', 'wp-panda' ); ?></p></div></div>
			<div class="trust-item"><span class="trust-item__icon">03</span><div><h3><?php esc_html_e( 'Совместимость с WooCommerce', 'wp-panda' ); ?></h3><p><?php esc_html_e( 'Магазин использует штатные механизмы WordPress и WooCommerce.', 'wp-panda' ); ?></p></div></div>
		</div>
	</section>

	<?php
	$recent_posts = new WP_Query( array(
		'post_type'           => 'post',
		'post_status'         => 'publish',
		'posts_per_page'      => 3,
		'ignore_sticky_posts' => true,
	) );
	?>
	<?php if ( $recent_posts->have_posts() ) : ?>
		<section class="home-section mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-20">
			<header class="section-heading"><div><p class="eyebrow"><?php esc_html_e( 'Полезное', 'wp-panda' ); ?></p><h2><?php esc_html_e( 'Журнал Wp Panda', 'wp-panda' ); ?></h2><p><?php esc_html_e( 'Практические инструкции и новости WordPress.', 'wp-panda' ); ?></p></div><?php if ( get_option( 'page_for_posts' ) ) : ?><a class="text-link" href="<?php echo esc_url( get_permalink( (int) get_option( 'page_for_posts' ) ) ); ?>"><?php esc_html_e( 'Все статьи', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a><?php endif; ?></header>
			<div class="editorial-grid editorial-grid--three">
				<?php while ( $recent_posts->have_posts() ) : $recent_posts->the_post(); ?>
					<?php get_template_part( 'template-parts/content', 'post' ); ?>
				<?php endwhile; ?>
			</div>
			<?php wp_reset_postdata(); ?>
		</section>
	<?php endif; ?>
</main>
<?php get_footer(); ?>
