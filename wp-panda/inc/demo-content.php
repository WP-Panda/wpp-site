<?php
/**
 * Optional, non-destructive importer for the Wp Panda demo catalog and articles.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

add_action( 'admin_menu', 'wpp_demo_register_admin_page' );
add_action( 'admin_post_wpp_import_demo_content', 'wpp_demo_handle_import' );

/** Register the demo importer under Tools. */
function wpp_demo_register_admin_page() {
	add_management_page(
		__( 'Демо-контент Wp Panda', 'wp-panda' ),
		__( 'Демо-контент Wp Panda', 'wp-panda' ),
		'manage_options',
		'wpp-demo-content',
		'wpp_demo_render_admin_page'
	);
}

/** Render the one-click importer screen. */
function wpp_demo_render_admin_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$result_key = 'wpp_demo_result_' . get_current_user_id();
	$result     = get_transient( $result_key );
	if ( false !== $result ) {
		delete_transient( $result_key );
	}
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Демо-контент Wp Panda', 'wp-panda' ); ?></h1>
		<p><?php esc_html_e( 'Импортируйте наполнение из исходной верстки: каталог товаров, журнал, базу знаний, FAQ, обложки и пункты меню.', 'wp-panda' ); ?></p>

		<?php if ( ! class_exists( 'WooCommerce' ) ) : ?>
			<div class="notice notice-warning inline"><p><?php esc_html_e( 'WooCommerce не активен: страницы и записи можно импортировать сейчас, товары будут пропущены. Для полного демо установите и активируйте WooCommerce.', 'wp-panda' ); ?></p></div>
		<?php endif; ?>

		<?php if ( is_array( $result ) ) : ?>
			<div class="notice <?php echo empty( $result['errors'] ) ? 'notice-success' : 'notice-warning'; ?> inline">
				<p><strong><?php esc_html_e( 'Импорт завершён.', 'wp-panda' ); ?></strong>
					<?php
					printf(
						esc_html__( 'Создано: %1$d товаров, %2$d записей, %3$d страниц и %4$d изображений. Пропущено: %5$d товаров, %6$d записей, %7$d страниц.', 'wp-panda' ),
						absint( $result['products_created'] ),
						absint( $result['posts_created'] ),
						absint( $result['pages_created'] ),
						absint( $result['media_created'] ),
						absint( $result['products_skipped'] ),
						absint( $result['posts_skipped'] ),
						absint( $result['pages_skipped'] )
					);
					?>
				</p>
				<?php if ( ! empty( $result['errors'] ) ) : ?>
					<ul><?php foreach ( $result['errors'] as $error ) : ?><li><?php echo esc_html( $error ); ?></li><?php endforeach; ?></ul>
				<?php endif; ?>
			</div>
		<?php endif; ?>

		<div class="card" style="max-width: 780px;">
			<h2><?php esc_html_e( 'Что будет добавлено', 'wp-panda' ); ?></h2>
			<ul class="ul-disc">
				<li><?php esc_html_e( '16 демонстрационных товаров WooCommerce: 8 тем с вариантами лицензии на 1 и 5 сайтов и 8 плагинов с ценами из макета.', 'wp-panda' ); ?></li>
				<li><?php esc_html_e( '12 статей блога с обложками, рубриками и текстами из верстки.', 'wp-panda' ); ?></li>
				<li><?php esc_html_e( 'Страницы FAQ и базы знаний, включая 21 дочернюю инструкцию.', 'wp-panda' ); ?></li>
				<li><?php esc_html_e( 'Демо-меню для каталога, блога, базы знаний и FAQ; назначение меню не заменяет уже настроенные расположения.', 'wp-panda' ); ?></li>
			</ul>
			<p><strong><?php esc_html_e( 'Важно:', 'wp-panda' ); ?></strong> <?php esc_html_e( 'это демонстрационные цены и тексты. ZIP-файлы товаров, настоящие лицензии и платежные интеграции не создаются. Импорт не добавляет тестовые заказы, учетные записи, купоны или содержимое корзины. Перед публикацией магазина замените демонстрационные данные.', 'wp-panda' ); ?></p>
			<p><?php esc_html_e( 'Импорт можно запускать повторно: он пропускает уже созданные демо-объекты и не перезаписывает ваш контент. Существующие главная страница, меню и выбранная страница записей сохраняются.', 'wp-panda' ); ?></p>
			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<input type="hidden" name="action" value="wpp_import_demo_content">
				<?php wp_nonce_field( 'wpp_import_demo_content' ); ?>
				<?php submit_button( __( 'Импортировать демо-контент', 'wp-panda' ), 'primary', 'submit', false ); ?>
			</form>
		</div>
	</div>
	<?php
}

