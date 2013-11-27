ig.module(
        'game.abilities.attack-secondary'
    )
    .requires(
        'plusplus.abilities.ability'
    )
    .defines(function () {
        "use strict";
        ig.AbilityAttackSecondary = ig.global.AbilityAttackSecondary = ig.Ability.extend({});
    });