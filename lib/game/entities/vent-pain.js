ig.module(
        'game.entities.vent-pain'
    )
    .requires(
        'game.entities.vent'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;

        ig.EntityVentPain = ig.global.EntityVentPain = ig.EntityVent.extend({

            damage: 0,

            vent: function( entity ) {
                entity.receiveDamage( this.damage, this );
            }

        });

    });