(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Controls = starfighter.Controls = function(player, constants) {
		this.player = player;
		this.constants = constants;
		this.moveLeft = false;
		this.moveRight = false;
		this.moveUp = false;
		this.moveDown = false;
		this.triplefiring = false;

		this.press();
		this.release();
	};

	Controls.prototype.press = function() {
		var that = this;
		var controls = that.constants.controls;

		document.onkeydown = function(event) {
			switch (event.keyCode) {
				case controls.A:
				case controls.leftArrow:
					that.moveLeft = true;
					break;
				case controls.D:
				case controls.rightArrow:
					that.moveRight = true;
					break;
				case controls.W:
				case controls.upArrow:
					that.moveUp = true;
					break;
				case controls.S:
				case controls.downArrow:
					that.moveDown = true;
					break;
				case controls.spaceBar:
					that.triplefiring ? that.triplefire() : that.fire();
			}
		};
	};

	Controls.prototype.release = function() {
		var that = this;
		var controls = that.constants.controls;

		document.onkeyup = function(event) {
			switch (event.keyCode) {
				case controls.A:
				case controls.leftArrow:
					that.moveLeft = false;
					break;
				case controls.D:
				case controls.rightArrow:
					that.moveRight = false;
					break;
				case controls.W:
				case controls.upArrow:
					that.moveUp = false;
					break;
				case controls.S:
				case controls.downArrow:
					that.moveDown = false;
					break;
				case controls.spaceBar:
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
			}, that.constants.player.FIRE_FREQ);
		}
	};

	Controls.prototype.triplefire = function() {
		if (!this.player.dead) {
			if (this.firing) return;

			this.player.triplefire();

			var that = this;
			this.firing = setInterval(function() {
				that.player.triplefire();
			}, that.constants.player.TRIPLE_FIRE_FREQ);
		}
	};

	Controls.prototype.ceasefire = function() {
		clearInterval(this.firing);
		delete this.firing;
	};

})();

