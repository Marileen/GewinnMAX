define([ 'jquery', 'underscore', 'backbone' ], function ($, _) {

    return Backbone.View.extend({

        events: {
            'header:toggleNav': toggleNav,
            'header:openTopNav': openTopNav,
            'header:openBottomNav': openBottomNav,
            'header:saveSession': saveSession
        },

        initialize: function () {
            this.ajaxurl = this.$el.attr("data-ajax");
            this.method = (this.$el.attr("data-method")) ? this.$el.attr("data-method") : "POST";
        }

    });

    function toggleNav( event ) {
        $('.topNav', this.$el).removeClass("open").removeClass("close");
        $('.bottomNav', this.$el).removeClass("open").removeClass("close");
        if( $(event.el).hasClass("topNav") ){
            this.$el.trigger( $.Event('header:openTopNav', { }));
        } else {
            this.$el.trigger( $.Event('header:openBottomNav', { }));
        }
    }

    function openTopNav( event ) {
        this.$el.removeClass("bottomNavOpen").addClass("topNavOpen");
        this.$el.trigger( $.Event('header:saveSession', { open: "topNavOpen" }));
    }

    function openBottomNav( event ) {
        this.$el.removeClass("topNavOpen").addClass("bottomNavOpen");
        this.$el.trigger( $.Event('header:saveSession', { open: "bottomNavOpen" }));
    }

    function saveSession( event ){
        if(this.ajaxurl) {
            $.ajax({
                url: this.ajaxurl,
                data: {
                    "open": event.open
                },
                method: this.method,
                dataType: 'html'
            }).done(function( data ){
            });
        }
    }

});