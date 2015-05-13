$(document).ready(function() {
	$(".menu").click(function(){
		window.location = "#main";
	})

	$(".board").click(function(){
		window.location = "#LeaderboardPage";
	})
	
	var name,num;
	$("#send").click(function(){
		var num = $('#userID').val();
		var user = $('#userScore').val();
		console.log(num);
		$.ajax({
			url: "https://api.mongolab.com/api/1/databases/sos/collections/leaderboard?apiKey=br10X-RgokMGFuGnyr5w4WHdKpa046Fr",
			type: "POST",
			data: JSON.stringify({name: user, score: num}),
			contentType: "application/json"
		}).done(function( msg ) {
				console.log(msg);
		});	
		console.log(user);
	}); 
	
	/*
	var stuff = {
		run: function () {
			$('button').bind('click', function () {
				if ('geolocation' in navigator) {
					var geo_options = {
						enableHighAccuracy: true, 
						maximumAge        : 30000, 
						timeout           : 27000
					};
					navigator.geolocation.getCurrentPosition(stuff.send, stuff.error, geo_options);
				}
			});
		},
		error: function (msg) {
			console.log(msg);
		},
		send: function (object) {
			$.ajax({
				url: "https://api.mongolab.com/api/1/databases/sos/collections/leaderboard?apiKey=br10X-RgokMGFuGnyr5w4WHdKpa046Fr",
				type: "POST",
				data: JSON.stringify( object ),
				contentType: "application/json"
			}).done(function( msg ) {
				console.log(msg);
			});
		}
	};
	*/

});
