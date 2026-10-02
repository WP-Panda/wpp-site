<?php
/**
 * Demo content: importer, lookups and scenario helpers.
 *
 * The bundled JSON mirrors the supplied layout 1:1; the importer turns it
 * into WooCommerce products, posts, KB pages and the site structure.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

/** Parsed demo-content.json (cached per request). */
function wpp_demo_data() {
	static $data = null;
	if ( null === $data ) {
		$path = get_template_directory() . '/assets/demo/demo-content.json';
		$data = file_exists( $path ) ? json_decode( (string) file_get_contents( $path ), true ) : array();
		if ( ! is_array( $data ) ) {
			$data = array();
		}
	}
	return $data;
}

/**
 * Find a demo post by its key.
 *
 * @param string $kind product | post | kb | page.
 * @param string $key  Demo key, e.g. "product:aurora".
 */
function wpp_demo_find_post_id( $kind, $key ) {
	static $cache = array();
	$ck = $kind . ':' . $key;
	if ( isset( $cache[ $ck ] ) ) {
		return $cache[ $ck ];
	}
	$post_type = 'product' === $kind ? 'product' : ( 'post' === $kind ? 'post' : 'page' );
	$found     = get_posts( array(
		'post_type'      => $post_type,
		'post_status'    => 'publish',
		'posts_per_page' => 1,
		'fields'         => 'ids',
		'meta_key'       => '_wpp_demo_key',
		'meta_value'     => $key,
	) );
	$cache[ $ck ] = $found ? (int) $found[0] : 0;
	return $cache[ $ck ];
}

/** Scenario tile product for the home «Решения под вашу задачу» block. */
function wpp_get_scenario_product( $slug, $fallback_category = 'wordpress-themes' ) {
	$id = wpp_demo_find_post_id( 'product', 'product:' . $slug );
	if ( $id && function_exists( 'wc_get_product' ) ) {
		return wc_get_product( $id );
	}
	return false;
}

/* ------------------------------------------------------------------------ */
/* Importer.                                                                 */
/* ------------------------------------------------------------------------ */

/** Deterministic pseudo-random for stable demo numbers. */
function wpp_demo_rand( $seed, $min, $max ) {
	$h = crc32( (string) $seed );
	return $min + ( $h % max( 1, ( $max - $min + 1 ) ) );
}

/** Upload a bundled image and attach it to a post, returns attachment id. */
function wpp_demo_attach_image( $source_path, $post_id, $name ) {
	if ( ! file_exists( $source_path ) ) {
		return 0;
	}
	if ( ! function_exists( 'wp_upload_bits' ) ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
	}
	$upload = wp_upload_bits( $name, null, (string) file_get_contents( $source_path ) );
	if ( ! empty( $upload['error'] ) ) {
		return 0;
	}
	$mime = wp_check_filetype( $upload['file'] );
	$att  = array(
		'post_title'   => sanitize_file_name( $name ),
		'post_content' => '',
		'post_type'    => 'attachment',
		'post_mime_type' => $mime ? $mime['type'] : 'image/jpeg',
		'guid'         => $upload['url'],
	);
	$att_id = wp_insert_attachment( $att, $upload['file'], $post_id );
	if ( ! $att_id ) {
		return 0;
	}
	require_once ABSPATH . 'wp-admin/includes/image.php';
	$metadata = wp_generate_attachment_metadata( $att_id, $upload['file'] );
	if ( is_array( $metadata ) ) {
		wp_update_attachment_metadata( $att_id, $metadata );
	}
	return $att_id;
}

/** Make sure a product category exists and return its term id. */
function wpp_demo_product_cat( $slug, $name ) {
	$term = get_term_by( 'slug', $slug, 'product_cat' );
	if ( ! $term ) {
		$created = wp_insert_term( $name, 'product_cat', array( 'slug' => $slug ) );
		$term    = is_wp_error( $created ) ? null : get_term( $created['term_id'], 'product_cat' );
	}
	return $term ? (int) $term->term_id : 0;
}

