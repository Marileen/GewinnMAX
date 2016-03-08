define([ 'jquery', 'underscore', 'backbone' ], function( $, _ ) {

    return Backbone.View.extend({

        initialize: function () {

            this.$el.on("click", function(){
                if( $(this).hasClass("active") ){
                    $(this).removeClass("active").addClass("out");
                } else {
                    $(this).addClass("active").removeClass("out");
                }
            });

        }

    });


});