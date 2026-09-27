<?php
/**
 * Шаблонные помощники темы Wp Panda.
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* ------------------------------------------------------------------ */
/* Иконки                                                              */
/* ------------------------------------------------------------------ */

/**
 * Вывести инлайновую SVG-иконку lucide.
 *
 * @param string $name  Ключ иконки (см. inc/icons.php).
 * @param string $class Классы размера/цвета, например "h-4 w-4".
 */
function wpp_icon( $name, $class = 'h-4 w-4' ) {
	static $icons = null;
	if ( null === $icons ) {
		$icons = require WPP_DIR . '/inc/icons.php';
	}
	if ( ! isset( $icons[ $name ] ) ) {
		return;
	}
	echo str_replace( '__CLASS__', esc_attr( $class ), $icons[ $name ] ); // phpcs:ignore WordPress.Security.EscapeOutput
}

/* ------------------------------------------------------------------ */
/* Цены                                                                */
/* ------------------------------------------------------------------ */

/** Формат цены «3 990 ₽» без WooCommerce. */
function wpp_rub( $number ) {
	return number_format_i18n( (float) $number, 0 ) . ' ₽';
}

/* ------------------------------------------------------------------ */
/* Единые данные товара (WooCommerce или демо-массив)                  */
/* ------------------------------------------------------------------ */

/**
 * Приводит товар к единому виду для карточек и обложек.
 *
 * @param mixed $product WC_Product | int | array (демо).
 * @return array|null
 */
function wpp_product_data( $product ) {
	// Демо-массив из inc/demo.php.
	if ( is_array( $product ) ) {
		return array_merge( array(
			'id'         => 0,
			'name'       => '',
			'tagline'    => '',
			'type'       => 'theme',
			'category'   => '',
			'price'      => 0,
			'old_price'  => 0,
			'price_html' => '',
			'link'       => '#',
			'slug'       => '',
			'rating'     => 0,
			'reviews'    => 0,
			'sales'      => 0,
			'badge'      => '',
			'version'    => '1.0',
			'image'      => '',
			'image2'     => '',
			'color'      => '#4F46E5',
			'color2'     => '#8B5CF6',
			'bg'         => '#EDEEFF',
			'icon'       => 'rocket',
			'hero_title' => '',
			'eyebrow'    => '',
			'inner_title'=> '',
			'chips'      => array(),
		), $product );
	}

	if ( ! wpp_has_woo() || ! $product instanceof WC_Product ) {
		$product = is_numeric( $product ) ? wc_get_product( $product ) : $product;
		if ( ! $product instanceof WC_Product ) {
			return null;
		}
	}

	$id    = $product->get_id();
	$meta  = function ( $key, $default = '' ) use ( $id ) {
		$v = get_post_meta( $id, $key, true );
		return ( '' === $v || null === $v ) ? $default : $v;
	};

	$terms = get_the_terms( $id, 'product_cat' );
	$cat   = ( $terms && ! is_wp_error( $terms ) ) ? $terms[0]->name : '';

	$type = $meta( '_wpp_type' );
	if ( ! $type ) {
		$type = 'Темы' === $cat ? 'theme' : 'plugin';
	}

	$price_html = $product->get_price_html();

	return array(
		'id'         => $id,
		'name'       => $product->get_name(),
		'tagline'    => $product->get_short_description(),
		'type'       => $type,
		'category'   => $cat,
		'price'      => (float) $product->get_price(),
		'old_price'  => (float) $product->get_regular_price() > (float) $product->get_price() ? (float) $product->get_regular_price() : 0,
		'price_html' => $price_html,
		'link'       => get_permalink( $id ),
		'slug'       => $product->get_slug(),
		'rating'     => (float) $product->get_average_rating(),
		'reviews'    => $product->get_review_count(),
		'sales'      => (int) $meta( 'total_sales', 0 ),
		'badge'      => $meta( '_wpp_badge' ),
		'version'    => $meta( '_wpp_version', '1.0' ),
		'image'      => $meta( '_wpp_image' ),
		'image2'     => $meta( '_wpp_image2' ),
		'color'      => $meta( '_wpp_color', '#4F46E5' ),
		'color2'     => $meta( '_wpp_color2', '#8B5CF6' ),
		'bg'         => $meta( '_wpp_bg', '#EDEEFF' ),
		'icon'       => $meta( '_wpp_icon', 'rocket' ),
		'hero_title' => $meta( '_wpp_hero_title' ),
		'eyebrow'    => $meta( '_wpp_eyebrow' ),
		'inner_title'=> $meta( '_wpp_inner_title' ),
		'chips'      => array_filter( explode( '|', $meta( '_wpp_chips' ) ) ),
	);
}

