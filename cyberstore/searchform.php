<form role="search" method="get" class="searchform" id="searchform-<?php echo esc_attr(rand(0, 1000)); ?>" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label class="screen-reader-text"><?php esc_html_e( 'Search for:', 'cyberstore' ); ?></label>
	<div class="input-holder clearfix">
		<input type="search" class="search-field" placeholder="<?php esc_attr_e( 'Search...', 'cyberstore' ); ?>" value="" name="s" title="<?php esc_attr_e( 'Search for:', 'cyberstore' ); ?>"/>
		<button type="submit" class="mkd-search-submit"><?php echo cyberstore_mikado_icon_collections()->renderIcon( 'dripicons-search', 'dripicons' ); ?></button>
	</div>
</form>