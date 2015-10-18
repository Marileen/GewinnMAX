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
        },
        history: {
            exports: 'History'
        },
        TweenMax: {
            deps: [
                'greensock/plugins/CSSPlugin',
                'greensock/easing/EasePack'
            ],
            exports: 'TweenMax'
        },
        gmaps: {
            deps: [
                'jquery'
            ]
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
        modernizr: '../_resources/bower/modernizr/modernizr',
        css: '../_resources/bower/require-css/css',
        'css-builder': '../_resources/bower/require-css/css-builder',
        normalize: '../_resources/bower/require-css/normalize',
        requirejs: '../_resources/bower/requirejs/require',
        'requirejs-text': '../_resources/bower/requirejs-text/text',
        isotope: '../_resources/bower/isotope/jquery.isotope',
        history: '../_resources/bower/history/scripts/bundled-uncompressed/html4+html5/native.history',
        t8y: '../_resources/bower/t8y/js',
        'jquery-whenlive': '../_resources/bower/jquery-whenlive/src/jquery.whenlive',
        'jquery-cookie': '../_resources/bower/jquery-cookie/jquery.cookie',
        TweenMax: '../_resources/bower/greensock/src/uncompressed/TweenMax',
        greensock: '../_resources/bower/greensock/src/uncompressed',
        RestModel: '../js/assets/RestModel',
        'jquery-pointerevents': '../_resources/bower/jquery-pointerevents/dist/jquery-pointerevents',
        async: '../_resources/bower/requirejs-plugins/src/async',
        depend: '../_resources/bower/requirejs-plugins/src/depend',
        font: '../_resources/bower/requirejs-plugins/src/font',
        goog: '../_resources/bower/requirejs-plugins/src/goog',
        image: '../_resources/bower/requirejs-plugins/src/image',
        json: '../_resources/bower/requirejs-plugins/src/json',
        mdown: '../_resources/bower/requirejs-plugins/src/mdown',
        noext: '../_resources/bower/requirejs-plugins/src/noext',
        propertyParser: '../_resources/bower/requirejs-plugins/src/propertyParser',
        'Markdown.Converter': '../_resources/bower/requirejs-plugins/lib/Markdown.Converter',
        text: '../_resources/bower/requirejs-plugins/lib/text',
        plupload: '../_resources/bower/plupload/js/plupload.full.min',
        'jquery.postmessage-transport': '../_resources/bower/jquery-file-upload/js/cors/jquery.postmessage-transport',
        'jquery.xdr-transport': '../_resources/bower/jquery-file-upload/js/cors/jquery.xdr-transport',
        'jquery.ui.widget': '../_resources/bower/jquery-file-upload/js/vendor/jquery.ui.widget',
        'jquery.fileupload': '../_resources/bower/jquery-file-upload/js/jquery.fileupload',
        'jquery.fileupload-process': '../_resources/bower/jquery-file-upload/js/jquery.fileupload-process',
        'jquery.fileupload-validate': '../_resources/bower/jquery-file-upload/js/jquery.fileupload-validate',
        'jquery.fileupload-image': '../_resources/bower/jquery-file-upload/js/jquery.fileupload-image',
        'jquery.fileupload-audio': '../_resources/bower/jquery-file-upload/js/jquery.fileupload-audio',
        'jquery.fileupload-video': '../_resources/bower/jquery-file-upload/js/jquery.fileupload-video',
        'jquery.fileupload-ui': '../_resources/bower/jquery-file-upload/js/jquery.fileupload-ui',
        'jquery.fileupload-jquery-ui': '../_resources/bower/jquery-file-upload/js/jquery.fileupload-jquery-ui',
        'jquery.fileupload-angular': '../_resources/bower/jquery-file-upload/js/jquery.fileupload-angular',
        'jquery.iframe-transport': '../_resources/bower/jquery-file-upload/js/jquery.iframe-transport',
        slick: '../_resources/bower/slick.js/slick/slick.min'
    },
    config: {
        't8y/utils/parser': {
            parseOnLoad: true
        }
    }
});

require(['main'], function ($) {

});





