<?php
/** Private account support requests and authenticated ticket submission. */
defined( 'ABSPATH' ) || exit;

$view   = ! empty( $args['view'] ) ? sanitize_key( $args['view'] ) : '';
$notice = isset( $_GET['ticket_notice'] ) && is_string( $_GET['ticket_notice'] ) ? sanitize_key( wp_unslash( $_GET['ticket_notice'] ) ) : '';
$notice_text = array(
	'sent'    => __( 'Обращение создано и сохранено в вашем аккаунте.', 'wp-panda' ),
	'invalid' => __( 'Заполните обязательные поля и подтвердите ознакомление с политикой конфиденциальности.', 'wp-panda' ),
	'error'   => __( 'Не удалось сохранить обращение. Повторите попытку позже.', 'wp-panda' ),
);
$topics = array(
	'general'      => __( 'Общий вопрос', 'wp-panda' ),
	'installation' => __( 'Установка продукта', 'wp-panda' ),
	'license'      => __( 'Лицензия и обновления', 'wp-panda' ),
	'billing'      => __( 'Оплата и документы', 'wp-panda' ),
	'technical'    => __( 'Техническая проблема', 'wp-panda' ),
);
$account_url = wc_get_page_permalink( 'myaccount' );
$new_url     = wc_get_endpoint_url( 'support', 'new', $account_url );
$privacy_url = function_exists( 'get_privacy_policy_url' ) ? get_privacy_policy_url() : '';
?>
<section class="wpp-account-section" aria-labelledby="wpp-support-heading">
	<header class="wpp-account-section__heading">
		<div><p class="eyebrow"><?php esc_html_e( 'Помощь Wp Panda', 'wp-panda' ); ?></p><h2 id="wpp-support-heading"><?php echo 'new' === $view ? esc_html__( 'Новое обращение', 'wp-panda' ) : esc_html__( 'Мои обращения', 'wp-panda' ); ?></h2></div>
		<?php if ( 'new' === $view ) : ?><a class="button button--light" href="<?php echo esc_url( wc_get_endpoint_url( 'support', '', $account_url ) ); ?>"><?php esc_html_e( 'К обращениям', 'wp-panda' ); ?></a><?php else : ?><a class="button button--brand" href="<?php echo esc_url( $new_url ); ?>"><?php esc_html_e( 'Создать обращение', 'wp-panda' ); ?></a><?php endif; ?>
	</header>
	<p class="wpp-demo-notice"><strong><?php esc_html_e( 'Поддержка в демо-магазине.', 'wp-panda' ); ?></strong> <?php esc_html_e( 'Отправленные обращения сохраняются приватно в WordPress и доступны только автору и сотрудникам с правом редактирования. Подключите реальную команду и адрес уведомлений перед запуском.', 'wp-panda' ); ?></p>
	<?php if ( isset( $notice_text[ $notice ] ) ) : ?><div class="woocommerce-<?php echo 'sent' === $notice ? 'message' : 'error'; ?>" role="status"><?php echo esc_html( $notice_text[ $notice ] ); ?></div><?php endif; ?>

	<?php if ( 'new' === $view ) : ?>
		<form class="wpp-support-form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<input type="hidden" name="action" value="wpp_submit_support_ticket">
			<?php wp_nonce_field( 'wpp_submit_support_ticket' ); ?>
			<p class="form-row form-row-wide"><label for="ticket_topic"><?php esc_html_e( 'Тема обращения', 'wp-panda' ); ?></label><select id="ticket_topic" name="ticket_topic" required><?php foreach ( $topics as $key => $label ) : ?><option value="<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $label ); ?></option><?php endforeach; ?></select></p>
			<p class="form-row form-row-wide"><label for="ticket_subject"><?php esc_html_e( 'Кратко опишите вопрос', 'wp-panda' ); ?></label><input id="ticket_subject" name="ticket_subject" type="text" maxlength="180" required></p>
			<p class="form-row form-row-wide"><label for="ticket_message"><?php esc_html_e( 'Подробности', 'wp-panda' ); ?></label><textarea id="ticket_message" name="ticket_message" rows="7" minlength="10" maxlength="10000" required></textarea></p>
			<p class="wpp-support-form__privacy"><?php esc_html_e( 'Не добавляйте пароль, полный номер карты или другие секреты. Контактные данные аккаунта доступны сотрудникам, обрабатывающим обращение.', 'wp-panda' ); ?></p>
			<p class="wpp-support-form__consent"><label><input type="checkbox" name="privacy_consent" value="1" required> <?php esc_html_e( 'Я ознакомился(лась) с ', 'wp-panda' ); ?><?php if ( $privacy_url ) : ?><a href="<?php echo esc_url( $privacy_url ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'политикой конфиденциальности', 'wp-panda' ); ?></a><?php else : ?><?php esc_html_e( 'политикой конфиденциальности', 'wp-panda' ); ?><?php endif; ?><?php esc_html_e( ' и согласен(на) на обработку данных для ответа на обращение.', 'wp-panda' ); ?></label></p>
			<button class="button button--brand" type="submit"><?php esc_html_e( 'Отправить обращение', 'wp-panda' ); ?></button>
		</form>
	<?php else : ?>
		<?php
		$tickets = get_posts( array(
			'post_type'      => 'wpp_support_ticket',
			'post_status'    => array( 'private', 'publish' ),
			'author'         => get_current_user_id(),
			'posts_per_page' => 50,
			'orderby'        => 'date',
			'order'          => 'DESC',
			'meta_query'     => array(
				array(
					'key'     => '_wpp_ticket_customer_id',
					'value'   => get_current_user_id(),
					'compare' => '=',
				),
			),
		) );
		?>
		<?php if ( $tickets ) : ?>
			<div class="wpp-account-table-wrap">
				<table class="shop_table shop_table_responsive wpp-account-table">
					<thead><tr><th scope="col"><?php esc_html_e( 'Обращение', 'wp-panda' ); ?></th><th scope="col"><?php esc_html_e( 'Тема', 'wp-panda' ); ?></th><th scope="col"><?php esc_html_e( 'Создано', 'wp-panda' ); ?></th><th scope="col"><?php esc_html_e( 'Статус', 'wp-panda' ); ?></th></tr></thead>
					<tbody><?php foreach ( $tickets as $ticket ) : ?>
						<?php $topic = get_post_meta( $ticket->ID, '_wpp_ticket_topic', true ); $status = get_post_meta( $ticket->ID, '_wpp_ticket_status', true ); ?>
						<tr><td data-title="<?php esc_attr_e( 'Обращение', 'wp-panda' ); ?>"><strong>#<?php echo esc_html( $ticket->ID ); ?></strong><br><?php echo esc_html( $ticket->post_title ); ?><details class="wpp-ticket-details"><summary><?php esc_html_e( 'Показать сообщение', 'wp-panda' ); ?></summary><div><?php echo wp_kses_post( wpautop( esc_html( $ticket->post_content ) ) ); ?></div></details></td><td data-title="<?php esc_attr_e( 'Тема', 'wp-panda' ); ?>"><?php echo esc_html( isset( $topics[ $topic ] ) ? $topics[ $topic ] : $topics['general'] ); ?></td><td data-title="<?php esc_attr_e( 'Создано', 'wp-panda' ); ?>"><?php echo esc_html( get_the_date( '', $ticket ) ); ?></td><td data-title="<?php esc_attr_e( 'Статус', 'wp-panda' ); ?>"><span class="wpp-account-status"><?php echo 'closed' === $status ? esc_html__( 'Закрыто', 'wp-panda' ) : esc_html__( 'Новое', 'wp-panda' ); ?></span></td></tr>
					<?php endforeach; ?></tbody>
				</table>
			</div>
		<?php else : ?>
			<div class="empty-state"><h3><?php esc_html_e( 'Обращений пока нет', 'wp-panda' ); ?></h3><p><?php esc_html_e( 'Создайте обращение, если нужна помощь с товаром, лицензией или заказом.', 'wp-panda' ); ?></p><a class="button button--brand" href="<?php echo esc_url( $new_url ); ?>"><?php esc_html_e( 'Создать обращение', 'wp-panda' ); ?></a></div>
		<?php endif; ?>
	<?php endif; ?>
</section>
