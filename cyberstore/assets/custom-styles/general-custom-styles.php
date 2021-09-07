<?php

if(!function_exists('cyberstore_mikado_design_styles')) {
    /**
     * Generates general custom styles
     */
    function cyberstore_mikado_design_styles() {
	    $font_family = cyberstore_mikado_options()->getOptionValue( 'google_fonts' );
	    if ( ! empty( $font_family ) && cyberstore_mikado_is_font_option_valid( $font_family ) ) {
		    $font_family_selector = array(
			    'body'
		    );
		    echo cyberstore_mikado_dynamic_css( $font_family_selector, array( 'font-family' => cyberstore_mikado_get_font_option_val( $font_family ) ) );
	    }

		$first_main_color = cyberstore_mikado_options()->getOptionValue('first_color');
        if(!empty($first_main_color)) {
            $color_selector = array(
                'a:hover',
                'blockquote',
                'h1 a:hover',
                'h2 a:hover',
                'h3 a:hover',
                'h4 a:hover',
                'h5 a:hover',
                'h6 a:hover',
                'p a:hover',
                '.mkd-comment-holder .mkd-comment-text .comment-edit-link',
                '.mkd-comment-holder .mkd-comment-text .comment-reply-link',
                '.mkd-comment-holder .mkd-comment-text .replay',
                '.mkd-comment-holder .mkd-comment-text #cancel-comment-reply-link',
                '.widget.mkd-blog-list-widget .mkd-post-title a:hover',
                '.widget.mkd-blog-list-widget .mkd-post-info-date a:hover',
                '.widget.mkd-blog-slider-widget .mkd-blog-slider-holder .mkd-owl-slider .owl-nav .owl-next:hover>span',
                '.widget.mkd-blog-slider-widget .mkd-blog-slider-holder .mkd-owl-slider .owl-nav .owl-prev:hover>span',
                '.widget.mkd-blog-slider-widget .mkd-blog-slider-holder .mkd-blog-slider-item .mkd-item-image .mkd-post-info-date-on-image .mkd-post-info-date-month:hover',
                '.mkd-icon-widget-holder',
                '.mkd-icon-widget-holder.mkd-link-with-href:hover .mkd-icon-text',
                '.widget.product-list-carousel-widget .mkd-plc-holder .mkd-owl-slider .owl-nav .owl-next:hover span',
                '.widget.product-list-carousel-widget .mkd-plc-holder .mkd-owl-slider .owl-nav .owl-prev:hover span',
                '.widget.product-list-carousel-widget .mkd-plc-holder .mkd-plc-title a:hover',
                '.widget.widget_search button:hover',
                '.widget.widget_mkd_twitter_widget .mkd-twitter-widget.mkd-twitter-slider li .mkd-tweet-text a',
                '.widget.widget_mkd_twitter_widget .mkd-twitter-widget.mkd-twitter-slider li .mkd-tweet-text span',
                '.widget.widget_mkd_twitter_widget .mkd-twitter-widget.mkd-twitter-standard li .mkd-tweet-text a:hover',
                '.widget.widget_mkd_twitter_widget .mkd-twitter-widget.mkd-twitter-slider li .mkd-twitter-icon i',
                'footer .widget ul li a:hover',
                'footer .widget #wp-calendar tfoot a:hover',
                'footer .widget.widget_search .input-holder button:hover',
                'footer .widget.widget_tag_cloud a:hover',
                '.mkd-side-menu .widget ul li a:hover',
                '.mkd-side-menu .widget #wp-calendar tfoot a:hover',
                '.mkd-side-menu .widget.widget_search .input-holder button:hover',
                '.mkd-side-menu .widget.widget_tag_cloud a:hover',
                'body.mkd-boxed-widgets .mkd-product-list-sidebar-holder .widget ul li a:hover',
                'body.mkd-boxed-widgets .wpb_widgetised_column .widget ul li a:hover',
                'body.mkd-boxed-widgets aside.mkd-sidebar .widget ul li a:hover',
                'body.mkd-boxed-widgets .mkd-product-list-sidebar-holder .widget #wp-calendar tfoot a:hover',
                'body.mkd-boxed-widgets .wpb_widgetised_column .widget #wp-calendar tfoot a:hover',
                'body.mkd-boxed-widgets aside.mkd-sidebar .widget #wp-calendar tfoot a:hover',
                'body.mkd-boxed-widgets .mkd-product-list-sidebar-holder .widget.widget_search .input-holder button:hover',
                'body.mkd-boxed-widgets .wpb_widgetised_column .widget.widget_search .input-holder button:hover',
                'body.mkd-boxed-widgets aside.mkd-sidebar .widget.widget_search .input-holder button:hover',
                'body.mkd-boxed-widgets .mkd-product-list-sidebar-holder .widget.widget_tag_cloud a:hover',
                'body.mkd-boxed-widgets .wpb_widgetised_column .widget.widget_tag_cloud a:hover',
                'body.mkd-boxed-widgets aside.mkd-sidebar .widget.widget_tag_cloud a:hover',
                'body:not(.mkd-boxed-widgets) .mkd-product-list-sidebar-holder .widget ul li a:hover',
                'body:not(.mkd-boxed-widgets) .wpb_widgetised_column .widget ul li a:hover',
                'body:not(.mkd-boxed-widgets) aside.mkd-sidebar .widget ul li a:hover',
                'body:not(.mkd-boxed-widgets) .mkd-product-list-sidebar-holder .widget #wp-calendar tfoot a:hover',
                'body:not(.mkd-boxed-widgets) .wpb_widgetised_column .widget #wp-calendar tfoot a:hover',
                'body:not(.mkd-boxed-widgets) aside.mkd-sidebar .widget #wp-calendar tfoot a:hover',
                'body:not(.mkd-boxed-widgets) .mkd-product-list-sidebar-holder .widget.widget_search .input-holder button:hover',
                'body:not(.mkd-boxed-widgets) .wpb_widgetised_column .widget.widget_search .input-holder button:hover',
                'body:not(.mkd-boxed-widgets) aside.mkd-sidebar .widget.widget_search .input-holder button:hover',
                'body:not(.mkd-boxed-widgets) .mkd-product-list-sidebar-holder .widget.widget_tag_cloud a:hover',
                'body:not(.mkd-boxed-widgets) .wpb_widgetised_column .widget.widget_tag_cloud a:hover',
                'body:not(.mkd-boxed-widgets) aside.mkd-sidebar .widget.widget_tag_cloud a:hover',
                'body:not(.mkd-boxed-widgets) .mkd-product-list-sidebar-holder .widget.widget_nav_menu ul>li.menu-item-has-children>a:hover',
                'body:not(.mkd-boxed-widgets) .wpb_widgetised_column .widget.widget_nav_menu ul>li.menu-item-has-children>a:hover',
                'body:not(.mkd-boxed-widgets) aside.mkd-sidebar .widget.widget_nav_menu ul>li.menu-item-has-children>a:hover',
                'body:not(.mkd-boxed-widgets) .mkd-product-list-sidebar-holder .widget.widget_nav_menu ul.sub-menu li a:hover',
                'body:not(.mkd-boxed-widgets) .wpb_widgetised_column .widget.widget_nav_menu ul.sub-menu li a:hover',
                'body:not(.mkd-boxed-widgets) aside.mkd-sidebar .widget.widget_nav_menu ul.sub-menu li a:hover',
                '.mkd-top-bar .widget_icl_lang_sel_widget #lang_sel .lang_sel_sel:hover:after',
                '.mkd-top-bar .widget_icl_lang_sel_widget #lang_sel_click .lang_sel_sel:hover:after',
                '.mkd-top-bar .widget_icl_lang_sel_widget #lang_sel ul li a:hover',
                '.mkd-top-bar .widget_icl_lang_sel_widget #lang_sel_click ul li a:hover',
                '.mkd-blog-holder article.sticky .mkd-post-title a',
                '.mkd-blog-holder.mkd-blog-masonry article.format-gallery .mkd-owl-slider .owl-nav .owl-prev:hover>span',
                '.mkd-blog-holder.mkd-blog-masonry article.format-gallery .mkd-owl-slider .owl-nav .owl-next:hover>span',
                '.mkd-blog-holder.mkd-blog-masonry article.format-link .mkd-post-text .mkd-post-link-heading .mkd-post-mark .mkd-link-mark',
                '.mkd-blog-holder.mkd-blog-masonry article.format-quote .mkd-post-text .mkd-post-quote-heading .mkd-post-mark .mkd-quote-mark',
                '.mkd-blog-holder.mkd-blog-masonry article.format-quote .mkd-post-text .mkd-quote-author',
                '.mkd-blog-holder.mkd-blog-narrow article .mkd-post-info.mkd-section-bottom .mkd-post-info-author a:hover',
                '.mkd-blog-holder.mkd-blog-narrow article .mkd-post-info.mkd-section-bottom .mkd-blog-like:hover i:first-child',
                '.mkd-blog-holder.mkd-blog-narrow article .mkd-post-info.mkd-section-bottom .mkd-blog-like:hover span:first-child',
                '.mkd-blog-holder.mkd-blog-narrow article .mkd-post-info.mkd-section-bottom .mkd-post-info-comments-holder:hover span:first-child',
                '.mkd-blog-holder.mkd-blog-standard-date-on-side article .mkd-post-date-inner .mkd-post-date-day',
                '.mkd-blog-holder.mkd-blog-standard-date-on-side article .mkd-post-date-inner .mkd-post-date-month',
                '.mkd-blog-holder.mkd-blog-standard-date-on-side article .mkd-post-title a:hover',
                '.mkd-blog-holder.mkd-blog-standard-date-on-side article .mkd-post-info>div a:hover',
                '.mkd-blog-holder.mkd-blog-standard-date-on-side article.format-quote .mkd-quote-author',
                '.mkd-blog-holder.mkd-blog-standard article .mkd-post-info-left .mkd-post-info-author-link:hover',
                '.mkd-blog-holder.mkd-blog-standard article .mkd-post-info-left .mkd-post-info-category a:hover',
                '.mkd-blog-holder.mkd-blog-standard article .mkd-post-info-top>div a:hover',
                '.mkd-blog-holder.mkd-blog-standard article .mkd-post-info-bottom .mkd-post-info-author a:hover',
                '.mkd-blog-holder.mkd-blog-standard article .mkd-post-info-bottom .mkd-blog-like:hover i:first-child',
                '.mkd-blog-holder.mkd-blog-standard article .mkd-post-info-bottom .mkd-blog-like:hover span:first-child',
                '.mkd-blog-holder.mkd-blog-standard article .mkd-post-info-bottom .mkd-post-info-comments-holder:hover span:first-child',
                '.mkd-blog-holder.mkd-blog-standard article.format-link .mkd-post-text .mkd-post-link-heading .mkd-post-mark .mkd-link-mark',
                '.mkd-blog-holder.mkd-blog-standard article.format-quote .mkd-post-text .mkd-post-quote-heading .mkd-post-mark .mkd-quote-mark',
                '.mkd-blog-holder.mkd-blog-standard article.format-quote .mkd-post-text .mkd-quote-author',
                '.mkd-blog-holder.mkd-blog-standard article.format-gallery .mkd-post-heading .mkd-owl-slider .owl-nav .owl-next:hover>span',
                '.mkd-blog-holder.mkd-blog-standard article.format-gallery .mkd-post-heading .mkd-owl-slider .owl-nav .owl-prev:hover>span',
                '.mkd-author-description .mkd-author-description-text-holder .mkd-author-name a:hover',
                '.mkd-author-description .mkd-author-description-text-holder .mkd-author-social-icons a:hover',
                '.mkd-bl-standard-pagination ul li.mkd-bl-pag-active a',
                '.mkd-blog-pagination ul li a.mkd-pag-active',
                '.mkd-blog-pagination ul li a:hover',
                '.mkd-blog-single-navigation .mkd-blog-single-next:hover',
                '.mkd-blog-single-navigation .mkd-blog-single-prev:hover',
                '.mkd-related-posts-holder .mkd-related-post .mkd-post-info>div a:hover',
                '.mkd-blog-list-holder .mkd-bli-info>div a:hover',
                '.mkd-blog-holder.mkd-blog-single article .mkd-post-info-left .mkd-post-info-author-link:hover',
                '.mkd-blog-holder.mkd-blog-single article .mkd-post-info-left .mkd-post-info-category a',
                '.mkd-blog-holder.mkd-blog-single article .mkd-post-info-left .mkd-post-info-category a:hover',
                '.mkd-blog-holder.mkd-blog-single article .mkd-post-info-top>div a:hover',
                '.mkd-blog-holder.mkd-blog-single article .mkd-post-info-bottom .mkd-tag-title .mkd-tags a:hover',
                '.mkd-blog-holder.mkd-blog-single article .mkd-post-info-bottom .mkd-tags-holder .mkd-tags a:hover',
                '.mkd-blog-holder.mkd-blog-single article.format-gallery .mkd-post-heading .mkd-owl-slider .owl-nav .owl-prev:hover>span',
                '.mkd-blog-holder.mkd-blog-single article.format-gallery .mkd-post-heading .mkd-owl-slider .owl-nav .owl-next:hover>span',
                '.mkd-blog-holder.mkd-blog-single article.format-link .mkd-post-link-heading .mkd-post-mark .mkd-link-mark',
                '.mkd-blog-holder.mkd-blog-single article.format-link .mkd-post-link-heading .mkd-post-mark .mkd-quote-mark',
                '.mkd-blog-holder.mkd-blog-single article.format-link .mkd-post-quote-heading .mkd-post-mark .mkd-link-mark',
                '.mkd-blog-holder.mkd-blog-single article.format-link .mkd-post-quote-heading .mkd-post-mark .mkd-quote-mark',
                '.mkd-blog-holder.mkd-blog-single article.format-quote .mkd-post-link-heading .mkd-post-mark .mkd-link-mark',
                '.mkd-blog-holder.mkd-blog-single article.format-quote .mkd-post-link-heading .mkd-post-mark .mkd-quote-mark',
                '.mkd-blog-holder.mkd-blog-single article.format-quote .mkd-post-quote-heading .mkd-post-mark .mkd-link-mark',
                '.mkd-blog-holder.mkd-blog-single article.format-quote .mkd-post-quote-heading .mkd-post-mark .mkd-quote-mark',
                '.mkd-blog-holder.mkd-blog-single article.format-quote .mkd-post-quote-holder .mkd-quote-author',
                '.mkd-main-menu ul li a:hover',
                '.mkd-main-menu>ul>li.mkd-active-item>a',
                '.mkd-drop-down .second .inner ul li.current-menu-ancestor>a',
                '.mkd-drop-down .second .inner ul li.current-menu-item>a',
                '.mkd-drop-down .wide .second .inner>ul>li>a:hover',
                '.mkd-drop-down .wide .second .inner>ul>li.current-menu-ancestor>a',
                '.mkd-drop-down .wide .second .inner>ul>li.current-menu-item>a',
                '.mkd-fullscreen-menu-opener',
                'nav.mkd-fullscreen-menu ul li a:hover',
                'nav.mkd-fullscreen-menu ul li ul li.current-menu-ancestor>a',
                'nav.mkd-fullscreen-menu ul li ul li.current-menu-item>a',
                'nav.mkd-fullscreen-menu>ul>li.mkd-active-item>a',
                '.mkd-header-standard-extended .mkd-page-header .mkd-extended-dropdown-menu>ul>li:not(.wide) li>a:hover .item_text',
                '.mkd-header-standard-extended .mkd-page-header .mkd-extended-dropdown-menu>ul>li>a:hover .item_text',
                '.mkd-header-standard-extended .mkd-page-header .mkd-extended-dropdown-menu>ul>li.wide .second>.inner>ul>li>a:hover',
                '.mkd-header-standard-extended .mkd-page-header .mkd-extended-dropdown-menu>ul>li.wide .second>.inner>ul>li ul li>a:hover .item_outer .item_text',
                '.mkd-header-vertical .mkd-vertical-menu ul li a:hover',
                '.mkd-header-vertical .mkd-vertical-menu ul li.current-menu-ancestor>a',
                '.mkd-header-vertical .mkd-vertical-menu ul li.current-menu-item>a',
                '.mkd-header-vertical .mkd-vertical-menu ul li.current_page_item>a',
                '.mkd-header-vertical .mkd-vertical-menu ul li.mkd-active-item>a',
                '.mkd-mobile-header .mkd-mobile-menu-opener.mkd-mobile-menu-opened a',
                '.mkd-mobile-header .mkd-mobile-side-area .mkd-close-mobile-side-area-holder i',
                '.mkd-mobile-header .mkd-mobile-side-area .mkd-mobile-nav ul li ul li.current_page_item',
                '.mkd-mobile-header .mkd-mobile-side-area .mkd-mobile-nav ul li ul li.mkd-active-item',
                '.mkd-mobile-header .mkd-mobile-side-area .mkd-mobile-nav ul li ul li.mkd-opened',
                '.mkd-mobile-header .mkd-mobile-side-area .mkd-mobile-nav ul li ul li:hover',
                '.mkd-top-bar .widget ul li a:hover',
                '.mkd-top-bar .mkd-side-menu-button-opener',
                '.mkd-top-bar a:hover',
                '.mkd-top-bar .widget.widget_nav_menu ul.sub-menu li.current-menu-item a',
                '.mkd-dark-header .mkd-top-bar a:hover',
                '.mkd-search-page-holder article.sticky .mkd-post-title a',
                '.mkd-search-cover .mkd-search-close a:hover',
                '.mkd-side-menu-button-opener.opened',
                '.mkd-side-menu-button-opener:hover',
                '.mkd-team.info-bellow .mkd-icon-shortcode a:hover',
                '.mkd-team-single-holder .mkd-ts-info-row a:hover',
                '.mkd-bckg-slider-holder .mkd-bckg-slider .owl-nav .owl-next:hover',
                '.mkd-bckg-slider-holder .mkd-bckg-slider .owl-nav .owl-prev:hover',
                '.mkd-banner-holder .mkd-banner-link-text',
                '.mkd-btn.mkd-btn-simple',
                '.mkd-btn.mkd-btn-outline',
                '.mkd-centered-slider-holder .mkd-owl-slider .owl-nav .owl-next>span',
                '.mkd-centered-slider-holder .mkd-owl-slider .owl-nav .owl-prev>span',
                '.mkd-centered-slider-holder .mkd-owl-slider .owl-nav .owl-next>span:hover',
                '.mkd-centered-slider-holder .mkd-owl-slider .owl-nav .owl-prev>span:hover',
                '.mkd-comparision-pricing-tables-holder .mkd-cpt-features-holder .mkd-cpt-features-title-holder.mkd-cpt-table-head-holder .mkd-cpt-features-title strong',
                '.mkd-comparision-pricing-tables-holder .mkd-cpt-table .mkd-cpt-table-head-holder .mkd-cpt-table-head-holder-inner .mkd-cpt-icon-holder i',
                '.mkd-iwt .mkd-iwt-icon .mkd-icon-shortcode',
                '.mkd-image-carousel-holder .mkd-owl-slider .owl-nav .owl-next>span:hover',
                '.mkd-image-carousel-holder .mkd-owl-slider .owl-nav .owl-prev>span:hover',
                '.mkd-image-carousel-holder .mkd-ic-item:hover p',
                '.mkd-social-share-holder.mkd-dropdown .mkd-social-share-dropdown-opener:hover',
                '.mkd-tabs.mkd-tabs-simple .mkd-tabs-nav li.ui-state-active a',
                '.mkd-tabs.mkd-tabs-simple .mkd-tabs-nav li.ui-state-hover a',
                '.mkd-text-carousel-holder .mkd-tc-item:hover .mkd-tc-text-wrapper',
                '.mkd-text-carousel-holder .mkd-tc-item .mkd-tc-content-holder .mkd-tc-text-wrapper .mkd-tc-text:hover',
                '.mkd-title-separator-holder .mkd-ts-link:hover',
                '.mkd-video-button-holder .mkd-video-button-play',
            );

            $woo_color_selector = array();
            if(cyberstore_mikado_is_woocommerce_installed()) {
                $woo_color_selector = array(
                    '.mkd-woocommerce-page table.cart tr.cart_item td.product-remove a:hover:after',
                    '.mkd-woocommerce-page table.cart td.actions input[name=update_cart]',
                    '.mkd-woocommerce-page table.cart td.actions input[name=apply_coupon]',
                    '.mkd-woocommerce-page .mkd-cart-go-back',
                    '.woocommerce-pagination .page-numbers li a.current',
                    '.woocommerce-pagination .page-numbers li a:hover',
                    '.woocommerce-pagination .page-numbers li span.current',
                    '.woocommerce-pagination .page-numbers li span:hover',
                    '.woocommerce-page .mkd-content .mkd-quantity-buttons .mkd-quantity-minus:hover',
                    '.woocommerce-page .mkd-content .mkd-quantity-buttons .mkd-quantity-plus:hover',
                    'div.woocommerce .mkd-quantity-buttons .mkd-quantity-minus:hover',
                    'div.woocommerce .mkd-quantity-buttons .mkd-quantity-plus:hover',
                    '.mkd-woocommerce-page .mkd-content table.group_table a:hover',
                    '.mkd-woocommerce-page.woocommerce-account .woocommerce form.login .lost_password a',
                    '.mkd-woocommerce-page.woocommerce-account .woocommerce .col2-set.addresses .edit:hover',
                    'ul.products>.product .mkd-products-inner>a:hover',
                    'ul.products>.product .mkd-products-inner .compare-button .compare:hover:after',
                    'ul.products>.product .mkd-products-inner .compare-button .compare.added',
                    'ul.products>.product .mkd-products-inner .compare-button .compare.added:after',
                    'div.woocommerce>.products>.product-category a .woocommerce-loop-category__title:hover',
                    '.mkd-woo-single-page .mkd-single-product-summary .product_meta>span a:hover',
                    '.mkd-woo-single-page .mkd-single-product-summary .compare.button:hover',
                    '.mkd-woo-single-page .mkd-single-product-summary .compare:hover',
                    '.mkd-woo-single-page .mkd-single-product-summary .compare.button:hover:after',
                    '.mkd-woo-single-page .mkd-single-product-summary .compare:hover:after',
                    '.mkd-woo-single-page .woocommerce-tabs ul.tabs>li.active a',
                    '.mkd-woo-single-page .woocommerce-tabs ul.tabs>li:hover a',
                    '.mkd-shopping-cart-holder .mkd-shopping-cart-inner a:hover',
                    '.mkd-light-header .mkd-page-header>div:not(.mkd-sticky-header):not(.fixed) .mkd-shopping-cart-holder .mkd-header-cart .mkd-cart-number',
                    '.mkd-logo-area-light-header .mkd-page-header>div:not(.mkd-sticky-header):not(.fixed) .mkd-vertical-align-containers .mkd-shopping-cart-holder .mkd-header-cart .mkd-cart-number',
                    '.mkd-shopping-cart-dropdown .mkd-item-info-holder .remove',
                    '.mkd-shopping-cart-dropdown .mkd-item-info-holder .amount',
                    '.mkd-shopping-cart-dropdown .mkd-item-info-holder .mkd-quantity',
                    '.mkd-product-categories-widget .mkd-product-category-name',
                    '.widget.woocommerce.widget_layered_nav ul li.chosen a',
                    '.widget.woocommerce.widget_top_rated_products ul li .product-title:hover',
                    '.mkd-pl-holder.mkd-pl-holder-advanced .mkd-pl-categories ul li a.active',
                    '.mkd-pl-holder.mkd-pl-holder-advanced .mkd-pl-categories ul li a:hover',
                    '.mkd-pl-holder.mkd-pl-holder-advanced .mkd-pli .mkd-pla-category a:hover',
                    '.mkd-plc-holder .mkd-owl-slider .owl-nav .owl-next>span:hover',
                    '.mkd-plc-holder .mkd-owl-slider .owl-nav .owl-prev>span:hover',
                    '.mkd-plsl-holder .mkd-plsl-outer .mkd-plsli .mkd-plsli-category a:hover',
                    '.mkd-pl-holder.mkd-filter-position-left .mkd-pl-filters li a.active',
                    '.mkd-pl-holder.mkd-filter-position-left .mkd-pl-filters li a:hover',
                    '.mkd-pl-holder.mkd-filter-position-left .mkd-pl-filters ul li a.active',
                    '.mkd-pl-holder.mkd-filter-position-left .mkd-pl-filters ul li a:hover',
                    '.mkd-pl-holder.mkd-filter-position-top .mkd-pl-filters .mkd-pl-order-filter-holder .mkd-pl-ordering-outer ul li a:hover',
                    '.mkd-pl-holder.mkd-filter-position-top .mkd-pl-filters .mkd-pl-layouts ul li:nth-child(1):hover a:after',
                    '.mkd-pl-holder.mkd-filter-position-top .mkd-pl-filters .mkd-pl-layouts ul li:nth-child(2):hover a:after',
                    '.mkd-pl-holder.mkd-filter-position-top .mkd-pl-filters .mkd-pl-layouts ul li:nth-child(3):hover a:after',
                    '.mkd-pl-holder.mkd-filter-position-top .mkd-pl-filters .mkd-pl-categories ul li a:hover',
                    '.mkd-pl-holder.mkd-filter-position-top .mkd-pl-filters .mkd-pl-categories ul li a.active',
                    '.mkd-pl-holder .mkd-pli .mkd-pli-category a:hover',
                    '.mkd-product-search-holder .tt-suggestion .mkd-product-search-item .mkd-product-search-title strong',
                    '.mkd-pvd-middle .mkd-pvd-category a:hover',
                    '.mkd-pvd-left .mkd-pli-content .mkd-pvd-category a:hover',
                    '.yith-woocompare-widget .compare.button:hover:after',
                    '.compare-button .compare.button:hover:after',
                    '.compare-button .compare:hover:after',
                    '.compare-button .compare.added:after',
                    '.mkd-popup-compare .mkd-pl-holder .mkd-pli-popup .mkd-pli-holder-popup .mkd-pli-category-popup a:hover',
                    '.mkd-popup-compare .mkd-pl-holder .mkd-pli-popup .mkd-pli-holder-popup .mkd-pli-title a:hover',
                    '.yith-wcwl-wishlistaddedbrowse a:after',
                    '.yith-wcwl-wishlistexistsbrowse a:after',
                    '.mkd-single-product-summary .yith-wcwl-add-to-wishlist .yith-wcwl-add-button a:hover:after',
                    '.mkd-single-product-summary .yith-wcwl-add-to-wishlist .yith-wcwl-wishlistaddedbrowse a:hover:after',
                    '.mkd-single-product-summary .yith-wcwl-add-to-wishlist .yith-wcwl-wishlistexistsbrowse a:hover:after',
                    '.mkd-wishlist-widget-holder a:hover',
                );
            }

            $color_selector = array_merge($color_selector, $woo_color_selector);

	        $color_important_selector = array(
                '.mkd-top-bar .widget.widget_nav_menu ul.sub-menu li a:hover',
                '.mkd-btn.mkd-btn-simple:not(.mkd-btn-custom-hover-color):hover',
                '.mkd-pl-holder.mkd-filter-position-top .mkd-pl-filters .mkd-pl-layouts ul li a.active:after',
                '.yith-wcwl-add-button a:hover',
                '.yith-wcwl-wishlistaddedbrowse a:hover',
                '.yith-wcwl-wishlistexistsbrowse a:hover',
            );

            $background_color_selector = array(
                '.mkd-st-loader .pulse',
                '.mkd-st-loader .double_pulse .double-bounce1',
                '.mkd-st-loader .double_pulse .double-bounce2',
                '.mkd-st-loader .cube',
                '.mkd-st-loader .rotating_cubes .cube1',
                '.mkd-st-loader .rotating_cubes .cube2',
                '.mkd-st-loader .stripes>div',
                '.mkd-st-loader .wave>div',
                '.mkd-st-loader .two_rotating_circles .dot1',
                '.mkd-st-loader .two_rotating_circles .dot2',
                '.mkd-st-loader .five_rotating_circles .container1>div',
                '.mkd-st-loader .five_rotating_circles .container2>div',
                '.mkd-st-loader .five_rotating_circles .container3>div',
                '.mkd-st-loader .lines .line1',
                '.mkd-st-loader .lines .line2',
                '.mkd-st-loader .lines .line3',
                '.mkd-st-loader .lines .line4',
                '#submit_comment',
                '.post-password-form input[type=submit]',
                'input.wpcf7-form-control.wpcf7-submit',
                '.mkd-newsletter-footer input.wpcf7-form-control.wpcf7-submit',
                '.mkd-owl-slider .owl-dots .owl-dot.active span',
                '.mkd-owl-slider .owl-dots .owl-dot:hover span',
                '#mkd-back-to-top>span',
                'body:not(.mkd-boxed-widgets) .mkd-product-list-sidebar-holder .widget .mkd-widget-title-holder .mkd-widget-title:after',
                'body:not(.mkd-boxed-widgets) .wpb_widgetised_column .widget .mkd-widget-title-holder .mkd-widget-title:after',
                'body:not(.mkd-boxed-widgets) aside.mkd-sidebar .widget .mkd-widget-title-holder .mkd-widget-title:after',
                '.mkd-blog-holder article.format-audio .mkd-blog-audio-holder .mejs-container .mejs-controls>.mejs-time-rail .mejs-time-total .mejs-time-current',
                '.mkd-blog-holder article.format-audio .mkd-blog-audio-holder .mejs-container .mejs-controls>a.mejs-horizontal-volume-slider .mejs-horizontal-volume-current',
                '.mkd-header-standard-extended .mkd-page-header .mkd-extended-dropdown-menu',
                '.mkd-accordion-holder.mkd-ac-boxed .mkd-accordion-title.ui-state-active',
                '.mkd-accordion-holder.mkd-ac-boxed .mkd-accordion-title.ui-state-hover',
                '.mkd-btn.mkd-btn-solid',
                '.mkd-comparision-pricing-tables-holder .mkd-comparision-table-holder .mkd-featured-comparision-package',
                '.mkd-icon-shortcode.mkd-circle',
                '.mkd-icon-shortcode.mkd-dropcaps.mkd-circle',
                '.mkd-icon-shortcode.mkd-square',
                '.mkd-process-holder .mkd-process-circle',
                '.mkd-process-holder .mkd-process-line',
                '.mkd-progress-bar .mkd-pb-content-holder .mkd-pb-content',
                '.mkd-tabs.mkd-tabs-standard .mkd-tabs-nav li.ui-state-active a',
                '.mkd-tabs.mkd-tabs-standard .mkd-tabs-nav li.ui-state-hover a',
                '.mkd-tabs.mkd-tabs-boxed .mkd-tabs-nav li.ui-state-active a',
                '.mkd-tabs.mkd-tabs-boxed .mkd-tabs-nav li.ui-state-hover a',
            );

            $woo_background_color_selector = array();
            if(cyberstore_mikado_is_woocommerce_installed()) {
                $woo_background_color_selector = array(
                    '.woocommerce-page .mkd-content .wc-forward:not(.added_to_cart):not(.checkout-button)',
                    '.woocommerce-page .mkd-content a.added_to_cart',
                    '.woocommerce-page .mkd-content a.button',
                    '.woocommerce-page .mkd-content button[type=submit]:not(.mkd-woo-search-widget-button)',
                    '.woocommerce-page .mkd-content input[type=submit]',
                    'div.woocommerce .wc-forward:not(.added_to_cart):not(.checkout-button)',
                    'div.woocommerce a.added_to_cart',
                    'div.woocommerce a.button',
                    'div.woocommerce button[type=submit]:not(.mkd-woo-search-widget-button)',
                    'div.woocommerce input[type=submit]',
                    'ul.products>.product .mkd-products-inner .mkd-pl-text-wrapper .mkd-pl-add-to-cart-holder .product_type_grouped:hover',
                    '.mkd-woo-single-page .related.products>h2:after',
                    '.mkd-woo-single-page .upsells.products>h2:after',
                    '.mkd-shopping-cart-holder .mkd-header-cart .mkd-cart-number',
                    '.mkd-shopping-cart-dropdown .mkd-cart-bottom .mkd-view-cart',
                    '.mkd-shopping-cart-dropdown .mkd-cart-bottom .mkd-checkout:hover',
                    '.widget.woocommerce.widget_price_filter .price_slider_wrapper .ui-widget-content .ui-slider-handle',
                    '.widget.woocommerce.widget_price_filter .price_slider_wrapper .ui-widget-content .ui-slider-range',
                    '.mkd-pl-holder.mkd-pl-holder-advanced .mkd-pli .mkd-pla-add-to-cart .added_to_cart',
                    '.mkd-pl-holder.mkd-pl-holder-advanced .mkd-pli .mkd-pla-add-to-cart .add_to_cart_button:hover',
                    '.mkd-pl-holder.mkd-pl-holder-advanced .mkd-pli .mkd-pla-add-to-cart .product_type_external:hover',
                    '.mkd-plc-holder .mkd-plc-item .mkd-plc-add-to-cart.mkd-default-skin .added_to_cart',
                    '.mkd-plc-holder .mkd-plc-item .mkd-plc-add-to-cart.mkd-default-skin .button',
                    '.mkd-plc-holder .mkd-plc-item .mkd-plc-add-to-cart.mkd-light-skin .added_to_cart:hover',
                    '.mkd-plc-holder .mkd-plc-item .mkd-plc-add-to-cart.mkd-light-skin .button:hover',
                    '.mkd-plc-holder .mkd-plc-item .mkd-plc-add-to-cart.mkd-dark-skin .added_to_cart:hover',
                    '.mkd-plc-holder .mkd-plc-item .mkd-plc-add-to-cart.mkd-dark-skin .button:hover',
                    '.mkd-plsl-holder .mkd-plsl-outer .mkd-plsli .mkd-plsli-add-to-cart .added_to_cart',
                    '.mkd-plsl-holder .mkd-plsl-outer .mkd-plsli .mkd-plsli-add-to-cart .button',
                    '.mkd-plvdsl-holder .mkd-pvd-left .mkd-pvd-add-to-cart .add_to_cart_button:hover',
                    '.mkd-plvdsl-holder .mkd-pvd-left .mkd-pvd-add-to-cart .product_type_external:hover',
                    '.mkd-plvdsl-holder .mkd-pvd-left .mkd-pvd-add-to-cart .added_to_cart:hover',
                    '.mkd-pl-holder .mkd-pli-add-to-cart .added_to_cart',
                    '.mkd-pl-holder .mkd-pli-add-to-cart .button',
                    '.mkd-product-search-holder .mkd-product-search-submit',
                    '.mkd-logo-area-dark-header .mkd-product-search-holder .mkd-product-search-submit',
                    '.mkd-pvd-middle .mkd-pvd-add-to-cart .add_to_cart_button:hover',
                    '.mkd-pvd-middle .mkd-pvd-add-to-cart .product_type_external:hover',
                    '.mkd-pvd-middle .mkd-pvd-add-to-cart .added_to_cart',
                    '.mkd-pvd-left .mkd-pli-content .mkd-pvd-add-to-cart .add_to_cart_button:hover',
                    '.mkd-pvd-left .mkd-pli-content .mkd-pvd-add-to-cart .product_type_external:hover',
                    '.mkd-pvd-left .mkd-pli-content .mkd-pvd-add-to-cart .added_to_cart',
                    '.mkd-popup-compare>h1',
                    '.mkd-popup-compare .mkd-pl-holder .mkd-pli-popup .mkd-pli-holder-popup .mkd-pli-add-to-cart .add_to_cart_button:hover',
                    '.mkd-popup-compare .mkd-pl-holder .mkd-pli-popup .mkd-pli-holder-popup .mkd-pli-add-to-cart .product_type_external:hover',
                    '.mkd-popup-compare .mkd-pl-holder .mkd-pli-popup .mkd-pli-holder-popup .remove .remove-popup-inner a:hover',
                    '.woocommerce-wishlist table.wishlist_table tbody tr td.product-add-to-cart a',
                );
            }

            $background_color_selector = array_merge($background_color_selector, $woo_background_color_selector);

            $background_color_important_selector = array(
                '.mkd-btn.mkd-btn-outline:not(.mkd-btn-custom-hover-bg):hover',
            );

            $border_color_selector = array(
                '.mkd-st-loader .pulse_circles .ball',
                '.mkd-newsletter-footer input[type=email]',
                '#mkd-back-to-top>span',
                '.mkd-btn.mkd-btn-outline',
                '.mkd-woocommerce-page.woocommerce-account .woocommerce p input[type=email]:focus',
                '.mkd-woocommerce-page.woocommerce-account .woocommerce p input[type=password]:focus',
                '.mkd-woocommerce-page.woocommerce-account .woocommerce p input[type=text]:focus',
            );

            $border_color_important_selector = array(
                '.mkd-btn.mkd-btn-outline:not(.mkd-btn-custom-border-hover):hover',
            );

            $border_top_color_selector = array(
                '.mkd-comparision-pricing-tables-holder .mkd-comparision-table-holder.mkd-featured-comparision-table',
            );

            $border_bottom_color_selector = array(
                '.mkd-tabs.mkd-tabs-simple .mkd-tabs-nav li.ui-state-active a:after',
                '.mkd-tabs.mkd-tabs-simple .mkd-tabs-nav li.ui-state-hover a:after',
                '.mkd-title-separator-holder .mkd-ts-title:after',
                '.mkd-woo-single-page .woocommerce-tabs ul.tabs>li.active a:after',
                '.mkd-woo-single-page .woocommerce-tabs ul.tabs>li:hover a:after',
                '.mkd-pl-holder.mkd-pl-holder-advanced .mkd-pl-categories ul li a.active:after',
                '.mkd-pl-holder.mkd-pl-holder-advanced .mkd-pl-categories ul li a:hover:after',
                '.mkd-pl-holder.mkd-filter-position-top .mkd-pl-filters .mkd-pl-categories ul li a:after',
                '.mkd-pl-holder.mkd-filter-position-top .mkd-pl-filters .mkd-pl-categories ul li a:before'
            );

            echo cyberstore_mikado_dynamic_css($color_selector, array('color' => $first_main_color));
	        echo cyberstore_mikado_dynamic_css($color_important_selector, array('color' => $first_main_color.'!important'));
	        echo cyberstore_mikado_dynamic_css($background_color_selector, array('background-color' => $first_main_color));
            echo cyberstore_mikado_dynamic_css($background_color_important_selector, array('background-color' => $first_main_color.'!important'));
	        echo cyberstore_mikado_dynamic_css($border_color_selector, array('border-color' => $first_main_color));
            echo cyberstore_mikado_dynamic_css($border_color_important_selector, array('border-color' => $first_main_color.'!important'));
            echo cyberstore_mikado_dynamic_css($border_top_color_selector, array('border-top-color' => $first_main_color));
            echo cyberstore_mikado_dynamic_css($border_bottom_color_selector, array('border-bottom-color' => $first_main_color));
        }
	
	    $page_background_color = cyberstore_mikado_options()->getOptionValue( 'page_background_color' );
	    if ( ! empty( $page_background_color ) ) {
		    $background_color_selector = array(
                'body',
                '.mkd-content',
                '.mkd-container'
		    );
		    echo cyberstore_mikado_dynamic_css( $background_color_selector, array( 'background-color' => $page_background_color ) );
	    }
	
	    $selection_color = cyberstore_mikado_options()->getOptionValue( 'selection_color' );
	    if ( ! empty( $selection_color ) ) {
		    echo cyberstore_mikado_dynamic_css( '::selection', array( 'background' => $selection_color ) );
		    echo cyberstore_mikado_dynamic_css( '::-moz-selection', array( 'background' => $selection_color ) );
	    }
	
	    $preload_background_styles = array();
	
	    if ( cyberstore_mikado_options()->getOptionValue( 'preload_pattern_image' ) !== "" ) {
		    $preload_background_styles['background-image'] = 'url(' . cyberstore_mikado_options()->getOptionValue( 'preload_pattern_image' ) . ') !important';
	    }
	
	    echo cyberstore_mikado_dynamic_css( '.mkd-preload-background', $preload_background_styles );
    }

    add_action('cyberstore_mikado_style_dynamic', 'cyberstore_mikado_design_styles');
}

