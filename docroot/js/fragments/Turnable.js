define([ 'jquery', 'backbone', 'underscore' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        events: {

        },

        val: 0,
        steps: 36,
        duration: 100,
        height: 300,
        width: 300,
        interval: null,
        status: "stop",

        initialize: function() {

            this.steps = this.$el.attr("data-steps");
            this.duration = this.$el.attr("data-duration");
            this.height = parseInt( this.$el.attr("data-height") );
            this.width = parseInt( this.$el.attr("data-width") );

            this.play();

            this.$el.on( 'click', _.bind( function( event ){
                if( this.status == "stop" ){
                    this.play();
                } else {
                    this.stop();
                }
            }, this ));

        },

        play: function() {
            this.status = "play";
            this.interval = window.setInterval( _.bind( function( event ){ this.nextStep() }, this ), this.duration );
        },

        nextStep: function() {
            this.val = (this.val <= -10800) ? 0 : (this.val - this.width);
            $('.img', this.$el).css("backgroundPosition", this.val + "px 0px");
        },

        stop: function(){
            this.status = "stop";
            clearInterval( this.interval );
        }


});

});