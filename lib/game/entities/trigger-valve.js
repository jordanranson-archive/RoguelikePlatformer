ig.module(
        'game.entities.trigger-valve'
    )
    .requires(
        'plusplus.core.config',
        'game.entities.trigger-projectile',
        'plusplus.helpers.utils'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;
        var _ut = ig.utils;

        ig.EntityTriggerValve = ig.global.EntityTriggerValve = ig.EntityTriggerProjectile.extend({

            _wmScalable: false,
            _wmBoxColor: 'transparent',

            zIndex: 190,
            size: { x: 16, y: 16 },

            animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'valve.png', 16, 16),
            animsExpected: [
                "idle",
                "activated"
            ],
            animInit: "idle",
            animSettings: {
                idle: {
                    sequence: [ 0 ],
                    frameTime: 1
                },
                activated: {
                    sequence: [ 1 ],
                    frameTime: 1
                }
            },

            update: function() {
                this.parent();

                if( this.activated ) {
                    this.currentAnim = this.anims.activated;
                } else {
                    this.currentAnim = this.anims.idle;
                }
            }

        });

    });