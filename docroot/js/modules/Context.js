define([ 'jquery', 'underscore', 't8y/types/Controller', './context/Model'], function( $, _, Controller, Model ) {

    return Controller.extend({

        events: {
            'context:resize' : resizeContext
        },

        model: Model,

        initialize: function () {
            Controller.prototype.initialize.apply(this, arguments);
            resizeContext( this );

            $(window).on('resize', _.bind( function( event ){
                this.$el.trigger( $.Event('context:resize', { el: this.$el }));
            }, this ));

            $('.lasche', this.$el).on('click', _.bind( function (event) {
               this.$el.toggleClass("open");
               console.log(this);
            }, this ));

            // Events:
            this.model.get('collection').on('change:status', _.bind(update, this)); // beim update eines models aus der Coll. die update function rufen
            this.model.get('collection').on('add', _.bind(update, this)); // initiales Rufen der update funktion beim adden jedes documents

        }


    });

    function update(model, value) {
        var showMyDocuments = false;

        this.model.get('collection').forEach(function(doc, i) {
            if(doc.get('status') != 'unsaved') {
                showMyDocuments = true;
                //todo : abbrechen
            }
        });
        if(showMyDocuments) {
            this.$('.linkToDocs').addClass('show');
        } else {
            this.$('.linkToDocs').removeClass('show');
        }
    }

    function resizeContext( event ){
        var target = $('.context[data-module="context"]');
        if( $(event.el).height() > $(window).height() ){
            target.addClass("smallSize");
            if( $(event.el).height() > $(window).height() ){
                target.addClass("scroll-y");
            }
        } else {
            //target.removeClass("scroll-y smallSize");
            if( $(event.el).height() > $(window).height() ){
                resizeContext( event );
            }
        }
    }

});