
var distIncrement = 10;
var radix = 10;
var obstacle = 240;
var carLeftString;
var carLeftX;

function calcLeftX() {
	carLeftX = parseInt(carLeftString, radix);
	// console.log(carLeftX);
}

function moveCarLeft() {
	document.querySelector('.car').style.left = (carLeftX - distIncrement) + "px";
} 

function moveCarRight() {
	document.querySelector('.car').style.left = (carLeftX + distIncrement) + "px";
} 

function checkOverlap() {
	if ((carLeftX > (obstacle - 50)) && (carLeftX < (obstacle + 50))) {
		console.log('Obstacle!');
	}
	// console.log(carLeftX);
}

function leftRight(e) {

	if (e.keyCode == 37) {
		// the left arrow has been pressed
		carLeftString = window.getComputedStyle(document.querySelector('.car')).getPropertyValue('left');
		calcLeftX();
		moveCarLeft();
		checkOverlap();
	}
	if (e.keyCode == 39) {
		// the right arrow has been pressed
		carLeftString = window.getComputedStyle(document.querySelector('.car')).getPropertyValue('left');
		calcLeftX();
		moveCarRight();
		checkOverlap();
	}
}

var keyListener = document.querySelector('body');
keyListener.addEventListener('keydown', leftRight, false);