/** Import everything once. */
function wpp_demo_import() {
	if ( get_option( 'wpp_demo_imported' ) ) {
		return;
	}
	if ( ! class_exists( 'WooCommerce' ) ) {
		return;
	}
	$data = wpp_demo_data();
	if ( ! $data ) {
		return;
	}

	update_option( 'wpp_demo_importing', 1 );

	wpp_demo_import_products( $data );
	wpp_demo_import_posts( $data );
	wpp_demo_import_kb( $data );
	wpp_demo_import_pages( $data );
	wpp_demo_configure_site();

	delete_option( 'wpp_demo_importing' );
	update_option( 'wpp_demo_imported', 1 );
}

/** Products, variations, art meta, reviews. */
function wpp_demo_import_products( $data ) {
	$card_art = array();
	$mini_art = array();
	$card_art_path = get_template_directory() . '/assets/demo/card-art.json';
	$mini_art_path = get_template_directory() . '/assets/demo/mini-art.json';
	if ( file_exists( $card_art_path ) ) {
		$card_art = (array) json_decode( (string) file_get_contents( $card_art_path ), true );
	}
	if ( file_exists( $mini_art_path ) ) {
		$mini_art = (array) json_decode( (string) file_get_contents( $mini_art_path ), true );
	}

	$featured_order = array_flip( isset( $data['homepage']['featured_products'] ) ? (array) $data['homepage']['featured_products'] : array() );

	$cat_theme  = wpp_demo_product_cat( 'wordpress-themes', __( 'Темы WordPress', 'wp-panda' ) );
	$cat_plugin = wpp_demo_product_cat( 'wordpress-plugins', __( 'Плагины WordPress', 'wp-panda' ) );
	$cat_bundle = wpp_demo_product_cat( 'bundles', __( 'Бандлы', 'wp-panda' ) );

	foreach ( (array) $data['products'] as $spec ) {
		if ( wpp_demo_find_post_id( 'product', $spec['key'] ) ) {
			continue;
		}
		$post_id = wp_insert_post( array(
			'post_type'    => 'product',
			'post_status'  => 'publish',
			'post_title'   => sanitize_text_field( $spec['name'] ),
			'post_name'    => sanitize_title( $spec['slug'] ),
			'post_content' => wp_kses_post( $spec['description'] ),
			'post_excerpt' => sanitize_text_field( $spec['short_description'] ),
		) );
		if ( ! $post_id ) {
			continue;
		}

		$cat_id = 'wordpress-themes' === $spec['category'] ? $cat_theme : $cat_plugin;
		if ( $cat_id ) {
			wp_set_object_terms( $post_id, array( $cat_id ), 'product_cat' );
		}
		if ( ! empty( $spec['tags'] ) ) {
			wp_set_object_terms( $post_id, array_map( 'sanitize_text_field', (array) $spec['tags'] ), 'product_tag' );
		}

		update_post_meta( $post_id, '_wpp_demo_key', $spec['key'] );
		update_post_meta( $post_id, '_sku', sanitize_text_field( $spec['sku'] ) );
		update_post_meta( $post_id, '_wpp_version', $spec['version'] );
		update_post_meta( $post_id, '_wpp_wp', $spec['wordpress'] );
		update_post_meta( $post_id, '_wpp_php', $spec['php'] );
		update_post_meta( $post_id, '_wpp_compatibility', $spec['compatibility'] );
		update_post_meta( $post_id, '_wpp_updated', wpp_human_date( strtotime( '-7 days', strtotime( $spec['date'] ?? '2026-09-10' ) ) ) );
		update_post_meta( $post_id, '_wpp_sales', wpp_demo_rand( $spec['slug'], 900, 9400 ) );
		update_post_meta( $post_id, '_wpp_license', 'variable' === $spec['type'] ? '1 сайт / 5 сайтов' : 'Навсегда' );

		$regular = (float) $spec['regular_price'];
		$price   = (float) ( '' !== $spec['sale_price'] && null !== $spec['sale_price'] ? $spec['sale_price'] : $spec['price'] );
		if ( 'variable' === $spec['type'] ) {
			update_post_meta( $post_id, '_price', $price );
			update_post_meta( $post_id, '_min_price_variation_id', 0 );
			wpp_demo_make_variable( $post_id, $spec, $price, $regular );
		} else {
			update_post_meta( $post_id, '_regular_price', $regular );
			update_post_meta( $post_id, '_sale_price', $price < $regular ? $price : '' );
			update_post_meta( $post_id, '_price', $price );
		}
		update_post_meta( $post_id, '_visibility', 'visible' );
		update_post_meta( $post_id, '_stock_status', 'instock' );
		update_post_meta( $post_id, '_virtual', 'yes' );
		update_post_meta( $post_id, '_downloadable', 'yes' );
		update_post_meta( $post_id, 'total_sales', wpp_demo_rand( $spec['slug'] . '-sales', 40, 1200 ) );

		if ( isset( $featured_order[ $spec['slug'] ] ) ) {
			update_post_meta( $post_id, '_wpp_featured_order', (int) $featured_order[ $spec['slug'] ] + 1 );
		}
		if ( isset( $card_art[ $spec['slug'] ] ) ) {
			update_post_meta( $post_id, '_wpp_card_art', $card_art[ $spec['slug'] ] );
		}
		if ( isset( $mini_art[ $spec['slug'] ] ) ) {
			update_post_meta( $post_id, '_wpp_mini_art', wp_json_encode( $mini_art[ $spec['slug'] ] ) );
		}

		wpp_demo_import_changelog( $post_id, $spec );

		$image_path = get_template_directory() . '/assets/demo/' . ltrim( $spec['image'], '/' );
		$att_id     = wpp_demo_attach_image( $image_path, $post_id, basename( $spec['image'] ) );
		if ( $att_id ) {
			set_post_thumbnail( $post_id, $att_id );
		}

		wpp_demo_import_reviews( $post_id, $spec );
	}

	// Bundle product used by the All Access banner.
	if ( ! wpp_demo_find_post_id( 'product', 'product:all-access' ) ) {
		$bundle_id = wp_insert_post( array(
			'post_type'    => 'product',
			'post_status'  => 'publish',
			'post_title'   => 'All Access',
			'post_name'    => 'all-access',
			'post_content' => '<div class="fade-in space-y-8 text-[15px] leading-relaxed"><section><h2 class="text-2xl font-bold tracking-tight">Один платёж — вся витрина Wp Panda</h2><p class="mt-4 leading-[1.85] text-muted">All Access открывает все темы и все плагины сразу: скачивайте, устанавливайте и обновляйте любые продукты без ограничений по времени. Идеально для агентств, студий и разработчиков, которые ведут несколько проектов.</p><ul class="mt-6 space-y-3"><li>Все текущие и будущие продукты каталога</li><li>Пожизненные обновления без продлений</li><li>Лицензия на 5 сайтов для каждого продукта</li><li>Приоритетная поддержка в личном кабинете</li></ul></section></div>',
			'post_excerpt' => 'Все темы и плагины — один платёж, доступ навсегда',
		) );
		if ( $bundle_id ) {
			wp_set_object_terms( $bundle_id, array( $cat_bundle ), 'product_cat' );
			update_post_meta( $bundle_id, '_wpp_demo_key', 'product:all-access' );
			update_post_meta( $bundle_id, '_sku', 'WPP-DEMO-ALL-ACCESS' );
			update_post_meta( $bundle_id, '_regular_price', 99900 );
			update_post_meta( $bundle_id, '_sale_price', 29990 );
			update_post_meta( $bundle_id, '_price', 29990 );
			update_post_meta( $bundle_id, '_visibility', 'visible' );
			update_post_meta( $bundle_id, '_stock_status', 'instock' );
			update_post_meta( $bundle_id, '_virtual', 'yes' );
			update_post_meta( $bundle_id, '_downloadable', 'yes' );
			update_post_meta( $bundle_id, '_wpp_version', '2026.10' );
			update_post_meta( $bundle_id, '_wpp_license', 'Навсегда' );
		}
	}
}

