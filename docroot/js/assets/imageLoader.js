define([ 'jquery', 'backbone', 'underscore', 'jquery-whenlive' ], function ( $, Backbone, _ ) {

    var images = $();
    var loadedInterval;
    var loaded = 0;
    var errorLoaded = 0;

    return {
        parse: function(node) {
            if(!node) {
                node = $('body');
            }
            var nodes = $('.image[data-asset="image"]', node);
            loadImages( nodes );
            $.merge(images, nodes);
            window.setTimeout(function(){
                if(loadedInterval) {
                    //console.log("imageLoader clearInterval");
                    window.clearInterval( loadedInterval );
                }
            }, 10000);
        }
    }

    function loadImages(images) {
        images.each(function(index, image) {
            var src = $('.img', image).attr('data-src');
            if(src){
                $('.img', image).attr('src', src);
                $('.img', image).removeAttr('data-src');
                $('.img', image).load(function() {
                    loaded++;
                }).error(function() {
                    errorLoaded++;
                });
                $(image).removeClass("loading");
            } else {
                loaded++;
            }
        });
        loadedInterval = window.setInterval(function(){ checkLoaded(images,loaded) }, 100);
    }

    function checkLoaded(images) {
        //console.log("imageLoader found/loaded/error:"+images.length+"/"+loaded+"/"+errorLoaded);

        if( (loaded+errorLoaded) >= images.length ){

            // render special elements
            var teaserRows = $('.controller[data-controller="fragments/TeaserRow"]');
            var teaserRowsLength = teaserRows.length;
            var rowLoaded = 0;
            //console.log("trigger Teaser elements:"+teaserRowsLength);

            var teaserInterval = window.setInterval(function(){
                $.each( teaserRows, function( index, teaserRow ){
                    if( !$(teaserRow).hasClass("setHeight") ){
                        $(teaserRow).trigger( $.Event('teaserRow:render',{}));
                    } else {
                        rowLoaded += 1;
                        if( rowLoaded >= teaserRowsLength ){
                            window.clearInterval( teaserInterval );
                        }
                    }
                });
            }, 200);

            $('.hoverText.controller[data-controller="fragments/Teaser"]').trigger( $.Event('teaser:setHoverTextTop',{}));

            window.clearInterval( loadedInterval );
        }
    }

    function removeLoader(images) {
        images.each(function(index, image) {
            $(image).removeClass("loading");
        });
    }

});
