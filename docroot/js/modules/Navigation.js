define(['module', 'jquery', 't8y/types/Controller'], function (module, $, Controller) {

    return Controller.extend({

        events: {
            'mouseenter >li': onHoverIn,
            'mouseleave >li': onHoverOut,
            'click a': onClick
        },

        initialize: function () {

            Controller.prototype.initialize.apply(this, arguments);
            console.log('Main Navi hover init');

        }
    });

    // embedded hover fallback in jquery
    function onHoverIn(e) {
        $(e.currentTarget).addClass('hover');
    }

    // embedded hover fallback in jquery
    function onHoverOut(e) {
        $(e.currentTarget).removeClass('hover');
    }

    function onClick(e) {
        // prevent jumping to top of page on touch devices
        if ($(e.currentTarget).attr('href') === '#') {
            e.preventDefault();
        }
    }
});