/** Validate the request, run the importer and return to its admin screen. */
function wpp_demo_handle_import() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( esc_html__( 'Недостаточно прав для импорта демо-контента.', 'wp-panda' ) );
	}

	check_admin_referer( 'wpp_import_demo_content' );
	if ( function_exists( 'set_time_limit' ) ) {
		@set_time_limit( 120 ); // phpcs:ignore Squiz.PHP.DiscouragedFunctions.Discouraged
	}

	$result = wpp_demo_import_all();
	set_transient( 'wpp_demo_result_' . get_current_user_id(), $result, MINUTE_IN_SECONDS );

	wp_safe_redirect( admin_url( 'tools.php?page=wpp-demo-content' ) );
	exit;
}

/** Load the bundled static data. */
function wpp_demo_load_data() {
	$data_path = get_template_directory() . '/assets/demo/demo-content.json';
	if ( ! is_readable( $data_path ) ) {
		return new WP_Error( 'wpp_demo_data_missing', __( 'Не найден файл демо-данных темы.', 'wp-panda' ) );
	}

	$data = json_decode( file_get_contents( $data_path ), true );
	if ( ! is_array( $data ) || empty( $data['products'] ) || empty( $data['posts'] ) ) {
		return new WP_Error( 'wpp_demo_data_invalid', __( 'Файл демо-данных поврежден или имеет неверный формат.', 'wp-panda' ) );
	}

	return $data;
}

