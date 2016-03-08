define(['t8y/types/Controller', 'jquery', 'slick'], function(Controller, $, slick) {
	return Controller.extend({
		
			initialize: function() {
			Controller.prototype.initialize.apply( this, arguments );
			$( '.teaserSlider' ).slick({
				// enable to see the dots below the slider
				dots: false,
				infinite: true,
				slidesToShow: 1,
				autoplay: true,
				centerPadding: '-1px',
				arrows: true,
				adaptiveHeight: true,
				prevArrow : '<button type="button" class="slick-prev glyphicon-arrow-left"></button>',
				nextArrow : '<button type="button" class="slick-next glyphicon-arrow-right"></button>'
			});
		}
	})
});