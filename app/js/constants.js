(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Constants = starfighter.Constants = function() {
		this.game = {
			SPRITE_SHEET : "images/sheet.png",
			OVERFLOW     : 256,
			PLAYER       : 0,
			POWERUPS	 : 1,
			LIVES		 : 2,
			SCORE		 : 3,
			PARTICLES    : 4,
			METEORS      : 5,
			LASERS       : 6,
			SPAWNER      : 7
		};

		this.controls = {
			A		   : 65,
			D		   : 68,
			W          : 87,
			S          : 83,
			leftArrow  : 37,
			rightArrow : 39,
			upArrow    : 38,
			downArrow  : 40,
			spaceBar   : 32
		};

		this.player = {
			blue : {
				SPRITE_X : 211,
				SPRITE_Y : 941
			},
			red : {
				SPRITE_X : 224,
				SPRITE_Y : 832
			},
			SPRITE_WIDTH     : 99,
			SPRITE_HEIGHT    : 75,
			SCALE_FACTOR     : 0.5,
			VELOCITY_X       : 6,
			VELOCITY_Y       : 6,
			FIRE_FREQ		 : 160,
			TRIPLE_FIRE_FREQ : 100,
			ALPHA            : 0.5,
			REVIVE_DELAY     : 2000,
			IMMUNE_DELAY     : 2000
		};

		this.laser = {
			SPRITE_WIDTH  : 9,
			SPRITE_HEIGHT : 54,
			direction : {
				LEFT   : "left",
				CENTER : "center",
				RIGHT  : "right"
			},
			color : {
				BLUE : "blue",
				RED  : "red"
			},
			blue : {
				SPRITE_X : 856,
				SPRITE_Y : 421,
				DAMAGE	 : 1,
				center : {
					VELOCITY_X : 0,
					VELOCITY_Y : 16
				}
			},
			red : {
				SPRITE_X : 858,
				SPRITE_Y : 230,
				DAMAGE   : 2,
				left : {
					VELOCITY_X : -8,
					VELOCITY_Y : 16,
					ANGLE	   : -Math.PI / 8
				},
				center : {
					VELOCITY_X : 0,
					VELOCITY_Y : 16
				},
				right : {
					VELOCITY_X : 8,
					VELOCITY_Y : 16,
					ANGLE	   : Math.PI / 8
				}
			}
		};

		this.meteor = {
			SCORE : 5,
			big : {
				SPRITE_WIDTH  : 101,
				SPRITE_HEIGHT : 84,
				VELOCITY_X    : 0,
				VELOCITY_Y    : 4,
				HP			  : 8,
				SCORE		  : 40,
				normal : {
					SPRITE_X      : 224,
					SPRITE_Y      : 664
				},
				hit : {
					SPRITE_X      : 224,
					SPRITE_Y      : 748
				}
			},
			medium : {
				SPRITE_WIDTH  : 43,
				SPRITE_HEIGHT : 43,
				VELOCITY_X    : 0,
				VELOCITY_Y    : 6,
				HP            : 6,
				SCORE		  : 30,
				normal : {
					SPRITE_X : 651,
					SPRITE_Y : 447
				},
				hit : {
					SPRITE_X : 674,
					SPRITE_Y : 219
				}
			},
			small : {
				SPRITE_WIDTH  : 28,
				SPRITE_HEIGHT : 28,
				VELOCITY_X    : 0,
				VELOCITY_Y    : 8,
				HP			  : 4,
				SCORE		  : 20,
				normal : {
					SPRITE_X : 406,
					SPRITE_Y : 234
				},
				hit : {
					SPRITE_X : 406,
					SPRITE_Y : 262
				}
			},
			tiny : {
				SPRITE_WIDTH  : 18,
				SPRITE_HEIGHT : 18,
				VELOCITY_X    : 0,
				VELOCITY_Y    : 10,
				HP			  : 2,
				SCORE		  : 10,
				normal : {
					SPRITE_X : 346,
					SPRITE_Y : 814
				},
				hit : {
					SPRITE_X : 364,
					SPRITE_Y : 814
				}
			}
		};

		this.spawner = {
			meteor : {
				BIG_FREQUENCY    : 4000,
				MEDIUM_FREQUENCY : 2000,
				SMALL_FREQUENCY  : 1000,
				TINY_FREQUENCY   : 500
			}
		};

		this.particle = {
			RADIUS : 0,
			BLUR   : 0,
			ALPHA  : 1,
			meteor : {
				FILL_STYLE   : "grey",
				SHADOW_COLOR : "white"
			},
			death : {
				FILL_STYLE   : "red",
				SHADOW_COLOR : "yellow",
				RADIUS       : 80
			},
			revive : {
				FILL_STYLE   : "#74b1be",
				SHADOW_COLOR : "grey",
				RADIUS       : 80
			},
			offense : {
				FILL_STYLE   : "red",
				SHADOW_COLOR : "grey",
				RADIUS		 : 80
			},
			life : {
				FILL_STYLE	 : "green",
				SHADOW_COLOR : "grey",
				RADIUS		 : 80
			}
		};

		this.lives = {
			SPRITE_X        : 482,
			SPRITE_Y        : 358,
			SPRITE_WIDTH    : 33,
			SPRITE_HEIGHT   : 26,
			STARTING_LIVES  : 3,
			FONT		    : "32px VT323",
			FILL_STYLE	    : "#00bfff",
			SHADOW_COLOR    : "#bf5700",
			SHADOW_OFFSET_X : 2,
			SHADOW_OFFSET_Y : 2
		};

		this.score = {
			FONT			: "32px VT323",
			FILL_STYLE      : "#ffcc00",
			TEXT_ALIGN      : "right",
			SHADOW_COLOR    : "#990000",
			SHADOW_OFFSET_X : 2,
			SHADOW_OFFSET_Y : 2,
			OFFSET			: 8
		};

		this.powerup = {
			OFFENSE    : 0.45,
			DEFENSE    : 0.90,
			FREQUENCY  : 2000,
			VELOCITY_X : 0,
			VELOCITY_Y : 2,
			kind : {
				OFFENSE : "offense",
				DEFENSE : "defense",
				LIFE	: "life"
			},
			offense : {
				SPRITE_X	  : 809,
				SPRITE_Y	  : 437,
				SPRITE_WIDTH  : 19,
				SPRITE_HEIGHT : 30,
				TIMEOUT		  : 5000
			},
			defense : {
				SPRITE_X	  : 778,
				SPRITE_Y	  : 824,
				SPRITE_WIDTH  : 30,
				SPRITE_HEIGHT : 30
			},
			life : {
				SPRITE_X	  : 222,
				SPRITE_Y	  : 108,
				SPRITE_WIDTH  : 22,
				SPRITE_HEIGHT : 21
			}
		};
	};

})();