/** Import all supported demo objects without replacing existing content. */
function wpp_demo_import_all() {
	$data = wpp_demo_load_data();
	if ( is_wp_error( $data ) ) {
		return array(
			'products_created' => 0,
			'products_skipped' => 0,
			'posts_created'    => 0,
			'posts_skipped'    => 0,
			'pages_created'    => 0,
			'pages_skipped'    => 0,
			'media_created'    => 0,
			'errors'           => array( $data->get_error_message() ),
		);
	}

	$result = array(
		'products_created' => 0,
		'products_skipped' => 0,
		'posts_created'    => 0,
		'posts_skipped'    => 0,
		'pages_created'    => 0,
		'pages_skipped'    => 0,
		'media_created'    => 0,
		'errors'           => array(),
	);

	$page_ids = array();
	$blog_id  = wpp_demo_import_page( 'page:blog', __( 'Блог', 'wp-panda' ), 'blog', '', 0, $result );
	$faq_id   = wpp_demo_import_page( 'page:faq', __( 'Частые вопросы', 'wp-panda' ), 'faq', wpp_demo_build_faq( $data ), 0, $result );
	$kb_id    = wpp_demo_import_page( 'page:kb', __( 'База знаний', 'wp-panda' ), 'kb', '', 0, $result );

	if ( $blog_id ) {
		$page_ids['blog'] = $blog_id;
		$current_blog     = (int) get_option( 'page_for_posts' );
		if ( ! $current_blog || 'page:blog' === get_post_meta( $current_blog, '_wpp_demo_key', true ) ) {
			update_option( 'page_for_posts', $blog_id );
		}
	}
	if ( $faq_id ) {
		$page_ids['faq'] = $faq_id;
	}
	if ( $kb_id ) {
		$page_ids['kb'] = $kb_id;
	}

	$kb_page_ids = array();
	foreach ( $data['kb_articles'] as $article ) {
		$key      = 'kb:' . $article['slug'];
		$page_id  = wpp_demo_import_page( $key, $article['title'], $article['slug'], wpp_demo_kb_article_content( $article, $data ), $kb_id, $result );
		if ( $page_id ) {
			$kb_page_ids[ $article['slug'] ] = $page_id;
			update_post_meta( $page_id, '_wpp_demo_kb_category', sanitize_text_field( $article['category'] ) );
		}
	}

	if ( $kb_id ) {
		$kb_content = wpp_demo_build_kb_index( $data, $kb_page_ids );
		if ( '' === trim( (string) get_post_field( 'post_content', $kb_id ) ) ) {
			wp_update_post( array(
				'ID'           => $kb_id,
				'post_content' => wp_kses_post( $kb_content ),
			) );
		}
	}

	if ( ! empty( $data['posts'] ) ) {
		foreach ( $data['posts'] as $post_data ) {
			wpp_demo_import_post( $post_data, $result );
		}
	}

	if ( class_exists( 'WooCommerce' ) ) {
		$theme_cat_id  = wpp_demo_get_term_id( 'Темы WordPress', 'wordpress-themes', 'product_cat', $result );
		$plugin_cat_id = wpp_demo_get_term_id( 'Плагины WordPress', 'wordpress-plugins', 'product_cat', $result );

		foreach ( $data['products'] as $product_data ) {
			$category_id = 'wordpress-themes' === $product_data['category'] ? $theme_cat_id : $plugin_cat_id;
			if ( $category_id ) {
				wpp_demo_import_product( $product_data, $category_id, $result );
			} else {
				$result['errors'][] = sprintf( 'Не удалось создать категорию товара «%s».', sanitize_text_field( $product_data['name'] ) );
			}
		}
	} else {
		$result['products_skipped'] = count( $data['products'] );
	}

	wpp_demo_import_menu( $page_ids, $result );

	return $result;
}

/** Find an object created by this importer. */
function wpp_demo_find_post_id( $post_type, $demo_key ) {
	$posts = get_posts( array(
		'post_type'      => $post_type,
		'post_status'    => 'any',
		'posts_per_page' => 1,
		'fields'         => 'ids',
		'no_found_rows'  => true,
		'meta_key'       => '_wpp_demo_key',
		'meta_value'     => $demo_key,
	) );

	return $posts ? (int) $posts[0] : 0;
}

/** Get an existing taxonomy term or create it without changing existing term data. */
function wpp_demo_get_term_id( $name, $slug, $taxonomy, &$result ) {
	$term = get_term_by( 'slug', $slug, $taxonomy );
	if ( ! $term ) {
		$term = get_term_by( 'name', $name, $taxonomy );
	}

	if ( $term && ! is_wp_error( $term ) ) {
		return (int) $term->term_id;
	}

	$created = wp_insert_term( $name, $taxonomy, array( 'slug' => $slug ) );
	if ( is_wp_error( $created ) ) {
		$result['errors'][] = sprintf( 'Не удалось создать рубрику «%s»: %s', sanitize_text_field( $name ), $created->get_error_message() );
		return 0;
	}

	$term_id = (int) $created['term_id'];
	update_term_meta( $term_id, '_wpp_demo_key', 'term:' . $taxonomy . ':' . $slug );

	return $term_id;
}

