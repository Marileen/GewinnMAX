define([ 'jquery', 'backbone', 'underscore', 'jquery-whenlive' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        events: {

        },

        initialize: function() {

            //this.$el.whenLive({ }, _.bind(this.ready, this));

        },

        ready: function() {
            var src = this.$el.find('img').attr('data-src');
            this.$el.find('img').attr('src', src );
            console.log(this.$el);
        }

    });
});