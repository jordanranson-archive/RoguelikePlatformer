ig.module(
        'game.entities.destructable-crate-big'
    )
    .requires(
        'plusplus.core.config',
        'plusplus.entities.destructable-damage',
        'game.entities.particle-debris-door'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;

        /**
         * Destructable pseudo door facing to the left that is destroyed by damage.
         * @class
         * @extends ig.EntityDestructableDamage
         * @memberof ig
         * @author Collin Hover - collinhover.com
         */
        ig.EntityDestructableCrateBig = ig.global.EntityDestructableCrateBig = ig.EntityDestructableDamage.extend(/**@lends ig.EntityDestructableCrateBig.prototype */{

            _wmDrawBox: false,
            _wmScalable: false,

            frozen: false,
            size: {x:32, y: 24},
            offset: {x: 0, y: 4},
            health: 30,
            healthMax: 30,

            animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + "crate_big.png", 32, 32),
            animInit: 'idle',
            animSettings: {
                idle: {
                    frameTime: 1,
                    sequence: [0]
                }
            },

            spawningEntity: ig.EntityParticleDebrisDoor,
            spawnSettings: {
                vel: { x: 120, y: 120 }
            }

        });

    });