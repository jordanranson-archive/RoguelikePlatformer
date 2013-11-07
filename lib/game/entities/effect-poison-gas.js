ig.module(
        'game.entities.effect-poison-gas'
    )
    .requires(
        'plusplus.core.config',
        'plusplus.entities.effect-electricity',
        'plusplus.helpers.utilsvector2'
    )
    .defines(function () {

        var _c = ig.CONFIG;
        var _utv2 = ig.utilsvector2;

        ig.EntityEffectPoisonGas = ig.global.EntityEffectPoisonGas = ig.EntityEffectElectricity.extend({

            animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'effect_smoke.png', 32, 32),
            animSettings: {
                moveX: {
                    sequence: [12,13,14,15,16,17],
                    frameTime: 0.15
                }
            },

            performance: 'movable',
            lifeDuration: 0.15 * 6,
            fadeBeforeDeathDuration: 0.5,
        });

    });