if ( ! function_exists( 'cyberstore_mikado_content_styles' ) ) {
	function cyberstore_mikado_content_styles() {
		$content_style = array();
		
		$padding_top = cyberstore_mikado_options()->getOptionValue( 'content_top_padding' );
		if ( $padding_top !== '' ) {
			$content_style['padding-top'] = cyberstore_mikado_filter_px( $padding_top ) . 'px';
		}
		
		$content_selector = array(
			'.mkd-content .mkd-content-inner > .mkd-full-width > .mkd-full-width-inner',
		);
		
		echo cyberstore_mikado_dynamic_css( $content_selector, $content_style );
		
		$content_style_in_grid = array();
		
		$padding_top_in_grid = cyberstore_mikado_options()->getOptionValue( 'content_top_padding_in_grid' );
		if ( $padding_top_in_grid !== '' ) {
			$content_style_in_grid['padding-top'] = cyberstore_mikado_filter_px( $padding_top_in_grid ) . 'px';
		}
		
		$content_selector_in_grid = array(
			'.mkd-content .mkd-content-inner > .mkd-container > .mkd-container-inner',
		);
		
		echo cyberstore_mikado_dynamic_css( $content_selector_in_grid, $content_style_in_grid );
	}
	
	add_action( 'cyberstore_mikado_style_dynamic', 'cyberstore_mikado_content_styles' );
}

