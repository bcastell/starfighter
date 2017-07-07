(function() {
	window.starfighter = window.starfighter || {};

	var controls = window.starfighter.controls = {
		moveLeft   : false,
		moveRight  : false,
		A          : 65,
		D		   : 68,
		leftArrow  : 37,
		rightArrow : 39
	};

	function keydownHandler(event) {
		if (event.keyCode == controls.A || event.keyCode == controls.leftArrow)
			controls.moveLeft = true;

		if (event.keyCode == controls.D || event.keyCode == controls.rightArrow)
			controls.moveRight = true;
	}

	function keyupHandler(event) {
		if (event.keyCode == controls.A || event.keyCode == controls.leftArrow)
			controls.moveLeft = false;

		if (event.keyCode == controls.D || event.keyCode == controls.rightArrow)
			controls.moveRight = false;
	}

	document.addEventListener("keydown", keydownHandler);
	document.addEventListener("keyup", keyupHandler);

})();

