<?php

if ( ! function_exists( 'cyberstore_mikado_like' ) ) {
	/**
	 * Returns CyberstoreMikadoLike instance
	 *
	 * @return CyberstoreMikadoLike
	 */
	function cyberstore_mikado_like() {
		return CyberstoreMikadoLike::get_instance();
	}
}

function cyberstore_mikado_get_like() {
	
	echo wp_kses( cyberstore_mikado_like()->add_like(), array(
		'span' => array(
			'class'       => true,
			'aria-hidden' => true,
			'style'       => true,
			'id'          => true
		),
		'i'    => array(
			'class' => true,
			'style' => true,
			'id'    => true
		),
		'a'    => array(
			'href'  => true,
			'class' => true,
			'id'    => true,
			'title' => true,
			'style' => true
		)
	) );
}