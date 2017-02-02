<!doctype html>
<html>
<head>
    <script src='http://127.0.0.1:2010/socket.io/socket.io.js'></script>
    <script src='http://code.jquery.com/jquery-1.10.1.min.js'></script>
    <!--<script src='chat_client.js'></script>-->
</head>
<body>
<div>
    <p >Message</p><span id="message_all"></span>
    <br>
    <input type='text' id='ms' placeholder="nhap tin nhan"/>
    <input type='text' id='name' placeholder="nhap ten"/>
    <button id='send'>Gui</button>

</div>
<script>
    $(document).ready(function(){
        var socket = io.connect('http://127.0.0.1:2010');
        // socket.on('greeting', function(data){
        //     alert(data);
        // })
        var flg = 0;
        $('#name').blur(function () {
            if(flg !== 0){
                $(this).attr('disable',true);
            }
            flg = 1;
        });
            $('#send').click(function(){
                socket.emit('name',$('#name').val());
                socket.emit('ms',$('#ms').val());
                socket.emit('message',$('#message_all').val());
//            console.log('123');
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
</script>
<body>
</html>
