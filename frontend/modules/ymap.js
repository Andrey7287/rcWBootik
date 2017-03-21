ymaps.ready(init);

var map,
		marker_1,
		marker_2,
		mobileView = window.matchMedia("(max-width: 992px)").matches;

function init(){

	var pointA = [55.742496, 37.629034],
			pointB = [55.740774, 37.625580],
			pointC = [55.741599, 37.625693],
			pointD = [55.742231, 37.626018],
			multiRoute = new ymaps.multiRouter.MultiRoute({
					referencePoints: [
							pointA,
							pointB,
							pointC,
							pointD
					],
					params: {
							//Тип маршрутизации - пешеходная маршрутизация.
							routingMode: 'pedestrian'
					}
			}, {
					// Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
					boundsAutoApply: mobileView ? true : false,
					routeActiveStrokeColor: '568b07'
			});

	map = new ymaps.Map("map", {
			center: [55.741358, 37.629340],
			zoom: 17
	});
	map.geoObjects.add(multiRoute);

	marker_1 = new ymaps.Placemark(pointD, {
		iconCaption: "Большая Ордынка 17/8"
	}, {
		preset: "islands#darkGreenCircleDotIconWithCaption"
	});
	marker_2 = new ymaps.Placemark(pointC, {
		iconCaption: "Большая Ордынка 19/1"
	}, {
		preset: "islands#darkGreenCircleDotIconWithCaption"
	});

	map.geoObjects.add(marker_1);
	map.geoObjects.add(marker_2);

	map.behaviors.disable('scrollZoom');

}

