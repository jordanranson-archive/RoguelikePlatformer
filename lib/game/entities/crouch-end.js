ig.module(
        'game.entities.crouch-end'
    )
    .requires(
        'plusplus.entities.trigger'
    )
    .defines(function () {

        ig.EntityCrouchEnd = ig.global.EntityCrouchEnd = ig.EntityTrigger.extend(/**@lends ig.EntityCrouchEnd.prototype */{

            // editor properties

            _wmBoxColor: 'rgba(0, 135, 40, 0.7)',

            suicidal: false,
            once: false,

            /**
             * Formats level name and attempts to load deferred.
             * @override
             **/
            activate: function (entity) {

                this.parent( entity );

                if( entity instanceof ig.global['EntityPlayer'] ) {
                    entity.crouchEnd();
                }

            }

        });

    });