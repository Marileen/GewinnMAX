define([ 'jquery', 'backbone', 'underscore' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        events: {
            'click': scrollTo
        },

        initialize: function () {
        }
    });

    function scrollTo(e) {
        //e.preventDefault();
        var id = this.$el.attr("href").replace("#","");
        var top = $( '[data-name="'+id+'"]').offset().top;
        $("html, body").animate({ scrollTop: top },500,function(){});
    }

});