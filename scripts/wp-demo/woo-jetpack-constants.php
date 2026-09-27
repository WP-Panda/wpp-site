<?php
/**
 * Минимальная реализация Automattic\Jetpack\Constants для демо
 * (в монорепо WooCommerce нет Composer-пакета automattic/jetpack-constants).
 */
namespace Automattic\Jetpack;

if ( ! class_exists( Constants::class ) ) {
	/**
	 * Статический доступ к константам (API совместим с jetpack-constants).
	 */
	class Constants {
		private static $constants = array();

		public static function set_constant( $name, $value ) {
			self::$constants[ $name ] = $value;
		}
		public static function is_defined( $name ) {
			return defined( $name ) || isset( self::$constants[ $name ] );
		}
		public static function get_constant( $name, $default = null ) {
			if ( isset( self::$constants[ $name ] ) ) {
				return self::$constants[ $name ];
			}
			return defined( $name ) ? constant( $name ) : $default;
		}
		public static function is_true( $name ) {
			return defined( $name ) && (bool) constant( $name );
		}
		public static function has_constant( $name ) {
			return self::is_defined( $name );
		}
		public static function clear_single_constant( $name ) {
			unset( self::$constants[ $name ] );
		}
		public static function clear_constants() {
			self::$constants = array();
		}
		public static function get_all_constants() {
			return self::$constants;
		}
	}
}

if ( ! class_exists( Config::class ) ) {
	/**
	 * Заглушка Automattic\Jetpack\Config: подключение Jetpack в демо всегда неактивно.
	 */
	class Config {
		public function ensure( $section, $section_options = array() ) {
			return true;
		}
	}
}
