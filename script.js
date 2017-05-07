
var distIncrement = 10;

function carLeft() {
	var carPosition = window.getComputedStyle(document.querySelector('.car')).getPropertyValue('left');
	document.querySelector('.car').style.left = (parseInt(carPosition, 10) - distIncrement) + "px";
} 

function carRight() {
	var carPosition = window.getComputedStyle(document.querySelector('.car')).getPropertyValue('left');
	document.querySelector('.car').style.left = (parseInt(carPosition, 10) + distIncrement) + "px";
} 

function leftRight(e) {

	if (e.keyCode == 37) {
		// the left arrow has been pressed
		carLeft();
	}
	if (e.keyCode == 39) {
		// the right arrow has been pressed
		carRight();
	}
}

var keyListener = document.querySelector('body');
keyListener.addEventListener('keydown', leftRight, false);