ig.module(
        'game.entities.gas-poison'
    )
    .requires(
        'plusplus.entities.pain'
    )
    .defines(function () {

        ig.EntityGasPoison = ig.global.EntityGasPoison = ig.EntityPain.extend({

            _wmBoxColor: 'rgba(122, 92, 203, 0.7)'

        });
    });