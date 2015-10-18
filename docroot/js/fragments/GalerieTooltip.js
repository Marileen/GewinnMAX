define([ 'jquery', 'backbone', 'underscore', 'TweenMax', 't8y/slider/Scroll', 't8y/types/Point', 't8y/types/Size', 't8y/utils/device/display', 't8y/utils/math', 't8y/slider/Flip', 't8y/slider/FlipModel' ], function( $, Backbone, _, TweenMax, Scroll, Point, Size, display, math, Flip, FlipModel ) {

    return Flip.extend({

//        model: FlipModel,

        slideInterval: null,
        duration: 5,
        status: "play",
        startIndex: 0,
        index: 0,
        maxLength: 1,
        thumbAutoslide: false,
        thumbSpeed: 30,

        initialize: function() {

            Flip.prototype.initialize.apply(this, arguments);

            $('[data-element="fullscreenButton"]',this.$el).on( 'click', _.bind( function( event ){
                this.$el.addClass("fullscreen");
                resize( this );
                $.each($('.image[data-asset="image"].zoomable', this.$el), function(index, image) {
                    var src = $('.zoom', image).attr('data-zoom-src');
                    if( src ){
                        $('.zoom', image).attr('src', src);
                        $('.zoom', image).removeAttr('data-zoom-src');
                    }
                });
            }, this ));

            //Hover auf iPad 2 funtioniert nicht richtig, daher auf Klick das Hover setzen:
            $('figure [data-element="view"]').on('click', function () {
                $('figure [data-element="view"]').removeClass('hover');
                $(this).addClass('hover');
            });

            $('figure [data-element="view"]').hover(
                function() {
                    $('figure [data-element="view"]').removeClass('hover');
                    $(this).addClass('hover');
                }, function() {
                    $('figure [data-element="view"]').removeClass('hover');
                }
            );

            $('[data-element="closeButton"]',this.$el).on( 'click', _.bind( function( event ){
                this.$el.removeClass("fullscreen");
                resize( this );
            }, this ));

            $('[data-element="thumbnailButton"]',this.$el).on( 'click', _.bind( function( event ){
                event.preventDefault();
                if( this.$el.hasClass("openThumb") ){
                    this.$el.removeClass("openThumb");
                } else {
                    this.$el.addClass("openThumb");
                }
            }, this ));

            this.duration = this.$el.attr('data-autoslideseconds');

            if( this.duration ) {

                this.slideInterval = window.setInterval( _.bind(this.autoPlay, this), (this.duration) ? this.duration*1000 : 5000 );

                this.$el.hover(_.bind( function( event ) {
                    this.mouseIn();
                }, this ), _.bind( function( event ) {
                    this.mouseOut();
                }, this ));

                $('[data-element="autoslideControl"]', this.$el).on('click', _.bind( function ( event ) {
                    event.preventDefault();
                    event.stopPropagation();
                    if ($('[data-element="autoslideControl"] .pause').hasClass('active')) {
                        this.stop();
                    } else {
                        this.play();
                    }
                }, this));
                $('.pagination', this.$el).on('click', _.bind( function ( event ) {
                    event.preventDefault();
                    this.stop();
                }, this));
            }
            this.index = parseInt( this.$el.attr("data-start-index") );
            this.maxLength = this.figures.length;
            this.animationToView( this.index, 300 );

            this.thumbAutoslide = (this.$el.attr("data-thumb-autoslide") == "true") ? true : false;
            this.thumbSpeed = (this.$el.attr("data-thumb-speed")) ? parseInt(this.$el.attr("data-thumb-speed")) : 25;
            if( this.thumbAutoslide ){
                this.$el.addClass("autoslide");
                $.each( $('.thumbnail .wrapper[data-element="wrapper"]', this.$el), _.bind( function( index, thumbBar ){
                    this.animy(thumbBar);
                }, this));
            }

        },

        animy: function(thumbBar){
            var outerWith = $(thumbBar).width();
            var innerWidth = 0;
            $.each($('> figure',thumbBar), _.bind( function( i, f ){
               innerWidth += $(f).width();
            }, this ));
            var diff = outerWith - innerWidth;
            var dura = Math.round(diff * -this.thumbSpeed);

            if( diff <= 0 ){
                $(thumbBar).attr("data-direction","right");
                $(thumbBar).css({ "left": 0 }).animate({ "left": diff+"px" }, dura, "linear", _.bind( function(){
                    this.checkDirection( thumbBar );
                }, this ));

                $(thumbBar).hover(_.bind( function( event ) {
                    $(thumbBar).addClass("pause").stop();
                }, this ), _.bind( function( event ) {
                    this.changeAnimy( thumbBar );
                }, this ));
            }
        },

        changeAnimy: function(thumbBar){
            var outerWith = $(thumbBar).width();
            var innerWidth = 0;
            $.each($('> figure',thumbBar), function( i, f ){
                innerWidth += $(f).width();
            });
            var diff = outerWith - innerWidth;
            var left = parseInt($(thumbBar).css( "left" ));
            var direction = $(thumbBar).attr("data-direction");
            var dura = ( direction == "right" ) ? Math.round((diff-left) * -this.thumbSpeed) : Math.round((left) * -this.thumbSpeed);
            if( dura > 0 || $(thumbBar).hasClass("toggle") ){
                $(thumbBar).removeClass("toggle");
                if( direction == "right" ){
                    $(thumbBar).removeClass("pause").animate({ "left": diff+"px" }, dura, "linear", _.bind( function(){
                        this.checkDirection( thumbBar );
                    }, this ));
                } else if( direction == "left" ){
                    $(thumbBar).removeClass("pause").animate({ "left": "0" }, dura, "linear", _.bind( function(){
                        this.checkDirection( thumbBar );
                    }, this ));
                }
            } else {
                this.checkDirection( thumbBar );
            }
//            console.log( outerWith, innerWidth, diff, dura, direction );
        },

        checkDirection: function(thumbBar){
            var direction = $(thumbBar).attr("data-direction");
            direction = ( direction=="right" ) ? "left" : "right";
            $(thumbBar).attr("data-direction",direction).addClass("toggle");
            this.changeAnimy( thumbBar );
        },

        render: function() {
            Flip.prototype.render.apply(this, arguments);

        },

        mouseIn: function(){
            if( this.status == "play" ){
                this.pause();
            }
        },

        mouseOut: function(){
            if( this.status == "pause" ){
                this.play();
            }
        },

        play: function(){
            this.status = "play";
            window.clearInterval(this.slideInterval);
//            this.autoPlay();
            this.slideInterval = window.setInterval(_.bind(this.autoPlay, this), (this.duration) ? this.duration*1000 : 5000);
            $('[data-element="autoslideControl"] .play').addClass('active');
            $('[data-element="autoslideControl"] .pause').removeClass('active');
            $('[data-element="autoslideControl"] .stop').removeClass('active');
            //console.log( $('[data-element="autoslideControl"] .play') );
        },

        pause: function(){
            this.status = "pause";
            window.clearInterval(this.slideInterval);
            $('[data-element="autoslideControl"] .play').removeClass('active');
            $('[data-element="autoslideControl"] .pause').addClass('active');
            $('[data-element="autoslideControl"] .stop').removeClass('active');
        },

        stop: function(){
            this.status = "stop";
            window.clearInterval(this.slideInterval);
            $('[data-element="autoslideControl"] .play').removeClass('active');
            $('[data-element="autoslideControl"] .pause').removeClass('active');
            $('[data-element="autoslideControl"] .stop').addClass('active');
        },

        autoPlay: function(){
            this.index = parseInt(this.$el.find('.wrapper .slide.active').attr("data-no"));
            this.index = this.index+1;
            if( this.index >= this.maxLength ){
                this.index = 0;
            }
            this.animationToView( this.index, 1000 );
        }

    });

    function resize( element ) {
        window.setTimeout(function(){
            $('.controller[data-controller="t8y/slider/Flip"]').resize();
        },100);
    }

});