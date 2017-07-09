(function() {
	window.starfighter = window.starfighter || {};

	var Controls = window.starfighter.Controls = function(player) {
		this.player = player;
		this.moveLeft = false;
		this.moveRight = false;
		this.moveUp = false;
		this.moveDown = false;
		this.A = 65;
		this.D = 68;
		this.W = 87;
		this.S = 83;
		this.leftArrow = 37;
		this.rightArrow = 39;
		this.upArrow = 38;
		this.downArrow = 40;
		this.spaceBar = 32;
	};

	Controls.prototype.press = function() {
		var that = this;

		document.onkeydown = function(event) {
			if (event.keyCode == that.A || event.keyCode == that.leftArrow)
				that.moveLeft = true;

			if (event.keyCode == that.D || event.keyCode == that.rightArrow)
				that.moveRight = true;

			if (event.keyCode == that.W || event.keyCode == that.upArrow)
				that.moveUp = true;

			if (event.keyCode == that.S || event.keyCode == that.downArrow)
				that.moveDown = true;

			if (event.keyCode == that.spaceBar) {
				if (that.firing) return;

				that.player.fire();
				that.firing = setInterval(function() {
					that.player.fire();
				}, 200);
			}
		};
	};

	Controls.prototype.release = function() {
		var that = this;

		document.onkeyup = function(event) {
			if (event.keyCode == that.A || event.keyCode == that.leftArrow)
				that.moveLeft = false;

			if (event.keyCode == that.D || event.keyCode == that.rightArrow)
				that.moveRight = false;

			if (event.keyCode == that.W || event.keyCode == that.upArrow)
				that.moveUp = false;

			if (event.keyCode == that.S || event.keyCode == that.downArrow)
				that.moveDown = false;

			if (event.keyCode == that.spaceBar) {
				clearInterval(that.firing);
				delete that.firing;
			}
		};
	};

})();

