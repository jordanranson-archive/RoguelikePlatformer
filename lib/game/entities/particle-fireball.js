ig.module(
        'game.entities.particle-fireball'
    )
    .requires(
        'plusplus.entities.particle-color'
    )
    .defines(function () {
        "use strict";

        ig.EntityParticleFireball = ig.global.EntityParticleFireball = ig.EntityParticleColor.extend({

            reset: function ( x, y, settings ) {

                this.animTileOffset = 
                ig.EntityParticleColor.colorOffsets.GREEN + 
                Math.round( Math.random() * ( 
                    ( ig.EntityParticleColor.colorOffsets.BROWN - 1 ) - 
                    ig.EntityParticleColor.colorOffsets.GREEN 
                ));

                this.parent( x, y, settings );

                this.vel.y = -Math.random()*200;
                this.vel.x = (Math.random()*50)*(Math.random()>0.5?1:-1);
            }

        });

    });