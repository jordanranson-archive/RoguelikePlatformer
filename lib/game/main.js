// starting with Impact++ is simple!
// setup a main game file, such as 'game/main.js'
// that you load right after ImpactJS
// and inside this file...
// setup the main module
ig.module(
    'game.main'
)
// now require the appropriate files
.requires(

    // the following is the only file required to use Impact++

    'plusplus.core.plusplus',

    //'cinder.cinderplusplus',

    'game.core.camera-extended',

    'game.entities.effect-poison-gas',
    'game.entities.effect-nauseous-gas',
    'game.entities.effect-choking-gas',

    'game.entities.particle-air',
    'game.entities.particle-air-right',
    'game.entities.particle-fireball',

    'game.entities.projectile-fireball',
    'game.entities.projectile-falling-debris',

    /*'game.levels.tutorial.tutorial-0',
    'game.levels.tutorial.tutorial-1',
    'game.levels.tutorial.tutorial-2',
    'game.levels.tutorial.tutorial-3',
    'game.levels.tutorial.tutorial-4',
    'game.levels.tutorial.tutorial-5',
    'game.levels.tutorial.tutorial-6',*/

    'game.levels.test.movement',
    'game.levels.test.wall-jumping',

    // debug while developing
    // remove before release!

    'plusplus.debug.debug'
)
// define the main module
.defines(function () {
    "use strict";
    var _c = ig.CONFIG;

    // have your game class extend Impact++'s game class
    var game = ig.GameExtended.extend({

        // background color is dark, but not too dark
        clearColor: "#111111",

        // convert the collision map shapes
        // either or both can be removed
        shapesPasses: [
            // for climbing
            // we ignore solids and one ways
            // to only retrieve climbable areas
            {
                ignoreSolids: true,
                ignoreOneWays: true
            },
            // for lighting and shadows
            // we ignore climbables and the edge boundary
            {
                ignoreClimbable: true,
                // throw away the inner loop of the edge of the map
                discardBoundaryInner: true,
                // throw away the outer loop of the edge of the map
                retainBoundaryOuter: false
            }
        ],

        levels: [],

        // override the game init function
        init: function () {

            this.parent();

            // stack of levels to randomly choose from
            //this.levels.push( ig.global.LevelTutorial0 );

            // so we can load the first level
            // which of course you didn't forget to require above

            this.loadLevel( ig.global.LevelMovement );
        },

        // we uses load level to load and transition
        // and build level does the building after transition

        buildLevel: function () {

            this.parent();

        },

        // add a few extra inputs
        // Impact++ adds a few basic inputs already:
        // tap / click to use a quick ability
        // spacebar / swipe to jump
        // wasd / arrows to move
        inputStart: function () {

            this.parent();

            ig.input.bind(ig.KEY.X, 'jump');
            ig.input.bind(ig.KEY.MOUSE1, 'attack');
            ig.input.bind(ig.KEY.Q, 'swapWeapons');

        },

        inputEnd: function () {

            this.parent();

            ig.input.unbind(ig.KEY.X, 'jump');
            ig.input.unbind(ig.KEY.MOUSE1, 'attack');
            ig.input.unbind(ig.KEY.Q, 'swapWeapons');

        }

    });

    // now lets boot up impact with
    // our game and config settings
    // we've modified Impact++'s 'config-user.js' file
    // to override some of the default settings
    ig.main(
        '#canvas',
        game,
        60,
        _c.GAME_WIDTH,
        _c.GAME_HEIGHT,
        _c.SCALE,
        ig.LoaderExtended
    );

});
