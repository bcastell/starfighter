(function() {
	window.starfighter = window.starfighter || {};

	var Spawner = window.starfighter.Spawner = function(context, sheet, player, lasers, meteors) {
		this.context = context;
		this.sheet = sheet;
		this.player = player;
		this.lasers = lasers;
		this.meteors = meteors;

		this.meteorFrequency = 2000;

		this.meteor();
	};

	Spawner.prototype.meteor = function() {
		var that = this;

		this.meteorTimer = setInterval(function() {
			that.meteors.push(new window.starfighter.Meteor(that.context, that.sheet,
															that.player, that.lasers));
		}, that.meteorFrequency);
	};

})();
