<?php
/**
 * Минимальная реализация Automattic\Block_Scanner для демо
 * (composer-пакет отсутствует в исходниках монорепо WooCommerce).
 * Сканер «ничего не находит»: в демо-контенте нет блоков woocommerce/*,
 * поэтому поведение идентично настоящему сканеру на таком контенте.
 */
namespace Automattic;

if ( ! class_exists( Block_Scanner::class ) ) {
	/**
	 * Заглушка сканера блоков.
	 */
	class Block_Scanner {
		public static function create( $html ) {
			return new self();
		}
		public function next_delimiter() {
			return false;
		}
		public function opens_block( $block_id ) {
			return false;
		}
		public function next_block_name() {
			return false;
		}
		public function allocate_and_return_parsed_attributes() {
			return null;
		}
	}
}
