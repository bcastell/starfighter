(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var TitleStar = starfighter.TitleStar = function(options, settings) {
		this.settings = settings;
		this.x = options.x;
		this.y = options.y;
		this.blur = options.blur;
		this.radius = options.radius;
	};

	TitleStar.prototype.render = function() {
		var context = this.settings.context;

		context.save();

		context.fillStyle = "white";
		context.shadowColor = "white";
		context.shadowBlur = this.blur;

		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		context.fill();
		context.closePath();

		if (this.blur < 40) this.blur += 1;

		else this.blur = 0;

		context.restore();
	};

	TitleStar.prototype.translate = function() {
		if (this.y >= this.settings.context.canvas.height)
			this.y = 0;

		else
			this.y += 1;
	};

	TitleStar.prototype.collide = function() {

	};

	var GameStar = starfighter.GameStar = function() {

	};

})();

