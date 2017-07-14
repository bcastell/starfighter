(function() {
	window.starfighter = window.starfighter || {};

	var Meteor = window.starfighter.Meteor = function(settings, type, start) {
		window.starfighter.Actor.call(this, settings);

		this.type = type;

		this.dimensions = new window.starfighter.Vector(this.constants.meteor[type].SPRITE_WIDTH, this.constants.meteor[type].SPRITE_HEIGHT);

		this.position = start;

		this.velocity = new window.starfighter.Vector(this.constants.meteor[type].VELOCITY_X, this.constants.meteor[type].VELOCITY_Y);

		this.active = true;

		this.hp = this.constants.meteor[type].HP;

		this.hit = false;
	};

	Meteor.prototype = Object.create(window.starfighter.Actor.prototype);

	Meteor.prototype.render = function() {
		if (this.active) {
			var type = this.constants.meteor[this.type];
			var spriteX = this.hit ? type.hit.SPRITE_X : type.normal.SPRITE_X;
			var spriteY = this.hit ? type.hit.SPRITE_Y : type.normal.SPRITE_Y;

			this.context.drawImage(this.sheet,
								   spriteX, spriteY,
							       type.SPRITE_WIDTH, type.SPRITE_HEIGHT,
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
			/*
			var x = (this.position.x + this.dimensions.x >= this.player.renderX + this.player.renderWidth * 0.1) &&
					(this.renderX <= this.player.renderX + this.player.renderWidth - this.player.renderWidth * 0.1);

			var y = (this.renderY + this.renderHeight >= this.player.renderY + this.player.renderHeight * 0.1) &&
					(this.renderY <= this.player.renderY + this.player.renderHeight - this.player.renderHeight * 0.1);

			if (x && y) {}
			*/
		}
	};

})();

