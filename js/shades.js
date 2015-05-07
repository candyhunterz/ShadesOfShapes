$(document).ready(function() {

	// init game constants
	var board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var row1, row2, row3, row4, row5, col1, col2, col3, col4, col5, leftDiag, rightDiag;
	var correct = 0;
	var mute = 0;

	//function to randomize the colors of the cell
	function randomize() {
		for (var i=0; i<board.length; i++) {
			var num = Math.floor(Math.random()*3)
			var color='';
			board[i] = 0;
			if (num == 0) {
				color = 'red';
			}
			else if (num == 1) {
				color = 'blue';	
			}
			else if (num == 2) {
				color = 'yellow';
			}
			$("#d"+i).css({backgroundColor: color});
		}
		$("#choice td").css({backgroundColor: color});
	}

	// initialize game state
	function setColor() {
		randomize();
		makeShapes();
	}
	
	//function to return the color of selection box
	function getChoiceColor() {
		$("#choice td").css("background-color")
	}


	function reset() {
		$("img").remove("#checkmark");
		$("td").animate({
		opacity: 1}, 0, function(){});
		setColor();
	}

	// making the pregame page not lose the color
	$("#choice").click(function(){
		console.log(color);
	})

	// function to get the color of a clicked cell
	$("#board").click(function() {
		var color = $(this).css("background-color");
		var choiceColor = $("#choice td").css("background-color");
		if (color === choiceColor) {
			$(this).css({backgroundColor: '#FFFFFF'});
			$(this).animate({
			opacity: 1}, 0, function(){});
			correct += 1;
		}
		console.log(color);
	})

	
	$("#restart").click(function() {
		reset();
	});

	$("#timed").click(function() {
		reset();
		for (var i=0; i<board.length; i++) {
			$("#d" + i).animate({
				opacity: 0, color: '#FFFFFF'}, 5000, function() {
				});
		}

	});

	// function to generate shape
	function makeShape(shape) {
		switch (shape) {
			case 'triangle': break;
			case 'square': 
			break;
			case 'circle': break;
			case 'hexagon': break;
			case 'diamond': break;
			case 'octagon': break;
			default: ;
		}
	}

	// function that mute the sound 
	$("#muteButton").click(function() {
		if(mute == 0){
			mute = 1;
			document.getElementById("music").pause();
			$(this).attr("src","images/mute.png");
		} else {
			mute = 0;
			document.getElementById("music").play();
			$(this).attr("src","images/sound.png");
		}
	});

setColor();

});
