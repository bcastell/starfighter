(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Game = starfighter.Game = function() {
		this.settings = this.setup();

		var that = this;
		this.settings.sheet.onload = function() {
			requestAnimationFrame(that.render.bind(that));
		};
	};

	Game.prototype.render = function() {
		var context = this.settings.context;
		var actors = this.settings.actors;

		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

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

	Game.prototype.setup = function() {
		var settings = Object.create(null);

		settings.constants = new starfighter.Constants();

		settings.context = document.getElementById("cv").getContext("2d");

		settings.sheet = new Image();
		settings.sheet.src = settings.constants.game.SPRITE_SHEET;

		settings.actors = [[], [], [], [], [], [], [], []];
		settings.actors[settings.constants.game.PLAYER].push(new starfighter.Player(settings));
		settings.actors[settings.constants.game.LIVES].push(new starfighter.Lives(settings));
		settings.actors[settings.constants.game.SCORE].push(new starfighter.Score(settings));
		settings.actors[settings.constants.game.SPAWNER].push(new starfighter.Spawner(settings));

		return settings;
	};

	//new Game();

})();

