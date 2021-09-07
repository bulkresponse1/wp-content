<?php

if ( ! function_exists( 'cyberstore_mikado_reset_options_map' ) ) {
	/**
	 * Reset options panel
	 */
	function cyberstore_mikado_reset_options_map() {
		
		cyberstore_mikado_add_admin_page(
			array(
				'slug'  => '_reset_page',
				'title' => esc_html__( 'Reset', 'cyberstore' ),
				'icon'  => 'icon_refresh'
			)
		);
		
		$panel_reset = cyberstore_mikado_add_admin_panel(
			array(
				'page'  => '_reset_page',
				'name'  => 'panel_reset',
				'title' => esc_html__( 'Reset', 'cyberstore' )
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'reset_to_defaults',
				'default_value' => 'no',
				'label'         => esc_html__( 'Reset to Defaults', 'cyberstore' ),
				'description'   => esc_html__( 'This option will reset all Select Options values to defaults', 'cyberstore' ),
				'parent'        => $panel_reset
			)
		);
	}
	
	add_action( 'cyberstore_mikado_options_map', 'cyberstore_mikado_reset_options_map', 100 );
}