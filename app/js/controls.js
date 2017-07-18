(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Controls = starfighter.Controls = function(player, constants) {
		this.player = player;
		this.constants = constants;
		this.moveLeft = false;
		this.moveRight = false;
		this.moveUp = false;
		this.moveDown = false;

		this.press();
		this.release();
	};

	Controls.prototype.press = function() {
		var that = this;

		document.onkeydown = function(event) {
			switch (event.keyCode) {
				case that.constants.controls.A:
				case that.constants.controls.leftArrow:
					that.moveLeft = true;
					break;
				case that.constants.controls.D:
				case that.constants.controls.rightArrow:
					that.moveRight = true;
					break;
				case that.constants.controls.W:
				case that.constants.controls.upArrow:
					that.moveUp = true;
					break;
				case that.constants.controls.S:
				case that.constants.controls.downArrow:
					that.moveDown = true;
					break;
				case that.constants.controls.spaceBar:
					that.fire();
			}
		};
	};

	Controls.prototype.release = function() {
		var that = this;

		document.onkeyup = function(event) {
			switch (event.keyCode) {
				case that.constants.controls.A:
				case that.constants.controls.leftArrow:
					that.moveLeft = false;
					break;
				case that.constants.controls.D:
				case that.constants.controls.rightArrow:
					that.moveRight = false;
					break;
				case that.constants.controls.W:
				case that.constants.controls.upArrow:
					that.moveUp = false;
					break;
				case that.constants.controls.S:
				case that.constants.controls.downArrow:
					that.moveDown = false;
					break;
				case that.constants.controls.spaceBar:
					that.ceasefire();
			}
		};
	};

	Controls.prototype.fire = function() {
		if (!this.player.dead) {
			if (this.firing) return;

			this.player.fire();

			var that = this;
			this.firing = setInterval(function() {
				that.player.fire();
			}, that.constants.player.FIRE_FREQUENCY);
		}
	};

	Controls.prototype.ceasefire = function() {
		clearInterval(this.firing);
		delete this.firing;
	};

})();