/** Create an informational page once and preserve any later edits. */
function wpp_demo_import_page( $demo_key, $title, $slug, $content, $parent_id, &$result ) {
	$existing_id = wpp_demo_find_post_id( 'page', $demo_key );
	if ( $existing_id ) {
		$result['pages_skipped']++;
		return $existing_id;
	}

	$post_id = wp_insert_post( array(
		'post_type'      => 'page',
		'post_status'    => 'publish',
		'post_title'     => sanitize_text_field( $title ),
		'post_name'      => sanitize_title( $slug ),
		'post_parent'    => absint( $parent_id ),
		'post_content'   => wp_kses_post( $content ),
		'comment_status' => 'closed',
		'ping_status'    => 'closed',
	), true );

	if ( is_wp_error( $post_id ) ) {
		$result['errors'][] = sprintf( 'Не удалось создать страницу «%s»: %s', sanitize_text_field( $title ), $post_id->get_error_message() );
		return 0;
	}

	update_post_meta( $post_id, '_wpp_demo_key', $demo_key );
	$result['pages_created']++;

	return (int) $post_id;
}

/** Import a WordPress post and its bundled editorial cover. */
function wpp_demo_import_post( $post_data, &$result ) {
	$post_type = 'post';
	$demo_key  = $post_data['key'];
	$post_id   = wpp_demo_find_post_id( $post_type, $demo_key );

	if ( $post_id ) {
		$result['posts_skipped']++;
		wpp_demo_attach_image( $post_id, $post_data['image'], $result );
		return $post_id;
	}

	$category_id = wpp_demo_get_term_id( $post_data['category'], sanitize_title( $post_data['category'] ), 'category', $result );
	$post_id     = wp_insert_post( array(
		'post_type'      => 'post',
		'post_status'    => 'publish',
		'post_title'     => sanitize_text_field( $post_data['title'] ),
		'post_name'      => sanitize_title( $post_data['slug'] ),
		'post_excerpt'   => sanitize_textarea_field( $post_data['excerpt'] ),
		'post_content'   => wp_kses_post( $post_data['content'] ),
		'post_date'      => sanitize_text_field( $post_data['date'] ),
		'post_date_gmt'  => get_gmt_from_date( sanitize_text_field( $post_data['date'] ) ),
		'comment_status' => 'closed',
		'ping_status'    => 'closed',
	), true );

	if ( is_wp_error( $post_id ) ) {
		$result['errors'][] = sprintf( 'Не удалось создать статью «%s»: %s', sanitize_text_field( $post_data['title'] ), $post_id->get_error_message() );
		return 0;
	}

	update_post_meta( $post_id, '_wpp_demo_key', $demo_key );
	if ( $category_id ) {
		wp_set_post_categories( $post_id, array( $category_id ), false );
	}
	$result['posts_created']++;
	wpp_demo_attach_image( $post_id, $post_data['image'], $result );

	return (int) $post_id;
}

