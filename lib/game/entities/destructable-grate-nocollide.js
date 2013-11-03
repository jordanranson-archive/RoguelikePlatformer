ig.module(
        'game.entities.destructable-grate-nocollide'
    )
    .requires(
        'plusplus.core.config',
        'plusplus.helpers.utilsvector2',
        'plusplus.entities.destructable-collide',
        'game.entities.particle-debris-grate'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;
        var _utv2 = ig.utilsvector2;

        /**
         * Grate destroyed by collision after a short delay.
         * @class
         * @extends ig.EntityDestructableCollide
         * @memberof ig
         * @author Collin Hover - collinhover.com
         */
        ig.EntityDestructableGrateNocollide = ig.global.EntityDestructableGrateNocollide = ig.EntityDestructableGrate.extend(/**@lends ig.EntityDestructableGrateNocollide.prototype */{

            delay: 0,

            collides: ig.Entity.COLLIDES.NEVER,

        });

    });