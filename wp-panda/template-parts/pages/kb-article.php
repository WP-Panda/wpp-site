<?php
/** A real child page in the knowledge-base hierarchy. */
defined( 'ABSPATH' ) || exit;
$page_id    = get_the_ID();
$parent_id  = (int) wp_get_post_parent_id( $page_id );
$category   = get_post_meta( $page_id, '_wpp_demo_kb_category', true );
$read_time  = wpp_post_read_time( $page_id );
$headings   = wpp_content_headings( get_the_content() );
$kb_url     = $parent_id ? get_permalink( $parent_id ) : home_url( '/kb/' );
$siblings   = $parent_id ? get_pages( array( 'child_of' => $parent_id, 'post_status' => 'publish', 'sort_column' => 'menu_order,post_title', 'sort_order' => 'ASC' ) ) : array();
$siblings   = array_values( array_filter( $siblings, function ( $page ) use ( $parent_id ) { return (int) $page->post_parent === $parent_id; } ) );
$current    = array_search( $page_id, wp_list_pluck( $siblings, 'ID' ), true );
$previous   = false !== $current && $current > 0 ? $siblings[ $current - 1 ] : false;
$next       = false !== $current && isset( $siblings[ $current + 1 ] ) ? $siblings[ $current + 1 ] : false;
?>
<nav class="breadcrumbs" aria-label="<?php esc_attr_e( 'Навигация по сайту', 'wp-panda' ); ?>"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Главная', 'wp-panda' ); ?></a><span aria-hidden="true">/</span><a href="<?php echo esc_url( $kb_url ); ?>"><?php esc_html_e( 'База знаний', 'wp-panda' ); ?></a><span aria-hidden="true">/</span><span><?php the_title(); ?></span></nav>
<header class="kb-article-heading"><p class="eyebrow"><?php echo esc_html( $category ? $category : __( 'Инструкция', 'wp-panda' ) ); ?> <span aria-hidden="true">·</span> <?php echo esc_html( sprintf( __( '%d мин чтения', 'wp-panda' ), $read_time ) ); ?></p><?php the_title( '<h1>', '</h1>' ); ?><p><?php echo esc_html( get_the_excerpt() ); ?></p></header>
<div class="kb-article-layout"><?php if ( count( $headings ) > 1 ) : ?><aside class="kb-article-sidebar"><?php get_template_part( 'template-parts/blog/table-of-contents', null, array( 'items' => $headings ) ); ?><a class="kb-back-link" href="<?php echo esc_url( $kb_url ); ?>">← <?php esc_html_e( 'Все инструкции', 'wp-panda' ); ?></a></aside><?php endif; ?><article id="kb-article-<?php echo esc_attr( $page_id ); ?>" <?php post_class( 'kb-article entry-content prose-content' ); ?>><?php the_content(); ?></article></div>
<section class="kb-article-vote" data-kb-vote><p><?php esc_html_e( 'Эта инструкция была полезной?', 'wp-panda' ); ?></p><button type="button" data-article-vote="yes"><?php esc_html_e( 'Да', 'wp-panda' ); ?></button><button type="button" data-article-vote="no"><?php esc_html_e( 'Не совсем', 'wp-panda' ); ?></button><span data-article-vote-message role="status" aria-live="polite"></span></section>
<nav class="kb-article-neighbors" aria-label="<?php esc_attr_e( 'Другие инструкции', 'wp-panda' ); ?>"><?php if ( $previous ) : ?><a href="<?php echo esc_url( get_permalink( $previous ) ); ?>"><small>← <?php esc_html_e( 'Предыдущая инструкция', 'wp-panda' ); ?></small><strong><?php echo esc_html( get_the_title( $previous ) ); ?></strong></a><?php endif; ?><?php if ( $next ) : ?><a href="<?php echo esc_url( get_permalink( $next ) ); ?>"><small><?php esc_html_e( 'Следующая инструкция', 'wp-panda' ); ?> →</small><strong><?php echo esc_html( get_the_title( $next ) ); ?></strong></a><?php endif; ?></nav>