/** Миниатюра товара (фото темы или иконка плагина). */
function wpp_product_thumb( $data, $class = 'h-11 w-11 rounded-xl' ) {
	if ( ! $data ) {
		return;
	}
	$bg = 'plugin' === $data['type']
		? 'linear-gradient(135deg, ' . esc_attr( $data['color'] ) . ', ' . esc_attr( $data['color2'] ) . ')'
		: esc_attr( $data['bg'] );
	printf( '<span class="relative flex flex-shrink-0 items-center justify-center overflow-hidden %s" style="background:%s">', esc_attr( $class ), $bg );
	if ( 'theme' === $data['type'] && $data['image'] ) {
		printf( '<img src="%s" alt="" loading="lazy" class="h-full w-full object-cover" />', esc_url( $data['image'] ) );
	} else {
		wpp_icon( $data['icon'], 'h-1/2 w-1/2 text-white' );
	}
	echo '</span>';
}

/* ------------------------------------------------------------------ */
/* CSS-арт карточки товара (порт React-компонента ProductMedia)        */
/* ------------------------------------------------------------------ */

/**
 * Превью товара: для тем — макет сайта в окне браузера, для плагинов — баннер.
 *
 * @param array  $d     Данные товара (wpp_product_data).
 * @param string $class Дополнительные классы контейнера.
 * @param int    $variant 0 — главная, 1 — внутренняя, 2 — мобильная версия.
 */
function wpp_product_media( $d, $class = '', $variant = 0 ) {
	if ( ! $d ) {
		return;
	}
	echo '<div class="relative aspect-[4/3] w-full overflow-hidden ' . esc_attr( $class ) . '" style="container-type:inline-size;background:' . esc_attr( $d['bg'] ) . '">';
	echo '<div class="dots-bg absolute inset-0 opacity-70" aria-hidden="true"></div>';

	if ( 'theme' === $d['type'] ) {
		if ( 2 === $variant ) {
			wpp_media_mobile( $d );
		} else {
			wpp_media_browser_start( $d );
			echo 1 === $variant ? wpp_media_inner( $d ) : wpp_media_home( $d ); // phpcs:ignore
			echo '</div>';
		}
	} else {
		wpp_media_plugin( $d );
	}
	echo '</div>';
}

/** Контейнер-«окно браузера»: начало. */
function wpp_media_browser_start( $d ) {
	echo '<div class="absolute overflow-hidden bg-white" style="left:8%;right:8%;top:15%;bottom:-6%;border-radius:2.4cqw 2.4cqw 0 0;box-shadow:0 24px 48px -24px rgba(20,20,30,.45),0 0 0 1px rgba(20,20,30,.06)">';
	echo '<div class="flex items-center bg-[#F2F2F5]" style="height:4.6cqw;gap:.9cqw;padding:0 1.8cqw">';
	foreach ( array( '#FF5F57', '#FEBC2E', '#28C840' ) as $c ) {
		echo '<span class="flex-shrink-0 rounded-full" style="width:1.2cqw;height:1.2cqw;background:' . esc_attr( $c ) . '"></span>';
	}
	echo '<span class="mx-auto truncate rounded-full bg-white text-[#9a9aa5]" style="font-size:1.4cqw;padding:.3cqw 4cqw">' . esc_html( ( $d['slug'] ? $d['slug'] : 'demo' ) . '.wppanda.demo' ) . '</span>';
	echo '</div>';
}

