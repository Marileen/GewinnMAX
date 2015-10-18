define([ 'jquery', 'underscore', 'backbone' ], function( $, _ ) {

    return Backbone.View.extend({

        initialize: function () {

            $('.table-toggle', this.$el).on("click", _.bind( function(){
                if( this.$el.hasClass("show-inner-table") ){
                    this.$el.removeClass("show-inner-table");
                } else {
                    this.$el.addClass("show-inner-table");
                }
            }, this));

        }

    });


});