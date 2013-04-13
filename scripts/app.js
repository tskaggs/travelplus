onload = function() {
	var CLIENT_ID = "Enter Client ID Here";
  	var login = document.getElementById("login");
	var output = document.getElementById("output");
  	var accessToken_ls = localStorage.getItem("token");
  	var api = new EyeEmAPI(accessToken_ls);

	api.request("users/me", undefined, function(data) {  
		full_name = data.user.fullname;
		me_url = data.user.webUrl;
		me_thumb = data.user.thumbUrl;
		me_photo = data.user.photoUrl;
		me_photo_total = data.user.totalPhotos;
		me_follower = data.user.totalFollowers;
		me_friends = data.user.totalFriends;
		me_liked = data.user.totalLikedPhotos;
		me_friends = data.user.totalFriends;
		me_id = data.user.id;

		$('.fullname a').text(full_name);
		$('.fullname a').prop('href', me_url);
		$('.profile_pic').prop('src', me_photo);
		$('.me_photo_total span').text(me_photo_total);
		$('.me_follower span').text(me_follower);
		$('.me_friends span').text(me_friends);
		$('.me_liked span').text(me_liked);
	});

	function getLocation(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		}
		else{x.innerHTML="Geolocation is not supported by this browser.";}
	}
	function showPosition(position){
  		lat = position.coords.latitude;
  		lng = position.coords.longitude;
  		eyeem_json(lat, lng);
  	}
	
	getLocation();


	/**Start APIs**/
	function eyeem_json(lat, lng) {
		var eyeem = new XMLHttpRequest();
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
		  	eyeem_album_link = item.webUrl;
		  	$('a.album_link').prop("href", eyeem_album_link);
		  	for (var j = 0; j < item.photos.items.length; ++j) {
		  		console.log( item.photos.items[j] );
		  		console.log( item.photos.items[j].photoUrl );
		  		eyeem_img = item.photos.items[j].photoUrl ;
		  		eyeem_img_link = item.photos.items[j].webUrl ;
		  		$('#location_information .eyeem').append('<a target="_blank" href="'+ eyeem_img_link +'"><img src="'+ eyeem_img +'" /></a>');

		  	}
	 	});
	};

	if (localStorage.getItem("Auth") == "true") {
		$('button#login').hide();
		$('.logo').hide();
	} else {
		$('.profile_data img.profile_pic').hide();
		$('.profile_data ul').hide();
		login.onclick = function() {
		    var identityDetails = {
		      url: "https://www.eyeem.com/oauth/authorize?response_type=code&client_id="+ CLIENT_ID +"&redirect_uri=chrome-extension://kaoodiebcimakhodoeaajplljgdnjfme/app.html&tokens=token",
		      interactive: true
		    };   
		 
		    chrome.experimental.identity.launchWebAuthFlow(identityDetails, function(responseUrl) {
		      var accessToken = responseUrl.substring(responseUrl.indexOf("=") + 1);
		      localStorage.setItem('token', accessToken);

		      var api = new EyeEmAPI(accessToken);
		      api.request("users/me", undefined, function(data) {  
		        full_name = data.user.fullname;
		        me_url = data.user.webUrl;
		        me_thumb = data.user.thumbUrl;
		        me_photo = data.user.photoUrl;
		        me_photo_total = data.user.totalPhotos;
		        me_follower = data.user.totalFollowers;
		        me_friends = data.user.totalFriends;
		        me_liked = data.user.totalLikedPhotos;
		        me_id = data.user.id;

		        $('.fullname a').text(full_name);
			    $('.fullname a').prop('href', me_url);
			    $('.profile_pic').prop('src', me_photo);
			    $('.me_photo_total span').text(me_photo_total);
			    $('.me_follower span').text(me_follower);
			    $('.me_friends span').text(me_friends);
			    $('.me_liked span').text(me_liked);
		       	$('.profile_data img.profile_pic').fadeIn();
				$('.profile_data ul').fadeIn();
				$('button#login').hide();
				$('.logo').hide();

		        localStorage.setItem('Auth', true);
		      });
		    });
		};
	}

  // api.request("users/me/feed", undefined, function(data) {  
  //   console.log(data);
  //   output.textContent = JSON.stringify(data, null, 4);
  //   for (var j = 0; j < data.feedAlbums.items.photos.items.length; ++j) {
  // 		console.log( data.feedAlbums.items.photos.items[j] );
		// };

  // });
};

var EyeEmAPI = function(accessToken) {
  this.request = function(method, arguments, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      callback(JSON.parse(xhr.response));
    };

    xhr.open("GET", "https://www.eyeem.com/api/v2/" + method + "?access_token=" + accessToken);
    xhr.send();
  };
}