/** Меню демо-сайта в макете. */
function wpp_media_nav( $d ) {
	echo '<div class="flex items-center justify-between" style="padding:2cqw 3cqw">';
	echo '<span class="flex items-center font-bold text-[#141418]" style="font-size:2.4cqw;gap:.8cqw">';
	echo '<span class="rounded-full" style="width:2.2cqw;height:2.2cqw;background:linear-gradient(135deg,' . esc_attr( $d['color'] ) . ',' . esc_attr( $d['color2'] ) . ')"></span>';
	echo esc_html( $d['name'] );
	echo '</span><span class="flex items-center text-[#6b6b76]" style="gap:2.2cqw;font-size:1.45cqw">';
	echo '<span>' . esc_html__( 'Главная', 'wp-panda' ) . '</span><span>' . esc_html__( 'Каталог', 'wp-panda' ) . '</span><span>' . esc_html__( 'О нас', 'wp-panda' ) . '</span>';
	echo '<span class="rounded-full font-semibold text-white" style="background:' . esc_attr( $d['color'] ) . ';padding:.7cqw 1.8cqw">' . esc_html__( 'Связаться', 'wp-panda' ) . '</span>';
	echo '</span></div>';
}

/** Блоки-«строчки» под макетом. */
function wpp_media_lines( $d ) {
	echo '<div class="grid grid-cols-3" style="gap:2cqw;padding:2.6cqw 3cqw">';
	for ( $i = 0; $i < 3; $i++ ) {
		echo '<div><div class="rounded-full" style="width:3.4cqw;height:3.4cqw;background:' . esc_attr( $d['bg'] ) . ';border:.3cqw solid ' . esc_attr( $d['color'] ) . '40"></div>';
		echo '<div class="rounded-full bg-[#1c1c21]" style="height:1cqw;width:70%;margin-top:1.4cqw"></div>';
		echo '<div class="rounded-full bg-[#e7e7ec]" style="height:.8cqw;width:95%;margin-top:1cqw"></div>';
		echo '<div class="rounded-full bg-[#e7e7ec]" style="height:.8cqw;width:78%;margin-top:.7cqw"></div></div>';
	}
	echo '</div>';
}

/** Главная страница демо-сайта. */
function wpp_media_home( $d ) {
	wpp_media_nav( $d );
	echo '<div class="relative overflow-hidden" style="margin:0 3cqw;height:34cqw;border-radius:1.6cqw">';
	if ( $d['image'] ) {
		echo '<img src="' . esc_url( $d['image'] ) . '" alt="" loading="lazy" class="absolute inset-0 h-full w-full object-cover" />';
	}
	echo '<div class="absolute inset-0" style="background:linear-gradient(90deg,rgba(10,10,15,.74) 0%,rgba(10,10,15,.35) 58%,rgba(10,10,15,.05) 100%)"></div>';
	echo '<div class="absolute text-white" style="left:3.6cqw;right:36%;bottom:4cqw">';
	echo '<div class="font-semibold uppercase opacity-80" style="font-size:1.25cqw;letter-spacing:.18em;margin-bottom:1cqw">' . esc_html( $d['eyebrow'] ) . '</div>';
	echo '<div class="font-bold" style="font-size:4cqw;line-height:1.08">' . esc_html( $d['hero_title'] ) . '</div>';
	echo '<div class="flex" style="gap:1cqw;margin-top:2.2cqw">';
	echo '<span class="rounded-full font-semibold" style="background:' . esc_attr( $d['color'] ) . ';font-size:1.4cqw;padding:.9cqw 2.2cqw">' . esc_html__( 'Подробнее', 'wp-panda' ) . '</span>';
	echo '<span class="rounded-full border border-white/60" style="font-size:1.4cqw;padding:.9cqw 2.2cqw">' . esc_html__( 'Смотреть', 'wp-panda' ) . '</span>';
	echo '</div></div></div>';
	wpp_media_lines( $d );
}

