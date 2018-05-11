var socket = io()

$('form').submit(function(){
	if($('#message').val() == ''){

	} else {
		var html = $('#message').val();
		var div = document.createElement("div");
		div.innerHTML = html;
		var text = div.textContent || div.innerText || "";

		socket.emit('chat message', text);
  		$('#message').val('');
	}
	return false;
});

socket.on('chat message', function(msg){
	$('.discussionsText').append('<p>' + msg + '</p>' + '<hr>')

    var element = document.getElementById("discussionsText");
    element.scrollTop = element.scrollHeight;

})