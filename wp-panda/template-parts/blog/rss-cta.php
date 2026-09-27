<?php
/** Privacy-preserving subscription alternative: the site's native RSS feed. */
defined( 'ABSPATH' ) || exit;
?>
<section class="blog-rss-cta"><div><p class="eyebrow"><?php esc_html_e( 'Оставайтесь в курсе', 'wp-panda' ); ?></p><h2><?php esc_html_e( 'Новые материалы — в вашей RSS-ленте', 'wp-panda' ); ?></h2><p><?php esc_html_e( 'Подпишитесь через любой RSS-ридер. Адрес электронной почты не требуется.', 'wp-panda' ); ?></p></div><a class="button button--light" href="<?php echo esc_url( get_bloginfo( 'rss2_url' ) ); ?>" rel="alternate" type="application/rss+xml"><?php esc_html_e( 'Открыть RSS', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a></section>
