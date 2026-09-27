<?php
/** Shared title, category navigation, and blog-only search. */
defined( 'ABSPATH' ) || exit;
$blog_id  = (int) get_option( 'page_for_posts' );
$blog_url = $blog_id ? get_permalink( $blog_id ) : home_url( '/blog/' );
$categories = get_categories( array( 'hide_empty' => true ) );
$title = is_category() || is_tag() ? single_term_title( '', false ) : ( $blog_id ? get_the_title( $blog_id ) : __( 'Блог', 'wp-panda' ) );
$description = is_category() ? category_description() : ( $blog_id ? get_post_field( 'post_excerpt', $blog_id ) : '' );
?>
<header class="blog-heading"><div class="blog-heading__top"><div><p class="eyebrow"><?php esc_html_e( 'Журнал Wp Panda', 'wp-panda' ); ?></p><h1><?php echo esc_html( $title ); ?></h1><p class="blog-heading__intro"><?php echo $description ? wp_kses_post( $description ) : esc_html__( 'Гайды, обзоры и новости WordPress — для владельцев сайтов, дизайнеров и разработчиков.', 'wp-panda' ); ?></p></div><form class="blog-search" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>"><label class="screen-reader-text" for="blog-search-field"><?php esc_html_e( 'Поиск по блогу', 'wp-panda' ); ?></label><input id="blog-search-field" type="search" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="<?php esc_attr_e( 'Поиск по статьям…', 'wp-panda' ); ?>"><input type="hidden" name="post_type" value="post"><button type="submit"><?php echo wpp_icon( 'search', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><span class="screen-reader-text"><?php esc_html_e( 'Найти', 'wp-panda' ); ?></span></button></form></div>
	<nav class="blog-categories" aria-label="<?php esc_attr_e( 'Рубрики блога', 'wp-panda' ); ?>"><a class="<?php echo is_home() ? 'is-active' : ''; ?>" href="<?php echo esc_url( $blog_url ); ?>"><?php esc_html_e( 'Все статьи', 'wp-panda' ); ?></a><?php foreach ( $categories as $category ) : ?><a class="<?php echo is_category( $category->term_id ) ? 'is-active' : ''; ?>" href="<?php echo esc_url( get_category_link( $category ) ); ?>"><?php echo esc_html( $category->name ); ?><span><?php echo esc_html( $category->count ); ?></span></a><?php endforeach; ?></nav>
</header>
