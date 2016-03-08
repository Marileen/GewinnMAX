define([ 'jquery', '../../utils/device' ], function( $, device ) {
    var SOURCE_BASE_URL = '//api.kewego.com/video/getStream/';
    var THUMB_BASE_URL = '//api.kewego.com/video/getThumbnail/';
    var SOURCE_QUALITY = {
        DESKTOP: [
            { webm: 'webm_hq', mp4: 'high', ogg: 'ogg_w960' },
            { webm: 'webm', mp4: 'normal', ogg: 'ogg' }
        ],
        PHONE: [
            { mp4: 'iphone' },
            { mp4: 'iphone3G' }
        ],
        TABLET: [
            { mp4: 'ipadHQ' },
            { mp4: 'iphone' }
        ]
    };
    var THUMB_QUALITY = ['large', 'normal', 'small'];
    var token = null;

    return {
        QUALITY: {
            HIGH: 0,
            NORMAL: 1,
            LOW: 2
        },
        getSourcesAndPoster: function(id, quality, callback) {
            getAccessToken(function(t) {
                callback({
                    sources: generateSourceUrlList(id, quality),
                    poster: generatePosterUrl(id, quality)
                });
            });
        },

        getSources: function(id, quality, callback) {
            getAccessToken(function(t) {
                callback(generateSourceUrlList(id, quality));
            });
        },
        getPoster: function(id, quality, callback) {
            getAccessToken(function(t) {
                callback(generatePosterUrl(id, quality));
            });
        }
    }

    function generateSourceUrlList(id, quality) {
        var list = [];
        var formats = getFormats();
        var qualityLevels = getQualityLevels();
        for(var i = 0; i < formats.length; i++) {
            list.push({ type: formats[i], url: generateSourceUrl(id, qualityLevels[ quality ][formats[i]]) });
        }
        return list;
    }

    function generateSourceUrl(id, format) {
        return SOURCE_BASE_URL + '?appToken=' + token + '&sig=' + id + '&format=' + format;
    }

    function generatePosterUrl(id, quality) {
        return THUMB_BASE_URL + '?appToken=' + token + '&sig=' + id + '&size=' + THUMB_QUALITY[quality] + '&index=3';
    }

    function getAccessToken( callback ) {
        if(token != null) {
            callback(token);
        } else {
            $.ajax({
                url: '/ws/kewego/token'
            }).done(function(data) {
                    token = data;
                    callback(token);
                });
        }
    }

    function getQualityLevels() {
        switch(device.getType()) {
            case device.types.PHONE:
                return SOURCE_QUALITY.PHONE;
            case device.types.TABLET:
                return SOURCE_QUALITY.TABLET;
            default:
                return SOURCE_QUALITY.DESKTOP;
        }
    }

    function getFormats() {
        var formats = [ 'mp4' ];
        if(device.isPortable() !== true) {
            formats = [ 'webm', 'mp4', 'ogg' ];
        }
        return formats;
    }
});

