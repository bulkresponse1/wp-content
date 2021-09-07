<?php
$mkd_blog_type = cyberstore_mikado_get_archive_blog_list_layout();
cyberstore_mikado_include_blog_helper_functions( 'lists', $mkd_blog_type );
$mkd_holder_params = cyberstore_mikado_get_holder_params_blog();

get_header();
cyberstore_mikado_get_title();
?>

<div class="<?php echo esc_attr( $mkd_holder_params['holder'] ); ?>">
	<?php do_action( 'cyberstore_mikado_after_container_open' ); ?>
	
	<div class="<?php echo esc_attr( $mkd_holder_params['inner'] ); ?>">
		<?php cyberstore_mikado_get_blog( $mkd_blog_type ); ?>
	</div>
	
	<?php do_action( 'cyberstore_mikado_before_container_close' ); ?>
</div>

<?php do_action( 'cyberstore_mikado_blog_list_additional_tags' ); ?>
<?php get_footer(); ?>