/** Variable product: «Количество сайтов» attribute + two variations. */
function wpp_demo_make_variable( $product_id, $spec, $price, $regular ) {
	$options = ! empty( $spec['license_options'] ) ? $spec['license_options'] : array( __( '1 сайт', 'wp-panda' ), __( '5 сайтов', 'wp-panda' ) );

	$attribute = new WC_Product_Attribute();
	$attr_name = __( 'Количество сайтов', 'wp-panda' );
	$attribute->set_id( 0 );
	$attribute->set_name( $attr_name );
	$attribute->set_options( $options );
	$attribute->set_visible( true );
	$attribute->set_variation( true );

	$product = wc_get_product( $product_id );
	$product->set_attributes( array( $attribute ) );
	$product->set_default_attributes( array( sanitize_title( $attr_name ) => $options[0] ) );
	$product->save();

	$tiers = array(
		$options[0] => array( 'price' => $price, 'regular' => $regular ),
	);
	if ( isset( $options[1] ) ) {
		$multi_price          = (int) ( round( ( $price * 1.7 ) / 100 ) * 100 ) - 10;
		$tiers[ $options[1] ] = array( 'price' => $multi_price, 'regular' => (int) ( round( ( $regular * 1.7 ) / 100 ) * 100 ) - 10 );
	}

	foreach ( $tiers as $option => $amounts ) {
		$variation = new WC_Product_Variation();
		$variation->set_parent_id( $product_id );
		$variation->set_status( 'publish' );
		$variation->set_attributes( array( sanitize_title( $attr_name ) => $option ) );
		$variation->set_regular_price( $amounts['regular'] );
		$variation->set_price( $amounts['price'] );
		if ( $amounts['price'] < $amounts['regular'] ) {
			$variation->set_sale_price( $amounts['price'] );
		}
		$variation->set_sku( get_post_meta( $product_id, '_sku', true ) . '-' . sanitize_title( $option ) );
		$variation->set_virtual( true );
		$variation->set_downloadable( true );
		$variation->set_stock_status( 'instock' );
		$variation->save();
	}

	update_post_meta( $product_id, '_price', $price );
}