/** Внутренняя страница демо-сайта. */
function wpp_media_inner( $d ) {
	wpp_media_nav( $d );
	echo '<div style="padding:.6cqw 3cqw 0">';
	echo '<div class="font-semibold uppercase" style="font-size:1.2cqw;letter-spacing:.18em;color:' . esc_attr( $d['color'] ) . '">' . esc_html( $d['eyebrow'] ) . '</div>';
	echo '<div class="font-bold text-[#141418]" style="font-size:3.2cqw;margin-top:.5cqw">' . esc_html( $d['inner_title'] ) . '</div></div>';
	$imgs = array( $d['image'], $d['image2'], $d['image2'], $d['image'], $d['image'], $d['image2'] );
	$pos  = array( 'center', 'left', 'right', 'top', 'right', 'center' );
	echo '<div class="grid grid-cols-3" style="gap:1.6cqw;padding:2cqw 3cqw">';
	foreach ( $imgs as $i => $src ) {
		echo '<div><div class="overflow-hidden" style="border-radius:1.2cqw;height:13.5cqw">';
		if ( $src ) {
			echo '<img src="' . esc_url( $src ) . '" alt="" loading="lazy" class="h-full w-full object-cover" style="object-position:' . esc_attr( $pos[ $i ] ) . '" />';
		}
		echo '</div><div class="rounded-full bg-[#1c1c21]" style="height:.9cqw;width:75%;margin-top:1.1cqw"></div>';
		echo '<div class="rounded-full" style="height:.9cqw;width:35%;margin-top:.8cqw;background:' . esc_attr( $d['color'] ) . '"></div></div>';
	}
	echo '</div>';
	return '';
}

/** Телефоны для варианта «мобильная версия». */
function wpp_media_phone( $d, $style, $inner = false ) {
	echo '<div class="absolute overflow-hidden bg-white" style="width:27cqw;height:56cqw;border-radius:4cqw;border:.9cqw solid #141418;box-shadow:0 30px 60px -25px rgba(20,20,30,.5);' . esc_attr( $style ) . '">';
	echo '<div class="mx-auto rounded-full bg-[#141418]" style="width:8cqw;height:1.6cqw;margin-top:1cqw"></div>';
	echo '<div class="flex items-center justify-between" style="padding:1.4cqw 2cqw">';
	echo '<span class="font-bold text-[#141418]" style="font-size:1.8cqw">' . esc_html( $d['name'] ) . '</span>';
	echo '<span class="flex flex-col" style="gap:.5cqw">';
	for ( $i = 0; $i < 3; $i++ ) {
		echo '<span class="block rounded-full bg-[#141418]" style="width:2.2cqw;height:.35cqw"></span>';
	}
	echo '</span></div>';
	echo '<div class="relative overflow-hidden" style="margin:0 1.6cqw;height:22cqw;border-radius:1.8cqw">';
	$src = $inner ? $d['image2'] : $d['image'];
	if ( $src ) {
		echo '<img src="' . esc_url( $src ) . '" alt="" loading="lazy" class="absolute inset-0 h-full w-full object-cover" />';
	}
	echo '<div class="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"></div>';
	echo '<div class="absolute font-bold text-white" style="left:1.6cqw;right:1.6cqw;bottom:1.6cqw;font-size:2.2cqw;line-height:1.1">' . esc_html( $inner ? $d['inner_title'] : $d['hero_title'] ) . '</div></div>';
	echo '<div style="padding:1.6cqw">';
	echo '<div class="rounded-full text-center font-semibold text-white" style="background:' . esc_attr( $d['color'] ) . ';font-size:1.4cqw;padding:1cqw 0">' . esc_html__( 'Подробнее', 'wp-panda' ) . '</div>';
	for ( $i = 0; $i < 2; $i++ ) {
		echo '<div class="flex items-center" style="gap:1cqw;margin-top:1.4cqw"><div style="width:5cqw;height:5cqw;border-radius:1cqw;background:' . esc_attr( $d['bg'] ) . '"></div><div class="flex-1">';
		echo '<div class="rounded-full bg-[#1c1c21]" style="height:.8cqw;width:80%"></div>';
		echo '<div class="rounded-full bg-[#e7e7ec]" style="height:.7cqw;width:60%;margin-top:.7cqw"></div></div></div>';
	}
	echo '</div></div>';
}

