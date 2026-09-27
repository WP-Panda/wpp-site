<?php
/** Recent WordPress posts in the supplied landing-page grid. */
defined( 'ABSPATH' ) || exit;
$recent_posts = new WP_Query( array( 'post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => 3, 'ignore_sticky_posts' => true, 'no_found_rows' => true ) );
$blog_id      = (int) get_option( 'page_for_posts' );
$blog_url     = $blog_id ? get_permalink( $blog_id ) : home_url( '/blog/' );
?>
<?php if ( $recent_posts->have_posts() ) : ?>
	<section class="home-section mx-auto mt-24 max-w-[1200px] px-4 sm:px-6"><header class="flex items-end justify-between gap-5"><div><h2 class="text-3xl font-bold tracking-tight sm:text-[40px] sm:leading-[1.1]"><?php esc_html_e( 'Свежее в блоге', 'wp-panda' ); ?></h2><p class="mt-2 text-sm text-muted sm:text-base"><?php esc_html_e( 'Гайды, обзоры и новости мира WordPress', 'wp-panda' ); ?></p></div><a class="button button--light" href="<?php echo esc_url( $blog_url ); ?>"><?php esc_html_e( 'Все статьи', 'wp-panda' ); ?> <?php echo wpp_icon( 'arrow', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a></header><div class="editorial-grid editorial-grid--three mt-8"><?php while ( $recent_posts->have_posts() ) : $recent_posts->the_post(); ?><?php get_template_part( 'template-parts/content', 'post' ); ?><?php endwhile; ?></div><?php wp_reset_postdata(); ?></section>
<?php endif; ?>
