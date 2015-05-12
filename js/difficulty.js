$(document).ready(function() {
	var gameLevel = 1;
	var numColors = 2;
	var numShapes = 0;
	var fadeTime = 18000;
	
	function difficulty(level) {
		if(level <= 7) {
			easy(numColors);
		}else if(level <= 14) {
			med(numColors, numShapes);
		}else {
			hard(numColors, numShapes, fadeTime);
		}
	}
	
	function easy(colors) {
		numColors++;
	}
	
	function med(colors, shapes) {
		numShapes++
	}
	
	function hard(colors, shapes, fade) {
		fadeTime -= 500;
	}
});