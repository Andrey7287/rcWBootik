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
		isSlider = $('.slider').is('.slider'),
		mobileView = window.matchMedia("(max-width: 768px)").matches,
		resizeAlign = new OnResize,
		resizeMobSlider = new OnResize,
		scrollTiming = 0,
		scrollTimingH = 0;

/************************
****** Mobile menu ******
*************************/

$('.c-hamburger').on('click', function(){
	$(this).toggleClass('is-active');
	$('.site-nav').slideToggle();
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


if ( isSlider ) {

	$('.slider').slick({
		prevArrow: $('.slider-arrow.left'),
		nextArrow: $('.slider-arrow.right'),
		dots: true,
		appendDots: $('.slider-dots')
	});

}
function makeMobSlider(){

	var mobileView = window.matchMedia("(max-width: 768px)").matches, //.is('.mob-slider')
			$slider = $('.mob-slider'),
			isSlider = $slider.is('.mob-slider'),
			inited = $slider.is('.slick-initialized');

	if ( isSlider && !inited && mobileView ) {

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
					slidesToShow: 1,
					dots: true
				}

			}]
		});

	} else if ( isSlider && inited && !mobileView ) {
		console.log('!')
		$slider.slick('unslick');

	}

}
//makeMobSlider()
resizeMobSlider.bind(makeMobSlider);

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
******* Scroll Up *******
*************************/

$(window).on('load', function(){
	$('.catalog__item').ravno();
});