/** Attach a local, bundled JPG without replacing a pre-existing user thumbnail. */
function wpp_demo_attach_image( $post_id, $relative_path, &$result ) {
	$post_id = absint( $post_id );
	$owned_image_id = (int) get_post_meta( $post_id, '_wpp_demo_image_id', true );
	$current_image  = (int) get_post_thumbnail_id( $post_id );

	if ( $owned_image_id && $current_image === $owned_image_id ) {
		return $owned_image_id;
	}
	if ( $current_image ) {
		return $current_image;
	}

	$relative_path = ltrim( (string) $relative_path, '/\\' );
	$source_path   = get_template_directory() . '/assets/demo/' . $relative_path;
	if ( ! is_readable( $source_path ) ) {
		$result['errors'][] = sprintf( 'Не найдено изображение демо-контента: %s', sanitize_text_field( $relative_path ) );
		return 0;
	}

	$contents = file_get_contents( $source_path );
	if ( false === $contents ) {
		$result['errors'][] = sprintf( 'Не удалось прочитать изображение демо-контента: %s', sanitize_text_field( $relative_path ) );
		return 0;
	}

	$upload = wp_upload_bits( wp_basename( $source_path ), null, $contents );
	if ( ! empty( $upload['error'] ) ) {
		$result['errors'][] = sprintf( 'Не удалось загрузить изображение %s: %s', sanitize_text_field( $relative_path ), sanitize_text_field( $upload['error'] ) );
		return 0;
	}

	$file_type  = wp_check_filetype( wp_basename( $upload['file'] ) );
	$attachment = wp_insert_attachment( array(
		'post_mime_type' => $file_type['type'] ? $file_type['type'] : 'image/jpeg',
		'post_title'     => sanitize_text_field( pathinfo( $source_path, PATHINFO_FILENAME ) ),
		'post_status'    => 'inherit',
	), $upload['file'], $post_id, true );

	if ( is_wp_error( $attachment ) || ! $attachment ) {
		$message = is_wp_error( $attachment ) ? $attachment->get_error_message() : __( 'WordPress вернул пустой ID вложения.', 'wp-panda' );
		$result['errors'][] = sprintf( 'Не удалось создать медиафайл для %s: %s', sanitize_text_field( $relative_path ), sanitize_text_field( $message ) );
		return 0;
	}

	require_once ABSPATH . 'wp-admin/includes/image.php';
	$metadata = wp_generate_attachment_metadata( $attachment, $upload['file'] );
	if ( is_array( $metadata ) ) {
		wp_update_attachment_metadata( $attachment, $metadata );
	}

	update_post_meta( $attachment, '_wp_attachment_image_alt', sanitize_text_field( get_the_title( $post_id ) ) );
	set_post_thumbnail( $post_id, $attachment );
	update_post_meta( $post_id, '_wpp_demo_image_id', (int) $attachment );
	$result['media_created']++;

	return (int) $attachment;
}

/** Build a simple product attribute for WooCommerce's native product data. */
function wpp_demo_make_attribute( $name, $options, $position, $is_variation = false ) {
	$attribute = new WC_Product_Attribute();
	$attribute->set_id( 0 );
	$attribute->set_name( $name );
	$attribute->set_options( (array) $options );
	$attribute->set_position( absint( $position ) );
	$attribute->set_visible( true );
	$attribute->set_variation( (bool) $is_variation );

	return $attribute;
}

/** Merge demo topic and compatibility labels into native WooCommerce product tags. */
function wpp_demo_product_tag_names( $data ) {
	$tags = ! empty( $data['tags'] ) ? (array) $data['tags'] : array();
	if ( ! empty( $data['compatibility'] ) ) {
		$tags = array_merge( $tags, preg_split( '/\s*,\s*/u', (string) $data['compatibility'], -1, PREG_SPLIT_NO_EMPTY ) );
	}

	$tags = array_map( 'sanitize_text_field', $tags );
	$tags = array_filter( $tags, 'strlen' );

	return array_values( array_unique( $tags ) );
}

/** Add demo tags without removing product tags managed by the store owner. */
function wpp_demo_sync_product_tags( $product_id, $data ) {
	$tags = wpp_demo_product_tag_names( $data );
	if ( $tags && taxonomy_exists( 'product_tag' ) ) {
		wp_set_object_terms( absint( $product_id ), $tags, 'product_tag', true );
	}
}

