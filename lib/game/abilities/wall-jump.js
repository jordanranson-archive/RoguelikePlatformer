ig.module(
        'game.abilities.wall-jump'
    )
    .requires(
        'plusplus.abilities.ability'
    )
    .defines(function () {
        "use strict";
        ig.AbilityWallJump = ig.global.AbilityWallJump = ig.Ability.extend({});
    });