<?php ?>
<form action="<?php echo esc_url( home_url( '/' ) ); ?>" class="mkd-search-slide-window-top" method="get">
	<?php if ( $search_in_grid ) { ?>
	<div class="mkd-grid">
	<?php } ?>
		<div class="mkd-search-form-inner">
			<span class="mkd-swt-search-icon">
				<?php echo wp_kses( $search_icon, array(
					'i'    => array( 'class' => true, 'aria-hidden' => true ),
					'span' => array( 'class' => true, 'aria-hidden' => true )
				) ); ?>
			</span>
			<input type="text" placeholder="<?php esc_attr_e( 'Search', 'cyberstore' ); ?>" name="s" class="mkd-swt-search-field" autocomplete="off"/>
			<a class="mkd-swt-search-close" href="#">
				<?php echo wp_kses( $search_icon_close, array(
					'i'    => array( 'class' => true, 'aria-hidden' => true ),
					'span' => array( 'class' => true, 'aria-hidden' => true )
				) ); ?>
			</a>
		</div>
	<?php if ( $search_in_grid ) { ?>
	</div>
	<?php } ?>
</form>