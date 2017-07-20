(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Powerup = starfighter.Powerup = function(settings, type, start) {
		starfighter.Actor.call(this, settings);

		var powerup = this.constants.powerup;

		this.type = type;
		this.dimensions = new starfighter.Vector(powerup[type].SPRITE_WIDTH, powerup[type].SPRITE_HEIGHT);
		this.position = start;
		this.velocity = new starfighter.Vector(powerup.VELOCITY_X, powerup.VELOCITY_Y);
		this.active = true;
	};

	Powerup.prototype = Object.create(starfighter.Actor.prototype);

	Powerup.prototype.render = function() {
		var powerup = this.constants.powerup[this.type];

		this.context.drawImage(this.sheet,
							   powerup.SPRITE_X, powerup.SPRITE_Y,
							   powerup.SPRITE_WIDTH, powerup.SPRITE_HEIGHT,
							   this.position.x, this.position.y,
							   this.dimensions.x, this.dimensions.y);
	};

	Powerup.prototype.translate = function() {
		this.down();
	};

	Powerup.prototype.down = function() {
		this.position.y += this.velocity.y;
	};

	Powerup.prototype.collide = function() {

	};

})();

