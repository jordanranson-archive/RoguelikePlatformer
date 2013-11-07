ig.module(
        'game.entities.destructable-crate'
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
        ig.EntityDestructableCrate = ig.global.EntityDestructableCrate = ig.EntityDestructableDamage.extend(/**@lends ig.EntityDestructableCrate.prototype */{

            _wmDrawBox: false,
            _wmScalable: false,

            frozen: false,
            size: {x:16, y: 12},
            health: 10,
            healthMax: 10,

            animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + "crate.png", 16, 16),
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