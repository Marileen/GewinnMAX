
define([
    'jquery',
    'underscore',
    't8y/tracking/omniture',
    't8y/History',
    't8y/utils/speed',
    't8y/api/bitly/url',
    't8y/api/google/url',
    't8y/api/Facebook',
    't8y/api/facebook/User',
    't8y/services/Upload',
    't8y/services/websocket',
    't8y/media/gameone/TVSlider',
    't8y/media/gameone/BlogSlider',
    't8y/layer/Modal',
    't8y/slider/controls/Button',
    't8y/types/HTMLCache',
    't8y/types/ImageCache',
    't8y/utils/parser'
], function($, _, omniture, History, speed, bitly, goo, Facebook, User, Upload) {

//    new User({id: '/me'}).update(function(user) {
//        console.log(user.getName());
//    });

//    bitly.shorten('http://www.spiegel.de', function(url) {
//        console.log(url);
//        bitly.expand(url, function(config) {
//            console.log('BITLY', config);
//        });
//    });
//
//    goo.shorten('http://www.spiegel.de', function(url) {
//        console.log(url);
//        goo.expand(url, function(config) {
//            console.log('GOOGLE', config);
//        });
//        goo.toQRCode(url, function(result) {
//            console.log(result);
////            $('body').append(result.image);
//        }, 300);
//    });

    speed.test(null, function(speed) {
        console.log(speed.bitrate.mbps, speed.transmission);
    });
//    var cache = new HTMLCache();
//    cache.getPage('picture.html', function(data) {
//        console.log(data);
//        cache.getPage('picture.html', function(data) {
//            console.log(data);
//        })
//    })







    $(function() {

        omniture.setup('initial-page-load', function() {
            console.log('ACCOUNT:', window.s_account);
            omniture.pageLoad.send('page-load');
            omniture.internalLink.send('internal-link');
            omniture.internalCustomerLink.send('internal-customer-link', 'prop33');
            omniture.downloadLink.send('download-link');

            omniture.pageLoad.setCarModel('Der Golf', 'Der Golf Cup', 'Cup');
            omniture.pageLoad.send('page-load');
            omniture.internalLink.setCarModel('Der Golf', 'Der Golf Cup', 'Cup');
            omniture.internalLink.send('internal-link');
            omniture.internalCustomerLink.setCarModel('Der Golf', 'Der Golf Cup', 'Cup');
            omniture.internalCustomerLink.send('internal-customer-link', 'prop33');

            omniture.pageLoad.resetCarModel();
            omniture.pageLoad.send('page-load');
            omniture.internalLink.resetCarModel();
            omniture.internalLink.send('internal-link');
            omniture.internalCustomerLink.resetCarModel();
            omniture.internalCustomerLink.send('internal-customer-link', 'prop33');
        });

        History.reset();

//        History.register('param0', function(value, usedBrowserControls) {
//            console.log('PARAM0', value, usedBrowserControls);
//        });
//        History.register('param1', function(value, usedBrowserControls) {
//            console.log('PARAM1', value, usedBrowserControls);
//        });
//
//        History.register('page', function(value, usedBrowserControls) {
//            switch(value) {
//                case 'one':
//                    History.update({'param0': '#hello', 'param1': 'world', 'page': 'two'}, 'Page Change');
//                    break;
//                case 'two':
//                    History.reset(['page'], 'Reset param0 and param1');
//                    break;
//                default:
//                    History.update('page', '#one', 'Show Page One');
//                    break;
//            }
//        }, 'zero');

//        var blog = new Blog();
//        blog.next(function(posts) {
//            posts.models[0].loadMediaData(function(formats) {
//                console.log(formats);
//            });
////            blog.next(function() {
////
////            });
//        });

//        blog.getConfigUrl('http://www.gameone.de/blog/2014/6/kino-17-2-2-filme-und-fussball', function(configUrls) {
//            for(var i = 0; i < configUrls.length; i++) {
//                console.log('CONFIG URL', configUrls[i]);
//            }
//        });
//        blog.getMediaConfigUrl('http://www.gameone.de/api/mrss/mgid:gameone:video:mtvnn.com:video_meta-e4b6675e1f0b29f51ccfcd37d8f69d35', function(mediaConfigUrl) {
//            console.log('MEDIA CONFIG URL', mediaConfigUrl);
//        });
//        blog.getMediaFormats('http://videos.mtvnn.com/mediagen/e4b6675e1f0b29f51ccfcd37d8f69d35?stream_format=mp4', function(formats) {
//            console.log(formats);
//        });
    })
});