<?php

if ( ! function_exists( 'cyberstore_mikado_search_options_map' ) ) {
	function cyberstore_mikado_search_options_map() {
		
		cyberstore_mikado_add_admin_page(
			array(
				'slug'  => '_search_page',
				'title' => esc_html__( 'Search', 'cyberstore' ),
				'icon'  => 'icon_search'
			)
		);
		
		$search_page_panel = cyberstore_mikado_add_admin_panel(
			array(
				'title' => esc_html__( 'Search Page', 'cyberstore' ),
				'name'  => 'search_template',
				'page'  => '_search_page'
			)
		);
		
		cyberstore_mikado_add_admin_field( array(
			'name'          => 'search_page_layout',
			'type'          => 'select',
			'label'         => esc_html__( 'Layout', 'cyberstore' ),
			'default_value' => 'in-grid',
			'description'   => esc_html__( 'Set layout. Default is in grid.', 'cyberstore' ),
			'parent'        => $search_page_panel,
			'options'       => array(
				'in-grid'    => esc_html__( 'In Grid', 'cyberstore' ),
				'full-width' => esc_html__( 'Full Width', 'cyberstore' )
			)
		) );

        cyberstore_mikado_add_admin_field(array(
            'name'          => 'search_page_boxed_widgets',
            'type'          => 'yesno',
            'default_value' => 'no',
            'label'         => esc_html__('Boxed Widgets','cyberstore'),
            'parent'        => $search_page_panel
        ));
		
		cyberstore_mikado_add_admin_field( array(
			'name'          => 'search_page_sidebar_layout',
			'type'          => 'select',
			'label'         => esc_html__( 'Sidebar Layout', 'cyberstore' ),
			'description'   => esc_html__( "Choose a sidebar layout for search page", 'cyberstore' ),
			'default_value' => 'no-sidebar',
			'options'       => array(
				'no-sidebar'       => esc_html__( 'No Sidebar', 'cyberstore' ),
				'sidebar-33-right' => esc_html__( 'Sidebar 1/3 Right', 'cyberstore' ),
				'sidebar-25-right' => esc_html__( 'Sidebar 1/4 Right', 'cyberstore' ),
				'sidebar-33-left'  => esc_html__( 'Sidebar 1/3 Left', 'cyberstore' ),
				'sidebar-25-left'  => esc_html__( 'Sidebar 1/4 Left', 'cyberstore' )
			),
			'parent'        => $search_page_panel
		) );
		
		$cyberstore_custom_sidebars = cyberstore_mikado_get_custom_sidebars();
		if ( count( $cyberstore_custom_sidebars ) > 0 ) {
			cyberstore_mikado_add_admin_field( array(
				'name'        => 'search_custom_sidebar_area',
				'type'        => 'selectblank',
				'label'       => esc_html__( 'Sidebar to Display', 'cyberstore' ),
				'description' => esc_html__( 'Choose a sidebar to display on search page. Default sidebar is "Sidebar"', 'cyberstore' ),
				'parent'      => $search_page_panel,
				'options'     => $cyberstore_custom_sidebars,
				'args'        => array(
					'select2' => true
				)
			) );
		}
		
		$search_panel = cyberstore_mikado_add_admin_panel(
			array(
				'title' => esc_html__( 'Search', 'cyberstore' ),
				'name'  => 'search',
				'page'  => '_search_page'
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent'        => $search_panel,
				'type'          => 'select',
				'name'          => 'search_type',
				'default_value' => 'fullscreen',
				'label'         => esc_html__( 'Select Search Type', 'cyberstore' ),
				'description'   => esc_html__( "Choose a type of Select search bar (Note: Slide From Header Bottom search type doesn't work with Vertical Header)", 'cyberstore' ),
				'options'       => array(
					'fullscreen'               => esc_html__( 'Fullscreen Search', 'cyberstore' ),
					'slide-from-header-bottom' => esc_html__( 'Slide From Header Bottom', 'cyberstore' ),
					'covers-header'            => esc_html__( 'Search Covers Header', 'cyberstore' ),
					'slide-from-window-top'    => esc_html__( 'Slide from Window Top', 'cyberstore' )
				)
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent'        => $search_panel,
				'type'          => 'select',
				'name'          => 'search_icon_pack',
				'default_value' => 'font_elegant',
				'label'         => esc_html__( 'Search Icon Pack', 'cyberstore' ),
				'description'   => esc_html__( 'Choose icon pack for search icon', 'cyberstore' ),
				'options'       => cyberstore_mikado_icon_collections()->getIconCollectionsExclude( array( 'linea_icons' ) )
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent'        => $search_panel,
				'type'          => 'yesno',
				'name'          => 'search_in_grid',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Enable Grid Layout', 'cyberstore' ),
				'description'   => esc_html__( 'Set search area to be in grid. (Applied for Search covers header and Slide from Window Top types.', 'cyberstore' ),
			)
		);
		
		cyberstore_mikado_add_admin_section_title(
			array(
				'parent' => $search_panel,
				'name'   => 'initial_header_icon_title',
				'title'  => esc_html__( 'Initial Search Icon in Header', 'cyberstore' )
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent'        => $search_panel,
				'type'          => 'text',
				'name'          => 'header_search_icon_size',
				'default_value' => '',
				'label'         => esc_html__( 'Icon Size', 'cyberstore' ),
				'description'   => esc_html__( 'Set size for icon', 'cyberstore' ),
				'args'          => array(
					'col_width' => 3,
					'suffix'    => 'px'
				)
			)
		);
		
		$search_icon_color_group = cyberstore_mikado_add_admin_group(
			array(
				'parent'      => $search_panel,
				'title'       => esc_html__( 'Icon Colors', 'cyberstore' ),
				'description' => esc_html__( 'Define color style for icon', 'cyberstore' ),
				'name'        => 'search_icon_color_group'
			)
		);
		
		$search_icon_color_row = cyberstore_mikado_add_admin_row(
			array(
				'parent' => $search_icon_color_group,
				'name'   => 'search_icon_color_row'
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent' => $search_icon_color_row,
				'type'   => 'colorsimple',
				'name'   => 'header_search_icon_color',
				'label'  => esc_html__( 'Color', 'cyberstore' )
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent' => $search_icon_color_row,
				'type'   => 'colorsimple',
				'name'   => 'header_search_icon_hover_color',
				'label'  => esc_html__( 'Hover Color', 'cyberstore' )
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent'        => $search_panel,
				'type'          => 'yesno',
				'name'          => 'enable_search_icon_text',
				'default_value' => 'no',
				'label'         => esc_html__( 'Enable Search Icon Text', 'cyberstore' ),
				'description'   => esc_html__( "Enable this option to show 'Search' text next to search icon in header", 'cyberstore' ),
				'args'          => array(
					'dependence'             => true,
					'dependence_hide_on_yes' => '',
					'dependence_show_on_yes' => '#mkd_enable_search_icon_text_container'
				)
			)
		);
		
		$enable_search_icon_text_container = cyberstore_mikado_add_admin_container(
			array(
				'parent'          => $search_panel,
				'name'            => 'enable_search_icon_text_container',
				'hidden_property' => 'enable_search_icon_text',
				'hidden_value'    => 'no'
			)
		);
		
		$enable_search_icon_text_group = cyberstore_mikado_add_admin_group(
			array(
				'parent'      => $enable_search_icon_text_container,
				'title'       => esc_html__( 'Search Icon Text', 'cyberstore' ),
				'name'        => 'enable_search_icon_text_group',
				'description' => esc_html__( 'Define style for search icon text', 'cyberstore' )
			)
		);
		
		$enable_search_icon_text_row = cyberstore_mikado_add_admin_row(
			array(
				'parent' => $enable_search_icon_text_group,
				'name'   => 'enable_search_icon_text_row'
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent' => $enable_search_icon_text_row,
				'type'   => 'colorsimple',
				'name'   => 'search_icon_text_color',
				'label'  => esc_html__( 'Text Color', 'cyberstore' )
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent' => $enable_search_icon_text_row,
				'type'   => 'colorsimple',
				'name'   => 'search_icon_text_color_hover',
				'label'  => esc_html__( 'Text Hover Color', 'cyberstore' )
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent'        => $enable_search_icon_text_row,
				'type'          => 'textsimple',
				'name'          => 'search_icon_text_font_size',
				'label'         => esc_html__( 'Font Size', 'cyberstore' ),
				'default_value' => '',
				'args'          => array(
					'suffix' => 'px'
				)
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent'        => $enable_search_icon_text_row,
				'type'          => 'textsimple',
				'name'          => 'search_icon_text_line_height',
				'label'         => esc_html__( 'Line Height', 'cyberstore' ),
				'default_value' => '',
				'args'          => array(
					'suffix' => 'px'
				)
			)
		);
		
		$enable_search_icon_text_row2 = cyberstore_mikado_add_admin_row(
			array(
				'parent' => $enable_search_icon_text_group,
				'name'   => 'enable_search_icon_text_row2',
				'next'   => true
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent'        => $enable_search_icon_text_row2,
				'type'          => 'selectblanksimple',
				'name'          => 'search_icon_text_text_transform',
				'label'         => esc_html__( 'Text Transform', 'cyberstore' ),
				'default_value' => '',
				'options'       => cyberstore_mikado_get_text_transform_array()
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent'        => $enable_search_icon_text_row2,
				'type'          => 'fontsimple',
				'name'          => 'search_icon_text_google_fonts',
				'label'         => esc_html__( 'Font Family', 'cyberstore' ),
				'default_value' => '-1',
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent'        => $enable_search_icon_text_row2,
				'type'          => 'selectblanksimple',
				'name'          => 'search_icon_text_font_style',
				'label'         => esc_html__( 'Font Style', 'cyberstore' ),
				'default_value' => '',
				'options'       => cyberstore_mikado_get_font_style_array(),
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent'        => $enable_search_icon_text_row2,
				'type'          => 'selectblanksimple',
				'name'          => 'search_icon_text_font_weight',
				'label'         => esc_html__( 'Font Weight', 'cyberstore' ),
				'default_value' => '',
				'options'       => cyberstore_mikado_get_font_weight_array(),
			)
		);
		
		$enable_search_icon_text_row3 = cyberstore_mikado_add_admin_row(
			array(
				'parent' => $enable_search_icon_text_group,
				'name'   => 'enable_search_icon_text_row3',
				'next'   => true
			)
		);
		
		cyberstore_mikado_add_admin_field(
			array(
				'parent'        => $enable_search_icon_text_row3,
				'type'          => 'textsimple',
				'name'          => 'search_icon_text_letter_spacing',
				'label'         => esc_html__( 'Letter Spacing', 'cyberstore' ),
				'default_value' => '',
				'args'          => array(
					'suffix' => 'px'
				)
			)
		);
	}
	
	add_action( 'cyberstore_mikado_options_map', 'cyberstore_mikado_search_options_map', 5 );
}