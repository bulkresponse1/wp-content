<?php
if ( ! function_exists( 'cyberstore_mikado_register_side_area_sidebar' ) ) {
	/**
	 * Register side area sidebar
	 */
	function cyberstore_mikado_register_side_area_sidebar() {
		register_sidebar(
			array(
				'id'            => 'sidearea-top',
				'name'          => esc_html__( 'Side Area Top', 'cyberstore' ),
				'description'   => esc_html__( 'Side Area Top', 'cyberstore' ),
				'before_widget' => '<div id="%1$s" class="widget %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<div class="mkd-widget-title-holder"><h4 class="mkd-widget-title">',
				'after_title'   => '</h4></div>'
			)
		);

        register_sidebar(
            array(
                'id'            => 'sidearea-bottom',
                'name'          => esc_html__( 'Side Area Bottom', 'cyberstore' ),
                'description'   => esc_html__( 'Side Area Bottom', 'cyberstore' ),
                'before_widget' => '<div id="%1$s" class="widget %2$s">',
                'after_widget'  => '</div>',
                'before_title'  => '<div class="mkd-widget-title-holder"><h4 class="mkd-widget-title">',
                'after_title'   => '</h4></div>'
            )
        );
    }
	
	add_action( 'widgets_init', 'cyberstore_mikado_register_side_area_sidebar' );
}

if ( ! function_exists( 'cyberstore_mikado_side_menu_body_class' ) ) {
	/**
	 * Function that adds body classes for different side menu styles
	 *
	 * @param $classes array original array of body classes
	 *
	 * @return array modified array of classes
	 */
	function cyberstore_mikado_side_menu_body_class( $classes ) {
		
		if ( is_active_widget( false, false, 'mkd_side_area_opener' ) ) {
			
			$classes[] = 'mkd-side-menu-slide-from-right';
		}
		
		return $classes;
	}
	
	add_filter( 'body_class', 'cyberstore_mikado_side_menu_body_class' );
}

if ( ! function_exists( 'cyberstore_mikado_get_side_area' ) ) {
	/**
	 * Loads side area HTML
	 */
	function cyberstore_mikado_get_side_area() {
		
		if ( is_active_widget( false, false, 'mkd_side_area_opener' ) ) {
			
			cyberstore_mikado_get_module_template_part( 'templates/sidearea', 'sidearea' );
		}
	}
	
	add_action( 'cyberstore_mikado_after_body_tag', 'cyberstore_mikado_get_side_area', 10 );
}