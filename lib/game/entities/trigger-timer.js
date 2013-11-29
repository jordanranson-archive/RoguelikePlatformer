ig.module(
        'game.entities.trigger-timer'
    )
    .requires(
        'plusplus.entities.trigger'
    )
    .defines(function () {

        ig.EntityTriggerTimer = ig.global.EntityTriggerTimer = ig.EntityTrigger.extend({

            _wmBoxColor: 'rgba(220, 220, 220, 0.7)',

            suicidal: false,
            once: false,
            targetable: true,
            enabled: true,
            triggerInterval: 2.5,
            triggerTimer: null,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.triggerTimer = new ig.Timer();
            },

            update: function() {

                this.parent();

                if( this.enabled && this.triggerTimer.delta() > this.triggerInterval ) {
                    this.triggerTimer.set(0);

                    for( var key in this.target ) {
                        ent = ig.game.getEntityByName( this.target[key] );
                        console.log( ent.name );
                        
                        if( !ent.enabled ) {
                            ent.enabled = true;
                        } else {
                            ent.enabled = false;
                        }

                    }
                }
            },

            kill: function() {}

        });

    });