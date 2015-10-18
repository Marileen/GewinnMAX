define(['jquery', 'underscore', '../types/Controller', './ScrollModel', '../utils/viewport', 'TweenMax'], function($, _, Controller, ScrollModel, viewport) {
    var isIE8 = $('html').hasClass('lte8');

    return Controller.extend({
        model: ScrollModel,

        initialize: function() {
            Controller.prototype.initialize.apply(this, arguments);

            var scope = this;
            this.scrollEntry = viewport.register(function(type, viewport) {
                if(type === viewport.EVENT_TYPES.RESIZE) {
//                    if(isVisible(scope.$el)) {
                    update(scope);
//                    }
                }

                var bounds = scope.model.get('bounds');
                if(bounds.intersects(viewport.bounds)) {
                    scope.onScroll(bounds.getIntersectionInfo(viewport.bounds));
                }
            });
            update(this);
        },

        onScroll: function(scrollPos) {
            var outerSize = this.model.get('outerSize');
            outerSize.copyLocal(this.model.get('size'));
            outerSize.addLocal(viewport.size);
            scrollPos.normalizeLocal(outerSize);
            this.el.style.marginTop = -viewport.size.height * scrollPos.y + 'px';
//            TweenMax.set(this.el, {y: -viewport.size.height * scrollPos.y});
        },

        destroy: function() {
            Controller.prototype.destroy.apply(this, arguments);
            viewport.unregister(this.scrollEntry);
        }
    });

    function isVisible(node) {
        return !node.offsetParent().is($('html'));
    }

    function update(scope) {
        var offset = scope.$el.offset();
        scope.model.get('position').setX(offset.left).setY(offset.top).subtractLocal(parseInt(scope.$el.css('margin-left')), parseInt(scope.$el.css('margin-top')));
        scope.model.get('size').setWidth(scope.$el.outerWidth()).setHeight(scope.$el.outerHeight());
        scope.model.get('bounds').reset(scope.model.get('position'), scope.model.get('size'));
    }
});