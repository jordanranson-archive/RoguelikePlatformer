ig.module(
        'game.entities.particle-air'
    )
    .requires(
        'plusplus.entities.particle-color'
    )
    .defines(function () {
        "use strict";

        ig.EntityParticleAir = ig.global.EntityParticleAir = ig.EntityParticleColor.extend({

            vel: { x: 0, y: -100 },
            gravityFactor: 0,
            randomDoubleVel: false,
            randomVel: false,
            alpha: 0.5,

            reset: function ( x, y, settings ) {
                var random = Math.random()*3 << 0;
                this.animTileOffset = 
                    random === 0 ? ig.EntityParticleColor.colorOffsets.WHITE :
                                   ig.EntityParticleColor.colorOffsets.GRAY;

                this.vel.y = -100;

                this.parent( x, y, settings );
            }

        });

    });