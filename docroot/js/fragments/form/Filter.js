define([ 'jquery', 'backbone', 'underscore' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        events: {
            'filter:select': selectFilter,
            'filter:showNext': showNext
        },

        initialize: function() {

            // Target in dem gefiltert wird
            var target = this.$el.attr('data-content-target');

            // Filter setzen
            $('.field[data-type="radio"]',this.$el).on('click', _.bind( function( event ){
                this.$el.trigger( $.Event('filter:select', { }));
                var top = $('.results', target).offset().top;
                $("html, body").animate({ scrollTop: top },500,function(){});
            }, this ));

            // Mehr Treffer anzeigen
            if( this.$el.attr('data-show-onload') ){
                showOnload(this, this.$el.attr('data-show-onload'));
                $('.btn.more',this.$el).on('click', _.bind( function( event ){
                    event.preventDefault();
                    event.stopPropagation();
                    var top = this.$el.scrollTop();
                    console.log(this.$el);
                    //$("html, body").animate({ scrollTop: top },500,function(){});
                    this.$el.trigger( $.Event('filter:showNext', { nr: this.$el.attr('data-show-ajaxload') }));
                }, this ));
            }
        }

    });

    function showOnload( event, nr ){
        var target = $(event.el).attr('data-content-target');
        // zeige die naechsten Treffer
        if( ($('.listing.hideout', target).length) < nr ){
            $('.btn.more', event.$el).addClass("disabled");
        }
        $.each( $(target+' .listing.hideout'), _.bind( function( index, listing ){
            if( index < nr ){
                $(listing).removeClass("hideout");
            }
        }, this ));
    }

    function showNext( event ){
        var target = this.$el.attr('data-content-target');
        // zeige die naechsten Treffer
        if( ($(target+' .listing.hideout').length) < parseInt(event.nr) ){
            $('.btn.more', this.$el).addClass("disabled");
        }
        $.each( $(target+' .listing.hideout'), _.bind( function( index, listing ){
            if( index < parseInt(event.nr) ){
                $(listing).removeClass("hideout");
            }
        }, this ));
    }

    function showAllResults( event ){
        $('.listing', event.$el).removeClass("hideout");
        $('.btn.more', event.$el).addClass("disabled");
    }

    function showButtons( event, target ){
        $(target+'.row', event.$el).removeClass("hide");
    }

    function hideButtons( event, target ){
        var listItems = $(target+' .listing', event.$el).length;
        var listItemsHide = $(target+' .listing.hide', event.$el).length;
        if( listItems == listItemsHide ){
            $(target+'.row', event.$el).addClass("hide");
        }
    }

    function selectFilter( event ){
        var target = this.$el.attr('data-content-target');
        showAllResults( event );
        showButtons( event, '.information' );
        showButtons( event, '.product' );
        showButtons( event, '.referenzen' );
        // Welcher Filter wurde gesetzt
        var filterValue = $('.field.checked [name="filter"]', this.$el).attr("value");
        switch( filterValue ){
            // Nur Seiten anzeigen
            case "page" :
                $.each( $('.listing', target), function( index, listing ){
                    if( $(listing).attr("data-document") != "page" ){
                        $(listing).addClass("hide");
                    } else {
                        $(listing).removeClass("hide");
                    }
                });
                hideButtons( event, '.information' );
                break;
            // Nur Dokumente anzeigen
            case "document" :
                $.each( $('.listing', target), function( index, listing ){
                    if( $(listing).attr("data-document") == "page" ){
                        $(listing).addClass("hide");
                    } else {
                        $(listing).removeClass("hide");
                    }
                });
                hideButtons( event, '.product' );
                hideButtons( event, '.referenzen' );
                break;
            // Default alle Suchergebnisse anzeigen
            default :
                $('.listing', target).removeClass("hide");
        }
    }

});