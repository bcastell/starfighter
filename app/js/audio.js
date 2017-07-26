(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Audio = starfighter.Audio = function(constants) {
		this.constants = constants;

		this.sound = new window.Audio(constants.SOURCE);

		this.sound.playbackRate = constants.PLAYBACK_RATE;
		this.sound.volume = constants.VOLUME;
	};

	Audio.prototype.play = function() {
		this.sound.play();
	};

})();

