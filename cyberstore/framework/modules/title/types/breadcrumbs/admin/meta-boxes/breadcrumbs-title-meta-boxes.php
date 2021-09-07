<?php

if ( ! function_exists( 'cyberstore_mikado_breadcrumbs_title_type_options_meta_boxes' ) ) {
	function cyberstore_mikado_breadcrumbs_title_type_options_meta_boxes( $show_title_area_meta_container ) {
		
		cyberstore_mikado_create_meta_box_field(
			array(
				'name'        => 'mkd_breadcrumbs_color_meta',
				'type'        => 'color',
				'label'       => esc_html__( 'Breadcrumbs Color', 'cyberstore' ),
				'description' => esc_html__( 'Choose a color for breadcrumbs text', 'cyberstore' ),
				'parent'      => $show_title_area_meta_container
			)
		);
	}
	
	add_action( 'cyberstore_mikado_additional_title_area_meta_boxes', 'cyberstore_mikado_breadcrumbs_title_type_options_meta_boxes' );
}