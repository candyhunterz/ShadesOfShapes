$(document).ready(function() {

	// init game constants
	var board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var row1, row2, row3, row4, row5, col1, col2, col3, col4, col5, leftDiag, rightDiag;
	var correct = 0;
	var mute = 0;
	var SoundfxNum = "0";
	var fx1 = new Audio("sounds/fx1.mp3");
	var fx2 = new Audio("sounds/fx2.mp3");
	var fx3 = new Audio("sounds/fx3.mp3");
	var fx4 = new Audio("sounds/fx4.mp3");
	var fx5 = new Audio("sounds/fx5.mp3");
	var red = 0;
	var blue = 0;
	var yellow = 0;
	var redClicked = 0;
	var blueClicked = 0;
	var yellowClicked = 0;
	var clicked = false;
	var muteSoundFX = false;
	var lives = 3;

	getMute();

	// starts the game
	function startGame() {
		reset();
		window.location = "#pregame";
		getMute();
		$("#timer").TimeCircles().destroy();
		$("#timer").TimeCircles();
		var delay = 3800; //Your delay in milliseconds
		setTimeout(function() {
			window.location = "#game"; 
			for (var i=0; i<board.length; i++) {
				d3.select("#d"+i).style("opacity", 1).transition()
				.duration(15000).style("opacity", 0);
			}
			}, delay)
	}

	//Use the class tag so every Play and Playagain button can be referenced the same
	$(".play").click(function(){startGame()});

	//function to randomize the colors of the cell
	function randomize(color) {
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
		countColor();
		console.log("red: " + red + " blue: " + blue + " yellow: " + yellow);
	}
	
	//function to return the color of selection box
	function getChoiceColor() {
		$("#choice td").css("background-color")
	}


	function reset() {
		blue = 0;
		red = 0;
		yellow = 0;
		redClicked = 0;
		blueClicked = 0;
		yellowClicked = 0;
		$("svg").remove();
		setColor();
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
		playSoundFx(SoundfxNum);
		var color = $(this).css("background-color");
		var choiceColor = $("#choice td").css("background-color");
		if (color === choiceColor) {
			d3.select(this).style("opacity", 0).transition().duration(0).style("opacity", 1);
		} else {
			lives--;
			if(lives <= 0){
				lives = 3;
				window.location = "#done";
			}
			$("#gameLives").text(lives);

		}
		if (color === "rgb(255, 255, 0)")
			yellowClicked++;
		if (color === "rgb(0, 0, 255)")
			blueClicked++;
		if (color === "rgb(255, 0, 0)")
			redClicked++;
		if (yellowClicked == (yellow*2) || blueClicked == (blue*2) || redClicked == (red*2)) {
			for (var i=0; i<board.length; i++) {
				d3.select("#d"+i).style("opacity", 0).transition().duration(0).style("opacity", 1);
			}
			nextLevel();
		} 

		console.log(color);
		console.log(yellowClicked);
	})

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
	function makeShapes() {
		var svgContainers = [];
		var shape;
		// making svg containers in all squares
		for (var i=0; i<board.length; i++) {
			svgContainers[i] = d3.select("#d"+i).append("svg")
			.attr("width", 50)
			.attr("height", 50);
			randomShapes(svgContainers[i]);
		}	
	}
	
	// function to randomly make a shape
	function randomShapes(svg) {
		var num = Math.floor(Math.random()*6)
		var shape;
		var color;
		switch (num) {
			case 0:
			color = "green"; 
			svg.append("circle")
			.attr("cx",25)
			.attr("cy",25)
			.attr("r",25)
			.attr("fill", color);
			break;
			case 1: 
			color = "cyan";
			svg.append("rect")
			.attr("width",50)
			.attr("height",50)
			.attr("fill", color);
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
			case "2":
				SoundfxNum = "3";
				fx3.play();
				break;
			case "3":
				SoundfxNum = "4";
				fx4.play();
				break;
			case "4":
				SoundfxNum = "0";
				fx5.play();
				break;
		}
	}

	// Displaying mute button in pages
	function getMute(){
		if(mute === 0){
			$("#muteButton").attr("src","images/sound.png");
		} else {
			$("#muteButton").attr("src","images/mute.png");
		}
	}
	
	// function that mute the sound 
	$("#muteButton").click(function() {
		if(mute === 0){
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
		color = [];
		for (var i=0; i<board.length; i++) {
			color[i] = $("#d" + i).css("background-color");
			
		}
		for (var i=0; i<color.length; i++) {
			if (color[i] === "rgb(0, 0, 255)")
				blue++;
			if (color[i] === "rgb(255, 0, 0)")
				red++;
			if (color[i] === "rgb(255, 255, 0)")
				yellow++;

		}

	}

	function nextLevel() {
		window.location = "#clear"
	}

	$("#achievementsButton").click(function(){
		window.location = "#achievements"
	});

});