if ( ! function_exists( 'cyberstore_mikado_h1_styles' ) ) {
	function cyberstore_mikado_h1_styles() {
		$margin_top    = cyberstore_mikado_options()->getOptionValue( 'h1_margin_top' );
		$margin_bottom = cyberstore_mikado_options()->getOptionValue( 'h1_margin_bottom' );
		
		$item_styles = cyberstore_mikado_get_typography_styles( 'h1' );
		
		if ( $margin_top !== '' ) {
			$item_styles['margin-top'] = cyberstore_mikado_filter_px( $margin_top ) . 'px';
		}
		if ( $margin_bottom !== '' ) {
			$item_styles['margin-bottom'] = cyberstore_mikado_filter_px( $margin_bottom ) . 'px';
		}
		
		$item_selector = array(
			'h1'
		);
		
		if ( ! empty( $item_styles ) ) {
			echo cyberstore_mikado_dynamic_css( $item_selector, $item_styles );
		}
	}
	
	add_action( 'cyberstore_mikado_style_dynamic', 'cyberstore_mikado_h1_styles' );
}

if ( ! function_exists( 'cyberstore_mikado_h2_styles' ) ) {
	function cyberstore_mikado_h2_styles() {
		$margin_top    = cyberstore_mikado_options()->getOptionValue( 'h2_margin_top' );
		$margin_bottom = cyberstore_mikado_options()->getOptionValue( 'h2_margin_bottom' );
		
		$item_styles = cyberstore_mikado_get_typography_styles( 'h2' );
		
		if ( $margin_top !== '' ) {
			$item_styles['margin-top'] = cyberstore_mikado_filter_px( $margin_top ) . 'px';
		}
		if ( $margin_bottom !== '' ) {
			$item_styles['margin-bottom'] = cyberstore_mikado_filter_px( $margin_bottom ) . 'px';
		}
		
		$item_selector = array(
			'h2'
		);
		
		if ( ! empty( $item_styles ) ) {
			echo cyberstore_mikado_dynamic_css( $item_selector, $item_styles );
		}
	}
	
	add_action( 'cyberstore_mikado_style_dynamic', 'cyberstore_mikado_h2_styles' );
}

