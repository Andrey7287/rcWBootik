'use strict';

/* Make jQuery available in global */
console.log(`jQuery ${$.fn.jquery} is loaded`);
window.$ = $;
window.jQuery = $;
require('script-loader!slick-carousel');

/* Import project styles and components */
import '../sass/css.scss';
import OnResize from './modules/resize';
import scrollup from './modules/scrollup';
import ravno from './modules/ravno';

/* Define project components and variables */
var	isMap = $('#map').is('#map'),
		mobileView = window.matchMedia("(max-width: 768px)").matches,
		resizeCards = new OnResize(true),
		resizeCatalog = new OnResize(true),
		scrollTiming = 0,
		scrollTimingH = 0;

/************************
****** Mobile menu ******
*************************/

$('#mainMenuToggle').on('click', function(){
	$(this).toggleClass('is-active');
	$('.site-nav').slideToggle();
});

$('#leftMenuToggle').on('click', function(){
	$(this).toggleClass('is-active');
	$('.left-menu').slideToggle();
});

/***********************
******** FOOTER ********
************************/

$(window).on('load', function(){

	setTimeout(function(){
		var footerHeight = $('footer').outerHeight(true);
		$('.content').css('min-height', 'calc(100vh - '+footerHeight+'px)');
	},1);

});

/**********************
********* MAP *********
***********************/

if ( isMap ) {

	require.ensure([], (require) => {
		require('./modules/ymap');
	}, 'map');

}

/***********************
******** SLIDER ********
************************/

$('.slider').slick({
	prevArrow: $('.slider-arrow.left'),
	nextArrow: $('.slider-arrow.right'),
	dots: true,
	appendDots: $('.slider-dots')
});

$('.see-also__slider').slick({
	prevArrow: $('.slider-arrow.prev'),
	nextArrow: $('.slider-arrow.next'),
	slidesToShow: 3,
	responsive: [{
		breakpoint: 767,
		settings: {
			slidesToShow: 2,
		}
	},{
		breakpoint: 480,
		settings: {
			slidesToShow: 1
		}
	}]
});

function catalogLayout(){

	var mobileView = window.matchMedia("(max-width: 768px)").matches,
			$slider = $('.mob-slider'),
			isSlider = $slider.is('.mob-slider'),
			isInited = $slider.is('.slick-initialized'),
			$card = $('.catalog__item');

	if ( isSlider && !isInited && mobileView ) {

		$card.outerHeight('auto')

		$slider.slick({
			prevArrow: $('.slider-arrow.prev'),
			nextArrow: $('.slider-arrow.next'),
			slidesToShow: 2,
			responsive: [{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
				}
			},{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}]
		});

	} else if ( isSlider  && !mobileView ) {

		if ( isInited ) {
			$slider.slick('unslick');
		}
		$card.ravno();

	}

}

resizeCatalog.bind(catalogLayout);

/************************
******* Scroll Up *******
*************************/

$(document).scroll(function(){

	if ( !scrollTiming ) {

		scrollTiming = setTimeout(function(){

			var scroll = $('body').scrollTop() ? $('body').scrollTop() : $('html').scrollTop();
			scroll >= 300 ? $('.scrollup').addClass('act') : $('.scrollup').removeClass('act');
			scrollTiming = 0;

		},300);

	}

});

$('.scrollup').scrollUp();

/************************
******* Ravno *******
*************************/
