define(['module', 'jquery', 'underscore', 'backbone', './Model', '../utils/device', '../utils/device/display', 'externalExtends/jquery/onVisibleHandler', 'jquery-whenlive', 'css!//cdnjs.cloudflare.com/ajax/libs/mediaelement/2.13.1/css/mediaelementplayer.min.css'], function(module, $, _, Backbone, Model, device, display) {

    return Backbone.View.extend({
        el: $('audio[data-controller="' + module.id + '"]'),

        model: Model,

        initialize: function() {
            this.config = new this.model({}, this);

            this.listener = new Array();

            mejs = {};
            mejs.$ = $;

            require(['mediaelement'], _.bind(function() {
                this.$el.whenLive({ 'visibility': true }, _.bind(this.ready, this));
            }, this));
        },

        ready: function() {
            new MediaElementPlayer(this.$el.get(0),{
                // plugins which should be used as fallback
                plugins: ['flash','silverlight'],
                // initial volume when the player starts
                startVolume: 0.8,
                // useful for <audio> player loops
                loop: false,
                // enables Flash and Silverlight to resize to content size
                enableAutosize: false,
                // the order of controls you want on the control bar (and other plugins below)
                features: ['playpause','progress','current','duration','tracks','volume','fullscreen'],
                // Hide controls when playing and mouse is not over the video
                alwaysShowControls: false,
                // force iPad's native controls
                iPadUseNativeControls: false,
                // force iPhone's native controls
                iPhoneUseNativeControls: false,
                // force Android's native controls
                AndroidUseNativeControls: false,
                // forces the hour marker (##:00:00)
                alwaysShowHours: false,
                // show framecount in timecode (##:00:00:00)
                showTimecodeFrameCount: false,
                // used when showTimecodeFrameCount is set to true
                framesPerSecond: 25,
                // turns keyboard support on and off for this instance
                enableKeyboard: true,
                // when this player starts, it will pause other players
                pauseOtherPlayers: true,
                // array of keyboard commands
                keyActions: [],
                // after the player was initialized
                success: _.bind(function(media, test, player) {

                }, this)
            });
        },

        render: function() {

        }
    });
});