ig.module(
    'game.entities.levelchange-random'
)
// now require the appropriate files
.requires(
    'plusplus.entities.levelchange'
)
// define the main module
.defines(function () {

var _c = ig.CONFIG;

ig.global.EntityLevelchangeRandom = ig.EntityLevelchangeRandom = 
ig.EntityLevelchange.extend({
    activate: function (entity) {
    	var index = Math.random()*ig.game.levels.length << 0;
    	this.levelName = ig.game.levels[ index ];
    	console.log( index, this.levelName );
    	
        this.parent( entity );
    }
});

});