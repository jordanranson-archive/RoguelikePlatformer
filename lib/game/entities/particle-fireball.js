ig.module(
        'game.entities.particle-fireball'
    )
    .requires(
        'plusplus.abstractities.particle'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;

        ig.EntityParticleFireball = ig.global.EntityParticleFireball = ig.Particle.extend({

            vel: { x: 0, y: -100 },
            gravityFactor: 0,

            lifeDuration: 6 * 0.1,
            fadeBeforeDeathDuration: 3 * 0.1,
            randomFlip: false,
            randomDoubleVel: false,

            offset: { x: 12, y: 12 },
            animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + "fire.png", 24, 24),
            animSettings: {
                moveX: {
                    sequence: [ 0, 1, 2, 3, 4, 5 ],
                    frameTime: 0.1
                }
            },

            reset: function ( x, y, settings ) {
                this.parent( x, y, settings );
                this.vel.y = -150;
            }

        });

    });