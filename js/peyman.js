$(document).ready(function() {
	
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
		LBlist= [];
		$(".LBscore").remove();
		$.getJSON("https://api.mongolab.com/api/1/databases/sos/collections/leaderboard?apiKey=br10X-RgokMGFuGnyr5w4WHdKpa046Fr", function(result){
			var j = 1;
			$.each(result, function(i, field) {
				LBlist[i] = [];
				LBlist[i][0] = field.name;
				LBlist[i][1] = parseInt(field.score);
			});
			
			LBlist.sort(compareSecondColumn);
			
			for(var i=0; i<LBlist.length; i++) {
				$("#bodyLeader").append('<tr class="LBscore"> <td>'+j+'</td> <td>'+LBlist[i][0]+'</td> <td>'+LBlist[i][1]+'</td> </tr>');
				j++;
			}
		});
	});
	
	function compareSecondColumn(a, b) {
		if (a[1] === b[1]) {
			return 0;
		}
		else {
			return (a[1] > b[1]) ? -1 : 1;
		}
	}
});
