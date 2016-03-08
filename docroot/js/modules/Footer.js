define([ 'jquery', 'underscore', 'backbone' ], function( $, _ ) {

    return Backbone.View.extend({

        events: {
        },

        headerTop: 0,

        initialize: function () {

            showFooter( this );
            try {
                document.addEventListener("touchstart", _.bind(function(event) {
                    //$('.header[data-module="header"]').css({ "backgroundColor": "blue" });
                    $('.header[data-module="header"]').css({ "top": 0 });
                }, this), false);
                document.addEventListener("touchend", _.bind(function(event) {
                    //$('.header[data-module="header"]').css({ "backgroundColor": "red" });
                    $('.header[data-module="header"]').css({ "top": 0 });
                }, this), false);
            } catch (e) {
            }
            var throttled = _.throttle( _.bind( function( event ){
                //$('.header[data-module="header"]').css({ "backgroundColor": "green" });
                showFooter( this );
            }, this ), 5);
            $(window).scroll(throttled);


            $(window).on('resize', _.bind( function( event ){
                showFooter( this );
            }, this ));

        }

    });


    function showFooter( event ){

        var contentHeight = parseInt($('.content[data-module="content"]').height());
        var windowHeight = $(window).height();
        var scrollTop = $(document).scrollTop();

        // Footer erscheint
        if( windowHeight+scrollTop > contentHeight ){

            $('body').addClass("footer-view");

            var header = $('.header[data-module="header"]');
            var footer = $('.footer[data-module="footer"]');
            var footerTop = footer.offset().top;
            var headerDiv = windowHeight - $('.header[data-fragment="header/menu"]',header).height() - 25; // 25 ist ein kleiner Abstand unten
            this.headerTop = windowHeight - ( footerTop - scrollTop );
            if(headerDiv>0){
                this.headerTop = this.headerTop - headerDiv;
            }
            this.headerTop = (this.headerTop>0) ? -this.headerTop : 0;
            // Menu am Footer ansetzen
            if( scrollTop > 0 ){
                header.css({ "top": this.headerTop });
            } else {
                header.css({ "top": 0 });
            }

            /*
            if( !event.$el.hasClass("scrollFooter")
                && windowHeight <= contentHeight
                && ( $('html').hasClass("device-tablet") ) ){
                event.$el.addClass("scrollFooter");
                $("html, body").animate({ scrollTop: event.$el.offset().top },500,function(){});
            }
            */

        } else {
            $('body').removeClass("footer-view");
            event.$el.removeClass("scrollFooter");
            if( this.headerTop < 0 ){
                this.headerTop = 0;
                $('.header[data-module="header"]').css({ "top": 0 });
            }
        }

    }

});