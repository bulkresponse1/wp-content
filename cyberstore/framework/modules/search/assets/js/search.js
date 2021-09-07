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
