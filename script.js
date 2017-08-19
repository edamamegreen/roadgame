var gameState = {
    inPlay: null,
    points: 0,
    carPositionLeft: 0,
    carPositionTop: 0,
    carDamage: 0,
    obstacles: [], //should this be an array or a map?
    roadSpeed: 10,
    bananaSpeed: 2,
    points: 0
}
var distIncrement = 10;
var radix = 10;
var obstacleWidth = 30;
// var obstacle = 240; //is this doing anything?
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
    carLeftString = window.getComputedStyle(document.querySelector('.car')).getPropertyValue('left');
    calcLeftX();
    if (parseInt(window.getComputedStyle(document.querySelector('.car')).getPropertyValue('left'), radix) > 1) {
        document.querySelector('.car').style.left = (carLeftX - distIncrement) + "px";
    }
}

function moveCarRight() {
    carLeftString = window.getComputedStyle(document.querySelector('.car')).getPropertyValue('left');
    calcLeftX();
    if ((parseInt(window.getComputedStyle(document.querySelector('.car')).getPropertyValue('left'), radix)
         + parseInt(window.getComputedStyle(document.querySelector('.car')).getPropertyValue('width'), radix)) < 400) {

        document.querySelector('.car').style.left = (carLeftX + distIncrement) + "px";
    }
}

// has a left/right arrow key been pressed? then move the car
// learned from: http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html

var Key = {
    _pressed: {},
    LEFT: 37,
    RIGHT: 39,
    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },
    onKeydown: function(e) {
        this._pressed[e.keyCode] = true;
    },
    onKeyup: function(e) {
        delete this._pressed[e.keyCode];
    }
}

var keyListener = document.querySelector('body');
keyListener.addEventListener('keyup', function(e) {Key.onKeyup(e);}, false);
keyListener.addEventListener('keydown', function(e) {Key.onKeydown(e);}, false);


// OBSTACLES

function makeBanana() {
    this.posLeft = Math.round(Math.random() * gameWidth);
    this.speed = gameState.bananaSpeed;
    this.dx = 0;
    this.build = function () {
        var newDiv = document.createElement("img");
        var objParent = document.querySelector('.road');  
        newDiv.classList.add("banana");
        newDiv.src = "banana.svg";
        newDiv.style.top = 10 + "px";
        newDiv.style.left = this.posLeft + "px";
        objParent.insertBefore(newDiv, document.querySelector('.car')); 
        gameState.obstacles.push(newDiv); 
    }
}

function makeObstacle() {
    if (gameState.inPlay == "play") {       
    // if (type == "banana") {
        var banana = new makeBanana();
        banana.build();  
    // }   
    }
}

function moveObstacles() {
    var roadHeight = parseInt(window.getComputedStyle(document.querySelector('.road')).getPropertyValue('height'), radix);
    var obs = gameState.obstacles;
    for (var i = obs.length - 1; i >= 0; i--) {

        var obstacleHeight = parseInt(window.getComputedStyle(obs[i]).getPropertyValue('height'), radix);
        var posY = parseInt(window.getComputedStyle(obs[i]).getPropertyValue('top'), radix);

        if (obs[i].classList.contains('banana') == true) {

            if (posY < (roadHeight - obstacleHeight)) {
                // move down a step
                obs[i].style.top = posY + 2 + "px";


                if (checkCollision(obs[i]) !== false) {
                    console.log("collision angle: " + checkCollision(obs[i]));
                    obs[i].classList.remove("banana");
                    obs[i].classList.add("bam");
                    obs[i].classList.add("spin");
                    obs[i].dx = checkCollision(obs[i]);
                    gameState.points = 100 + gameState.points;
                    document.querySelector('.points').innerHTML = gameState.points;
                    console.log(obs[i].dx);
                };

            } else {
                // remove from DOM
                obs[i].remove();
                obs.splice(i, 1);
            }
        }

        if (obs[i].classList.contains('bam') == true) {
   
            var bananaTop = parseInt(window.getComputedStyle(obs[i]).getPropertyValue('top'), radix);
            var bananaBottom = bananaTop + parseInt(window.getComputedStyle(obs[i]).getPropertyValue('height'), radix);
            var bananaLeft = parseInt(window.getComputedStyle(obs[i]).getPropertyValue('left'), radix);
            var bananaRight = bananaLeft + parseInt(window.getComputedStyle(obs[i]).getPropertyValue('width'), radix);
            var roadTop = parseInt(window.getComputedStyle(document.querySelector('.road')).getPropertyValue('top'), radix);
            var roadBottom = roadTop + parseInt(window.getComputedStyle(document.querySelector('.road')).getPropertyValue('height'), radix);
            var roadLeft = parseInt(window.getComputedStyle(document.querySelector('.road')).getPropertyValue('left'), radix);
            var roadRight = roadLeft + parseInt(window.getComputedStyle(document.querySelector('.camera')).getPropertyValue('width'), radix);

            obs[i].style.top = bananaTop - 10 + "px";
            obs[i].style.left = bananaLeft + (.5 * obs[i].dx) + "px";
            // console.log("Obstacle: " + i + " Top: " + bananaTop + " Left: " + bananaLeft + " Dir: " + obs[i].dx);

            if (((bananaTop < 0) ||
                (bananaLeft < (-roadLeft)) ||
                (bananaRight > roadRight) ||
                (bananaBottom > roadBottom))) {
                    
                    obs[i].remove();
                    obs.splice(i, 1); 
            
            }
        }
    }
}

function checkCollision(elem) {

    var obsX1 = parseInt(window.getComputedStyle(elem).getPropertyValue('left'), radix);
    var obsX2 = obsX1 + parseInt(window.getComputedStyle(elem).getPropertyValue('width'), radix);
    var obsY1 = parseInt(window.getComputedStyle(elem).getPropertyValue('top'), radix);
    var obsY2 = obsY1 + parseInt(window.getComputedStyle(elem).getPropertyValue('height'), radix);
    var carX1 = parseInt(window.getComputedStyle(document.querySelector('.car')).getPropertyValue('left'), radix);
    var carWidth = parseInt(window.getComputedStyle(document.querySelector('.car')).getPropertyValue('width'), radix);
    var carX2 = carX1 + carWidth;
    var carY1 = parseInt(window.getComputedStyle(document.querySelector('.car')).getPropertyValue('top'), radix);
    var carY2 = carY1 + parseInt(window.getComputedStyle(document.querySelector('.car')).getPropertyValue('height'), radix);
    // console.log(obsX1, obsX2, obsY1, obsY2);
    // console.log(carX1, carX2, carY1, carY2);
    var collisiondX = (obsX1 - (carX1 + (1 / 2 * carWidth)));

    if (
        (((obsX1 < carX1) && (obsX2 > carX1)) ||
         ((obsX1 > carX1) && (obsX2 < carX2)) ||
         ((obsX1 < carX2) && (obsX2 > carX2))) &&
        (((obsY1 < carY1) && (obsY2 > carY1)) ||
         ((obsY1 > carY1) && (obsY2 < carY2)) ||
         ((obsY1 < carY2) && (obsY2 > carY2)))
    ) {
        return collisiondX;
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
        requestAnimationFrame(moveObstacles);
    }

    if (Key.isDown(Key.LEFT)) {
        moveCarLeft();
    }

    if (Key.isDown(Key.RIGHT)) {
        moveCarRight();
    }
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

