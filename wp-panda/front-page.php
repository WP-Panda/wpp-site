<?php
/**
 * Storefront home page, sections identical to the supplied layout.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<div>
	<?php get_template_part( 'template-parts/home/hero' ); ?>
	<?php get_template_part( 'template-parts/home/featured' ); ?>
	<?php get_template_part( 'template-parts/home/all-access' ); ?>
	<?php get_template_part( 'template-parts/home/use-cases' ); ?>
	<?php get_template_part( 'template-parts/home/benefits' ); ?>
	<?php get_template_part( 'template-parts/home/licensing' ); ?>
	<?php get_template_part( 'template-parts/home/testimonials' ); ?>
	<?php get_template_part( 'template-parts/home/latest-posts' ); ?>
</div>
<?php
get_footer();
