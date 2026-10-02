<?php
/**
 * Single product page wrapper: uses the theme's own layout part.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

get_header();

while ( have_posts() ) :
	the_post();
	get_template_part( 'woocommerce/content', 'single-product' );
endwhile;

get_footer();
