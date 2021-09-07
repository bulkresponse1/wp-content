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