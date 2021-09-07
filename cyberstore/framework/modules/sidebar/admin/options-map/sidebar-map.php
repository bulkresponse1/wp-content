<?php

if ( ! function_exists( 'cyberstore_mikado_sidebar_options_map' ) ) {
	function cyberstore_mikado_sidebar_options_map() {
		
		cyberstore_mikado_add_admin_page(
			array(
				'slug'  => '_sidebar_page',
				'title' => esc_html__( 'Sidebar Area', 'cyberstore' ),
				'icon'  => 'icon_ul'
			)
		);
		
		$sidebar_panel = cyberstore_mikado_add_admin_panel(
			array(
				'title' => esc_html__( 'Sidebar Area', 'cyberstore' ),
				'name'  => 'sidebar',
				'page'  => '_sidebar_page'
			)
		);
		
		cyberstore_mikado_add_admin_field( array(
			'name'          => 'sidebar_layout',
			'type'          => 'select',
			'label'         => esc_html__( 'Sidebar Layout', 'cyberstore' ),
			'description'   => esc_html__( 'Choose a sidebar layout for pages', 'cyberstore' ),
			'parent'        => $sidebar_panel,
			'default_value' => 'no-sidebar',
			'options'       => array(
				'no-sidebar'       => esc_html__( 'No Sidebar', 'cyberstore' ),
				'sidebar-33-right' => esc_html__( 'Sidebar 1/3 Right', 'cyberstore' ),
				'sidebar-25-right' => esc_html__( 'Sidebar 1/4 Right', 'cyberstore' ),
				'sidebar-33-left'  => esc_html__( 'Sidebar 1/3 Left', 'cyberstore' ),
				'sidebar-25-left'  => esc_html__( 'Sidebar 1/4 Left', 'cyberstore' )
			)
		) );
		
		$cyberstore_custom_sidebars = cyberstore_mikado_get_custom_sidebars();
		if ( count( $cyberstore_custom_sidebars ) > 0 ) {
			cyberstore_mikado_add_admin_field( array(
				'name'        => 'custom_sidebar_area',
				'type'        => 'selectblank',
				'label'       => esc_html__( 'Sidebar to Display', 'cyberstore' ),
				'description' => esc_html__( 'Choose a sidebar to display on pages. Default sidebar is "Sidebar"', 'cyberstore' ),
				'parent'      => $sidebar_panel,
				'options'     => $cyberstore_custom_sidebars,
				'args'        => array(
					'select2' => true
				)
			) );
		}

        cyberstore_mikado_add_admin_field(array(
            'name'          => 'boxed_widgets',
            'type'          => 'yesno',
            'default_value' => 'no',
            'label'         => esc_html__('Boxed Widgets', 'cyberstore'),
            'parent'        => $sidebar_panel
        ));
	}
	
	add_action( 'cyberstore_mikado_options_map', 'cyberstore_mikado_sidebar_options_map', 11 );
}