if ( ! function_exists( 'cyberstore_mikado_h3_styles' ) ) {
	function cyberstore_mikado_h3_styles() {
		$margin_top    = cyberstore_mikado_options()->getOptionValue( 'h3_margin_top' );
		$margin_bottom = cyberstore_mikado_options()->getOptionValue( 'h3_margin_bottom' );
		
		$item_styles = cyberstore_mikado_get_typography_styles( 'h3' );
		
		if ( $margin_top !== '' ) {
			$item_styles['margin-top'] = cyberstore_mikado_filter_px( $margin_top ) . 'px';
		}
		if ( $margin_bottom !== '' ) {
			$item_styles['margin-bottom'] = cyberstore_mikado_filter_px( $margin_bottom ) . 'px';
		}
		
		$item_selector = array(
			'h3'
		);
		
		if ( ! empty( $item_styles ) ) {
			echo cyberstore_mikado_dynamic_css( $item_selector, $item_styles );
		}
	}
	
	add_action( 'cyberstore_mikado_style_dynamic', 'cyberstore_mikado_h3_styles' );
}

if ( ! function_exists( 'cyberstore_mikado_h4_styles' ) ) {
	function cyberstore_mikado_h4_styles() {
		$margin_top    = cyberstore_mikado_options()->getOptionValue( 'h4_margin_top' );
		$margin_bottom = cyberstore_mikado_options()->getOptionValue( 'h4_margin_bottom' );
		
		$item_styles = cyberstore_mikado_get_typography_styles( 'h4' );
		
		if ( $margin_top !== '' ) {
			$item_styles['margin-top'] = cyberstore_mikado_filter_px( $margin_top ) . 'px';
		}
		if ( $margin_bottom !== '' ) {
			$item_styles['margin-bottom'] = cyberstore_mikado_filter_px( $margin_bottom ) . 'px';
		}
		
		$item_selector = array(
			'h4'
		);
		
		if ( ! empty( $item_styles ) ) {
			echo cyberstore_mikado_dynamic_css( $item_selector, $item_styles );
		}
	}
	
	add_action( 'cyberstore_mikado_style_dynamic', 'cyberstore_mikado_h4_styles' );
}

