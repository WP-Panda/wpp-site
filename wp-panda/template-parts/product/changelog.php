<?php
/**
 * Version history panel.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

global $product;
$entries = get_post_meta( $product->get_id(), '_wpp_changelog', true );
if ( ! is_array( $entries ) || ! $entries ) {
	$version = wpp_product_version( $product );
	$entries = $version ? array( array(
		'version' => $version,
		'date'    => get_post_meta( $product->get_id(), '_wpp_updated', true ),
		'notes'   => array( __( 'Улучшена стабильность и производительность.', 'wp-panda' ), __( 'Совместимость с актуальной версией WordPress.', 'wp-panda' ) ),
	) ) : array();
}
?>
<div class="fade-in space-y-8 text-[15px] leading-relaxed">
	<h2 class="text-2xl font-bold tracking-tight"><?php esc_html_e( 'История версий', 'wp-panda' ); ?></h2>
	<?php if ( ! $entries ) : ?>
		<p class="text-muted"><?php esc_html_e( 'История обновлений появится после первого релиза.', 'wp-panda' ); ?></p>
	<?php endif; ?>
	<?php foreach ( $entries as $wpp_entry ) : ?>
		<section class="border-b border-line pb-8">
			<div class="flex flex-wrap items-center gap-3">
				<span class="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">v<?php echo esc_html( $wpp_entry['version'] ); ?></span>
				<?php if ( ! empty( $wpp_entry['date'] ) ) : ?>
					<span class="text-xs text-muted"><?php echo esc_html( $wpp_entry['date'] ); ?></span>
				<?php endif; ?>
			</div>
			<ul class="mt-4 space-y-2">
				<?php foreach ( (array) $wpp_entry['notes'] as $wpp_note ) : ?>
					<li class="flex items-start gap-2.5 text-sm text-muted">
						<?php echo wpp_icon( 'check', 'mt-0.5 h-4 w-4 text-emerald-600' ); ?><span><?php echo esc_html( $wpp_note ); ?></span>
					</li>
				<?php endforeach; ?>
			</ul>
		</section>
	<?php endforeach; ?>
</div>
