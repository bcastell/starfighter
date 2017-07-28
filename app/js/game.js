(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Game = starfighter.Game = function(settings, stars) {
		this.settings = settings;
		this.addActors(this.settings, stars);

		requestAnimationFrame(this.render.bind(this));
	};

	Game.prototype.render = function() {
		var context = this.settings.context;
		var actors = this.settings.actors;

		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		this.renderBackground();

		actors.forEach(function(type) {
			type.forEach(function(actor) {
				actor.render();
			});
		});

		actors.forEach(function(type) {
			type.forEach(function(actor) {
				actor.collide();
			});
		});

		actors.forEach(function(type) {
			type.forEach(function(actor) {
				actor.translate();
			});
		});

		var that = this;
		actors.forEach(function(type) {
			if (type.length == that.settings.constants.game.OVERFLOW)
				type.splice(0, that.settings.constants.game.OVERFLOW / 2);
		});

		requestAnimationFrame(this.render.bind(this));
	};

	Game.prototype.renderBackground = function() {
		var context = this.settings.context;
		var menu = this.settings.constants.menu;

		var gradient = context.createLinearGradient(0, 0, 0, context.canvas.height);
		gradient.addColorStop(0, menu.gradient.STOP_0);
		gradient.addColorStop(1, menu.gradient.STOP_1);

		context.save();
		context.fillStyle = gradient;
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
		context.restore();
	};

	Game.prototype.addActors = function(settings, stars) {
		var game = settings.constants.game;

		settings.actors = [[], [], [], [], [], [], [], []];

		settings.actors.unshift(stars);
		settings.actors[game.PLAYER].push(new starfighter.Player(settings));
		settings.actors[game.LIVES].push(new starfighter.Lives(settings));
		settings.actors[game.SCORE].push(new starfighter.Score(settings));
		settings.actors[game.SPAWNER].push(new starfighter.Spawner(settings));
	};

})();

