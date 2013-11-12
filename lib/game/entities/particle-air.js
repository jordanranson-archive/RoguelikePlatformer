ig.module(
        'game.entities.particle-air'
    )
    .requires(
        'plusplus.entities.particle-color'
    )
    .defines(function () {
        "use strict";

        ig.EntityParticleAir = ig.global.EntityParticleAir = ig.EntityParticleColor.extend({

            gravityFactor: 0,
            randomDoubleVel: false,
            randomVel: false,
            alpha: 0.5,
            speedX: 0,
            speedY: -100,
            performance: 'movable',

            reset: function ( x, y, settings ) {
                var random = Math.random()*3 << 0;
                this.animTileOffset = 
                    random === 0 ? ig.EntityParticleColor.colorOffsets.WHITE :
                                   ig.EntityParticleColor.colorOffsets.GRAY;

                this.vel.y = this.speedY;
                this.vel.x = this.speedX;

                this.parent( x, y, settings );
            }

        });

    });