<?php
/**
 * Wp Panda theme bootstrap.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

define( 'WPP_THEME_VERSION', '2.0.0' );

require_once get_template_directory() . '/inc/icons.php';
require_once get_template_directory() . '/inc/template-tags.php';
require_once get_template_directory() . '/inc/setup.php';
require_once get_template_directory() . '/inc/woocommerce.php';
require_once get_template_directory() . '/inc/account.php';
require_once get_template_directory() . '/inc/demo-content.php';
