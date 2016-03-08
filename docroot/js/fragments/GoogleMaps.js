define([ 'jquery', 'backbone', 'underscore' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        events: {
            'gmaps:init': init,
            'gmaps:render': render
        },

        initialize: function() {
            if( this.$el.attr("data-render-onload") == "true" ){
                window.setTimeout(_.bind( function( event ){ this.$el.trigger( $.Event('gmaps:init', { })); }, this ),500);
            }
        }

    });

    function init() {
        require(['//maps.google.com/maps/api/js?sensor=false&callback=gMapsCallback'], _.bind( function(){
            window.setTimeout(_.bind( function( event ){ this.$el.trigger( $.Event('gmaps:render', { })) }, this ),1000);
        }, this ));
    }

    function render() {

        // nur einmal die Map rendern
        if( !this.$el.hasClass("init_map") ){

            var mapData = {
                "id": (this.$el.attr('data-id')) ? this.$el.attr('data-id') : "gmap_canvas",
                "companies": this.$el.find(".companies"),
                "text": {
                    "link": this.$el.attr('data-text-link')
                },
                "latitude": 54.373435,
                "longitude": 8.639827,
                "zoom": (this.$el.attr('data-zoom')) ? parseInt(this.$el.attr('data-zoom')) : 14,
                "width": (this.$el.attr('data-width')) ? this.$el.attr('data-width') : "444px",
                "height": (this.$el.attr('data-height')) ? this.$el.attr('data-height') : "417px"
            };

            this.$el.css({ width: mapData.width, height: mapData.height }).append( $('<div id="' + mapData.id + '" class="canvas"></div>') );

            init_map( mapData );
            google.maps.event.addDomListener( window, 'load', init_map );
            this.$el.addClass("init_map");

        }

    }

    function init_map( mapData ) {

        var arr =  $.parseJSON( mapData.companies.text() );
        var markers = [];
        var infoWindowContent = [];

        // Aus dem Array Pins generieren
        for( var i=0, l=arr.companies.length-1; i <= l; i++){
            var latitude = parseFloat( arr.companies[i].latLng.split(",")[0] );
            var longitude = parseFloat( arr.companies[i].latLng.split(",")[1] );
            // first Pin focus
            if( i == 0 ){
                mapData.latitude = latitude;
                mapData.longitude = longitude;
            }
            markers.push([arr.companies[i].company+', '+ arr.companies[i].city, latitude, longitude]);

            // Infolayer
            var info = '<div class="info_content">' +
                '<h5>'+arr.companies[i].company+'</h5>' +
                '<p>'+arr.companies[i].street+'<br>'+arr.companies[i].zip+' '+arr.companies[i].city+'</p>';
            // link
            if( arr.companies[i].link ){
                info += '<p><a href="'+arr.companies[i].link+'" class="arrow link">'+mapData.text.link+'</a></p>';
            }
            info += '</div>';
            infoWindowContent.push( [info] );

        }
//        console.log(markers);

        var map;
        var bounds = new google.maps.LatLngBounds();
        var mapOptions = {
            zoom: mapData.zoom,
            center: new google.maps.LatLng( mapData.latitude, mapData.longitude ),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map( document.getElementById( mapData.id ), mapOptions );

        // Display multiple markers on a map
        var infoWindow = new google.maps.InfoWindow(), marker, i;

        // Loop through our array of markers & place each one on the map
        for( i = 0; i < markers.length; i++ ) {
            var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: markers[i][0]
            });

            // Allow each marker to have an info window
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infoWindow.setContent(infoWindowContent[i][0]);
                    infoWindow.open(map, marker);
                }
            })(marker, i));

            if( i == 0 ){
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
            // Automatically center the map fitting all markers on the screen
            //map.fitBounds(bounds);
        }

        /*
        // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
        var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
            this.setZoom(14);
            google.maps.event.removeListener(boundsListener);
        });
        */
    }

});

window.gMapsCallback = function(){
//    console.log("gMapsCallback");
//    $(window).trigger('gMapsLoaded');
}