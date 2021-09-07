<?php

if ( ! function_exists( 'cyberstore_mikado_search_body_class' ) ) {
	/**
	 * Function that adds body classes for different search types
	 *
	 * @param $classes array original array of body classes
	 *
	 * @return array modified array of classes
	 */
	function cyberstore_mikado_search_body_class( $classes ) {
		$classes[] = 'mkd-fullscreen-search';
		$classes[] = 'mkd-search-fade';
		
		return $classes;
	}
	
	add_filter( 'body_class', 'cyberstore_mikado_search_body_class' );
}

if ( ! function_exists( 'cyberstore_mikado_get_search' ) ) {
	/**
	 * Loads search HTML based on search type option.
	 */
	function cyberstore_mikado_get_search() {
		cyberstore_mikado_load_search_template();
	}
	
	add_action( 'cyberstore_mikado_before_page_header', 'cyberstore_mikado_get_search' );
}

if ( ! function_exists( 'cyberstore_mikado_load_search_template' ) ) {
	/**
	 * Loads search HTML based on search type option.
	 */
	function cyberstore_mikado_load_search_template() {
		cyberstore_mikado_get_module_template_part( 'templates/types/fullscreen', 'search' );
	}
}