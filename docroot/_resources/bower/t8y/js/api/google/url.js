define(['module', 'jquery', '../../utils/url'], function(module, $, url) {

    var defaultQRCodeSize = 150;

    return {
        shorten: function(uri, callback) {
            loadLibrary(function() {
                gapi.client.urlshortener.url.insert({
                    'resource': {
                        'longUrl': uri
                    }
                }).execute(function(resp) {
                    if (resp.error) {
                        console.log('Error. ' + resp.error.message);
                    } else {
                        callback(resp.id);
                    }
                });
            });
        },

        expand: function(uri, callback) {
            loadLibrary(function() {
                gapi.client.urlshortener.url.get({
                    'shortUrl': uri
                }).execute(function(resp) {
                    if (resp.error) {
                        console.log('Error. ' + resp.error.message);
                    } else {
                        callback(resp.result);
                    }
                });
            });
        },

        toQRCode: function(uri, callback, size) {
            size = size || defaultQRCodeSize;
            var urlObj = url.toObject('//chart.googleapis.com/chart');
            urlObj.query = {
                chs: size + 'x' + size,
                cht: 'qr',
                chl: uri,
                choe: 'UTF-8',
                chld: 'H'
            }
            createImage(urlObj.toString(), callback);
        }
    }

    function loadLibrary(callback) {
        require(['async!//apis.google.com/js/client.js!onload'], function() {
            if(!gapi.client.urlshortener) {
                if(module.config().apiKey) {
                    gapi.client.setApiKey(module.config().apiKey);
                    gapi.client.load('urlshortener', 'v1', callback);
                } else {
                    throw 'API Key not defined in config. Sample: "t8y/api/google/url": { apiKey: "<YOUR API KEY>"}';
                }
            } else {
                callback();
            }
        });
    }

    function createImage(url, callback) {
        var img = new Image();
        img.onload = function() {
            callback({
                image: img,
                url: url
            });
        };
        img.src = url;
    }
});