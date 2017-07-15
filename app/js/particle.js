(function() {
	window.starfighter = window.starfighter || {};

	var Particle = window.starfighter.Particle = function(settings, start, limit) {
		window.starfighter.Actor.call(this, settings);

		this.position = start;

		this.limit = Math.ceil(limit / 10) * 10;

		this.radius = this.constants.particle.RADIUS;

		this.blur = this.constants.particle.BLUR;

		this.alpha = this.constants.particle.ALPHA;

		this.active = true;
	};

	Particle.prototype = Object.create(window.starfighter.Actor.prototype);

	Particle.prototype.render = function() {
		if (this.active) {
			this.context.save();

			this.context.globalCompositeOperation = "destination-over";
			this.context.globalAlpha = this.alpha;
			this.context.fillStyle = "grey";
			this.context.shadowColor = "white";
			this.context.shadowBlur = this.blur;
			this.context.shadowOffsetX = 0;
			this.context.shadowOffsetY = 0;

			this.context.beginPath();
			this.context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
			this.context.fill();
			this.context.closePath();

			this.radius += this.limit / 10;
			this.blur += this.limit / 10;
			this.alpha -= 0.1;

			this.active = this.radius != this.limit ? true : false;

			this.context.restore();
		}
	};

})();

