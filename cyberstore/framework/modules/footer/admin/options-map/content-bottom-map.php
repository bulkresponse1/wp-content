<?php

if ( ! function_exists( 'cyberstore_mikado_content_bottom_options_map' ) ) {
	function cyberstore_mikado_content_bottom_options_map() {
		
		$panel_content_bottom = cyberstore_mikado_add_admin_panel(
			array(
				'page'  => '_page_page',
				'name'  => 'panel_content_bottom',
				'title' => esc_html__( 'Content Bottom Area Style', 'cyberstore' )
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'enable_content_bottom_area',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Enable Content Bottom Area', 'cyberstore' ),
				'description'   => esc_html__( 'This option will enable Content Bottom area on pages', 'cyberstore' ),
				'args'          => array(
					'dependence'             => true,
					'dependence_hide_on_yes' => '',
					'dependence_show_on_yes' => '#mkd_enable_content_bottom_area_container'
				),
				'parent'        => $panel_content_bottom
			)
		);
		
		$enable_content_bottom_area_container = cyberstore_mikado_add_admin_container(
			array(
				'parent'          => $panel_content_bottom,
				'name'            => 'enable_content_bottom_area_container',
				'hidden_property' => 'enable_content_bottom_area',
				'hidden_value'    => 'no'
			)
		);
		
		$cyberstore_custom_sidebars = cyberstore_mikado_get_custom_sidebars();
		
		cyberstore_mikado_add_admin_field(
			array(
				'type'          => 'selectblank',
				'name'          => 'content_bottom_sidebar_custom_display',
				'default_value' => '',
				'label'         => esc_html__( 'Widget Area to Display', 'cyberstore' ),
				'description'   => esc_html__( 'Choose a Content Bottom widget area to display', 'cyberstore' ),
				'options'       => $cyberstore_custom_sidebars,
				'parent'        => $enable_content_bottom_area_container
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'content_bottom_in_grid',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Display in Grid', 'cyberstore' ),
				'description'   => esc_html__( 'Enabling this option will place Content Bottom in grid', 'cyberstore' ),
				'parent'        => $enable_content_bottom_area_container
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'type'        => 'color',
				'name'        => 'content_bottom_background_color',
				'label'       => esc_html__( 'Background Color', 'cyberstore' ),
				'description' => esc_html__( 'Choose a background color for Content Bottom area', 'cyberstore' ),
				'parent'      => $enable_content_bottom_area_container
			)
		);
	}
	
	add_action( 'cyberstore_mikado_additional_page_options_map', 'cyberstore_mikado_content_bottom_options_map' );
}