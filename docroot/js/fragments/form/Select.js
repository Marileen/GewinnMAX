define([ 'jquery', 'backbone', 'underscore' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        events: {
            'select:select': select
        },

        initialize: function() {

            renderSelect( this.$el );

        }

    });

    function renderSelect( select ){
        var formSelect = $('<span class="input message-color"></span>');
        var item = $('<span data-value=""></span>');

        var selected = $('option:selected', select );
        var hasChooseItem = false;
        $.each( $('option', select ), function( index, entry ){
            var value = $(entry).attr("value");
            item = $('<span data-value="'+value+'"><span>'+$(entry).text()+'</span></span>');
            if( value.length < 1 ){
                hasChooseItem = true;
                var choose = item.clone().addClass("choose");
                if( $(selected).val() != $(entry).val() ){
                    choose.html('<span>'+$(selected).text()+'</span>');
                }
                choose.on( 'click', _.bind( function( event ){
                    $(select).trigger( $.Event('select:select', { el: select }));
                }, this ));
                formSelect.append(choose);
            }
            if( $(selected).val() == $(entry).val() ){
                item.attr("data-selected","selected");
            }
            item.on( 'click', _.bind( function( event ){
                $(select).trigger( $.Event('select:select', { el: select, item: this }));
            }, this ));
            if( index > 8 && !formSelect.hasClass("scroll") ){
                formSelect.addClass("scroll");
            }
            formSelect.append(item);
        });
        if( !hasChooseItem ){
            item = $('<span class="choose" data-value="'+selected.val()+'"><span>'+selected.text()+'</span></span>');
            item.on( 'click', _.bind( function( event ){
                $(select).trigger( $.Event('select:select', { el: select }));
            }, this ));
            formSelect.prepend(item);
        }

        $('select', select).addClass("hide");
        $(select).append( formSelect );

        $(select).on( 'click', _.bind( function( event ){
            if( $( this ).hasClass("leave") ) {
                $( this ).removeClass("leave").addClass("hover");
            } else {
                $( this ).removeClass("hover").addClass("leave");
            }
        }, this ));

        $(window).on( 'click', _.bind( function( event ){
            if( $(event.target).closest('.field[data-type="select"]').length < 1 ){
                $('.field[data-type="select"].hover').removeClass("hover").addClass("leave");
            }
        }, this ));

    }

    function select( event ){
        if( event.item && $(event.item).attr("value") && $(event.el).hasClass("hover") ){
            setSelect( event );
        } else {
            // first element(Bitte waehlen) toggle open/close status
            if( $(event.el).hasClass("hover") ){
                if( event.item ){
                    setSelect( event );
                }
                $( event.el ).removeClass("hover").addClass("leave");
            } else {
                $( event.el ).addClass("hover").removeClass("leave");
            }
        }
    }

    function setSelect( event ){
        //$('option', event.el).attr("selected",null);
        //$(event.item).attr("selected","selected");
        $('option', event.el).prop("selected", false);
        $(event.item).prop("selected", true);
        $('.input > span', event.el).attr("data-selected",null);
        var node = $('.input > span[data-value="'+$(event.item).val()+'"]', event.el);
        node.attr("data-selected","selected");
        $('.input > span.choose', event.el).empty().html('<span>'+node.text()+'</span>');
        $(event.el).removeClass("hover").addClass("leave");
        // form submit on click
        if( $(event.el).attr("data-submit") == "click" ){
            $(event.el).closest('.form').trigger( $.Event('form:submit', { el: this.$el }));
        }
    }


});