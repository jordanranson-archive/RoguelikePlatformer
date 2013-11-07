ig.module(
        'game.entities.gas-nauseous'
    )
    .requires(
        'plusplus.entities.trigger'
    )
    .defines(function () {

        ig.EntityGasNauseous = ig.global.EntityGasNauseous = ig.EntityTrigger.extend({

            _wmBoxColor: 'rgba(140, 193, 82, 0.7)',

            suicidal: false,
            once: false,

            activate: function (entity) {

                this.parent( entity );

                if( entity instanceof ig.global['EntityPlayer'] ) {
                    entity.disableWeapons();
                }

            }

        });

    });