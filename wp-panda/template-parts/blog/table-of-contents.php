<?php
/** Local table of contents for a single article or knowledge-base guide. */
defined( 'ABSPATH' ) || exit;
$items = isset( $args['items'] ) && is_array( $args['items'] ) ? $args['items'] : array();
if ( ! $items ) { return; }
?>
<nav class="article-toc" aria-label="<?php esc_attr_e( 'Содержание статьи', 'wp-panda' ); ?>"><strong><?php esc_html_e( 'Содержание', 'wp-panda' ); ?></strong><ol><?php foreach ( $items as $item ) : ?><li class="article-toc__level-<?php echo esc_attr( $item['level'] ); ?>"><a href="#<?php echo esc_attr( $item['id'] ); ?>"><?php echo esc_html( $item['title'] ); ?></a></li><?php endforeach; ?></ol></nav>
