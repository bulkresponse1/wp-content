<?php
/*
Template Name: WooCommerce
*/
?>
<?php
$mkd_sidebar_layout = cyberstore_mikado_sidebar_layout();

get_header();
cyberstore_mikado_get_title();
get_template_part( 'slider' );

//Woocommerce content
if ( ! is_singular( 'product' ) ) { ?>
	<div class="mkd-container">
		<div class="mkd-container-inner clearfix">
			<div class="mkd-grid-row">
				
				<div <?php echo cyberstore_mikado_get_content_sidebar_class(); ?>>
					<?php cyberstore_mikado_woocommerce_content(); ?>
				</div>
				
				<?php if ( $mkd_sidebar_layout !== 'no-sidebar' ) { ?>
					<div <?php echo cyberstore_mikado_get_sidebar_holder_class(); ?>>
						<?php get_sidebar(); ?>
					</div>
				<?php } ?>
			</div>
		</div>
	</div>
<?php } else { ?>
<?php echo do_shortcode('[fibosearch]'); ?>
	<div class="mkd-container">
		<div class="mkd-container-inner clearfix">
			
		    <?php woocommerce_breadcrumb(); ?>	
			<?php cyberstore_mikado_woocommerce_content(); ?>
		</div>
	</div>
<?php } ?>
<?php get_footer(); ?>