define([ 'jquery', 'backbone', 'underscore' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        events: {
            'accordion:toggle': toggle,
            'accordion:open': open,
            'accordion:close': close
        },

        initialize: function() {

            var controllerName = this.$el.data('controller');

            //wenn in der ContextSpalte nur ein Accordion Element gefunden wird, dann ist es immer
            //geöffnet und hat keinen Toggle Button

            var $accordionsInContextColumn = $('[data-controller="modules/Context"] [data-controller="' + controllerName + '"]');

            if ($accordionsInContextColumn.length == 1) {
                $accordionsInContextColumn.removeClass("close").addClass("open").find('a.btn.toggle').remove();
            }


            $('.toggle, hgroup', this.$el).on( 'click', _.bind( function( event ){

                //alle die dieselbe data-group haben schließen
                if (this.$el.data('group')) {

                    var groupName = this.$el.data('group');

//                    $('[data-controller="' + controllerName + '"][data-group="' + groupName + '"]').removeClass("open").addClass("close");
                    $('[data-group="' + groupName + '"]').removeClass("open").addClass("close");
                }

                this.$el.trigger( $.Event('accordion:toggle', { el: this.$el }));

            }, this ));

        }

    });


    function open( event ) {
        $(event.el).removeClass("close").addClass("open");
        var targetOpen = $(event.el).attr("data-target-open");
        if( targetOpen ){
            $( targetOpen ).removeClass("close").addClass("open");
        }
    }

    function close( event ) {
        $(event.el).removeClass("open").addClass("close");
        var targetOpen = $(event.el).attr("data-target-open");
        if( targetOpen ){
            $( targetOpen ).removeClass("open").addClass("close");
        }
    }

    function resizeMenu( event ) {
        var targetResize = $(event.el).attr("data-target-resize");
        if( targetResize ){
            $(targetResize).trigger( $.Event('menu:resize', { el: $(targetResize) }));
            $(targetResize).trigger( $.Event('context:resize', { el: $(targetResize) }));
        }
    }

    function toggle( event ) {
        if( $(event.el).hasClass("open") ){
            $(event.el).trigger( $.Event('accordion:close', { el: this.$el }));
        } else {
            $(event.el).trigger( $.Event('accordion:open', { el: this.$el }));
            if( $(event.el).closest('.header[data-module="header"]').length > 0 ){
                $('.header[data-module="header"]').trigger( $.Event('header:toggleNav', { el: event.el }) );
            }
        }
        resizeMenu( event );

    }

});