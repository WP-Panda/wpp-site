<?php
/**
 * Минимальная реализация Automattic\Jetpack\Connection\Manager для демо
 * (Jetpack-пакет отсутствует в монорепо WooCommerce; соединение всегда неактивно).
 */
namespace Automattic\Jetpack\Connection;

if ( ! class_exists( Manager::class ) ) {
	/**
	 * Заглушка менеджера подключения к Jetpack.
	 */
	class Manager {
		protected $slug;

		public function __construct( $slug = '' ) {
			$this->slug = $slug;
		}
		public function is_connected() {
			return false;
		}
		public function is_active() {
			return false;
		}
		public function is_registered() {
			return false;
		}
		public function is_user_connected( $user_id = false ) {
			return false;
		}
		public function get_connected_user_data( $user_id = false ) {
			return false;
		}
		public function get_active_user() {
			return null;
		}
		public function get_connection_owner_id() {
			return 0;
		}
		public function has_connected_owner() {
			return false;
		}
		public function should_reconnect() {
			return false;
		}
		public function get_site_id() {
			return 0;
		}
		public function get_url( $raw_url = '', $redirect_url = '' ) {
			return '';
		}
		public function build_connect_url( $raw = false, $redirect_url = '' ) {
			return '';
		}
		public function get_authorization_url( $redirect_url = '' ) {
			return '';
		}
		public function get_connection_status() {
			return array(
				'isActive'     => false,
				'isRegistered' => false,
				'isConnected'  => false,
			);
		}
	}
}
