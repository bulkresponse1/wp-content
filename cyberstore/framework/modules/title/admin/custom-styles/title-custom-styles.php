<?php

foreach ( glob( MIKADO_FRAMEWORK_MODULES_ROOT_DIR . '/title/types/*/admin/custom-styles/*.php' ) as $options_load ) {
	include_once $options_load;
}

if ( ! function_exists( 'cyberstore_mikado_title_area_typography_style' ) ) {
	function cyberstore_mikado_title_area_typography_style() {
		
		// title default/small style
		
		$item_styles = cyberstore_mikado_get_typography_styles( 'page_title' );
		
		$item_selector = array(
			'.mkd-title-holder .mkd-title-wrapper .mkd-page-title'
		);
		
		echo cyberstore_mikado_dynamic_css( $item_selector, $item_styles );
		
		// subtitle style
		
		$item_styles = cyberstore_mikado_get_typography_styles( 'page_subtitle' );
		
		$item_selector = array(
			'.mkd-title-holder .mkd-title-wrapper .mkd-page-subtitle'
		);
		
		echo cyberstore_mikado_dynamic_css( $item_selector, $item_styles );
	}
	
	add_action( 'cyberstore_mikado_style_dynamic', 'cyberstore_mikado_title_area_typography_style' );
}