<?php

if ( ! function_exists( 'cyberstore_mikado_footer_options_map' ) ) {
	function cyberstore_mikado_footer_options_map() {
		
		cyberstore_mikado_add_admin_page(
			array(
				'slug'  => '_footer_page',
				'title' => esc_html__( 'Footer', 'cyberstore' ),
				'icon'  => 'icon_cone_alt'
			)
		);
		
		$footer_panel = cyberstore_mikado_add_admin_panel(
			array(
				'title' => esc_html__( 'Footer', 'cyberstore' ),
				'name'  => 'footer',
				'page'  => '_footer_page'
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'footer_in_grid',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Footer in Grid', 'cyberstore' ),
				'description'   => esc_html__( 'Enabling this option will place Footer content in grid', 'cyberstore' ),
				'parent'        => $footer_panel,
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'show_footer_top',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Show Footer Top', 'cyberstore' ),
				'description'   => esc_html__( 'Enabling this option will show Footer Top area', 'cyberstore' ),
				'args'          => array(
					'dependence'             => true,
					'dependence_hide_on_yes' => '',
					'dependence_show_on_yes' => '#mkd_show_footer_top_container'
				),
				'parent'        => $footer_panel,
			)
		);
		
		$show_footer_top_container = cyberstore_mikado_add_admin_container(
			array(
				'name'            => 'show_footer_top_container',
				'hidden_property' => 'show_footer_top',
				'hidden_value'    => 'no',
				'parent'          => $footer_panel
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'footer_top_columns',
				'parent'        => $show_footer_top_container,
				'default_value' => '4',
				'label'         => esc_html__( 'Footer Top Columns', 'cyberstore' ),
				'description'   => esc_html__( 'Choose number of columns for Footer Top area', 'cyberstore' ),
				'options'       => array(
					'1' => '1',
					'2' => '2',
					'3' => '3',
					'4' => '4'
				)
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'footer_top_columns_alignment',
				'default_value' => 'left',
				'label'         => esc_html__( 'Footer Top Columns Alignment', 'cyberstore' ),
				'description'   => esc_html__( 'Text Alignment in Footer Columns', 'cyberstore' ),
				'options'       => array(
					''       => esc_html__( 'Default', 'cyberstore' ),
					'left'   => esc_html__( 'Left', 'cyberstore' ),
					'center' => esc_html__( 'Center', 'cyberstore' ),
					'right'  => esc_html__( 'Right', 'cyberstore' )
				),
				'parent'        => $show_footer_top_container,
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'name'        => 'footer_top_background_color',
				'type'        => 'color',
				'label'       => esc_html__( 'Background Color', 'cyberstore' ),
				'description' => esc_html__( 'Set background color for top footer area', 'cyberstore' ),
				'parent'      => $show_footer_top_container
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'show_footer_bottom',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Show Footer Bottom', 'cyberstore' ),
				'description'   => esc_html__( 'Enabling this option will show Footer Bottom area', 'cyberstore' ),
				'args'          => array(
					'dependence'             => true,
					'dependence_hide_on_yes' => '',
					'dependence_show_on_yes' => '#mkd_show_footer_bottom_container'
				),
				'parent'        => $footer_panel,
			)
		);
		
		$show_footer_bottom_container = cyberstore_mikado_add_admin_container(
			array(
				'name'            => 'show_footer_bottom_container',
				'hidden_property' => 'show_footer_bottom',
				'hidden_value'    => 'no',
				'parent'          => $footer_panel
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'footer_bottom_columns',
				'default_value' => '2',
				'label'         => esc_html__( 'Footer Bottom Columns', 'cyberstore' ),
				'description'   => esc_html__( 'Choose number of columns for Footer Bottom area', 'cyberstore' ),
				'options'       => array(
					'1' => '1',
					'2' => '2',
					'3' => '3'
				),
				'parent'        => $show_footer_bottom_container,
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'name'        => 'footer_bottom_background_color',
				'type'        => 'color',
				'label'       => esc_html__( 'Background Color', 'cyberstore' ),
				'description' => esc_html__( 'Set background color for bottom footer area', 'cyberstore' ),
				'parent'      => $show_footer_bottom_container
			)
		);
	}
	
	add_action( 'cyberstore_mikado_options_map', 'cyberstore_mikado_footer_options_map', 8 );
}