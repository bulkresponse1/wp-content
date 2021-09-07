<?php

$page_id  = cyberstore_mikado_get_page_id();
$banner_section = get_post_meta( $page_id, 'mkd_show_banner_area_meta', true );

?>

<div class="mkd-footer-top-holder">
	<div class="mkd-footer-top-inner <?php echo esc_attr($footer_top_grid_class); ?>">
        <?php if($banner_section != 'no') : ?>
        <div class="mkd-banner-section">
            <?php
            if(is_active_sidebar('footer_banner_section')) {
                dynamic_sidebar('footer_banner_section');
            }
            ?>
        </div>
        <?php  endif; ?>
		<div class="mkd-grid-row <?php echo esc_attr($footer_top_classes); ?>">
			<?php for($i = 1; $i <= $footer_top_columns; $i++) { ?>
				<div class="mkd-column-content mkd-grid-col-<?php echo esc_attr(12 / $footer_top_columns); ?>">
					<?php
						if(is_active_sidebar('footer_top_column_'.$i)) {
							dynamic_sidebar('footer_top_column_'.$i);
						}
					?>
				</div>
			<?php } ?>
		</div>
	</div>
</div>