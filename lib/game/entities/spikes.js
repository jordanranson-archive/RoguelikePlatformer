ig.module(
    'game.entities.spikes'
)
.requires(
    'plusplus.core.entity'
)
.defines(function () {
    "use strict";

    var _c = ig.CONFIG;
    var _utm = ig.utilsmath;

    ig.EntitySpikes = ig.global.EntitySpikes = ig.EntityExtended.extend({

    	size: { x: 16, y: 18 },
    	offset: { x: 4, y: 0 },

        damage: 10,
    	collides: ig.EntityExtended.COLLIDES.FIXED,

    	animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'spikes.png', 24, 24),
        animInit: "idleX",
        animSettings: {
            idleX: {
                sequence: [0],
                frameTime: 1
            }
        },

		collideWith: function( entity, dirX, dirY, nudge, vel, weak ) {
			if( dirY !== 0 ) {
				entity.receiveDamage( this.damage );
                return;
			}

            this.parent( entity, dirX, dirY, nudge, vel, weak );
		}

	});

});