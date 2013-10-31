ig.module(
        'game.core.camera-extended'
    )
    .requires(
        'plusplus.core.camera'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;
        var _ut = ig.utils;
        var _utm = ig.utilsmath;
        var _utv2 = ig.utilsvector2;
        var _uti = ig.utilsintersection;
        var _tw = ig.TWEEN;

        ig.Camera.inject({
            updateFollow: function () {

                var screen = ig.game.screen;

                // fallback

                if ( !this.entity && this.entityFallback ) {

                    this.follow( this.entityFallback );

                }
                else if ( this._needsPlayer ) {

                    this.followPlayer();

                }

                // follow

                if (this.entity) {

                    _utv2.copy(this.screenLast, screen);

                    var screenNextX = this.entity.pos.x + this.entity.size.x * 0.5 - ig.system.width * 0.5;
                    var screenNextY = this.entity.pos.y + this.entity.size.y * 0.5 - ig.system.height * 0.5;

                    var noteX, noteY;

                    if (this.transitioning) {

                        this.changed = true;

                        if ( this.transitioningInstantly ) {

                            this.transitionPct = 1;

                        }
                        else {

                            // set transitionDuration

                            if ( this._transitionTime === 0 ) {

                                if ( this.transitionDistance > 0 ) {

                                    var dx = ( screenNextX - this._boundsScreen.minX );
                                    var dy = ( screenNextY - this._boundsScreen.minY );
                                    var distance = Math.sqrt( dx * dx + dy * dy );

                                    this._transitionDuration = ( this.transitionDuration * ( distance / this.transitionDistance ) ).limit( this.transitionDurationMin, this.transitionDurationMax );

                                }
                                else {

                                    this._transitionDuration = this.transitionDuration;

                                }

                            }

                            this._transitionTime += ig.system.tick;
                            this.transitionPct = this._transitionTime / this._transitionDuration;

                        }

                        var value = _tw.Easing.Quadratic.InOut(this.transitionPct);

                        if (screenNextX < this._boundsScreen.minX) {

                            screen.x = this._transitionFrom.x + ( screenNextX - ( this._boundsScreen.minX + ( this.transitioningCenter ? this._boundsScreen.width * 0.5 : 0 ) ) ) * value;

                        }
                        else if (screenNextX > this._boundsScreen.maxX) {

                            screen.x = this._transitionFrom.x + ( screenNextX - ( this._boundsScreen.maxX - ( this.transitioningCenter ? this._boundsScreen.width * 0.5 : 0 ) ) ) * value;

                        }
                        else {

                            noteX = true;

                        }

                        if (screenNextY < this._boundsScreen.minY) {

                            screen.y = this._transitionFrom.y + ( screenNextY - ( this._boundsScreen.minY + ( this.transitioningCenter ? this._boundsScreen.height * 0.5 : 0 ) ) ) * value;

                        }
                        else if (screenNextY > this._boundsScreen.maxY) {

                            screen.y = this._transitionFrom.y + ( screenNextY - ( this._boundsScreen.maxY - ( this.transitioningCenter ? this._boundsScreen.height * 0.5 : 0 ) ) ) * value;

                        }
                        else {

                            noteY = true;

                        }

                        // while transitioning, check if done

                        if (this.transitionPct >= 1 || ( noteX && noteY )) {

                            this.transitionComplete();

                        }

                    }
                    else {

                        // get actual screen next position

                        if (this.keepCentered ) {

                            screen.x += ( screenNextX - screen.x ) * this.lerp;
                            screen.y += ( screenNextY - screen.y ) * this.lerp;

                        }
                        else {

                            if (screenNextX < this._boundsScreen.minX) {

                                screen.x += screenNextX - this._boundsScreen.minX;

                            }
                            else if (screenNextX > this._boundsScreen.maxX) {

                                screen.x += screenNextX - this._boundsScreen.maxX;

                            }

                            // Fixes bug with camera jenkiness when player starts crouching
                            // TODO: this will probably have to get a bit more complex
                            var player = ig.game.getEntityByName('player');
                            if( !player || !player._crouching ) {
                                if (screenNextY < this._boundsScreen.minY) {
                                    screen.y += screenNextY - this._boundsScreen.minY;
                                }
                                else if (screenNextY > this._boundsScreen.maxY) {
                                    screen.y += screenNextY - this._boundsScreen.maxY;
                                }
                            }

                        }

                        if ( screen.x - this.screenLast.x !== 0 || screen.y - this.screenLast.y !== 0 ) {

                            this.changed = true;

                        }

                    }

                }

                // record last and limit

                if ( this.changed ) {

                    if ( this.keepInsideLevel.x ) {

                        this.screenLast.x = screen.x = screen.x.limit( this.boundsLevel.minX, this.boundsLevel.maxX );

                    }
                    else {

                        this.screenLast.x = screen.x;

                    }

                    if ( this.keepInsideLevel.y ) {

                        this.screenLast.y = screen.y = screen.y.limit( this.boundsLevel.minY, this.boundsLevel.maxY );

                    }
                    else {

                        this.screenLast.y = screen.y;

                    }
                    
                    // don't copy new bounds while transitioning
                    // as this will cause transition to move to wrong location
                    
                    if ( !this.transitioning ) {
                        
                        _uti.boundsCopy(this._boundsScreen, this.boundsTrap, screen.x, screen.y);
                        
                    }

                }
                
                // apply shake

                if ( this.shaking ) {

                    screen.x += this.shakeOffset.x;
                    screen.y += this.shakeOffset.y;

                    this.changed = true;

                }

            }
        });

    });