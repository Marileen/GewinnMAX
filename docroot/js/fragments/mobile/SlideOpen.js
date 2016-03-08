define([ 'jquery', 'backbone' ], function( $, Backbone ) {

	return Backbone.View.extend({

		initialize: function() {
			// tables slides up on intializing, the software operator sses the interaction
			var detailTables = this.$el.children( '.detail' );
			detailTables.slideUp();
			this.$el.children( 'a' ).children( '.lIcon' ).addClass( 'glyphicon-arrow-down' );
			
			// On click test if the detail table is visible and if so hide it, or vide versa
			this.$el.on("click", function(){
				var pos = $( this ).attr( 'data-position' );
				var detailTable = $( '.detail[data-detail-position="'+pos+'"]' );
				var arrowIcon = $( this ).children( 'a' ).children( '.lIcon' );
				
				if( detailTable.is( ':visible' ) ) {
					detailTable.slideUp();
					arrowIcon.addClass( 'glyphicon-arrow-down' );
					arrowIcon.removeClass( 'glyphicon-arrow-up' );
				}
				else {
					detailTable.slideDown();
					arrowIcon.addClass( 'glyphicon-arrow-up' );
					arrowIcon.removeClass( 'glyphicon-arrow-down' );
				}
			});
		}
	})
});