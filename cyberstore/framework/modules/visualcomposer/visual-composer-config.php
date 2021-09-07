<?php

/**
 * Force Visual Composer to initialize as "built into the theme". This will hide certain tabs under the Settings->Visual Composer page
 */
if (function_exists('vc_set_as_theme')) {
    vc_set_as_theme(true);
}

/**
 * Change path for overridden templates
 */
if (function_exists('vc_set_shortcodes_templates_dir')) {
    $dir = MIKADO_ROOT_DIR . '/vc-templates';
    vc_set_shortcodes_templates_dir($dir);
}

if (!function_exists('cyberstore_mikado_configure_visual_composer_frontend_editor')) {
    /**
     * Configuration for Visual Composer FrontEnd Editor
     * Hooks on vc_after_init action
     */
    function cyberstore_mikado_configure_visual_composer_frontend_editor() {
        /**
         * Remove frontend editor
         */
        if (function_exists('vc_disable_frontend')) {
            vc_disable_frontend();
        }
    }

    add_action('vc_after_init', 'cyberstore_mikado_configure_visual_composer_frontend_editor');
}

if (!function_exists('cyberstore_mikado_vc_row_map')) {
    /**
     * Map VC Row shortcode
     * Hooks on vc_after_init action
     */
    function cyberstore_mikado_vc_row_map() {

        /******* VC Row shortcode - begin *******/

        vc_add_param('vc_row',
            array(
                'type'       => 'dropdown',
                'param_name' => 'row_content_width',
                'heading'    => esc_html__('Mikado Row Content Width', 'cyberstore'),
                'value'      => array(
                    esc_html__('Full Width', 'cyberstore') => 'full-width',
                    esc_html__('In Grid', 'cyberstore')    => 'grid'
                ),
                'group'      => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row',
            array(
                'type'        => 'textfield',
                'param_name'  => 'anchor',
                'heading'     => esc_html__('Mikado Anchor ID', 'cyberstore'),
                'description' => esc_html__('For example "home"', 'cyberstore'),
                'group'       => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row',
            array(
                'type'       => 'colorpicker',
                'param_name' => 'simple_background_color',
                'heading'    => esc_html__('Mikado Background Color', 'cyberstore'),
                'group'      => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row',
            array(
                'type'       => 'attach_image',
                'param_name' => 'simple_background_image',
                'heading'    => esc_html__('Mikado Background Image', 'cyberstore'),
                'group'      => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row',
            array(
                'type'        => 'textfield',
                'param_name'  => 'background_position',
                'heading'     => esc_html__('Background Image Position', 'cyberstore'),
                'description' => esc_html__('Please insert position in format horizontal vertical position, example - center center', 'cyberstore'),
                'dependency'  => array('item' => 'simple_background_image', 'not_empty' => true),
                'group'       => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row',
            array(
                'type'        => 'textfield',
                'param_name'  => 'background_size',
                'heading'     => esc_html__('Background Image Size', 'cyberstore'),
                'description' => esc_html__('Please insert background size attribute', 'cyberstore'),
                'dependency'  => array('item' => 'simple_background_image', 'not_empty' => true),
                'group'       => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row',
            array(
                'type'        => 'textfield',
                'param_name'  => 'background_repeat',
                'heading'     => esc_html__('Background Repeat', 'cyberstore'),
                'description' => esc_html__('Please insert background repeat attribute', 'cyberstore'),
                'dependency'  => array('item' => 'simple_background_image', 'not_empty' => true),
                'group'       => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row',
            array(
                'type'        => 'dropdown',
                'param_name'  => 'disable_background_image',
                'heading'     => esc_html__('Mikado Disable Background Image', 'cyberstore'),
                'value'       => array(
                    esc_html__('Never', 'cyberstore')        => '',
                    esc_html__('Below 1280px', 'cyberstore') => '1280',
                    esc_html__('Below 1024px', 'cyberstore') => '1024',
                    esc_html__('Below 768px', 'cyberstore')  => '768',
                    esc_html__('Below 680px', 'cyberstore')  => '680',
                    esc_html__('Below 480px', 'cyberstore')  => '480'
                ),
                'save_always' => true,
                'description' => esc_html__('Choose on which stage you hide row background image', 'cyberstore'),
                'dependency'  => array('element' => 'simple_background_image', 'not_empty' => true),
                'group'       => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row',
            array(
                'type'       => 'attach_image',
                'param_name' => 'parallax_background_image',
                'heading'    => esc_html__('Mikado Parallax Background Image', 'cyberstore'),
                'group'      => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row',
            array(
                'type'        => 'textfield',
                'param_name'  => 'parallax_bg_speed',
                'heading'     => esc_html__('Mikado Parallax Speed', 'cyberstore'),
                'description' => esc_html__('Set your parallax speed. Default value is 1.', 'cyberstore'),
                'dependency'  => array('element' => 'parallax_background_image', 'not_empty' => true),
                'group'       => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row',
            array(
                'type'       => 'textfield',
                'param_name' => 'parallax_bg_height',
                'heading'    => esc_html__('Mikado Parallax Section Height (px)', 'cyberstore'),
                'dependency' => array('element' => 'parallax_background_image', 'not_empty' => true),
                'group'      => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row',
            array(
                'type'       => 'dropdown',
                'param_name' => 'content_text_aligment',
                'heading'    => esc_html__('Mikado Content Aligment', 'cyberstore'),
                'value'      => array(
                    esc_html__('Default', 'cyberstore') => '',
                    esc_html__('Left', 'cyberstore')    => 'left',
                    esc_html__('Center', 'cyberstore')  => 'center',
                    esc_html__('Right', 'cyberstore')   => 'right'
                ),
                'group'      => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        /******* VC Row shortcode - end *******/

        /******* VC Row Inner shortcode - begin *******/

        vc_add_param('vc_row_inner',
            array(
                'type'       => 'dropdown',
                'param_name' => 'row_content_width',
                'heading'    => esc_html__('Mikado Row Content Width', 'cyberstore'),
                'value'      => array(
                    esc_html__('Full Width', 'cyberstore') => 'full-width',
                    esc_html__('In Grid', 'cyberstore')    => 'grid'
                ),
                'group'      => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row_inner',
            array(
                'type'       => 'colorpicker',
                'param_name' => 'simple_background_color',
                'heading'    => esc_html__('Mikado Background Color', 'cyberstore'),
                'group'      => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row_inner',
            array(
                'type'       => 'attach_image',
                'param_name' => 'simple_background_image',
                'heading'    => esc_html__('Mikado Background Image', 'cyberstore'),
                'group'      => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row_inner',
            array(
                'type'        => 'textfield',
                'param_name'  => 'background_position',
                'heading'     => esc_html__('Background Position', 'cyberstore'),
                'description' => esc_html__('Please insert position in format horizontal vertical position, example - center center', 'cyberstore'),
                'dependency'  => array('item' => 'simple_background_image', 'not_empty' => true),
                'group'       => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row_inner',
            array(
                'type'        => 'textfield',
                'param_name'  => 'background_size',
                'heading'     => esc_html__('Background Size', 'cyberstore'),
                'description' => esc_html__('Please insert background size attribute', 'cyberstore'),
                'dependency'  => array('item' => 'simple_background_image', 'not_empty' => true),
                'group'       => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row_inner',
            array(
                'type'        => 'textfield',
                'param_name'  => 'background_repeat',
                'heading'     => esc_html__('Background Repeat', 'cyberstore'),
                'description' => esc_html__('Please insert background repeat attribute', 'cyberstore'),
                'dependency'  => array('item' => 'simple_background_image', 'not_empty' => true),
                'group'       => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row_inner',
            array(
                'type'        => 'dropdown',
                'param_name'  => 'disable_background_image',
                'heading'     => esc_html__('Mikado Disable Background Image', 'cyberstore'),
                'value'       => array(
                    esc_html__('Never', 'cyberstore')        => '',
                    esc_html__('Below 1280px', 'cyberstore') => '1280',
                    esc_html__('Below 1024px', 'cyberstore') => '1024',
                    esc_html__('Below 768px', 'cyberstore')  => '768',
                    esc_html__('Below 680px', 'cyberstore')  => '680',
                    esc_html__('Below 480px', 'cyberstore')  => '480'
                ),
                'save_always' => true,
                'description' => esc_html__('Choose on which stage you hide row background image', 'cyberstore'),
                'dependency'  => array('element' => 'simple_background_image', 'not_empty' => true),
                'group'       => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        vc_add_param('vc_row_inner',
            array(
                'type'       => 'dropdown',
                'param_name' => 'content_text_aligment',
                'heading'    => esc_html__('Mikado Content Aligment', 'cyberstore'),
                'value'      => array(
                    esc_html__('Default', 'cyberstore') => '',
                    esc_html__('Left', 'cyberstore')    => 'left',
                    esc_html__('Center', 'cyberstore')  => 'center',
                    esc_html__('Right', 'cyberstore')   => 'right'
                ),
                'group'      => esc_html__('Mikado Settings', 'cyberstore')
            )
        );

        /******* VC Row Inner shortcode - end *******/

        /******* VC Revolution Slider shortcode - begin *******/

        if (cyberstore_mikado_revolution_slider_installed()) {

            vc_add_param('rev_slider_vc',
                array(
                    'type'        => 'dropdown',
                    'param_name'  => 'enable_paspartu',
                    'heading'     => esc_html__('Mikado Enable Passepartout', 'cyberstore'),
                    'value'       => array_flip(cyberstore_mikado_get_yes_no_select_array(false)),
                    'save_always' => true,
                    'group'       => esc_html__('Mikado Settings', 'cyberstore')
                )
            );

            vc_add_param('rev_slider_vc',
                array(
                    'type'        => 'dropdown',
                    'param_name'  => 'paspartu_size',
                    'heading'     => esc_html__('Mikado Passepartout Size', 'cyberstore'),
                    'value'       => array(
                        esc_html__('Tiny', 'cyberstore')   => 'tiny',
                        esc_html__('Small', 'cyberstore')  => 'small',
                        esc_html__('Normal', 'cyberstore') => 'normal',
                        esc_html__('Large', 'cyberstore')  => 'large'
                    ),
                    'save_always' => true,
                    'dependency'  => array('element' => 'enable_paspartu', 'value' => array('yes')),
                    'group'       => esc_html__('Mikado Settings', 'cyberstore')
                )
            );

            vc_add_param('rev_slider_vc',
                array(
                    'type'        => 'dropdown',
                    'param_name'  => 'disable_side_paspartu',
                    'heading'     => esc_html__('Mikado Disable Side Passepartout', 'cyberstore'),
                    'value'       => array_flip(cyberstore_mikado_get_yes_no_select_array(false)),
                    'save_always' => true,
                    'dependency'  => array('element' => 'enable_paspartu', 'value' => array('yes')),
                    'group'       => esc_html__('Mikado Settings', 'cyberstore')
                )
            );

            vc_add_param('rev_slider_vc',
                array(
                    'type'        => 'dropdown',
                    'param_name'  => 'disable_top_paspartu',
                    'heading'     => esc_html__('Mikado Disable Top Passepartout', 'cyberstore'),
                    'value'       => array_flip(cyberstore_mikado_get_yes_no_select_array(false)),
                    'save_always' => true,
                    'dependency'  => array('element' => 'enable_paspartu', 'value' => array('yes')),
                    'group'       => esc_html__('Mikado Settings', 'cyberstore')
                )
            );
        }

        /******* VC Revolution Slider shortcode - end *******/
    }

    add_action('vc_after_init', 'cyberstore_mikado_vc_row_map');
}