/** Мобильная версия (два телефона). */
function wpp_media_mobile( $d ) {
	wpp_media_phone( $d, 'left:21%;top:17%;transform:rotate(-7deg)', true );
	wpp_media_phone( $d, 'left:49%;top:11%' );
}

/** Баннер плагина. */
function wpp_media_plugin( $d ) {
	echo '<div class="absolute rounded-full" style="width:70cqw;height:70cqw;right:-22cqw;top:-28cqw;background:' . esc_attr( $d['color'] ) . ';opacity:.12"></div>';
	echo '<div class="absolute rounded-full" style="width:42cqw;height:42cqw;left:-14cqw;bottom:-20cqw;background:' . esc_attr( $d['color2'] ) . ';opacity:.12"></div>';
	echo '<div class="absolute flex items-center justify-center text-white" style="width:26cqw;height:26cqw;left:50%;top:42%;transform:translate(-50%,-50%);border-radius:7cqw;background:linear-gradient(135deg,' . esc_attr( $d['color'] ) . ',' . esc_attr( $d['color2'] ) . ');box-shadow:0 4cqw 8cqw -3cqw ' . esc_attr( $d['color'] ) . 'AA">';
	wpp_icon( $d['icon'], 'h-[12cqw] w-[12cqw]' );
	echo '</div>';
	if ( ! empty( $d['chips'][0] ) ) {
		echo '<div class="absolute flex items-center whitespace-nowrap rounded-full bg-white font-semibold text-[#1c1c21] shadow-lg" style="left:6cqw;bottom:7cqw;font-size:2.6cqw;padding:1.3cqw 2.6cqw;gap:1.2cqw">';
		echo '<span class="rounded-full bg-emerald-500" style="width:1.8cqw;height:1.8cqw"></span>' . esc_html( $d['chips'][0] ) . '</div>';
	}
	if ( ! empty( $d['chips'][1] ) ) {
		echo '<div class="absolute flex items-center whitespace-nowrap rounded-full bg-[#1c1c21] font-semibold text-white shadow-lg" style="right:6cqw;bottom:17cqw;font-size:2.6cqw;padding:1.3cqw 2.6cqw;gap:1cqw">';
		echo '<svg class="h-[2.6cqw] w-[2.6cqw]" viewBox="0 0 24 24" fill="none" stroke="#FFC21F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
		echo esc_html( $d['chips'][1] ) . '</div>';
	}
}

/* ------------------------------------------------------------------ */
/* Карточка товара                                                     */
/* ------------------------------------------------------------------ */

/**
 * Карточка товара (сетка каталога и главной).
 *
 * @param array $d Данные wpp_product_data().
 */
