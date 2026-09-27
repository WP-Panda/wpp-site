<?php
/** Recent WordPress posts from the live blog query. */
defined( 'ABSPATH' ) || exit;
$recent_posts = new WP_Query( array( 'post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => 3, 'ignore_sticky_posts' => true, 'no_found_rows' => true ) );
$blog_id      = (int) get_option( 'page_for_posts' );
$blog_url     = $blog_id ? get_permalink( $blog_id ) : home_url( '/blog/' );
?>
<?php if ( $recent_posts->have_posts() ) : ?>
	<section class="home-section mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-20"><header class="section-heading"><div><p class="eyebrow"><?php esc_html_e( 'Свежее в блоге', 'wp-panda' ); ?></p><h2><?php esc_html_e( 'Гайды, обзоры и новости WordPress', 'wp-panda' ); ?></h2></div><a class="text-link" href="<?php echo esc_url( $blog_url ); ?>"><?php esc_html_e( 'Все статьи', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a></header><div class="editorial-grid editorial-grid--three"><?php while ( $recent_posts->have_posts() ) : $recent_posts->the_post(); ?><?php get_template_part( 'template-parts/content', 'post' ); ?><?php endwhile; ?></div><?php wp_reset_postdata(); ?></section>
<?php endif; ?>
