<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<?php
	/**
	 * cyberstore_mikado_header_meta hook
	 *
	 * @see cyberstore_mikado_header_meta() - hooked with 10
	 * @see cyberstore_mikado_user_scalable_meta - hooked with 10
	 * @see mkd_core_set_open_graph_meta - hooked with 10
	 */
	do_action( 'cyberstore_mikado_header_meta' );
	
	wp_head(); ?>
</head>
<body <?php body_class(); ?> itemscope itemtype="http://schema.org/WebPage">
	<?php
	/**
	 * cyberstore_mikado_after_body_tag hook
	 *
	 * @see cyberstore_mikado_get_side_area() - hooked with 10
	 * @see cyberstore_mikado_smooth_page_transitions() - hooked with 10
	 */
	do_action( 'cyberstore_mikado_after_body_tag' ); ?>
	
	<div class="mkd-wrapper mkd-404-page">
		<div class="mkd-wrapper-inner">
			<?php cyberstore_mikado_get_header(); ?>
			
			<div class="mkd-content" <?php cyberstore_mikado_content_elem_style_attr(); ?>>
				<div class="mkd-content-inner">
					<div class="mkd-page-not-found">
						<?php
						$mkd_title_image_404 = cyberstore_mikado_options()->getOptionValue( '404_page_title_image' );
						$mkd_title_404       = cyberstore_mikado_options()->getOptionValue( '404_title' );
						$mkd_subtitle_404    = cyberstore_mikado_options()->getOptionValue( '404_subtitle' );
						$mkd_text_404        = cyberstore_mikado_options()->getOptionValue( '404_text' );
						$mkd_button_label    = cyberstore_mikado_options()->getOptionValue( '404_back_to_home' );
						$mkd_button_style    = cyberstore_mikado_options()->getOptionValue( '404_button_style' );
						
						if ( ! empty( $mkd_title_image_404 ) ) { ?>
							<div class="mkd-404-title-image">
								<img src="<?php echo esc_url( $mkd_title_image_404 ); ?>" alt="<?php esc_attr_e( '404 Title Image', 'cyberstore' ); ?>" />
							</div>
						<?php } ?>
						
						<h1 class="mkd-404-title">
							<?php if ( ! empty( $mkd_title_404 ) ) {
								echo esc_html( $mkd_title_404 );
							} else {
								esc_html_e( 'Sorry, we can\'t find the page you are looking for. Please go to Home ', 'cyberstore' );
							} ?>
						</h1>

                        <?php if ( ! empty( $mkd_subtitle_404 ) ) { ?>
						<h3 class="mkd-404-subtitle">
                            <?php echo esc_html( $mkd_subtitle_404 ); ?>
						</h3>
                        <?php } ?>
						
						<p class="mkd-404-text">
							<?php if ( ! empty( $mkd_text_404 ) ) {
								echo esc_html( $mkd_text_404 );
							} else {
								esc_html_e( 'Oops! The page you are looking for does not exist. It might have been moved or deleted.  Go back to Main Home and try something else.', 'cyberstore' );
							} ?>
						</p>
						
						<?php
                        $mkd_button_light = '';

						$button_text   = ! empty( $mkd_button_label ) ? $mkd_button_label : esc_html__( 'Back To Home', 'cyberstore' );
						
						if ( $mkd_button_style == 'light-style' ) {
							$mkd_button_light = 'mkd-btn-light-style';
						}
						?>

                        <a itemprop="url" href="<?php esc_url( home_url( '/' ) ) ?>" target="_self" class="mkd-btn mkd-btn-medium mkd-btn-solid mkd-btn-rounded <?php echo esc_attr($mkd_button_light)?>">
                            <span class="mkd-btn-text"><?php echo esc_attr($button_text) ?></span>
                        </a>
					</div>
				</div>
			</div>
		</div>
	</div>
    <?php get_footer(); ?>
</body>
</html>