ig.module(
        'game.entities.vent'
    )
    .requires(
        'plusplus.entities.trigger'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;

        ig.EntityVent = ig.global.EntityVent = ig.EntityTrigger.extend({

            _wmBoxColor: 'rgba(100, 100, 115, 0.7)',

            suicidal: false,
            once: false,

            fireDelay: 0,
            fireTimer: null,
            fireInterval: 2.5,
            firing: true,
            fireOnce: false,

            _firedOnce: false,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );

                this.startPos = {x: x, y: y};
                this.fireTimer = new ig.Timer(this.fireDelay);
            },

            activate: function( entity ) {
                this.parent( entity );

                if( entity.isTrigger && entity.isTrigger === true ) {  
                    if( this.fireOnce && !this._firedOnce ) {
                        this.firing = !this.firing;
                        this._firedOnce = true;
                    }
                    if( !this.fireOnce ) {
                        this.firing = !this.firing;
                    }
                }
                else {
                    if( this.firing ) {
                        this.vent( entity );
                    }
                }
            },

            update: function() {
                this.parent();

                // Set timer to 0 after delay
                if( this.fireDelay > 0 && this.fireTimer.delta() > 0 ) {
                    this.fireTimer.set(0);
                    this.fireDelay = -1;
                }

                // Reverse piston direction on an interval if set
                if( this.fireInterval > 0 && this.fireTimer.delta() > this.fireInterval ) {
                    this.firing = !this.firing;
                    this.fireTimer.reset();
                }

                // Fire
                if( this.firing ) {
                    
                }
            },

            vent: function( entity ) {

            }

        });

    });