ig.module(
        'game.abilities.sword'
    )
    .requires(
        'plusplus.core.config',
        'plusplus.abilities.melee',
        'plusplus.helpers.utils'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;
        var _ut = ig.utils;

        /**
         * Laser gun ability.
         * @class
         * @extends ig.AbilityShoot
         * @memberof ig
         * @author Collin Hover - collinhover.com
         **/
        ig.AbilitySword = ig.AbilityMelee.extend( {

            //requiresTarget: false,

            // use this method to add types for checks
            // since we are using bitwise flags
            // we can take advantage of the fact that they can be added

            initTypes: function () {

                this.parent();

            }

        } );

    });