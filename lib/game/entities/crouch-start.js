ig.module(
        'game.entities.crouch-start'
    )
    .requires(
        'plusplus.entities.trigger'
    )
    .defines(function () {

        ig.EntityCrouchStart = ig.global.EntityCrouchStart = ig.EntityTrigger.extend(/**@lends ig.EntityCrouchStart.prototype */{

            // editor properties

            _wmBoxColor: 'rgba(0, 200, 40, 0.7)',

            suicidal: false,
            once: false,

            /**
             * Formats level name and attempts to load deferred.
             * @override
             **/
            activate: function (entity) {

                this.parent( entity );

                if( entity instanceof ig.global['EntityPlayer'] ) {
                    entity.crouchStart();
                }

            }

        });

    });