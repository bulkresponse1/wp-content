<?php

if ( ! function_exists( 'cyberstore_mikado_footer_top_general_styles' ) ) {
	/**
	 * Generates general custom styles for footer top area
	 */
	function cyberstore_mikado_footer_top_general_styles() {
		$item_styles      = array();
		$background_color = cyberstore_mikado_options()->getOptionValue( 'footer_top_background_color' );
		
		if ( ! empty( $background_color ) ) {
			$item_styles['background-color'] = $background_color;
		}
		
		echo cyberstore_mikado_dynamic_css( '.mkd-page-footer .mkd-footer-top-holder', $item_styles );
	}
	
	add_action( 'cyberstore_mikado_style_dynamic', 'cyberstore_mikado_footer_top_general_styles' );
}

if ( ! function_exists( 'cyberstore_mikado_footer_bottom_general_styles' ) ) {
	/**
	 * Generates general custom styles for footer bottom area
	 */
	function cyberstore_mikado_footer_bottom_general_styles() {
		$item_styles      = array();
		$background_color = cyberstore_mikado_options()->getOptionValue( 'footer_bottom_background_color' );
		
		if ( ! empty( $background_color ) ) {
			$item_styles['background-color'] = $background_color;
		}
		
		echo cyberstore_mikado_dynamic_css( '.mkd-page-footer .mkd-footer-bottom-holder', $item_styles );
	}
	
	add_action( 'cyberstore_mikado_style_dynamic', 'cyberstore_mikado_footer_bottom_general_styles' );
}