<?php

if ( ! function_exists( 'cyberstore_mikado_map_general_meta' ) ) {
	function cyberstore_mikado_map_general_meta() {
		
		$general_meta_box = cyberstore_mikado_create_meta_box(
			array(
				'scope' => apply_filters( 'cyberstore_mikado_set_scope_for_meta_boxes', array( 'page', 'post' ) ),
				'title' => esc_html__( 'General', 'cyberstore' ),
				'name'  => 'general_meta'
			)
		);
		
		/***************** Slider Layout - begin **********************/
		
		cyberstore_mikado_create_meta_box_field(
			array(
				'name'        => 'mkd_page_slider_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Slider Shortcode', 'cyberstore' ),
				'description' => esc_html__( 'Paste your slider shortcode here', 'cyberstore' ),
				'parent'      => $general_meta_box
			)
		);
		
		/***************** Slider Layout - begin **********************/
		
		/***************** Content Layout - begin **********************/
		
		cyberstore_mikado_create_meta_box_field(
			array(
				'name'          => 'mkd_page_content_behind_header_meta',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Always put content behind header', 'cyberstore' ),
				'description'   => esc_html__( 'Enabling this option will put page content behind page header', 'cyberstore' ),
				'parent'        => $general_meta_box
			)
		);
		
		$mkd_content_padding_group = cyberstore_mikado_add_admin_group(
			array(
				'name'        => 'content_padding_group',
				'title'       => esc_html__( 'Content Style', 'cyberstore' ),
				'description' => esc_html__( 'Define styles for Content area', 'cyberstore' ),
				'parent'      => $general_meta_box
			)
		);
		
			$mkd_content_padding_row = cyberstore_mikado_add_admin_row(
				array(
					'name'   => 'mkd_content_padding_row',
					'next'   => true,
					'parent' => $mkd_content_padding_group
				)
			);
		
				cyberstore_mikado_create_meta_box_field(
					array(
						'name'   => 'mkd_page_content_top_padding',
						'type'   => 'textsimple',
						'label'  => esc_html__( 'Content Top Padding', 'cyberstore' ),
						'parent' => $mkd_content_padding_row,
						'args'   => array(
							'suffix' => 'px'
						)
					)
				);
				
				cyberstore_mikado_create_meta_box_field(
					array(
						'name'    => 'mkd_page_content_top_padding_mobile',
						'type'    => 'selectsimple',
						'label'   => esc_html__( 'Set this top padding for mobile header', 'cyberstore' ),
						'parent'  => $mkd_content_padding_row,
						'options' => cyberstore_mikado_get_yes_no_select_array( false )
					)
				);
		
		cyberstore_mikado_create_meta_box_field(
			array(
				'name'        => 'mkd_page_background_color_meta',
				'type'        => 'color',
				'label'       => esc_html__( 'Page Background Color', 'cyberstore' ),
				'description' => esc_html__( 'Choose background color for page content', 'cyberstore' ),
				'parent'      => $general_meta_box
			)
		);
		
		/***************** Content Layout - end **********************/
		
		/***************** Boxed Layout - begin **********************/
		
		cyberstore_mikado_create_meta_box_field(
			array(
				'name'    => 'mkd_boxed_meta',
				'type'    => 'select',
				'label'   => esc_html__( 'Boxed Layout', 'cyberstore' ),
				'parent'  => $general_meta_box,
				'options' => cyberstore_mikado_get_yes_no_select_array(),
				'args'    => array(
					'dependence' => true,
					'hide'       => array(
						''    => '#mkd_boxed_container_meta',
						'no'  => '#mkd_boxed_container_meta',
						'yes' => ''
					),
					'show'       => array(
						''    => '',
						'no'  => '',
						'yes' => '#mkd_boxed_container_meta'
					)
				)
			)
		);
		
			$boxed_container_meta = cyberstore_mikado_add_admin_container(
				array(
					'parent'          => $general_meta_box,
					'name'            => 'boxed_container_meta',
					'hidden_property' => 'mkd_boxed_meta',
					'hidden_values'   => array(
						'',
						'no'
					)
				)
			);
		
				cyberstore_mikado_create_meta_box_field(
					array(
						'name'        => 'mkd_page_background_color_in_box_meta',
						'type'        => 'color',
						'label'       => esc_html__( 'Page Background Color', 'cyberstore' ),
						'description' => esc_html__( 'Choose the page background color outside box', 'cyberstore' ),
						'parent'      => $boxed_container_meta
					)
				);
				
				cyberstore_mikado_create_meta_box_field(
					array(
						'name'        => 'mkd_boxed_background_image_meta',
						'type'        => 'image',
						'label'       => esc_html__( 'Background Image', 'cyberstore' ),
						'description' => esc_html__( 'Choose an image to be displayed in background', 'cyberstore' ),
						'parent'      => $boxed_container_meta
					)
				);
				
				cyberstore_mikado_create_meta_box_field(
					array(
						'name'        => 'mkd_boxed_pattern_background_image_meta',
						'type'        => 'image',
						'label'       => esc_html__( 'Background Pattern', 'cyberstore' ),
						'description' => esc_html__( 'Choose an image to be used as background pattern', 'cyberstore' ),
						'parent'      => $boxed_container_meta
					)
				);
				
				cyberstore_mikado_create_meta_box_field(
					array(
						'name'          => 'mkd_boxed_background_image_attachment_meta',
						'type'          => 'select',
						'default_value' => 'fixed',
						'label'         => esc_html__( 'Background Image Attachment', 'cyberstore' ),
						'description'   => esc_html__( 'Choose background image attachment', 'cyberstore' ),
						'parent'        => $boxed_container_meta,
						'options'       => array(
							''       => esc_html__( 'Default', 'cyberstore' ),
							'fixed'  => esc_html__( 'Fixed', 'cyberstore' ),
							'scroll' => esc_html__( 'Scroll', 'cyberstore' )
						)
					)
				);
		
		/***************** Boxed Layout - end **********************/
		
		/***************** Passepartout Layout - begin **********************/
		
		cyberstore_mikado_create_meta_box_field(
			array(
				'name'          => 'mkd_paspartu_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Passepartout', 'cyberstore' ),
				'description'   => esc_html__( 'Enabling this option will display passepartout around site content', 'cyberstore' ),
				'parent'        => $general_meta_box,
				'options'       => cyberstore_mikado_get_yes_no_select_array(),
				'args'    => array(
					'dependence'    => true,
					'hide'          => array(
						''    => '#mkd_mkd_paspartu_container_meta',
						'no'  => '#mkd_mkd_paspartu_container_meta',
						'yes' => ''
					),
					'show'          => array(
						''    => '',
						'no'  => '',
						'yes' => '#mkd_mkd_paspartu_container_meta'
					)
				)
			)
		);
		
			$paspartu_container_meta = cyberstore_mikado_add_admin_container(
				array(
					'parent'          => $general_meta_box,
					'name'            => 'mkd_paspartu_container_meta',
					'hidden_property' => 'mkd_paspartu_meta',
					'hidden_values'   => array(
						'',
						'no'
					)
				)
			);
		
				cyberstore_mikado_create_meta_box_field(
					array(
						'name'        => 'mkd_paspartu_color_meta',
						'type'        => 'color',
						'label'       => esc_html__( 'Passepartout Color', 'cyberstore' ),
						'description' => esc_html__( 'Choose passepartout color, default value is #ffffff', 'cyberstore' ),
						'parent'      => $paspartu_container_meta
					)
				);
				
				cyberstore_mikado_create_meta_box_field(
					array(
						'name'        => 'mkd_paspartu_width_meta',
						'type'        => 'text',
						'label'       => esc_html__( 'Passepartout Size', 'cyberstore' ),
						'description' => esc_html__( 'Enter size amount for passepartout', 'cyberstore' ),
						'parent'      => $paspartu_container_meta,
						'args'        => array(
							'col_width' => 2,
							'suffix'    => 'px or %'
						)
					)
				);
				
				cyberstore_mikado_create_meta_box_field(
					array(
						'parent'        => $paspartu_container_meta,
						'type'          => 'select',
						'default_value' => '',
						'name'          => 'mkd_disable_top_paspartu_meta',
						'label'         => esc_html__( 'Disable Top Passepartout', 'cyberstore' ),
						'options'       => cyberstore_mikado_get_yes_no_select_array(),
					)
				);
		
		/***************** Passepartout Layout - end **********************/
		
		/***************** Content Width Layout - begin **********************/
		
		cyberstore_mikado_create_meta_box_field(
			array(
				'name'          => 'mkd_initial_content_width_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Initial Width of Content', 'cyberstore' ),
				'description'   => esc_html__( 'Choose the initial width of content which is in grid (Applies to pages set to "Default Template" and rows set to "In Grid")', 'cyberstore' ),
				'parent'        => $general_meta_box,
				'options'       => array(
					''                => esc_html__( 'Default', 'cyberstore' ),
					'mkd-grid-1100' => esc_html__( '1100px', 'cyberstore' ),
					'mkd-grid-1300' => esc_html__( '1300px', 'cyberstore' ),
					'mkd-grid-1200' => esc_html__( '1200px', 'cyberstore' ),
					'mkd-grid-1000' => esc_html__( '1000px', 'cyberstore' ),
					'mkd-grid-800'  => esc_html__( '800px', 'cyberstore' )
				)
			)
		);
		
		/***************** Content Width Layout - end **********************/
		
		/***************** Smooth Page Transitions Layout - begin **********************/
		
		cyberstore_mikado_create_meta_box_field(
			array(
				'name'          => 'mkd_smooth_page_transitions_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Smooth Page Transitions', 'cyberstore' ),
				'description'   => esc_html__( 'Enabling this option will perform a smooth transition between pages when clicking on links', 'cyberstore' ),
				'parent'        => $general_meta_box,
				'options'       => cyberstore_mikado_get_yes_no_select_array(),
				'args'          => array(
					'dependence' => true,
					'hide'       => array(
						''    => '#mkd_page_transitions_container_meta',
						'no'  => '#mkd_page_transitions_container_meta',
						'yes' => ''
					),
					'show'       => array(
						''    => '',
						'no'  => '',
						'yes' => '#mkd_page_transitions_container_meta'
					)
				)
			)
		);
		
			$page_transitions_container_meta = cyberstore_mikado_add_admin_container(
				array(
					'parent'          => $general_meta_box,
					'name'            => 'page_transitions_container_meta',
					'hidden_property' => 'mkd_smooth_page_transitions_meta',
					'hidden_values'   => array(
						'',
						'no'
					)
				)
			);
		
				cyberstore_mikado_create_meta_box_field(
					array(
						'name'        => 'mkd_page_transition_preloader_meta',
						'type'        => 'select',
						'label'       => esc_html__( 'Enable Preloading Animation', 'cyberstore' ),
						'description' => esc_html__( 'Enabling this option will display an animated preloader while the page content is loading', 'cyberstore' ),
						'parent'      => $page_transitions_container_meta,
						'options'     => cyberstore_mikado_get_yes_no_select_array(),
						'args'        => array(
							'dependence' => true,
							'hide'       => array(
								''    => '#mkd_page_transition_preloader_container_meta',
								'no'  => '#mkd_page_transition_preloader_container_meta',
								'yes' => ''
							),
							'show'       => array(
								''    => '',
								'no'  => '',
								'yes' => '#mkd_page_transition_preloader_container_meta'
							)
						)
					)
				);
				
				$page_transition_preloader_container_meta = cyberstore_mikado_add_admin_container(
					array(
						'parent'          => $page_transitions_container_meta,
						'name'            => 'page_transition_preloader_container_meta',
						'hidden_property' => 'mkd_page_transition_preloader_meta',
						'hidden_values'   => array(
							'',
							'no'
						)
					)
				);
				
					cyberstore_mikado_create_meta_box_field(
						array(
							'name'   => 'mkd_smooth_pt_bgnd_color_meta',
							'type'   => 'color',
							'label'  => esc_html__( 'Page Loader Background Color', 'cyberstore' ),
							'parent' => $page_transition_preloader_container_meta
						)
					);
					
					$group_pt_spinner_animation_meta = cyberstore_mikado_add_admin_group(
						array(
							'name'        => 'group_pt_spinner_animation_meta',
							'title'       => esc_html__( 'Loader Style', 'cyberstore' ),
							'description' => esc_html__( 'Define styles for loader spinner animation', 'cyberstore' ),
							'parent'      => $page_transition_preloader_container_meta
						)
					);
					
					$row_pt_spinner_animation_meta = cyberstore_mikado_add_admin_row(
						array(
							'name'   => 'row_pt_spinner_animation_meta',
							'parent' => $group_pt_spinner_animation_meta
						)
					);
					
					cyberstore_mikado_create_meta_box_field(
						array(
							'type'    => 'selectsimple',
							'name'    => 'mkd_smooth_pt_spinner_type_meta',
							'label'   => esc_html__( 'Spinner Type', 'cyberstore' ),
							'parent'  => $row_pt_spinner_animation_meta,
							'options' => array(
								''                      => esc_html__( 'Default', 'cyberstore' ),
								'rotate_circles'        => esc_html__( 'Rotate Circles', 'cyberstore' ),
								'pulse'                 => esc_html__( 'Pulse', 'cyberstore' ),
								'double_pulse'          => esc_html__( 'Double Pulse', 'cyberstore' ),
								'cube'                  => esc_html__( 'Cube', 'cyberstore' ),
								'rotating_cubes'        => esc_html__( 'Rotating Cubes', 'cyberstore' ),
								'stripes'               => esc_html__( 'Stripes', 'cyberstore' ),
								'wave'                  => esc_html__( 'Wave', 'cyberstore' ),
								'two_rotating_circles'  => esc_html__( '2 Rotating Circles', 'cyberstore' ),
								'five_rotating_circles' => esc_html__( '5 Rotating Circles', 'cyberstore' ),
								'atom'                  => esc_html__( 'Atom', 'cyberstore' ),
								'clock'                 => esc_html__( 'Clock', 'cyberstore' ),
								'mitosis'               => esc_html__( 'Mitosis', 'cyberstore' ),
								'lines'                 => esc_html__( 'Lines', 'cyberstore' ),
								'fussion'               => esc_html__( 'Fussion', 'cyberstore' ),
								'wave_circles'          => esc_html__( 'Wave Circles', 'cyberstore' ),
								'pulse_circles'         => esc_html__( 'Pulse Circles', 'cyberstore' )
							)
						)
					);
					
					cyberstore_mikado_create_meta_box_field(
						array(
							'type'   => 'colorsimple',
							'name'   => 'mkd_smooth_pt_spinner_color_meta',
							'label'  => esc_html__( 'Spinner Color', 'cyberstore' ),
							'parent' => $row_pt_spinner_animation_meta
						)
					);
					
					cyberstore_mikado_create_meta_box_field(
						array(
							'name'        => 'mkd_page_transition_fadeout_meta',
							'type'        => 'select',
							'label'       => esc_html__( 'Enable Fade Out Animation', 'cyberstore' ),
							'description' => esc_html__( 'Enabling this option will turn on fade out animation when leaving page', 'cyberstore' ),
							'options'     => cyberstore_mikado_get_yes_no_select_array(),
							'parent'      => $page_transitions_container_meta
						
						)
					);
		
		/***************** Smooth Page Transitions Layout - end **********************/
		
		/***************** Comments Layout - begin **********************/
		
		cyberstore_mikado_create_meta_box_field(
			array(
				'name'        => 'mkd_page_comments_meta',
				'type'        => 'select',
				'label'       => esc_html__( 'Show Comments', 'cyberstore' ),
				'description' => esc_html__( 'Enabling this option will show comments on your page', 'cyberstore' ),
				'parent'      => $general_meta_box,
				'options'     => cyberstore_mikado_get_yes_no_select_array()
			)
		);
		
		/***************** Comments Layout - end **********************/
	}
	
	add_action( 'cyberstore_mikado_meta_boxes_map', 'cyberstore_mikado_map_general_meta', 10 );
}