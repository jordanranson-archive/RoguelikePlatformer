ig.module(
        'game.entities.vent-air'
    )
    .requires(
        'game.entities.vent'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;

        ig.EntityVentAir = ig.global.EntityVentAir = ig.EntityVent.extend({

            windSpeed: -13,
            direction: 'vertical',

            vent: function( entity ) {
                if( this.direction === 'both' || this.direction === 'vertical' ) {
                    if( entity.grounded ) {
                        entity.applyAntiVelocityY();
                        entity.setUngrounded();
                    }

                    entity.vel.y += this.windSpeed;
                }
                if( this.direction === 'both' || this.direction === 'horizontal' ) {
                    entity.vel.x += this.windSpeed;
                }
            }

        });

    });