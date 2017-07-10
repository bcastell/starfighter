(function() {
	window.starfighter = window.starfighter || {};

	var Laser = window.starfighter.Laser = function(context, sheet, playerX, playerY, meteors) {
		this.context = context;
		this.sheet = sheet;
		this.meteors = meteors;

		this.spriteX = 856;
		this.spriteY = 421;
		this.spriteWidth = 9;
		this.spriteHeight = 54;

		this.renderWidth = this.spriteWidth;
		this.renderHeight = this.spriteHeight;
		this.renderX = playerX - this.renderWidth / 2;
		this.renderY = playerY - this.renderHeight;

		this.dx = 0;
		this.dy = 16;

		this.active = true;
	};

	Laser.prototype.render = function() {
		if (this.active) {
			this.context.drawImage(this.sheet,
								   this.spriteX, this.spriteY,
								   this.spriteWidth, this.spriteHeight,
							       this.renderX, this.renderY,
							       this.renderWidth, this.renderHeight);
			this.translate();
			this.collide();
		}
	};

	Laser.prototype.translate = function() {
		var beyond = this.renderY + this.renderHeight <= 0;
		if (beyond)
			this.active = false;

		this.up();
	};

	Laser.prototype.up = function() {
		this.renderY -= this.dy;
	};

	Laser.prototype.collide = function() {
		var that = this;

		this.meteors.forEach(function(meteor) {
			var x = (that.renderX + that.renderWidth >= meteor.renderX) && (that.renderX <= meteor.renderX + meteor.renderWidth);
			var y = (that.renderY <= meteor.renderY + meteor.renderHeight) && (that.renderY + that.renderHeight >= meteor.renderY);

			if (x && y)
				that.active = false;
		});

	};

})();

