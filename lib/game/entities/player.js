ig.module(
        'game.entities.player'
    )
    .requires(
        'plusplus.core.config',
        'plusplus.abstractities.player',

        'game.abilities.double-jump',
        'game.abilities.wall-jump',
        'game.abilities.attack-primary',
        'game.abilities.attack-secondary',

        'game.abilities.sword',
        'game.abilities.energy-rifle',

        'plusplus.ui.ui-meter',
        'plusplus.ui.ui-tracker',
        'plusplus.ui.ui-toggle-pause'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;
        var _utm = ig.utilsmath;

        /**
         * Player character entity.
         * @class
         * @extends ig.Player
         * @memberof ig
         * @author Collin Hover - collinhover.com
         **/
        ig.EntityPlayer = ig.global.EntityPlayer = ig.Player.extend({

            // animation

            zIndex: 200,

            animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'player.png', _c.CHARACTER.SIZE_X, _c.CHARACTER.SIZE_Y),

            // animation settings

            animInit: "idleX",

            animSettings: {
                idleX: {
                    sequence: [
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4
                    ],
                    frameTime: 0.1
                },
                deathX: {
                    sequence: [ 6, 7, 8 ],
                    frameTime: 0.05
                },
                spawnX: {
                    sequence: [ 11, 10, 9, 8, 7, 6 ],
                    frameTime: 0.1
                },
                moveX: {
                    sequence: [ 12, 13, 14, 15, 16, 17 ],
                    frameTime: 0.1
                },
                jumpX: {
                    sequence: [ 16, 18, 19 ],
                    frameTime: 0.05,
                    // animation specific shadow casting!
                    // i.e. when playing this animation
                    // shadows will be cast using the base size
                    // with these offsets
                    // (also used in other animations)
                    opaqueOffset: {
                        left: 6,
                        right: -6,
                        top: 0,
                        bottom: -5
                    }
                },
                fallX: {
                    sequence: [ 20, 21 ],
                    frameTime: 0.1
                },
                climbX: {
                    sequence: [ 24, 25, 26, 27, 28, 29 ],
                    frameTime: 0.1,
                    opaqueOffset: {
                        left: 6,
                        right: -6,
                        top: -3,
                        bottom: -9
                    }
                },
                stairsX: {
                    sequence: [ 22, 23 ],
                    frameTime: 0.15
                },
                talkX: {
                    sequence: [ 0 ],
                    frameTime: 1
                },
                listenX: {
                    sequence: [ 0 ],
                    frameTime: 1
                },
                meleeX: {
                    sequence: [ 30, 31 ],
                    frameTime: 0.1,
                    opaqueOffset: {
                        left: 6,
                        right: -6,
                        top: 2,
                        bottom: 3
                    }
                },
                shootX: {
                    sequence: [ 32, 33, 32 ],
                    frameTime: 0.1
                },
                mimicSetupX: {
                    sequence: [ 32, 33 ],
                    frameTime: 0.1
                },
                mimicPassX: {
                    sequence: [ 34, 35 ],
                    frameTime: 0.1
                },
                mimicFailX: {
                    sequence: [ 34, 35, 33, 33, 32 ],
                    frameTime: 0.1
                },
                mimicActivateX: {
                    sequence: [ 6, 7, 8, 7, 6 ],
                    frameTime: 0.1
                },
                mimicDeactivateX: {
                    sequence: [ 32, 33, 32 ],
                    frameTime: 0.1
                }
            },

            // player casts shadows

            opaque: true,

            // general shadow casting
            // i.e. when playing any animation
            // shadows will be cast using the base size
            // with these offsets

            opaqueOffset: {
                left: 6,
                right: -6,
                top: -1,
                bottom: 3
            },

            // player stats

            health: 100,
            energy: 100,

            // player regenerates energy

            regen: true,
            regenEnergy: true,
            regenRateEnergy: 0.1,

            // can also regenerate health
            // but many times you don't want this
            // except at checkpoints

            //regenHealth: true,
            //regenRateHealth: 0.1,

            // by default, the player is persistent
            // the first time the game encounters a persistent entity
            // it will store it for the rest of the game
            // any time that entity is spawned
            // whether by being placed in the editor or manually
            // the game will use the stored entity instead
            // (you don't need to set persistent for the player)
            // (it is only used here to explain the concept)

            persistent: true,

            // a simple object to store player UI

            ui: {},

            /**
             * RoguelikePlatformer vars
             */

            realSize: _c.CHARACTER.SIZE_EFFECTIVE_Y,
            realMaxVel: _c.CHARACTER.MAX_VEL_GROUNDED_X,
            realOffset: _c.CHARACTER.SIZE_OFFSET_Y,

            sizeCrouching: _c.CHARACTER.SIZE_CROUCHING_Y,
            maxVelCrouching: _c.CHARACTER.MAX_VEL_CROUCHING_X,

            activeAbility: null,
            primaryAbility: null,
            secondaryAbility: null,

            jumpTimer: null,

            _doubleJumping: false,
            _tripleJumping: false,
            _crouching: false,
            _noFriction: false,
            _stuckToWall: false,
            _knockingBack: false,

            /**
             * @override
             */
            initProperties: function () {

                this.parent();

                this.jumpTimer = new ig.Timer();

                // don't add abilities when in editor

                if (!ig.global.wm) {

                    var doubleJump = new ig.AbilityDoubleJump(this, {
                        name: 'doubleJump',
                        enabled: false
                    });

                    var wallJump = new ig.AbilityWallJump(this, {
                        name: 'wallJump',
                        enabled: false
                    });

                    var primaryAttack = new ig.AbilityAttackPrimary(this, {
                        name: 'primaryAttack',
                        enabled: false
                    });

                    var secondaryAttack = new ig.AbilityAttackSecondary(this, {
                        name: 'secondaryAttack',
                        enabled: false
                    });

                    var abilitySword = new ig.AbilitySword(this, {
                        name: 'sword',
                        enabled: true
                    });

                    var abilityEnergyRifle = new ig.AbilityEnergyRifle(this, {
                        name: 'energyRifle',
                        enabled: true
                    });

                    this.abilities.addDescendants([
                        doubleJump,
                        wallJump,
                        primaryAttack,
                        secondaryAttack,
                        abilitySword,
                        abilityEnergyRifle
                    ]);


                    this.primaryAbility = abilitySword;
                    this.secondaryAbility = abilityEnergyRifle;

                    this.activeAbility = this.primaryAbility;


                    if ( !this._activeUI ) {

                        this._activatingUI = true;

                        // pause / unpause button

                        if ( !this.ui.pauseToggle ) {

                            this.ui.pauseToggle = ig.game.spawnEntity(ig.UITogglePause, 0, 0, {
                                posPct: { x: 1, y: 0 },
                                align: { x: 1, y: 0 },
                                // by default margins are assumed to be a percent
                                marginAsPct: false,
                                margin: { x: 15, y: 15 }
                            });

                            // only create a single ui element
                            // this is for the demo only
                            // DO NOT DO THIS IN A GAME!

                        }

                        // stat meters for health and energy

                        if ( !this.ui.healthMeter ) {

                            this.ui.healthMeter = ig.game.spawnEntity(ig.UIMeter, 0, 0, {
                                animSheetPath: 'icons_stats.png',
                                animSettings: true,
                                fillStyle: 'rgb(255,54,90)',
                                size: { x: 8, y: 8 },
                                // by default margins are assumed to be a percent
                                marginAsPct: false,
                                margin: { x: 15, y: 15 }
                            });

                            // only create a single ui element
                            // this is for the demo only
                            // DO NOT DO THIS IN A GAME!

                        }

                        if ( !this.ui.energyMeter ) {

                            this.ui.energyMeter = ig.game.spawnEntity(ig.UIMeter, 0, 0, {
                                animSheetPath: 'icons_stats.png',
                                animTileOffset: 1,
                                animSettings: true,
                                fillStyle: 'rgb(69,170,255)',
                                size: { x: 8, y: 8 },
                                linkedTo: this.ui.healthMeter,
                                linkAlign: { x: 0, y: 1 },
                                // by default margins are assumed to be a percent
                                marginAsPct: false,
                                margin: { x: 0, y: 10 }
                            });

                            // only create a single ui element
                            // this is for the demo only
                            // DO NOT DO THIS IN A GAME!

                        }

                        // all UI are active

                        this._activeUI = true;
                        this._activatingUI = false;

                    }
                }
            },

            /**
             * Whenever the player is activated, create the UI if it does not exist.
             * @override
             **/
            activate: function () {

                this.parent();

            },

            /**
             * Whenever the player is deactivated, destroy the UI if it does exist.
             * @override
             **/
            deactivate: function () {

                this.parent();

                if ( this._activatingUI || this._activeUI ) {

                    this._activeUI = this._activatingUI = false;

                    // remove UI from the game

                    if ( this.ui.healthMeter ) {

                        ig.game.removeEntity( this.ui.healthMeter );
                        this.ui.healthMeter = null;

                    }
                    if ( this.ui.energyMeter ) {

                        ig.game.removeEntity( this.ui.energyMeter );
                        this.ui.energyMeter = null;

                    }
                    if ( this.ui.pauseToggle ) {

                        ig.game.removeEntity( this.ui.pauseToggle );
                        this.ui.pauseToggle = null;

                    }
                    if ( this.ui.tracker ) {

                        ig.game.removeEntity( this.ui.tracker );
                        this.ui.tracker = null;

                    }

                }

            },

            /**
             * @override
             **/
            receiveDamage: function (amount, from, unblockable) {

                var killed = this._killed;
                var applied = this.parent(amount, from, unblockable);

                if( from && from.knockbackEntity ) {
                    this.knockback();
                }

                if (!killed && applied && this.ui.healthMeter) {

                    this.ui.healthMeter.setValue(this.health / this.healthMax);

                }

                return applied;

            },

            /**
             * @override
             **/
            receiveHealing: function (amount, from) {

                this.parent(amount, from);

                if (!this._killed && this.ui.healthMeter) {

                    this.ui.healthMeter.setValue(this.health / this.healthMax);

                }

            },

            /**
             * @override
             **/
            drainEnergy: function (amount, from, unblockable) {

                var killed = this._killed;
                var applied = this.parent(amount, from, unblockable);

                if (!killed && applied && this.ui.energyMeter) {

                    this.ui.energyMeter.setValue(this.energy / this.energyMax);

                }

            },

            /**
             * @override
             **/
            receiveEnergy: function (amount, from) {

                this.parent(amount, from);

                if (!this._killed && this.ui.energyMeter) {

                    this.ui.energyMeter.setValue(this.energy / this.energyMax);

                }

            },

            handleTap: function() {
                var i, il;
                var j, jl;
                var inputPoints;
                var inputPoint;
                var abs;
                var ab;

                inputPoints = ig.input.getInputPoints([ 'down' ], [ true, true ]);

                for (i = 0, il = inputPoints.length; i < il; i++) {

                    inputPoint = inputPoints[ i ];

                    // try to interact

                    this.abilityInteract.setEntityTargetFirst(inputPoint.targets);

                    // interact with any interactive that is not UI or is UI and not fixed

                    if (this.abilityInteract.entityTarget && ( !( this.abilityInteract.entityTarget.type & ig.EntityExtended.TYPE.UI ) || !this.abilityInteract.entityTarget.fixed ) ) {

                        this.abilityInteract.execute();

                    }
                    // fallback to spammable ability
                    else {
                        this.activeAbility.setEntityTargetFirst(inputPoint.targets);
                        this.activeAbility.execute({ x: inputPoint.worldX, y: inputPoint.worldY });
                    }

                }
            },

            /**
             * Adds swipe handling to original player input response.
             * @override
             **/
            handleInput: function () {
                var canAttackSecondary = this.abilities.getDescendantByName('secondaryAttack').enabled;

                if( this._knockingBack ) return;

                // tapping

                if (!this._crouching && !this._disableWeapons) {
                    if (!this.activeAbility.activateOnPress && ig.input.state('attack')) {
                        this.handleTap();
                    }
                    if (this.activeAbility.activateOnPress && ig.input.pressed('attack')) {
                        this.handleTap();
                    }
                }

                // horizontal movement

                if (ig.input.state('right')) {
                    this.moveToRight();
                }
                else if (ig.input.state('left')) {
                    this.moveToLeft();
                }

                // vertical movement

                if (ig.input.state('up')) {
                    if (_c.TOP_DOWN) {
                        this.moveToUp();
                    }
                    else {
                        this.climbUp();
                    }

                }
                else if (ig.input.state('down')) {
                    if (_c.TOP_DOWN) {
                        this.moveToDown();
                    }
                    else {
                        this.climbDown();
                    }
                }

                if (!this._choking && ig.input.pressed('jump')) {
                    this.jump();
                }

                if (canAttackSecondary && ig.input.pressed('swapWeapons')) {
                    this.swapWeapons();
                }

            },

            swapWeapons: function() {

                if(this.activeAbility === this.primaryAbility) {
                    this.activeAbility = this.secondaryAbility;
                } else {
                    this.activeAbility = this.primaryAbility;
                }

            },

            /**
             * When game is reset and player is cleared from persistent cache, we need to make sure we remove all persistent additions such as UI.
             * @override
             */
            cleanupPersistent: function () {

                this.deactivate();

            },

            jump: function() {
                if( !this._stuckToWall ) {
                    this.parent();
                    this.doubleJump();
                } else {
                    this.wallJump();
                }
            },

            doubleJump: function() {
                var canJump = this.abilities.getDescendantByName('doubleJump').enabled;

                // Double jump
                if (canJump && !this.grounded && (this.jumping || this.falling) && !this._doubleJumping) {
                    this.jumpTimer.reset();

                    this.jumping = this._jumpPushing = this._doubleJumping = true;
                    this.jumpStepsRemaining = this.jumpSteps;

                }

                // Triple jump
                /*if (!this.grounded && (this.jumping || this.falling) && this._doubleJumping && !this._tripleJumping && this.jumpTimer.delta() > 0.2) {
                    console.log( 'triple jump' );

                    this.jumping = this._jumpPushing = this._tripleJumping = true;
                    this.jumpStepsRemaining = this.jumpSteps;
                }*/

            },

            wallJump: function() {
                var canJump = this.abilities.getDescendantByName('wallJump').enabled;

                if (canJump && this._stuckToWall) {
                    this.jumping = this._jumpPushing = true;
                    this._doubleJumping = false;

                    this.jumpStepsRemaining = this.jumpSteps;
                    this.vel.x = this.accel.x = this._stuckToWall === 'left' ? this.speed.x * 0.125 : -(this.speed.x * 0.125);
                    this.facing.x = this._stuckToWall === 'left' ? 1 : -1;

                    this._stuckToWall = false;
                }
            },

            knockback: function() {
                if( !this._knockingBack ) {
                    var self = this;
                    setTimeout(function() {
                        self.setUngrounded();
                        self.applyAntiVelocity();
                        self.vel.x = self.accel.x = !self.flip.x ? -70 : 70;
                        self.vel.y = -90;
                    },1);

                    this._knockingBack = true;
                    this.knockBackDirection = this.flip.x;
                }
            },

            /**
             * Updates jump in progress.
             **/
            jumpUpdate: function () {

                this.parent();

            },

            /**
             * Stops any jump in progress.
             **/
            jumpEnd: function () {
                this.parent();
                this._doubleJumping = false;
                this._tripleJumping = false;
            },

            collideWith: function( entity, dirX, dirY, nudge, vel, weak ) {

                // check for crushing damage from a moving platform (or any FIXED entity)
                if (entity.collides == ig.Entity.COLLIDES.FIXED && this.touches(entity)) {

                    // we're still overlapping, but by how much?
                    var overlap;
                    var size;
                    if( dirY !== 0 ) {
                        size = this.size.y;
                        if (this.pos.y < entity.pos.y) overlap = this.pos.y+this.size.y - entity.pos.y;
                        else overlap = this.pos.y - (entity.pos.y+entity.size.y);
                    }
                    else if( dirX !== 0 ) {
                        size = this.size.x;
                        if (this.pos.x < entity.pos.x) overlap = this.pos.x+this.size.x - entity.pos.x;
                        else overlap = this.pos.x - (entity.pos.x+entity.size.x);
                    }
                    overlap = Math.abs(overlap);

                    // overlapping by more than 1/2 of our size?
                    if (overlap > size/2) {
                        // we're being crushed - this is damage per-frame, so not 100% the same at different frame rates
                        this.receiveDamage(this.healthMax, entity);
                    }
                }

                this.parent( entity, dirX, dirY, nudge, vel, weak );
            },

            update: function() {    

                ig.show('x',this.vel.x<<0)
                ig.show('y',this.vel.y<<0)

                var canAttackPrimary = this.abilities.getDescendantByName('primaryAttack');
                if( !canAttackPrimary.enabled ) {
                    this.primaryAbility.setEnabled( false );
                } else {
                    this.primaryAbility.setEnabled( true );
                }

                // Reduce speed if choking
                if (this._choking) {
                    this.maxVelGrounded.x = this.maxVelCrouching;
                } else {
                    this.maxVelGrounded.x = this.realMaxVel;
                }

                // Reduce friction on slippery surfaces
                // TODO: Face direction held, make more slippery
                if (this._noFriction) {
                    this.frictionGrounded.x = _c.CHARACTER.FRICTION_GROUNDED_X*0.3;
                    this.speed.x = _c.CHARACTER.SPEED_X*0.3;
                } else {
                    this.frictionGrounded.x = _c.CHARACTER.FRICTION_GROUNDED_X;
                    this.speed.x = _c.CHARACTER.SPEED_X;
                }

                // Stick to wall behavior
                if (this._stuckToWall !== false) {
                    var trace = ig.game.collisionMap.trace( 
                        this.pos.x, this.pos.y, 
                        this._stuckToWall === 'left' ? -4 : 1, this.size.y - 8, 
                        16, 16
                    );

                    // Stop sticking if moving horizontally or on the ground
                    if(this.last.x !== this.pos.x || this.grounded || !trace.collision.x) {
                        this._stuckToWall = false;
                    }
                }

                // Reduce speed while crouching
                if (this._crouching) {
                    this.maxVelGrounded.x = this.maxVelCrouching;
                }

                this.parent();

                // Knockback
                if(this._knockingBack) {
                    this.temporaryInvulnerability();
                    this.flip.x = this.knockBackDirection;
                }
                if(this.grounded || !this.falling) {
                    this._knockingBack = false;
                }

                this._disableWeapons = false;
                this._choking = false;
                this._noFriction = false;
            },

            crouchStart: function() {
                this._canCrouch = true;

                if( this.grounded && !this._crouching ) {
                    var offset = this.realSize - this.sizeCrouching;

                    this.size.y = this.sizeCrouching;
                    this.offset.y = this.realOffset + offset;
                    this.pos.y += offset;

                    this._crouching = true;
                }
            },

            crouchEnd: function() {
                if( this._crouching && !this._canCrouch ) {
                    var offset = this.realSize - this.sizeCrouching;

                    this.size.y = this.realSize;
                    this.maxVelGrounded.x = this.realMaxVel;
                    this.offset.y = this.realOffset;
                    this.pos.y -= offset;

                    this._crouching = false;
                }

                this._canCrouch = false;
            },

            suspendFriction: function() {
                this._noFriction = true;
            },

            disableWeapons: function() {
                this._disableWeapons = true;
            },

            choke: function() {
                this._choking = true;
            },

            handleMovementTrace: function(res) {
                this.parent( res );

                // Stick to wall for wall jumping
                if (res.collision.x && (this.jumping || this.falling)) { 
                    if( this.last.x > this.pos.x ) { 
                        this._stuckToWall = 'left';
                    }
                    if( this.last.x < this.pos.x) { 
                        this._stuckToWall = 'right';
                    }
                }
            }
        });

    });