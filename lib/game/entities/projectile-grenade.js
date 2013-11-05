ig.module(
    'game.entities.projectile-grenade'
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
	
	/**
	 * Projectile for grenade launcher ability.
     * @class
     * @extends ig.Projectile
     * @memberof ig
     * @author Collin Hover - collinhover.com
	 */
	ig.EntityProjectileGrenade = ig.global.EntityProjectileGrenade = ig.Projectile.extend(/**@lends ig.EntityProjectileGrenade.prototype */{
		
		// lite collides to get knocked around
		
		collides: ig.EntityExtended.COLLIDES.LITE,
		size: {x: 4, y: 4},
		offset: {x: 2, y: 2},
		maxVel: {x: 250, y: 250},
			
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'projectile.png', 8, 8 ),
		animSettings: {
			moveX: {
				frameTime: 1,
				sequence: [0]
			},
			deathX: {
				frameTime: 0.05,
				sequence: [1,2,3,4,5]
			}
		},
		canFlipX: true,
		canFlipY: false,
		
		damage: 10,
		lifeDuration: 0.5,
		gravityFactor: 0,
		bounciness: 0,
		collisionKills: true
		
	});

});