ig.module(
        'game.entities.trigger-projectile'
    )
    .requires(
        'plusplus.entities.trigger',
        'plusplus.helpers.utils'
    )
    .defines(function () {
        "use strict";

        var _ut = ig.utils;

        ig.EntityTriggerProjectile = ig.global.EntityTriggerProjectile = ig.EntityTrigger.extend({

            _wmBoxColor: 'rgba( 255, 100, 0, 0.7 )',

            health: 1,
            maxHealth: 1,

            collides: 0,

            frozen: false,
            activated: false,
            triggerable: false,
            targetable: true,

            initTypes: function() {
                this.parent();
                _ut.addType(ig.EntityExtended, this, 'type', "DAMAGEABLE");
            },

            activate: function (entity) {
                this.parent(entity);
                this.kill();
            },

            kill: function ( silent ) {
                if (!this.activated) {
                    this.trigger( this );
                }
            }

        });

    });