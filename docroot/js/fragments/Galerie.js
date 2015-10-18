define([ 'jquery', 'backbone', 'underscore' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        slideInterval: null,
        duration: 5,
        status: "play",
        startIndex: 0,
        index: 0,
        maxLength: 1,

        initialize: function() {

            $('[data-element="fullscreenButton"]',this.$el).on( 'click', _.bind( function( event ){
                this.$el.addClass("fullscreen");
                resize( this );
                $('body').addClass("layer");
                $.each($('.image[data-asset="image"].zoomable', this.$el), function(index, image) {
                    var src = $('.zoom', image).attr('data-zoom-src');
                    if( src ){
                        $('.zoom', image).attr('src', src);
                        $('.zoom', image).removeAttr('data-zoom-src');
                    }
                });
            }, this ));

            $('[data-element="closeButton"]',this.$el).on( 'click', _.bind( function( event ){
                this.$el.removeClass("fullscreen");
                $('body').removeClass("layer");
                resize( this );
            }, this ));

            $('[data-element="thumbnailButton"]',this.$el).on( 'click', _.bind( function( event ){
                event.preventDefault();
                if( this.$el.hasClass("openThumb") ){
                    this.$el.removeClass("openThumb");
                } else {
                    this.$el.addClass("openThumb");
                }
            }, this ));

        }


    });

    function resize( element ) {
        window.setTimeout(function(){
            $('.controller[data-controller="t8y/slider/Flip"]').resize();
        },100);
    }

});