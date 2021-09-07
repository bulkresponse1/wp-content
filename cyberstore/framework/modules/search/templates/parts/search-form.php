<form action="<?php echo esc_url( home_url( '/' ) ); ?>" class="mkd-search-page-form" method="get">
	<h2 class="mkd-search-title"><?php esc_html_e( 'New search:', 'cyberstore' ); ?></h2>
	<div class="mkd-form-holder">
		<div class="mkd-column-left">
			<input type="text" name="s" class="mkd-search-field" autocomplete="off" value="" placeholder="<?php esc_attr_e( 'Type here', 'cyberstore' ); ?>"/>
		</div>
		<div class="mkd-column-right">
			<button type="submit" class="mkd-search-submit"><span class="icon_search"></span></button>
		</div>
	</div>
	<div class="mkd-search-label">
		<?php esc_html_e( 'If you are not happy with the results below please do another search', 'cyberstore' ); ?>
	</div>
</form>