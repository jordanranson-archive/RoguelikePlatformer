ig.module(
        'game.abilities.energy-rifle'
    )
    .requires(
        'game.abilities.ability-shoot-extended',
        'game.entities.projectile-energy-bullet',
        'plusplus.helpers.utils'
    )
    .defines(function () {
        "use strict";

        var _ut = ig.utils;

        /**
         * Grenade launcher ability.
         * @class
         * @extends ig.AbilityShoot
         * @memberof ig
         * @author Collin Hover - collinhover.com
         **/
        ig.AbilityEnergyRifle = ig.AbilityShootExtended.extend( {

            spawningEntity: ig.EntityProjectileEnergyBullet,

            entityOptions: {
                sprayRandomly: true,
                sprayRandomX: 10,
                sprayRandomY: 10,
            },

            costActivate: 5,
            cooldownDelay: 0.1,

            offsetVelX: 300,
            offsetVelY: 300,

            initTypes: function () {

                this.parent();

                _ut.addType(ig.Ability, this, 'type', "SPAMMABLE");

            }

        } );

    });