<?php
/**
 * Mobile slide-down menu, identical to the layout.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

$shop_url    = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
$blog_url    = (int) get_option( 'page_for_posts' ) ? get_permalink( (int) get_option( 'page_for_posts' ) ) : home_url( '/blog/' );
$account_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'myaccount' ) : wp_login_url();

$wpp_mobile_items = array(
	array( __( 'Главная', 'wp-panda' ), home_url( '/' ), 'house', is_front_page() ),
	array( __( 'Каталог', 'wp-panda' ), $shop_url, 'layout-grid', function_exists( 'is_woocommerce' ) && ( is_shop() || is_product_taxonomy() || is_product() ) ),
	array( __( 'Блог', 'wp-panda' ), $blog_url, 'newspaper', is_home() || is_singular( 'post' ) || is_category() || is_tag() ),
	array( __( 'База знаний', 'wp-panda' ), home_url( '/kb/' ), 'book-open', wpp_is_kb() ),
	array( __( 'FAQ', 'wp-panda' ), home_url( '/faq/' ), 'circle-question-mark', is_page( 'faq' ) ),
	array( __( 'Личный кабинет', 'wp-panda' ), $account_url, 'user', function_exists( 'is_account_page' ) && is_account_page() ),
);
?>
<div class="wpp-mobile-menu hidden border-t border-line bg-white px-4 pb-5 pt-3 shadow-float lg:hidden" data-mobile-menu>
	<div class="mx-auto grid max-w-[1200px] gap-1.5">
		<?php foreach ( $wpp_mobile_items as $wpp_item ) : ?>
			<a class="flex h-12 items-center gap-3 rounded-full pl-1.5 pr-4 text-left text-[15px] font-semibold <?php echo $wpp_item[3] ? 'bg-ink text-white' : 'hover:bg-soft'; ?>" href="<?php echo esc_url( $wpp_item[1] ); ?>">
				<span class="flex h-9 w-9 items-center justify-center rounded-full <?php echo $wpp_item[3] ? 'bg-brand text-ink' : 'bg-soft'; ?>">
					<?php echo wpp_icon( $wpp_item[2], 'h-4 w-4' ); ?>
				</span>
				<?php echo esc_html( $wpp_item[0] ); ?>
			</a>
		<?php endforeach; ?>
	</div>
</div>
