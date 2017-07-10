(function() {
	window.starfighter = window.starfighter || {};

	var Meteor = window.starfighter.Meteor = function(context, sheet, player, lasers) {
		this.context = context;
		this.sheet = sheet;
		this.player = player;
		this.lasers = lasers;

		this.spriteX = 224;
		this.spriteY = 664;
		this.spriteWidth = 101;
		this.spriteHeight = 84;

		this.renderWidth = this.spriteWidth;
		this.renderHeight = this.spriteHeight;
		this.renderX = this.context.canvas.width / 2 - this.renderWidth / 2;
		this.renderY = 0;

		this.dx = 0;
		this.dy = 6;
	};

	Meteor.prototype.render = function() {
		this.context.drawImage(this.sheet,
							   this.spriteX, this.spriteY,
							   this.spriteWidth, this.spriteHeight,
							   this.renderX, this.renderY,
							   this.renderWidth, this.renderHeight);
		this.translate();
		this.collide();
	};

	Meteor.prototype.translate = function() {
		this.down();
	};

	Meteor.prototype.down = function() {
		this.renderY += this.dy;
	};

	Meteor.prototype.collide = function() {
		var x = (this.renderX + this.renderWidth >= this.player.renderX + this.player.renderWidth * 0.1) &&
				(this.renderX <= this.player.renderX + this.player.renderWidth - this.player.renderWidth * 0.1);

		var y = (this.renderY + this.renderHeight >= this.player.renderY + this.player.renderHeight * 0.1) &&
				(this.renderY <= this.player.renderY + this.player.renderHeight - this.player.renderHeight * 0.1);

		if (x && y) {}
	};

})();

