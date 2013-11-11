ig.module(
        'game.entities.piston'
    )
    .requires(
        'plusplus.core.entity'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;

        ig.EntityPiston = ig.global.EntityPiston = ig.EntityExtended.extend({

            size: {x:32, y: 76},

            performance: 'movable',
            collides: ig.EntityExtended.COLLIDES.FIXED,

            animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + "piston.png", 32, 76),
            animInit: 'idleX',
            animSettings: {
                idleX: {
                    frameTime: 1,
                    sequence: [0]
                }
            },

            startPos: {x: 0, y: 0},

            poundDelay: 0,
            poundTimer: null,
            poundOnce: false,
            pounding: true,
            poundInterval: 2.5,

            _poundedOnce: false,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );

                this.startPos = {x: x, y: y};
                this.poundTimer = new ig.Timer(this.poundDelay);
            },

            activate: function( entity ) {
                this.parent( entity );

                if( this.poundOnce && !this._poundedOnce ) {
                    this.pounding = !this.pounding;
                    this._poundedOnce = true;
                }

                if( !this.poundOnce ) {
                    this.pounding = !this.pounding;
                }
            },

            update: function() {
                this.parent();

                // Set timer to 0 after delay
                if( this.poundDelay > 0 && this.poundTimer.delta() > 0 ) {
                    this.poundTimer.set(0);
                    this.poundDelay = -1;
                }

                // Reverse piston direction on an interval if set
                if( this.poundInterval > 0 && this.poundTimer.delta() > this.poundInterval ) {
                    this.pounding = !this.pounding;
                    this.poundTimer.reset();
                }

                // Stomp shit
                this.pos.y += (this.pounding ? 7 : -7);

                // Don't go past starting pos
                if( this.pos.y >= this.startPos.y ) {
                    this.pos.y = this.startPos.y;
                    //this.vel.y = 0;
                }

                // Leave 16px showing when pulling up
                if( this.pos.y <= this.startPos.y-this.size.y+16 ) {
                    this.pos.y = this.startPos.y-this.size.y+16;
                    //this.vel.y = 0;
                }
            }

        });

    });