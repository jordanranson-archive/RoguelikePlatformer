ig.module(
    'game.entities.projectile-fireball'
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
	
	ig.EntityProjectileFireball = ig.global.EntityProjectileFireball = ig.Particle.extend(/**@lends ig.EntityProjectileEnergyBullet.prototype */{

		collides: ig.EntityExtended.COLLIDES.NEVER,
		size: {x: 16, y: 24},
		offset: {x: 8, y: 12},
		maxVel: {x: 250, y: 250},
        fadeBeforeDeathDuration: 0,
        randomVel: false,
        randomDoubleVel: false,
        randomFlip: false,
        damage: 1,
        damageAsPct: false,
        damageUnblockable: false,
		lifeDuration: 10,
		gravityFactor: 0.5,
		bounciness: 0,
		collisionKills: false,

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

		startY: 0,

		initProperties: function () {
            this.parent();
            _ut.addType(ig.EntityExtended, this, 'checkAgainst', "DAMAGEABLE");
        },

		reset: function( x, y, settings ) {
			this.parent( x, y, settings );

			this.startY = 0;
			this.vel.y = -200;
		},

		update: function() {
			this.parent();

			if( this.startY === 0 ) {
				this.startY = this.pos.y;
			}

			if( this.pos.y > this.startY && this.vel.y > 0 ) {
				this.kill();
			}
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