if ( ! function_exists( 'cyberstore_mikado_h5_styles' ) ) {
	function cyberstore_mikado_h5_styles() {
		$margin_top    = cyberstore_mikado_options()->getOptionValue( 'h5_margin_top' );
		$margin_bottom = cyberstore_mikado_options()->getOptionValue( 'h5_margin_bottom' );
		
		$item_styles = cyberstore_mikado_get_typography_styles( 'h5' );
		
		if ( $margin_top !== '' ) {
			$item_styles['margin-top'] = cyberstore_mikado_filter_px( $margin_top ) . 'px';
		}
		if ( $margin_bottom !== '' ) {
			$item_styles['margin-bottom'] = cyberstore_mikado_filter_px( $margin_bottom ) . 'px';
		}
		
		$item_selector = array(
			'h5'
		);
		
		if ( ! empty( $item_styles ) ) {
			echo cyberstore_mikado_dynamic_css( $item_selector, $item_styles );
		}
	}
	
	add_action( 'cyberstore_mikado_style_dynamic', 'cyberstore_mikado_h5_styles' );
}

if ( ! function_exists( 'cyberstore_mikado_h6_styles' ) ) {
	function cyberstore_mikado_h6_styles() {
		$margin_top    = cyberstore_mikado_options()->getOptionValue( 'h6_margin_top' );
		$margin_bottom = cyberstore_mikado_options()->getOptionValue( 'h6_margin_bottom' );
		
		$item_styles = cyberstore_mikado_get_typography_styles( 'h6' );
		
		if ( $margin_top !== '' ) {
			$item_styles['margin-top'] = cyberstore_mikado_filter_px( $margin_top ) . 'px';
		}
		if ( $margin_bottom !== '' ) {
			$item_styles['margin-bottom'] = cyberstore_mikado_filter_px( $margin_bottom ) . 'px';
		}
		
		$item_selector = array(
			'h6'
		);
		
		if ( ! empty( $item_styles ) ) {
			echo cyberstore_mikado_dynamic_css( $item_selector, $item_styles );
		}
	}
	
	add_action( 'cyberstore_mikado_style_dynamic', 'cyberstore_mikado_h6_styles' );
}

