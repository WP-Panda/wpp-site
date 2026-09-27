<?php
/**
 * Типы записей: База знаний и FAQ + связка «пост → продукт».
 *
 * @package wp-panda
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* ------------------------------------------------------------------ */
/* База знаний                                                         */
/* ------------------------------------------------------------------ */
function wpp_register_kb() {
	register_post_type( 'kb_article', array(
		'labels' => array(
			'name'               => __( 'База знаний', 'wp-panda' ),
			'singular_name'      => __( 'Статья БЗ', 'wp-panda' ),
			'add_new_item'       => __( 'Добавить статью', 'wp-panda' ),
			'edit_item'          => __( 'Редактировать статью', 'wp-panda' ),
			'search_items'       => __( 'Найти статью', 'wp-panda' ),
			'not_found'          => __( 'Статей пока нет', 'wp-panda' ),
		),
		'public'       => true,
		'has_archive'  => true,
		'menu_icon'    => 'dashicons-book',
		'menu_position'=> 21,
		'rewrite'      => array( 'slug' => 'knowledge-base' ),
		'supports'     => array( 'title', 'editor', 'excerpt', 'author', 'revisions' ),
		'show_in_rest' => true,
	) );

	register_taxonomy( 'kb_cat', 'kb_article', array(
		'labels' => array(
			'name'          => __( 'Разделы БЗ', 'wp-panda' ),
			'singular_name' => __( 'Раздел', 'wp-panda' ),
		),
		'hierarchical' => true,
		'show_in_rest' => true,
	) );
}
add_action( 'init', 'wpp_register_kb' );

