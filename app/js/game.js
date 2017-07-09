(function() {
	var Game = window.starfighter.Game = function() {
		this.context = document.getElementById("cv").getContext("2d");

		this.sheet = new Image();
		this.sheet.src = "images/sheet.png";

		this.lasers = [];
		this.player = new window.starfighter.Player(this.context, this.sheet, this.lasers);

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
		/*
		this.lasers = this.lasers.filter(function(laser) {
			return laser.active;
		});
		*/

		requestAnimationFrame(this.render.bind(this));
	};

	new Game();

})();