/** A small changelog stored for the «История версий» panel. */
function wpp_demo_import_changelog( $product_id, $spec ) {
	$base_date = isset( $spec['date'] ) ? strtotime( $spec['date'] ) : strtotime( '2026-09-01' );
	$changelog = array(
		array(
			'version' => $spec['version'],
			'date'    => wpp_human_date( $base_date ),
			'items'   => array(
				__( 'Новые демо-шаблоны и обновлённая типографика', 'wp-panda' ),
				__( 'Совместимость с актуальной версией WooCommerce', 'wp-panda' ),
				__( 'Исправлены мелкие ошибки интерфейса', 'wp-panda' ),
			),
		),
		array(
			'version' => $spec['version'] . '-prev',
			'date'    => wpp_human_date( strtotime( '-45 days', $base_date ) ),
			'items'   => array(
				__( 'Ускорена загрузка витрины и внутренних страниц', 'wp-panda' ),
				__( 'Обновлены схемы разметки Schema.org', 'wp-panda' ),
			),
		),
	);
	update_post_meta( $product_id, '_wpp_changelog', $changelog );
}

/** Reviews (star comments) and a couple of regular comments per product. */
function wpp_demo_import_reviews( $product_id, $spec ) {
	$names = array( 'Мария К.', 'Игорь Северов', 'Анна Ковалёва', 'Дмитрий Ветров', 'Ольга Никитина', 'Павел Гринёв', 'Светлана Р.', 'Артём Лебедев' );
	$texts = array(
		'Отличный продукт! Установил за десять минут, всё завелось с первого раза. Дизайн аккуратный, код чистый.',
		'Пользуюсь второй месяц. Обновления приходят регулярно, поддержка отвечает быстро и по делу.',
		'Брали для клиентского проекта — заказчик в восторге. Документация подробная, разобрались без вопросов.',
		'Хорошее соотношение цены и возможностей. Особенно порадовала скорость загрузки из коробки.',
		'Всё соответствует описанию. Перенесли лицензию на другой домен без проблем.',
	);
	$count = wpp_demo_rand( $spec['slug'] . '-reviews', 3, 5 );
	for ( $i = 0; $i < $count; $i++ ) {
		$seed      = $spec['slug'] . '-review-' . $i;
		$comment_id = wp_insert_comment( array(
			'comment_post_ID' => $product_id,
			'comment_author'  => $names[ wpp_demo_rand( $seed . '-n', 0, count( $names ) - 1 ) ],
			'comment_content' => $texts[ wpp_demo_rand( $seed . '-t', 0, count( $texts ) - 1 ) ],
			'comment_type'    => 'review',
			'comment_approved' => 1,
			'comment_date'    => gmdate( 'Y-m-d H:i:s', strtotime( '-' . wpp_demo_rand( $seed . '-d', 3, 120 ) . ' days' ) ),
		) );
		if ( $comment_id ) {
			add_comment_meta( $comment_id, 'rating', wpp_demo_rand( $seed . '-r', 4, 5 ) );
		}
	}
	if ( wpp_demo_rand( $spec['slug'] . '-cmt', 0, 2 ) > 0 ) {
		wp_insert_comment( array(
			'comment_post_ID'  => $product_id,
			'comment_author'   => $names[ wpp_demo_rand( $spec['slug'] . '-cn', 0, count( $names ) - 1 ) ],
			'comment_content'  => 'Подскажите, лицензия «5 сайтов» позволяет ставить тему на сайты клиентов или только на свои проекты?',
			'comment_approved' => 1,
			'comment_date'     => gmdate( 'Y-m-d H:i:s', strtotime( '-' . wpp_demo_rand( $spec['slug'] . '-cd', 2, 60 ) . ' days' ) ),
		) );
	}
}

