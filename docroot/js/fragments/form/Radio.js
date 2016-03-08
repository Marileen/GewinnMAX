define([ 'jquery', 'backbone', 'underscore' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        events: {
            'radio:select': selectRadio
        },

        initialize: function() {

            if( $('input', this.$el).prop('checked') ){
                this.$el.addClass('checked');
            }

            this.$el.on( 'click', _.bind( function( event ){
                if( !$("html").hasClass("lte8") ){
                    event.preventDefault();
                }
                this.$el.trigger( $.Event('radio:select', { el: this.$el }));
            }, this ));

        }

    });

    function selectRadio( radio ){
        // reset group
        var name = $('input', radio.el).attr("name");
        $('input[name="'+name+'"]').prop('checked', false);
        $('input[name="'+name+'"]').parent().removeClass("checked");
        // select radio
        $('input', radio.el).prop('checked', true);
        $(radio.el).addClass('checked');

        // Validation
        var form = $(radio.el).closest('.controller[data-controller="fragments/Form"]');
        if( form.attr("data-inline-validation") == "true" ){
            form.trigger( $.Event('form:validField', { el: $('input', radio.el) }));
        }

    }

});