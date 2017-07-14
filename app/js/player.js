(function() {
	window.starfighter = window.starfighter || {};

	var Player = window.starfighter.Player = function(settings) {
		window.starfighter.Actor.call(this, settings);

		this.controls = new window.starfighter.Controls(this, this.constants);

		this.dimensions = new window.starfighter.Vector(this.constants.player.SPRITE_WIDTH * this.constants.player.SCALE_FACTOR,
														this.constants.player.SPRITE_HEIGHT * this.constants.player.SCALE_FACTOR);

		this.position = new window.starfighter.Vector(this.context.canvas.width / 2 - this.dimensions.x / 2,
													  this.context.canvas.height - this.dimensions.y);

		this.velocity = new window.starfighter.Vector(this.constants.player.VELOCITY_X, this.constants.player.VELOCITY_Y);
	};

	Player.prototype = Object.create(window.starfighter.Actor.prototype);

	Player.prototype.render = function() {
		this.context.drawImage(this.sheet,
							   this.constants.player.SPRITE_X, this.constants.player.SPRITE_Y,
							   this.constants.player.SPRITE_WIDTH, this.constants.player.SPRITE_HEIGHT,
							   this.position.x, this.position.y,
							   this.dimensions.x, this.dimensions.y);
	};

	Player.prototype.translate = function() {
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
		var start = new window.starfighter.Vector(this.position.x + this.dimensions.x / 2, this.position.y);

		this.actors[this.constants.game.LASERS].push(new window.starfighter.Laser(this.settings, start));
	};

})();

