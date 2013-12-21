ig.module(
        'game.entities.player-coop'
    )
    .requires(
        'game.entities.player'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;
        var _utm = ig.utilsmath;

        /**
         * Player character entity.
         * @class
         * @extends ig.Player
         * @memberof ig
         * @author Collin Hover - collinhover.com
         **/
        ig.EntityPlayerCoop = ig.global.EntityPlayerCoop = ig.EntityPlayer.extend({

            name: 'player-coop',

            // animation

            zIndex: 199,

            handleTap: function() {},
            handleInput: function () {},

        });

    });