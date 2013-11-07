ig.module(
        'game.entities.effect-choking-gas'
    )
    .requires(
        'plusplus.core.config',
        'game.entities.effect-poison-gas',
        'plusplus.helpers.utilsvector2'
    )
    .defines(function () {

        var _c = ig.CONFIG;
        var _utv2 = ig.utilsvector2;

        ig.EntityEffectChokingGas = ig.global.EntityEffectChokingGas = ig.EntityEffectPoisonGas.extend({

            animSettings: {
                moveX: {
                    sequence: [6,7,8,9,10,11],
                    frameTime: 0.15
                }
            }

        });

    });