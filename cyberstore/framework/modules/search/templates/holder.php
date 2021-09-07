<div class="mkd-grid-row">
	<div <?php echo cyberstore_mikado_get_content_sidebar_class(); ?>>
		<div class="mkd-search-page-holder">
			<?php cyberstore_mikado_get_search_page_layout(); ?>
		</div>
		<?php do_action( 'cyberstore_mikado_page_after_content' ); ?>
	</div>
	<?php if ( $sidebar_layout !== 'no-sidebar' ) { ?>
		<div <?php echo cyberstore_mikado_get_sidebar_holder_class(); ?>>
			<?php get_sidebar(); ?>
		</div>
	<?php } ?>
</div>