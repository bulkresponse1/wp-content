<?php

class CyberstoreMikadoLike {
	private static $instance;
	
	private function __construct() {
		add_action( 'wp_ajax_cyberstore_mikado_like', array( $this, 'ajax' ) );
		add_action( 'wp_ajax_nopriv_cyberstore_mikado_like', array( $this, 'ajax' ) );
	}
	
	public static function get_instance() {
		if ( null == self::$instance ) {
			self::$instance = new self;
		}
		
		return self::$instance;
	}
	
	function ajax() {

		$likes_id = isset( $_POST['likes_id'] ) && ! empty( $_POST['likes_id'] ) ? sanitize_text_field( $_POST['likes_id'] ) : '';

		//update
		if ( !empty( $likes_id ) ) {
			$post_id = str_replace( 'mkd-like-', '', $likes_id );
			$post_id = substr( $post_id, 0, - 4 );
			$type    = isset( $_POST['type'] ) ? sanitize_text_field(  $_POST['type'] ) : '';
			
			echo wp_kses( $this->like_post( $post_id, 'update', $type ), array(
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
				)
			) );
		} else {
			$post_id = str_replace( 'mkd-like-', '', $likes_id );
			$post_id = substr( $post_id, 0, - 4 );
			echo wp_kses( $this->like_post( $post_id, 'get' ), array(
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
				)
			) );
		}
		
		exit;
	}
	
	public function like_post( $post_id, $action = 'get', $type = '' ) {
		if ( ! is_numeric( $post_id ) ) {
			return;
		}
		
		switch ( $action ) {
			
			case 'get':
				$like_count = get_post_meta( $post_id, '_mkd-like', true );
				
				if ( isset( $_COOKIE[ 'mkd-like_' . $post_id ] ) ) {
					$icon = '<i class="mkd-icon-dripicons dripicons dripicons-heart mkd-icon-element"></i>';
				} else {
					$icon = '<i class="mkd-icon-dripicons dripicons dripicons-heart mkd-icon-element"></i>';
				}
				
				if ( ! $like_count ) {
					$like_count = 0;
					add_post_meta( $post_id, '_mkd-like', $like_count, true );
					$icon = '<span class="mkd-post-info-icon mkd-post-info-like-icon"><i class="mkd-icon-dripicons dripicons dripicons-heart mkd-icon-element"></i></span>';
				}
				
				$return_value = $icon . "<span>" . esc_attr( $like_count ) . "</span>";
				
				return $return_value;
				break;
			
			case 'update':
				$like_count = get_post_meta( $post_id, '_mkd-like', true );
				
				if ( isset( $_COOKIE[ 'mkd-like_' . $post_id ] ) ) {
					return $like_count;
				}
				
				$like_count ++;
				
				update_post_meta( $post_id, '_mkd-like', $like_count );
				setcookie( 'mkd-like_' . $post_id, $post_id, time() * 20, '/' );
				
				$return_value = "<i class=\"mkd-icon-dripicons dripicon dripicons-heart mkd-icon-element\"></i><span>" . esc_attr( $like_count ) . "</span>";
				
				return $return_value;
				
				break;
			default:
				return '';
				break;
		}
	}
	
	public function add_like() {
		global $post;
		
		$output = $this->like_post( $post->ID );
		
		$class       = 'mkd-like';
		$rand_number = rand( 100, 999 );
		$title       = esc_html__( 'Like this', 'cyberstore' );
		
		if ( isset( $_COOKIE[ 'mkd-like_' . $post->ID ] ) ) {
			$class = 'mkd-like liked';
			$title = esc_html__( 'You already like this!', 'cyberstore' );
		}
		
		return '<a href="#" class="' . $class . '" id="mkd-like-' . $post->ID . '-' . $rand_number . '" title="' . $title . '">' . $output . '</a>';
	}
}

if ( ! function_exists( 'cyberstore_mikado_create_like' ) ) {
	function cyberstore_mikado_create_like() {
		CyberstoreMikadoLike::get_instance();
	}
	
	add_action( 'after_setup_theme', 'cyberstore_mikado_create_like' );
}