/** Все статьи БЗ (для сайдбаров и блоков). */
function wpp_kb_articles( $args = array() ) {
	return get_posts( array_merge( array(
		'post_type'      => 'kb_article',
		'posts_per_page' => 50,
		'orderby'        => 'title',
		'order'          => 'ASC',
	), $args ) );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */
function wpp_register_faq() {
	register_post_type( 'faq_item', array(
		'labels' => array(
			'name'          => __( 'FAQ', 'wp-panda' ),
			'singular_name' => __( 'Вопрос', 'wp-panda' ),
			'add_new_item'  => __( 'Добавить вопрос', 'wp-panda' ),
			'not_found'     => __( 'Вопросов пока нет', 'wp-panda' ),
		),
		'public'             => false,
		'show_ui'            => true,
		'menu_icon'          => 'dashicons-editor-help',
		'menu_position'      => 22,
		'supports'           => array( 'title', 'editor', 'page-attributes' ),
		'register_meta_box_cb' => 'wpp_faq_metabox',
	) );

	register_taxonomy( 'faq_cat', 'faq_item', array(
		'labels' => array(
			'name'          => __( 'Категории FAQ', 'wp-panda' ),
			'singular_name' => __( 'Категория', 'wp-panda' ),
		),
		'hierarchical' => true,
	) );
}
add_action( 'init', 'wpp_register_faq' );

/** Редактирование ответа как обычное поле. */
function wpp_faq_metabox( $post ) {
	wp_nonce_field( 'wpp_faq_save', 'wpp_faq_nonce' );
	$answer = wp_strip_all_tags( $post->post_content );
	echo '<p><strong>' . esc_html__( 'Ответ (текст вопроса — в заголовке):', 'wp-panda' ) . '</strong></p>';
	wp_editor( $answer, 'wpp_faq_answer', array( 'textarea_name' => 'wpp_faq_answer', 'media_buttons' => false, 'teeny' => true, 'textarea_rows' => 8 ) );
}

function wpp_faq_save( $post_id ) {
	if ( ! isset( $_POST['wpp_faq_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['wpp_faq_nonce'] ), 'wpp_faq_save' ) ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	if ( isset( $_POST['wpp_faq_answer'] ) ) {
		remove_action( 'save_post_faq_item', 'wpp_faq_save' );
		wp_update_post( array( 'ID' => $post_id, 'post_content' => wp_kses_post( wp_unslash( $_POST['wpp_faq_answer'] ) ) ) );
		add_action( 'save_post_faq_item', 'wpp_faq_save' );
	}
}
add_action( 'save_post_faq_item', 'wpp_faq_save' );

/** Вопросы, сгруппированные по категориям. */
function wpp_faq_grouped() {
	$terms  = get_terms( array( 'taxonomy' => 'faq_cat', 'hide_empty' => false ) );
	$groups = array();
	if ( $terms && ! is_wp_error( $terms ) ) {
		foreach ( $terms as $term ) {
			$groups[] = array(
				'name'  => $term->name,
				'items' => get_posts( array( 'post_type' => 'faq_item', 'posts_per_page' => 50, 'tax_query' => array( array( 'taxonomy' => 'faq_cat', 'terms' => $term->term_id ) ), 'orderby' => 'menu_order', 'order' => 'ASC' ) ),
			);
		}
	}
	$orphan = get_posts( array( 'post_type' => 'faq_item', 'posts_per_page' => 50, 'tax_query' => array( array( 'taxonomy' => 'faq_cat', 'operator' => 'NOT EXISTS' ) ), 'orderby' => 'menu_order', 'order' => 'ASC' ) );
	if ( $orphan ) {
		array_unshift( $groups, array( 'name' => __( 'Общие вопросы', 'wp-panda' ), 'items' => $orphan ) );
	}
	return $groups;
}

/* ------------------------------------------------------------------ */
/* Связка «пост блога → продукт»                                       */
/* ------------------------------------------------------------------ */
function wpp_post_product_metabox() {
	add_meta_box( 'wpp_post_product', __( 'Упомянутый продукт (Wp Panda)', 'wp-panda' ), 'wpp_post_product_metabox_html', 'post', 'side' );
}
add_action( 'add_meta_boxes', 'wpp_post_product_metabox' );

function wpp_post_product_metabox_html( $post ) {
	wp_nonce_field( 'wpp_post_product_save', 'wpp_post_product_nonce' );
	$value = get_post_meta( $post->ID, '_wpp_product', true );

	$options = array();
	if ( wpp_has_woo() ) {
		foreach ( wc_get_products( array( 'limit' => 100, 'status' => 'publish', 'orderby' => 'title', 'order' => 'ASC' ) ) as $p ) {
			$options[ $p->get_slug() ] = $p->get_name();
		}
	}
	?>
	<p>
		<label for="wpp_product_slug"><strong><?php esc_html_e( 'Слаг продукта:', 'wp-panda' ); ?></strong></label>
		<select name="wpp_product_slug" id="wpp_product_slug" style="width:100%">
			<option value=""><?php esc_html_e( '— не указан —', 'wp-panda' ); ?></option>
			<?php foreach ( $options as $slug => $name ) : ?>
				<option value="<?php echo esc_attr( $slug ); ?>" <?php selected( $value, $slug ); ?>><?php echo esc_html( $name ); ?></option>
			<?php endforeach; ?>
		</select>
	</p>
	<?php if ( ! wpp_has_woo() ) : ?>
		<p class="description"><?php esc_html_e( 'Активируйте WooCommerce, чтобы выбрать продукт из списка. Слаг можно ввести и вручную после активации.', 'wp-panda' ); ?></p>
	<?php endif; ?>
	<?php
}

function wpp_post_product_save( $post_id ) {
	if ( ! isset( $_POST['wpp_post_product_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['wpp_post_product_nonce'] ), 'wpp_post_product_save' ) ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	if ( isset( $_POST['wpp_product_slug'] ) ) {
		update_post_meta( $post_id, '_wpp_product', sanitize_title( wp_unslash( $_POST['wpp_product_slug'] ) ) );
	}
}
add_action( 'save_post_post', 'wpp_post_product_save' );

/** Мета-поля статьи БЗ: время чтения. */
function wpp_kb_meta_box() {
	add_meta_box( 'wpp_kb_read', __( 'Время чтения', 'wp-panda' ), function ( $post ) {
		wp_nonce_field( 'wpp_kb_read_save', 'wpp_kb_nonce' );
		$v = get_post_meta( $post->ID, '_wpp_read_time', true );
		echo '<input type="text" name="wpp_read_time" value="' . esc_attr( $v ) . '" placeholder="8 мин" style="width:100%" />';
	}, 'kb_article', 'side' );
}
add_action( 'add_meta_boxes', 'wpp_kb_meta_box' );

function wpp_kb_read_save( $post_id ) {
	if ( ! isset( $_POST['wpp_kb_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['wpp_kb_nonce'] ), 'wpp_kb_read_save' ) ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	if ( isset( $_POST['wpp_read_time'] ) ) {
		update_post_meta( $post_id, '_wpp_read_time', sanitize_text_field( wp_unslash( $_POST['wpp_read_time'] ) ) );
	}
}
add_action( 'save_post_kb_article', 'wpp_kb_read_save' );
