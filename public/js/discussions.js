var socket = io()

$('form').submit(function(){
	if($('#message').val() == ''){

	} else {
		socket.emit('chat message', $('#message').val());
  		$('#message').val('');
	}
	return false;
});

socket.on('chat message', function(msg){
	$('.discussionsText').append('<p>' + msg + '</p>' + '<hr>')
})