(function() {
	var Game = window.starfighter.Game = function() {
		this.context = document.getElementById("cv").getContext("2d");

		this.sheet = new Image();
		this.sheet.src = "images/sheet.png";

		this.lasers = [];
		this.meteors = [];
		this.player = new window.starfighter.Player(this.context, this.sheet, this.lasers, this.meteors);

		this.spawner = new window.starfighter.Spawner(this.context, this.sheet, this.player, this.lasers, this.meteors);

		this.cleanLimit = 256;

		var that = this;
		this.sheet.onload = function() {
			requestAnimationFrame(that.render.bind(that));
		};
	};

	Game.prototype.render = function() {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

		this.player.render();

		this.lasers.forEach(function(laser) {
			laser.render();
		});
		if (this.lasers.length == this.cleanLimit)
			this.lasers.splice(0, this.cleanLimit - 1);

		this.meteors.forEach(function(meteor) {
			meteor.render();
		});
		if (this.meteors.length == this.cleanLimit)
			this.meteors.splice(0, this.cleanLimit - 1);

		requestAnimationFrame(this.render.bind(this));
	};

	new Game();

})();

