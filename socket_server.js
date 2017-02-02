var http = require('http'),
    socketIO = require('socket.io'),

    port = process.env.PORT || 8080,
    ip = process.env.IP || '127.0.0.1',

    server = http.createServer().listen(port, ip, function(){
        console.log('Socket.IO server started at %s:%s!', ip, port);
    }),

    io = socketIO.listen(server);
// Retrieve



io.set('match origin protocol', true);
io.set('origins', '*:*');
io.set('log level', 1);
var slot = 0;
var test = '';
var run = function(socket){
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://root:root@ds015289.mlab.com:15289/doannguyen', function (err, db) {
        if(err) { return console.dir(err); }

        var collection = db.collection('slot');
        var docs = [{mykey:1}, {mykey:2}, {mykey:3}];

        collection.insert(docs, {w:1}, function(err, result) {

            collection.find().toArray(function(err, items) {});

            var slot_cl = collection.find({monhoc:'toancc'}).stream();
            slot_cl.on("data", function(item) {
                slot = item.slot;
                console.log(item);
                socket.emit('data',item);

            });

            collection.findOne({mykey:1}, function(err, item) {});

        });

    });
    // socket.emit('greeting', 'Hello from Socket.IO server');
    // socket.broadcast.emit('dangky', slot);
    socket.emit('soluong',slot);

    socket.on('dangky', function(data){
        slot = parseInt(slot) - 1;
        console.log('Slot con lai', slot);
        socket.broadcast.emit('soluong', slot);
        socket.emit('dangky',slot);

    });
    socket.on('huy',function (data) {
        slot = parseInt(slot) + 1;
        socket.broadcast.emit('soluong',slot);
        socket.emit('huy',slot);
    });
    socket.on('data',function (data) {
    //     console.log('co data truyen len');
        socket.emit('data',test);
    });


}

io.sockets.on('connection', run);