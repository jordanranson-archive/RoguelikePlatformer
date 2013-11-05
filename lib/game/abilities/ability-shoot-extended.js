ig.module(
        'game.abilities.ability-shoot-extended'
    )
    .requires(
        'plusplus.core.config',
        'plusplus.core.input',
        'plusplus.abilities.ability-shoot'
    )
    .defines(function () {
        "use strict";
		
		var _c = ig.CONFIG;

		ig.AbilityShootExtended = ig.AbilityShoot.extend({

			cooldownDelay: 0.1,

			/**
	         * Creates projectile and handles application of settings.
	         * @param {Object} settings settings object.
	         * @override
	         **/
	        activate: function (settings) {

	            settings = settings || {};
				
				var minX = this.entity.pos.x;
				var minY = this.entity.pos.y;
				var width = this.entity.size.x;
				var height = this.entity.size.y;
				var centerX = minX + width * 0.5;
				var centerY = minY + height * 0.5;

	            var entityOptions = this.entityOptions || this.entity;

	            // add entity group to projectile settings so we don't hit own group with projectile

	            var ps = {
	                group: this.entity.group
	            };

	            // merge settings

	            if (entityOptions.projectileSettings) {

	                ig.merge(ps, entityOptions.projectileSettings);

	            }

	            if (settings.projectileSettings) {

	                ig.merge(ps, settings.projectileSettings);

	            }

	            var projectile = ig.game.spawnEntity(this.spawningEntity, centerX, centerY, ps);

	            // reposition
				
				var shootX = centerX;
				var shootY = centerY;

	            // offset

	            if (settings) {

	                var offsetX = settings.offsetX || 0;
	                var offsetY = settings.offsetY || 0;
	                var length;
	                var normalX;
	                var normalY;
	                var velX;
	                var velY;
	                var angle;

	                if (!offsetX && !offsetY) {

	                    var x;
	                    var y;

	                    if (settings instanceof ig.InputPoint) {

	                        x = settings.worldX || 0;
	                        y = settings.worldY || 0;

	                    }
	                    else {

	                        x = settings.x || 0;
	                        y = settings.y || 0;

	                    }

	                    if(entityOptions.sprayRandomly) {
	                    	console.log('spray randomly');
		                    var sprayX = entityOptions.sprayRandomX;
		                    var sprayY = entityOptions.sprayRandomY;

	                    	x += (Math.random()*(sprayX*2))-sprayX;
	                    	y += (Math.random()*(sprayY*2))-sprayY;
	                    }

						var diffX = x - centerX;
						var diffY = y - centerY;

	                    angle = Math.atan2(diffY, diffX);
	                    velY = Math.sin(angle) * this.offsetVelX; 
	                    velX = Math.cos(angle) * this.offsetVelY;
	                   
		                projectile.angle = angle;
		                projectile.vel.x = velX;
		                projectile.vel.y = velY;
				
			            // flip entity to projectile

			            this.entity.lookAt({x: centerX+(diffX < 0 ? -32 : 32), y: centerY});
	                }

	            }

	            // add velocity of entity

	            if (this.relativeVelPctX) {

	                projectile.vel.x += this.entity.vel.x * this.relativeVelPctX;

	            }

	            if (this.relativeVelPctY) {

	                projectile.vel.y += this.entity.vel.y * this.relativeVelPctY;

	            }
				
				// constrain projectile location
				
				projectile.pos.x = shootX.limit( minX + width * this.shootLocationMinPctX, minX + width * this.shootLocationMaxPctX ) - projectile.size.x * 0.5;
				projectile.pos.y = shootY.limit( minY + height * this.shootLocationMinPctY, minY + height * this.shootLocationMaxPctY ) - projectile.size.y * 0.5;



	            /* ABILITY PARENT ACTIVATE CODE */

	            this._activating = this._deactivating = false;
                this.activated = true;
                this.onActivated.dispatch(this);

                this.cast(this.activateCastSettings);

                // start cooldown

                if ( this.cooldownDelay > 0 ) {

                    this.cooldownTimer.set( this.cooldownDelay );

                }

                // drop target

                this.dropEntityTarget();

                /* END OF ABILITY PARENT ACTIVATE CODE */



	            return projectile;

	        }

        });

	});