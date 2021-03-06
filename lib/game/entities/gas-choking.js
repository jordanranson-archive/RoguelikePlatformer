ig.module(
        'game.entities.gas-choking'
    )
    .requires(
        'plusplus.entities.trigger'
    )
    .defines(function () {

        ig.EntityGasChoking = ig.global.EntityGasChoking = ig.EntityTrigger.extend({

            _wmBoxColor: 'rgba(233, 175, 54, 0.7)',

            suicidal: false,
            once: false,
            triggerable: true,
            targetable: true,
            enabled: true,

            activate: function (entity) {

                this.parent( entity );

                if( this.enabled && entity instanceof ig.global['EntityPlayer'] ) {
                    entity.choke();
                }
                
            }

        });

    });