ig.module(
        'game.abilities.sword'
    )
    .requires(
        'game.abilities.ability-shoot-extended',
        'game.entities.projectile-slash',
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
        ig.AbilitySword = ig.AbilityShootExtended.extend( {

            spawningEntity: ig.EntityProjectileSlash,

            costActivate: 0,
            cooldownDelay: 0.1,

            offsetVelX: 250,
            offsetVelY: 250,

            relativeVelPctX: 1,
            relativeVelPcty: 1,

            activateOnPress: true,

            initTypes: function () {

                this.parent();

                _ut.addType(ig.Ability, this, 'type', "SPAMMABLE");

            }

        } );

    });