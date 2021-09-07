(function($) {
    "use strict";

    window.mkd = {};
    mkd.modules = {};

    mkd.scroll = 0;
    mkd.window = $(window);
    mkd.document = $(document);
    mkd.windowWidth = $(window).width();
    mkd.windowHeight = $(window).height();
    mkd.body = $('body');
    mkd.html = $('html, body');
    mkd.htmlEl = $('html');
    mkd.menuDropdownHeightSet = false;
    mkd.defaultHeaderStyle = '';
    mkd.minVideoWidth = 1500;
    mkd.videoWidthOriginal = 1280;
    mkd.videoHeightOriginal = 720;
    mkd.videoRatio = 1.61;

    mkd.mkdOnDocumentReady = mkdOnDocumentReady;
    mkd.mkdOnWindowLoad = mkdOnWindowLoad;
    mkd.mkdOnWindowResize = mkdOnWindowResize;
    mkd.mkdOnWindowScroll = mkdOnWindowScroll;

    $(document).ready(mkdOnDocumentReady);
    $(window).load(mkdOnWindowLoad);
    $(window).resize(mkdOnWindowResize);
    $(window).scroll(mkdOnWindowScroll);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdOnDocumentReady() {
        mkd.scroll = $(window).scrollTop();

        //set global variable for header style which we will use in various functions
        if(mkd.body.hasClass('mkd-dark-header')){ mkd.defaultHeaderStyle = 'mkd-dark-header';}
        if(mkd.body.hasClass('mkd-light-header')){ mkd.defaultHeaderStyle = 'mkd-light-header';}
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function mkdOnWindowLoad() {

    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function mkdOnWindowResize() {
        mkd.windowWidth = $(window).width();
        mkd.windowHeight = $(window).height();
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function mkdOnWindowScroll() {
        mkd.scroll = $(window).scrollTop();
    }

    //set boxed layout width variable for various calculations

    switch(true){
        case mkd.body.hasClass('mkd-grid-1300'):
            mkd.boxedLayoutWidth = 1350;
            break;
        case mkd.body.hasClass('mkd-grid-1200'):
            mkd.boxedLayoutWidth = 1250;
            break;
        case mkd.body.hasClass('mkd-grid-1000'):
            mkd.boxedLayoutWidth = 1050;
            break;
        case mkd.body.hasClass('mkd-grid-800'):
            mkd.boxedLayoutWidth = 850;
            break;
        default :
            mkd.boxedLayoutWidth = 1150;
            break;
    }

})(jQuery);
(function($) {
	"use strict";

    var common = {};
    mkd.modules.common = common;

    common.mkdFluidVideo = mkdFluidVideo;
    common.mkdEnableScroll = mkdEnableScroll;
    common.mkdDisableScroll = mkdDisableScroll;
    common.mkdOwlSlider = mkdOwlSlider;
    common.mkdInitParallax = mkdInitParallax;
    common.mkdInitSelfHostedVideoPlayer = mkdInitSelfHostedVideoPlayer;
    common.mkdSelfHostedVideoSize = mkdSelfHostedVideoSize;
    common.mkdPrettyPhoto = mkdPrettyPhoto;
    common.getLoadMoreData = getLoadMoreData;
    common.setLoadMoreAjaxData = setLoadMoreAjaxData;

    common.mkdOnDocumentReady = mkdOnDocumentReady;
    common.mkdOnWindowLoad = mkdOnWindowLoad;
    common.mkdOnWindowResize = mkdOnWindowResize;

    $(document).ready(mkdOnDocumentReady);
    $(window).load(mkdOnWindowLoad);
    $(window).resize(mkdOnWindowResize);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdOnDocumentReady() {
	    mkdIconWithHover().init();
	    mkdDisableSmoothScrollForMac();
	    mkdInitAnchor().init();
	    mkdInitBackToTop();
	    mkdBackButtonShowHide();
	    mkdInitSelfHostedVideoPlayer();
	    mkdSelfHostedVideoSize();
	    mkdFluidVideo();
		mkdInitVDCountdown();
	    mkdOwlSlider();
	    mkdInitTabs();
	    mkdInitPLFilters();
	    mkdYithLoader();
	    mkdPreloadBackgrounds();
	    mkdPrettyPhoto();
	    mkdSearchPostTypeWidget();
        mkdInitCustomMenuDropdown();
        mkdSidebarCustomMenu();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function mkdOnWindowLoad() {
	    mkdInitParallax();
        mkdSmoothTransition();
    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function mkdOnWindowResize() {
        mkdSelfHostedVideoSize();
    }
	
	/*
	 ** Disable smooth scroll for mac if smooth scroll is enabled
	 */
	function mkdDisableSmoothScrollForMac() {
		var os = navigator.appVersion.toLowerCase();
		
		if (os.indexOf('mac') > -1 && mkd.body.hasClass('mkd-smooth-scroll')) {
			mkd.body.removeClass('mkd-smooth-scroll');
		}
	}
	
	function mkdDisableScroll() {
		if (window.addEventListener) {
			window.addEventListener('wheel', mkdWheel, {passive: false} );
		}
		
		//window.onmousewheel = document.onmousewheel = mkdWheel;
		document.onkeydown = mkdKeydown;
	}
	
	function mkdEnableScroll() {
		if (window.removeEventListener) {
			window.removeEventListener('wheel', mkdWheel, {passive: false} );
		}
		
		window.onmousewheel = document.onmousewheel = document.onkeydown = null;
	}
	
	function mkdWheel(e) {
		mkdPreventDefaultValue(e);
	}
	
	function mkdKeydown(e) {
		var keys = [37, 38, 39, 40];
		
		for (var i = keys.length; i--;) {
			if (e.keyCode === keys[i]) {
				mkdPreventDefaultValue(e);
				return;
			}
		}
	}
	
	function mkdPreventDefaultValue(e) {
		e = e || window.event;
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.returnValue = false;
	}
	
	/*
	 **	Anchor functionality
	 */
	var mkdInitAnchor = function() {
		/**
		 * Set active state on clicked anchor
		 * @param anchor, clicked anchor
		 */
		var setActiveState = function(anchor){
			
			$('.mkd-main-menu .mkd-active-item, .mkd-mobile-nav .mkd-active-item, .mkd-fullscreen-menu .mkd-active-item').removeClass('mkd-active-item');
			anchor.parent().addClass('mkd-active-item');
			
			$('.mkd-main-menu a, .mkd-mobile-nav a, .mkd-fullscreen-menu a').removeClass('current');
			anchor.addClass('current');
		};
		
		/**
		 * Check anchor active state on scroll
		 */
		var checkActiveStateOnScroll = function(){
			
			$('[data-mkd-anchor]').waypoint( function(direction) {
				if(direction === 'down') {
					setActiveState($("a[href='"+window.location.href.split('#')[0]+"#"+$(this.element).data("mkd-anchor")+"']"));
				}
			}, { offset: '50%' });
			
			$('[data-mkd-anchor]').waypoint( function(direction) {
				if(direction === 'up') {
					setActiveState($("a[href='"+window.location.href.split('#')[0]+"#"+$(this.element).data("mkd-anchor")+"']"));
				}
			}, { offset: function(){
				return -($(this.element).outerHeight() - 150);
			} });
			
		};
		
		/**
		 * Check anchor active state on load
		 */
		var checkActiveStateOnLoad = function(){
			var hash = window.location.hash.split('#')[1];
			
			if(hash !== "" && $('[data-mkd-anchor="'+hash+'"]').length > 0){
				anchorClickOnLoad(hash);
			}
		};
		
		/**
		 * Handle anchor on load
		 */
		var anchorClickOnLoad = function($this) {
			var scrollAmount;
			var anchor = $('a');
			var hash = $this;
			if(hash !== "" && $('[data-mkd-anchor="' + hash + '"]').length > 0 ) {
				var anchoredElementOffset = $('[data-mkd-anchor="' + hash + '"]').offset().top;
				scrollAmount = $('[data-mkd-anchor="' + hash + '"]').offset().top - headerHeihtToSubtract(anchoredElementOffset) - mkdGlobalVars.vars.mkdAddForAdminBar;
				
				setActiveState(anchor);
				
				mkd.html.stop().animate({
					scrollTop: Math.round(scrollAmount)
				}, 1000, function() {
					//change hash tag in url
					if(history.pushState) { history.pushState(null, null, '#'+hash); }
				});
				return false;
			}
		};
		
		/**
		 * Calculate header height to be substract from scroll amount
		 * @param anchoredElementOffset, anchorded element offest
		 */
		var headerHeihtToSubtract = function(anchoredElementOffset){
			
			if(mkd.modules.stickyHeader.behaviour === 'mkd-sticky-header-on-scroll-down-up') {
				mkd.modules.stickyHeader.isStickyVisible = (anchoredElementOffset > mkd.modules.header.stickyAppearAmount);
			}
			
			if(mkd.modules.stickyHeader.behaviour === 'mkd-sticky-header-on-scroll-up') {
				if((anchoredElementOffset > mkd.scroll)){
					mkd.modules.stickyHeader.isStickyVisible = false;
				}
			}
			
			var headerHeight = mkd.modules.stickyHeader.isStickyVisible ? mkdGlobalVars.vars.mkdStickyHeaderTransparencyHeight : mkdPerPageVars.vars.mkdHeaderTransparencyHeight;
			
			if(mkd.windowWidth < 1025) {
				headerHeight = 0;
			}
			
			return headerHeight;
		};
		
		/**
		 * Handle anchor click
		 */
		var anchorClick = function() {
			mkd.document.on("click", ".mkd-main-menu a, .mkd-fullscreen-menu a, .mkd-btn, .mkd-anchor, .mkd-mobile-nav a", function() {
				var scrollAmount;
				var anchor = $(this);
				var hash = anchor.prop("hash").split('#')[1];
				
				if(hash !== "" && $('[data-mkd-anchor="' + hash + '"]').length > 0 ) {
					
					var anchoredElementOffset = $('[data-mkd-anchor="' + hash + '"]').offset().top;
					scrollAmount = $('[data-mkd-anchor="' + hash + '"]').offset().top - headerHeihtToSubtract(anchoredElementOffset) - mkdGlobalVars.vars.mkdAddForAdminBar;
					
					setActiveState(anchor);
					
					mkd.html.stop().animate({
						scrollTop: Math.round(scrollAmount)
					}, 1000, function() {
						//change hash tag in url
						if(history.pushState) { history.pushState(null, null, '#'+hash); }
					});
					return false;
				}
			});
		};
		
		return {
			init: function() {
				if($('[data-mkd-anchor]').length) {
					anchorClick();
					checkActiveStateOnScroll();
					$(window).load(function() { checkActiveStateOnLoad(); });
				}
			}
		};
	};
	
	function mkdInitBackToTop(){
		var backToTopButton = $('#mkd-back-to-top');
		backToTopButton.on('click',function(e){
			e.preventDefault();
			mkd.html.animate({scrollTop: 0}, mkd.window.scrollTop()/3, 'linear');
		});
	}
	
	function mkdBackButtonShowHide(){
		mkd.window.scroll(function () {
			var b = $(this).scrollTop();
			var c = $(this).height();
			var d;
			if (b > 0) { d = b + c / 2; } else { d = 1; }
			if (d < 1e3) { mkdToTopButton('off'); } else { mkdToTopButton('on'); }
		});
	}
	
	function mkdToTopButton(a) {
		var b = $("#mkd-back-to-top");
		b.removeClass('off on');
		if (a === 'on') { b.addClass('on'); } else { b.addClass('off'); }
	}
	
	function mkdInitSelfHostedVideoPlayer() {
		var players = $('.mkd-self-hosted-video');
		
		if(players.length) {
			players.mediaelementplayer({
				audioWidth: '100%'
			});
		}
	}
	
	function mkdSelfHostedVideoSize(){
		var selfVideoHolder = $('.mkd-self-hosted-video-holder .mkd-video-wrap');
		
		if(selfVideoHolder.length) {
			selfVideoHolder.each(function(){
				var thisVideo = $(this),
					videoWidth = thisVideo.closest('.mkd-self-hosted-video-holder').outerWidth(),
					videoHeight = videoWidth / mkd.videoRatio;
				
				if(navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)){
					thisVideo.parent().width(videoWidth);
					thisVideo.parent().height(videoHeight);
				}
				
				thisVideo.width(videoWidth);
				thisVideo.height(videoHeight);
				
				thisVideo.find('video, .mejs-overlay, .mejs-poster').width(videoWidth);
				thisVideo.find('video, .mejs-overlay, .mejs-poster').height(videoHeight);
			});
		}
	}
	
	function mkdFluidVideo() {
        fluidvids.init({
			selector: ['iframe'],
			players: ['www.youtube.com', 'player.vimeo.com']
		});
	}
	
	function mkdSmoothTransition() {

		if (mkd.body.hasClass('mkd-smooth-page-transitions')) {

			//check for preload animation
			if (mkd.body.hasClass('mkd-smooth-page-transitions-preloader')) {
				var loader = $('body > .mkd-smooth-transition-loader.mkd-mimic-ajax');
				loader.fadeOut(500);

				$(window).on('pageshow', function (event) {
					if (event.originalEvent.persisted) {
						loader.fadeOut(500);
					}
				});
			}

			//check for fade out animation
			if (mkd.body.hasClass('mkd-smooth-page-transitions-fadeout')) {
				var linkItem = $('a');
				
				linkItem.on('click',function (e) {
					var a = $(this);

					if ((a.parents('.mkd-shopping-cart-dropdown').length || a.parent('.product-remove').length) && a.hasClass('remove')) {
						return;
					}

					if (
						e.which === 1 && // check if the left mouse button has been pressed
						a.attr('href').indexOf(window.location.host) >= 0 && // check if the link is to the same domain
						(typeof a.data('rel') === 'undefined') && //Not pretty photo link
						(typeof a.attr('rel') === 'undefined') && //Not VC pretty photo link
                        (!a.hasClass('lightbox-active')) && //Not lightbox plugin active
						(typeof a.attr('target') === 'undefined' || a.attr('target') === '_self') && // check if the link opens in the same window
						(a.attr('href').split('#')[0] !== window.location.href.split('#')[0]) // check if it is an anchor aiming for a different page
					) {
						e.preventDefault();
						$('.mkd-wrapper-inner').fadeOut(1000, function () {
							window.location = a.attr('href');
						});
					}
				});
			}
		}
	}
	
	/*
	 *	Preload background images for elements that have 'mkd-preload-background' class
	 */
	function mkdPreloadBackgrounds(){
		var preloadBackHolder = $('.mkd-preload-background');
		
		if(preloadBackHolder.length) {
			preloadBackHolder.each(function() {
				var preloadBackground = $(this);
				
				if(preloadBackground.css('background-image') !== '' && preloadBackground.css('background-image') !== 'none') {
					var bgUrl = preloadBackground.attr('style');
					
					bgUrl = bgUrl.match(/url\(["']?([^'")]+)['"]?\)/);
					bgUrl = bgUrl ? bgUrl[1] : "";
					
					if (bgUrl) {
						var backImg = new Image();
						backImg.src = bgUrl;
						$(backImg).load(function(){
							preloadBackground.removeClass('mkd-preload-background');
						});
					}
				} else {
					$(window).load(function(){ preloadBackground.removeClass('mkd-preload-background'); }); //make sure that mkd-preload-background class is removed from elements with forced background none in css
				}
			});
		}
	}
	
	function mkdPrettyPhoto() {
		/*jshint multistr: true */
		var markupWhole = '<div class="pp_pic_holder"> \
                        <div class="ppt">&nbsp;</div> \
                        <div class="pp_top"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                        <div class="pp_content_container"> \
                            <div class="pp_left"> \
                            <div class="pp_right"> \
                                <div class="pp_content"> \
                                    <div class="pp_loaderIcon"></div> \
                                    <div class="pp_fade"> \
                                        <a href="#" class="pp_expand" title="Expand the image">Expand</a> \
                                        <div class="pp_hoverContainer"> \
                                            <a class="pp_next" href="#"><span class="fa fa-angle-right"></span></a> \
                                            <a class="pp_previous" href="#"><span class="fa fa-angle-left"></span></a> \
                                        </div> \
                                        <div id="pp_full_res"></div> \
                                        <div class="pp_details"> \
                                            <div class="pp_nav"> \
                                                <a href="#" class="pp_arrow_previous">Previous</a> \
                                                <p class="currentTextHolder">0/0</p> \
                                                <a href="#" class="pp_arrow_next">Next</a> \
                                            </div> \
                                            <p class="pp_description"></p> \
                                            {pp_social} \
                                            <a class="pp_close" href="#">Close</a> \
                                        </div> \
                                    </div> \
                                </div> \
                            </div> \
                            </div> \
                        </div> \
                        <div class="pp_bottom"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                    </div> \
                    <div class="pp_overlay"></div>';
		
		$("a[data-rel^='prettyPhoto']").prettyPhoto({
			hook: 'data-rel',
			animation_speed: 'normal', /* fast/slow/normal */
			slideshow: false, /* false OR interval time in ms */
			autoplay_slideshow: false, /* true/false */
			opacity: 0.80, /* Value between 0 and 1 */
			show_title: true, /* true/false */
			allow_resize: true, /* Resize the photos bigger than viewport. true/false */
			horizontal_padding: 0,
			default_width: 960,
			default_height: 540,
			counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
			theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
			hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
			wmode: 'opaque', /* Set the flash wmode attribute */
			autoplay: true, /* Automatically start videos: True/False */
			modal: false, /* If set to true, only the close button will close the window */
			overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
			keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
			deeplinking: false,
			custom_markup: '',
			social_tools: false,
			markup: markupWhole
		});
	}

    function mkdSearchPostTypeWidget() {
        var searchPostTypeHolder = $('.mkd-search-post-type');

        if (searchPostTypeHolder.length) {
            searchPostTypeHolder.each(function () {
                var thisSearch = $(this),
                    searchField = thisSearch.find('.mkd-post-type-search-field'),
                    resultsHolder = thisSearch.siblings('.mkd-post-type-search-results'),
                    searchLoading = thisSearch.find('.mkd-search-loading'),
                    searchIcon = thisSearch.find('.mkd-search-icon');

                searchLoading.addClass('mkd-hidden');

                var postType = thisSearch.data('post-type'),
                    keyPressTimeout;

                searchField.on('keyup paste', function(e) {
                    var field = $(this);
                    field.attr('autocomplete','off');
                    searchLoading.removeClass('mkd-hidden');
                    searchIcon.addClass('mkd-hidden');
                    clearTimeout(keyPressTimeout);

                    keyPressTimeout = setTimeout( function() {
                        var searchTerm = field.val();
                        if(searchTerm.length < 3) {
                            resultsHolder.html('');
                            resultsHolder.fadeOut();
                            searchLoading.addClass('mkd-hidden');
                            searchIcon.removeClass('mkd-hidden');
                        } else {
                            var ajaxData = {
                                action: 'zenit_mkd_search_post_types',
                                term: searchTerm,
                                postType: postType
                            };

                            $.ajax({
                                type: 'POST',
                                data: ajaxData,
                                url: mkdGlobalVars.vars.mkdAjaxUrl,
                                success: function (data) {
                                    var response = JSON.parse(data);
                                    if (response.status == 'success') {
                                        searchLoading.addClass('mkd-hidden');
                                        searchIcon.removeClass('mkd-hidden');
                                        resultsHolder.html(response.data.html);
                                        resultsHolder.fadeIn();
                                    }
                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    console.log("Status: " + textStatus);
                                    console.log("Error: " + errorThrown);
                                    searchLoading.addClass('mkd-hidden');
                                    searchIcon.removeClass('mkd-hidden');
                                    resultsHolder.fadeOut();
                                }
                            });
                        }
                    }, 500);
                });

                searchField.on('focusout', function () {
                    searchLoading.addClass('mkd-hidden');
                    searchIcon.removeClass('mkd-hidden');
                    resultsHolder.fadeOut();
                });
            });
        }
    }

    function mkdInitCustomMenuDropdown() {
        var menus = $('.mkd-sidebar .widget_nav_menu .menu');

        var dropdownOpeners,
            currentMenu;

        if(menus.length) {
            menus.each(function() {
                currentMenu = $(this);

                dropdownOpeners = currentMenu.find('> li.menu-item-has-children > a');

                if(dropdownOpeners.length) {
                    dropdownOpeners.each(function() {
                        var currentDropdownOpener = $(this);

                        currentDropdownOpener.on('click', function(e) {
                            e.preventDefault();

                            var dropdownToOpen = currentDropdownOpener.parent().children('.sub-menu');

                            if(dropdownToOpen.is(':visible')) {
                                dropdownToOpen.slideUp();
                                currentDropdownOpener.removeClass('mkd-custom-menu-active');
                            } else {
                                dropdownToOpen.slideDown();
                                currentDropdownOpener.addClass('mkd-custom-menu-active');
                            }
                        });
                    });
                }
            });
        }
    }
    function mkdSidebarCustomMenu() {
        var menuItems = $('.mkd-sidebar .widget_nav_menu .menu > li > a');

        menuItems.each(function() {
            var menuItem = this;

            $(menuItem).append("<span class='mkd-item-outer'></span>");

        });
    }
	
	/**
	 * Initializes load more data params
	 * @param container with defined data params
	 * return array
	 */
	function getLoadMoreData(container){
		var dataList = container.data(),
			returnValue = {};

		for (var property in dataList) {
			if (dataList.hasOwnProperty(property)) {
				if (typeof dataList[property] !== 'undefined' && dataList[property] !== false) {
					returnValue[property] = dataList[property];
				}
			}
		}
		
		return returnValue;
	}
	
	/**
	 * Sets load more data params for ajax function
	 * @param container with defined data params
	 * return array
	 */
	function setLoadMoreAjaxData(container, action){
		var returnValue = {
			action: action
		};
		
		for (var property in container) {
			if (container.hasOwnProperty(property)) {
				
				if (typeof container[property] !== 'undefined' && container[property] !== false) {
					returnValue[property] = container[property];
				}
			}
		}
		
		return returnValue;
	}
	
	/**
	 * Object that represents icon with hover data
	 * @returns {{init: Function}} function that initializes icon's functionality
	 */
	var mkdIconWithHover = function() {
		//get all icons on page
		var icons = $('.mkd-icon-has-hover');
		
		/**
		 * Function that triggers icon hover color functionality
		 */
		var iconHoverColor = function(icon) {
			if(typeof icon.data('hover-color') !== 'undefined') {
				var changeIconColor = function(event) {
					event.data.icon.css('color', event.data.color);
				};
				
				var hoverColor = icon.data('hover-color'),
					originalColor = icon.css('color');
				
				if(hoverColor !== '') {
					icon.on('mouseenter', {icon: icon, color: hoverColor}, changeIconColor);
					icon.on('mouseleave', {icon: icon, color: originalColor}, changeIconColor);
				}
			}
		};
		
		return {
			init: function() {
				if(icons.length) {
					icons.each(function() {
						iconHoverColor($(this));
					});
				}
			}
		};
	};
	
	/*
	 ** Init parallax
	 */
	function mkdInitParallax(){
		var parallaxHolder = $('.mkd-parallax-row-holder');
		
		if(parallaxHolder.length){
			parallaxHolder.each(function() {
				var parallaxElement = $(this),
					image = parallaxElement.data('parallax-bg-image'),
					speed = parallaxElement.data('parallax-bg-speed') * 0.4,
					height = 0;
				
				if (typeof parallaxElement.data('parallax-bg-height') !== 'undefined' && parallaxElement.data('parallax-bg-height') !== false) {
					height = parseInt(parallaxElement.data('parallax-bg-height'));
				}
				
				parallaxElement.css({'background-image': 'url('+image+')'});
				
				if(height > 0) {
					parallaxElement.css({'min-height': height+'px', 'height': height+'px'});
				}
				
				parallaxElement.parallax('50%', speed);
			});
		}
	}

	/**
	 * Countdown Shortcode
	 */
	function mkdInitVDCountdown() {
		var countdowns = $('.mkd-vd-countdown'),
			date = new Date(),
			currentMonth = date.getMonth(),
			year,
			month,
			day,
			hour,
			minute,
			timezone;

		if (countdowns.length) {
			countdowns.each(function () {

				//Find countdown elements by id-s
				var countdownId = $(this).attr('id'),
					countdown = $('#' + countdownId);

				//Get data for countdown
				year = countdown.data('year');
				month = countdown.data('month');
				day = countdown.data('day');
				hour = countdown.data('hour');
				minute = countdown.data('minute');
				timezone = countdown.data('timezone');

				if (currentMonth !== month) {
					month = month - 1;
				}

				//Initialize countdown
				countdown.countdown({
					until: new Date(year, month, day, hour, minute, 44),
					labels: ['', '', '', '', '', '', ''],
					labels1: ['', '', '', '', '', '', ''],
					format: 'HMS',
					timezone: timezone,
					padZeroes: true
				});
			});
		}
	}

    /**
     * Init Owl Carousel
     */
    function mkdOwlSlider() {
        var sliders = $('.mkd-owl-slider');

        if (sliders.length) {
            sliders.each(function(){
                var slider = $(this),
	                slideItemsNumber = slider.children().length,
	                numberOfItems = 1,
	                loop = true,
	                autoplay = true,
	                autoplayHoverPause = true,
	                sliderSpeed = 5000,
	                sliderSpeedAnimation = 600,
	                margin = 0,
	                responsiveMargin = 0,
	                responsiveMargin1 = 0,
	                stagePadding = 0,
	                stagePaddingEnabled = false,
	                center = false,
	                autoWidth = false,
	                animateInClass = false, // keyframe css animation
	                animateOut = false, // keyframe css animation
	                navigation = true,
	                pagination = false,
	                sliderDataHolder = slider;
	
	            if (typeof slider.data('number-of-items') !== 'undefined' && slider.data('number-of-items') !== false) {
		            numberOfItems = slider.data('number-of-items');
	            }
	            //if (typeof sliderDataHolder.data('number-of-columns') !== 'undefined' && sliderDataHolder.data('number-of-columns') !== false && sliderIsPortfolio) {
		         //   numberOfItems = sliderDataHolder.data('number-of-columns');
	            //}
	            if (sliderDataHolder.data('enable-loop') === 'no') {
		            loop = false;
	            }
	            if (sliderDataHolder.data('enable-autoplay') === 'no') {
		            autoplay = false;
	            }
	            if (sliderDataHolder.data('enable-autoplay-hover-pause') === 'no') {
		            autoplayHoverPause = false;
	            }
	            if (typeof sliderDataHolder.data('slider-speed') !== 'undefined' && sliderDataHolder.data('slider-speed') !== false) {
		            sliderSpeed = sliderDataHolder.data('slider-speed');
	            }
	            if (typeof sliderDataHolder.data('slider-speed-animation') !== 'undefined' && sliderDataHolder.data('slider-speed-animation') !== false) {
		            sliderSpeedAnimation = sliderDataHolder.data('slider-speed-animation');
	            }
	            if (typeof sliderDataHolder.data('slider-margin') !== 'undefined' && sliderDataHolder.data('slider-margin') !== false) {
		            if (sliderDataHolder.data('slider-margin') === 'no') {
			            margin = 0;
		            } else {
			            margin = sliderDataHolder.data('slider-margin');
		            }
	            } else {
		            if(slider.parent().hasClass('mkd-huge-space')) {
			            margin = 60;
		            } else if (slider.parent().hasClass('mkd-large-space')) {
			            margin = 50;
		            } else if (slider.parent().hasClass('mkd-normal-space')) {
			            margin = 30;
		            } else if (slider.parent().hasClass('mkd-small-space')) {
			            margin = 20;
		            } else if (slider.parent().hasClass('mkd-tiny-space')) {
			            margin = 10;
		            }
	            }
	            if (sliderDataHolder.data('slider-padding') === 'yes') {
		            stagePaddingEnabled = true;
		            stagePadding = parseInt(slider.outerWidth() * 0.28);
		            margin = 50;
	            }
	            if (sliderDataHolder.data('enable-center') === 'yes') {
		            center = true;
	            }
	            if (sliderDataHolder.data('enable-auto-width') === 'yes') {
		            autoWidth = true;
	            }
	            if (typeof sliderDataHolder.data('slider-animate-in') !== 'undefined' && sliderDataHolder.data('slider-animate-in') !== false) {
		            animateInClass = sliderDataHolder.data('slider-animate-in');
	            }
	            if (typeof sliderDataHolder.data('slider-animate-out') !== 'undefined' && sliderDataHolder.data('slider-animate-out') !== false) {
		            animateOut = sliderDataHolder.data('slider-animate-out');
	            }
	            if (sliderDataHolder.data('enable-navigation') === 'no') {
		            navigation = false;
	            }
	            if (sliderDataHolder.data('enable-pagination') === 'yes') {
		            pagination = true;
	            }
	            
	            if(navigation && pagination) {
		            slider.addClass('mkd-slider-has-both-nav');
	            }
	
	            if (slideItemsNumber <= 1) {
		            loop       = false;
		            autoplay   = false;
		            navigation = false;
		            pagination = false;
	            }
	
	            var responsiveNumberOfItems1 = 1,
		            responsiveNumberOfItems2 = 2,
		            responsiveNumberOfItems3 = 3,
		            responsiveNumberOfItems4 = numberOfItems;
	
	            if (numberOfItems < 3) {
		            responsiveNumberOfItems2 = numberOfItems;
		            responsiveNumberOfItems3 = numberOfItems;
	            }
	
	            if (numberOfItems > 4) {
		            responsiveNumberOfItems4 = 4;
	            }

                if (slider.hasClass('mkd-image-carousel') && numberOfItems === 8) {
                    responsiveNumberOfItems4 = 8;
                    responsiveNumberOfItems3 = 6;
                    responsiveNumberOfItems2 = 4;
                    responsiveNumberOfItems1 = 2;
                }

                if (slider.hasClass('mkd-clients-carousel')) {
                    responsiveNumberOfItems4 = 5;
                    responsiveNumberOfItems3 = 4;
                    responsiveNumberOfItems2 = 3;
                    responsiveNumberOfItems1 = 2;
                }
	
	            if (stagePaddingEnabled || margin > 30) {
		            responsiveMargin = 20;
		            responsiveMargin1 = 30;
	            }
	
	            if (margin > 0 && margin <= 30) {
		            responsiveMargin = margin;
		            responsiveMargin1 = margin;
	            }
	
	            slider.owlCarousel({
		            items: numberOfItems,
		            loop: loop,
		            autoplay: autoplay,
		            autoplayHoverPause: autoplayHoverPause,
		            autoplayTimeout: sliderSpeed,
		            smartSpeed: sliderSpeedAnimation,
		            margin: margin,
		            stagePadding: stagePadding,
		            center: center,
		            autoWidth: autoWidth,
		            animateInClass: animateInClass,
		            animateOut: animateOut,
		            dots: pagination,
		            nav: navigation,
		            navText: [
			            '<span class="mkd-prev-icon dripicons-chevron-left"></span>',
			            '<span class="mkd-next-icon dripicons-chevron-right"></span>'
		            ],
		            responsive: {
			            0: {
				            items: responsiveNumberOfItems1,
				            margin: responsiveMargin,
				            stagePadding: 0,
				            center: false,
				            autoWidth: false
			            },
			            681: {
				            items: responsiveNumberOfItems2,
				            margin: responsiveMargin1
			            },
			            769: {
				            items: responsiveNumberOfItems3,
				            margin: responsiveMargin1
			            },
			            1025: {
				            items: responsiveNumberOfItems4
			            },
			            1281: {
				            items: numberOfItems
			            }
		            },
		            onInitialize: function () {
			            slider.css('visibility', 'visible');
			            mkdInitParallax();
		            },
					onTranslate: function () {
						mkdInitVDCountdown();
					},
		            onDrag: function (e) {
			            if (mkd.body.hasClass('mkd-smooth-page-transitions-fadeout')) {
				            var sliderIsMoving = e.isTrigger > 0;
				
				            if (sliderIsMoving) {
					            slider.addClass('mkd-slider-is-moving');
				            }
			            }
		            },
		            onDragged: function () {
			            if (mkd.body.hasClass('mkd-smooth-page-transitions-fadeout') && slider.hasClass('mkd-slider-is-moving')) {
				
				            setTimeout(function () {
					            slider.removeClass('mkd-slider-is-moving');
				            }, 500);
			            }
		            }
                });
            });
        }
    }


    /*
    **	Init tabs shortcode
    */
    function mkdInitTabs(){

       var tabs = $('.mkd-tabs');
        if(tabs.length){
            tabs.each(function(){
                var thisTabs = $(this);

                thisTabs.children('.mkd-tab-container').each(function(index){
                    index = index + 1;
                    var that = $(this),
                        link = that.attr('id'),
                        navItem = that.parent().find('.mkd-tabs-nav li:nth-child('+index+') a'),
                        navLink = navItem.attr('href');

                        link = '#'+link;

                        if(link.indexOf(navLink) > -1) {
                            navItem.attr('href',link);
                        }
                });

                //line hover
                    var nav = thisTabs.find('.mkd-tabs-nav'),
                        elements = nav.find('li'),
                        condition;

                    var lineState = function() {

                        var height = elements.first().height();

                        elements.each(function() {   
                            var element = $(this);

                            if (element.height() > height) {
                                height = element.height();
                            }
                        });

                        if (nav.height() > height) {
                            if (nav.find('.mkd-tabs-line').length) {
                                nav.find('.mkd-tabs-line').remove();
                            }
                            elements.addClass('mkd-border-active');

                            condition = false;
                        }
                        if (!nav.find('.mkd-tabs-line').length && (nav.height() == height)) {
                            nav.append('<li class="mkd-tabs-line"></li>');
                            nav.find('.mkd-tabs-line').css('width', elements.filter('.ui-tabs-active').width());
                            elements.removeClass('mkd-border-active');

                            condition = true;
                        }
                    }

                    lineState();

                    $(window).resize(function(){
                        lineState();
                    });

                    //Init the line
                    nav.find('.mkd-tabs-line').css('left', elements.first().find('a').position().left);
                    nav.find('.mkd-tabs-line').css('width', elements.first().find('a').width());

                    thisTabs.mousemove(function(){

                        if (condition) {
                            elements.each(function(){
                                var element = $(this),
                                    lineLeftOffset = element.position().left,
                                    lineWidth = element.width();

                                element.mouseenter(function(){
                                    nav.find('.mkd-tabs-line').css('left', lineLeftOffset);
                                    nav.find('.mkd-tabs-line').css('width', lineWidth);
                                });
                            });
                        }
                    });

                    thisTabs.mouseleave(function(){
                        nav.find('.mkd-tabs-line').css('left', elements.filter('.ui-tabs-active').position().left);
                        nav.find('.mkd-tabs-line').css('width', elements.filter('.ui-tabs-active').width());
                    });
            });
        }
    }

    function mkdInitPLFilters(){ 
    	var filters = $('.mkd-pl-filters');
        if(filters.length){
            filters.each(function(){ 
            	var nav = $(this),
                    elements = nav.find('li'),
                    condition;

                    var lineState = function() {

                        var height = elements.first().height();
                        elements.each(function() {   
                            var element = $(this);

                            if (element.height() > height) {
                                height = element.height();
                            }
                        });

                        if (nav.height() > height) {
                            if (nav.find('.mkd-filters-line').length) {
                                nav.find('.mkd-filters-line').remove();
                            }
                            elements.addClass('mkd-border-active');

                            condition = false;
                        }

                        if (!nav.find('.mkd-filters-line').length) {
                            nav.find('ul').append('<li class="mkd-filters-line"></li>');
                            nav.find('.mkd-filters-line').css('width', elements.find('.active').width());
                            elements.removeClass('mkd-border-active');

                            condition = true;
                        }
                    }

                    if(!(mkd.html.hasClass("touch"))) {
                    	lineState();
                	}

                    $(window).resize(function(){
                        lineState();
                    });

                    nav.mousemove(function(){

                        if (condition) {
                            elements.each(function(){
                                var element = $(this),
                                    lineLeftOffset = element.position().left,
                                    lineWidth = element.width();

                                element.mouseenter(function(){
                                    nav.find('.mkd-filters-line').css('left', lineLeftOffset);
                                    nav.find('.mkd-filters-line').css('width', lineWidth);
                                });
                            });
                        }
                    });

                    elements.first().find("a").addClass("mkd-item-active");

                    elements.find("a").on('click',function(){
                    	var element = $(this);
                    	elements.find("a").removeClass("mkd-item-active");
                    	element.addClass("mkd-item-active");
                    	
                    	nav.find('.mkd-filters-line').css('left', element.position().left);
                        nav.find('.mkd-filters-line').css('width', element.width());
                    });

	                $(".cboxIframe" ).one( "load", function() {
		    			content.removeClass("mkd-iframe-loader");
		    			$('.mkd-rotate-circles').remove();
		    			flag = true;
		    		});

                    nav.mouseleave(function(){

                        nav.find('.mkd-filters-line').css('left', elements.find('.mkd-item-active').position().left);
                        nav.find('.mkd-filters-line').css('width', elements.find('.mkd-item-active').width());
                    });
            });
        }
    }

    function mkdYithLoader(){ 
	    $('body').on( 'yith_woocompare_open_popup', function() {

	    	var content = $('#cboxContent'),
	    		flag = false;

	    	$('#cboxLoadingGraphic').css("z-index",-1);

	    	// Start preloader when compare popup is opened
	    	content.addClass("mkd-iframe-loader").append('<div class="mkd-rotate-circles"><div></div><div></div><div></div></div>');

	    	var interval = setInterval(function(){
	    		
	    		$(".cboxIframe" ).one( "load", function() {
	    			content.removeClass("mkd-iframe-loader");
	    			$('.mkd-rotate-circles').remove();
	    			flag = true;
	    		});

	    	},100);

	    	if(flag){
	    		clearInterval(interval);
	    	}
	    	
	    });
    }

})(jQuery);
(function($) {
    'use strict';

    var like = {};
    
    like.mkdOnDocumentReady = mkdOnDocumentReady;

    $(document).ready(mkdOnDocumentReady);
    
    /**
    *  All functions to be called on $(document).ready() should be in this function
    **/
    function mkdOnDocumentReady() {
        mkdLikes();
    }

    function mkdLikes() {
        $(document).on('click','.mkd-like', function() {
            var likeLink = $(this),
                id = likeLink.attr('id'),
                type;

            if ( likeLink.hasClass('liked') ) {
                return false;
            }

            if (typeof likeLink.data('type') !== 'undefined') {
                type = likeLink.data('type');
            }

            var dataToPass = {
                action: 'cyberstore_mikado_like',
                likes_id: id,
                type: type
            };

            var like = $.post(mkdGlobalVars.vars.mkdAjaxUrl, dataToPass, function( data ) {
                likeLink.html(data).addClass('liked').attr('title', 'You already like this!');
            });

            return false;
        });
    }
    
})(jQuery);
(function($) {
	"use strict";

    var blog = {};
    mkd.modules.blog = blog;

    blog.mkdOnDocumentReady = mkdOnDocumentReady;
    blog.mkdOnWindowLoad = mkdOnWindowLoad;
    blog.mkdOnWindowResize = mkdOnWindowResize;
    blog.mkdOnWindowScroll = mkdOnWindowScroll;

    $(document).ready(mkdOnDocumentReady);
    $(window).load(mkdOnWindowLoad);
    $(window).resize(mkdOnWindowResize);
    $(window).scroll(mkdOnWindowScroll);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdOnDocumentReady() {
        mkdInitAudioPlayer();
        mkdInitBlogMasonry();
        mkdInitBlogListMasonry();
	    mkdInitBlogMasonryGallery();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function mkdOnWindowLoad() {
	    mkdInitBlogPagination().init();
	    mkdInitBlogListShortcodePagination().init();
        mkdInitBlogChequered();
        mkdInitBlogMasonryGalleryAppear();
        mkdInitBlogNarrowAppear();
    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function mkdOnWindowResize() {
        mkdInitBlogMasonry();
	    mkdInitBlogMasonryGallery();
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function mkdOnWindowScroll() {
	    mkdInitBlogPagination().scroll();
	    mkdInitBlogListShortcodePagination().scroll();
    }

    /**
    * Init audio player for Blog list and single pages
    */
    function mkdInitAudioPlayer() {
        var players = $('audio.mkd-blog-audio');

        players.mediaelementplayer({
            audioWidth: '100%'
        });
    }

    /**
     * Init Resize Blog Items
     */
    function mkdResizeBlogItems(size,container){

        if(container.hasClass('mkd-masonry-images-fixed')) {
            var padding = parseInt(container.find('article').css('padding-left')),
                defaultMasonryItem = container.find('.mkd-post-size-default'),
                largeWidthMasonryItem = container.find('.mkd-post-size-large-width'),
                largeHeightMasonryItem = container.find('.mkd-post-size-large-height'),
                largeWidthHeightMasonryItem = container.find('.mkd-post-size-large-width-height');

			if (mkd.windowWidth > 680) {
				defaultMasonryItem.css('height', size - 2 * padding);
				largeHeightMasonryItem.css('height', Math.round(2 * size) - 2 * padding);
				largeWidthHeightMasonryItem.css('height', Math.round(2 * size) - 2 * padding);
				largeWidthMasonryItem.css('height', size - 2 * padding);
			} else {
				defaultMasonryItem.css('height', size);
				largeHeightMasonryItem.css('height', size);
				largeWidthHeightMasonryItem.css('height', size);
				largeWidthMasonryItem.css('height', Math.round(size / 2));
			}
        }
    }

    /**
    * Init Blog Masonry Layout
    */
    function mkdInitBlogMasonry() {
	    var holder = $('.mkd-blog-holder.mkd-blog-type-masonry');
	
	    if(holder.length){
		    holder.each(function(){
			    var thisHolder = $(this),
				    masonry = thisHolder.children('.mkd-blog-holder-inner'),
                    size = thisHolder.find('.mkd-blog-masonry-grid-sizer').width();
			    
                mkdResizeBlogItems(size, thisHolder);
                
			    masonry.waitForImages(function() {
				    masonry.isotope({
					    layoutMode: 'packery',
					    itemSelector: 'article',
					    percentPosition: true,
					    packery: {
						    gutter: '.mkd-blog-masonry-grid-gutter',
						    columnWidth: '.mkd-blog-masonry-grid-sizer'
					    }
				    });
                    masonry.css('opacity', '1');
				
				    setTimeout(function() {
					    masonry.isotope('layout');
				    }, 800);
                });
		    });
	    }
    }

    /**
     *  Init Blog Chequered
     */
    function mkdInitBlogChequered(){
        var container = $('.mkd-blog-holder.mkd-blog-chequered');
        var masonry = container.children('.mkd-blog-holder-inner');
        var newSize;

        if(container.length) {
            newSize = masonry.find('.mkd-blog-masonry-grid-sizer').outerWidth();
            masonry.children('article').css({'height': (newSize) + 'px'});
            masonry.isotope( 'layout', function(){
                masonry.css('opacity', '1');
            });
        }
    }
	
    /**
     *  Init Blog Masonry Gallery
     *
     *  Function that sets equal height of articles on blog masonry gallery list
     */
    function mkdInitBlogMasonryGallery() {
        var blogList = $('.mkd-blog-holder.mkd-blog-masonry-gallery');
        if(blogList.length){
            blogList.each(function(){

                var container = $(this),
                    masonry = container.children('.mkd-blog-holder-inner'),
                    article = masonry.find('article'),
                    size = masonry.find('.mkd-blog-masonry-grid-sizer').width() * 1.25;

                article.css({'height': (size) + 'px'});

                masonry.isotope( 'layout', function(){});
                mkdInitBlogMasonryGalleryAppear();
            });
        }
    }

    /**
     *  Animate blog masonry gallery type
     */
    function mkdInitBlogMasonryGalleryAppear() {
        var blogList = $('.mkd-blog-holder.mkd-blog-masonry-gallery');
        if(blogList.length){
            blogList.each(function(){
                var thisBlogList = $(this),
                    article = thisBlogList.find('article'),
                    pagination = thisBlogList.find('.mkd-blog-pagination-holder'),
                    animateCycle = 7, // rewind delay
                    animateCycleCounter = 0;

                article.each(function(){
                    var thisArticle = $(this);
                    setTimeout(function(){
                        thisArticle.appear(function(){
                            animateCycleCounter ++;
                            if(animateCycleCounter == animateCycle) {
                                animateCycleCounter = 0;
                            }
                            setTimeout(function(){
                                thisArticle.addClass('mkd-appeared');
                            },animateCycleCounter * 200);
                        },{accX: 0, accY: 0});
                    },150);
                });

                pagination.appear(function(){
                    pagination.addClass('mkd-appeared');
                },{accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});

            });
        }
    }

    /**
     *  Animate blog narrow articles on appear
     */
    function mkdInitBlogNarrowAppear() {
        var blogList = $('.mkd-blog-holder.mkd-blog-narrow');
        if(blogList.length){
            blogList.each(function(){
                var thisBlogList = $(this),
                    article = thisBlogList.find('article'),
                    pagination = thisBlogList.find('.mkd-blog-pagination-holder');

                article.each(function(){
                    var thisArticle = $(this);
                    thisArticle.appear(function(){
                        thisArticle.addClass('mkd-appeared');
                    },{accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});
                });

                pagination.appear(function(){
                    pagination.addClass('mkd-appeared');
                },{accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});

            });
        }
    }

	
	/**
	 * Initializes blog pagination functions
	 */
	function mkdInitBlogPagination(){
		var holder = $('.mkd-blog-holder');
		
		var initLoadMorePagination = function(thisHolder) {
			var loadMoreButton = thisHolder.find('.mkd-blog-pag-load-more a');
			
			loadMoreButton.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				initMainPagFunctionality(thisHolder);
			});
		};
		
		var initInifiteScrollPagination = function(thisHolder) {
			var blogListHeight = thisHolder.outerHeight(),
				blogListTopOffest = thisHolder.offset().top,
				blogListPosition = blogListHeight + blogListTopOffest - mkdGlobalVars.vars.mkdAddForAdminBar;
			
			if(!thisHolder.hasClass('mkd-blog-pagination-infinite-scroll-started') && mkd.scroll + mkd.windowHeight > blogListPosition) {
				initMainPagFunctionality(thisHolder);
			}
		};
		
		var initMainPagFunctionality = function(thisHolder) {
			var thisHolderInner = thisHolder.children('.mkd-blog-holder-inner'),
				nextPage,
				maxNumPages;
			
			if (typeof thisHolder.data('max-num-pages') !== 'undefined' && thisHolder.data('max-num-pages') !== false) {
				maxNumPages = thisHolder.data('max-num-pages');
			}
			
			if(thisHolder.hasClass('mkd-blog-pagination-infinite-scroll')) {
				thisHolder.addClass('mkd-blog-pagination-infinite-scroll-started');
			}
			
			var loadMoreDatta = mkd.modules.common.getLoadMoreData(thisHolder),
				loadingItem = thisHolder.find('.mkd-blog-pag-loading');
			
			nextPage = loadMoreDatta.nextPage;
			
			if(nextPage <= maxNumPages){
				loadingItem.addClass('mkd-showing');
				
				var ajaxData = mkd.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'cyberstore_mikado_blog_load_more');
				
				$.ajax({
					type: 'POST',
					data: ajaxData,
					url: mkdGlobalVars.vars.mkdAjaxUrl,
					success: function (data) {
						nextPage++;
						
						thisHolder.data('next-page', nextPage);

						var response = $.parseJSON(data),
							responseHtml =  response.html;

						thisHolder.waitForImages(function(){
							if(thisHolder.hasClass('mkd-blog-type-masonry')){
								mkdInitAppendIsotopeNewContent(thisHolderInner, loadingItem, responseHtml);
                                mkdResizeBlogItems(thisHolderInner.find('.mkd-blog-masonry-grid-sizer').width(), thisHolder);
							} else {
								mkdInitAppendGalleryNewContent(thisHolderInner, loadingItem, responseHtml);
							}
							
							setTimeout(function() {
								mkdInitAudioPlayer();
								mkd.modules.common.mkdOwlSlider();
								mkd.modules.common.mkdFluidVideo();
                                mkd.modules.common.mkdInitSelfHostedVideoPlayer();
                                mkd.modules.common.mkdSelfHostedVideoSize();
                                mkdInitBlogNarrowAppear();
                                mkdInitBlogMasonryGalleryAppear();
                                mkdInitBlogChequered();
							}, 400);
						});
						
						if(thisHolder.hasClass('mkd-blog-pagination-infinite-scroll-started')) {
							thisHolder.removeClass('mkd-blog-pagination-infinite-scroll-started');
						}
					}
				});
			}
			
			if(nextPage === maxNumPages){
				thisHolder.find('.mkd-blog-pag-load-more').hide();
			}
		};
		
		var mkdInitAppendIsotopeNewContent = function(thisHolderInner, loadingItem, responseHtml) {
			thisHolderInner.append(responseHtml).isotope('reloadItems').isotope({sortBy: 'original-order'});
			loadingItem.removeClass('mkd-showing');
			
			setTimeout(function() {
				thisHolderInner.isotope('layout');
			}, 600);
		};
		
		var mkdInitAppendGalleryNewContent = function(thisHolderInner, loadingItem, responseHtml) {
			loadingItem.removeClass('mkd-showing');
			thisHolderInner.append(responseHtml);
		};
		
		return {
			init: function() {
				if(holder.length) {
					holder.each(function() {
						var thisHolder = $(this);
						
						if(thisHolder.hasClass('mkd-blog-pagination-load-more')) {
							initLoadMorePagination(thisHolder);
						}
						
						if(thisHolder.hasClass('mkd-blog-pagination-infinite-scroll')) {
							initInifiteScrollPagination(thisHolder);
						}
					});
				}
			},
			scroll: function() {
				if(holder.length) {
					holder.each(function() {
						var thisHolder = $(this);
						
						if(thisHolder.hasClass('mkd-blog-pagination-infinite-scroll')) {
							initInifiteScrollPagination(thisHolder);
						}
					});
				}
			}
		};
	}
	
	/**
	 * Init blog list shortcode masonry layout
	 */
	function mkdInitBlogListMasonry() {
		var holder = $('.mkd-blog-list-holder.mkd-bl-masonry');
		
		if(holder.length){
			holder.each(function(){
				var thisHolder = $(this),
					masonry = thisHolder.find('.mkd-blog-list');
				
				masonry.waitForImages(function() {
					masonry.isotope({
						layoutMode: 'packery',
						itemSelector: '.mkd-bl-item',
						percentPosition: true,
						packery: {
							gutter: '.mkd-bl-grid-gutter',
							columnWidth: '.mkd-bl-grid-sizer'
						}
					});
					
					masonry.css('opacity', '1');
				});
			});
		}
	}
	
	/**
	 * Init blog list shortcode pagination functions
	 */
	function mkdInitBlogListShortcodePagination(){
		var holder = $('.mkd-blog-list-holder');
		
		var initStandardPagination = function(thisHolder) {
			var standardLink = thisHolder.find('.mkd-bl-standard-pagination li');
			
			if(standardLink.length) {
				standardLink.each(function(){
					var thisLink = $(this).children('a'),
						pagedLink = 1;
					
					thisLink.on('click', function(e) {
						e.preventDefault();
						e.stopPropagation();
						
						if (typeof thisLink.data('paged') !== 'undefined' && thisLink.data('paged') !== false) {
							pagedLink = thisLink.data('paged');
						}
						
						initMainPagFunctionality(thisHolder, pagedLink);
					});
				});
			}
		};
		
		var initLoadMorePagination = function(thisHolder) {
			var loadMoreButton = thisHolder.find('.mkd-blog-pag-load-more a');
			
			loadMoreButton.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				initMainPagFunctionality(thisHolder);
			});
		};
		
		var initInifiteScrollPagination = function(thisHolder) {
			var blogListHeight = thisHolder.outerHeight(),
				blogListTopOffest = thisHolder.offset().top,
				blogListPosition = blogListHeight + blogListTopOffest - mkdGlobalVars.vars.mkdAddForAdminBar;
			
			if(!thisHolder.hasClass('mkd-bl-pag-infinite-scroll-started') && mkd.scroll + mkd.windowHeight > blogListPosition) {
				initMainPagFunctionality(thisHolder);
			}
		};
		
		var initMainPagFunctionality = function(thisHolder, pagedLink) {
			var thisHolderInner = thisHolder.find('.mkd-blog-list'),
				nextPage,
				maxNumPages;
			
			if (typeof thisHolder.data('max-num-pages') !== 'undefined' && thisHolder.data('max-num-pages') !== false) {
				maxNumPages = thisHolder.data('max-num-pages');
			}
			
			if(thisHolder.hasClass('mkd-bl-pag-standard-blog-list')) {
				thisHolder.data('next-page', pagedLink);
			}
			
			if(thisHolder.hasClass('mkd-bl-pag-infinite-scroll')) {
				thisHolder.addClass('mkd-bl-pag-infinite-scroll-started');
			}
			
			var loadMoreDatta = mkd.modules.common.getLoadMoreData(thisHolder),
				loadingItem = thisHolder.find('.mkd-blog-pag-loading');
			
			nextPage = loadMoreDatta.nextPage;
			
			if(nextPage <= maxNumPages){
				if(thisHolder.hasClass('mkd-bl-pag-standard-blog-list')) {
					loadingItem.addClass('mkd-showing mkd-standard-pag-trigger');
					thisHolder.addClass('mkd-bl-pag-standard-blog-list-animate');
				} else {
					loadingItem.addClass('mkd-showing');
				}
				
				var ajaxData = mkd.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'cyberstore_mikado_blog_shortcode_load_more');
				
				$.ajax({
					type: 'POST',
					data: ajaxData,
					url: mkdGlobalVars.vars.mkdAjaxUrl,
					success: function (data) {
						if(!thisHolder.hasClass('mkd-bl-pag-standard-blog-list')) {
							nextPage++;
						}
						
						thisHolder.data('next-page', nextPage);
						
						var response = $.parseJSON(data),
							responseHtml =  response.html;
						
						if(thisHolder.hasClass('mkd-bl-pag-standard-blog-list')) {
							mkdInitStandardPaginationLinkChanges(thisHolder, maxNumPages, nextPage);
							
							thisHolder.waitForImages(function(){
								if(thisHolder.hasClass('mkd-bl-masonry')){
									mkdInitHtmlIsotopeNewContent(thisHolder, thisHolderInner, loadingItem, responseHtml);
								} else {
									mkdInitHtmlGalleryNewContent(thisHolder, thisHolderInner, loadingItem, responseHtml);
								}
							});
						} else {
							thisHolder.waitForImages(function(){
								if(thisHolder.hasClass('mkd-bl-masonry')){
									mkdInitAppendIsotopeNewContent(thisHolderInner, loadingItem, responseHtml);
								} else {
									mkdInitAppendGalleryNewContent(thisHolderInner, loadingItem, responseHtml);
								}
							});
						}
						
						if(thisHolder.hasClass('mkd-bl-pag-infinite-scroll-started')) {
							thisHolder.removeClass('mkd-bl-pag-infinite-scroll-started');
						}
					}
				});
			}
			
			if(nextPage === maxNumPages){
				thisHolder.find('.mkd-blog-pag-load-more').hide();
			}
		};
		
		var mkdInitStandardPaginationLinkChanges = function(thisHolder, maxNumPages, nextPage) {
			var standardPagHolder = thisHolder.find('.mkd-bl-standard-pagination'),
				standardPagNumericItem = standardPagHolder.find('li.mkd-bl-pag-number'),
				standardPagPrevItem = standardPagHolder.find('li.mkd-bl-pag-prev a'),
				standardPagNextItem = standardPagHolder.find('li.mkd-bl-pag-next a');
			
			standardPagNumericItem.removeClass('mkd-bl-pag-active');
			standardPagNumericItem.eq(nextPage-1).addClass('mkd-bl-pag-active');
			
			standardPagPrevItem.data('paged', nextPage-1);
			standardPagNextItem.data('paged', nextPage+1);
			
			if(nextPage > 1) {
				standardPagPrevItem.css({'opacity': '1'});
			} else {
				standardPagPrevItem.css({'opacity': '0'});
			}
			
			if(nextPage === maxNumPages) {
				standardPagNextItem.css({'opacity': '0'});
			} else {
				standardPagNextItem.css({'opacity': '1'});
			}
		};
		
		var mkdInitHtmlIsotopeNewContent = function(thisHolder, thisHolderInner, loadingItem, responseHtml) {
			thisHolderInner.html(responseHtml).isotope('reloadItems').isotope({sortBy: 'original-order'});
			loadingItem.removeClass('mkd-showing mkd-standard-pag-trigger');
			thisHolder.removeClass('mkd-bl-pag-standard-blog-list-animate');
			
			setTimeout(function() {
				thisHolderInner.isotope('layout');
			}, 600);
		};
		
		var mkdInitHtmlGalleryNewContent = function(thisHolder, thisHolderInner, loadingItem, responseHtml) {
			loadingItem.removeClass('mkd-showing mkd-standard-pag-trigger');
			thisHolder.removeClass('mkd-bl-pag-standard-blog-list-animate');
			thisHolderInner.html(responseHtml);
		};
		
		var mkdInitAppendIsotopeNewContent = function(thisHolderInner, loadingItem, responseHtml) {
			thisHolderInner.append(responseHtml).isotope('reloadItems').isotope({sortBy: 'original-order'});
			loadingItem.removeClass('mkd-showing');
			
			setTimeout(function() {
				thisHolderInner.isotope('layout');
			}, 600);
		};
		
		var mkdInitAppendGalleryNewContent = function(thisHolderInner, loadingItem, responseHtml) {
			loadingItem.removeClass('mkd-showing');
			thisHolderInner.append(responseHtml);
		};
		
		return {
			init: function() {
				if(holder.length) {
					holder.each(function() {
						var thisHolder = $(this);
						
						if(thisHolder.hasClass('mkd-bl-pag-standard-blog-list')) {
							initStandardPagination(thisHolder);
						}
						
						if(thisHolder.hasClass('mkd-bl-pag-load-more')) {
							initLoadMorePagination(thisHolder);
						}
						
						if(thisHolder.hasClass('mkd-bl-pag-infinite-scroll')) {
							initInifiteScrollPagination(thisHolder);
						}
					});
				}
			},
			scroll: function() {
				if(holder.length) {
					holder.each(function() {
						var thisHolder = $(this);
						
						if(thisHolder.hasClass('mkd-bl-pag-infinite-scroll')) {
							initInifiteScrollPagination(thisHolder);
						}
					});
				}
			}
		};
	}

})(jQuery);
(function($) {
    "use strict";

    var headerMinimal = {};
    mkd.modules.headerMinimal = headerMinimal;
	
	headerMinimal.mkdOnDocumentReady = mkdOnDocumentReady;

    $(document).ready(mkdOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdOnDocumentReady() {
        mkdFullscreenMenu();
    }

    /**
     * Init Fullscreen Menu
     */
    function mkdFullscreenMenu() {
	    var popupMenuOpener = $( 'a.mkd-fullscreen-menu-opener');
	    
        if (popupMenuOpener.length) {
            var popupMenuHolderOuter = $(".mkd-fullscreen-menu-holder-outer"),
                cssClass,
            //Flags for type of animation
                fadeRight = false,
                fadeTop = false,
            //Widgets
                widgetAboveNav = $('.mkd-fullscreen-above-menu-widget-holder'),
                widgetBelowNav = $('.mkd-fullscreen-below-menu-widget-holder'),
            //Menu
                menuItems = $('.mkd-fullscreen-menu-holder-outer nav > ul > li > a'),
                menuItemWithChild =  $('.mkd-fullscreen-menu > ul li.has_sub > a'),
                menuItemWithoutChild = $('.mkd-fullscreen-menu ul li:not(.has_sub) a');

            //set height of popup holder and initialize nicescroll
            popupMenuHolderOuter.height(mkd.windowHeight).niceScroll({
                scrollspeed: 30,
                mousescrollstep: 20,
                cursorwidth: 0,
                cursorborder: 0,
                cursorborderradius: 0,
                cursorcolor: "transparent",
                autohidemode: false,
                horizrailenabled: false
            }); //200 is top and bottom padding of holder

            //set height of popup holder on resize
            $(window).resize(function() {
                popupMenuHolderOuter.height(mkd.windowHeight);
            });

            if (mkd.body.hasClass('mkd-fade-push-text-right')) {
                cssClass = 'mkd-push-nav-right';
                fadeRight = true;
            } else if (mkd.body.hasClass('mkd-fade-push-text-top')) {
                cssClass = 'mkd-push-text-top';
                fadeTop = true;
            }

            //Appearing animation
            if (fadeRight || fadeTop) {
                if (widgetAboveNav.length) {
                    widgetAboveNav.children().css({
                        '-webkit-animation-delay' : 0 + 'ms',
                        '-moz-animation-delay' : 0 + 'ms',
                        'animation-delay' : 0 + 'ms'
                    });
                }
                menuItems.each(function(i) {
                    $(this).css({
                        '-webkit-animation-delay': (i+1) * 70 + 'ms',
                        '-moz-animation-delay': (i+1) * 70 + 'ms',
                        'animation-delay': (i+1) * 70 + 'ms'
                    });
                });
                if (widgetBelowNav.length) {
                    widgetBelowNav.children().css({
                        '-webkit-animation-delay' : (menuItems.length + 1)*70 + 'ms',
                        '-moz-animation-delay' : (menuItems.length + 1)*70 + 'ms',
                        'animation-delay' : (menuItems.length + 1)*70 + 'ms'
                    });
                }
            }

            // Open popup menu
            popupMenuOpener.on('click',function(e){
                e.preventDefault();

                if (!popupMenuOpener.hasClass('mkd-fm-opened')) {
                    popupMenuOpener.addClass('mkd-fm-opened');
                    mkd.body.removeClass('mkd-fullscreen-fade-out').addClass('mkd-fullscreen-menu-opened mkd-fullscreen-fade-in');
                    mkd.body.removeClass(cssClass);
                    mkd.modules.common.mkdDisableScroll();
                    
                    $(document).keyup(function(e){
                        if (e.keyCode === 27 ) {
                            popupMenuOpener.removeClass('mkd-fm-opened');
                            mkd.body.removeClass('mkd-fullscreen-menu-opened mkd-fullscreen-fade-in').addClass('mkd-fullscreen-fade-out');
                            mkd.body.addClass(cssClass);
                            mkd.modules.common.mkdEnableScroll();
                            
                            $("nav.mkd-fullscreen-menu ul.sub_menu").slideUp(200, function(){
                                $('nav.popup_menu').getNiceScroll().resize();
                            });
                        }
                    });
                } else {
                    popupMenuOpener.removeClass('mkd-fm-opened');
                    mkd.body.removeClass('mkd-fullscreen-menu-opened mkd-fullscreen-fade-in').addClass('mkd-fullscreen-fade-out');
                    mkd.body.addClass(cssClass);
                    mkd.modules.common.mkdEnableScroll();
                    
                    $("nav.mkd-fullscreen-menu ul.sub_menu").slideUp(200, function(){
                        $('nav.popup_menu').getNiceScroll().resize();
                    });
                }
            });

            //logic for open sub menus in popup menu
            menuItemWithChild.on('tap click', function(e) {
                e.preventDefault();

                var thisItem = $(this),
	                thisItemParent = thisItem.parent();

                if (thisItemParent.hasClass('has_sub')) {
	                var submenu = thisItemParent.find('> ul.sub_menu');
	
	                if (submenu.is(':visible')) {
		                submenu.slideUp(450, 'easeInOutQuint', function() {
			                popupMenuHolderOuter.getNiceScroll().resize();
		                });
		                thisItemParent.removeClass('open_sub');
	                } else {
		                thisItemParent.addClass('open_sub');
		
		                if(menuItemWithChild.length === 1) {
			                thisItemParent.removeClass('open_sub').find('.sub_menu').slideUp(400, 'easeInOutQuint', function() {
				                popupMenuHolderOuter.getNiceScroll().resize();
				                submenu.slideDown(400, 'easeInOutQuint', function() {
					                popupMenuHolderOuter.getNiceScroll().resize();
				                });
			                });
		                } else {
			                thisItemParent.siblings().removeClass('open_sub').find('.sub_menu').slideUp(400, 'easeInOutQuint', function() {
				                popupMenuHolderOuter.getNiceScroll().resize();
				                submenu.slideDown(400, 'easeInOutQuint', function() {
					                popupMenuHolderOuter.getNiceScroll().resize();
				                });
			                });
		                }
	                }
                }
                
                return false;
            });

            //if link has no submenu and if it's not dead, than open that link
            menuItemWithoutChild.on('click',function (e) {
                if(($(this).attr('href') !== "http://#") && ($(this).attr('href') !== "#")){
                    if (e.which === 1) {
                        popupMenuOpener.removeClass('mkd-fm-opened');
                        mkd.body.removeClass('mkd-fullscreen-menu-opened');
                        mkd.body.removeClass('mkd-fullscreen-fade-in').addClass('mkd-fullscreen-fade-out');
                        mkd.body.addClass(cssClass);
                        $("nav.mkd-fullscreen-menu ul.sub_menu").slideUp(200, function(){
                            $('nav.popup_menu').getNiceScroll().resize();
                        });
                        mkd.modules.common.mkdEnableScroll();
                    }
                } else {
                    return false;
                }
            });
        }
    }

})(jQuery);
(function($) {
    "use strict";

    var headerVertical = {};
    mkd.modules.headerVertical = headerVertical;
	
	headerVertical.mkdOnDocumentReady = mkdOnDocumentReady;

    $(document).ready(mkdOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdOnDocumentReady() {
        mkdVerticalMenu().init();
    }

    /**
     * Function object that represents vertical menu area.
     * @returns {{init: Function}}
     */
    var mkdVerticalMenu = function() {
        /**
         * Main vertical area object that used through out function
         * @type {jQuery object}
         */
        var verticalMenuObject = $('.mkd-vertical-menu-area');

        /**
         * Resizes vertical area. Called whenever height of navigation area changes
         * It first check if vertical area is scrollable, and if it is resizes scrollable area
         */
        var resizeVerticalArea = function() {
            if(verticalAreaScrollable()) {
                verticalMenuObject.getNiceScroll().resize();
            }
        };

        /**
         * Checks if vertical area is scrollable (if it has mkd-with-scroll class)
         *
         * @returns {bool}
         */
        var verticalAreaScrollable = function() {
            return verticalMenuObject.hasClass('.mkd-with-scroll');
        };

        /**
         * Initialzes navigation functionality. It checks navigation type data attribute and calls proper functions
         */
        var initNavigation = function() {
            var verticalNavObject = verticalMenuObject.find('.mkd-vertical-menu');

            dropdownClickToggle();

            /**
             * Initializes click toggle navigation type. Works the same for touch and no-touch devices
             */
            function dropdownClickToggle() {
                var menuItems = verticalNavObject.find('ul li.menu-item-has-children');

                menuItems.each(function() {
                    var elementToExpand = $(this).find(' > .second, > ul');
                    var menuItem = this;
                    var dropdownOpener = $(this).find('> a');
                    var slideUpSpeed = 'fast';
                    var slideDownSpeed = 'slow';

                    dropdownOpener.on('click tap', function(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        if(elementToExpand.is(':visible')) {
                            $(menuItem).removeClass('open');
                            elementToExpand.slideUp(slideUpSpeed, function() {
                                resizeVerticalArea();
                            });
                        } else if (dropdownOpener.parent().parent().children().hasClass('open') && dropdownOpener.parent().parent().parent().hasClass('mkd-vertical-menu')) {
                            $(this).parent().parent().children().removeClass('open');
                            $(this).parent().parent().children().find(' > .second').slideUp(slideUpSpeed);

                            $(menuItem).addClass('open');
                            elementToExpand.slideDown(slideDownSpeed, function() {
                                resizeVerticalArea();
                            });
                        } else {

                            if(!$(this).parents('li').hasClass('open')) {
                                menuItems.removeClass('open');
                                menuItems.find(' > .second, > ul').slideUp(slideUpSpeed);
                            }

                            if($(this).parent().parent().children().hasClass('open')) {
                                $(this).parent().parent().children().removeClass('open');
                                $(this).parent().parent().children().find(' > .second, > ul').slideUp(slideUpSpeed);
                            }

                            $(menuItem).addClass('open');
                            elementToExpand.slideDown(slideDownSpeed, function() {
                                resizeVerticalArea();
                            });
                        }
                    });
                });
            }
        };

        /**
         * Initializes scrolling in vertical area. It checks if vertical area is scrollable before doing so
         */
        var initVerticalAreaScroll = function() {
            if(verticalAreaScrollable()) {
                verticalMenuObject.niceScroll({
                    scrollspeed: 60,
                    mousescrollstep: 40,
                    cursorwidth: 0,
                    cursorborder: 0,
                    cursorborderradius: 0,
                    cursorcolor: "transparent",
                    autohidemode: false,
                    horizrailenabled: false
                });
            }
        };

        var initHiddenVerticalArea = function() {
            var verticalLogo = $('.mkd-vertical-area-bottom-logo');
            var verticalMenuOpener = verticalMenuObject.find('.mkd-vertical-area-opener');
            var scrollPosition = 0;

            verticalMenuOpener.on('click tap', function() {
                if(isVerticalAreaOpen()) {
                    closeVerticalArea();
                } else {
                    openVerticalArea();
                }
            });

            $(window).scroll(function() {
                if(Math.abs($(window).scrollTop() - scrollPosition) > 400){
                    closeVerticalArea();
                }
            });

            /**
             * Closes vertical menu area by removing 'active' class on that element
             */
            function closeVerticalArea() {
                verticalMenuObject.removeClass('active');

                if(verticalLogo.length) {
                    verticalLogo.removeClass('active');
                }
            }

            /**
             * Opens vertical menu area by adding 'active' class on that element
             */
            function openVerticalArea() {
                verticalMenuObject.addClass('active');

                if(verticalLogo.length) {
                    verticalLogo.addClass('active');
                }
                scrollPosition = $(window).scrollTop();
            }

            function isVerticalAreaOpen() {
                return verticalMenuObject.hasClass('active');
            }
        };

        return {
            /**
             * Calls all necessary functionality for vertical menu area if vertical area object is valid
             */
            init: function() {
                if(verticalMenuObject.length) {
                    initNavigation();
                    initVerticalAreaScroll();

                    if(mkd.body.hasClass('mkd-header-vertical-closed')) {
                        initHiddenVerticalArea();
                    }
                }
            }
        };
    };

})(jQuery);
(function($) {
    "use strict";

    var mobileHeader = {};
    mkd.modules.mobileHeader = mobileHeader;
	
	mobileHeader.mkdOnDocumentReady = mkdOnDocumentReady;

    $(document).ready(mkdOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdOnDocumentReady() {
        mkdInitMobileNavigation();
    }

    function mkdInitMobileNavigation() {
        var navigationOpener = $('.mkd-mobile-header .mkd-mobile-menu-opener, .mkd-close-mobile-side-area-holder');
        var navigationHolder = $('.mkd-mobile-header .mkd-mobile-side-area');
        var dropdownOpener = $('.mkd-mobile-nav .mobile_arrow, .mkd-mobile-nav h4, .mkd-mobile-nav a[href*="#"]');
        var animationSpeed = 200;

        //whole mobile menu opening / closing
        if (navigationOpener.length && navigationHolder.length) {
            navigationOpener.on('tap click', function (e) {
                e.stopPropagation();
                e.preventDefault();

                if (navigationHolder.hasClass('opened')) {
                    navigationHolder.removeClass('opened');
                } else {
                    navigationHolder.addClass('opened');
                }
            });

            navigationHolder.find('.mkd-mobile-side-area-inner').niceScroll({
                scrollspeed: 60,
                mousescrollstep: 40,
                cursorwidth: 0,
                cursorborder: 0,
                cursorborderradius: 0,
                cursorcolor: "transparent",
                autohidemode: false,
                horizrailenabled: false
            });

        }

        //dropdown opening / closing
        if (dropdownOpener.length) {
            dropdownOpener.each(function () {
                $(this).on('tap click', function (e) {
                    var dropdownToOpen = $(this).nextAll('ul').first();

                    if (dropdownToOpen.length) {
                        e.preventDefault();
                        e.stopPropagation();

                        var openerParent = $(this).parent('li');
                        if (dropdownToOpen.is(':visible')) {
                            dropdownToOpen.slideUp(animationSpeed);
                            openerParent.removeClass('mkd-opened');
                        } else {
                            dropdownToOpen.slideDown(animationSpeed);
                            openerParent.addClass('mkd-opened');
                        }
                    }

                });
            });
        }

        $('.mkd-mobile-nav a, .mkd-mobile-logo-wrapper a').on('click tap', function (e) {
            if ($(this).attr('href') !== 'http://#' && $(this).attr('href') !== '#') {
                //navigationHolder.slideUp(animationSpeed);
            }
        });
    }

})(jQuery);
(function($) {
    "use strict";

    var stickyHeader = {};
    mkd.modules.stickyHeader = stickyHeader;
	
	stickyHeader.isStickyVisible = false;
	stickyHeader.stickyAppearAmount = 0;
	stickyHeader.behaviour = '';
	
	stickyHeader.mkdOnDocumentReady = mkdOnDocumentReady;

    $(document).ready(mkdOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdOnDocumentReady() {
	    if(mkd.windowWidth > 1024) {
		    mkdHeaderBehaviour();
	    }
    }

    /*
     **	Show/Hide sticky header on window scroll
     */
    function mkdHeaderBehaviour() {
        var header = $('.mkd-page-header'),
	        stickyHeader = $('.mkd-sticky-header'),
            fixedHeaderWrapper = $('.mkd-fixed-wrapper'),
	        fixedMenuArea = fixedHeaderWrapper.children('.mkd-menu-area'),
	        fixedMenuAreaHeight = fixedMenuArea.outerHeight(),
            sliderHolder = $('.mkd-slider'),
            revSliderHeight = sliderHolder.length ? sliderHolder.outerHeight() : 0,
	        stickyAppearAmount,
	        headerAppear;
        
        var headerMenuAreaOffset = fixedHeaderWrapper.length ? fixedHeaderWrapper.offset().top - mkdGlobalVars.vars.mkdAddForAdminBar : 0;

        switch(true) {
            // sticky header that will be shown when user scrolls up
            case mkd.body.hasClass('mkd-sticky-header-on-scroll-up'):
                mkd.modules.stickyHeader.behaviour = 'mkd-sticky-header-on-scroll-up';
                var docYScroll1 = $(document).scrollTop();
                stickyAppearAmount = parseInt(mkdGlobalVars.vars.mkdTopBarHeight) + parseInt(mkdGlobalVars.vars.mkdLogoAreaHeight) + parseInt(mkdGlobalVars.vars.mkdMenuAreaHeight) + parseInt(mkdGlobalVars.vars.mkdStickyHeaderHeight);
	            
                headerAppear = function(){
                    var docYScroll2 = $(document).scrollTop();
					
                    if((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount) || (docYScroll2 < stickyAppearAmount)) {
                        mkd.modules.stickyHeader.isStickyVisible = false;
                        stickyHeader.removeClass('header-appear').find('.mkd-main-menu .second').removeClass('mkd-drop-down-start');
                        mkd.body.removeClass('mkd-sticky-header-appear');
                    } else {
                        mkd.modules.stickyHeader.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
	                    mkd.body.addClass('mkd-sticky-header-appear');
                    }

                    docYScroll1 = $(document).scrollTop();
                };
                headerAppear();

                $(window).scroll(function() {
                    headerAppear();
                });

                break;

            // sticky header that will be shown when user scrolls both up and down
            case mkd.body.hasClass('mkd-sticky-header-on-scroll-down-up'):
                mkd.modules.stickyHeader.behaviour = 'mkd-sticky-header-on-scroll-down-up';

                if(mkdPerPageVars.vars.mkdStickyScrollAmount !== 0){
                    mkd.modules.stickyHeader.stickyAppearAmount = parseInt(mkdPerPageVars.vars.mkdStickyScrollAmount);
                } else {
                    mkd.modules.stickyHeader.stickyAppearAmount = parseInt(mkdGlobalVars.vars.mkdTopBarHeight) + parseInt(mkdGlobalVars.vars.mkdLogoAreaHeight) + parseInt(mkdGlobalVars.vars.mkdMenuAreaHeight) + parseInt(revSliderHeight);
                }

                headerAppear = function(){
                    if(mkd.scroll < mkd.modules.stickyHeader.stickyAppearAmount) {
                        mkd.modules.stickyHeader.isStickyVisible = false;
                        stickyHeader.removeClass('header-appear').find('.mkd-main-menu .second').removeClass('mkd-drop-down-start');
	                    mkd.body.removeClass('mkd-sticky-header-appear');
                    }else{
                        mkd.modules.stickyHeader.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
	                    mkd.body.addClass('mkd-sticky-header-appear');
                    }
                };

                headerAppear();

                $(window).scroll(function() {
                    headerAppear();
                });

                break;

            // on scroll down, part of header will be sticky
            case mkd.body.hasClass('mkd-fixed-on-scroll'):
                mkd.modules.stickyHeader.behaviour = 'mkd-fixed-on-scroll';
                var headerFixed = function(){
	
	                if(mkd.scroll <= headerMenuAreaOffset) {
		                fixedHeaderWrapper.removeClass('fixed');
		                mkd.body.removeClass('mkd-fixed-header-appear');
		                fixedMenuArea.css({'height': fixedMenuAreaHeight + 'px'});
		                header.css('margin-bottom', '0');
	                } else {
		                fixedHeaderWrapper.addClass('fixed');
		                mkd.body.addClass('mkd-fixed-header-appear');
		                fixedMenuArea.css({'height': (fixedMenuAreaHeight + 5) + 'px'});
		                header.css('margin-bottom', (fixedMenuAreaHeight + 5) + 'px');
	                }
                };

                headerFixed();

                $(window).scroll(function() {
                    headerFixed();
                });

                break;
        }
    }

})(jQuery);
(function($) {
    "use strict";

    var topHeader = {};
    mkd.modules.topHeader = topHeader;

    topHeader.mkdOnDocumentReady = mkdOnDocumentReady;

    $(document).ready(mkdOnDocumentReady);

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdOnDocumentReady() {
        mkdHeaderTopCustomMenu();
    }

    /*
     **	Additional markup
     */
    function mkdHeaderTopCustomMenu() {
        var menuItems = $('.mkd-top-bar .widget_nav_menu .sub-menu li a');

        menuItems.each(function() {
            var menuItem = this;

            $(menuItem).wrap("<span class='mkd-item-outer'><span class='mkd-item-inner'></span></span>");

        });

    }

})(jQuery);
(function ($) {
    "use strict";

    var header = {};
    mkd.modules.header = header;

    header.mkdSetDropDownMenuPosition = mkdSetDropDownMenuPosition;
    header.mkdSetDropDownWideMenuPosition = mkdSetDropDownWideMenuPosition;

    header.mkdOnDocumentReady = mkdOnDocumentReady;
    header.mkdOnWindowLoad = mkdOnWindowLoad;

    $(document).ready(mkdOnDocumentReady);
    $(window).load(mkdOnWindowLoad);

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdOnDocumentReady() {
        mkdSetDropDownMenuPosition();
        mkdDropDownMenu();
        mkdExtendedDropDown();
    }

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdOnWindowLoad() {
        mkdSetDropDownWideMenuPosition();
    }

    /**
     * Set dropdown position
     */
    function mkdSetDropDownMenuPosition() {
        var menuItems = $('.mkd-drop-down > ul > li.narrow.menu-item-has-children');

        if (menuItems.length) {
            menuItems.each(function (i) {
                var thisItem = $(this),
                    menuItemPosition = thisItem.offset().left,
                    dropdownHolder = thisItem.find('.second'),
                    dropdownMenuItem = dropdownHolder.find('.inner ul'),
                    dropdownMenuWidth = dropdownMenuItem.outerWidth(),
                    menuItemFromLeft = mkd.windowWidth - menuItemPosition;

                if (mkd.body.hasClass('mkd-boxed')) {
                    menuItemFromLeft = mkd.boxedLayoutWidth - (menuItemPosition - (mkd.windowWidth - mkd.boxedLayoutWidth ) / 2);
                }

                var dropDownMenuFromLeft; //has to stay undefined beacuse 'dropDownMenuFromLeft < dropdownMenuWidth' condition will be true

                if (thisItem.find('li.sub').length > 0) {
                    dropDownMenuFromLeft = menuItemFromLeft - dropdownMenuWidth;
                }

                dropdownHolder.removeClass('right');
                dropdownMenuItem.removeClass('right');
                if (menuItemFromLeft < dropdownMenuWidth || dropDownMenuFromLeft < dropdownMenuWidth) {
                    dropdownHolder.addClass('right');
                    dropdownMenuItem.addClass('right');
                }
            });
        }
    }

    /**
     * Extended dropdown
     **/
    function mkdExtendedDropDown() {
        var menuItemsHolders = $('.mkd-extended-dropdown-menu > ul > li.wide .second');

        menuItemsHolders.each(function () {
            var menuItemsHolder = $(this);

            var dropDownItems = menuItemsHolder.find('> .inner > ul > li');
            var dropDownItemsCount = dropDownItems.length > 2 ? 2 : dropDownItems.length;

            var menuItemsWidth = dropDownItems.outerWidth();

            menuItemsHolder.css({'width': dropDownItemsCount * menuItemsWidth});
        })
    }

    /**
     * Set dropdown wide position
     */
    function mkdSetDropDownWideMenuPosition() {
        var menuAreaHolder = $('.mkd-menu-area .mkd-vertical-align-containers');
        var menuArea = $('.mkd-drop-down');
        var menuItems = menuArea.find('> ul > li.wide');
        var menuAreaHolderWidth = menuAreaHolder.outerWidth();

        menuItems.each(function () {
            var menuItem = $(this);
            var menuItemOffset = menuItem[0].offsetLeft;
            var menuItemWidth = menuItem.outerWidth();

            var dropDown = menuItem.find('.second');

            var dropDownWidth = dropDown.outerWidth();

            var dropDownOffset = -dropDownWidth / 2 + menuItemWidth / 2;


            //initial dropdown position
            dropDown.css('left', dropDownOffset);

            //recalculate dd position in case it goes over the left bound
            if (Math.abs(menuItemOffset) < dropDownWidth / 2) {
                dropDown.css({'left': -menuItemOffset});
            }
            //recalculate dd position in case it goes over the right bound
            else if (Math.abs(menuItemOffset + dropDownWidth / 2 + menuItemWidth / 2) > Math.abs(menuAreaHolderWidth)) {
                dropDown.css({'left': -dropDownWidth - menuItemOffset + menuAreaHolderWidth - parseInt(menuAreaHolder.css('padding-left'))});
            }

        });
    }

    function mkdDropDownMenu() {
        var menu_items_holders = $('.mkd-drop-down .wide .inner > ul');
        var menu_items = $('.mkd-drop-down > ul > li');

        //dropdown wide width
        menu_items_holders.each(function () {
            var menu_items_holder = $(this);

            var menu_items_wide = menu_items_holder.children();
            var menu_items_count = menu_items_wide.length > 4 ? 4 : menu_items_wide.length;
            var menu_items_width = menu_items_wide.first().outerWidth();

            menu_items_holders.width(menu_items_width * menu_items_count);

        });

        menu_items.each(function (i) {
            if ($(menu_items[i]).find('.second').length > 0) {
                var thisItem = $(menu_items[i]),
                    dropDownSecondDiv = thisItem.find('.second');

                if (thisItem.hasClass('wide')) {
                    //set columns to be same height - start
                    var tallest = 0,
                        dropDownSecondItem = $(this).find('.second > .inner > ul > li');

                    dropDownSecondItem.each(function () {

                        var thisHeight = $(this).outerHeight();

                        if (thisHeight > tallest) {
                            tallest = thisHeight;
                        }
                    });

                    dropDownSecondItem.css('height', ''); // delete old inline css - via resize
                    //dropDownSecondItem.height(tallest);
                    //set columns to be same height - end
                }

                if (!mkd.menuDropdownHeightSet) {
                    thisItem.data('original_height', dropDownSecondDiv.height() + 'px');
                    dropDownSecondDiv.height(0);
                }

                if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                    thisItem.on("touchstart mouseenter", function () {
                        dropDownSecondDiv.css({
                            'height': thisItem.data('original_height'),
                            'overflow': 'visible',
                            'visibility': 'visible',
                            'opacity': '1'
                        });
                    }).on("mouseleave", function () {
                        dropDownSecondDiv.css({
                            'height': '0px',
                            'overflow': 'hidden',
                            'visibility': 'hidden',
                            'opacity': '0'
                        });
                    });
                } else {
                    if (mkd.body.hasClass('mkd-dropdown-animate-height')) {
                        thisItem.mouseenter(function () {
                            dropDownSecondDiv.css({
                                'visibility': 'visible',
                                'height': '0px',
                                'opacity': '0'
                            });
                            dropDownSecondDiv.stop().animate({
                                'height': thisItem.data('original_height'),
                                opacity: 1
                            }, 300, function () {
                                dropDownSecondDiv.css('overflow', 'visible');
                            });
                        }).mouseleave(function () {
                            dropDownSecondDiv.stop().animate({
                                'height': '0px'
                            }, 150, function () {
                                dropDownSecondDiv.css({
                                    'overflow': 'hidden',
                                    'visibility': 'hidden'
                                });
                            });
                        });
                    } else {
                        var config = {
                            interval: 0,
                            over: function () {
                                setTimeout(function () {
                                    dropDownSecondDiv.addClass('mkd-drop-down-start');
                                    dropDownSecondDiv.stop().css({'height': thisItem.data('original_height')});
                                }, 150);
                            },
                            timeout: 150,
                            out: function () {
                                dropDownSecondDiv.stop().css({'height': '0px'});
                                dropDownSecondDiv.removeClass('mkd-drop-down-start');
                            }
                        };
                        thisItem.hoverIntent(config);
                    }
                }
            }
        });

        $('.mkd-drop-down ul li.wide ul li a').on('click', function (e) {
            if (e.which === 1) {
                var $this = $(this);
                setTimeout(function () {
                    $this.mouseleave();
                }, 500);
            }
        });

        mkd.menuDropdownHeightSet = true;
    }

})(jQuery);
(function($) {
    "use strict";

    var search = {};
    mkd.modules.search = search;

    search.mkdOnDocumentReady = mkdOnDocumentReady;

    $(document).ready(mkdOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdOnDocumentReady() {
	    mkdSearch();
    }
	
	/**
	 * Init Search Types
	 */
	function mkdSearch() {
		var searchOpener = $('a.mkd-search-opener'),
			searchForm,
			searchClose;
		
		if ( searchOpener.length > 0 ) {
			//Check for type of search
			if ( mkd.body.hasClass( 'mkd-fullscreen-search' ) ) {
				searchClose = $( '.mkd-fullscreen-search-close' );
				mkdFullscreenSearch();
				
			} else if ( mkd.body.hasClass( 'mkd-slide-from-header-bottom' ) ) {
				mkdSearchSlideFromHeaderBottom();
				
			} else if ( mkd.body.hasClass( 'mkd-search-covers-header' ) ) {
				mkdSearchCoversHeader();
				
			} else if ( mkd.body.hasClass( 'mkd-search-slides-from-window-top' ) ) {
				searchForm = $('.mkd-search-slide-window-top');
				searchClose = $('.mkd-swt-search-close');
				mkdSearchWindowTop();
			}
		}
		
		/**
		 * Fullscreen search fade
		 */
		function mkdFullscreenSearch() {
			var searchHolder = $('.mkd-fullscreen-search-holder');
			
			searchOpener.on('click',function (e) {
				e.preventDefault();
				
				if (searchHolder.hasClass('mkd-animate')) {
					mkd.body.removeClass('mkd-fullscreen-search-opened mkd-search-fade-out');
					mkd.body.removeClass('mkd-search-fade-in');
					searchHolder.removeClass('mkd-animate');
					
					setTimeout(function () {
						searchHolder.find('.mkd-search-field').val('');
						searchHolder.find('.mkd-search-field').blur();
					}, 300);
					
					mkd.modules.common.mkdEnableScroll();
				} else {
					mkd.body.addClass('mkd-fullscreen-search-opened mkd-search-fade-in');
					mkd.body.removeClass('mkd-search-fade-out');
					searchHolder.addClass('mkd-animate');
					
					setTimeout(function () {
						searchHolder.find('.mkd-search-field').focus();
					}, 900);
					
					mkd.modules.common.mkdDisableScroll();
				}
				
				searchClose.on('click',function (e) {
					e.preventDefault();
					mkd.body.removeClass('mkd-fullscreen-search-opened mkd-search-fade-in');
					mkd.body.addClass('mkd-search-fade-out');
					searchHolder.removeClass('mkd-animate');
					
					setTimeout(function () {
						searchHolder.find('.mkd-search-field').val('');
						searchHolder.find('.mkd-search-field').blur();
					}, 300);
					
					mkd.modules.common.mkdEnableScroll();
				});
				
				//Close on click away
				$(document).mouseup(function (e) {
					var container = $(".mkd-form-holder-inner");
					
					if (!container.is(e.target) && container.has(e.target).length === 0) {
						e.preventDefault();
						mkd.body.removeClass('mkd-fullscreen-search-opened mkd-search-fade-in');
						mkd.body.addClass('mkd-search-fade-out');
						searchHolder.removeClass('mkd-animate');
						
						setTimeout(function () {
							searchHolder.find('.mkd-search-field').val('');
							searchHolder.find('.mkd-search-field').blur();
						}, 300);
						
						mkd.modules.common.mkdEnableScroll();
					}
				});
				
				//Close on escape
				$(document).keyup(function (e) {
					if (e.keyCode === 27) { //KeyCode for ESC button is 27
						mkd.body.removeClass('mkd-fullscreen-search-opened mkd-search-fade-in');
						mkd.body.addClass('mkd-search-fade-out');
						searchHolder.removeClass('mkd-animate');
						
						setTimeout(function () {
							searchHolder.find('.mkd-search-field').val('');
							searchHolder.find('.mkd-search-field').blur();
						}, 300);
						
						mkd.modules.common.mkdEnableScroll();
					}
				});
			});
			
			//Text input focus change
			var inputSearchField = $('.mkd-fullscreen-search-holder .mkd-search-field'),
				inputSearchLine = $('.mkd-fullscreen-search-holder .mkd-field-holder .mkd-line');
			
			inputSearchField.focus(function () {
				inputSearchLine.css('width', '100%');
			});
			
			inputSearchField.blur(function () {
				inputSearchLine.css('width', '0');
			});
		}
		
		/**
		 * Search covers header type of search
		 */
		function mkdSearchCoversHeader() {
			searchOpener.on('click',function (e) {
				e.preventDefault();
				
				var thisSearchOpener = $(this),
					searchFormHeight,
					searchFormHeaderHolder = $('.mkd-page-header'),
					searchFormTopHeaderHolder = $('.mkd-top-bar'),
					searchFormFixedHeaderHolder = searchFormHeaderHolder.find('.mkd-fixed-wrapper.fixed'),
					searchFormMobileHeaderHolder = $('.mkd-mobile-header'),
					searchForm = $('.mkd-search-cover'),
					searchFormIsInTopHeader = !!thisSearchOpener.parents('.mkd-top-bar').length,
					searchFormIsInFixedHeader = !!thisSearchOpener.parents('.mkd-fixed-wrapper.fixed').length,
					searchFormIsInStickyHeader = !!thisSearchOpener.parents('.mkd-sticky-header').length,
					searchFormIsInMobileHeader = !!thisSearchOpener.parents('.mkd-mobile-header').length;
				
				searchForm.removeClass('mkd-is-active');
				
				//Find search form position in header and height
				if (searchFormIsInTopHeader) {
					searchFormHeight = mkdGlobalVars.vars.mkdTopBarHeight;
					searchFormTopHeaderHolder.find('.mkd-search-cover').addClass('mkd-is-active');
					
				} else if (searchFormIsInFixedHeader) {
					searchFormHeight = searchFormFixedHeaderHolder.outerHeight();
					searchFormHeaderHolder.children('.mkd-search-cover').addClass('mkd-is-active');
					
				} else if (searchFormIsInStickyHeader) {
					searchFormHeight = mkdGlobalVars.vars.mkdStickyHeaderHeight;
					searchFormHeaderHolder.children('.mkd-search-cover').addClass('mkd-is-active');
					
				} else if (searchFormIsInMobileHeader) {
					if(searchFormMobileHeaderHolder.hasClass('mobile-header-appear')) {
						searchFormHeight = searchFormMobileHeaderHolder.children('.mkd-mobile-header-inner').outerHeight();
					} else {
						searchFormHeight = searchFormMobileHeaderHolder.outerHeight();
					}
					
					searchFormMobileHeaderHolder.find('.mkd-search-cover').addClass('mkd-is-active');
					
				} else {
					searchFormHeight = searchFormHeaderHolder.outerHeight();
					searchFormHeaderHolder.children('.mkd-search-cover').addClass('mkd-is-active');
				}
				
				if(searchForm.hasClass('mkd-is-active')) {
					searchForm.height(searchFormHeight).stop(true).fadeIn(600).find('input[type="text"]').focus();
				}
				
				searchForm.find('.mkd-search-close').on('click',function (e) {
					e.preventDefault();
					searchForm.stop(true).fadeOut(450);
				});
				
				searchForm.blur(function () {
					searchForm.stop(true).fadeOut(450);
				});
				
				$(window).scroll(function(){
					searchForm.stop(true).fadeOut(450);
				});
			});
		}
		
		/**
		 * Search slides from window top type of search
		 */
		function mkdSearchWindowTop() {
			searchOpener.on('click', function(e) {
				e.preventDefault();
				
				if ( searchForm.height() === "0") {
					$('.mkd-search-slide-window-top input[type="text"]').focus();
					//Push header bottom
					mkd.body.addClass('mkd-search-open');
				} else {
					mkd.body.removeClass('mkd-search-open');
				}
				
				$(window).scroll(function() {
					if ( searchForm.height() !== 0 && mkd.scroll > 50 ) {
						mkd.body.removeClass('mkd-search-open');
					}
				});
				
				searchClose.on('click',function(e){
					e.preventDefault();
					mkd.body.removeClass('mkd-search-open');
				});
			});
		}
		
		/**
		 * Search slide from header bottom type of search
		 */
		function mkdSearchSlideFromHeaderBottom() {
			searchOpener.on('click', function(e) {
				e.preventDefault();
				
				var thisSearchOpener = $(this),
					searchIconPosition = parseInt(mkd.windowWidth - thisSearchOpener.offset().left - thisSearchOpener.outerWidth());
				
				if(mkd.body.hasClass('mkd-boxed') && mkd.windowWidth > 1024) {
					searchIconPosition -= parseInt((mkd.windowWidth - $('.mkd-boxed .mkd-wrapper .mkd-wrapper-inner').outerWidth()) / 2);
				}
				
				var searchFormHeaderHolder = $('.mkd-page-header'),
					searchFormTopOffset = '100%',
					searchFormTopHeaderHolder = $('.mkd-top-bar'),
					searchFormFixedHeaderHolder = searchFormHeaderHolder.find('.mkd-fixed-wrapper.fixed'),
					searchFormMobileHeaderHolder = $('.mkd-mobile-header'),
					searchForm = $('.mkd-slide-from-header-bottom-holder'),
					searchFormIsInTopHeader = !!thisSearchOpener.parents('.mkd-top-bar').length,
					searchFormIsInFixedHeader = !!thisSearchOpener.parents('.mkd-fixed-wrapper.fixed').length,
					searchFormIsInStickyHeader = !!thisSearchOpener.parents('.mkd-sticky-header').length,
					searchFormIsInMobileHeader = !!thisSearchOpener.parents('.mkd-mobile-header').length;
				
				searchForm.removeClass('mkd-is-active');
				
				//Find search form position in header and height
				if (searchFormIsInTopHeader) {
					searchFormTopHeaderHolder.find('.mkd-slide-from-header-bottom-holder').addClass('mkd-is-active');
					
				} else if (searchFormIsInFixedHeader) {
					searchFormTopOffset = searchFormFixedHeaderHolder.outerHeight() + mkdGlobalVars.vars.mkdAddForAdminBar;
					searchFormHeaderHolder.children('.mkd-slide-from-header-bottom-holder').addClass('mkd-is-active');
					
				} else if (searchFormIsInStickyHeader) {
					searchFormTopOffset = mkdGlobalVars.vars.mkdStickyHeaderHeight + mkdGlobalVars.vars.mkdAddForAdminBar;
					searchFormHeaderHolder.children('.mkd-slide-from-header-bottom-holder').addClass('mkd-is-active');
					
				} else if (searchFormIsInMobileHeader) {
					if(searchFormMobileHeaderHolder.hasClass('mobile-header-appear')) {
						searchFormTopOffset = searchFormMobileHeaderHolder.children('.mkd-mobile-header-inner').outerHeight() + mkdGlobalVars.vars.mkdAddForAdminBar;
					}
					searchFormMobileHeaderHolder.find('.mkd-slide-from-header-bottom-holder').addClass('mkd-is-active');
					
				} else {
					searchFormHeaderHolder.children('.mkd-slide-from-header-bottom-holder').addClass('mkd-is-active');
				}
				
				if(searchForm.hasClass('mkd-is-active')) {
					searchForm.css({'right': searchIconPosition, 'top': searchFormTopOffset}).stop(true).slideToggle(300, 'easeOutBack');
				}
				
				//Close on escape
				$(document).keyup(function(e){
					if (e.keyCode === 27 ) { //KeyCode for ESC button is 27
						searchForm.stop(true).fadeOut(0);
					}
				});
				
				$(window).scroll(function(){
					searchForm.stop(true).fadeOut(0);
				});
			});
		}
	}

})(jQuery);

(function($) {
    "use strict";

    var sidearea = {};
    mkd.modules.sidearea = sidearea;

    sidearea.mkdOnDocumentReady = mkdOnDocumentReady;

    $(document).ready(mkdOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdOnDocumentReady() {
	    mkdSideArea();
	    mkdSideAreaScroll();
    }
	
	/**
	 * Show/hide side area
	 */
	function mkdSideArea() {
		var wrapper = $('.mkd-wrapper'),
			sideMenuButtonOpen = $('a.mkd-side-menu-button-opener'),
			cssClass = 'mkd-right-side-menu-opened';
		
		wrapper.prepend('<div class="mkd-cover"/>');
		
		$('a.mkd-side-menu-button-opener, a.mkd-close-side-menu').on('click', function(e) {
			e.preventDefault();
			
			if(!sideMenuButtonOpen.hasClass('opened')) {
				sideMenuButtonOpen.addClass('opened');
				mkd.body.addClass(cssClass);
				
				$('.mkd-wrapper .mkd-cover').on('click',function() {
					mkd.body.removeClass('mkd-right-side-menu-opened');
					sideMenuButtonOpen.removeClass('opened');
				});
				
				var currentScroll = $(window).scrollTop();
				$(window).scroll(function() {
					if(Math.abs(mkd.scroll - currentScroll) > 400){
						mkd.body.removeClass(cssClass);
						sideMenuButtonOpen.removeClass('opened');
					}
				});
			} else {
				sideMenuButtonOpen.removeClass('opened');
				mkd.body.removeClass(cssClass);
			}
		});
	}
	
	/*
	 **  Smooth scroll functionality for Side Area
	 */
	function mkdSideAreaScroll(){
		var sideMenu = $('.mkd-side-menu');
		
		if(sideMenu.length){
			sideMenu.niceScroll({
				scrollspeed: 60,
				mousescrollstep: 40,
				cursorwidth: 0,
				cursorborder: 0,
				cursorborderradius: 0,
				cursorcolor: "transparent",
				autohidemode: false,
				horizrailenabled: false
			});
		}
	}

})(jQuery);

(function($) {
    "use strict";

    var title = {};
    mkd.modules.title = title;

    title.mkdOnDocumentReady = mkdOnDocumentReady;

    $(document).ready(mkdOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdOnDocumentReady() {
	    mkdParallaxTitle();
    }

    /*
     **	Title image with parallax effect
     */
	function mkdParallaxTitle() {
		var parallaxBackground = $('.mkd-title-holder.mkd-bg-parallax');
		
		if (parallaxBackground.length > 0 && mkd.windowWidth > 1024) {
			var parallaxBackgroundWithZoomOut = parallaxBackground.hasClass('mkd-bg-parallax-zoom-out'),
				titleHeight = parseInt(parallaxBackground.data('height')),
				imageWidth = parseInt(parallaxBackground.data('background-width')),
				parallaxRate = titleHeight / 10000 * 7,
				parallaxYPos = -(mkd.scroll * parallaxRate),
				adminBarHeight = mkdGlobalVars.vars.mkdAddForAdminBar;
			
			parallaxBackground.css({'background-position': 'center ' + (parallaxYPos + adminBarHeight) + 'px'});
			
			if (parallaxBackgroundWithZoomOut) {
				parallaxBackground.css({'background-size': imageWidth - mkd.scroll + 'px auto'});
			}
			
			//set position of background on window scroll
			$(window).scroll(function () {
				parallaxYPos = -(mkd.scroll * parallaxRate);
				parallaxBackground.css({'background-position': 'center ' + (parallaxYPos + adminBarHeight) + 'px'});
				
				if (parallaxBackgroundWithZoomOut) {
					parallaxBackground.css({'background-size': imageWidth - mkd.scroll + 'px auto'});
				}
			});
		}
	}

})(jQuery);

(function ($) {
    'use strict';

    var woocommerce = {};
    mkd.modules.woocommerce = woocommerce;
    //var loadMoreLoadingText = mkdGlobalVars.vars.mkdPtfLoadMoreMessage;

    woocommerce.mkdOnDocumentReady = mkdOnDocumentReady;
    woocommerce.mkdOnWindowLoad = mkdOnWindowLoad;
    woocommerce.mkdOnWindowResize = mkdOnWindowResize;

    $(document).ready(mkdOnDocumentReady);
    $(window).load(mkdOnWindowLoad);
    $(window).resize(mkdOnWindowResize);

    /* 
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdOnDocumentReady() {
        mkdInitQuantityButtons();
        mkdInitSelect2();
        mkdInitSingleProductLightbox();
        mkdAccessoriesTab();
        mkdInitProductListFilter().init();
        mkdProductSearch();
        mkdYithCompareRemove();
    }

    /* 
     All functions to be called on $(window).load() should be in this function
     */
    function mkdOnWindowLoad() {
        mkdInitProductListMasonryShortcode();
    }

    /* 
     All functions to be called on $(window).resize() should be in this function
     */
    function mkdOnWindowResize() {
        mkdInitProductListMasonryShortcode();
    }

    /*
     ** Remove product list item from YITH Compare Popup on click
     */
    function mkdYithCompareRemove() {
        var listItems = $('.mkd-pli-popup');

        listItems.each(function () {
            var listItem = $(this);
            var removeLink = $(this).find('.remove a');

            removeLink.on('click', function () {
                listItem.remove();
            });

        });
    }

    /*
     ** Init quantity buttons to increase/decrease products for cart
     */
    function mkdInitQuantityButtons() {
        $(document).on('click', '.mkd-quantity-minus, .mkd-quantity-plus', function (e) {
            e.stopPropagation();

            var button = $(this),
                inputField = button.siblings('.mkd-quantity-input'),
                step = parseFloat(inputField.data('step')),
                max = parseFloat(inputField.data('max')),
                minus = false,
                inputValue = parseFloat(inputField.val()),
                newInputValue;

            if (button.hasClass('mkd-quantity-minus')) {
                minus = true;
            }

            if (minus) {
                newInputValue = inputValue - step;
                if (newInputValue >= 1) {
                    inputField.val(newInputValue);
                } else {
                    inputField.val(0);
                }
            } else {
                newInputValue = inputValue + step;
                if (max === undefined) {
                    inputField.val(newInputValue);
                } else {
                    if (newInputValue >= max) {
                        inputField.val(max);
                    } else {
                        inputField.val(newInputValue);
                    }
                }
            }

            inputField.trigger('change');
        });
    }

    /*
     ** Init select2 script for select html dropdowns
     */
    function mkdInitSelect2() {

        var orderByDropDown = $('.woocommerce-ordering .orderby');
        if (orderByDropDown.length) {
            orderByDropDown.select2({
                minimumResultsForSearch: Infinity
            });
        }

        var variableProducts = $('.mkd-woocommerce-page .mkd-content .variations td.value select');
        if (variableProducts.length) {
            variableProducts.select2();
        }

        var shippingCountryCalc = $('#calc_shipping_country');
        if (shippingCountryCalc.length) {
            shippingCountryCalc.select2();
        }

        var shippingStateCalc = $('.cart-collaterals .shipping select#calc_shipping_state');
        if (shippingStateCalc.length) {
            shippingStateCalc.select2();
        }

        var singleProductVariation = $('.mkd-woo-single-page .variations select');
        if (singleProductVariation.length) {
            singleProductVariation.select2();
        }
    }

    /*
     ** Init Product Single Pretty Photo attributes
     */
    function mkdInitSingleProductLightbox() {
        var item = $('.mkd-woo-single-page.mkd-woo-single-has-pretty-photo .images .woocommerce-product-gallery__image');

        if (item.length) {
            item.children('a').attr('data-rel', 'prettyPhoto[woo_single_pretty_photo]');

            if (typeof mkd.modules.common.mkdPrettyPhoto === "function") {
                mkd.modules.common.mkdPrettyPhoto();
            }
        }
    }

    function mkdAccessoriesTab() {
        var totalPrice = $('#mkd-total-price-value');
        var itemsNumber = $('#mkd-items-number');

        var totalPriceVal =  totalPrice.data('total-price');
        var addition = 1;
        var itemsNumberVal = parseInt(itemsNumber.text());

        var checkboxes = $('.mkd-product-accessories-list .mkd-product-check');

        checkboxes.each(function () {
            var checkbox = $(this);

            checkbox.change(function () {
                if (!(this).checked) {
                    addition = -1;
                    checkbox.next().val("0");
                }
                else {
                    checkbox.next().val("1");
                    addition = 1;
                }

                itemsNumberVal += addition;

                totalPriceVal += (addition * checkbox.data('price'));

                totalPrice.html(totalPriceVal.toFixed(2));
                $('#mkd-total-price-value').data('total-price', totalPriceVal);
                itemsNumber.html(itemsNumberVal);
            });
        });
    }

    /*
     ** Resize Product List Advanced - Blocks(masonry gallery) layout Shortcode Layout
     */
    function mkdResizeProductMasonry(container) {

        var size = container.find('.mkd-pl-sizer').width() * 0.46;

        var defaultMasonryItem = container.find('.mkd-pla-position-left');
        var largeHeightMasonryItem = container.find('.mkd-pla-position-middle');

        defaultMasonryItem.css('height', size);
        largeHeightMasonryItem.css('height', 2 * size);
    }


    /*
     ** Init Product List Masonry Shortcode Layout
     */
    function mkdInitProductListMasonryShortcode() {
        var container = $('.mkd-pl-holder.mkd-masonry-type .mkd-pl-outer');

        if (container.length) {
            container.each(function () {
                var thisContainer = $(this);

                if (thisContainer.parent().hasClass('mkd-pl-masonry-gallery-layout')) {
                    mkdResizeProductMasonry(thisContainer);
                }

                thisContainer.waitForImages(function () {
                    thisContainer.isotope({
                        itemSelector: '.mkd-pli',
                        resizable: false,
                        masonry: {
                            columnWidth: '.mkd-pl-sizer',
                            gutter: '.mkd-pl-gutter'
                        }
                    });

                    setTimeout(function () {
                        if (typeof mkd.modules.common.mkdInitParallax === "function") {
                            mkd.modules.common.mkdInitParallax();
                        }
                    }, 1000);

                    thisContainer.isotope('layout').css('opacity', 1);
                });
            });
        }
    }

    function mkdInitProductListFilter() {
        var productList = $('.mkd-pl-holder');
        var queryParams = {};

        var initFilterClick = function (thisProductList) {
            var links = thisProductList.find('.mkd-pl-categories a, .mkd-pl-ordering a, .mkd-pl-layouts a');

            links.on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                thisProductList.addClass("mkd-pl-loading");

                var clickedLink = $(this);
                if (!clickedLink.hasClass('active')) {
                    initMainPagFunctionality(thisProductList, clickedLink);
                }
            });
        };

        //used for replacing content after ajax call
        var mkdReplaceStandardContent = function (thisProductListInner, loader, responseHtml) {
            thisProductListInner.html(responseHtml);
            loader.fadeOut();
        };

        //used for replacing content after ajax call
        var mkdReplaceMasonryContent = function (thisProductListInner, loader, responseHtml) {
            thisProductListInner.find('.mkd-pli').remove();
            thisProductListInner.find('.mkd-no-posts').remove();

            thisProductListInner.append(responseHtml).isotope('reloadItems').isotope({sortBy: 'original-order'});

            if (thisProductListInner.parent().hasClass('mkd-pl-masonry-gallery-layout')) {
                mkdResizeProductMasonry(thisProductListInner);
            }

            setTimeout(function () {

                thisProductListInner.isotope('layout');
                loader.fadeOut();
            }, 400);
        };

        //used for storing parameters in global object
        var mkdReturnOrderingParemeters = function (queryParams, data) {

            for (var key in data) {
                if(typeof(data) !== 'undefined') {
                    queryParams[key] = data[key];
                }
            }

            //store ordering parameters
            switch (queryParams.ordering) {
                case '':
                    queryParams.metaKey = '';
                    queryParams.order = '';
                    queryParams.orderby = '';
                    break;
                case 'popularity':
                    queryParams.metaKey = 'total_sales';
                    queryParams.order = 'desc';
                    queryParams.orderby = 'meta_value_num';
                    break;
                case 'rating':
                    queryParams.metaKey = '_wc_average_rating';
                    queryParams.order = 'desc';
                    queryParams.orderby = 'meta_value_num';
                    break;
                case 'newness':
                    queryParams.metaKey = '';
                    queryParams.order = 'desc';
                    queryParams.orderby = 'date';
                    break;
                case 'price':
                    queryParams.metaKey = '_price';
                    queryParams.order = 'asc';
                    queryParams.orderby = 'meta_value_num';
                    break;
                case 'price-desc':
                    queryParams.metaKey = '_price';
                    queryParams.order = 'desc';
                    queryParams.orderby = 'meta_value_num';
                    break;
            }

            return queryParams;
        };

        var initMainPagFunctionality = function (thisProductList, clickedLink) {
            var thisProductListInner = thisProductList.find('.mkd-pl-outer');

            var loadData = mkd.modules.common.getLoadMoreData(thisProductList),
                loader = thisProductList.find('.mkd-prl-loading');


            //store parameters in global object
            mkdReturnOrderingParemeters(queryParams, clickedLink.data());

            //set paremeters for new query passed through ajax
            loadData.layout = queryParams.layout !== undefined ? queryParams.layout : loadData.layout;
            loadData.order = queryParams.order !== undefined && queryParams.order !== '' ? queryParams.order : loadData.order;
            loadData.orderby = queryParams.orderby !== undefined && queryParams.orderby !== '' ? queryParams.orderby : loadData.orderby;
            loadData.category = queryParams.category !== undefined && queryParams.category !== '' ? queryParams.category : loadData.category;


            loadData.metaKey = queryParams.metaKey !== undefined ? queryParams.metaKey : '';
            loadData.minPrice = queryParams.minprice !== undefined ? queryParams.minprice : '';
            loadData.maxPrice = queryParams.maxprice !== undefined ? queryParams.maxprice : '';

            loader.fadeIn();

            var ajaxData;

            if (thisProductList.hasClass('mkd-pl-holder-advanced')) {
                ajaxData = mkd.modules.common.setLoadMoreAjaxData(loadData, 'mkd_product_advanced_ajax_load_category');
            }
            else {
                ajaxData = mkd.modules.common.setLoadMoreAjaxData(loadData, 'mkd_product_ajax_load_category');
            }

            $.ajax({
                type: 'POST',
                data: ajaxData,
                url: mkdGlobalVars.vars.mkdAjaxUrl,
                success: function (data) {
                    var response = $.parseJSON(data),
                        responseHtml = response.html;

                    thisProductList.waitForImages(function () {
                        clickedLink.parent().siblings().find('a').removeClass('active');
                        clickedLink.addClass('active');
                        if (thisProductList.hasClass('mkd-masonry-type')) {
                            mkdReplaceMasonryContent(thisProductListInner, loader, responseHtml);
                        } else {
                            mkdReplaceStandardContent(thisProductListInner, loader, responseHtml);
                        }

                        thisProductList.removeClass("mkd-pl-loading");
                        
                    });

                }
            });
        };

        var initMobileFilterClick = function (cliked, holder) {
            cliked.on('click', function () {
                if (mkd.windowWidth <= 768) {
                    if (!cliked.hasClass('opened')) {
                        cliked.addClass('opened');
                        holder.slideDown();
                    } else {
                        cliked.removeClass('opened');
                        holder.slideUp();
                    }
                }
            });
        };

        return {
            init: function () {
                if (productList.length) {
                    productList.each(function () {
                        var thisProductList = $(this);
                        initFilterClick(thisProductList);

                        initMobileFilterClick(thisProductList.find('.mkd-pl-ordering-outer h6'), thisProductList.find('.mkd-pl-ordering'));
                        initMobileFilterClick(thisProductList.find('.mkd-pl-categories-label'), thisProductList.find('.mkd-pl-categories-label').next('ul'));
                    });
                }
            }

        };
    }

    function mkdProductSearch() {
        if(typeof(mkdProductList) !== 'undefined' && mkdProductList.products.length) {

            var searchForms = $('.mkd-product-search-holder form');

            var productArray = mkdProductList.products;

            var productSuggestion = function (data) {

                var suggestionTemplate = '<div><div class="mkd-product-search-item">';

                //thumbnail
                if(data.thumb) {
                    suggestionTemplate += '<div class="mkd-product-search-image"><img src="' + data.thumb + '" alt="product-featured-image"/></div>';
                }

                //content holder
                suggestionTemplate += '<div class="mkd-product-search-item-content">';

                //product categories

                suggestionTemplate += '<div class="mkd-product-search-item-cat">';

                var product_cat_length = data.product_cat.length;

                for (var i = 0; i < product_cat_length; i++) {

                    suggestionTemplate += data.product_cat[i];

                    if (i !== product_cat_length - 1) {
                        suggestionTemplate += ', ';
                    }
                }

                suggestionTemplate += '</div>';

                //product title
                if(data.post_title) {
                    suggestionTemplate += '<h5 class="mkd-product-search-title">' + data.post_title + '</h5>';
                }

                //product price
                if(data.price) {
                    suggestionTemplate += '<div class="mkd-product-search-price">' + data.price + '</div>';
                }

                suggestionTemplate += '</div></div>';

                return suggestionTemplate;
            };


            var productArrayBl = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('post_title'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: productArray
            });

            searchForms.find('.mkd-product-search').typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                },
                {
                    name: 's',
                    display: 'post_title',
                    source: productArrayBl,
                    templates: {
                        suggestion: productSuggestion
                    }
                });

            searchForms.each(function () {
                var searchForm = $(this);


                //change typeahead on category change

                var selectElement = $(this).find('.mkd-product-category')[0];

                selectElement.onchange = function () {
                    var selectedValue = selectElement.options[selectElement.selectedIndex].value;
                    var productCatArray = [];

                    var productCatArrayBl = new Bloodhound({
                        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('post_title'),
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        local: function () {

                            if (selectedValue !== '') {

                                var arrayLength = productArray.length;

                                for (var i = 0; i < arrayLength; i++) {
                                    if (productArray[i].product_cat.indexOf(selectedValue) !== -1) {
                                        productCatArray.push(productArray[i]);
                                    }
                                }

                                return productCatArray;
                            }
                            else {
                                return productArray;
                            }
                        }
                    });

                    searchForm.find('.mkd-product-search').typeahead('destroy');

                    searchForm.find('.mkd-product-search').typeahead({
                            hint: true,
                            highlight: true,
                            minLength: 1
                        },
                        {
                            name: 's',
                            display: 'post_title',
                            source: productCatArrayBl,
                            templates: {
                                suggestion: productSuggestion
                            }
                        });

                };

                $(".tt-suggestion").live('click', function () {
                    setTimeout(function () {
                        $(".mkd-product-search-submit").trigger("click");
                    }, 100);
                });


            });
        }
    }

})(jQuery);
(function($) {
    'use strict';
	
	var accordions = {};
	mkd.modules.accordions = accordions;
	
	accordions.mkdInitAccordions = mkdInitAccordions;
	
	
	accordions.mkdOnDocumentReady = mkdOnDocumentReady;
	
	$(document).ready(mkdOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		mkdInitAccordions();
	}
	
	/**
	 * Init accordions shortcode
	 */
	function mkdInitAccordions(){
		var accordion = $('.mkd-accordion-holder');
		
		if(accordion.length){
			accordion.each(function(){
				var thisAccordion = $(this);

				if(thisAccordion.hasClass('mkd-accordion')){
					thisAccordion.accordion({
						animate: "swing",
						collapsible: true,
						active: 0,
						icons: "",
						heightStyle: "content"
					});
				}

				if(thisAccordion.hasClass('mkd-toggle')){
					var toggleAccordion = $(this),
						toggleAccordionTitle = toggleAccordion.find('.mkd-accordion-title'),
						toggleAccordionContent = toggleAccordionTitle.next();

					toggleAccordion.addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset");
					toggleAccordionTitle.addClass("ui-accordion-header ui-state-default ui-corner-top ui-corner-bottom");
					toggleAccordionContent.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide();

					toggleAccordionTitle.each(function(){
						var thisTitle = $(this);
						
						thisTitle.on('mouseenter mouseleave', function(){
							thisTitle.toggleClass("ui-state-hover");
						});

						thisTitle.on('click',function(){
							thisTitle.toggleClass('ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom');
							thisTitle.next().toggleClass('ui-accordion-content-active').slideToggle(400);
						});
					});
				}
			});
		}
	}

})(jQuery);
(function($) {
	'use strict';
	
	var animationHolder = {};
	mkd.modules.animationHolder = animationHolder;
	
	animationHolder.mkdInitAnimationHolder = mkdInitAnimationHolder;
	
	
	animationHolder.mkdOnDocumentReady = mkdOnDocumentReady;
	
	$(document).ready(mkdOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		mkdInitAnimationHolder();
	}
	
	/*
	 *	Init animation holder shortcode
	 */
	function mkdInitAnimationHolder(){
		var elements = $('.mkd-grow-in, .mkd-fade-in-down, .mkd-element-from-fade, .mkd-element-from-left, .mkd-element-from-right, .mkd-element-from-top, .mkd-element-from-bottom, .mkd-flip-in, .mkd-x-rotate, .mkd-z-rotate, .mkd-y-translate, .mkd-fade-in, .mkd-fade-in-left-x-rotate'),
			animationClass,
			animationData,
			animationDelay;
		
		if(elements.length){
			elements.each(function(){
				var thisElement = $(this);
				
				thisElement.appear(function() {
					animationData = thisElement.data('animation');
					animationDelay = parseInt(thisElement.data('animation-delay'));
					
					if(typeof animationData !== 'undefined' && animationData !== '') {
						animationClass = animationData;
						var newClass = animationClass+'-on';
						
						setTimeout(function(){
							thisElement.addClass(newClass);
						},animationDelay);
					}
				},{accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var button = {};
	mkd.modules.button = button;
	
	button.mkdButton = mkdButton;
	
	
	button.mkdOnDocumentReady = mkdOnDocumentReady;
	
	$(document).ready(mkdOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		mkdButton().init();
	}
	
	/**
	 * Button object that initializes whole button functionality
	 * @type {Function}
	 */
	var mkdButton = function() {
		//all buttons on the page
		var buttons = $('.mkd-btn');
		
		/**
		 * Initializes button hover color
		 * @param button current button
		 */
		var buttonHoverColor = function(button) {
			if(typeof button.data('hover-color') !== 'undefined') {
				var changeButtonColor = function(event) {
					event.data.button.css('color', event.data.color);
				};
				
				var originalColor = button.css('color');
				var hoverColor = button.data('hover-color');
				
				button.on('mouseenter', { button: button, color: hoverColor }, changeButtonColor);
				button.on('mouseleave', { button: button, color: originalColor }, changeButtonColor);
			}
		};
		
		/**
		 * Initializes button hover background color
		 * @param button current button
		 */
		var buttonHoverBgColor = function(button) {
			if(typeof button.data('hover-bg-color') !== 'undefined') {
				var changeButtonBg = function(event) {
					event.data.button.css('background-color', event.data.color);
				};
				
				var originalBgColor = button.css('background-color');
				var hoverBgColor = button.data('hover-bg-color');
				
				button.on('mouseenter', { button: button, color: hoverBgColor }, changeButtonBg);
				button.on('mouseleave', { button: button, color: originalBgColor }, changeButtonBg);
			}
		};
		
		/**
		 * Initializes button border color
		 * @param button
		 */
		var buttonHoverBorderColor = function(button) {
			if(typeof button.data('hover-border-color') !== 'undefined') {
				var changeBorderColor = function(event) {
					event.data.button.css('border-color', event.data.color);
				};
				
				var originalBorderColor = button.css('borderTopColor'); //take one of the four sides
				var hoverBorderColor = button.data('hover-border-color');
				
				button.on('mouseenter', { button: button, color: hoverBorderColor }, changeBorderColor);
				button.on('mouseleave', { button: button, color: originalBorderColor }, changeBorderColor);
			}
		};
		
		return {
			init: function() {
				if(buttons.length) {
					buttons.each(function() {
						buttonHoverColor($(this));
						buttonHoverBgColor($(this));
						buttonHoverBorderColor($(this));
					});
				}
			}
		};
	};
	
})(jQuery);
(function($) {
	'use strict';
	
	var countdown = {};
	mkd.modules.countdown = countdown;
	
	countdown.mkdInitCountdown = mkdInitCountdown;
	
	
	countdown.mkdOnDocumentReady = mkdOnDocumentReady;
	
	$(document).ready(mkdOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		mkdInitCountdown();
	}
	
	/**
	 * Countdown Shortcode
	 */
	function mkdInitCountdown() {
		var countdowns = $('.mkd-countdown'),
			date = new Date(),
			currentMonth = date.getMonth(),
			year,
			month,
			day,
			hour,
			minute,
			timezone,
			monthLabel,
			dayLabel,
			hourLabel,
			minuteLabel,
			secondLabel;
		
		if (countdowns.length) {
			countdowns.each(function(){
				//Find countdown elements by id-s
				var countdownId = $(this).attr('id'),
					countdown = $('#'+countdownId),
					digitFontSize,
					labelFontSize;
				
				//Get data for countdown
				year = countdown.data('year');
				month = countdown.data('month');
				day = countdown.data('day');
				hour = countdown.data('hour');
				minute = countdown.data('minute');
				timezone = countdown.data('timezone');
				monthLabel = countdown.data('month-label');
				dayLabel = countdown.data('day-label');
				hourLabel = countdown.data('hour-label');
				minuteLabel = countdown.data('minute-label');
				secondLabel = countdown.data('second-label');
				digitFontSize = countdown.data('digit-size');
				labelFontSize = countdown.data('label-size');

				if( currentMonth != month ) {
					month = month - 1;
				}
				
				//Initialize countdown
				countdown.countdown({
					until: new Date(year, month, day, hour, minute, 44),
					labels: ['Years', monthLabel, 'Weeks', dayLabel, hourLabel, minuteLabel, secondLabel],
					format: 'ODHMS',
					timezone: timezone,
					padZeroes: true,
					onTick: setCountdownStyle
				});
				
				function setCountdownStyle() {
					countdown.find('.countdown-amount').css({
						'font-size' : digitFontSize+'px',
						'line-height' : digitFontSize+'px'
					});
					countdown.find('.countdown-period').css({
						'font-size' : labelFontSize+'px'
					});
				}
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var counter = {};
	mkd.modules.counter = counter;
	
	counter.mkdInitCounter = mkdInitCounter;
	
	
	counter.mkdOnDocumentReady = mkdOnDocumentReady;
	
	$(document).ready(mkdOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		mkdInitCounter();
	}
	
	/**
	 * Counter Shortcode
	 */
	function mkdInitCounter() {
		var counterHolder = $('.mkd-counter-holder');
		
		if (counterHolder.length) {
			counterHolder.each(function() {
				var thisCounterHolder = $(this),
					thisCounter = thisCounterHolder.find('.mkd-counter');
				
				thisCounterHolder.appear(function() {
					thisCounterHolder.css('opacity', '1');
					
					//Counter zero type
					if (thisCounter.hasClass('mkd-zero-counter')) {
						var max = parseFloat(thisCounter.text());
						thisCounter.countTo({
							from: 0,
							to: max,
							speed: 1500,
							refreshInterval: 100
						});
					} else {
						thisCounter.absoluteCounter({
							speed: 2000,
							fadeInDelay: 1000
						});
					}
				},{accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var customFont = {};
	mkd.modules.customFont = customFont;
	
	customFont.mkdCustomFontResize = mkdCustomFontResize;
	
	
	customFont.mkdOnDocumentReady = mkdOnDocumentReady;
	customFont.mkdOnWindowResize = mkdOnWindowResize;
	
	$(document).ready(mkdOnDocumentReady);
	$(window).resize(mkdOnWindowResize);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		mkdCustomFontResize();
	}
	
	/* 
	 All functions to be called on $(window).resize() should be in this function
	 */
	function mkdOnWindowResize() {
		mkdCustomFontResize();
	}
	
	/*
	 **	Custom Font resizing style
	 */
	function mkdCustomFontResize(){
		var holder = $('.mkd-custom-font-holder');
		
		if(holder.length){
			holder.each(function() {
				var thisItem = $(this),
					itemClass = '',
					smallLaptopStyle = '',
					ipadLandscapeStyle = '',
					ipadPortraitStyle = '',
					mobileLandscapeStyle = '',
					style = '',
					responsiveStyle = '';
					
				if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
					itemClass = thisItem.data('item-class');
				}
				
				if (typeof thisItem.data('font-size-1280') !== 'undefined' && thisItem.data('font-size-1280') !== false) {
					smallLaptopStyle += 'font-size: ' + thisItem.data('font-size-1280') + ' !important;';
				}
				if (typeof thisItem.data('font-size-1024') !== 'undefined' && thisItem.data('font-size-1024') !== false) {
					ipadLandscapeStyle += 'font-size: ' + thisItem.data('font-size-1024') + ' !important;';
				}
				if (typeof thisItem.data('font-size-768') !== 'undefined' && thisItem.data('font-size-768') !== false) {
					ipadPortraitStyle += 'font-size: ' + thisItem.data('font-size-768') + ' !important;';
				}
				if (typeof thisItem.data('font-size-680') !== 'undefined' && thisItem.data('font-size-680') !== false) {
					mobileLandscapeStyle += 'font-size: ' + thisItem.data('font-size-680') + ' !important;';
				}
				
				if (typeof thisItem.data('line-height-1280') !== 'undefined' && thisItem.data('line-height-1280') !== false) {
					smallLaptopStyle += 'line-height: ' + thisItem.data('line-height-1280') + ' !important;';
				}
				if (typeof thisItem.data('line-height-1024') !== 'undefined' && thisItem.data('line-height-1024') !== false) {
					ipadLandscapeStyle += 'line-height: ' + thisItem.data('line-height-1024') + ' !important;';
				}
				if (typeof thisItem.data('line-height-768') !== 'undefined' && thisItem.data('line-height-768') !== false) {
					ipadPortraitStyle += 'line-height: ' + thisItem.data('line-height-768') + ' !important;';
				}
				if (typeof thisItem.data('line-height-680') !== 'undefined' && thisItem.data('line-height-680') !== false) {
					mobileLandscapeStyle += 'line-height: ' + thisItem.data('line-height-680') + ' !important;';
				}
				
				if(smallLaptopStyle.length || ipadLandscapeStyle.length || ipadPortraitStyle.length || mobileLandscapeStyle.length) {
					
					if(smallLaptopStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1280px) {.mkd-custom-font-holder."+itemClass+" { " + smallLaptopStyle + " } }";
					}
					if(ipadLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1024px) {.mkd-custom-font-holder."+itemClass+" { " + ipadLandscapeStyle + " } }";
					}
					if(ipadPortraitStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 768px) {.mkd-custom-font-holder."+itemClass+" { " + ipadPortraitStyle + " } }";
					}
					if(mobileLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 680px) {.mkd-custom-font-holder."+itemClass+" { " + mobileLandscapeStyle + " } }";
					}
				}
				
				if(responsiveStyle.length) {
					style = '<style type="text/css">'+responsiveStyle+'</style>';
				}
				
				if(style.length) {
					$('head').append(style);
				}
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var elementsHolder = {};
	mkd.modules.elementsHolder = elementsHolder;
	
	elementsHolder.mkdInitElementsHolderResponsiveStyle = mkdInitElementsHolderResponsiveStyle;
	
	
	elementsHolder.mkdOnDocumentReady = mkdOnDocumentReady;
	
	$(document).ready(mkdOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		mkdInitElementsHolderResponsiveStyle();
	}
	
	/*
	 **	Elements Holder responsive style
	 */
	function mkdInitElementsHolderResponsiveStyle(){
		var elementsHolder = $('.mkd-elements-holder');
		
		if(elementsHolder.length){
			elementsHolder.each(function() {
				var thisElementsHolder = $(this),
					elementsHolderItem = thisElementsHolder.children('.mkd-eh-item'),
					style = '',
					responsiveStyle = '';
				
				elementsHolderItem.each(function() {
					var thisItem = $(this),
						itemClass = '',
						largeLaptop = '',
						smallLaptop = '',
						ipadLandscape = '',
						ipadPortrait = '',
						mobileLandscape = '',
						mobilePortrait = '';
					
					if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
						itemClass = thisItem.data('item-class');
					}
					if (typeof thisItem.data('1280-1600') !== 'undefined' && thisItem.data('1280-1600') !== false) {
						largeLaptop = thisItem.data('1280-1600');
					}
					if (typeof thisItem.data('1024-1280') !== 'undefined' && thisItem.data('1024-1280') !== false) {
						smallLaptop = thisItem.data('1024-1280');
					}
					if (typeof thisItem.data('768-1024') !== 'undefined' && thisItem.data('768-1024') !== false) {
						ipadLandscape = thisItem.data('768-1024');
					}
					if (typeof thisItem.data('680-768') !== 'undefined' && thisItem.data('680-768') !== false) {
						ipadPortrait = thisItem.data('680-768');
					}
					if (typeof thisItem.data('680') !== 'undefined' && thisItem.data('680') !== false) {
						mobileLandscape = thisItem.data('680');
					}
					
					if(largeLaptop.length || smallLaptop.length || ipadLandscape.length || ipadPortrait.length || mobileLandscape.length || mobilePortrait.length) {
						
						if(largeLaptop.length) {
							responsiveStyle += "@media only screen and (min-width: 1281px) and (max-width: 1600px) {.mkd-eh-item-content."+itemClass+" { padding: "+largeLaptop+" !important; } }";
						}
						if(smallLaptop.length) {
							responsiveStyle += "@media only screen and (min-width: 1025px) and (max-width: 1280px) {.mkd-eh-item-content."+itemClass+" { padding: "+smallLaptop+" !important; } }";
						}
						if(ipadLandscape.length) {
							responsiveStyle += "@media only screen and (min-width: 769px) and (max-width: 1024px) {.mkd-eh-item-content."+itemClass+" { padding: "+ipadLandscape+" !important; } }";
						}
						if(ipadPortrait.length) {
							responsiveStyle += "@media only screen and (min-width: 681px) and (max-width: 768px) {.mkd-eh-item-content."+itemClass+" { padding: "+ipadPortrait+" !important; } }";
						}
						if(mobileLandscape.length) {
							responsiveStyle += "@media only screen and (max-width: 680px) {.mkd-eh-item-content."+itemClass+" { padding: "+mobileLandscape+" !important; } }";
						}
					}
				});
				
				if(responsiveStyle.length) {
					style = '<style type="text/css">'+responsiveStyle+'</style>';
				}
				
				if(style.length) {
					$('head').append(style);
				}
				
				if (typeof mkd.modules.common.mkdOwlSlider === "function") {
					mkd.modules.common.mkdOwlSlider();
				}
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var expandedGallery = {};
	mkd.modules.expandedGallery = expandedGallery;

	expandedGallery.mkdInitExpandedGallery = mkdInitExpandedGallery;


	expandedGallery.mkdOnDocumentReady = mkdOnDocumentReady;
	
	$(document).ready(mkdOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		mkdInitExpandedGallery();
	}

	/*
	 **	Init Expanded Gallery shortcode
	 */
	function mkdInitExpandedGallery(){
		var holder = $('.mkd-expanded-gallery');

		if(holder.length){
			holder.each(function() {
				var thisHolder = $(this),
					thisHolderImages = thisHolder.find('.mkd-eg-image');

				thisHolder.find('.mkd-eg-image:nth-child('+Math.ceil(thisHolderImages.length / 2)+')').addClass('mkd-eg-middle-item');

				thisHolder.appear(function() {
					thisHolder.find('.mkd-eg-middle-item').addClass('mkd-eg-show');

					setTimeout(function(){
						thisHolder.find('.mkd-eg-middle-item').prev().addClass('mkd-eg-show');
						thisHolder.find('.mkd-eg-middle-item').next().addClass('mkd-eg-show');
					},250);

					if (thisHolder.hasClass('mkd-eg-five')) {
						setTimeout(function(){
							thisHolder.find('.mkd-eg-middle-item').prev().prev().addClass('mkd-eg-show');
							thisHolder.find('.mkd-eg-middle-item').next().next().addClass('mkd-eg-show');
						},500);
					}
				}, {accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var fullScreenImageSlider = {};
	mkd.modules.fullScreenImageSlider = fullScreenImageSlider;
	
	
	fullScreenImageSlider.mkdOnWindowLoad = mkdOnWindowLoad;
	
	$(window).load(mkdOnWindowLoad);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnWindowLoad() {
		mkdInitFullScreenImageSlider();
	}
	
	/**
	 * Init Full Screen Image Slider Shortcode
	 */
	function mkdInitFullScreenImageSlider() {
		var holder = $('.mkd-fsis-slider');
		
		if (holder.length) {
			holder.each(function () {
				var sliderHolder = $(this),
					mainHolder = sliderHolder.parent(),
					prevThumbNav = mainHolder.children('.mkd-fsis-prev-nav'),
					nextThumbNav = mainHolder.children('.mkd-fsis-next-nav'),
					maskHolder = mainHolder.children('.mkd-fsis-slider-mask');
				
				mainHolder.addClass('mkd-fsis-is-init');
				
				mkdImageBehavior(sliderHolder);
				mkdPrevNextImageBehavior(sliderHolder, prevThumbNav, nextThumbNav, -1); // -1 is arbitrary value because 0 can be index of item
				
				sliderHolder.on('drag.owl.carousel', function () {
					setTimeout(function () {
						if (!maskHolder.hasClass('mkd-drag') && !mainHolder.hasClass('mkd-fsis-active')) {
							maskHolder.addClass('mkd-drag');
						}
					}, 200);
				});
				
				sliderHolder.on('dragged.owl.carousel', function () {
					setTimeout(function () {
						if (maskHolder.hasClass('mkd-drag')) {
							maskHolder.removeClass('mkd-drag');
						}
					}, 300);
				});
				
				sliderHolder.on('translate.owl.carousel', function (e) {
					mkdPrevNextImageBehavior(sliderHolder, prevThumbNav, nextThumbNav, e.item.index);
				});
				
				sliderHolder.on('translated.owl.carousel', function () {
					mkdImageBehavior(sliderHolder);
					
					setTimeout(function () {
						maskHolder.removeClass('mkd-drag');
					}, 300);
				});
			});
		}
	}
	
	function mkdImageBehavior(sliderHolder) {
		var activeItem = sliderHolder.find('.owl-item.active'),
			imageHolder = sliderHolder.find('.mkd-fsis-item');
		
		imageHolder.removeClass('mkd-fsis-content-image-init');
		
		mkdResetImageBehavior(sliderHolder);
		
		if (activeItem.length) {
			var activeImageHolder = activeItem.find('.mkd-fsis-item'),
				activeItemImage = activeImageHolder.children('.mkd-fsis-image');
			
			setTimeout(function () {
				activeImageHolder.addClass('mkd-fsis-content-image-init');
			}, 100);
			
			activeItemImage.off().on('mouseenter', function () {
				activeImageHolder.addClass('mkd-fsis-image-hover');
			}).on('mouseleave', function () {
				activeImageHolder.removeClass('mkd-fsis-image-hover');
			}).on('click', function () {
				if (activeImageHolder.hasClass('mkd-fsis-active-image')) {
					sliderHolder.trigger('play.owl.autoplay');
					sliderHolder.parent().removeClass('mkd-fsis-active');
					activeImageHolder.removeClass('mkd-fsis-active-image');
				} else {
					sliderHolder.trigger('stop.owl.autoplay');
					sliderHolder.parent().addClass('mkd-fsis-active');
					activeImageHolder.addClass('mkd-fsis-active-image');
				}
			});
			
			//Close on escape
			$(document).keyup(function (e) {
				if (e.keyCode === 27) { //KeyCode for ESC button is 27
					sliderHolder.trigger('play.owl.autoplay');
					sliderHolder.parent().removeClass('mkd-fsis-active');
					activeImageHolder.removeClass('mkd-fsis-active-image');
				}
			});
		}
	}
	
	function mkdPrevNextImageBehavior(sliderHolder, prevThumbNav, nextThumbNav, itemIndex) {
		var activeItem = itemIndex === -1 ? sliderHolder.find('.owl-item.active') : $(sliderHolder.find('.owl-item')[itemIndex]),
			prevItemImage = activeItem.prev().find('.mkd-fsis-image').css('background-image'),
			nextItemImage = activeItem.next().find('.mkd-fsis-image').css('background-image');
		
		if (prevItemImage.length) {
			prevThumbNav.css({'background-image': prevItemImage});
		}
		
		if (nextItemImage.length) {
			nextThumbNav.css({'background-image': nextItemImage});
		}
	}
	
	function mkdResetImageBehavior(sliderHolder) {
		var imageHolder = sliderHolder.find('.mkd-fsis-item');
		
		if (imageHolder.length) {
			imageHolder.removeClass('mkd-fsis-active-image');
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var fullScreenSections = {};
	mkd.modules.fullScreenSections = fullScreenSections;
	
	fullScreenSections.mkdInitFullScreenSections = mkdInitFullScreenSections;
	
	
	fullScreenSections.mkdOnDocumentReady = mkdOnDocumentReady;
	
	$(document).ready(mkdOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		mkdInitFullScreenSections();
	}
	
	/*
	 **	Init full screen sections shortcode
	 */
	function mkdInitFullScreenSections(){
		var fullScreenSections = $('.mkd-full-screen-sections');
		
		if(fullScreenSections.length){
			fullScreenSections.each(function() {
				var thisFullScreenSections = $(this),
					fullScreenSectionsWrapper = thisFullScreenSections.children('.mkd-fss-wrapper'),
					fullScreenSectionsItems = fullScreenSectionsWrapper.children('.mkd-fss-item'),
					fullScreenSectionsItemsNumber = fullScreenSectionsItems.length,
					fullScreenSectionsItemsHasHeaderStyle = fullScreenSectionsItems.hasClass('mkd-fss-item-has-style'),
					enableContinuousVertical = false,
					enableNavigationData = '',
					enablePaginationData = '';
				
				var defaultHeaderStyle = '';
				if (mkd.body.hasClass('mkd-light-header')) {
					defaultHeaderStyle = 'light';
				} else if (mkd.body.hasClass('mkd-dark-header')) {
					defaultHeaderStyle = 'dark';
				}
				
				if (typeof thisFullScreenSections.data('enable-continuous-vertical') !== 'undefined' && thisFullScreenSections.data('enable-continuous-vertical') !== false && thisFullScreenSections.data('enable-continuous-vertical') === 'yes') {
					enableContinuousVertical = true;
				}
				if (typeof thisFullScreenSections.data('enable-navigation') !== 'undefined' && thisFullScreenSections.data('enable-navigation') !== false) {
					enableNavigationData = thisFullScreenSections.data('enable-navigation');
				}
				if (typeof thisFullScreenSections.data('enable-pagination') !== 'undefined' && thisFullScreenSections.data('enable-pagination') !== false) {
					enablePaginationData = thisFullScreenSections.data('enable-pagination');
				}
				
				var enableNavigation = enableNavigationData !== 'no',
					enablePagination = enablePaginationData !== 'no';
				
				fullScreenSectionsWrapper.fullpage({
					sectionSelector: '.mkd-fss-item',
					scrollingSpeed: 1200,
					verticalCentered: false,
					continuousVertical: enableContinuousVertical,
					navigation: enablePagination,
					onLeave: function(index, nextIndex, direction){
						if(fullScreenSectionsItemsHasHeaderStyle) {
							checkFullScreenSectionsItemForHeaderStyle($(fullScreenSectionsItems[nextIndex - 1]).data('header-style'), defaultHeaderStyle);
						}
						
						if(enableNavigation) {
							checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, nextIndex);
						}
					},
					afterRender: function(){
						if(fullScreenSectionsItemsHasHeaderStyle) {
							checkFullScreenSectionsItemForHeaderStyle(fullScreenSectionsItems.first().data('header-style'), defaultHeaderStyle);
						}
						
						if(enableNavigation) {
							checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, 1);
							thisFullScreenSections.children('.mkd-fss-nav-holder').css('visibility','visible');
						}
						
						fullScreenSectionsWrapper.css('visibility','visible');
					}
				});
				
				setResposniveData(thisFullScreenSections);
				
				if(enableNavigation) {
					thisFullScreenSections.find('#mkd-fss-nav-up').on('click', function() {
						$.fn.fullpage.moveSectionUp();
						return false;
					});
					
					thisFullScreenSections.find('#mkd-fss-nav-down').on('click', function() {
						$.fn.fullpage.moveSectionDown();
						return false;
					});
				}
			});
		}
	}
	
	function checkFullScreenSectionsItemForHeaderStyle(section_header_style, default_header_style) {
		if (section_header_style !== undefined && section_header_style !== '') {
			mkd.body.removeClass('mkd-light-header mkd-dark-header').addClass('mkd-' + section_header_style + '-header');
		} else if (default_header_style !== '') {
			mkd.body.removeClass('mkd-light-header mkd-dark-header').addClass('mkd-' + default_header_style + '-header');
		} else {
			mkd.body.removeClass('mkd-light-header mkd-dark-header');
		}
	}
	
	function checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, index){
		var thisHolder = thisFullScreenSections,
			thisHolderArrowsUp = thisHolder.find('#mkd-fss-nav-up'),
			thisHolderArrowsDown = thisHolder.find('#mkd-fss-nav-down'),
			enableContinuousVertical = false;
		
		if (typeof thisFullScreenSections.data('enable-continuous-vertical') !== 'undefined' && thisFullScreenSections.data('enable-continuous-vertical') !== false && thisFullScreenSections.data('enable-continuous-vertical') === 'yes') {
			enableContinuousVertical = true;
		}
		
		if (index === 1 && !enableContinuousVertical) {
			thisHolderArrowsUp.css({'opacity': '0', 'height': '0', 'visibility': 'hidden'});
			thisHolderArrowsDown.css({'opacity': '0', 'height': '0', 'visibility': 'hidden'});
			
			if(index !== fullScreenSectionsItemsNumber){
				thisHolderArrowsDown.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
			}
		} else if (index === fullScreenSectionsItemsNumber && !enableContinuousVertical) {
			thisHolderArrowsDown.css({'opacity': '0', 'height': '0', 'visibility': 'hidden'});
			
			if(fullScreenSectionsItemsNumber === 2){
				thisHolderArrowsUp.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
			}
		} else {
			thisHolderArrowsUp.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
			thisHolderArrowsDown.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
		}
	}
	
	function setResposniveData(thisFullScreenSections) {
		var fullScreenSections = thisFullScreenSections.find('.mkd-fss-item'),
			responsiveStyle = '',
			style = '';
		
		fullScreenSections.each(function(){
			var thisSection = $(this),
				itemClass = '',
				imageLaptop = '',
				imageTablet = '',
				imagePortraitTablet = '',
				imageMobile = '';
			
			if (typeof thisSection.data('item-class') !== 'undefined' && thisSection.data('item-class') !== false) {
				itemClass = thisSection.data('item-class');
			}
			if (typeof thisSection.data('laptop-image') !== 'undefined' && thisSection.data('laptop-image') !== false) {
				imageLaptop = thisSection.data('laptop-image');
			}
			if (typeof thisSection.data('tablet-image') !== 'undefined' && thisSection.data('tablet-image') !== false) {
				imageTablet = thisSection.data('tablet-image');
			}
			if (typeof thisSection.data('tablet-portrait-image') !== 'undefined' && thisSection.data('tablet-portrait-image') !== false) {
				imagePortraitTablet = thisSection.data('tablet-portrait-image');
			}
			if (typeof thisSection.data('mobile-image') !== 'undefined' && thisSection.data('mobile-image') !== false) {
				imageMobile = thisSection.data('mobile-image');
			}
			
			if (imageLaptop.length || imageTablet.length || imagePortraitTablet.length || imageMobile.length) {
				
				if (imageLaptop.length) {
					responsiveStyle += "@media only screen and (max-width: 1280px) {.mkd-fss-item." + itemClass + " { background-image: url(" + imageLaptop + ") !important; } }";
				}
				if (imageTablet.length) {
					responsiveStyle += "@media only screen and (max-width: 1024px) {.mkd-fss-item." + itemClass + " { background-image: url( " + imageTablet + ") !important; } }";
				}
				if (imagePortraitTablet.length) {
					responsiveStyle += "@media only screen and (max-width: 800px) {.mkd-fss-item." + itemClass + " { background-image: url( " + imagePortraitTablet + ") !important; } }";
				}
				if (imageMobile.length) {
					responsiveStyle += "@media only screen and (max-width: 680px) {.mkd-fss-item." + itemClass + " { background-image: url( " + imageMobile + ") !important; } }";
				}
			}
		});
		
		if (responsiveStyle.length) {
			style = '<style type="text/css">' + responsiveStyle + '</style>';
		}
		
		if (style.length) {
			$('head').append(style);
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var googleMap = {};
	mkd.modules.googleMap = googleMap;
	
	googleMap.mkdShowGoogleMap = mkdShowGoogleMap;
	
	
	googleMap.mkdOnDocumentReady = mkdOnDocumentReady;
	
	$(document).ready(mkdOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		mkdShowGoogleMap();
	}
	
	/*
	 **	Show Google Map
	 */
	function mkdShowGoogleMap(){
		var googleMap = $('.mkd-google-map');
		
		if(googleMap.length){
			googleMap.each(function(){
				var element = $(this);
				
				var predefinedStyle = false;
				if(typeof element.data('predefined-style') !== 'undefined' && element.data('predefined-style') === 'yes') {
					predefinedStyle = true;
				}
				
				var customMapStyle;
				if(typeof element.data('custom-map-style') !== 'undefined') {
					customMapStyle = element.data('custom-map-style');
				}
				
				var colorOverlay;
				if(typeof element.data('color-overlay') !== 'undefined' && element.data('color-overlay') !== false) {
					colorOverlay = element.data('color-overlay');
				}
				
				var saturation;
				if(typeof element.data('saturation') !== 'undefined' && element.data('saturation') !== false) {
					saturation = element.data('saturation');
				}
				
				var lightness;
				if(typeof element.data('lightness') !== 'undefined' && element.data('lightness') !== false) {
					lightness = element.data('lightness');
				}
				
				var zoom;
				if(typeof element.data('zoom') !== 'undefined' && element.data('zoom') !== false) {
					zoom = element.data('zoom');
				}
				
				var pin;
				if(typeof element.data('pin') !== 'undefined' && element.data('pin') !== false) {
					pin = element.data('pin');
				}
				
				var mapHeight;
				if(typeof element.data('height') !== 'undefined' && element.data('height') !== false) {
					mapHeight = element.data('height');
				}
				
				var uniqueId;
				if(typeof element.data('unique-id') !== 'undefined' && element.data('unique-id') !== false) {
					uniqueId = element.data('unique-id');
				}
				
				var scrollWheel;
				if(typeof element.data('scroll-wheel') !== 'undefined') {
					scrollWheel = element.data('scroll-wheel');
				}
				var addresses;
				if(typeof element.data('addresses') !== 'undefined' && element.data('addresses') !== false) {
					addresses = element.data('addresses');
				}
				
				var map = "map_"+ uniqueId;
				var geocoder = "geocoder_"+ uniqueId;
				var holderId = "mkd-map-"+ uniqueId;
				
				mkdInitializeGoogleMap(predefinedStyle, customMapStyle, colorOverlay, saturation, lightness, scrollWheel, zoom, holderId, mapHeight, pin,  map, geocoder, addresses);
			});
		}
	}
	
	/*
	 **	Init Google Map
	 */
	function mkdInitializeGoogleMap(predefinedStyle, customMapStyle, color, saturation, lightness, wheel, zoom, holderId, height, pin,  map, geocoder, data){
		
		if(typeof google !== 'object') {
			return;
		}
		
		var mapStyles = [];
		if(predefinedStyle) {
			mapStyles = [
				{
					"featureType": "administrative",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#444444"
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "all",
					"stylers": [
						{
							"color": "#f2f2f2"
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"saturation": "23"
						},
						{
							"color": "#ffffff"
						},
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "labels.text",
					"stylers": [
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#8396d7"
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "labels.text.stroke",
					"stylers": [
						{
							"hue": "#ff0000"
						},
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "all",
					"stylers": [
						{
							"saturation": -100
						},
						{
							"lightness": 45
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#efe0c3"
						},
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#85a1ca"
						},
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "labels.icon",
					"stylers": [
						{
							"invert_lightness": true
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "labels",
					"stylers": [
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "labels.icon",
					"stylers": [
						{
							"invert_lightness": true
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "labels.icon",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "transit",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "all",
					"stylers": [
						{
							"color": "#c9e4f3"
						},
						{
							"visibility": "on"
						}
					]
				}
			];
		} else {
			mapStyles = [
				{
					stylers: [
						{hue: color },
						{saturation: saturation},
						{lightness: lightness},
						{gamma: 1}
					]
				}
			];
		}
		
		var googleMapStyleId;
		
		if(predefinedStyle || customMapStyle === 'yes'){
			googleMapStyleId = 'mkd-style';
		} else {
			googleMapStyleId = google.maps.MapTypeId.ROADMAP;
		}
		
		if(wheel === 'yes'){
			wheel = true;
		} else {
			wheel = false;
		}
		
		var qoogleMapType = new google.maps.StyledMapType(mapStyles, {name: "Mikado Google Map"});
		
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(-34.397, 150.644);
		
		if (!isNaN(height)){
			height = height + 'px';
		}
		
		var myOptions = {
			zoom: zoom,
			scrollwheel: wheel,
			center: latlng,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL,
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			scaleControl: false,
			scaleControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			streetViewControl: false,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			panControl: false,
			panControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			mapTypeControl: false,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'mkd-style'],
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			mapTypeId: googleMapStyleId
		};
		
		map = new google.maps.Map(document.getElementById(holderId), myOptions);
		map.mapTypes.set('mkd-style', qoogleMapType);
		
		var index;
		
		for (index = 0; index < data.length; ++index) {
			mkdInitializeGoogleAddress(data[index], pin, map, geocoder);
		}
		
		var holderElement = document.getElementById(holderId);
		holderElement.style.height = height;
	}
	
	/*
	 **	Init Google Map Addresses
	 */
	function mkdInitializeGoogleAddress(data, pin, map, geocoder){
		if (data === '') {
			return;
		}
		
		var contentString = '<div id="content">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<div id="bodyContent">'+
			'<p>'+data+'</p>'+
			'</div>'+
			'</div>';
		
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		
		geocoder.geocode( { 'address': data}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location,
					icon:  pin,
					title: data.store_title
				});
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map,marker);
				});
				
				google.maps.event.addDomListener(window, 'resize', function() {
					map.setCenter(results[0].geometry.location);
				});
			}
		});
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var icon = {};
	mkd.modules.icon = icon;
	
	icon.mkdIcon = mkdIcon;
	
	
	icon.mkdOnDocumentReady = mkdOnDocumentReady;
	
	$(document).ready(mkdOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		mkdIcon().init();
	}
	
	/**
	 * Object that represents icon shortcode
	 * @returns {{init: Function}} function that initializes icon's functionality
	 */
	var mkdIcon = function() {
		var icons = $('.mkd-icon-shortcode');
		
		/**
		 * Function that triggers icon animation and icon animation delay
		 */
		var iconAnimation = function(icon) {
			if(icon.hasClass('mkd-icon-animation')) {
				icon.appear(function() {
					icon.parent('.mkd-icon-animation-holder').addClass('mkd-icon-animation-show');
				}, {accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});
			}
		};
		
		/**
		 * Function that triggers icon hover color functionality
		 */
		var iconHoverColor = function(icon) {
			if(typeof icon.data('hover-color') !== 'undefined') {
				var changeIconColor = function(event) {
					event.data.icon.css('color', event.data.color);
				};
				
				var iconElement = icon.find('.mkd-icon-element');
				var hoverColor = icon.data('hover-color');
				var originalColor = iconElement.css('color');
				
				if(hoverColor !== '') {
					icon.on('mouseenter', {icon: iconElement, color: hoverColor}, changeIconColor);
					icon.on('mouseleave', {icon: iconElement, color: originalColor}, changeIconColor);
				}
			}
		};
		
		/**
		 * Function that triggers icon holder background color hover functionality
		 */
		var iconHolderBackgroundHover = function(icon) {
			if(typeof icon.data('hover-background-color') !== 'undefined') {
				var changeIconBgColor = function(event) {
					event.data.icon.css('background-color', event.data.color);
				};
				
				var hoverBackgroundColor = icon.data('hover-background-color');
				var originalBackgroundColor = icon.css('background-color');
				
				if(hoverBackgroundColor !== '') {
					icon.on('mouseenter', {icon: icon, color: hoverBackgroundColor}, changeIconBgColor);
					icon.on('mouseleave', {icon: icon, color: originalBackgroundColor}, changeIconBgColor);
				}
			}
		};
		
		/**
		 * Function that initializes icon holder border hover functionality
		 */
		var iconHolderBorderHover = function(icon) {
			if(typeof icon.data('hover-border-color') !== 'undefined') {
				var changeIconBorder = function(event) {
					event.data.icon.css('border-color', event.data.color);
				};
				
				var hoverBorderColor = icon.data('hover-border-color');
				var originalBorderColor = icon.css('borderTopColor');
				
				if(hoverBorderColor !== '') {
					icon.on('mouseenter', {icon: icon, color: hoverBorderColor}, changeIconBorder);
					icon.on('mouseleave', {icon: icon, color: originalBorderColor}, changeIconBorder);
				}
			}
		};
		
		return {
			init: function() {
				if(icons.length) {
					icons.each(function() {
						iconAnimation($(this));
						iconHoverColor($(this));
						iconHolderBackgroundHover($(this));
						iconHolderBorderHover($(this));
					});
				}
			}
		};
	};
	
})(jQuery);
(function($) {
	'use strict';
	
	var iconListItem = {};
	mkd.modules.iconListItem = iconListItem;
	
	iconListItem.mkdInitIconList = mkdInitIconList;
	
	
	iconListItem.mkdOnDocumentReady = mkdOnDocumentReady;
	
	$(document).ready(mkdOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		mkdInitIconList().init();
	}
	
	/**
	 * Button object that initializes icon list with animation
	 * @type {Function}
	 */
	var mkdInitIconList = function() {
		var iconList = $('.mkd-animate-list');
		
		/**
		 * Initializes icon list animation
		 * @param list current slider
		 */
		var iconListInit = function(list) {
			setTimeout(function(){
				list.appear(function(){
					list.addClass('mkd-appeared');
				},{accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});
			},30);
		};
		
		return {
			init: function() {
				if(iconList.length) {
					iconList.each(function() {
						iconListInit($(this));
					});
				}
			}
		};
	};
	
})(jQuery);
(function($) {
    'use strict';
	
	var imageGallery = {};
	mkd.modules.imageGallery = imageGallery;
	
	imageGallery.mkdInitImageGalleryMasonry = mkdInitImageGalleryMasonry;
	
	
	imageGallery.mkdOnWindowLoad = mkdOnWindowLoad;
	
	$(window).load(mkdOnWindowLoad);
	
	/*
	 ** All functions to be called on $(window).load() should be in this function
	 */
	function mkdOnWindowLoad() {
		mkdInitImageGalleryMasonry();
	}
	
	/*
	 ** Init Image Gallery shortcode - Masonry layout
	 */
	function mkdInitImageGalleryMasonry(){
		var holder = $('.mkd-image-gallery.mkd-ig-masonry-type');
		
		if(holder.length){
			holder.each(function(){
				var thisHolder = $(this),
					masonry = thisHolder.find('.mkd-ig-masonry');
				
				masonry.waitForImages(function() {
					masonry.isotope({
						layoutMode: 'packery',
						itemSelector: '.mkd-ig-image',
						percentPosition: true,
						packery: {
							gutter: '.mkd-ig-grid-gutter',
							columnWidth: '.mkd-ig-grid-sizer'
						}
					});
					
					setTimeout(function() {
						masonry.isotope('layout');
					}, 800);
					
					masonry.css('opacity', '1');
				});
			});
		}
	}

})(jQuery);
(function($) {
	'use strict';
	
	var pieChart = {};
	mkd.modules.pieChart = pieChart;
	
	pieChart.mkdInitPieChart = mkdInitPieChart;
	
	
	pieChart.mkdOnDocumentReady = mkdOnDocumentReady;
	
	$(document).ready(mkdOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		mkdInitPieChart();
	}
	
	/**
	 * Init Pie Chart shortcode
	 */
	function mkdInitPieChart() {
		var pieChartHolder = $('.mkd-pie-chart-holder');
		
		if (pieChartHolder.length) {
			pieChartHolder.each(function () {
				var thisPieChartHolder = $(this),
					pieChart = thisPieChartHolder.children('.mkd-pc-percentage'),
					barColor = '#25abd1',
					trackColor = '#f7f7f7',
					lineWidth = 3,
					size = 176;
				
				if(typeof pieChart.data('size') !== 'undefined' && pieChart.data('size') !== '') {
					size = pieChart.data('size');
				}
				
				if(typeof pieChart.data('bar-color') !== 'undefined' && pieChart.data('bar-color') !== '') {
					barColor = pieChart.data('bar-color');
				}
				
				if(typeof pieChart.data('track-color') !== 'undefined' && pieChart.data('track-color') !== '') {
					trackColor = pieChart.data('track-color');
				}
				
				pieChart.appear(function() {
					initToCounterPieChart(pieChart);
					thisPieChartHolder.css('opacity', '1');
					
					pieChart.easyPieChart({
						barColor: barColor,
						trackColor: trackColor,
						scaleColor: false,
						lineCap: 'butt',
						lineWidth: lineWidth,
						animate: 1500,
						size: size
					});
				},{accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});
			});
		}
	}
	
	/*
	 **	Counter for pie chart number from zero to defined number
	 */
	function initToCounterPieChart(pieChart){
		var counter = pieChart.find('.mkd-pc-percent'),
			max = parseFloat(counter.text());
		
		counter.countTo({
			from: 0,
			to: max,
			speed: 1500,
			refreshInterval: 50
		});
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var process = {};
	mkd.modules.process = process;
	
	process.mkdInitProcess = mkdInitProcess;
	
	
	process.mkdOnDocumentReady = mkdOnDocumentReady;
	
	$(document).ready(mkdOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		mkdInitProcess();
	}
	
	/**
	 * Inti process shortcode on appear
	 */
	function mkdInitProcess() {
		var holder = $('.mkd-process-holder');
		
		if(holder.length) {
			holder.each(function(){
				var thisHolder = $(this);
				
				thisHolder.appear(function(){
					thisHolder.addClass('mkd-process-appeared');
				},{accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var progressBar = {};
	mkd.modules.progressBar = progressBar;
	
	progressBar.mkdInitProgressBars = mkdInitProgressBars;
	
	
	progressBar.mkdOnDocumentReady = mkdOnDocumentReady;
	
	$(document).ready(mkdOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		mkdInitProgressBars();
	}
	
	/*
	 **	Horizontal progress bars shortcode
	 */
	function mkdInitProgressBars(){
		var progressBar = $('.mkd-progress-bar');
		
		if(progressBar.length){
			progressBar.each(function() {
				var thisBar = $(this),
					thisBarContent = thisBar.find('.mkd-pb-content'),
					percentage = thisBarContent.data('percentage');
				
				thisBar.appear(function() {
					mkdInitToCounterProgressBar(thisBar, percentage);
					
					thisBarContent.css('width', '0%');
					thisBarContent.animate({'width': percentage+'%'}, 2000);
				});
			});
		}
	}
	
	/*
	 **	Counter for horizontal progress bars percent from zero to defined percent
	 */
	function mkdInitToCounterProgressBar(progressBar, $percentage){
		var percentage = parseFloat($percentage),
			percent = progressBar.find('.mkd-pb-percent');
		
		if(percent.length) {
			percent.each(function() {
				var thisPercent = $(this);
				thisPercent.css('opacity', '1');
				
				thisPercent.countTo({
					from: 0,
					to: percentage,
					speed: 2000,
					refreshInterval: 50
				});
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var tabs = {};
	mkd.modules.tabs = tabs;
	
	tabs.mkdInitTabs = mkdInitTabs;
	
	
	tabs.mkdOnDocumentReady = mkdOnDocumentReady;
	
	$(document).ready(mkdOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		mkdInitTabs();
	}
	
	/*
	 **	Init tabs shortcode
	 */
	function mkdInitTabs(){
		var tabs = $('.mkd-tabs');
		
		if(tabs.length){
			tabs.each(function(){
				var thisTabs = $(this);
				
				thisTabs.children('.mkd-tab-container').each(function(index){
					index = index + 1;
					var that = $(this),
						link = that.attr('id'),
						navItem = that.parent().find('.mkd-tabs-nav li:nth-child('+index+') a'),
						navLink = navItem.attr('href');
					
					link = '#'+link;

					if(link.indexOf(navLink) > -1) {
						navItem.attr('href',link);
					}
				});
				
				thisTabs.tabs();

                $('.mkd-tabs a.mkd-external-link').off('click');
			});
		}
	}
	
})(jQuery);
(function($) {
    'use strict';
    
    var textMarquee = {};
    mkd.modules.textMarquee = textMarquee;
    
    textMarquee.mkdInitTextMarquee = mkdInitTextMarquee;
    
    textMarquee.mkdOnDocumentReady = mkdOnDocumentReady;
    
    $(document).ready(mkdOnDocumentReady);
    
    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdOnDocumentReady() {
        mkdInitTextMarquee();
    }
    
    /**
     * Init Text Marquee effect
     */
    function mkdInitTextMarquee() {
        var textMarqueeShortcodes = $('.mkd-text-marquee');

        if (textMarqueeShortcodes.length) {
            textMarqueeShortcodes.each(function(){
                var textMarqueeShortcode = $(this),
                    marqueeElements = textMarqueeShortcode.find('.mkd-marquee-element'),
                    originalText = marqueeElements.filter('.mkd-original-text'),
                    auxText = marqueeElements.filter('.mkd-aux-text');

                var calcWidth = function(element) {
                    var width;

                    if (textMarqueeShortcode.outerWidth() > element.outerWidth()) {
                        width = textMarqueeShortcode.outerWidth();
                    } else {
                        width = element.outerWidth();
                    }

                    return width;
                };

                var marqueeEffect = function () {
	                mkdRequestAnimationFrame();
	                
                    var delta = 1, //pixel movement
                        speedCoeff = 0.8, // below 1 to slow down, above 1 to speed up
                        marqueeWidth = calcWidth(originalText);

                    marqueeElements.css({'width':marqueeWidth}); // set the same width to both elements
                    auxText.css('left', marqueeWidth); //set to the right of the initial marquee element

                    //movement loop
                    marqueeElements.each(function(i){
                        var marqueeElement = $(this),
                            currentPos = 0;

                        var mkdInfiniteScrollEffect = function() {
                            currentPos -= delta;

                            //move marquee element
                            if (marqueeElement.position().left <= -marqueeWidth) {
                                marqueeElement.css('left', parseInt(marqueeWidth - delta));
                                currentPos = 0;
                            }

                            marqueeElement.css('transform','translate3d('+speedCoeff*currentPos+'px,0,0)');
	
	                        requestNextAnimationFrame(mkdInfiniteScrollEffect);

                            $(window).resize(function(){
                                marqueeWidth = calcWidth(originalText);
                                currentPos = 0;
                                originalText.css('left',0);
                                auxText.css('left', marqueeWidth); //set to the right of the inital marquee element
                            });
                        }; 
                            
                        mkdInfiniteScrollEffect();
                    });
                };

                marqueeEffect();
            });
        }
    }
    
    /*
     * Request Animation Frame shim
     */
	function mkdRequestAnimationFrame() {
		window.requestNextAnimationFrame =
			(function () {
				var originalWebkitRequestAnimationFrame,
					wrapper,
					geckoVersion = 0,
					userAgent = navigator.userAgent,
					index = 0,
					self = this;
				
				// Workaround for Chrome 10 bug where Chrome
				// does not pass the time to the animation function
				
				if (window.webkitRequestAnimationFrame) {
					// Define the wrapper
					
					wrapper = function (time) {
						if (time === undefined) {
							time = +new Date();
						}
						
						self.callback(time);
					};
					
					// Make the switch
					
					originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;
					
					window.webkitRequestAnimationFrame = function (callback, element) {
						self.callback = callback;
						
						// Browser calls the wrapper and wrapper calls the callback
						originalWebkitRequestAnimationFrame(wrapper, element);
					};
				}
				
				// Workaround for Gecko 2.0, which has a bug in
				// mozRequestAnimationFrame() that restricts animations
				// to 30-40 fps.
				
				if (window.mozRequestAnimationFrame) {
					// Check the Gecko version. Gecko is used by browsers
					// other than Firefox. Gecko 2.0 corresponds to
					// Firefox 4.0.
					
					index = userAgent.indexOf('rv:');
					
					if (userAgent.indexOf('Gecko') != -1) {
						geckoVersion = userAgent.substr(index + 3, 3);
						
						if (geckoVersion === '2.0') {
							// Forces the return statement to fall through
							// to the setTimeout() function.
							
							window.mozRequestAnimationFrame = undefined;
						}
					}
				}
				
				return window.requestAnimationFrame   ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					window.oRequestAnimationFrame      ||
					window.msRequestAnimationFrame     ||
					
					function (callback, element) {
						var start,
							finish;
						
						window.setTimeout( function () {
							start = +new Date();
							callback(start);
							finish = +new Date();
							
							self.timeout = 1000 / 60 - (finish - start);
							
						}, self.timeout);
					};
				}
			)();
	}

})(jQuery);