<?php

if ( ! function_exists( 'cyberstore_mikado_register_banner_widget' ) ) {
    /**
     * Function that register banner widget
     */
    function cyberstore_mikado_register_banner_widget( $widgets ) {
        $widgets[] = 'CyberstoreMikadoBannerWidget';

        return $widgets;
    }

    add_filter( 'cyberstore_mikado_register_widgets', 'cyberstore_mikado_register_banner_widget' );
}