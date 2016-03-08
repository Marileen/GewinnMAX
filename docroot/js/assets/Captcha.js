define([ 'jquery', 'backbone', 'underscore' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        events: {
        },

        initialize: function() {

            $('.newCaptcha', this.$el).on( 'click', _.bind( function( event ){
                event.preventDefault();
                var captchaSrc = $("img", this.$el).attr("src");
                var timestring = new Date().getTime();
                if(captchaSrc.indexOf("?")>=0){
                    captchaSrc = captchaSrc.split("?")[0] + "?" + timestring;
                } else {
                    captchaSrc += "?" + timestring;
                }
                $("img", this.$el).attr("src",captchaSrc);
            }, this ));

        }

    });

});