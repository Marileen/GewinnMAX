define([ 'jquery', 'backbone', 'underscore' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        globalLayer: '.globalLayer',

        events: {
            'layer:resize' : resizeLayer
        },

        initialize: function() {

            $(window).on('resize', _.bind( function( event ){
                this.$el.trigger( $.Event('layer:resize', { el: this.$el }));
            }, this ));

            $('.open', this.$el).on( 'click', _.bind( function( event ){
                event.preventDefault();
                this.$el.addClass("fullscreen");
                checkIframeSrc( this );
                resizeLayer( this );
                $('body').addClass("layer");
                $('.controller[data-controller="fragments/GoogleMaps"]').trigger( $.Event('gmaps:init', { }));
                $.each($('.image[data-asset="image"].zoomable', this.$el), function(index, image) {
                    var src = $('.zoom', image).attr('data-zoom-src');
                    if( src ){
                        $('.zoom', image).attr('src', src);
                        $('.zoom', image).removeAttr('data-zoom-src');
                    }
                });
            }, this ));

            $('.close', this.$el).on( 'click', _.bind( function( event ){
                event.preventDefault();
                this.$el.removeClass("fullscreen");
                checkIframeSrc( this );
                $('body').removeClass("layer");
            }, this ));

            $('.toggle', this.$el).on( 'click', _.bind( function( event ){
                event.preventDefault();
                if( this.$el.hasClass("fullscreen") ){
                    this.$el.removeClass("fullscreen");
                    $('body').removeClass("layer");
                } else {
                    this.$el.addClass("fullscreen");
                    $('body').addClass("layer");
                }
            }, this ));
        }

    });


    function checkIframeSrc( event ){
        if( $('.video-container',event.el) ) {
            var dataSrc = ( $('iframe', event.el).attr("data-src") ) ? $('iframe', event.el).attr("data-src") : null;
            if (dataSrc) {
                if( $(event.el).hasClass("fullscreen") ) {
                    $('iframe', event.el).attr("src", dataSrc);
                } else {
                    $('iframe', event.el).attr("src", "");
                }
            }
        }
    }


    function resizeLayer( event ){
        if( $('.video-container',event.el) ){
            var h = $('.layer',event.el).height() - 70;
            var w = Math.round( (h / 56.25) * 100 );
            if( $('.layer',event.el).width() < w ){
                w = $('.layer',event.el).width();
                h = Math.round( (w * 56.25) / 100 );
            }
            $('.video-container iframe',event.el).attr("height",h);
            $('.video-container iframe',event.el).attr("width",w);
        }
    }

});