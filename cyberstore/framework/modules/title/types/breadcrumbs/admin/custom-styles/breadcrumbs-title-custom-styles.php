<?php

if ( ! function_exists( 'cyberstore_mikado_breadcrumbs_title_area_typography_style' ) ) {
	function cyberstore_mikado_breadcrumbs_title_area_typography_style() {
		
		$item_styles = cyberstore_mikado_get_typography_styles( 'page_breadcrumb' );
		
		$item_selector = array(
			'.mkd-title-holder .mkd-title-wrapper .mkd-breadcrumbs'
		);
		
		echo cyberstore_mikado_dynamic_css( $item_selector, $item_styles );
		
		
		$breadcrumb_hover_color = cyberstore_mikado_options()->getOptionValue( 'page_breadcrumb_hovercolor' );
		
		$breadcrumb_hover_styles = array();
		if ( ! empty( $breadcrumb_hover_color ) ) {
			$breadcrumb_hover_styles['color'] = $breadcrumb_hover_color;
		}
		
		$breadcrumb_hover_selector = array(
			'.mkd-title-holder .mkd-title-wrapper .mkd-breadcrumbs a:hover'
		);
		
		echo cyberstore_mikado_dynamic_css( $breadcrumb_hover_selector, $breadcrumb_hover_styles );
	}
	
	add_action( 'cyberstore_mikado_style_dynamic', 'cyberstore_mikado_breadcrumbs_title_area_typography_style' );
}