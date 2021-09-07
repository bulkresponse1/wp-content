<?php

if ( ! function_exists( 'cyberstore_mikado_register_sidebars' ) ) {
	/**
	 * Function that registers theme's sidebars
	 */
	function cyberstore_mikado_register_sidebars() {
		
		register_sidebar(
			array(
				'id'            => 'sidebar',
				'name'          => esc_html__( 'Sidebar', 'cyberstore' ),
				'description'   => esc_html__( 'Default Sidebar', 'cyberstore' ),
				'before_widget' => '<div id="%1$s" class="widget %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<div class="mkd-widget-title-holder"><h4 class="mkd-widget-title">',
				'after_title'   => '</h4></div>'
			)
		);
	}
	
	add_action( 'widgets_init', 'cyberstore_mikado_register_sidebars', 1 );
}

if ( ! function_exists( 'cyberstore_mikado_add_support_custom_sidebar' ) ) {
	/**
	 * Function that adds theme support for custom sidebars. It also creates CyberstoreMikadoSidebar object
	 */
	function cyberstore_mikado_add_support_custom_sidebar() {
		add_theme_support( 'CyberstoreMikadoSidebar' );
		
		if ( get_theme_support( 'CyberstoreMikadoSidebar' ) ) {
			new CyberstoreMikadoSidebar();
		}
	}
	
	add_action( 'after_setup_theme', 'cyberstore_mikado_add_support_custom_sidebar' );
}