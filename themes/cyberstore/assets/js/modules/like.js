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