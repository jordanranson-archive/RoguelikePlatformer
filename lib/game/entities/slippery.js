ig.module(
        'game.entities.slippery'
    )
    .requires(
        'plusplus.entities.trigger'
    )
    .defines(function () {

        ig.EntitySlippery = ig.global.EntitySlippery = ig.EntityTrigger.extend({

            _wmBoxColor: 'rgba(100, 225, 250, 0.7)',

            suicidal: false,
            once: false,

            activate: function (entity) {

                this.parent( entity );

                if( entity instanceof ig.global['EntityPlayer'] ) {
                    entity.suspendFriction();
                }

            }

        });

    });