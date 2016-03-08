define(['module', 'jquery', 't8y/types/DomModel'], function(module, $, DomModel) {
    return DomModel.extend( {

        defaults: function() {
            return {

            }
        },

        initialize: function(options, scope) {
            DomModel.prototype.initialize.apply(this, arguments);

        }
    } );
});