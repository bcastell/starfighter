(function() {
	window.starfighter = window.starfighter || {};

	var Constants = window.starfighter.Constants = function() {
		this.game = {
			SPRITE_SHEET : "images/sheet.png",
			OVERFLOW     : 256,
			PLAYER       : 0,
			METEORS      : 1,
			LASERS       : 2,
			SPAWNER      : 3
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
			SPRITE_X       : 211,
			SPRITE_Y       : 941,
			SPRITE_WIDTH   : 99,
			SPRITE_HEIGHT  : 75,
			SCALE_FACTOR   : 0.5,
			VELOCITY_X     : 6,
			VELOCITY_Y     : 6,
			FIRE_FREQUENCY : 160
		};

		this.laser = {
			SPRITE_X      : 856,
			SPRITE_Y      : 421,
			SPRITE_WIDTH  : 9,
			SPRITE_HEIGHT : 54,
			VELOCITY_X    : 0,
			VELOCITY_Y    : 16,
			DAMAGE        : 1
		};

		this.meteor = {
			big : {
				SPRITE_WIDTH  : 101,
				SPRITE_HEIGHT : 84,
				VELOCITY_X    : 0,
				VELOCITY_Y    : 4,
				HP			  : 8,
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
	};

})();

