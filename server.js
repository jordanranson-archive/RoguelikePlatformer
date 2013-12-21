var io = require('socket.io').listen(3000);

var index = 0;
var players = [];

io.sockets.on('connection', function (socket) {

    socket.on('game spawn entity', function (data) {

    });

    socket.on('character update pos', function (data) {

    });

    socket.on('disconnect', function() {
        
    });
});