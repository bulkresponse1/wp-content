<?php

if ( ! function_exists( 'cyberstore_mikado_side_area_slide_from_right_type_style' ) ) {
	function cyberstore_mikado_side_area_slide_from_right_type_style() {
		$width = cyberstore_mikado_options()->getOptionValue( 'side_area_width' );
		
		if ( $width !== '' ) {
			echo cyberstore_mikado_dynamic_css( '.mkd-side-menu-slide-from-right .mkd-side-menu', array(
				'right' => '-' . cyberstore_mikado_filter_px( $width ) . 'px',
				'width' => cyberstore_mikado_filter_px( $width ) . 'px'
			) );
		}
	}
	
	add_action( 'cyberstore_mikado_style_dynamic', 'cyberstore_mikado_side_area_slide_from_right_type_style' );
}

if ( ! function_exists( 'cyberstore_mikado_side_area_icon_color_styles' ) ) {
	function cyberstore_mikado_side_area_icon_color_styles() {
		$icon_color             = cyberstore_mikado_options()->getOptionValue( 'side_area_icon_color' );
		$icon_hover_color       = cyberstore_mikado_options()->getOptionValue( 'side_area_icon_hover_color' );
		$close_icon_color       = cyberstore_mikado_options()->getOptionValue( 'side_area_close_icon_color' );
		$close_icon_hover_color = cyberstore_mikado_options()->getOptionValue( 'side_area_close_icon_hover_color' );
		
		$icon_hover_selector = array(
			'.mkd-side-menu-button-opener:hover',
			'.mkd-side-menu-button-opener.opened'
		);
		
		if ( ! empty( $icon_color ) ) {
			echo cyberstore_mikado_dynamic_css( '.mkd-side-menu-button-opener', array(
				'color' => $icon_color
			) );
		}
		
		if ( ! empty( $icon_hover_color ) ) {
			echo cyberstore_mikado_dynamic_css( $icon_hover_selector, array(
				'color' => $icon_hover_color . '!important'
			) );
		}
		
		if ( ! empty( $close_icon_color ) ) {
			echo cyberstore_mikado_dynamic_css( '.mkd-side-menu a.mkd-close-side-menu', array(
				'color' => $close_icon_color
			) );
		}
		
		if ( ! empty( $close_icon_hover_color ) ) {
			echo cyberstore_mikado_dynamic_css( '.mkd-side-menu a.mkd-close-side-menu:hover', array(
				'color' => $close_icon_hover_color
			) );
		}
	}
	
	add_action( 'cyberstore_mikado_style_dynamic', 'cyberstore_mikado_side_area_icon_color_styles' );
}

if ( ! function_exists( 'cyberstore_mikado_side_area_styles' ) ) {
	function cyberstore_mikado_side_area_styles() {
		$side_area_styles = array();
		$background_color = cyberstore_mikado_options()->getOptionValue( 'side_area_background_color' );
        $background_image = cyberstore_mikado_options()->getOptionValue( 'side_area_background_image' );
		$padding          = cyberstore_mikado_options()->getOptionValue( 'side_area_padding' );
		$text_alignment   = cyberstore_mikado_options()->getOptionValue( 'side_area_aligment' );
		
		if ( ! empty( $background_color ) ) {
            $side_area_styles['background-color'] = $background_color;
        }

        if (!empty($background_image)) {
            echo cyberstore_mikado_dynamic_css('.mkd-side-menu', array(
                'background-image' => 'url(' . esc_url($background_image) . ')',
                'background-position' => 'center center',
                'background-repeat' => 'no-repeat'
            ));
        }
		
		if ( ! empty( $padding ) ) {
			$side_area_styles['padding'] = esc_attr( $padding );
		}
		
		if ( ! empty( $text_alignment ) ) {
			$side_area_styles['text-align'] = $text_alignment;
		}
		
		if ( ! empty( $side_area_styles ) ) {
			echo cyberstore_mikado_dynamic_css( '.mkd-side-menu', $side_area_styles );
		}
		
		if ( $text_alignment === 'center' ) {
			echo cyberstore_mikado_dynamic_css( '.mkd-side-menu .widget img', array(
				'margin' => '0 auto'
			) );
		}
	}
	
	add_action( 'cyberstore_mikado_style_dynamic', 'cyberstore_mikado_side_area_styles' );
}