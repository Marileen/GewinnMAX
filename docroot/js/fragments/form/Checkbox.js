define([ 'jquery', 'backbone', 'underscore' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        events: {
            'checkbox:select': selectCheckbox
        },

        initialize: function() {

            if( $('input', this.$el).prop('checked') ){
                this.$el.addClass('checked');
            }

            $('.input', this.$el).on( 'click', _.bind( function( event ){
                if( !$("html").hasClass("lte8") ){
                    event.preventDefault();
                }
                this.$el.trigger( $.Event('checkbox:select', { el: this.$el }));
            }, this ));

            // set links target=_blank
            $.each( $('.text a', this.$el), function( index, link ){
                if( !$(link).attr("target") ){
                    $(link).attr("target","_blank");
                }
            });

        }

    });

    function selectCheckbox( checkbox ){
        if( $('input', checkbox.el).prop('checked') ){
            $('input', checkbox.el).prop('checked', false);
            $(checkbox.el).removeClass('checked');
        } else {
            $('input', checkbox.el).prop('checked', true);
            $(checkbox.el).addClass('checked');
        }

        // Validation
        var form = $(checkbox.el).closest('.controller[data-controller="fragments/Form"]');
        if( form.attr("data-inline-validation") == "true" ){
            form.trigger( $.Event('form:validField', { el: $('input', checkbox.el) }));
        }

    }

});