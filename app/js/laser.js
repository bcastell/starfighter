(function() {
	window.starfighter = window.starfighter || {};

	var Laser = window.starfighter.Laser = function(context, sheet, playerX, playerY) {
		this.context = context;
		this.sheet = sheet;

		this.spriteX = 856;
		this.spriteY = 421;
		this.spriteWidth = 9;
		this.spriteHeight = 54;

		this.renderWidth = this.spriteWidth * 0.6;
		this.renderHeight = this.spriteHeight * 0.6;
		this.renderX = playerX;
		this.renderY = playerY;

		this.dx = 6;
		this.dy = 16;

		this.active = true;
	};

	Laser.prototype.render = function() {
		this.context.drawImage(this.sheet,
							   this.spriteX, this.spriteY,
							   this.spriteWidth, this.spriteHeight,
							   this.renderX, this.renderY,
							   this.renderWidth, this.renderHeight);

		var beyond = this.renderY + this.renderHeight == 0;
		if (beyond)
			this.active = false;

		this.renderY -= this.dy;
	};

})();
