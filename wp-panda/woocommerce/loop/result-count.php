<?php
/**
 * Result count line, identical to the layout.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;
?>
<span><?php esc_html_e( 'Найдено', 'wp-panda' ); ?>: <b class="text-ink"><?php echo esc_html( number_format_i18n( (int) wc_get_loop_prop( 'total' ) ) ); ?></b> <?php echo esc_html( _n( 'продукт', 'продуктов', (int) wc_get_loop_prop( 'total' ), 'wp-panda' ) ); ?></span>
