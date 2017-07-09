(function() {
	window.starfighter = window.starfighter || {};

	var Player = window.starfighter.Player = function(context, sheet, lasers) {
		this.context = context;
		this.sheet = sheet;
		this.lasers = lasers;

		this.controls = new window.starfighter.Controls(this);
		this.controls.press();
		this.controls.release();

		this.spriteX = 211;
		this.spriteY = 941;
		this.spriteWidth = 99;
		this.spriteHeight = 75;

		this.renderWidth = this.spriteWidth * 0.6;
		this.renderHeight = this.spriteHeight * 0.6;
		this.renderX = context.canvas.width / 2 - this.renderWidth / 2;
		this.renderY = context.canvas.height - this.renderHeight;

		this.dx = 6;
		this.dy = 6;
	};

	Player.prototype.render = function() {
		this.context.drawImage(this.sheet,
							   this.spriteX, this.spriteY,
							   this.spriteWidth, this.spriteHeight,
							   this.renderX, this.renderY,
							   this.renderWidth, this.renderHeight);

		var canMoveLeft = this.renderX >= this.dx;
		if (this.controls.moveLeft && canMoveLeft)
			this.renderX -= this.dx

		var canMoveRight = this.renderX + this.renderWidth <= this.context.canvas.width - this.dx;
		if (this.controls.moveRight && canMoveRight)
			this.renderX += this.dx

		var canMoveUp = this.renderY >= this.dy;
		if (this.controls.moveUp && canMoveUp)
			this.renderY -= this.dy;

		var canMoveDown = this.renderY + this.renderHeight <= this.context.canvas.height - this.dy;
		if (this.controls.moveDown && canMoveDown)
			this.renderY += this.dy;
	};

	Player.prototype.fire = function() {
		this.lasers.push(new window.starfighter.Laser(this.context, this.sheet, this.renderX + this.renderWidth / 2, this.renderY));
	};

})();

