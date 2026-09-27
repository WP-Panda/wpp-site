<?php
/** Site footer. */

defined( 'ABSPATH' ) || exit;
$shop_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/' );
?>
		<footer class="site-footer">
			<div class="site-footer__inner mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:py-14">
				<div class="site-footer__top">
					<div class="site-footer__brand">
						<a class="site-brand__link" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
							<img class="site-brand__mark" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/panda-mark.svg' ); ?>" width="40" height="40" alt="" aria-hidden="true">
							<span class="site-brand__text"><span class="site-brand__name"><?php bloginfo( 'name' ); ?></span><span class="site-brand__tag">WPP</span></span>
						</a>
						<p><?php esc_html_e( 'Темы и плагины для WordPress — с обновлениями, лицензиями и поддержкой.', 'wp-panda' ); ?></p>
					</div>
					<div class="site-footer__column">
						<h2><?php esc_html_e( 'Покупателям', 'wp-panda' ); ?></h2>
						<ul>
							<li><a href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Каталог', 'wp-panda' ); ?></a></li>
							<?php if ( function_exists( 'wc_get_page_permalink' ) ) : ?>
								<li><a href="<?php echo esc_url( wc_get_page_permalink( 'myaccount' ) ); ?>"><?php esc_html_e( 'Личный кабинет', 'wp-panda' ); ?></a></li>
							<?php endif; ?>
							<li><a href="<?php echo esc_url( home_url( '/faq/' ) ); ?>"><?php esc_html_e( 'Помощь и FAQ', 'wp-panda' ); ?></a></li>
						</ul>
					</div>
					<div class="site-footer__column">
						<h2><?php esc_html_e( 'Разделы', 'wp-panda' ); ?></h2>
						<?php
						wp_nav_menu( array(
							'theme_location' => 'footer',
							'container'      => false,
							'menu_class'     => 'menu site-footer__menu',
							'fallback_cb'    => false,
							'depth'          => 1,
						) );
						?>
					</div>
				</div>
				<div class="site-footer__bottom">
					<p>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. <?php esc_html_e( 'Все права защищены.', 'wp-panda' ); ?></p>
					<a href="<?php echo esc_url( get_privacy_policy_url() ); ?>"><?php esc_html_e( 'Политика конфиденциальности', 'wp-panda' ); ?></a>
				</div>
			</div>
		</footer>
	</div>
</div>
<?php wp_footer(); ?>
</body>
</html>
