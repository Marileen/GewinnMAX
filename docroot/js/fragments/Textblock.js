define([ 'jquery', 'backbone', 'underscore' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        initialize: function() {

            // Tabellen mit rowspan duerfen dann die naechsten Zeilen keine "blau" Faerbung haben
            $.each( $('table', this.$el), function( index, table ){
                var rowspan = 0;
                $.each( $('tr', table), function( index, tr ){
                    if( rowspan > 0 ){
                        $('td:first-child', tr).addClass("black");
                        rowspan = (rowspan>0) ? rowspan-1 : 0;
                    } else if( $('td:first-child', tr).attr("rowspan") > 0){
                        rowspan = parseInt( $('td:first-child', tr).attr("rowspan")) - 1;
                    }
                });
            });
        }

    });
});