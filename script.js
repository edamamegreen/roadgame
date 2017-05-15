
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
	if (gameState == "play") {
		// An obstacle is created at the top of the road at a random x position.
		var placeIt = Math.round(Math.random()*gameWidth);
		var newDiv = document.createElement("div");
		var objParent = document.querySelector('.road');
		newDiv.classList.add("cow");
		newDiv.style.top = 10 + "px";
		newDiv.style.left = placeIt + "px";
		objParent.insertBefore(newDiv, document.querySelector('.car'));
	} else {
		return;
	}
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
		// console.log(elem[i].style.top);
		checkCollision();
		} else {
			// remove from DOM
			document.querySelector('.road').removeChild(elem[i]);
			console.log(elem[i]);
		}	
	}

	if (gameState == "play") {
		requestAnimationFrame(moveObstacles);
	} else {
		return;
	}
}

function checkCollision () {
	var elem = document.querySelectorAll('.cow');

	for (var i = elem.length - 1; i >= 0; i--) {
		var obsX1 = parseInt(window.getComputedStyle(elem[i]).getPropertyValue('left'), radix);
		var obsX2 = obsX1 + parseInt(window.getComputedStyle(elem[i]).getPropertyValue('width'), radix);
		var obsY1 = parseInt(window.getComputedStyle(elem[i]).getPropertyValue('top'), radix);
		var obsY2 = obsY1 + parseInt(window.getComputedStyle(elem[i]).getPropertyValue('height'), radix);
		var carX1 = parseInt(window.getComputedStyle(document.querySelector('.car')).getPropertyValue('left'), radix);
		var carX2 = carX1 + parseInt(window.getComputedStyle(document.querySelector('.car')).getPropertyValue('width'), radix);
		var carY1 = parseInt(window.getComputedStyle(document.querySelector('.car')).getPropertyValue('top'), radix);
		var carY2 = carY1 + parseInt(window.getComputedStyle(document.querySelector('.car')).getPropertyValue('height'), radix);
		// console.log(obsX1, obsX2, obsY1, obsY2);
		// console.log(carX1, carX2, carY1, carY2);
		if (
			(((obsX1 < carX1) && (carX1 < obsX2)) || 
			((obsX1 < carX2) && (carX2 < obsX2))) &&
			(((obsY1 < carY1) && (carY1 < obsY2)) ||
			((obsY1 < carY2) && (carY2 < obsY2)))
			) {
			console.log("BAM!!");
		}
	}
}

// 229 279 130 180
// 185 215 230 280

function stepGame() {
	// createCar();
	// stepGame();
	moveObstacles();
	// Adding the rest of these functions creates an Uncaught RangeError: Maximum call stack size exceeded
	// It's definitely not a good idea to be using requestAnimationFrame in both stepGame and moveObstacles
	// and then to call moveObstacles within stepGame.
	// requestAnimationFrame(moveRoad, moveCar, moveObstacles);
	// checkCollision();
	// stepGame();	
}

function playGame() {
	gameState = "play";
	moveObstacles();
}

function stopGame() {
	gameState = 0;
}

function pausePlay() {
	if (gameState == "play") {
		console.log("Stop");
		stopGame();
	}
	else {
		console.log("Start");
		playGame();
	}
}

function spaceBar(e) {
		console.log(e.keyCode);
	if (e.keyCode == 32) {
		pausePlay();
	}
}

var spacebarlistener = document.querySelector('body');
spacebarlistener.addEventListener('keydown', spaceBar, false);


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
	}
	if (e.keyCode == 39) {
		// the right arrow has been pressed
		carLeftString = window.getComputedStyle(document.querySelector('.car')).getPropertyValue('left');
		calcLeftX();
		moveCarRight();
	}
}

var keyListener = document.querySelector('body');
keyListener.addEventListener('keydown', leftRight, false);



if (gameState == "play") {
	setInterval(makeObstacle, 2000);
};



// I once saw the obstacles all collected at the top of the screen, the moveObstacles
// appeared to be paused until I focused on the browser again but makeObstacle
// had been creating new ones while I was away. A whole row of obstacles
// started moving at once.


