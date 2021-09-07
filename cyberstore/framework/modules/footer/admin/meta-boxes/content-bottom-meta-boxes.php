<?php

if ( ! function_exists( 'cyberstore_mikado_map_content_bottom_meta' ) ) {
	function cyberstore_mikado_map_content_bottom_meta() {
		
		$content_bottom_meta_box = cyberstore_mikado_create_meta_box(
			array(
				'scope' => apply_filters( 'cyberstore_mikado_set_scope_for_meta_boxes', array( 'page', 'post' ) ),
				'title' => esc_html__( 'Content Bottom', 'cyberstore' ),
				'name'  => 'content_bottom_meta'
			)
		);
		
		cyberstore_mikado_create_meta_box_field(
			array(
				'name'          => 'mkd_enable_content_bottom_area_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Enable Content Bottom Area', 'cyberstore' ),
				'description'   => esc_html__( 'This option will enable Content Bottom area on pages', 'cyberstore' ),
				'parent'        => $content_bottom_meta_box,
				'options'       => cyberstore_mikado_get_yes_no_select_array(),
				'args'          => array(
					'dependence' => true,
					'hide'       => array(
						''   => '#mkd_mkd_show_content_bottom_meta_container',
						'no' => '#mkd_mkd_show_content_bottom_meta_container'
					),
					'show'       => array(
						'yes' => '#mkd_mkd_show_content_bottom_meta_container'
					)
				)
			)
		);
		
		$show_content_bottom_meta_container = cyberstore_mikado_add_admin_container(
			array(
				'parent'          => $content_bottom_meta_box,
				'name'            => 'mkd_show_content_bottom_meta_container',
				'hidden_property' => 'mkd_enable_content_bottom_area_meta',
				'hidden_values'   => array( '', 'no' )
			)
		);
		
		cyberstore_mikado_create_meta_box_field(
			array(
				'name'          => 'mkd_content_bottom_sidebar_custom_display_meta',
				'type'          => 'selectblank',
				'default_value' => '',
				'label'         => esc_html__( 'Sidebar to Display', 'cyberstore' ),
				'description'   => esc_html__( 'Choose a content bottom sidebar to display', 'cyberstore' ),
				'options'       => cyberstore_mikado_get_custom_sidebars(),
				'parent'        => $show_content_bottom_meta_container,
				'args'          => array(
					'select2' => true
				)
			)
		);
		
		cyberstore_mikado_create_meta_box_field(
			array(
				'type'          => 'select',
				'name'          => 'mkd_content_bottom_in_grid_meta',
				'default_value' => '',
				'label'         => esc_html__( 'Display in Grid', 'cyberstore' ),
				'description'   => esc_html__( 'Enabling this option will place content bottom in grid', 'cyberstore' ),
				'options'       => cyberstore_mikado_get_yes_no_select_array(),
				'parent'        => $show_content_bottom_meta_container
			)
		);
		
		cyberstore_mikado_create_meta_box_field(
			array(
				'type'        => 'color',
				'name'        => 'mkd_content_bottom_background_color_meta',
				'label'       => esc_html__( 'Background Color', 'cyberstore' ),
				'description' => esc_html__( 'Choose a background color for content bottom area', 'cyberstore' ),
				'parent'      => $show_content_bottom_meta_container
			)
		);
	}
	
	add_action( 'cyberstore_mikado_meta_boxes_map', 'cyberstore_mikado_map_content_bottom_meta', 71 );
}