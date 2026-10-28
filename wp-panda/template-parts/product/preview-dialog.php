<?php
/**
 * Product preview dialog: demo screens and device widths, as in the layout.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

global $product;
if ( ! $product ) {
	return;
}
$product_id  = $product->get_id();
$version     = wpp_product_version( $product );
$art         = get_post_meta( $product_id, '_wpp_card_art', true );
if ( $art ) {
	$art = preg_replace( '/aspect-\[4\/3\]/', 'aspect-[16/10]', $art, 1 );
}
$gallery_ids = $product->get_gallery_image_ids();
$wpp_devices = array(
	'desktop' => array( __( 'Компьютер', 'wp-panda' ), 'monitor' ),
	'tablet'  => array( __( 'Планшет', 'wp-panda' ), 'tablet' ),
	'mobile'  => array( __( 'Смартфон', 'wp-panda' ), 'smartphone' ),
);
?>
<dialog class="product-preview-dialog" aria-labelledby="product-preview-title" data-preview-dialog>
	<div class="flex flex-shrink-0 items-center justify-between gap-4 border-b border-line px-4 py-4 sm:px-6">
		<div class="min-w-0">
			<h2 id="product-preview-title" class="truncate text-base font-bold"><?php echo esc_html( sprintf( __( 'Предпросмотр %s', 'wp-panda' ), $product->get_name() ) ); ?></h2>
			<p class="mt-0.5 text-xs text-muted"><?php echo esc_html( sprintf( __( 'Демонстрационные экраны · v%s', 'wp-panda' ), $version ) ); ?></p>
		</div>
		<button type="button" data-preview-close aria-label="<?php esc_attr_e( 'Закрыть предпросмотр', 'wp-panda' ); ?>" class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-line transition hover:bg-soft"><?php echo wpp_icon( 'x', 'h-4 w-4' ); ?></button>
	</div>
	<div class="flex flex-shrink-0 flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
		<div class="flex gap-1" role="group" aria-label="<?php esc_attr_e( 'Размер экрана', 'wp-panda' ); ?>">
			<?php foreach ( $wpp_devices as $wpp_dev => $wpp_dev_meta ) : $wpp_dev_active = 'desktop' === $wpp_dev; ?>
				<button type="button" data-preview-device="<?php echo esc_attr( $wpp_dev ); ?>" aria-label="<?php echo esc_attr( $wpp_dev_meta[0] ); ?>" aria-pressed="<?php echo $wpp_dev_active ? 'true' : 'false'; ?>" class="flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors <?php echo $wpp_dev_active ? 'bg-ink text-white' : 'text-muted hover:bg-soft hover:text-ink'; ?>">
					<?php echo wpp_icon( $wpp_dev_meta[1], 'h-4 w-4' ); ?><span class="hidden sm:inline"><?php echo esc_html( $wpp_dev_meta[0] ); ?></span>
				</button>
			<?php endforeach; ?>
		</div>
		<label class="flex items-center gap-2 text-xs text-muted">
			<span class="hidden sm:inline"><?php esc_html_e( 'Экран:', 'wp-panda' ); ?></span>
			<select aria-label="<?php esc_attr_e( 'Экран предпросмотра', 'wp-panda' ); ?>" data-preview-screen class="h-9 max-w-[180px] rounded-lg border border-line bg-white px-3 text-xs text-ink outline-none focus:border-brand">
				<option value="0"><?php esc_html_e( 'Обложка', 'wp-panda' ); ?></option>
				<?php foreach ( $gallery_ids as $wpp_gi => $wpp_gid ) : ?>
					<option value="<?php echo esc_attr( $wpp_gi + 1 ); ?>"><?php echo esc_html( sprintf( __( 'Скриншот %d', 'wp-panda' ), $wpp_gi + 1 ) ); ?></option>
				<?php endforeach; ?>
			</select>
		</label>
	</div>
	<div class="min-h-0 flex-1 overflow-auto overscroll-contain bg-soft p-3 sm:p-6">
		<div class="mx-auto overflow-hidden rounded-xl border border-line bg-white shadow-card transition-[width] duration-300" data-preview-frame style="width:100%;max-width:100%">
			<div class="relative w-full overflow-hidden aspect-[16/10]" style="container-type:inline-size;background:rgb(246,246,248)" data-preview-art>
				<?php
				if ( $art ) {
					echo wpp_kses_art( $art );
				} elseif ( $product->get_image_id() ) {
					echo wp_get_attachment_image( $product->get_image_id(), 'large', false, array( 'class' => 'absolute inset-0 h-full w-full object-cover', 'alt' => '' ) );
				} else {
					echo '<div class="dots-bg absolute inset-0 opacity-70"></div>';
				}
				?>
			</div>
			<?php foreach ( $gallery_ids as $wpp_gi => $wpp_gid ) : ?>
				<img alt="" class="hidden w-full aspect-[16/10] object-cover" data-preview-shot src="<?php echo esc_url( wp_get_attachment_image_url( $wpp_gid, 'large' ) ); ?>">
			<?php endforeach; ?>
		</div>
	</div>
	<p class="flex-shrink-0 border-t border-line px-4 py-3 text-center text-[11px] text-muted sm:px-6"><?php esc_html_e( 'Выберите экран и размер устройства, чтобы рассмотреть продукт.', 'wp-panda' ); ?></p>
</dialog>
