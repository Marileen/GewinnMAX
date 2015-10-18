define([ 'module', 'jquery', 'underscore' ], function (module, $, _) {
    var controllerClasses = {};

    var parser = {
        parse: function (node) {
            node = node || $('html');
            var nodes = $(node).find('.controller[data-controller]');
            if(node.is('.controller[data-controller]')) {
                nodes.add(node);
            }

            if(document.getElementsByTagName('picture').length > 0 && document.pictures) {
                document.pictures.parse(node);
            } else if(document.getElementsByTagName('picture').length > 0){
                console.warn('you use picture element but didn\'t implement the right polyfill!');
            }

            render(nodes);
        }
    };

    $(function () {
        if (module.config().parseOnLoad) {
            parser.parse();
        }
    });

    return parser;

    function render($nodes) {
        // reverse the initializing order, so that inner elements are initialized before outer elements
        Array.prototype.reverse.call($nodes);

        var list = getDataControllerList($nodes);

        require(list, function() {
            for (var i = 0; i < list.length; i++) {
                controllerClasses[list[i]] = arguments[i];
            }

            for (var i = 0; i < $nodes.length; ++i) {
                var $node = $nodes.eq(i);
//                try {
                    initController($node);
//                } catch (e) {
//                    console.error('parser could not instanciate; ', $node.data('controller'), 'on', $node, ' with exception ', e)
//                }
            }
        })
    }

    function initController($node) {
        if (!$node.attr('init')) {

            $node.attr('init', true);

            var $target = null;
            var target = $node.data('target');
            if (target) {
                $target = $(target);

                if ($target.is('.controller[data-controller]')) {
                    initController($target);
                }
            }
            var controllerClass = controllerClasses[$node.data('controller')];
            var controller = new controllerClass({el: $node, $target: $target});
        }
    }

    function getDataControllerList(nodes) {
        var list = [];

        nodes.each(function (index, node) {
            var controller = $(node).data('controller');

            if (controller && !(controller in controllerClasses))
                list.push(controller);
        });

        return _.uniq(list, false);
    }
});