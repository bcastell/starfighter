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

		this.press();
		this.release();
	};

	Controls.prototype.press = function() {
		var that = this;

		document.onkeydown = function(event) {
			switch (event.keyCode) {
				case that.A:
				case that.leftArrow:
					that.moveLeft = true;
					break;
				case that.D:
				case that.rightArrow:
					that.moveRight = true;
					break;
				case that.W:
				case that.upArrow:
					that.moveUp = true;
					break;
				case that.S:
				case that.downArrow:
					that.moveDown = true;
					break;
				case that.spaceBar:
					that.fire();
			}
		};
	};

	Controls.prototype.release = function() {
		var that = this;

		document.onkeyup = function(event) {
			switch (event.keyCode) {
				case that.A:
				case that.leftArrow:
					that.moveLeft = false;
					break;
				case that.D:
				case that.rightArrow:
					that.moveRight = false;
					break;
				case that.W:
				case that.upArrow:
					that.moveUp = false;
					break;
				case that.S:
				case that.downArrow:
					that.moveDown = false;
					break;
				case that.spaceBar:
					that.ceasefire();
			}
		};
	};

	Controls.prototype.fire = function() {
		if (this.firing) return;

		this.player.fire();

		var that = this;
		this.firing = setInterval(function() {
			that.player.fire();
		}, that.player.fireFrequency);
	};

	Controls.prototype.ceasefire = function() {
		clearInterval(this.firing);
		delete this.firing;
	};

})();