/** Blog posts with categories, authors and covers. */
function wpp_demo_import_posts( $data ) {
	$authors = array( 'Анна Ковалёва', 'Павел Гринёв', 'Мария Соколова', 'Игорь Северов' );
	$views   = array( '12,4K просмотров', '9,8K просмотров', '8,1K просмотров', '7,6K просмотров', '6,3K просмотров', '5,9K просмотров', '4,7K просмотров', '3,8K просмотров' );

	$featured_post = isset( $data['homepage']['featured_post'] ) ? $data['homepage']['featured_post'] : '';

	foreach ( (array) $data['posts'] as $spec ) {
		if ( wpp_demo_find_post_id( 'post', $spec['key'] ) ) {
			continue;
		}
		$cat = get_term_by( 'name', $spec['category'], 'category' );
		if ( ! $cat ) {
			$created = wp_insert_term( $spec['category'], 'category', array( 'slug' => sanitize_title( $spec['category'] ) ) );
			$cat     = is_wp_error( $created ) ? null : get_term( $created['term_id'], 'category' );
		}
		$post_id = wp_insert_post( array(
			'post_type'    => 'post',
			'post_status'  => 'publish',
			'post_title'   => sanitize_text_field( $spec['title'] ),
			'post_name'    => sanitize_title( $spec['slug'] ),
			'post_excerpt' => sanitize_textarea_field( $spec['excerpt'] ),
			'post_content' => wp_kses_post( $spec['content'] ),
			'post_date'    => $spec['date'],
			'post_date_gmt' => get_gmt_from_date( $spec['date'] ),
		) );
		if ( ! $post_id ) {
			continue;
		}
		if ( $cat ) {
			wp_set_object_terms( $post_id, array( (int) $cat->term_id ), 'category' );
		}
		update_post_meta( $post_id, '_wpp_demo_key', $spec['key'] );
		update_post_meta( $post_id, '_wpp_demo_author', $authors[ wpp_demo_rand( $spec['slug'] . '-a', 0, count( $authors ) - 1 ) ] );
		update_post_meta( $post_id, '_wpp_demo_read_time', wpp_demo_rand( $spec['slug'] . '-rt', 6, 14 ) );
		update_post_meta( $post_id, '_wpp_views_label', $views[ wpp_demo_rand( $spec['slug'] . '-v', 0, count( $views ) - 1 ) ] );
		if ( $featured_post && $spec['slug'] === $featured_post ) {
			update_post_meta( $post_id, '_wpp_demo_featured_order', 1 );
		}
		$image_path = get_template_directory() . '/assets/demo/articles/' . $spec['slug'] . '.jpg';
		$att_id     = wpp_demo_attach_image( $image_path, $post_id, $spec['slug'] . '.jpg' );
		if ( $att_id ) {
			set_post_thumbnail( $post_id, $att_id );
		}
	}
}

