<?php

if ( ! function_exists( 'cyberstore_mikado_map_sidebar_meta' ) ) {
	function cyberstore_mikado_map_sidebar_meta() {
		$mkd_sidebar_meta_box = cyberstore_mikado_create_meta_box(
			array(
				'scope' => apply_filters( 'cyberstore_mikado_set_scope_for_meta_boxes', array( 'page' ) ),
				'title' => esc_html__( 'Sidebar', 'cyberstore' ),
				'name'  => 'sidebar_meta'
			)
		);
		
		cyberstore_mikado_create_meta_box_field(
			array(
				'name'        => 'mkd_sidebar_layout_meta',
				'type'        => 'select',
				'label'       => esc_html__( 'Layout', 'cyberstore' ),
				'description' => esc_html__( 'Choose the sidebar layout', 'cyberstore' ),
				'parent'      => $mkd_sidebar_meta_box,
				'options'     => array(
					''                 => esc_html__( 'Default', 'cyberstore' ),
					'no-sidebar'       => esc_html__( 'No Sidebar', 'cyberstore' ),
					'sidebar-33-right' => esc_html__( 'Sidebar 1/3 Right', 'cyberstore' ),
					'sidebar-25-right' => esc_html__( 'Sidebar 1/4 Right', 'cyberstore' ),
					'sidebar-33-left'  => esc_html__( 'Sidebar 1/3 Left', 'cyberstore' ),
					'sidebar-25-left'  => esc_html__( 'Sidebar 1/4 Left', 'cyberstore' )
				)
			)
		);

        cyberstore_mikado_create_meta_box_field(
            array(
                'name'    => 'mkd_boxed_widgets_meta',
                'type'    => 'selectblank',
                'label'   => esc_html__('Boxed Widgets', 'cyberstore'),
                'parent'  => $mkd_sidebar_meta_box,
                'options' => array(
                    'yes' => esc_html__('Yes', 'cyberstore'),
                    'no'  => esc_html__('No', 'cyberstore')
                )
            )
        );
		
		$mkd_custom_sidebars = cyberstore_mikado_get_custom_sidebars();
		if ( count( $mkd_custom_sidebars ) > 0 ) {
			cyberstore_mikado_create_meta_box_field(
				array(
					'name'        => 'mkd_custom_sidebar_area_meta',
					'type'        => 'selectblank',
					'label'       => esc_html__( 'Choose Widget Area in Sidebar', 'cyberstore' ),
					'description' => esc_html__( 'Choose Custom Widget area to display in Sidebar"', 'cyberstore' ),
					'parent'      => $mkd_sidebar_meta_box,
					'options'     => $mkd_custom_sidebars,
				)
			);

            cyberstore_mikado_create_meta_box_field(
                array(
                    'name'        => 'mkd_custom_product_list_sidebar_meta',
                    'type'        => 'selectblank',
                    'label'       => esc_html__( 'Choose Custom Widget Area in Product List Sidebar', 'cyberstore' ),
                    'description' => esc_html__( 'Choose Custom Widget area to display in Product List Sidebar when Filter position left is enabled."', 'cyberstore' ),
                    'parent'      => $mkd_sidebar_meta_box,
                    'options'     => $mkd_custom_sidebars,
                )
            );
		}
	}
	
	add_action( 'cyberstore_mikado_meta_boxes_map', 'cyberstore_mikado_map_sidebar_meta', 31 );
}