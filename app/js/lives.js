(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Lives = starfighter.Lives = function(settings) {
		starfighter.Actor.call(this, settings);

		var lives = this.constants.lives;
		var offset = lives.SPRITE_WIDTH / 4;

		this.position = new starfighter.Vector(offset, this.context.canvas.height - lives.SPRITE_HEIGHT - offset);
		this.count = lives.STARTING_LIVES;
	};

	Lives.prototype = Object.create(starfighter.Actor.prototype);

	Lives.prototype.render = function() {
		var context = this.context;
		var lives = this.constants.lives;

		context.drawImage(this.sheet,
						  lives.SPRITE_X, lives.SPRITE_Y,
						  lives.SPRITE_WIDTH, lives.SPRITE_HEIGHT,
						  this.position.x, this.position.y,
						  lives.SPRITE_WIDTH, lives.SPRITE_HEIGHT);

		context.save();
		context.font = lives.FONT;
		context.fillStyle = lives.FILL_STYLE;
		context.fillText("x " + this.count, lives.SPRITE_WIDTH * 1.4, context.canvas.height - lives.SPRITE_HEIGHT / 2);
		context.restore();
	};

})();

