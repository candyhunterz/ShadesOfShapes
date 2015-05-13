$(document).ready(function() {
	var gameLevel = 1;
	var numColors = 2;
	var numShapes = 0;
	var fadeTime = 18000;
	
	function startLevel() {
		//TO-DO: put in start level
		
		if(gameLevel <= 7) {
			//Easy Levels 1-7
			if(numColors < 5) {
				numColors++;
			}
		}else if(gameLevel <= 14) {
			//Medium Levels 8-14
			if(numShapes < 6) {
				numShapes++;
			}
		}else {
			//Hard Levels 15+
			if(fadeTime > 5000) {
				fadeTime -= 500;
			}
		}
	}
	
	function newGame() {
		gameLevel = 1;
		numColors = 2;
		numShapes = 0;
		fadeTime = 18000;
	}
	
});