/** KB: one parent page + article child pages. */
function wpp_demo_import_kb( $data ) {
	$kb_id = wpp_demo_find_post_id( 'kb', 'kb:index' );
	if ( ! $kb_id ) {
		$kb_id = wp_insert_post( array(
			'post_type'   => 'page',
			'post_status' => 'publish',
			'post_title'  => __( 'База знаний', 'wp-panda' ),
			'post_name'   => 'kb',
			'post_content' => '',
		) );
		if ( $kb_id ) {
			update_post_meta( $kb_id, '_wpp_demo_key', 'kb:index' );
			update_post_meta( $kb_id, '_wp_page_template', 'page-kb.php' );
		}
	}
	if ( ! $kb_id ) {
		return;
	}
	foreach ( (array) $data['kb_articles'] as $spec ) {
		if ( wpp_demo_find_post_id( 'kb', $spec['key'] ) ) {
			continue;
		}
		$page_id = wp_insert_post( array(
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_title'   => sanitize_text_field( $spec['title'] ),
			'post_name'    => sanitize_title( $spec['slug'] ),
			'post_excerpt' => sanitize_textarea_field( $spec['excerpt'] ),
			'post_content' => wp_kses_post( $spec['content'] ),
			'post_parent'  => $kb_id,
		) );
		if ( $page_id ) {
			update_post_meta( $page_id, '_wpp_demo_key', $spec['key'] );
			update_post_meta( $page_id, '_wpp_kb_category', $spec['category'] );
			update_post_meta( $page_id, '_wpp_demo_read_time', wpp_demo_rand( 'kb-' . $spec['slug'], 3, 8 ) );
		}
	}
}

