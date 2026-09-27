<?php
/**
 * Универсальный шаблон WooCommerce (woocommerce.php).
 *
 * Единственный шаблон Woo в теме: весь внешний вид настраивается
 * хуками и фильтрами в inc/woo.php — переопределений шаблонов нет.
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header( 'shop' );
?>
<div class="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6">
	<?php woocommerce_content(); ?>
</div>
<?php
get_footer( 'shop' );
