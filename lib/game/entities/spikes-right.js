ig.module(
    'game.entities.spikes-right'
)
.requires(
    'plusplus.core.entity'
)
.defines(function () {
    "use strict";

    var _c = ig.CONFIG;
    var _utm = ig.utilsmath;

    ig.EntitySpikesRight = ig.global.EntitySpikesRight = ig.EntityExtended.extend({

    	size: { x: 18, y: 16 },
    	offset: { x: 5, y: 4 },

        damage: 10,
    	collides: ig.EntityExtended.COLLIDES.FIXED,

    	animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'spikes_horz.png', 24, 24),
        animInit: "idleX",
        animSettings: {
            idleX: {
                sequence: [0],
                frameTime: 1
            }
        },

		collideWith: function( entity, dirX, dirY, nudge, vel, weak ) {
			if( dirX !== 0 ) {
                entity.receiveDamage( this.damage );
                return;
            }

            this.parent( entity, dirX, dirY, nudge, vel, weak );
		}

	});

});