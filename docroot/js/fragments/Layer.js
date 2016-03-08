define([ 'jquery', 'backbone', 'underscore' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        events: {
            'layer:open': openLayer
        },

        initialize: function() {

            $('.glyphicon-close', this.$el).on( 'click', _.bind( function( event ){
                this.closeLayer( event );
            }, this ));

            this.$el.on( 'click', _.bind( function( event ){
                if( $(event.originalEvent.originalTarget).hasClass("show") ){
                    this.closeLayer( event );
                }
            }, this ));

        },

        closeLayer: function( event ) {
            event.preventDefault();
            this.$el.addClass("hide");
            $('body').removeClass("layer");
        }

    });

    function openLayer(){
        $('body').addClass("layer");
        this.$el.removeClass("hide").addClass("show");
    }

});