var http = require('http'),
    socketIO = require('socket.io'),

    port = process.env.PORT || 2010,
    ip = process.env.IP || '127.0.0.1',

    server = http.createServer().listen(port, ip, function(){
        console.log('Socket.IO server started at %s:%s!', ip, port);
    }),

    io = socketIO.listen(server);
io.set('match origin protocol', true);
io.set('origins', '*:*');
io.set('log level', 1);
var run = function(socket){
    socket.on('newMessage', function (req) {
        socket.broadcast.emit('newMessage', req);
        socket.emit('newMessage', req);
    })
}

io.sockets.on('connection', run);
