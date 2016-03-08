define([ 'jquery', 'backbone', 'underscore' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        events: {
            'datalist:select': select
        },

        initialize: function() {

            renderDatalist( this.$el, $('option', this.$el ) );

        }

    });

    function renderDatalist( select, node ){

        //renderSelect( select, node );

        this.searchValue = $(select).val();
        this.minLength = $(select).attr("data-min-length");
        this.ajaxurl = $(select).attr('data-ajax');
        this.method = $(select).attr("data-ajax-method");
        this.dataType = $(select).attr("data-ajax-type");

        $('input', select).on( 'keyup', _.bind( function( event ){
            if(event.keyCode != '38' && event.keyCode != '40'){
                var searchValue = $('input', select).val();
                if( searchValue.length >= this.minLength){
//                    if( this.searchValue.indexOf(searchValue) < 0 ){
                    this.searchValue = searchValue;
                    getSuggestion( select, searchValue );
//                    }
                } else {
                    $('.input', select).remove();
                }
            }
        }, this ));

        $(select).on( 'click', _.bind( function( event ){
            $(select).removeClass("leave").addClass("hover");
            $('.search[data-fragment="search"]').removeClass("leave").addClass("hover");
        }, this ));

        $(window).on("keydown", function( event ){
            var nr = ( $('.input',select).attr("data-selected") ) ? parseInt( $('.input',select).attr("data-selected") ) : -1;
            var maxLength = $('.input > span',select).length;
            if (event.keyCode == '38') { // up arrow
                nr = (nr>=0) ? (nr-1) : nr;
                changeSelected( select, nr );
            } else if (event.keyCode == '40') { // down arrow
                nr = (nr<maxLength-1) ? (nr+1) : nr;
                changeSelected( select, nr );
            }
        });

        $(".clear",select).on( 'click', _.bind( function( event ){
            if($("input",select).val().indexOf("#")==0){
                $("body").addClass($("input",select).val().replace("#", ""));
            }
            $("input",select).val("");
            $('.input', select).remove();
        }, this ));

        $(window).on( 'click', _.bind( function( event ){
            if( $(event.target).closest('.field[data-type="datalist"]').length < 1 ){
                $('.field[data-type="datalist"].hover').removeClass("hover").addClass("leave");
                $('.search[data-fragment="search"]').removeClass("hover").addClass("leave");
            }
        }, this ));

    }

    function changeSelected( select, nr ){
        $('.input',select).attr("data-selected", nr);
        $.each( $('.input > span',select), function( index, entry ){
            if( index == nr ){
                $(entry).attr("data-selected","selected");
                $('input',select).val( $(entry).attr("data-value") );
            } else {
                $(entry).removeAttr("data-selected");
            }
        });
    }

    function renderSelect( select, node ){

        var formSelect = $('<span class="input message-color"></span>');
        var item = $('<span data-value=""></span>');

        $.each( node, function( index, entry ){
            var value = $(entry).attr("data-value");
            var selected = $(entry).attr("selected");
            var link = $(entry).attr("data-link");
            if( link.length > 0 ){
                item = $('<a href="'+link+'" data-value="'+value+'"><span>'+$(entry).text()+'</span></a>');
            } else {
                item = $('<span data-value="'+value+'"><span>'+$(entry).text()+'</span></span>');
            }
            if( value.length < 1 ){
                var choose = item.clone().addClass("choose");
                var isSelected = $('option[selected]', select );
                if(isSelected.length > 0) {
                    choose.html('<span>'+isSelected.text()+'</span>');
                }
                choose.on( 'click', _.bind( function( event ){
                    $(select).trigger( $.Event('datalist:select', { el: select, item: this }));
                }, this ));
                formSelect.append(choose);
            }
            if( selected ){
                item.attr("data-selected","selected");
            }
            item.on( 'click', _.bind( function( event ){
                $(select).trigger( $.Event('datalist:select', { el: select, item: this }));
            }, this ));
            formSelect.append(item);
        });

        $(select).addClass("hover").append( formSelect );
        $('.search[data-fragment="search"]').addClass("hover");

    }

    function getSuggestion( select, value ){
        if(this.ajaxurl) {
            var searchValue = decodeURI(value);
            $.ajax({
                url: this.ajaxurl+searchValue,
                method: (this.method) ? this.method : "POST",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: this.dataType
            }).done(function( data ){
                var node = "";
                $.each( data.suggestions, function( index, entry ){
                    var searchValueSpan = $('<span></span>').html( entry.title.replace(/\n\n/g," ").replace(/\n/g," ") );
                    searchValue = $.trim(searchValueSpan.text());
                    node += '<span data-value="'+ searchValue +'" data-link="'+ entry.url +'">'+ searchValue +'</span>';
                });

                $('.input', select).remove();
                renderSelect( select, $(node) );

            }).error(function( data ){
                console.log( "error", data );
            });
        } else {
            $(select).closest("form").submit();
        }
    }

    function select( event ){
        if( $(event.item).attr("href") && $(event.item).attr("href").length > 0 ){
            // no submit
        } else {
            $('input', event.el).val( $(event.item).attr("data-value") );
            $('.input', event.el).remove();
            $(event.el).closest("form").submit();
        }
    }

});