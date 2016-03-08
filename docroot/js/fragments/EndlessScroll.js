define([ 'jquery', 'backbone', 'underscore', 't8y/utils/parser' ], function( $, Backbone, _, T8yParser ) {

    return Backbone.View.extend({

        events: {
            'endless:scroll': endlessScroll,
            'endless:check': check,
            'endless:loadContent': loadContent
        },

        initialize: function() {

            this.url = this.$el.attr('data-ajax');
            this.target = this.$el.attr('data-content-target');
            this.timer = null;

            $(document).on('scroll', _.bind( function( event ){
                endlessScroll( this );
            }, this ));

            $(window).on('resize', _.bind( function( event ){
                endlessScroll( this );
            }, this ));

            onloadCheck( this );

        }

    });

    function endlessScroll( event ){

        if( !event.timer ){
            event.timer = window.setTimeout(function(){
                check( event );
            },500);
        }
    }

    function onloadCheck( event ){

        // reset start page
        if( $('.endlessScroll .inner .row').length < 1){
            $('#page').val(0);
        } else {
            $('#page').val( $('.endlessScroll .inner .row').length );
        }

        check( event );
    }

    function check( event ){
        event.timer = null;
        var windowHeight = $(window).height();
        var contentHeight = $('.content[data-module="content"]').height();
        var scrollTopPosition = $(window).scrollTop();

        if( (contentHeight - windowHeight - scrollTopPosition) < 40 ) {
            $(event.el).addClass("loading");
            loadContent( event );
        }
    }

    function loadContent( event ){
        var form = (event.$el.attr("data-form-target")) ? $(event.$el.attr("data-form-target")) : event.$el;
        var page = parseInt( form.find('#page').val() )+1;
        form.find('#page').val(page);
        var formData = form.serializeArray();
        $.ajax({
            url: form.attr("data-ajax"),
            target: event.target,
            data: formData,
            dataType: 'html'
        }).done(function( data ){
            $(event.el).removeClass("loading");
            var length = ( data.length > 4 ) ? $('.col',data).length : 0;
            if( length > 0 ){
                $(event.el).removeClass("done");
                $('.inner',this.target).append( data );
                T8yParser.parse($('.inner',this.target));
            } else {
                $(event.el).addClass("done");
            }
        });
    }

});