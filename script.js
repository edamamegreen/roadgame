
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

function makeObstacle () {
	// An obstacle is created at the top of the road at a random x position.
	var placeIt = Math.round(Math.random()*gameWidth);
	var newDiv = document.createElement("div");
	var objParent = document.querySelector('.road');
	newDiv.classList.add("cow");
	newDiv.style.top = 10 + "px";
	newDiv.style.left = placeIt + "px";
	objParent.insertBefore(newDiv, document.querySelector('.car'));
	moveObstacles();
}

function moveObstacles () {
	// The obstacle moves down the road and disappears when it reaches the
	// bottom of the road.
	// I chose to do this in JS instead of CSS animate because I want
	// to be able to remove the element when it finishes moving.
	var elem = document.querySelector('.cow');
	var obstacleHeight = parseInt(window.getComputedStyle(elem).getPropertyValue('height'), radix);
	var pos = parseInt(window.getComputedStyle(elem).getPropertyValue('top'), radix);
	var roadHeight = parseInt(window.getComputedStyle(document.querySelector('.road')).getPropertyValue('height'), radix);
	if (pos < (roadHeight - obstacleHeight)) {
		// move down a step
		elem.style.top = pos + 2 + "px";
		console.log(elem.style.top);
		requestAnimationFrame(moveObstacles);
	} else {
		// remove from DOM
		document.querySelector('.road').removeChild(elem);
	}
}

// setInterval(makeObstacle, 1000);
// When I turn on setInterval, moveObstacles seems to 
// speed up when its moving more than one element.
// When multiple obstacles are on the screen,
// they begin to pause before moving.
// I'm not sure why. 
// How can I investigate this phenomenon?
