<?php
/**
 * Минимальный автозагрузчик WooCommerce для демо-окружения (без Composer).
 * Покрывает: Automattic\WooCommerce\* -> src/, Automattic\WooCommerce\Vendor\* -> lib/packages/.
 */

spl_autoload_register( function ( $class ) {
	$prefix = 'Automattic\\WooCommerce\\';
	if ( 0 !== strpos( $class, $prefix ) ) {
		return;
	}
	$rel = substr( $class, strlen( $prefix ) );
	// REST API v2 живёт в includes/rest-api (класс Server и контроллеры).
	if ( 0 === strpos( $rel, 'RestApi\\' ) ) {
		$file = __DIR__ . '/../includes/rest-api/' . str_replace( '\\', '/', substr( $rel, strlen( 'RestApi\\' ) ) ) . '.php';
	} elseif ( 0 === strpos( $rel, 'Vendor\\' ) ) {
		$file = __DIR__ . '/../lib/packages/' . str_replace( '\\', '/', substr( $rel, strlen( 'Vendor\\' ) ) ) . '.php';
	} else {
		$file = __DIR__ . '/../src/' . str_replace( '\\', '/', $rel ) . '.php';
	}
	if ( is_readable( $file ) ) {
		require $file;
	}
} );

// Собранный wc-admin в исходниках монорепо отсутствует (includes/react-admin — артефакт сборки).
// Определённая заранее версия заставляет Admin\Composer\Package::init() выйти рано —
// React-админка не инициализируется, фронт и классический wp-admin не затронуты.
if ( ! defined( 'WC_ADMIN_VERSION_NUMBER' ) ) {
	define( 'WC_ADMIN_VERSION_NUMBER', '11.1.2' );
}

require __DIR__ . '/jetpack-constants.php';
require __DIR__ . '/jetpack-connection.php';
require __DIR__ . '/block-scanner.php';

// WC_Admin_Settings нужен на фронте (Logging Settings::get_default_handler),
// но в монорепо грузится только в wp-admin — предзагружаем вручную.
require_once __DIR__ . '/../includes/admin/class-wc-admin-settings.php';

return true;