function wpp_product_card( $d ) {
	if ( ! $d ) {
		return;
	}
	$price = $d['price_html'] ? $d['price_html'] : esc_html( wpp_rub( $d['price'] ) );
	$old   = $d['old_price'] ? '<del>' . esc_html( wpp_rub( $d['old_price'] ) ) . '</del> ' : '';
	?>
	<article class="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white p-2.5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float" data-type="<?php echo esc_attr( $d['type'] ); ?>">
		<a href="<?php echo esc_url( $d['link'] ); ?>" class="relative block cursor-pointer overflow-hidden rounded-xl" aria-label="<?php echo esc_attr( sprintf( __( 'Открыть товар %s', 'wp-panda' ), $d['name'] ) ); ?>">
			<?php wpp_product_media( $d, 'transition-transform duration-500 group-hover:scale-[1.02]' ); ?>
			<?php if ( $d['badge'] ) : ?>
				<span class="absolute left-3 top-3 z-10 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-brand shadow-sm"><?php echo esc_html( $d['badge'] ); ?></span>
			<?php endif; ?>
			<span class="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-muted opacity-0 shadow-sm transition group-hover:opacity-100"><?php wpp_icon( 'expand', 'h-4 w-4' ); ?></span>
		</a>
		<div class="flex flex-1 flex-col px-1.5 pb-1 pt-3">
			<h3 class="text-[15px] font-semibold leading-tight tracking-tight">
				<a class="transition hover:text-ink" href="<?php echo esc_url( $d['link'] ); ?>"><?php echo esc_html( $d['name'] ); ?></a>
			</h3>
			<div class="mt-1 text-[11px] text-muted"><?php esc_html_e( 'от', 'wp-panda' ); ?> <span class="font-medium text-ink">Wp Panda</span> <span class="mx-1 text-line">·</span> <?php echo esc_html( $d['category'] ); ?></div>
			<p class="mt-2 line-clamp-2 min-h-9 text-[12px] leading-relaxed text-muted"><?php echo esc_html( $d['tagline'] ); ?></p>
			<div class="mt-2.5 flex items-center justify-between gap-2 border-t border-line pt-2.5">
				<div class="flex min-w-0 items-center gap-1.5">
					<?php wpp_stars( $d['rating'] ); ?>
					<span class="truncate text-[11px] font-semibold text-ink"><?php echo esc_html( number_format_i18n( $d['rating'], 1 ) ); ?></span>
					<span class="text-[11px] text-muted">(<?php echo esc_html( $d['reviews'] ); ?>)</span>
				</div>
				<span class="flex flex-shrink-0 items-center gap-1 text-[11px] text-muted" title="<?php esc_attr_e( 'Количество продаж', 'wp-panda' ); ?>">
					<?php wpp_icon( 'cart', 'h-3 w-3' ); ?> <?php echo esc_html( wpp_compact( $d['sales'] ) ); ?> <?php esc_html_e( 'продаж', 'wp-panda' ); ?>
				</span>
			</div>
			<div class="mt-auto flex items-center justify-between gap-2 pt-3">
				<div class="min-w-0">
					<div class="text-[10px] text-muted"><?php echo 'plugin' === $d['type'] ? esc_html__( 'Навсегда', 'wp-panda' ) : esc_html__( '1 сайт / 5 сайтов', 'wp-panda' ); ?></div>
					<div class="flex flex-wrap items-baseline gap-1.5 text-lg font-bold tabular-nums text-ink"><?php echo wp_kses_post( $old . $price ); ?></div>
				</div>
				<?php if ( wpp_has_woo() && $d['id'] ) : ?>
					<a href="<?php echo esc_url( '?add-to-cart=' . $d['id'] ); ?>" data-quantity="1" class="add_to_cart_button ajax_add_to_cart flex h-12 flex-shrink-0 items-center justify-center gap-2 rounded-full border border-line bg-soft px-4 text-[13px] font-bold transition-all duration-200 hover:border-brand hover:bg-brand active:scale-[0.98]" data-product_id="<?php echo esc_attr( $d['id'] ); ?>" aria-label="<?php echo esc_attr( sprintf( __( 'Добавить %s в корзину', 'wp-panda' ), $d['name'] ) ); ?>">
						<?php wpp_icon( 'cart', 'h-4 w-4' ); ?><span class="sr-only"><?php esc_html_e( 'В корзину', 'wp-panda' ); ?></span>
					</a>
				<?php else : ?>
					<a href="<?php echo esc_url( $d['link'] ); ?>" class="flex h-12 flex-shrink-0 items-center justify-center gap-2 rounded-full border border-line bg-soft px-4 text-[13px] font-bold transition-all duration-200 hover:border-brand hover:bg-brand" aria-label="<?php echo esc_attr( sprintf( __( 'Открыть %s', 'wp-panda' ), $d['name'] ) ); ?>">
						<?php wpp_icon( 'arrow-right', 'h-4 w-4' ); ?>
					</a>
				<?php endif; ?>
			</div>
		</div>
	</article>
	<?php
}

