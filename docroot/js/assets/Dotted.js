define([ 'jquery', 'backbone', 'underscore' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        initialize: function() {

            //jQuery fallback
            if( $("html").hasClass("lte9") ) {
                ani(this.$el);
            }

        }

    });

    function ani( el ) {
        $(el).css({ "width": "40px", "opacity": 1 }).animate({
            "opacity": 0
        },1000).animate({
            "opacity": 1
        },1000, function(){
            ani( el );
        });
    }

});