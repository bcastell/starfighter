(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Laser = starfighter.Laser = function(settings, start) {
		starfighter.Actor.call(this, settings);

		var laser = this.constants.laser;

		this.dimensions = new starfighter.Vector(laser.SPRITE_WIDTH, laser.SPRITE_HEIGHT);
		this.position = new starfighter.Vector(start.x - this.dimensions.x / 2, start.y - this.dimensions.y);
		this.velocity = new starfighter.Vector(laser.VELOCITY_X, laser.VELOCITY_Y);
		this.active = true;
	};

	Laser.prototype = Object.create(starfighter.Actor.prototype);

	Laser.prototype.render = function() {
		var laser = this.constants.laser;

		if (this.active) {
			this.context.drawImage(this.sheet,
								   laser.SPRITE_X, laser.SPRITE_Y,
								   laser.SPRITE_WIDTH, laser.SPRITE_HEIGHT,
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
					if (that.collideMeteor(meteor)) {
						that.meteorDamaged(meteor);

						if (meteor.hp == 0) that.meteorDead(meteor);
					}
				}
			});
		}
	};

	Laser.prototype.collideMeteor = function(meteor) {
		var hitbox = {
			west  : meteor.position.x,
			east  : meteor.position.x + meteor.dimensions.x,
			north : meteor.position.y,
			south : meteor.position.y + meteor.dimensions.y
		};

		var entered = this.position.x + this.dimensions.x >= hitbox.west;
		entered = entered && this.position.x <= hitbox.east;
		entered = entered && this.position.y + this.dimensions.y >= hitbox.north;
		entered = entered && this.position.y <= hitbox.south;

		return entered;
	};

	Laser.prototype.meteorCenter = function(meteor) {
		var x = meteor.position.x + meteor.dimensions.x / 2;
		var y = meteor.position.y + meteor.dimensions.y / 2;

		return new starfighter.Vector(x, y);
	};

	Laser.prototype.meteorRadius = function(meteor) {
		return Math.sqrt(Math.pow(meteor.dimensions.x, 2) + Math.pow(meteor.dimensions.y, 2));
	};

	Laser.prototype.meteorDamaged = function(meteor) {
		this.active = false;
		meteor.hp -= this.constants.laser.DAMAGE;
		meteor.hit = true;

		var score = this.actors[this.constants.game.SCORE][0];
		score.points += this.constants.meteor.SCORE;
	};

	Laser.prototype.meteorDead = function(meteor) {
		meteor.active = false;

		var particle = new starfighter.Particle(this.settings, this.meteorCenter(meteor), this.meteorRadius(meteor), "meteor");
		this.actors[this.constants.game.PARTICLES].push(particle);

		var score = this.actors[this.constants.game.SCORE][0];
		score.points += this.constants.meteor[meteor.type].SCORE;
	};

})();

