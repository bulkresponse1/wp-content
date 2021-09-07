<div class="mkd-fullscreen-search-holder">
	<a class="mkd-fullscreen-search-close" href="javascript:void(0)">
		<?php echo cyberstore_mikado_icon_collections()->renderIcon( 'icon_close', 'font_elegant' ); ?>
	</a>
	<div class="mkd-fullscreen-search-table">
		<div class="mkd-fullscreen-search-cell">
			<div class="mkd-fullscreen-search-inner">
				<form action="<?php echo esc_url( home_url( '/' ) ); ?>" class="mkd-fullscreen-search-form" method="get">
					<div class="mkd-form-holder">
						<div class="mkd-form-holder-inner">
							<div class="mkd-field-holder">
								<input type="text" placeholder="<?php esc_attr_e( 'Search for...', 'cyberstore' ); ?>" name="s" class="mkd-search-field" autocomplete="off"/>
							</div>
							<button type="submit" class="mkd-search-submit"><?php echo cyberstore_mikado_icon_collections()->renderIcon( 'icon_search', 'font_elegant' ); ?></button>
							<div class="mkd-line"></div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>