ig.module(
        'game.abilities.attack-primary'
    )
    .requires(
        'plusplus.abilities.ability'
    )
    .defines(function () {
        "use strict";
        ig.AbilityAttackPrimary = ig.global.AbilityAttackPrimary = ig.Ability.extend({});
    });