if ( ! function_exists( 'cyberstore_mikado_text_styles' ) ) {
	function cyberstore_mikado_text_styles() {
		$item_styles = cyberstore_mikado_get_typography_styles( 'text' );
		
		$item_selector = array(
			'p'
		);
		
		if ( ! empty( $item_styles ) ) {
			echo cyberstore_mikado_dynamic_css( $item_selector, $item_styles );
		}
	}
	
	add_action( 'cyberstore_mikado_style_dynamic', 'cyberstore_mikado_text_styles' );
}

if ( ! function_exists( 'cyberstore_mikado_link_styles' ) ) {
	function cyberstore_mikado_link_styles() {
		$link_styles      = array();
		$link_color       = cyberstore_mikado_options()->getOptionValue( 'link_color' );
		$link_font_style  = cyberstore_mikado_options()->getOptionValue( 'link_fontstyle' );
		$link_font_weight = cyberstore_mikado_options()->getOptionValue( 'link_fontweight' );
		$link_decoration  = cyberstore_mikado_options()->getOptionValue( 'link_fontdecoration' );
		
		if ( ! empty( $link_color ) ) {
			$link_styles['color'] = $link_color;
		}
		if ( ! empty( $link_font_style ) ) {
			$link_styles['font-style'] = $link_font_style;
		}
		if ( ! empty( $link_font_weight ) ) {
			$link_styles['font-weight'] = $link_font_weight;
		}
		if ( ! empty( $link_decoration ) ) {
			$link_styles['text-decoration'] = $link_decoration;
		}
		
		$link_selector = array(
			'a',
			'p a'
		);
		
		if ( ! empty( $link_styles ) ) {
			echo cyberstore_mikado_dynamic_css( $link_selector, $link_styles );
		}
	}
	
	add_action( 'cyberstore_mikado_style_dynamic', 'cyberstore_mikado_link_styles' );
}