/** Звёзды рейтинга. */
function wpp_stars( $value ) {
	$full = (int) floor( $value + 0.5 );
	echo '<span class="flex items-center gap-0.5 text-brand" aria-label="' . esc_attr( sprintf( __( 'Рейтинг %s из 5', 'wp-panda' ), number_format_i18n( $value, 1 ) ) ) . '">';
	for ( $i = 1; $i <= 5; $i++ ) {
		$cls = 'h-3 w-3' . ( $i <= round( $value ) ? ' fill-current' : ' text-ink/15' );
		wpp_icon( 'star', $cls );
	}
	echo '</span>';
}

/** Компактное число: 8 240 → «8,2K». */
function wpp_compact( $n ) {
	if ( $n >= 1000 ) {
		return str_replace( '.', ',', round( $n / 1000, 1 ) ) . 'K';
	}
	return (string) $n;
}

/* ------------------------------------------------------------------ */
/* Карточка записи блога                                               */
/* ------------------------------------------------------------------ */

/**
 * Карточка поста.
 *
 * @param int|WP_Post $post Пост.
 */
function wpp_post_card( $post = null ) {
	$post = get_post( $post );
	if ( ! $post ) {
		return;
	}
	$cats    = get_the_category( $post->ID );
	$read    = get_post_meta( $post->ID, '_wpp_read_time', true );
	$thumb   = get_the_post_thumbnail( $post->ID, 'large', array( 'class' => 'h-full w-full object-cover transition-transform duration-500 group-hover:scale-105' ) );
	?>
	<article class="group flex cursor-pointer flex-col rounded-card border border-line bg-white p-3 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float">
		<a class="relative block aspect-[16/10] overflow-hidden rounded-2xl" href="<?php echo esc_url( get_permalink( $post ) ); ?>">
			<?php if ( $thumb ) : ?>
				<?php echo $thumb; // phpcs:ignore ?>
			<?php else : ?>
				<span class="absolute inset-0" style="background:linear-gradient(135deg,#4F46E5,#8B5CF6)"></span>
			<?php endif; ?>
			<span class="absolute left-2.5 top-2.5 flex gap-1.5">
				<?php if ( $read ) : ?>
					<span class="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm"><?php wpp_icon( 'clock', 'h-3 w-3' ); ?><?php echo esc_html( $read ); ?></span>
				<?php endif; ?>
				<?php if ( $cats ) : ?>
					<span class="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm"><?php echo esc_html( $cats[0]->name ); ?></span>
				<?php endif; ?>
			</span>
		</a>
		<div class="flex flex-1 flex-col px-1.5 pb-1.5 pt-4">
			<h3 class="line-clamp-2 text-lg font-semibold leading-snug tracking-tight decoration-brand decoration-2 underline-offset-4 group-hover:underline">
				<a class="transition hover:text-ink" href="<?php echo esc_url( get_permalink( $post ) ); ?>"><?php echo esc_html( get_the_title( $post ) ); ?></a>
			</h3>
			<p class="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted"><?php echo esc_html( get_the_excerpt( $post ) ); ?></p>
			<div class="mt-auto flex items-center gap-2.5 pt-4">
				<?php echo get_avatar( $post->post_author, 32, '', '', array( 'class' => 'h-8 w-8 rounded-full object-cover' ) ); ?>
				<div class="text-xs">
					<div class="font-semibold"><?php echo esc_html( get_the_author_meta( 'display_name', $post->post_author ) ); ?></div>
					<div class="text-muted"><?php echo esc_html( get_the_date( 'j F Y', $post ) ); ?></div>
				</div>
			</div>
		</div>
	</article>
	<?php
}

/* ------------------------------------------------------------------ */
/* Хлебные крошки и пагинация                                          */
/* ------------------------------------------------------------------ */

