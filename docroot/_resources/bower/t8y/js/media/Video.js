define(['module', 'jquery', '../types/Controller', '../utils/device', '../utils/device/os', 'mediaelementplayer'], function(module, $, Controller, device) {

    var config = {
//        mode: 'shim',
        enablePluginDebug: false,
        plugins: ['flash','silverlight'],
        pluginPath: module.config().pluginPath,
        flashName: 'flashmediaelement.swf',
        silverlightName: 'silverlightmediaelement.xap',
        startVolume: 0.8,
        loop: false,
        enableAutosize: true,
        features: ['playpause','progress','current','duration','tracks','volume','fullscreen'],
        alwaysShowControls: false,
        iPadUseNativeControls: false,
        iPhoneUseNativeControls: true,
        AndroidUseNativeControls: true,
        framesPerSecond: 25,
        enableKeyboard: true,
        pauseOtherPlayers: true,
        keyActions: [],
        success: function() {}
    }

    return Controller.extend({

        initialize: function() {
            Controller.prototype.initialize.apply(this, arguments);

            var video = $('video', this.el).get(0);
            if(device.isPhone()) {
                config.success = onMobileSuccess;
                this.player = new MediaElement(video, config);
            } else {
                config.success = onSuccess;
                this.player = new MediaElementPlayer(video, config);
            }
        },

        reset: function() {
            this.player.setCurrentTime(this.player.media.duration);
        },

        destroy: function() {
            Controller.prototype.destroy.apply(this, arguments);
            delete this.player;
        }
    });

    function onMobileSuccess(mediaElement, domObject, player) {
        $(mediaElement).parent().addClass('ready');
        $(mediaElement).data('fullscreen', false);
        $(mediaElement).on('click', playMobile);
        $(mediaElement).on('fullscreenchange webkitfullscreenchange', onFullscreenChange);
        $(mediaElement).on('playing', onPlayMobile);
        $(mediaElement).on('ended', onEndMobile);
    }

    function onSuccess(mediaElement, domObject, player) {
        player.container.parent().addClass('ready');
        $(mediaElement).on('playing', _.bind(onPlay, $('+ .poster', player.container).parent()));
        $(mediaElement).on('pause', _.bind(onPause, $('+ .poster', player.container).parent()));
        $(mediaElement).on('ended', _.bind(onEnd, $('+ .poster', player.container).parent()));
        $('+ .poster', player.container).on('click', _.bind(play, mediaElement));
    }

    /*
     * open video player in fullscreen mode
     */
    function enterFullscreen(video) {
        if(video.requestFullscreen) {
            video.requestFullscreen();
        } else if(video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if(video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if(video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    }

    /*
     * close fullscreen video player
     */
    function exitFullscreen(video) {
        if (video.exitFullscreen) {
            video.exitFullscreen();
        } else if (video.msExitFullscreen) {
            video.msExitFullscreen();
        } else if (video.mozCancelFullScreen) {
            video.mozCancelFullScreen();
        } else if (video.webkitExitFullscreen) {
            video.webkitExitFullscreen();
        }
    }

    /*
     * pause video if user leaves fullscreen mode
     */
    function onFullscreenChange(e) {
        if(!setFullscreenFlags($(e.currentTarget))) {
            e.currentTarget.pause();
        }
    }

    /*
     * set flags to (de)activate CSS rule and save current screen status
     */
    function setFullscreenFlags(video) {
        var flag = video.data('fullscreen');
        video.data('fullscreen', !flag);
        video.toggleClass('normal', flag);
        return !flag;
    }

    /*
     * play video
     */
    function play(e) {
        this.play();
    }

    /*
     * start playing video and enter fullscreen mode
     */
    function playMobile(e) {
        if(!$(e.currentTarget).data('fullscreen')) {
            e.currentTarget.play();
            enterFullscreen(e.currentTarget);
        }
    }

    /*
     * hide picture (poster)
     */
    function onPlay(e) {
        this.removeClass('play-me');
        this.addClass('playing');
    }

    /*
     * play video from the beginning if user enter fullscreen mode
     */
    function onPlayMobile(e) {
        if(!$(e.currentTarget).data('fullscreen') && e.currentTarget.currentTime != 0) {
            e.currentTarget.setCurrentTime(0.1);
        }
    }

    function onPause(e) {
        this.removeClass('playing');
    }

    /*
     * show picture (poster)
     */
    function onEnd(e) {
        this.addClass('play-me');
    }

    /*
     * leaves fullscreen mode at the end of the video
     */
    function onEndMobile(e) {
        exitFullscreen(e.currentTarget);
    }
});