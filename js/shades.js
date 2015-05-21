$(document).ready(function() {

	// init game constants
	var board = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
	var row1, row2, row3, row4, row5, col1, col2, col3, col4, col5, leftDiag, rightDiag;
	var mute = 0;
	var SoundfxNum = "0";
	var fx1 = new Audio("sounds/fx1.mp3");
	var fx2 = new Audio("sounds/fx2.mp3");
	var fx3 = new Audio("sounds/fx3.mp3");
	var fx4 = new Audio("sounds/fx4.mp3");
	var fx5 = new Audio("sounds/fx5.mp3");
	var achv = new Audio("sounds/AchievementUnlocked.mp3");
	var correct = 0;
	var correctClicked = 0;
	var clicked = false;
	var hasShape = false;
	var score = 0;
	var gameLevel = 1;
	var numColors = 2;
	var numShapes = 0;
	var fadeTime = 10000;
	var faded = false;
	var time = 0;
	var stopWatch;
	var achiev1 = false;
	var achiev2 = false;
	var achiev3 = false;
	var lives = 3;

	function startTime(){
		stopWatch = setInterval(function(){
			 time+=1000;
		}, 1000);
	}

	
	// starts the game
	function startGame() {
		$("svg").remove();
		window.location = "#pregame";
		$("#timer").TimeCircles().destroy();
		$("#timer").TimeCircles();
		var delay = 3800; //Your delay in milliseconds
		startLevel();
		$(".score").html(score);
		$(".level").html(gameLevel);
		$("#gameLevel").html(gameLevel);
		$("#gameLives").text(lives);
		setTimeout(function() {
			window.location = "#game"; 
			if(stopWatch != null){
				clearInterval(stopWatch);
				time = 0;
			}
			startTime(); 
			for (var i=0; i<board.length; i++) {
				d3.select("#d"+i).style("opacity", 1).transition()
				.duration(fadeTime).style("opacity", 0);
			}
			}, delay)
		faded = true;

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
			randomChoice(2);
			makeShapes(2)
			if(fadeTime > 2000) {
				fadeTime -= 500;
			}
		}
		hasShape = ($("#d25").hasClass("svg")?true:false);
		countColor();
	}
	
	function putChoice() {	
		var num = Math.floor(Math.random()*24);
		$("#d" + num).replaceWith($("#d25").clone(true,true).attr("id", "d"+num));
		console.log("Cell " + num);
	}
	
	//Use the class tag so every Play and Playagain button can be referenced the same
	$(".play").on('click touchstart', function(){
		if(this.id != "nextLevel")
			reset();
		
		for(var i=0; i<board.length; i++) {
		//Sets all cells to be able for clicking again.
		board[i][1] =0;
		$("#d"+i).removeClass().addClass("gametd");
		$("#d"+i).prop("style").removeProperty("border-width");
		}
		$("#d25").removeClass();
		startGame();

	});

	// function to randomize the choice cell
	function randomChoice(num) {
		svgContainer = d3.select("#d25").append("svg")
			.attr("width", 52)
			.attr("height", 52);
			var shapeType = randomShapes(svgContainer, num)
			if(shapeType) {
				$("#d25").addClass("gametd");
				$("#d25").addClass(shapeType);
				$("#d25").addClass("svg");
			}

	}

	//function to randomize the colors of the cell

	function randomize(cnum) {
			for (var i=0; i<board.length; i++) {
			var num = Math.floor(Math.random()*cnum)
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
		putChoice();
		//makeShapes();
	}
	
	//function to return the color of selection box
	function getChoiceColor() {
		$("#choice td").css("background-color")
	}


	function reset() {
		correct = 0;
		correctClicked = 0;
		clicked = false;
		hasShape = false;
		score = 0;
		gameLevel = 1;
		numColors = 2;
		numShapes = 0;
		fadeTime = 10000;
		faded = false;
		time = 0;
		lives = 3;
		$("svg").remove();
		
	}

	// making the pregame page not lose the color
	/* 
	$("h1").on('click touchstart', function(){
		$("svg").remove();
		setColor();
		for (var i=0; i<board.length; i++) {
				d3.select("#d"+i).style("opacity", 1).transition().duration(20000).style("opacity", 0);
		}
		console.log(color);
	}) */

	// function to get the color of a clicked cell
	$("td.gametd").on('click touchstart', function() {
		console.log(this.id);
		if(this.id != "d25"){ //Can't click cell in pre-game page
			for(var i=0; i<board.length; i++) {
				//Each cell can only be clicked once
				if(this.id == board[i][0] && board[i][1] == 0){
					board[i][1] = 1;
					if (!mute){
						playSoundFx(SoundfxNum);
					}
					var color = $(this).css("background-color");
					var choiceColor = $("#choice td").css("background-color");
					var choiceSVG = d3.select("svg");
					var colorSVG = $(this).css("fill");
					if (color === choiceColor && (!hasShape && (this.className == "gametd svg" || this.className == "gametd") || $("#d"+i).hasClass($("#d25").attr("class")))) {
						$(this).css("border-width", "medium");
						d3.select(this).style("opacity", 0).transition().duration(0).style("opacity", 1);
						var timeDifference = (fadeTime - time)/1000;
						score = score + ((gameLevel * 10)  * timeDifference) + 100;
						$(".score").html(score);
						correctClicked++;
					}
					 else {
						lives--;
						if(lives <= 0){
							window.location="#done";
						}
						$("#gameLives").text(lives);
					}
				}
			}
		}
		if(correct == correctClicked) {
			for (var i=0; i<board.length; i++) {
				d3.select("#d"+i).style("opacity", 0).transition().duration(0).style("opacity", 1);
			}
			achievements();
			nextLevel();
		}

		
	});

	$("#timed").on('click touchstart', function() {
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
			svgContainers[i] = d3.select("#d"+i).append("svg");
			var shapeType = randomShapes(svgContainers[i], num);
			$("#d"+i).addClass(shapeType);
			$("#d"+i).addClass("svg");
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
				.attr("cx",27)
				.attr("cy",27)
				.attr("r",25)
				.attr("stroke", "turquoise")
				.attr("stroke-width" , 3)
				.attr("fill", color[0]);
				shapeList[i] = "circle";
				return "circle";
				break;
				case 1: 
				color = randomColor(1);
				shape = svg.append("rect")
				.attr("x", 2)
				.attr("y", 2)
				.attr("width",50)
				.attr("height",50)
				.attr("stroke", "turquoise")
				.attr("stroke-width" , 3)
				.attr("fill", color[0]);
				shapeList[i] = shape;
				return "rect";
				break;
				case 2: 
				color = randomColor(1);
				svg.append("polygon")
				.attr("points", "25, 0 0, 50 50,50")
				.attr("stroke", "turquoise")
				.attr("stroke-width" , 3)
				.attr("fill", color[0]);
				shapeList[i] = "triangle";
				return "triangle";
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
		//console.log(shapeList);
		//return shapeList;
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
	$(".muteButton").on('click', function() {
		if(mute == 0){
			mute = 1;
			$(".muteButton").text('Sound Off');
			document.getElementById("music").pause();
		} else {
			mute = 0;
			$(".muteButton").text('Sound On');
			document.getElementById("music").play();
		}
		$(this).button('refresh');
	});
	
	// function that tally up all the colors
	function countColor() {
		for (var i=0; i<board.length; i++) {
			if($("#d" + i).css("background-color") == $("#d25").css("background-color") && (!hasShape && (document.getElementById("d"+i).className == "gametd svg" || document.getElementById("d"+i).className == "gametd") || $("#d"+i).hasClass($("#d25").attr("class")))) {
				correct++;
			}
		}
	}

	function nextLevel() {
		faded = false;
		$("#levelClear").html("LEVEL " + gameLevel + " CLEARED");
		if (fadeTime > 4000)
			fadeTime -= 500;
		gameLevel++;
		
		
		
		for(var i=0; i<board.length; i++) {
			//Sets all cells to be able for clicking again.
			board[i][1] =0;
			$("#d"+i).removeClass().addClass("gametd");
			$("#d"+i).prop("style").removeProperty("border-width");
		}
		
		$("#d25").removeClass();
		window.location = "#clear"
		//gameLevel++;
		
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
		//console.log(colorList);
		
		return colorList;
	}

	$(".menu").click(function(){
		window.location = "#main";
	})

	$(".board").click(function(){
		window.location = "#LeaderboardPage";
	})

	$("#send").click(function(){
		var num = score;
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
		window.location = "#main";
	}); 

	function showLeaderBoard(){
		$.getJSON("https://api.mongolab.com/api/1/databases/sos/collections/leaderboard?apiKey=br10X-RgokMGFuGnyr5w4WHdKpa046Fr&s={%22score%22:-1}", function(result){
			var j = 1;
			$.each(result, function(i, field){
				$("#bodyLeader").append('<tr class = "LBscore" > <td>'+j+'</td> <td>'+field.name+'</td> <td>'+field.score+'</td> </tr>');
				j++;
			});
		});
		$(".LBscore").remove();
	}

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
	// ---------------------------------------------------
	// ACHIEVEMENTS //
	function achievements() {
		
		if (gameLevel == 3 && !achiev1) {
			achiev1 = true;
			if(!mute){
				achv.play();
			}
			$("#ac").prepend('<img id="ach1" src="images/a1.png" width="80%"/>').hide();
			$("#ac").show().slideDown("slow", function() {
				$("#ach1").fadeOut(5000, function() {$("img#ach1").remove();});
			});
			//$("#fastIMG").remove();
			$(".fastIMG").replaceWith('<img src="images/Trophy_color.png" width="100px" height="100px">');
			
		}

		if (time >= fadeTime && !achiev2) {
			achiev2 = true;
			if(!mute){
				achv.play();
			}
			$("#ac").prepend('<img id="ach2" src="images/a2.png" width="80%"/>').hide();
			$("#ac").show().slideDown("slow", function() {
				$("#ach2").fadeOut(5000, function() {$("img#ach1").remove();});
			});
			$(".faydeIMG").replaceWith('<img src="images/Trophy_color.png" width="100px" height="100px">');

		}

		if (score >= 20000 && lives == 3 && !achiev3 ) {
			achiev3 = true;
			achv.play();
			$("#ac").prepend('<img id="ach3" src="images/a3.png" width="80%"/>').hide();
			$("#ac").show().slideDown("slow", function() {
				$("#ach3").fadeOut(5000, function() {$("img#ach1").remove();});
			});
		}
		$(".upIMG").replaceWith('<img src="images/Trophy_color.png" width="100px" height="100px">');

	}
	
	$("#achievementsButton").click(function(){
		window.location="#achievements";
	});

	$("#leaderBoard").click(function(){
		showLeaderBoard();
		window.location="#LeaderboardPage";
	});

	$(".settingButton").click(function(){
		window.location = "#setting";
	});	
	
	$(".submit").click(function(){
		window.location = "#sumbitPage";
	});	

});

