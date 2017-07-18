(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Spawner = starfighter.Spawner = function(settings) {
		starfighter.Actor.call(this, settings);

		this.meteor();
	};

	Spawner.prototype = Object.create(starfighter.Actor.prototype);

	Spawner.prototype.meteor = function() {
		var Meteor = starfighter.Meteor;
		var game = this.constants.game;
		var spawner = this.constants.spawner;
		var that = this;

		this.bigMeteorTimer = setInterval(function() {
			var type = "big";
			that.actors[game.METEORS].push(new Meteor(that.settings, type, that.meteorStart(type)));
		}, spawner.meteor.BIG_FREQUENCY);

		this.mediumMeteorTimer = setInterval(function() {
			var type = "medium";
			that.actors[game.METEORS].push(new Meteor(that.settings, type, that.meteorStart(type)));
		}, spawner.meteor.MEDIUM_FREQUENCY);

		this.smallMeteorTimer = setInterval(function() {
			var type = "small";
			that.actors[game.METEORS].push(new Meteor(that.settings, type, that.meteorStart(type)));
		}, spawner.meteor.SMALL_FREQUENCY);

		this.tinyMeteorTimer = setInterval(function() {
			var type = "tiny";
			that.actors[game.METEORS].push(new Meteor(that.settings, type, that.meteorStart(type)));
		}, spawner.meteor.TINY_FREQUENCY);
	};

	Spawner.prototype.randomInteger = function(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);

		return Math.floor(Math.random() * (max - min)) + min;
	};

	Spawner.prototype.meteorStart = function(type) {
		var x = this.randomInteger(0, this.context.canvas.width - this.constants.meteor[type].SPRITE_WIDTH);
		var y = 0;

		return new starfighter.Vector(x, y);
	};

})();

