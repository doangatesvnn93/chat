$(document).ready(function(){
    var socket = io.connect('http://127.0.0.1:8080');
    // socket.on('greeting', function(data){
    //     alert(data);
    // })
    $('#dk').click(function(){
        socket.emit('dangky',$('#name').val());
    });
    $('#huy').click(function () {
        socket.emit('huy',$('#name').val());
    });
    socket.on('dangky',function (data) {
        $('#slot').empty();
        if(data == 0 || data < 0){
            $('#slot').append('het slot roi');
        }else {
            $('#slot').append(data);
        }
    });
    socket.on('huy',function (data) {
        $('#slot').empty();
        if(data == 0 || data < 0){
            $('#slot').append('het slot roi');
        }else {
            $('#slot').append(data);
        }
    });
    socket.on('soluong', function(data){
        // alert(data + ' Have joined!');
        $('#slot').empty();
        if(data == 0 || data < 0){
            $('#slot').append('het slot roi');
        }else {
            $('#slot').append(data);
        }

    })
})