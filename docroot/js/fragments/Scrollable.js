/**
 * Created with IntelliJ IDEA.
 * User: Florian
 * Date: 03.05.13
 * Time: 16:26
 * To change this template use File | Settings | File Templates.
 */
/*global define:true */

define([
    'underscore',
    'backbone',
    'jquery'
], function(_, Backbone, $) {

    'use strict';

    function log(message) {
        //_.log('ScrollableView', message);
    }

    return Backbone.View.extend({

        //-------------------------------------
        // PROPERTIES
        //-------------------------------------

        $scrollBar : null,
        $indicator : null,

        over: false,
        maxScrollOffset: 0,
        maxScrollBarOffset: 0,

        mouseTop: -1,

        initialize: function() {
            this.$content = this.$el.find('> *:first-child');

            //log('Init scrollable view');

            this.onScroll = $.proxy(this.onScroll, this);
            this.onResize = $.proxy(this.onResize, this);
            this.onMouseEnter = $.proxy(this.onMouseEnter, this);
            this.onMouseLeave = $.proxy(this.onMouseLeave, this);
            this.onIndicatorStart = $.proxy(this.onIndicatorStart, this);
            this.onIndicatorMove = $.proxy(this.onIndicatorMove, this);
            this.onIndicatorStop = $.proxy(this.onIndicatorStop, this);

            this.createScrollBar();

            this.$content.on('scroll touchmove', this.onScroll);
            this.$el.on('mouseenter mousemove', this.onMouseEnter);
            this.$el.on('mouseleave', this.onMouseLeave);

            $(window).on('resize', this.onResize);

            this.onResize();
        },

        show: function() {
            window.clearTimeout(this.timer);
            this.$scrollBar.stop();
            this.$scrollBar.css('opacity', 1);
        },

        hide: function() {
            if (!this.over && this.mouseTop == -1) {
                window.clearTimeout(this.timer);
                this.$scrollBar.stop();

                var that = this;
                this.timer = window.setTimeout(function() {
                    that.$scrollBar.animate({
                        'opacity': 0
                    }, 500);
                }, 1000);
            }
        },

        onResize: function() {

            this.$el.css({
                'height'  : this.$el.closest('nav').innerHeight() - parseInt(this.$el.closest('nav').css('padding-top'))        //get height from nav element
            });

            var height = this.$content.height();
            var innerHeight = this.getInnerHeight();

            if (innerHeight > height) {
                this.$scrollBar.show();

                var height = this.$content.height();
                var innerHeight = this.getInnerHeight();
                this.maxScrollOffset = innerHeight - height;

                var scrollBarHeight = this.$scrollBar.height();
                var indicatorHeight = height / innerHeight * scrollBarHeight;
                this.maxScrollBarOffset = scrollBarHeight - indicatorHeight;

                this.$indicator.css('height', indicatorHeight + 'px');

                this.onScroll();
            } else {
                this.$scrollBar.hide();
            }
        },

        onScroll: function() {
            var scrollBarOffset = this.$content.scrollTop() / this.maxScrollOffset * this.maxScrollBarOffset;

            this.show();
            this.$indicator.css('top', scrollBarOffset + 'px');
            this.hide();
        },

        onMouseEnter: function() {
            this.show();
            this.over = true;
        },

        onMouseLeave: function() {
            this.over = false;
            this.hide();
        },

        onIndicatorStart: function(e) {
            this.mouseTop = e.pageY;

            $(document).on('mousemove', this.onIndicatorMove);
            $(document).one('mouseup', this.onIndicatorStop);
            this.$indicator.addClass('active');

            e.preventDefault();
        },

        onIndicatorMove: function(e) {
            var barOffset = e.pageY - this.mouseTop;
            var offset = barOffset / this.maxScrollBarOffset * this.maxScrollOffset;

            this.$content.scrollTop(this.$content.scrollTop() + offset);

            this.mouseTop = e.pageY;
        },

        onIndicatorStop: function() {
            $(document).off('mousemove', this.onIndicatorMove);
            this.mouseTop = -1;

            this.$indicator.removeClass('active');
            this.hide();
        },

        createScrollBar: function() {
            this.$scrollBar = $('<div class="scrollbar">')
                .appendTo(this.$el);

            this.$indicator = $('<div class="indicator">')
                .appendTo(this.$scrollBar)
                .on('mousedown', this.onIndicatorStart);
        },

        getInnerHeight: function() {
            return this.$content[0].scrollHeight || this.$content[0].clientHeight;
        }
    });
});