define(['module', 'underscore', './Dataset'], function(module, _, Dataset) {

    return Dataset.extend({
        type: module.id,

        defaults: function() {
            return _.extend(Dataset.prototype.defaults(), {
                info: '',
                error: '',
                log: ''
            });
        }
    });
})