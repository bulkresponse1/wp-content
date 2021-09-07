<?php

if ( ! function_exists( 'cyberstore_mikado_sidearea_options_map' ) ) {
	function cyberstore_mikado_sidearea_options_map() {
		
		cyberstore_mikado_add_admin_page(
			array(
				'slug'  => '_side_area_page',
				'title' => esc_html__( 'Side Area', 'cyberstore' ),
				'icon'  => 'icon_menu'
			)
		);
		
		$side_area_panel = cyberstore_mikado_add_admin_panel(
			array(
				'title' => esc_html__( 'Side Area', 'cyberstore' ),
				'name'  => 'side_area',
				'page'  => '_side_area_page'
			)
		);
		
		$side_area_icon_style_group = cyberstore_mikado_add_admin_group(
			array(
				'parent'      => $side_area_panel,
				'name'        => 'side_area_icon_style_group',
				'title'       => esc_html__( 'Side Area Icon Style', 'cyberstore' ),
				'description' => esc_html__( 'Define styles for Side Area icon', 'cyberstore' )
			)
		);
		
		$side_area_icon_style_row1 = cyberstore_mikado_add_admin_row(
			array(
				'parent' => $side_area_icon_style_group,
				'name'   => 'side_area_icon_style_row1'
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent' => $side_area_icon_style_row1,
				'type'   => 'colorsimple',
				'name'   => 'side_area_icon_color',
				'label'  => esc_html__( 'Color', 'cyberstore' )
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent' => $side_area_icon_style_row1,
				'type'   => 'colorsimple',
				'name'   => 'side_area_icon_hover_color',
				'label'  => esc_html__( 'Hover Color', 'cyberstore' )
			)
		);
		
		$side_area_icon_style_row2 = cyberstore_mikado_add_admin_row(
			array(
				'parent' => $side_area_icon_style_group,
				'name'   => 'side_area_icon_style_row2',
				'next'   => true
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent' => $side_area_icon_style_row2,
				'type'   => 'colorsimple',
				'name'   => 'side_area_close_icon_color',
				'label'  => esc_html__( 'Close Icon Color', 'cyberstore' )
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent' => $side_area_icon_style_row2,
				'type'   => 'colorsimple',
				'name'   => 'side_area_close_icon_hover_color',
				'label'  => esc_html__( 'Close Icon Hover Color', 'cyberstore' )
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent'        => $side_area_panel,
				'type'          => 'text',
				'name'          => 'side_area_width',
				'default_value' => '',
				'label'         => esc_html__( 'Side Area Width', 'cyberstore' ),
				'description'   => esc_html__( 'Enter a width for Side Area', 'cyberstore' ),
				'args'          => array(
					'col_width' => 3,
					'suffix'    => 'px'
				)
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent'      => $side_area_panel,
				'type'        => 'color',
				'name'        => 'side_area_background_color',
				'label'       => esc_html__( 'Background Color', 'cyberstore' ),
				'description' => esc_html__( 'Choose a background color for Side Area', 'cyberstore' )
			)
		);

        cyberstore_mikado_add_admin_field(
            array(
                'parent'      => $side_area_panel,
                'type'        => 'image',
                'name'        => 'side_area_background_image',
                'label'       => esc_html__( 'Background Image', 'cyberstore' ),
                'description' => esc_html__( 'Choose a background image for Side Area', 'cyberstore' )
            )
        );
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent'      => $side_area_panel,
				'type'        => 'text',
				'name'        => 'side_area_padding',
				'label'       => esc_html__( 'Padding', 'cyberstore' ),
				'description' => esc_html__( 'Define padding for Side Area in format top right bottom left', 'cyberstore' ),
				'args'        => array(
					'col_width' => 3
				)
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent'        => $side_area_panel,
				'type'          => 'selectblank',
				'name'          => 'side_area_aligment',
				'default_value' => '',
				'label'         => esc_html__( 'Text Alignment', 'cyberstore' ),
				'description'   => esc_html__( 'Choose text alignment for side area', 'cyberstore' ),
				'options'       => array(
					''       => esc_html__( 'Default', 'cyberstore' ),
					'left'   => esc_html__( 'Left', 'cyberstore' ),
					'center' => esc_html__( 'Center', 'cyberstore' ),
					'right'  => esc_html__( 'Right', 'cyberstore' )
				)
			)
		);
	}
	
	add_action( 'cyberstore_mikado_options_map', 'cyberstore_mikado_sidearea_options_map', 4 );
}