if ( ! function_exists( 'cyberstore_mikado_link_hover_styles' ) ) {
	function cyberstore_mikado_link_hover_styles() {
		$link_hover_styles     = array();
		$link_hover_color      = cyberstore_mikado_options()->getOptionValue( 'link_hovercolor' );
		$link_hover_decoration = cyberstore_mikado_options()->getOptionValue( 'link_hover_fontdecoration' );
		
		if ( ! empty( $link_hover_color ) ) {
			$link_hover_styles['color'] = $link_hover_color;
		}
		if ( ! empty( $link_hover_decoration ) ) {
			$link_hover_styles['text-decoration'] = $link_hover_decoration;
		}
		
		$link_hover_selector = array(
			'a:hover',
			'p a:hover'
		);
		
		if ( ! empty( $link_hover_styles ) ) {
			echo cyberstore_mikado_dynamic_css( $link_hover_selector, $link_hover_styles );
		}
		
		$link_heading_hover_styles = array();
		
		if ( ! empty( $link_hover_color ) ) {
			$link_heading_hover_styles['color'] = $link_hover_color;
		}
		
		$link_heading_hover_selector = array(
			'h1 a:hover',
			'h2 a:hover',
			'h3 a:hover',
			'h4 a:hover',
			'h5 a:hover',
			'h6 a:hover'
		);
		
		if ( ! empty( $link_heading_hover_styles ) ) {
			echo cyberstore_mikado_dynamic_css( $link_heading_hover_selector, $link_heading_hover_styles );
		}
	}
	
	add_action( 'cyberstore_mikado_style_dynamic', 'cyberstore_mikado_link_hover_styles' );
}

