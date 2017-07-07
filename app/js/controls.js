(function() {
	window.starfighter = window.starfighter || {};

	var controls = window.starfighter.controls = {
		moveLeft   : false,
		moveRight  : false,
		moveUp     : false,
		moveDown   : false,
		A          : 65,
		D		   : 68,
		W		   : 87,
		S		   : 83,
		leftArrow  : 37,
		rightArrow : 39,
		upArrow	   : 38,
		downArrow  : 40
	};

	function keydownHandler(event) {
		if (event.keyCode == controls.A || event.keyCode == controls.leftArrow)
			controls.moveLeft = true;

		if (event.keyCode == controls.D || event.keyCode == controls.rightArrow)
			controls.moveRight = true;

		if (event.keyCode == controls.W || event.keyCode == controls.upArrow)
			controls.moveUp = true;

		if (event.keyCode == controls.S || event.keyCode == controls.downArrow)
			controls.moveDown = true;
	}

	function keyupHandler(event) {
		if (event.keyCode == controls.A || event.keyCode == controls.leftArrow)
			controls.moveLeft = false;

		if (event.keyCode == controls.D || event.keyCode == controls.rightArrow)
			controls.moveRight = false;

		if (event.keyCode == controls.W || event.keyCode == controls.upArrow)
			controls.moveUp = false;

		if (event.keyCode == controls.S || event.keyCode == controls.downArrow)
			controls.moveDown = false;
	}

	document.addEventListener("keydown", keydownHandler);
	document.addEventListener("keyup", keyupHandler);

})();

