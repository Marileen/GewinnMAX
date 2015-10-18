define([ 'jquery', 'backbone', 'underscore' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        events: {
        },

        initialize: function() {

            $("a",this.$el).on("click", _.bind( function( event ){
                this.$el.submit();
            }, this ));

        }

    });

});