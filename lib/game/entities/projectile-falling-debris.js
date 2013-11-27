ig.module(
    'game.entities.projectile-falling-debris'
)
.requires(
    'plusplus.abstractities.particle',
    'plusplus.core.config',
	'plusplus.helpers.utils'
)
.defines(function () {
    "use strict";
	
	var _c = ig.CONFIG;
	var _ut = ig.utils;
	
	ig.EntityProjectileFallingDebris = ig.global.EntityProjectileFallingDebris = ig.Particle.extend({

		collides: ig.EntityExtended.COLLIDES.NEVER,
		size: {x: 16, y: 24},
		offset: {x: 2, y: 3},
		maxVel: {x: 250, y: 250},
        fadeBeforeDeathDuration: 0.5,
        randomVel: false,
        randomDoubleVel: false,
        randomFlip: false,
		lifeDuration: 3,
		collisionKills: false,

		gravityFactor: 1,
        knockbackEntity: true,

        damage: 10,
        damageAsPct: false,
        damageUnblockable: true,

		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'fireball.png', 18, 27 ),
		animSettings: {
			moveLeft: {
				frameTime: 0.1,
				sequence: [0,1,2]
			},
			moveRight: {
				frameTime: 0.1,
				sequence: [0,1,2]
			}
		},
		canFlipX: false,
		canFlipY: true,

		initProperties: function () {
            this.parent();
            _ut.addType(ig.EntityExtended, this, 'checkAgainst', "DAMAGEABLE");
        },

		reset: function( x, y, settings ) {
			this.parent( x, y, settings );

			this.startY = 0;
			this.vel.y = 50;
		},

		check: function (entity) {
            this.parent(entity);

            var damage;
            if (this.damageAsPct) {
                damage = entity.health * this.damage;
            }
            else {
                damage = this.damage;
            }

            entity.receiveDamage(damage, this, this.damageUnblockable);
        }
		
	});

});