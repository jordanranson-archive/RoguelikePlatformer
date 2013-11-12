ig.module(
        'game.entities.particle-air-right'
    )
    .requires(
        'game.entities.particle-air'
    )
    .defines(function () {
        "use strict";

        ig.EntityParticleAirRight = ig.global.EntityParticleAirRight = ig.EntityParticleAir.extend({

            speedX: 100,
            speedY: 0

        });

    });