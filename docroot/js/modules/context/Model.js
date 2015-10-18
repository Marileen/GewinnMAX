define(['backbone', 't8y/types/DomModel'], function(Backbone, DomModel) {
    return DomModel.extend({

        defaults: function() {
            return {
                collection: new (Backbone.Collection.extend({
                    model: Backbone.Model.extend({
                        defaults: function() {
                            return {
                                id: null,
                                status: 'unsaved'
                            }
                        }
                    })
                }))()
            };
        },

        initialize: function() {
            DomModel.prototype.initialize.apply(this, arguments);
        },


        addDocument: function(id, status) {
            //console.log(this.get('collection'));
            this.get('collection').add({
                id: id,
                status: status
            })
        },

        isDocumentSaved: function(id) {
            return this.get('collection').get(id).get('status') == 'saved' || this.get('collection').get(id).get('status') == 'basket';

        },

        updateDocument: function(id, status) {
            this.get('collection').get(id).set('status', status);
        }

    })
})