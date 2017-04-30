
function setCarPosition(x) {
	document.querySelector('.car').style.left = x + "px";
} 

function leftRight(e) {
	console.log(e);
	if (e.keycode == 27) {
		// the left arrow has been pressed
		console.log(e);
		console.log('left');
	}
	if (e.keycode == 26) {
		// the right arrow has been pressed
		console.log(e);
		console.log('right');
	}
}

// function tabClick(e) {
// 	if (e.keycode == 33) {
// 		// the left arrow has been pressed
// 		console.log(e);
// 		console.log('left');
// 	}
// 	if (e.keycode == 26) {
// 		// the right arrow has been pressed
// 		console.log('right');
// 	}
// }

// var tabElement = document.querySelector('.gamebox');
// tabElement.addEventListener('keypress', tabClick, false);

var keyListener = document.querySelector('body');
keyListener.addEventListener('keydown', leftRight, false);