/** Import a simple plugin product or a variable theme product using WooCommerce CRUD objects. */
function wpp_demo_import_product( $data, $category_id, &$result ) {
	$product_id = wpp_demo_find_post_id( 'product', $data['key'] );
	if ( $product_id ) {
		$result['products_skipped']++;
		wpp_demo_sync_product_tags( $product_id, $data );
		if ( 'variable' === $data['type'] ) {
			wpp_demo_ensure_theme_variations( $product_id, $data, $result );
		}
		wpp_demo_attach_image( $product_id, $data['image'], $result );
		return $product_id;
	}

	if ( ! class_exists( 'WC_Product_Simple' ) || ! class_exists( 'WC_Product_Variable' ) || ! class_exists( 'WC_Product_Variation' ) || ! class_exists( 'WC_Product_Attribute' ) ) {
		$result['errors'][] = sprintf( 'WooCommerce недоступен для товара «%s».', sanitize_text_field( $data['name'] ) );
		return 0;
	}

	$is_variable = 'variable' === $data['type'];
	$product     = $is_variable ? new WC_Product_Variable() : new WC_Product_Simple();
	$product->set_name( sanitize_text_field( $data['name'] ) );
	$product->set_status( 'publish' );
	$product->set_catalog_visibility( 'visible' );
	$product->set_virtual( true );
	$product->set_downloadable( false );
	$product->set_manage_stock( false );
	$product->set_stock_status( 'instock' );
	$product->set_category_ids( array( absint( $category_id ) ) );
	$product->set_description( wp_kses_post( $data['description'] ) );
	$product->set_short_description( wp_kses_post( $data['short_description'] ) );

	$sku = sanitize_text_field( $data['sku'] );
	if ( function_exists( 'wc_get_product_id_by_sku' ) && wc_get_product_id_by_sku( $sku ) ) {
		$sku = '';
	}
	if ( '' !== $sku ) {
		$product->set_sku( $sku );
	}

	$attributes = array();
	if ( $is_variable ) {
		$attributes[] = wpp_demo_make_attribute( 'Количество сайтов', $data['license_options'], 0, true );
	}
	$details = array(
		'Версия'          => $data['version'],
		'WordPress'       => $data['wordpress'],
		'PHP'             => $data['php'],
		'Совместимость'   => $data['compatibility'],
	);
	$position = count( $attributes );
	foreach ( $details as $label => $value ) {
		if ( '' !== trim( (string) $value ) ) {
			$attributes[] = wpp_demo_make_attribute( $label, array( sanitize_text_field( $value ) ), $position, false );
			$position++;
		}
	}
	if ( $attributes ) {
		$product->set_attributes( $attributes );
	}
	if ( ! $is_variable ) {
		$product->set_regular_price( (string) $data['regular_price'] );
		$product->set_sale_price( (string) $data['sale_price'] );
	}

	try {
		$product_id = $product->save();
	} catch ( Exception $exception ) {
		$result['errors'][] = sprintf( 'Не удалось сохранить товар «%s»: %s', sanitize_text_field( $data['name'] ), $exception->getMessage() );
		return 0;
	}

	if ( ! $product_id ) {
		$result['errors'][] = sprintf( 'WooCommerce не сохранил товар «%s».', sanitize_text_field( $data['name'] ) );
		return 0;
	}

	wp_update_post( array(
		'ID'        => $product_id,
		'post_name' => sanitize_title( $data['slug'] ),
	) );
	update_post_meta( $product_id, '_wpp_demo_key', $data['key'] );

	if ( $is_variable ) {
		wpp_demo_ensure_theme_variations( $product_id, $data, $result );
	}

	wpp_demo_sync_product_tags( $product_id, $data );

	$result['products_created']++;
	wpp_demo_attach_image( $product_id, $data['image'], $result );

	return (int) $product_id;
}

