var socket = io()

$('form').submit(function(){
	if($('#message').val() == ''){

	} else {
		var username
		$.get("/userInfo",function(data){
			if (data) {

				username = data.username
				var html = $('#message').val();
				var div = document.createElement("div");
				div.innerHTML = html;
				var text = div.textContent || div.innerText || "";

				socket.emit('chat message',text,username);
  				$('#message').val('');
			}
				
		});
	}
	return false;
});

socket.on('chat message', function(msg,username){
	$('.discussionsText').append('<strong>'+ username + ': </strong><p style=\'display: inline;\'>' + msg + '</p>' + '<hr>')

    var element = document.getElementById("discussionsText");
    element.scrollTop = element.scrollHeight;

})