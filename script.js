
var distIncrement = 10;
var radix = 10;
var obstacle = 240;
var carLeftString;
var carLeftX;



// Define the states
// Listen for spacebar to move into play state
// Play: Create, move objects and check for collisions, listen for esc to move to intro state
// When a collision occurs animate crash and return to intro state

var gameState = "play";


// ADD OBSTACLES
// Create a small div placed into the road, randomly along the road's width.

var gameWidth = parseInt(window.getComputedStyle(document.querySelector('.road')).getPropertyValue('width'), radix);

function makeObstacle () {
	// An obstacle is created at the top of the road at a random x position.
	var placeIt = Math.round(Math.random()*gameWidth);
	var newDiv = document.createElement("div");
	var objParent = document.querySelector('.road');
	newDiv.classList.add("cow");
	newDiv.style.top = 10 + "px";
	newDiv.style.left = placeIt + "px";
	objParent.insertBefore(newDiv, document.querySelector('.car'));
}

function moveRoad () {

}

function moveCar () {

}

function moveObstacles () {
	// The obstacle moves down the road and disappears when it reaches the
	// bottom of the road.
	// I chose to do this in JS instead of CSS animate because I want
	// to be able to remove the element when it finishes moving.
	var elem = document.querySelectorAll('.cow');
	var roadHeight = parseInt(window.getComputedStyle(document.querySelector('.road')).getPropertyValue('height'), radix);
	
	for (var i = elem.length - 1; i >= 0; i--) {

		var obstacleHeight = parseInt(window.getComputedStyle(elem[i]).getPropertyValue('height'), radix);
		var pos = parseInt(window.getComputedStyle(elem[i]).getPropertyValue('top'), radix);	
		
		if (pos < (roadHeight - obstacleHeight)) {
		// move down a step
		elem[i].style.top = pos + 2 + "px";
		console.log(elem[i].style.top);
		} else {
			// remove from DOM
			document.querySelector('.road').removeChild(elem[i]);
			console.log(elem[i]);
		}	
	}
		requestAnimationFrame(moveObstacles);
}

function checkCollision () {

}

function stepGame() {	
	moveObstacles();
	// Adding the rest of these functions creates an Uncaught RangeError: Maximum call stack size exceeded
	// It's definitely not a good idea to be using requestAnimationFrame in both stepGame and moveObstacles
	// and then to call moveObstacles within stepGame.
	// requestAnimationFrame(moveRoad, moveCar, moveObstacles);
	// checkCollision();
	// stepGame();
}

if (gameState == "play") {
	// createCar();
	stepGame();
}



// CHECK FOR COLLISION

function checkOverlap() {
	if ((carLeftX > (obstacle - 50)) && (carLeftX < (obstacle + 50))) {
		console.log('Obstacle!');
	}
	// console.log(carLeftX);
}



// MOVE THE CAR
// get the numeric value of the left position of the car

function calcLeftX() {
	carLeftX = parseInt(carLeftString, radix);
	// console.log(carLeftX);
}


// move the car by incrementing or decrementing the car's left position

function moveCarLeft() {
	document.querySelector('.car').style.left = (carLeftX - distIncrement) + "px";
} 

function moveCarRight() {
	document.querySelector('.car').style.left = (carLeftX + distIncrement) + "px";
} 

// has a left/right arrow key been pressed? then move the car

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








setInterval(makeObstacle, 2000);
// When I turn on setInterval, moveObstacles seems to 
// speed up when its moving more than one element.
// When multiple obstacles are on the screen,
// they begin to pause before moving.
// I'm not sure why. 
// How can I investigate this phenomenon?
