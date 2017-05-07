
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


var gameWidth = parseInt(window.getComputedStyle(document.querySelector('.road')).getPropertyValue('width'), radix);

// Trying to create a function that adds a small div
// into the road, randomly along its width.

function randoShit () {
	var placeIt = Math.round(Math.random()*gameWidth);
	var newDiv = document.createElement("div");
	var objParent = document.querySelector('.road');
	newDiv.classList.add("cow");
	newDiv.style.backgroundColor = "lime";
	newDiv.style.position = "absolute";
	newDiv.style.width = 50 + "px";
	newDiv.style.height = 50+ "px";
	newDiv.style.top = 10 + "px";
	newDiv.style.left = placeIt + "px";
	objParent.insertBefore(newDiv, document.querySelector('.car'));
}




