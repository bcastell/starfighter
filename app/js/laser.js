(function() {
	window.starfighter = window.starfighter || {};

	var Laser = window.starfighter.Laser = function(settings, start) {
		window.starfighter.Actor.call(this, settings);

		this.dimensions = new window.starfighter.Vector(this.constants.laser.SPRITE_WIDTH, this.constants.laser.SPRITE_HEIGHT);

		this.position = new window.starfighter.Vector(start.x - this.dimensions.x / 2, start.y - this.dimensions.y);

		this.velocity = new window.starfighter.Vector(this.constants.laser.VELOCITY_X, this.constants.laser.VELOCITY_Y);

		this.active = true;
	};

	Laser.prototype = Object.create(window.starfighter.Actor.prototype);

	Laser.prototype.render = function() {
		if (this.active) {
			this.context.drawImage(this.sheet,
								   this.constants.laser.SPRITE_X, this.constants.laser.SPRITE_Y,
								   this.constants.laser.SPRITE_WIDTH, this.constants.laser.SPRITE_HEIGHT,
								   this.position.x, this.position.y,
								   this.dimensions.x, this.dimensions.y);
		}
	};

	Laser.prototype.translate = function() {
		if (this.active) {
			if (this.position.y + this.dimensions.y <= 0)
				this.active = false;

			this.up();
		}
	};

	Laser.prototype.up = function() {
		this.position.y -= this.velocity.y;
	};

	Laser.prototype.collide = function() {
		if (this.active) {
			var that = this;

			this.actors[this.constants.game.METEORS].forEach(function(meteor) {
				if (meteor.active) {
					var x = (that.position.x + that.dimensions.x >= meteor.position.x) && (that.position.x <= meteor.position.x + meteor.dimensions.x);
					var y = (that.position.y <= meteor.position.y + meteor.dimensions.y) && (that.position.y + that.dimensions.y >= meteor.position.y);

					if (x && y) {
						that.active = false;
						meteor.hp -= that.constants.laser.DAMAGE;
						meteor.hit = true;

						if (meteor.hp == 0)
							meteor.active = false;
					}
				}
			});
		}
	};

})();

