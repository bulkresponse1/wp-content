<section class="mkd-side-menu">
	<div class="mkd-close-side-menu-holder">
		<a class="mkd-close-side-menu" href="#" target="_self">
			<?php echo cyberstore_mikado_icon_collections()->renderIcon( 'dripicons-cross', 'dripicons' ); ?>
		</a>
	</div>
    <div class="mkd-sidearea-top-bottom-holder">
        <div class="mkd-sidearea-top-holder">
            <?php if ( is_active_sidebar( 'sidearea-top' ) ) {
                dynamic_sidebar( 'sidearea-top' );
            } ?>
        </div>
        <div class="mkd-sidearea-bottom-holder">
            <?php if ( is_active_sidebar( 'sidearea-bottom' ) ) {
                dynamic_sidebar( 'sidearea-bottom' );
            } ?>
        </div>
    </div>
</section>