var gameState = {
    inPlay: null,
    points: 0,
    carPositionLeft: 0,
    carPositionTop: 0,
    carDamage: 0,
    obstacles: [], //should this be an array or a map?
    roadSpeed: 10,
    cowSpeed: 2
}
var distIncrement = 10;
var radix = 10;
var obstacle = 240;
var carLeftString;
var carLeftX;

var gameWidth = parseInt(window.getComputedStyle(document.querySelector('.road')).getPropertyValue('width'), radix);

// MOVE THE ROAD

function moveRoad() {

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


// OBSTACLES

function makeCow() {
    this.posLeft = Math.round(Math.random() * gameWidth);
    this.speed = gameState.cowSpeed;
    this.direction = 270;
    this.build = function () {
        var newDiv = document.createElement("div");
        var objParent = document.querySelector('.road');  
        newDiv.classList.add("cow");
        newDiv.style.top = 10 + "px";
        newDiv.style.left = this.posLeft + "px";
        objParent.insertBefore(newDiv, document.querySelector('.car'));  
    }
}

function makeObstacle() {
    if (gameState.inPlay == "play") {       
    // if (type == "cow") {
        var cow = new makeCow();
        gameState.obstacles.push(cow);
        cow.build();  
    // }   
    }
}

function bashObstacle(pos) {
    var cowX = Math.cos(pos);
    var elem = document.querySelector('.bam');
    var cowTop = parseInt(window.getComputedStyle(elem).getPropertyValue('top'), radix);
    var cowBottom = cowTop + parseInt(window.getComputedStyle(elem).getPropertyValue('height'), radix);
    var cowLeft = parseInt(window.getComputedStyle(elem).getPropertyValue('left'), radix);
    var cowRight = cowLeft + parseInt(window.getComputedStyle(elem).getPropertyValue('width'), radix);
    var roadTop = parseInt(window.getComputedStyle(document.querySelector('.road')).getPropertyValue('top'), radix);
    var roadBottom = roadTop + parseInt(window.getComputedStyle(document.querySelector('.road')).getPropertyValue('height'), radix);
    var roadLeft = parseInt(window.getComputedStyle(document.querySelector('.road')).getPropertyValue('left'), radix);
    var roadRight = roadLeft + parseInt(window.getComputedStyle(document.querySelector('.road')).getPropertyValue('width'), radix);
    console.log("cos" + cowX);

        elem.style.top = cowTop - 100 + "px";
        elem.style.left = cowLeft + (100* cowX) + "px";
        console.log(cowTop + " " + cowLeft);

    // if (((cowBottom < roadTop) ||
    //     (cowLeft > roadRight) ||
    //     (cowRight < roadLeft) ||
    //     (cowTop < roadBottom))) {     
    //     console.log(cowBottom + "<"+ roadTop);
    //     console.log(cowLeft + ">"+ roadRight);
    //     console.log(cowRight + "<"+ roadLeft);
    //     console.log(cowTop + ">"+ roadBottom);
    //     document.querySelector('.road').removeChild(elem); 
    // }
    // else {

    // }

}

function moveObstacles() {
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
            if (checkCollision(elem[i]) !== false) {
                // console.log((180/Math.PI)*checkCollision(elem[i]));
                // document.querySelector('.road').removeChild(elem[i]);
                elem[i].classList.remove("cow");
                elem[i].classList.add("bam");
                bashObstacle(checkCollision(elem[i]));
            };

        } else {
            // remove from DOM
            document.querySelector('.road').removeChild(elem[i]);
            console.log(elem[i]);
        }
    }
}

function checkCollision(elem) {

    var obsX1 = parseInt(window.getComputedStyle(elem).getPropertyValue('left'), radix);
    var obsX2 = obsX1 + parseInt(window.getComputedStyle(elem).getPropertyValue('width'), radix);
    var obsY1 = parseInt(window.getComputedStyle(elem).getPropertyValue('top'), radix);
    var obsY2 = obsY1 + parseInt(window.getComputedStyle(elem).getPropertyValue('height'), radix);
    var carX1 = parseInt(window.getComputedStyle(document.querySelector('.car')).getPropertyValue('left'), radix);
    var carX2 = carX1 + parseInt(window.getComputedStyle(document.querySelector('.car')).getPropertyValue('width'), radix);
    var carY1 = parseInt(window.getComputedStyle(document.querySelector('.car')).getPropertyValue('top'), radix);
    var carY2 = carY1 + parseInt(window.getComputedStyle(document.querySelector('.car')).getPropertyValue('height'), radix);
    // console.log(obsX1, obsX2, obsY1, obsY2);
    // console.log(carX1, carX2, carY1, carY2);

    var collisionAngle = Math.atan2(25, ((obsX1 + ((obsX2 - obsX1)/2)) - (carX1 + ((carX2 - carX1)/2))));

    if (
        (((obsX1 < carX1) && (carX1 < obsX2)) ||
            ((obsX1 < carX2) && (carX2 < obsX2))) &&
        (((obsY1 < carY1) && (carY1 < obsY2)) ||
            ((obsY1 < carY2) && (carY2 < obsY2)))
    ) {
        // console.log(collisionAngle);
        return collisionAngle;
    } else {
        return false;
    }

}


//PLAY/PAUSE

function playGame() {
    gameState.inPlay = "play";
    stepGame();
    setInterval(makeObstacle, 1000);
}

function stopGame() {
    gameState.inPlay = 0;

}

function pausePlay() {
    if (gameState.inPlay == "play") {
        console.log("Stop");
        stopGame();
        document.querySelector('.road p').style.visibility = "visible";
    } else {
        console.log("Start");
        playGame();
        document.querySelector('.road p').style.visibility = "hidden";
    }
}

function spaceBar(e) {
    // console.log(e.keyCode);
    if (e.keyCode == 32) {
        pausePlay();
    }
}

var spacebarlistener = document.querySelector('body');
spacebarlistener.addEventListener('keydown', spaceBar, false);


// STEP GAME




function stepGame() {
    if (gameState.inPlay == "play") {
        requestAnimationFrame(moveObstacles, bashObstacle);
    }

    // Adding the rest of these functions creates an Uncaught RangeError: Maximum call stack size exceeded
    // It's definitely not a good idea to be using requestAnimationFrame in both stepGame and moveObstacles
    // and then to call moveObstacles within stepGame.
    // requestAnimationFrame(moveRoad, moveCar, moveObstacles);
    // checkCollision();
    // stepGame();  
}


function printGameState() {
    var obstacles;
    for (var i = Things.length - 1; i >= 0; i--) {
        Things[i]
    }
    
    console.log(
        "Game Play: ", gameState.inPlay, "\n", 
        "Car Left: ", carLeftX, "\n");
}

setInterval(stepGame, 20);

