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
		var num = $('#userScore').val();
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
	
	$(".board").click(function(){
		if(!show) {
			show = true;
			$.getJSON("https://api.mongolab.com/api/1/databases/sos/collections/leaderboard?apiKey=br10X-RgokMGFuGnyr5w4WHdKpa046Fr", function(result){
				var j = 1;
				$.each(result, function(i, field){
					$("#scoreDisplay tr:last").after('<tr> <td>'+j+'</td> <td>'+field.name+'</td> <td>'+field.score+'</td> </tr>');
					j++;
				});
			});
		}
	});
});
