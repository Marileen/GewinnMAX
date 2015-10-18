define([ 'jquery', 'underscore', 'backbone' ], function( $, _ ) {

    return Backbone.View.extend({

        events: {
            'teaser:open': open,
            'teaser:setHoverTextTop': setHoverTextTop
        },

        initialize: function () {

            if( $(this.$el).attr("data-href") ){
                $(this.$el).on( 'click', _.bind( function( event ){
                    this.$el.trigger( $.Event('teaser:open', { el: this.$el }));
                }, this ));
            }

        }

    });

    function setHoverTextTop(){
        if( $(this.$el).hasClass("hoverText") && !$(this.$el).hasClass("setHeight") ){
            var teaserHeight = parseInt($(this.$el).height());
            var headlineHeight = parseInt($('h2', this.$el).height()) + parseInt($('h2', this.$el).css("marginBottom")) + 25;
            var top = Math.round(100*(1-(headlineHeight/teaserHeight)),2)+"%";
//            console.log("teaser setHoverTextTop: " + top );
            $('.content',this.$el).css({ top: top });
            $(this.$el).addClass("setHeight");
        }
    }

    function open( event ) {
         if($(event.el).attr("data-href-target") && $(event.el).attr("data-href-target").length > 0) {
             if( $(event.el).attr("data-href-target") == "extern" ){
                 window.open( $(event.el).attr("data-href") );
             } else {
                 document.location.href = $(event.el).attr("data-href");
             }
         } else {
             document.location.href = $(event.el).attr("data-href");
         }
    }

});