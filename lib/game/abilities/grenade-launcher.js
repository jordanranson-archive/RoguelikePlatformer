ig.module(
        'game.abilities.grenade-launcher'
    )
    .requires(
        'game.abilities.ability-shoot-extended',
        'game.entities.projectile-grenade',
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
        ig.AbilityGrenadeLauncher = ig.AbilityShootExtended.extend( {

            spawningEntity: ig.EntityProjectileGrenade,

            entityOptions: {
                sprayRandomly: true,
                sprayRandomX: 10,
                sprayRandomY: 10,
            },

            costActivate: 0,

            offsetVelX: 300,
            offsetVelY: 300,

            initTypes: function () {

                this.parent();

                _ut.addType(ig.Ability, this, 'type', "SPAMMABLE");

            }

        } );

    });