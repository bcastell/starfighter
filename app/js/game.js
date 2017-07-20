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
		this.settings.context.clearRect(0, 0, this.settings.context.canvas.width, this.settings.context.canvas.height);

		this.settings.actors.forEach(function(type) {
			type.forEach(function(actor) {
				actor.render();
			});
		});

		this.settings.actors.forEach(function(type) {
			type.forEach(function(actor) {
				actor.collide();
			});
		});

		this.settings.actors.forEach(function(type) {
			type.forEach(function(actor) {
				actor.translate();
			});
		});

		var that = this;
		this.settings.actors.forEach(function(type) {
			if (type.length == that.settings.constants.game.OVERFLOW)
				type.splice(0, that.settings.constants.game.OVERFLOW - 1);
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

	new Game();

})();