/** Service pages: FAQ, UI kit, static front page and blog index. */
function wpp_demo_import_pages( $data ) {
	if ( ! wpp_demo_find_post_id( 'page', 'page:faq' ) ) {
		$faq_id = wp_insert_post( array(
			'post_type'   => 'page',
			'post_status' => 'publish',
			'post_title'  => __( 'Частые вопросы', 'wp-panda' ),
			'post_name'   => 'faq',
			'post_content' => '',
		) );
		if ( $faq_id ) {
			update_post_meta( $faq_id, '_wpp_demo_key', 'page:faq' );
			update_post_meta( $faq_id, '_wp_page_template', 'page-faq.php' );
		}
	}
	if ( ! wpp_demo_find_post_id( 'page', 'page:ui-kit' ) ) {
		$ui_id = wp_insert_post( array(
			'post_type'   => 'page',
			'post_status' => 'publish',
			'post_title'  => __( 'UI-кит Wp Panda', 'wp-panda' ),
			'post_name'   => 'ui-kit',
			'post_content' => '',
		) );
		if ( $ui_id ) {
			update_post_meta( $ui_id, '_wpp_demo_key', 'page:ui-kit' );
			update_post_meta( $ui_id, '_wp_page_template', 'page-ui-kit.php' );
		}
	}
	if ( ! wpp_demo_find_post_id( 'page', 'page:front' ) ) {
		$front_id = wp_insert_post( array(
			'post_type'   => 'page',
			'post_status' => 'publish',
			'post_title'  => __( 'Главная', 'wp-panda' ),
			'post_name'   => 'home',
			'post_content' => '',
		) );
		if ( $front_id ) {
			update_post_meta( $front_id, '_wpp_demo_key', 'page:front' );
			update_option( 'show_on_front', 'page' );
			update_option( 'page_on_front', $front_id );
		}
	}
	if ( ! (int) get_option( 'page_for_posts' ) ) {
		$blog_id = wp_insert_post( array(
			'post_type'   => 'page',
			'post_status' => 'publish',
			'post_title'  => __( 'Блог', 'wp-panda' ),
			'post_name'   => 'blog',
			'post_content' => '',
		) );
		if ( $blog_id ) {
			update_post_meta( $blog_id, '_wpp_demo_key', 'page:blog' );
			update_option( 'page_for_posts', $blog_id );
		}
	}
}

/** Site-wide options, WC pages, menu. */
function wpp_demo_configure_site() {
	update_option( 'blogname', 'Wp Panda' );
	update_option( 'blogdescription', __( 'Темы и плагины для WordPress', 'wp-panda' ) );
	update_option( 'permalink_structure', '/%postname%/' );
	update_option( 'posts_per_page', 9 );
	update_option( 'default_comment_status', 'open' );

	if ( function_exists( 'WC' ) ) {
		update_option( 'woocommerce_currency', 'RUB' );
		update_option( 'woocommerce_currency_pos', 'right_space' );
		update_option( 'woocommerce_price_thousand_sep', ' ' );
		update_option( 'woocommerce_price_decimal_sep', ',' );
		update_option( 'woocommerce_price_num_decimals', '0' );
		update_option( 'woocommerce_enable_reviews', 'yes' );
		update_option( 'woocommerce_cart_redirect_after_add', 'no' );

		// Make sure the WC pages exist (they do after WC install, but be safe).
		foreach ( array(
			'shop'      => __( 'Каталог', 'wp-panda' ),
			'cart'      => __( 'Корзина', 'wp-panda' ),
			'checkout'  => __( 'Оформление заказа', 'wp-panda' ),
			'myaccount' => __( 'Личный кабинет', 'wp-panda' ),
		) as $key => $title ) {
			$page_id = (int) get_option( 'woocommerce_' . $key . '_page_id' );
			if ( $page_id > 0 && get_post( $page_id ) ) {
				continue;
			}
			$page_id = wp_insert_post( array(
				'post_type'    => 'page',
				'post_status'  => 'publish',
				'post_title'   => $title,
				'post_name'    => str_replace( '_', '-', $key ),
				'post_content' => 'shop' === $key ? '' : ( 'cart' === $key ? '[woocommerce_cart]' : ( 'checkout' === $key ? '[woocommerce_checkout]' : '[woocommerce_my_account]' ) ),
			) );
			if ( $page_id ) {
				update_option( 'woocommerce_' . $key . '_page_id', $page_id );
			}
		}
	}

	wpp_demo_configure_menu();
	flush_rewrite_rules();
}

