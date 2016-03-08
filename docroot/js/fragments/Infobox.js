define([ 'jquery', 'underscore', 'backbone' ], function( $, _ ) {

    return Backbone.View.extend({

        events: {
            'infobox:toggle': toggle,
            'infobox:open': open,
            'infobox:close': close,
            'click .close-layer': closeLayer
        },

        initialize: function () {

            $('.toggle', this.$el).on( 'click', _.bind( function( event ){
                this.$el.trigger( $.Event('infobox:toggle', { el: this.$el }));
            }, this ));

            $('[data-element="closeButton"]', this.$el).on( 'click', _.bind( function( event ){
                event.preventDefault();
                event.stopPropagation();
                this.$el.trigger( $.Event('infobox:close', { el: this.$el }));
            }, this ));

            $('.toggle', this.$el).on( 'mouseover', _.bind( function( event ){
                this.$el.trigger( $.Event('infobox:open', { el: this.$el }));
            }, this ));
        }

    });

    function open( event ) {
        $(event.el).removeClass("close").addClass("open");
    }

    function close( event ) {
        $(event.el).removeClass("open").addClass("close");
    }

    function toggle( event ) {
        if( this.$el.hasClass("open") ){
            this.$el.trigger( $.Event('infobox:close', { el: this.$el }));
        } else {
            this.$el.trigger( $.Event('infobox:open', { el: this.$el }));
        }
    }

    function closeLayer( event ) {

        event.preventDefault();
        $(event.currentTarget).parents('.infobox.open').removeClass('open');
    }

});