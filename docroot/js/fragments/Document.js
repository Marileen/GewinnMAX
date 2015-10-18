define([ 'jquery', 'underscore', 't8y/types/Controller', '../../js/assets/RestModel' ], function( $, _, Controller, RestModel ) {

    return Controller.extend({

        events: {
            'click .btn[data-rest="add"]': 'addDocument',
            'click .btn[data-rest="delete"]': 'deleteDocument'
        },

        initialize: function() {
            Controller.prototype.initialize.apply(this, arguments);
            this.rest = RestModel;
            this.resetCountText();
            if(this.parentModel) {
                this.parentModel.addDocument(this.$('a').attr('href'), this.$el.data('document'));
            }

        },

        // Dokument hinzufuegen
        addDocument: function( event ) {
            var data = {
                "href": $(event.currentTarget).attr("href")
            };
            this.rest.request('add', data, $.proxy(this.onSaved, this), $.proxy(this.onError, this, 'add'));

            event.preventDefault();
        },

        // Dokument entfernen
        deleteDocument: function( event ) {
            var data = {
                "href": $(event.currentTarget).attr("href")
            };
            this.rest.request('delete', data, $.proxy(this.onDeleted, this), $.proxy(this.onError, this, 'delete'));
            event.preventDefault();
        },

        // Status nach dem hinzufuegen anpassen
        onSaved: function( data ) {
            data = (typeof data =='object') ? data : $.parseJSON(data);

            if( data.success == true || data === true ){
                this.$el.attr("data-document", "saved" );

                if(this.parentModel) {
                        this.parentModel.updateDocument(this.$('a').attr('href'), 'saved')
                }
            }
            if( data.count > 0 ){
                this.setCountText( data.count );

            }
        },

        // Status nach dem loeschen anpassen
        onDeleted: function( data ) {
            data = (typeof data =='object') ? data : $.parseJSON(data);
            if( data.status == true || data === true ){
                this.$el.attr("data-document", "unsaved" );


                if(this.parentModel) {
                    this.parentModel.updateDocument(this.$('a').attr('href'), 'unsaved')
                }
            }
            if( data.count >= 0 ){
                this.setCountText( data.count );
            }
            if( this.$el.hasClass("kickout") ){
                this.$el.remove();
            }
        },

        onError: function( type, data ) {
            //console.log( "error", data );
            if( type == "add" ){
                $('#'+data.status).trigger( $.Event('layer:open', { el: this.$el }));
            }
            this.$el.addClass( "error" );
        },

        resetCountText: function() {
            if( $('.resetCountText') && $('.resetCountText').length > 0 ){
                this.setCountText( 0 );
            }
        },

        setCountText: function( count ){
            $.each( $('.document[data-element="count"]'), function( index, element ){
                if( $(element).attr("data-bracket") == "false" ){
                    $(element).text( count );
                } else {
                    $(element).text("("+count+")");
                }

                //icon umfärben HUECK-357
                var $iconStatusElements = $('.changeOnCartStatus')
                if (count > 0) {
                    $iconStatusElements.removeClass('glyphicon-cart-empty').addClass('glyphicon-cart-filled')
                } else {
                    $iconStatusElements.removeClass('glyphicon-cart-filled').addClass('glyphicon-cart-empty')
                }

            });
        }

    });


});