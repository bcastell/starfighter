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
		this.red = false;
		this.shielded = false;
	};

	Player.prototype = Object.create(starfighter.Actor.prototype);

	Player.prototype.render = function() {
		if (!this.dead) {
			var player = this.constants.player;
			var shield = this.constants.powerup.defense.shield;

			this.context.save();
			if (this.immune)
				this.context.globalAlpha = player.ALPHA;

			var spriteX = this.red ? player.red.SPRITE_X : player.blue.SPRITE_X;
			var spriteY = this.red ? player.red.SPRITE_Y : player.blue.SPRITE_Y;

			this.context.drawImage(this.sheet,
							       spriteX, spriteY,
							       player.SPRITE_WIDTH, player.SPRITE_HEIGHT,
							       this.position.x, this.position.y,
							       this.dimensions.x, this.dimensions.y);
			this.context.restore();

			if (this.shielded)
				this.context.drawImage(this.sheet,
									   shield.SPRITE_X, shield.SPRITE_Y,
									   shield.SPRITE_WIDTH, shield.SPRITE_HEIGHT,
									   this.position.x + this.dimensions.x / 2 - shield.OFFSET_X, this.position.y - shield.OFFSET_Y,
									   shield.SPRITE_WIDTH * shield.SCALE_FACTOR, shield.SPRITE_HEIGHT * shield.SCALE_FACTOR);
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
		var direction = this.constants.laser.direction;
		var color = this.constants.laser.color;

		var laser = new starfighter.Laser(this.settings, this.laserStart(), color.BLUE, direction.CENTER);
		this.actors[this.constants.game.LASERS].push(laser);
	};

	Player.prototype.triplefire = function() {
		var lasers = this.actors[this.constants.game.LASERS];
		var direction = this.constants.laser.direction;
		var color = this.constants.laser.color;

		var left = new starfighter.Laser(this.settings, this.laserStart(), color.RED, direction.LEFT);
		var center = new starfighter.Laser(this.settings, this.laserStart(), color.RED, direction.CENTER);
		var right = new starfighter.Laser(this.settings, this.laserStart(), color.RED, direction.RIGHT);

		lasers.push(left);
		lasers.push(center);
		lasers.push(right);
	};

	Player.prototype.laserStart = function() {
		var x = this.position.x + this.dimensions.x / 2 - this.constants.laser.SPRITE_WIDTH / 2;
		var y = this.position.y - this.constants.laser.SPRITE_HEIGHT;

		return new starfighter.Vector(x, y);
	};

})();

