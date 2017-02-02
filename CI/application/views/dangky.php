<!doctype html>
<html>
<head>
	<script src='http://127.0.0.1:8080/socket.io/socket.io.js'></script>
	<script src='http://code.jquery.com/jquery-1.10.1.min.js'></script>
<!--	<script src='socket_client.js'></script>-->
</head>
<body>
<div>
	<p >slot con lai:</p><span id="slot"></span>
	<input type='text' id='name' value='Anynomous'/>
	<button id='dk'>Dang ky</button>
	<button id='huy'>Huy</button>
</div>
<script>
	$(document).ready(function(){
		var socket = io.connect('http://127.0.0.1:8080');
		 socket.on('soluong', function(data){
		 	socket.emit('soluong','test');
		 });

		socket.emit('data','data truyen len');
		socket.on('data',function (data) {
			$('#slot').empty();
			if(data.slot == 0 || data.slot < 0){
				$('#slot').append('het slot roi');
			}else {
				$('#slot').append(data.slot);
			}
		});

		socket.on('test',function (data) {
			console.log(data);
		})
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

		});

	})
</script>
<body>
</html>