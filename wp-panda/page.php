<?php
/** Standard WordPress page, including WooCommerce shortcodes and blocks. */
get_header();
?>
<?php $is_commerce_page = function_exists( 'is_cart' ) && ( is_cart() || is_checkout() || is_account_page() ); ?>
<main id="primary" class="site-main content-container mx-auto w-full max-w-[1200px] flex-1 px-4 py-10 sm:px-6 lg:py-14<?php echo $is_commerce_page ? ' site-main--commerce' : ''; ?>">
	<?php while ( have_posts() ) : the_post(); ?>
		<?php if ( $is_commerce_page ) : ?>
			<?php the_content(); ?>
		<?php else : ?>
			<?php get_template_part( 'template-parts/content', 'page' ); ?>
		<?php endif; ?>
		<?php if ( comments_open() || get_comments_number() ) : comments_template(); endif; ?>
	<?php endwhile; ?>
</main>
<?php get_footer(); ?>