/** Ensure a partially completed variable demo product has each source license option. */
function wpp_demo_ensure_theme_variations( $product_id, $data, &$result ) {
	if ( ! class_exists( 'WC_Product_Variation' ) || ! function_exists( 'wc_get_product' ) ) {
		return;
	}

	$product         = wc_get_product( $product_id );
	$attribute_key   = sanitize_title( 'Количество сайтов' );
	$existing_values = array();
	if ( $product && method_exists( $product, 'get_children' ) ) {
		foreach ( $product->get_children() as $variation_id ) {
			$attribute_value = get_post_meta( $variation_id, 'attribute_' . $attribute_key, true );
			if ( '' !== (string) $attribute_value ) {
				$existing_values[] = sanitize_title( (string) $attribute_value );
			}
		}
	}

	foreach ( $data['license_options'] as $license ) {
		if ( in_array( sanitize_title( (string) $license ), $existing_values, true ) ) {
			continue;
		}

		$variation = new WC_Product_Variation();
		$variation->set_parent_id( absint( $product_id ) );
		$variation->set_status( 'publish' );
		$variation->set_virtual( true );
		$variation->set_downloadable( false );
		$variation->set_manage_stock( false );
		$variation->set_attributes( array( $attribute_key => $license ) );
		$variation->set_regular_price( (string) $data['regular_price'] );
		$variation->set_sale_price( (string) $data['sale_price'] );
		try {
			$variation_id = $variation->save();
			if ( ! $variation_id ) {
				$result['errors'][] = sprintf( 'Не удалось сохранить вариант «%s» товара «%s».', sanitize_text_field( $license ), sanitize_text_field( $data['name'] ) );
			}
		} catch ( Exception $exception ) {
			$result['errors'][] = sprintf( 'Не удалось создать вариант «%s» товара «%s»: %s', sanitize_text_field( $license ), sanitize_text_field( $data['name'] ), $exception->getMessage() );
		}
	}
}

/** Group the source FAQ entries into semantic, keyboard-accessible disclosures. */
function wpp_demo_build_faq( $data ) {
	$grouped = array();
	foreach ( $data['faq'] as $entry ) {
		$grouped[ $entry['category'] ][] = $entry;
	}

	$html  = '<p class="wpp-demo-notice"><strong>' . esc_html__( 'Демо-контент.', 'wp-panda' ) . '</strong> ' . esc_html( $data['demo_notice'] ) . '</p>';
	$html .= '<p>' . esc_html__( 'Короткие ответы о покупке, установке и лицензиях на темы и плагины WordPress.', 'wp-panda' ) . '</p>';
	foreach ( $grouped as $category => $entries ) {
		$html .= '<section class="wpp-demo-faq-group"><h2>' . esc_html( $category ) . '</h2>';
		foreach ( $entries as $entry ) {
			$html .= '<details class="wpp-demo-faq"><summary>' . esc_html( $entry['q'] ) . '</summary><div><p>' . esc_html( $entry['a'] ) . '</p></div></details>';
		}
		$html .= '</section>';
	}

	return $html;
}

/** Render article copy and a clear demo-only disclaimer. */
function wpp_demo_kb_article_content( $article, $data ) {
	$content  = '<p class="wpp-demo-notice">' . esc_html( $data['demo_notice'] ) . '</p>';
	$content .= '<p class="wpp-demo-standfirst">' . esc_html( $article['excerpt'] ) . '</p>';
	$content .= $article['content'];

	return $content;
}

/** Build the knowledge-base index using the imported child page permalinks. */
function wpp_demo_build_kb_index( $data, $page_ids ) {
	$grouped = array();
	foreach ( $data['kb_articles'] as $article ) {
		$grouped[ $article['category'] ][] = $article;
	}

	$html  = '<p class="wpp-demo-notice"><strong>' . esc_html__( 'Демо-контент.', 'wp-panda' ) . '</strong> ' . esc_html( $data['demo_notice'] ) . '</p>';
	$html .= '<p>' . esc_html__( 'Инструкции по установке, лицензиям, обновлениям и работе с продуктами.', 'wp-panda' ) . '</p>';
	foreach ( $grouped as $category => $articles ) {
		$html .= '<section class="wpp-demo-kb-group"><h2>' . esc_html( $category ) . '</h2><ul class="wpp-demo-kb-list">';
		foreach ( $articles as $article ) {
			$article_id = isset( $page_ids[ $article['slug'] ] ) ? absint( $page_ids[ $article['slug'] ] ) : 0;
			$permalink  = $article_id ? get_permalink( $article_id ) : home_url( '/kb/' . rawurlencode( $article['slug'] ) . '/' );
			$html      .= '<li><h3><a href="' . esc_url( $permalink ) . '">' . esc_html( $article['title'] ) . '</a></h3><p>' . esc_html( $article['excerpt'] ) . '</p></li>';
		}
		$html .= '</ul></section>';
	}

	return $html;
}

