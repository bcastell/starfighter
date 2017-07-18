(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Player = starfighter.Player = function(settings) {
		starfighter.Actor.call(this, settings);

		var player = this.constants.player;

		this.controls = new starfighter.Controls(this, this.constants);

		var sizeX = player.SPRITE_WIDTH * player.SCALE_FACTOR;
		var sizeY = player.SPRITE_HEIGHT * player.SCALE_FACTOR;
		this.dimensions = new starfighter.Vector(sizeX, sizeY);

		var startX = this.context.canvas.width / 2 - this.dimensions.x / 2;
		var startY = this.context.canvas.height - this.dimensions.y;
		this.position = new starfighter.Vector(startX, startY);

		this.velocity = new starfighter.Vector(player.VELOCITY_X, player.VELOCITY_Y);
		this.immune = false;
		this.dead = false;
	};

	Player.prototype = Object.create(starfighter.Actor.prototype);

	Player.prototype.render = function() {
		var player = this.constants.player;

		if (!this.dead) {
			this.context.save();
			if (this.immune)
				this.context.globalAlpha = player.ALPHA;

			this.context.drawImage(this.sheet,
							       player.SPRITE_X, player.SPRITE_Y,
							       player.SPRITE_WIDTH, player.SPRITE_HEIGHT,
							       this.position.x, this.position.y,
							       this.dimensions.x, this.dimensions.y);
			this.context.restore();
		}
	};

	Player.prototype.translate = function() {
		if (!this.dead)
			this.keyboard();
	};

	Player.prototype.keyboard = function() {
		if (this.controls.moveLeft && this.position.x >= this.velocity.x)
			this.left();

		if (this.controls.moveRight && this.position.x + this.dimensions.x <= this.context.canvas.width - this.velocity.x)
			this.right();

		if (this.controls.moveUp && this.position.y >= this.velocity.y)
			this.up();

		if (this.controls.moveDown && this.position.y + this.dimensions.y <= this.context.canvas.height - this.velocity.y)
			this.down();
	};

	Player.prototype.left = function() {
		this.position.x -= this.velocity.x;
	};

	Player.prototype.right = function() {
		this.position.x += this.velocity.x;
	};

	Player.prototype.up = function() {
		this.position.y -= this.velocity.y;
	};

	Player.prototype.down = function() {
		this.position.y += this.velocity.y;
	};

	Player.prototype.fire = function() {
		var start = new starfighter.Vector(this.position.x + this.dimensions.x / 2, this.position.y);

		this.actors[this.constants.game.LASERS].push(new starfighter.Laser(this.settings, start));
	};

})();

