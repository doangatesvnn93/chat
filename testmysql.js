var http = require('http');
var mysql = require('mysql');
var socketIO = require('socket.io');
var port = process.env.PORT || 8080;
var ip = process.env.IP || '127.0.0.1';
var server = http.createServer().listen(port, ip, function(){
    console.log('Socket.IO server started at %s:%s!', ip, port);
});

var io = socketIO.listen(server);
io.set('match origin protocol', true);
io.set('origins', '*:*');
io.set('log level', 1);
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'do_an1'
});

var list_user = [];
var stt = 0;
function update_user(sql, socket) {
    conn.connect(function () {
        conn.query(sql, function (err, result) {
            socket.emit('update_user', result)
        });
    });
}
function get_list_user(event, socket) {
    conn.connect(function () {
        var sql = 'SELECT * FROM `admin` AS a ORDER BY `a`.`username`';
        conn.query(sql,function (err,result) {
            socket.emit(event,result);
        });
    });
}
var run = function(socket) {
    socket.on('list_admin', function (data) {
        switch (data) {
            case 'get_list':
                get_list_user('list_admin', socket);
                break;
        }
    });
    socket.on('update_user', function (data) {
        var sql = 'UPDATE `admin` SET `name`="'+ data.name +'" WHERE id="' + data.id +'"';
        update_user(sql, socket);
        get_list_user('list_admin', socket);
    });
    socket.on('message', function (data) {
        console.log(data);
        socket.broadcast.emit('message', data);
    });
}
io.sockets.on('connection', run);