/** Create a small navigation menu without replacing existing menu locations. */
function wpp_demo_import_menu( $page_ids, &$result ) {
	$menu = get_term_by( 'slug', 'wp-panda-demo', 'nav_menu' );
	if ( $menu && ! is_wp_error( $menu ) ) {
		$menu_id = (int) $menu->term_id;
	} else {
		$menu_id = wp_create_nav_menu( 'Wp Panda Demo' );
		if ( is_wp_error( $menu_id ) ) {
			$result['errors'][] = sprintf( 'Не удалось создать демо-меню: %s', $menu_id->get_error_message() );
			return;
		}
	}

	$items = wp_get_nav_menu_items( $menu_id );
	$existing_keys = array();
	if ( $items ) {
		foreach ( $items as $item ) {
			$existing_key = get_post_meta( $item->ID, '_wpp_demo_menu_key', true );
			if ( $existing_key ) {
				$existing_keys[ $existing_key ] = true;
			}
		}
	}

	$shop_id = function_exists( 'wc_get_page_id' ) ? (int) wc_get_page_id( 'shop' ) : 0;
	if ( $shop_id < 1 ) {
		$shop_id = 0;
	}
	$shop_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : '';
	if ( ! $shop_url ) {
		$shop_url = home_url( '/shop/' );
	}
	$entries = array(
		'catalog' => array( 'title' => __( 'Каталог', 'wp-panda' ), 'page_id' => $shop_id, 'url' => $shop_url ),
		'blog'    => array( 'title' => __( 'Блог', 'wp-panda' ), 'page_id' => isset( $page_ids['blog'] ) ? $page_ids['blog'] : 0 ),
		'kb'      => array( 'title' => __( 'База знаний', 'wp-panda' ), 'page_id' => isset( $page_ids['kb'] ) ? $page_ids['kb'] : 0 ),
		'faq'     => array( 'title' => __( 'FAQ', 'wp-panda' ), 'page_id' => isset( $page_ids['faq'] ) ? $page_ids['faq'] : 0 ),
	);

	$position = 0;
	foreach ( $entries as $key => $entry ) {
		$meta_key = 'menu:' . $key;
		if ( isset( $existing_keys[ $meta_key ] ) ) {
			$position++;
			continue;
		}

		$item_args = array(
			'menu-item-title'     => $entry['title'],
			'menu-item-position'  => $position,
			'menu-item-status'    => 'publish',
		);
		if ( ! empty( $entry['page_id'] ) ) {
			$item_args['menu-item-type']      = 'post_type';
			$item_args['menu-item-object']    = 'page';
			$item_args['menu-item-object-id'] = absint( $entry['page_id'] );
		} else {
			$item_args['menu-item-type'] = 'custom';
			$item_args['menu-item-url']  = isset( $entry['url'] ) ? esc_url_raw( $entry['url'] ) : home_url( '/' );
		}

		$item_id = wp_update_nav_menu_item( $menu_id, 0, $item_args );
		if ( is_wp_error( $item_id ) ) {
			$result['errors'][] = sprintf( 'Не удалось добавить пункт «%s» в демо-меню: %s', sanitize_text_field( $entry['title'] ), $item_id->get_error_message() );
		} else {
			update_post_meta( $item_id, '_wpp_demo_menu_key', $meta_key );
		}
		$position++;
	}

	$locations = get_theme_mod( 'nav_menu_locations', array() );
	if ( empty( $locations['primary'] ) || empty( $locations['footer'] ) ) {
		if ( empty( $locations['primary'] ) ) {
			$locations['primary'] = $menu_id;
		}
		if ( empty( $locations['footer'] ) ) {
			$locations['footer'] = $menu_id;
		}
		set_theme_mod( 'nav_menu_locations', $locations );
	}
}
