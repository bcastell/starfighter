(function() {
	window.starfighter = window.starfighter || {};

	var Spawner = window.starfighter.Spawner = function(settings) {
		window.starfighter.Actor.call(this, settings);

		this.meteor();
	};

	Spawner.prototype = Object.create(window.starfighter.Actor.prototype);

	Spawner.prototype.meteor = function() {
		var that = this;

		this.bigMeteorTimer = setInterval(function() {
			var start = new window.starfighter.Vector(that.randomInteger(0, that.context.canvas.width - that.constants.meteor.big.SPRITE_WIDTH), 0);

			that.actors[that.constants.game.METEORS].push(new window.starfighter.Meteor(that.settings, "big", start));
		}, that.constants.spawner.meteor.BIG_FREQUENCY);

		this.mediumMeteorTimer = setInterval(function() {
			var start = new window.starfighter.Vector(that.randomInteger(0, that.context.canvas.width - that.constants.meteor.medium.SPRITE_WIDTH), 0);

			that.actors[that.constants.game.METEORS].push(new window.starfighter.Meteor(that.settings, "medium", start));
		}, that.constants.spawner.meteor.MEDIUM_FREQUENCY);

		this.smallMeteorTimer = setInterval(function() {
			var start = new window.starfighter.Vector(that.randomInteger(0, that.context.canvas.width - that.constants.meteor.small.SPRITE_WIDTH), 0);

			that.actors[that.constants.game.METEORS].push(new window.starfighter.Meteor(that.settings, "small", start));
		}, that.constants.spawner.meteor.SMALL_FREQUENCY);

		this.tinyMeteorTimer = setInterval(function() {
			var start = new window.starfighter.Vector(that.randomInteger(0, that.context.canvas.width - that.constants.meteor.tiny.SPRITE_WIDTH), 0);

			that.actors[that.constants.game.METEORS].push(new window.starfighter.Meteor(that.settings, "tiny", start));
		}, that.constants.spawner.meteor.TINY_FREQUENCY);
	};

	Spawner.prototype.randomInteger = function(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);

		return Math.floor(Math.random() * (max - min)) + min;
	};

})();

