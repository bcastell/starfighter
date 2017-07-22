(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Meteor = starfighter.Meteor = function(settings, type, start) {
		starfighter.Actor.call(this, settings);

		var meteor = this.constants.meteor[type];

		this.type = type;
		this.dimensions = new starfighter.Vector(meteor.SPRITE_WIDTH, meteor.SPRITE_HEIGHT);
		this.position = start;
		this.velocity = new starfighter.Vector(meteor.VELOCITY_X, meteor.VELOCITY_Y);
		this.hp = meteor.HP;
		this.active = true;
		this.hit = false;
	};

	Meteor.prototype = Object.create(starfighter.Actor.prototype);

	Meteor.prototype.render = function() {
		if (this.active) {
			var meteor = this.constants.meteor[this.type];
			var spriteX = this.hit ? meteor.hit.SPRITE_X : meteor.normal.SPRITE_X;
			var spriteY = this.hit ? meteor.hit.SPRITE_Y : meteor.normal.SPRITE_Y;

			this.context.drawImage(this.sheet,
								   spriteX, spriteY,
							       meteor.SPRITE_WIDTH, meteor.SPRITE_HEIGHT,
							       this.position.x, this.position.y,
							       this.dimensions.x, this.dimensions.y);

			this.hit = this.hit ? !this.hit : this.hit;
		}
	};

	Meteor.prototype.translate = function() {
		if (this.active) {
			this.down();
		}
	};

	Meteor.prototype.down = function() {
		this.position.y += this.velocity.y;
	};

	Meteor.prototype.collide = function() {
		if (this.active) {
			var player = this.actors[this.constants.game.PLAYER][0];

			if (this.collidePlayer() && !player.immune) {
				this.playerDead();
				this.playerRevive();
			}
		}
	};

	Meteor.prototype.collidePlayer = function() {
		var player = this.actors[this.constants.game.PLAYER][0];

		var hitbox = {
			west  : player.position.x + player.dimensions.x * 0.1,
			east  : player.position.x + player.dimensions.x * 0.9,
			north : player.position.y + player.dimensions.y * 0.2,
			south : player.position.y + player.dimensions.y * 0.8
		};

		var entered = this.position.x + this.dimensions.x >= hitbox.west;
		entered = entered && this.position.x <= hitbox.east;
		entered = entered && this.position.y + this.dimensions.y >= hitbox.north;
		entered = entered && this.position.y <= hitbox.south;

		return entered;
	};

	Meteor.prototype.playerCenter = function() {
		var player = this.actors[this.constants.game.PLAYER][0];

		var x = player.position.x + player.dimensions.x / 2;
		var y = player.position.y + player.dimensions.y / 2;

		return new starfighter.Vector(x, y);
	};

	Meteor.prototype.playerDead = function() {
		var constants = this.constants;
		var player = this.actors[constants.game.PLAYER][0];
		var lives = this.actors[constants.game.LIVES][0];

		var particle = new starfighter.Particle(this.settings, this.playerCenter(), constants.particle.death.RADIUS, "death");
		this.actors[constants.game.PARTICLES].push(particle);

		player.dead = true;
		player.immune = true;
		player.position.x = this.context.canvas.width / 2 - (constants.player.SPRITE_WIDTH * constants.player.SCALE_FACTOR) / 2;
		player.position.y = this.context.canvas.height - constants.player.SPRITE_HEIGHT * constants.player.SCALE_FACTOR;
		--lives.count;

		if (player.controls.firing)  player.controls.ceasefire();
	};

	Meteor.prototype.playerRevive = function() {
		var constants = this.constants;
		var player = this.actors[constants.game.PLAYER][0];
		var that = this;

		setTimeout(function() {
			player.dead = false;

			var particle = new starfighter.Particle(that.settings, that.playerCenter(), constants.particle.revive.RADIUS, "revive");
			that.actors[constants.game.PARTICLES].push(particle);

			player.red = false;
			player.controls.triplefiring = false;
			if (player.controls.firing) {
				player.controls.ceasefire();
				player.controls.fire();
			}

			setTimeout(function() {
				player.immune = false;
			}, constants.player.IMMUNE_DELAY);
		}, constants.player.REVIVE_DELAY);
	};

})();

