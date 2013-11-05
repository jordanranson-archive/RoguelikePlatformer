ig.module(
    'game.entities.projectile-energy-bullet'
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
	
	ig.EntityProjectileEnergyBullet = ig.global.EntityProjectileEnergyBullet = ig.Projectile.extend(/**@lends ig.EntityProjectileEnergyBullet.prototype */{
		
		collides: ig.EntityExtended.COLLIDES.LITE,
		size: {x: 4, y: 4},
		offset: {x: 2, y: 2},
		maxVel: {x: 250, y: 250},
			
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'projectile.png', 8, 8 ),
		animSettings: {
			moveLeft: {
				frameTime: 1,
				sequence: [0]
			},
			moveRight: {
				frameTime: 1,
				sequence: [0]
			},
			deathLeft: {
				frameTime: 0.05,
				sequence: [1,2,3,4,5]
			},
			deathRight: {
				frameTime: 0.05,
				sequence: [1,2,3,4,5]
			}
		},
		canFlipX: false,
		canFlipY: false,
		
		damage: 10,
		lifeDuration: 0.5,
		gravityFactor: 0,
		bounciness: 0,
		collisionKills: true
		
	});

});