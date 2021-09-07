<?php

class CyberstoreMikadoBannerWidget extends CyberstoreMikadoWidget
{
    public function __construct() {
        parent::__construct(
            'mkd_banner_widget',
            esc_html__('Mikado Banner Widget', 'cyberstore'),
            array('description' => esc_html__('Add banner to widget areas', 'cyberstore'))
        );

        $this->setParams();
    }

    protected function setParams() {
        $this->params = array(
            array(
                'type'    => 'textfield',
                'name'    => 'background_color',
                'title' => esc_html__('Background Color', 'cyberstore')
            ),
            array(
                'type'    => 'textfield',
                'name'    => 'border_color',
                'title' => esc_html__('Border Color', 'cyberstore')
            ),
            array(
                'type'        => 'textfield',
                'name'        => 'image',
                'title'       => esc_html__('Image ID', 'cyberstore'),
                'description' => esc_html__('Add image id for your banner widget.', 'cyberstore')
            ),
            array(
                'type'    => 'dropdown',
                'name'    => 'text_skin',
                'title' => esc_html__('Skin', 'cyberstore'),
                'options' => array(
                    'dark'   => esc_html__( 'Dark', 'cyberstore' ),
                    'light' => esc_html__( 'Light', 'cyberstore' ),
                ),
            ),
            array(
                'type'    => 'textfield',
                'name'    => 'title',
                'title' => esc_html__('Title', 'cyberstore')
            ),
            array(
                'type'    => 'textfield',
                'name'    => 'subtitle',
                'title' => esc_html__('Subtitle', 'cyberstore')
            ),
            array(
                'type'    => 'textfield',
                'name'    => 'text',
                'title' => esc_html__('Text', 'cyberstore')
            ),
            array(
                'type'    => 'textfield',
                'name'    => 'link',
                'title' => esc_html__('Link', 'cyberstore')
            ),
            array(
                'type'    => 'dropdown',
                'name'    => 'target',
                'title' => esc_html__('Target', 'cyberstore'),
                'options' => cyberstore_mikado_get_link_target_array(),
            ),
            array(
                'type'    => 'textfield',
                'name'    => 'link_text',
                'title' => esc_html__('Link Text', 'cyberstore'),
            )
        );
    }

    public function widget($args, $instance) {

        if ( ! is_array( $instance ) ) {
            $instance = array();
        }

        ?>

        <div class="widget mkd-banner-widget">
        <?php echo cyberstore_mikado_execute_shortcode('mkd_banner', $instance); ?>
        </div>
        <?php
    }
}