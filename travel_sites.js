/**Kayak**/
function find_location_kayak() {
	landing_name = $('#Landing0SliderDivBlockInner .filterSubHeader').text();
	landing_name = landing_name.replace( "Landing ", "" );
	gmap_json(landing_name);
	$('#rightads').prepend(
		'<div id="rightadsinner">'+
			'<div id="location_information">'+
				'<div class="header">'+
					'<h2>Discover '+ landing_name+'</h2>'+
					'<a target="_blank" class="album_link kayak_orange" href="">Album</a>'+
				'</div>'+
				'<div class="googlemap"></div>'+
				'<div class="eyeem"></div>'+
			'</div>'+
		'</div>'	
	);
}
