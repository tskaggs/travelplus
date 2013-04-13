/**GMaps Geocoding**/
function gmap_json(location) {
	var maps = new XMLHttpRequest();
	maps.open("GET", "http://maps.googleapis.com/maps/api/geocode/json?address="+ location +"&sensor=true", true);
	maps.onreadystatechange = function(data) {
	 	if (maps.readyState == 4) {
	    	if (maps.status == 200) {
		      	mapsp = JSON.parse( maps.responseText );
				lat = mapsp.results[0].geometry.location.lat;
				lng = mapsp.results[0].geometry.location.lng;
				console.log('Lat: ' + lat);
				console.log('Lng: ' + lng);
				$('#location_information .googlemap').append('<img border="0" src="http://maps.googleapis.com/maps/api/staticmap?center='+ lat +','+ lng +'&zoom=10&size=250x100&sensor=false" />');

				eyeem_json(lat, lng);
				// maps_print( mapsp );
	    	}
	 	}
	};
	maps.send();
};

function maps_print(mapsp) {
  $.each(mapsp, function(i, item) {
  	console.log( item[0].geometry.location.lat );
  	lat = item[0].geometry.location.lat;
	console.log( item[0].geometry.location.lng );
	lng = item[0].geometry.location.lng;

	$('#location_information').append(
		'<img border="0" src="http://maps.googleapis.com/maps/api/staticmap?center='+ lat +','+ lng +'&zoom=10&size=250x100&sensor=false" />');
 });
};
/**END GMaps Geocoding**/


/**Start APIs**/
var CLIENT_ID = "Enter Client ID Here";

function eyeem_json(lat, lng) {
	var eyeem = new XMLHttpRequest();

	// Add CLIENT ID to the end of the URL where is says CLIENT_ID
	eyeem.open("GET", "https://eyeem.com/api/v2/albums?trending=30&geoSearch=city&lat="+ lat +"&lng="+ lng +"&limit=30&type=city&client_id="+ CLIENT_ID, true);
	eyeem.onreadystatechange = function(data) {
	 	if (eyeem.readyState == 4) {
	    	if (eyeem.status == 200) {
		      	eyeem_parsed = JSON.parse( eyeem.responseText );
				eyeem_print( eyeem_parsed );
	    	}
	 	}
	};
	eyeem.send();
};

function eyeem_print(eyeem_parsed) {
  $.each(eyeem_parsed, function(i, item) {
  	console.log(item);
  	console.log(i);
  	eyeem_album_link = item.webUrl;
  	$('a.album_link').prop("href", eyeem_album_link);

  	for (var j = 0; j < item.photos.items.length; ++j) {
  		console.log( item.photos.items[j].thumbUrl );
  		eyeem_img = item.photos.items[j].thumbUrl ;
  		eyeem_img_link = item.photos.items[j].webUrl ;
  		$('#location_information .eyeem').append('<a target="_blank" href="'+ eyeem_img_link +'"><img src="'+ eyeem_img +'" /></a>');

  	}
 });
};