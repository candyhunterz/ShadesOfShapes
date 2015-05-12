$(document).ready(function() {
	$(".menu").click(function(){
		window.location = "#main";
	})

	$(".board").click(function(){
		window.location = "#LeaderboardPage";
	})
	var ScoreName = 200;
	
	ScoreName = JSON.stringify(myObject);
	
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "data.php",
		data: {myData:ScoreName},
		success: function(data){
			alert('Items added');
		},
		error: function(e){
			console.log(e.message);
		}
	});
});
