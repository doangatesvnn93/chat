var http = require('http'),
    socketIO = require('socket.io'),

    port = process.env.PORT || 8080,
    ip = process.env.IP || '127.0.0.1',

    server = http.createServer().listen(port, ip, function(){
        console.log('Socket.IO server started at %s:%s!', ip, port);
    }),

    io = socketIO.listen(server);
// Retrieve

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://root:root@ds015289.mlab.com:15289/doannguyen', function (err, db) {
    if(err) { return console.dir(err); }
    var collection = db.collection('slot');
    // var data =  {monhoc:'toancc',slot:3};
    // collection.insert(data);
    // collection.findOne({mykey:1}, function(err, item) {});
    var is_slot = collection.findOne({monhoc:'toancc'},function(err, item) {});
    console.log(is_slot);

    // var doc = {mykey:1, fieldtoupdate:1};
    //
    // collection.insert(doc, {w:1}, function(err, result) {
    //     collection.update({mykey:1}, {$set:{fieldtoupdate:2}}, {w:1}, function(err, result) {});
    // });
    //
    // var doc2 = {mykey:2, docs:[{doc1:1}]};
    //
    // collection.insert(doc2, {w:1}, function(err, result) {
    //     collection.update({mykey:2}, {$push:{docs:{doc2:1}}}, {w:1}, function(err, result) {});
    // });

});

io.set('match origin protocol', true);
io.set('origins', '*:*');
io.set('log level', 1);
var slot = 10;
var run = function(socket){
    // socket.emit('greeting', 'Hello from Socket.IO server');
    // socket.broadcast.emit('dangky', slot);
    socket.emit('soluong',slot);
    socket.on('dangky', function(data){
        slot = parseInt(slot) - 1;
        console.log('Slot con lai', slot);
        socket.broadcast.emit('soluong', slot);
        socket.emit('dangky',slot);

    })
    socket.on('huy',function (data) {
        slot = parseInt(slot) + 1;
        socket.broadcast.emit('soluong',slot);
        socket.emit('huy',slot);
    })
}

io.sockets.on('connection', run);