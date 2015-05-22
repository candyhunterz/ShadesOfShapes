$(document).ready(function() {
	var show = false;
	
	$(".menu").click(function(){
		window.location = "#main";
	})

	$(".board").click(function(){
		window.location = "#LeaderboardPage";
	})
	
	var name,num;
	$("#send").click(function(){
		var num = parseInt($('#userScore').val());
		var user = $('#userID').val();
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
	
	$("#LeaderTitle").click(function(){
		if(!show) {
			show = true;
			$.getJSON("https://api.mongolab.com/api/1/databases/sos/collections/leaderboard?apiKey=br10X-RgokMGFuGnyr5w4WHdKpa046Fr&s={%22score%22:-1}", function(result){
				var j = 1;
				$.each(result, function(i, field){
					$("#bodyLeader").append('<tr> <td>'+j+'</td> <td>'+field.name+'</td> <td>'+field.score+'</td> </tr>');
					j++;
				});
			});
		}
	});
	
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;	
	}
	/*	
	Take the cookiename as parameter (cname).
	Create a variable (name) with the text to search for (cname + "=").
	Split document.cookie on semicolons into an array called ca (ca = document.cookie.split(';')).
	Loop through the ca array (i=0;i<ca.length;i++), and read out each value c=ca[i]).
	If the cookie is found (c.indexOf(name) == 0), return the value of the cookie (c.substring(name.length,c.length).
	If the cookie is not found, return "".
	*/
	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') 
				c = c.substring(1);
			if (c.indexOf(name) == 0) 
				return c.substring(name.length, c.length);
		}
		return "";
	}

	//example on making a cookie and checking for it
	function checkCookie() {
		var user = getCookie("username");
		if (user != "") {
			alert("Welcome again " + user);
		} else {
			user = prompt("Please enter your name:", "");
			if (user != "" && user != null) {
				setCookie("username", user, 365);
			}
		}
	}
});
