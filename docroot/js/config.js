require.config({
    shim: {
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            init: function (_, jq) {
            Backbone.$ = jq.noConflict(true);
            return Backbone.noConflict();
            }
        },

        underscore: {
            init: function () {
                return _.noConflict();
            }
        }
    },
    map: {
        '*': {
            jquery: 'jq_loader_1.10.2'
        },
        'jq_loader_1.10.2': {
            jquery: 'jquery'
        },
        jQuery: {
            jquery: 'jquery'
        }
    },
    paths: {
        backbone: '../_resources/bower/backbone/backbone',
        underscore: '../_resources/bower/underscore/underscore',
        'jquery_1.10.2': '../_resources/bower/jquery/dist/jquery',
        requirejs: '../_resources/bower/requirejs/require',
        t8y: '../_resources/bower/t8y/js'
    },
    config: {
        't8y/utils/parser': {
            parseOnLoad: true
        }
    }
});

require(['main'], function ($) {


});





