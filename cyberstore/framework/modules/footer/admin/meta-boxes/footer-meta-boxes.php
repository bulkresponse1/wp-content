<?php

if ( ! function_exists( 'cyberstore_mikado_map_footer_meta' ) ) {
	function cyberstore_mikado_map_footer_meta() {
		
		$footer_meta_box = cyberstore_mikado_create_meta_box(
			array(
				'scope' => apply_filters( 'cyberstore_mikado_set_scope_for_meta_boxes', array( 'page', 'post' ) ),
				'title' => esc_html__( 'Footer', 'cyberstore' ),
				'name'  => 'footer_meta'
			)
		);
		
		cyberstore_mikado_create_meta_box_field(
			array(
				'name'          => 'mkd_disable_footer_meta',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Disable Footer for this Page', 'cyberstore' ),
				'description'   => esc_html__( 'Enabling this option will hide footer on this page', 'cyberstore' ),
				'parent'        => $footer_meta_box
			)
		);
		
		cyberstore_mikado_create_meta_box_field(
			array(
				'name'          => 'mkd_show_footer_top_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Show Footer Top', 'cyberstore' ),
				'description'   => esc_html__( 'Enabling this option will show Footer Top area', 'cyberstore' ),
				'parent'        => $footer_meta_box,
				'options'       => cyberstore_mikado_get_yes_no_select_array()
			)
		);
		
		cyberstore_mikado_create_meta_box_field(
			array(
				'name'          => 'mkd_show_footer_bottom_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Show Footer Bottom', 'cyberstore' ),
				'description'   => esc_html__( 'Enabling this option will show Footer Bottom area', 'cyberstore' ),
				'parent'        => $footer_meta_box,
				'options'       => cyberstore_mikado_get_yes_no_select_array()
			)
		);

        cyberstore_mikado_create_meta_box_field(
            array(
                'name'          => 'mkd_show_banner_area_meta',
                'type'          => 'select',
                'default_value' => '',
                'label'         => esc_html__( 'Show Banner Area', 'cyberstore' ),
                'description'   => esc_html__( 'Enabling this option will show Banner Section Area', 'cyberstore' ),
                'parent'        => $footer_meta_box,
                'options'       => cyberstore_mikado_get_yes_no_select_array()
            )
        );
	}
	
	add_action( 'cyberstore_mikado_meta_boxes_map', 'cyberstore_mikado_map_footer_meta', 70 );
}