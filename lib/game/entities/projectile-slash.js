ig.module(
    'game.entities.projectile-slash'
)
.requires(
	'plusplus.abstractities.projectile',
    'plusplus.core.config',
	'plusplus.helpers.utils'
)
.defines(function () {
    "use strict";
	
	var _c = ig.CONFIG;
	var _ut = ig.utils;
	
	ig.EntityProjectileSlash = ig.global.EntityProjectileSlash = ig.Projectile.extend(/**@lends ig.EntityProjectileSlash.prototype */{
		
		collides: ig.EntityExtended.COLLIDES.LITE,
		size: {x: 4, y: 4},
		offset: {x: 2, y: 2},
		maxVel: {x: 500, y: 500},
			
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'sword_slash.png', 16, 16 ),
		animSettings: {
			moveLeft: {
				frameTime: 0.03,
				sequence: [0,1,2]
			},
			moveRight: {
				frameTime: 0.03,
				sequence: [0,1,2]
			},
			deathLeft: {
				frameTime: 0.03,
				sequence: [3,4]
			},
			deathRight: {
				frameTime: 0.03,
				sequence: [3,4]
			}
		},
		canFlipX: false,
		canFlipY: false,
		
		damage: 10,
		lifeDuration: 0.1,
		gravityFactor: 0,
		bounciness: 0,
		collisionKills: true
		
	});

});