/** Простые крошки: Главная → Раздел → Название. */
function wpp_breadcrumbs( $items = array() ) {
	echo '<nav class="flex flex-wrap items-center gap-1.5 text-xs text-muted" aria-label="' . esc_attr__( 'Хлебные крошки', 'wp-panda' ) . '">';
	echo '<a class="transition hover:text-ink" href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'Главная', 'wp-panda' ) . '</a>';
	foreach ( $items as $label => $url ) {
		wpp_icon( 'chevron-right', 'h-3 w-3' );
		if ( $url ) {
			echo '<a class="transition hover:text-ink" href="' . esc_url( $url ) . '">' . esc_html( $label ) . '</a>';
		} else {
			echo '<span class="font-medium text-ink">' . esc_html( $label ) . '</span>';
		}
	}
	echo '</nav>';
}

/** Пагинация в стиле темы. */
function wpp_pagination() {
	the_posts_pagination( array(
		'mid_size'  => 1,
		'prev_text' => wpp_icon( 'arrow-left', 'h-4 w-4' ),
		'next_text' => wpp_icon( 'arrow-right', 'h-4 w-4' ),
		'class'     => 'mt-12 flex justify-center',
	) );
}

/* ------------------------------------------------------------------ */
/* Контентные блоки (демо-данные)                                      */
/* ------------------------------------------------------------------ */

/** Решения (сценарии использования) на главной. */
function wpp_solutions() {
	return apply_filters( 'wpp_solutions', array(
		array( 'title' => __( 'Интернет-магазин', 'wp-panda' ), 'subtitle' => __( '124 темы и плагина', 'wp-panda' ), 'img' => 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=560' ),
		array( 'title' => __( 'Агентства и студии', 'wp-panda' ), 'subtitle' => __( '86 готовых решений', 'wp-panda' ), 'img' => 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=560' ),
		array( 'title' => __( 'Блоги и медиа', 'wp-panda' ), 'subtitle' => __( '64 решения', 'wp-panda' ), 'img' => 'https://images.pexels.com/photos/261579/pexels-photo-261579.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=560' ),
		array( 'title' => __( 'Рестораны и кафе', 'wp-panda' ), 'subtitle' => __( '41 решение', 'wp-panda' ), 'img' => 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=560' ),
	) );
}

/** Отзывы на главной. */
function wpp_testimonials() {
	return apply_filters( 'wpp_testimonials', array(
		array( 'text' => __( 'Aurora спасла проект за три дня: импортировали демо, заменили тексты — и агентство получило сайт, за который раньше брали месяц. PageSpeed 97 из коробки.', 'wp-panda' ), 'name' => __( 'Анна Ковалёва', 'wp-panda' ), 'role' => __( 'Digital-агентство «Пиксель»', 'wp-panda' ), 'avatar' => 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=160&h=160' ),
		array( 'text' => __( 'TurboCache и Shieldy — стандартный набор для всех клиентских сайтов. Обновления прилетают автоматически, за два года ни одного инцидента.', 'wp-panda' ), 'name' => __( 'Иван Сергеев', 'wp-panda' ), 'role' => __( 'Фрилансер, 40+ проектов', 'wp-panda' ), 'avatar' => 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=160&h=160' ),
		array( 'text' => __( 'WooBoost поднял конверсию чекаута на 18%. Поддержка отвечает быстрее, чем наш хостинг — это редкость.', 'wp-panda' ), 'name' => __( 'Мария Лебедева', 'wp-panda' ), 'role' => __( 'Интернет-магазин «Уюттерра»', 'wp-panda' ), 'avatar' => 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=160&h=160' ),
	) );
}

/** Оценка времени чтения (или мета _wpp_read_time). */
function wpp_read_time( $post_id = null ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	$saved   = get_post_meta( $post_id, '_wpp_read_time', true );
	if ( $saved ) {
		return $saved;
	}
	$words = str_word_count( wp_strip_all_tags( get_post_field( 'post_content', $post_id ) ) );
	$min   = max( 1, (int) ceil( $words / 180 ) );
	/* translators: %d — минуты */
	return sprintf( _n( '%d мин', '%d мин', $min, 'wp-panda' ), $min );
}
