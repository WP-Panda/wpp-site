<?php
/**
 * Purchase box: license picker, price, WC add-to-cart form, trust notes.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

global $product;
$product_id   = $product->get_id();
$kind         = wpp_product_kind( $product_id );
$price        = (float) $product->get_price();
$regular      = (float) $product->get_regular_price();
$sale_percent = wpp_sale_percent( $product );
$in_cart      = wpp_product_in_cart( $product_id );
$is_variable  = $product->is_type( 'variable' );
$attributes   = $is_variable ? $product->get_variation_attributes() : array();
?>
<section class="item-buy rounded-card border border-line bg-white p-6 shadow-card" aria-label="<?php esc_attr_e( 'Купить товар', 'wp-panda' ); ?>">
	<div class="flex items-center justify-between gap-3">
		<h2 class="text-sm font-semibold"><?php echo 'theme' === $kind ? esc_html__( 'Лицензия темы', 'wp-panda' ) : esc_html__( 'Бессрочная лицензия', 'wp-panda' ); ?></h2>
		<?php echo wpp_icon( 'lock-keyhole', 'h-4 w-4 text-muted' ); ?>
	</div>
	<div class="mt-4 flex flex-wrap items-center gap-2.5">
		<span class="wpp-buy-price text-[34px] font-bold leading-tight tracking-tight tabular-nums" aria-live="polite"><?php echo wpp_format_amount( $price ); ?></span>
		<?php if ( $regular > $price && $regular > 0 ) : ?>
			<span class="wpp-buy-regular text-sm text-muted line-through"><?php echo wpp_format_amount( $regular ); ?></span>
			<span class="rounded-full bg-brand-50 px-2 py-1 text-[11px] font-semibold text-[#906500]">-<?php echo esc_html( $sale_percent ); ?>%</span>
		<?php endif; ?>
	</div>
	<p class="mt-1 text-xs leading-relaxed text-muted"><?php echo 'theme' === $kind ? esc_html__( 'Для личных и клиентских проектов.', 'wp-panda' ) : esc_html__( 'Один платёж. Без подписки и продлений.', 'wp-panda' ); ?></p>
	<form class="cart<?php echo $is_variable ? ' variations_form wpp-add-variable' : ''; ?>" method="post" enctype="multipart/form-data"
		<?php
		if ( $is_variable ) {
			$wpp_variations = $product->get_available_variations();
			echo ' data-product_id="' . esc_attr( $product_id ) . '"';
			echo ' data-product_variations="' . esc_attr( wp_json_encode( array_values( $wpp_variations ) ) ) . '"';
		}
		?>>
		<?php if ( $is_variable ) : ?>
			<fieldset class="mt-5">
				<legend class="mb-2 text-xs font-medium"><?php esc_html_e( 'Количество сайтов', 'wp-panda' ); ?></legend>
				<div class="grid grid-cols-2 gap-2">
					<?php
					$wpp_attr_names = array_keys( $attributes );
					$wpp_attr_name  = $wpp_attr_names ? $wpp_attr_names[0] : '';
					$wpp_slug       = sanitize_title( $wpp_attr_name );
					$wpp_options    = $wpp_attr_name ? $attributes[ $wpp_attr_name ] : array();
					foreach ( $wpp_options as $wpp_oi => $wpp_option ) :
						$wpp_active = 0 === $wpp_oi;
						?>
						<label class="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors <?php echo $wpp_active ? 'border-brand bg-brand-50' : 'border-line hover:border-ink/25'; ?>">
							<input class="h-4 w-4 accent-[#ffc21f]" type="radio" value="<?php echo esc_attr( $wpp_option ); ?>" <?php checked( $wpp_active ); ?> name="wpp-license-radio" data-license-option="<?php echo esc_attr( $wpp_option ); ?>"><?php echo esc_html( $wpp_option ); ?>
						</label>
					<?php endforeach; ?>
				</div>
				<?php foreach ( $attributes as $wpp_name => $wpp_opts ) : ?>
					<select class="wpp-variation-select hidden" name="attribute_<?php echo esc_attr( sanitize_title( $wpp_name ) ); ?>" aria-label="<?php echo esc_attr( $wpp_name ); ?>">
						<option value=""><?php esc_html_e( 'Выберите вариант', 'wp-panda' ); ?></option>
						<?php foreach ( $wpp_opts as $wpp_opt ) : ?>
							<option value="<?php echo esc_attr( $wpp_opt ); ?>" <?php selected( $wpp_opt, $wpp_opts[0] ); ?>><?php echo esc_html( $wpp_opt ); ?></option>
						<?php endforeach; ?>
					</select>
				<?php endforeach; ?>
			</fieldset>
		<?php endif; ?>
		<ul class="mt-5 space-y-3 border-t border-line pt-5 text-[13px]">
			<li class="flex items-start gap-2.5">
				<?php echo wpp_icon( 'badge-check', 'h-4 w-4 text-emerald-600' ); ?><span><?php esc_html_e( 'Оригинальные файлы продукта', 'wp-panda' ); ?></span>
			</li>
			<li class="flex items-start gap-2.5">
				<?php echo wpp_icon( 'refresh-cw', 'h-4 w-4 text-emerald-600' ); ?><span><?php echo 'theme' === $kind ? esc_html__( 'Обновления из консоли WordPress', 'wp-panda' ) : esc_html__( 'Все будущие обновления включены', 'wp-panda' ); ?></span>
			</li>
			<li class="flex items-start gap-2.5">
				<?php echo wpp_icon( 'life-buoy', 'h-4 w-4 text-emerald-600' ); ?><span><?php esc_html_e( 'Помощь с установкой и настройкой', 'wp-panda' ); ?></span>
			</li>
			<li class="flex items-start gap-2.5">
				<?php echo wpp_icon( 'file-text', 'h-4 w-4 text-emerald-600' ); ?><span><?php esc_html_e( 'Подробная документация', 'wp-panda' ); ?></span>
			</li>
		</ul>
		<input type="hidden" name="add-to-cart" value="<?php echo esc_attr( $product_id ); ?>">
		<input type="hidden" name="product_id" value="<?php echo esc_attr( $product_id ); ?>">
		<input type="hidden" name="quantity" value="1">
		<?php if ( $in_cart ) : ?>
			<button type="button" data-cart-open class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-brand text-ink hover:bg-brand-600 shadow-glow h-14 px-7 text-[15px] mt-6 w-full">
				<?php echo wpp_icon( 'check', 'h-4 w-4' ); ?><?php esc_html_e( 'В корзине · открыть', 'wp-panda' ); ?>
			</button>
		<?php elseif ( $is_variable ) : ?>
			<button type="submit" class="single_add_to_cart_button inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-brand text-ink hover:bg-brand-600 shadow-glow h-14 px-7 text-[15px] mt-6 w-full">
				<?php echo wpp_icon( 'shopping-bag', 'h-4 w-4' ); ?><?php esc_html_e( 'В корзину', 'wp-panda' ); ?>
			</button>
		<?php else : ?>
			<button type="button" data-product_id="<?php echo esc_attr( $product_id ); ?>" data-product_sku="<?php echo esc_attr( $product->get_sku() ); ?>" data-quantity="1" class="add_to_cart_button product_type_simple inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-brand text-ink hover:bg-brand-600 shadow-glow h-14 px-7 text-[15px] mt-6 w-full">
				<?php echo wpp_icon( 'shopping-bag', 'h-4 w-4' ); ?><?php esc_html_e( 'В корзину', 'wp-panda' ); ?>
			</button>
		<?php endif; ?>
		<button type="button" data-buy-now class="inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-white text-ink border border-line hover:border-ink/25 shadow-[0_1px_2px_rgba(20,20,28,0.05)] h-11 px-5 text-sm mt-2 w-full">
			<?php echo wpp_icon( 'zap', 'h-4 w-4' ); ?><?php esc_html_e( 'Купить сейчас', 'wp-panda' ); ?>
		</button>
	</form>
	<div class="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted">
		<?php echo wpp_icon( 'download', 'h-3.5 w-3.5' ); ?><?php esc_html_e( 'Файлы доступны сразу после оплаты', 'wp-panda' ); ?>
	</div>
	<div class="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-[11px] text-muted">
		<span class="flex items-center gap-1">
			<?php echo wpp_icon( 'lock', 'h-3 w-3' ); ?><?php esc_html_e( 'Безопасная оплата', 'wp-panda' ); ?>
		</span>
		<a class="underline underline-offset-4 hover:text-ink" href="<?php echo esc_url( home_url( '/kb/refund/' ) ); ?>"><?php esc_html_e( 'Условия возврата', 'wp-panda' ); ?></a>
	</div>
</section>
