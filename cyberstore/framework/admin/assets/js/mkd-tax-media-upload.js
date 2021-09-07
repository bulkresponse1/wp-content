jQuery(document).ready( function($) {
    function mkd_tax_media_upload(button_class) {
        var _custom_media = true,
            _orig_send_attachment = wp.media.editor.send.attachment;
        $('body').on('click', button_class, function(e) {
            var $this = $(this);
            var parent = $this.closest('.form-field');
            _custom_media = true;
            wp.media.editor.send.attachment = function(props, attachment){
                if ( _custom_media ) {
                    if (attachment.sizes.thumbnail !== undefined){
                        attachment_url = attachment.sizes.thumbnail.url;
                    } else {
                        attachment_url = attachment.sizes.full.url;
                    }
                    parent.find('.mkd-tax-custom-media-url').val(attachment.id);
                    parent.find('.mkd-tax-image-wrapper').html('<img class="custom_media_image" src="" style="margin:0;padding:0;max-height:100px;float:none;" />');
                    parent.find('.mkd-tax-image-wrapper .custom_media_image').attr('src',attachment_url).css('display','block');
                } else {
                    return _orig_send_attachment.apply( button_class, [props, attachment] );
                }
            }
            wp.media.editor.open(button_class);
            return false;
        });
    }

    function mkd_tax_media_remove(button_class) {
        $('body').on('click', button_class,function(){
            var $this = $(this);
            var parent = $this.closest('.form-field');
            var image = parent.find('.mkd-tax-custom-media-url');

            /** Make sure the user didn't hit the button by accident and they really mean to delete the image **/
            if( image.val() !== '' && confirm( 'Are you sure you want to delete this file?' ) ) {
                var result = $.ajax({
                    url: '/wp-admin/admin-ajax.php',
                    type: 'GET',
                    data: {
                        action: 'cyberstore_mikado_tax_del_image',
                        term_id: $this.data('termid'),
                        taxonomy: $this.data('taxonomy'),
                        field_name: image.attr('name')
                    },
                    dataType: 'text'
                });

                result.success( function( data ) {
                    $('#mkd-uploaded-image').remove();
                });
                result.fail( function( jqXHR, textStatus ) {
                    console.log( "Request failed: " + textStatus );
                });

                image.val('');
                parent.find('.mkd-tax-image-wrapper').html('<img class="custom_media_image" src="" style="margin:0;padding:0;max-height:100px;float:none;" />');
            }

        });
    }

    mkd_tax_media_upload('.mkd-tax-media-add.button');
    mkd_tax_media_remove('.mkd-tax-media-remove.button');

    // Thanks: http://stackoverflow.com/questions/15281995/wordpress-create-category-ajax-response
    //remove all thumbs after edit/save taxonomy
    $(document).ajaxComplete(function(event, xhr, settings) {
        var queryStringArr = settings.data.split('&');
        if( $.inArray('action=add-tag', queryStringArr) !== -1 ){
            var xml = xhr.responseXML;
            $response = $(xml).find('term_id').text();
            if($response!=""){
                // Clear the thumb image
                $('.mkd-tax-image-wrapper').html('');
            }
        }
    });
});