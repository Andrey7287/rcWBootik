ymaps.ready(init);

var map,
		marker;

function init(){

	map = new ymaps.Map('map', {
			center: [55.766590, 37.654703],
			zoom: 16,
			controls: []
	});


	marker = new ymaps.Placemark(
		[55.766426, 37.650840],{},{
			iconLayout: 'default#image',
			iconImageHref: '/images/map-marker.png',
			iconImageSize: [40, 54],
			iconImageOffset: [-20, -54]
		});

	map.geoObjects.add(marker);
}

