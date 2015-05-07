$(document).ready(function() {

	// init game constants
	var board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var row1, row2, row3, row4, row5, col1, col2, col3, col4, col5, leftDiag, rightDiag;
	var correct = 0;
	

	
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
	// function to get the color of a clicked cell
	$("td").click(function() {
		var color = $(this).css("background-color");
		var choiceColor = $("#choice td").css("background-color")
		makeShape('rect');
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



setColor();
	//var svgContainer = d3.select("#d2").append("svg").attr("width", 50).attr("height", 50);
	//var circle = svgContainer.append("circle").attr("cx", 30).attr("cy", 30).attr("r", 20);


});
