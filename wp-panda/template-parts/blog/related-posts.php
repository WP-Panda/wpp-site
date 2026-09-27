<?php
/** Related posts from the same WordPress categories. */
defined( 'ABSPATH' ) || exit;
$categories = wp_get_post_categories( get_the_ID() );
if ( ! $categories ) { return; }
$related = new WP_Query( array( 'post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => 3, 'post__not_in' => array( get_the_ID() ), 'category__in' => $categories, 'ignore_sticky_posts' => true, 'no_found_rows' => true ) );
if ( ! $related->have_posts() ) { return; }
?>
<section class="related-posts"><header class="section-heading"><div><p class="eyebrow"><?php esc_html_e( 'Продолжить чтение', 'wp-panda' ); ?></p><h2><?php esc_html_e( 'Похожие материалы', 'wp-panda' ); ?></h2></div></header><div class="editorial-grid editorial-grid--three"><?php while ( $related->have_posts() ) : $related->the_post(); get_template_part( 'template-parts/content', 'post' ); endwhile; ?></div><?php wp_reset_postdata(); ?></section>
