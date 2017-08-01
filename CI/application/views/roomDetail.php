<!doctype html>
<html>
<head>
    <script src='http://127.0.0.1:2010/socket.io/socket.io.js'></script>
    <script src='http://code.jquery.com/jquery-1.10.1.min.js'></script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?php base_url(); ?>/assets/css/style.css">
    <link rel="stylesheet" href="<?php echo base_url('assets/css/style.css');?>"?>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>

<div class="col-sm-12">
    <div class="panel panel-default">
        <div class="panel-heading">App Chat</div>
        <div class="panel-body">
            <div class="form-group">
                <div class="col-sm-4">
                    <input type='text' class="form-control" id='name' placeholder="Name"/>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-9">
                    <div class="frame-chat">
                        <span id="message_all"></span>
                    </div>
                </div>

            </div>
            <div class="form-group">
                <div class="col-sm-9 mgt-10">
                    <input type='text' class="form-control" id='ms' placeholder="Message" style="height: 70px;"/>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-9 text-center">
                    <button id='send' class="btn btn-success">Send Message</button>
                </div>
            </div>
        </div>
    </div>


</div>
<script>
    $(document).ready(function(){
        var socket = io.connect('http://127.0.0.1:2010');

        var flg = 0;
        $('#name').blur(function () {
            if(flg !== 0){
                $(this).attr('disable',true);
            }
            flg = 1;
        });
        $('#ms').keypress(function (e) {
            var key = e.which;
            if(key == 13)  // the enter key code
            {
                sendMessage();
            }
        });
        $('#send').click(function () {
            sendMessage();
        });
        function sendMessage() {
            $('#name').prop('disabled', true);
            var name = $('#name').val();
            var message = $('#ms').val();
            data = {
                name: name,
                message: message
            }

            if (message != null && message != '') {
                socket.emit('newMessage', data);
                $('#ms').val('');
            }
        }
        socket.on('newMessage', function (data) {
            $('#message_all').append('<p>' + data.name + ': ' + data.message + '</p>');
        });
    })
</script>
<body>
</html>
