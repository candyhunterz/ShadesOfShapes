$(document).ready(function() {

	// init game constants
	var board = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
	var row1, row2, row3, row4, row5, col1, col2, col3, col4, col5, leftDiag, rightDiag;
	var correct = 0;
	var mute = 0;
	var SoundfxNum = "0";
	var fx1 = new Audio("sounds/fx1.mp3");
	var fx2 = new Audio("sounds/fx2.mp3");
	var fx3 = new Audio("sounds/fx3.mp3");
	var fx4 = new Audio("sounds/fx4.mp3");
	var fx5 = new Audio("sounds/fx5.mp3");
	var correct = 0;
	var correctClicked = 0;
	var clicked = false;
	var score = 0;
	var gameLevel = 1;
	var numColors = 3;
	var numShapes = 0;
	var fadeTime = 10000;

	
	// starts the game
	function startGame() {
		$("svg").remove();
		window.location = "#pregame";
		$("#timer").TimeCircles().destroy();
		$("#timer").TimeCircles();
		var delay = 3800; //Your delay in milliseconds
		$(".level").html(gameLevel);
		$("#gameLevel").html(gameLevel);
		$(".score").html(score);
		startLevel();
		setTimeout(function() {
			window.location = "#game"; 
			for (var i=0; i<board.length; i++) {
				d3.select("#d"+i).style("opacity", 1).transition()
				.duration(fadeTime).style("opacity", 0);
			}
			}, delay)
	}
	
	function startLevel() {
		// starts level
		setColor();
		if(gameLevel <= 5) {
			//Easy Levels 1-7
			if(numColors < 5) {
				numColors++;
			}
		}else if(gameLevel <= 10) {
			//Medium Levels 8-14
			randomChoice(2);
			makeShapes(2);

			if(numShapes < 6) {
				numShapes++;
			}
		}else {
			//Hard Levels 15+
			if(fadeTime > 2000) {
				fadeTime -= 500;
			}
		}
	}
	//Use the class tag so every Play and Playagain button can be referenced the same
	$(".play").click(function(){
		if(this.id == "playButton" || this.id == "playAgain") {
			gameLevel = 1;
			score = 0;
		}
		reset();
		startGame();
	});

	// function to randomize the choice cell
	function randomChoice(num) {
		svgContainer = d3.select("#d25").append("svg")
			.attr("width", 50)
			.attr("height", 50);
			randomShapes(svgContainer, num);

	}

	//function to randomize the colors of the cell

	function randomize(cnum) {
			for (var i=0; i<board.length; i++) {
			var num = Math.floor(Math.random()*3)
			var color='';
			board[i][0] = 0;
			if (num == 0) {
				color = 'red';
			}
			else if (num == 1) {
				color = 'blue';	
			}
			else if (num == 2) {
				color = 'yellow';
			}
			else if (num == 3) {
				color = 'green';
			}
			else if (num == 4) {
				color = 'purple';
			}
			$("#d"+i).css({backgroundColor: color});
			board[i][0] = "d" + i;
		}
		$("#choice td").css({backgroundColor: color});
	
	}

	// initialize game state
	function setColor() {
		randomize(numColors);
		//makeShapes();
		countColor();
	}
	
	//function to return the color of selection box
	function getChoiceColor() {
		$("#choice td").css("background-color")
	}


	function reset() {
		correct  = 0;
		correctClicked = 0;
		$("svg").remove();
		
	}

	// making the pregame page not lose the color
	/* 
	$("h1").click(function(){
		$("svg").remove();
		setColor();
		for (var i=0; i<board.length; i++) {
				d3.select("#d"+i).style("opacity", 1).transition().duration(20000).style("opacity", 0);
		}
		console.log(color);
	}) */

	// function to get the color of a clicked cell
	$("td").click(function() {
		if(this.id != "d25"){ //Can't click cell in pre-game page
			for(var i=0; i<board.length; i++) {
				//Each cell can only be clicked once
				if(this.id == board[i][0] && board[i][1] == 0){
					board[i][1] = 1;
					playSoundFx(SoundfxNum);
					var color = $(this).css("background-color");
					var choiceColor = $("#choice td").css("background-color");
					var choiceSVG = d3.select("svg");
					var colorSVG = $(this).css("fill");
					if (color === choiceColor) {
						d3.select(this).style("opacity", 0).transition().duration(0).style("opacity", 1);
						score += 100;
						$(".score").html(score);
					}
					if(color === choiceColor) {
						correctClicked++;
					}
				}
			}
		}
		if(correct == correctClicked) {
			for (var i=0; i<board.length; i++) {
				d3.select("#d"+i).style("opacity", 0).transition().duration(0).style("opacity", 1);
			}
			nextLevel();
		}

		
	});

	$("#timed").click(function() {
		reset();
		for (var i=0; i<board.length; i++) {
			$("#d" + i).animate({
				opacity: 0, color: '#FFFFFF'}, 5000, function() {
				});
		}
	});

	// function to generate shapes into each cell using svg 
	// using D3.js to make things easier
	function makeShapes(num) {
		var svgContainers = [];
		var shape;
		// making svg containers in all squares
		for (var i=0; i<board.length; i++) {
			svgContainers[i] = d3.select("#d"+i).append("svg")
			.attr("width", 50)
			.attr("height", 50);
			randomShapes(svgContainers[i], num);
		}	
	}
	
	// function to randomly make a shape
	function randomShapes(svg, snum) {
		
		var shape;
		var color = [];
		var shapeList = [];
		for (var i=0; i<snum; i++) {
			var num = Math.floor(Math.random()*6)
			switch (num) {
				case 0:
				color = randomColor(1); 
				shape = svg.append("circle")
				.attr("cx",25)
				.attr("cy",25)
				.attr("r",25)
				.attr("fill", color[0]);
				shapeList[i] = shape;
				break;
				case 1: 
				color = randomColor(1);
				shape = svg.append("rect")
				.attr("width",50)
				.attr("height",50)
				.attr("fill", color[0]);
				shapeList[i] = shape;
				break;
				case 2: 
				break;
				case 3: 
				break;
				case 4: 
				break;
				case 5: 
				break;
				default: ;
				console.log("not a valid shape");
			}
		}
		console.log(shapeList);
		return shapeList;
}
	//sound effects
	function playSoundFx(fx){
		switch(fx){
			case "0":
				SoundfxNum = "1";
				fx1.play();
				break;
			case "1" :
				SoundfxNum = "2";
				fx2.play();
				break;
			case  "2":
				SoundfxNum = "3";
				fx3.play();
				break;
			case  "3":
				SoundfxNum = "4";
				fx4.play();
				break;
			case  "4":
				SoundfxNum = "0";
				fx5.play();
				break;
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
	
	// function that tally up all the colors
	function countColor() {
		for (var i=0; i<board.length; i++) {
			if($("#d" + i).css("background-color") == $("#d25").css("background-color")) {
				correct++;
			}
		}
	}

	function nextLevel() {
		$("#levelClear").html("LEVEL " + gameLevel + " CLEARED");
		if (fadeTime > 5000)
			fadeTime -= 500;
		gameLevel++;
		
		
		
		for(var i=0; i<board.length; i++) {
			//Sets all cells to be able for clicking again.
			board[i][1] =0;
		}
		window.location = "#clear"
		$(".score").html(score);
	}


//////////////////////////////////////////////////////////////////////////////////

	// new function to generate color
	// cnum from 0 to 5
	// returns an array of random colors
	function randomColor(cnum) {
		var colorList = [];
		for (var i=0; i<cnum; i++) {
			var num = Math.floor(Math.random()*5);
			var color;
			switch (num) {
				case 0: 
					color = "blue";
					colorList[i] = color;
					break;
				case 1:
					color = "red";
					colorList[i] = color;
					break;
				case 2:
					color = "yellow";
					colorList[i] = color;
					break;
				case 3:
					color = "green";
					colorList[i] = color;
					break;
				case 4:
					color = "purple";
					colorList[i] = color;
					break;
				default:
					console.log("cnum too big");
			}

		}	
		console.log(colorList);
		
		return colorList;
	}

});
