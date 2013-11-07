ig.module(
        'game.entities.effect-nauseous-gas'
    )
    .requires(
        'plusplus.core.config',
        'game.entities.effect-poison-gas',
        'plusplus.helpers.utilsvector2'
    )
    .defines(function () {

        var _c = ig.CONFIG;
        var _utv2 = ig.utilsvector2;

        ig.EntityEffectNauseousGas = ig.global.EntityEffectNauseousGas = ig.EntityEffectPoisonGas.extend({

            animSettings: {
                moveX: {
                    sequence: [0,1,2,3,4,5],
                    frameTime: 0.15
                }
            }

        });

    });