if ( ! function_exists( 'cyberstore_mikado_smooth_page_transition_styles' ) ) {
	function cyberstore_mikado_smooth_page_transition_styles( $style ) {
		$id            = cyberstore_mikado_get_page_id();
		$loader_style  = array();
		$current_style = '';
		
		$background_color = cyberstore_mikado_get_meta_field_intersect( 'smooth_pt_bgnd_color', $id );
		if ( ! empty( $background_color ) ) {
			$loader_style['background-color'] = $background_color;
		}
		
		$loader_selector = array(
			'.mkd-smooth-transition-loader'
		);
		
		if ( ! empty( $loader_style ) ) {
			$current_style .= cyberstore_mikado_dynamic_css( $loader_selector, $loader_style );
		}
		
		$spinner_style = array();
		$spinner_color = cyberstore_mikado_get_meta_field_intersect( 'smooth_pt_spinner_color', $id );
		if ( ! empty( $spinner_color ) ) {
			$spinner_style['background-color'] = $spinner_color;
		}
		
		$spinner_selectors = array(
			'.mkd-st-loader .mkd-rotate-circles > div',
			'.mkd-st-loader .pulse',
			'.mkd-st-loader .double_pulse .double-bounce1',
			'.mkd-st-loader .double_pulse .double-bounce2',
			'.mkd-st-loader .cube',
			'.mkd-st-loader .rotating_cubes .cube1',
			'.mkd-st-loader .rotating_cubes .cube2',
			'.mkd-st-loader .stripes > div',
			'.mkd-st-loader .wave > div',
			'.mkd-st-loader .two_rotating_circles .dot1',
			'.mkd-st-loader .two_rotating_circles .dot2',
			'.mkd-st-loader .five_rotating_circles .container1 > div',
			'.mkd-st-loader .five_rotating_circles .container2 > div',
			'.mkd-st-loader .five_rotating_circles .container3 > div',
			'.mkd-st-loader .atom .ball-1:before',
			'.mkd-st-loader .atom .ball-2:before',
			'.mkd-st-loader .atom .ball-3:before',
			'.mkd-st-loader .atom .ball-4:before',
			'.mkd-st-loader .clock .ball:before',
			'.mkd-st-loader .mitosis .ball',
			'.mkd-st-loader .lines .line1',
			'.mkd-st-loader .lines .line2',
			'.mkd-st-loader .lines .line3',
			'.mkd-st-loader .lines .line4',
			'.mkd-st-loader .fussion .ball',
			'.mkd-st-loader .fussion .ball-1',
			'.mkd-st-loader .fussion .ball-2',
			'.mkd-st-loader .fussion .ball-3',
			'.mkd-st-loader .fussion .ball-4',
			'.mkd-st-loader .wave_circles .ball',
			'.mkd-st-loader .pulse_circles .ball'
		);
		
		if ( ! empty( $spinner_style ) ) {
			$current_style .= cyberstore_mikado_dynamic_css( $spinner_selectors, $spinner_style );
		}

		$current_style = $current_style . $style;
		
		return $current_style;
	}
	
	add_filter( 'cyberstore_mikado_add_page_custom_style', 'cyberstore_mikado_smooth_page_transition_styles' );
}