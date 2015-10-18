define([ 'jquery', 'underscore', 'backbone' ], function ($, _) {

    return Backbone.View.extend({

        events: {
            'menu:resize': resizeMenu,
            'menu:initMegaToggle': initMegaToggle
        },

        initialize: function () {

            resizeMenu(this);

            // init Mega toggle
            initMegaToggle(this);
            if( $('.bottomNav', this.$el).length < 1 ){
                $('.header[data-fragment="header/menu"]').removeClass("loggedIn");
            }

            $(window).on('resize', _.bind(function (event) {
                this.$el.trigger($.Event('menu:resize', { el: this.$el }));
            }, this));

        }

    });

    function initMegaToggle(event) {
        $.each($('.hasMega', $(event.el)), function (index, entry) {

            if ($(entry).attr("data-show-mega") == "true") {

                // Click
                $(entry).on('click', _.bind(function (event) {

                    if ($(entry).hasClass("hover")) {
                        // wenn du im Megamenu clickst, dann nicht schliessen

                        // klick auf menu - toggle
                        /*
                        if ($(event.target).closest('.mega').length < 1) {
                            $(entry).removeClass("hover");
                            $('body').removeClass("layer");
                        }
                        */

                    } else {
                        // wenn du im Menu clickst
                        if ($(event.target).closest('.mega').length < 1) {
                            $('.hasMega').removeClass("hover show");
                            $(entry).addClass("hover show");
                            $('body').addClass("layer");
                        }
                    }
                }, this));

                // Mouseover : nach 500ms wird es erst angezeigt

                var menuHoverTimer;
                var menuOutTimer;

                $(entry).hover(
                    function () {
                        window.clearTimeout(menuOutTimer);
                        menuHoverTimer = window.setTimeout(function () {
                            $(entry).addClass("hover");
                            $('.mega[data-fragment="header/mega"]', entry);//.addClass("fadeInLeft");
                            $('.menu[data-element="mega"]').removeClass("show");
                            $('body').addClass("layer");
                        }, 500);
                    }, function () {
                        window.clearTimeout(menuHoverTimer);
                        menuOutTimer = window.setTimeout(function () {
                            $(entry).removeClass("hover");
                            $('.mega[data-fragment="header/mega"]', entry);//.removeClass("fadeInLeft");
                            $('body').removeClass("layer");
                        }, 500);
                    }
                );

            } else {
                $(entry).on('click', _.bind(function (e) {
                    $('.hasMega', $(event.el)).removeClass("hover active");
                    $(this).addClass("active");
                }, this));
            }
        });
    }

    function resizeMenu(event) {
        var target = $('.header[data-module="header"]');
        if ($(event.el).height() > $(window).height()) {
            target.addClass("smallSize");
            if ($(event.el).height() > $(window).height()) {
                target.addClass("scroll-y");
            }
        } else {
            target.removeClass("scroll-y smallSize");
            if ($(event.el).height() > $(window).height()) {
                resizeMenu(event);
            }
        }
    }

});