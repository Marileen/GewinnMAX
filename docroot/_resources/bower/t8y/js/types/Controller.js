define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    return Backbone.View.extend({

        options: function() {
            return {};
        },

        initialize: function (options) {
            this.$el.data('interface', this);

            if(this.model) {
                this.model = new this.model(options.data || {}, this.$el.data());
            }

            this.$target = options.$target;
            if(this.$target) {
//                this.$el.whenLive({ 'visibility': true }, _.bind(function() {
                    this.ready(this.$target.data('interface').model);
//                }, this));
            } else {
//                this.$el.whenLive({ 'visibility': true }, _.bind(this.ready, this));
                this.ready();
            }
        },

        ready: function(parentModel) {
            if(parentModel) {
                this.parentModel = parentModel;
            }
            this.render();
        },

        render: function() {

        },

        redraw: function() {
            this.$el.get(0).offsetHeight;
        },

        destroy: function() {
            this.undelegateEvents();
            this.remove();
        }
    });
});