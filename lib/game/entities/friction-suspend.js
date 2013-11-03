ig.module(
        'game.entities.friction-suspend'
    )
    .requires(
        'plusplus.entities.trigger'
    )
    .defines(function () {

        ig.EntityFrictionSuspend = ig.global.EntityFrictionSuspend = ig.EntityTrigger.extend(/**@lends ig.EntityFrictionSuspend.prototype */{

            // editor properties

            _wmBoxColor: 'rgba(125, 125, 225, 0.7)',

            suicidal: false,
            once: false,

            /**
             * Formats level name and attempts to load deferred.
             * @override
             **/
            activate: function (entity) {

                this.parent( entity );

                if( entity instanceof ig.global['EntityPlayer'] ) {
                    entity.suspendFriction();
                }

            }

        });

    });