/** Primary menu matching the layout navigation. */
function wpp_demo_configure_menu() {
	$locations = get_theme_mod( 'nav_menu_locations', array() );
	if ( ! empty( $locations['primary'] ) && wp_get_nav_menu_object( $locations['primary'] ) ) {
		return;
	}
	$menu_id = wp_create_nav_menu( __( 'Главное меню', 'wp-panda' ) );
	if ( is_wp_error( $menu_id ) ) {
		return;
	}
	$shop_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
	$blog_url = (int) get_option( 'page_for_posts' ) ? get_permalink( (int) get_option( 'page_for_posts' ) ) : home_url( '/blog/' );
	wp_update_nav_menu_item( $menu_id, 0, array( 'menu-item-title' => __( 'Каталог', 'wp-panda' ), 'menu-item-url' => $shop_url, 'menu-item-status' => 'publish' ) );
	wp_update_nav_menu_item( $menu_id, 0, array( 'menu-item-title' => __( 'Блог', 'wp-panda' ), 'menu-item-url' => $blog_url, 'menu-item-status' => 'publish' ) );
	wp_update_nav_menu_item( $menu_id, 0, array( 'menu-item-title' => __( 'База знаний', 'wp-panda' ), 'menu-item-url' => home_url( '/kb/' ), 'menu-item-status' => 'publish' ) );
	wp_update_nav_menu_item( $menu_id, 0, array( 'menu-item-title' => __( 'FAQ', 'wp-panda' ), 'menu-item-url' => home_url( '/faq/' ), 'menu-item-status' => 'publish' ) );
	$locations['primary'] = $menu_id;
	set_theme_mod( 'nav_menu_locations', $locations );
}

/* ------------------------------------------------------------------------ */
/* Admin tools screen + auto import.                                         */
/* ------------------------------------------------------------------------ */

/** Tools → Wp Panda demo. */
function wpp_demo_admin_menu() {
	add_management_page(
		__( 'Демо-контент Wp Panda', 'wp-panda' ),
		__( 'Демо Wp Panda', 'wp-panda' ),
		'manage_options',
		'wpp-demo',
		'wpp_demo_tools_page'
	);
}
add_action( 'admin_menu', 'wpp_demo_admin_menu' );

/** Render the tools screen and handle the import action. */
function wpp_demo_tools_page() {
	if ( isset( $_POST['wpp_demo_run'] ) && check_admin_referer( 'wpp_demo_import' ) ) {
		delete_option( 'wpp_demo_imported' );
		wpp_demo_import();
		echo '<div class="notice notice-success"><p>' . esc_html__( 'Демо-контент импортирован.', 'wp-panda' ) . '</p></div>';
	}
	$done = (bool) get_option( 'wpp_demo_imported' );
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Демо-контент Wp Panda', 'wp-panda' ); ?></h1>
		<p><?php esc_html_e( 'Импорт создаёт 17 продуктов WooCommerce, 12 статей блога, 21 статью базы знаний, страницы и меню — точно как в вёрстке.', 'wp-panda' ); ?></p>
		<?php if ( $done ) : ?>
			<p><strong><?php esc_html_e( 'Контент уже импортирован. Повторный импорт создаст только недостающее.', 'wp-panda' ); ?></strong></p>
		<?php endif; ?>
		<form method="post">
			<?php wp_nonce_field( 'wpp_demo_import' ); ?>
			<button class="button button-primary" name="wpp_demo_run" value="1"><?php esc_html_e( 'Импортировать демо-контент', 'wp-panda' ); ?></button>
		</form>
	</div>
	<?php
}

/** Import automatically right after the theme is activated on an empty store. */
function wpp_demo_auto_import() {
	if ( get_option( 'wpp_demo_imported' ) ) {
		return;
	}
	if ( ! class_exists( 'WooCommerce' ) ) {
		return;
	}
	$products = get_posts( array( 'post_type' => 'product', 'post_status' => 'publish', 'posts_per_page' => 1, 'fields' => 'ids' ) );
	if ( $products ) {
		return;
	}
	wpp_demo_import();
}
add_action( 'after_switch_theme', 'wpp_demo_auto_import', 20 );
