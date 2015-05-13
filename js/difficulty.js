$(document).ready(function() {
	var gameLevel = 1;
	var numColors = 2;
	var numShapes = 0;
	var fadeTime = 18000;
	
	function difficulty(level) {
		if(level <= 7) {
			numColors++;
		}else if(level <= 14) {
			numShapes++;
		}else {
			fadeTime -= 500;
		}
	}
	
});