<?php

if ( ! function_exists( 'cyberstore_mikado_general_options_map' ) ) {
	/**
	 * General options page
	 */
	function cyberstore_mikado_general_options_map() {

		cyberstore_mikado_add_admin_page(
			array(
				'slug'  => '',
				'title' => esc_html__( 'General', 'cyberstore' ),
				'icon'  => 'icon_building'
			)
		);

        $panel_branding = cyberstore_mikado_add_admin_panel(
            array(
                'page'  => '',
                'name'  => 'panel_branding',
                'title' => esc_html__( 'Branding', 'cyberstore' )
            )
        );

        cyberstore_mikado_add_admin_field(
            array(
                'parent'        => $panel_branding,
                'type'          => 'yesno',
                'name'          => 'hide_logo',
                'default_value' => 'no',
                'label'         => esc_html__( 'Hide Logo', 'cyberstore' ),
                'description'   => esc_html__( 'Enabling this option will hide logo image', 'cyberstore' ),
                'args'          => array(
                    "dependence"             => true,
                    "dependence_hide_on_yes" => "#mkd_hide_logo_container",
                    "dependence_show_on_yes" => ""
                )
            )
        );

        $hide_logo_container = cyberstore_mikado_add_admin_container(
            array(
                'parent'          => $panel_branding,
                'name'            => 'hide_logo_container',
                'hidden_property' => 'hide_logo',
                'hidden_value'    => 'yes'
            )
        );

        cyberstore_mikado_add_admin_field(
            array(
                'name'          => 'logo_image',
                'type'          => 'image',
                'default_value' => MIKADO_ASSETS_ROOT . "/img/logo.png",
                'label'         => esc_html__( 'Logo Image - Default', 'cyberstore' ),
                'parent'        => $hide_logo_container
            )
        );

        cyberstore_mikado_add_admin_field(
            array(
                'name'          => 'logo_image_dark',
                'type'          => 'image',
                'default_value' => MIKADO_ASSETS_ROOT . "/img/logo.png",
                'label'         => esc_html__( 'Logo Image - Dark', 'cyberstore' ),
                'parent'        => $hide_logo_container
            )
        );

        cyberstore_mikado_add_admin_field(
            array(
                'name'          => 'logo_image_light',
                'type'          => 'image',
                'default_value' => MIKADO_ASSETS_ROOT . "/img/logo_white.png",
                'label'         => esc_html__( 'Logo Image - Light', 'cyberstore' ),
                'parent'        => $hide_logo_container
            )
        );

        cyberstore_mikado_add_admin_field(
            array(
                'name'          => 'logo_image_sticky',
                'type'          => 'image',
                'default_value' => MIKADO_ASSETS_ROOT . "/img/logo.png",
                'label'         => esc_html__( 'Logo Image - Sticky', 'cyberstore' ),
                'parent'        => $hide_logo_container
            )
        );

        cyberstore_mikado_add_admin_field(
            array(
                'name'          => 'logo_image_mobile',
                'type'          => 'image',
                'default_value' => MIKADO_ASSETS_ROOT . "/img/logo.png",
                'label'         => esc_html__( 'Logo Image - Mobile', 'cyberstore' ),
                'parent'        => $hide_logo_container
            )
        );


        $panel_design_style = cyberstore_mikado_add_admin_panel(
			array(
				'page'  => '',
				'name'  => 'panel_design_style',
				'title' => esc_html__( 'Design Style', 'cyberstore' )
			)
		);

		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'google_fonts',
				'type'          => 'font',
				'default_value' => '-1',
				'label'         => esc_html__( 'Google Font Family', 'cyberstore' ),
				'description'   => esc_html__( 'Choose a default Google font for your site', 'cyberstore' ),
				'parent'        => $panel_design_style
			)
		);

		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'additional_google_fonts',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Additional Google Fonts', 'cyberstore' ),
				'parent'        => $panel_design_style,
				'args'          => array(
					"dependence"             => true,
					"dependence_hide_on_yes" => "",
					"dependence_show_on_yes" => "#mkd_additional_google_fonts_container"
				)
			)
		);

		$additional_google_fonts_container = cyberstore_mikado_add_admin_container(
			array(
				'parent'          => $panel_design_style,
				'name'            => 'additional_google_fonts_container',
				'hidden_property' => 'additional_google_fonts',
				'hidden_value'    => 'no'
			)
		);

		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'additional_google_font1',
				'type'          => 'font',
				'default_value' => '-1',
				'label'         => esc_html__( 'Font Family', 'cyberstore' ),
				'description'   => esc_html__( 'Choose additional Google font for your site', 'cyberstore' ),
				'parent'        => $additional_google_fonts_container
			)
		);

		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'additional_google_font2',
				'type'          => 'font',
				'default_value' => '-1',
				'label'         => esc_html__( 'Font Family', 'cyberstore' ),
				'description'   => esc_html__( 'Choose additional Google font for your site', 'cyberstore' ),
				'parent'        => $additional_google_fonts_container
			)
		);

		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'additional_google_font3',
				'type'          => 'font',
				'default_value' => '-1',
				'label'         => esc_html__( 'Font Family', 'cyberstore' ),
				'description'   => esc_html__( 'Choose additional Google font for your site', 'cyberstore' ),
				'parent'        => $additional_google_fonts_container
			)
		);

		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'additional_google_font4',
				'type'          => 'font',
				'default_value' => '-1',
				'label'         => esc_html__( 'Font Family', 'cyberstore' ),
				'description'   => esc_html__( 'Choose additional Google font for your site', 'cyberstore' ),
				'parent'        => $additional_google_fonts_container
			)
		);

		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'additional_google_font5',
				'type'          => 'font',
				'default_value' => '-1',
				'label'         => esc_html__( 'Font Family', 'cyberstore' ),
				'description'   => esc_html__( 'Choose additional Google font for your site', 'cyberstore' ),
				'parent'        => $additional_google_fonts_container
			)
		);

		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'google_font_weight',
				'type'          => 'checkboxgroup',
				'default_value' => '',
				'label'         => esc_html__( 'Google Fonts Style & Weight', 'cyberstore' ),
				'description'   => esc_html__( 'Choose a default Google font weights for your site. Impact on page load time', 'cyberstore' ),
				'parent'        => $panel_design_style,
				'options'       => array(
					'100'       => esc_html__( '100 Thin', 'cyberstore' ),
					'100italic' => esc_html__( '100 Thin Italic', 'cyberstore' ),
					'200'       => esc_html__( '200 Extra-Light', 'cyberstore' ),
					'200italic' => esc_html__( '200 Extra-Light Italic', 'cyberstore' ),
					'300'       => esc_html__( '300 Light', 'cyberstore' ),
					'300italic' => esc_html__( '300 Light Italic', 'cyberstore' ),
					'400'       => esc_html__( '400 Regular', 'cyberstore' ),
					'400italic' => esc_html__( '400 Regular Italic', 'cyberstore' ),
					'500'       => esc_html__( '500 Medium', 'cyberstore' ),
					'500italic' => esc_html__( '500 Medium Italic', 'cyberstore' ),
					'600'       => esc_html__( '600 Semi-Bold', 'cyberstore' ),
					'600italic' => esc_html__( '600 Semi-Bold Italic', 'cyberstore' ),
					'700'       => esc_html__( '700 Bold', 'cyberstore' ),
					'700italic' => esc_html__( '700 Bold Italic', 'cyberstore' ),
					'800'       => esc_html__( '800 Extra-Bold', 'cyberstore' ),
					'800italic' => esc_html__( '800 Extra-Bold Italic', 'cyberstore' ),
					'900'       => esc_html__( '900 Ultra-Bold', 'cyberstore' ),
					'900italic' => esc_html__( '900 Ultra-Bold Italic', 'cyberstore' )
				)
			)
		);

		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'google_font_subset',
				'type'          => 'checkboxgroup',
				'default_value' => '',
				'label'         => esc_html__( 'Google Fonts Subset', 'cyberstore' ),
				'description'   => esc_html__( 'Choose a default Google font subsets for your site', 'cyberstore' ),
				'parent'        => $panel_design_style,
				'options'       => array(
					'latin'        => esc_html__( 'Latin', 'cyberstore' ),
					'latin-ext'    => esc_html__( 'Latin Extended', 'cyberstore' ),
					'cyrillic'     => esc_html__( 'Cyrillic', 'cyberstore' ),
					'cyrillic-ext' => esc_html__( 'Cyrillic Extended', 'cyberstore' ),
					'greek'        => esc_html__( 'Greek', 'cyberstore' ),
					'greek-ext'    => esc_html__( 'Greek Extended', 'cyberstore' ),
					'vietnamese'   => esc_html__( 'Vietnamese', 'cyberstore' )
				)
			)
		);

		cyberstore_mikado_add_admin_field(
			array(
				'name'        => 'first_color',
				'type'        => 'color',
				'label'       => esc_html__( 'First Main Color', 'cyberstore' ),
				'description' => esc_html__( 'Choose the most dominant theme color. Default color is #00bbb3', 'cyberstore' ),
				'parent'      => $panel_design_style
			)
		);

		cyberstore_mikado_add_admin_field(
			array(
				'name'        => 'page_background_color',
				'type'        => 'color',
				'label'       => esc_html__( 'Page Background Color', 'cyberstore' ),
				'description' => esc_html__( 'Choose the background color for page content. Default color is #ffffff', 'cyberstore' ),
				'parent'      => $panel_design_style
			)
		);

		cyberstore_mikado_add_admin_field(
			array(
				'name'        => 'selection_color',
				'type'        => 'color',
				'label'       => esc_html__( 'Text Selection Color', 'cyberstore' ),
				'description' => esc_html__( 'Choose the color users see when selecting text', 'cyberstore' ),
				'parent'      => $panel_design_style
			)
		);

		/***************** Passepartout Layout - begin **********************/

		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'boxed',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Boxed Layout', 'cyberstore' ),
				'parent'        => $panel_design_style,
				'args'          => array(
					"dependence"             => true,
					"dependence_hide_on_yes" => "",
					"dependence_show_on_yes" => "#mkd_boxed_container"
				)
			)
		);

			$boxed_container = cyberstore_mikado_add_admin_container(
				array(
					'parent'          => $panel_design_style,
					'name'            => 'boxed_container',
					'hidden_property' => 'boxed',
					'hidden_value'    => 'no'
				)
			);

				cyberstore_mikado_add_admin_field(
					array(
						'name'        => 'page_background_color_in_box',
						'type'        => 'color',
						'label'       => esc_html__( 'Page Background Color', 'cyberstore' ),
						'description' => esc_html__( 'Choose the page background color outside box', 'cyberstore' ),
						'parent'      => $boxed_container
					)
				);

				cyberstore_mikado_add_admin_field(
					array(
						'name'        => 'boxed_background_image',
						'type'        => 'image',
						'label'       => esc_html__( 'Background Image', 'cyberstore' ),
						'description' => esc_html__( 'Choose an image to be displayed in background', 'cyberstore' ),
						'parent'      => $boxed_container
					)
				);

				cyberstore_mikado_add_admin_field(
					array(
						'name'        => 'boxed_pattern_background_image',
						'type'        => 'image',
						'label'       => esc_html__( 'Background Pattern', 'cyberstore' ),
						'description' => esc_html__( 'Choose an image to be used as background pattern', 'cyberstore' ),
						'parent'      => $boxed_container
					)
				);

				cyberstore_mikado_add_admin_field(
					array(
						'name'          => 'boxed_background_image_attachment',
						'type'          => 'select',
						'default_value' => '',
						'label'         => esc_html__( 'Background Image Attachment', 'cyberstore' ),
						'description'   => esc_html__( 'Choose background image attachment', 'cyberstore' ),
						'parent'        => $boxed_container,
						'options'       => array(
							''       => esc_html__( 'Default', 'cyberstore' ),
							'fixed'  => esc_html__( 'Fixed', 'cyberstore' ),
							'scroll' => esc_html__( 'Scroll', 'cyberstore' )
						)
					)
				);

		/***************** Boxed Layout - end **********************/

		/***************** Passepartout Layout - begin **********************/

		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'paspartu',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Passepartout', 'cyberstore' ),
				'description'   => esc_html__( 'Enabling this option will display passepartout around site content', 'cyberstore' ),
				'parent'        => $panel_design_style,
				'args'          => array(
					"dependence"             => true,
					"dependence_hide_on_yes" => "",
					"dependence_show_on_yes" => "#mkd_paspartu_container"
				)
			)
		);

			$paspartu_container = cyberstore_mikado_add_admin_container(
				array(
					'parent'          => $panel_design_style,
					'name'            => 'paspartu_container',
					'hidden_property' => 'paspartu',
					'hidden_value'    => 'no'
				)
			);

				cyberstore_mikado_add_admin_field(
					array(
						'name'        => 'paspartu_color',
						'type'        => 'color',
						'label'       => esc_html__( 'Passepartout Color', 'cyberstore' ),
						'description' => esc_html__( 'Choose passepartout color, default value is #ffffff', 'cyberstore' ),
						'parent'      => $paspartu_container
					)
				);

				cyberstore_mikado_add_admin_field(
					array(
						'name'        => 'paspartu_width',
						'type'        => 'text',
						'label'       => esc_html__( 'Passepartout Size', 'cyberstore' ),
						'description' => esc_html__( 'Enter size amount for passepartout', 'cyberstore' ),
						'parent'      => $paspartu_container,
						'args'        => array(
							'col_width' => 2,
							'suffix'    => 'px or %'
						)
					)
				);

				cyberstore_mikado_add_admin_field(
					array(
						'parent'        => $paspartu_container,
						'type'          => 'yesno',
						'default_value' => 'no',
						'name'          => 'disable_top_paspartu',
						'label'         => esc_html__( 'Disable Top Passepartout', 'cyberstore' )
					)
				);

		/***************** Passepartout Layout - end **********************/

		/***************** Content Layout - begin **********************/

		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'initial_content_width',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Initial Width of Content', 'cyberstore' ),
				'description'   => esc_html__( 'Choose the initial width of content which is in grid (Applies to pages set to "Default Template" and rows set to "In Grid")', 'cyberstore' ),
				'parent'        => $panel_design_style,
				'options'       => array(
					'mkd-grid-1100' => esc_html__( '1100px - default', 'cyberstore' ),
					'mkd-grid-1300' => esc_html__( '1300px', 'cyberstore' ),
					'mkd-grid-1200' => esc_html__( '1200px', 'cyberstore' ),
					'mkd-grid-1000' => esc_html__( '1000px', 'cyberstore' ),
					'mkd-grid-800'  => esc_html__( '800px', 'cyberstore' )
				)
			)
		);

		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'preload_pattern_image',
				'type'          => 'image',
				'label'         => esc_html__( 'Preload Pattern Image', 'cyberstore' ),
				'description'   => esc_html__( 'Choose preload pattern image to be displayed until images are loaded', 'cyberstore' ),
				'parent'        => $panel_design_style
			)
		);

		/***************** Content Layout - end **********************/

		$panel_settings = cyberstore_mikado_add_admin_panel(
			array(
				'page'  => '',
				'name'  => 'panel_settings',
				'title' => esc_html__( 'Settings', 'cyberstore' )
			)
		);

		/***************** Smooth Scroll Layout - begin **********************/

		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'page_smooth_scroll',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Smooth Scroll', 'cyberstore' ),
				'description'   => esc_html__( 'Enabling this option will perform a smooth scrolling effect on every page (except on Mac and touch devices)', 'cyberstore' ),
				'parent'        => $panel_settings
			)
		);

		/***************** Smooth Scroll Layout - end **********************/

		/***************** Smooth Page Transitions Layout - begin **********************/

		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'smooth_page_transitions',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Smooth Page Transitions', 'cyberstore' ),
				'description'   => esc_html__( 'Enabling this option will perform a smooth transition between pages when clicking on links', 'cyberstore' ),
				'parent'        => $panel_settings,
				'args'          => array(
					"dependence"             => true,
					"dependence_hide_on_yes" => "",
					"dependence_show_on_yes" => "#mkd_page_transitions_container"
				)
			)
		);

			$page_transitions_container = cyberstore_mikado_add_admin_container(
				array(
					'parent'          => $panel_settings,
					'name'            => 'page_transitions_container',
					'hidden_property' => 'smooth_page_transitions',
					'hidden_value'    => 'no'
				)
			);

				cyberstore_mikado_add_admin_field(
					array(
						'name'          => 'page_transition_preloader',
						'type'          => 'yesno',
						'default_value' => 'no',
						'label'         => esc_html__( 'Enable Preloading Animation', 'cyberstore' ),
						'description'   => esc_html__( 'Enabling this option will display an animated preloader while the page content is loading', 'cyberstore' ),
						'parent'        => $page_transitions_container,
						'args'          => array(
							"dependence"             => true,
							"dependence_hide_on_yes" => "",
							"dependence_show_on_yes" => "#mkd_page_transition_preloader_container"
						)
					)
				);

				$page_transition_preloader_container = cyberstore_mikado_add_admin_container(
					array(
						'parent'          => $page_transitions_container,
						'name'            => 'page_transition_preloader_container',
						'hidden_property' => 'page_transition_preloader',
						'hidden_value'    => 'no'
					)
				);


					cyberstore_mikado_add_admin_field(
						array(
							'name'   => 'smooth_pt_bgnd_color',
							'type'   => 'color',
							'label'  => esc_html__( 'Page Loader Background Color', 'cyberstore' ),
							'parent' => $page_transition_preloader_container
						)
					);

					$group_pt_spinner_animation = cyberstore_mikado_add_admin_group(
						array(
							'name'        => 'group_pt_spinner_animation',
							'title'       => esc_html__( 'Loader Style', 'cyberstore' ),
							'description' => esc_html__( 'Define styles for loader spinner animation', 'cyberstore' ),
							'parent'      => $page_transition_preloader_container
						)
					);

					$row_pt_spinner_animation = cyberstore_mikado_add_admin_row(
						array(
							'name'   => 'row_pt_spinner_animation',
							'parent' => $group_pt_spinner_animation
						)
					);

					cyberstore_mikado_add_admin_field(
						array(
							'type'          => 'selectsimple',
							'name'          => 'smooth_pt_spinner_type',
							'default_value' => '',
							'label'         => esc_html__( 'Spinner Type', 'cyberstore' ),
							'parent'        => $row_pt_spinner_animation,
							'options'       => array(
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

					cyberstore_mikado_add_admin_field(
						array(
							'type'          => 'colorsimple',
							'name'          => 'smooth_pt_spinner_color',
							'default_value' => '',
							'label'         => esc_html__( 'Spinner Color', 'cyberstore' ),
							'parent'        => $row_pt_spinner_animation
						)
					);

					cyberstore_mikado_add_admin_field(
						array(
							'name'          => 'page_transition_fadeout',
							'type'          => 'yesno',
							'default_value' => 'no',
							'label'         => esc_html__( 'Enable Fade Out Animation', 'cyberstore' ),
							'description'   => esc_html__( 'Enabling this option will turn on fade out animation when leaving page', 'cyberstore' ),
							'parent'        => $page_transitions_container
						)
					);

		/***************** Smooth Page Transitions Layout - end **********************/

		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'show_back_button',
				'type'          => 'yesno',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Show "Back To Top Button"', 'cyberstore' ),
				'description'   => esc_html__( 'Enabling this option will display a Back to Top button on every page', 'cyberstore' ),
				'parent'        => $panel_settings
			)
		);

		cyberstore_mikado_add_admin_field(
			array(
				'name'          => 'responsiveness',
				'type'          => 'yesno',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Responsiveness', 'cyberstore' ),
				'description'   => esc_html__( 'Enabling this option will make all pages responsive', 'cyberstore' ),
				'parent'        => $panel_settings
			)
		);

		$panel_custom_code = cyberstore_mikado_add_admin_panel(
			array(
				'page'  => '',
				'name'  => 'panel_custom_code',
				'title' => esc_html__( 'Custom Code', 'cyberstore' )
			)
		);

		cyberstore_mikado_add_admin_field(
			array(
				'name'        => 'custom_css',
				'type'        => 'textarea',
				'label'       => esc_html__( 'Custom CSS', 'cyberstore' ),
				'description' => esc_html__( 'Enter your custom CSS here', 'cyberstore' ),
				'parent'      => $panel_custom_code
			)
		);

		cyberstore_mikado_add_admin_field(
			array(
				'name'        => 'custom_js',
				'type'        => 'textarea',
				'label'       => esc_html__( 'Custom JS', 'cyberstore' ),
				'description' => esc_html__( 'Enter your custom Javascript here', 'cyberstore' ),
				'parent'      => $panel_custom_code
			)
		);

		$panel_google_api = cyberstore_mikado_add_admin_panel(
			array(
				'page'  => '',
				'name'  => 'panel_google_api',
				'title' => esc_html__( 'Google API', 'cyberstore' )
			)
		);

		cyberstore_mikado_add_admin_field(
			array(
				'name'        => 'google_maps_api_key',
				'type'        => 'text',
				'label'       => esc_html__( 'Google Maps Api Key', 'cyberstore' ),
				'description' => esc_html__( 'Insert your Google Maps API key here. For instructions on how to create a Google Maps API key, please refer to our to our documentation.', 'cyberstore' ),
				'parent'      => $panel_google_api
			)
		);
	}

	add_action( 'cyberstore_mikado_options_map', 'cyberstore_mikado_general_options_map', 1 );
}

