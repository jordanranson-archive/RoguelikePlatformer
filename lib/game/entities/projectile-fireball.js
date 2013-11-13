ig.module(
    'game.entities.projectile-fireball'
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
	
	ig.EntityProjectileFireball = ig.global.EntityProjectileFireball = ig.Projectile.extend(/**@lends ig.EntityProjectileEnergyBullet.prototype */{
		
		collides: ig.EntityExtended.COLLIDES.LITE,
		size: {x: 20, y: 20},
		offset: {x: 10, y: 10},
		maxVel: {x: 250, y: 250},
			
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'fireball.png', 32, 32 ),
		animSettings: {
			moveLeft: {
				frameTime: 0.1,
				sequence: [0,1,2]
			},
			moveRight: {
				frameTime: 0.1,
				sequence: [0,1,2]
			},
			deathLeft: {
				frameTime: 0.1,
				sequence: [3,4,5]
			},
			deathRight: {
				frameTime: 0.1,
				sequence: [3,4,5]
			}
		},
		canFlipX: false,
		canFlipY: false,

		damage: 10,
		lifeDuration: 0,
		gravityFactor: 0.5,
		bounciness: 0,
		collisionKills: true,


		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.vel.y = -200;
		}
		
	});

});