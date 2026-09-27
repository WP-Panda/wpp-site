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
		<p><?php esc_html_e( 'Импорт соберёт демонстрационный сайт целиком: главную, магазин, блог, FAQ, базу знаний, страницы политики и меню. При повторном запуске предыдущие объекты, созданные этим импортёром, удаляются и создаются заново.', 'wp-panda' ); ?></p>

		<?php if ( ! class_exists( 'WooCommerce' ) ) : ?>
			<div class="notice notice-warning inline"><p><?php esc_html_e( 'WooCommerce не активен: страницы и записи можно импортировать сейчас, товары будут пропущены. Для полного демо установите и активируйте WooCommerce.', 'wp-panda' ); ?></p></div>
		<?php endif; ?>

		<?php if ( is_array( $result ) ) : ?>
			<div class="notice <?php echo empty( $result['errors'] ) ? 'notice-success' : 'notice-warning'; ?> inline">
				<p><strong><?php esc_html_e( 'Импорт завершён.', 'wp-panda' ); ?></strong>
					<?php
					printf(
						esc_html__( 'Удалено старых демо-объектов: %1$d. Создано: %2$d товаров, %3$d записей, %4$d страниц и %5$d изображений.', 'wp-panda' ),
						absint( $result['previous_objects_removed'] ),
						absint( $result['products_created'] ),
						absint( $result['posts_created'] ),
						absint( $result['pages_created'] ),
						absint( $result['media_created'] )
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
				<li><?php esc_html_e( 'Главную, блог, FAQ, базу знаний, страницы WooCommerce (каталог, корзина, оформление, кабинет) и документы: условия, политика конфиденциальности, политика обработки персональных данных по 152-ФЗ, согласие и cookies.', 'wp-panda' ); ?></li>
				<li><?php esc_html_e( 'Два демонстрационных меню, назначение главного меню и подвала, главную страницу и страницу записей.', 'wp-panda' ); ?></li>
				<li><?php esc_html_e( 'Для WooCommerce — страницы магазина, рубли без копеек, регистрацию и вход, гостевой заказ, а также кабинет с заказами, загрузками, адресами, лицензиями, обращениями и избранным.', 'wp-panda' ); ?></li>
			</ul>
			<p><strong><?php esc_html_e( 'Важно:', 'wp-panda' ); ?></strong> <?php esc_html_e( 'при повторном запуске импортёр удаляет и пересоздаёт только объекты со служебными метками Wp Panda и прежнее демо-меню; товары и страницы, созданные вручную, не удаляются. Фиктивные заказы, клиенты, лицензии, ZIP-файлы и платёжные подключения не создаются. Демо-страницы политик — шаблоны, а не юридическое заключение: впишите данные оператора и проверьте документы у специалиста. Налоги, адрес магазина и платёжные реквизиты импортёр не угадывает и не включает.', 'wp-panda' ); ?></p>
			<p><?php esc_html_e( 'Демо-объекты и назначенные ими системные страницы/меню будут заменены новыми. Заказы, пользователи, настройки платёжных шлюзов и ваш контент вне демо-меток сохраняются.', 'wp-panda' ); ?></p>
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

/** Replace only content and settings owned by the Wp Panda demo importer. */
function wpp_demo_import_all() {
	$data = wpp_demo_load_data();
	if ( is_wp_error( $data ) ) {
		return array(
			'products_created'          => 0,
			'products_skipped'          => 0,
			'posts_created'             => 0,
			'posts_skipped'             => 0,
			'pages_created'             => 0,
			'pages_skipped'             => 0,
			'media_created'              => 0,
			'previous_objects_removed'  => 0,
			'errors'                     => array( $data->get_error_message() ),
		);
	}

	$result = array(
		'products_created'         => 0,
		'products_skipped'         => 0,
		'posts_created'            => 0,
		'posts_skipped'            => 0,
		'pages_created'            => 0,
		'pages_skipped'            => 0,
		'media_created'             => 0,
		'previous_objects_removed' => 0,
		'errors'                    => array(),
	);

	// A bad/missing bundle is rejected above, before any existing demo data is touched.
	wpp_demo_cleanup_previous( $result );

	$page_ids = array();
	$pages    = array(
		'home'             => array( 'page:home', __( 'Главная', 'wp-panda' ), 'home', '' ),
		'blog'             => array( 'page:blog', __( 'Блог', 'wp-panda' ), 'blog', '' ),
		'faq'              => array( 'page:faq', __( 'Частые вопросы', 'wp-panda' ), 'faq', wpp_demo_build_faq( $data ) ),
		'kb'               => array( 'page:kb', __( 'База знаний', 'wp-panda' ), 'kb', '' ),
		'privacy'          => array( 'legal:privacy', __( 'Политика конфиденциальности', 'wp-panda' ), 'privacy-policy', wpp_demo_legal_page_content( 'privacy' ) ),
		'personal_data'    => array( 'legal:personal-data', __( 'Политика обработки персональных данных', 'wp-panda' ), 'personal-data-processing', wpp_demo_legal_page_content( 'personal-data' ) ),
		'consent'          => array( 'legal:consent', __( 'Согласие на обработку персональных данных', 'wp-panda' ), 'consent-to-processing', wpp_demo_legal_page_content( 'consent' ) ),
		'cookies'          => array( 'legal:cookies', __( 'Политика использования cookie', 'wp-panda' ), 'cookie-policy', wpp_demo_legal_page_content( 'cookies' ) ),
		'terms'            => array( 'legal:terms', __( 'Условия использования и продажи', 'wp-panda' ), 'terms-of-use', wpp_demo_legal_page_content( 'terms' ) ),
	);

	if ( class_exists( 'WooCommerce' ) ) {
		$pages['shop']     = array( 'page:shop', __( 'Каталог', 'wp-panda' ), 'shop', '' );
		$pages['cart']     = array( 'page:cart', __( 'Корзина', 'wp-panda' ), 'cart', '[woocommerce_cart]' );
		$pages['checkout'] = array( 'page:checkout', __( 'Оформление заказа', 'wp-panda' ), 'checkout', '[woocommerce_checkout]' );
		$pages['account']  = array( 'page:account', __( 'Личный кабинет', 'wp-panda' ), 'my-account', '[woocommerce_my_account]' );
	}

	foreach ( $pages as $key => $page ) {
		$page_ids[ $key ] = wpp_demo_import_page( $page[0], $page[1], $page[2], $page[3], 0, $result );
	}

	wpp_demo_configure_site( $page_ids, $result );

	$kb_page_ids = array();
	foreach ( $data['kb_articles'] as $index => $article ) {
		$key     = 'kb:' . $article['slug'];
		$page_id = wpp_demo_import_page( $key, $article['title'], $article['slug'], wpp_demo_kb_article_content( $article, $data ), isset( $page_ids['kb'] ) ? $page_ids['kb'] : 0, $result );
		if ( $page_id ) {
			$kb_page_ids[ $article['slug'] ] = $page_id;
			update_post_meta( $page_id, '_wpp_demo_kb_category', sanitize_text_field( $article['category'] ) );
			update_post_meta( $page_id, '_wpp_demo_read_time', absint( $article['read_time'] ) );
			wp_update_post( array( 'ID' => $page_id, 'menu_order' => $index + 1, 'post_excerpt' => sanitize_textarea_field( $article['excerpt'] ) ) );
		}
	}

	if ( ! empty( $page_ids['kb'] ) ) {
		wp_update_post( array(
			'ID'           => $page_ids['kb'],
			'post_content' => wp_kses_post( wpp_demo_build_kb_index( $data, $kb_page_ids ) ),
		) );
	}

	foreach ( $data['posts'] as $post_data ) {
		wpp_demo_import_post( $post_data, $result );
	}

	$product_ids = array();
	if ( class_exists( 'WooCommerce' ) ) {
		$theme_cat_id  = wpp_demo_get_term_id( 'Темы WordPress', 'wordpress-themes', 'product_cat', $result );
		$plugin_cat_id = wpp_demo_get_term_id( 'Плагины WordPress', 'wordpress-plugins', 'product_cat', $result );

		foreach ( $data['products'] as $product_data ) {
			$category_id = 'wordpress-themes' === $product_data['category'] ? $theme_cat_id : $plugin_cat_id;
			if ( $category_id ) {
				$product_id = wpp_demo_import_product( $product_data, $category_id, $result );
				if ( $product_id ) {
					$product_ids[ $product_data['slug'] ] = $product_id;
				}
			} else {
				$result['errors'][] = sprintf( 'Не удалось создать категорию товара «%s».', sanitize_text_field( $product_data['name'] ) );
			}
		}
		wpp_demo_set_product_relationships( $product_ids );
	} else {
		$result['products_skipped'] = count( $data['products'] );
	}

	wpp_demo_import_menus( $page_ids, $result );

	if ( function_exists( 'flush_rewrite_rules' ) && '2' !== (string) get_option( 'wpp_demo_account_routes_version', '' ) ) {
		flush_rewrite_rules( false );
		update_option( 'wpp_demo_account_routes_version', '2', false );
	}

	return $result;
}

/** Delete only the previously imported Wp Panda demo objects and demo menu. */
function wpp_demo_cleanup_previous( &$result ) {
	$managed_posts = get_posts( array(
		'post_type'      => array( 'page', 'post', 'product' ),
		'post_status'    => 'any',
		'posts_per_page' => -1,
		'fields'         => 'all',
		'no_found_rows'  => true,
		'meta_key'       => '_wpp_demo_key',
	) );
	$managed_ids    = array();
	$product_ids    = array();
	$attachment_ids = array();

	foreach ( $managed_posts as $managed_post ) {
		$managed_ids[] = (int) $managed_post->ID;
		if ( 'product' === $managed_post->post_type ) {
			$product_ids[] = (int) $managed_post->ID;
		}
		$image_id = absint( get_post_meta( $managed_post->ID, '_wpp_demo_image_id', true ) );
		if ( $image_id ) {
			$attachment_ids[] = $image_id;
		}
	}

	// Newer imports mark attachments directly; the parent meta also catches images
	// created by the earlier importer version.
	$marked_attachments = get_posts( array(
		'post_type'      => 'attachment',
		'post_status'    => 'any',
		'posts_per_page' => -1,
		'fields'         => 'ids',
		'no_found_rows'  => true,
		'meta_key'       => '_wpp_demo_key',
	) );
	$attachment_ids = array_unique( array_merge( $attachment_ids, array_map( 'absint', $marked_attachments ) ) );
	foreach ( $attachment_ids as $attachment_id ) {
		if ( 'attachment' === get_post_type( $attachment_id ) && wp_delete_attachment( $attachment_id, true ) ) {
			$result['previous_objects_removed']++;
		}
	}

	foreach ( $product_ids as $product_id ) {
		$variations = get_posts( array(
			'post_type'      => 'product_variation',
			'post_status'    => 'any',
			'post_parent'    => $product_id,
			'posts_per_page' => -1,
			'fields'         => 'ids',
			'no_found_rows'  => true,
		) );
		foreach ( $variations as $variation_id ) {
			if ( wp_delete_post( $variation_id, true ) ) {
				$result['previous_objects_removed']++;
			}
		}
	}

	// Remove children before parent pages so WordPress cannot orphan old demo pages.
	usort( $managed_posts, function ( $left, $right ) {
		return count( get_post_ancestors( $right->ID ) ) - count( get_post_ancestors( $left->ID ) );
	} );
	foreach ( $managed_posts as $managed_post ) {
		if ( 'product' === $managed_post->post_type && function_exists( 'wc_get_product' ) ) {
			$product = wc_get_product( $managed_post->ID );
			$deleted = $product ? $product->delete( true ) : wp_delete_post( $managed_post->ID, true );
			if ( $deleted ) {
				if ( function_exists( 'wc_delete_product_transients' ) ) {
					wc_delete_product_transients( $managed_post->ID );
				}
				$result['previous_objects_removed']++;
			}
		} elseif ( wp_delete_post( $managed_post->ID, true ) ) {
			$result['previous_objects_removed']++;
		}
	}

	// Remove only importer-created, now-unused terms. Shared terms and user content stay intact.
	foreach ( array( 'category', 'product_cat', 'product_tag' ) as $taxonomy ) {
		if ( ! taxonomy_exists( $taxonomy ) ) {
			continue;
		}
		$terms = get_terms( array(
			'taxonomy'   => $taxonomy,
			'hide_empty' => false,
			'fields'     => 'ids',
			'meta_query' => array(
				array(
					'key'     => '_wpp_demo_key',
					'compare' => 'EXISTS',
				),
			),
		) );
		if ( is_wp_error( $terms ) || ! $terms ) {
			continue;
		}
		foreach ( $terms as $term_id ) {
			$object_ids = get_objects_in_term( $term_id, $taxonomy );
			if ( ! is_wp_error( $object_ids ) && empty( $object_ids ) && wp_delete_term( $term_id, $taxonomy ) ) {
				$result['previous_objects_removed']++;
			}
		}
	}

	// The legacy importer used the `wp-panda-demo` slug; current menus are term-meta owned.
	$menu_ids = array();
	$menus    = get_terms( array( 'taxonomy' => 'nav_menu', 'hide_empty' => false ) );
	if ( ! is_wp_error( $menus ) ) {
		foreach ( $menus as $menu ) {
			if ( 'wp-panda-demo' === $menu->slug || get_term_meta( $menu->term_id, '_wpp_demo_key', true ) ) {
				$menu_ids[] = (int) $menu->term_id;
			}
		}
	}
	$locations = get_theme_mod( 'nav_menu_locations', array() );
	$changed   = false;
	foreach ( $locations as $location => $menu_id ) {
		if ( in_array( (int) $menu_id, $menu_ids, true ) ) {
			unset( $locations[ $location ] );
			$changed = true;
		}
	}
	if ( $changed ) {
		set_theme_mod( 'nav_menu_locations', $locations );
	}
	foreach ( array_unique( $menu_ids ) as $menu_id ) {
		if ( wp_delete_nav_menu( $menu_id ) ) {
			$result['previous_objects_removed']++;
		}
	}
}

/** Assign demo front/blog/legal/store pages and only the reversible store defaults. */
function wpp_demo_configure_site( $page_ids, &$result ) {
	if ( ! empty( $page_ids['home'] ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', absint( $page_ids['home'] ) );
	}
	if ( ! empty( $page_ids['blog'] ) ) {
		update_option( 'page_for_posts', absint( $page_ids['blog'] ) );
	}
	if ( ! empty( $page_ids['privacy'] ) ) {
		update_option( 'wp_page_for_privacy_policy', absint( $page_ids['privacy'] ) );
	}
	update_option( 'posts_per_page', 6 );
	update_option( 'blogname', 'Wp Panda' );
	update_option( 'blogdescription', __( 'Темы и плагины для WordPress', 'wp-panda' ) );

	if ( ! class_exists( 'WooCommerce' ) ) {
		return;
	}

	$woocommerce_pages = array(
		'woocommerce_shop_page_id'     => 'shop',
		'woocommerce_cart_page_id'     => 'cart',
		'woocommerce_checkout_page_id' => 'checkout',
		'woocommerce_myaccount_page_id' => 'account',
		'woocommerce_terms_page_id'    => 'terms',
	);
	foreach ( $woocommerce_pages as $option_name => $page_key ) {
		if ( ! empty( $page_ids[ $page_key ] ) ) {
			update_option( $option_name, absint( $page_ids[ $page_key ] ) );
		}
	}

	// Prices in the supplied design are in rubles. Business address, tax rules,
	// payment credentials and shipping zones are deliberately left to the store owner.
	update_option( 'woocommerce_currency', 'RUB' );
	update_option( 'woocommerce_currency_pos', 'right_space' );
	update_option( 'woocommerce_price_num_decimals', '0' );
	update_option( 'woocommerce_enable_myaccount_registration', 'yes' );
	update_option( 'woocommerce_enable_signup_and_login_from_checkout', 'yes' );
	update_option( 'woocommerce_enable_checkout_login_reminder', 'yes' );
	update_option( 'woocommerce_enable_guest_checkout', 'yes' );
	update_option( 'woocommerce_enable_coupons', 'yes' );

	$privacy_url = ! empty( $page_ids['privacy'] ) ? get_permalink( $page_ids['privacy'] ) : '';
	$privacy_link = $privacy_url ? '<a href="' . esc_url( $privacy_url ) . '">' . esc_html__( 'Политикой конфиденциальности', 'wp-panda' ) . '</a>' : esc_html__( 'Политикой конфиденциальности', 'wp-panda' );
	update_option(
		'woocommerce_registration_privacy_policy_text',
		sprintf( esc_html__( 'Персональные данные будут использоваться для работы с учётной записью в соответствии с %s.', 'wp-panda' ), $privacy_link )
	);
	update_option(
		'woocommerce_checkout_privacy_policy_text',
		sprintf( esc_html__( 'Ваши данные нужны для обработки заказа. Подробнее — в документе %s.', 'wp-panda' ), $privacy_link )
	);
}

/** Return editable demo legal copy; the importer does not certify legal compliance. */
function wpp_demo_legal_page_content( $type ) {
	$notice = '<p class="wpp-demo-notice"><strong>' . esc_html__( 'Демонстрационный шаблон.', 'wp-panda' ) . '</strong> ' . esc_html__( 'Заполните сведения об операторе, целях и сроках обработки, проверьте текст с юристом до публикации.', 'wp-panda' ) . '</p>';
	$operator = '<p><strong>' . esc_html__( 'Оператор:', 'wp-panda' ) . '</strong> [Укажите полное наименование организации или ФИО индивидуального предпринимателя].</p><p><strong>' . esc_html__( 'Адрес и контакты:', 'wp-panda' ) . '</strong> [Укажите адрес, ИНН/ОГРН при наличии и email для обращений по персональным данным].</p>';

	if ( 'personal-data' === $type ) {
		return $notice . $operator
			. '<h2>' . esc_html__( '1. Общие положения и применимые требования', 'wp-panda' ) . '</h2><p>' . esc_html__( 'Этот проектный текст предназначен для адаптации оператором сайта. Он не подтверждает соответствие требованиям законодательства и не заменяет правовую оценку конкретных процессов обработки.', 'wp-panda' ) . '</p>'
			. '<h2>' . esc_html__( '2. Какие данные могут обрабатываться', 'wp-panda' ) . '</h2><ul><li>' . esc_html__( 'данные учётной записи: имя, email и пароль в защищённом виде;', 'wp-panda' ) . '</li><li>' . esc_html__( 'данные заказа и оплаты, полученные через WooCommerce и выбранного платёжного оператора;', 'wp-panda' ) . '</li><li>' . esc_html__( 'технические данные запроса, cookie и сведения о согласиях — только в объёме включённых сервисов.', 'wp-panda' ) . '</li></ul>'
			. '<h2>' . esc_html__( '3. Цели, основания и сроки', 'wp-panda' ) . '</h2><p>' . esc_html__( 'Укажите отдельно цели обработки, правовые основания для каждой цели, состав данных, сроки хранения и порядок удаления. Не собирайте поля, не необходимые для заявленной цели.', 'wp-panda' ) . '</p>'
			. '<h2>' . esc_html__( '4. Передача и поручение обработки', 'wp-panda' ) . '</h2><p>' . esc_html__( 'Перечислите хостинг-провайдера, сервисы аналитики, email и платёжных операторов, категории передаваемых данных, условия поручения и сведения о трансграничной передаче, если она происходит.', 'wp-panda' ) . '</p>'
			. '<h2>' . esc_html__( '5. Права пользователя и обращения', 'wp-panda' ) . '</h2><p>' . esc_html__( 'Пользователь может направить запрос об обработке данных по контактам оператора. Укажите способ подтверждения личности, сроки ответа и порядок отзыва согласия, когда обработка основана на согласии.', 'wp-panda' ) . '</p>'
			. '<h2>' . esc_html__( '6. Меры защиты и изменения документа', 'wp-panda' ) . '</h2><p>' . esc_html__( 'Опишите применяемые организационные и технические меры, дату вступления редакции в силу и способ уведомления об изменениях.', 'wp-panda' ) . '</p>';
	}

	if ( 'consent' === $type ) {
		return $notice . $operator
			. '<h2>' . esc_html__( 'Текст согласия', 'wp-panda' ) . '</h2><p>' . esc_html__( 'Я подтверждаю, что ознакомился(лась) с политикой обработки персональных данных, и даю оператору, указанному выше, согласие на обработку тех данных, которые я самостоятельно передаю через формы сайта, для ответа на обращение, создания учётной записи или исполнения моего заказа — в зависимости от выбранного действия.', 'wp-panda' ) . '</p>'
			. '<p>' . esc_html__( 'Согласие не должно быть заранее отмечено или объединено с согласием на рекламные сообщения. Для каждой дополнительной цели оператору следует определить отдельное основание и, если требуется, отдельное добровольное согласие.', 'wp-panda' ) . '</p>'
			. '<h2>' . esc_html__( 'Как отозвать согласие', 'wp-panda' ) . '</h2><p>' . esc_html__( 'Для отзыва и вопросов используйте указанный выше контакт оператора. Уточните в финальной версии порядок идентификации заявителя, сроки ответа и случаи, когда обработка может продолжаться на ином законном основании.', 'wp-panda' ) . '</p>';
	}

	if ( 'cookies' === $type ) {
		return $notice . $operator
			. '<h2>' . esc_html__( 'Что такое cookie', 'wp-panda' ) . '</h2><p>' . esc_html__( 'Cookie и похожие технологии могут использоваться для работы корзины, входа в личный кабинет, сохранения настроек и измерения посещаемости.', 'wp-panda' ) . '</p>'
			. '<h2>' . esc_html__( 'Какие технологии включены на сайте', 'wp-panda' ) . '</h2><p>' . esc_html__( 'Перед публикацией перечислите фактически подключённые cookie, их назначение, срок хранения и получателей данных. Удалите из этого документа отключённые сервисы.', 'wp-panda' ) . '</p>'
			. '<h2>' . esc_html__( 'Настройки браузера и согласие', 'wp-panda' ) . '</h2><p>' . esc_html__( 'Пользователь может ограничить cookie в браузере. Если сайт использует необязательную аналитику или рекламные технологии, настройте отдельный механизм согласия до их запуска.', 'wp-panda' ) . '</p>';
	}

	if ( 'terms' === $type ) {
		return $notice . $operator
			. '<h2>' . esc_html__( '1. Предмет и оформление заказа', 'wp-panda' ) . '</h2><p>' . esc_html__( 'Опишите товары, цену, порядок заключения договора, момент предоставления цифрового содержимого, системные требования и каналы поддержки. Демо-товары темы не содержат реальных ZIP-архивов.', 'wp-panda' ) . '</p>'
			. '<h2>' . esc_html__( '2. Лицензии и использование', 'wp-panda' ) . '</h2><p>' . esc_html__( 'Укажите фактические условия лицензии для каждого продукта: число сайтов, срок, обновления, ограничения и порядок передачи прав. Не публикуйте вымышленные лицензионные обещания.', 'wp-panda' ) . '</p>'
			. '<h2>' . esc_html__( '3. Оплата, возврат и документы', 'wp-panda' ) . '</h2><p>' . esc_html__( 'Добавьте поддерживаемые способы оплаты, правила возврата для цифровых товаров, сведения о налогах и порядок получения расчётных документов. Эти параметры зависят от продавца и применимого права.', 'wp-panda' ) . '</p>'
			. '<h2>' . esc_html__( '4. Поддержка и претензии', 'wp-panda' ) . '</h2><p>' . esc_html__( 'Укажите каналы связи, рабочие часы и срок ответа. Контакт продавца должен быть доступен до оформления заказа.', 'wp-panda' ) . '</p>';
	}

	return $notice . $operator
		. '<h2>' . esc_html__( 'Какие данные использует сайт', 'wp-panda' ) . '</h2><p>' . esc_html__( 'Сайт может обрабатывать данные учётной записи, корзины и заказов, а также технические данные, необходимые для его работы. Состав зависит от установленных сервисов и заполненных пользователем форм.', 'wp-panda' ) . '</p>'
		. '<h2>' . esc_html__( 'Цели обработки', 'wp-panda' ) . '</h2><p>' . esc_html__( 'Укажите фактические цели: создание и защита аккаунта, обработка заказа, ответы на запросы и выполнение требований к учёту. Не включайте цели, для которых нет отдельного основания.', 'wp-panda' ) . '</p>'
		. '<h2>' . esc_html__( 'Получатели, хранение и права пользователя', 'wp-panda' ) . '</h2><p>' . esc_html__( 'Перечислите получателей данных, сроки хранения, меры защиты, порядок доступа, исправления и удаления данных, а также контакт для обращений. Актуализируйте документ после подключения новых сервисов.', 'wp-panda' ) . '</p>';
}

/** Set up real WooCommerce page references and safe digital-store defaults. */
function wpp_demo_set_product_relationships( $product_ids ) {
	if ( ! function_exists( 'wc_get_product' ) ) {
		return;
	}
	$cross_sell_ids = array_values( array_filter( array_intersect_key( $product_ids, array_flip( array( 'shieldy', 'turbocache', 'wooboost' ) ) ) ) );
	foreach ( $product_ids as $product_id ) {
		$product = wc_get_product( $product_id );
		if ( ! $product || ! method_exists( $product, 'set_cross_sell_ids' ) ) {
			continue;
		}
		$product->set_cross_sell_ids( array_values( array_diff( $cross_sell_ids, array( (int) $product_id ) ) ) );
		$product->save();
	}
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
	if ( ! empty( $post_data['author'] ) ) {
		update_post_meta( $post_id, '_wpp_demo_author', sanitize_text_field( $post_data['author'] ) );
	}
	if ( ! empty( $post_data['read_time'] ) ) {
		update_post_meta( $post_id, '_wpp_demo_read_time', absint( $post_data['read_time'] ) );
	}
	if ( ! empty( $post_data['featured'] ) ) {
		update_post_meta( $post_id, '_wpp_demo_blog_featured', 1 );
	}
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
	$demo_key = get_post_meta( $post_id, '_wpp_demo_key', true );
	if ( $demo_key ) {
		update_post_meta( $attachment, '_wpp_demo_key', 'media:' . sanitize_key( str_replace( ':', '-', $demo_key ) ) );
	}
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
	if ( ! $tags || ! taxonomy_exists( 'product_tag' ) ) {
		return;
	}

	$term_ids = array();
	foreach ( $tags as $tag_name ) {
		$existing = term_exists( $tag_name, 'product_tag' );
		if ( $existing ) {
			$term_ids[] = is_array( $existing ) ? (int) $existing['term_id'] : (int) $existing;
			continue;
		}

		$created = wp_insert_term( $tag_name, 'product_tag' );
		if ( is_wp_error( $created ) ) {
			if ( 'term_exists' === $created->get_error_code() ) {
				$term_ids[] = (int) $created->get_error_data( 'term_exists' );
			}
			continue;
		}

		$term_id = (int) $created['term_id'];
		update_term_meta( $term_id, '_wpp_demo_key', 'tag:product:' . sanitize_title( $tag_name ) );
		$term_ids[] = $term_id;
	}

	if ( $term_ids ) {
		wp_set_object_terms( absint( $product_id ), array_values( array_unique( $term_ids ) ), 'product_tag', false );
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
	if ( ! empty( $data['featured_order'] ) ) {
		update_post_meta( $product_id, '_wpp_demo_featured_order', absint( $data['featured_order'] ) );
	}

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
		$html .= '<section class="wpp-demo-faq-group" data-faq-group="' . esc_attr( sanitize_title( $category ) ) . '"><h2>' . esc_html( $category ) . ' <span class="wpp-demo-faq-count">' . absint( count( $entries ) ) . '</span></h2><div class="wpp-demo-faq-list">';
		foreach ( $entries as $entry ) {
			$html .= '<details class="wpp-demo-faq" data-faq-item><summary>' . esc_html( $entry['q'] ) . '</summary><div><p>' . esc_html( $entry['a'] ) . '</p></div></details>';
		}
		$html .= '</div></section>';
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
		$html .= '<section class="wpp-demo-kb-group" data-kb-group="' . esc_attr( sanitize_title( $category ) ) . '"><h2>' . esc_html( $category ) . ' <span class="wpp-demo-faq-count">' . absint( count( $articles ) ) . '</span></h2><ul class="wpp-demo-kb-list">';
		foreach ( $articles as $article ) {
			$article_id = isset( $page_ids[ $article['slug'] ] ) ? absint( $page_ids[ $article['slug'] ] ) : 0;
			$permalink  = $article_id ? get_permalink( $article_id ) : home_url( '/kb/' . rawurlencode( $article['slug'] ) . '/' );
			$searchable = $article['title'] . ' ' . $article['excerpt'] . ' ' . $category;
			$read_time  = ! empty( $article['read_time'] ) ? absint( $article['read_time'] ) : 1;
			$html      .= '<li data-kb-item data-kb-search="' . esc_attr( $searchable ) . '"><h3><a href="' . esc_url( $permalink ) . '">' . esc_html( $article['title'] ) . '</a></h3><p>' . esc_html( $article['excerpt'] ) . '</p><span class="wpp-kb-read-time">' . sprintf( esc_html__( '%d мин чтения', 'wp-panda' ), $read_time ) . '</span></li>';
		}
		$html .= '</ul></section>';
	}

	return $html;
}

/** Translate links copied from standalone .html layouts into installed WordPress routes. */
function wpp_demo_rewrite_layout_links( $content ) {
	$post_id = get_the_ID();
	if ( ! $post_id || ! get_post_meta( $post_id, '_wpp_demo_key', true ) ) {
		return $content;
	}

	static $url_cache = array();
	return preg_replace_callback( '/href=("|\')([^"\']+\.html(?:#[^"\']*)?)(\1)/i', function ( $matches ) use ( &$url_cache ) {
		$source = basename( strtok( $matches[2], '#' ) );
		if ( isset( $url_cache[ $source ] ) ) {
			return 'href=' . $matches[1] . esc_url( $url_cache[ $source ] ) . $matches[3];
		}

		$url = '';
		if ( 'index.html' === $source ) {
			$url = home_url( '/' );
		} elseif ( 'shop.html' === $source ) {
			$url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
		} elseif ( in_array( $source, array( 'shop-theme.html', 'shop-plugin.html' ), true ) && function_exists( 'get_term_by' ) ) {
			$term = get_term_by( 'slug', 'shop-theme.html' === $source ? 'wordpress-themes' : 'wordpress-plugins', 'product_cat' );
			$url  = $term && ! is_wp_error( $term ) ? get_term_link( $term ) : home_url( '/shop/' );
		} elseif ( 'blog.html' === $source ) {
			$blog_id = (int) get_option( 'page_for_posts' );
			$url     = $blog_id ? get_permalink( $blog_id ) : home_url( '/' );
		} elseif ( 'faq.html' === $source || 'kb.html' === $source ) {
			$key      = 'faq.html' === $source ? 'page:faq' : 'page:kb';
			$target_id = wpp_demo_find_post_id( 'page', $key );
			$url       = $target_id ? get_permalink( $target_id ) : home_url( '/' );
		} elseif ( 'checkout-cart.html' === $source && function_exists( 'wc_get_cart_url' ) ) {
			$url = wc_get_cart_url();
		} elseif ( 'checkout.html' === $source && function_exists( 'wc_get_checkout_url' ) ) {
			$url = wc_get_checkout_url();
		} elseif ( 0 === strpos( $source, 'product-' ) && function_exists( 'wc_get_page_id' ) ) {
			$slug      = sanitize_title( substr( $source, 8, -5 ) );
			$product   = get_page_by_path( $slug, OBJECT, 'product' );
			$url       = $product ? get_permalink( $product ) : wc_get_page_permalink( 'shop' );
		} elseif ( 0 === strpos( $source, 'post-' ) ) {
			$slug = sanitize_title( substr( $source, 5, -5 ) );
			$post = get_page_by_path( $slug, OBJECT, 'post' );
			$url  = $post ? get_permalink( $post ) : home_url( '/' );
		} elseif ( 0 === strpos( $source, 'kb-article-' ) ) {
			$slug = sanitize_title( substr( $source, 11, -5 ) );
			$page = get_page_by_path( 'kb/' . $slug );
			$url  = $page ? get_permalink( $page ) : home_url( '/' );
		} elseif ( 0 === strpos( $source, 'account' ) && function_exists( 'wc_get_page_permalink' ) ) {
			$url      = wc_get_page_permalink( 'myaccount' );
			$endpoint = '';
			if ( 'account-orders.html' === $source ) {
				$endpoint = 'orders';
			} elseif ( 'account-downloads.html' === $source ) {
				$endpoint = 'downloads';
			} elseif ( 'account-details.html' === $source ) {
				$endpoint = 'edit-account';
			} elseif ( 'account-address.html' === $source ) {
				$endpoint = 'edit-address';
			} elseif ( 'account-licenses.html' === $source ) {
				$endpoint = 'licenses';
			} elseif ( 'account-tickets.html' === $source || 'account-new-ticket.html' === $source ) {
				$endpoint = 'support';
			} elseif ( 'account-wishlist.html' === $source ) {
				$endpoint = 'wishlist';
			}
			$endpoints = function_exists( 'wc_get_account_menu_items' ) ? wc_get_account_menu_items() : array();
			if ( $endpoint && isset( $endpoints[ $endpoint ] ) ) {
				$endpoint_value = 'account-address.html' === $source ? 'billing' : ( 'account-new-ticket.html' === $source ? 'new' : '' );
				$url            = wc_get_endpoint_url( $endpoint, $endpoint_value, $url );
			}
		} else {
			$url = home_url( '/' );
		}

		$url_cache[ $source ] = $url ? $url : home_url( '/' );
		$fragment = false !== strpos( $matches[2], '#' ) ? '#' . substr( $matches[2], strpos( $matches[2], '#' ) + 1 ) : '';
		return 'href=' . $matches[1] . esc_url( $url_cache[ $source ] . $fragment ) . $matches[3];
	}, $content );
}
add_filter( 'the_content', 'wpp_demo_rewrite_layout_links', 8 );

/** Create a fresh, importer-owned navigation menu from real page/taxonomy links. */
function wpp_demo_create_menu( $name, $key, $entries, &$result ) {
	$menu_id = wp_create_nav_menu( $name );
	if ( is_wp_error( $menu_id ) ) {
		$result['errors'][] = sprintf( 'Не удалось создать меню «%s»: %s', sanitize_text_field( $name ), $menu_id->get_error_message() );
		return 0;
	}
	update_term_meta( $menu_id, '_wpp_demo_key', 'menu:' . sanitize_key( $key ) );

	$item_ids = array();
	$position = 1;
	foreach ( $entries as $entry_key => $entry ) {
		$item_args = array(
			'menu-item-title'    => $entry['title'],
			'menu-item-position' => $position,
			'menu-item-status'   => 'publish',
		);
		if ( ! empty( $entry['parent'] ) && ! empty( $item_ids[ $entry['parent'] ] ) ) {
			$item_args['menu-item-parent-id'] = $item_ids[ $entry['parent'] ];
		}

		if ( ! empty( $entry['page_id'] ) ) {
			$item_args['menu-item-type']      = 'post_type';
			$item_args['menu-item-object']    = 'page';
			$item_args['menu-item-object-id'] = absint( $entry['page_id'] );
		} elseif ( ! empty( $entry['taxonomy'] ) && ! empty( $entry['term_id'] ) ) {
			$item_args['menu-item-type']      = 'taxonomy';
			$item_args['menu-item-object']    = sanitize_key( $entry['taxonomy'] );
			$item_args['menu-item-object-id'] = absint( $entry['term_id'] );
		} else {
			$item_args['menu-item-type'] = 'custom';
			$item_args['menu-item-url']  = ! empty( $entry['url'] ) ? esc_url_raw( $entry['url'] ) : home_url( '/' );
		}

		$item_id = wp_update_nav_menu_item( $menu_id, 0, $item_args );
		if ( is_wp_error( $item_id ) ) {
			$result['errors'][] = sprintf( 'Не удалось добавить пункт «%s»: %s', sanitize_text_field( $entry['title'] ), $item_id->get_error_message() );
		} else {
			$item_ids[ $entry_key ] = (int) $item_id;
			update_post_meta( $item_id, '_wpp_demo_menu_key', 'menu-item:' . sanitize_key( $key ) . ':' . sanitize_key( $entry_key ) );
		}
		$position++;
	}

	return (int) $menu_id;
}

/** Build the header and legal footer menus; preserve unrelated custom menus. */
function wpp_demo_import_menus( $page_ids, &$result ) {
	$shop_url = ! empty( $page_ids['shop'] ) ? get_permalink( $page_ids['shop'] ) : home_url( '/shop/' );
	$theme    = get_term_by( 'slug', 'wordpress-themes', 'product_cat' );
	$plugins  = get_term_by( 'slug', 'wordpress-plugins', 'product_cat' );

	$main_entries = array(
		'home'    => array( 'title' => __( 'Главная', 'wp-panda' ), 'page_id' => isset( $page_ids['home'] ) ? $page_ids['home'] : 0 ),
		'catalog' => array( 'title' => __( 'Каталог', 'wp-panda' ), 'page_id' => isset( $page_ids['shop'] ) ? $page_ids['shop'] : 0, 'url' => $shop_url ),
		'themes'  => array( 'title' => __( 'Темы', 'wp-panda' ), 'taxonomy' => 'product_cat', 'term_id' => $theme && ! is_wp_error( $theme ) ? $theme->term_id : 0, 'parent' => 'catalog', 'url' => $shop_url ),
		'plugins' => array( 'title' => __( 'Плагины', 'wp-panda' ), 'taxonomy' => 'product_cat', 'term_id' => $plugins && ! is_wp_error( $plugins ) ? $plugins->term_id : 0, 'parent' => 'catalog', 'url' => $shop_url ),
		'blog'    => array( 'title' => __( 'Блог', 'wp-panda' ), 'page_id' => isset( $page_ids['blog'] ) ? $page_ids['blog'] : 0 ),
		'kb'      => array( 'title' => __( 'База знаний', 'wp-panda' ), 'page_id' => isset( $page_ids['kb'] ) ? $page_ids['kb'] : 0 ),
		'faq'     => array( 'title' => __( 'FAQ', 'wp-panda' ), 'page_id' => isset( $page_ids['faq'] ) ? $page_ids['faq'] : 0 ),
	);
	$main_id = wpp_demo_create_menu( __( 'Wp Panda — главное меню', 'wp-panda' ), 'primary', $main_entries, $result );

	$footer_entries = array(
		'catalog'       => array( 'title' => __( 'Каталог', 'wp-panda' ), 'page_id' => isset( $page_ids['shop'] ) ? $page_ids['shop'] : 0, 'url' => $shop_url ),
		'blog'          => array( 'title' => __( 'Блог', 'wp-panda' ), 'page_id' => isset( $page_ids['blog'] ) ? $page_ids['blog'] : 0 ),
		'kb'            => array( 'title' => __( 'База знаний', 'wp-panda' ), 'page_id' => isset( $page_ids['kb'] ) ? $page_ids['kb'] : 0 ),
		'faq'           => array( 'title' => __( 'Частые вопросы', 'wp-panda' ), 'page_id' => isset( $page_ids['faq'] ) ? $page_ids['faq'] : 0 ),
		'terms'         => array( 'title' => __( 'Условия использования', 'wp-panda' ), 'page_id' => isset( $page_ids['terms'] ) ? $page_ids['terms'] : 0 ),
		'privacy'       => array( 'title' => __( 'Политика конфиденциальности', 'wp-panda' ), 'page_id' => isset( $page_ids['privacy'] ) ? $page_ids['privacy'] : 0 ),
		'personal_data' => array( 'title' => __( 'Персональные данные', 'wp-panda' ), 'page_id' => isset( $page_ids['personal_data'] ) ? $page_ids['personal_data'] : 0 ),
		'cookies'       => array( 'title' => __( 'Cookie', 'wp-panda' ), 'page_id' => isset( $page_ids['cookies'] ) ? $page_ids['cookies'] : 0 ),
	);
	$footer_id = wpp_demo_create_menu( __( 'Wp Panda — информация', 'wp-panda' ), 'footer', $footer_entries, $result );

	$locations = get_theme_mod( 'nav_menu_locations', array() );
	$changed   = false;
	foreach ( array( 'primary' => $main_id, 'footer' => $footer_id ) as $location => $menu_id ) {
		$assigned = isset( $locations[ $location ] ) ? wp_get_nav_menu_object( $locations[ $location ] ) : false;
		if ( $menu_id && ( ! $assigned || is_wp_error( $assigned ) ) ) {
			$locations[ $location ] = $menu_id;
			$changed               = true;
		}
	}
	if ( $changed ) {
		set_theme_mod( 'nav_menu_locations', $locations );
	}
}
