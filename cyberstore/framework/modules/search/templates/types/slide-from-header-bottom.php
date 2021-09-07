<div class="mkd-slide-from-header-bottom-holder">
	<form action="<?php echo esc_url( home_url( '/' ) ); ?>" method="get">
		<div class="mkd-form-holder">
			<input type="text" placeholder="<?php esc_attr_e( 'Search', 'cyberstore' ); ?>" name="s" class="mkd-search-field" autocomplete="off" />
			<button type="submit" class="mkd-search-submit"><?php echo cyberstore_mikado_icon_collections()->renderIcon( 'icon_search', 'font_elegant' ); ?></button>
		</div>
	</form>
</div>