ig.module(
        'game.entities.trigger-enable-implement'
    )
    .requires(
        'plusplus.entities.trigger'
    )
    .defines(function () {

        ig.EntityTriggerEnableImplement = ig.global.EntityTriggerEnableImplement = ig.EntityTrigger.extend({

            _wmBoxColor: 'rgba(50, 50, 150, 0.7)',

            suicidal: false,
            once: false,
            triggerable: false,
            targetable: true,

            activate: function () {
                var ent;
                for( var key in this.target ) {
                    ent = ig.game.getEntityByName( this.target[key] );
                    ent.enabled = !ent.enabled;
                    console.log( ent.name, ent.enabled );
                }
            }

        });

    });