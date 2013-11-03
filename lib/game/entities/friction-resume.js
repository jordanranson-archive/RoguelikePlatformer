ig.module(
        'game.entities.friction-resume'
    )
    .requires(
        'plusplus.entities.trigger'
    )
    .defines(function () {

        ig.EntityFrictionResume = ig.global.EntityFrictionResume = ig.EntityTrigger.extend(/**@lends ig.EntityFrictionResume.prototype */{

            // editor properties

            _wmBoxColor: 'rgba(45, 45, 225, 0.7)',

            suicidal: false,
            once: false,

            /**
             * Formats level name and attempts to load deferred.
             * @override
             **/
            activate: function (entity) {

                this.parent( entity );

                if( entity instanceof ig.global['EntityPlayer'] ) {
                    entity.resumeFriction();
                }

            }

        });

    });