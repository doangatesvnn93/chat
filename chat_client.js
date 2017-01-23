$(document).ready(function(){
    var socket = io.connect('http://127.0.0.1:2010');
    // socket.on('greeting', function(data){
    //     alert(data);
    // })

    $('#send').click(function(){
        socket.emit('name',$('#name').val());
        socket.emit('ms',$('#ms').val());
        socket.emit('message',$('#message_all').val());
        console.log('123');
    });
    socket.on('name',function (name) {
        $('#message_all').append('<br>' + name + ': ');
    });

    socket.on('ms',function (data) {
        $('#message_all').append(data);
        $('#ms').empty();
    });
    socket.on('message', function(data){
        $('#ms').val('');
        // $('#message_all').append('<br>' + data);

    })
})