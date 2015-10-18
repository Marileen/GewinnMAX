define([ 'jquery', 'backbone', 'underscore' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        events: {
            'teaserRow:render': render
        },

        initialize: function() {
        }

    });

    function render() {

        if( $('.col', this.$el ).length > 1 && !$(this.$el).hasClass("setHeight") ) {

            var maxHeight = 0;

            $.each( $('.col',this.$el), function(index, element) {
                if( $('.teaser[data-fragment="teaser"]', element).height() > maxHeight ) {
                    maxHeight = $('.teaser[data-fragment="teaser"]', element).height();
                }
            });

            if( maxHeight > 0 ) {

                var diffHeight = 0;

                $.each( $('.col',this.$el), function(index, element) {
                    diffHeight = maxHeight - $('.teaser[data-fragment="teaser"]', element).height();
                    $('.teaser[data-fragment="teaser"]', element).css({ minHeight: maxHeight });
                    $('.teaser[data-fragment="teaser"] .content', element).css({ marginBottom: diffHeight });
                });
            }
            $(this.$el).addClass("setHeight");

        }

    }
});