if ( ! function_exists( 'cyberstore_mikado_page_general_style' ) ) {
	/**
	 * Function that prints page general inline styles
	 */
	function cyberstore_mikado_page_general_style( $style ) {
		$current_style = '';
		$page_id       = cyberstore_mikado_get_page_id();
		$class_prefix  = cyberstore_mikado_get_unique_page_class( $page_id );

		$boxed_background_style = array();

		$boxed_page_background_color = cyberstore_mikado_get_meta_field_intersect( 'page_background_color_in_box', $page_id );
		if ( ! empty( $boxed_page_background_color ) ) {
			$boxed_background_style['background-color'] = $boxed_page_background_color;
		}

		$boxed_page_background_image = cyberstore_mikado_get_meta_field_intersect( 'boxed_background_image', $page_id );
		if ( ! empty( $boxed_page_background_image ) ) {
			$boxed_background_style['background-image']    = 'url(' . esc_url( $boxed_page_background_image ) . ')';
			$boxed_background_style['background-position'] = 'center 0px';
			$boxed_background_style['background-repeat']   = 'no-repeat';
		}

		$boxed_page_background_pattern_image = cyberstore_mikado_get_meta_field_intersect( 'boxed_pattern_background_image', $page_id );
		if ( ! empty( $boxed_page_background_pattern_image ) ) {
			$boxed_background_style['background-image']    = 'url(' . esc_url( $boxed_page_background_pattern_image ) . ')';
			$boxed_background_style['background-position'] = '0px 0px';
			$boxed_background_style['background-repeat']   = 'repeat';
		}

		$boxed_page_background_attachment = cyberstore_mikado_get_meta_field_intersect( 'boxed_background_image_attachment', $page_id );
		if ( ! empty( $boxed_page_background_attachment ) ) {
			$boxed_background_style['background-attachment'] = $boxed_page_background_attachment;
		}

		$boxed_background_selector = $class_prefix . '.mkd-boxed .mkd-wrapper';

		if ( ! empty( $boxed_background_style ) ) {
			$current_style .= cyberstore_mikado_dynamic_css( $boxed_background_selector, $boxed_background_style );
		}

		$paspartu_style = array();

		$paspartu_color = cyberstore_mikado_get_meta_field_intersect( 'paspartu_color', $page_id );
		if ( ! empty( $paspartu_color ) ) {
			$paspartu_style['background-color'] = $paspartu_color;
		}

		$paspartu_width = cyberstore_mikado_get_meta_field_intersect( 'paspartu_width', $page_id );
		if ( $paspartu_width !== '' ) {
			if ( cyberstore_mikado_string_ends_with( $paspartu_width, '%' ) || cyberstore_mikado_string_ends_with( $paspartu_width, 'px' ) ) {
				$paspartu_style['padding'] = $paspartu_width;
			} else {
				$paspartu_style['padding'] = $paspartu_width . 'px';
			}
		}

		$paspartu_selector = $class_prefix . '.mkd-paspartu-enabled .mkd-wrapper';

		if ( ! empty( $paspartu_style ) ) {
			$current_style .= cyberstore_mikado_dynamic_css( $paspartu_selector, $paspartu_style );
		}

		$current_style = $current_style . $style;

		return $current_style;
	}

	add_filter( 'cyberstore_mikado_add_page_custom_style', 'cyberstore_mikado_page_general_style' );
}