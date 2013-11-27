ig.module(
        'game.abilities.double-jump'
    )
    .requires(
        'plusplus.abilities.ability'
    )
    .defines(function () {
        "use strict";
        ig.AbilityDoubleJump = ig.global.AbilityDoubleJump = ig.Ability.extend({});
    });