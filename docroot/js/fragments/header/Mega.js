define([ 'jquery', 'underscore', 'backbone' ], function ($, _) {

    return Backbone.View.extend({

        events: {
            'mega:resize': resizeMega,
            'mega:show': show,
            'mega:hide': hide
        },

        initialize: function () {

            resizeMega(this);

            $(window).on('resize', _.bind(function (event) {
                this.$el.trigger($.Event('mega:resize', { el: this.$el }));
            }, this));

            $('[data-element="closeButton"]', this.$el).on('click', _.bind(function (event) {
                this.$el.trigger($.Event('mega:hide', { el: this.$el }));
            }, this));


            $.each($('.second', this.$el), function (index, entry) {
                var height = $(entry).parent().closest('.col').height() + 25;
                $(entry).css({ height: height });
                // Mouseover
                $(entry).parent().hover(
                    function () {
                        $('.mega-col-third').addClass("hide");
                    }, function () {
                        $('.mega-col-third').removeClass("hide");
                    }
                );

            });

            $.each($('.third', this.$el), function (index, entry) {
                var height = $(entry).parent().closest('.col').height();
                $(entry).css({ height: height });
            });

            $('.first > li', this.$el).hover(
                function () {
                    $(this).addClass("hover");
                }, function () {
                    $(this).removeClass("hover");
                }
            );
            $('.second > li', this.$el).hover(
                function () {
                    $(this).addClass("hover");
                }, function () {
                    $(this).removeClass("hover");
                }
            );
            $('.third > li', this.$el).hover(
                function () {
                    $(this).addClass("hover");
                }, function () {
                    $(this).removeClass("hover");
                }
            );

            $('.columnHeader', this.$el).on("click", _.bind(function (event) {
                $('.row .col-1:first-child .first > li', this.$el).removeClass("hover");
            }, this));

        }

    });

    function show(event) {
        $(event.el).closest('.hasMega').addClass("hover");
    }

    function hide(event) {
        $(event.el).closest('.hasMega').removeClass("hover show");
    }

    function resizeMega(event) {

    }

});