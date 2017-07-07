(function() {
	var Game = window.starfighter.Game = function() {
		this.context = document.getElementById("cv").getContext("2d");

		this.sheet = new Image();
		this.sheet.src = "images/sheet.png";

		this.player = new window.starfighter.Player(this.context, this.sheet);

		var that = this;
		this.sheet.onload = function() {
			requestAnimationFrame(that.render.bind(that));
		};
	};

	Game.prototype.render = function() {
		var canvas = this.context.canvas;

		this.context.clearRect(0, 0, canvas.width, canvas.height);
		this.player.render();

		requestAnimationFrame(this.render.bind(this));
	};

	new Game();

})();

